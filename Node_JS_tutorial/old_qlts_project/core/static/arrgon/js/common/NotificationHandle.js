$(document).ready(function() {

});

var csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}
function getCSRFTokenValue(){
    return getCookie('csrftoken');
}
function getSessionIdValue(){
    return getCookie('sessionid');
}

function CheckSeenNotification(uuid_user) {
    $.ajaxSetup({
        headers : {
            'Content-Encoding': 'gzip',
            'Vary': 'Accept-Encoding',
            'X-CSRFToken' : getCSRFTokenValue(), // for --> SessionAuthentication
        },
        tryCount : 0,
        retryLimit : 3,
    });

    var self = this;

    $.ajax({
        url: "/notice/SentNotification/seen_notification_by_user/" + uuid_user + "/",
        type: "POST",
        async: false,
        cache: false,
        timeout: 30000,
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#navbarNotificationBadge').text("0");
            if ($('#navbarNotificationBadge').hasClass('d-none') == false) {
                $("#navbarNotificationBadge").addClass('d-none');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            console.log(thrownError);
            if (xhr.textStatus == 'timeout') {
                this.tryCount++;
                if (this.tryCount <= this.retryLimit) {
                    $.ajax(this);
                    return;
                }
                return;
            }
            if(is_debug){
                $.alert({
                    title: 'Error [' + xhr.status + '] ' + thrownError ,
                    content: xhr.responseText,
                });
            }
        },
    });
}

function CheckSeenNotificationAdmin(uuid_user) {
    $.ajaxSetup({
        headers : {
            'Content-Encoding': 'gzip',
            'Vary': 'Accept-Encoding',
            'X-CSRFToken' : getCSRFTokenValue(), // for --> SessionAuthentication
        },
        tryCount : 0,
        retryLimit : 3,
    });

    var self = this;

    $.ajax({
        url: "/notice/SentNotification/seen_notification_by_admin/" + uuid_user + "/",
        type: "POST",
        async: false,
        cache: false,
        timeout: 30000,
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#navbarNotificationBadge').text("0");
            if ($('#navbarNotificationBadge').hasClass('d-none') == false) {
                $("#navbarNotificationBadge").addClass('d-none');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            console.log(thrownError);
            if (xhr.textStatus == 'timeout') {
                this.tryCount++;
                if (this.tryCount <= this.retryLimit) {
                    $.ajax(this);
                    return;
                }
                return;
            }
            if(is_debug){
                $.alert({
                    title: 'Error [' + xhr.status + '] ' + thrownError ,
                    content: xhr.responseText,
                });
            }
        },
    });
}

function DeleteAllNotificationAdmin(uuid_user) {
    $.ajaxSetup({
        headers : {
            'Content-Encoding': 'gzip',
            'Vary': 'Accept-Encoding',
            'X-CSRFToken' : getCSRFTokenValue(), // for --> SessionAuthentication
        },
        tryCount : 0,
        retryLimit : 3,
    });

    var self = this;

    $.ajax({
        url: "/notice/SentNotification/delete_all_notification_by_admin/" + uuid_user + "/",
        type: "POST",
        async: false,
        cache: false,
        timeout: 30000,
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if ($('#drop-down-list-notifications').hasClass('d-none') == false) {
                $("#drop-down-list-notifications").addClass('d-none');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            console.log(thrownError);
            if (xhr.textStatus == 'timeout') {
                this.tryCount++;
                if (this.tryCount <= this.retryLimit) {
                    $.ajax(this);
                    return;
                }
                return;
            }
            if(is_debug){
                $.alert({
                    title: 'Error [' + xhr.status + '] ' + thrownError ,
                    content: xhr.responseText,
                });
            }
        },
    });
}

function DeleteAllNotificationUserHr360(uuid_user) {
    $.ajaxSetup({
        headers : {
            'Content-Encoding': 'gzip',
            'Vary': 'Accept-Encoding',
            'X-CSRFToken' : getCSRFTokenValue(), // for --> SessionAuthentication
        },
        tryCount : 0,
        retryLimit : 3,
    });

    var self = this;

    $.ajax({
        url: "/notice/SentNotification/delete_all_notification_user_hr360/" + uuid_user + "/",
        type: "POST",
        async: false,
        cache: false,
        timeout: 30000,
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if ($('#drop-down-list-notifications').hasClass('d-none') == false) {
                $("#drop-down-list-notifications").addClass('d-none');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            console.log(thrownError);
            if (xhr.textStatus == 'timeout') {
                this.tryCount++;
                if (this.tryCount <= this.retryLimit) {
                    $.ajax(this);
                    return;
                }
                return;
            }
            if(is_debug){
                $.alert({
                    title: 'Error [' + xhr.status + '] ' + thrownError ,
                    content: xhr.responseText,
                });
            }
        },
    });
}