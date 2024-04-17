import React, { FC, useContext, useEffect, useState } from 'react';
import { Container, Grid } from '@mui/material';
import { MemePost } from './Meme';
import { containerStyle } from '../Home/Styles';
import InfiniteScroll from 'react-infinite-scroll-component';
import { MemeContext } from '../../Context/MemeContext';

interface MemeListProps {
  author?: number;
  onlyValidated?: boolean;
}

const MemeList: FC<MemeListProps> = ({ author, onlyValidated }) => {

  const { memes, fetchMemes, clearMemes } = useContext(MemeContext);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const pageCache: Record<number, boolean> = {};

  useEffect(() => {
    clearMemes();
  }, []);

  const handleFetchMemes = async () => {
    if (pageCache[page]) {
      return;
    }

    pageCache[page] = true;
    fetchMemes({
      page,
      author: author || undefined,
      onlyValidated,
      size: 5
    }).then((count) => {
      setHasMore(count > 0);
      setPage(page + 1);
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
