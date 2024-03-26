import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserProfile } from "../../Types/Profile";
import { ProfileApi } from "../../Api/Profile";
import { HomeLayout } from "../../Shared/HomeLayout";
import { Avatar, Grid, Typography } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import MemeList from "../Meme/MemeList";

// @TODO: Add better profile information, avatar, likes, comments, memes count etc.
const Profile = () => {
  const navigate = useNavigate();
  const { displayName } = useParams();
  const [userProfile, setUserProfile] = useState<UserProfile | undefined>();

  useEffect(() => {
    if (displayName === undefined) return;
    ProfileApi.findProfile(displayName).then((profile) => {
      if (!profile) {
        navigate('/');
      }
      setUserProfile(profile);
    });
  }, []);

  if (userProfile?.displayName === undefined) return (<div>Loading...</div>);

  return (
    <HomeLayout>
      <Grid container alignItems="center" spacing={2} style={{ display: 'flex', justifyContent: 'center' }}>
        <Grid item>
          <Avatar>
            <AccountCircle />
          </Avatar>
        </Grid>
        <Grid item>
          <Typography variant="h6">{userProfile?.displayName}</Typography>
        </Grid>
      </Grid>
      <MemeList author={userProfile?.displayName} />
    </HomeLayout>
  );
};

export default Profile;
