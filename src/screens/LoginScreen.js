import React, { useState, useEffect } from "react";
import axios from "axios";

import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Success";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const collins = require('../assets/img/FYP LR Presentation.png');

  async function Login() {
    setLoading(true);
    const user = {
      email,
      password,
    };
    //console.log(user);
    try {
      const result = (await axios.post("/api/users/login", user)).data;
      console.log(result);
      localStorage.setItem("currentUser", JSON.stringify(result));
      if(user.isAdmin === true){
        window.location.href ="/admin";
      }
      else{
              window.location.href = "/home";
      }
    } catch (error) {
      console.log(error);
      setError("Invalid Credentials");
    }
    setLoading(false);
  }
  return (
    <div>
      {loading && <Loader></Loader>}

      <section class="pt-40">
        <div class="mx-auto flex flex-col items-center justify-center">
          <div class="w-full rounded-lg bg-white shadow pb-20 sm:max-w-md md:mt-0 xl:p-0">
            <div class="space-y-4 p-6 sm:p-8 md:space-y-6">
              <img src={collins} alt="collins" />
              <div class="space-y-4 md:space-y-6">
                <div>
                  <label
                    for="email"
                    class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    class="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                    placeholder="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <label
                    for="password"
                    class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    class="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
                {loading ? (
                  <div>Login...Please Wait...</div>
                ) : (
                  <button
                    onClick={Login}
                    class="bg-[#ffb923] hover:bg-[#d75b3f] hover:text-white w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium focus:outline-none focus:ring-4"
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LoginScreen;
