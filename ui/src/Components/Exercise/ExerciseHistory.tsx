import React, {Component} from 'react';
import {api_urls} from '../../Api_urls'
import nutrition_picture from "../../Photos/users/defaultuser.png"
import {Spinner} from "../../Containers/Spinner";

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

export class ExerciseHistory extends Component<MyProps, MyStates> {

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



    render() {
        return (
            <Spinner />
        )
    }
}