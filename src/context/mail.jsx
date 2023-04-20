import { createContext, useContext, useState } from "react";

import React from "react";

const initialState = {
  selectedFolder: "",
  folderList: [],
  setSelectedFolder: () => {},
  setFolderList: () => {},
};

export const MailContext = createContext(initialState);

export function MailWrapper({ children }) {
  const [selectedFolder, setSelectedFolder] = useState("");
  const [folderList, setFolderList] = useState([]);

  let value = {
    selectedFolder,
    folderList,
    setSelectedFolder,
    setFolderList,
  };

  return <MailContext.Provider value={value}>{children}</MailContext.Provider>;
}

export const useMailContext = () => {
  return useContext(MailContext);
};
