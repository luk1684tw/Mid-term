import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {connect} from 'react-redux';
import FlipMove from 'react-flip-move';
import {refreshEvents, refreshRemovedEvents, accomplishEvent} from 'states/events-actions.js';
import {
    ListGroup,
    ListGroupItem
} from 'reactstrap';
import './shuffle.scss';
// import './TodoItem.css';

class ListItem extends React.Component {
  static propTypes = {
      dispatch: PropTypes.func
  };
  constructor(props) {
      super(props);

      this.handleCheckboxCheck = this.handleCheckboxCheck.bind(this);
  }
  handleCheckboxCheck() {
      console.log('In handleCheckboxCheck', this.props.id);
      if (!this.props.doneTs) {
          this.props.dispatch(accomplishEvent(this.props.id));
      }
  }
  render() {
    const listClass = `list-item card ${this.props.view}`;
    const style = { zIndex: 100 - this.props.index };

    return (
      <li id={this.props.id} className={listClass } style={style}>
        <h5 className=''>{'名稱:'}</h5>
        <h5 className=''>{this.props.title}</h5>
        <h5 className=''>{'開始時間: '}</h5>
        <h5 className=''>{moment(this.props.startDate).format('MMM Do, YYYY')}</h5>
        <h5 className=''>{'結束時間: '}</h5>
        <h5 className=''>{moment(this.props.endDate).format('MMM Do, YYYY')}</h5>
        <h5 className=''>{'簡介: '}</h5>
        <h5 className=''>{this.props.description}</h5>
        <div className='check d-flex justify-content-end align-items-center'>
            <div className='done-ts'>{
                !!this.props.doneTs &&
                <span>{moment(this.props.doneTs * 1000).calendar()}</span>
            }</div>
            <div className='checkbox' >
                <i className={'fa ' + (this.props.doneTs ? 'fa-check-square' : 'fa-square-o')} aria-hidden="true"></i>
            </div>
        </div>
        <button onClick={this.props.clickHandler}>
          <i className="fa fa-close" />
        </button>
      </li>
    );
  }
};
export default connect(state => ({
    ...state.events,
    ...state.user
}))(ListItem);
