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
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';
import './index.css';
import './iconfont/iconfont.css';
import BgBubbles from './BgBubbles';


class User extends Component {

  state = {
    formData: {
      email: '',
      username: '',
      password: ''
    },
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <div className="UserDialog-wrap">
        <div className="signUpOrLogIn">
          <div>
            <SignUpForm formData={this.state.formData} onSubmit={() => {}}
                        onChange={() => {}} 
                        switch={() => {}}/> 
            {/* <SignInForm formData={this.state.formData} onSubmit={() => {}}
                      onChange={() => {}} 
                      switch={() => {}}/>  */}
          </div>
        </div>
        <BgBubbles />
        <div className="user-bg" />
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
