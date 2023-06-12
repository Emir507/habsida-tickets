/* eslint-disable */
import {
  add,
  format,
  differenceInHours,
  minutesToMilliseconds,
} from 'date-fns';
import GeneralInfo from '../generalInfo';

import './style.css';
function Ticket({ style, ticket }) {
  function getImageSrc(iataCode) {
    return `https://pics.avs.io/99/36/${iataCode}.png`;
  }
  return (
    <div className="ticket" style={style}>
      <div className="ticket__title">
        <span className="title__price">{ticket.price} Р</span>
        <span className="title__price"> {ticket.segments.length}</span>
        <span>
          <img src={getImageSrc(ticket.carrier)} alt="company logo" />
        </span>
      </div>
      <div>
        {ticket.segments.map((item, index) => {
          const departureTime = new Date(item.date);
          const durationInMilliseconds = minutesToMilliseconds(item.duration);
          const arrivalTime = new Date(
            departureTime.getTime() + durationInMilliseconds
          );

          const formattedDepartureTime = format(departureTime, 'HH:mm');
          const formattedArrivalTime = format(arrivalTime, 'HH:mm');
          const hourDifference = differenceInHours(arrivalTime, departureTime);

          const transfers = !item.stops.length
            ? 'Нет пересадок'
            : item.stops.length == 1
            ? item.stops.length + ' пересадка'
            : item.stops.length > 1 && item.stops.length < 5
            ? item.stops.length + ' пересадки'
            : item.stops.length + ' пересадок';

          return (
            <div
              key={index}
              style={{
                display: 'flex',
                marginBottom: index !== ticket.segments.length - 1 && '10px',
                justifyContent: 'space-between',
              }}
            >
              <GeneralInfo
                title={item.origin + ' - ' + item.destination}
                subtitle={formattedDepartureTime + ' - ' + formattedArrivalTime}
              />
              <GeneralInfo title="В пути" subtitle={hourDifference + 'ч'} />
              <GeneralInfo title={transfers} subtitle={item.stops.join(', ')} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Ticket;
