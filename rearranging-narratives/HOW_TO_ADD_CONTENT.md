# 如何添加图片和文字内容

## 📁 文件组织结构

```
rearranging-narratives/
├── src/
│   ├── assets/
│   │   └── images/           ← 把你的图片放这里
│   │       ├── sample-01.svg
│   │       ├── sample-02.svg
│   │       └── ...
│   └── data/
│       └── sampleImages.ts   ← 在这里编辑文字和元数据
```

## 🖼️ 添加图片

### 步骤 1：准备图片文件

把你的图片文件放入 `src/assets/images/` 文件夹。

**图片要求：**
- 格式：建议 SVG、PNG 或 JPG
- 命名：使用简单的英文名称，例如：
  - `fragment-01.svg`
  - `character-alice.png`
  - `scene-opening.jpg`
- 风格：黑白图片（符合项目的单色设计）

**示例：**
```
src/assets/images/
├── fragment-01.svg
├── fragment-02.png
├── character-hero.jpg
└── scene-finale.svg
```

## ✍️ 添加文字和元数据

### 步骤 2：编辑数据文件

打开 `src/data/sampleImages.ts` 文件，按照以下格式添加你的内容：

```typescript
export const sampleImages: ImageFragment[] = [
  {
    id: 'fragment-01',                    // 唯一ID（不要重复）
    title: '开场',                         // 显示的标题
    role: 'scene',                        // 角色类型：'scene'（场景）/'character'（角色）/'fragment'（片段）
    imagePath: '/src/assets/images/fragment-01.svg',  // 图片路径
    tags: ['开场', '黑白'],                // 标签（可选）
    description: '故事的开始，一个空荡的房间',  // 描述文字
  },
  {
    id: 'character-alice',
    title: 'Alice',
    role: 'character',
    imagePath: '/src/assets/images/character-alice.png',
    tags: ['主角', '女性'],
    description: '故事的主角，一个寻找真相的女孩',
  },
  // 添加更多片段...
];
```

### 字段说明

| 字段 | 必填 | 说明 | 示例 |
|-----|------|-----|------|
| `id` | ✅ | 唯一标识符（不能重复） | `'fragment-01'`, `'char-hero'` |
| `title` | ✅ | 卡片标题 | `'开场'`, `'Alice'` |
| `role` | ❌ | 类型/角色 | `'scene'`, `'character'`, `'fragment'` |
| `imagePath` | ✅ | 图片路径 | `'/src/assets/images/xxx.svg'` |
| `tags` | ❌ | 标签数组 | `['开场', '黑白', '空旷']` |
| `description` | ❌ | 详细描述 | `'故事的开始...'` |

## 🎯 完整示例

假设你想添加一个新的场景"雨中对话"：

### 1. 添加图片
把 `rain-dialogue.png` 放入 `src/assets/images/` 文件夹

### 2. 编辑 sampleImages.ts
```typescript
{
  id: 'scene-rain-dialogue',
  title: '雨中对话',
  role: 'scene',
  imagePath: '/src/assets/images/rain-dialogue.png',
  tags: ['雨天', '对话', '转折'],
  description: '两个人物在雨中的关键对话，揭示了故事的转折点',
}
```

## 💡 提示

1. **图片路径格式**：始终使用 `/src/assets/images/文件名`
2. **ID命名建议**：使用 `类型-名称` 格式，如 `scene-01`, `character-alice`
3. **保持一致性**：如果用中文标题，就统一用中文；如果用英文，就统一用英文
4. **测试**：添加后运行 `npm run dev` 查看效果

## 🔄 快速替换所有内容

如果你想完全替换示例内容：

1. 删除 `src/assets/images/` 中的 `sample-*.svg` 文件
2. 添加你自己的图片
3. 打开 `src/data/sampleImages.ts`
4. 删除所有示例数据，添加你的数据
5. 保存文件，刷新浏览器

## ❓ 遇到问题？

- **图片不显示**：检查路径是否正确，文件是否存在
- **数据不更新**：尝试刷新浏览器（Ctrl+Shift+R / Cmd+Shift+R）
- **格式错误**：检查 TypeScript 语法，确保每个对象用逗号分隔
