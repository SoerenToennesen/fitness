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
        return (
            <div>
                Page not implemented
            </div>
        )
    }
}