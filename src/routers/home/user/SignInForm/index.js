import React from 'react'
import  './index.css'
import { Flex } from '../../../../components';
import * as constants from '../constants';

export default function (props) {
    return (
        <div>
            <h3>登陆 <a href="#" className="noAccountBtn" onClick={() => {props.changeStauts(constants.SIGNUP)}}>还没有账号，注册</a>
            </h3>
            <form className="logIn" onSubmit={props.onSubmit}>
                <div className="row">
                    <label><i className="iconfont icon-username"></i></label>
                    <input type="text" value={props.formData.username}
                           onChange={props.onChange.bind(null, 'username')} spellCheck="false"/>
                </div>
                <div className="row">
                    <label><i className="iconfont icon-password"></i></label>
                    <input type="password" value={props.formData.password}
                           onChange={props.onChange.bind(null, 'password')}/>
                </div>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <button className="signin-btn">登录</button>
                </div>
            </form>
        </div>
    )
}