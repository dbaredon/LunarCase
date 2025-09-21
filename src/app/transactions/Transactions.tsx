import * as React from 'react';
import styled from 'styled-components';
import { useTransactionsQuery } from './get_transactions';
import { useDeleteAuthorizationMutation } from './delete_authorization';

type TransactionsProps = {
    userId: string;
};

type SortOrder = 'newest' | 'oldest';

export const Transactions = ({ userId }: TransactionsProps) => {
    const { data, loading, error } = useTransactionsQuery({
        variables: { userId },
    });

    // TODO: Task #1 – delete authorization mutation
    const [deleteAuthorization, { loading: deleting }] =
        useDeleteAuthorizationMutation();

    const handleDelete = async (transactionId: string) => {
        await deleteAuthorization({
            variables: { transactionId },
            refetchQueries: ['GetTransactions'],
        });
    };

    // TODO: Task #2 – sortér client-side (nyeste/ældste) + filtrér slettede væk
    const [sortOrder, setSortOrder] = React.useState<SortOrder>('newest');
    

    const items = React.useMemo(() => {
        const txs = [...(data?.transactions ?? [])].filter(tx => !tx.deleted);
        txs.sort((a, b) => {
            const da = new Date(a.time).getTime();
            const db = new Date(b.time).getTime();
            return sortOrder === 'newest' ? db - da : da - db;
        });
        return txs;
    }, [data, sortOrder]);

    if (loading && !data) return <div>Loading...</div>;
    if (error) return <div>An error occurred 😭</div>;

    return (
        <StyledCard>
            <StyledTable>
                <StyledTableHeader>
                    <tr>
                        <th>Icon</th>
                        <th>Type</th>
                        <th>Title</th>
                        <th>Amount</th>
                        {/* TODO: Task #2 – clicking this header should toggle date sorting */}
                        <th
                            style={{ cursor: 'pointer', userSelect: 'none' }}
                            onClick={() =>
                                setSortOrder(prev => (prev === 'newest' ? 'oldest' : 'newest'))
                            }
                            title="Toggle date sort"
                        >
                            Time {sortOrder === 'newest' ? '- Newest ↓' : '- Oldest ↑'}
                        </th>
                        <th>Status</th>
                        <th>Category</th>
                        <th>Delete</th>
                    </tr>
                </StyledTableHeader>
                <tbody>
                {items.map(transaction => (
                    <StyledTransaction key={transaction.id}>
                        <td>
                            <img src={transaction.iconURL} alt="" />
                        </td>
                        <td>{transaction.type}</td>
                        <td>{transaction.localizableTitle}</td>
                        <td>
                            {transaction.billingAmount.amount}
                            {transaction.billingAmount.currency}
                        </td>
                        <td>{new Date(transaction.time).toLocaleString()}</td>
                        <td>{transaction.status}</td>
                        <td>
                            <img src={transaction.categoryIconUrl} alt="" />
                        </td>

                        <td>
                            {transaction.status === 'authorization' && (
                                <DeleteButton
                                    onClick={() => handleDelete(transaction.id)}
                                    disabled={deleting}
                                >
                                    {deleting ? 'Wait…' : 'Delete'}
                                </DeleteButton>
                            )}
                        </td>
                    </StyledTransaction>
                ))}
                </tbody>
            </StyledTable>
        </StyledCard>
    );
};



const StyledTable = styled.table`
    width: 100%;
    position: relative;

    td,
    th {
        padding: 8px;
        text-align: left;
    }
`;

const StyledTableHeader = styled.thead`
    color: ${({ theme }) => theme.secondaryText};

    th {
        text-align: left;
    }
`;

const StyledTransaction = styled.tr`
    img {
        height: 30px;
    }
`;

const StyledCard = styled.div`
    background-color: ${({ theme }) => theme.surface};
    padding: 16px;
    flex: 1 0 auto;
    border: 1px solid ${({ theme }) => theme.surfaceStroke};
    border-radius: 16px;
`;

const DeleteButton = styled.button`
    padding: 6px 12px;
    border-radius: 8px;
    border: none;
    background-color: #fff;
    color: #d32f2f;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s, transform 0.1s;

    &:hover {
        background-color: #ffebee;
        transform: translateY(-1px);
    }

    &:active {
        transform: translateY(0);
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`;
