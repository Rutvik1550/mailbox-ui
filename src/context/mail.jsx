import { createContext, useContext, useState } from "react";

import React from "react";

const initialState = {
  selectedFolder: "",
  setSelectedFolder: () => {},
};

export const MailContext = createContext(initialState);

export function MailWrapper({ children }) {
  const [selectedFolder, setSelectedFolder] = useState("Inbox");

  let value = {
    selectedFolder,
    setSelectedFolder,
  };

  return <MailContext.Provider value={value}>{children}</MailContext.Provider>;
}

export const useMailContext = () => {
  return useContext(MailContext);
};
