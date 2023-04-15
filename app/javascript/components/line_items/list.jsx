import React, { useState, useEffect } from 'react';
import { LineItems } from 'requests/resources';
import Paginator, { STARTING_STATE } from 'components/shared/paginator';
import Table from 'components/shared/table';
import moment from 'moment';

const List = () => {
  const [items, setItems] = useState([]);
  const [paginationData, setPaginationData] = useState(STARTING_STATE);
  const [sortData, setSortData] = useState({ sort: 'transaction_date', sortDesc: true });
  const [search, setSearch] = useState('');
  const [expenseCategoryId, setExpenseCategoryId] = useState('');

  useEffect(() => {
    LineItems.paginatedList({ ...sortData, search }, paginationData).then(
      (resp) => {
        setItems(resp.items);
        setPaginationData(resp.pagination_data);
      },
      () => { console.error('TODO') },
    );
  }, [paginationData.page, JSON.stringify(sortData), search])

  const tableColumns = [
    {
      key: 'transaction_date',
      render: (item) => { return item.transaction_date },
      header: 'Date',
      sortable: true,
    },
    {
      key: 'expense_category_id',
      render: (item) => { return item.expense_category_id },
      header: 'Category',
    },
    {
      key: 'amount',
      render: (item) => { return item.amount },
      header: 'Amount',
      sortable: true,
    },
    {
      key: 'memo',
      render: (item) => { return item.memo },
      header: 'Memo',
    },
  ]

  return (
    <>
      <div>
        <input placeholder="Search memo" onChange={e => setSearch(e.target.value)} />
      </div>

      <Table
        columnConfig={tableColumns}
        items={items}
        onSortChange={sortData => setSortData(sortData)}
        sortData={sortData}
      />
      <Paginator
        paginationData={paginationData}
        onChange={page => setPaginationData({ ...paginationData, page })}
      />
    </>
  );
}

export default List;