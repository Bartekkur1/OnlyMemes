import React, { FC, useEffect, useState } from 'react';
import { Container, Grid } from '@mui/material';
import { Meme } from '../../Types/Content';
import { MemePost } from './Meme';
import { containerStyle } from '../Home/Styles';
import { ContentApi } from '../../Api/Content';
import InfiniteScroll from 'react-infinite-scroll-component';

interface MemeListProps {
  author?: string;
}

const MemeList: FC<MemeListProps> = ({ author }) => {

  const [page, setPage] = useState<number>(1);
  const [memes, setMemes] = useState<Meme[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const pageCache: Record<number, boolean> = {};

  const handleFetchMemes = () => {
    if (pageCache[page]) {
      return;
    }

    pageCache[page] = true;
    ContentApi.fetchMemes({
      page,
      author: author || undefined,
      size: 5
    }).then(response => {
      setHasMore(response.length > 0);
      setMemes([...memes, ...response]);
      setPage(page => page + 1);
    });
  };

  useEffect(() => {
    handleFetchMemes();
  }, []);

  return (
    <Container style={containerStyle}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <InfiniteScroll
            dataLength={memes.length}
            next={() => {
              handleFetchMemes();
            }}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
          >
            {memes.map((meme, index) => <MemePost meme={meme} key={index} />)}
          </InfiniteScroll>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MemeList;
