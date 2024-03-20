import React, { FC, useEffect, useState } from 'react';
import { Container, Grid } from '@mui/material';
import { Meme } from '../../Types/Content';
import { MemePost } from './Meme';
import { containerStyle } from './Styles';
import { ContentApi } from '../../Api/Content';

const MemeList: FC = () => {

  const [memes, setMemes] = useState<Meme[]>([]);

  useEffect(() => {
    ContentApi.fetchMemes().then(memes => {
      setMemes(memes);
    });
  }, []);

  return (
    <Container style={containerStyle}>
      <Grid container spacing={1}>
        {memes.map((meme, index) => (
          <Grid xs={12}>
            <MemePost meme={meme} key={index} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MemeList;
