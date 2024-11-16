import React from "react";
import DynamicProfile from "./DynamicProfile.jsx"; // Ensure this is correctly imported
import GoogleMapWithDynamicMarker from "./GoogleMapWithDynamicMarker.jsx"; // Ensure this is correctly imported

function Map({ lat, lng, userData, uuid }) {
  // Find the user data for the given UUID
  const user = userData.find((user) => user.login.uuid === uuid);

  if (!user) {
    return <p>No user data available for this selection.</p>; // Gracefully handle invalid UUID
  }

  return (
    <>
      <div className="expandData">
        {/* Render dynamic profile for the selected user */}
        <div className="dynamicProfile">
          <DynamicProfile user={user} />
        </div>

        {/* Render map for the selected user's coordinates */}
        <div className="map">
          <GoogleMapWithDynamicMarker latd={lat} lngd={lng} />
        </div>
      </div>
    </>
  );
}

export default Map;
