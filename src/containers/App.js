import React, { useState } from 'react';
import '../stylesheets/App.css';
import ChartModal from '../components/ChartModal';
import BarChart from '../components/BarChart';
import LineChart from '../components/LineChart';
import MultiBarChart from '../components/MultiBarChart';

const App = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [type, setType] = useState('bar');

  const [data, setData] = useState([
    {key: '2020-02-02', value: 20},
    {key: '2020-02-03', value: 27},
    {key: '2020-02-04', value: 23},
    {key: '2020-02-05', value: 18},
    {key: '2020-02-06', value: 25},
    {key: '2020-02-07', value: 29}
  ]);

  const [dataB, setDataB] = useState([
    {key: '2020-02-02', values: {key_a: 10, key_b: 15, key_c: 13}},
    {key: '2020-02-03', values: {key_a: 6, key_b: 14, key_c: 7}},
    {key: '2020-02-04', values: {key_a: 13, key_b: 18, key_c: 9}},
    {key: '2020-02-05', values: {key_a: 7, key_b: 20, key_c: 2}},
    {key: '2020-02-06', values: {key_a: 9, key_b: 14, key_c: 4}},
    {key: '2020-02-07', values: {key_a: 13, key_b: 16, key_c: 17}}
  ]);

  const dataBKeys = {
    key_a: 'grey',
    key_b: 'steelblue',
    key_c: 'tan'
  };

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
        <br></br>
        <button className='btn btn-outline-primary mt-3'
          onClick={() => handleClick('multi-bar')}
        >
          Multi-Bar Chart
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
            displayTimeFormat="%b %d"
          />
        }
        {type === 'multi-bar' &&
          <MultiBarChart chartId='myMultiBarChart'
            width={600} height={400}
            data={dataB}
            keys={dataBKeys}
          />
        }
      </ChartModal>
    </div>
  );
}

export default App;
