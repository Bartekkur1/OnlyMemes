import { FC, PropsWithChildren, createContext, useState } from "react";
import { FetchMemesQuery, Meme } from "../Types/Content";
import { ContentApi } from "../Api/Content";

interface MemeContexetType {
  memes: Meme[];
  // addMeme: (meme: Meme) => void;
  deleteMeme: (memeId: number) => Promise<void>;
  fetchMemes: (query: FetchMemesQuery) => Promise<number>;
  clearMemes: () => void;
  changeMemeApproval: (memeId: number, approve: boolean) => Promise<void>;
  voteMeme: (memeId: number, vote: 'up' | 'down') => Promise<void>;
}

const MemeContext = createContext<MemeContexetType>({} as MemeContexetType);

const MemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [memes, setMemes] = useState<Meme[]>([]);

  // const addMeme = (meme: Meme) => {
  //   if (memes.some(m => m.id === meme.id)) return;
  //   setMemes(memes => [...memes, meme]);
  // };

  const deleteMeme = async (memeId: number) => {
    const result = await ContentApi.deleteMeme(memeId);
    if (result) {
      setMemes(memes => memes.filter(meme => meme.id !== memeId));
    }
  };

  const fetchMemes = async (query: FetchMemesQuery) => {
    const result = await ContentApi.fetchMemes(query);
    setMemes(memes => [...memes, ...result]);
    return result.length;
  };

  const clearMemes = () => {
    setMemes([]);
  };

  // @TODO: Add error handling?
  const changeMemeApproval = async (memeId: number, approve: boolean = true) => {
    const success = approve
      ? await ContentApi.approveMeme(memeId)
      : await ContentApi.disableMeme(memeId);
    if (success) {
      setMemes(memes => memes.filter(meme => meme.id !== memeId));
    }
  };

  const voteMeme = async (memeId: number, vote: 'up' | 'down') => {
    await ContentApi.voteMeme(memeId, vote);
  };

  const contextValue: MemeContexetType = {
    memes,
    // addMeme,
    deleteMeme,
    fetchMemes,
    clearMemes,
    changeMemeApproval,
    voteMeme
  };
  return <MemeContext.Provider value={contextValue}> {children} </MemeContext.Provider>;
};

export default MemeProvider;
export { MemeContext };