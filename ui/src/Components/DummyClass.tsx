import React, {Component} from 'react';
import {Spinner} from "../Containers/Spinner";

interface MyProps {
}
interface MyStates {
}

export class DummyClass extends Component<MyProps, MyStates> {

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