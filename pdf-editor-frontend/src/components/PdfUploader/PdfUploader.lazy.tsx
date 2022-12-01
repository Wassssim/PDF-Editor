import CircularProgress from '@mui/material/CircularProgress';
import React, { lazy, Suspense } from 'react';

const LazyPdfUploader = lazy(() => import('./PdfUploader'));

const PdfUploader = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={<CircularProgress color="inherit"/>}>
    <LazyPdfUploader {...props} />
  </Suspense>
);
export default PdfUploader;