import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/authContext";
import * as UserService from "../../services/userService";
import * as CatalogService from "../../services/catalogServices";
import "./Profile.css";
import CatalogCard from "../CatalogCard/CatalogCard";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState("");
  const [cakes, setCakes] = useState([]);

  useEffect(() => {
    UserService.getProfile(user.accessToken).then((result) => {
      setProfile(result);
    });
  }, [user.accessToken]);

  useEffect(() => {
    CatalogService.myCakes(user.accessToken).then((result) => {
      setCakes(result);
    });
  }, [user.accessToken]);

  return (
    <section className="profile-section">
      <div className="profile-container">
        <h2 className="profile-title">
          Welcome, <span className="profile-user">{profile.username}</span>
        </h2>
      </div>
      <div className="profile-list-container">
        {cakes.map((x) => (
          <CatalogCard key={x._id} cake={x} />
        ))}
      </div>
    </section>
  );
};

export default Profile;
