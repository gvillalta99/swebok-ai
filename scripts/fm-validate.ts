#!/usr/bin/env -S deno run --allow-read --allow-write

/**
 * Frontmatter batch validator/fixer for SWEBOK-AI.
 *
 * Scope:
 * - Validate all Markdown files under docs/ (recursive)
 * - Exclude files named README.md and PLAN.md
 * - Optionally fix safe issues (missing fields, invalid dates/status, tags type)
 */

import { parseArgs } from "https://deno.land/std@0.220.0/cli/parse_args.ts";
import { walk } from "https://deno.land/std@0.220.0/fs/walk.ts";
import * as yaml from "https://deno.land/std@0.220.0/yaml/mod.ts";

type Severity = "error" | "warning";

type ValidationIssue = {
  file: string;
  field?: string;
  message: string;
  severity: Severity;
};

type ValidationResult = {
  file: string;
  valid: boolean;
  errors: ValidationIssue[];
  warnings: ValidationIssue[];
};

const REQUIRED_FIELDS = ["title", "created_at", "tags", "status", "updated_at", "ai_model"] as const;
const VALID_STATUSES = ["draft", "review", "published"] as const;

const DEFAULT_AI_MODEL = "openai/gpt-5.2";

function isValidDate(dateStr: string): boolean {
  const m = /^\d{4}-\d{2}-\d{2}$/.exec(dateStr);
  if (!m) return false;
  const [year, month, day] = dateStr.split("-").map((n) => Number(n));
  const d = new Date(Date.UTC(year, month - 1, day));
  return d.getUTCFullYear() === year &&
    d.getUTCMonth() + 1 === month &&
    d.getUTCDate() === day;
}

function todayISO(): string {
  return new Date().toISOString().split("T")[0];
}

function shouldSkip(filePath: string): boolean {
  const base = filePath.split("/").pop() ?? "";
  return base === "README.md" || base === "PLAN.md";
}

function extractFrontmatter(content: string): { frontmatter: string | null; body: string } {
  const match = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  if (!match) return { frontmatter: null, body: content };
  return { frontmatter: match[1], body: match[2] };
}

function firstH1(body: string): string | null {
  for (const line of body.split("\n")) {
    const m = /^#\s+(.+?)\s*$/.exec(line.trim());
    if (m) return m[1];
  }
  return null;
}

function titleFromFilename(filePath: string): string {
  const name = (filePath.split("/").pop() ?? "documento").replace(/\.md$/i, "");
  return name
    .split("-")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function normalizeTag(tag: string): string {
  // remove diacritics, keep ascii lowercase kebab-case
  let t = tag.normalize("NFD").replace(/\p{Diacritic}+/gu, "");
  t = t.toLowerCase();
  t = t.replace(/[\s_]+/g, "-");
  t = t.replace(/[^a-z0-9-]/g, "-");
  t = t.replace(/-+/g, "-").replace(/^-|-$/g, "");
  return t;
}

function validateFrontmatter(filePath: string, content: string): ValidationResult {
  const errors: ValidationIssue[] = [];
  const warnings: ValidationIssue[] = [];

  const { frontmatter, body } = extractFrontmatter(content);
  if (!frontmatter) {
    errors.push({
      file: filePath,
      message: "Missing YAML frontmatter (expected file to start with '---').",
      severity: "error",
    });
    return { file: filePath, valid: false, errors, warnings };
  }

  let data: Record<string, unknown>;
  try {
    data = yaml.parse(frontmatter) as Record<string, unknown>;
  } catch (e) {
    errors.push({
      file: filePath,
      message: `Invalid YAML frontmatter: ${e.message}`,
      severity: "error",
    });
    return { file: filePath, valid: false, errors, warnings };
  }

  for (const field of REQUIRED_FIELDS) {
    if (!(field in data) || data[field] === null || data[field] === undefined) {
      errors.push({
        file: filePath,
        field,
        message: `Missing required field '${field}'.`,
        severity: "error",
      });
    }
  }

  if (data.created_at && !isValidDate(String(data.created_at))) {
    errors.push({
      file: filePath,
      field: "created_at",
      message: "Invalid created_at date (expected YYYY-MM-DD).",
      severity: "error",
    });
  }
  if (data.updated_at && !isValidDate(String(data.updated_at))) {
    errors.push({
      file: filePath,
      field: "updated_at",
      message: "Invalid updated_at date (expected YYYY-MM-DD).",
      severity: "error",
    });
  }

  if (data.status && !VALID_STATUSES.includes(String(data.status) as (typeof VALID_STATUSES)[number])) {
    errors.push({
      file: filePath,
      field: "status",
      message: `Invalid status '${data.status}' (allowed: ${VALID_STATUSES.join(", ")}).`,
      severity: "error",
    });
  }

  if (data.tags !== undefined) {
    if (!Array.isArray(data.tags)) {
      errors.push({
        file: filePath,
        field: "tags",
        message: "tags must be an array.",
        severity: "error",
      });
    } else {
      for (let i = 0; i < data.tags.length; i++) {
        const tag = data.tags[i];
        if (typeof tag !== "string") {
          errors.push({
            file: filePath,
            field: `tags[${i}]`,
            message: "tag must be a string.",
            severity: "error",
          });
          continue;
        }
        const norm = normalizeTag(tag);
        if (norm !== tag) {
          warnings.push({
            file: filePath,
            field: `tags[${i}]`,
            message: `tag '${tag}' is not normalized kebab-case (suggest '${norm}').`,
            severity: "warning",
          });
        }
      }
    }
  }

  if (!body.trim()) {
    warnings.push({ file: filePath, message: "File body is empty after frontmatter.", severity: "warning" });
  }

  return { file: filePath, valid: errors.length === 0, errors, warnings };
}

async function fixFile(filePath: string, content: string): Promise<string> {
  const { frontmatter, body } = extractFrontmatter(content);
  const today = todayISO();

  let data: Record<string, unknown> = {};
  if (frontmatter) {
    try {
      data = yaml.parse(frontmatter) as Record<string, unknown>;
    } catch {
      data = {};
    }
  }

  if (!data.title || String(data.title).trim() === "") {
    data.title = firstH1(body) ?? titleFromFilename(filePath);
  }

  if (!data.created_at || !isValidDate(String(data.created_at))) {
    data.created_at = today;
  }

  if (!Array.isArray(data.tags)) {
    data.tags = [];
  } else {
    data.tags = (data.tags as unknown[])
      .filter((t) => typeof t === "string")
      .map((t) => normalizeTag(t as string))
      .filter((t) => t.length > 0);
  }

  if (!data.status || !VALID_STATUSES.includes(String(data.status) as (typeof VALID_STATUSES)[number])) {
    data.status = "draft";
  }

  if (!data.updated_at || !isValidDate(String(data.updated_at))) {
    data.updated_at = today;
  }

  if (!data.ai_model || String(data.ai_model).trim() === "") {
    data.ai_model = DEFAULT_AI_MODEL;
  }

  const newFm = yaml.stringify(data).trim();
  const newBody = body.replace(/^\s+/, "");
  return `---\n${newFm}\n---\n\n${newBody}`;
}

async function listMarkdownFiles(docsPath: string): Promise<string[]> {
  const files: string[] = [];
  for await (const entry of walk(docsPath, { exts: [".md"], includeDirs: false })) {
    if (!entry.isFile) continue;
    if (shouldSkip(entry.path)) continue;
    files.push(entry.path);
  }
  files.sort();
  return files;
}

function printResults(results: ValidationResult[], showWarnings: boolean): void {
  const invalid = results.filter((r) => !r.valid);
  const warned = results.filter((r) => r.valid && r.warnings.length > 0);
  const clean = results.filter((r) => r.valid && r.warnings.length === 0);

  console.log("FRONTMATTER REPORT");
  console.log(`files=${results.length} valid=${clean.length} valid_with_warnings=${warned.length} invalid=${invalid.length}`);

  if (invalid.length) {
    console.log("\nINVALID FILES:");
    for (const r of invalid) {
      console.log(r.file);
      for (const e of r.errors) {
        console.log(`  - ${e.field ? `[${e.field}] ` : ""}${e.message}`);
      }
    }
  }

  if (showWarnings && warned.length) {
    console.log("\nWARNINGS:");
    for (const r of warned) {
      console.log(r.file);
      for (const w of r.warnings) {
        console.log(`  - ${w.field ? `[${w.field}] ` : ""}${w.message}`);
      }
    }
  }
}

async function main() {
  const args = parseArgs(Deno.args, {
    boolean: ["fix", "report", "strict", "help"],
    string: ["docs-path"],
    default: { "docs-path": "./docs" },
  });

  if (args.help) {
    console.log(`Usage:
  deno run --allow-read --allow-write scripts/fm-validate.ts [--docs-path ./docs] [--fix] [--report] [--strict]

Options:
  --docs-path  Docs directory to scan (default: ./docs)
  --fix        Apply safe fixes in-place
  --report     Print warnings in addition to errors
  --strict     Exit 1 if any invalid file remains
`);
    Deno.exit(0);
  }

  const docsPath = String(args["docs-path"]);
  const files = await listMarkdownFiles(docsPath);
  const initialResults: ValidationResult[] = [];

  for (const file of files) {
    const content = await Deno.readTextFile(file);
    initialResults.push(validateFrontmatter(file, content));
  }

  if (args.fix) {
    let changed = 0;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const content = await Deno.readTextFile(file);
      const r = validateFrontmatter(file, content);
      if (r.valid && r.warnings.length === 0) continue;
      const next = await fixFile(file, content);
      if (next !== content) {
        await Deno.writeTextFile(file, next);
        changed++;
      }
    }
    console.log(`fixed_files=${changed}`);
  }

  const finalResults: ValidationResult[] = [];
  for (const file of files) {
    const content = await Deno.readTextFile(file);
    finalResults.push(validateFrontmatter(file, content));
  }

  printResults(finalResults, Boolean(args.report));

  if (args.strict && finalResults.some((r) => !r.valid)) {
    Deno.exit(1);
  }
}

if (import.meta.main) {
  main();
}
