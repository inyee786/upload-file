import React from 'react'
import FileDrop from 'react-file-drop';


function DragAndDrop(props) {
    return (
        <div id="react-file-drop-demo" style={{ border: '1px solid black', width: 600, color: 'black', padding: 20, margin: '0 auto' }}>
        <FileDrop onDrop={props.dragUploadFile}>
            <p> Drop some files here!</p>
            <input type="file"
                name="myFile"
                className="p-3"
                onChange={props.uploadFile} />
        </FileDrop>
    </div>
    )
}

export default DragAndDrop
