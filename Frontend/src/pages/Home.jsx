import React from "react";
import AppLayout from "../components/layout/AppLayout";

const Home = () => {
  return <div>Home Page </div>;
};

const HomeWithLayout = AppLayout(Home); 
export default HomeWithLayout;
