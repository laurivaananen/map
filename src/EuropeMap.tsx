import * as d3 from "d3";
import WorldData from "./world.json";

const MARGIN = { TOP: 10, BOTTOM: 50, LEFT: 70, RIGHT: 10 };
const WIDTH = 1280;
const HEIGHT = 800;

export default class D3Class {
  constructor(element: any) {
    const svg = d3
      .select(element)
      .append("svg")
      .attr("width", WIDTH)
      .attr("height", 800);

    const projection = d3
      .geoMercator()
      .fitExtent([[0, 0], [WIDTH, 800]], WorldData as any)
      .rotate([0, 0, 0]);

    const max =
      d3.max(WorldData.features, (country: any) =>
        Number.parseInt(country.properties.pop_est)
      ) || 1000;

    const min =
      d3.min(WorldData.features, (country: any) =>
        Number.parseInt(country.properties.pop_est)
      ) || 0;

    const color = d3
      .scaleThreshold()
      .domain([100000, 1000000, 10000000, 30000000, 100000000, 500000000])
      .range(d3.schemeBlues[7] as any);

    const path = d3.geoPath().projection(projection);

    svg
      .selectAll("path")
      .data(WorldData.features)
      .enter()
      .append("path")
      .attr("fill", (data: any) => {
        return color(Number.parseInt(data.properties.pop_est));
      })
      .attr("d", path as any);
  }
}
