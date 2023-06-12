/* eslint-disable */
import { useState } from 'react';
import { connect } from 'react-redux';
import './style.scss';

function SortTabs({ activeSort, setSort }) {
  const tabs = [
    { title: 'Самый дешевый', value: 'cheapest' },
    { title: 'Самый быстрый', value: 'fastest' },
    { title: 'Оптимальный', value: 'optimal' },
  ];
  const tabElements = tabs.map((tab) => (
    <li
      key={tab.value}
      className={`sort-tabs__item ${
        activeSort === tab.value ? 'sort-tabs__item--active' : ''
      } `}
    >
      <button onClick={() => setSort(tab.value)}>{tab.title}</button>
    </li>
  ));
  return <ul className="sort-tabs__list">{tabElements}</ul>;
}

const mapStateToProps = (state) => {
  return {
    activeSort: state.sort.activeSort,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSort: (value) => dispatch({ type: 'SET_SORT', payload: value }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SortTabs);
