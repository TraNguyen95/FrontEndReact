import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss'
import {getAllUsers,createNewUserService,deleteUserService,editUserService } from '../../services/userService';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import {emitter} from '../../utils/emitter'
class UserManage extends Component {

    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModal: false,
            isOpenModalEdit: false,
            userInfo: {}
        }
    }

    async componentDidMount() {
        await this.getAllUserFromReact();
    }

    getAllUserFromReact = async() => {
        let response = await getAllUsers('ALL');
        if(response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            },() => {
                console.log('check state user2',this.state.arrUsers);
            })
            console.log('check state user1',this.state.arrUsers);
        }
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModal: true
        })
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal,
        })   
    }

    toggleUserModalEdit = () => {
        this.setState({
            isOpenModalEdit: !this.state.isOpenModalEdit,
        })   
    }

    createNewUser = async(data) => {
        try {
            let response = await createNewUserService(data);
            if(response && response.errCode !== 0){
                alert(response.message);
            }else {
                await this.getAllUserFromReact();
                this.setState({
                    isOpenModal: false
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA',{id: 'your id'});
            }
        } catch (error) {
            console.log(error);
        }
        
    }

    handleDeleteUser = async(user) => {
        try {
            let res = await deleteUserService(user.id);
            if(res && res.errCode === 0){
                await this.getAllUserFromReact();
            }else{
                alert(res.errMessage);
            }
        } catch (error) {
            console.log(error );
        }
    }

    handleEditUser = async(user) => {
        this.setState({
            isOpenModalEdit: true,
            userInfo: user
        })
    }

    doEditUser  = async(user) => {
        try {
            let res = await editUserService(user);
            if(res && res.errCode === 0) {
                this.setState({
                    isOpenModalEdit: false,
                })
                await this.getAllUserFromReact();
            }else{
                alert(res.errMessage)
            }

        } catch (error) {
            console.log(error);
        }
    }

    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className="users-container">
                <ModalUser 
                isOpen={this.state.isOpenModal} 
                toggleModalFromParent={this.toggleUserModal}
                createNewUser={this.createNewUser}
                />
                {
                    this.state.isOpenModalEdit &&
                    <ModalEditUser 
                        isOpen={this.state.isOpenModalEdit} 
                        toggleModalFromParent={this.toggleUserModalEdit}
                        userInfo={this.state.userInfo}
                        getUserInfoEdit={this.doEditUser}
                    /> 
                }
                
                <div className='title'>Manage users with Tra</div>
                <div className='mx-1'>
                    <button className='btn  btn-primary px-3'
                    onClick={() => {this.handleAddNewUser()}}>
                        <i className='fas fa-plus'></i>
                        Add New Users
                    </button>
                </div>
                <div className='users-table mt-4 mx-3'>
                    <table id="customers">
                        <tr>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Adress</th>
                            <th>Actions</th>
                        </tr>
                        
                            {   arrUsers && arrUsers.map((item,index) => {
                                return (
                                    <tr>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button onClick={() => {this.handleEditUser(item)}} className='btn-edit'><i className='fas fa-pencil-alt'></i></button>
                                            <button onClick={() => {this.handleDeleteUser(item)}} className='btn-delete'><i className='fas fa-trash'></i></button>
                                        </td>
                                    </tr>
                                )
                            })
                            }
                    </table>
                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
