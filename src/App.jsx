import React from "react";
import Header from './components/Header/Header'
import Main from './components/Main/Main'
import Footer from './components/Footer/Footer'
import { BrowserRouter } from "react-router-dom";

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {

  return (
    <ThemeProvider theme={darkTheme}>
    <CssBaseline />
      <BrowserRouter>
        <Header />
        <Main />
      </BrowserRouter>
      <Footer />
    </ThemeProvider>
  )
}

export default App