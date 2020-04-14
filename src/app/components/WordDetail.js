import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {Link} from 'react-router-dom';
import axios from "axios";
import {Paper} from "@material-ui/core";
import {hot} from "react-hot-loader";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";

const WordDetail = props => {
  const {word} = props;

  return (
    <Card>
      <CardContent>
        <Typography variant="h2">
          {word.title}
        </Typography>
      </CardContent>
      <CardActions>
        Learn More
      </CardActions>
    </Card>
  );
};

export default hot(module)(WordDetail);
