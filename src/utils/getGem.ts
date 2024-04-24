export const getGem = gemObj => {
  const arr = Object.values(gemObj)
  const result = []

  for (let i = 0; i < arr.length; i++) {
    result.push(arr[i].Name.replace(/<[^>]*>?/gm, ''))
  }

  return result
}
