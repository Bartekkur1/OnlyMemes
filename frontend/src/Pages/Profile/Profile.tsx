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
    // @TODO: check if userId is number
    ProfileApi.findProfile(Number(userId)).then((profile) => {
      if (!profile) {
        navigate('/');
      }
      setUserProfile(profile);
    });
  }, []);

  return (
    <HomeLayout>
      <Grid
        container
        spacing={2}
        alignItems={'center'}
        style={{ display: 'flex', width: '25%', minWidth: 500, marginTop: '75px' }}>
        <Grid item>
          <Avatar>
            <AccountCircle />
          </Avatar>
        </Grid>
        <Grid item>
          <Typography variant="h4">{userProfile?.displayName}</Typography>
          <Typography>Posts: {userProfile?.memesCount}</Typography>
        </Grid>
      </Grid>
      <MemeList author={userProfile?.id} />
    </HomeLayout>
  );
};

export default Profile;
