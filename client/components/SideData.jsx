import React, { useEffect, useState } from "react";

const SideData = ({ data, currency }) => {
  const renderData = (show) => {
    if (Object.keys(data).length === 0) {
      return "Select a currency :)";
    } else {
      if (data) {
        return `$${data[show].close}`;
      }
    }
  };
  return (
    <div className="tile is-ancestor has-text-centered">
      <div className="tile is-vertical module-container">
        <div className="tile high-module is-vertical">
          <div className="tile">
            <p className="subtitle inside-container has-text-centered">
              7 Day High
            </p>
          </div>
          <div className="tile title inside-container">
            {renderData("week")}
          </div>
        </div>
        <div className="tile high-module is-vertical">
          <div className="tile">
            <p className="subtitle inside-container">30 Day High</p>
          </div>
          <div className="tile title inside-container">
            {renderData("month")}
          </div>
        </div>
        <div className="tile high-module is-vertical">
          <div className="tile inside-container">
            <p className="subtitle inside-container">One Year High</p>
          </div>
          <div className="tile title inside-container">
            {renderData("year")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideData;
