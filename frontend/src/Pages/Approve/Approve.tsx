import { FC } from "react";
import { HomeLayout } from "../../Shared/HomeLayout";
import MemeList from "../Meme/MemeList";

export const Approve: FC = () => {
  return (
    <HomeLayout>
      <MemeList approved={false} />
    </HomeLayout>
  )
};