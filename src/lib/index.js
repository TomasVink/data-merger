const fs = require('fs')

const schoolJSON = fs.readFileSync('/data/secondarySchools.json')
const schools = JSON.parse(schoolJSON)

const initiativeJSON = fs.readFileSync('/data/initiatives.json')
const initiatives = JSON.parse(initiativeJSON)

let na = 0

result = []

initiatives.forEach((initiative, i) => {
  let school = schools.find(
    school =>
      school['Shipping Zip/Postal Code'].toString() ===
        initiative['Zip code'].toString() &&
      school['Shipping Street'] === initiative['Shipping street']
  )
  if (!school) {
    na++
  }
  console.log(
    `Status: ${i}/${initiatives.length} done, ${na} schools not found.`
  )
  result.push({
    ...initiative,
    ['School ID']: school ? school['Account ID'] : 'NA'
  })
})

let data = JSON.stringify(result)
fs.writeFileSync('/data/result.json', data)
