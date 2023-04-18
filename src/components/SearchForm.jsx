import React from "react";
import { useEffect } from "react";
import { useRef } from "react";

export const SearchForm = ({ filterOptions, setFilterOptions, setOpenFilter }) => {
  const ref = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name) {
      setFilterOptions((prevVal) => ({
        ...prevVal,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    ref.current.focus();
  },[])

  const handleCloseFilter = () => {
    setOpenFilter(false)
  }

  return (
    <>
      <div className="search-form-container position-absolute">
        <div className="search-form-wrapper">
          <div className="form-group">
            <label for="SearchByFrom">From: </label>
            <input ref={ref} type="SearchByFrom" name="SearchByFrom" value={filterOptions?.SearchByFrom} onChange={handleChange} className="form-control" id="SearchByFrom" aria-describedby="SearchByFromHelp" />
          </div>
          <div className="form-group">
            <label for="SearchByTo_CC">To: </label>
            <input type="SearchByTo_CC" name="SearchByTo_CC" value={filterOptions?.SearchByTo_CC} onChange={handleChange} className="form-control" id="SearchByTo_CC" />
          </div>
          <div className="form-group">
            <label for="SearchSubject">Subject: </label>
            <input type="SearchSubject" name="SearchSubject" value={filterOptions?.SearchSubject} onChange={handleChange} className="form-control" id="SearchSubject" />
          </div>
          <div className="form-group">
            <label for="SearchWords">Includes: </label>
            <input type="SearchWords" name="SearchWords" value={filterOptions?.SearchWords} onChange={handleChange} className="form-control" id="SearchWords" />
          </div>
          <div className="form-group">
            <label for="AttachmentSize">Size: </label>
            <input type="AttachmentSize" name="AttachmentSize" value={filterOptions?.AttachmentSize} onChange={handleChange} className="form-control" id="AttachmentSize" />
          </div>
          <div className="form-group">
            <label for="StartDate">Start Date: </label>
            <input type="date" name="StartDate" value={filterOptions?.StartDate} onChange={handleChange} className="form-control" id="StartDate" />
          </div>
          <div className="form-group">
            <label for="EndDate">End Date: </label>
            <input type="date" name="EndDate" value={filterOptions?.EndDate} onChange={handleChange} className="form-control" id="EndDate" />
          </div>
        </div>
      </div>
    </>
  );
};
