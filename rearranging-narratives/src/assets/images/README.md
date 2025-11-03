# 📁 图片文件夹

把你的图片文件放在这里！

## 快速开始

1. **添加图片**：直接拖拽或复制你的图片到这个文件夹
2. **命名规则**：使用简单的英文名称，如 `scene-01.png`, `character-alice.jpg`
3. **更新数据**：在 `src/data/sampleImages.ts` 中添加对应的文字和元数据

## 图片要求

### 格式
- ✅ **SVG** - 推荐！矢量图，缩放不失真，文件小
- ✅ **PNG** - 支持透明背景
- ✅ **JPG** - 适合照片
- ✅ **WebP** - 现代格式，压缩率高

### 风格
- **黑白/单色** - 符合项目的"Print-Lab Noir"视觉风格
- **高对比度** - 清晰的黑白对比
- **简洁** - 避免过于复杂的细节

### 尺寸建议
- **宽度**：800-1200px（适合网页显示）
- **高度**：600-1000px
- **比例**：1:1 (方形) 或 4:3 都可以

## 示例命名

```
✅ 好的命名：
  scene-opening.svg
  character-alice.png
  fragment-01.jpg
  memory-rain.webp

❌ 避免的命名：
  IMG_1234.jpg        (没有意义)
  我的图片.png        (使用中文)
  scene opening.svg   (包含空格)
```

## 文件路径

添加图片后，在 `sampleImages.ts` 中使用这个格式引用：

```typescript
imagePath: '/src/assets/images/你的文件名.png'
```

## 完整流程示例

假设你要添加一个新场景"雨中对话"：

1. **准备图片**：`rain-scene.png`
2. **放入此文件夹**：`src/assets/images/rain-scene.png`
3. **编辑数据**：打开 `src/data/sampleImages.ts`，添加：
   ```typescript
   {
     id: 'scene-rain',
     title: '雨中对话',
     role: 'scene',
     imagePath: '/src/assets/images/rain-scene.png',
     description: '两个人在雨中的重要对话',
   }
   ```

## 当前文件

此文件夹当前包含示例 SVG 图片（sample-01.svg ~ sample-05.svg）。
你可以：
- 保留它们作为参考
- 或者删除并替换为你自己的图片

---

💡 **提示**：如果图片不显示，检查：
1. 文件名是否正确（区分大小写）
2. 路径是否以 `/src/assets/images/` 开头
3. 浏览器是否需要刷新（Ctrl+Shift+R）
