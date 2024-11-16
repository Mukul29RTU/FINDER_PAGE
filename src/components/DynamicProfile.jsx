function DynamicProfile({ user }) {
  // Gracefully handle when no user is passed or user data is incomplete
  if (!user) {
    return <p>No user data available.</p>;
  }

  // Destructure user data
  const {
    gender,
    name: { title = "", first = "", last = "" } = {},
    location: {
      street: { number = "", name: streetName = "" } = {},
      city = "",
      state = "",
      country = "",
      postcode = "",
      coordinates: { latitude = "", longitude = "" } = {},
      timezone: { offset = "", description = "" } = {},
    } = {},
    email = "N/A",
    login: { uuid = "", username = "N/A" } = {},
    dob: { date: dobDate = "", age = "N/A" } = {},
    registered: { date: registeredDate = "" } = {},
    phone = "N/A",
    cell = "N/A",
    id: { name: idName = "N/A", value: idValue = "N/A" } = {},
    picture: { large = "" } = {},
    nat = "N/A",
  } = user;

  return (
    <div key={uuid} className="dynamic-profile">
      <div className="text-center">
        <img
          className="rounded-circle mt-3"
          src={large || "default-avatar.png"} // Default avatar if image is missing
          alt={`${first} ${last}`}
        />
        <h1 className="">{`${title} ${first} ${last}`}</h1>
      </div>

      <div className="profile-details">
        <div className="personal-info">
          <p>
            <strong>Gender:</strong> {gender || "N/A"}
          </p>
          <p>
            <strong>DOB:</strong>{" "}
            {dobDate ? new Date(dobDate).toLocaleDateString() : "N/A"} (
            {age !== "N/A" ? `${age} years old` : "N/A"})
          </p>
          <p>
            <strong>Phone:</strong> {phone}
          </p>
          <p>
            <strong>Email:</strong> {email}
          </p>
          <p>
            <strong>Location:</strong> {`${number} ${streetName}, ${city}, ${state}, ${country}, ${postcode}`}
          </p>
          <p>
            <strong>Nationality:</strong> {nat}
          </p>
        </div>

        <div className="additional-info">
          <p>
            <strong>Coordinates:</strong> {`${latitude}, ${longitude}`}
          </p>
          <p>
            <strong>Timezone:</strong> {`${offset} - ${description}`}
          </p>
          <p>
            <strong>Username:</strong> {username}
          </p>
          <p>
            <strong>Registered:</strong>{" "}
            {registeredDate ? new Date(registeredDate).toLocaleDateString() : "N/A"}
          </p>
          <p>
            <strong>Cell:</strong> {cell}
          </p>
          <p>
            <strong>ID:</strong> {`${idName}: ${idValue}`}
          </p>
        </div>
      </div>
    </div>
  );
}

export default DynamicProfile;
