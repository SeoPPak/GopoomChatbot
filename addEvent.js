const {google} = require('googleapis');
var {authorize} = require('./index');

async function addEvent(auth, session, room, startTime, endTime){
    const calendar = google.calendar({version: 'v3', auth});
    
    console.log(auth);

    /*
    session = '일렉';
    room = '합주실';
    
    startTime = Date.now();
    endTime = Date.now() + 7200000;
    console.log(`session: ${session}`);
    console.log(`room: ${room}`);
    var startTimeUTC = new Date(startTime);
    var endTimeUTC = new Date(endTime);
    */

    var colorID;
    var eventName;
    
    switch(session){
        case '일렉':
            colorID = 11
            eventName = "🎸";
            break;
        case '베이스':
            colorID = 7
            eventName = "🪕";
            break;
        case '드럼':
            colorID = 9
            eventName = "🥁";
            break;
        case '키보드':
            colorID = 2
            eventName = "🎹";
            break;
        case '보컬':
            colorID = 3
            eventName = "🎤"
    };

    var add;
    if(room = "합주실"){
        add = "🎼";
    }else{
        colorID = 1;
        add = "🎚️";
    }
    eventName = add + eventName;

    var event = {
        "summary": eventName,
        "start": {
            "dateTime": startTimeUTC,
            "timeZone": "Asia/Seoul"
        },
        "end" : {
            "dateTime": endTimeUTC,
            "timeZone": "Asia/Seoul"
        },
        "colorId": colorID
    };

    var res = await calendar.events.insert({
        "calendarId": 'primary',
        "resource" : event
        }
    );
    //console.log(res);
}


module.exports = apiRouter => {
    apiRouoter.post('/addEvent', function(req, res){
        var input_session;
        var input_room;
        var input_sT;
        var input_eT;

        /*
        input_session = '일렉';
        input_room = '합주실';
        input_sT = Date.now();
        input_eT = Date.now() + 7200000;
        */

        ////*
        const params = req.body.action['params'] || {}
        const input_session = params['book_session'] || ''
        const input_room = params['book_room'] || ''
        const input_sT = params['book_startDateTime'] || ''
        const input_eT = params['book_endDateTime'] || ''
        //*/
        
        var client;
        authorize().then((auth)=> {
            client = auth;
            addEvent(client, input_session, input_room, input_sT, input_eT)
        }).catch(console.error);
    })
}