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
  const { userId } = useParams();
  const [userProfile, setUserProfile] = useState<UserProfile | undefined>();

  useEffect(() => {
    if (userId === undefined) return;
    // @TODO: check if userId is number
    ProfileApi.findProfile(Number(userId)).then((profile) => {
      if (!profile) {
        navigate('/');
      }
      setUserProfile(profile);
    });
  }, []);

  if (userProfile?.id === undefined) return (<div>Loading...</div>);

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
      <MemeList author={userProfile?.id} />
    </HomeLayout>
  );
};

export default Profile;
