import React, {Component} from 'react';
import {api_urls} from '../../Api_urls'
import default_nutrition_image from "../../Photos/nutritions/defaultnutrition.svg"
import Notification from "../../Containers/Notification";
import ConfirmationModal from "../../Containers/ConfirmationModal";
import AddUpdateModal from "../../Containers/AddUpdateModal";
import Spinner from "../../Containers/Spinner";
import {MyModalData} from "../../Containers/interfaces/AddUpdateModalInterface";
import {MyConfirmationModal} from "../../Containers/interfaces/ConfirmationModalInterface";
import {MyNotification} from "../../Containers/interfaces/NotificationInterface";
import {MyTable} from "../../Containers/interfaces/TableInterface";
import CRUDTable from "../../Containers/CRUDTable";

interface MyProps {}
interface MyStates {
    nutritions: [],
    sortType: boolean,
    sortInjestionTime: boolean,
    sortCalories: boolean,
    filterNutritions: string,
    nutritionsWithoutFilter: [],
    table: MyTable,
    modalData: MyModalData,
    notify: MyNotification,
    confirmModal: MyConfirmationModal,
    dataLoaded: boolean,
}

export class NutritionHistory extends Component<MyProps, MyStates> {

    constructor(props: any) {
        super(props);
        this.state={
            nutritions: [],
            sortType: false,
            sortInjestionTime: false,
            sortCalories: false,
            filterNutritions: '',
            nutritionsWithoutFilter: [],
            table: {
                title: 'Full history',
                addTitle: 'Add nutrition',
                filter: '',
                headers: [
                    {type: 'Type', sortDirection: false},
                    {type: 'Injestion time', sortDirection: false},
                    {type: 'Calories', sortDirection: false},
                ],
                sortField: '',
                dataLoaded: false,
                data: [],
                createOrUpdate: '',
            },
            modalData: this.resetModalData(),
            notify: {isOpen: false, message: '', type: ''},
            confirmModal: {isOpen: false, title: '', subTitle: '', onConfirm: () => {}},
            dataLoaded: true,
        }
        this.updateNotify=this.updateNotify.bind(this);
        this.updateConfirmModal=this.updateConfirmModal.bind(this);
        this.updateModalData=this.updateModalData.bind(this);
        this.updateTable=this.updateTable.bind(this);
        this.updateCreateUpdateDelete=this.updateCreateUpdateDelete.bind(this);
    }

    componentDidMount() {
        this.refreshList();
    }

    refreshList() {
        this.setState({dataLoaded: false})
        fetch(api_urls.NUTRITION_URL)
            .then(response => response.json())
            .then(data => {
                this.setState({nutritions: data.nutritions});
                this.setState({table: {...this.state.table, data: data.nutritions, dataLoaded: true}})
                this.setState({nutritionsWithoutFilter: data.nutritions})
                this.setState({dataLoaded: true})
            }, (error) => {
                console.log('Backend services probably not started up.\nError message: ' + error);
                this.setState({dataLoaded: true})
            })
    }


    resetModalData() {
        return {
            title: 'nutrition',
            inputTexts: [
                {type: 'Calories', placeholder: 'Enter calories...', input: ''},
                {type: 'Description', placeholder: 'Enter description...', input: ''},
                {type: 'Carbohydrates', placeholder: 'Enter carbohydrates...', input: ''},
                {type: 'Fats', placeholder: 'Enter fats...', input: ''},
                {type: 'Proteins', placeholder: 'Enter proteins...', input: ''},
                {type: 'Folate', placeholder: 'Enter folate...', input: ''},
                {type: 'Iron', placeholder: 'Enter iron...', input: ''},
                {type: 'Vitamin B6', placeholder: 'Enter vitamin B6...', input: ''},
                {type: 'Vitamin B12', placeholder: 'Enter vitamin B12...', input: ''},
                {type: 'Vitamin C', placeholder: 'Enter vitamin C...', input: ''},
                {type: 'Vitamin D', placeholder: 'Enter vitamin D...', input: ''},
                {type: 'Zinc', placeholder: 'Enter zinc...', input: ''},
            ],
            inputDropdowns: [
                {options: [
                        {id: '1', value: 'Breakfast'},
                        {id: '2', value: 'Lunch'},
                        {id: '3', value: 'Dinner'},
                        {id: '4', value: 'Snack'},
                    ], placeholder: 'Select a nutrition type...', input: ''},
            ],
            inputImage: {
                src: default_nutrition_image,
                alt: 'Default nutrition image'
            },
            buttonTitle: '',
            createOrUpdateClicked: false
        };
    }

    updateTable(nextState: any) {
        this.setState({table: nextState});
    }

    updateCreateUpdateDelete(nextState: any) {
        switch (nextState.choice) {
            case 'Create':
                this.setState({
                    modalData: {...this.resetModalData(), buttonTitle: 'Create'}
                })
                break;
            case 'Update':
                this.setState({
                    modalData: {...this.resetModalData(), buttonTitle: 'Update'}
                })
                break;
            case 'Delete':
                this.setState({
                    confirmModal: {
                        isOpen: true,
                        title: 'Do you want to delete nutrition ' + nextState.data.nutritionType + ' at ' + nextState.data.injestionTime + '?',
                        subTitle: 'This will permanently delete this record.',
                        onConfirm: () => {this.deleteClick(nextState.data.id)}
                    }
                });
                break;
        }
    }

    updateModalData(nextState: any) {
        this.setState({modalData: nextState});
        if (nextState.createOrUpdateClicked) {
            switch (nextState.buttonTitle) {
                case 'Create':
                    this.createClick(nextState);
                    break;
                case 'Update':
                    this.updateClick(nextState);
                    break;
            }
        }
    }

    updateNotify(nextState: any) {
        this.setState({notify: nextState});
    }

    updateConfirmModal(nextState: any) {
        this.setState({confirmModal: nextState});
    }

    createClick(modalData: any) {
        fetch(api_urls.NUTRITION_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: null,
                calories: modalData.inputTexts[0].input,
                description: modalData.inputTexts[1].input,
                nutritionType: modalData.inputDropdowns[0].input,
                // TODO: Priority to add injestion time
            })
        })
            .then(res => {
                res.json();
            })
            .then(() => {
                this.refreshList();
            }, (error) => {
                this.setState({
                    notify: {isOpen: true, message: 'Creation failed [insert failure message from backend] ' + error, type: 'error'},
                    modalData: this.resetModalData()
                });
            })
        // TODO: Make the below into a resetState function that update also uses
        this.setState({
            notify: {isOpen: true, message: 'Created successfully', type: 'success'},
            modalData: this.resetModalData()
        });
    }

    updateClick(modalData: any) {
        fetch(api_urls.NUTRITION_URL, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: null,
                calories: modalData.inputTexts[0].input,
                description: modalData.inputTexts[1].input,
                nutritionType: modalData.inputDropdowns[0].input,
            })
        })
            .then(res => {
                res.json();
            })
            .then(() => {
                this.refreshList();
            }, (error) => {
                this.setState({
                    notify: {isOpen: true, message: 'Update failed [insert failure message from backend] ' + error, type: 'error'},
                    modalData: this.resetModalData()
                });
            })
        this.setState({
            notify: {isOpen: true, message: 'Updated successfully', type: 'success'},
            modalData: this.resetModalData()
        });
    }

    deleteClick(id: string) {
        this.setState({
            confirmModal: {
                ...this.state.confirmModal,
                isOpen: false,
            }
        })
        fetch(api_urls.NUTRITION_URL, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: id
        })
            .then(res => {
                res.json();
            })
            .then(() => {
                this.refreshList();
            }, (error) => {
                this.setState({
                    notify: {isOpen: true, message: 'Deletion failed [insert failure message from backend] ' + error, type: 'error'}
                });
            })
        this.setState({
            notify: {isOpen: true, message: 'Deleted successfully', type: 'success'},
        });
    }

    resetSorts(sortingField: string, asc: boolean) {
        switch (sortingField) {
            case 'nutritionType':
                this.setState({
                    sortType: asc,
                    sortInjestionTime: false,
                    sortCalories: false,
                });
                break;
            case 'injestionTime':
                this.setState({
                    sortType: false,
                    sortInjestionTime: asc,
                    sortCalories: false,
                });
                break;
            case 'calories':
                this.setState({
                    sortType: false,
                    sortInjestionTime: false,
                    sortCalories: asc,
                });
                break;
            default:
                this.setState({
                    sortType: false,
                    sortInjestionTime: false,
                    sortCalories: false,
                });
        }
    }

    sortResult(prop: any, asc: boolean) {
        var sortedData = this.state.nutritions.sort(function(a,b) {
            if (asc) {
                return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
            } else {
                return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
            }
        });
        this.setState({nutritions: sortedData});
        this.setState({table: {...this.state.table, data: sortedData}})
        this.resetSorts(prop, asc);
    }

    filterFunction(input: string) {
        const filteredData: any = this.state.nutritionsWithoutFilter.filter(
            function(el: any) {
                return el.nutritionType.toString().toLowerCase().includes(
                        input.toString().trim().toLowerCase()
                    ) ||
                    el.injestionTime.toString().toLowerCase().includes(
                        input.toString().trim().toLowerCase()
                    ) ||
                    el.calories.toString().toLowerCase().includes(
                        input.toString().trim().toLowerCase()
                    )
            }
        );
        this.setState({nutritions: filteredData});
        this.setState({table: {...this.state.table, data: filteredData}})
    }

    changeNutritionFilter = (e: any) => {
        this.setState({filterNutritions: e.target.value});
        this.filterFunction(e.target.value);
    }

    tableData() {
        return (
            <tbody>
                {this.state.nutritions.map((nut : any) =>
                    <tr key={nut.id}>
                        <td>{nut.nutritionType}</td>
                        <td>{nut.injestionTime}</td>
                        <td>{nut.calories}</td>
                        <td>
                            <button
                                type="button"
                                className="btn btn-light mr-1"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                                onClick={() => {
                                    this.setState({
                                        modalData: {...this.state.modalData, buttonTitle: 'Update'}
                                    });
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                </svg>
                            </button>
                            <button
                                type="button"
                                className="btn btn-light mr-1"
                                onClick={() => {
                                    this.setState({
                                        confirmModal: {
                                            isOpen: true,
                                            title: 'Do you want to delete nutrition ' + nut.nutritionType + ' at ' + nut.injestionTime + '?',
                                            subTitle: 'This will permanently delete this record.',
                                            onConfirm: () => {this.deleteClick(nut.id)}
                                        }
                                    });
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
        )
    }

    nutritionTable() {
        return (
            <div>
                <div className="page-section-header">Full history</div>
                <button
                    type="button"
                    className="btn btn-primary m-2 float-end"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() =>
                        this.setState({
                            modalData: {...this.resetModalData(), buttonTitle: 'Create'}
                        })
                    }
                >
                    Add nutrition
                </button>
                <input className="form-control m-2" style={{maxWidth: "300px", position: "relative", left: "-10px", top: "20px"}} onChange={this.changeNutritionFilter} placeholder="Filter"/>
                <table className="table table-striped table-hover">
                    <thead>
                    <tr>
                        <th>
                            <div className="tableheader-and-sortbutton">
                                <div className="tableheader">
                                    Type
                                </div>
                                <div className="sortbutton">
                                    <button type="button" className="btn" onClick={() => this.sortResult("nutritionType", !this.state.sortType)}>
                                        {this.state.sortType ? (
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
                        <th>
                            <div className="tableheader-and-sortbutton">
                                <div className="tableheader">
                                    Injestion time
                                </div>
                                <div className="sortbutton">
                                    <button type="button" className="btn" style={{textAlign: "right"}} onClick={() => this.sortResult("injestionTime", !this.state.sortInjestionTime)}>
                                        {this.state.sortInjestionTime ? (
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
                        <th>
                            <div className="tableheader-and-sortbutton">
                                <div className="tableheader">
                                    Calories
                                </div>
                                <div className="sortbutton">
                                    <button type="button" className="btn" onClick={() => this.sortResult("calories", !this.state.sortCalories)}>
                                        {this.state.sortCalories ? (
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
                        <th>
                            Options
                        </th>
                    </tr>
                    </thead>
                    {this.state.dataLoaded ?
                        this.tableData()
                        :
                        <Spinner />
                    }
                </table>
            </div>
        )
    }

    render() {
        return (
            <div>
                <div className="page-header">Nutrition History</div>
                {/*{this.nutritionTable()}*/}
                <CRUDTable
                    table={this.state.table}
                    setTable={this.updateTable}
                    setCreateUpdateDelete={this.updateCreateUpdateDelete}
                />
                <AddUpdateModal
                    modalData={this.state.modalData}
                    setModalData={this.updateModalData}
                    //setModalData={(modalData: any) => this.updateModalData(modalData)}
                />
                <Notification
                    notify={this.state.notify}
                    setNotify={this.updateNotify}
                />
                <ConfirmationModal
                    confirmModal={this.state.confirmModal}
                    setConfirmModal={this.updateConfirmModal}
                />
            </div>
        )
    }
}