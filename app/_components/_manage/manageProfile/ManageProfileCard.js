import { useDispatch, useSelector } from "react-redux";
import Button from "../../utils/Button";
import {
  setEmail,
  setPhone,
  setPosition,
  setUserName,
} from "@/lib/slices/authSlice";
import { useState } from "react";
import toast from "react-hot-toast";
import apiClient from "@/lib/axiosInstance";

function ManageProfileCard() {
  const { user, email, phone, position, image, id } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    try {
      setLoading(true);
      const res = await apiClient.patch(`/user/${id}`, {
        user,
        email,
        phone,
        role: position,
        image,
      });
      toast.success("Success");
    } catch (e) {
      toast.error("Someting went wrong..");
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-card">
      <h2 className="profile-card-title">Profile</h2>
      <div className="profile-card-avatar">
        <img src={image} alt="company-logo" />
      </div>

      <div className="profile-card-field">
        <label>Name</label>
        <input
          type="text"
          placeholder="Name"
          value={user}
          onChange={(e) => dispatch(setUserName(e.target.value))}
        />
      </div>

      <div className="profile-card-field">
        <label>Phone</label>
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => dispatch(setPhone(e.target.value))}
        />
      </div>

      <div className="profile-card-field">
        <label>Mail</label>
        <input
          type="text"
          placeholder="Mail"
          value={email}
          onChange={(e) => dispatch(setEmail(e.target.value))}
        />
      </div>

      <div className="profile-card-field">
        <label>Position</label>
        <input
          type="text"
          placeholder="Position"
          value={position}
          onChange={(e) => dispatch(setPosition(e.target.value))}
        />
      </div>
      <Button onClick={handleSave}>{loading ? "Saving..." : "Save"}</Button>
    </div>
  );
}

export default ManageProfileCard;
