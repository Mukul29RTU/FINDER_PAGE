import { useState, useEffect } from "react";
import Map from "./Map.jsx"; // Ensure this import is correct

function Section() {
  const [userData, setUserData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // State to track the selected user's UUID
  const [showMap, setShowMap] = useState(false); // State to toggle the visibility of the map

  // Fetch the data from the random user API
  const fetchData = async () => {
    const response = await fetch("https://randomuser.me/api/?results=20");
    const data = await response.json();
    setUserData(data.results);
  };

  // Load user data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Handle the view map action when the Summary button is clicked
  const handleViewMap = (uuid) => {
    if (selectedUser === uuid) {
      setShowMap(!showMap); // Toggle map visibility if the same user is clicked
    } else {
      setSelectedUser(uuid); // Set the selected user by their UUID
      setShowMap(true); // Show the map for the selected user
    }
  };

  // Handle closing the map and resetting the state
  const handleCloseMap = () => {
    setShowMap(false); // Hide the map
    setSelectedUser(null); // Clear the selected user
  };

  // Fetch the next user and reset the map view
  const nextUser = () => {
    fetchData();
    handleCloseMap(); // Close any open summary when fetching new users
  };

  return (
    <div className="users">
      {userData.map((user) => {
        const {
          gender,
          name: { title, first, last },
          location: {
            street: { number, name },
            city,
            state,
            country,
            postcode,
            coordinates: { latitude, longitude },
          },
          dob: { date: dobDate },
          picture: { large },
          login: { uuid },
        } = user;

        return (
          <div key={uuid} className="userCard">
            {/* Profile Section - Only show when map is not visible */}
            {!showMap && selectedUser !== uuid && (
              <div className="row-1">
                <img
                  className="rounded-circle mt-3"
                  src={large}
                  alt={`${first} ${last}`}
                />
                <h4 className="text-center">{`${title} ${first} ${last}`}</h4>
                <p>
                  <strong>DOB:</strong> {new Date(dobDate).toLocaleDateString()}
                </p>
                <div className="row-3">
                  <button
                    className="btn btn-primary"
                    onClick={() => handleViewMap(uuid)} // Show map when clicking "Summary"
                  >
                    Summary
                  </button>
                  <button className="btn btn-success" onClick={nextUser}>
                    Next User
                  </button>
                </div>
              </div>
            )}

            {/* Map Section - Show only if the user is selected and showMap is true */}
            {showMap && selectedUser === uuid && (
              <div className="mapdiv">
                <Map lat={latitude} lng={longitude} userData={userData} uuid={uuid} />
                <div className="closemap mt-3 text-center">
                  <button
                    className="btn btn-warning"
                    onClick={handleCloseMap} // Close map view
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Section;
