import React, { useState, useEffect } from "react";
import axios from "axios";

import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Success";

function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function register() {
    if (password === cpassword) {
      const user = {
        name,
        email,
        password,
        cpassword,
      };
      //console.log(user);
      setLoading(true);
      setError("");
      setSuccess("");
      try {
        const result = (await axios.post("/api/users/register", user)).data;
        console.log(result);
        setSuccess(result);
        setName("");
        setEmail("");
        setPassword("");
        setCpassword("");
      } catch (error) {
        console.log(error);
        setError(error);
      }
      setLoading(false);
    } else {
      alert("Password not matched");
    }
  }

  return (
    <div>
      {loading && <Loader></Loader>}
      {error.length > 0 && <Error msg={error}></Error>}
      <section class="pt-40">
        <div class="mx-auto flex flex-col items-center justify-center">
          <div class="mb-2 text-green-600 font-bold ">
            {success.length > 0 && <Success msg={success}></Success>}
          </div>
          <div class="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
            <div class="space-y-4 p-6 sm:p-8 md:space-y-6">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
                Registration
              </h1>
              <div class="space-y-4 md:space-y-6">
                <div>
                  <label
                    for="name"
                    class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    type="name"
                    name="name"
                    id="name"
                    class="focus:ring-[#ffb923] focus:border-[#ffb923] block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
                    placeholder="name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>
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
                <div>
                  <label
                    for="confirm-password"
                    class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm password
                  </label>
                  <input
                    type="password"
                    name="confirm-password"
                    id="confirm-password"
                    placeholder="••••••••"
                    class="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                    value={cpassword}
                    onChange={(e) => {
                      setCpassword(e.target.value);
                    }}
                  />
                </div>
                <button
                  onClick={register}
                  class="bg-[#ffb923] hover:bg-[#d75b3f] hover:text-white w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium focus:outline-none focus:ring-4"
                >
                  Create an account
                </button>
                <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?
                  <a
                    href="/login"
                    class="text-[#ffb923] font-medium hover:underline"
                  >
                    Login here
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default RegisterScreen;
