import React, {Component} from 'react';
import {api_urls} from '../../Api_urls'
import nutrition_picture from "../../Photos/users/defaultuser.png"

interface MyProps {
}
interface MyStates {
    nutritions: [],
    updateOrCreateModal: boolean,
    targetId: string,
    targetDescription: string,
    targetInjestionTime: string,
    targetNutritionType: string,
    targetCalories: number,
    sortType: boolean,
    sortInjestionTime: boolean,
    sortCalories: boolean,
    filterNutritions: string,
    nutritionsWithoutFilter: [],
}

export class NutritionHistory extends Component<MyProps, MyStates> {

    constructor(props: any) {
        super(props);
        this.state={
            nutritions: [],
            updateOrCreateModal: false,
            targetId: '',
            targetDescription: '',
            targetInjestionTime: '',
            targetNutritionType: 'Running',
            targetCalories: 0,
            sortType: false,
            sortInjestionTime: false,
            sortCalories: false,
            filterNutritions: '',
            nutritionsWithoutFilter: [],
        }
    }

    refreshList() {
        fetch(api_urls.NUTRITION_URL)
            .then(response => response.json())
            .then(data => {
                this.setState({nutritions: data.nutritions});
                this.setState({nutritionsWithoutFilter: data.nutritions})
            })
    }

    componentDidMount() {
        this.refreshList();
    }

    createClick() {
        fetch(api_urls.NUTRITION_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: null,
                description: this.state.targetDescription,
                calories: this.state.targetCalories,
                injestionTime: this.state.targetInjestionTime,
                nutritionType: this.state.targetNutritionType.toUpperCase(),
            })
        })
            .then(res => res.json())
            .then(() => {
                this.refreshList();
            }, (error) => {
                alert("Error: " + error);
            })
    }

    updateClick() {
        fetch(api_urls.NUTRITION_URL, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: this.state.targetId,
                description: this.state.targetDescription,
                calories: this.state.targetCalories,
                injestionTime: this.state.targetInjestionTime,
                nutritionType: this.state.targetNutritionType.toUpperCase(),
            })
        })
            .then(res => res.json())
            .then(() => {
                this.refreshList();
            }, (error) => {
                alert('Error:' + error);
            })
    }

    deleteClick(id: string) {
        (window.confirm('Are you sure?')) &&
        fetch(api_urls.NUTRITION_URL, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: id
        })
            .then(res => res.json())
            .then(() => {
                this.refreshList();
            }, (error) => {
                alert('Error' + error);
            })
    }

    imageUpload = (e: any) => {
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
    }

    changeNutritionFilter = (e: any) => {
        this.setState({filterNutritions: e.target.value});
        this.filterFunction(e.target.value);
    }

    nutritionTable() {
        let nutritionMap : any = this.state.nutritions;
        return (
            <div>
                <div className="page-section-header">Full history</div>
                <button
                    type="button"
                    className="btn btn-primary m-2 float-end"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() =>
                        this.setState({updateOrCreateModal: true,
                            targetId: '',
                            targetDescription: '',
                            targetInjestionTime: '',
                            targetCalories: 0,
                            targetNutritionType: 'Running',
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
                    <tbody>
                    {nutritionMap.map((nut : any) =>
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
                                        this.setState({updateOrCreateModal: false,
                                            targetId: nut.id,
                                            targetInjestionTime: nut.injestionTime,
                                            targetCalories: nut.calories,
                                            targetNutritionType: nut.nutritionType.charAt(0).toUpperCase() + nut.nutritionType.slice(1).toLowerCase(),
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
                                        this.deleteClick(nut.id);
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
                </table>
            </div>
        )
    }

    modalPopup() {
        return (
            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">
                                Edit nutrition
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            <div className="d-flex flex-row bd-highlight mb-3">
                                <div className="p-2 w-50 bd-highlight">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Description</span>
                                        <input type="text" className="form-control"
                                               placeholder={'Enter description...'}
                                               value={this.state.targetDescription}
                                               onChange={(e) => this.setState({targetDescription: e.target.value})}
                                        ></input>
                                    </div>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Time</span>
                                        <input type="text" className="form-control"
                                               placeholder={'Enter time...'}
                                               value={this.state.targetInjestionTime}
                                               onChange={(e) => this.setState({targetInjestionTime: e.target.value})}
                                        ></input>
                                    </div>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Title</span>
                                        <select className="form-select"
                                                placeholder={'Select an nutrition type...'}
                                                value={this.state.targetNutritionType}
                                                onChange={(e) => this.setState({targetNutritionType: e.target.value})}
                                            //onClick={(e) => this.setState({targetNutritionType: (e.target as HTMLInputElement).value})}
                                        >
                                            <option>
                                                Running
                                            </option>
                                            <option>
                                                Biking
                                            </option>
                                            <option>
                                                Swimming
                                            </option>
                                            {/*{dropdownVals.map((val: any) =>
                                                <option key={val.id}>
                                                    {val.targetVal}
                                                </option>)}*/}
                                        </select>
                                    </div>
                                </div>
                                <div className="p-2 w-50 bd-highlight">
                                    <img height="100px"
                                         src={nutrition_picture}
                                         alt="nutrition image"/>
                                    <input className="m-2" type="file" onChange={this.imageUpload}/>
                                </div>
                            </div>
                            <button
                                type="button"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                                className="btn btn-primary float-start data-bs-dismiss"
                                onClick={() => this.state.updateOrCreateModal ? this.createClick() : this.updateClick()}
                            >
                                {this.state.updateOrCreateModal ? 'Create' : 'Update'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div>
                <div className="page-header">Nutrition History</div>
                {this.nutritionTable()}
                {this.modalPopup()}
            </div>
        )
    }
}