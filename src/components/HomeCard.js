import React from 'react';
import styled from "styled-components"

const HomeCard = ({img, price, street, city, state, zip, neighborhood}) => {
  return (
    <div>
      <Container>
        <ImageContainer>
          <Image src={img} />
          <Price>${price}</Price>
          <Available>Available</Available>
          <HeartIcon>Heart</HeartIcon>
        </ImageContainer>
        
        <ContentContainer>
          <AddressContainer>
            <AddressMain>{street}</AddressMain>
            <AddressSecondary>{city}, {state} {zip}</AddressSecondary>
          </AddressContainer>
          
          <NeighborhoodContainer>
            <NeighborhoodName>
              {neighborhood}
            </NeighborhoodName>
            
            <BedroomsBathroomSqftContainer>
              <div>
                <div>3</div>  
                <div>Beds</div>
              </div>
              <div>
                <div>2</div>
                <div>Baths</div>
              </div>
              <div>
                <div>1,714</div>
                <div>Sqft</div>
              </div>
            </BedroomsBathroomSqftContainer>
          </NeighborhoodContainer>
        </ContentContainer>
        
      </Container>
    </div>
  );
};

const Container = styled.div`
  margin: 1rem auto;;
  width: 100%;
  background-color: lightgray;
`;

const ImageContainer = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 17rem;
`;

const Available = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  
  padding: 0.5rem;
  background-color: gray;
  color: white;
  font-weight: 900;
  font-size: 0.8rem;
`;

const HeartIcon = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
`;

const Price = styled.div`
  position: absolute;
  bottom: 12px;
  left: 12px;
  
  width: fit-content;
  font-weight: 700;
  font-size: 1.5rem;
  color: white;
`;

const ContentContainer = styled.div`
  padding: 0 1rem;
`;

const AddressContainer = styled.div`
  padding: 1rem 0;
  border-bottom: 1px solid black;
`;

const AddressMain = styled.div`
  font-weight: bold;
`;

const AddressSecondary = styled.div`
  
`;

const NeighborhoodContainer = styled.div`
  padding: 1rem 0 0.5rem 0;
`;

const NeighborhoodName = styled.div`
  font-weight: bold;
`;

const BedroomsBathroomSqftContainer = styled.div`
  margin: 0.7rem 0.5rem;
  display: flex;
  justify-content: space-between;
`;

export default HomeCard;