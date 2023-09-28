
$(document).ready(function() {
    var active_mainmenu = "#" + $("#current-active-menu-id").text();
    if (active_mainmenu != "#"){
        //console.log(active_mainmenu);
        $(active_mainmenu).focus();
        $(active_mainmenu).addClass("show");
    };
    $(".tnd-nav-item").click(function(){
        $(".nav-item").removeClass('active');
        $(this).addClass('active');
    });

    $(".tnd-nav-link").click(function(){
        $(".nav-link").removeClass('active');
        $(this).addClass('active');
    });
} );

var PERM_ACCEPT = false;

$('.tnd-tooltip').hover(function(){
    $(this).tooltip('toggle');
});

$('.alert').alert();


// Hàm hiển thị Alert trên TOp menu
function t_alert(alert){
    var level = alert.level.charAt(0).toUpperCase() + alert.level.slice(1);
    console.log(level);
    var message = alert.message.charAt(0).toUpperCase() + alert.message.slice(1);
    console.log(message);
    var current_alerts = $("#all-alert-messages-id").children(".alert-dismissible");
    if (current_alerts.length > 3){
        $("#all-alert-messages-id").empty();
    }
    $("#all-alert-messages-id").prepend(`
            <div class="alert alert-` + level.toLowerCase() + ` alert-dismissible fade show">
              <strong>` + level + `:</strong>    "` + message + `"
              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
    `);
}

function sendAlert(message, level){
    $("#all-alert-messages-id").empty();
    $("#all-alert-messages-id").append(`
    <div class="alert alert-` + level + ` alert-dismissible fade show" role="alert">
      <strong>` + level + `!</strong> ` + message +`
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
                    `);
    $(".alert").alert();

}

function send_contact_message() {

    var full_name = $("#full-name").val();
    console.log(full_name);
    var email = $("#email").val();
    console.log(email);
    var message = $("#comment").val();
    console.log(message);
    var contact_api_path = '/contact/api/';
    console.log(contact_api_path);

    $.post(contact_api_path,
        {
           full_name : full_name,
           email : email,
           message : message,
        }, function(data) {
                console.log(data);
                var status = data['status'];
                var result = data['msg'];
                if (status == "success"){
                    $("#contact-form-id").hide();
                    $("#contact-result-info-id").text(result);
                    $("#contact-result-info-id").show();
                }
            else{
                    $("#contact-result-info-id").text(status + ": " + msg);
                    $("#contact-result-info-id").show();
                }
                    $('html, body').animate({
                                        scrollTop: $("#contact-result-info-id").offset().top
                                    }, 2000);
        });
}

// Request Show Notification permision

function notifyMe(title, message, icon_url) {
    if (!window.Notification) {
        console.log('Browser does not support notifications.');
    } else {
        // check if permission is already granted
        if (Notification.permission === 'granted') {
            // show notification here
            var notify = new Notification(title, {
                body: message,
                icon: icon_url,
            });
        } else {
            // request permission from user
            Notification.requestPermission().then(function (p) {
                if (p === 'granted') {
                    // show notification here
                    var notify = new Notification(title, {
                        body: message,
                        icon: icon_url,
                    });
                } else {
                    console.log('User blocked notifications.');
                }
            }).catch(function (err) {
                console.error(err);
            });
        }
    }
}

function selectElement(id, valueToSelect) {
    let element = document.getElementById(id);
    element.value = valueToSelect;
}

// Nếu resized screen nhỏ hơn 600 thì remove class row; nếu lớn hơn thì add vào
$(window).bind("resize", function () {
    ///console.log($(this).width());
    if ($(this).width() < 600) {
        $('.row-mobile').removeClass('row');
        // Ẩn sidebar
        // $('#accordionSidebar').addClass('d-none');
        //$("body").toggleClass("sidebar-toggled");
        //$(".sidebar").toggleClass("toggled");
        //if ($(".sidebar").hasClass("toggled")) {
        //  $('.sidebar .collapse').collapse('hide');
        //};
    } else {
        $('.row-mobile').addClass('row');
        // $('#accordionSidebar').removeClass('d-none');
    }
}).trigger('resize');

window.onload = function() {

//    var interval = window.setInterval(function () {
//        $(".alert-dismissible").hide();
//    }, 15000);
//    setTimeout(function() {
//        $(".alert-dismissible").hide();
//    }, 5000);
};

$(document).ready(function() {

    //manuall close the modal
    $(document).on('click', '#plans .close', function(){
        window.location.reload();

    });


    //This code is for navigating URL in dashboard
    var url_family = {
        'nav-face-api' : 'v-face-auth-api',
        'nav-face-images' : 'v-face-auth-api',
        'nav-basic-info': 'v-profile',
        'nav-change-password': 'v-profile'
    };


  let url = location.href.replace(/\/$/, "");

  if (location.hash) {
    const hash = url.split("#");

    //check if the tab is a child of another tab, if so, activate parent tab first
    if (typeof url_family[hash[1]] !== 'undefined')
    {
        console.log('activating parent');
        var parent_hash = url_family[hash[1]];
        $('a[href="#'+parent_hash+'"]').tab("show");
    }

    $('a[href="#'+hash[1]+'"]').tab("show");
    //url = location.href.replace(/\/#/, "#");
    history.replaceState(null, null, url);
    setTimeout(() => {
      $(window).scrollTop(0);
    }, 400);
  }

  $('a[data-toggle="tab"]').on("click", function() {
    let newUrl;
    const hash = $(this).attr("href");

    var first_url_part = url.split("#")[0];

    if (first_url_part[first_url_part.length - 1] !== '/')
      first_url_part += '/';

    newUrl = first_url_part + hash;
    newUrl += "/";
    history.replaceState(null, null, newUrl);
  });
});