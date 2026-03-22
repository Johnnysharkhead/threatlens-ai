# AI Attack Vault

每日自动采集和分析AI相关网络攻击事件的知识库。

## 项目规范

- **输出语言**: 所有面向用户的内容必须使用中文
- **两类事件分类**:
  - `ai_powered_attack`: 利用AI进行的网络攻击
  - `attack_on_ai`: 针对LLM/Agent系统的攻击

## 数据约定

- 事件存储路径: `data/events/YYYY-MM-DD/evt-XXX.json`
- 事件ID格式: `YYYY-MM-DD-XXX` (如 `2026-03-22-001`)
- 去重注册表: `data/registry.json`
- 攻击链使用 Mermaid 语法定义

## 核心Skills

- `/collect` — 从互联网采集AI攻击事件，生成JSON stub
- `/analyze` — 对事件进行深度分析，填充完整schema
- `/build-site` — 构建Astro静态站点

## 技术栈

- 数据: JSON文件，git版本控制
- 前端: Astro + Tailwind CSS + Mermaid.js
- 字体: Noto Sans SC
- 部署: GitHub Pages
- 自动化: GitHub Actions + claude-code-action

## OWASP LLM Top 10 分类参考

1. LLM01 - Prompt Injection
2. LLM02 - Insecure Output Handling
3. LLM03 - Training Data Poisoning
4. LLM04 - Model Denial of Service
5. LLM05 - Supply Chain Vulnerabilities
6. LLM06 - Sensitive Information Disclosure
7. LLM07 - Insecure Plugin Design
8. LLM08 - Excessive Agency
9. LLM09 - Overreliance
10. LLM10 - Model Theft
