import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DataTable from "react-data-table-component";
import Main from "../template/Main";
import Api from "../../utils/api";
import ModalInterno from "../template/Modal";
import ChartsSamples from './ChartsSamples'

const headerProps = {
  icon: "files",
  title: "Files",
  subtitle: "Send Files",
};

const Sample = () => {
  const { fileId } = useParams();
  const [samples, setSamples] = useState([]);
  const [modalOpenMax, setModalOpenMax] = useState(false);
  const [modalOpenMin, setModalOpenMin] = useState(false);
  const [modalOpenRange, setModalOpenRange] = useState(false);
  const [maxValue, setMaxValue] = useState(0);
  const [minValue, setMinValue] = useState(0);
  const [maxRange, setMaxRange] = useState([]);
  const [loading, setLoading] = useState(false);
	const [totalRows, setTotalRows] = useState(0);
	const [perPage, setPerPage] = useState(10);  

  const fetchData = async page => {
		setLoading(true);

		const response = await Api.get(`/Samples/${fileId}?&page=${page}&per_page=${perPage}&delay=1`);

		setSamples(response.data.data);
		setTotalRows(response.data.totalPages);
		setLoading(false);
	};

	const handlePageChange = page => {
		fetchData(page);
	};

	const handlePerRowsChange = async (newPerPage, page) => {
		setLoading(true);

		const response = await Api.get(`/Samples/${fileId}?page=${page}&per_page=${newPerPage}&delay=1`);

		setSamples(response.data.data);
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
      name: "Date",
      selector: (row) => row.date,
    },
    {
      name: "Value",
      selector: (row) => row.value,
    },
  ];

  function renderTableSamples() {

    return (
      <DataTable
        title="Samples"
        columns={columns}
        data={samples}
        progressPending={loading}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
      />
    );
  }

  async function getMaxValue() {
    const response = await Api.get(`/Samples/maxSample/${fileId}`);
    setMaxValue(response.data);
    setModalOpenMax(true);
  }

  async function getMinValue() {
    const response = await Api.get(`/Samples/minSample/${fileId}`);
    setMinValue(response.data);
    setModalOpenMin(true);
  }

  async function getMaxRange() {
    const response = await Api.get(`/Samples/range/${fileId}`);
    setMaxRange(response.data);
    setModalOpenRange(true);    
  }

  const handleCloseMin = () => setModalOpenMin(false);
  const handleCloseMax = () => setModalOpenMax(false);
  const handleCloseRange = () => setModalOpenRange(false);
  
  


  return (
    <Main {...headerProps}>
      <div className="display-4">Samples!</div>
      <div className="container">
        <button className="btn btn-secondary" onClick={() => getMaxValue()}>Max Value</button>
        {modalOpenMax && (
          <ModalInterno          
            title={"Max Value"}
            handleClose={handleCloseMax}
            show={modalOpenMax}
            value={maxValue}
            setModalOpen={setModalOpenMax}
          />
        )}
        <hr />
        <button className="btn btn-secondary" onClick={() => getMinValue()}>Min Value</button>
        {modalOpenMin && (
          <ModalInterno
            title={"Max Value"}
            handleClose={handleCloseMin}
            show={modalOpenMin}
            value={minValue}
            setModalOpen={setModalOpenMin}
          />
        )}
        <hr />
        <button className="btn btn-secondary" onClick={() => getMaxRange()}>Max Value Range</button>
        {modalOpenRange && (
          <ModalInterno
          title={"Most Expensive Range"}
          handleClose={handleCloseRange}
          show={modalOpenRange}
          value={maxRange}
          setModalOpen={setModalOpenRange}
          />
        )}
      </div>
      {renderTableSamples()}

      { samples && <ChartsSamples samples={samples}/>}
    </Main>
  );
};

export default Sample;
