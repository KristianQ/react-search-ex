import { fork, all } from 'redux-saga/effects';

import { fetchStocks } from './stock';

export default function* root() {
  yield all([
    fork(fetchStocks),
  ]);
}
