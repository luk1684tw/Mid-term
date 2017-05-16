const fs = require('fs');
const uuid = require('uuid/v4');
const moment = require('moment');

function listEvents(searchText = '', unaccomplishedOnly = false, days = 0) {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync('data-events.json')) {
            fs.writeFileSync('data-events.json', '');
        }

        fs.readFile('data-events.json', 'utf8', (err, data) => {
            if (err){
                console.log('readFile failed');
                reject(err);
            }
            let events = data ? JSON.parse(data) : [];

            if (unaccomplishedOnly) {
                events = events.filter(e => {
                    return !e.doneTs;
                });
            }
            if (days) {
                events = events.filter(e => {
                    const time = Math.round((moment(e.startDate,'YYYY-MM-DD').unix() - moment().unix())/86400);
                    console.log('Time = ', time);
                    if ((time <= days) && (time >= -1)) {
                        console.log('In assigned range!');
                        return true;
                    }else {
                        console.log('Not in assigned range!');
                        return false;
                    }
                });
            }
            if (searchText) {
                events = events.filter(e => {
                    return ((e.description.toLowerCase().indexOf(searchText.toLowerCase()) !== -1) || (e.title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1));
                });
            }
            resolve(events);
        });
    });
}

function createEvent(title, startDate, endDate, description) {
    return new Promise((resolve, reject) => {
        const newEvent = {
            id: uuid(),
            title: title,
            startDate: startDate,
            endDate: endDate,
            description: description,
			ts: moment().unix(),
            doneTs: null
        };
        console.log('events :',newEvent);
        listEvents().then(events => {
            console.log('in listEvents().then');
            events = [
                ...events,
                newEvent
            ];
            console.log(events);
            fs.writeFile('data-events.json', JSON.stringify(events), err => {
                if (err)
                    reject(err);
                resolve(newEvent);
            });
        }).catch((err) => {
            console.log('in listEvents().catch');
            console.error(err);
        })
    });
}

function accomplishEvent(id) {
    return new Promise((resolve, reject) => {
        // let accomplishTodoPost=null;
        listEvents().then(events => {
            events.map(p => {
                console.log(`P.ID : ${p.id}`);
                if (p.id === id) {
                    // accomplishTodoPost=p;
                    p.doneTs = moment().unix();
                }
                return p;
            })

            fs.writeFile('data-events.json', JSON.stringify(events), err => {
                if (err)
                    reject(err);

                resolve(events);
            });
        });
    });
}

function listAccount(account,key) {
    return new Promise((resolve,reject) => {
        if (!fs.existsSync('data-accounts.json')) {
            fs.writeFileSync('data-accounts.json', '');
        }
        fs.readFile('data-accounts.json', 'utf8', (err, data) => {
            if (err) {
                console.log('read account failed');
                reject(err);
            }
            let accountfound = false;
            let accounts = data ? JSON.parse(data) : [] ;
            let status = 'account-not-found';
            if(account){
              accounts =  accounts.filter((item) => {
                  //todo : check if account exist and set accountfound to true
                  if (item.account === account) {
                      accountfound = true;
                      console.log('account found');
                      return true;
                  } else {
                      accountfound = false;
                      console.log('account not found');
                      return false
                  }
              });
            }

            resolve(accounts);
        })
    })

}
function createAccount(account,key) {
    return new Promise((resolve,reject) => {
        const newAccount = {
            id: uuid(),
            account: account,
            key: key
        };
        listAccount(account,key).then(accountfound => {
            if(typeof accountfound[0] !== 'undefined'){
              if(key){
                accountfound =  accountfound.filter((item) => {
                    //todo : check if account exist and set accountfound to true
                    if (item.key === key) {
                        return true;
                    } else {
                        return false
                    }
                });
              }
              if(typeof accountfound[0] !== 'undefined'){
                 let status = 'Success Login!!!';
                 resolve(status);
              }else{
                 let status
              }
            }else {
              accountfound = [
                 ...accountfound,
                 newAccount
              ];
              fs.writeFile('data-events.json', JSON.stringify(accountfound), err => {
                  if (err)
                      reject(err);
                  resolve(newAccount);
              });
            }
        });
    });
}


module.exports = {
    listEvents,
    createEvent,
	accomplishEvent,
    createAccount
};
