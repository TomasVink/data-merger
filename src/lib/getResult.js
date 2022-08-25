const getResult = (
  source,
  destination,
  rules,
  sourceField,
  destinationField
) => {
  if (
    !source ||
    !destination ||
    !rules.length ||
    !sourceField ||
    !destinationField
  )
    return null

  let matches = 0
  const data = []

  destination.forEach((destinationItem, i) => {
    let matchedItem = source.find(sourceItem => {
      let matched = true
      rules.forEach(
        rule =>
          (matched =
            sourceItem[rule[0]].toString() ===
            destinationItem[rule[1]].toString())
      )
      if (matched) matches++
      return matched
    })
    data.push({
      [destinationField]: matchedItem ? matchedItem[sourceField] : '',
      ...destinationItem
    })
  })
  return { data, matches }
}

export default getResult
