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
    const matchedItem = source.find(sourceItem => {
      return rules
        .map(
          rule =>
            sourceItem[rule[0]].toString().toLowerCase() ===
            destinationItem[rule[1]].toString().toLowerCase()
        )
        .every(v => v)
    })

    if (matchedItem) matches++

    data.push({
      [destinationField]: matchedItem ? matchedItem[sourceField] : '',
      ...destinationItem
    })
  })
  return { data, matches }
}

export default getResult
