import { useCallback, useState } from 'react'
import { FileWithPath } from "react-dropzone";
import './App.css'
import UploadDropZone from './UploadDropZone/UploadDropZone'

function App() {
  const [file, setFile] = useState<FileWithPath | null>(null)

  const onFileAdded = useCallback((acceptedFiles: FileWithPath[]) => {
    console.log(acceptedFiles);
    setFile(acceptedFiles[0]);
    return acceptedFiles[0];
  }, []);

  return (
    <div className="App">
      <div className='dropzone'>
        <UploadDropZone onFileAdded={(acceptedFiles) => onFileAdded(acceptedFiles)}/>
      </div>
    </div>
  )
}

export default App
