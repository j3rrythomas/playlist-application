import { Form, Input, message, Modal } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBucket } from "../api/buckets";
import { setBucketModalVisible } from "../reducers/dataSlice";

const BucketModal = () => {
  const { bucketModalVisible } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  return (
    <Modal
      visible={bucketModalVisible}
      title="Create a new bucket"
      okText="Create"
      cancelText="Cancel"
      onCancel={() => {
        form.resetFields();
        dispatch(setBucketModalVisible(false));
      }}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            createBucket(values)
              .then(() => message.success("Bucket created successfully", 3))
              .catch(() => message.error("Bucket creation error", 3));
            dispatch(setBucketModalVisible(false));
            form.resetFields();
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
        initialValues={{ modifier: "public" }}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: "Please input the name of the bucket!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default BucketModal;
