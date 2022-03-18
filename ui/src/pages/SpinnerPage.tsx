import React, {Component} from 'react';
import Spinner from "../components/Spinner";

interface MyProps {
}
interface MyStates {
}

export class SpinnerPage extends Component<MyProps, MyStates> {

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