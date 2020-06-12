import React, { useState, useEffect } from "react";
import CryptoChart from "./containers/CryptoChartContainer.js";
import TopBar from "./containers/TopBarContainer.js";
import SideData from "./containers/SideDataContainer.js";

const App = (props) => {
  return (
    <div>
      <section className="hero is-light">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Cryptocurrency Data</h1>
          </div>
        </div>
      </section>
      <div className="topbar">
        <TopBar />
      </div>
      <div className="data-body columns">
        <div className="chart column is-three-quarters">
          <CryptoChart />
        </div>
        <div className="side has-text-centered column is-one-fourth">
          <SideData />
        </div>
      </div>
    </div>
  );
};

export default App;
