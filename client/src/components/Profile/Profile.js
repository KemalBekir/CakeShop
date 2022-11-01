import { useContext, useEffect, useState } from "react";
import  { AuthContext } from "../../contexts/authContext";
import * as UserService from "../../services/userService";
import * as CatalogService from "../../services/catalogServices";
import "./Profile.css";


const Profile = () => {
    const { user } = useContext(AuthContext);
    const [profile, setProfile] = useState("");
    const [cakes,setCakes] = useState([]);

    useEffect(() => {
        UserService.getProfile(user.accessToken).then((result) => {
            setProfile(result);
        });

        CatalogService.myAds(user.accessToken).then((result) => {
            setCakes(result);
        });
    },[user.accessToken]);
    
  return (
    <div>Profile</div>
  )
}

export default Profile