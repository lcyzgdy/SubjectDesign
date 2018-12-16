import React from 'react';
import './index.css';

export default function (props) {
    return (
        <div>
            <h3>注册</h3>
        <form className="signUp" onSubmit={props.onSubmit}>
            <div className="row">
                <label><i className="iconfont icon-email"></i></label>
                <input type="text" value={props.formData.email}
                       onChange={props.onChange.bind(this, 'email')} spellCheck="false"/>
            </div>
            <div className="row">
                <label><i className="iconfont icon-username"></i></label>
                <input type="text" value={props.formData.username}
                       onChange={props.onChange.bind(this, 'username')} spellCheck="false"/>
            </div>
            <div className="row">
                <label><i className="iconfont icon-password"></i></label>
                <input type="password" value={props.formData.password}
                       onChange={props.onChange.bind(this, 'password')}/>
            </div>
            <div>
                <button className="signup-btn">注册</button>
                <a href="#" className="haveAccountBtn" onClick={props.switch.bind(this)}>已有账号，登陆</a>
            </div>
        </form>
        </div>
    )
}