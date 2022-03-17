import React from 'react';
import Spinner from "./Spinner";

function TableHeaders(props: any) {
    const { tableHeaders, setSort } = props;
    return (
        <thead>
        <tr>
            {tableHeaders.map((header: any) =>
                <th>
                    <div className="tableheader-and-sortbutton">
                        <div className="tableheader">
                            {header.field}
                        </div>
                        <div className="sortbutton">
                            <button
                                type="button"
                                className="btn"
                                onClick={() => {
                                    setSort({sortField: header.dataField, sortDirection: !header.sortDirection});
                                    tableHeaders[tableHeaders.findIndex((x: any) => x.dataField === header.dataField)].sortDirection = !header.sortDirection;
                                }}
                            >
                                {header.sortDirection ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                                        <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </th>
            )}
            <th style={{width: '120px'}}>
                Options
            </th>
        </tr>
        </thead>
    );
}

function TableData(props: any) {
    const { tableData, setCreateUpdateDelete } = props;
    return (
        <tbody>
            {tableData.map((data : any) =>
                <tr key={data.id}>
                    <td>{data.nutritionType}</td> {/*//TODO: generalize this*/}
                    <td>{data.injestionTime}</td>
                    <td>{data.calories}</td>
                    <td>
                        <button
                            type="button"
                            className="btn btn-light mr-1"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            onClick={() => {
                                setCreateUpdateDelete({choice: 'Update', data: null});
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                            </svg>
                        </button>{' '}
                        <button
                            type="button"
                            className="btn btn-light mr-1"
                            onClick={() => {
                                    setCreateUpdateDelete({choice: 'Delete', data: data});
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                            </svg>
                        </button>
                    </td>
                </tr>
            )}
        </tbody>
    );
}

export default function CRUDTable(props: any) {
    const { table, setTable, setCreateUpdateDelete, setFilter, setSort } = props;
    return (
        <div>
            <div className="page-section-header">{table.title}</div>
            <button
                type="button"
                className="btn btn-primary m-2 float-end"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={() => {
                    setCreateUpdateDelete({choice: 'Create', data: null});
                }}
            >
                {table.addTitle}
            </button>
            <input
                className="form-control m-2"
                style={{maxWidth: "300px", position: "relative", left: "-10px", top: "20px"}}
                placeholder="Filter"
                onChange={(e) => {
                    setFilter(e.target.value);
                }}
            />
            <table className="table table-striped table-hover">
                <TableHeaders
                    tableHeaders={table.headers}
                    setSort={(nextState: any) => setSort({sortField: nextState.sortField, sortDirection: nextState.sortDirection})}
                />
                {table.dataLoaded ?
                    <TableData
                        tableData={table.data}
                        setTableData={(nextState: any) => setTable({...table, data: nextState})}
                        setCreateUpdateDelete={(nextState: any) => setCreateUpdateDelete(nextState)}
                    />
                    :
                    <Spinner />
                }
            </table>
        </div>
    );
}