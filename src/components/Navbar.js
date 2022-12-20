import React from "react";
import { PopupMenu } from "react-simple-widgets";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const img = require("../assets/img/FYP LR Presentation-3.png");

  function Logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "/login";
  }



  if (user) {
      let admin = "/admin";
      let normal = "/profile";
      let routingPage = "";
      if (user.isAdmin == true && user.isAdmin !== null) {
        routingPage = admin;
      } else {
        routingPage = normal;
      }

    return (
      <nav class="fixed top-0 left-0 z-20 w-full bg-[#ffb923] px-2">
        <div class="container mx-auto flex flex-wrap items-center justify-between">
          <a href="/" class="flex items-center">
            <img src={img} class="w-[40%]" alt="Collins" />
          </a>
          <div class="flex md:order-2 gap-3">
            <PopupMenu>
              <button className="rounded-lg bg-[#d75b3f] pt-3 pr-3 pl-2 text-center text-sm font-medium text-white hover:bg-white hover:text-[#d75b3f] focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 md:mr-0">
                <div className="flex flex-row gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                  <p>{user.name}</p>
                </div>
              </button>
              <div className="bg-gray-200 mt-10">
                <div className="px-4 py-4">
                  <div className="">
                    <a className="py-4 px-3" href={routingPage}>
                      My Profile
                    </a>
                  </div>
                  <hr />

                  <div className="d-grid">
                    <button
                      className="btn btn-secondary text-red-400"
                      onClick={Logout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </PopupMenu>
          </div>
          <div
            class="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto"
            id="navbar-sticky"
          >
            <ul class="mt-4 flex flex-col text-lg font-bold rounded-lg border border-gray-100 p-4 dark:border-gray-700 md:flex-row md:space-x-8 md:border-0">
              <li>
                <a
                  href="/home"
                  class="block rounded py-2 pl-3 pr-4 text-[#d75b3f] md:bg-transparent md:p-0 hover:text-white"
                  aria-current="page"
                >
                  Hostel Booking
                </a>
              </li>
              <li>
                <a
                  href="/facility"
                  class="block rounded py-2 pl-3 pr-4 text-[#d75b3f] md:bg-transparent md:p-0 hover:text-white"
                  aria-current="page"
                >
                  Facility Booking
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav class="fixed top-0 left-0 z-20 w-full bg-[#ffb923] px-2">
      <div class="container mx-auto flex flex-wrap items-center justify-between">
        <a href="/" class="flex items-center">
          <img src={img} class="w-[40%]" alt="Collins" />
        </a>
        <div class="flex md:order-2 gap-3">
          <a
            href="/register"
            class="mr-3 rounded-lg bg-[#d75b3f] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-white hover:text-[#d75b3f] focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 md:mr-0"
          >
            Register
          </a>
          <a
            href="/login"
            class="mr-3 rounded-lg bg-[#d75b3f] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-white hover:text-[#d75b3f] focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 md:mr-0"
          >
            Login
          </a>
        </div>
        <div
          class="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto"
          id="navbar-sticky"
        >
          <ul class="mt-4 flex flex-col text-lg font-bold rounded-lg border border-gray-100 p-4 dark:border-gray-700 md:flex-row md:space-x-8 md:border-0">
            <li>
              <a
                href="/home"
                class="block rounded py-2 pl-3 pr-4 text-[#d75b3f] md:bg-transparent md:p-0 hover:text-white"
                aria-current="page"
              >
                Hostel Booking
              </a>
            </li>
            <li>
              <a
                href="/facility"
                class="block rounded py-2 pl-3 pr-4 text-[#d75b3f] md:bg-transparent md:p-0 hover:text-white"
                aria-current="page"
              >
                Facility Booking
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
