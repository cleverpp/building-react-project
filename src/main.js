import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {AppContainer} from 'react-hot-loader'
import Loadable from 'react-loadable';

const render = Component => {
    ReactDOM.hydrate(
        <AppContainer>
            <Component/>
        </AppContainer>,
        document.getElementById('root')
    )
}

window.main = () => {
    Loadable.preloadReady().then(() => {
        render(App)
    });
};

// Webpack Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./App', () => {
        // if you are using harmony modules ({modules:false})
        render(App)
        // in all other cases - re-require App manually
        // render(require('./App'))
    })
}