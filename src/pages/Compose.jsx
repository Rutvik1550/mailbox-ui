import "bootstrap/js/dist/modal";
import "bootstrap/js/dist/dropdown";
import "bootstrap/js/dist/tooltip";

import React, { useState } from "react";
import ReactSummernote from "react-summernote";
import MultiSelect from "../components/MultiSelect";
import { useAuthContext } from "../context/auth";
import { useMailService } from "../services/mail.service";
import { useNavigate } from "react-router-dom";

const Compose = () => {
  const [mailDetails, setMailDetails] = useState({});
  const [openCC, setOpenCC] = useState(false);
  const authContext = useAuthContext();
  const mailService = useMailService(authContext.token);
  const [Attachments, setAttachments] = useState([]);
  const navigate = useNavigate();

  const handleChangeSummernote = (content) => {
    setMailDetails((prevVal) => ({
      ...prevVal,
      BodyText: content,
    }));
  };

  const handleChange = (value, name) => {
    if (name) {
      setMailDetails((prevVal) => ({
        ...prevVal,
        [name]: value,
      }));
    }
  };

  const handleCCOpen = () => {
    setOpenCC((prev) => !prev);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name) {
      setMailDetails((prevVal) => ({
        ...prevVal,
        [name]: value,
      }));
    }
  };

  const handleSubmitMail = async () => {
    try {
      const res = await mailService.sendEmail({
        ...mailDetails,
        Attachments: Attachments,
      });
      if (res == "Sent") {
        navigate('/mailbox')
      }
    } catch (error) {
      console.log("Error with submit mail: ", error);
    }
  };

  const handleFileSelect = async (event) => {
    const { files: tempFiles } = event.target;
    const files = [...tempFiles];
    if (files?.length) {
      const tempAttachment = [];
      for await (const file of files) {
        function getFile() {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
              const result = {
                id: Attachments.length ? Attachments[Attachments.length - 1].id + 1 : Math.floor(Math.random() * 100000),
                Filename: file["name"],
                ContentType: file["type"],
                base64string: reader.result,
              };
              resolve(result);
            };
            reader.onerror = function (error) {
              console.log("Error: ", error);
              reject();
            };
          });
        }

        const base64File = await getFile();
        tempAttachment.push(base64File);
      }

      setAttachments([...Attachments, ...tempAttachment]);
    }
  };

  const handleRemoveFile = (id) => {
    setAttachments((prevVal) => prevVal.filter((file) => file.id !== id));
  };

  const handleDiscardMail = () => {
    navigate('/mailbox')
  }

  return (
    <>
      <div className="card card-primary card-outline">
        <div className="card-header">
          <h3 className="card-title">Compose New Message</h3>
        </div>

        <div className="card-body">
          <div className="form-group d-flex">
            <div className="input-group d-flex flex-nowrap">
              <MultiSelect name={"To"} onChange={handleChange} />
              <button className="btn btn-secondary float-right ml-2 pt-0 pb-0" onClick={handleCCOpen}>
                CC
              </button>
            </div>
          </div>
          {openCC && (
            <>
              <div className="form-group">
                <div className="input-group mb-3 d-flex flex-nowrap">
                  <MultiSelect name={"CC"} onChange={handleChange} />
                </div>
              </div>
              <div className="form-group">
                <div className="input-group mb-3 d-flex flex-nowrap">
                  <MultiSelect name={"BCC"} onChange={handleChange} />
                </div>
              </div>
            </>
          )}
          <div className="form-group">
            <input className="form-control" placeholder="Subject:" name="Subject" onChange={handleInputChange} />
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
              <input type="file" name="attachment" onChange={handleFileSelect} multiple />
            </div>
            <div className="files-container">
              {Attachments?.map((file, index) => (
                <div className="file-wrapper" key={`selected-files-${file.id}-${index}`}>
                  <span>{file.Filename}</span>
                  <i className="fa-solid fa-xmark" onClick={() => handleRemoveFile(file.id)}></i>
                </div>
              ))}
            </div>
            <p className="help-block">Max. 25MB</p>
          </div>
        </div>

        <div className="card-footer">
          <div className="float-right">
            <button type="submit" className="btn btn-primary ml-2" onClick={handleSubmitMail}>
              <i className="far fa-envelope"></i> Send
            </button>
          </div>
          <button type="reset" className="btn btn-default" onClick={handleDiscardMail}>
            <i className="fas fa-times"></i> Discard
          </button>
        </div>
      </div>
    </>
  );
};

export default Compose;
