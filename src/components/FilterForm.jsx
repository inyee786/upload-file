import React from 'react'

function FilterForm(props) {
    return (
        <form>
            <div className="form-row">
                <div className="col-6">
                    <label>Delimeter</label>
                    <input type='text' className="form-control" maxLength='1' value={props.delimeter} name='delimeter' onChange={props.changeHandler}></input>
                </div>
                <div className="col-6">
                    <label>Lines</label>
                    <input type='number' min='0' className="form-control" value={props.lines} name='lines' onChange={props.changeHandler}></input>
                </div>
            </div>
        </form>
    )
}

export default FilterForm
