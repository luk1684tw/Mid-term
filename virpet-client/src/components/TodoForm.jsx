import React from 'react';
import PropTypes from 'prop-types';
import {
    Input,
    Button,
    Form,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import {connect} from 'react-redux';
import {Alert, Label} from 'reactstrap';
import {toggleForm, toggleTemp, listEvents, selectShowDays ,toggleAndList} from 'states/events-actions.js';
import './PostForm.css';
import './Forecast.css';

class TodoForm extends React.Component {
    static propTypes = {
        searchText: PropTypes.string,
        formToggle: PropTypes.bool,
        tempToggle: PropTypes.bool,
        showDays: PropTypes.number,
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.handleFormToggle = this.handleFormToggle.bind(this);
        this.handleTempToggle = this.handleTempToggle.bind(this);
        this.handleDropdownSelect = this.handleDropdownSelect.bind(this);
        this.handleEvents = this.handleEvents.bind(this);
        this.toggleUnaccomplishedOnly = this.toggleUnaccomplishedOnly.bind(this);
    }

    render() {
        const {formToggle, tempToggle, showDays}=this.props;
        return (
            <div className='label d-flex justify-content-between align-items-flex-start'>
              {formToggle?
                      <div><ButtonDropdown type='buttom' isOpen={tempToggle} toggle={this.handleTempToggle}>
                          <DropdownToggle className='mood-toggle' type='button' caret color="secondary">
                              {/*<i className={getMoodIcon(mood)}></i>&nbsp;
                                   mood === 'na' ? 'Mood' : mood
                              */}
                              顯示{' '}{this.props.showDays}天
                          </DropdownToggle>
                          <DropdownMenu>
                              <DropdownItem type='button' onClick={() => this.handleDropdownSelect(5)}>&nbsp;&nbsp;5 天</DropdownItem>
                              <DropdownItem type='button' onClick={() => this.handleDropdownSelect(7)}>&nbsp;&nbsp;7 天</DropdownItem>
                              <DropdownItem type='button' onClick={() => this.handleDropdownSelect(10)}>&nbsp;&nbsp;10 天</DropdownItem>
                              <DropdownItem type='button' onClick={() => this.handleDropdownSelect(15)}>&nbsp;&nbsp;15 天</DropdownItem>
                              <DropdownItem type='button' onClick={() => this.handleDropdownSelect(20)}>&nbsp;&nbsp;20 天</DropdownItem>
                              <DropdownItem type='button' onClick={() => this.handleDropdownSelect(25)}>&nbsp;&nbsp;25 天</DropdownItem>
                              <DropdownItem type='button' onClick={() => this.handleDropdownSelect(30)}>&nbsp;&nbsp;30 天</DropdownItem>
                          </DropdownMenu>
                      </ButtonDropdown>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <Input type="checkbox" checked={!this.props.unaccomplishedOnly} onClick={this.toggleUnaccomplishedOnly}/>&nbsp;
                      <Label className='accomplished-only' onClick={this.toggleUnaccomplishedOnly}>顯示完成事項</Label></div>
              :
              <Button className='btn-form' outline color="warning" onClick={this.handleFormToggle}><i className='fa fa-map-marker' aria-hidden="true"></i>&nbsp;&nbsp;選取天數範圍</Button>
            }
            </div>
        );
    }
    toggleUnaccomplishedOnly() {
        this.props.dispatch(toggleAndList());
    }

    handleDropdownSelect(showDays) {
        console.log(showDays);
        this.props.dispatch(selectShowDays(showDays));
        this.props.dispatch(listEvents(this.props.searchText, false, showDays));
    }

    handleFormToggle() {
        this.props.dispatch(toggleForm());
    }

    handleTempToggle() {
        this.props.dispatch(toggleTemp());
    }

    handleEvents() {
        const {showDays, dispatch} = this.props;
        console.log('handleEvents :' + showDays);
    }
}

export default connect(state => ({
    ...state.eventsForm,
    ...state.events,
    searchText: state.searchText
}))(TodoForm);
