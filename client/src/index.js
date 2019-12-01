import React from "react";
import { render } from "react-dom";
import Provider from "./context/Provider";
import App from "./app/App.js";
import "./assets/stylesheets/main.css";
import "./assets/stylesheets/normalize.css";
import "./assets/stylesheets/skeleton.css";

let AppIndex = Provider(App);

render(<AppIndex />, document.getElementById("root"));
