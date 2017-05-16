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
import {createUser, changeLoginModal, account, password, loginDanger} from 'states/events-actions.js';
import moment from 'moment';
class Login extends React.Component{
    static propTypes = {
      user: PropTypes.string,
      loginModal: PropTypes.bool,
      account: PropTypes.string,
      password: PropTypes.string,
      loginDanger: PropTypes.bool,
      dispatch: PropTypes.func
    };
    constructor(props) {
        super(props);
        this.accountEl = null;
        this.passwordEl = null;
        this.handleAccountChange = this.handleAccountChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }
    componentWillReceiveProps(){
          if(this.props.user==='login-success!' || this.props.user==='Create-Account-succeed'){

          }else{
            this.props.dispatch(account(''));
            this.props.dispatch(password(''));
          }
    }
    render(){
      return(
        <div>
            <Button color="success" onClick={this.handleToggle}>登入</Button>
            <Modal isOpen={this.props.loginModal} toggle={this.handleToggle} className='' backdrop={false}>
                <ModalHeader toggle={this.handleToggle}>登入畫面</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="exampleAccount">帳號</Label>
                        <Input placeholder="妳的帳號" getRef={el => this.accountEl = el} value={this.props.account} onChange={this.handleAccountChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">密碼</Label>
                        <Input type="password" name="password" id="examplePassword" placeholder="6-20字" getRef={el => this.passwordEl = el} value={this.props.password} onChange={this.handlePasswordChange}/>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.handleLogin}>登入</Button>{' '}
                    <Button color="secondary" onClick={this.handleToggle}>取消</Button>
                </ModalFooter>
            </Modal>
        </div>
      );
    }
    handleToggle() {
        this.props.dispatch(changeLoginModal());
    }
    handleLogin(){
        if (this.props.account === '') {
            this.props.dispatch(loginDanger(true));
            return;
        }
        if (this.props.password==='') {
            this.props.dispatch(loginDanger(true));
            return;
        }
        this.props.dispatch(changeLoginModal());
        this.props.dispatch(createUser(this.props.account, this.props.password));
    }
    handleAccountChange(e) {
        const text = e.target.value;
        console.log('e.target.value = ' + e.target.value);
        this.props.dispatch(account(text));
        if (text && this.props.loginDanger) {
            this.props.dispatch(loginDanger(false));
        }
    }
    handlePasswordChange(e) {
        const text = e.target.value;
        console.log('e.target.value = '+e.target.value);
        this.props.dispatch(password(text));
        if (text && this.props.loginDanger) {
            this.props.dispatch(loginDanger(false));
        }
    }
}
export default connect(state => ({
    ...state.loginForm,
    ...state.user
}))(Login);
