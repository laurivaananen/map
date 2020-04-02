import * as d3 from "d3";

const url = "https://udemy-react-d3.firebaseio.com/tallest_men.json";

interface IPerson {
  name: string;
  height: string;
}

export default class D3Class {
  constructor(element: any) {
    const svg = d3
      .select(element)
      .append("svg")
      .attr("width", 800)
      .attr("height", 500);

    d3.json(url).then((data: any) => {
      const rects = svg.selectAll("rect").data(data);

      rects
        .enter()
        .append("rect")
        .attr("x", (d, i) => i * 100)
        .attr("y", 0)
        .attr("width", 50)
        .attr("height", (d: any) => d.height)
        .attr("fill", "hotpink");
    });
  }
}
