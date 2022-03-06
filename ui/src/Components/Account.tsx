import React, {Component} from 'react';
import {api_urls} from '../Api_urls'
import account_picture from "../Photos/users/defaultuser.png"

interface MyProps {
}
interface MyStates {
    accounts: [],
    clients: [],
    managers: [],
    admins: [],
    updateOrCreateModal: boolean,
    targetId: string,
    targetFirstName: string,
    targetLastName: string,
    targetEmail: string,
    targetDateOfBirth: string,
    targetAccountType: string,
}

export class Account extends Component<MyProps, MyStates> {

    constructor(props: any) {
        super(props);
        this.state={
            accounts: [],
            clients: [],
            managers: [],
            admins: [],
            updateOrCreateModal: false,
            targetId: '',
            targetFirstName: '',
            targetLastName: '',
            targetEmail: '',
            targetDateOfBirth: '',//new Date(Date.now()).toISOString().split('T')[0],
            targetAccountType: 'Client',
        }
    }

    refreshList() {
        fetch(api_urls.ACCOUNT_URL)
            .then(response => response.json())
            .then(data => {
                this.setState({accounts: data.accounts});
                this.setState({clients: data.accounts.filter(function (acc: any) {
                    return acc.accountType === "CLIENT"
                })});
                this.setState({managers: data.accounts.filter(function (acc: any) {
                    return acc.accountType === "MANAGER"
                })});
                this.setState({admins: data.accounts.filter(function (acc: any) {
                    return acc.accountType === "ADMIN"
                })});
            })
    }

    componentDidMount() {
        this.refreshList();
    }

    createClick() {
        fetch(api_urls.ACCOUNT_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: null,
                firstName: this.state.targetFirstName,
                lastName: this.state.targetLastName,
                dateOfBirth: this.state.targetDateOfBirth,
                email: this.state.targetEmail,
                accountType: this.state.targetAccountType.toUpperCase(),
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
        fetch(api_urls.ACCOUNT_URL, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: this.state.targetId,
                firstName: this.state.targetFirstName,
                lastName: this.state.targetLastName,
                dateOfBirth: this.state.targetDateOfBirth,
                email: this.state.targetEmail,
                accountType: this.state.targetAccountType.toUpperCase(),
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
        fetch(api_urls.ACCOUNT_URL, {
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
        /*e.preventDefault();
        const formData = new FormData();
        formData.append("file", e.target.files[0], e.target.files[0].name);
        fetch(api_urls.API_URL + "account/savefile", {
            method: "POST",
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            this.setState({PhotoFileName: data});
        })*/
    }

    accountTypeTable(accountType: String) {
        let accountMap : any = [];
        let title : String = ""
        switch (accountType) {
            case "CLIENT":
                accountMap = this.state.clients;
                title = "Clients";
                break;
            case "MANAGER":
                accountMap = this.state.managers;
                title = "Managers";
                break;
            case "ADMIN":
                accountMap = this.state.admins;
                title = "Admins";
                break;
        }
        return (
            <div>
                <h3 style={{paddingLeft: "5px"}}>{title}</h3>
                <table className="table table-striped table-hover">
                    <thead>
                    <tr>
                        <th>
                            Name
                        </th>
                        <th>
                            Date of Birth
                        </th>
                        <th>
                            E-mail
                        </th>
                        <th>
                            Options
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {accountMap.map((acc : any) =>
                        <tr key={acc.id}>
                            <td>{acc.firstName + ' ' + acc.lastName}</td>
                            <td>{acc.dateOfBirth}</td>
                            <td>{acc.email}</td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-light mr-1"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                    onClick={() => {
                                        this.setState({updateOrCreateModal: false,
                                                            targetId: acc.id,
                                                            targetFirstName: acc.firstName,
                                                            targetLastName: acc.lastName,
                                                            targetDateOfBirth: acc.dateOfBirth,
                                                            targetEmail: acc.email,
                                                            targetAccountType: acc.accountType.charAt(0).toUpperCase() + acc.accountType.slice(1).toLowerCase(),
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
                                        this.deleteClick(acc.id);
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
                                Edit account
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            <div className="d-flex flex-row bd-highlight mb-3">
                                <div className="p-2 w-50 bd-highlight">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">First name</span>
                                        <input type="text" className="form-control"
                                            placeholder={'Enter first name...'}
                                            value={this.state.targetFirstName}
                                               onChange={(e) => this.setState({targetFirstName: e.target.value})}
                                        ></input>
                                        <span className="input-group-text">Last name</span>
                                        <input type="text" className="form-control"
                                            placeholder={'Enter last name...'}
                                            value={this.state.targetLastName}
                                            onChange={(e) => this.setState({targetLastName: e.target.value})}
                                        ></input>
                                    </div>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">E-mail</span>
                                        <input type="text" className="form-control"
                                            placeholder={'Enter e-mail...'}
                                            value={this.state.targetEmail}
                                            onChange={(e) => this.setState({targetEmail: e.target.value})}
                                        ></input>
                                    </div>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Title</span>
                                        <select className="form-select"
                                                placeholder={'Select an account type...'}
                                                value={this.state.targetAccountType}
                                                onChange={(e) => this.setState({targetAccountType: e.target.value})}
                                                //onClick={(e) => this.setState({targetAccountType: (e.target as HTMLInputElement).value})}
                                            >
                                            <option>
                                                Client
                                            </option>
                                            <option>
                                                Manager
                                            </option>
                                            <option>
                                                Admin
                                            </option>
                                            {/*{dropdownVals.map((val: any) =>
                                                <option key={val.id}>
                                                    {val.targetVal}
                                                </option>)}*/}
                                        </select>
                                    </div>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Date of birth</span>
                                        <input type="date" className="form-control"
                                            value={this.state.targetDateOfBirth}
                                            onChange={(e) => this.setState({targetDateOfBirth: e.target.value})}
                                        ></input>
                                    </div>
                                </div>
                                <div className="p-2 w-50 bd-highlight">
                                    <img height="100px"
                                         src={account_picture}
                                         alt="account image"/>
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
                {this.accountTypeTable("CLIENT")}
                {this.accountTypeTable("MANAGER")}
                {this.accountTypeTable("ADMIN")}
                <button
                    type="button"
                    className="btn btn-primary m-2 float-end"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() =>
                        this.setState({updateOrCreateModal: true,
                                            targetId: '',
                                            targetFirstName: '',
                                            targetLastName: '',
                                            targetDateOfBirth: '',
                                            targetEmail: '',
                                            targetAccountType: 'Client',
                        })
                    }
                >
                    Add account
                </button>
                {this.modalPopup()}
            </div>
        )
    }
}