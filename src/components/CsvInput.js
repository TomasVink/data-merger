import { styled } from '@mui/material/styles'
import { Box, Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import fileReader from '../lib/fileReader'

const Input = styled('input')({ display: 'none' })

const CsvInput = ({ title, data, onChange }) => {
  const onFileSelect = async ({
    target: {
      files: [file]
    }
  }) => {
    const result = await fileReader(file)
    onChange(result)
  }

  const inputId = `file-input-${title.replace(' ', '-').toLowerCase()}`

  return (
    <>
      <label htmlFor={inputId}>
        <Input accept='.csv' id={inputId} type='file' onChange={onFileSelect} />
        <Button variant='contained' component='span'>
          {title}
        </Button>
      </label>
      {data && (
        <Box sx={{ my: 2, height: 400, width: '100%' }}>
          <DataGrid
            columns={Object.keys(data[0]).map(key => ({
              field: key,
              headerName: key,
              flex: 1
            }))}
            rows={data.map((item, i) => ({
              id: item.id || `data-grid-id-${i}`,
              ...item
            }))}
            pageSize={20}
            rowsPerPageOptions={[20]}
          />
        </Box>
      )}
    </>
  )
}

export default CsvInput
