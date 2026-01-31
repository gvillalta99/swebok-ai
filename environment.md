# SWEBOK-AI v5.0 - Environment Scan

## INFRA
- **OS-Native**: Linux (Arch Linux) development environment
- **No Container**: No Dockerfile or docker-compose.yml found
- **Volume**: Standard filesystem - /home/gustavo/Documentos/swebok-ai
- **Git Repo**: Yes, workspace at `/home/gustavo/Documentos/swebok-ai`

## DOMAIN
- **Type**: Documentation project (MkDocs-based static site)
- **Purpose**: Software Engineering Body of Knowledge - AI Edition (SWEBOK-AI v5.0)
- **Language**: Portuguese (PT-BR)
- **Format**: Markdown (.md) files with YAML frontmatter
- **Output**: `site/` directory (generated, not versioned)

## STACK
- **Build System**: MkDocs (Python >=3.12)
- **Theme**: Material for MkDocs v9.5.50
- **Extensions**: 
  - admonition, footnotes, tables, toc
  - pymdownx.details, pymdownx.superfences
- **Plugins**: search, mkdocs-exporter (PDF generation)
- **Additional**: docling>=2.70.0, playwright==1.49.1
- **No DB**: Static documentation site
- **No Auth**: Public documentation

## PROJECT STRUCTURE
```
docs/
├── 00-introduction/              # 6 sections (COMPLETE)
├── 01-software-requirements/     # 7 sections (COMPLETE)
├── 02-software-architecture/     # 9 sections (COMPLETE)
├── 03-software-design/           # 8 sections (TO VERIFY)
├── 04-software-construction/     # 6 sections (TO VERIFY)
├── 05-software-testing/          # 6 sections (TO VERIFY)
├── 06-software-engineering-operations/  # 6 sections (TO VERIFY)
├── 07-software-maintenance/      # 5 sections (TO VERIFY)
├── 08-software-configuration-management/  # 4 sections (TO VERIFY)
├── 09-software-engineering-management/    # 2 sections (TO VERIFY)
├── 10-software-engineering-process/       # 2 sections (TO VERIFY)
├── 11-software-engineering-models-and-methods/  # 2 sections (TO VERIFY)
├── 12-software-quality/          # 2 sections (TO VERIFY)
├── 13-software-security/         # 2 sections (TO VERIFY)
├── 14-software-engineering-professional-practice/  # 3 sections (TO VERIFY)
├── 15-software-engineering-economics/     # 2 sections (TO VERIFY)
├── 16-computing-foundations/     # 2 sections (TO VERIFY)
├── 17-mathematical-foundations/  # 2 sections (TO VERIFY)
├── 18-engineering-foundations/   # 2 sections (TO VERIFY)
├── 19-appendix/                  # Appendix
├── XX-meta/                      # Meta documentation
└── XX-ideais/                    # Initial concepts
```

## CONTENT STANDARDS
- **Frontmatter Required**: title, created_at, tags, status, updated_at, ai_model
- **Structure**: Overview, Learning Objectives, Content Sections, Practical Considerations, Summary, References
- **Matriz de Avaliação**: Required in all sections (3 criteria table)
  - Descartabilidade Geracional
  - Custo de Verificação
  - Responsabilidade Legal
- **References**: ABNT 2023-2025 format

## BUILD COMMANDS
```bash
# Install dependencies
pip install mkdocs mkdocs-material mkdocs-exporter

# Serve locally (hot reload)
mkdocs serve

# Build site
mkdocs build

# Deploy to GitHub Pages
mkdocs gh-deploy
```

## PARALLEL SECTIONS DAG
Total tasks: 60 sections to validate/create across 18 KAs (Knowledge Areas)

### Parallel Groups:
- **g00_intro**: 5 sections (t00_sec02-06) - Introduction KA
- **g01_req**: 6 sections (t01_sec02-07) - Requirements KA
- **g02_arch**: 7 sections (t02_sec02-08) - Architecture KA
- **g03_design**: 7 sections (t03_sec02-08) - Design KA
- **g04_construction**: 5 sections (t04_sec02-06) - Construction KA
- **g05_testing**: 5 sections (t05_sec02-06) - Testing KA
- **g06_operations**: 5 sections (t06_sec02-06) - Operations KA
- **g07_maintenance**: 4 sections (t07_sec02-05) - Maintenance KA
- **g08_scm**: 3 sections (t08_sec02-04) - SCM KA
- **g09_management**: 1 section (t09_sec02) - Management KA
- **g10_process**: 1 section (t10_sec02) - Process KA
- **g11_models**: 1 section (t11_sec02) - Models & Methods KA
- **g12_quality**: 1 section (t12_sec02) - Quality KA
- **g13_security**: 1 section (t13_sec02) - Security KA
- **g14_professional**: 2 sections (t14_sec02, t14_sec025) - Professional Practice KA
- **g15_economics**: 1 section (t15_sec02) - Economics KA
- **g16_computing**: 1 section (t16_sec02) - Computing Foundations KA
- **g17_math**: 1 section (t17_sec02) - Mathematical Foundations KA
- **g18_engineering**: 1 section (t18_sec02) - Engineering Foundations KA

### Final Validation:
- **t_final_validation**: Depends on all 60 sections

## CURRENT STATUS
- **KA 00 (Introduction)**: 6/6 sections exist and complete
- **KA 01 (Requirements)**: 7/7 sections exist and complete
- **KA 02 (Architecture)**: 9/9 sections exist and complete
- **KAs 03-18**: Need verification and potential completion

## KEY FILES
- `mkdocs.yml`: Site configuration
- `README.md`: Project overview
- `AGENTS.md`: Agent guidelines
- `book-writer.md`: Writer agent configuration
- `parallel_sections_dag.json`: Task definitions for parallel execution
- `environment.md`: This file

## EXECUTION PHASES
- Phase 1: Environment Scan (COMPLETE)
- Phase 2: Planning with Architect (NEXT)
- Phase 3: Execute with Builders
- Phase 4: Verify with Inspector
- Phase 5: Complete
