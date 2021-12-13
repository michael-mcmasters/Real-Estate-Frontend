import React from 'react';
import styled from "styled-components"


const HomeCard = ({img, street, city, state, zip}) => {
  return (
    <div>
      <Container>
        <HomeContainer>
          <Image src={img} />
        </HomeContainer>
        <div>{street}</div>
        <div>{city}, {state} {zip}</div>
      </Container>
    </div>
  );
};

const Container = styled.div`
  margin: 1rem auto;;
  width: 100%;
  background-color: lightgray;
`;

const HomeContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Image = styled.img`
  width: 100%;
  height: 17rem;
`;

export default HomeCard;