import { List } from "antd";
import React from "react";
import { useSelector } from "react-redux";

const HistoryTab = () => {
  const history = useSelector((state) => state.history.history);
  return (
    <>
      <h1>History</h1>
      <List
        dataSource={history}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <List.Item.Meta
              title={<h3>{item.name}</h3>}
              description={
                <a target="_blank" rel="noopener noreferrer" href={item.url}>
                  {item.url}
                </a>
              }
            />
            <div>
              Watched at <b>{new Date(item.watchedAt).toLocaleString()}</b>
            </div>
          </List.Item>
        )}
      />
    </>
  );
};

export default HistoryTab;
