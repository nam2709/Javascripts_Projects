
/**
 * Created by Tamnd on 9/14/21.
 * Copyright: ©2020 Tamnd <ductambka@gmail.com>
 * App: Website
 */

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

function makeid(length=24) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() *
 charactersLength));
   }
   return result;
}

function genInteger(length=4) {
    var result           = '';
    var characters       = '0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() *
 charactersLength));
   }
   return result;
}

function randomDate(start=new Date(2020, 0, 1), end=new Date(), startHour=0, endHour=24) {
  var date = new Date(+start + Math.random() * (end - start));
  var hour = startHour + Math.random() * (endHour - startHour) | 0;
  date.setHours(hour);
  return date;
}

// UUIDv4 Generator
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Boolean Gemerator
function genBoolean(){
    var random_boolean = Math.random() < 0.5;
    return random_boolean;
}

// Get random select from option by ID:
function genRandomSelect(optionId){
    try{
        var select = document.getElementById(optionId);
        var items = select.getElementsByTagName('option');
        var vals = [];
        for (var i = 0; i < items.length; i++){
            if (items[i].value != null){
                vals.push(items[i].value);
            }
        }
        console.log('vals = ', vals);

        var index = vals[Math.floor(Math.random() * items.length)];
        select.value = index;

        // Fill file label:
        var labels = document.querySelectorAll('[for=optionId]');
        for (var i = 0; i < labels.length; i++){
           labels[i].val(index);
        }
        return index;
    }
    catch (err) {
        console.log(err);
        return null;
    }
}

            
var genAlertMessageWebsite_FIELDS = [
    
    ];
function genAlertMessageWebsite(){
    return {
    
    }
}

var AlertMessageWebsite_CACHE = [];

class AlertMessageWebsite{
    // ########## Init Objects ##############
    constructor(data=null){
        if (data != null){
            if (data.hasOwnProperty('id')){
                this.id = data.id;
            }
            else{
                this.id = null;
            }
    
            this.__app_name__ = "Website";
    
            this.__model_name__ = "AlertMessage";
    
        }
        else{
    
            if ($("#idAlertMessageWebsiteInputId").length > 0){
                this.id = $("#idAlertMessageWebsiteInputId").val();
            }
            else{
                // this.id = null;
            }
            
        }
    }
    
    // ########## [FILL FORM] Objects to FRONT END ##############
    tFillForm(){
        var self = this;
                

        return self;
    }
                
    // ########## [CREATE] post Objects to REST API --> return object if success ##############
    tCreatePostApi(){
        $.ajaxSetup({
            headers : {
                'CSRFToken' : getCSRFTokenValue(),
                'X-CSRFToken' : getCSRFTokenValue(), // for --> SessionAuthentication
            },
            tryCount : 0,
            retryLimit : 3,
        });

        var self = this;

        $.ajax({
            url: AlertMessageWebsite_URL,
            type: "POST",
            async: false,
            cache: false,
            timeout: 30000,

            //data: JSON.stringify({data:"test"}),
            //data: JSON.stringify(self),
            data: JSON.stringify(self),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                    self = new AlertMessageWebsite(data);
                    $.confirm({
                        title: 'Confirm!',
                        content: 'Save Success, Continue!',
                        buttons: {
                            confirm: function () {
                                // : Clear form to create new
                                $.alert('Continue!');
                            },
                            cancel: function () {
                                // $.alert('Canceled!');
                                $(location).prop('href', "/Workspace/AlertMessage/detail/" + self.uuid + "/");
                            },
                            somethingElse: {
                                text: 'Something else',
                                btnClass: 'btn-blue',
                                keys: ['enter', 'shift'],
                                action: function(){
                                    $.alert('Something else?');
                                }
                            }
                        }
                    });
                    // self.tFillForm();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status);
                console.log(thrownError);
                if (xhr.textStatus == 'timeout') {
                    this.tryCount++;
                    if (this.tryCount <= this.retryLimit) {
                        //try again
                        $.ajax(this);
                        return;
                    }
                    return;
                }
                $.alert({
                    title: 'Error [' + xhr.status + '] ' + thrownError ,
                    content: xhr.responseText,
                });
            },
        });
        return self;
    }
                
    // ########## [UPDATE] post Objects to REST API --> return object if success ##############
    tUpdatePostApi(){
        $.ajaxSetup({
            headers : {
                'CSRFToken' : getCSRFTokenValue(),
                'X-CSRFToken' : getCSRFTokenValue(), // for --> SessionAuthentication
            },
            tryCount : 0,
            retryLimit : 3,

        });
        var self = this;
        var formData = new FormData($('#alertmessageWebsiteFormId')[0]);
        var file_eles = $(".alertmessage-website");
        for (var i = 0; i < file_eles.length; i++) {
            console.log('file_eles[i] = ', file_eles[i]);
            var files = file_eles[i].files;
            // Check file selected or not
            if(files.length > 0 ) {
                formData.append(file_eles[i].getAttribute('name'), files[0]);
            }
        }
        $.ajax({
            url: AlertMessageWebsite_URL + self.uuid + "/",
            // type: "PUT",
            type: "PATCH",
            async: false,
            cache: false,
            timeout: 30000,

            //data: JSON.stringify({data:"test"}),
            //data: JSON.stringify(self),
            data: formData,
            //contentType: "multipart/form-data",
            contentType: false,
            // dataType : false,
            processData: false,
            success: function (data) {
                    self = new AlertMessageWebsite(data);
                    alert('Update succeed...');
                    $(location).prop('href', "/Workspace/AlertMessage/detail/" + self.uuid + "/");
                    // self.tFillForm();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status);
                console.log(thrownError);
                if (xhr.textStatus == 'timeout') {
                    this.tryCount++;
                    if (this.tryCount <= this.retryLimit) {
                        //try again
                        $.ajax(this);
                        return;
                    }
                    return;
                }
                $.alert({
                    title: 'Error [' + xhr.status + '] ' + thrownError ,
                    content: xhr.responseText,
                });
            },
        });
        return self;
    }
                
    // ########## [FORM] [CREATE] post Objects to REST API --> return object if success ##############
    tCreateNewPostFormApi(){
        $.ajaxSetup({
            headers : {
                'CSRFToken' : getCSRFTokenValue(),
                'X-CSRFToken' : getCSRFTokenValue(), // for --> SessionAuthentication
            },
            tryCount : 0,
            retryLimit : 3,
        });
        $('#idAlertMessageWebsiteInputId').val(null);
        $('#uuidAlertMessageWebsiteInputId').val(uuidv4());
        var self = this;
        var formData = new FormData($('#alertmessageWebsiteFormId')[0]);
        var file_eles = $(".alertmessage-website");
        for (var i = 0; i < file_eles.length; i++) {
            console.log('file_eles[i] = ', file_eles[i]);
            var files = file_eles[i].files;
            // Check file selected or not
            if(files.length > 0 ) {
                formData.append(file_eles[i].getAttribute('name'), files[0]);
            }
        }
        $.ajax({
            url: AlertMessageWebsite_URL,
            type: "POST",
            async: false,
            cache: false,
            timeout: 30000,
            data: formData,
            //contentType: "multipart/form-data",
            contentType: false,
            // dataType : false,
            processData: false,
            success: function (data) {
                    self = new AlertMessageWebsite(data);
                    $.confirm({
                        title: 'Confirm!',
                        content: 'Save Success, Continue!',
                        buttons: {
                            confirm: function () {
                                // : Clear form to create new
                                $.alert('Continue!');
                            },
                            cancel: function () {
                                // $.alert('Canceled!');
                                $(location).prop('href', "/Workspace/AlertMessage/detail/" + self.uuid + "/");
                            },
                            somethingElse: {
                                text: 'Something else',
                                btnClass: 'btn-blue',
                                keys: ['enter', 'shift'],
                                action: function(){
                                    $.alert('Something else?');
                                }
                            }
                        }
                    });
                    // self.tFillForm();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status);
                console.log(thrownError);
                if (xhr.textStatus == 'timeout') {
                    this.tryCount++;
                    if (this.tryCount <= this.retryLimit) {
                        //try again
                        $.ajax(this);
                        return;
                    }
                    return;
                }
                $.alert({
                    title: 'Error [' + xhr.status + '] ' + thrownError ,
                    content: xhr.responseText,
                });
            },
        });
        return self;
    }
                
    tDeleteApi(){
        $.ajaxSetup({
            headers : {
                'CSRFToken' : getCSRFTokenValue(),
                'X-CSRFToken' : getCSRFTokenValue(), // for --> SessionAuthentication
            },
            tryCount : 0,
            retryLimit : 3,
        });


        var self = this;
        console.log('self.id = ', self.id);
        $.ajax({
            url: AlertMessage_URL + self.uuid + "/",
            type: "DELETE",
            async: false,
            cache: false,
            timeout: 30000,

            //data: JSON.stringify({data:"test"}),
            //data: JSON.stringify(self),
            //data: JSON.stringify(self),
            //contentType: "application/json; charset=utf-8",
            //dataType: "json",
            success: function (data) {
                alert('Delete succeed...');
                console.log(data);
                $.alert({
                    title: 'Alert!',
                    content: 'Delete succeed...',
                });
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status);
                console.log(thrownError);
                if (xhr.textStatus == 'timeout') {
                    this.tryCount++;
                    if (this.tryCount <= this.retryLimit) {
                        //try again
                        $.ajax(this);
                        return;
                    }
                    return;
                }
                $.alert({
                    title: 'Error [' + xhr.status + '] ' + thrownError ,
                    content: xhr.responseText,
                });
            },
        });
    }
                
    // ########## get Objects from REST API --> return array of objects ##############
    tGetAllObjApi(){
        var results = [];
        $.ajaxSetup({
            headers : {
                'CSRFToken' : getCSRFTokenValue(),
                'X-CSRFToken' : getCSRFTokenValue(), // for --> SessionAuthentication
            },
            tryCount : 0,
            retryLimit : 3,
        });
        $.ajax({
            url: AlertMessageWebsite_URL,
            type: "GET",
            async: false,
            cache: false,
            timeout: 30000,

            success: function (data) {
                console.log('[tGetAllObjApi] data = ', data);
                // return new AlertMessageWebsite(data);
                if (data.hasOwnProperty('results')){
                    for (var j=0; j < data.results.length; j++){
                        var tmp = new AlertMessageWebsite(data.results[j]);
                        results.push(tmp);
                    }
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status);
                console.log(thrownError);
                if (xhr.textStatus == 'timeout') {
                    this.tryCount++;
                    if (this.tryCount <= this.retryLimit) {
                        //try again
                        $.ajax(this);
                        return;
                    }
                    return;
                }
                $.alert({
                    title: 'Error [' + xhr.status + '] ' + thrownError ,
                    content: xhr.responseText,
                });
            },
        });
        return results;
    }
                
    // ########## GET ONLY ONE OBJ FROM REST API (RETURN 01 OBJECTS) ##############
    tGetObjApi(uuid){
        $.ajaxSetup({
            headers : {
                'CSRFToken' : getCSRFTokenValue(),
                'X-CSRFToken' : getCSRFTokenValue(), // for --> SessionAuthentication
            },
            tryCount : 0,
            retryLimit : 3,
        });
        $.ajax({
            url: AlertMessageWebsite_URL + uuid + "/",
            type: "GET",
            async: false,
            cache: false,
            timeout: 30000,

            success: function (data) {
                console.log('[tGetObjApi] data = ', data);
                var n_obj = new AlertMessageWebsite(data);
                console.log('n_obj = ', n_obj);
                n_obj.tFillForm();
                return n_obj;
                // if (data.hasOwnProperty('results')){
                //    if (data.results.length > 0){
                //        var tmp = new AlertMessageWebsite(data.results[i]);
                //        return tmp;
                //    }
                //}
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status);
                console.log(thrownError);
                if (xhr.textStatus == 'timeout') {
                    this.tryCount++;
                    if (this.tryCount <= this.retryLimit) {
                        //try again
                        $.ajax(this);
                        return;
                    }
                    return;
                }
                $.alert({
                    title: 'Error [' + xhr.status + '] ' + thrownError ,
                    content: xhr.responseText,
                });
                return null;
            },
        });
        return null;
    }
    // Fill Table type 1:
    tFillTable1(TableBodyId){
        var body = $("#" + TableBodyId);
        var html_text = (`
            <tr>
                <td>` + this.name + `</td>
                <td>` + this.uuid + `</td>
                <td>` + this.code + `</td>
                <td>` + this.desc + `</td>
                <td>` + this.image + `</td>
                <td>` + this.name + `</td>
                <td>` + this.name + `</td>
                <td>` + this.name + `</td>
                <td>` + this.updated_at + `</td>
                <td>` + this.created_at + `</td>
            <tr>
        `);
        // body.empty();
        body.append(html_text);
        return true;
    }

    // Fill Table type 2:
    tFillTable2(){
    }

    // Fill List type 1:
    tFillList1(){
    }

    // Fill List type 2:
    tFillList2(){
    }
}
                
class AlertMessageWebsite_ListItem {
    constructor(data){
        if (data != null){
            this.id = data.id;
            this.name = data.name;
        }
        else{
            this.id = null;
            this.name = null;
        }
    }
}
            

var AlertMessageWebsiteList_CACHE = [];
// ########## Get List Class ##############
class AlertMessageWebsiteList {
    // ########## Init Objects ##############
    getListApi(){
        $.ajaxSetup({
            headers : {
                'CSRFToken' : getCSRFTokenValue(),
                'X-CSRFToken' : getCSRFTokenValue(), // for --> SessionAuthentication
            },
            tryCount : 0,
            retryLimit : 3,
        });
        $.ajax({
            url: AlertMessageWebsite_LIST_URL,
            type: "GET",
            async: false,
            cache: false,
            timeout: 30000,

            success: function (data) {
                AlertMessageWebsiteList_CACHE = []
                console.log(data);
                if (data.hasOwnProperty('results')){
                    for (var i = 0; i < data.results.length; i++){
                        var x = new AlertMessageWebsite_ListItem(data.results[i]);
                        AlertMessageWebsiteList_CACHE.push(x);
                    }
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status);
                console.log(thrownError);
                if (xhr.textStatus == 'timeout') {
                    this.tryCount++;
                    if (this.tryCount <= this.retryLimit) {
                        //try again
                        $.ajax(this);
                        return;
                    }
                    return;
                }
                $.alert({
                    title: 'Error [' + xhr.status + '] ' + thrownError ,
                    content: xhr.responseText,
                });
                return null;
            },
        });
        return AlertMessageWebsiteList_CACHE;
    }

}

    

// ########## tTest function ##############
function tTestAlertMessageWebsite(){
    var b_json = genAlertMessageWebsite();
    console.log("b_json = ", b_json);
    // var d_obj = new AlertMessageWebsite(b_json);
    var d_obj = new AlertMessageWebsite(b_json);
    // console.log('d_obj.tCreatePostApi()...', d_obj.tCreatePostApi());
    // console.log('d_obj.tCreateNewPostFormApi()...', d_obj.tCreateNewPostFormApi());
    // console.log('d_obj.tUpdatePostApi()...', d_obj.tUpdatePostApi());
    // var d_obj = new AlertMessageWebsiteList();
    // console.log('d_obj.getListApi()...', d_obj.getListApi());
    console.log("d_obj = ", d_obj);
    d_obj.tFillForm();
    console.log("Fill form done...");
}

$(document).ready(function(){

});

    

// ########## [Edit Button] Clicked Handle function ##############

$(document).ready(function(){
    $("#alertmessageWebsiteEditBtnId").click(function(){

    })
});

    

// ########## [Save Button] Clicked Handle function ##############

$(document).ready(function(){
    $("#alertmessageWebsiteSaveBtnId").click(function(){
        obj = new AlertMessageWebsite();
        obj.tCreateNewPostFormApi();
    })
});

    

// ########## [Create New Button] Clicked Handle function ##############

$(document).ready(function(){
    $("#alertmessageWebsiteSaveAndNewBtnId").click(function(){
        obj = new AlertMessageWebsite();
        obj.tCreateNewPostFormApi();
    })
});

    

// ########## [Delete Button] Clicked Handle function ##############

$(document).ready(function(){
    $("#alertmessageWebsiteDeleteBtnId").click(function(){
        obj = new AlertMessageWebsite();
        obj.tDeleteApi();
    })
});

    

// ########## [Get List, push options to Select] Handle Event function ##############

$(document).ready(function(){
    if ($(".alertmessage-website-select").length > 0){
        var obj = new AlertMessageWebsiteList();
        AlertMessageWebsiteList_CACHE = obj.getListApi();
        var crr = null;
        for (l = 0; l < AlertMessageWebsiteList_CACHE.length; l++){
            crr = AlertMessageWebsiteList_CACHE[l]
            // $(this).append(new Option(crr.name, crr.id));
            $(".alertmessage-website-select").append(new Option(crr.name, crr.id));
        }
    }
})

    

// ########## [Fill Table] Handle Event function ##############

$(document).ready(function(){
    var checker = $("#" + "alertmessageWebsiteTableBodyId");
    if (checker.length > 0){
        var obj = new AlertMessageWebsite();
        var results = obj.tGetAllObjApi();
        for (var i = 0; i < results.length; i++){
            try{
                console.log('results[i] = ', results[i]);
                results[i].tFillTable1("alertmessageWebsiteTableBodyId");
            }
            catch(err){
                console.log(err);
            }
        }
    }
})

    

// ########## [Fill Form] Handle Event function ##############

$(document).ready(function(){
    var checker = $("#alertmessageWebsiteFormId");
    if (checker.length > 0){
        var cr_uuid = checker.attr('data-uuid');
        if (typeof cr_uuid !== 'undefined' && cr_uuid !== false){
            console.log('cr_uuid = ', cr_uuid);
            var obj = new AlertMessageWebsite();
            obj.tGetObjApi(cr_uuid);
        }
    }
    checker = $("#alertmessageWebsiteDetailFormId");
    if (checker.length > 0){
        var cr_uuid = checker.attr('data-uuid');
        if (typeof cr_uuid !== 'undefined' && cr_uuid !== false){
            console.log('cr_uuid = ', cr_uuid);
            var obj = new AlertMessageWebsite();
            obj.tGetObjApi(cr_uuid);
        }
    }
    checker = $("#alertmessageWebsiteEditFormId");
    if (checker.length > 0){
        var cr_uuid = checker.attr('data-uuid');
        if (typeof cr_uuid !== 'undefined' && cr_uuid !== false){
            console.log('cr_uuid = ', cr_uuid);
            var obj = new AlertMessageWebsite();
            obj.tGetObjApi(cr_uuid);
        }
    }
})

    

// ########## [Test Button] Clicked Handle function ##############

$(document).ready(function(){
    $("#alertmessageWebsiteTestBtnId").click(function(){
        tTestAlertMessageWebsite();
    })
});

    