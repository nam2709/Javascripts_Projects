$(document).ready(function() {
    if (localStorage.getItem("crr_user_info") == null && localStorage.getItem("crr_user_info") == undefined && localStorage.getItem("crr_user_info") == '') BindUserInformation();
    else GetUserInformation();
    var crr_path = window.location.pathname;
    if (crr_path == "/getstart/") {
        ClearUserInformation();
    }
});


function GetUserInformation() {
    var obj = new UserProfileMainManagement();
    var results = obj.tSearchAllObjApi(1, 'username=' + $("#txtLoginUsername").val(), 'filter');
    obj.callAjax.then(function(data) {
        if (results.length > 0) {
            localStorage.setItem("crr_user_info", JSON.stringify(results[0]));
            localStorage.setItem("avatar_url", results[0]['avatar']);
            BindUserInformation();
        }
    })


}

function ClearUserInformation() {
    localStorage.removeItem("crr_user_info");
    localStorage.removeItem("avatar_url");

}

function checkFileExist(urlToFile) {
    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', urlToFile, false);
    xhr.send();

    if (xhr.status == "404") {
        return false;
    } else {
        return true;
    }
}


function BindAvatar() {
    var img = localStorage.getItem("avatar_url");
    if (img != undefined && img != "" && img != null) {


        // Calling function
        // set the path to check
        // var result = checkFileExist(window.location.origin + img);
        var result = checkFileExist(img);

        if (result == true) {
            $(".imgAvatar").attr("src", img);
            // alert('yay, file exists!');
        } else {
            // alert('file does not exist!');
        }
    }
}


function BindUserInformation() {
    BindAvatar();
    // var user = JSON.parse(localStorage.getItem("crr_user_info"));
    // if (user != "" && user != undefined) {
    //     us
    // }

}