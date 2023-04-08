import React from "react";

const MailBox = () => {
  return (
    <div className="wrapper">
      <div className="content-wrapper">
        <section className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="card card-primary card-outline">
                <div className="card-header">
                  <h3 className="card-title">Inbox</h3>

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
                            <a href="read-mail.html">Alexander Pierce</a>
                          </td>
                          <td className="mailbox-subject">
                            <b>AdminLTE 3.0 Issue</b> - Trying to find a solution to this problem...
                          </td>
                          <td className="mailbox-attachment"></td>
                          <td className="mailbox-date">5 mins ago</td>
                        </tr>
                        <tr>
                          <td>
                            <div className="icheck-primary">
                              <input type="checkbox" value="" id="check2" />
                              <label htmlFor="check2"></label>
                            </div>
                          </td>
                          <td className="mailbox-star">
                            <a href="#">
                              <i className="fas fa-star-o text-warning"></i>
                            </a>
                          </td>
                          <td className="mailbox-name">
                            <a href="read-mail.html">Alexander Pierce</a>
                          </td>
                          <td className="mailbox-subject">
                            <b>AdminLTE 3.0 Issue</b> - Trying to find a solution to this problem...
                          </td>
                          <td className="mailbox-attachment">
                            <i className="fas fa-paperclip"></i>
                          </td>
                          <td className="mailbox-date">28 mins ago</td>
                        </tr>
                        <tr>
                          <td>
                            <div className="icheck-primary">
                              <input type="checkbox" value="" id="check3" />
                              <label htmlFor="check3"></label>
                            </div>
                          </td>
                          <td className="mailbox-star">
                            <a href="#">
                              <i className="fas fa-star-o text-warning"></i>
                            </a>
                          </td>
                          <td className="mailbox-name">
                            <a href="read-mail.html">Alexander Pierce</a>
                          </td>
                          <td className="mailbox-subject">
                            <b>AdminLTE 3.0 Issue</b> - Trying to find a solution to this problem...
                          </td>
                          <td className="mailbox-attachment">
                            <i className="fas fa-paperclip"></i>
                          </td>
                          <td className="mailbox-date">11 hours ago</td>
                        </tr>
                        <tr>
                          <td>
                            <div className="icheck-primary">
                              <input type="checkbox" value="" id="check4" />
                              <label htmlFor="check4"></label>
                            </div>
                          </td>
                          <td className="mailbox-star">
                            <a href="#">
                              <i className="fas fa-star text-warning"></i>
                            </a>
                          </td>
                          <td className="mailbox-name">
                            <a href="read-mail.html">Alexander Pierce</a>
                          </td>
                          <td className="mailbox-subject">
                            <b>AdminLTE 3.0 Issue</b> - Trying to find a solution to this problem...
                          </td>
                          <td className="mailbox-attachment"></td>
                          <td className="mailbox-date">15 hours ago</td>
                        </tr>
                        <tr>
                          <td>
                            <div className="icheck-primary">
                              <input type="checkbox" value="" id="check5" />
                              <label htmlFor="check5"></label>
                            </div>
                          </td>
                          <td className="mailbox-star">
                            <a href="#">
                              <i className="fas fa-star text-warning"></i>
                            </a>
                          </td>
                          <td className="mailbox-name">
                            <a href="read-mail.html">Alexander Pierce</a>
                          </td>
                          <td className="mailbox-subject">
                            <b>AdminLTE 3.0 Issue</b> - Trying to find a solution to this problem...
                          </td>
                          <td className="mailbox-attachment">
                            <i className="fas fa-paperclip"></i>
                          </td>
                          <td className="mailbox-date">Yesterday</td>
                        </tr>
                        <tr>
                          <td>
                            <div className="icheck-primary">
                              <input type="checkbox" value="" id="check6" />
                              <label htmlFor="check6"></label>
                            </div>
                          </td>
                          <td className="mailbox-star">
                            <a href="#">
                              <i className="fas fa-star-o text-warning"></i>
                            </a>
                          </td>
                          <td className="mailbox-name">
                            <a href="read-mail.html">Alexander Pierce</a>
                          </td>
                          <td className="mailbox-subject">
                            <b>AdminLTE 3.0 Issue</b> - Trying to find a solution to this problem...
                          </td>
                          <td className="mailbox-attachment">
                            <i className="fas fa-paperclip"></i>
                          </td>
                          <td className="mailbox-date">2 days ago</td>
                        </tr>
                        <tr>
                          <td>
                            <div className="icheck-primary">
                              <input type="checkbox" value="" id="check7" />
                              <label htmlFor="check7"></label>
                            </div>
                          </td>
                          <td className="mailbox-star">
                            <a href="#">
                              <i className="fas fa-star-o text-warning"></i>
                            </a>
                          </td>
                          <td className="mailbox-name">
                            <a href="read-mail.html">Alexander Pierce</a>
                          </td>
                          <td className="mailbox-subject">
                            <b>AdminLTE 3.0 Issue</b> - Trying to find a solution to this problem...
                          </td>
                          <td className="mailbox-attachment">
                            <i className="fas fa-paperclip"></i>
                          </td>
                          <td className="mailbox-date">2 days ago</td>
                        </tr>
                        <tr>
                          <td>
                            <div className="icheck-primary">
                              <input type="checkbox" value="" id="check8" />
                              <label htmlFor="check8"></label>
                            </div>
                          </td>
                          <td className="mailbox-star">
                            <a href="#">
                              <i className="fas fa-star text-warning"></i>
                            </a>
                          </td>
                          <td className="mailbox-name">
                            <a href="read-mail.html">Alexander Pierce</a>
                          </td>
                          <td className="mailbox-subject">
                            <b>AdminLTE 3.0 Issue</b> - Trying to find a solution to this problem...
                          </td>
                          <td className="mailbox-attachment"></td>
                          <td className="mailbox-date">2 days ago</td>
                        </tr>
                        <tr>
                          <td>
                            <div className="icheck-primary">
                              <input type="checkbox" value="" id="check9" />
                              <label htmlFor="check9"></label>
                            </div>
                          </td>
                          <td className="mailbox-star">
                            <a href="#">
                              <i className="fas fa-star text-warning"></i>
                            </a>
                          </td>
                          <td className="mailbox-name">
                            <a href="read-mail.html">Alexander Pierce</a>
                          </td>
                          <td className="mailbox-subject">
                            <b>AdminLTE 3.0 Issue</b> - Trying to find a solution to this problem...
                          </td>
                          <td className="mailbox-attachment"></td>
                          <td className="mailbox-date">2 days ago</td>
                        </tr>
                        <tr>
                          <td>
                            <div className="icheck-primary">
                              <input type="checkbox" value="" id="check10" />
                              <label htmlFor="check10"></label>
                            </div>
                          </td>
                          <td className="mailbox-star">
                            <a href="#">
                              <i className="fas fa-star-o text-warning"></i>
                            </a>
                          </td>
                          <td className="mailbox-name">
                            <a href="read-mail.html">Alexander Pierce</a>
                          </td>
                          <td className="mailbox-subject">
                            <b>AdminLTE 3.0 Issue</b> - Trying to find a solution to this problem...
                          </td>
                          <td className="mailbox-attachment"></td>
                          <td className="mailbox-date">2 days ago</td>
                        </tr>
                        <tr>
                          <td>
                            <div className="icheck-primary">
                              <input type="checkbox" value="" id="check11" />
                              <label htmlFor="check11"></label>
                            </div>
                          </td>
                          <td className="mailbox-star">
                            <a href="#">
                              <i className="fas fa-star-o text-warning"></i>
                            </a>
                          </td>
                          <td className="mailbox-name">
                            <a href="read-mail.html">Alexander Pierce</a>
                          </td>
                          <td className="mailbox-subject">
                            <b>AdminLTE 3.0 Issue</b> - Trying to find a solution to this problem...
                          </td>
                          <td className="mailbox-attachment">
                            <i className="fas fa-paperclip"></i>
                          </td>
                          <td className="mailbox-date">4 days ago</td>
                        </tr>
                        <tr>
                          <td>
                            <div className="icheck-primary">
                              <input type="checkbox" value="" id="check12" />
                              <label htmlFor="check12"></label>
                            </div>
                          </td>
                          <td className="mailbox-star">
                            <a href="#">
                              <i className="fas fa-star text-warning"></i>
                            </a>
                          </td>
                          <td className="mailbox-name">
                            <a href="read-mail.html">Alexander Pierce</a>
                          </td>
                          <td className="mailbox-subject">
                            <b>AdminLTE 3.0 Issue</b> - Trying to find a solution to this problem...
                          </td>
                          <td className="mailbox-attachment"></td>
                          <td className="mailbox-date">12 days ago</td>
                        </tr>
                        <tr>
                          <td>
                            <div className="icheck-primary">
                              <input type="checkbox" value="" id="check13" />
                              <label htmlFor="check13"></label>
                            </div>
                          </td>
                          <td className="mailbox-star">
                            <a href="#">
                              <i className="fas fa-star-o text-warning"></i>
                            </a>
                          </td>
                          <td className="mailbox-name">
                            <a href="read-mail.html">Alexander Pierce</a>
                          </td>
                          <td className="mailbox-subject">
                            <b>AdminLTE 3.0 Issue</b> - Trying to find a solution to this problem...
                          </td>
                          <td className="mailbox-attachment">
                            <i className="fas fa-paperclip"></i>
                          </td>
                          <td className="mailbox-date">12 days ago</td>
                        </tr>
                        <tr>
                          <td>
                            <div className="icheck-primary">
                              <input type="checkbox" value="" id="check14" />
                              <label htmlFor="check14"></label>
                            </div>
                          </td>
                          <td className="mailbox-star">
                            <a href="#">
                              <i className="fas fa-star text-warning"></i>
                            </a>
                          </td>
                          <td className="mailbox-name">
                            <a href="read-mail.html">Alexander Pierce</a>
                          </td>
                          <td className="mailbox-subject">
                            <b>AdminLTE 3.0 Issue</b> - Trying to find a solution to this problem...
                          </td>
                          <td className="mailbox-attachment">
                            <i className="fas fa-paperclip"></i>
                          </td>
                          <td className="mailbox-date">14 days ago</td>
                        </tr>
                        <tr>
                          <td>
                            <div className="icheck-primary">
                              <input type="checkbox" value="" id="check15" />
                              <label htmlFor="check15"></label>
                            </div>
                          </td>
                          <td className="mailbox-star">
                            <a href="#">
                              <i className="fas fa-star text-warning"></i>
                            </a>
                          </td>
                          <td className="mailbox-name">
                            <a href="read-mail.html">Alexander Pierce</a>
                          </td>
                          <td className="mailbox-subject">
                            <b>AdminLTE 3.0 Issue</b> - Trying to find a solution to this problem...
                          </td>
                          <td className="mailbox-attachment">
                            <i className="fas fa-paperclip"></i>
                          </td>
                          <td className="mailbox-date">15 days ago</td>
                        </tr>
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
          </div>
        </section>
      </div>
    </div>
  );
};

export default MailBox;
