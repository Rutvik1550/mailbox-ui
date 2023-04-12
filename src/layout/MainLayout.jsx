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
            <div className="col-md-3">
              <Sidebar />
            </div>
            <div className="col-md-9">
              <Outlet />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
