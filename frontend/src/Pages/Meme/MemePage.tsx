import React, { useContext, useEffect, useState } from 'react';
import { HomeLayout } from '../../Shared/HomeLayout';
import { useNavigate, useParams } from 'react-router-dom';
import { MemeContext } from '../../Context/MemeContext';
import { Meme } from '../../Types/Content';
import { MemePost } from './Meme';
import { MemeComment } from './MemeComment';

const MemePage = () => {
  const { memeId } = useParams();
  const { memes, fetchMeme } = useContext(MemeContext);
  const [meme, setMeme] = useState<Meme | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && meme === undefined) {
      setLoading(true);
      fetchMeme(Number(memeId)).then(() => {
        setMeme(memes[0]);
        setLoading(false);
      });
    }
  }, [fetchMeme, loading, meme, memeId, memes]);

  if (memeId === undefined) {
    navigate('/');
  }

  return (
    <HomeLayout>
      <div style={{ marginTop: '4rem' }}>
        {
          loading && <h1>Loading...</h1>
        }
        {
          !loading && meme &&
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <MemePost meme={meme} />
            <MemeComment memeId={meme.id} />
          </div>
        }
      </div>
    </HomeLayout>
  );
};

export default MemePage;
