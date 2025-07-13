import styled from "styled-components";
import React from "react";

const Card = styled.div`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  padding: 24px 18px 18px 18px;
  display: flex;
  text-align: center;
  flex-direction: column;
  gap: 8px;
  min-height: 120px;
`;

const CardTitle = styled.div`
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 4px;
`;

const CardInfo = styled.div`
  font-size: 1rem;
  color: #444;
`;

const CardActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: 8px;
  font-size: 20px;
  stroke-width: 9.5;
`;

interface CardProps {
  title: string;
  info: string[];
  children: React.ReactNode;
}

const CardComponent = ({
  title,
  info,
  children,
}: CardProps): React.ReactNode => {
  return (
    <Card>
      <CardTitle>{title}</CardTitle>
      {info.map((item, key: number) => (
        <CardInfo key={key}>{item}</CardInfo>
      ))}
      <CardActions>{children}</CardActions>
    </Card>
  );
};

export default CardComponent;
