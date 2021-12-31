import React from 'react';
import styled from "styled-components";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const LoadingFormPopup = () => {
  return (
    <>
      <TitleContainer>
        <Title>Authenticating...</Title>
      </TitleContainer>
      <LoaderContainer>
        <Loader type="TailSpin" color="#00BFFF" height={80} width={80} />
      </LoaderContainer>
    </>
  );
};

const TitleContainer = styled.div`
  margin: 0 auto;
  padding: 0;
  border-bottom: 1px solid ${props => props.theme.gray};
  text-align: center;
`;

const Title = styled.h3`
  margin: 1rem auto;
  width: fit-content;
`;

const LoaderContainer = styled.div`
  width: fit-content;
  margin: 0 auto;
  display: flex;
  align-items: center;
  height: 12rem;
`;

export default LoadingFormPopup;