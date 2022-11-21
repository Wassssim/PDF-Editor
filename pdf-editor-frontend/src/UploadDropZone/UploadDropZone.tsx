import { FileWithPath, useDropzone } from "react-dropzone";
import './UploadDropZone.css';

interface UploadDropZoneProps {
    onFileAdded: (files: FileWithPath[]) => FileWithPath;
}

function UploadDropZone({ onFileAdded } : UploadDropZoneProps) {
    const { getRootProps, getInputProps, isDragActive, acceptedFiles  } = useDropzone({
        accept: {
            'application/pdf': ['.pdf'],
        },
        onDrop: (acceptedFiles) => onFileAdded(acceptedFiles),
        multiple: false,
    });

    const files = acceptedFiles.map((file: FileWithPath) => (
        <div key={file.path} className="file-description">
          {file.path} - {file.size} bytes
        </div>
    ));

    return (
        <div 
            {...getRootProps({ 
                className: `upload-dropzone ${isDragActive?'active':''}`,
                onClick: event => {
                    if ( !(event.target as HTMLButtonElement).type) {
                        event.stopPropagation();
                    }
                }
            })}
        >
            <input className="input-zone" {...getInputProps({})} />
            <div className="text-center">
                <p className="dropzone-content">
                    {isDragActive 
                        ? 
                            ("Release to drop the files here") 
                        : 
                            ("Drag and drop PDF file here, or click to select it")
                    }
                </p>
                <button type="button">
                Click to select files
                </button>
                {files}
            </div>
        </div>
    )
}

export default UploadDropZone;