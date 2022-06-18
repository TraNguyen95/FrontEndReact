import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import './Login.scss'
import * as actions from "../../store/actions";
import {handleLogin}  from "../../services/userService" 
import { userLoginSuccess } from '../../store/actions';

class Login extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errMessage: ''
        }
    }

    handleOnchangeUserInput = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    handleOnchangePasswordInput = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    handleLogin = async() => {
        this.setState({
            errMessage: ''
        })
        try {
            let data = await handleLogin(this.state.username,this.state.password)
            if(data && data.errCode !==0){
                this.setState({
                    errMessage: data.errMessage
                })
            }
            if(data && data.errCode === 0){
                console.log('login success');
                this.props.userLoginSuccess(data.user)
            }
           
        } catch (error) {
            if(error.response){
                if(error.response.data){
                    this.setState({
                        errMessage: error.response.data.errMessage
                    })
                }
            }
        }
    }

    render() {


        return (
           <div className='login-background'>
               <div className='login-container'>
                   <div className='login-content'>
                       <div className='col-12 text-login'>Login</div>
                       <div className='col-12 form group login-input'>
                           <label>Username:</label>
                           <input type='text' className='form-control' placeholder='Enter your Username' value={this.state.username} onChange={(e) => this.handleOnchangeUserInput(e)}/>
                       </div>
                       <div className='col-12 form group login-input'>
                           <label>Password:</label>
                           <input type='password' className='form-control' placeholder='Enter your password' onChange={(e) => this.handleOnchangePasswordInput(e)}/>
                       </div>
                       <div className='col-12'>
                           <button className='btn-login' onClick={() => this.handleLogin()}>Login</button>
                       </div>
                       <div className='col-12'><span style={{color: 'red'}}>{this.state.errMessage}</span></div>
                       <div className='col-12'>
                           <span>Forgot your password?</span>
                       </div>
                       <div className='col-12'>
                           <span className='text-other-login'>Or login with</span>
                       </div>
                       <div className='col-12 social-login'>
                           <i className='fab fa-google-plus-g google'></i>
                           <i className='fab fa-facebook-f facebook'></i>
                       </div>
                   </div>
               </div>
           </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfor) => dispatch(actions.userLoginSuccess(userInfor))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
