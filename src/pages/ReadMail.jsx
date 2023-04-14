import React from "react";
import withMessageDetails from "../hoc/withMessageDetails";

const ReadMail = ({ messageDetails }) => {
  if (!messageDetails) {
    return <div>No Mail Found</div>;
  }
  return (
    <>
      <div className="card card-primary card-outline">
        <div className="card-header">
          <h3 className="card-title">Read Mail</h3>

          <div className="card-tools">
            <a href="#" className="btn btn-tool" title="Previous">
              <i className="fas fa-chevron-left"></i>
            </a>
            <a href="#" className="btn btn-tool" title="Next">
              <i className="fas fa-chevron-right"></i>
            </a>
          </div>
        </div>

        <div className="card-body p-0">
          <div className="mailbox-read-info">
            <h5>{messageDetails.Subject}</h5>
            <h6>
              From: {messageDetails.FromMail}
              <span className="mailbox-read-time float-right">15 Feb. 2015 11:03 PM</span>
            </h6>
          </div>

          <div className="mailbox-controls with-border text-center">
            <div className="btn-group">
              <button type="button" className="btn btn-default btn-sm" data-container="body" title="Delete">
                <i className="far fa-trash-alt"></i>
              </button>
              <button type="button" className="btn btn-default btn-sm" data-container="body" title="Reply">
                <i className="fas fa-reply"></i>
              </button>
              <button type="button" className="btn btn-default btn-sm" data-container="body" title="Forward">
                <i className="fas fa-share"></i>
              </button>
            </div>

            <button type="button" className="btn btn-default btn-sm" title="Print">
              <i className="fas fa-print"></i>
            </button>
          </div>

          <div className="mailbox-read-message" dangerouslySetInnerHTML={{ __html: messageDetails.TextBody }   }></div>
          {/* <p>
            Thanks,
            <br />
            Jane
          </p> */}
        </div>

        {messageDetails?.Attachments?.length > 0 && (
          <div className="card-footer bg-white">
            <ul className="mailbox-attachments d-flex align-items-stretch clearfix">
              {messageDetails?.Attachments.map((attachment, index) => {
                return (
                  <li key={index}>
                    <span className="mailbox-attachment-icon">
                      <i className="far fa-file-pdf"></i>
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
          <div className="float-right">
            <button type="button" className="btn btn-default">
              <i className="fas fa-reply"></i> Reply
            </button>
            <button type="button" className="btn btn-default">
              <i className="fas fa-share"></i> Forward
            </button>
          </div>
          <button type="button" className="btn btn-default">
            <i className="far fa-trash-alt"></i> Delete
          </button>
          <button type="button" className="btn btn-default">
            <i className="fas fa-print"></i> Print
          </button>
        </div>
      </div>
    </>
  );
};

export default withMessageDetails(ReadMail);
