import React from 'react';
import PropTypes from 'prop-types';
import '../stylesheets/charts.css';
import { select } from 'd3-selection';
import { scaleBand, scaleLinear, scaleOrdinal } from 'd3-scale';
import { axisBottom, axisLeft } from 'd3-axis';
import { getMax } from '../helpers/chartHelpers';
import Legend from './Legend';

class MultiBarChart extends React.Component {

  constructor(props) {
    super(props);
    this.scaleX0 = scaleBand();
    this.scaleX1 = scaleBand();
    this.xAxis = null;
    this.scaleY = scaleLinear();
    this.yAxis = null;
    this.svg = null;
    this.margins = {bottom: 25, top: 10, left: 35, right: 10};
  }

  componentDidMount() {
    this.svg = select(`#${this.props.chartId}`)
      .attr('width', this.props.width)
      .attr('height', this.props.height);
    this.scaleX0.range([this.margins.left, this.props.width - this.margins.right])
      .paddingInner(0.1);
    this.scaleY.range([
      this.props.height - this.margins.bottom,
      this.margins.top
    ]);
    if (this.props.data && this.props.data.length > 0) {
      this.updateChart();
    }
  }

  updateAxes() {
    let valsArray = [];
    this.props.data.forEach(item => {
      Object.keys(item.values).forEach(key => {
        valsArray.push(item.values[key]);
      });
    });
    this.scaleX0.domain(this.props.data.map(item => item.key));
    this.scaleX1.range([0, this.scaleX0.bandwidth()]).padding(0.05).domain(Object.keys(this.props.keys));
    this.xAxis = axisBottom().scale(this.scaleX0);
    this.svg.append('g')
      .attr('transform', `translate(0, ${this.props.height - this.margins.bottom})`)
      .call(this.xAxis);
    this.scaleY.domain([0, getMax(valsArray)]);
    this.yAxis = axisLeft().scale(this.scaleY);
    this.svg.append('g')
      .attr('transform', `translate(${this.margins.left}, 0)`)
      .call(this.yAxis);
  }

  updateData() {
    this.svg.append('g')
      .selectAll('g')
      .data(this.props.data)
      .join('g').attr('transform', d => `translate(${this.scaleX0(d.key)})`)
      .selectAll('rect')
      .data(d => Object.keys(this.props.keys).map(key => ({key, value: d.values[key]})))
      .join('rect')
        .attr('x', d => this.scaleX1(d.key))
        .attr('y', d => this.scaleY(d.value))
        .attr('width', this.scaleX1.bandwidth())
        .attr('height', d => this.scaleY(0) - this.scaleY(d.value))
        .attr('fill', d => this.props.keys[d.key]);
  }

  updateChart() {
    this.updateAxes();
    this.updateData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.data) {
      this.updateChart();
    }
  }

  render() {
    return (
      <>
        <Legend keys={this.props.keys}/>
        <svg id={this.props.chartId}></svg>
      </>
    );
  };
}

MultiBarChart.propTypes = {
  chartId: PropTypes.string,
  data: PropTypes.array,
  keys: PropTypes.object,
  width: PropTypes.number,
  height: PropTypes.number
};

export default MultiBarChart;
