import { Tabs } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { BucketsTab, CardsTab, HistoryTab } from "./components";
import { setCurrentTab } from "./reducers/historySlice";

const { TabPane } = Tabs;

const StyledTabs = styled(Tabs)`
  display: flex;
  width: 100vw;
  height: 100vh;
  padding: 2rem 4rem;
  .ant-tabs-tab-btn {
    font-size: 1.5rem;
  }
`;

const App = () => {
  const dispatch = useDispatch();
  const tabKey = useSelector((state) => state.history.tabKey);
  return (
    <StyledTabs
      defaultActiveKey={tabKey}
      onChange={(key) => {
        dispatch(setCurrentTab(key));
      }}
    >
      <TabPane tab="Cards" key="1">
        <CardsTab />
      </TabPane>
      <TabPane tab="Buckets" key="2">
        <BucketsTab />
      </TabPane>
      <TabPane tab="History" key="3">
        <HistoryTab />
      </TabPane>
    </StyledTabs>
  );
};

export default App;
