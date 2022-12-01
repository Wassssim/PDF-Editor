import './App.css'
import PdfUploader from './components/PdfUploader/PdfUploader.lazy';
import NavBar from './components/NavBar/NavBar';
import { Route, Routes, Navigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import { Suspense } from 'react';
import PdfEditTool from './components/PdfEditTool/PdfEditTool';


function App() {
  return (
    <div className="App">
      <Suspense fallback={<CircularProgress color="inherit"/>}>
      <Routes>
        <Route path="/" element={<Navigate to="/en" />} />
        <Route path="/:lang" element={<NavBar/>}>
          <Route index element={<PdfUploader/>}/>
          <Route path="edit/:id" element={<PdfEditTool/>}></Route>
        </Route>
      </Routes>
      </Suspense>
    </div>
  )
}

export default App
