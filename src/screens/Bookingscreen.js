import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import Swal from "sweetalert2";
import Loader from "../components/Loader";
import Error from "../components/Error";

function Bookingscreen({ match }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [room, setRoom] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalDays, setTotalDays] = useState(0);
  const img = require("../assets/img/FYP LR Presentation.png");

  const roomid = match.params.roomid;
  const fromdate = moment(match.params.fromdate, "DD-MM-YYYY");
  const todate = moment(match.params.todate, "DD-MM-YYYY");

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
          await axios.post("/api/rooms/getroombyid", {
            roomid: match.params.roomid,
          })
        ).data;
        //console.log(data);
        setRoom(data);
      } catch (error) {
        console.log(error);
        setError(error);
      }
      setLoading(false);
    }

    fetchMyAPI();
  }, []);

  useEffect(() => {
    const totaldays = moment.duration(todate.diff(fromdate)).asDays() + 1;
    setTotalDays(totaldays);
    setTotalAmount((totalDays * room.priceperday)+50);
  }, [room]);

  async function bookRoom(){
    const bookingDetails = {
      room,
      userid: JSON.parse(localStorage.getItem("currentUser"))._id,
      fromdate,
      todate,
      totalAmount,
      totaldays: totalDays,
    };

    try {
      setLoading(true);
      const result = await axios.post("/api/bookings/bookroom", bookingDetails);
      setLoading(false);
      Swal.fire(
        "Congratulations",
        "Your room was booked successfully",
        "success"
      ).then((result) => {
        window.location.href = "/home";
      });
    } catch (error) {
      
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
            <img src={room.imageurls[0]} alt="" className="bigimg" />
          </div>
          <div class="p-5 flex flex-col justify-center">
            <div class="mx-auto w-[300px]">
              <img src={img} alt="collins" />
            </div>
            <div class="divide-y divide-gray-200 rounded-lg bg-white shadow">
              <div class="px-10 py-7">
                <h1 class="font-bold text-lg">Room Details</h1>
                <p class="font-semibold">KK{room.college}</p>
                <p class="font-semibold">{room.name}</p>
                <p class="font-semibold">
                  Name : {JSON.parse(localStorage.getItem("currentUser")).name}
                </p>
                <p class="font-semibold">From Date : {match.params.fromdate}</p>
                <p class="font-semibold">To Date : {match.params.todate}</p>
                <div style={{ textAlign: "right" }}>
                  <hr />
                  <b> 
                    <p class="mt-2">Total Days : {totalDays}</p>
                    <p>Price per day : RM{room.priceperday}</p>
                    <p>JTK Fees : RM50</p>
                    <p>Total Amount : RM{totalAmount}</p>
                  </b>
                  <button onClick={bookRoom} class="bg-[#ffb923] px-3 py-2 rounded-md font-semibold hover:bg-[#d75b3f] hover:text-white">
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

export default Bookingscreen;
