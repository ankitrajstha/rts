import { useEffect, useState } from "react";

interface WeatherData {
  name: string;
  data: { time: string; value: string }[];
}

const App: React.FC = () => {
  const [dummyData, setDummyData] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

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
  useEffect(() => {
    fetchDummyData();
  }, []);

  const times = dummyData[0]?.data?.map((item) => item.time) || [];

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
    </div>
  );
};

export default App;
