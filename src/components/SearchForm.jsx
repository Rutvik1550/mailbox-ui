import React from "react";

export const SearchForm = () => {
  return (
    <>
      <div className="search-form-container position-absolute">
        <div className="search-form-wrapper">
        <div className="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
        </div>
        <div className="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
        </div>
        </div>
      </div>
    </>
  );
};
