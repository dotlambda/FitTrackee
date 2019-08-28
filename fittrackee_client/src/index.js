/* eslint-disable react/jsx-filename-extension */
import { createBrowserHistory } from 'history'
import React from 'react'
import ReactDOM from 'react-dom'
import { routerMiddleware } from 'connected-react-router'
import { applyMiddleware, createStore, compose } from 'redux'
import thunk from 'redux-thunk'

import App from './components/App'
import Root from './components/Root'
import registerServiceWorker from './registerServiceWorker'
import createRootReducer from './reducers'
import { loadProfile } from './actions/user'

export const history = createBrowserHistory()

history.listen(() => {
  window.scrollTo(0, 0)
})

export const rootNode = document.getElementById('root')

export const store = createStore(
  createRootReducer(history),
  window.__STATE__, // Server state
  (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose)(
    applyMiddleware(routerMiddleware(history), thunk)
  )
)

if (window.localStorage.authToken !== null) {
  store.dispatch(loadProfile())
}

ReactDOM.render(
  <Root store={store} history={history}>
    <App />
  </Root>,
  rootNode
)
registerServiceWorker()
