import axios from 'axios';

// Develop server URL
const eventBaseUrl = 'http://localhost:8080/api';

export function listEvents(unaccomplishedOnly, searchText, showDays, accountName) {

    let url = `${eventBaseUrl}/events`;
    if (searchText)
        url += `?searchText=${searchText}`;
    if (unaccomplishedOnly)
        url += `?accomplishTodo=${unaccomplishedOnly}`;
    if (unaccomplishedOnly && searchText)
        url = `${eventBaseUrl}/events?accomplishTodo=${unaccomplishedOnly}&searchText=${searchText}`;
    if (!unaccomplishedOnly && !searchText)
    	url += `?showDays=${showDays}&accountName=${accountName}`;
    else
        url += `&showDays=${showDays}&accountName=${accountName}`;

    console.log(url);
    return axios.get(url).then(function(res) {
     if (res.status !== 200)
        throw new Error(`Unexpected response code: ${res.status}`);
        console.log('ListEvent in api received :');
        console.log(res.data);
        return res.data;
    });
}
export function createEvent(eventTitle, eventStartDate, eventEndDate, eventDescript,accountName) {
    let url = `${eventBaseUrl}/events`;
    console.log('In api/createEvent,accountName:', accountName);
    return axios.post(url, {
        eventTitle,
        eventStartDate,
        eventEndDate,
        eventDescript,
        accountName
    }).then(function(res) {
        console.log('client recieved:');
        console.log(res.data);
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}
export function accomplishEvent(id) {
	let url = `${eventBaseUrl}/events/${id}`;

    // console.log(`Making POST request to: ${url}`);
	console.log(`In accomplishEvent : ${url}`);
	return axios.post(url).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}
export function createUser(account, password) {
   let url = `${eventBaseUrl}/user`;
   console.log('In API: account = ', account);
   console.log('In API: password = ', password);
   return axios.post(url, {
       account,
       password,
   }).then(function(res) {
       console.log('client recieved:');
       console.log(res.data);
       if (res.status !== 200)
           throw new Error(`Unexpected response code: ${res.status}`);

       return res.data;
   });
}
