import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBuckets } from "../api/buckets";
import { setBucketModalVisible } from "../reducers/dataSlice";
import { GridContainer, StyledButton, StyledContainer } from "../styles";
import BucketModal from "./BucketModal";
import BucketTable from "./BucketTable";

const BucketsTab = () => {
  const bucketModalVisible = useSelector(
    (state) => state.data.bucketModalVisible
  );
  const dispatch = useDispatch();
  const [buckets, setBuckets] = useState();
  useEffect(() => {
    getBuckets(true)
      .then((response) => setBuckets(response.data))
      .catch(() => message.error("Error fetching buckets", 3));
  }, [bucketModalVisible]);
  return (
    <StyledContainer>
      <StyledButton
        type="primary"
        onClick={() => {
          dispatch(setBucketModalVisible(true));
        }}
      >
        Create Bucket
      </StyledButton>
      <BucketModal />
      <GridContainer>
        {buckets?.map((bucket) => (
          <BucketTable key={bucket.id} data={bucket} />
        ))}
      </GridContainer>
    </StyledContainer>
  );
};

export default BucketsTab;
