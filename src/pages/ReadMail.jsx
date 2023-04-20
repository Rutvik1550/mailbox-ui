import React, { useRef } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import { useAuthContext } from "../context/auth";
import { useMailService } from "../services/mail.service";
import withMessageDetails from "../hoc/withMessageDetails";

const ReadMail = ({ messageDetails, viewAsHtml, setViewAsHtml, htmlContent }) => {
  const authContext = useAuthContext();
  const mailService = useMailService(authContext.token);
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const mailRef = useRef();
  const navigate = useNavigate();

  const handleDeleteMail = async () => {
    try {
      const FolderName = searchParams.get("folder");
      const payload = {
        Msgnum: id,
        MailFolderName: FolderName,
      };
      const res = await mailService.deleteEmail([payload]);
      if (res === "Success") {
        navigate(-1);
      }
    } catch (error) {
      console.log("Error with Delete mail.", error);
    }
  };

  const handlePrintmail = () => {
    let printContents = mailRef.current.innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  const handleClickToggle = () => {
    setViewAsHtml((prev) => !prev);
  };

  if (!messageDetails) {
    return <div>No Mail Found</div>;
  }

  return (
    <>
      <div className="card card-primary card-outline" ref={mailRef}>
        <div className="card-header">
          <h3 className="card-title">Read Mail</h3>
          <a className="ml-3 mb-2" href="#" onClick={handleClickToggle}>{viewAsHtml ? "View As Text" : "View As Html"}</a>
        </div>

        <div className="card-body p-0">
          <div className="mailbox-read-info">
            <h5>{messageDetails.Subject}</h5>
            <h6>
              From: {messageDetails.FromMail}
              <span className="mailbox-read-time float-right">{messageDetails.RecieveDate}</span>
            </h6>
          </div>

          <div className="mailbox-read-message" dangerouslySetInnerHTML={{ __html: viewAsHtml ? htmlContent : messageDetails.TextBody }}></div>
        </div>

        {messageDetails?.Attachments?.length > 0 && (
          <div className="card-footer bg-white">
            <ul className="mailbox-attachments d-flex align-items-stretch clearfix overflow-auto">
              {messageDetails?.Attachments.map((attachment, index) => {
                return (
                  <li key={index}>
                    <span className="mailbox-attachment-icon">
                      <i className="far fa-file"></i>
                    </span>

                    <div className="mailbox-attachment-info">
                      <a href={attachment?.DownloadURL} className="mailbox-attachment-name">
                        <i className="fas fa-paperclip"></i> {attachment?.Filename}
                      </a>
                      <span className="mailbox-attachment-size clearfix mt-1">
                        <span>1,245 KB</span>
                        <a href={attachment?.DownloadURL} className="btn btn-default btn-sm float-right">
                          <i className="fas fa-cloud-download-alt"></i>
                        </a>
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        <div className="card-footer">
          <button type="button" className="btn btn-default" onClick={handleDeleteMail}>
            <i className="far fa-trash-alt"></i> Delete
          </button>
          <button type="button" className="btn btn-default" onClick={handlePrintmail}>
            <i className="fas fa-print"></i> Print
          </button>
        </div>
      </div>
    </>
  );
};

export default withMessageDetails(ReadMail);
