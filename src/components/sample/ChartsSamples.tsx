import { useMemo } from "react";
import { Chart } from "react-google-charts";


export const options = {
  // Material design options
  chart: {
    title: "Samples:Data x Value",
    subtitle: "based on samples in CSV ",
  },
  hAxis: { title: "Date" },
  vAxis: { title: "Value" },
};

const ChartsSamples = ({ samples }) => {
  
  const processData = useMemo(() => {
    let tempArray = [["Hours Studied", "Final"]];
    if (samples.length > 0) {
      samples.forEach((element) => {
        tempArray.push([new Date(element.date), element.value]);
      });
    }

    return tempArray
  }, [samples])

 
  return (
    <Chart
      chartType="ScatterChart"
      data={processData}
      width="100%"
      height="400px"
      legendToggle
      options={options}
    />
  );
};

export default ChartsSamples;
