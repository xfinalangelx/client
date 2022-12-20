import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Tag, Space } from "antd";

import Loader from "../components/Loader";
import Error from "../components/Error";

function AdminFacilityBookingScreen() {
  const [facilitybookings, setfacilityookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const columns = [
    {
      title: "transactionid",
      dataIndex: "transactionid",
      key: "transactionid",
    },
    { title: "facilityid", dataIndex: "facilityid", key: "facilityid" },
    { title: "facility", dataIndex: "facility", key: "facility" },
    { title: "fromtime", dataIndex: "fromtime", key: "fromtime" },
    { title: "totime", dataIndex: "totime", key: "totime" },
    {
      title: "status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <>
          {status === "booked" ? (
            <Tag color="green">CONFIRMED</Tag>
          ) : (
            <Tag color="red">CANCELLED</Tag>
          )}
        </>
      ),
    },
  ];

  async function fetchMyData() {
    setError("");
    setLoading(true);
    try {
      const data = (await axios.post("/api/facilitybookings/getallfacilitybookings")).data;
      setfacilityookings(data);
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
        <div className="col-md-12">
          <Table columns={columns} dataSource={facilitybookings} />
        </div>
      )}
    </div>
  );
}

export default AdminFacilityBookingScreen;
