import React from 'react';
import '../stylesheets/charts.css';
import { select } from 'd3-selection';
import { scaleTime, scaleLinear } from 'd3-scale';
import { axisBottom, axisLeft } from 'd3-axis';
import { timeParse, timeFormat } from 'd3-time-format';
import { line } from 'd3-shape';

const parseTime = timeParse("%Y-%m-%d");
const formatTime = timeFormat("%Y-%m-%d");

const getMax = (arr) => {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}

const getMin = (arr) => {
  let min = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < min) {
      min = arr[i];
    }
  }
  return min;
}

class LineChart extends React.Component {

  constructor(props) {
    super(props);
    this.xAxis = null;
    this.scaleY = null;
    this.yAxis = null;
    this.svg = null;
    this.margins = {bottom: 25, top: 10, left: 35, right: 15};
    this.line = null;
  }

  componentDidMount() {
    this.svg = select(`#${this.props.chartId}`)
      .attr('width', this.props.width)
      .attr('height', this.props.height);
    this.scaleX = scaleTime();
    this.scaleX.range([this.margins.left, this.props.width - this.margins.right]);
    this.scaleY = scaleLinear();
    this.scaleY.range([
      this.props.height - this.margins.bottom,
      this.margins.top
    ]);
    console.log('component mounted');
    if (this.props.data) {
      this.updateChart();
    }
  }

  updateAxes(xData, yData) {
    this.scaleX.domain([getMin(xData), getMax(xData)]);
    this.xAxis = axisBottom().scale(this.scaleX).ticks(xData.length).tickFormat(timeFormat("%m-%d"));
    this.svg.append('g')
      .attr('transform', `translate(0, ${this.props.height - this.margins.bottom})`)
      .call(this.xAxis);
    this.scaleY.domain([0, getMax(yData)]);
    this.yAxis = axisLeft().scale(this.scaleY);
    this.svg.append('g')
      .attr('transform', `translate(${this.margins.left}, 0)`)
      .call(this.yAxis);
  }

  drawLine(xData) {
    let xFunc = (d) => {
      let val = this.scaleX(d);
      return val;
    };
    let yFunc = (d) => {
      console.log(d);
      let val = this.scaleY(this.props.data[formatTime(d)]);
      console.log(val);
      return val;
    }
    this.line = line().x(d  => xFunc(d)).y(d => yFunc(d));
    let path = this.svg.append('path').data([xData]);
    path.attr('class', 'line').attr('d', this.line).attr('fill', 'none');
    path.attr('stroke', this.props.color);
  }

  updateChart() {
    console.log('updating chart');
    const xData = Object.keys(this.props.data).map(item => parseTime(item));
    console.log(xData);
    const yData = Object.keys(this.props.data).map(key => this.props.data[key]);
    console.log(yData);
    this.updateAxes(xData, yData);
    this.drawLine(xData);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.data) {
      this.updateChart();
    }
  }

  render() {
    return (
      <svg id={this.props.chartId}></svg>
    );
  };
}

export default LineChart;
