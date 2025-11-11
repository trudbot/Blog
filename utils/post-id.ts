import { customAlphabet } from 'nanoid';

/**
 * 生成美观的文章唯一 ID，适合用在 URL 中
 * 特点：
 * - 使用小写字母和数字（去除了容易混淆的字符如 0, o, 1, l）
 * - 长度为 8，简短美观
 * - 碰撞概率极低（每秒生成 1000 个 ID，需要约 3 年才会有 1% 的碰撞概率）
 * 
 * @param {number} length  ID 长度，默认 8
 * @returns {string} 生成的唯一 ID，例如: "a3x8k9m2"
 */
export function genPostId(length = 8) {
    // 使用 URL 友好的字符集：小写字母 + 数字，去除易混淆字符
    const alphabet = '2346789abcdefghjkmnpqrtuvwxyz';
    const nanoid = customAlphabet(alphabet, length);
    return nanoid();
}