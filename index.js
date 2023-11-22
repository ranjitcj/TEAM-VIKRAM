let map;
let markers = [
    {
        coordinates: { lat: 18.524273073732452, lng: 73.85437979929975 },
        iconImage: 'https://www.shutterstock.com/image-vector/location-icon-vector-pin-sign-isolated-1389948974',
        content: '<h4>New Clinic</h4>'
    },
    {
        coordinates: { lat: 18.524273073732452, lng: 73.85437979929975 }
    }
]
function initMap() {
    const options = {
        zoom: 16,
        center: { lat: 18.524273073732452, lng: 73.85437979929975 }
    }
    map = new google.maps.Map(
        document.getElementById('map'),
        options
    )
    google.maps.event.addListener(map, 'click', function (event) {
        addMarker({
            coordinates: event.latLng
        })
    })
    for (let i = 0; i< markers.length; i++) {
        addMarker(markers[i])
    }
    drawDirection()
}
function addMarker(prop) {
    let marker = new google.maps.Marker({
        position: prop.coordinates,
        map: map
    })
    if( prop.iconImage ) {
        marker.setIcon(prop.iconImage)
    }
    if( prop.content ) {
        let information = new google.maps.InfoWindow({
            content: prop.content
        })
        marker.addListener("click", function () {
            information.open(map, marker)
        })
    }
}
function drawDirection() {
    const directionService = new google.maps.DirectionsService();
    const directionRenderer = new google.maps.DirectionsRenderer();
    directionRenderer.setMap(map)
    calculationAndDisplayRoute(directionService, directionRenderer)
}
function calculationAndDisplayRoute(directionService, directionRenderer) {
    const start = { lat: 18.524273073732452, lng: 73.85437979929975 }
    const end = { lat: 18.524273073732452, lng: 73.85437979929975 }
    const request = {
        origin: start,
        destination: end,
        travelMode: google.maps.DirectionsTravelMode.DRIVING
    }
    directionService.route(request, function (response, status) {
        if( status === google.maps.DirectionsStatus.OK ) {
            directionRenderer.setDirections(response)
            let myRoute = response.routes[0]
            let txt = ''
            for (let i = 0; i < myRoute.legs[0].steps.length; i++) {
                txt += myRoute.legs[0].steps[i].instructions + "<br />"
            }
            document.getElementById('directions').innerHTML = txt
        }
    });
}