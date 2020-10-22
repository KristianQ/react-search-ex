
import { takeLatest, put } from 'redux-saga/effects';
import { API_URL, API_KEY } from '../config';

import {
  FETCH_STOCKS,
  fetchStockSuccess,
  fetchStockNoInput,
  fetchStockFail,
} from '../modules/stock';

function* fetchStocksSaga(action) {
  try {
    const query = action.params.query;

    if (query === undefined || query === '') {
      yield put(fetchStockNoInput());
    } else {
      let response = yield fetch(`${API_URL}?function=SYMBOL_SEARCH&keywords=${query}&apikey=${API_KEY}`)
                          .then(response => response.json())
                          .then(({bestMatches}) => bestMatches);

      if (response === undefined) response = [];

      const tansferData = response.map((obj) => {
        const values = Object.values(obj);
        return {
            symbol: values[0],
            name: values[1],
            type: values[2],
            region: values[3],
            marketOpen: values[4],
            marketClose: values[5],
            timezone: values[6],
            currency: values[7],
            matchScore: values[8],
        };
      });

      yield put(fetchStockSuccess(tansferData, query));
    }
  } catch (e) {
    console.log(e);
    yield put(fetchStockFail(e));
  }
}

export function* fetchStocks() {
  yield takeLatest(FETCH_STOCKS, fetchStocksSaga);
}