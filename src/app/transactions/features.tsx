import styled from 'styled-components';

// Dropdown Menu

export const Dropdown = styled.div`
  position: absolute;
  right: 0;
  top: 36px;
  min-width: 160px;
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.surfaceStroke};
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.shadow?.medium || '0 4px 20px rgba(0,0,0,.08)'};
  padding: 6px;
  display: grid;
  gap: 4px;
  z-index: 20;
`;

export const MenuItem = styled.button`
  display: grid;
  grid-template-columns: 20px 1fr;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 8px 10px;
  border: none;
  border-radius: 8px;
  text-align: left;
  background: transparent;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  transition: background .15s ease;

  &:hover { background: ${({ theme }) => theme.fade1}; }
  &[data-active='true'] { outline: 2px solid ${({ theme }) => theme.primary}; outline-offset: 0; }
`;

// Buttons

const IconButtonBase = styled.button`
  inline-size: 32px;
  block-size: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.surfaceStroke};
  background: ${({ theme }) => theme.surface};
  padding: 0;
  cursor: pointer;
  transition: background .15s ease, border-color .15s ease, transform .1s ease, opacity .15s ease;

  &:hover { background: ${({ theme }) => theme.fade1}; }
  &:active { transform: translateY(1px) scale(.98); }
  &:disabled { opacity: .55; cursor: not-allowed; }
`;

export const IconButton = styled(IconButtonBase)`
  inline-size: 36px;
`;

export const IconDeleteButton = styled(IconButtonBase)`
  color: #d32f2f;
  &:hover { background: rgba(211,47,47,.08); border-color: rgba(211,47,47,.25); }
`;

// Logo Styling
export const SettingsGlyph = styled.span`
  width: 16px; height: 16px; display: inline-block;
  mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19.14 12.94a7.4 7.4 0 0 0 0-1.88l2-1.55a.5.5 0 0 0 .12-.66l-1.9-3.29a.5.5 0 0 0-.6-.22l-2.35 1c-.5-.4-1.05-.72-1.62-.94l-.36-2.5A.5.5 0 0 0 13 2h-2a.5.5 0 0 0-.49.41l-.36 2.5c-.57.22-1.12.54-1.62.94l-2.35-1a.5.5 0 0 0-.6.22L3.68 6.35a.5.5 0 0 0 .12.66l2 1.55a7.4 7.4 0 0 0 0 1.88l-2 1.55a.5.5 0 0 0-.12.66l1.9 3.29a.5.5 0 0 0 .6.22l2.35-1c.5.4 1.05.72 1.62.94l.36 2.5A.5.5 0 0 0 11 22h2a.5.5 0 0 0 .49-.41l.36-2.5c.57-.22 1.12-.54 1.62-.94l2.35 1a.5.5 0 0 0 .6-.22l1.9-3.29a.5.5 0 0 0-.12-.66ZM12 15a3 3 0 1 1 3-3 3 3 0 0 1-3 3Z"/></svg>') center / contain no-repeat;
  background: ${({ theme }) => theme.secondaryText};
`;

// Light Theme
export const SunGlyph = styled.span`
  width: 18px; height: 18px; display: inline-block;
  mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6.76 4.84 4.96 3.05 3.17 4.84l1.79 1.79 1.8-1.79zM1 13h3v-2H1v2zm10-9h2V1h-2v3zm7.03 2.03 1.79-1.79-1.79-1.79-1.79 1.79 1.79 1.79zM20 11v2h3v-2h-3zm-9 9h2v-3h-2v3zm-7.03-2.03 1.79 1.79 1.79-1.79-1.79-1.79-1.79 1.79zM12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12z"/></svg>') center / contain no-repeat;
  background: ${({ theme }) => theme.text};
`;

// Dark Theme
export const MoonGlyph = styled.span`
  width: 18px; height: 18px; display: inline-block;
  mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12.74 2.01A9 9 0 1 0 22 12a7 7 0 0 1-9.26-9.99z"/></svg>') center / contain no-repeat;
  background: ${({ theme }) => theme.text};
`;

export const TrashGlyph = styled.span`
  width: 16px; height: 16px; display: inline-block;
  mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9 3h6a1 1 0 0 1 1 1v1h4v2h-1v12a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V7H4V5h4V4a1 1 0 0 1 1-1Zm7 4H8v12a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V7ZM10 9h2v8h-2V9Zm4 0h2v8h-2V9Z"/></svg>') center / contain no-repeat;
  background: currentColor;
`;
