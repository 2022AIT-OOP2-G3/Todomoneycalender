import { FC } from "react";
import { Route, Routes } from "react-router-dom";

import { SignIn } from "../components/pages/SignIn";
import { SignUp } from "../components/pages/SignUp";
import { Page404 } from "../components/pages/Page404";
import { HeaderLayout } from "../components/templates/HeaderLayout";
import { Calendar } from "../components/pages/Calendar";


export const Router: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/:id/calender" element={<HeaderLayout><Calendar /></HeaderLayout>}>
        
        <Route path="*" element={<Page404 />} />
      </Route>
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};
