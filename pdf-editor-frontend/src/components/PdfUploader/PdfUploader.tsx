import { useCallback, useState } from 'react';
import { FileWithPath } from "react-dropzone";
import PdfApiService from '~/services/PdfApiService';
import LinearProgress from '@mui/material/LinearProgress';
import UploadDropZone from '~/components/UploadDropZone/UploadDropZone';
import './PdfUploader.css'
import { useLocation, useNavigate } from 'react-router-dom';

function PdfUploader() {
  // todo use react-query
  const [file, setFile] = useState<FileWithPath | null>(null);
  const [progress, setProgress] = useState<number>(-1);
  const pdfApi = new PdfApiService();
  const navigate = useNavigate();
  const location = useLocation();

  const onFileAdded = useCallback(async (acceptedFiles: FileWithPath[]) => {
    if (acceptedFiles.length === 0) {
      return;
    }
    
    try {
      setProgress(0);
      const response = await pdfApi.uploadPdf(acceptedFiles[0], (progressEvent: any) => setProgress(progressEvent.loaded * 100/progressEvent.total));
      setFile(acceptedFiles[0]);
      navigate(`${location}/edit/${response.data.id}`);
    } catch (error) {
      // TODO: handle errors
      setProgress(0);
      setFile(null);
    }
  }, []);

  return (
    <div className="PdfUploader">
    {progress > -1
        ?
        <div className='upload-progress'>
            <div className='progressbar'><LinearProgress variant="determinate" value={progress} /></div>
            <p> { file?.size ? file?.size*progress : 0 } / {file?.size} bytes ({progress}%)</p>
        </div>
        :
        <div className='dropzone'>
            <UploadDropZone onFileAdded={(acceptedFiles) => onFileAdded(acceptedFiles)}/>
        </div>
    } 
    </div>
  )
}

export default PdfUploader
