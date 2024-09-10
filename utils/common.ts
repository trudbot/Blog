export function countLines(str: string): number {
    // 使用 \n 作为分隔符将字符串分割成数组，然后获取数组的长度
    // 如果字符串为空，返回0行
    return str ? (str.match(/\n/g) || []).length + 1 : 0;
}