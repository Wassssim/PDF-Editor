import './App.css'
import { ThemeProvider } from '@emotion/react';
import theme from './theme/dark';
import PdfEditTool from './components/PdfEditTool/PdfEditTool';
import './i18n';
import NavBar from './components/NavBar/NavBar';

function App() {

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <NavBar/>
        <PdfEditTool/>
      </ThemeProvider>
    </div>
  )
}

export default App
