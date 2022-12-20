import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

function Room({ room, fromDate, toDate }) {
  const [show, setShow] = useState(false);
  const color = room.gender === "male" ? "#90caf9" : "#f48fb1";
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <div class="w-full rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-yellow-500 p-1 shadow-xl">
        <div class="block rounded-xl bg-white p-6">
          <div class="">
            <div class="flex justify-end gap-3 pb-2">
              <span class="rounded-md bg-amber-200 px-3 py-1.5 text-xs font-medium text-amber-800">
                {room.beds} Beds
              </span>
              <span
                style={{ backgroundColor: color }}
                class="rounded-md px-3 py-1.5 text-xs font-medium text-amber-800"
              >
                {room.gender}
              </span>
            </div>
            <h3 class="flex justify-start text-xl font-bold text-gray-900">
              KK{room.college}
            </h3>

            <p class="flex justify-start mt-2 text-sm text-gray-500 mb-3">
              {room.name}
            </p>
            <div class="flex justify-end">
              {fromDate && toDate && (
                <Link to={`/book/${room._id}/${fromDate}/${toDate}`}>
                  <button class="inline-flex items-center rounded-md bg-amber-400 px-4 py-2 text-sm font-bold text-black hover:bg-[#d75b3f]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="mr-2 h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                      />
                    </svg>
                    Book
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Room;
