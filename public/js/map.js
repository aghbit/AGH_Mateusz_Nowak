async function initMap(){
    console.log('Maps JS API loaded');
    const map = displayMap();
    const markers = await addMarkers(map)
    addPanToMarker(map, markers);
}

async function addMarkers(map) {
    const locations = await fetch("/locations").then(res=>res.json())
    const markers = [];
    for (const location in locations) {
      const markerOptions = {
        map: map,
        position: locations[location],
        title: "some title"
      }
      const marker = new google.maps.Marker(markerOptions);
      markers.push(marker);
    }
    return markers;
  }

function displayMap(){
    const mapOptions = {
        center: { lat: 52.2296756, lng: 21.0122287 },
        zoom: 8
    };
    const mapDiv = document.getElementById('map');
    const map = new google.maps.Map(mapDiv, mapOptions);
    return map;
}

function addPanToMarker(map, markers) {
    markers = markers.map(marker => {
      marker.addListener('click', async(event) => {
        const location = { lat: event.latLng.lat(), lng: event.latLng.lng() };
        const locationInfo = await fetch('/locationInfo',{
          method: "post",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({location: location})}).then(res=>res.json())
        console.log(locationInfo)
        const contentString = `
            <h3>${locationInfo.name}</h3>
            <a href="/trips/${locationInfo._id}">More</a>
        `
        const infowindow = new google.maps.InfoWindow({
            content: contentString,
            ariaLabel: locationInfo.name,
          });
        
        map.panTo(location);
        infowindow.open({
            anchor: marker,
            map
        })
      });
    });
    return markers;
  }