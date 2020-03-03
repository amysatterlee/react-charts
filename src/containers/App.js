import React, { useState } from 'react';
import '../stylesheets/App.css';
import ChartModal from '../components/ChartModal';
import BarChart from '../components/BarChart';
import LineChart from '../components/LineChart';

const App = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [type, setType] = useState('bar');

  const [data, setData] = useState({
    '2020-02-02': 20,
    '2020-02-03': 25,
    '2020-02-04': 33,
    '2020-02-05': 27,
    '2020-02-06': 23
  });
  const colors = ["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"];

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
          />
        }
      </ChartModal>
    </div>
  );
}

export default App;
