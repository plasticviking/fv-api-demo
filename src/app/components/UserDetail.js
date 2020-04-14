import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import ReactJson from 'react-json-view';
import CONFIG from "../config";

const UserDetail = (props) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    axios.get(`${CONFIG.APIBASE}/v1/users/current`).then(
      (response) => {
        setUser(response.data);
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
        <Typography variant="h1">{user.displayName}</Typography>

        <ReactJson
          src={user}
          theme="bright:inverted"
          iconStyle="triangle"
          collapsed={3}
          style={{
            fontFamily: ['Hack', 'Source Code Pro', 'monospace'],
            fontSize: '14px'
          }}
          displayDataTypes
          displayObjectSize
          enableClipboard
          sortKeys
        />

      </Paper>

    </>
  );
};

export default UserDetail;
