import React, { Component } from 'react';
import ItemsTable from './ItemsTable';
import DragAndDrop from './DragAndDrop';
import FilterForm from './FilterForm';

export class Dashboard extends Component {

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
    changeHandler = event => {
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
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center">
                        <DragAndDrop  dragUploadFile={this.dragUploadFile} uploadFile={this.uploadFile}/>
                    </div>
                    <div className="col-12">
                        <FilterForm changeHandler={this.changeHandler} delimeter={this.state.delimeter} lines={this.state.lines} />
                    </div>
                    <ItemsTable items={this.state.items} lines={this.state.lines}/>
                </div>
            </div>
        )
    }
}

export default Dashboard
