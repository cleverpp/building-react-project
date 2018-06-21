/**
 * Created on 2018/6/21.
 */
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'

const mapStateToProps = (state) => {
    return {
        rootLocationInfo: state.rootLocationInfo
    }
};

const container = (component) => withRouter(connect(mapStateToProps)(component));

export default container;