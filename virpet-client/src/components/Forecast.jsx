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
    Jumbotron,
    ListGroup,
    ListGroupItem
} from 'reactstrap';
import TodoForm from 'components/TodoForm.jsx';
import TodoList from 'components/TodoList.jsx';
import Shuffle from 'components/Shuffle.jsx';
import {listEvents, toggleAndList} from 'states/events-actions.js';
import Days from 'components/Days.jsx'
import './Forecast.css';
import './TodoList.css';
import './shuffle.scss';

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
    }

    componentDidMount() {

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
                    </div>
                    <TodoForm/>
                    {this.props.user.account!==''? <Shuffle/>: <div className='todo-list'><ListGroup><ListGroupItem className='empty d-flex justify-content-center align-items-center'>
                      <div className='empty-text'>請先點上方的登入喔</div>
                   </ListGroupItem></ListGroup></div>}
                    {/* <TodoList events={events}/> */}
                    {startEventLoading && <Alert color='warning' className='loading'>載入中 請稍後...</Alert>
}
                </div>
            </div>
        );
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
