# 采集AI网络攻击事件

你是一个网络安全情报分析师。请从全球互联网（英文和中文来源）采集最新的AI相关真实网络攻击事件。

**重要**：搜索范围覆盖全球英文和中文信息源。采集到的事件信息保留原始语言细节，但所有面向用户的标题、摘要等字段使用中文输出。

## 采集范围

搜索两类事件：
1. **AI驱动的攻击** (`ai_powered_attack`): 攻击者利用AI/LLM技术实施的网络攻击（如AI生成钓鱼邮件、AI辅助漏洞利用、deepfake社工攻击、AI自动化渗透等）
2. **针对AI的攻击** (`attack_on_ai`): 针对LLM、Agent系统、AI服务的攻击（如prompt injection、模型投毒、越狱攻击、数据泄露、模型窃取、对抗样本攻击等）

## 执行步骤

### 1. 多关键词、多语言搜索

使用 WebSearch 工具，分批执行以下搜索（根据 $ARGUMENTS 可调整日期或主题）：

**英文搜索词**（覆盖主流安全媒体和资讯）:
- "AI cyberattack 2026"
- "AI-powered cyber attack incident"
- "LLM prompt injection attack real world"
- "AI-powered phishing attack"
- "deepfake cyber attack incident"
- "AI agent security breach"
- "ChatGPT jailbreak exploit incident"
- "LLM vulnerability exploit in the wild"
- "AI supply chain attack"
- "generative AI used in cyberattack"
- "AI model data breach"
- "adversarial attack on AI system"
- "AI copilot security vulnerability"
- "MCP server attack" OR "AI tool use exploit"

**中文搜索词**:
- "AI网络攻击事件 2026"
- "大模型安全漏洞 攻击"
- "AI钓鱼攻击 事件"
- "LLM越狱攻击事件"
- "AI智能体安全事件"
- "人工智能 网络安全事件"
- "深度伪造 攻击 事件"
- "大模型 prompt注入 真实案例"

**优先关注的信息来源**（搜索时可限定站点）:
- 英文: BleepingComputer, The Hacker News, KrebsOnSecurity, Dark Reading, SecurityWeek, Wired, Ars Technica, The Record, TechCrunch (security)
- 中文: FreeBuf, 安全客, 嘶吼, 36氪, 虎嗅, 量子位

### 2. 读取和筛选

对每个有价值的搜索结果，使用 WebFetch 获取详情。筛选标准：
- 必须是**真实发生的攻击事件**，不是研究论文或理论讨论
- 必须与AI/LLM/Agent相关
- 优先选择有具体细节的报道（攻击方、受害方、损失等）

### 3. 去重检查

读取 `data/registry.json`，对比已有事件标题，跳过重复事件。

### 4. 创建事件Stub

为每个新事件创建JSON文件到 `data/events/YYYY-MM-DD/` 目录，格式：

```json
{
  "id": "YYYY-MM-DD-XXX",
  "collected_at": "ISO时间戳",
  "category": "ai_powered_attack 或 attack_on_ai",
  "title": "事件标题（中文）",
  "summary": "一句话概述（中文）",
  "sources": [
    { "url": "来源URL", "title": "来源标题", "published": "发布日期" }
  ],
  "status": "stub"
}
```

### 5. 更新注册表

将新事件添加到 `data/registry.json`：

```json
{
  "events": {
    "事件标题关键词哈希": {
      "id": "事件ID",
      "title": "事件标题",
      "first_seen": "首次发现日期"
    }
  }
}
```

### 6. 输出报告

输出采集结果摘要，包括：
- 本次采集到的事件数量
- 每个事件的标题和分类
- 去重跳过的事件数量
- 建议下一步运行 `/analyze` 对哪些事件进行深度分析

## 注意事项

- 所有标题和摘要使用中文
- 如果搜索结果较少，扩大时间范围或调整关键词
- 确保来源URL真实有效
- $ARGUMENTS 可传入特定日期（如 "2026-03-20"）或主题（如 "prompt injection"）来聚焦搜索
