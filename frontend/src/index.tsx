import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import "./utilities/moment-locale";
import axios from "axios";

axios.defaults.baseURL = "/calendar/v1/calendar/api";

ReactDOM.render(<App />, document.getElementById("root"));
