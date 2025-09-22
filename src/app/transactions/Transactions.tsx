import * as React from 'react';
import styled from 'styled-components';
import { useTransactionsQuery } from './get_transactions';
import { useDeleteAuthorizationMutation } from './delete_authorization';
import TransactionDrawer from './TransactionDrawer';
import {
    Dropdown,
    MenuItem,
    IconButton,
    IconDeleteButton,
    SettingsGlyph,
    SunGlyph,
    MoonGlyph,
    TrashGlyph,
} from './features';

type TransactionsProps = {
    userId: string;
    onToggleTheme?: () => void;
    isDark?: boolean;
    setThemeMode?: (dark: boolean) => void;
};

type SortOrder = 'newest' | 'oldest';

const formatAmount = (amount: number, currency: string) =>
    new Intl.NumberFormat('da-DK', { style: 'currency', currency }).format(amount);

const formatDateTime = (iso: string) =>
    new Intl.DateTimeFormat('da-DK', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(new Date(iso));

// Making Month
const monthKeyAndLabel = (d: Date) => {
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    const label = new Intl.DateTimeFormat('da-DK', { month: 'long', year: 'numeric' }).format(d);
    return { key, label };
};

const isDeleted = (v: unknown) =>
    v === true || v === 'true' || v === '1' || (typeof v === 'string' && v.length > 0);

const Transactions: React.FC<TransactionsProps> = ({
                                                       userId,
                                                       onToggleTheme,
                                                       isDark = false,
                                                       setThemeMode,
                                                   }) => {
    const { data, loading, error} = useTransactionsQuery({ variables: { userId } });
    const [deleteAuthorization, { loading: deleting }] = useDeleteAuthorizationMutation();

    const [sortOrder, setSortOrder] = React.useState<SortOrder>('newest');
    const [selectedTx, setSelectedTx] = React.useState<any | null>(null);

    const [menuOpen, setMenuOpen] = React.useState(false);
    const menuRef = React.useRef<HTMLDivElement | null>(null);
    React.useEffect(() => {
        if (!menuOpen) return;
        const onDocClick = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
        };
        document.addEventListener('mousedown', onDocClick);
        return () => document.removeEventListener('mousedown', onDocClick);
    }, [menuOpen]);

    const handleDelete = async (transactionId: string) => {
        const ok = window.confirm('Er du sikker på, at du vil slette denne transaktion?');
        if (!ok) return;
        try {
            await deleteAuthorization({
                variables: { transactionId },
                refetchQueries: ['GetTransactions'],
            });
        } catch {console.error('deleteAuthorization failed');}
    };

    const items = React.useMemo(() => {
        const txs = [...(data?.transactions ?? [])]
            .filter((tx) => !isDeleted((tx as any).deleted));
        txs.sort((a, b) => {
            const da = new Date(a.time).getTime();
            const db = new Date(b.time).getTime();
            return sortOrder === 'newest' ? db - da : da - db;
        });
        return txs;
    }, [data, sortOrder]);

    const monthSections = React.useMemo(() => {
        const sections: Array<{ key: string; label: string; rows: typeof items }> = [];
        let currentKey = '';
        let current: { key: string; label: string; rows: typeof items } | null = null;

        for (const tx of items) {
            const d = new Date(tx.time);
            const { key, label } = monthKeyAndLabel(d);
            if (key !== currentKey) {
                currentKey = key;
                current = { key, label, rows: [] };
                sections.push(current);
            }
            current!.rows.push(tx);
        }
        return sections;
    }, [items]);

    const chooseTheme = (dark: boolean) => {
        if (setThemeMode) setThemeMode(dark);
        else if (onToggleTheme && isDark !== dark) onToggleTheme();
        setMenuOpen(false);
    };

    if (loading && !data) {
        return (
            <PageWrapper>
                <PageHeader>
                    <PageTitle>Transactions</PageTitle>
                </PageHeader>

                <Card>
                    <StateBox role="status" aria-live="polite">
                        <Spinner aria-hidden="true" />
                        <span>Transactions Loading...</span>
                    </StateBox>
                </Card>
            </PageWrapper>
        );
    }

    if (error) {
        return (
            <PageWrapper>
                <PageHeader>
                    <PageTitle>Transactions</PageTitle>
                </PageHeader>
            </PageWrapper>
        );
    }

    if (!monthSections.length) {
        return (
            <PageWrapper>
                <PageHeader>
                    <PageTitle>Transactions</PageTitle>
                </PageHeader>
            </PageWrapper>
        );
    }

    return (
        <PageWrapper>
            <PageHeader>
                <div>
                    <PageTitle>Transactions</PageTitle>
                </div>

                <HeaderActions ref={menuRef}>
                    <IconButton
                        type="button"
                        aria-label="Open settings"
                        title="Settings"
                        onClick={() => setMenuOpen((o) => !o)}
                    >
                        <SettingsGlyph />
                    </IconButton>

                    {menuOpen && (
                        <Dropdown role="menu">
                            <MenuItem
                                type="button"
                                onClick={() => chooseTheme(false)}
                                aria-label="Light mode"
                                data-active={!isDark}
                            >
                                <SunGlyph />
                                <span>Light</span>
                            </MenuItem>
                            <MenuItem
                                type="button"
                                onClick={() => chooseTheme(true)}
                                aria-label="Dark mode"
                                data-active={isDark}
                            >
                                <MoonGlyph />
                                <span>Dark</span>
                            </MenuItem>
                        </Dropdown>
                    )}
                </HeaderActions>
            </PageHeader>

            <Card>
                <Table>
                    <TableHead>
                        <tr>
                            <th>Icon</th>
                            <th>Type</th>
                            <th>Title</th>
                            <th>Amount</th>
                            <th
                                style={{ cursor: 'pointer', userSelect: 'none' }}
                                onClick={() => setSortOrder((prev) => (prev === 'newest' ? 'oldest' : 'newest'))}
                                title="Toggle date sort"
                                aria-sort={sortOrder === 'newest' ? 'descending' : 'ascending'}
                            >
                                Time {sortOrder === 'newest' ? '- Newest ↓' : '- Oldest ↑'}
                            </th>
                            <th>Status</th>
                            <th>Category</th>
                            <th>Delete</th>
                        </tr>
                    </TableHead>

                    <tbody>
                    {monthSections.map((section) => (
                        <React.Fragment key={section.key}>
                            <MonthRow>
                                <td colSpan={8}>{section.label}</td>
                            </MonthRow>

                            {section.rows.map((transaction) => (
                                <Row
                                    key={transaction.id}
                                    onClick={() => setSelectedTx(transaction)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <td>
                                        <RoundImage src={transaction.iconURL} alt="" />
                                    </td>
                                    <td>{transaction.type}</td>
                                    <td>{transaction.localizableTitle}</td>
                                    <td>
                                        {formatAmount(
                                            transaction.billingAmount.amount,
                                            transaction.billingAmount.currency
                                        )}
                                    </td>
                                    <td>{formatDateTime(transaction.time)}</td>
                                    <td>{transaction.status}</td>
                                    <td>
                                        <RoundImage src={transaction.categoryIconUrl} alt="" />
                                    </td>
                                    <td>
                                        {transaction.status === 'authorization' && (
                                            <IconDeleteButton
                                                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                                    e.stopPropagation();
                                                    handleDelete(transaction.id);
                                                }}
                                                disabled={deleting}
                                                aria-busy={deleting || undefined}
                                                aria-label="Slet autorisation"
                                                title="Slet autorisation"
                                            >
                                                <TrashGlyph aria-hidden="true" />
                                            </IconDeleteButton>
                                        )}
                                    </td>
                                </Row>
                            ))}
                        </React.Fragment>
                    ))}
                    </tbody>
                </Table>
            </Card>

            {selectedTx && (
                <TransactionDrawer tx={selectedTx} onClose={() => setSelectedTx(null)} />
            )}
        </PageWrapper>
    );
};

export default Transactions;

// Styling to transactions page
const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const PageHeader = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 6px 4px 0;
    gap: 8px;
`;

const PageTitle = styled.h2`
    margin: 0;
    font-size: 20px;
    line-height: 1.2;
    font-weight: 800;
    color: ${({ theme }) => theme.text};
`;

const HeaderActions = styled.div`
    position: relative;
    display: flex;
    align-items: center;
`;

const Card = styled.div`
    background-color: ${({ theme }) => theme.surface};
    color: ${({ theme }) => theme.text};
    padding: 16px;
    border: 1px solid ${({ theme }) => theme.surfaceStroke};
    border-radius: 16px;
    box-shadow: ${({ theme }) => theme.shadow?.medium || 'none'};
`;

const Table = styled.table`
    width: 100%;
    position: relative;
    border-collapse: collapse;
    color: ${({ theme }) => theme.text};

    td, th {
        padding: 8px;
        text-align: left;
        vertical-align: middle;
        border-bottom: 1px solid ${({ theme }) => theme.surfaceStroke};
    }
    tbody tr:last-child td { border-bottom: none; }
`;

const TableHead = styled.thead`
    color: ${({ theme }) => theme.secondaryText};
    th {
        text-align: left;
        font-weight: 600;
        border-bottom: 1px solid ${({ theme }) => theme.surfaceStroke};
    }
`;

const MonthRow = styled.tr`
    td {
        padding: 12px 8px;
        font-weight: 700;
        text-transform: capitalize;
        color: ${({ theme }) => theme.secondaryText};
        background: ${({ theme }) => theme.surface};
        border-top: 1px solid ${({ theme }) => theme.surfaceStroke};
        border-bottom: 1px solid ${({ theme }) => theme.surfaceStroke};
    }
`;

const Row = styled.tr`
    &:hover { background: ${({ theme }) => theme.fade1}; }
`;

const RoundImage = styled.img`
    height: 30px;
    width: 30px;
    border-radius: 50%;
    object-fit: cover;
`;


// State of loading data or error

const StateBox = styled.div`
    display: grid;
    grid-template-columns: 20px 1fr;
    gap: 10px;
    align-items: center;
    padding: 12px;
    border: 1px solid ${({ theme }) => theme.surfaceStroke};
    border-radius: 12px;
`;

const Spinner = styled.div`
    width: 16px;
    height: 16px;
    border: 2px solid #c8c8c8;
    border-top-color: ${({ theme }) => theme.text};
    border-radius: 50%;
    animation: spin 0.9s linear infinite;
    @keyframes spin { to { transform: rotate(360deg); } }
`;
