showNotification();
function showNotification() {
    const notification = new Notification("Message From Naturals Maintainence", {
        body: 'Click Here To Open',
        icon: '/naturalslogo.png'
    })
}
function openPage(sectno) {
    sects = [0, 1, 2, 3, 4]
    for (i = 0; i < sects.length; i++) {
        document.getElementById(i).style.display = 'none';
    }
    document.getElementById(sectno).style.display = 'block';
}
function change(floorid, dep, machine) {
    firebase.database().ref('machine/' + floorid + '/' + dep + '/' + machine).once('value', (snapshot) => {
        const data = snapshot.val();
        console.log('machine/' + floorid + '/' + dep + '/' + machine);
        detailsHTML = '<span><b>Machine Name:</b>&nbsp;<span>' + data.details.name + '</span></span><br><span><b>Average Rating:</b>&nbsp;<span>' + data.details.average + '</span></span><hr>';
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
    firebase.database().ref('machine/' + sessionStorage.getItem('floor') + '/' + sessionStorage.getItem('dep') + '/' + sessionStorage.getItem('machine') + '/daily/' + document.getElementById('getDate').value + '/param').once('value', (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        if (!(data)) {
            document.getElementById('date-param').innerHTML = 'Not Registered For The Selected Date'
        } else {
            document.getElementById('date-param').innerHTML = '';
            for (i = 0; i < data.length; i++) {
                document.getElementById('date-param').innerHTML += data[i].placeholder + ' : ' + data[i].value + '<hr>';
            }
        }
    });
}

function monthChange() {
    firebase.database().ref('machine/' + sessionStorage.getItem('floor') + '/' + sessionStorage.getItem('dep') + '/' + sessionStorage.getItem('machine') + '/monthly/' + document.getElementById('getmonth').value + '/param').once('value', (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        if (!(data)) {
            document.getElementById('month-param').innerHTML = 'Not Registered For The Selected Date'
        } else {
            document.getElementById('month-param').innerHTML = '';
            for (i = 0; i < data.length; i++) {
                document.getElementById('month-param').innerHTML += data[i].placeholder + ' : ' + data[i].value + '<hr>';
            }
        }
    });
}

function weekChange() {
    firebase.database().ref('machine/' + sessionStorage.getItem('floor') + '/' + sessionStorage.getItem('dep') + '/' + sessionStorage.getItem('machine') + '/weekly/' + document.getElementById('getWeek').value + '/param').once('value', (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        if (!(data)) {
            document.getElementById('week-param').innerHTML = 'Not Registered For The Selected Date'
        } else {
            document.getElementById('week-param').innerHTML = '';
            for (i = 0; i < data.length; i++) {
                document.getElementById('week-param').innerHTML += data[i].placeholder + ' : ' + data[i].value + '<hr>';
            }
        }
    });
}
