/**
 * Created by cpzhang on 2018/4/28.
 */
import React from 'react';
import addRecords from '../images/normal/add-records.png';
import test30 from '../images/normal/test30.png';
import './Home.css'

class Sample extends React.Component {

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


export default Sample;