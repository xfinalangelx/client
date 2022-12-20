import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import { Tag } from "antd";
import MyBookingScreen from "./MyBookingScreen";
import FacilityBookingScreen from './MyFacilityBookingScreen';
const { TabPane } = Tabs;
const collins = require('../assets/img/FYP LR Presentation.png')

function ProfileScreen() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  }, []);

  function callback(key) {
    console.log(key);
  }

  return (
    <div className="mx-3 pt-40">
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Profile" key="1">
          <div class="relative block rounded-sm border-t-4 border-[#ffb923] px-8 pt-8 shadow-xl">
            <h3 class="text-4xl text-[#d75b3f] font-bold">User Profile</h3>
            <p class="mt-4 text-lg font-medium text-gray-500">{user.name}</p>
            <p class="mt-4 text-lg font-medium text-gray-500">{user.email}</p>
            <span>
              <p class="mt-4 text-lg font-medium text-gray-500">JTK/Admin: </p>
              <div>
                {user.isAdmin ? (
                  <Tag color="green">YES</Tag>
                ) : (
                  <Tag color="red">NO</Tag>
                )}
              </div>
            </span>

            <span class="mt-8 flex justify-end">
              <img src={collins} alt="collins" class="w-[30%]" />
            </span>
          </div>
        </TabPane>
        <TabPane tab="Booking" key="2">
          <MyBookingScreen></MyBookingScreen>
        </TabPane>
        <TabPane tab="Facility Booking" key="3">
          <FacilityBookingScreen></FacilityBookingScreen>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default ProfileScreen;
