import { FC, PropsWithChildren, createContext, useState } from "react";
import { FetchMemesQuery, Meme } from "../Types/Content";
import { ContentApi } from "../Api/Content";

interface MemeContexetType {
  memes: Meme[];
  addMeme: (meme: Meme) => void;
  deleteMeme: (memeId: number) => Promise<void>;
  fetchMemes: (query: FetchMemesQuery) => Promise<number>;
  clearMemes: () => void;
}

const MemeContext = createContext<MemeContexetType>({} as MemeContexetType);

const MemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [memes, setMemes] = useState<Meme[]>([]);

  const addMeme = (meme: Meme) => {
    if (memes.some(m => m.id === meme.id)) return;
    setMemes(memes => [...memes, meme]);
  };

  const deleteMeme = async (memeId: number) => {
    const result = await ContentApi.deleteMeme(memeId);
    if (result) {
      setMemes(memes => memes.filter(meme => meme.id !== memeId));
    }
  };

  const fetchMemes = async (query: FetchMemesQuery) => {
    const result = await ContentApi.fetchMemes(query);
    result.forEach(addMeme);
    return result.length;
  };

  const clearMemes = () => {
    setMemes([]);
  };

  const contextValue: MemeContexetType = {
    memes,
    addMeme,
    deleteMeme,
    fetchMemes,
    clearMemes
  };
  return <MemeContext.Provider value={contextValue}> {children} </MemeContext.Provider>;
};

export default MemeProvider;
export { MemeContext };