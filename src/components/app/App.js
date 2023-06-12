/* eslint-disable */
import './App.css';
import Ticket from '../ticket';
import Filters from '../filters';
import ShowMoreBtn from '../show-more-btn';
import Header from '../header';
import { connect } from 'react-redux';
import SortTabs from '../sortTabs';

function App({ tickets, filters, isLoading }) {
  function ticketsFilterCallback(item) {
    const checkStopsLength = (item, count) => {
      return (
        item.segments.length ===
        item.segments.filter((segment) => segment.stops.length === count).length
      );
    };
    if (filters.all) return item;
    if (filters[0]) {
      if (checkStopsLength(item, 0)) {
        return item;
      }
    }
    if (filters[1]) {
      if (checkStopsLength(item, 1)) {
        return item;
      }
    }
    if (filters[2]) {
      if (checkStopsLength(item, 2)) {
        return item;
      }
    }
    if (filters[3]) {
      if (checkStopsLength(item, 3)) {
        return item;
      }
    }
  }

  function sortTickets() {
    /**
     * Сортировка билетов по ценовой категории
     */
  }

  const renderList = () => {
    if (isLoading) {
      return <p>loading...</p>;
    }
    // .slice(0, 50)
    return tickets.filter(ticketsFilterCallback).map((item, index) => (
      <Ticket
        key={index}
        style={{
          marginBottom: index !== tickets.slice(0, 4).length - 1 && '20px',
        }}
        ticket={item}
      />
    ));
  };

  return (
    <div className="App">
      <Header style={{ marginBottom: '50px' }} />
      <div className="App__container">
        <Filters style={{ position: 'sticky', top: '50px' }} />
        <div style={{ display: 'flex', flexDirection: 'column', flex: '1' }}>
          <SortTabs />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginBottom: '20px',
            }}
          >
            {renderList().length
              ? renderList()
              : 'Рейсов, подходящих под заданные фильтры, не найдено'}
          </div>
          <ShowMoreBtn />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { tickets, isLoading } = state.tickets;
  const { all, empty, transfer_1, transfer_2, transfer_3 } = state.filters;
  return {
    tickets,
    isLoading,
    filters: {
      all,
      0: empty,
      1: transfer_1,
      2: transfer_2,
      3: transfer_3,
    },
  };
};

export default connect(mapStateToProps)(App);
