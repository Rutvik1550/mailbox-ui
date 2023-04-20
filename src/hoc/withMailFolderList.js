import React, { useEffect, useState } from "react";

import Loader from "../components/Loader";
import { useAuthContext } from "../context/auth";
import { useMailContext } from "../context/mail";
import { useMailService } from "../services/mail.service";
import withLoader from "./withLoader";

const withMailFolderList = (WrappedComponent) => {
  return function WithMailFolderListComponent() {
    const authContext = useAuthContext();
    const mailContext = useMailContext();
    const mailService = useMailService(authContext.token);
    const [loading, setLoading] = useState(false);

    const WrappedComponentWithLoading = withLoader(WrappedComponent, Loader);

    useEffect(() => {
      if (!mailContext.folderList?.length) {
        fetchMailFolderList();
      }
    }, []);

    const fetchMailFolderList = async () => {
      try {
        setLoading(true);
        const res = await mailService.getMailFolders();
        mailContext.setFolderList(res.mailfoldername);
      } catch (err) {
        console.log("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    return <WrappedComponentWithLoading loading={loading} mailFolderList={mailContext.folderList} />;
  };
};

export default withMailFolderList;
