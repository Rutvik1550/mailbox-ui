import "bootstrap/js/dist/modal";
import "bootstrap/js/dist/dropdown";
import "bootstrap/js/dist/tooltip";

import React from "react";
import ReactSummernote from "react-summernote";

const Compose = () => {
  const handleChangeSummernote = (content) => {
    console.log("content:", content);
  };

  return (
    <div className="col-md-9">
      <div className="card card-primary card-outline">
        <div className="card-header">
          <h3 className="card-title">Compose New Message</h3>
        </div>

        <div className="card-body">
          <div className="form-group">
            <input className="form-control" placeholder="To:" />
          </div>
          <div className="form-group">
            <input className="form-control" placeholder="Subject:" />
          </div>
          <div className="form-group">
            <ReactSummernote
              options={{
                disableDragAndDrop: false,
                height: 200,
                toolbar: [
                  ["style", ["style"]],
                  ["font", ["bold", "underline", "clear"]],
                  ["fontname", ["fontname"]],
                  ["color", ["color", "#ffffff"]],
                  ["para", ["ul", "ol", "paragraph"]],
                  ["table", ["table"]],
                  ["insert", ["link", "picture", "video"]],
                  ["view", ["fullscreen", "codeview"]],
                ],
              }}
              onChange={handleChangeSummernote}
            />
          </div>
          <div className="form-group">
            <div className="btn btn-default btn-file">
              <i className="fas fa-paperclip"></i> Attachment
              <input type="file" name="attachment" />
            </div>
            <p className="help-block">Max. 32MB</p>
          </div>
        </div>

        <div className="card-footer">
          <div className="float-right">
            <button type="button" className="btn btn-default">
              <i className="fas fa-pencil-alt"></i> Draft
            </button>
            <button type="submit" className="btn btn-primary">
              <i className="far fa-envelope"></i> Send
            </button>
          </div>
          <button type="reset" className="btn btn-default">
            <i className="fas fa-times"></i> Discard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Compose;
