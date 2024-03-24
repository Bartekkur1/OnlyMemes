import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../Shared/Navbar";

// @TODO: Finish this
const Profile = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <>
      <Navbar />
      <h1> Profile</h1>
    </>
  );
};

export default Profile;
