import React from 'react';
import PropTypes from 'prop-types';
import '../stylesheets/charts.css';
import { select } from 'd3-selection';
import { scaleTime, scaleLinear } from 'd3-scale';
import { axisBottom, axisLeft } from 'd3-axis';
import { timeParse, timeFormat } from 'd3-time-format';
import { line } from 'd3-shape';
import { getMax, getMin } from '../helpers/chartHelpers';

const parseTime = (val) => {
  return timeParse(val);
}

const formatTime = (val) => {
  return timeFormat(val);
}

class LineChart extends React.Component {

  componentDidMount() {
    this.svg = select(`#${this.props.chartId}`)
      .attr('width', this.props.width)
      .attr('height', this.props.height);
    this.scaleX = scaleTime();
    this.scaleX.range([
      this.props.margins.left,
      this.props.width - this.props.margins.right
    ]);
    this.scaleY = scaleLinear();
    this.scaleY.range([
      this.props.height - this.props.margins.bottom,
      this.props.margins.top
    ]);
    if (this.props.data) {
      this.updateChart();
    }
  }

  updateAxes() {
    const parser = parseTime(this.props.inputTimeFormat);
    const xData = this.props.data.map(item => parser(item.key));
    const yData = this.props.data.map(item => item.value);
    this.scaleX.domain([getMin(xData), getMax(xData)]);
    this.xAxis = axisBottom().scale(this.scaleX).ticks(xData.length).tickFormat(formatTime(this.props.displayTimeFormat));
    this.svg.append('g')
      .attr('transform', `translate(0, ${this.props.height - this.props.margins.bottom})`)
      .call(this.xAxis).selectAll("text").attr("transform", "rotate(-40)").attr("dy", "0.7em").attr("dx", "-0.8em");
    this.scaleY.domain([0, getMax(yData)]);
    this.yAxis = axisLeft().scale(this.scaleY);
    this.svg.append('g')
      .attr('transform', `translate(${this.props.margins.left}, 0)`)
      .call(this.yAxis);
  }

  drawLine() {
    const parser = parseTime(this.props.inputTimeFormat);
    let yFunc = (d) => {
      let val = this.scaleY(d.value);
      return val;
    };
    let xFunc = (d) => {
      let val = this.scaleX(parser(d.key));
      return val;
    }
    this.line = line().x(d => xFunc(d)).y(d => yFunc(d));
    let path = this.svg.append('path').data([this.props.data]);
    path.attr('class', 'line').attr('d', this.line).attr('fill', 'none');
    path.attr('stroke', this.props.color).attr('stroke-width', '2');
  }

  updateChart() {
    this.updateAxes();
    this.drawLine();
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

LineChart.propTypes = {
  chartId: PropTypes.string,
  data: PropTypes.array,
  color: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  inputTimeFormat: PropTypes.string,
  displayTimeFormat: PropTypes.string,
  margins: PropTypes.object
};

LineChart.defaultProps = {
  chartId: 'defaultLineChartId',
  color: 'steelblue',
  width: 600,
  height: 400,
  margins: {
    bottom: 35,
    top: 10,
    left: 35,
    right: 10
  }
};

export default LineChart;
