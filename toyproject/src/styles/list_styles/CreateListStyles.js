import styled from "styled-components";

export const PageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

export const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

export const StudyCard = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
`;

export const StudyTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 10px;
`;

export const StudyDescription = styled.p`
  color: #666;
  margin-bottom: 15px;
`;

export const Button = styled.button`
  background-color: #ffffff;
  color: #000000;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #f5f5f5;
  }
`;

export const Label = styled.label`
  background-color: #4285f4;
  color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 14px;
`;

export const RightAlignedLabel = styled(Label)`
  float: right;
`;
