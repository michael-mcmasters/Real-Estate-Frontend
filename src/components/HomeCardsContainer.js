import React from 'react';
import HomeCard from './HomeCard';
import img from "../images/house1.jpeg";
import styled from "styled-components"

const HomeCardsContainer = () => {
  return (
    
    <Container>
      
      <HomeCard
        img={img}
        street={"1115 Hillside Rd"}
        city={"Greenville"}
        state={"DE"}
        zip={"19807"}
      />
      
      <HomeCard
        img={img}
        street={"1115 Hillside Rd"}
        city={"Greenville"}
        state={"DE"}
        zip={"19807"}
      />
      
    </Container>
  );
};

const Container = styled.div`
  border: 1px solid red;
`;

export default HomeCardsContainer;