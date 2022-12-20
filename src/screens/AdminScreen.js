import React, { useState, useEffect } from "react";

import { Tabs } from "antd";
import AdminBookingScreen from "./AdminBookingScreen";
import AdminRoomScreen from "./AdminRoomScreen";
import AdminUserScreen from "./AdminUserScreen";
import AdminAddRoomScreen from "./AdminAddRoomScreen";
import AdminFacilityBookingScreen from "./AdminFacilityBookingScreen"; 
import AdminFacilityScreen from "./AdminFacilityScreen";
import AdminAddFacilityScreen from './AdminAddFacilityScreen';

const { TabPane } = Tabs;
function callback(key) {
  console.log(key);
}
function AdminScreen() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (!user || user.isAdmin == false) {
      window.location.href = "/home";
    }
  }, []);

  return (
    <div className="pt-40 mx-4">
      <h1 className="text-center text-2xl font-bold text-[#ffb923]">
        Admin Panel
      </h1>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Bookings" key="1">
          <AdminBookingScreen></AdminBookingScreen>
        </TabPane>
        <TabPane tab="Facility Booking" key="2">
          <AdminFacilityBookingScreen></AdminFacilityBookingScreen>
        </TabPane>
        <TabPane tab="Rooms" key="3">
          <AdminRoomScreen></AdminRoomScreen>
        </TabPane>
        <TabPane tab="Facilities" key="4">
          <AdminFacilityScreen></AdminFacilityScreen>
        </TabPane>
        <TabPane tab="Add Room" key="5">
          <AdminAddRoomScreen></AdminAddRoomScreen>
        </TabPane>
        <TabPane tab="Add Facilities" key="6">
          <AdminAddFacilityScreen></AdminAddFacilityScreen>
        </TabPane>
        <TabPane tab="Users" key="7">
          <AdminUserScreen></AdminUserScreen>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default AdminScreen;
