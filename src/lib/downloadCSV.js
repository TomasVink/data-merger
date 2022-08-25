import { parse } from 'json2csv'

const downloadCSV = jsonArray => {
  const content = parse(jsonArray, {
    fields: Object.keys(jsonArray[0])
  })

  const el = document.createElement('a')
  el.setAttribute(
    'href',
    'data:text/plain;charset=utf-8,' + encodeURIComponent(content)
  )
  el.setAttribute('download', `result.csv`)
  el.style.display = 'none'
  document.body.appendChild(el)
  el.click()
}

export default downloadCSV
