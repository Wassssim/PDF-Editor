import CircularProgress from '@mui/material/CircularProgress';
import React, { lazy, Suspense } from 'react';

const LazyPdfEditTool = lazy(() => import('./PdfEditTool'));

const PdfEditTool = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={<CircularProgress color="inherit"/>}>
    <LazyPdfEditTool {...props} />
  </Suspense>
);
export default PdfEditTool;