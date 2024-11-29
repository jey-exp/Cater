import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../authContext";

const Profile = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/notauthenticated");
    }
  }, [isAuthenticated, navigate]);

  return <div>Profile is cooking !</div>;
};

export default Profile;
