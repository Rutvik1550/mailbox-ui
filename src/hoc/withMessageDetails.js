import React, { useEffect, useState } from "react";

import Loader from "../components/Loader";
import { useAuthContext } from "../context/auth";
import { useMailService } from "../services/mail.service";
import withLoader from "./withLoader";
import { useParams } from "react-router";
import { useSearchParams } from "react-router-dom";

const withMessageDetails = (WrappedComponent) => {
  return function WithMessageDetailsComponent({ ...props }) {
    const authContext = useAuthContext();
    const mailService = useMailService(authContext.token);
    const [loading, setLoading] = useState(false);
    const [messageDetails, setMessageDetails] = useState();
    const { id } = useParams();
    const [searchParams] = useSearchParams();

    const WrappedComponentWithLoading = withLoader(WrappedComponent, Loader);

    useEffect(() => {
      const folder = searchParams.get("folder");
      if (id && folder) {
        fetchMessageDetails(id, folder);
      }
    }, [id, searchParams]);

    const fetchMessageDetails = async (msgNum, folderName) => {
      try {
        setLoading(true);
        const res = await mailService.getMessageDetails(msgNum, folderName);
        setMessageDetails(res);
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
