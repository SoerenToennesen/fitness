import React, {Component} from 'react';
import {api_urls} from '../../Api_urls'
import default_exercise_image from "../../Photos/nutritions/defaultexercise.png";
import Notification from "../../Containers/Notification";
import ConfirmationModal from "../../Containers/ConfirmationModal";
import Spinner from "../../Containers/Spinner";
import {MyNotification} from "../../Containers/interfaces/NotificationInterface";
import {MyConfirmationModal} from "../../Containers/interfaces/ConfirmationModalInterface";
import {MyModalData} from "../../Containers/interfaces/AddUpdateModalInterface";
import AddUpdateModal from "../../Containers/AddUpdateModal";

interface MyProps {
}
interface MyStates {
    exercises: [],
    updateOrCreateModal: boolean,
    targetId: string,
    targetType: string,
    targetExerciseTime: string,
    targetExerciseLength: string,
    targetExerciseType: string,
    targetCaloriesBurned: number,
    sortType: boolean,
    sortExerciseLength: boolean
    sortExerciseTime: boolean,
    sortCaloriesBurned: boolean,
    filterExercises: string,
    exercisesWithoutFilter: [],
    modalData: MyModalData,
    notify: MyNotification,
    confirmModal: MyConfirmationModal,
    dataLoaded: boolean,
}

export class ExerciseHistory extends Component<MyProps, MyStates> {

    constructor(props: any) {
        super(props);
        this.state={
            exercises: [],
            updateOrCreateModal: false,
            targetId: '',
            targetType: '',
            targetExerciseTime: '',
            targetExerciseLength: '',
            targetExerciseType: 'Running',
            targetCaloriesBurned: 0,
            sortType: false,
            sortExerciseLength: false,
            sortExerciseTime: false,
            sortCaloriesBurned: false,
            filterExercises: '',
            exercisesWithoutFilter: [],
            modalData: this.resetModalData(),
            notify: {isOpen: false, message: '', type: ''},
            confirmModal: {isOpen: false, title: '', subTitle: '', onConfirm: () => {}},
            dataLoaded: true,
        }
        this.updateNotify=this.updateNotify.bind(this);
        this.updateConfirmModal=this.updateConfirmModal.bind(this);
        this.updateModalData=this.updateModalData.bind(this);
    }

    componentDidMount() {
        this.refreshList();
    }

    refreshList() {
        this.setState({dataLoaded: false})
        fetch(api_urls.EXERCISE_URL)
            .then(response => response.json())
            .then(data => {
                this.setState({exercises: data.exercises});
                this.setState({exercisesWithoutFilter: data.exercises})
                this.setState({dataLoaded: true})
            }, (error) => {
                console.log('Backend services probably not started up.\nError message: ' + error);
                this.setState({dataLoaded: true})
            })
    }

    resetModalData() {
        return {
            title: 'exercise',
            inputTexts: [
                {type: 'Exercise length', placeholder: 'Enter exercise length...', input: ''},
                {type: 'Calories burned', placeholder: 'Enter calories burned...', input: ''},
                {type: 'Description', placeholder: 'Enter description...', input: ''},
            ],
            inputDropdowns: [
                {
                    options: [
                        {id: '1', value: 'Running'},
                        {id: '2', value: 'Swimming'},
                        {id: '3', value: 'Biking'},
                        {id: '4', value: 'Powerlifting'},
                    ], placeholder: 'Select an exercise type...', input: ''
                },
            ],
            inputImage: {
                src: default_exercise_image,
                alt: 'Default exercise image'
            },
            buttonTitle: '',
            createOrUpdateClicked: false
        };
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
        fetch(api_urls.EXERCISE_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: null,
                exerciseLength: modalData.inputTexts[0].input,
                caloriesBurned: modalData.inputTexts[1].input,
                description: modalData.inputTexts[2].input,
                exerciseType: modalData.inputDropdowns[0].input,
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
        fetch(api_urls.EXERCISE_URL, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: null,
                exerciseLength: modalData.inputTexts[0].input,
                caloriesBurned: modalData.inputTexts[1].input,
                description: modalData.inputTexts[2].input,
                exerciseType: modalData.inputDropdowns[0].input,
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
        fetch(api_urls.EXERCISE_URL, {
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
            notify: {isOpen: true, message: 'Deleted successfully', type: 'success'}
        });
    }

    resetSorts(sortingField: string, asc: boolean) {
        switch (sortingField) {
            case 'exerciseType':
                this.setState({
                    sortType: asc,
                    sortExerciseLength: false,
                    sortExerciseTime: false,
                    sortCaloriesBurned: false,
                });
                break;
            case 'exerciseLength':
                this.setState({
                    sortType: false,
                    sortExerciseLength: asc,
                    sortExerciseTime: false,
                    sortCaloriesBurned: false,
                });
                break;
            case 'exerciseTime':
                this.setState({
                    sortType: false,
                    sortExerciseLength: false,
                    sortExerciseTime: asc,
                    sortCaloriesBurned: false,
                });
                break;
            case 'caloriesBurned':
                this.setState({
                    sortType: false,
                    sortExerciseLength: false,
                    sortExerciseTime: false,
                    sortCaloriesBurned: asc,
                });
                break;
            default:
                this.setState({
                    sortType: false,
                    sortExerciseLength: false,
                    sortExerciseTime: false,
                    sortCaloriesBurned: false,
                });
        }
    }

    sortResult(prop: any, asc: boolean) {
        var isNumber = false
        if (prop === 'exerciseLength') isNumber = true;
        var sortedData = this.state.exercises.sort(function(a,b) {
            if (asc) {
                if (isNumber) return (parseInt(a[prop]) > parseInt(b[prop])) ? 1 : ((parseInt(a[prop]) < parseInt(b[prop])) ? -1 : 0);
                return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
            } else {
                if (isNumber) return (parseInt(b[prop]) > parseInt(a[prop])) ? 1 : ((parseInt(b[prop]) < parseInt(a[prop])) ? -1 : 0);
                return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
            }
        });
        this.setState({exercises: sortedData});
        this.resetSorts(prop, asc);
    }

    filterFunction(input: string) {
        const filteredData: any = this.state.exercisesWithoutFilter.filter(
            function(el: any) {
                return el.exerciseType.toString().toLowerCase().includes(
                        input.toString().trim().toLowerCase()
                    ) ||
                    el.exerciseLength.toString().toLowerCase().includes(
                        input.toString().trim().toLowerCase()
                    ) ||
                    el.exerciseTime.toString().toLowerCase().includes(
                        input.toString().trim().toLowerCase()
                    ) ||
                    el.caloriesBurned.toString().toLowerCase().includes(
                        input.toString().trim().toLowerCase()
                    )
            }
        );
        this.setState({exercises: filteredData});
    }

    changeExerciseFilter = (e: any) => {
        this.setState({filterExercises: e.target.value});
        this.filterFunction(e.target.value);
    }

    tableData() {
        return (
            <tbody>
                {this.state.exercises.map((exe : any) =>
                    <tr key={exe.id}>
                        <td>{exe.exerciseType}</td>
                        <td>{exe.exerciseLength + ' minutes'}</td>
                        <td>{exe.exerciseTime}</td>
                        <td>{exe.caloriesBurned}</td>
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
                                            title: 'Do you want to delete exercise ' + exe.exerciseType + ' for ' + exe.exerciseLength + ' minutes at ' + exe.exerciseTime + '?',
                                            subTitle: 'This will permanently delete this record.',
                                            onConfirm: () => {this.deleteClick(exe.id)}
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

    exerciseTable() {
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
                    Add exercise
                </button>
                <input className="form-control m-2" style={{maxWidth: "300px", position: "relative", left: "-10px", top: "20px"}} onChange={this.changeExerciseFilter} placeholder="Filter"/>
                <table className="table table-striped table-hover">
                    <thead>
                    <tr>
                        <th>
                            <div className="tableheader-and-sortbutton">
                                <div className="tableheader">
                                    Type
                                </div>
                                <div className="sortbutton">
                                    <button type="button" className="btn" onClick={() => this.sortResult("exerciseType", !this.state.sortType)}>
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
                                    Length
                                </div>
                                <div className="sortbutton">
                                    <button type="button" className="btn" style={{textAlign: "right"}} onClick={() => this.sortResult("exerciseLength", !this.state.sortExerciseLength)}>
                                        {this.state.sortExerciseLength ? (
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
                                    Time
                                </div>
                                <div className="sortbutton">
                                    <button type="button" className="btn" style={{textAlign: "right"}} onClick={() => this.sortResult("exerciseTime", !this.state.sortExerciseTime)}>
                                        {this.state.sortExerciseTime ? (
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
                                    Calories burned
                                </div>
                                <div className="sortbutton">
                                    <button type="button" className="btn" onClick={() => this.sortResult("caloriesBurned", !this.state.sortCaloriesBurned)}>
                                        {this.state.sortCaloriesBurned ? (
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
                <div className="page-header">Exercise History</div>
                {/*TODO: All below should be refactored into a table component*/}
                {this.exerciseTable()}
                <AddUpdateModal
                    modalData={this.state.modalData}
                    setModalData={(modalData: any) => this.updateModalData(modalData)}
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