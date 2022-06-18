import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {emitter} from '../../utils/emitter';

class ModalUser extends Component {

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        }

        this.ListenToEmitter();
    }

    ListenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: ''
            })
        })
    }

    componentDidMount() {
    }

    toggle = () => {
        this.props.toggleModalFromParent();
    }

    handleOnchange = (e,id) => {
        let copyState = {...this.state};
        copyState[id] = e.target.value;

        this.setState({
            ...copyState
        }) 
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email','password','firstName','lastName','address'];
        for(let i=0;i<arrInput.length;i++){
            if(!this.state[arrInput[i]]){
                isValid = false;
                alert('Missing parameter '+ arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    handleCreateUser = () => {
        let isValid = this.checkValidateInput();
        if(isValid===true){
            this.props.createNewUser(this.state);
        }
        
    }

    render() {
        return (
            <Modal 
            isOpen={this.props.isOpen} 
            toggle={() => {this.toggle()}} 
            className={'modal-user-container'}
            size="lg"
            >
                <ModalHeader toggle={() => {this.toggle()}}>Creat new user</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Email</label>
                            <input type='text' 
                            onChange={(e) => {this.handleOnchange(e,'email')}}
                            value={this.state.email}
                            ></input>
                        </div>
                        <div className='input-container'>
                            <label>Password</label>
                            <input type='password' 
                            onChange={(e) => {this.handleOnchange(e,'password')}}
                            value={this.state.password}
                            ></input>
                        </div>
                        <div className='input-container'>
                            <label>First Name</label>
                            <input type='text' 
                            onChange={(e) => {this.handleOnchange(e,'firstName')}}
                            value={this.state.firstName}
                            ></input>
                        </div>
                        <div className='input-container'>
                            <label>Last Name</label>
                            <input type='text' 
                            onChange={(e) => {this.handleOnchange(e,'lastName')}}
                            value={this.state.lastName}
                            ></input>
                        </div>
                        <div className='input-container max-width-input'>
                            <label>Address</label>
                            <input type='text' 
                            onChange={(e) => {this.handleOnchange(e,'address')}}
                            value={this.state.address}
                            ></input>
                        </div>
                    </div>
                           
                </ModalBody>
                <ModalFooter>
                <Button color="primary" onClick={() => {this.handleCreateUser()}}>Save Change</Button>{' '}
                <Button color="secondary" onClick={() => {this.toggle()}}>Close</Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);




