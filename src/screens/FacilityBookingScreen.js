import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import Swal from "sweetalert2";
import Loader from "../components/Loader";
import Error from "../components/Error";

function FacilityBookingScreen({ match }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [facility, setFacility] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalhours, settotalhours] = useState(0);
  const img = require("../assets/img/FYP LR Presentation.png");

  const fromtime = moment(match.params.fromtime, "YYYY-MM-DDTHH:mm");
  const totime = moment(match.params.totime, "YYYY-MM-DDTHH:mm");
  const myArray = fromtime._i.split("T");
  const uArray = totime._i.split("T");
  let date = myArray[0];
  let from = myArray[1];
  let to = uArray[1];


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
      window.location.href = "/login";
    }
    async function fetchMyAPI() {
      try {
        setError("");
        setLoading(true);
        const data = (
          await axios.post("/api/facilities/getfacilitybyid", {
            facilityid: match.params.facilityid,
          })
        ).data;
        //console.log(data);
        setFacility(data);
      } catch (error) {
        console.log(error);
        setError(error);
      }
      setLoading(false);
    }

    fetchMyAPI();
  }, []);

  useEffect(() => {
    const total = moment.duration(totime.diff(fromtime)).asHours();
    settotalhours(total);
    setTotalAmount(total * facility.priceperhour);
  }, [facility]);

  async function bookfacility() {
    const facilityBookingDetails = {
      facility,
      userid: JSON.parse(localStorage.getItem("currentUser"))._id,
      fromtime,
      totime,
      totalAmount,
      totalhours: totalhours,
    };

    try {
      setLoading(true);
      const result = await axios.post(
        "/api/facilitybookings/bookfacility",
        facilityBookingDetails
      );
      setLoading(false);
      Swal.fire(
        "Congratulations",
        "Your facility was booked successfully",
        "success"
      ).then((result) => {
        window.location.href = "/facility";
      });
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <div className="pt-40">
      {loading ? (
        <Loader></Loader>
      ) : error.length > 0 ? (
        <Error msg={error}></Error>
      ) : (
        <div class="grid grid-cols-2">
          <div class="flex justify-center w-full p-5">
            <img src={facility.imageurls[0]} alt="" className="bigimg" />
          </div>
          <div class="p-5 flex flex-col justify-center">
            <div class="mx-auto w-[300px]">
              <img src={img} alt="collins" />
            </div>
            <div class="divide-y divide-gray-200 rounded-lg bg-white shadow">
              <div class="px-10 py-7">
                <h1 class="font-bold text-lg">Facility Details</h1>
                <p class="font-semibold">{facility.location}</p>
                <p class="font-semibold">{facility.name}</p>
                <p class="font-semibold">
                  Name : {JSON.parse(localStorage.getItem("currentUser")).name}
                </p>
                <p class="font-semibold">Date : {date}</p>
                <p class="font-semibold">From : {from}</p>
                <p class="font-semibold">To : {to} </p>
                <div style={{ textAlign: "right" }}>
                  <hr />
                  <b>
                    <p class="mt-2">Total Hours : {totalhours}</p>
                    <p>Price per hour : RM{facility.priceperhour}</p>
                    <p>Total Amount : RM{totalAmount}</p>
                  </b>
                  <button
                    onClick={bookfacility}
                    class="bg-[#ffb923] px-3 py-2 rounded-md font-semibold hover:bg-[#d75b3f] hover:text-white"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FacilityBookingScreen;
