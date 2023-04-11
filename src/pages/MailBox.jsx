import React from "react";
import withMails from "../hoc/withMails";

const MailBox = ({ mails, selectedFolder }) => {
  return (
    <div className="col-md-9">
      <div className="card card-primary card-outline">
        <div className="card-header">
          <h3 className="card-title">{selectedFolder}</h3>

          <div className="card-tools">
            <div className="input-group input-group-sm">
              <input type="text" className="form-control" placeholder="Search Mail" />
              <div className="input-group-append">
                <div className="btn btn-primary">
                  <i className="fas fa-search"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card-body p-0">
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
              1-50/200
              <div className="btn-group">
                <button type="button" className="btn btn-default btn-sm">
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button type="button" className="btn btn-default btn-sm">
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="table-responsive mailbox-messages">
            <table className="table table-hover table-striped">
              <tbody>
                {mails?.map((mail) => {
                  return (
                    <tr>
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
                        <a href="read-mail.html">{mail.FROMMAIL.split(" <")[0]}</a>
                      </td>
                      <td className="mailbox-subject">
                        {mail.SUBJECT}
                      </td>
                      <td className="mailbox-attachment"></td>
                      <td className="mailbox-date">{mail.RecieveDate}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card-footer p-0">
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
              1-50/200
              <div className="btn-group">
                <button type="button" className="btn btn-default btn-sm">
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button type="button" className="btn btn-default btn-sm">
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withMails(MailBox);
