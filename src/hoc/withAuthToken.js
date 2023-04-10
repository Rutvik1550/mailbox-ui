import React, { useEffect, useState } from "react";

import Loader from "../components/Loader";
import { localStorageKeys } from "../utils/const";
import { useAuthService } from "../services/auth.service";
import withLoader from "./withLoader";

const withAuthToken = (WrappedComponent) => {
  return function WithAuthTokenComponent() {
    const authService = useAuthService();
    const [token, setToken] = useState("");
    const [loading, setLoading] = useState(false);

    const WrappedComponentWithLoading = withLoader(WrappedComponent, Loader);

    useEffect(() => {
      const token = getToken();
      if (token) {
        setToken(token);
      } else {
        fetchToken();
      }
    }, []);

    const fetchToken = async () => {
      try {
        setLoading(true);
        const res = await authService.getToken();
        setToken(res.access_token);
        const item = {
          token: res.access_token,
          expiry: new Date().getTime() + res.expires_in * 1000,
        };
        localStorage.setItem(localStorageKeys.TOKEN, JSON.stringify(item));
      } catch (err) {
        console.log("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    const getToken = () => {
      const itemStr = localStorage.getItem(localStorageKeys.TOKEN);
      // if the item doesn't exist, return null
      if (!itemStr) {
        return "";
      }

      const item = JSON.parse(itemStr);
      const now = new Date();

      if (now.getTime() > item.expiry) {
        return "";
      }
      return item.token;
    };

    return <WrappedComponentWithLoading loading={loading || !token} token={token} />;
  };
};

export default withAuthToken;
