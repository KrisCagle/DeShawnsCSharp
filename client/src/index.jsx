import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Home from "./Home";
import { ViewAllDogs } from "./components/ViewAllDogs";
import { DogDetails } from "./components/DogDetails";
import { AddDog } from "./components/AddDog";
import { ViewAllWalkers } from "./components/ViewAllWalkers";
import { AssignDog } from "./components/AssignDog";
import { Cities } from "./components/Cities";
import { WalkerDetails } from "./components/WalkerDetails";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<ViewAllDogs />} />
        <Route path="/dogs/:id" element={<DogDetails />} />
        <Route path="/dogs/Add" element={<AddDog />}/>
        <Route path="/walkers" element={<ViewAllWalkers/>}/>
        <Route path="/walkers/:id/assign" element={<AssignDog/>}/>
        <Route path="/cities" element = {<Cities />}/>
        <Route path="/walkers/:id" element ={<WalkerDetails/>}/>
      </Route>
    </Routes>
  </BrowserRouter>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
