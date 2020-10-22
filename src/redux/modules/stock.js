import { fromJS } from 'immutable';

export const FETCH_STOCKS = 'app/FETCH_STOCKS';
export const FETCH_STOCKS_SUCCESS = 'app/FETCH_STOCKS_SUCCESS';
export const FETCH_STOCKS_NO_INPUT = 'app/FETCH_STOCKS_NO_INPUT';
export const FETCH_STOCKS_FAIL = 'app/FETCH_STOCKS_FAIL';

const initialState = fromJS({
  loading: false,
  stocks: [],
  message: '',
  type: -1,
});

export function stockReducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_STOCKS:
      return state
        .withMutations(map => {
          map
          .set('type', -1)
          .set('message', '')
          .set('loading', true);
        });

    case FETCH_STOCKS_SUCCESS:
      const stockCount = action.payload.stocks.length;
      const message = (stockCount > 0 ? `${stockCount} results` : 'No results') + ` for '${action.payload.keyword}'`;
      
      return state
        .withMutations(map => {
          map
          .set('stocks', fromJS(action.payload.stocks))
          .set('message', message)
          .set('type', stockCount > 0 ? 0: 1)
          .set('loading', false);
        });

    case FETCH_STOCKS_NO_INPUT:
      return state
        .withMutations(map => {
          map
          .set('stocks', [])
          .set('message', 'Please input your keyword!')
          .set('type', 2)
          .set('loading', false);
        });

    case FETCH_STOCKS_FAIL:
      return state
        .withMutations(map => {
          map
          .set('stocks', [])
          .set('message', 'Oops! Something went wrong')
          .set('type', 2)
          .set('loading', false);
        });
    default:
      return state;
  }
}

export function fetchStocks( params={} ) {
    return {
        type: FETCH_STOCKS,
        params,
    };
}
  
export function fetchStockSuccess(stocks, keyword) {
    return {
        type: FETCH_STOCKS_SUCCESS,
        payload: {
            stocks,
            keyword,
        },
    };
}

export function fetchStockNoInput() {
  return {
      type: FETCH_STOCKS_NO_INPUT,
  };
}

export function fetchStockFail(error) {
  return {
      type: FETCH_STOCKS_FAIL,
      payload: {
          error,
      },
  };
}
