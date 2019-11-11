import React from "react";
import Users from "./views/Users.js";
import Products from "./views/Products.js";
import Manufacturers from "./views/Manufacturers.js";
import TopNavBar from './components/topNavBar.js'

import { BrowserRouter as Router, Route } from "react-router-dom";

const routes = [
  { path: "/users", component: Users },
  { path: "/", component: Users },
  { path: "/products", component: Products },
  { path: "/manufacturers", component: Manufacturers }
];

function App() {
  const routing = routes.map(({ path, component }, i) => <Route exact path={path} component={component} key={i} />);

  return (
    <>
      <Router>
        <TopNavBar />
         {routing}
      </Router>
    </>
  );
}

export default App;
