import React, { useEffect, useState } from "react";

import Loader from "../components/Loader";
import { useAuthContext } from "../context/auth";
import { useMailService } from "../services/mail.service";
import withLoader from "./withLoader";

const withMessageDetails = (WrappedComponent) => {
  return function WithMessageDetailsComponent({ msgNum, folderName }) {
    const authContext = useAuthContext();
    const mailService = useMailService(authContext.token);
    const [loading, setLoading] = useState(false);
    const [messageDetails, setMessageDetails] = useState([]);

    const WrappedComponentWithLoading = withLoader(WrappedComponent, Loader);

    useEffect(() => {
      fetchMessageDetails();
    }, []);

    const fetchMessageDetails = async () => {
      try {
        setLoading(true);
        const res = await mailService.getMessageDetails(msgNum, folderName);
        setMessageDetails(res.emailLists);
      } catch (err) {
        console.log("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    return <WrappedComponentWithLoading loading={loading} messageDetails={messageDetails} />;
  };
};

export default withMessageDetails;
