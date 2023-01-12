import { FC } from "react";
import { Route, Routes } from "react-router-dom";

import { userRoutes } from "./userRoutes";
import { SignIn } from "../components/pages/SignIn";
import { SignUp } from "../components/pages/SignUp";
import { Page404 } from "../components/pages/Page404";
import { HeaderLayout } from "../components/templates/HeaderLayout";
import { MonthyCalender } from "../components/pages/Calender";

export const Router: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/:id/calender">
        {userRoutes.map((route) => (
          <Route
            key={route.path}
            path={`${route.path}`}
            element={<HeaderLayout>{route.children}</HeaderLayout>}
          />
        ))}
        <Route path="*" element={<Page404 />} />
      </Route>
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};
