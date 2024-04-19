import React from 'react';
import MemeList from '../Meme/MemeList';
import { HomeLayout } from '../../Shared/HomeLayout';

const Home = () => {
  return (
    <HomeLayout>
      <MemeList approved={true} />
    </HomeLayout>
  );
};

export default Home;
