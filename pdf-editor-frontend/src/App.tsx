import './App.css'
import PdfEditTool from './components/PdfEditTool/PdfEditTool.lazy';
import { locales } from './services/i18n';
import NavBar from './components/NavBar/NavBar';
import { Route, Routes, Navigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import { Suspense } from 'react';
import { Helmet } from 'react-helmet';

function App() {

  return (
    <div className="App">
      <Helmet>
        <link
          rel="canonical"
          hrefLang={"en"}
          href={`https://${import.meta.env.VITE_NODE_API_BASE_URL}/`}
        />
        {locales.map((locale: string) => {
            return (
              locale !== "en" 
              ?
                <link
                  key={locale}
                  rel="alternate"
                  hrefLang={locale}
                  href={`https://${import.meta.env.VITE_NODE_API_BASE_URL}/${locale}`}
                />
              :
                null
            )
        })}
      </Helmet>
      <Suspense fallback={<CircularProgress color="inherit"/>}>
      <Routes>
        <Route path="/" element={<Navigate to="/en" />} />
        <Route path="/:lang" >
          <Route index element={
            <>
              <NavBar/>
              <PdfEditTool/>
            </>
          }/>
        </Route>
      </Routes>
      </Suspense>
    </div>
  )
}

export default App
