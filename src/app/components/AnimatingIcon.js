import React, {useEffect, useState} from 'react';
import ServerPaginatedTable from "./ServerPaginatedTable";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import {hot} from "react-hot-loader";
import CONFIG from "../config";
import {setAPIKey} from "../apikey";
import {connect} from "react-redux";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";

const AnimatingIcon = (props) => {

  let content = (<Icon>{props.children}</Icon>);
  const [currentState, setCurrentState] = useState({content: null, spin: false});
  const [nextState, setNextState] = useState(null);
  const [phase, setPhase] = useState('steady');

  const fadeInDone = () => {
    setPhase('steady');
  };

  const fadeOutDone = () => {
    setCurrentState(nextState);
    setPhase('in');
  };

  useEffect(() => {
    setNextState(
      {
        content: props.children,
        spin: props.spin
      });
    setPhase('out');
  }, [props.children]);

  // if (props.spin) {
  //   content = (<Icon className="spin">{props.children}</Icon>);
  // }

  switch (phase) {
    case 'in':
      return (
        <span className="fadeIn" onAnimationEnd={() => {
          fadeInDone();
        }}>
          <Icon className={currentState.spin ? 'spin' : ''}>{currentState.content}</Icon>
        </span>
      );
    case 'out':
      return (
        <span className="fadeOut" onAnimationEnd={() => {
          fadeOutDone();
        }}>
          <Icon className={currentState.spin ? 'spin' : ''}>{currentState.content}</Icon>
        </span>
      );
    case 'steady':
    default:
      return (
        <span><Icon className={currentState.spin ? 'spin' : ''}>{currentState.content}</Icon></span>
      );
  }
};

export default hot(module)(AnimatingIcon);
