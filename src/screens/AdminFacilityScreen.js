import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Tag, Space } from "antd";

import Loader from "../components/Loader";
import Error from "../components/Error";

function AdminFacilityScreen() {
  const [facilities, setfacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const columns = [
    {
      title: "facilityid",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "name",
      dataIndex: "name",
      key: "name",
    },
    { title: "location", dataIndex: "location", key: "location" },
    { title: "priceperhour", dataIndex: "priceperhour", key: "priceperhour" },
    { title: "category", dataIndex: "category", key: "category" },
  ];

  async function fetchMyData() {
    setError("");
    setLoading(true);
    try {
      const data = (await axios.post("/api/facilities/getallfacilities")).data;
      setfacilities(data);
    } catch (error) {
      console.log(error);
      setError(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchMyData();
  }, []);

  return (
    <div className="row">
      {loading ? (
        <Loader></Loader>
      ) : error.length > 0 ? (
        <Error msg={error}></Error>
      ) : (
        <>
          <div className="flex justify-end mb-4 mr-3">
            <button
              type="button"
              onClick={fetchMyData}
              class="inline-flex items-center justify-center w-auto px-3 py-2 space-x-2 text-sm font-medium text-white transition bg-blue-700 border border-blue-700 rounded appearance-none cursor-pointer select-none hover:border-blue-800 hover:bg-blue-800 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:pointer-events-none disabled:opacity-75"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 animate-spin"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                  clip-rule="evenodd"
                />
              </svg>
              <span>Refresh Data</span>
            </button>
          </div>
          <div className="col-md-12">
            <Table columns={columns} dataSource={facilities} />
          </div>
        </>
      )}
    </div>
  );
}

export default AdminFacilityScreen;
