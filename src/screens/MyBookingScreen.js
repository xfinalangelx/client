import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Tag } from "antd";

import Loader from "../components/Loader";
import Error from "../components/Error";

function MyBookingScreen() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("currentUser"));

  async function fetchMyAPI() {
    setError("");
    setLoading(true);
    try {
      const data = (
        await axios.post("/api/bookings/getbookingbyuserid", {
          userid: user._id,
        })
      ).data;
      setBookings(data);
    } catch (error) {
      console.log(error);
      setError(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchMyAPI();
  }, []);

  async function cancelBooking(bookingid, roomid) {
    setError("");
    setLoading(true);
    try {
      const data = (
        await axios.post("/api/bookings/cancelbooking", {
          bookingid,
          roomid,
        })
      ).data;
      setLoading(false);
      Swal.fire(
        "Congratulations",
        "Your booking was cancelled successfully",
        "success"
      ).then((result) => {
        fetchMyAPI();
      });
    } catch (error) {
      console.log(error);
      //setError(error);
      Swal.fire("Oops", "Error:" + error, "error");
    }
    setLoading(false);
  }

  return (
    <div>
      {loading ? (
        <Loader></Loader>
      ) : error.length > 0 ? (
        <Error msg={error}></Error>
      ) : (
        <div className="">
          {bookings &&
            bookings.map((booking) => {
              return (
                <div class="flex flex-col overflow-hidden rounded-lg border bg-white">
                  <div class="grid grid-cols-1 sm:grid-cols-4">
                    <div class="col-span-3 flex flex-col sm:border-l">
                      <div class="flex flex-col space-y-4 p-6 text-gray-600">
                        <div class="flex flex-row text-sm">
                          <p class="flex items-center text-gray-500">
                            <span class="mr-2 text-xs font-semibold uppercase">
                              Room:
                            </span>
                            <span>{booking.room}</span>
                          </p>
                        </div>

                        <div class="flex flex-row text-sm">
                          <p class="flex items-center text-gray-500">
                            <span class="mr-2 text-xs font-semibold uppercase">
                              Check in date:
                            </span>
                            <span> {booking.fromdate}</span>
                          </p>
                        </div>
                        <div class="flex flex-row text-sm">
                          <p class="flex items-center text-gray-500">
                            <span class="mr-2 text-xs font-semibold uppercase">
                              Check out date:
                            </span>
                            <span>{booking.todate}</span>
                          </p>
                        </div>

                        <div class="flex flex-row text-sm">
                          <p class="flex items-center text-gray-500">
                            <span class="mr-2 text-xs font-semibold uppercase">
                              Status:
                            </span>
                            {booking.status === "booked" ? (
                              <Tag color="green">CONFIRMED</Tag>
                            ) : (
                              <Tag color="red">CANCELLED</Tag>
                            )}
                          </p>
                        </div>
                      </div>
                      <div class="relative bottom-0 w-full flex-col">
                        <div class="ml-3 text-red py-3">
                          <button
                            class="flex cursor-pointer flex-row items-center justify-center text-xs font-semibold uppercase text-red-500"
                            onClick={() => {
                              cancelBooking(booking._id, booking.roomid);
                            }}
                          >
                            <div class="mr-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="20px"
                                viewBox="0 0 24 24"
                                width="20px"
                                fill="#FF0000"
                              >
                                <path d="M0 0h24v24H0V0z" fill="none" />
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4z" />
                              </svg>
                            </div>
                            Cancel booking
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}

export default MyBookingScreen;
