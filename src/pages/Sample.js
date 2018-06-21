/**
 * Created by cpzhang on 2018/4/28.
 */
import React from 'react';
import addRecords from '../images/normal/add-records.png';
import test30 from '../images/normal/test30.png';
import './Home.css'
import container from '../store/container';

class Sample extends React.Component {

    componentDidMount() {
        console.log('Sample');
        console.log(this.props.rootLocationInfo);
    }

    render() {
        return (
            <div>
                <p>This is Sample page</p>
                <img src={addRecords}/>
                <img src={test30}/>
            </div>
        );
    }

}


export default container(Sample);