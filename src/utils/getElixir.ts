interface Equipment {
  [key: string]: {
    bPoint: boolean
    contentStr: string
  }
}

export const getElixir = (elixirObj: Equipment) => {
  const arr = Object.values(elixirObj)
  const parser = new DOMParser()
  const result = []

  for (let i = 0; i < arr.length; i++) {
    const doc = parser.parseFromString(arr[i].contentStr, 'text/html')
    const elements = doc.body.children

    for (let j = 0; j < elements.length; j++) {
      const element = elements[j]

      if (element.tagName === 'FONT') {
        if (j % 2 === 0) {
          const textContent = element.nextSibling?.textContent?.trim()
          if (textContent) {
            result.push(textContent + ' ' + elements[j + 1].textContent)
          }
        }
      }
    }
  }
  return result

  //   for (let e = 0; e < 1; e++) {
  //     const idx = `Element_00${e}`

  //     const parser = new DOMParser()
  //     const doc = parser.parseFromString(htmlString[idx].contentStr, 'text/html')
  //     const elements = doc.body.children
  //     const result = []

  //     for (let i = 0; i < elements.length; i++) {
  //       const element = elements[i]

  //       if (element.tagName === 'FONT' && element.nextSibling !== null && element.nextSibling.textContent !== null) {
  //         const textContent = element.nextSibling.textContent.trim()

  //         if (i % 2 === 0) {
  //           result.push(textContent + ' ' + elements[i + 1].textContent)
  //         }
  //       }
  //     }
  //     return result
  //   }
}
