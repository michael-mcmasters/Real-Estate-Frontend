import React from 'react';
import HomeCard from './HomeCard';
import house1 from "../images/house1.jpeg";
import house2 from "../images/house2.jpeg";
import house3 from "../images/house3.jpeg";
import styled from "styled-components"

const HomeCardsContainer = () => {
  return (
    
    <Container>
      
      <HomeCard
        img={house1}
        price={"1,100,000"}
        street={"1115 Hillside Rd"}
        city={"Greenville"}
        state={"DE"}
        zip={"19807"}
        neighborhood={"Pleasant Valley"}
      />
      
      <HomeCard
        img={house2}
        price={"1,100,000"}
        street={"1115 Hillside Rd"}
        city={"Greenville"}
        state={"DE"}
        zip={"19807"}
        neighborhood={"Pleasant Valley"}
      />
      
      <HomeCard
        img={house3}
        price={"1,100,000"}
        street={"1115 Hillside Rd"}
        city={"Greenville"}
        state={"DE"}
        zip={"19807"}
        neighborhood={"Pleasant Valley"}
      />
      
    </Container>
  );
};

const Container = styled.div`

`;

export default HomeCardsContainer;