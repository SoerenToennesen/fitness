import React from 'react';
import CRUDTable from "./CRUDTable";
import AddUpdateModal from "./AddUpdateModal";
import Notification from "./Notification";
import ConfirmationModal from "./ConfirmationModal";
import {createClick, updateClick} from "./actions/RestCalls";

//TODO: Implement this file to replace

function updateModalData(nextState: any) {
    if (nextState.createOrUpdateClicked) {
        switch (nextState.buttonTitle) {
            case 'Create':
                createClick(nextState);
                break;
            case 'Update':
                updateClick(nextState);
                break;
        }
    }
    return nextState;
}

function filterFunction(props: any) { //props = {table, dataWithoutFilter, input}
    const filteredData: any = props.dataWithoutFilter.filter(
        function(el: any) {
            return el.nutritionType.toString().toLowerCase().includes(
                    props.input.toString().trim().toLowerCase()
                ) ||
                el.injestionTime.toString().toLowerCase().includes(
                    props.input.toString().trim().toLowerCase()
                ) ||
                el.calories.toString().toLowerCase().includes(
                    props.toString().trim().toLowerCase()
                )
        }
    );
    return ({table: {...props.table, data: filteredData}})
}

function updateSort(props: any) { //Props = table
    var sortedData = props.data.sort(function(a: any, b: any) {
        if (props.sortDirection) {
            return (a[props.sortField] > b[props.sortField]) ? 1 : ((a[props.sortField] < b[props.sortField]) ? -1 : 0);
        } else {
            return (b[props.sortField] > a[props.sortField]) ? 1 : ((b[props.sortField] < a[props.sortField]) ? -1 : 0);
        }
    });
    return ({
        table: {...props, data: sortedData},
        resetSorts: {sortField: props.sortField, sortDirection: props.sortDirection}
    })
}

export default function Table(props: any) {
    const {
        title,
        table,
        setTable,
        setCreateUpdateDelete,
        setFilter,
        setSort,
        modalData,
        setModalData,
        notify,
        setNotify,
        confirmModal,
        setConfirmModal
    } = props;
    return (
        <div>
            <div className="page-header">{title}</div>
            <CRUDTable
                table={table}
                setTable={(nextState: any) => setTable(nextState)}
                setCreateUpdateDelete={(nextState: any) => setCreateUpdateDelete(nextState)}
                setFilter={(nextState: any) => setFilter(filterFunction(nextState))}
                setSort={(nextState: any) => setSort(updateSort(nextState))}
            />
            <AddUpdateModal
                modalData={modalData}
                setModalData={(nextState: any) => setModalData(updateModalData(nextState))}
            />
            <Notification
                notify={notify}
                setNotify={(nextState: any) => setNotify(nextState)}
            />
            <ConfirmationModal
                confirmModal={confirmModal}
                setConfirmModal={(nextState: any) => setConfirmModal(nextState)}
            />
        </div>
    );
}
