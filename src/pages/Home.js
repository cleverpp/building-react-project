/**
 * Created by cpzhang on 2018/4/28.
 */
import React from 'react';
/*import $ from 'Zepto';*/
import './Home.css';

import container from '../store/container';

class Home extends React.Component {
    componentDidMount() {
        console.log("Home");
        console.log(this.props.rootLocationInfo);
    }

    render() {
        return (
            <div>
                <p>Hello,Welcome to Home</p>
            </div>
        );
    }

}

export default container(Home);