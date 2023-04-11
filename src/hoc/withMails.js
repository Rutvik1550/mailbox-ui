import React, { useEffect, useState } from "react";

import Loader from "../components/Loader";
import { useAuthContext } from "../context/auth";
import { useMailService } from "../services/mail.service";
import withLoader from "./withLoader";

const withMails = (WrappedComponent) => {
  return function WithMailsComponent({ mailboxType }) {
    const authContext = useAuthContext();
    const mailService = useMailService(authContext.token);
    const [loading, setLoading] = useState(false);
    const [mails, setMails] = useState([]);

    const WrappedComponentWithLoading = withLoader(WrappedComponent, Loader);

    useEffect(() => {
      fetchMails();
    }, []);

    const fetchMails = async () => {
      try {
        setLoading(true);
        const res = await mailService.getMails(mailboxType);
        setMails(res.emailLists);
      } catch (err) {
        console.log("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    return <WrappedComponentWithLoading loading={loading} mails={mails} />;
  };
};

export default withMails;
