import React, { useEffect, useState } from "react";

import Loader from "../components/Loader";
import { useAuthContext } from "../context/auth";
import { useMailService } from "../services/mail.service";
import withLoader from "./withLoader";
import { useMailContext } from "../context/mail";

const withMailFolderList = (WrappedComponent) => {
  return function WithMailFolderListComponent() {
    const authContext = useAuthContext();
    const mailContext = useMailContext();

    const mailService = useMailService(authContext.token);
    const [loading, setLoading] = useState(false);
    const [mailFolderList, setMailFolderList] = useState([]);

    const WrappedComponentWithLoading = withLoader(WrappedComponent, Loader);

    useEffect(() => {
      fetchMailFolderList();
    }, []);

    const fetchMailFolderList = async () => {
      try {
        setLoading(true);
        const res = await mailService.getMailFolders();
        setMailFolderList(res.mailfoldername);
        mailContext.setSelectedFolder(res.mailfoldername[0].FolderName);
      } catch (err) {
        console.log("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    return <WrappedComponentWithLoading loading={loading} mailFolderList={mailFolderList} />;
  };
};

export default withMailFolderList;
