function get_alert(session_id) {
    //console.log('session_id = ' + session_id);
    var get_data = {
        'session_key': session_id,
    };
    //console.log(get_data);
    var delay = 30000;
    $.ajax({
        url: '/api/v1/alert/alertmessage/all/',
        type: 'GET',
        //timeout: 2000,
        data: get_data,
        dataType: 'json',
        success: function (data) {
            console.log(data);
            if (data.hasOwnProperty('count') != false){
                return
            }
            var alerts_number = data['data']['count'];
            //console.log('alerts_number = ' + alerts_number);
            var alerts = data['data']['results'];
            //console.log('alerts = ' + alerts);
            //console.log('alerts.length = ' + alerts.length);
            $("#alert-list-top-id").empty();
            $("#alert-count-id").text(data['data']['unread']);
            if (alerts){
                for (i = 0; i < alerts.length; i++){
                    //console.log('alerts[' + i + '] = ' + alerts[i].name);
                    if (alerts[i].read == true){
                        $("#alert-list-top-id").append( `
                                <a class="dropdown-item d-flex align-items-center" href="` + alerts[i].link + `">
                                  <div class="mr-3">
                                    <div class="icon-circle bg-primary">
                                      <i class="fas fa-file-alt text-white"></i>
                                    </div>
                                  </div>
                                  <div>
                                    <div class="small text-gray-500">` + alerts[i].message + `</div>
                                    ` + alerts[i].message + `
                                  </div>
                                </a>
                        `);
                    }
                    else{
                        $("#alert-list-top-id").append( `
                                <a class="dropdown-item d-flex align-items-center" href="` + alerts[i].link + `">
                                  <div class="mr-3">
                                    <div class="icon-circle bg-success">
                                      <i class="fas fa-donate text-white"></i>
                                    </div>
                                  </div>
                                  <div>
                                    <div class="small text-gray-500">` + alerts[i].message + `</div>
                                    <span class="font-weight-bold">` + alerts[i].message + `</span>

                                  </div>
                                </a>
                        `);
                    }
                }
                if (alerts.length > 0) {
                    notifyMe("OHEEN.COM", alerts[alerts.length - 1].message, 'https://image.flaticon.com/icons/svg/2489/2489081.svg');
                }
            }

            //var browser_id = data['data']['browser-id'];
            //console.log(browser_id);
            //var url = data['data']['url'];
            //console.log(url);
            //$("#picFrameImg-" + browser_id).attr("src", url);
            setTimeout(function() {
              //get_alert(session_id);
            }, delay);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log("Status: " + textStatus + " --> Error: " + errorThrown);
            setTimeout(function () {
                //get_alert(session_id);
            }, delay);
        }

    });
    return false;
}

$( document ).ready(function() {
    var session_id = $("#current-session-key-id").text();
    //console.log('session_id = ' + session_id );
    //get_alert(session_id);
});

function get_message(session_id) {
    //console.log('Get Message: session_id = ' + session_id);
    var get_data = {
        'session_key': session_id,
    };
    //console.log(get_data);
    var delay = 30000;
    $.ajax({
        url: '/Message/api/get-message/',
        type: 'GET',
        //timeout: 2000,
        data: get_data,
        dataType: 'json',
        success: function (data) {
            console.log(data);
            var messages_number = data['data']['count'];
            //console.log('messages_number = ' + messages_number);
            var messages = data['data']['messages'];
            //console.log('alerts = ' + alerts);
            //console.log('alerts.length = ' + alerts.length);
            $("#messages-list-top-id").empty();
            $("#message-count-id").text(data['data']['unread']);
            if (messages){
                for (i = 0; i < messages.length; i++) {
                    if (messages[i].read == true) {
                        $("#messages-list-top-id").append( `
                                <a class="dropdown-item d-flex align-items-center" href="` + messages[i].link + `">
                                    <div class="mr-3">
                                        <div class="icon-circle bg-primary">
                                            <i class="fas fa-file-alt text-white"></i>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="small text-gray-500">` + messages[i].message + `</div>
                                    ` + messages[i].message + `
                                    </div>
                                </a>
                        `)
                        ;
                    }
                    else {
                        $("#messages-list-top-id").append( `
                                <a class="dropdown-item d-flex align-items-center" href="` + messages[i].link + `">
                                    <div class="mr-3">
                                        <div class="icon-circle bg-success">
                                            <i class="fas fa-donate text-white"></i>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="small text-gray-500">` + messages[i].message + `</div>
                                        <span class="font-weight-bold">` + messages[i].message + `</span>

                                    </div>
                                </a>
                        `)
                        ;
                    }
                };
                if (messages.length > 0){
                    notifyMe("OHEEN.COM", messages[messages.length - 1].message, 'https://image.flaticon.com/icons/svg/2489/2489081.svg');
                }
            }

            //var browser_id = data['data']['browser-id'];
            //console.log(browser_id);
            //var url = data['data']['url'];
            //console.log(url);
            //$("#picFrameImg-" + browser_id).attr("src", url);
            setTimeout(function () {
                //get_message(session_id);
            }, delay);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log("Status: " + textStatus + " --> Error: " + errorThrown);
            setTimeout(function () {
                //get_message(session_id);
            }, delay);
        }

    });
    return false;
}

function uploadComplete() {
}


jQuery(function () {

    if (true) {
        var try_count = 0;
        var interval = window.setInterval(function () {
            //try_count++;
            var session_id = $("#current-session-key-id").text();
            if (session_id != ""){
                get_message(session_id);
                get_alert(session_id);

                if (try_count > 10)
                    clearInterval(interval);
            }
        }, 50000);
    }


});

$( document ).ready(function() {
    var session_id = $("#current-session-key-id").text();
    console.log('session_id = ' + session_id );
    //get_message(session_id);
});