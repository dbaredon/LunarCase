import React from 'react';
import styled from 'styled-components';

export const Home = () => {
  return (
    <StyledHome>
      <h1>Welcome to the Lunar Frontend Challenge 🚀</h1>
      <p>
        The README has everything you need - tasks, context, and instructions.
        When you&apos;re ready, jump into the &quot;Transactions&quot; view from
        the sidebar.
      </p>
    </StyledHome>
  );
};

const StyledHome = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  height: 100%;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  color: ${({ theme }) => theme.text};

  h1 {
    font-size: 32px;
    margin-bottom: 8px;
  }

  p {
    font-size: 16px;
    line-height: 1.5;
    margin-bottom: 0;
  }
`;
