import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useMemo, useState } from "react";
import withMailFolderList from "../../hoc/withMailFolderList";
import { useMailContext } from "../../context/mail";
import withAuthToken from "../../hoc/withAuthToken";

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
  const [isCollapseSubFolder, setIsCollapseSubFolder] = useState({});
  const mailContext = useMailContext();
  const navigate = useNavigate()

  const handleCollapseSubFolder = (key) => {
    const t = isCollapseSubFolder[key];
    setIsCollapseSubFolder({ ...isCollapseSubFolder, [key]: !t });
  };

  const filteredFolders = useMemo(() => {
    let filterFolders = {
      folders: [],
      accordionFolders: {}
    };
    mailFolderList?.map((folder) => {
      const folderRoutes = folder.FolderName.split("/");
      const key = folderRoutes[0];
      const childRoutes = folderRoutes[1];
      if (childRoutes) {
        if (filterFolders.accordionFolders[key]) {
          filterFolders.accordionFolders[key].push(childRoutes);
        } else {
          filterFolders.accordionFolders[key] = [childRoutes];
        }
      } else {
        if(key == "Inbox") {
          filterFolders.folders.splice(0, 0, key)
        } else {
          filterFolders.folders.push(key);
        }
      }
    });
    if(!mailContext.selectedFolder) {
      mailContext.setSelectedFolder(filterFolders.folders[0]);
    }
    return filterFolders;
  }, [mailFolderList]);

  const handleFolderClick = (key) => {
    mailContext.setSelectedFolder(key);
    navigate('/mailbox')
  };

  return (
    <>
      <Link to={(Routes[location.pathname] ?? Routes["/mailbox/read-mail"])?.link} className="btn btn-primary btn-block mb-3">
        {(Routes[location.pathname] ?? Routes["/mailbox/read-mail"])?.title}
      </Link>

      <div className={`card`}>
        <div className="card-header">
          <h3 className="card-header-title">Folders</h3>
        </div>
        <div className="card-body p-0">
          <div className="flex-column accordion">
            {filteredFolders.folders?.map((folder, index) => {
              return (
                  <div className="card-header" key={`accordion-title-${index}`}>
                    <h2 className="mb-0">
                      <button className="btn btn-block text-left" type="button" onClick={() => handleFolderClick(folder)}>
                        {folder}
                      </button>
                    </h2>
                  </div>
                );
              })}
            {Object.entries(filteredFolders.accordionFolders)?.map((value, index) => {
                return (
                  <div className={`card mb-0 ${!isCollapseSubFolder[value[0]] ? "collapsed-card" : ""}`} key={`accordion-title-${index}`}>
                    <div
                      className="card-header"
                      onClick={() => {
                        handleCollapseSubFolder(value[0]);
                      }}
                    >
                      <h3 className="card-title accordion__title">{value[0]}</h3>
                      <div className="card-tools">
                        <button type="button" className="btn btn-tool" data-card-widget="collapse">
                          <i className={`fas ${!isCollapseSubFolder[value[0]] ? "fa-plus" : "fa-minus"}`}></i>
                        </button>
                      </div>
                    </div>
                    <div className="card-body p-0">
                      {value[1].map((subFolder, idx) => {
                        return (
                          <div className="card-header" key={`accordion-item-${idx}`}>
                            <h2 className="mb-0">
                              <button className="btn btn-block text-left" type="button" onClick={() => handleFolderClick(value[0] + "/" + subFolder)}>
                                {subFolder}
                              </button>
                            </h2>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default withAuthToken(withMailFolderList(Sidebar));
