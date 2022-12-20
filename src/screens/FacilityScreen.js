import React, { useState, useEffect } from "react";
import axios from "axios";
import "antd/dist/antd.min.css";
import { DatePicker, TimePicker } from "antd";
import moment from "moment";

import Facility from "../components/Facility";
import Loader from "../components/Loader";
import Error from "../components/Error";

import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
// ..
AOS.init({
  duration: 1000,
});

const { RangePicker } = DatePicker;

function FacilityScreen() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [facilities, setFacilities] = useState([]);
  const [date, setDate] = useState();
  const [fromTime, setFromTime] = useState();
  const [toTime, setToTime] = useState();
  const [duplicateFacilities, setDuplicateFacilities] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [category, setCategory] = useState(0);

  useEffect(() => {
    async function fetchMyAPI() {
      try {
        setError("");
        setLoading(true);
        const data = (await axios.get("/api/facilities/getallfacilities")).data;
        //console.log(data);
        setFacilities(data);
        setDuplicateFacilities(data);
      } catch (error) {
        console.log(error);
        setError(error);
      }
      setLoading(false);
    }

    fetchMyAPI();
  }, []);

  function captureDate(date) {
    setDate(date);
  }

  function getCombinedDateObject(date, from, to) {
    var date = moment(date).format("YYYY-MM-DD");
    var fromTime = moment(from).format("HH:mm:ss");
    var toTime = moment(to).format("HH:mm:ss");

    // tell moment how to parse the input string
    var fromMomentObj = moment(date + fromTime, "YYYY-MM-DDLT");
    var toMomentObj = moment(date + toTime, "YYYY-MM-DDLT");

    // conversion
    var fromDateTime = fromMomentObj.format("YYYY-MM-DDTHH:mm");
    var toDateTime = toMomentObj.format("YYYY-MM-DDTHH:mm");

    setFromTime(fromDateTime)
    setToTime(toDateTime)

    try {
      var tempFacilities = [];
      for (const facility of duplicateFacilities) {
        var availability = false;

        
        if (facility.currentbookings.length > 0) {
          for (const booking of facility.currentbookings) {
            if (
              !moment(fromDateTime).isBetween(
                moment(booking.fromtime),
                moment(booking.totime)
              ) &&
              !moment(toDateTime).isBetween(
                moment(booking.fromtime),
                moment(booking.totime)
              )
            ) {
              if (
                fromDateTime !== booking.fromtime &&
                fromDateTime !== booking.totime &&
                toDateTime !== booking.fromtime &&
                toDateTime !== booking.totime
              ) {
                availability = true;
              }
            }
          }
        }
        //
        if (availability == true || facility.currentbookings.length == 0) {
          tempFacilities.push(facility);
        }
      }
      setFacilities(tempFacilities);
    } catch (error) {}

  }

  function filterByTime(times) {
    let fromTime = times[0];
    let toTime = times[1];
    getCombinedDateObject(date, fromTime, toTime);
 
  }

  function filterBySearch() {
    const tempFacilities = duplicateFacilities.filter((x) =>
      x.name.toLowerCase().includes(searchKey.toLowerCase())
    );
    setFacilities(tempFacilities);
  }


  function filterByType(category) {
    setCategory(category);
    if (category !== "all") {
      const tempFacilities = duplicateFacilities.filter(
        (x) => x.category.toLowerCase() == category.toLowerCase()
      );
      setFacilities(tempFacilities);
      console.log(tempFacilities);
    } else {
      setFacilities(duplicateFacilities);
    }
  }

  return (
    <div className="w-screen pt-40">
      <div className="my-3 w-full flex justify-center">
        <div class="w-[80%] rounded-lg bg-[#d75b3f] p-5 shadow md:w-2/3">
          <div class="relative">
            <div class="absolute ml-2 flex h-full items-center">
              <svg
                class="text-primary-gray-dark h-4 w-4 fill-current"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M15.8898 15.0493L11.8588 11.0182C11.7869 10.9463 11.6932 10.9088 11.5932 10.9088H11.2713C12.3431 9.74952 12.9994 8.20272 12.9994 6.49968C12.9994 2.90923 10.0901 0 6.49968 0C2.90923 0 0 2.90923 0 6.49968C0 10.0901 2.90923 12.9994 6.49968 12.9994C8.20272 12.9994 9.74952 12.3431 10.9088 11.2744V11.5932C10.9088 11.6932 10.9495 11.7869 11.0182 11.8588L15.0493 15.8898C15.1961 16.0367 15.4336 16.0367 15.5805 15.8898L15.8898 15.5805C16.0367 15.4336 16.0367 15.1961 15.8898 15.0493ZM6.49968 11.9994C3.45921 11.9994 0.999951 9.54016 0.999951 6.49968C0.999951 3.45921 3.45921 0.999951 6.49968 0.999951C9.54016 0.999951 11.9994 3.45921 11.9994 6.49968C11.9994 9.54016 9.54016 11.9994 6.49968 11.9994Z"></path>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search facility name..."
              class="w-full rounded-md border-transparent bg-gray-100 px-8 py-3 text-sm focus:border-gray-500 focus:bg-white focus:ring-0"
              value={searchKey}
              onChange={(e) => {
                setSearchKey(e.target.value);
              }}
              onKeyUp={filterBySearch}
            />
          </div>
          <div>
            <div class="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
              <select
                className="form-control"
                value={category}
                onChange={(e) => {
                  filterByType(e.target.value);
                }}
              >
                <option value="all">All</option>
                <option value="general">General</option>
                <option value="sports">Sports</option>
                <option value="hall">Hall</option>
              </select>

              <DatePicker format="DD-MM-YYYY" onChange={captureDate} />
              <TimePicker.RangePicker onChange={filterByTime} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        {loading ? (
          <Loader></Loader>
        ) : error.length > 0 ? (
          <Error msg={error}></Error>
        ) : (
          facilities.map((x) => {
            return (
              <div className="p-3">
                <Facility
                  Facility={
                    x
                  }  fromTime={fromTime} toTime={toTime}
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default FacilityScreen;
