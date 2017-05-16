const fs = require('fs');
const uuid = require('uuid/v4');
const moment = require('moment');

function listEvents(searchText = '', unaccomplishedOnly = false, days = 0,accountName = '') {
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
            events = events.filter((e) => {
                if (e.accountName === accountName) return true;
                else return false;
            })
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

function createEvent(title, startDate, endDate, description,accountName) {
    return new Promise((resolve, reject) => {
        const newEvent = {
            id: uuid(),
            title: title,
            startDate: startDate,
            endDate: endDate,
            description: description,
			ts: moment().unix(),
            doneTs: null,
            accountName: accountName
        };
        console.log('events :',newEvent);
        listEvents('',false,0,accountName).then(events => {
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

function listAccount(account = '',key = '') {
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
            accounts =  accounts.filter((item) => {
                //todo : check if account exist and set accountfound to true
                if (item.account === account) {
                    accountfound = true;
                    console.log('account found');
                    return true;
                } else {
                    console.log('account not found');
                    return false
                }
            });
            resolve(accountfound);
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
            fs.readFile('data-accounts.json', 'utf8', (err, data) => {
                if (err) {
                    console.log('read account failed');
                    reject(err);
                }
                let returned = {
                    status: 'Uninitialized',
                    account: account
                };
                let accounts = data? JSON.parse(data) : [];
                console.log('account get in createAccount',accountfound);
                    // console.log(typeof accountfound[0]);
                    // console.log(typeof accountfound[0] === 'undefined');
                if (!accountfound){
                    console.log('accountfound is empty');

                    //todo : create an account and write into data-accounts
                    const newAccount = {
                        id: uuid(),
                        account: account,
                        key: key
                    };

                    console.log(returned.status);
                    accounts = [
                        ...accounts,
                        newAccount
                    ];
                    console.log('.JSON : ', accounts);
                    fs.writeFile('data-accounts.json', JSON.stringify(accounts), err => {
                        if (err) {
                            returned.status = 'Create-Account-failed';
                            resolve(returned);
                        } else {
                            returned.status = 'Create-Account-succeed';
                            resolve(returned);
                        }
                    });
                } else {
                    accounts = accounts.filter((ac) => {
                        if (ac.key === key) {
                            console.log('account-key-matched!');
                            return true;
                        } else {
                            console.log('account-key-not-matched!');
                            return false;
                        }
                    });
                    if (typeof accounts[0] !== 'undefined') {
                        returned.status = 'login-success!';
                        resolve(returned);
                    } else {
                        returned.status = 'Wrong-Key!';
                        resolve(returned);
                    }
                }
            });
        });
    });
}


module.exports = {
    listEvents,
    createEvent,
	accomplishEvent,
    createAccount
};
