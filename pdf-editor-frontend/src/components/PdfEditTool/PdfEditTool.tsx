import { useCallback, useState } from 'react';
import { FileWithPath } from "react-dropzone";
import PdfApiService from '~/services/PdfApiService';
import LinearProgress from '@mui/material/LinearProgress';
import UploadDropZone from '~/components/UploadDropZone/UploadDropZone';
import './PdfEditTool.css'

function PdfEditTool() {
  // todo use react-query
  const [file, setFile] = useState<FileWithPath | null>(null);
  const [progress, setProgress] = useState<number>(-1);
  const pdfApi = new PdfApiService();

  const onFileAdded = useCallback(async (acceptedFiles: FileWithPath[]) => {
    try {
      setProgress(0);
      const response = await pdfApi.uploadPdf(acceptedFiles[0], (progressEvent: any) => setProgress(progressEvent.loaded * 100/progressEvent.total));
      console.log(response);
      setFile(acceptedFiles[0]);
    } catch (error) {
      console.log(error);
      setFile(null);
    }
  }, []);

  return (
    <div className="PdfEditTool">
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

export default PdfEditTool
