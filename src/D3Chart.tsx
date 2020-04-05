import * as d3 from "d3";
import { Gender } from "./App";

const url = "https://udemy-react-d3.firebaseio.com/tallest_men.json";
const url2 = "https://udemy-react-d3.firebaseio.com/tallest_women.json";

interface IPerson {
  name: string;
  height: string;
}
const MARGIN = { TOP: 10, BOTTOM: 50, LEFT: 70, RIGHT: 10 };
const WIDTH = 800 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 500 - MARGIN.TOP - MARGIN.BOTTOM;

export default class D3Class {
  private svg: any;
  private data!: IPerson[];
  private xAxisGroup: any;
  private yAxisGroup: any;
  private menData!: IPerson[];
  private womenData!: IPerson[];
  private xLabel!: any;

  constructor(element: any) {
    this.svg = d3
      .select(element)
      .append("svg")
      .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .append("g")
      .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

    this.xLabel = this.svg
      .append("text")
      .attr("x", WIDTH / 2)
      .attr("y", HEIGHT + 50)
      .attr("text-anchor", "middle")
      .text("Worlds tallest men");

    this.svg
      .append("text")
      .attr("x", -(HEIGHT / 2))
      .attr("y", -50)
      .attr("text-anchor", "middle")
      .text("Height in cm")
      .attr("transform", "rotate(270)");

    this.xAxisGroup = this.svg
      .append("g")
      .attr("transform", `translate(0, ${HEIGHT})`);

    this.yAxisGroup = this.svg.append("g");

    Promise.all([d3.json(url), d3.json(url2)]).then((data: any[]) => {
      this.menData = data[0];
      this.womenData = data[1];
      this.update(Gender.MEN);
    });
  }

  update(gender: Gender) {
    this.data = gender === Gender.MEN ? this.menData : this.womenData;
    this.xLabel.text(`The world's tallest ${gender}`);

    const max =
      d3.max(this.data, (person: IPerson) => Number.parseInt(person.height)) ||
      HEIGHT;

    const min =
      d3.min(this.data, (person: IPerson) => Number.parseInt(person.height)) ||
      0;

    const yScale = d3
      .scaleLinear()
      .domain([min * 0.95, max])
      .range([HEIGHT, 0]);

    const xScale: d3.ScaleBand<string> = d3
      .scaleBand()
      .domain(this.data.map((person: IPerson) => person.name))
      .range([0, WIDTH])
      .padding(0.4);

    const xAxis = d3.axisBottom(xScale);

    this.xAxisGroup
      .transition()
      .duration(500)
      .call(xAxis);

    const yAxis = d3.axisLeft(yScale);
    this.yAxisGroup
      .transition()
      .duration(500)
      .call(yAxis);

    const rects = this.svg.selectAll("rect").data(this.data);

    rects
      .exit()
      .transition()
      .duration(500)
      .attr("height", 0)
      .attr("y", HEIGHT)
      .remove();

    rects
      .transition()
      .duration(500)
      .attr("x", (person: any) => xScale(person.name) as any)
      .attr("y", (person: any) => yScale(person.height))
      .attr("width", xScale.bandwidth)
      .attr("height", (person: any) => HEIGHT - yScale(person.height));

    rects
      .enter()
      .append("rect")
      .attr("x", (person: any) => xScale(person.name) as any)
      .attr("width", xScale.bandwidth)
      .attr("fill", "cornflowerblue")
      .attr("y", HEIGHT)
      .transition()
      .duration(500)
      .attr("height", (person: any) => HEIGHT - yScale(person.height))
      .attr("y", (person: any) => yScale(person.height));
  }
}
