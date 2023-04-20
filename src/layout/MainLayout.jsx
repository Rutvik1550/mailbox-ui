import React from "react";
import Header from "../components/mailbox/Header";
import Sidebar from "../components/mailbox/Sidebar";

export const MainLayout = (props) => {
  console.log(props,'chile')
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
              {props.children}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
