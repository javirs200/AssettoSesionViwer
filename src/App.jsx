import Header from './components/Header/Header'
import Main from './components/Main/Main'
import Footer from './components/Footer/Footer'
import { BrowserRouter } from "react-router-dom";

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#e5484d',
    },
    background: {
      default: '#17191c',
      paper: '#22252a',
    },
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <div className="app-shell">
          <Header />
          <Main />
          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App