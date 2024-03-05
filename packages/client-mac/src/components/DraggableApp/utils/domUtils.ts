export function parsePXValue(value: string) {
  return parseInt(value.replace('px', ''));
}