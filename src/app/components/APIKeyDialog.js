import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { hot } from 'react-hot-loader';
import { setClientID, setClientSecret } from '../apikey';
import { connect } from 'react-redux';
import AnimatingIcon from './AnimatingIcon';
import TextField from '@material-ui/core/TextField';

const APIKeyDialog = (props) => {
  const { clientID, clientSecret, dispatch } = props;
  const _handleInput = (event) => {

    console.dir(event.target);
    if (event.target.name === 'clientID') {
      dispatch(setClientID({ clientID: event.target.value }));
    } else if (event.target.name === 'clientSecret') {
      dispatch(setClientSecret({ clientSecret: event.target.value }));
    }

  };
  const [icon, setIcon] = useState('thumbsup');
  useEffect(() => {

    if (clientID === '' || clientSecret === '') {
      setIcon('input');
    } else {
      if (props.validating) {
        setIcon('loop');
      } else {
        if (props.validated) {
          setIcon('check');
        } else {
          setIcon('error');
        }
      }
    }

  }, [props.validated, props.validating, props.apiKey]);

  return (
    <>
      <TextField fullWidth error={icon === 'error'} name={'clientID'} value={clientID} onChange={_handleInput}
                 label='Client ID' /><br />
      <TextField fullWidth error={icon === 'error'} name={'clientSecret'} value={clientSecret} onChange={_handleInput}
                 label='Client Secret' />

      <div style={{ marginTop: '10px' }}>
        <AnimatingIcon show spin={icon === 'loop'}>{icon}</AnimatingIcon>
      </div>

    </>
  );
};

function mapStateToProps(state) {
  return {
    clientID: state.auth.clientID !== null ? state.auth.clientID : '',
    clientSecret: state.auth.clientSecret !== null ? state.auth.clientSecret : '',
    validating: state.auth.validating,
    validated: state.auth.validated
  };
}

export default hot(module)(connect(mapStateToProps, null)(APIKeyDialog));
