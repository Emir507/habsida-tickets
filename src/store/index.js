import { combineReducers } from 'redux';
import filtersReducer from './reducers/filtersReducer';
import ticketsReducer from './reducers/ticketsReducer';
import sortReducer from './reducers/sortReducer';

const reducer = combineReducers({
  filters: filtersReducer,
  tickets: ticketsReducer,
  sort: sortReducer,
});

export default reducer;
