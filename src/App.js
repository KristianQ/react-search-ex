import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import rootReducer from './redux/modules';
import creatSagaMiddleware from 'redux-saga';
import rootSaga from './redux/sagas';

import SearchForm from './containers/searchForm';

const sagaMiddleware = creatSagaMiddleware();
export const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware),
);
sagaMiddleware.run(rootSaga);


function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
            <Route path="/" component={ SearchForm } />
          </Switch>
      </Router>
    </Provider>
  );
}

export default App;
