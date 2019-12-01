import React, { Suspense, lazy } from "react";
import { Router } from "@reach/router";
import { useConnect } from "../context";
let Home = lazy(() => import("../components/Home.js"));
import Loading from "../components/common/Loading";

const App = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Router className="app">
        <Home path="/" />
      </Router>
    </Suspense>
  );
};

export default useConnect()(App);
