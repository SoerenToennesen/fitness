import React, {Component} from 'react';
import {api_urls} from '../../Api_urls'

interface MyProps {
}
interface MyStates {
    nutritions: any,
    breakfasts: [],
    lunches: [],
    dinners: [],
    modalTitle: string,
    NutritionId: number,
    NutritionName: string,
    NutritionIdFilter: string,
    NutritionNameFilter: string,
    nutritionsWithoutFilter: [],
}

export class Nutrition extends Component<MyProps, MyStates> {

    constructor(props: any) {
        super(props);
        this.state={
            nutritions: [],
            breakfasts: [],
            lunches: [],
            dinners: [],
            modalTitle: "",
            NutritionId: 0,
            NutritionName: "",

            NutritionIdFilter: "",
            NutritionNameFilter: "",
            nutritionsWithoutFilter: [],
        }
    }

    FilterFn() {
        var NutritionIdFilter = this.state.NutritionIdFilter;
        var NutritionNameFilter = this.state.NutritionNameFilter;

        var filteredData = this.state.nutritionsWithoutFilter.filter(
            function(el: any) {
                return el.NutritionId.toString().toLowerCase().includes(
                    NutritionIdFilter.toString().trim().toLowerCase()
                ) &&
                el.NutritionName.toString().toLowerCase().includes(
                    NutritionNameFilter.toString().trim().toLowerCase()
                )
            }
        );
        this.setState({nutritions: filteredData});
    }

    sortResult(prop: any, asc: boolean) {
        var sortedData = this.state.nutritionsWithoutFilter.sort(function(a,b) {
            if (asc) {
                return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
            } else {
                return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
            }
        });
        this.setState({nutritions: sortedData});
    }

    changeNutritionIdFilter = (e: any) => {
        this.setState({NutritionIdFilter: e.target.value});
        this.FilterFn();
    }
    changeNutritionNameFilter = (e: any) => {
        this.setState({NutritionNameFilter: e.target.value});
        this.FilterFn();
    }

    refreshList() {
        fetch(api_urls.NUTRITION_URL)
            .then(response => response.json())
            .then(data => {
                console.log('nutrition data', data);
                this.setState({nutritions: data.nutritions});
                this.setState({breakfasts: data.nutritions.filter(function (nut: any) {
                        return nut.nutritionType === "BREAKFAST"
                    })});
                this.setState({lunches: data.nutritions.filter(function (nut: any) {
                        return nut.nutritionType === "LUNCH"
                    })});
                this.setState({dinners: data.nutritions.filter(function (nut: any) {
                        return nut.nutritionType === "DINNER"
                    })});
            })
    }

    componentDidMount() {
        this.refreshList();
    }

    createClick() {
        fetch(api_urls.API_URL + 'nutrition', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                NutritionName: this.state.NutritionName
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
        fetch(api_urls.API_URL + 'nutrition', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                NutritionId: this.state.NutritionId,
                NutritionName: this.state.NutritionName
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
            fetch(api_urls.API_URL + 'nutrition/' + id, {
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
        const {nutritions, modalTitle, NutritionId, NutritionName} = this.state;
        return (
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                <div className="d-flex flex-row">
                                    <input className="form-control m-2" onChange={this.changeNutritionIdFilter} placeholder="Filter"/>
                                    <button type="button" className="btn btn-light" onClick={() => this.sortResult("NutritionId", true)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                                        </svg>
                                    </button>
                                    <button type="button" className="btn btn-light" onClick={() => this.sortResult("NutritionId", false)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                                        </svg>
                                    </button>
                                </div>
                                NutritionId
                            </th>
                            <th>
                                <div className="d-flex flex-row">
                                    <input className="form-control m-2" onChange={this.changeNutritionNameFilter} placeholder="Filter"/>
                                    <button type="button" className="btn btn-light" onClick={() => this.sortResult("NutritionName", true)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                                        </svg>
                                    </button>
                                    <button type="button" className="btn btn-light" onClick={() => this.sortResult("NutritionName", false)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                                        </svg>
                                    </button>
                                </div>
                                NutritionName
                            </th>
                            <th>
                                Options
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {nutritions.map((dep : any) =>
                            <tr key={dep.NutritionId}>
                                <td>{dep.NutritionId}</td>
                                <td>{dep.NutritionName}</td>
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
                                        onClick={() => this.deleteClick(dep.NutritionId)}
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
                    Add nutrition
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
                                    <span className="input-group-text">NutritionName</span>
                                    <input type="text" className="form-control"
                                    value={NutritionName}
                                    onChange={() => {}}></input>
                                </div>
                                {NutritionId === 0 ?
                                <button 
                                    type="button"
                                    className="btn btn-primary float-start"
                                    onClick={() => this.createClick()}
                                    >
                                        Create
                                </button>
                                : null}
                                {NutritionId !== 0 ?
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