import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
    ListGroup,
    ListGroupItem
} from 'reactstrap';

import TodoItem from 'components/TodoItem.jsx';
import './TodoList.css';

class TodoList extends React.Component {
    static propTypes = {
        user: PropTypes.object,
        events: PropTypes.array
    };

    constructor(props) {
        super(props);
    }

    render() {
        const {events} = this.props;
        console.log('EVENTS in todolist',events);
        let children = (
            <ListGroupItem className='empty d-flex justify-content-center align-items-center'>
                <div className='empty-text'>所有事情都完成了OuO<br />好好享受睡覺的時光!!</div>
            </ListGroupItem>
        );
        if (events.length && this.props.user.account!=='') {
            children = events.map(t => (
                <ListGroupItem key={t.id} action={!t.doneTs}>
                    <TodoItem {...t} />
                </ListGroupItem>
            ));
        }
        if(this.props.user.account ===''){
             children = (
               <ListGroupItem className='empty d-flex justify-content-center align-items-center'>
                 <div className='empty-text'>請先點上方的登入喔</div>
              </ListGroupItem>
            );
        }

        return (
            <div className='todo-list'>
                <ListGroup>{children}</ListGroup>
            </div>
        );
    }
}

export default connect(state => ({
    ...state.user
}))(TodoList);
