import { Route, Routes } from "react-router-dom";

import { SigIn } from "../components/pages/SignIn";
import { SignUp } from "../components/pages/SignUp";
import { Calender } from "../components/pages/Calender";
import { Page404 } from "../components/pages/Page404";
import { HeaderLayout } from "../components/templates/HeaderLayout";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<SigIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/calender"
        element={
          <HeaderLayout>
            <Calender />
          </HeaderLayout>
        }
      />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};
