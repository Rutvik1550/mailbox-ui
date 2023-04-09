import { Link, useLocation } from "react-router-dom";
import React, { useState } from "react";

const Routes = {
  "/mailbox": {
    link: "/mailbox/compose",
    title: "Compose",
  },
  "/mailbox/read-mail": {
    link: "/mailbox",
    title: "Back to Inbox",
  },
  "/mailbox/compose": {
    link: "/mailbox",
    title: "Back to Inbox",
  },
};

const Sidebar = () => {
  const location = useLocation();
  const [isCollapse, setIsCollapse] = useState(false);

  const handleCollapse = () => {
    setIsCollapse(!isCollapse);
  };

  return (
    <div className="col-md-3">
      <Link to={Routes[location.pathname]["link"]} className="btn btn-primary btn-block mb-3">
        {Routes[location.pathname]["title"]}
      </Link>

      <div className={`card ${isCollapse ? "collapsed-card" : ""}`}>
        <div className="card-header">
          <h3 className="card-title">Folders</h3>

          <div className="card-tools">
            <button type="button" className="btn btn-tool" onClick={handleCollapse} data-card-widget="collapse">
              <i className="fas fa-minus"></i>
            </button>
          </div>
        </div>
        <div className="card-body p-0">
          <ul className="nav nav-pills flex-column">
            <li className="nav-item active">
              <a href="#" className="nav-link">
                <i className="fas fa-inbox"></i> Inbox
                <span className="badge bg-primary float-right">12</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="far fa-envelope"></i> Sent
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="far fa-file-alt"></i> Drafts
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="fas fa-filter"></i> Junk
                <span className="badge bg-warning float-right">65</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="far fa-trash-alt"></i> Trash
              </a>
            </li>
          </ul>
        </div>
        {/* /.card-body */}
      </div>
      {/* /.card */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Labels</h3>

          <div className="card-tools">
            <button type="button" className="btn btn-tool" data-card-widget="collapse">
              <i className="fas fa-minus"></i>
            </button>
          </div>
        </div>
        {/* /.card-header */}
        <div className="card-body p-0">
          <ul className="nav nav-pills flex-column">
            <li className="nav-item">
              <a className="nav-link" href="#">
                <i className="far fa-circle text-danger"></i> Important
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <i className="far fa-circle text-warning"></i> Promotions
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
