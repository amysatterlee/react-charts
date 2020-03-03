import React from 'react';
import '../stylesheets/charts.css';

const Legend = ({
  keys
}) => {
  return (
    <div>
      <ul className='legend-list'>
        {Object.keys(keys).map(key => (
          <li key={key}><span style={{background: keys[key]}}>&nbsp;&nbsp;&nbsp;</span> {key}</li>
        ))}
      </ul>
    </div>
  );
}

export default Legend;
