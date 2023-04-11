import { Link, useLocation } from "react-router-dom";
import React, { useMemo, useState } from "react";
import withMailFolderList from "../../hoc/withMailFolderList";
import { useMailContext } from "../../context/mail";

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

const Sidebar = ({ mailFolderList }) => {
  const location = useLocation();
  const [isCollapse, setIsCollapse] = useState(false);
  const [isCollapseSubFolder, setIsCollapseSubFolder] = useState({});
  const mailContext = useMailContext();

  const handleCollapse = () => {
    setIsCollapse(!isCollapse);
  };

  const handleCollapseSubFolder = (key) => {
    const t = isCollapseSubFolder[key];
    setIsCollapseSubFolder({ ...isCollapseSubFolder, [key]: !t });
  };

  const filteredFolders = useMemo(() => {
    let filterFolders = {};
    mailFolderList?.map((folder) => {
      const folderRoutes = folder.FolderName.split("/");
      const key = folderRoutes[0];
      const childRoutes = folderRoutes[1];

      if (childRoutes) {
        if (filterFolders[key]) {
          filterFolders[key].push(childRoutes);
        } else {
          filterFolders[key] = [childRoutes];
        }
      } else {
        filterFolders[key] = [];
      }
    });
    return filterFolders;
  }, [mailFolderList]);

  const handleFolderClick = (key) => {
    mailContext.setSelectedFolder(key);
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
            {Object.entries(filteredFolders)?.map((value) => {
              if (!value[1].length) {
                return (
                  <li
                    className="nav-item active"
                    onClick={() => {
                      handleFolderClick(value[0]);
                    }}
                  >
                    <span href="#" className="nav-link">
                      {value[0]}
                    </span>
                  </li>
                );
              } else {
                return (
                  <li className="nav-item active">
                    <span href="#" className="nav-link">
                      <div className={`card ${!isCollapseSubFolder[value[0]] ? "collapsed-card" : ""}`}>
                        <div className="card-header">
                          <h3 className="card-title">{value[0]}</h3>
                          <div className="card-tools">
                            <button
                              type="button"
                              className="btn btn-tool"
                              onClick={() => {
                                handleCollapseSubFolder(value[0]);
                              }}
                              data-card-widget="collapse"
                            >
                              <i className="fas fa-minus"></i>
                            </button>
                          </div>
                        </div>
                        <div className="card-body p-0">
                          <ul className="nav nav-pills flex-column">
                            {value[1].map((subFolder) => {
                              return (
                                <li
                                  className="nav-item"
                                  onClick={() => {
                                    handleFolderClick(value[0] + "/" + subFolder);
                                  }}
                                >
                                  <span className="nav-link">
                                    <i className="far fa-envelope"></i> {subFolder}
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    </span>
                  </li>
                );
              }
            })}
          </ul>
        </div>
        {/* /.card-body */}
      </div>
      {/* /.card */}
      {/* <div className="card">
        <div className="card-header">
          <h3 className="card-title">Labels</h3>

          <div className="card-tools">
            <button type="button" className="btn btn-tool" data-card-widget="collapse">
              <i className="fas fa-minus"></i>
            </button>
          </div>
        </div>
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
      </div> */}
    </div>
  );
};

export default withMailFolderList(Sidebar);
