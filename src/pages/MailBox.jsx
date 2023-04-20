import React, { useMemo, useState, useEffect } from "react";
import withMails from "../hoc/withMails";
import { useDebounce } from "../hooks/useDebounce";
import { PAGE_LIMIT, DEBOUNCE_DELAY, Routes, emptyFilterOption, sortSelectOptions } from "../utils/constants";
import { useNavigate } from "react-router";
import { useMailContext } from "../context/mail";
import { SearchForm } from "../components/SearchForm";
import makeAnimated from "react-select/animated";
import Select from "react-select";

const animatedComponents = makeAnimated();

const MailBox = ({ mails, fetchMails, selectedFolder, mailService }) => {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [filteredMails, setFilteredMails] = useState(mails);
  const navigate = useNavigate();
  const mailContext = useMailContext();
  const [selectedMails, setSelectedMails] = useState([]);
  const [allSelected, setAllSelected] = useState(false);
  const [filterOptions, setFilterOptions] = useState(emptyFilterOption);
  const [openFiler, setOpenFilter] = useState(false);
  const [sorting, setSorting] = useState({
    type: "",
    asce: true,
  });

  useEffect(() => {
    if (allSelected) {
      setSelectedMails(perPageMails.map((mail) => ({ Msgnum: mail.MSGNUM, MailFolderName: mail.FolderName })));
    } else {
      setSelectedMails([]);
    }
  }, [allSelected]);

  const perPageMails = useMemo(() => {
    const skip = (page - 1) * PAGE_LIMIT;
    const perPageFilterMails = filteredMails.slice(skip, skip + PAGE_LIMIT);
    if (sorting.type) {
      return perPageFilterMails.sort((a, b) => {
        if (sorting.asce) {
          return a[sorting.type].localeCompare(b[sorting.type], "en", { sensitivity: "base" });
        } else {
          return b[sorting.type].localeCompare(a[sorting.type], "en", { sensitivity: "base" });
        }
      });
    }
    return perPageFilterMails;
  }, [page, filteredMails, sorting]);

  const handlePageChange = (page) => {
    setPage(page);
  };

  const searchQuery = useDebounce(searchText, DEBOUNCE_DELAY);

  const handleSearchEmail = async (searchText) => {
    setPage(1);
    if (searchText) {
      const res = await mailService.searchEmail({
        ...emptyFilterOption,
        SearchWords: searchText,
      });
      setFilteredMails(res.emailLists);
    } else {
      setFilteredMails(mails);
    }
  };

  useEffect(() => {
    handleSearchEmail(searchQuery);
  }, [searchQuery]);

  const handleOnClickMail = (mail) => {
    navigate(`../${Routes.home}/${Routes.readMail.replace(":id", mail.MSGNUM)}?folder=${mailContext.selectedFolder}`);
  };

  const handleAllmailCheck = () => {
    setAllSelected((prev) => !prev);
  };

  const handleDeleteMails = async () => {
    try {
      await mailService.deleteEmail(selectedMails);
      setSelectedMails([]);
      fetchMails(selectedFolder);
    } catch (e) {
      console.log("exception", e);
    }
  };

  const handleRefreshMails = async () => {
    try {
      fetchMails(selectedFolder);
    } catch (error) {
      console.log("Error with Refresh mails:", error);
    }
  };

  const handleSortingSelect = (value) => {
    if (value.value == sorting.type) {
      setSorting((prevVal) => ({
        ...prevVal,
        asce: !prevVal.asce,
      }));
    } else {
      setSorting({
        type: value.value,
        asce: true,
      });
    }
  };

  const MailBoxControls = () => (
    <div className="mailbox-controls d-flex position-relative justify-content-between">
      <div className="d-flex">
        <button type="button" className="btn btn-default btn-sm checkbox-toggle" onClick={handleAllmailCheck}>
          <i className={`far ${allSelected ? "fa-square-check fa-solid" : "fa-square"}`}></i>
        </button>
        <div className="btn-group">
          <button type="button" className="btn btn-default btn-sm" onClick={handleDeleteMails}>
            <i className="far fa-trash-alt"></i>
          </button>
        </div>

        <button type="button" className="btn btn-default btn-sm" onClick={handleRefreshMails}>
          <i className="fas fa-sync-alt"></i>
        </button>
        <Select
          closeMenuOnSelect={true}
          components={animatedComponents}
          defaultValue={sortSelectOptions.filter(option => option.value == sorting.type)}
          onChange={handleSortingSelect}
          className={`react-sorting-select`}
          options={sortSelectOptions}
        />
      </div>
      <div className="float-right d-flex align-items-center">
        {`${(page - 1) * PAGE_LIMIT + 1}-${page * PAGE_LIMIT > filteredMails.length ? filteredMails.length : page * PAGE_LIMIT}/${
          filteredMails.length
        }`}
        <div className="btn-group ml-1">
          <button
            type="button"
            onClick={() => {
              handlePageChange(page - 1);
            }}
            className="btn btn-default btn-sm"
            disabled={page < 2}
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <button
            onClick={() => {
              handlePageChange(page + 1);
            }}
            type="button"
            className="btn btn-default btn-sm"
            disabled={(filteredMails.length % 50 == 0 ? page + 1 : page) * PAGE_LIMIT > filteredMails.length}
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );

  const handleMailCheckBox = (e, id, FolderName) => {
    if (e?.target?.checked) {
      setSelectedMails((prevVal) => [...prevVal, { Msgnum: id, MailFolderName: FolderName }]);
    } else {
      setSelectedMails((prevVal) => [...prevVal.filter((mail) => mail.Msgnum !== id)]);
    }
  };

  const handleOpenFilter = () => {
    setOpenFilter((prev) => !prev);
  };

  const handleSearch = async () => {
    if (Object.values(filterOptions).every((item) => item == "")) {
      setFilteredMails(mails);
    } else {
      setOpenFilter(false);
      const res = await mailService.searchEmail(filterOptions);
      setFilteredMails(res.emailLists);
    }
  };

  return (
    <>
      <div className="card card-primary card-outline">
        <div className="card-header">
          <h3 className="card-title">{searchText || !Object.values(filterOptions).every((item) => item == "") ? "Seach Result" : selectedFolder}</h3>

          <div className="card-tools">
            <div className="input-group input-group-sm">
              <input
                type="text"
                className="form-control"
                placeholder="Search Mail"
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
              />
              <div className="input-group-append" onClick={handleOpenFilter}>
                <div className="btn">
                  <i className="fas fa-solid fa-filter"></i>
                </div>
              </div>
              <div className="input-group-append" onClick={handleSearch}>
                <div className="btn btn-primary">
                  <i className="fas fa-search"></i>
                </div>
              </div>
              {openFiler && <SearchForm filterOptions={filterOptions} setOpenFilter={setOpenFilter} setFilterOptions={setFilterOptions} />}
            </div>
          </div>
        </div>

        <div className="card-body p-0">
          <MailBoxControls />
          <div className="table-responsive mailbox-messages">
            <table className="table table-hover table-striped">
              <tbody>
                {!perPageMails.length ? (
                  <div className="d-flex justify-content-center font-weight-bold">No Data Found</div>
                ) : (
                  perPageMails?.map((mail, index) => {
                    return (
                      <tr key={`mail-item-list-${index}-${mail.MSGNUM}`}>
                        <td>
                          <div className="icheck-primary">
                            <input
                              type="checkbox"
                              onChange={(e) => handleMailCheckBox(e, mail.MSGNUM, mail.FolderName)}
                              checked={selectedMails.filter((item) => item.Msgnum == mail.MSGNUM).length > 0}
                              id={`check-${mail.MSGNUM}`}
                            />
                            <label htmlFor={`check-${mail.MSGNUM}`}></label>
                          </div>
                        </td>
                        <td className="mailbox-star">
                          <span>
                            <i className="fas fa-star text-warning"></i>
                          </span>
                        </td>
                        <td className="mailbox-name">
                          <a
                            href=""
                            onClick={() => {
                              handleOnClickMail(mail);
                            }}
                          >
                            {mail.FROMMAIL.split(" <")[0]}
                          </a>
                        </td>
                        <td className="mailbox-subject">{mail.SUBJECT}</td>
                        <td className="mailbox-attachment"></td>
                        <td className="mailbox-date">{mail.RecieveDate}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card-footer p-0">
          <MailBoxControls />
        </div>
      </div>
    </>
  );
};

export default withMails(MailBox);
