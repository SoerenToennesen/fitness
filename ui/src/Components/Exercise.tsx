import React, {Component} from 'react';
import {api_urls} from '../Api_urls'

interface MyProps {
}
interface MyStates {
    exercises: any,
    modalTitle: string,
    ExerciseId: number,
    ExerciseName: string,
    ExerciseIdFilter: string,
    ExerciseNameFilter: string,
    exercisesWithoutFilter: [],
}

export class Exercise extends Component<MyProps, MyStates> {

    constructor(props: any) {
        super(props);
        this.state={
            exercises: [],
            modalTitle: "",
            ExerciseId: 0,
            ExerciseName: "",

            ExerciseIdFilter: "",
            ExerciseNameFilter: "",
            exercisesWithoutFilter: [],
        }
    }

    FilterFn() {
        var ExerciseIdFilter = this.state.ExerciseIdFilter;
        var ExerciseNameFilter = this.state.ExerciseNameFilter;

        var filteredData = this.state.exercisesWithoutFilter.filter(
            function(el: any) {
                return el.ExerciseId.toString().toLowerCase().includes(
                    ExerciseIdFilter.toString().trim().toLowerCase()
                ) &&
                el.ExerciseName.toString().toLowerCase().includes(
                    ExerciseNameFilter.toString().trim().toLowerCase()
                )
            }
        );
        this.setState({exercises: filteredData});
    }

    sortResult(prop: any, asc: boolean) {
        var sortedData = this.state.exercisesWithoutFilter.sort(function(a,b) {
            if (asc) {
                return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
            } else {
                return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
            }
        });
        this.setState({exercises: sortedData});
    }

    changeExerciseIdFilter = (e: any) => {
        this.setState({ExerciseIdFilter: e.target.value});
        this.FilterFn();
    }
    changeExerciseNameFilter = (e: any) => {
        this.setState({ExerciseNameFilter: e.target.value});
        this.FilterFn();
    }

    refreshList() {

    }

    componentDidMount() {
        this.refreshList();
    }

    createClick() {
        fetch(api_urls.API_URL + 'exercise', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ExerciseName: this.state.ExerciseName
            })
        })
        .then(res => res.json())
        .then((result) => {
            alert(result);
            this.refreshList();
        }, (error) => {
            alert('Failed');
        })
    }

    updateClick() {
        fetch(api_urls.API_URL + 'exercise', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ExerciseId: this.state.ExerciseId,
                ExerciseName: this.state.ExerciseName
            })
        })
        .then(res => res.json())
        .then((result) => {
            alert(result);
            this.refreshList();
        }, (error) => {
            alert('Failed');
        })
    }

    deleteClick(id: string) {
        if (window.confirm('Are you sure?')) {
            fetch(api_urls.API_URL + 'exercise/' + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then((result) => {
                alert(result);
                this.refreshList();
            }, (error) => {
                alert('Failed');
            })
        }
    }

    render() {
        const {exercises, modalTitle, ExerciseId, ExerciseName} = this.state;
        return (
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                <div className="d-flex flex-row">
                                    <input className="form-control m-2" onChange={this.changeExerciseIdFilter} placeholder="Filter"/>
                                    <button type="button" className="btn btn-light" onClick={() => this.sortResult("ExerciseId", true)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                                        </svg>
                                    </button>
                                    <button type="button" className="btn btn-light" onClick={() => this.sortResult("ExerciseId", false)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                                        </svg>
                                    </button>
                                </div>
                                ExerciseId
                            </th>
                            <th>
                                <div className="d-flex flex-row">
                                    <input className="form-control m-2" onChange={this.changeExerciseNameFilter} placeholder="Filter"/>
                                    <button type="button" className="btn btn-light" onClick={() => this.sortResult("ExerciseName", true)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                                        </svg>
                                    </button>
                                    <button type="button" className="btn btn-light" onClick={() => this.sortResult("ExerciseName", false)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                                        </svg>
                                    </button>
                                </div>
                                ExerciseName
                            </th>
                            <th>
                                Options
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {exercises.map((dep : any) =>
                            <tr key={dep.ExerciseId}>
                                <td>{dep.ExerciseId}</td>
                                <td>{dep.ExerciseName}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-light mr-1"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={() => {}}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                            </svg>
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-light mr-1"
                                        onClick={() => this.deleteClick(dep.ExerciseId)}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                            </svg>
                                    </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <button
                    type="button"
                    className="btn btn-primary m-2 float-end"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => {}}
                >
                    Add exercise
                </button>

                <div className="modal fade" id="exampleModal" tabIndex={-1} aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {modalTitle}
                                </h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">

                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="input-group mb-3">
                                    <span className="input-group-text">ExerciseName</span>
                                    <input type="text" className="form-control"
                                    value={ExerciseName}
                                    onChange={() => {}}></input>
                                </div>
                                {ExerciseId === 0 ?
                                <button 
                                    type="button"
                                    className="btn btn-primary float-start"
                                    onClick={() => this.createClick()}
                                    >
                                        Create
                                </button>
                                : null}
                                {ExerciseId !== 0 ?
                                <button
                                    type="button"
                                    className="btn btn-primary float-start"
                                    onClick={() => this.updateClick()}
                                    >
                                        Update
                                </button>
                                : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}