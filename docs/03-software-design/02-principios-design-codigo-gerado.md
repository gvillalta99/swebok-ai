---
title: "02. Princípios de Design para Código Gerado"
created_at: "2025-01-31"
tags: ["software-design", "principios", "solid", "codigo-gerado", "verificacao"]
status: "draft"
updated_at: "2025-01-31"
ai_model: "kimi-k2.5"
---

# 02. Princípios de Design para Código Gerado

## Overview

Os princípios clássicos de design de software — SOLID, DRY, KISS — foram formulados para código escrito por humanos. Na era dos LLMs, estes princípios precisam ser reconfigurados para lidar com as características únicas do código gerado por IA: não-determinismo, variabilidade de estilo, alucinações e débito técnico invisível.

Esta seção apresenta uma adaptação dos princípios fundamentais de design para o contexto de sistemas híbridos, onde código gerado por IA coexiste com código determinístico escrito por humanos.

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:

1. Adaptar os princípios SOLID para avaliar código gerado por IA
2. Aplicar princípios de design que priorizam verificabilidade
3. Identificar anti-padrões específicos de código gerado
4. Estabelecer contratos claros entre componentes humanos e de IA

## Reconfigurando os Princípios SOLID

### S — Single Responsibility Principle (SRP)

**Versão Tradicional**: Uma classe deve ter um, e apenas um, motivo para mudar.

**Versão para Código Gerado**: Cada componente gerado deve ter uma responsabilidade única e verificável, com testes que comprovam essa responsabilidade independentemente de como o código foi gerado.

```python
# ANTI-PADRÃO: Código gerado com múltiplas responsabilidades
class UserManager:
    def create_user(self, data):
        # Valida dados
        # Salva no banco
        # Envia email
        # Registra log
        pass

# PRÁTICA RECOMENDADA: Responsabilidades separadas
class UserValidator:
    def validate(self, data): pass

class UserRepository:
    def save(self, user): pass

class EmailService:
    def send_welcome(self, user): pass
```

**Justificativa**: Código gerado tende a acumular funcionalidades em um único bloco. A separação explícita facilita a verificação e permite substituir componentes gerados por implementações manuais quando necessário.

### O — Open/Closed Principle (OCP)

**Versão Tradicional**: Entidades devem estar abertas para extensão, mas fechadas para modificação.

**Versão para Código Gerado**: Componentes devem ser projetados para aceitar variações geradas sem modificação do núcleo determinístico.

```python
# Estratégia de extensão para código gerado
from abc import ABC, abstractmethod

class PaymentProcessor(ABC):
    @abstractmethod
    def process(self, amount): pass

# Implementações podem ser geradas ou manuais
class StripeProcessor(PaymentProcessor):
    def process(self, amount): 
        # Código gerado ou manual
        pass

class PayPalProcessor(PaymentProcessor):
    def process(self, amount):
        # Código gerado ou manual
        pass
```

**Justificativa**: O OCP permite que novas implementações geradas sejam integradas sem risco ao código existente, desde que respeitem o contrato estabelecido.

### L — Liskov Substitution Principle (LSP)

**Versão Tradicional**: Objetos de uma classe derivada devem poder substituir objetos da classe base sem alterar a correção do programa.

**Versão para Código Gerado**: Implementações geradas devem ser substituíveis por implementações manuais (e vice-versa) sem violação de contratos.

**Verificação**: Para cada implementação gerada, deve existir:
- Testes de contrato que validam pré-condições e pós-condições
- Verificação de invariantes de classe
- Testes de comportamento equivalente entre implementações

### I — Interface Segregation Principle (ISP)

**Versão Tradicional**: Clientes não devem ser forçados a depender de interfaces que não utilizam.

**Versão para Código Gerado**: Interfaces devem ser granulares o suficiente para permitir geração parcial e verificação incremental.

```python
# Interface grande (difícil de gerar e verificar)
class IUserService:
    def create_user(self): pass
    def delete_user(self): pass
    def update_profile(self): pass
    def change_password(self): pass
    def list_users(self): pass
    def search_users(self): pass
    def export_data(self): pass

# Interfaces granulares (fáceis de gerar e verificar)
class IUserCreator:
    def create_user(self): pass

class IUserDeleter:
    def delete_user(self): pass

class IUserSearcher:
    def search_users(self): pass
```

### D — Dependency Inversion Principle (DIP)

**Versão Tradicional**: Dependa de abstrações, não de implementações concretas.

**Versão para Código Gerado**: O código de alto nível deve depender de abstrações que isolam o não-determinismo do código gerado.

```python
# Código gerado encapsulado atrás de abstração
class CodeGenerator:
    def generate(self, spec: Specification) -> Implementation:
        # Geração não-determinística
        pass

class DeterministicService:
    def __init__(self, generator: CodeGenerator):
        self._generator = generator
        self._implementation = None
    
    def initialize(self, spec):
        # Geração isolada
        self._implementation = self._generator.generate(spec)
        # Validação obrigatória
        self._validate_implementation()
```

## Princípios Adicionais para Código Gerado

### V — Verificability First

**Princípio**: O design deve priorizar a facilidade de verificação sobre a elegância do código.

**Práticas**:
- Cada componente gerado deve ter critérios de aceitação objetivos
- Interfaces devem permitir injeção de mocks para testes
- Estado interno deve ser observável para debugging

### P — Prompt as Specification

**Princípio**: Tratar prompts como especificações formais que devem ser versionadas, testadas e validadas.

**Práticas**:
- Versionar prompts junto com o código
- Testar prompts com múltiplas amostras
- Documentar suposições e contexto do prompt

### C — Contract Explicitness

**Princípio**: Contratos entre componentes devem ser explícitos, verificáveis e independentes da origem do código.

**Práticas**:
- Usar Design by Contract (pré/pós-condições)
- Definir invariantes claros
- Documentar comportamentos esperados e limites

## Anti-Padrões em Código Gerado

Segundo pesquisa de Gao et al. (2025) sobre bugs em código gerado por IA [1], os seguintes anti-padrões são comuns:

### 1. Alucinação de APIs

O modelo gera chamadas para APIs que não existem ou com assinaturas incorretas.

**Mitigação**: Verificação estática obrigatória e testes de compilação.

### 2. Lógica de Controle Superficial

Código que lida apenas com casos felizes, ignorando edge cases.

**Mitigação**: Geração com foco em casos de teste de boundary.

### 3. Duplicação de Código

Pesquisa do GitClear (2025) indica crescimento de 4x na duplicação de código gerado por IA [2].

**Mitigação**: Análise estática pós-geração e refatoração assistida.

### 4. Inconsistência de Estilo

Diferentes sessões de geração produzem código com estilos inconsistentes.

**Mitigação**: Uso de linters e formatadores automatizados.

### 5. Débito Técnico Invisível

Código que funciona mas é difícil de manter ou estender.

**Mitigação**: Métricas de complexidade ciclomática e análise de acoplamento.

## Design by Contract para Sistemas Híbridos

O Design by Contract (DbC), popularizado por Eiffel, torna-se essencial quando integrando código gerado:

```python
class Contract:
    @staticmethod
    def requires(condition, message):
        if not condition:
            raise PreconditionViolation(message)
    
    @staticmethod
    def ensures(condition, message):
        if not condition:
            raise PostconditionViolation(message)

class ServiceWithContract:
    def process(self, data):
        # Pré-condição
        Contract.requires(data is not None, "Data cannot be None")
        Contract.requires(len(data) > 0, "Data cannot be empty")
        
        result = self._implementation.process(data)
        
        # Pós-condição
        Contract.requires(result is not None, "Result cannot be None")
        
        return result
```

## Practical Considerations

### Aplicações Reais

1. **Microserviços**: Cada serviço pode ter componentes gerados, mas interfaces bem definidas
2. **APIs**: Contratos OpenAPI/Swagger servem como especificações para geração
3. **Testes**: Geração de testes automatizados baseados em especificações

### Limitações

- **Overhead de Verificação**: Contratos adicionam complexidade e overhead de runtime
- **Custo de Implementação**: Design by Contract requer disciplina adicional
- **Curva de Aprendizado**: Equipes precisam adaptar-se aos novos princípios

### Melhores Práticas

1. Começar com princípios SOLID tradicionais e gradualmente adicionar verificações
2. Usar ferramentas de análise estática automatizada
3. Estabelecer "gates" de qualidade antes de aceitar código gerado
4. Documentar decisões de design e trade-offs explicitamente

## Summary

- Princípios SOLID precisam ser adaptados para priorizar verificabilidade
- Novos princípios (V, P, C) complementam os tradicionais
- Anti-padrões específicos de código gerado exigem vigilância constante
- Design by Contract fornece segurança na integração de código gerado
- O custo de verificação deve ser considerado desde o início do design

## Matriz de Avaliação Consolidada

| Critério | Descrição | Avaliação |
|----------|-----------|-----------|
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses? | Baixa — princípios fundamentais permanecem relevantes |
| **Custo de Verificação** | Quanto custa validar esta atividade quando feita por IA? | Médio — verificação de princípios pode ser parcialmente automatizada |
| **Responsabilidade Legal** | Quem é culpado se falhar? | Moderada — violações de princípios podem ser detectadas em review |

## References

1. Gao, R.; Tahir, A.; Liang, P.; Susnjak, T.; Khomh, F. "A Survey of Bugs in AI-Generated Code." arXiv:2512.05239, 2025. https://arxiv.org/abs/2512.05239

2. GitClear. "AI Copilot Code Quality: 2025 Data Suggests 4x Growth in Code Clones." GitClear Research, 2025. https://www.gitclear.com/ai_assistant_code_quality_2025_research

3. Martin, R. C. "Clean Architecture: A Craftsman's Guide to Software Structure and Design." Prentice Hall, 2017.

4. Meyer, B. "Object-Oriented Software Construction." Prentice Hall, 1997.

5. Evans, E. "Domain-Driven Design: Tackling Complexity in the Heart of Software." Addison-Wesley, 2003.
