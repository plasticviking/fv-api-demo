import React, {useEffect, useState} from 'react';
import axios from 'axios';
import ServerPaginatedTable from "./ServerPaginatedTable";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import ReactJson from 'react-json-view';
import {hot} from "react-hot-loader";
import Icon from "@material-ui/core/Icon";
import {CircularProgress} from "@material-ui/core";


const OverlayDebugView = props => {

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setData(null);

    axios.get(props.url).then(
      (response) => {
        setLoading(false);
        setError(false);
        setData(response.data);
      }
    ).catch(() => {
      setLoading(false);
      setError(true);
    });
  }, [props.url]);

  if (loading) {
    return (<CircularProgress/>);
  }
  if (error) {
    return (<span className="error">Error!</span>);
  }

  return (
    <ReactJson
      src={data}
      theme='bright:inverted'
      iconStyle='triangle'
      collapsed={3}
      style={{
        'fontFamily': ['Hack', 'Source Code Pro', 'monospace'],
        'fontSize': '14px'
      }}
      displayDataTypes={true}
      displayObjectSize={true}
      enableClipboard={true}
      sortKeys={true}
    />
  );
};

export default hot(module)(OverlayDebugView);
