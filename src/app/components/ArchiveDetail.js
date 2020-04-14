import React, {useEffect, useState} from 'react';
import axios from 'axios';
import ServerPaginatedTable from "./ServerPaginatedTable";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import OverlayDebugView from "./OverlayDebugView";
import ModalDebugView from "./ModalDebugView";
import CONFIG from "../config";

const ArchiveDetail = props => {

  const [language, setLanguage] = useState(null);
  const [loading, setLoading] = useState(true);

  const {id} = props.match.params;

  useEffect(() => {
    setLoading(true);

    axios.get(`${CONFIG.APIBASE}/v1/archives/${id}`).then(
      (response) => {
        setLanguage(response.data);
        setLoading(false);
      }
    );
  }, []);

  if (loading) {
    return (<span className="loading">Loading</span>);
  }

  return (
    <>
      <Paper>
        <Typography variant="h1">{language.title}</Typography>

        <Typography variant="h3">Words</Typography>
        <ServerPaginatedTable
          columns={
            [
              {
                Header: 'Title',
                accessor: 'title'
              },
              {
                Header: 'ID',
                show: false,
                accessor: 'id'
              },
              {
                Header: 'Part of Speech',
                accessor: 'partOfSpeech.name'
              },
              {
                Header: 'Definitions',
                id: 'translations',
                accessor: item => (item.translations.length)
              },
              {
                Header: 'JSON',
                id: 'json',
                Cell: (c) => {
                  return (<ModalDebugView url={`${CONFIG.APIBASE}/v1/archives/${id}/words/${c.row.id}`}/>);
                }
              }
            ]
          }
          url={`${CONFIG.APIBASE}/v1/archives/${id}/words`}
        />

      </Paper>

      <Paper>
        <Typography variant="h3">Phrases</Typography>
        <ServerPaginatedTable
          columns={
            [
              {
                Header: 'Title',
                accessor: 'title'
              },
              {
                Header: 'ID',
                show: false,
                accessor: 'id'
              },
              {
                Header: 'Part of Speech',
                accessor: 'partOfSpeech.name'
              },
              {
                Header: 'Definitions',
                id: 'translations',
                accessor: item => (item.translations.length)
              },
              {
                Header: 'JSON',
                id: 'json',
                Cell: (c) => {
                  return (<ModalDebugView url={`${CONFIG.APIBASE}/v1/archives/${id}/phrases/${c.row.id}`}/>);
                }
              }
            ]
          }
          url={`${CONFIG.APIBASE}/v1/archives/${id}/phrases`}
        />

      </Paper>

      <Paper>
        <Typography variant="h3">Songs</Typography>
        <ServerPaginatedTable
          columns={
            [
              {
                Header: 'Title',
                accessor: 'title'
              },
              {
                Header: 'ID',
                show: false,
                accessor: 'id'
              },
              {
                Header: 'JSON',
                id: 'json',
                Cell: (c) => {
                  return (<ModalDebugView url={`${CONFIG.APIBASE}/v1/archives/${id}/songs/${c.row.id}`}/>);
                }
              }
            ]
          }
          url={`${CONFIG.APIBASE}/v1/archives/${id}/songs`}
        />

      </Paper>

      <Paper>
        <Typography variant="h3">Stories</Typography>
        <ServerPaginatedTable
          columns={
            [
              {
                Header: 'Title',
                accessor: 'title'
              },
              {
                Header: 'ID',
                show: false,
                accessor: 'id'
              },
              {
                Header: 'JSON',
                id: 'json',
                Cell: (c) => {
                  return (<ModalDebugView url={`${CONFIG.APIBASE}/v1/archives/${id}/stories/${c.row.id}`}/>);
                }
              }
            ]
          }
          url={`${CONFIG.APIBASE}/v1/archives/${id}/stories`}
        />

      </Paper>

    </>
  );
};

export default ArchiveDetail;
