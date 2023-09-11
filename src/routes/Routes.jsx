import React, { useEffect } from "react";

import { Route, Switch } from "react-router-dom";

import Home from "../pages/Home";
import Catalog from "../pages/Catalog";
import Cart from "../pages/Cart";
import Product from "../pages/Product";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../utils/utils";
const Routes = () => {
  const dispatch = useDispatch();
  const links = useSelector((state) => state.product.links);
  useEffect(() => {
    fetchData(dispatch);
  }, [links]);
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/getToken" exact component={Home} />
      <Route path="/catalog/:id" component={Product} />
      <Route path="/catalog" component={Catalog} />
      <Route path="/cart" component={Cart} />
      <Route path="/login" exact component={Login} />
      <Route path="/signup" exact component={Signup} />
    </Switch>
  );
};

export default Routes;
