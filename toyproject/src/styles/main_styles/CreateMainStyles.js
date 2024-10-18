import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  max-width: 800px;
  height: 100px;
  margin: 0 auto;
  padding: 20px;
`;

export const PageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

export const MainTitle = styled.h1`
  font-size: 28px;
  text-align: center;
  margin-bottom: 40px;
`;

export const Section = styled.div`
  margin-bottom: 30px;
  cursor: pointer;
  display: flex;
  align-items: flex-start;
`;

export const BlueBar = styled.div`
  width: 4px;
  height: 100%;
  background-color: #4285f4;
  margin-right: 16px;
  flex-shrink: 0;
`;

export const Content = styled.div`
  flex-grow: 1;
`;

export const SectionTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 8px;
`;

export const SectionDescription = styled.p`
  color: #666;
  font-size: 14px;
`;
