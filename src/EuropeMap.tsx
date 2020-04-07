import * as d3 from "d3";
import WorldData from "./world.json";

const MARGIN = { TOP: 10, BOTTOM: 50, LEFT: 70, RIGHT: 10 };
const WIDTH = 1280;
const HEIGHT = 800;

interface ICountry {
  countryCode: string;
  infected: number;
}

const InfectionData: ICountry[] = [
  { countryCode: "FI", infected: 1200 },
  { countryCode: "DE", infected: 10000 },
  { countryCode: "NO", infected: 3000 },
  { countryCode: "US", infected: 15000 }
];

export default class D3Class {
  constructor(element: any) {
    const svg = d3
      .select(element)
      .append("svg")
      .attr("width", WIDTH)
      .attr("height", 800);

    d3.csv(
      "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv"
    ).then((csvData: any) => {
      console.log(csvData);
      const projection = d3
        .geoMercator()
        .fitExtent([[0, 0], [WIDTH, 800]], WorldData as any)
        .rotate([0, 0, 0]);

      const max =
        // d3.max(InfectionData, (country: ICountry) => country.infected) || 10000;
        d3.max(csvData, (country: any) =>
          Number.parseInt(Object.values(country)[
            Object.values(country).length - 1
          ] as string)
        ) || 100;
      console.log(max);

      // const min =
      //   d3.min(InfectionData, (country: ICountry) => country.infected) || 0;

      const color = d3.scaleSequential(d3.interpolateRdYlGn).domain([max, 0]);

      const path = d3.geoPath().projection(projection);

      svg
        .selectAll("path")
        .data(WorldData.features)
        .enter()
        .append("path")
        .attr("fill", (data: any) => {
          const infectedCountry =
            csvData.find(
              (country: any) =>
                country["Country/Region"] === data.properties.name
            ) ||
            csvData.find(
              (country: any) =>
                country["Country/Region"] === data.properties.postal
            );
          if (infectedCountry) {
            const values = Object.values(infectedCountry);
            return color(values[values.length - 1] as number);
          }
          return "lightgray";
        })
        .attr("d", path as any);
    });
  }
}
