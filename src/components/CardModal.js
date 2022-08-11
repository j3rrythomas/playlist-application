import { Form, Input, message, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBuckets } from "../api/buckets";
import { createCard, editCard } from "../api/cards";
import { setCardModalVisible } from "../reducers/dataSlice";

const CardModal = () => {
  const { cardModalVisible, cardModalData, bucketModalVisible } = useSelector(
    (state) => state.data
  );
  const dispatch = useDispatch();
  const [buckets, setBuckets] = useState([]);
  useEffect(() => {
    getBuckets(false)
      .then((response) => setBuckets(response.data))
      .catch((err) => console.error(err));
  }, [bucketModalVisible]);
  const [form] = Form.useForm();
  const action = cardModalData === undefined ? "Create" : "Edit";
  return (
    <Modal
      visible={cardModalVisible}
      title={`${action} card`}
      okText={action}
      cancelText="Cancel"
      onCancel={() => {
        form.resetFields();
        dispatch(setCardModalVisible({ isVisible: false, data: {} }));
      }}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            console.log(values);
            if (action === "Create") {
              createCard(values)
                .then((res) => {
                  console.log(res);
                  message.success("Card created successfully", 3);
                  form.resetFields();
                })
                .catch((err) => {
                  console.error(err);
                  message.error("Error occurred during card creation.", 3);
                });
            } else {
              editCard(cardModalData.id, values)
                .then((res) => {
                  console.log(res);
                  message.success("Card edited successfully", 3);
                  form.resetFields();
                })
                .catch((err) => {
                  console.error(err);
                  message.error("Error occurred during card edit.", 3);
                });
            }

            dispatch(setCardModalVisible({ isVisible: false, data: {} }));
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="card_form_modal"
        initialValues={{ modifier: "public", ...cardModalData }}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: "Please input the name of the card!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="url"
          label="Video/Audio Link"
          rules={[
            {
              required: true,
              message: "Please enter the url of the video/audio!",
            },
            {
              type: "url",
              message: "Please enter a valid url!",
            },
          ]}
        >
          <Input type="url" />
        </Form.Item>
        <Form.Item
          name="bucketId"
          label="Bucket"
          rules={[
            {
              required: true,
              message: "Please select a card!",
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Select a bucket"
            optionFilterProp="label"
            filterOption={(input, option) =>
              (option?.children).toLowerCase().includes(input.toLowerCase())
            }
          >
            {buckets.map((bucket) => (
              <Select.Option key={bucket.id} value={bucket.id}>
                {bucket.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CardModal;
