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
    <>
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
          <div className="flex-column accordion">
            {Object.entries(filteredFolders)?.map((value, index) => {
              if (!value[1].length) {
                return (
                  // <li
                  //   className="nav-item active accordion-button"
                  //   onClick={() => {
                  //     handleFolderClick(value[0]);
                  //   }}
                  // >
                  //   <span className="nav-link">
                  //     {value[0]}
                  //   </span>
                  // </li>
                  <div className="card-header" id="headingOne" key={`accordion-title-${index}`}>
                    <h2 className="mb-0">
                      <button className="btn btn-block text-left" type="button" onClick={() => handleFolderClick(value[0])}>
                      <i className="fa-sharp fa-regular fa-circle-dot"></i> {value[0]}
                      </button>
                    </h2>
                  </div>
                );
              } else {
                return (
                  <div className={`card mb-0 ${!isCollapseSubFolder[value[0]] ? "collapsed-card" : ""}`} key={`accordion-title-${index}`}>
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
                      {value[1].map((subFolder, idx) => {
                        return (
                          // <li
                          //   key={`accordion-item-${idx}`}
                          //   className="nav-item"
                          //   onClick={() => {
                          //     handleFolderClick(value[0] + "/" + subFolder);
                          //   }}
                          // >
                          //   <span className="nav-link">
                          //     <i className="far fa-envelope"></i> {subFolder}
                          //   </span>
                          // </li>
                          <div
                            id="collapseOne"
                            key={`accordion-item-${idx}`}
                            className="collapse show border-bottom pl-3"
                            onClick={() => handleFolderClick(value[0] + "/" + subFolder)}
                          >
                            <div className="card-body">
                              <i className="fa-sharp fa-regular fa-circle-dot"></i> {subFolder}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              }
            })}
          </div>
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
              <a className="nav-link">
                <i className="far fa-circle text-danger"></i> Important
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link">
                <i className="far fa-circle text-warning"></i> Promotions
              </a>
            </li>
          </ul>
        </div>
      </div> */}
    </>
  );
};

export default withMailFolderList(Sidebar);
