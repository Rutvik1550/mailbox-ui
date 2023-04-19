export const Routes = Object.freeze({
  home: "mailbox",
  mailbox: "",
  compose: "compose",
  readMail: "read-mail/:id",
  error: "error",
});

export const emptyFilterOption = {
  "SearchByFrom": "",
  "SearchByTo_CC": "",
  "SearchSubject": "",
  "SearchWords": "",
  "AttachmentSize": "",
  "StartDate": "",
  "EndDate": ""
}

export const localStorageKeys = {
  TOKEN: "token",
};

export const PAGE_LIMIT = 50;

export const DEBOUNCE_DELAY = 800

export const sortSelectOptions = [
  {
    label: "From",
    value: "FROMMAIL",
  },
  {
    label: "Subject",
    value: "SUBJECT",
  },
  {
    label: "Date",
    value: "RecieveDate",
  },
];