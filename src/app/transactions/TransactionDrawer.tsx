import * as React from 'react';
import styled from 'styled-components';
import { createPortal } from 'react-dom';

// Modal for specific transaction 

type DrawerProps = { tx: any; onClose: () => void };

const TransactionDrawer: React.FC<DrawerProps> = ({ tx, onClose }) => {
  const panelRef = React.useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  React.useEffect(() => {
    setMounted(true);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  React.useEffect(() => {
    panelRef.current?.querySelector<HTMLElement>('[data-autofocus]')?.focus();
  }, []);

  const onOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!mounted) return null;

  const title = tx.localizableTitle ?? tx.title ?? 'Transaction';
  const dateLabel = new Intl.DateTimeFormat('da-DK', {
    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  }).format(new Date(tx.time));

  const amountLabel = new Intl.NumberFormat('da-DK', {
    style: 'currency', currency: tx.billingAmount?.currency ?? 'DKK',
  }).format(tx.billingAmount?.amount ?? 0);

  return createPortal(
    <DrawerFontWrapper>
      <Overlay onClick={onOverlayClick} role="presentation">
        <Panel
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="drawer-title"
          aria-describedby="drawer-desc"
        >
          <Header>
            <div>
              <Title id="drawer-title">{title}</Title>
              <Meta id="drawer-desc">{dateLabel}</Meta>
            </div>
            {tx.iconURL && <Logo src={tx.iconURL} alt="" />}
          </Header>

          <Body>
            <Section>
              <SectionTitle>Oversigt</SectionTitle>
              <KV>
                <dt>Beløb</dt><dd>{amountLabel}</dd>
                <dt>Status</dt><dd>{tx.status}</dd>
                <dt>Type</dt><dd>{tx.type}</dd>
              </KV>
            </Section>

            <Section>
              <SectionTitle>Kategori</SectionTitle>
              <Row>
                {tx.categoryIconUrl && <CategoryIcon src={tx.categoryIconUrl} alt="" />}
                <Badge>{tx.category?.name ?? 'Ukendt'}</Badge>
              </Row>
            </Section>

            <Section>
              <SectionTitle>Teknisk</SectionTitle>
              <KV>
                <dt>ID</dt><dd><Mono>{tx.id}</Mono></dd>
                {tx.authorizationId && (
                  <>
                    <dt>Authorization</dt><dd><Mono>{tx.authorizationId}</Mono></dd>
                  </>
                )}
              </KV>
            </Section>
          </Body>

          <Footer>
            <OutlinedButton data-autofocus onClick={onClose}>Luk</OutlinedButton>
          </Footer>
        </Panel>
      </Overlay>
    </DrawerFontWrapper>,
    document.body
  );
};

export default TransactionDrawer;

/* ===== Styling (drawer) ===== */

const DrawerFontWrapper = styled.div`
  font-family: sans-serif;
  font-size: 14px;
  line-height: 1.45;
  color: ${({ theme }) => theme.text};
  * { font-family: inherit; color: inherit; }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  height: 100dvh;
  min-height: 100vh;
  background: rgba(0,0,0,.45);
  backdrop-filter: blur(2px);
  display: flex;
  justify-content: flex-end;
  align-items: stretch;
  z-index: 10000;
  animation: overlayIn .18s ease-out both;
  @keyframes overlayIn { from { opacity: 0 } to { opacity: 1 } }
`;

const Panel = styled.aside`
  width: min(600px, 100%);
  height: 100%;
  max-height: none !important;
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  border-left: 1px solid ${({ theme }) => theme.surfaceStroke};
  border-top-left-radius: 16px;
  border-bottom-left-radius: 16px;
  box-shadow: ${({ theme }) => theme.shadow?.large || '0 20px 60px rgba(0,0,0,.22)'};
  display: flex;
  flex-direction: column;
  animation: panelIn .22s cubic-bezier(.2,.6,.2,1) both;
  @keyframes panelIn { from { transform: translateX(16px); opacity: .9; } to { transform: translateX(0); opacity: 1; } }
`;

const Header = styled.header`
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 12px;
`;

const Body = styled.div`
  flex: 1 1 auto;
  overflow: auto;
  padding: 0 20px 20px 20px;
  padding-bottom: max(20px, env(safe-area-inset-bottom));
`;

const Footer = styled.footer`
  border-top: 1px dashed ${({ theme }) => theme.surfaceStroke};
  padding: 12px 20px;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding-bottom: max(12px, env(safe-area-inset-bottom));
`;

const Title = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: .1px;
`;

const Meta = styled.div`
  margin-top: 2px;
  font-size: 13px;
  color: ${({ theme }) => theme.secondaryText};
`;

const Logo = styled.img`
  width: 42px; height: 42px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid ${({ theme }) => theme.surfaceStroke};
`;

const Section = styled.section`
  padding: 14px 0 2px;
  border-top: 1px dashed ${({ theme }) => theme.surfaceStroke};
`;

const SectionTitle = styled.h4`
  margin: 10px 0 8px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: .08em;
  color: ${({ theme }) => theme.secondaryText};
`;

const KV = styled.dl`
  margin: 0;
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: 8px 12px;
  dt { color: ${({ theme }) => theme.secondaryText}; font-size: 13px; }
  dd { margin: 0; font-size: 14px; font-weight: 600; }
`;

const Row = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

const CategoryIcon = styled.img`
  width: 22px; height: 22px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid ${({ theme }) => theme.surfaceStroke};
`;

const Badge = styled.span`
  display: inline-block;
  font-size: 12px;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.surfaceStroke};
  background: ${({ theme }) => theme.fade1};
`;

const Mono = styled.code`
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 12px;
  background: ${({ theme }) => theme.fade1};
  padding: 2px 6px;
  border-radius: 6px;
`;

const OutlinedButton = styled.button`
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.surfaceStroke};
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  transition: background .15s ease, transform .1s ease;
  &:hover { background: ${({ theme }) => theme.fade1}; }
  &:active { transform: translateY(1px) scale(.99); }
  &:disabled { opacity: .55; cursor: not-allowed; }
`;
