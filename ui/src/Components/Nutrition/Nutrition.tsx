import React, {Component} from 'react';

interface MyProps {
}
interface MyStates {
}

export class Nutrition extends Component<MyProps, MyStates> {

    constructor(props: any) {
        super(props);
        this.state={}
    }

    refreshList() {}

    componentDidMount() {
        this.refreshList();
    }

    render() {
        return (
            <div>
                <div>
                    Page not implemented
                </div>
                <div>
                    Should include graph of goal calorie intake line, and where you are, and suggest based on what you need to reach this line.
                </div>
            </div>
        )
    }
}