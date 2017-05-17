import React from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Input,
    Button,
    Form,
    FormGroup,
    Label,
    FormText,
} from 'reactstrap';
import {connect} from 'react-redux';
import SingleEvent from 'components/SingleEvent.jsx';
import Forecast from 'components/Forecast.jsx';
import {setSearchText} from 'states/events-actions.js';
import {toggleNavbar,Animated} from 'states/main-actions.js';
import Login from 'components/Login.jsx';
import Logout from 'components/Logout.jsx';
import GoogleLogin from 'react-google-login';
import {createUser, changeLoginModal, account, password, loginDanger} from 'states/events-actions.js';
import './Main.css';


class Main extends React.Component {
    static propTypes = {
        account: PropTypes.string,
        user: PropTypes.object,
        searchText: PropTypes.string,
        navbarToggle: PropTypes.bool,
        store: PropTypes.object,
        dispatch: PropTypes.func,
        pictureNum: PropTypes.number
    };

    constructor(props) {
        super(props);
        this.searchEl = null;
        this.handleNavbarToggle = this.handleNavbarToggle.bind(this);
        this.handleSearchKeyPress = this.handleSearchKeyPress.bind(this);
        this.handleClearSearch = this.handleClearSearch.bind(this);
        this.handleGooglelogin = this.handleGooglelogin.bind(this);
        this.style = 'hide';
        this.handleCorgiClick = this.handleCorgiClick.bind(this);
    };

    render() {
        const date = (new Date().getDay())%7;
        const weekday = (date === 0)? 'Sun' : (date === 1) ? 'Mon' : (date === 2) ? 'Tue'
        : (date === 3) ? 'Wen' : (date === 4) ? 'Thu' : (date === 5) ? 'Fri' : 'Sat';
        // document.querySelector('.weather-bg').style.backgroundImage = `url("images/corgi.jpg")  `;
        console.log('In Main: searchText = ', this.props.searchText);

        return (
            <Router>
                <div className='main'>
                    <div className='bg-faded'>
                        <div className='container'>
                            <Navbar color='faded' light toggleable>
                                <NavbarToggler right onClick={this.handleNavbarToggle}/>
                                <NavbarBrand className='' href="/">Virpet</NavbarBrand>&nbsp;&nbsp;
                                <Collapse isOpen={this.props.navbarToggle} navbar>
                                    {(this.props.user.account !== '')?<SingleEvent/>:'  '}
                                    {(this.props.user.account !== '')?'Welcome !!':' '}
                                    {(this.props.user.account !== '')?this.props.user.account:<Login/>}
                                    {(this.props.user.account !== '')?<Logout/>:' '}
                                    &nbsp;&nbsp;
                                    {(this.props.user.account !== '')?'':
                                      <GoogleLogin clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com" buttonText="GoogleLogin" onSuccess={this.handleGooglelogin} onFailure={this.handleGooglelogin} className='btn btn-primary' offline={false}></GoogleLogin>

                                    }
                                    <div className='search ml-auto'>
                                        <Input className='ml-auto' type='text' placeholder='Search' onKeyPress={this.handleSearchKeyPress} getRef={e => this.searchEl = e}></Input>
                                        {this.props.searchText && <i className='navbar-text fa fa-times' onClick={this.handleClearSearch}></i>}
                                    </div>
                                </Collapse>
                            </Navbar>
                        </div>
                    </div>

                    <Route exact path="/" render={() => (<Forecast/>)}/>
                    <Route exact path="/forecast" render={() => (<Forecast/>)}/>

                    <div className={this.style}>
                        <span className="arrow_b_int"></span>
                        <span>Today is {weekday}</span>
                        <span className="arrow_b_out"></span>
                    </div>

                    <img className ='Corgi' src={`images/corgi-${8+this.props.pictureNum}.png`} onClick={this.handleCorgiClick}/>

                    <div className='footer'>
                        NTHU專業工具人開發團隊
                    </div>
                </div>
            </Router>
        );
    }

    handleNavbarToggle() {
        this.props.dispatch(toggleNavbar());
    }

    handleSearchKeyPress(e) {
        var keyCode = e.keyCode || e.which;
        if (keyCode === 13) {
            this.props.dispatch(setSearchText(e.target.value));
        }
    }

    handleGooglelogin(response) {
        console.log('response in handleGooglelogin:' , response.profileObj.email);
        this.props.dispatch(createUser(response.profileObj.email,'googleUser'));
    }

    handleClearSearch() {
        this.props.dispatch(setSearchText(''));
        this.searchEl.value = '';
    }

    handleCorgiClick(){
        clearInterval(this.interval);
        this.interval = setInterval(()=>{this.props.dispatch(Animated())}, 60);
    }

    componentWillReceiveProps(){
        if (this.props.pictureNum >= 20) {
            this.style = 'mwt_border';
        }
        if(this.props.pictureNum == 75 ){
            this.style = 'hide';
            clearInterval(this.interval);
        }
    }



}

export default connect(state => ({
    ...state.main,
    ...state.user,
    ...state.loginForm,
    searchText: state.searchText
}))(Main);
