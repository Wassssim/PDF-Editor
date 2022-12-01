import './PdfEditTool.css';

function PdfEditor() {
    return (
        <div className="pdf-editor">
            <div className="pdf-editor__header">
                <div className="pdf-editor__header__title">PDF Editor</div>
                <div className="pdf-editor__header__buttons">
                    <button className="pdf-editor__header__buttons__button">Open</button>
                    <button className="pdf-editor__header__buttons__button">Save</button>
                </div>
            </div>
            <div className="pdf-editor__body">
                <div className="pdf-editor__body__left">
                    <div className="pdf-editor__body__left__title">Pages</div>
                    <div className="pdf-editor__body__left__pages">
                        <div className="pdf-editor__body__left__pages__page">1</div>
                        <div className="pdf-editor__body__left__pages__page">2</div>
                        <div className="pdf-editor__body__left__pages__page">3</div>
                        <div className="pdf-editor__body__left__pages__page">4</div>
                        <div className="pdf-editor__body__left__pages__page">5</div>
                        <div className="pdf-editor__body__left__pages__page">6</div>
                    </div>
                </div>
                <div className="pdf-editor__body__right">
                    <div className="pdf-editor__body__right__title">Page 1</div>
                    <div className="pdf-editor__body__right__canvas">
                        <canvas className="pdf-editor__body__right__canvas__canvas"></canvas>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PdfEditor;