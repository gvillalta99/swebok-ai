# 8.2 Versionamento de Artefatos de IA

## Overview

O versionamento de artefatos de IA (prompts, configurações, modelos) requer abordagens especializadas que vão além do versionamento tradicional de código-fonte. Estes artefatos têm características únicas: são altamente parametrizáveis, sensíveis a pequenas mudanças e difíceis de comparar semanticamente.

## Versionamento Semântico para Prompts

```python
class SemanticPromptVersioning:
    """
    Versionamento semântico adaptado para prompts
    """
    
    def calculate_version_change(self, old_prompt, new_prompt):
        """
        Calcula tipo de mudança de versão
        """
        # Analisar mudanças
        content_diff = self.diff_content(old_prompt, new_prompt)
        
        # MAJOR: Mudança que altera comportamento fundamental
        if self.is_breaking_change(content_diff):
            return VersionChange.MAJOR
        
        # MINOR: Nova funcionalidade, backward compatible
        elif self.adds_capability(content_diff):
            return VersionChange.MINOR
        
        # PATCH: Correção, clarificação
        else:
            return VersionChange.PATCH
    
    def is_breaking_change(self, diff):
        """
        Detecta se mudança quebra compatibilidade
        """
        breaking_indicators = [
            'removed_required_field',
            'changed_output_format',
            'altered_core_logic',
            'removed_capability'
        ]
        
        return any(ind in diff.tags for ind in breaking_indicators)
```

## Gestão de Baselines

```python
class BaselineManager:
    """
    Gestão de baselines para sistemas híbridos
    """
    
    def create_baseline(self, components, label):
        """
        Cria baseline de sistema
        """
        baseline = {
            'label': label,
            'timestamp': datetime.utcnow(),
            'components': {}
        }
        
        for component in components:
            baseline['components'][component.name] = {
                'code_version': component.code_version,
                'prompt_version': component.prompt_version,
                'model_config_version': component.model_config_version,
                'dependencies': component.dependencies
            }
        
        return self.store_baseline(baseline)
    
    def compare_baselines(self, baseline_a, baseline_b):
        """
        Compara duas baselines
        """
        differences = []
        
        all_components = set(baseline_a['components'].keys()) | \
                        set(baseline_b['components'].keys())
        
        for component in all_components:
            comp_a = baseline_a['components'].get(component)
            comp_b = baseline_b['components'].get(component)
            
            if not comp_a:
                differences.append(f"{component}: adicionado")
            elif not comp_b:
                differences.append(f"{component}: removido")
            elif comp_a != comp_b:
                differences.append(
                    f"{component}: alterado "
                    f"({comp_a} -> {comp_b})"
                )
        
        return differences
```

## Summary

- **Semântico:** Prompts seguem versionamento semântico adaptado
- **Baselines:** Capturar estado completo do sistema em pontos no tempo
- **Comparação:** Ferramentas para comparar baselines e detectar mudanças

## References

1. Preston-Werner, T. (2013). *Semantic Versioning 2.0.0*. semver.org.

2. Berczuk, S. P. (2002). *Software Configuration Management Patterns*.
