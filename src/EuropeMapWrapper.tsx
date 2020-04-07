import React from "react";
import EuropeMap from "./EuropeMap";

export default class ChartWrapper extends React.Component<
  {},
  { europeMap: EuropeMap }
> {
  componentDidMount() {
    this.setState({ europeMap: new EuropeMap(this.refs.chart) });
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <div ref="chart"></div>;
  }
}
