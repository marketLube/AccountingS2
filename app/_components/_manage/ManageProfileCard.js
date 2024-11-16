function ManageProfileCard() {
  return (
    <div className="profile-card">
      <h2 className="profile-card-title">Profile</h2>
      <div className="profile-card-avatar"></div>

      <div className="profile-card-field">
        <label>Name</label>
        <input type="text" placeholder="Name" />
      </div>

      <div className="profile-card-field">
        <label>Phone</label>
        <input type="text" placeholder="Phone" />
      </div>

      <div className="profile-card-field">
        <label>Mail</label>
        <input type="text" placeholder="Mail" />
      </div>

      <div className="profile-card-field">
        <label>Position</label>
        <input type="text" placeholder="Position" />
      </div>
    </div>
  );
}

export default ManageProfileCard;
