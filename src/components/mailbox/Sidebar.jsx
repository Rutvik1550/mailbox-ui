import { Link, useLocation, useNavigate } from "react-router-dom";
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

const Sidebar = ({ mailFolderList, mailService, fetchMailFolderList }) => {
  const location = useLocation();
  const [isCollapseSubFolder, setIsCollapseSubFolder] = useState({});
  const mailContext = useMailContext();
  const navigate = useNavigate();
  const [openCreateFolder, setOpenCreateFolder] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [openDeleteFolder, setOpenDeleteFolder] = useState({
    name: "",
    open: false,
  });
  const [openMoveFolder, setOpenMoveFolder] = useState({
    Oldfolderpath: "",
    Newfolderpath: "",
    open: false,
  });

  const handleCollapseSubFolder = (key) => {
    const t = isCollapseSubFolder[key];
    setIsCollapseSubFolder({ ...isCollapseSubFolder, [key]: !t });
  };

  const filteredFolders = useMemo(() => {
    let filterFolders = {
      folders: [],
      accordionFolders: {},
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
        if (key == "Inbox") {
          filterFolders.folders.splice(0, 0, key);
        } else {
          filterFolders.folders.push(key);
        }
      }
    });
    if (!mailContext.selectedFolder) {
      mailContext.setSelectedFolder(filterFolders.folders[0]);
    }
    return filterFolders;
  }, [mailFolderList]);

  const handleFolderClick = (key) => {
    mailContext.setSelectedFolder(key);
    navigate("/mailbox");
  };

  const handleCreateFolder = async () => {
    try {
      if (!folderName) {
        setOpenCreateFolder(false);
        return;
      }
      const res = await mailService.createMailFolder(folderName);
      console.log("create folder res: ", res);
      if (!res.ErrorMessage) {
        fetchMailFolderList();
      }
    } catch (error) {
      console.log("Error with create folder: ", error);
    } finally {
      setOpenCreateFolder(false);
      setFolderName("");
    }
  };

  const handleDeleteFolder = async (folder) => {
    try {
      const res = await mailService.deleteMailFolder(folder);
      console.log("delete folder res: ", res);
      if (!res.ErrorMessage) {
        fetchMailFolderList();
      }
    } catch (error) {
      console.log("Error with delete folder: ", error);
    } finally {
      setOpenDeleteFolder({ name: "", open: false });
    }
  };

  const handleOpenDelete = (folder) => {
    setOpenDeleteFolder({
      name: folder,
      open: true,
    });
  };

  const handleOpenMove = (folder) => {
    setOpenMoveFolder({
      Newfolderpath: "",
      Oldfolderpath: folder,
      open: true,
    });
  };

  const handleMoveFolder = async (oldFolder, newFolder) => {
    try {
      if (!newFolder) {
        setOpenMoveFolder({
          Newfolderpath: "",
          Oldfolderpath: "",
          open: false,
        });
        return;
      }
      const res = await mailService.moveMailFolder(oldFolder, newFolder);
      console.log("ressdjflksjd::", res);
      if (!res.ErrorMessage) {
        fetchMailFolderList();
      }
    } catch (error) {
      console.log("Error with move folder: ", error);
    } finally {
      setOpenMoveFolder({
        Newfolderpath: "",
        Oldfolderpath: "",
        open: false,
      });
    }
  };

  return (
    <>
      <Link to={(Routes[location.pathname] ?? Routes["/mailbox/read-mail"])?.link} className="btn btn-primary btn-block mb-2">
        {(Routes[location.pathname] ?? Routes["/mailbox/read-mail"])?.title}
      </Link>

      <div className={`card mb-2`}>
        <div className="card-header">
          <h3 className="card-header-title">Folders</h3>
        </div>
        <div className="card-body p-0">
          <div className="flex-column accordion">
            {filteredFolders.folders?.map((folder, index) => {
              return (
                <div className="card-header d-flex justify-content-between no-after" key={`accordion-title-${index}`}>
                  <h2 className="mb-0 w-100">
                    <button className="btn btn-block text-left cursor-pointer" type="button" onClick={() => handleFolderClick(folder)}>
                      {folder}
                    </button>
                  </h2>
                  <h2 className="mb-0 d-flex">
                    <button className="btn btn-block text-left cursor-pointer m-0" type="button" onClick={() => handleOpenDelete(folder)}>
                      <i className="fas fa-trash"></i>
                    </button>
                    <button className="btn btn-block text-left cursor-pointer m-0" type="button" onClick={() => handleOpenMove(folder)}>
                      <i className="fas fa-share"></i>
                    </button>
                  </h2>
                </div>
              );
            })}
            {Object.entries(filteredFolders.accordionFolders)?.map((value, index) => {
              return (
                <div className={`card mb-0 ${!isCollapseSubFolder[value[0]] ? "collapsed-card" : ""}`} key={`accordion-title-${index}`}>
                  <div
                    className="card-header cursor-pointer"
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
                        <div className="card-header d-flex justify-content-between no-after" key={`accordion-item-${idx}`}>
                          <h2 className="mb-0 w-100">
                            <button className="btn btn-block text-left" type="button" onClick={() => handleFolderClick(value[0] + "/" + subFolder)}>
                              {subFolder}
                            </button>
                          </h2>
                          <h2 className="mb-0 d-flex">
                            <button
                              className="btn btn-block text-left cursor-pointer m-0"
                              type="button"
                              onClick={() => handleOpenDelete(value[0] + "/" + subFolder)}
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                            <button
                              className="btn btn-block text-left cursor-pointer m-0"
                              type="button"
                              onClick={() => handleOpenMove(value[0] + "/" + subFolder)}
                            >
                              <i className="fas fa-share"></i>
                            </button>
                          </h2>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <button className="btn btn-secondary btn-block" onClick={() => setOpenCreateFolder(true)}>
        Create Folder
      </button>

      {/* Create folder popup */}
      <div
        className={`modal fade ${openCreateFolder ? "show" : ""}`}
        id="createModal"
        tabIndex="-1"
        aria-labelledby="createModalLabel"
        aria-modal="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="createModalLabel">
                Create Folder
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setOpenCreateFolder(false)}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                placeholder="Folder Name"
                onChange={(e) => {
                  setFolderName(e.target.value);
                }}
              />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setOpenCreateFolder(false)}>
                Cancle
              </button>
              <button type="button" className="btn btn-primary" onClick={handleCreateFolder}>
                Create
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete folder popup */}
      <div
        className={`modal fade ${openDeleteFolder.open ? "show" : ""}`}
        id="deleteModal"
        tabIndex="-1"
        aria-labelledby="deleteModalLabel"
        aria-modal="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteModalLabel">
                Delete Folder
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => setOpenDeleteFolder({ name: "", open: false })}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <span>Delete this Folder "{openDeleteFolder.name}"?</span>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setOpenDeleteFolder({ name: "", open: false })}>
                Cancle
              </button>
              <button type="button" className="btn btn-primary" onClick={() => handleDeleteFolder(openDeleteFolder.name)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Move Folder select popup */}
      <div
        className={`modal fade ${openMoveFolder.open ? "show" : ""}`}
        id="moveFolderModal"
        tabIndex="-1"
        aria-labelledby="moveFolderModalLabel"
        aria-modal="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="moveFolderModalLabel">
                Move Folder
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() =>
                  setOpenMoveFolder({
                    Newfolderpath: "",
                    Oldfolderpath: "",
                    open: false,
                  })
                }
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <span>Move this Folder "{openMoveFolder.Oldfolderpath}"?</span>
              <div className="form-group">
                <label htmlFor="moveFolderSelect">Move Folder To:</label>
                <select
                  className="form-control"
                  id="moveFolderSelect"
                  placeholder="Select New Folder"
                  onChange={(e) => setOpenMoveFolder((prevVal) => ({ ...prevVal, Newfolderpath: e.target.value }))}
                >
                  <option value={""}>Select New Folder</option>
                  {mailFolderList &&
                    mailFolderList
                      .filter((folder) => folder.FolderName !== openMoveFolder.Oldfolderpath)
                      .map((mailFolder, index) => (
                        <option key={`move-folder-option-${mailFolder.FolderName}-${index}`} value={mailFolder.FolderName}>
                          {mailFolder.FolderName}
                        </option>
                      ))}
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={() =>
                  setOpenMoveFolder({
                    Newfolderpath: "",
                    Oldfolderpath: "",
                    open: false,
                  })
                }
              >
                Cancle
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleMoveFolder(openMoveFolder.Oldfolderpath, openMoveFolder.Newfolderpath)}
              >
                Move
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withMailFolderList(Sidebar);
