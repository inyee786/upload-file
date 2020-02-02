import React, { Component } from 'react'
import Table from 'react-bootstrap/Table'
import FileDrop from 'react-file-drop';

export class FileUpload extends Component {

    constructor(props) {
        super(props)
        this.state = {
            items: [],
            lines: 2,
            delimeter: ',',
            filecontents: ''
        }
    }

    readFile = file => {
        if (typeof file !== 'undefined') {
            const reader = new FileReader();
            reader.onload = (event) => {
                this.updateItems(event.target.result, event);
            };
            reader.readAsText(file);
        } else {
            this.setState({
                filecontents: '',
                items: [],
            })
        }
    }

    uploadFile = (event) => {
        const file = event.target.files[0];
        this.readFile(file)
    }

    dragUploadFile = (files) => {
        const file = files[0];
        this.readFile(file)
    }
    changeHandeler = event => {
        this.updateItems(this.state.filecontents, event)
    }

    updateItems = (fileitems, event) => {
        const updateObject = {};
        if (event.target.name === 'delimeter' && event.target.value !== '') {
            updateObject.items = fileitems.split('\n').map(item => item.split(event.target.value).slice(0, 4));
            updateObject[event.target.name] = event.target.value;
        } else if (event.target.name === 'lines' || event.target.value === '') {
            updateObject[event.target.name] = event.target.value;
        } else {
            updateObject.items = fileitems.split('\n').map(item => item.split(this.state.delimeter).slice(0, 4));
            updateObject.filecontents = fileitems;
        }
        this.setState({ ...updateObject });
    }

    render() {
        const tableItems = this.state.items.slice(0, this.state.lines).map((row, i) => (
            <tr key={i}>
                {
                    row.map((item, j) => (<td key={j + '-' + item}>{item}</td>))
                }
            </tr>
        ))
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center">
                        <div id="react-file-drop-demo" style={{ border: '1px solid black', width: 600, color: 'black', padding: 20, margin: '0 auto' }}>
                            <FileDrop onDrop={this.dragUploadFile}>
                                <p> Drop some files here!</p>
                                <input type="file"
                                    name="myFile"
                                    className="p-3"
                                    onChange={this.uploadFile} />
                            </FileDrop>
                        </div>
                    </div>
                    <div className="col-12">
                        <form>
                            <div className="form-row">

                                <div className="col-6">
                                    <label>Delimeter</label> <input type='text' className="form-control" maxLength='1' value={this.state.delimeter} name='delimeter' onChange={this.changeHandeler}></input>
                                </div>
                                <div className="col-6">
                                    <label>Lines</label> <input type='number' className="form-control" value={this.state.lines} name='lines' onChange={this.changeHandeler}></input>
                                </div>
                            </div>

                        </form>
                    </div>
                    <div className='col-12 mt-3'>
                        <Table striped bordered hover>
                            <tbody>
                                {tableItems}
                            </tbody>
                        </Table>
                    </div>

                </div>
            </div>
        )
    }
}

export default FileUpload
