/**
 * Created by cpzhang on 2018/4/28.
 */
import React from 'react';
import $ from 'Zepto';

class Home extends React.Component {
    componentDidMount(){
        var root = $('#root');
        console.log(root);
    }

    render(){
        return <div>Hello,Welcome to Home</div>
    }

}

export default Home;