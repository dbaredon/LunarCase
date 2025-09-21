import styled from 'styled-components';

export const Button = styled.button`
  padding-inline: 12px;
  padding-block: 6px;
  background: ${({ theme }) => theme.button.primary.default};
  color: ${({ theme }) => theme.textInvert};
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
