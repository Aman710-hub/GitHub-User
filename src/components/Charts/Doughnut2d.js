// STEP 1 - Include Dependencies
// Include react
import React from "react";

// Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Include the chart type
import Cart from "fusioncharts/fusioncharts.charts";

// Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.candy";

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Cart, FusionTheme);

// STEP 2 - Chart Data
const chartData = [
  {
    label: "Venezuela",
    value: "290",
  },
  {
    label: "Saudi",
    value: "260",
  },
  {
    label: "Canada",
    value: "180",
  },
  {
    label: "Iran",
    value: "140",
  },
];

// STEP 3 - Creating the JSON object to store the chart configurations
const Doughnut2D = ({ data }) => {
  // STEP 3 - Creating the JSON object to store the chart configurations
  const chartConfigs = {
    type: "doughnut2d", // The chart type
    width: "100%", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        caption: "Starts Per Language",
        decimals: 0,
        doughnutRadius: "45%",
        showPercentValues: 0,
        theme: "candy",
      },
      // Chart Data
      data: data,
    },
  };

  return <ReactFC {...chartConfigs} />;
};

// STEP 4 - Creating the DOM element to pass the react-fusioncharts component

export default Doughnut2D;
