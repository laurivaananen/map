import * as d3 from "d3";

const url = "https://udemy-react-d3.firebaseio.com/tallest_men.json";

interface IPerson {
  name: string;
  height: string;
}
const MARGIN = { TOP: 10, BOTTOM: 50, LEFT: 70, RIGHT: 10 };
const WIDTH = 800 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 500 - MARGIN.TOP - MARGIN.BOTTOM;

export default class D3Class {
  constructor(element: any) {
    const svg = d3
      .select(element)
      .append("svg")
      .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .append("g")
      .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

    d3.json(url).then((data: any) => {
      const max =
        d3.max(data, (person: IPerson) => Number.parseInt(person.height)) ||
        HEIGHT;

      const min =
        d3.min(data, (person: IPerson) => Number.parseInt(person.height)) || 0;

      const yScale = d3
        .scaleLinear()
        .domain([min * 0.95, max])
        .range([HEIGHT, 0]);

      const xScale: d3.ScaleBand<string> = d3
        .scaleBand()
        .domain(data.map((person: IPerson) => person.name))
        .range([0, WIDTH])
        .padding(0.4);

      const xAxis = d3.axisBottom(xScale);

      svg
        .append("g")
        .attr("transform", `translate(0, ${HEIGHT})`)
        .call(xAxis);

      const yAxis = d3.axisLeft(yScale);
      svg.append("g").call(yAxis);

      svg
        .append("text")
        .attr("x", WIDTH / 2)
        .attr("y", HEIGHT + 50)
        .attr("text-anchor", "middle")
        .text("Worlds tallest men");

      svg
        .append("text")
        .attr("x", -(HEIGHT / 2))
        .attr("y", -50)
        .attr("text-anchor", "middle")
        .text("Height in cm")
        .attr("transform", "rotate(270)");

      const rects = svg.selectAll("rect").data(data);

      rects
        .enter()
        .append("rect")
        .attr("x", (person: any) => xScale(person.name) as any)
        .attr("y", (person: any) => yScale(person.height))
        .attr("width", xScale.bandwidth)
        .attr("height", (person: any) => HEIGHT - yScale(person.height))
        .attr("fill", "indianred");
    });
  }
}
