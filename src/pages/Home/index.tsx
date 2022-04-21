import React from 'react';

import { PageTitle } from './styles';

function Home() {
  return (
    <div>
      <header>
        <PageTitle>Weather Forecast App</PageTitle>
      </header>
      <div>
        <input type="text" placeholder="Find out the forecast at..." />
        <button type="submit">Search!</button>
      </div>
      <div>
        <ul>
          <li>
            <span>Forecast Item</span>
            <span>Day of the week: Thursday</span>
            <span>Date: April, 21st</span>
            <span>Temperature: 83ºF</span>
            <span>Icon: ...</span>
            <span>Short Forecast: ...</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
