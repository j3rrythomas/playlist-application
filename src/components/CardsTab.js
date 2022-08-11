import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCards } from "../api/cards";
import { GridContainer, StyledButton, StyledContainer } from "../styles";
import CardDiv from "./CardDiv";
import CardModal from "./CardModal";
import { setCardModalVisible } from "../reducers/dataSlice";

const CardsTab = () => {
  const dispatch = useDispatch();
  const { cardModalVisible } = useSelector((state) => state.data);
  const [cards, setCards] = useState([]);
  useEffect(() => {
    getCards(true)
      .then((response) => setCards(response.data))
      .catch((err) => {
        message.error("Error fetching cards");
      });
  }, [cardModalVisible]);

  return (
    <StyledContainer>
      <StyledButton
        type="primary"
        onClick={() => {
          dispatch(setCardModalVisible({ isVisible: true }));
        }}
      >
        Create Card
      </StyledButton>
      <CardModal />
      <GridContainer>
        {cards.map((card) => (
          <CardDiv key={card.id} data={card} />
        ))}
      </GridContainer>
    </StyledContainer>
  );
};

export default CardsTab;
