import React from 'react';
import PropTypes from 'prop-types';
import '../stylesheets/charts.css';
import { select } from 'd3-selection';
import { scaleBand, scaleLinear } from 'd3-scale';
import { axisBottom, axisLeft } from 'd3-axis';
import { getMax } from '../helpers/chartHelpers';

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
    if (this.props.data && this.props.data.length > 0) {
      this.updateChart();
    }
  }

  updateAxes() {
    this.scaleX.domain(this.props.data.map(item => item.key));
    this.xAxis = axisBottom().scale(this.scaleX);
    this.svg.append('g')
      .attr('transform', `translate(0, ${this.props.height - this.margins.bottom})`)
      .call(this.xAxis);
    this.scaleY.domain([0, getMax(this.props.data.map(item => item.val))]);
    this.yAxis = axisLeft().scale(this.scaleY);
    this.svg.append('g')
      .attr('transform', `translate(${this.margins.left}, 0)`)
      .call(this.yAxis);
  }

  updateData() {
    this.svg.append('g')
      .selectAll('rect')
      .data(this.props.data)
      .join('rect')
        .attr('x', d => this.scaleX(d.key))
        .attr('y', d => this.scaleY(d.val))
        .attr('width', this.scaleX.bandwidth())
        .attr('height', d => this.scaleY(0) - this.scaleY(d.val))
        .attr('fill', this.props.color);
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
      <svg id={this.props.chartId}></svg>
    );
  };
}

BarChart.propTypes = {
  chartId: PropTypes.string,
  data: PropTypes.array,
  color: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number
};

export default BarChart;
