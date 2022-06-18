import React, { Component,Fragment } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import logo from '../../assets/logo.svg';
import {  FormattedMessage   } from "react-intl";

class HomeHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowComponent: false,
            keyword:'',
            selectedOption:'',
            listSpecialty:[],
            selectedSpecialty:'',
            specialtyId: ''
        }
        
    }
    componentDidMount() {
        
    }
    
    render() {
        return (
            <Fragment>
                <div className="home-header-container">
                <div className="home-header-content">
                    <div className="left-content">
                        <i className="fas fa-bars"></i>
                        <img className="header-logo" src={logo} />
                    </div>

                    <div className="center-content">
                        <div className="child-content">
                            <div><b> <FormattedMessage id= "homeheader.speciality" /></b></div>
                            <div className="subs-title"><FormattedMessage id= "homeheader.searchdoctor" /></div>
                        </div>

                        <div className="child-content">
                            <div><b><FormattedMessage id= "homeheader.health-facility" /></b></div>
                            <div className="subs-title"><FormattedMessage id= "homeheader.select-room" /></div>
                        </div>

                        <div className="child-content">
                            <div><b><FormattedMessage id= "homeheader.doctor" /></b></div>
                            <div className="subs-title"><FormattedMessage id= "homeheader.select-doctor" /></div>
                        </div>  

                        <div className="child-content">
                            <div><b><FormattedMessage id= "homeheader.fee" /></b></div>
                            <div className="subs-title"><FormattedMessage id= "homeheader.check-health" /></div>
                        </div>  
                    </div>

                    <div className="right-content">
                        <div className="support"><i className="fas fa-question-circle"></i><FormattedMessage id= "homeheader.support" /></div>
                        <div className={'language-vn active'}><span >VN</span></div>
                        <div className={'language-en'}><span>EN</span></div>
                    </div>
                </div>
            </div>

            <div className="home-header-banner">
                <div className="content-up">
                    <div className="title-1"><FormattedMessage id= "Banne.title1" /></div>
                    <div className="title-2"><FormattedMessage id= "Banne.title2" /></div>
                    <div className="search">
                        <i className="fas fa-search"></i>
                        <input type="text" placeholder="Tìm chuyên khoa khám bệnh" />
                    </div>
                </div>
                <div className="content-down">
                    <div className="options">
                        <div className="option-child">
                            <div className="icon-child"><i className="fas fa-hospital"></i></div>
                            <div className="text-child"><FormattedMessage id= "Banne.child1" /></div>
                        </div>

                        <div className="option-child">
                            <div className="icon-child"><i className="fas fa-mobile-alt"></i></div>
                            <div className="text-child"><FormattedMessage id= "Banne.child2" /></div>
                        </div>

                        <div className="option-child">
                            <div className="icon-child"><i className="fas fa-procedures"></i></div>
                            <div className="text-child"><FormattedMessage id= "Banne.child3" /></div>
                        </div>

                        <div className="option-child">
                            <div className="icon-child"><i className="fas fa-flask"></i></div>
                            <div className="text-child"><FormattedMessage id= "Banne.child4" /></div>
                        </div>

                        <div className="option-child">
                            <div className="icon-child"><i className="fas fa-user-md"></i></div>
                            <div className="text-child"><FormattedMessage id= "Banne.child5" /></div>
                        </div>

                        <div className="option-child">
                            <div className="icon-child"><i className="fas fa-briefcase-medical"></i></div>
                            <div className="text-child"><FormattedMessage id= "Banne.child6" /></div>
                        </div>
                    </div>
                </div>

            </div>
            </Fragment>
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

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
