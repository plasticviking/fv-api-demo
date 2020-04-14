import React from 'react';
import ServerPaginatedTable from "./ServerPaginatedTable";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import {hot} from "react-hot-loader";
import CONFIG from "../config";

const ArchiveList = () => (
  [
    <Typography variant="h3">Archives</Typography>,
    <ServerPaginatedTable
      columns={
        [
          {
            Header: 'Archive',
            accessor: 'title',
            Cell: c => <Link to={`/archives/${c.row.id}`}>{c.row.title}</Link>
          },
          {
            Header: 'Type',
            accessor: 'type'
          },
          {
            Header: 'ID',
            accessor: 'id'
          }
        ]
      }
      url={`${CONFIG.APIBASE}/v1/archives`}
    />
  ]
);

export default hot(module)(ArchiveList);
