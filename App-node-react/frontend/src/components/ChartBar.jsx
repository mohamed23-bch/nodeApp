import React from "react";
import { Chart } from "react-google-charts";

const data = [
  ["Year", "Sales", "Expenses"],
  ["2014", 1000, 400],
  ["2015", 1170, 460],
  ["2016", 660, 1120],
  ["2017", 1030, 540],
];

// Material chart options
const options = {
  chart: {
    title: "Company Performance",
    subtitle: "Sales and Expenses over the Years",
  },
};

export default function ChartBar() { 
  return (
    <Chart
      // Note the usage of Bar and not BarChart for the material version
      chartType="Bar"
      width="100%"
      height="575px" 
      data={data}
      options={options}
    />
  );
};