import styled from "styled-components";

export const Container = styled.div`
  min-width: 700px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const InfoBox = styled.div`
  background-color: #7b68ee;
  color: white;
  padding: 20px 10%;
  border-radius: 8px 8px 0 0;
  display: flex;
  justify-content: space-around;
`;

export const LeftBox = styled.div`
  background-color: #7b68ee;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const RightBox = styled.div`
  background-color: #7b68ee;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const DetailBox = styled.div`
  background-color: #e6e6fa;
  color: black;
  padding: 20px 10%;
  border-radius: 0 0 8px 8px;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 32px;
`;

export const Time = styled.span`
  font-size: 30px;
`;

export const DetailItem = styled.h2`
  margin: 10px 0;
`;
