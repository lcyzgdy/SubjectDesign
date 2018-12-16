import React, { Component } from "react";
import { connect } from "react-redux";
import get from "lodash/get";
import times from "lodash/times";
import Img from "react-image";
import {
  Loading,
  Text,
  Flex,
  StyleHoc,
  Icon,
  Button
} from "../../../components";
import * as actions from "./actions";
import { selector, getNowPlayReducerName } from "./ducks";
import HeaderSearch from "./HeaderSearch";

class User extends Component {

  componentDidMount() {
    
  }

  render() {
    return (
      <div>
        user
      </div>
    );
  }
}

const mapStateToprops = state => {
  return { };
};

const mapDispatchToProps = {

};

export default connect(mapStateToprops, mapDispatchToProps)(User);
