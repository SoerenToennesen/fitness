import React, {Component} from 'react';
import {api_urls} from '../../Api_urls'
import nutrition_picture from "../../Photos/users/defaultuser.png"
import {Spinner} from "../../Containers/Spinner";

interface MyProps {
}
interface MyStates {
}

export class ExerciseHistory extends Component<MyProps, MyStates> {

    constructor(props: any) {
        super(props);
        this.state={
        }
    }

    render() {
        return (
            <Spinner />
        )
    }
}