import React, {useEffect, useState} from 'react';
import axios from 'axios';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import {hot} from "react-hot-loader";

const ServerPaginatedTable = props => {

  const [tablePages, setTablePages] = useState(1);
  const [tableLoading, setTableLoading] = useState(false);
  const [tableData, setTableData] = useState([]);

  const { url } = props;
  return (
    <ReactTable
      pageSizeOptions={[5, 10, 25, 50, 100]}
      defaultPageSize={25}
      minRows={5}
      pages={tablePages}
      sortable={false}
      loading={tableLoading}
      data={tableData}
      manual
      onFetchData={(state, instance) => {
        setTableLoading(true);
        axios.get(`${url}?index=${state.page}&pageSize=${state.pageSize}`).then(
          (response) => {
            setTableLoading(false);
            setTableData(response.data.detail);
            setTablePages(Math.ceil(response.data.count / state.pageSize));
          }
        );
      }}
      {...props}
    />
  );
};

export default hot(module)(ServerPaginatedTable);
