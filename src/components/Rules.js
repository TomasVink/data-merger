import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select
} from '@mui/material'

const RuleSelect = ({ title, options, ...props }) => {
  const id = title.replace(' ', '-').toLowerCase()
  return (
    <FormControl fullWidth size='small'>
      <InputLabel id={id}>{title}</InputLabel>
      <Select labelId={id} label={title} {...props}>
        {options.map(option => (
          <MenuItem value={option} key={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

const Rules = ({ dataSets, rules, setRules }) => {
  const addRule = () =>
    setRules([
      ...rules,
      [Object.keys(dataSets[0][0])[0], Object.keys(dataSets[1][0])[0]]
    ])

  const setRule = (x, y) => ({ target: { value } }) => {
    const newRules = [...rules]
    newRules[x][y] = value
    setRules(newRules)
  }

  return (
    <>
      {!!rules.length &&
        rules.map((rule, i) => (
          <Grid sx={{ my: 1 }} container spacing={2} key={i}>
            <Grid item xs={5}>
              <RuleSelect
                title='Source field'
                value={rule[0]}
                onChange={setRule(i, 0)}
                options={Object.keys(dataSets[0][0])}
              />
            </Grid>
            <Grid item xs={2}>
              ==
            </Grid>
            <Grid item xs={5}>
              <RuleSelect
                title='Destination field'
                value={rule[1]}
                onChange={setRule(i, 1)}
                options={Object.keys(dataSets[1][0])}
              />
            </Grid>
          </Grid>
        ))}
      <Button sx={{ my: 1 }} variant='contained' onClick={addRule}>
        Add rule
      </Button>
    </>
  )
}

export default Rules
