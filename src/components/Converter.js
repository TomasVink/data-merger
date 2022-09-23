import {
  Button,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import { Box } from '@mui/system'
import { DataGrid } from '@mui/x-data-grid'
import { useState } from 'react'
import downloadCSV from '../lib/downloadCSV'
import getResult from '../lib/getResult'
import CsvInput from './CsvInput'
import Rules from './Rules'

const Converter = () => {
  const [source, setSource] = useState()
  const [destination, setDestination] = useState()
  const [rules, setRules] = useState([])
  const [sourceField, setSourceField] = useState('')
  const [destinationField, setDestinationField] = useState('')
  const [result, setResult] = useState()

  const generateResult = () =>
    setResult(
      getResult(source, destination, rules, sourceField, destinationField)
    )

  const reset = () => {
    setSource()
    setDestination()
    setRules([])
    setSourceField('')
    setDestinationField('')
    setResult()
  }

  return (
    <Stack spacing={2} sx={{ my: 12 }}>
      <Paper sx={{ p: { xs: 2, md: 3 } }}>
        <Typography component='h1' variant='h5'>
          Source
        </Typography>
        <CsvInput
          title='Select source file'
          data={source}
          onChange={setSource}
        />
      </Paper>
      <Paper sx={{ p: { xs: 2, md: 3 } }}>
        <Typography component='h1' variant='h5'>
          Destination
        </Typography>
        <CsvInput
          title='Select destination file'
          data={destination}
          onChange={setDestination}
        />
      </Paper>
      <Paper sx={{ p: { xs: 2, md: 3 } }}>
        <Typography component='h1' variant='h5'>
          Rules
        </Typography>
        <>
          {source && destination && (
            <Rules
              dataSets={[source, destination]}
              rules={rules}
              setRules={setRules}
            />
          )}
        </>
      </Paper>
      <Paper sx={{ p: { xs: 2, md: 3 } }}>
        <Typography component='h1' variant='h5'>
          Result
        </Typography>
        {source && (
          <Grid sx={{ my: 1 }} container spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth size='small'>
                <InputLabel id='source-field'>Source field name</InputLabel>
                <Select
                  value={sourceField}
                  onChange={({ target: { value } }) => setSourceField(value)}
                  labelId='source-field'
                  label='Source field name'
                >
                  {Object.keys(source[0]).map(option => (
                    <MenuItem value={option} key={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <TextField
                  value={destinationField}
                  onChange={({ target: { value } }) =>
                    setDestinationField(value)
                  }
                  label='Destination field name'
                  variant='outlined'
                  size='small'
                />
              </FormControl>
            </Grid>
          </Grid>
        )}
        {result && (
          <Box sx={{ my: 2, height: 400, width: '100%' }}>
            <DataGrid
              columns={Object.keys(result.data[0]).map(key => ({
                field: key,
                headerName: key,
                flex: 1
              }))}
              rows={result.data.map((item, i) => ({
                id: item.id || `data-grid-id-${i}`,
                ...item
              }))}
              pageSize={20}
              rowsPerPageOptions={[20]}
            />
          </Box>
        )}
        <Button
          disabled={
            !source ||
            !destination ||
            !rules.length ||
            !sourceField ||
            !destinationField
          }
          sx={{ my: 1, mr: 2 }}
          variant='contained'
          onClick={generateResult}
        >
          {result ? 'Refresh result' : 'Generate result'}
        </Button>
        <Button sx={{ m: 1 }} variant='contained' onClick={reset}>
          Reset
        </Button>
        <Button
          disabled={!result}
          sx={{ m: 1 }}
          variant='contained'
          onClick={() => downloadCSV(result.data)}
        >
          Download result
        </Button>
        {result && (
          <Chip
            label={`${result.matches} of ${destination.length} matches found`}
          />
        )}
      </Paper>
    </Stack>
  )
}

export default Converter
