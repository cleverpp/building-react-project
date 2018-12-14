import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {AppContainer} from 'react-hot-loader'

const render = Component => {
    ReactDOM.hydrate(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.getElementById('root')
    )
}

// setTimeout为了模拟等待加载js
setTimeout(()=>{
    render(App)
}, 1000)

// Webpack Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./App', () => {
        // if you are using harmony modules ({modules:false})
        render(App)
        // in all other cases - re-require App manually
        // render(require('./App'))
    })
}