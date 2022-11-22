import './App.css'
import { ThemeProvider } from '@emotion/react';
import theme from './theme/dark';
import PdfEditTool from './components/PdfEditTool/PdfEditTool';

function App() {

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <PdfEditTool/>
      </ThemeProvider>
    </div>
  )
}

export default App
