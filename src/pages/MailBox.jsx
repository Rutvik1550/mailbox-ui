import React, { useMemo, useState, useEffect } from "react";
import withMails from "../hoc/withMails";
import { useDebounce } from "../hooks/useDebounce";
import { PAGE_LIMIT, DEBOUNCE_DELAY, Routes } from "../utils/constants";
import { useNavigate } from "react-router";
import { useMailContext } from "../context/mail";
const MailBox = ({ mails, selectedFolder }) => {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [filteredMails, setFilteredMails] = useState(mails);
  const navigate = useNavigate();
  const mailContext = useMailContext();

  const perPageMails = useMemo(() => {
    const skip = (page - 1) * PAGE_LIMIT;
    return filteredMails.slice(skip, skip + PAGE_LIMIT);
  }, [page, filteredMails]);

  const handlePageChange = (page) => {
    setPage(page);
  };

  const searchQuery = useDebounce(searchText, DEBOUNCE_DELAY);

  const handleSearchEmail = (searchText) => {
    const filteredByTextMails = mails.filter((mail) => mail.FROMMAIL.includes(searchText) || mail.SUBJECT.includes(searchText));
    setFilteredMails(filteredByTextMails);
  };

  useEffect(() => {
    handleSearchEmail(searchQuery);
  }, [searchQuery]);

  const handleOnClickMail = (mail) => {
    navigate(`../${Routes.home}/${Routes.readMail.replace(":id", mail.MSGNUM)}?folder=${mailContext.selectedFolder}`);
  };

  const MailBoxControls = () => (
    <div className="mailbox-controls">
      <button type="button" className="btn btn-default btn-sm checkbox-toggle">
        <i className="far fa-square"></i>
      </button>
      <div className="btn-group">
        <button type="button" className="btn btn-default btn-sm">
          <i className="far fa-trash-alt"></i>
        </button>
        <button type="button" className="btn btn-default btn-sm">
          <i className="fas fa-reply"></i>
        </button>
        <button type="button" className="btn btn-default btn-sm">
          <i className="fas fa-share"></i>
        </button>
      </div>

      <button type="button" className="btn btn-default btn-sm">
        <i className="fas fa-sync-alt"></i>
      </button>
      <div className="float-right">
        {`${(page - 1) * PAGE_LIMIT + 1}-${page * PAGE_LIMIT > filteredMails.length ? filteredMails.length : page * PAGE_LIMIT}/${
          filteredMails.length
        }`}
        <div className="btn-group">
          <button
            type="button"
            onClick={() => {
              handlePageChange(page - 1);
            }}
            className="btn btn-default btn-sm"
            disabled={page < 2}
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <button
            onClick={() => {
              handlePageChange(page + 1);
            }}
            type="button"
            className="btn btn-default btn-sm"
            disabled={page * PAGE_LIMIT > filteredMails.length}
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="card card-primary card-outline">
        <div className="card-header">
          <h3 className="card-title">{selectedFolder}</h3>

          <div className="card-tools">
            <div className="input-group input-group-sm">
              <input
                type="text"
                className="form-control"
                placeholder="Search Mail"
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
              />
              <div className="input-group-append">
                <div className="btn btn-primary">
                  <i className="fas fa-search"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card-body p-0">
          <MailBoxControls />
          <div className="table-responsive mailbox-messages">
            <table className="table table-hover table-striped">
              <tbody>
                {!perPageMails.length ? (
                  <div className="d-flex justify-content-center font-weight-bold">No Data Found</div>
                ) : (
                  perPageMails?.map((mail, index) => {
                    return (
                      <tr key={`mail-item-list-${index}`}>
                        <td>
                          <div className="icheck-primary">
                            <input type="checkbox" value="" id="check1" />
                            <label htmlFor="check1"></label>
                          </div>
                        </td>
                        <td className="mailbox-star">
                          <a href="#">
                            <i className="fas fa-star text-warning"></i>
                          </a>
                        </td>
                        <td className="mailbox-name">
                          <a
                            href=""
                            onClick={() => {
                              handleOnClickMail(mail);
                            }}
                          >
                            {mail.FROMMAIL.split(" <")[0]}
                          </a>
                        </td>
                        <td className="mailbox-subject">{mail.SUBJECT}</td>
                        <td className="mailbox-attachment"></td>
                        <td className="mailbox-date">{mail.RecieveDate}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card-footer p-0">
          <MailBoxControls />
        </div>
      </div>
    </>
  );
};

export default withMails(MailBox);
