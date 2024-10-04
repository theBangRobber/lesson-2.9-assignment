import { useState, useEffect } from "react";
import "./App.css";
import govdataApi from "./api/govdataApi";

function App() {
  const [area, setArea] = useState("");
  const [forecast, setForecast] = useState("");
  const [weatherData, setWeatherData] = useState([]);

  // ASSIGNMENT COMMENT: The sole purpose of the useState() below is to store the input location for display purpose, it provides a better user experience but it is not completely necessary
  const [submittedArea, setSubmittedArea] = useState("");

  useEffect(() => {
    getApi();
  }, []);

  // ASSIGNMENT COMMENT: Set up function to retrieve API from data.gov
  const getApi = async () => {
    try {
      const response = await govdataApi.get("/two-hr-forecast");
      console.log("✅ loaded weather forecast successfully");
      // response in console helps to look for path for data required
      console.log("response", response);

      // ASSIGNMENT COMMENT: Accessing the forecasts in API following the data path/structure, the path is data/data/items[0]/forecast, [0] is needed as "items" is an array, and since there is only one array so the index is 0
      const forecasts = response.data.data.items[0].forecasts;
      setWeatherData(forecasts);
    } catch (error) {
      console.error("🚨 error: ", error.message);
    } finally {
      console.log("🎉 completed");
    }
  };

  // ASSIGNMENT COMMENT: Function to get the forecast for a specific area, change everything to lowercase to avoid errors
  const getForecastForArea = (areaName) => {
    const areaForecast = weatherData.find(
      (forecast) =>
        forecast.area.toLowerCase() === areaName.toLowerCase()
    );

    return areaForecast
      ? areaForecast.forecast
      : "No forecast found for this area.";
  };

  //. ASSIGNMENT COMMENT: Function to handle user input and check if input matches area in data API, once macthed, both data will be stored in their respective state to be displayed later and reset input field
  const handleSubmit = (event) => {
    event.preventDefault();

    // Debugging: Check the current area input
    console.log("Submitted area:", area);

    const matchedForecast = getForecastForArea(area);

    setForecast(matchedForecast);
    setSubmittedArea(area);

    // Debugging: Check the matched forecast
    console.log("Matched Forecast:", matchedForecast);

    setArea("");
  };

  // ASSIGNMENT COMMENT: added function to capitalize location name regardless of user input, if name is more than one word, split them and capitalize the first letter of each word and then join them back together
  const capitalizeWords = (string) => {
    if (!string) return "";
    return string
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="App">
      <h1>Two Hour Weather Forecast</h1>
      <h2>Please Enter Location</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="e.g. Tampines"
          value={area}
          onChange={(e) => setArea(e.target.value)} // Update area state on input change
        />
        <button type="submit">Submit</button>
      </form>
      {forecast && (
        <h3>
          {capitalizeWords(submittedArea)} Weather Forecast:{" "}
          {forecast}
        </h3>
      )}
    </div>
  );
}

export default App;
