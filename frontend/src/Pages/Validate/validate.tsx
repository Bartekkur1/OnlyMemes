import { FC } from "react";
import { HomeLayout } from "../../Shared/HomeLayout";
import MemeList from "../Meme/MemeList";

export const Validate: FC = () => {
  return (
    <HomeLayout>
      <MemeList onlyValidated={false} />
    </HomeLayout>
  )
};