export const isExternal = path => {
  return /^(https?|tel:)/.test(path)
}
