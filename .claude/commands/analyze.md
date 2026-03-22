# 深度分析AI攻击事件

你是一名资深网络安全分析师和AI安全专家。请对指定的攻击事件进行深度分析。

## 输入

$ARGUMENTS 指定要分析的事件，可以是：
- 事件ID（如 `2026-03-22-001`）
- 事件JSON文件路径
- `all` 表示分析所有status为"stub"的事件

## 执行步骤

### 1. 读取事件数据

从 `data/events/` 目录找到对应的事件JSON文件。如果传入 `all`，扫描所有日期目录下status为"stub"的事件。

### 2. 深入信息收集

使用 WebFetch 访问事件的 `sources` URL，获取详细报道内容。如有需要，使用 WebSearch 补充搜索更多来源。

### 3. 完成深度分析

按照以下结构填充完整分析（全部使用中文）：

#### 3.1 攻击概况 (overview)
```json
{
  "attacker": "攻击者身份或组织（已知/疑似/未知）",
  "target": "攻击目标（具体组织、系统或行业）",
  "economic_loss": "已知或估算的经济损失",
  "timeline": "事件关键时间线",
  "status": "已解决 | 调查中 | 持续中"
}
```

#### 3.2 攻击手法 (technique)
```json
{
  "vulnerabilities": ["被利用的具体漏洞或脆弱性"],
  "method": "攻击方法的详细技术描述",
  "owasp_classification": "对应的OWASP LLM Top 10分类（如LLM01 - Prompt Injection）",
  "tools_used": ["攻击中使用的工具或技术"],
  "sophistication": "low | medium | high | advanced"
}
```

#### 3.3 攻击链 (attack_chain)

构建完整的攻击链分析：

- `description`: 攻击链的文字概述
- `steps`: 按阶段分解，参考Cyber Kill Chain模型（侦察→武器化→投递→利用→安装→命令与控制→目标达成），但根据实际情况调整阶段
- `mermaid`: 生成Mermaid流程图代码，要求：
  - 使用 `graph TD`（从上到下）或 `graph LR`（从左到右）
  - 每个节点包含中文标签
  - 使用不同颜色区分阶段类型
  - 示例：
    ```
    graph TD
      A[🔍 侦察<br/>收集目标AI系统信息] --> B[⚔️ 武器化<br/>构造恶意prompt]
      B --> C[📧 投递<br/>通过API提交恶意输入]
      C --> D[💥 利用<br/>触发prompt injection]
      D --> E[🎯 目标达成<br/>窃取训练数据]
      style A fill:#e1f5fe
      style B fill:#fff3e0
      style C fill:#fce4ec
      style D fill:#f3e5f5
      style E fill:#ffebee
    ```

#### 3.4 启示分析 (lessons)
```json
{
  "ai_vulnerabilities": ["此事件暴露的AI特有脆弱性"],
  "ai_role": "AI在此次攻击中扮演的角色深度分析",
  "defense_recommendations": ["具体可行的防御建议"],
  "industry_impact": "对行业的影响和警示"
}
```

重点分析：
- 被利用的脆弱性是否是AI系统特有的？
- 如果是AI驱动的攻击，AI在其中具体扮演了什么角色？替代了人类的哪些能力？
- 传统防御手段是否有效？需要什么新的防御思路？

### 4. 更新事件JSON

将完整分析写回事件JSON文件，将 `status` 从 `"stub"` 更新为 `"analyzed"`。

### 5. 输出分析报告

以结构化的中文格式输出分析结果摘要，方便人类审阅。

## 质量要求

- 分析必须基于来源中的事实，不得臆测
- 如信息不足，明确标注"信息待补充"而非编造
- OWASP分类必须准确，如不适用则标注"N/A"
- Mermaid图表必须语法正确、可渲染
- 所有内容使用中文，技术术语可保留英文并附中文解释
