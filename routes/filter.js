var oauth = require('./oauth');
const {google} = require('googleapis');

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function listEvents(auth, response, session, room, date) {
  const calendar = google.calendar({version: 'v3', auth});

  var option = {
    calendarId: 'primary',
    singleEvents: true,
    orderBy: 'startTime'
  };

  if(session != '' && room != ''){
    var eventName;

    switch(session){
      case '일렉':
          eventName = "🎸";
          break;
      case '베이스':
          eventName = "🪕";
          break;
      case '드럼':
          eventName = "🥁";
          break;
      case '키보드':
          eventName = "🎹";
          break;
      case '보컬':
          eventName = "🎤"
    };

    if(room = "합주실"){
        eventName = `🎼${eventName}`;
    }else if (romm = "대기실"){
        eventName = `🎚️${eventName}`;
    }

    option.q = `${eventName}`;

  }
  else if(session != ''){
    var eventName;

    switch(session){
      case '일렉':
          eventName = "🎸";
          break;
      case '베이스':
          eventName = "🪕";
          break;
      case '드럼':
          eventName = "🥁";
          break;
      case '키보드':
          eventName = "🎹";
          break;
      case '보컬':
          eventName = "🎤"
    };
    option.q = `*${eventName}`;
  }else if(room != ''){
    var eventName;
    if(room = "합주실"){
      eventName = "🎼";
    }else if (romm = "대기실"){
      colorID = 1;
      eventName = "🎚️";
    }
    option.q = `${eventName}*`;
  }

  
  console.log(`date: ${date}`);
  
  var min, max;  
  if (date == ''){
    min = new Date(Date.now());
    max = new Date(Date.now() + (3600000 * 24));
  }else{
    min = date['value'];
    max = new Date(min + (3600000 * 24))
  }

  console.log(`min: ${min}`);
  console.log(`max: ${max}`);

  option.timeMin = min;
  option.timeMax = max;
  option.timeZone = "Asia/Seoul"

  console.log(option.q);

  const res = await calendar.events.list(option);

  /*
  const res = await calendar.events.list({
    calendarId: 'primary',
    maxResults: 10,
    timeMin: new Date().toISOString(),//시작일자
    //timeMax: new Date().toISOString(),//종료일자
    singleEvents: true,
    orderBy: 'startTime',
  });
  */

  const events = res.data.items;
  if (!events || events.length === 0) {
    console.log('No upcoming events found.');
    response.json({"message":"No upcoming events found"});
    return;
  }

  console.log(`Events at ${res.timeMin} ~ ${res.timeMax}`);
  
  
  var eventList = [];
  events.map((event, i) => {
    const start = event.start.dateTime || event.start.date;
    eventList.push({"start":start, "summary":event.summary});
  });
  resBody = {
    "response": {
      "template": {
        "outputs": eventList
      },
      "version": "2.0" 
    }
  }

  response.json(resBody);
}




const routerName = '/test'
const router = require('express').Router();



router.post('/filter', function(req, res){
  var input_session;
  var input_room;
  ///*
  const params = req.body.action["params"] || {};
  input_session = params['check_session'] || '';
  input_room = params['check_room'] || '';
  input_date = params['check_date'] || '';


  console.log(`input_session: ${input_session}`);
  console.log(`input_room: ${input_room}`);
  //*/

  /*
  input_session = '보컬';
  input_room = '합주실';
  input_date = ''
  */


  oauth.authorize().then((auth) =>{
    client = auth;
    listEvents(client, res, input_session, input_room, input_date);
  }).catch(console.error);
})

module.exports = router;