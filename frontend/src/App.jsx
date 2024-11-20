import { useState } from 'react'
import './App.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Navbar from './components/Navbar';
// import Footer from './components/Footer'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#007bed'
    }
  },
});
function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <Navbar></Navbar>
    </ThemeProvider>
    </>
  )
}

export default App
