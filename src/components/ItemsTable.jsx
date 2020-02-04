import React from 'react';
import Table from 'react-bootstrap/Table';

function ItemsTable(props) {

    const tableItems = props.items
        .slice(0, props.lines)
        .map((row, i) => (
            <tr key={i}>
                {
                    row.map((item, j) => (<td key={j + '-' + item}>{item}</td>))
                }
            </tr>
        ));

    return (
        <div className='col-12 mt-3'>
            <Table striped bordered hover>
                <tbody>
                    {tableItems}
                </tbody>
            </Table>
        </div>
    )
}

export default ItemsTable
