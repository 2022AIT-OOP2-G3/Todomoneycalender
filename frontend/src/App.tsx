import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";

import "./App.css";
import { Router } from "./router/Router";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
