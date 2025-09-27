const API_KEY = "7faf46d3060318b338511c78a2c6b598";

const fetchFlights = async () => {
  try {
    const response = await fetch(
      `http://api.aviationstack.com/v1/flights?access_key=${API_KEY}`
    );
    const data = await response.json();
    console.log("항공기 데이터:", data.data); 
    return data.data || [];
  } catch (error) {
    console.error("항공기 데이터 가져오기 실패:", error);
    return [];
  }
};

setInterval(async () => {
  const flights = await fetchFlights();
  console.log("실시간 항공기 위치:", flights);
}, 60000);

fetchFlights();
