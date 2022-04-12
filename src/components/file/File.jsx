import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import Main from "../template/Main";
import Api from "../../utils/api";
import UploadFile from "./UploadFile";

const headerProps = {
  icon: "files",
  title: "Files",
  subtitle: "Send Files",
};

const File = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);

  useEffect(() => {
    getAll();
  }, []);

  const fetchData = async (page) => {
    setLoading(true);

    const response = await Api.get(
      `/FileUps?&page=${page}&per_page=${perPage}&delay=1`
    );

    setFiles(response.data.data);
    setTotalRows(response.data.totalPages);
    setLoading(false);
  };

  const handlePageChange = (page) => {
    fetchData(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true);

    const response = await Api.get(
      `/FileUps?page=${page}&per_page=${newPerPage}&delay=1`
    );

    setFiles(response.data.data);
    setPerPage(newPerPage);
    setLoading(false);
  };

  useEffect(() => {
    fetchData(1);
  }, []);
  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
    },
    {
      name: "Filename",
      selector: (row) => row.filename,
    },
    {
      name: "Date",
      selector: (row) => row.dateUp,
    },
    {
      cell: (row) => (
        <>
          <button
            className="btn btn-warning"
            onClick={() => setNavigate(row.id)}
            id={row.ID}
          >
            <i className="fa fa-pencil"></i>
          </button>
          <button
            className="btn btn-danger ml-2"
            onClick={() => removeFile(row.id)}
            id={row.ID}
          >
            <i className="fa fa-trash"></i>
          </button>
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  function renderTable() {
    return (
      <DataTable
        title="Files"
        columns={columns}
        data={files}
        progressPending={loading}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
      />
    );
  }

 
  async function getAll() {
    const response = await Api.get("/FileUps");
    setFiles(response.data);
  }

  async function removeFile(fileId) {
    await Api.delete(`/FileUps/${fileId}`);
    getAll();
  }

  async function submitForm(e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append("file", selectedFile, selectedFile.name);
    await Api.post("/FileUps", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    getAll();
  }

  const renderForm = function () {
    return (
      <div>
        <form>
          <UploadFile
            onFileSelectSuccess={(file) => setSelectedFile(file)}
            onFileSelectError={({ error }) => alert(error)}
          />
          <button className="btn btn-success" onClick={submitForm}>Submit</button>
        </form>
      </div>
    );
  };

  function setNavigate(id) {
    navigate(`/samples/${id}`);
  }

  return (
    <Main {...headerProps}>
      <div className="display-4">Send CSV</div>
      <hr />
      {renderForm()}
      {renderTable()}
    </Main>
  );
};

export default File;
