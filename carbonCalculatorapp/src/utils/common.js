var client;
var access_token;

function initClient() {
  client = google.accounts.oauth2.initTokenClient({
    client_id: '1082689466874-tj2ge8acvf94knoqsnag0glho4qguc44.apps.googleusercontent.com',
    scope: 'https://www.googleapis.com/auth/calendar.readonly \
            https://www.googleapis.com/auth/contacts.readonly',
    callback: (tokenResponse) => {
      access_token = tokenResponse.access_token;
    },
  });
}
function getToken() {
  client.requestAccessToken();
}
function revokeToken() {
  google.accounts.oauth2.revoke(access_token, () => {console.log('access token revoked')});
}
function loadCalendar() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://www.googleapis.com/calendar/v3/calendars/primary/events');
  xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
  xhr.send();
}