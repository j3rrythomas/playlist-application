import { DeleteOutlined } from "@ant-design/icons";
import { Button, Divider, Table } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Link",
    dataIndex: "url",
    render: (text) => (
      <a target="_blank" href={text} rel="noopener noreferrer">
        {text}
      </a>
    ),
  },
];

const BucketContainer = styled.div`
  @media screen and (max-width: 1280px) {
    grid-column: span 6 / span 6;
    padding: 0px;
  }
  @media screen and (max-width: 640px) {
    grid-column: span 12 / span 12;
  }
  grid-column: span 4 / span 4;

  padding-left: 2rem;
  padding-right: 2rem;
  width: 100%;
`;

const BucketTable = ({ data }) => {
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    setTableData(
      data.cards.map((card) => {
        return { key: card.id, ...card };
      })
    );
  }, [data]);
  return (
    <BucketContainer>
      <h1>{data.name}</h1>
      <Divider />
      <Button
        icon={<DeleteOutlined />}
        style={{ marginBottom: "1rem" }}
      ></Button>
      <Table
        rowSelection={{
          type: "checkbox",
          onChange: (selectedRowKeys, selectedRows) => {
            console.log(
              `selectedRowKeys: ${selectedRowKeys}`,
              "selectedRows: ",
              selectedRows
            );
          },
        }}
        pagination={false}
        columns={columns}
        dataSource={tableData}
      />
    </BucketContainer>
  );
};

export default BucketTable;
