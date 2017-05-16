import React from 'react';
import PropTypes from 'prop-types';
import {
    Input,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    FormText,
    InputGroup,
    InputGroupAddon
} from 'reactstrap';
import {connect} from 'react-redux';
import {clearUser, changeLogoutModal} from 'states/events-actions.js';
import moment from 'moment';
class Logout extends React.Component{
    static propTypes = {
      logoutModal: PropTypes.bool,
      dispatch: PropTypes.func
    };
    constructor(props) {
        super(props);
        this.handleToggle = this.handleToggle.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }
    render(){
      return(
        <div>
            <Button color="secondary" onClick={this.handleToggle}>登出</Button>
            <Modal isOpen={this.props.logoutModal} toggle={this.handleToggle} className='' backdrop={false}>
                <ModalHeader toggle={this.handleToggle}>確定要登出嗎QQ</ModalHeader>
                <ModalFooter>
                    <Button color="primary" onClick={this.handleLogout}>確定</Button>{' '}
                    <Button color="secondary" onClick={this.handleToggle}>取消</Button>
                </ModalFooter>
            </Modal>
        </div>
      );
    }
    handleToggle() {
        this.props.dispatch(changeLogoutModal());
    }
    handleLogout(){
        this.props.dispatch(changeLogoutModal());
        this.props.dispatch(clearUser());
    }
}
export default connect(state => ({
    ...state.logoutForm,
    ...state.user
}))(Logout);
