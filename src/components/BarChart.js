import React from 'react';
import '../stylesheets/charts.css';
import { select } from 'd3-selection';
import { scaleBand, scaleLinear } from 'd3-scale';
import { axisBottom, axisLeft } from 'd3-axis';

const getMax = (arr) => {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}

class BarChart extends React.Component {

  constructor(props) {
    super(props);
    this.xAxis = null;
    this.scaleY = null;
    this.yAxis = null;
    this.svg = null;
    this.margins = {bottom: 25, top: 10, left: 35, right: 10};
  }

  componentDidMount() {
    this.svg = select(`#${this.props.chartId}`)
      .attr('width', this.props.width)
      .attr('height', this.props.height);
    this.scaleX = scaleBand();
    this.scaleX.range([this.margins.left, this.props.width - this.margins.right])
      .padding(0.2);
    this.scaleY = scaleLinear();
    this.scaleY.range([
      this.props.height - this.margins.bottom,
      this.margins.top
    ]);
  }

  updateAxes(xData, yData) {
    this.scaleX.domain(xData);
    this.xAxis = axisBottom().scale(this.scaleX);
    this.svg.append('g')
      .attr('transform', `translate(0, ${this.props.height - this.margins.bottom})`)
      .call(this.xAxis);
    this.scaleY.domain([0, getMax(yData)]);
    this.yAxis = axisLeft().scale(this.scaleY);
    this.svg.append('g')
      .attr('transform', `translate(${this.margins.left}, 0)`)
      .call(this.yAxis);
  }

  updateData(xData) {
    this.svg.append('g')
      .selectAll('rect')
      .data(xData)
      .join('rect')
        .attr('x', d => this.scaleX(d))
        .attr('y', d => this.scaleY(this.props.data[d]))
        .attr('width', this.scaleX.bandwidth())
        .attr('height', d => this.scaleY(0) - this.scaleY(this.props.data[d]))
        .attr('fill', this.props.color);
  }

  updateChart() {
    console.log('updating chart');
    const xData = Object.keys(this.props.data);
    const yData = xData.map(key => this.props.data[key]);
    this.updateAxes(xData, yData);
    this.updateData(xData);
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

export default BarChart;
