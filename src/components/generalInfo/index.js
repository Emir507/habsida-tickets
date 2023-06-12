import './style.css';
// eslint-disable-next-line
function GeneralInfo({ title, subtitle }) {
  return (
    <div className="general-info">
      <span className="general-info__text general-info__title">{title}</span>
      <span className="general-info__text general-info__subtitle">
        {subtitle}
      </span>
    </div>
  );
}

// TODO: use propTypes
export default GeneralInfo;
