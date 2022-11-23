import { FileWithPath, useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";
import './UploadDropZone.css';

interface UploadDropZoneProps {
    onFileAdded: (files: FileWithPath[]) => void;
}

function UploadDropZone({ onFileAdded } : UploadDropZoneProps) {
    const { t } = useTranslation();
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
                            t('releaseFileHere.label')
                        : 
                            t('dragDropHere.label')
                    }
                </p>
                <button type="button">
                    {t('selectPDFFileBtn.label')}
                </button>
                {files}
            </div>
        </div>
    )
}

export default UploadDropZone;