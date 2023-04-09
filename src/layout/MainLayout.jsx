import React from "react";
import Header from "../components/mailbox/Header";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/mailbox/Sidebar";

export const MainLayout = () => {
  return (
    <div className="content-wrapper">
      <Header />
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <Sidebar />
            <Outlet />
          </div>
        </div>
      </section>
    </div>
  );
};
