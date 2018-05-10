/**
 * Created by cpzhang on 2018/4/28.
 */
import React from 'react';
/*import $ from 'Zepto';*/
import addRecords from '../images/add-records.png';
import test30 from '../images/test30.png';
import './Home.css';

class Home extends React.Component {
    componentDidMount(){
        const {location, match, history} = this.props;
        console.log(location);
        console.log(match);
        console.log(history);
    }

    render(){
        return (
            <div>
                <p>Hello,Welcome to Home</p>
                <img src={addRecords}/>
                <img src={test30}/>
            </div>
        );
    }

}

export default Home;