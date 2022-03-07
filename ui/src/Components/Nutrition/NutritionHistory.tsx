import React, {Component} from 'react';
import {api_urls} from '../../Api_urls'
import nutrition_picture from "../../Photos/users/defaultuser.png"

interface MyProps {
}
interface MyStates {
    nutritions: [],
    breakfasts: [],
    lunches: [],
    dinners: [],
    updateOrCreateModal: boolean,
    targetId: string,
    targetDescription: string,
    targetCalories: string,
    targetInjestionTime: string,
    targetNutritionType: string,
}

export class NutritionHistory extends Component<MyProps, MyStates> {

    constructor(props: any) {
        super(props);
        this.state={
            nutritions: [],
            breakfasts: [],
            lunches: [],
            dinners: [],
            updateOrCreateModal: false,
            targetId: '',
            targetDescription: '',
            targetCalories: '',
            targetInjestionTime: '',
            targetNutritionType: 'Breakfast',
        }
    }

    refreshList() {
        fetch(api_urls.NUTRITION_URL)
            .then(response => response.json())
            .then(data => {
                console.log(data)
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

    nutritionTypeTable(nutritionType: String) {
        let nutritionMap : any = [];
        let title : String = ""
        switch (nutritionType) {
            case "BREAKFAST":
                nutritionMap = this.state.breakfasts;
                title = "Breakfasts";
                break;
            case "LUNCH":
                nutritionMap = this.state.lunches;
                title = "Lunches";
                break;
            case "DINNER":
                nutritionMap = this.state.dinners;
                title = "Dinners";
                break;
        }
        return (
            <div>
                <h3 style={{paddingLeft: "5px"}}>{title}</h3>
                <table className="table table-striped table-hover">
                    <thead>
                    <tr>
                        <th>
                            Description
                        </th>
                        <th>
                            Calories
                        </th>
                        <th>
                            Injestion time
                        </th>
                        <th>
                            Options
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {nutritionMap.map((nut : any) =>
                        <tr key={nut.id}>
                            <td>{nut.description}</td>
                            <td>{nut.calories}</td>
                            <td>{nut.injestionTime}</td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-light mr-1"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                    onClick={() => {
                                        this.setState({updateOrCreateModal: false,
                                            targetId: nut.id,
                                            targetDescription: nut.description,
                                            targetCalories: nut.calories,
                                            targetInjestionTime: nut.injestionTime,
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
                                        <span className="input-group-text">Calories</span>
                                        <input type="text" className="form-control"
                                               placeholder={'Enter calories...'}
                                               value={this.state.targetCalories}
                                               onChange={(e) => this.setState({targetCalories: e.target.value})}
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
                                                Breakfast
                                            </option>
                                            <option>
                                                Lunch
                                            </option>
                                            <option>
                                                Dinner
                                            </option>
                                            {/*{dropdownVals.map((val: any) =>
                                                <option key={val.id}>
                                                    {val.targetVal}
                                                </option>)}*/}
                                        </select>
                                    </div>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Injestion time</span>
                                        <input type="date" className="form-control"
                                               value={this.state.targetInjestionTime}
                                               onChange={(e) => this.setState({targetInjestionTime: e.target.value})}
                                        ></input>
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
                {this.nutritionTypeTable("BREAKFAST")}
                {this.nutritionTypeTable("LUNCH")}
                {this.nutritionTypeTable("DINNER")}
                <button
                    type="button"
                    className="btn btn-primary m-2 float-end"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() =>
                        this.setState({updateOrCreateModal: true,
                            targetId: '',
                            targetDescription: '',
                            targetCalories: '',
                            targetInjestionTime: '',
                            targetNutritionType: 'Breakfast',
                        })
                    }
                >
                    Add nutrition
                </button>
                {this.modalPopup()}
            </div>
        )
    }
}