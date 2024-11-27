import { useDispatch, useSelector } from "react-redux";
import Button from "../../utils/Button";
import { setEmail, setPosition, setUserName } from "@/lib/slices/authSlice";

function ManageProfileCard() {
  const { user, email, phone, position } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
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
        <input
          type="text"
          placeholder="Phone"
          value={user}
          onChange={(e) => dispatch(setUserName(e.target.value))}
        />
      </div>

      <div className="profile-card-field">
        <label>Mail</label>
        <input
          type="text"
          placeholder="Mail"
          onChange={(e) => dispatch(setEmail(e.target.value))}
        />
      </div>

      <div className="profile-card-field">
        <label>Position</label>
        <input
          type="text"
          placeholder="Position"
          onChange={(e) => dispatch(setPosition(e.target.value))}
        />
      </div>
      <Button>Save</Button>
    </div>
  );
}

export default ManageProfileCard;
