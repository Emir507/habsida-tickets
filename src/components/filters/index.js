/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { connect } from 'react-redux';
import './style.scss';

function Filters({
  style,
  all,
  empty,
  transfer_1,
  transfer_2,
  transfer_3,
  toggleAll,
  toggleEmpty,
  toggleTransfer_1,
  toggleTransfer_2,
  toggleTransfer_3,
  fetchTickets: fetchStuff,
}) {
  const filters = [
    { title: 'Все', value: all, toggler: toggleAll },
    { title: 'Без пересадок', value: empty, toggler: toggleEmpty },
    { title: '1 пересадка', value: transfer_1, toggler: toggleTransfer_1 },
    { title: '2 пересадки', value: transfer_2, toggler: toggleTransfer_2 },
    { title: '3 пересадки', value: transfer_3, toggler: toggleTransfer_3 },
  ];
  const filtersElements = filters.map((filter, index) => (
    <Checkbox
      style={{ marginBottom: index !== filters.length - 1 && '20px' }}
      text={filter.title}
      key={filter.title}
      checked={filter.value}
      toggler={filter.toggler}
    />
  ));
  useEffect(() => {
    fetchStuff();
  }, []);
  return (
    <div className="filters" style={style}>
      <span className="filters__title">Количество пересадок</span>

      <div>{filtersElements}</div>
    </div>
  );
}

// eslint-disable-next-line
function Checkbox({ text, style, checked, toggler }) {
  // TODO: use prop types
  return (
    <label htmlFor={text} className="filters__label" style={style}>
      <input
        type="checkbox"
        id={text}
        checked={checked}
        onChange={() => toggler(!checked)}
      />
      <span className="filters__checkbox-text">{text}</span>
    </label>
  );
}

// action creators
function allFilterSwitcher(value) {
  return { type: 'TOGGLE_ALL', payload: value };
}
function emptySwitcher(value) {
  return { type: 'TOGGLE_EMPTY', payload: value };
}
function transfer_1Switcher(value) {
  return { type: 'TOGGLE_TRANSFER_1', payload: value };
}
function transfer_2Switcher(value) {
  return { type: 'TOGGLE_TRANSFER_2', payload: value };
}
function transfer_3Switcher(value) {
  return { type: 'TOGGLE_TRANSFER_3', payload: value };
}
function setTickets(payload) {
  return { type: 'FETCH_TICKETS', payload };
}

// ПРИМЕР АСИНХРОННОЙ ФУНКЦИИ
async function getSearchId() {
  const url = 'https://aviasales-test-api.kata.academy/search';
  const res = await fetch(url);
  const data = await res.json();
  return data.searchId;
}
function fetchTickets() {
  return async (dispatch) => {
    dispatch({ type: 'SET_LOADING_STATE', payload: true });
    try {
      const searchId = await getSearchId();
      const url = `https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`;
      const res = await fetch(url);
      const data = await res.json();

      return dispatch(setTickets(data.tickets));
    } catch {
      // console.error('unknown error');
    } finally {
      dispatch({ type: 'SET_LOADING_STATE', payload: false });
    }
    return dispatch(setTickets([]));
  };
}
//
const mapStateToProps = (state) => {
  const { all, empty, transfer_1, transfer_2, transfer_3 } = state.filters;
  return {
    all,
    empty,
    transfer_1,
    transfer_2,
    transfer_3,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    toggleAll: (value) => dispatch(allFilterSwitcher(value)),
    toggleEmpty: (value) => dispatch(emptySwitcher(value)),
    toggleTransfer_1: (value) => dispatch(transfer_1Switcher(value)),
    toggleTransfer_2: (value) => dispatch(transfer_2Switcher(value)),
    toggleTransfer_3: (value) => dispatch(transfer_3Switcher(value)),
    fetchTickets: () => dispatch(fetchTickets()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
