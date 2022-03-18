import React, {Component} from 'react';
import {api_urls} from '../../Api_urls'
import default_nutrition_image from "../../Photos/nutritions/defaultnutrition.svg"
import Notification from "../../Containers/Notification";
import ConfirmationModal from "../../Containers/ConfirmationModal";
import AddUpdateModal from "../../Containers/AddUpdateModal";
import {MyModalData} from "../../Containers/interfaces/AddUpdateModalInterface";
import {MyConfirmationModal} from "../../Containers/interfaces/ConfirmationModalInterface";
import {MyNotification} from "../../Containers/interfaces/NotificationInterface";
import {MyTable} from "../../Containers/interfaces/TableInterface";
import CRUDTable from "../../Containers/CRUDTable";
import {deleteRest} from "../../Containers/actions/RestCalls";

interface MyProps {}
interface MyStates {
    tableDataWithoutFilter: [],
    table: MyTable,
    modalData: MyModalData,
    notify: MyNotification,
    confirmModal: MyConfirmationModal,
}

export class NutritionHistory extends Component<MyProps, MyStates> {

    constructor(props: any) {
        super(props);
        this.state={
            tableDataWithoutFilter: [],
            table: {
                title: 'Full history',
                addTitle: 'Add nutrition',
                filter: '',
                headers: [
                    {field: 'Type', sortDirection: false, dataField: 'nutritionType'},
                    {field: 'Injestion time', sortDirection: false, dataField: 'injestionTime'},
                    {field: 'Calories', sortDirection: false, dataField: 'calories'},
                ],
                sortField: '',
                dataLoaded: false,
                data: [],
                createOrUpdate: '',
                sortDirection: false,
            },
            modalData: this.resetModalData(),
            notify: {isOpen: false, message: '', type: ''},
            confirmModal: {isOpen: false, title: '', subTitle: '', onConfirm: () => {}},
        }
        this.updateNotify=this.updateNotify.bind(this);
        this.updateConfirmModal=this.updateConfirmModal.bind(this);
        this.updateModalData=this.updateModalData.bind(this);
        this.updateTable=this.updateTable.bind(this);
        this.updateCreateUpdateDelete=this.updateCreateUpdateDelete.bind(this);
        this.updateSort=this.updateSort.bind(this);
        this.filterFunction=this.filterFunction.bind(this);
    }

    componentDidMount() {
        this.refreshList();
    }

    refreshList() {
        this.setState({table: {...this.state.table, dataLoaded: false}})
        fetch(api_urls.NUTRITION_URL)
            .then(response => response.json())
            .then(data => {
                this.setState({table: {...this.state.table, data: data.nutritions, dataLoaded: true}})
                this.setState({tableDataWithoutFilter: data.nutritions})
            }, (error) => {
                console.log('Backend services probably not started up.\nError message: ' + error);
                this.setState({table: {...this.state.table, dataLoaded: true}})
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
                {type: 'Calcium', placeholder: 'Enter calcium...', input: ''},
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
            default:
                this.setState({
                    modalData: {...this.resetModalData(), buttonTitle: nextState.choice}
                })
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
        // TODO: Fix this POST call
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
                carbohydrates: modalData.inputTexts[2].input,
                fats: modalData.inputTexts[3].input,
                proteins: modalData.inputTexts[4].input,
                calcium: modalData.inputTexts[5].input,
                folate: modalData.inputTexts[6].input,
                iron: modalData.inputTexts[7].input,
                vitaminB6: modalData.inputTexts[8].input,
                vitaminB12: modalData.inputTexts[9].input,
                vitaminC: modalData.inputTexts[10].input,
                vitaminD: modalData.inputTexts[11].input,
                zinc: modalData.inputTexts[12].input,
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
        const returnMessage = deleteRest(api_urls.NUTRITION_URL, id);
        this.setState(returnMessage);
        if (returnMessage.notify.type === 'success') {
            this.setState({
                table: {
                    ...this.state.table, data: this.state.table.data.filter((x: any) => {return x.id !== id}) as any
                }
            })
        }
    }

    resetSorts(sortingField: string, asc: boolean) {
        switch (sortingField) {
            case 'nutritionType':
                this.setState({
                    table: {...this.state.table, headers: [
                        {field: 'Type', sortDirection: asc, dataField: 'nutritionType'},
                        {field: 'Injestion time', sortDirection: false, dataField: 'injestionTime'},
                        {field: 'Calories', sortDirection: false, dataField: 'calories'},
                    ]},
                });
                break;
            case 'injestionTime':
                this.setState({
                    table: {...this.state.table, headers: [
                        {field: 'Type', sortDirection: false, dataField: 'nutritionType'},
                        {field: 'Injestion time', sortDirection: asc, dataField: 'injestionTime'},
                        {field: 'Calories', sortDirection: false, dataField: 'calories'},
                    ]},
                });
                break;
            case 'calories':
                this.setState({
                    table: {...this.state.table, headers: [
                        {field: 'Type', sortDirection: false, dataField: 'nutritionType'},
                        {field: 'Injestion time', sortDirection: false, dataField: 'injestionTime'},
                        {field: 'Calories', sortDirection: asc, dataField: 'calories'},
                    ]},
                });
                break;
            default:
                this.setState({
                    table: {...this.state.table, headers: [
                        {field: 'Type', sortDirection: false, dataField: 'nutritionType'},
                        {field: 'Injestion time', sortDirection: false, dataField: 'injestionTime'},
                        {field: 'Calories', sortDirection: false, dataField: 'calories'},
                    ]},
                });
        }
    }

    updateSort(props: any) {
        var sortedData = this.state.table.data.sort(function(a,b) {
            if (props.sortDirection) {
                return (a[props.sortField] > b[props.sortField]) ? 1 : ((a[props.sortField] < b[props.sortField]) ? -1 : 0);
            } else {
                return (b[props.sortField] > a[props.sortField]) ? 1 : ((b[props.sortField] < a[props.sortField]) ? -1 : 0);
            }
        });
        this.setState({table: {...this.state.table, data: sortedData}})
        this.resetSorts(props.sortField, props.sortDirection);
    }

    filterFunction(input: string) {
        const filteredData: any = this.state.tableDataWithoutFilter.filter(
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
        this.setState({table: {...this.state.table, data: filteredData}})
    }

    render() {
        return (
            <div>
                {/*<Table
                    title={'Full history'}
                    setTable={this.updateTable}
                    setCreateUpdateDelete={this.updateCreateUpdateDelete}
                />*/}
                <div className="page-header">Nutrition History</div>
                <CRUDTable
                    table={this.state.table}
                    setTable={this.updateTable}
                    setCreateUpdateDelete={this.updateCreateUpdateDelete}
                    setFilter={this.filterFunction}
                    setSort={this.updateSort}
                />
                <AddUpdateModal
                    modalData={this.state.modalData}
                    setModalData={this.updateModalData}
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