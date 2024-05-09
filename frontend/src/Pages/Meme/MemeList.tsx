import React, { FC, useContext, useEffect, useState } from 'react';
import { Container, Grid } from '@mui/material';
import { MemePost } from './Meme';
import { containerStyle } from '../Home/Styles';
import InfiniteScroll from 'react-infinite-scroll-component';
import { MemeContext } from '../../Context/MemeContext';

interface MemeListProps {
  author?: number;
  approved?: boolean;
  marginTop?: boolean;
}

const MemeList: FC<MemeListProps> = ({ author, approved, marginTop = true }) => {

  const { memes, fetchMemes, clearMemes } = useContext(MemeContext);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [initialize, setInitialize] = useState<boolean>(false);
  const pageCache: Record<number, boolean> = {};

  const handleFetchMemes = async () => {
    if (pageCache[page]) {
      return;
    }

    pageCache[page] = true;
    return fetchMemes({
      page,
      author: author || undefined,
      approved,
      size: 5
    }).then((count) => {
      setHasMore(count > 0);
      setPage(page + 1);
    });
  };

  useEffect(() => {
    clearMemes();
    handleFetchMemes().then(() => {
      console.log({
        memes, hasMore
      })
      setInitialize(true);
    });
  }, []);

  if (!initialize) {
    return <h1 style={{ marginTop: 100 }}>Loading...</h1>
  }

  return (
    <Container style={marginTop ? containerStyle : {}}>
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
