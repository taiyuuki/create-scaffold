export const replaceSpace = (str: string) => {
  return str.replace(/[ \f\r\t\v]+\n/g, '\n').replace(/\n[\n]+\n/g, '\n').replace(/\[\s+\]/g, '[]').replace(/{\s+}/g, '{}')
}