import { createContext, useContext, useState } from "react";

import React from "react";

const initialState = {
  selectedFolder: "",
  setSelectedFolder: () => {},
  mailFolderList: "",
  setMailFolderList: () => {},
};

export const MailContext = createContext(initialState);

export function MailWrapper({ children }) {
  const [selectedFolder, setSelectedFolder] = useState("");
  const [mailFolderList, setMailFolderList] = useState([]);

  let value = {
    selectedFolder,
    setSelectedFolder,
    mailFolderList,
    setMailFolderList,
  };

  return <MailContext.Provider value={value}>{children}</MailContext.Provider>;
}

export const useMailContext = () => {
  return useContext(MailContext);
};
