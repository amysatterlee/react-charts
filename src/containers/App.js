import React, { useState } from 'react';
import '../stylesheets/App.css';
import ChartModal from '../components/ChartModal';
import BarChart from '../components/BarChart';
import LineChart from '../components/LineChart';

const App = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [type, setType] = useState('bar');

  const [data, setData] = useState([
    {key: '2020-02-02', val: 20},
    {key: '2020-02-03', val: 27},
    {key: '2020-02-04', val: 23},
    {key: '2020-02-05', val: 18},
    {key: '2020-02-06', val: 25},
    {key: '2020-02-07', val: 29}
  ]);

  const handleClick = (typ) => {
    setType(typ);
    setShowModal(true);
  }

  const handleClose = () => {
    setShowModal(false);
  }

  return (
    <div className="App">
      <div className='container'>
        <button className='btn btn-outline-primary mt-3'
          onClick={() => handleClick('bar')}
        >
          Bar Chart
        </button>
        <button className='btn btn-outline-primary mt-3'
          onClick={() => handleClick('line')}
        >
          Line Chart
        </button>
      </div>
      <ChartModal
        show={showModal}
        title='Generic Modal'
        handleClose={handleClose}
      >
        {type === 'bar' &&
          <BarChart chartId='myBarChart'
            width={600} height={400}
            data={data} color='grey'
          />
        }
        {type === 'line' &&
          <LineChart chartId='myLineChart'
            width={600} height={400}
            data={data} color='gold'
            inputTimeFormat="%Y-%m-%d"
            displayTimeFormat="%m/%d"
          />
        }
      </ChartModal>
    </div>
  );
}

export default App;
