import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {connect} from 'react-redux';
import shuffle from 'lodash/shuffle';
import throttle from 'lodash/throttle';
import FlipMove from 'react-flip-move';
import Toggle from 'components/Toggle.jsx';
import {refreshEvents, refreshRemovedEvents, accomplishEvent} from 'states/events-actions.js';
import {
    ListGroup,
    ListGroupItem
} from 'reactstrap';
import './shuffle.scss';
import './TodoItem.css';

class ListItem extends React.Component {
  constructor(props){
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }
  handleOnClick(){
    this.props.dispatch(accomplishEvent(this.props.id));
    this.props.clickHandler();
  }
  render() {
    const listClass = `list-item card ${this.props.view}`;
    const style = { zIndex: 100 - this.props.index };

    return (
      <li id={this.props.id} className={listClass + (this.props.doneTs ? ' done' : ' undone')} style={style}>
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
        </div>
        <button onClick={this.handleOnClick}>
          <i className="fa fa-close" />
        </button>
      </li>
    );
  }
};


class Shuffle extends React.Component {
  static propTypes = {
      events: PropTypes.array,
      removedEvents: PropTypes.array,
      user: PropTypes.object,
      dispatch: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      view: 'list',
      order: 'asc',
      sortingMethod: 'chronological',
      enterLeaveAnimation: 'accordianVertical'
    };

    this.toggleList = this.toggleList.bind(this);
    this.toggleGrid = this.toggleGrid.bind(this);
    this.toggleSort = this.toggleSort.bind(this);
    this.sortRotate = this.sortRotate.bind(this);
    this.sortShuffle = this.sortShuffle.bind(this);
  }

  toggleList() {
    this.setState({
      view: 'list',
      enterLeaveAnimation: 'accordianVertical'
    });
  }

  toggleGrid() {
    this.setState({
      view: 'grid',
      enterLeaveAnimation: 'accordianHorizontal'
    });
  }
  // moment(a.startDate,'YYYY-MM-DD').unix()
  toggleSort() {
    const sortAsc = (a, b) => moment(a.startDate,'YYYY-MM-DD').unix() - moment(b.startDate,'YYYY-MM-DD').unix();
    const sortDesc = (a, b) => moment(b.startDate,'YYYY-MM-DD').unix()- moment(a.startDate,'YYYY-MM-DD').unix();
    this.setState({
      order: (this.state.order === 'asc' ? 'desc' : 'asc'),
      sortingMethod: 'chronological'
      // articles: this.state.articles.sort(
      //   this.state.order === 'asc' ? sortDesc : sortAsc
      // )
    });
    console.log('In toggleSort: sort function', this.state.order === 'asc' ? sortDesc : sortAsc);
    let destEvent = this.props.events.sort(this.state.order === 'asc' ? sortDesc : sortAsc);
    console.log('In toggleSort: destEvent', destEvent);
    this.props.dispatch(refreshEvents(destEvent));
  }

  sortShuffle() {
    this.setState({
      sortingMethod: 'shuffle',
      // articles: shuffle(this.state.articles)
    });
    this.props.dispatch(refreshEvents(shuffle(this.props.events)));
  }

  moveArticle(source, dest, id) {
    const sourceArticles = this.props[source].slice();
    let destArticles = this.props[dest].slice();
    console.log('sourceArticles = ', sourceArticles);
    if ( !sourceArticles.length ) return;

    // Find the index of the article clicked.
    // If no ID is provided, the index is 0
    const i = id ? sourceArticles.findIndex(events => events.id === id) : 0;

    // If the article is already removed, do nothing.
    if ( i === -1 ) return;

    destArticles = [].concat( sourceArticles.splice(i, 1), destArticles );

    // this.setState({
    //   [source]: sourceArticles,
    //   [dest]: destArticles,
    // });
    if(source==='events'){
      this.props.dispatch(refreshEvents(sourceArticles));
      this.props.dispatch(refreshRemovedEvents(destArticles));
    }
    else {
      this.props.dispatch(refreshRemovedEvents(sourceArticles));
      this.props.dispatch(refreshEvents(destArticles));
    }
  }

  sortRotate() {
    const events = this.props.events.slice();
    events.unshift(events.pop());

    this.setState({
      sortingMethod: 'rotate',
    });
    this.props.dispatch(refreshEvents(events));
  }

  renderArticles() {
    return this.props.events.map( (events, i) => {
      return (
        <ListItem
          key={events.id}
          view={this.state.view}
          index={i}
          dispatch={this.props.dispatch}
          clickHandler={
              throttle(()=>this.moveArticle('events', 'removedEvents', events.id), 800)
          }
          {...events}
        />
      );
    });
  }

  render() {
    return (
      <div id="shuffle" className={this.state.view}>
        <header>
          <div className="abs-left">
            <Toggle
              clickHandler={this.toggleList}
              text="List" icon="list"
              active={this.state.view === 'list'}
            />
            <Toggle
              clickHandler={this.toggleGrid}
              text="Grid" icon="th"
              active={this.state.view === 'grid'}
            />
          </div>
          {'     '}
          <div className="abs-right">
            <Toggle
              clickHandler={this.toggleSort}
              text={this.state.order === 'asc' ? 'Ascending' : 'Descending'}
              icon={this.state.order === 'asc' ? 'angle-up' : 'angle-down'}
              active={this.state.sortingMethod === 'chronological'}
            />
            {/* <Toggle
              clickHandler={this.sortShuffle}
              text="Shuffle" icon="random"
              active={this.state.sortingMethod === 'shuffle'}
            />
            <Toggle
              clickHandler={this.sortRotate}
              text="Rotate" icon="refresh"
              active={this.state.sortingMethod === 'rotate'}
            /> */}
          </div>
        </header>
        <div>
          <FlipMove
            staggerDurationBy="30"
            duration={500}
            enterAnimation={this.state.enterLeaveAnimation}
            leaveAnimation={this.state.enterLeaveAnimation}
            typeName="ul"
          >
            { this.renderArticles() }
            <footer key="foot">
              <div className="">
                <Toggle
                  clickHandler={() => (
                    this.moveArticle('removedEvents', 'events')
                  )}
                  text="Add Item"
                  icon="plus"
                  active={this.props.removedEvents.length > 0}
                />
                <Toggle
                  clickHandler={() => (
                    this.moveArticle('events', 'removedEvents')
                  )}
                  text="Remove Item"
                  icon="close"
                  active={this.props.events.length > 0}
                />
              </div>
            </footer>
          </FlipMove>
        </div>
      </div>
    );
  }
}

export default connect(state => ({
    ...state.events,
    ...state.user
}))(Shuffle);
