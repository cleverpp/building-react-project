/**
 * Created by cpzhang on 2018/4/28.
 */
import React from 'react';
/*import $ from 'Zepto';*/
import addRecords from '../images/add-records.png';
import test30 from '../images/test30.png';
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
                <img src={addRecords}/>
                <img src={test30}/>
            </div>
        );
    }

}

export default container(Home);