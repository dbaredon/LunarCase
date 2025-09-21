import React from 'react';
import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Navigation = () => {
  return (
    <StyledNav aria-label="Primary navigation">
      <StyledNavLink to="/" end>
        🏠 Home
      </StyledNavLink>
      <StyledNavLink to="/transactions">💸 Transactions</StyledNavLink>
    </StyledNav>
  );
};

const StyledNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledNavLink = styled(NavLink)(
  ({ theme }) => css`
    padding: 12px;
    border-radius: 12px;
    text-decoration: none;
    cursor: pointer;
    color: ${theme.text};
    transition:
      background-color 150ms linear,
      transform 150ms cubic-bezier(0.65, 0.05, 0.36, 1);

    &[aria-current='page'] {
      background-color: ${theme.fade1};
    }

    &:focus-visible {
      outline: 2px solid ${theme.fade10};
    }

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background-color: ${theme.fade1};
        transform: translateY(-1px);
      }
    }
  `
);
