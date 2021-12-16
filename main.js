email = "shivampai2079@gmail.com";
randNO = Math.floor(Math.random()*999);
document.getElementById('mid').value = randNO;
function showNotification() {
    const notification = new Notification("Message From Naturals Maintainence", {
        body: 'Click Here To Open',
        icon: '/naturalslogo.png'
    })
}
function openPage(sectno) {
    sects = [0, 1, 2, 3, 4,5]
    for (i = 0; i < sects.length; i++) {
        document.getElementById(i).style.display = 'none';
    }
    document.getElementById(sectno).style.display = 'block';
}
function change(floorid, dep, machine) {
    firebase.database().ref('machine/' + floorid + '/' + dep + '/' + machine).once('value', (snapshot) => {
        const data = snapshot.val();
        console.log('machine/' + floorid + '/' + dep + '/' + machine);
        detailsHTML = '<span><b>Machine Name:</b>&nbsp;<span>' + data.details.name + '</span></span><hr>';
        detailsHTML += '<button class="button" onclick="openPage(2)">Rate Machine</button><button class="button" onclick="openPage(3)">Edit Details</button><button class="button" onclick="openPage(4)">Get Ratings</button>'
        document.getElementById('details').innerHTML = detailsHTML;
    });
    sessionStorage.setItem('floor', floorid);
    sessionStorage.setItem('dep', dep);
    sessionStorage.setItem('machine', machine);
}
function notification() {
    Notification.requestPermission().then();
    if (Notification.permission == 'denied') {
        Notification.requestPermission().then();
    }
}
function dateChange() {
    firebase.database().ref('machine/' + sessionStorage.getItem('floor') + '/' + sessionStorage.getItem('dep') + '/' + sessionStorage.getItem('machine') + '/daily/' + document.getElementById('getDate').value).once('value', (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        if (!(data)) {
            document.getElementById('date-param').innerHTML = 'Not Registered For The Selected Date'
        } else {
            document.getElementById('date-param').innerHTML = '';
            document.getElementById('day-time').innerHTML = 'Submitted At : '+data.time;
            for (i = 0; i < data.param.length; i++) {
                document.getElementById('date-param').innerHTML += data.param[i].placeholder + ' : ' + data.param[i].value + '<hr>';
            }
        }
    });
}

function monthChange() {
    firebase.database().ref('machine/' + sessionStorage.getItem('floor') + '/' + sessionStorage.getItem('dep') + '/' + sessionStorage.getItem('machine') + '/monthly/' + document.getElementById('getmonth').value).once('value', (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        if (!(data)) {
            document.getElementById('month-param').innerHTML = 'Not Registered For The Selected Date'
        } else {
            document.getElementById('month-param').innerHTML = '';
            document.getElementById('month-time').innerHTML = 'Submitted At : '+data.time;
            for (i = 0; i < data.param.length; i++) {
                document.getElementById('month-param').innerHTML += data.param[i].placeholder + ' : ' + data.param[i].value + '<hr>';
            }
        }
    });
}

function weekChange() {
    firebase.database().ref('machine/' + sessionStorage.getItem('floor') + '/' + sessionStorage.getItem('dep') + '/' + sessionStorage.getItem('machine') + '/weekly/' + document.getElementById('getWeek').value).once('value', (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        if (!(data)) {
            document.getElementById('week-param').innerHTML = 'Not Registered For The Selected Date'
        } else {
            document.getElementById('week-param').innerHTML = '';
            document.getElementById('week-time').innerHTML = 'Submitted At : '+data.time;
            for (i = 0; i < data.param.length; i++) {
                document.getElementById('week-param').innerHTML += data.param[i].placeholder + ' : ' + data.param[i].value + '<hr>';
            }
        }
    });
}
paramlist = 0;
function showNewParam() {
    firebase.database().ref('machine/' + sessionStorage.getItem('floor') + '/' + sessionStorage.getItem('dep') + '/' + sessionStorage.getItem('machine') + '/details/params/daily').once('value', (snapshot) => {
        const data = snapshot.val();
        var params = document.getElementById('new-daily-param');
        params.innerHTML = '';
        paramlist = data.length;
        for (i = 0; i < data.length; i++) {
            params.innerHTML += '<input type="text" id="param-input-' + i + '" placeholder="' + data[i] + '">';
        }

    });
}
function showNewParamMonth() {
    firebase.database().ref('machine/' + sessionStorage.getItem('floor') + '/' + sessionStorage.getItem('dep') + '/' + sessionStorage.getItem('machine') + '/details/params/monthly').once('value', (snapshot) => {
        const data = snapshot.val();
        var params = document.getElementById('new-monthly-param');
        params.innerHTML = '';
        paramlist = data.length;
        for (i = 0; i < data.length; i++) {
            params.innerHTML += '<input type="text" id="param-month-input-' + i + '" placeholder="' + data[i] + '">';
        }

    });
}

function showNewParamWeekly() {
    firebase.database().ref('machine/' + sessionStorage.getItem('floor') + '/' + sessionStorage.getItem('dep') + '/' + sessionStorage.getItem('machine') + '/details/params/weekly').once('value', (snapshot) => {
        const data = snapshot.val();
        var params = document.getElementById('new-weekly-param');
        params.innerHTML = '';
        paramlist = data.length;
        for (i = 0; i < data.length; i++) {
            params.innerHTML += '<input type="text" id="param-week-input-' + i + '" placeholder="' + data[i] + '">';
        }

    });
}

function submitNewDaily() {
    submitParam = [];
    for (i = 0; i < paramlist; i++) {
        submitParam.push({ value: document.getElementById('param-input-' + i).value, placeholder: document.getElementById('param-input-' + i).placeholder });
    }
    console.log(submitParam);
    firebase.database().ref('machine/' + sessionStorage.getItem('floor') + '/' + sessionStorage.getItem('dep') + '/' + sessionStorage.getItem('machine') + '/daily/' + document.getElementById('getDate2').value).set({
        param: submitParam,
        time: document.getElementById('getTimeInDate').value
    });
    firebase.auth().sendPasswordResetEmail(email)
  .then(() => {
      openPage(1);
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage);
    // ..
  }); 

}
function submitNewMonthly() {
    submitParam = [];
    for (i = 0; i < paramlist; i++) {
        submitParam.push({ value: document.getElementById('param-month-input-' + i).value, placeholder: document.getElementById('param-month-input-' + i).placeholder });
    }
    console.log(submitParam);
    firebase.database().ref('machine/' + sessionStorage.getItem('floor') + '/' + sessionStorage.getItem('dep') + '/' + sessionStorage.getItem('machine') + '/monthly/' + document.getElementById('getMonth2').value).set({
        param: submitParam,
        time: document.getElementById('getDateTimeMonth').value
    });
    openPage(1);
}
function submitNewWeekly() {
    submitParam = [];
    for (i = 0; i < paramlist; i++) {
        submitParam.push({ value: document.getElementById('param-week-input-' + i).value, placeholder: document.getElementById('param-week-input-' + i).placeholder });
    }
    console.log(submitParam);
    firebase.database().ref('machine/' + sessionStorage.getItem('floor') + '/' + sessionStorage.getItem('dep') + '/' + sessionStorage.getItem('machine') + '/weekly/' + document.getElementById('getWeek2').value).set({
        param: submitParam,
        time: document.getElementById('getDateTimeWeek').value
    });
    openPage(1);
}
function updateDetails(){
    firebase.database().ref('machine/' + sessionStorage.getItem('floor') + '/' + sessionStorage.getItem('dep') + '/' + sessionStorage.getItem('machine') + '/details/name').set(document.getElementById('changedetails-machine-name').value);
    openPage(1);
    change(sessionStorage.getItem('floor') , sessionStorage.getItem('dep') , sessionStorage.getItem('machine'))
}
function newMachine(){
firebase.database().ref('machine/' + document.getElementById('new-floor').value + '/'+document.getElementById('selector-newdid').value+'/'+document.getElementById('mid').value+ '/details').set({
    params:{daily:newMachineParam,weekly:newWeeklyParam,monthly:newMonthlyParam},
    name:document.getElementById('screen5-machine-name').value
})
}
newMachineParam = [];
function submitNewParam(newParam){
    document.getElementById('list').innerHTML += newParam + '<hr>';
    newMachineParam.push(newParam)
    document.getElementById('screen5-machine-newparam').value = '';
}
newWeeklyParam = [];
function submitNewWeekParam(newParam){
    document.getElementById('week-list').innerHTML += newParam + '<hr>';
    newWeeklyParam.push(newParam)
    document.getElementById('screen5-week-machine-newparam').value = '';
}
newMonthlyParam = [];
function submitNewMonthParam(newParam){
    document.getElementById('month-list').innerHTML += newParam + '<hr>';
    newMonthlyParam.push(newParam)
    document.getElementById('screen5-month-machine-newparam').value = '';
}