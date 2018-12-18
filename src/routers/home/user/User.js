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
import Recommend from '../recommend/Recommend'


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
    const { signUp, signIn, changeTab } = this.props;
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
          <SignInForm formData={formData} onSubmit={(e) => {e.preventDefault()}}
                    onChange={(key, value) => {changeFormData(key, value)}} 
                    switch={() => {}}
                    changeStauts={(status) => {changeUserStatus(status)}}
                    signIn={signIn}
          />
        );
      case constants.LOGINED:
          return (
            <div>登陆成功！</div>
          )
      default:
      return (
        <SignUpForm 
          formData={formData} onSubmit={() => {}}
          onChange={(key, value) => {changeFormData(key, value)}} 
          switch={() => {}}
          changeStauts={(status) => {changeUserStatus(status)}}
          signUp={signUp}
        /> 
      );
    }
  }

  changeFormDataByKey = (key, value) => {
    const { changeFormData, selector } = this.props;
    const formData = get(selector, 'formData');
    formData[key] = value;
    changeFormData(formData);
  }

  componentWillMount() {
    const { getUserProperty, selector } = this.props;
    const uuid = get(selector, 'uuid');
    getUserProperty(uuid);
  }

  render() {
    const { selector, changeUserStatus } = this.props;
    const userStatus = get(selector, 'userStatus');
    const formData = get(selector, 'formData');
    const uuid = get(selector, 'uuid');
    if (uuid != -1 && userStatus == 0 ) {
      return (
        <div>
          <Recommend getUserRating={true} />
        </div>
      );
    }
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

const mapStateToprops = (state, ownProps) => {
  return { 
    selector: selector(state, userReducerName),
    changeTab: ownProps.changeTab,
  };
};

const mapDispatchToProps = {
  changeUserStatus: actions.changeUserStatus,
  changeFormData: actions.changeFormData,
  signUp: actions.signUp,
  signIn: actions.signIn,
  getUserProperty: actions.getUserProperty
};

export default connect(mapStateToprops, mapDispatchToProps)(User);
