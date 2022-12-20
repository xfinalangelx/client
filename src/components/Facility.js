import React from "react";
import { Link } from "react-router-dom";

function Facility({ Facility, date, fromTime, toTime }) {
  return (
    <div>
      <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md">
        <img src={Facility.imageurls[0]} alt="facility" />
        <div class="p-5">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            {Facility.name}
          </h5>

          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {Facility.location}
          </p>
          {fromTime && toTime && (
            <Link to={`/facilitybook/${Facility._id}/${fromTime}/${toTime}`}>
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
  );
}

export default Facility;
