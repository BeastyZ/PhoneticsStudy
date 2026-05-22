# 英语音标学习教育网站 Spec

## Why

帮助英语学习者系统学习48个国际音标，解决发音不标准、无法区分英美发音的问题。通过互动式学习体验，让学习者能够直观地听辨和模仿标准发音。

## What Changes

- 创建完整的48个国际音标学习网站
- 实现元音(20个)和辅音(28个)的分类展示
- 提供英式和美式发音对比功能
- 实现点击即发音的交互功能
- 添加学习进度追踪功能
- 提供发音技巧和常见错误对照表

## Impact

- Affected specs: 英语发音学习
- Affected code:
  - index.html (主页面结构)
  - css/styles.css (样式文件)
  - js/phonemes.js (音标数据)
  - js/speech.js (发音功能)
  - js/app.js (应用逻辑)

## ADDED Requirements

### Requirement: 48个国际音标完整展示

系统应展示完整的48个英语国际音标，包括20个元音和28个辅音，按类别分组显示。

#### Scenario: 查看音标列表
- **WHEN** 用户进入网站首页
- **THEN** 显示元音/辅音切换标签，默认显示元音
- **AND** 展示所有20个元音音标卡片（或28个辅音）
- **AND** 每个卡片显示音标符号和子类别名称

### Requirement: 英美发音对比

每个音标应支持英式发音和美式发音两种模式。

#### Scenario: 播放音标发音
- **WHEN** 用户点击音标卡片打开详情弹窗
- **THEN** 显示该音标的大号符号
- **AND** 显示发音技巧说明
- **AND** 显示包含该音标的单词示例
- **AND** 用户可以点击"英音发音"或"美音发音"按钮
- **THEN** 系统使用 Web Speech API 播放对应口音的发音

### Requirement: 学习进度追踪

系统应自动记录用户学习过的音标数量。

#### Scenario: 记录学习进度
- **WHEN** 用户点击某个音标卡片
- **THEN** 该音标被标记为"已学习"
- **AND** 进度条更新显示已学习数量
- **AND** 进度保存到 LocalStorage

## MODIFIED Requirements

None

## REMOVED Requirements

None
