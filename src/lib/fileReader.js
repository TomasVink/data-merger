import csvtojson from 'csvtojson'

const readFileAsync = file => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader()

    reader.onload = () => {
      resolve(reader.result)
    }

    reader.onerror = reject

    reader.readAsText(file)
  })
}

const fileReader = async (file, delimiter = 'auto') => {
  const csv = await readFileAsync(file)
  const result = await csvtojson({ delimiter }).fromString(csv)
  return result
}

export default fileReader
