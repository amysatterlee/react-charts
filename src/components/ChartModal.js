import React from 'react';
import '../stylesheets/charts.css';

const ChartModal = ({
  handleClose,
  title,
  show,
  children
}) => {
  const determineClass = () => {
    if (show) {return 'modal display-block';}
    return 'modal display-none';
  }
  return (
    <div className={determineClass()}>
      <div className='card modal-card'>
        <div className='card-header'>
          {title}
        </div>
        <div className='card-body'>
          {children}
          <button
            className='btn btn-sm btn-outline-primary float-right'
            onClick={handleClose}
          >
            <i className='fa fa-times'/>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChartModal
