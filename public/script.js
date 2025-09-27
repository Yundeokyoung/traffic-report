const map = L.map('map', {
  zoomControl: false
}).setView([20, 0], 2);

L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const markers = L.markerClusterGroup();

const planeIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [25, 25],
});

const sampleData = {
  states: [
    ["abc123", "FL123", null, null, null, 0, 0, 10000, null, 250, null, null, null, null, false, 0],
    ["def456", "FL456", null, null, null, 10, 10, 12000, null, 300, null, null, null, null, false, 0],
    ["ghi789", "FL789", null, null, null, -20, 30, 9000, null, 220, null, null, null, null, false, 0],
    ["jkl012", "FL012", null, null, null, 40, -10, 15000, null, 280, null, null, null, null, false, 0],
    ["mno345", "FL345", null, null, null, 25, 15, 13000, null, 270, null, null, null, null, false, 0],
    ["pqr678", "FL678", null, null, null, -30, -20, 11000, null, 240, null, null, null, null, false, 0],
    ["stu901", "FL901", null, null, null, 5, -35, 14000, null, 260, null, null, null, null, false, 0],
    ["vwx234", "FL234", null, null, null, -15, 45, 12500, null, 290, null, null, null, null, false, 0],
    ["yz0123", "FL567", null, null, null, 35, -25, 13500, null, 300, null, null, null, null, false, 0],
    ["abc456", "FL890", null, null, null, -5, 20, 10500, null, 230, null, null, null, null, false, 0]
  ]
};

async function fetchFlights() {
  try {

    const data = sampleData;

    markers.clearLayers();

    (data.states || []).forEach(flight => {
      const lat = flight[6];  
      const lon = flight[5]; 
      const callsign = flight[1];
      if (lat && lon) {
        const marker = L.marker([lat, lon], { icon: planeIcon });
        marker.bindPopup(` ${callsign || '알 수 없음'}<br>고도: ${flight[7]} ft<br>속도: ${flight[9]} m/s`);
        markers.addLayer(marker);
      }
    });

    map.addLayer(markers);
  } catch (error) {
    console.error('항공기 데이터 가져오기 실패:', error);
  }
}

fetchFlights();
setInterval(fetchFlights, 60000);
