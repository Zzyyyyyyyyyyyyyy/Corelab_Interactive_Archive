import type { ImageFragment } from '../types/image';

/**
 * 🎨 图片内容模板
 *
 * 复制这个文件的内容到 sampleImages.ts 来添加你自己的内容
 * 或者直接修改 sampleImages.ts 文件
 */

export const sampleImages: ImageFragment[] = [
  // ========== 示例 1: 场景 ==========
  {
    id: 'scene-01',                               // 唯一ID
    title: '开场',                                 // 标题
    role: 'scene',                                 // 类型：scene/character/fragment
    imagePath: '/src/assets/images/scene-01.svg', // 图片路径
    tags: ['开场', '黑白', '空旷'],                // 标签（可选）
    description: '故事的开始，一个空荡的房间',      // 描述（可选）
  },

  // ========== 示例 2: 角色 ==========
  {
    id: 'character-alice',
    title: 'Alice',
    role: 'character',
    imagePath: '/src/assets/images/character-alice.png',
    tags: ['主角', '女性', '探索者'],
    description: '故事的主角，一个寻找真相的女孩',
  },

  // ========== 示例 3: 片段 ==========
  {
    id: 'fragment-memory',
    title: '记忆碎片',
    role: 'fragment',
    imagePath: '/src/assets/images/fragment-memory.jpg',
    tags: ['回忆', '模糊'],
    description: '一段模糊的记忆，关于某个重要的瞬间',
  },

  // ========== 添加更多内容 ==========
  // 复制上面的格式，修改内容
  // {
  //   id: '你的ID',
  //   title: '你的标题',
  //   role: 'scene',
  //   imagePath: '/src/assets/images/你的图片.png',
  //   tags: ['标签1', '标签2'],
  //   description: '你的描述',
  // },

];

// 默认顺序（会自动生成）
export const defaultOrder = sampleImages.map(img => img.id);


/**
 * 📝 快速参考
 *
 * role 类型：
 * - 'scene'     : 场景
 * - 'character' : 角色/人物
 * - 'fragment'  : 片段/元素
 *
 * 图片路径格式：
 * - 始终以 /src/assets/images/ 开头
 * - 例如：'/src/assets/images/my-image.png'
 *
 * 支持的图片格式：
 * - SVG (推荐，矢量图，文件小)
 * - PNG (支持透明背景)
 * - JPG (适合照片)
 * - WebP (现代格式，文件小)
 *
 * 命名建议：
 * - ID: 使用 类型-名称 格式，如 'scene-opening', 'character-hero'
 * - 文件: 使用小写字母和连字符，如 'my-image.png'
 */
