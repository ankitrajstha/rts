import { useEffect, useState } from "react";

interface WeatherData {
  name: string;
  data: { time: string; value: string }[];
}

interface WeatherData2 {
  [date: string]: {
    "Air Temperature": string;
    "Relative Humidity": string;
    "Wind Speed": string;
    "Wind Direction": string;
  };
}

const App: React.FC = () => {
  const [dummyData, setDummyData] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [dummyData2, setDummyData2] = useState<WeatherData2>({});

  const fetchDummyData = async () => {
    try {
      setLoading(true);
      const res = await fetch("/dummy_data.json");
      const data = await res.json();
      setDummyData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const times = dummyData[0]?.data?.map((item) => item.time) || [];

  const dates = Object.keys(dummyData2);

  const transformedHeaders =
    dates.length > 0 ? Object.keys(dummyData2[dates[0]]) : [];

  const transformData = () => {
    const newDummyData2: WeatherData2 = {};

    dummyData.forEach((item) => {
      item.data.forEach((value) => {
        if (!newDummyData2[value.time]) {
          newDummyData2[value.time] = {
            "Air Temperature": "",
            "Relative Humidity": "",
            "Wind Speed": "",
            "Wind Direction": "",
          };
        }
        newDummyData2[value.time][item.name] = value.value;
      });
    });

    setDummyData2(newDummyData2);
  };

  useEffect(() => {
    fetchDummyData();
  }, []);

  useEffect(() => {
    if (dummyData.length > 0) {
      transformData();
    }
  }, [dummyData]);

  return (
    <div>
      <h1>Task 1</h1>
      <p>Use dummy_data.json to render following table:</p>
      {loading ? (
        <p>loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Parameter</th>
              {times.map((time, index) => (
                <th key={index}>{time}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dummyData.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                {item.data.map((value, index) => (
                  <td key={index}>{value.value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <h1>Task 2</h1>
      <p>Transformed data:</p>
      {dates.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Time</th>
              {transformedHeaders.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dates.map((date) => (
              <tr key={date}>
                <td>{date}</td>
                {transformedHeaders.map((header) => (
                  <td key={header}>{dummyData2[date][header]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data available for Task 2</p>
      )}
    </div>
  );
};

export default App;
