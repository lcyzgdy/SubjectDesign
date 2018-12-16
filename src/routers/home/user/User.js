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
import { selector, userReducerName } from "./ducks";
import HeaderSearch from "./HeaderSearch";
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';
import './index.css';
import './iconfont/iconfont.css';
import BgBubbles from './BgBubbles';
import * as constants from './constants';


class User extends Component {

  state = {
    formData: {
      email: '',
      username: '',
      password: ''
    },
  }

  renderUserDialog = ({userStatus, changeUserStatus, formData = {
    email: '',
    username: '',
    password: ''
  }, changeFormData}) => {
    const { signUp } = this.props;
    switch (userStatus) {
      case constants.SIGNUP:
        return (
          <SignUpForm 
            formData={formData} onSubmit={() => {}}
            onChange={(key, value) => {changeFormData(key, value)}} 
            switch={() => {}}
            changeStauts={(status) => {changeUserStatus(status)}}
            signUp={signUp}
          /> 
        );
      case constants.SIGNIN:
        return (
          <SignInForm formData={formData} onSubmit={() => {}}
                    onChange={(key, value) => {changeFormData(key, value)}} 
                    switch={() => {}}
                    changeStauts={(status) => {changeUserStatus(status)}}
          />
        );
      default:
          return null;
    }
  }

  changeFormDataByKey = (key, value) => {
    const { changeFormData, selector } = this.props;
    const formData = get(selector, 'formData');
    formData[key] = value;
    console.log('f', formData)
    changeFormData(formData);
  }

  componentDidMount() {
  }


  render() {
    const { selector, changeUserStatus } = this.props;
    const userStatus = get(selector, 'userStatus');
    const formData = get(selector, 'formData');
    return (
      <div className="UserDialog-wrap">
        <div className="signUpOrLogIn">
          {this.renderUserDialog({formData, userStatus, changeUserStatus, changeFormData: this.changeFormDataByKey})}
        </div>
        <BgBubbles />
        <div className="user-bg" />
      </div>
    );
  }
}

const mapStateToprops = state => {
  return { selector: selector(state, userReducerName) };
};

const mapDispatchToProps = {
  changeUserStatus: actions.changeUserStatus,
  changeFormData: actions.changeFormData,
  signUp: actions.signUp,
};

export default connect(mapStateToprops, mapDispatchToProps)(User);
