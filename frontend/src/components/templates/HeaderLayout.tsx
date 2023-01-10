import { memo, FC, ReactNode } from "react";
import { HeaderWithSidebar } from "../organisms/HeaderWithSidebar";

interface Props {
  children: ReactNode;
}

export const HeaderLayout: FC<Props> = memo((props) => {
  const { children } = props;
  return (
    <>
      <HeaderWithSidebar />
      {children}
    </>
  );
});
