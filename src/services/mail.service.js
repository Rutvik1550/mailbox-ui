import { useEffect, useRef } from "react";

import BaseService from "./base.service";

export function useMailService(token) {
  let mailService = useRef(new MailServices(token));
  useEffect(() => {
    mailService.current = new MailServices(token);
  }, [token]);

  return mailService.current;
}

class MailServices extends BaseService {
  constructor(token) {
    super(token);
  }

  getMailFolders = async () =>
    await this._callApi("POST", "/api/Login/GetMailFolderList", undefined, {
      Userid: "abhinav.singh@dayibpl.com",
    });

  getMails = async (mailboxType) =>
    await this._callApi("POST", "/api/Login/GetMailList", undefined, {
      Userid: "abhinav.singh@dayibpl.com",
      MailboxType: mailboxType,
    });

  getMessageDetails = async (msgNum, folderName) =>
    await this._callApi("POST", "/api/Login/GetMessageDetails", undefined, {
      Userid: "abhinav.singh@dayibpl.com",
      Msgnum: msgNum,
      FolderName: folderName,
    });
}
