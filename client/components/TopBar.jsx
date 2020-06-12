import React from "react";

const TopBar = (props) => {
  const handleClick = (e) => {
    props.getCurrencyData(e);
    props.getHighValues(e);
  };
  const buttons = ["BTC", "ETH", "XRP", "USDT", "LTC"].map(
    (currency, index) => {
      return (
        <div className="level-item">
          <button
            className="button is-warning is-light is-medium is-fullwidth"
            key={index}
            value={currency}
            onClick={handleClick}
          >
            {currency}
          </button>
        </div>
      );
    }
  );
  return (
    <div className="level">
      <div className="subtitle level-item has-text-centered">
        Select cryptocurrency:
      </div>
      {buttons}
    </div>
  );
};

export default TopBar;
