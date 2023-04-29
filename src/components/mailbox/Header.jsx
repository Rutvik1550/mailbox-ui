import React from "react";

const Header = () => {
  return (
    <section className="content-header">
      <div className="container-fluid">
        <div className="row mb-0">
          <div className="col-sm-6">
            <h1>Mailbox</h1>
          </div>
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item">
                <span>Home</span>
              </li>
              <li className="breadcrumb-item active">Mailbox</li>
            </ol>
          </div>
        </div>
      </div>
      {/* /.container-fluid */}
    </section>
  );
};

export default Header;
