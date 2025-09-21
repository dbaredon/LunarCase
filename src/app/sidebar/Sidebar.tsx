import React from 'react';
import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { LunarLogo } from '../../framework/components/LunarLogo';
import { Navigation } from './Navigation';

export const Sidebar = () => {
  return (
    <StyledSidebar aria-label="App sidebar">
      <StyledLunarLogo to="/" tabIndex={-1} aria-label="Home">
        <LunarLogo />
      </StyledLunarLogo>
      <StyledDivider aria-hidden="true" />
      <Navigation />
    </StyledSidebar>
  );
};

const StyledSidebar = styled.aside(
  ({ theme }) => css`
    position: sticky;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding-inline: 16px;
    padding-block-end: 16px;
    padding-block-start: 40px;
    min-width: 240px;
    inset-block-start: 0;
    background: ${theme.surface};
    height: 100dvh;
    border-inline-end: 1px solid ${theme.surfaceStroke};
    overflow-y: auto;
  `
);

const StyledLunarLogo = styled(NavLink)(
  ({ theme }) => css`
    color: ${theme.text};
    padding-inline: 8px;
    width: fit-content;

    svg {
      height: 24px;
    }
  `
);

const StyledDivider = styled.div(
  ({ theme }) => css`
    height: 1px;
    background-color: ${theme.surfaceStroke};
  `
);
