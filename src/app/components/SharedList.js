import React from 'react';
import ServerPaginatedTable from "./ServerPaginatedTable";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import {hot} from "react-hot-loader";
import CONFIG from "../config";

const SharedList = () => (
  [
    <Typography variant="h3">Shared Media</Typography>,
    <ServerPaginatedTable
      columns={
        [
          {
            Header: 'Title',
            accessor: 'title',
            Cell: c => <Link to={`/archives/${c.row.id}`}>{c.row.title}</Link>
          },
          {
            Header: 'ID',
            accessor: 'id'
          }
        ]
      }
      url={`${CONFIG.APIBASE}/v1/shared/media`}
    />,
    <Typography variant="h3">Shared Categories</Typography>,
    <ServerPaginatedTable
      columns={
        [
          {
            Header: 'Title',
            id: 'title',
            accessor: i => (i)
          }
        ]
      }
      url={`${CONFIG.APIBASE}/v1/shared/categories`}
    />,
    <Typography variant="h3">Shared Links</Typography>,
    <ServerPaginatedTable
      columns={
        [
          {
            Header: 'Title',
            id: 'title',
            accessor: i => (i.title)
          }
        ]
      }
      url={`${CONFIG.APIBASE}/v1/shared/links`}
    />
  ]
);

export default hot(module)(SharedList);
