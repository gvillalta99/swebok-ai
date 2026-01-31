#!/usr/bin/env -S deno run --allow-read --allow-write --allow-run

/**
 * Frontmatter Validator
 * 
 * Valida e padroniza o frontmatter YAML em arquivos Markdown.
 * Campos obrigatórios: title, created_at, tags, status, updated_at, ai_model
 */

import { parseArgs } from "https://deno.land/std@0.220.0/cli/parse_args.ts";
import { walk } from "https://deno.land/std@0.220.0/fs/walk.ts";
import * as yaml from "https://deno.land/std@0.220.0/yaml/mod.ts";

interface ValidationError {
  file: string;
  line?: number;
  field?: string;
  message: string;
  severity: "error" | "warning";
}

interface ValidationResult {
  file: string;
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationError[];
  frontmatter?: Record<string, unknown>;
}

const REQUIRED_FIELDS = ["title", "created_at", "tags", "status", "updated_at", "ai_model"];

const VALID_STATUSES = ["draft", "review", "published"];

const VALID_AI_MODELS = [
  "kimi-k2.5",
  "kimi-k1.6",
  "gpt-4",
  "gpt-4-turbo",
  "gpt-4o",
  "claude-3.5-sonnet",
  "claude-3-opus",
  "claude-3.5-haiku",
  "gemini-pro",
  "gemini-ultra",
  "llama-3",
  "manual"
];

function isValidDate(dateStr: string): boolean {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateStr)) return false;
  
  const [year, month, day] = dateStr.split("-").map(Number);
  
  // Use UTC to avoid timezone issues
  const date = new Date(Date.UTC(year, month - 1, day));
  
  return date.getUTCFullYear() === year &&
         date.getUTCMonth() + 1 === month &&
         date.getUTCDate() === day;
}

function extractFrontmatter(content: string): { frontmatter: string | null; body: string } {
  const match = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  
  if (!match) {
    return { frontmatter: null, body: content };
  }
  
  return { frontmatter: match[1], body: match[2] };
}

function validateFrontmatter(filePath: string, content: string): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];
  
  const { frontmatter, body } = extractFrontmatter(content);
  
  if (!frontmatter) {
    errors.push({
      file: filePath,
      message: "Frontmatter ausente. O arquivo deve começar com '---' seguido de campos YAML.",
      severity: "error"
    });
    return { file: filePath, valid: false, errors, warnings };
  }
  
  let data: Record<string, unknown>;
  try {
    data = yaml.parse(frontmatter) as Record<string, unknown>;
  } catch (e) {
    errors.push({
      file: filePath,
      message: `YAML inválido: ${e.message}`,
      severity: "error"
    });
    return { file: filePath, valid: false, errors, warnings };
  }
  
  // Verificar campos obrigatórios
  for (const field of REQUIRED_FIELDS) {
    if (!(field in data) || data[field] === null || data[field] === undefined) {
      errors.push({
        file: filePath,
        field,
        message: `Campo obrigatório '${field}' ausente`,
        severity: "error"
      });
    } else if (data[field] === "" || (Array.isArray(data[field]) && (data[field] as unknown[]).length === 0)) {
      warnings.push({
        file: filePath,
        field,
        message: `Campo '${field}' está vazio`,
        severity: "warning"
      });
    }
  }
  
  // Validar formato de datas
  if (data.created_at && !isValidDate(String(data.created_at))) {
    errors.push({
      file: filePath,
      field: "created_at",
      message: `Data 'created_at' inválida. Use formato YYYY-MM-DD`,
      severity: "error"
    });
  }
  
  if (data.updated_at && !isValidDate(String(data.updated_at))) {
    errors.push({
      file: filePath,
      field: "updated_at",
      message: `Data 'updated_at' inválida. Use formato YYYY-MM-DD`,
      severity: "error"
    });
  }
  
  // Validar status
  if (data.status && !VALID_STATUSES.includes(String(data.status))) {
    errors.push({
      file: filePath,
      field: "status",
      message: `Status '${data.status}' inválido. Valores permitidos: ${VALID_STATUSES.join(", ")}`,
      severity: "error"
    });
  }
  
  // Validar tags
  if (data.tags !== undefined) {
    if (!Array.isArray(data.tags)) {
      errors.push({
        file: filePath,
        field: "tags",
        message: `Tags deve ser um array`,
        severity: "error"
      });
    } else {
      for (let i = 0; i < data.tags.length; i++) {
        const tag = data.tags[i];
        if (typeof tag !== "string") {
          errors.push({
            file: filePath,
            field: `tags[${i}]`,
            message: `Tag deve ser uma string`,
            severity: "error"
          });
        } else if (!/^[a-z0-9-]+$/.test(tag)) {
          warnings.push({
            file: filePath,
            field: `tags[${i}]`,
            message: `Tag '${tag}' deve usar kebab-case (minúsculas, números e hífens)`,
            severity: "warning"
          });
        }
      }
    }
  }
  
  // Validar ai_model
  if (data.ai_model && !VALID_AI_MODELS.includes(String(data.ai_model))) {
    warnings.push({
      file: filePath,
      field: "ai_model",
      message: `Modelo de IA '${data.ai_model}' não reconhecido. Modelos comuns: ${VALID_AI_MODELS.slice(0, 5).join(", ")}...`,
      severity: "warning"
    });
  }
  
  // Verificar se o arquivo tem conteúdo além do frontmatter
  if (!body.trim()) {
    warnings.push({
      file: filePath,
      message: "Arquivo parece estar vazio (apenas frontmatter)",
      severity: "warning"
    });
  }
  
  return {
    file: filePath,
    valid: errors.length === 0,
    errors,
    warnings,
    frontmatter: data
  };
}

async function validateFile(filePath: string): Promise<ValidationResult> {
  try {
    const content = await Deno.readTextFile(filePath);
    return validateFrontmatter(filePath, content);
  } catch (e) {
    return {
      file: filePath,
      valid: false,
      errors: [{
        file: filePath,
        message: `Erro ao ler arquivo: ${e.message}`,
        severity: "error"
      }],
      warnings: []
    };
  }
}

async function validateAll(docsPath: string): Promise<ValidationResult[]> {
  const results: ValidationResult[] = [];
  
  for await (const entry of walk(docsPath, { exts: [".md"] })) {
    if (entry.isFile) {
      const result = await validateFile(entry.path);
      results.push(result);
    }
  }
  
  return results;
}

function generateDefaultFrontmatter(filePath: string): string {
  const today = new Date().toISOString().split("T")[0];
  const fileName = filePath.split("/").pop()?.replace(".md", "") || "documento";
  const title = fileName
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  
  return `---
title: "${title}"
created_at: "${today}"
tags: []
status: "draft"
updated_at: "${today}"
ai_model: "manual"
---

`;
}

async function fixFile(filePath: string): Promise<boolean> {
  try {
    const content = await Deno.readTextFile(filePath);
    const { frontmatter, body } = extractFrontmatter(content);
    
    let data: Record<string, unknown>;
    const today = new Date().toISOString().split("T")[0];
    
    if (frontmatter) {
      try {
        data = yaml.parse(frontmatter) as Record<string, unknown>;
      } catch {
        data = {};
      }
    } else {
      data = {};
    }
    
    // Garantir campos obrigatórios
    if (!data.title) {
      const fileName = filePath.split("/").pop()?.replace(".md", "") || "documento";
      data.title = fileName
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }
    
    if (!data.created_at || !isValidDate(String(data.created_at))) {
      data.created_at = today;
    }
    
    if (!Array.isArray(data.tags)) {
      data.tags = [];
    }
    
    if (!data.status || !VALID_STATUSES.includes(String(data.status))) {
      data.status = "draft";
    }
    
    if (!data.updated_at || !isValidDate(String(data.updated_at))) {
      data.updated_at = today;
    }
    
    if (!data.ai_model) {
      data.ai_model = "manual";
    }
    
    const newFrontmatter = yaml.stringify(data).trim();
    const newContent = `---\n${newFrontmatter}\n---\n\n${body}`;
    
    await Deno.writeTextFile(filePath, newContent);
    return true;
  } catch (e) {
    console.error(`Erro ao corrigir ${filePath}:`, e.message);
    return false;
  }
}

function printReport(results: ValidationResult[], verbose = false): void {
  const valid = results.filter(r => r.valid && r.warnings.length === 0);
  const withWarnings = results.filter(r => r.valid && r.warnings.length > 0);
  const invalid = results.filter(r => !r.valid);
  
  console.log("\n" + "=".repeat(70));
  console.log("RELATÓRIO DE VALIDAÇÃO DE FRONTMATTER");
  console.log("=".repeat(70));
  
  console.log(`\n📊 Resumo:`);
  console.log(`   Total de arquivos: ${results.length}`);
  console.log(`   ✅ Válidos: ${valid.length}`);
  console.log(`   ⚠️  Válidos com avisos: ${withWarnings.length}`);
  console.log(`   ❌ Inválidos: ${invalid.length}`);
  
  if (invalid.length > 0) {
    console.log(`\n❌ Arquivos com erros:`);
    for (const result of invalid) {
      console.log(`\n   ${result.file}`);
      for (const error of result.errors) {
        const field = error.field ? `[${error.field}] ` : "";
        console.log(`      - ${field}${error.message}`);
      }
    }
  }
  
  if (withWarnings.length > 0 && verbose) {
    console.log(`\n⚠️  Arquivos com avisos:`);
    for (const result of withWarnings) {
      console.log(`\n   ${result.file}`);
      for (const warning of result.warnings) {
        const field = warning.field ? `[${warning.field}] ` : "";
        console.log(`      - ${field}${warning.message}`);
      }
    }
  }
  
  console.log("\n" + "=".repeat(70));
}

async function main() {
  const args = parseArgs(Deno.args, {
    boolean: ["all", "report", "fix", "strict", "help"],
    string: ["docs-path"],
    default: {
      "docs-path": "./docs"
    }
  });
  
  if (args.help || args._.length === 0 && !args.all) {
    console.log(`
Frontmatter Validator - Validação de frontmatter YAML em Markdown

Uso:
  fm-validate.ts <arquivo>           Validar arquivo específico
  fm-validate.ts --all               Validar todos os arquivos em docs/
  fm-validate.ts --all --report      Mostrar relatório detalhado
  fm-validate.ts --all --fix         Corrigir problemas automaticamente
  fm-validate.ts --all --strict      Falhar se houver qualquer erro

Opções:
  --all          Validar todos os arquivos .md
  --report       Mostrar relatório detalhado
  --fix          Corrigir problemas automaticamente
  --strict       Retornar código de erro se houver falhas
  --docs-path    Caminho para o diretório docs (padrão: ./docs)
  --help         Mostrar esta ajuda
`);
    Deno.exit(0);
  }
  
  let results: ValidationResult[] = [];
  
  if (args.all) {
    console.log(`🔍 Validando todos os arquivos em ${args["docs-path"]}...`);
    results = await validateAll(args["docs-path"]);
  } else {
    const filePath = String(args._[0]);
    console.log(`🔍 Validando ${filePath}...`);
    const result = await validateFile(filePath);
    results = [result];
  }
  
  if (args.fix) {
    console.log(`\n🔧 Corrigindo arquivos...`);
    let fixed = 0;
    for (const result of results) {
      if (!result.valid || result.warnings.length > 0) {
        if (await fixFile(result.file)) {
          fixed++;
          console.log(`   ✅ ${result.file}`);
        }
      }
    }
    console.log(`\n${fixed} arquivo(s) corrigido(s).`);
    
    // Revalidar após correção
    if (args.all) {
      results = await validateAll(args["docs-path"]);
    }
  }
  
  printReport(results, args.report);
  
  const hasErrors = results.some(r => !r.valid);
  if (hasErrors && args.strict) {
    Deno.exit(1);
  }
}

if (import.meta.main) {
  main();
}
