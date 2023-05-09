import React from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import PropTypes from 'prop-types';

const Table = ({onSort, selectedSort, columns, data, children}) => {
    return (
        <table className="table">
            {children ? children : (
                <>
                    <TableHeader {...{onSort, selectedSort, columns}} />
                    <TableBody {...{columns, data}}/>
                </>)}
        </table>
    )
}
Table.propTypes={
    onSort:PropTypes.func,
    selectedSort:PropTypes.object,
    data:PropTypes.array,
    columns:PropTypes.object,
    children:PropTypes.array
}
 
export default Table;