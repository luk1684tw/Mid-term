import {
    createEvent as createEventFromApi,
    listEvents as listEventsFromApi,
    accomplishEvent as accomplishEventFromApi,
    createUser as createUserFromApi
} from 'api/events.js';
export function setSearchText(searchText) {
    return {
        type: '@SEARCH_TEXT_XD/SET_SEARCH_TEXT',
        searchText
    };
}
export function eventTitle(eventTitleValue) {
    return {
        type: '@EVENTS/EVENT_TITLE',
        eventTitleValue
    };
};
export function eventDescript(eventDescriptValue) {
    return {
        type: '@EVENTS/EVENT_DESCRIPT',
        eventDescriptValue
    };
};
export function eventGetStartDate(eventStartDate){
    return {
        type: '@EVENTS/EVENT_GET_START_DATE',
        eventStartDate
    };
}
export function eventGetEndDate(eventEndDate){
    return {
        type: '@EVENTS/EVENT_GET_END_DATE',
        eventEndDate
    };
}

export function eventDanger(eventDanger) {
    return {
        type: '@EVENTS/EVENT_DANGER',
        eventDanger
    };
};
export function changeModal(){
    return {
         type: '@EVENTS/CHANGE_MODAL'
    };
}
// -----------------------------------
//------------------------------------
function startEventLoading(){
    return {
         type: '@EVENTS/START_EVENT_LOADING'
    };
};
function endEventLoading(){
    return{
        type: '@EVENTS/END_EVENT_LOADING'
    };
}
function endListEvents(events){
    return{
        type: '@EVENTS/END_LIST_EVENTS',
        events
    }
}
export function listEvents(searchText, loading = false, showDays) {
    return (dispatch, getState) => {
        if (!loading)
            dispatch(startEventLoading());

        return listEventsFromApi(getState().events.unaccomplishedOnly, searchText, showDays).then(events => {
            dispatch(endListEvents(events));
            dispatch(endEventLoading());
            console.log('Events in actions.listEvents', events);
        }).catch(err => {
            console.error('Error listing posts', err);
            dispatch(endEventLoading());
        });
    };
};
export function createEvent(eventTitle, eventStartDate, eventEndDate, eventDescript, account) {
    console.log('Action.eventTitle' + eventTitle);
    console.log('Action.eventDescript' + eventDescript);
    return (dispatch, getState) => {
        dispatch(startEventLoading());

        return createEventFromApi(eventTitle, eventStartDate, eventEndDate, eventDescript, account).then(events => {
            dispatch(listEvents(getState().searchText, true, 7, account));
        }).catch(err => {
            console.error('Error creating post', err);
            dispatch(endEventLoading());
        });
    };
};
export function accomplishEvent(id) {
    return (dispatch, getState) => {
        dispatch(startEventLoading());
        console.log('In events-action.accomplishEvent and call accomplishEventFromApiapi');
        return accomplishEventFromApi(id).then(() => {
            dispatch(listEvents(getState().searchText, true, 7, getState().loginForm.account));
        }).catch(err => {
            console.error('Error accomplishing todos', err);
            dispatch(endEventLoading());
        });
    }
}
function toggleUnaccomplishedOnly() {
    return {
        type: '@EVENTS/TOGGLE_UNACCOMPLISHED_ONLY'
    };
}

export function toggleAndList() {
    return (dispatch, getState) => {
        dispatch(toggleUnaccomplishedOnly());
        return dispatch(listEvents(getState().searchText, true, 7));
    }
}
//------------------------
//------------------------
export function toggleForm() {
    return {
        type: '@EVENTSFORM/TOGGLE_FORM'
    };
}
export function toggleTemp() {
    return {
        type: '@EVENTSFORM/TOGGLE_TEMP'
    };
}
export function selectShowDays(showDays) {
    return {
        type: '@EVENTSFORM/SELECT_SHOW_DAYS',
        showDays
    };
};
//----------------------------
//----------------------------
export function account(account) {
     return {
         type: '@LOGIN/ACCOUNT',
         account
     };
};
export function password(password){
     return {
        type: '@LOGIN/PASSWORD',
        password
     };
};
export function changeLoginModal(){
     return {
        type: '@LOGIN/CHANGE_LOGIN_MODAL'
     };
};
export function loginDanger(loginDanger){
    return {
        type: '@LOGIN/LOGIN_DANGER',
        loginDanger
    };
};
//--------------------------------
//--------------------------------
function startUserLoading(){
    return {
         type: '@LOGIN/START_USER_LOADING'
    };
};
function endUserLoading(){
    return{
        type: '@LOGIN/END_EVENT_LOADING'
    };
}
function endGetUser(user){
    console.log('In endGetUser', user);
    return{
        type: '@LOGIN/END_GET_USER',
        user
    };
};
export function createUser(account, password) {
    return (dispatch, getState) => {
        dispatch(startUserLoading());
        return createUserFromApi(account, password).then(user => {
            dispatch(endGetUser(user));
            dispatch(endUserLoading());
        }).catch(err => {
            console.error('Error creating post', err);
            dispatch(endUserLoading());
        });
    };
};
export function clearUser(){
    return{
       type: '@LOGIN/CLEAR_USER'
    };
}
//--------------------------
//--------------------------
export function changeLogoutModal(){
    return{
        type: '@LOGOUT/CHANGE_LOGOUT_MODAL'
    };
};
