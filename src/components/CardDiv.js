import React, { useState } from "react";
import { Button, Card, message, Modal } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { deleteCard } from "../api/cards";
import { setCardModalVisible } from "../reducers/dataSlice";
import { useDispatch } from "react-redux";
import { addToHistory } from "../reducers/historySlice";

const StyledCard = styled(Card)`
  @media screen and (max-width: 1280px) {
    grid-column: span 6 / span 6;
  }
  @media screen and (max-width: 640px) {
    grid-column: span 12 / span 12;
  }
  grid-column: span 3 / span 3;
  .ant-card-body {
    cursor: pointer;
  }
`;

const StyledModal = styled(Modal)`
  iframe {
    height: 720px;
    width: 100%;
    margin-top: 5rem;
  }
`;

const CardDiv = ({ data }) => {
  const [iframeVisible, setIframeVisible] = useState(false);
  const dispatch = useDispatch();
  return (
    <>
      <StyledCard
        style={{ width: 300, marginTop: 16 }}
        actions={[
          <EditOutlined
            key="edit"
            onClick={(e) => {
              e.stopPropagation();
              dispatch(setCardModalVisible({ isVisible: true, data }));
            }}
          />,
          <DeleteOutlined
            key="delete"
            onClick={(e) => {
              e.stopPropagation();
              deleteCard(data.id)
                .then(() => message.success("Card deleted successfully", 3))
                .catch(() => message.error("Error occured during deletion", 3));
            }}
          />,
        ]}
        onClick={() => {
          setIframeVisible(true);
          dispatch(
            addToHistory({ watchedAt: new Date().toISOString(), ...data })
          );
        }}
      >
        <h1>{data.name}</h1>
        <h2>Bucket: {data.bucket.name}</h2>
        <a href={data.url} target="_blank" rel="noopener noreferrer">
          Link
        </a>
      </StyledCard>
      <StyledModal
        width="1280px"
        visible={iframeVisible}
        onCancel={() => {
          setIframeVisible(false);
        }}
        footer={[
          <Button
            type="primary"
            key="back"
            onClick={() => {
              setIframeVisible(false);
            }}
          >
            Close
          </Button>,
        ]}
      >
        <iframe
          src={data.url}
          title={data.name}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </StyledModal>
    </>
  );
};

export default CardDiv;
