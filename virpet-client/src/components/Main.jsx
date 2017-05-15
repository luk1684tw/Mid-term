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
import Today from 'components/Today.jsx';
import Forecast from 'components/Forecast.jsx';
import {setSearchText} from 'states/events-actions.js';
import {toggleNavbar,Animated} from 'states/main-actions.js';
import GoogleLogin from 'react-google-login';
import './Main.css';


class Main extends React.Component {
    static propTypes = {
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
        this.style = {
            display : 'none'
        };
        this.handleClick = this.handleClick.bind(this);
    };

    render() {
        const responseGoogle = (response) => {
            console.log(response);
        }

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

                                    <SingleEvent/>
                                    &nbsp;&nbsp;
                                    <div>
                                        <GoogleLogin clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com" buttonText="Login with Google" onSuccess={responseGoogle} onFailure={responseGoogle} className='btn btn-secondary' offline={false}></GoogleLogin>
                                    </div>
                                    <div className='search ml-auto'>
                                        <Input className='ml-auto' type='text' placeholder='Search' onKeyPress={this.handleSearchKeyPress} getRef={e => this.searchEl = e}></Input>{this.props.searchText && <i className='navbar-text fa fa-times' onClick={this.handleClearSearch}></i>
}
                                    </div>
                                </Collapse>
                            </Navbar>
                        </div>
                    </div>

                    <Route exact path="/" render={() => (<Forecast/>)}/>
                    <Route exact path="/forecast" render={() => (<Forecast/>)}/>
                    <div className='animate'>
                        <img src={`images/cloud.png`} style={this.style} className='talk'/>
                        <img src={`images/corgi-${8+this.props.pictureNum}.png`} onClick={this.handleClick} className='corgi'/>
                    </div>

                    <div className='footer'>
                        NTHU-VirPet.
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

    handleClearSearch() {
        this.props.dispatch(setSearchText(''));
        this.searchEl.value = '';
    }

    handleClick(){
        clearInterval(this.interval);
        this.interval = setInterval(()=>{this.props.dispatch(Animated())}, 60);
    }

    componentWillReceiveProps(){
        if (this.props.pictureNum >= 15) {
            this.style = {
                display : 'inline-table'
            };
        }
        if(this.props.pictureNum == 75 ){
            this.style = {
                display : 'none'
            };
            clearInterval(this.interval);
        }

    }

}


export default connect(state => ({
    ...state.main,
    searchText: state.searchText
}))(Main);
