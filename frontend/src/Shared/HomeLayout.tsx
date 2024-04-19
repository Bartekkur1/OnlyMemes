import { FC, PropsWithChildren } from "react";
import Navbar from "./Navbar";

export const HomeLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Navbar />
      <div style={{ width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        {children}
      </div>
    </>
  )
};