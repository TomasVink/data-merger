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

const fileReader = async file => {
  const fileString = await readFileAsync(file)
  return fileString
}

export default fileReader
