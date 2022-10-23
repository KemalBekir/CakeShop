import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import * as userService from "../../services/userService";

const Logout = () => {
  const navigate = useNavigate();
  const { user, userLogout } = useContext(AuthContext);

  useEffect(() => {
    userService.logout(user.accessToken).then(() => {
        userLogout();
        navigate("/");
    });
  });
  return null;
};

export default Logout;
