import { combineReducers } from 'redux';
import { stockReducer } from './stock';

const rootReducer = combineReducers({
  stocks: stockReducer,
});

export default rootReducer;