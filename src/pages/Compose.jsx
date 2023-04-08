import React from "react";

const Compose = () => {
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
            <textarea
              defaultValue={
                <>
                  <h1>
                    <u>Heading Of Message</u>
                  </h1>
                  <h4>Subheading</h4>
                  <p>
                    But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a
                    complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human
                    happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to
                    pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or
                    desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can
                    procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to
                    obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying
                    consequences, or one who avoids a pain that produces no resultant pleasure? On the other hand, we denounce with righteous
                    indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire,
                    that they cannot foresee
                  </p>
                  <ul>
                    <li>List item one</li>
                    <li>List item two</li>
                    <li>List item three</li>
                    <li>List item four</li>
                  </ul>
                  <p>Thank you,</p>
                  <p>John Doe</p>
                </>
              }
              id="compose-textarea"
              className="form-control"
              style={{ height: 300 }}
            ></textarea>
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
