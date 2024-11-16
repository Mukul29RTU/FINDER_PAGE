import React, { useEffect, useRef } from 'react';

function GoogleMapWithDynamicMarker({ latd, lngd }) {
    const lat = parseFloat(latd); // Convert to number
    const lng = parseFloat(lngd); // Convert to number  

  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null); // To track the map instance
  const markerRef = useRef(null); // To track the marker instance

  useEffect(() => {
    if (!mapInstanceRef.current) {
      // Ensure valid fallback values
      const initialPosition = { lat: lat || -33.867, lng: lng || 151.195 };

      // Initialize the map only once
      mapInstanceRef.current = new google.maps.Map(mapRef.current, {
        center: initialPosition,
        zoom: 2,
      });

      // Initialize the marker only once
      markerRef.current = new google.maps.Marker({
        position: initialPosition,
        map: mapInstanceRef.current,
        title: "Dynamic Marker",
      });
    } else {
      // Validate lat and lng before updating
      if (typeof lat === "number" && typeof lng === "number") {
        const newPosition = { lat, lng};
        mapInstanceRef.current.setCenter(newPosition); // Update map center
        markerRef.current.setPosition(newPosition); // Update marker position
      } else {
        console.error("Invalid lat/lng values:", { lat, lng });
      }
    }
  }, [lat, lng]); // Trigger effect when lat/lng props change

  return (
    <div>
      <h1 className='text-center'>Location</h1>
      
      <div
        id="map"
        ref={mapRef}
        style={{ width: "100%", height: "85vh" }}
      >
      </div>
    </div>
  );
}

export default GoogleMapWithDynamicMarker;
