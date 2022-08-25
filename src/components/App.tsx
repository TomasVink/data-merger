import { AppBar, Box, CssBaseline, Toolbar, Typography } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Converter from './Converter'

const App = () => (
  <ThemeProvider theme={createTheme()}>
    <CssBaseline />
    <AppBar position='absolute' color='default'>
      <Toolbar>
        <Typography variant='h6'>Data merger</Typography>
      </Toolbar>
    </AppBar>
    <Box sx={{ m: 4 }}>
      <Converter />
    </Box>
  </ThemeProvider>
)

export default App
