import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Input, InputNumber, Button, Select } from "antd";

import Swal from "sweetalert2";

import Loader from "../components/Loader";
import Error from "../components/Error";
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};
function AdminAddRoomScreen() {
  const { Option } = Select;

  const [room, setRoom] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log(values);
    setError("");
    setLoading(true);
    try {
      const data = (await axios.post("/api/rooms/addroom", values)).data;
      Swal.fire("Congratulations", "Your room was added successfully", "success");
      form.resetFields();
    } catch (error) {
      console.log(error);
      setError(error);
      Swal.fire("Oops", "Error:" + error, "error");
    }

    setLoading(false);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <div className="flex justify-start flex-col mt-10">
      {loading ? (
        <Loader></Loader>
      ) : error.length > 0 ? (
        <Error msg={error}></Error>
      ) : (
        <div className="pb-4 pt-6 px-4">
          <Form
            {...layout}
            form={form}
            name="control-hooks"
            onFinish={onFinish}
          >
            <Form.Item
              name="name"
              label="name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="college"
              label="college"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="beds"
              label="beds"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <InputNumber min={1} defaultChecked={1} />
            </Form.Item>
            <Form.Item
              name="priceperday"
              label="priceperday"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <InputNumber min={1} defaultChecked={1} />
            </Form.Item>
            <Form.Item
              name="imageurl1"
              label="imageurl1"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="imageurl2"
              label="imageurl2"
              rules={[
                {
                  //required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="imageurl3"
              label="imageurl3"
              rules={[
                {
                  //required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="gender"
              label="gender"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select placeholder="Select a room type" allowClear>
                <Option value="male">male</Option>
                <Option value="female">female</Option>
              </Select>
            </Form.Item>
            <Form.Item {...tailLayout}>
              <div class="flex flex-row justify-end gap-3">
                <Button type="success" htmlType="submit">
                  Add
                </Button>
                <Button type="danger" htmlType="button" onClick={onReset}>
                  Reset
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      )}
    </div>
  );
}

export default AdminAddRoomScreen;
