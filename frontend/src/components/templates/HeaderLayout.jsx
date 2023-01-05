import { memo } from "react";
import { HeaderWithSidebar } from "../organisms/HeaderWithSidebar";

export const HeaderLayout = memo((props) => {
  const { children } = props;
  return (
    <>
      <HeaderWithSidebar />
      {children}
    </>
  );
});
