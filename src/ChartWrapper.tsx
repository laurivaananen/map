import React from "react";
import D3Chart from "./D3Chart";
import { Gender } from "./App";

export default class ChartWrapper extends React.Component<
  { gender: Gender },
  { chart: D3Chart }
> {
  componentDidMount() {
    this.setState({ chart: new D3Chart(this.refs.chart) });
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillReceiveProps({ gender }: { gender: Gender }) {
    this.state.chart.update(gender);
  }

  render() {
    return <div ref="chart"></div>;
  }
}
