import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Alert, Label, Input} from 'reactstrap';

import _ from "lodash";

import {
    Card,
    Button,
    CardImg,
    CardTitle,
    CardText,
    CardGroup,
    CardSubtitle,
    CardBlock,
    Container,
    Row,
    Col,
    Jumbotron
} from 'reactstrap';

import WeatherDisplay from 'components/WeatherDisplay.jsx';
import WeatherTable from 'components/WeatherTable.jsx';
import WeatherForm from 'components/WeatherForm.jsx';
import TodoForm from 'components/TodoForm.jsx';
import TodoList from 'components/TodoList.jsx';
import {listEvents, toggleAndList} from 'states/events-actions.js';
import Days from 'components/Days.jsx'
import './Forecast.css';

class Forecast extends React.Component {
    static propTypes = {
        user: PropTypes.object,
		    startEventLoading: PropTypes.bool,
        events: PropTypes.array,
        showDays: PropTypes.number,
        unaccomplishedOnly: PropTypes.bool,
        searchText: PropTypes.string,
		    dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.toggleUnaccomplishedOnly = this.toggleUnaccomplishedOnly.bind(this);
    }

    componentDidMount() {
        console.log(this.props.account);
        this.props.dispatch(listEvents(this.props.searchText, false, this.props.showDays));
    }


    componentWillReceiveProps(nextProps) {
        // console.log('nextProps.searchText = ',nextProps.searchText, ' this.props.searchText = ', this.props.searchText);
        if (nextProps.searchText !== this.props.searchText) {
            this.props.dispatch(listEvents(nextProps.searchText, false, this.props.showDays));
        }
    }

    render() {
        const {
            startEventLoading,
            events,
			unaccomplishedOnly,
            searchText
        } = this.props;
        // console.log('In Render: searchText= ',searchText);
        document.body.className = `weather-bg`;
        document.querySelector('.weather-bg').style.backgroundImage = `url("images/corgi.jpg")  `;
				console.log('EVENTS in forecast',events);
        return (
            <div className='forecast'>
                <div className='todos'>
                    <div className='label d-flex justify-content-between align-items-end'>
                        <h4 className = 'te'>
                            <i className='fa fa-calendar-o' aria-hidden="true"></i>&nbsp;&nbsp;記事本</h4>
                        <div><Input type="checkbox" checked={this.props.unaccomplishedOnly} onClick={this.toggleUnaccomplishedOnly}/>&nbsp;<Label className='accomplished-only' onClick={this.toggleUnaccomplishedOnly}>未完成事項</Label>
                        </div>
                    </div>
                    <TodoForm/>
                    <TodoList events={events}/>{startEventLoading && <Alert color='warning' className='loading'>Loading...</Alert>
}
                </div>
            </div>
        );
    }

    toggleUnaccomplishedOnly() {
        this.props.dispatch(toggleAndList());
    }
}

export default connect(state => ({
    ...state.forecast,
    ...state.events,
    ...state.todoForm,
    ...state.user,
    ...state.loginForm,
    searchText: state.searchText
}))(Forecast);
