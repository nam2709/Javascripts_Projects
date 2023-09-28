
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

// Boolean Check in Viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    var inViewport = (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
    if (inViewport == false){;
        return true;
    }
    else{
        return false;
    }
}

var _cls_ = {}; // serves as a cache, speed up later lookups
function getClass(name){
  if (!_cls_[name]) {
    // cache is not ready, fill it up
    if (name.match(/^[a-zA-Z0-9_]+$/)) {
      // proceed only if the name is a single word string
      _cls_[name] = eval(name);
    } else {
      // arbitrary code is detected
      throw new Error("Who let the dogs out?");
    }
  }
  return _cls_[name];
}


// Get random select from option by Selector:
function genRandomSelect(tSelector){
    var index = null;
    try{
        $(tSelector).each(function(){
            var optionId = $(this).attr('id');
            console.log("[genRandomSelect] optionId = ", optionId);
            var select = document.getElementById(optionId);
            if (select != null){
                var items = select.getElementsByTagName('option');
                var vals = [];
                for (var i = 0; i < items.length; i++){
                    if (items[i].hasAttribute("value") == true && items[i].value != null){
                        vals.push(items[i].value);
                    }
                }
                console.log('[genRandomSelect] vals = ', vals);

                // var index = vals[Math.floor(Math.random() * items.length)];
                index = vals[Math.floor(Math.random() * items.length)];

                select.value = index;

                // Fill file label:
                var labels = document.querySelectorAll('[for=optionId]');
                for (var i = 0; i < labels.length; i++){
                   labels[i].val(index);
                }
                console.log('[genRandomSelect] index = ', index);
                return;
            }
            else{
                return;
            }
        })
    }
    catch (err) {
        console.log(err);
        return null;
    }
    return index;
}

// Get random select from option by Selector:
function genRandomSelectMultiple(tSelector){
    var index = [];
    try{
        $(tSelector).each(function(){
            var optionId = $(this).attr('id');
            console.log("[genRandomSelectMultiple] optionId = ", optionId);
            var select = document.getElementById(optionId);
            if (select != null){
                var items = select.getElementsByTagName('option');
                var vals = [];
                for (var i = 0; i < items.length; i++){
                    if (items[i].hasAttribute("value") == true && items[i].value != null){
                        vals.push(items[i].value);
                    }
                }
                console.log('[genRandomSelectMultiple] vals = ', vals);

                // var index = vals[Math.floor(Math.random() * items.length)];
                index.push(vals[Math.floor(Math.random() * items.length)]);

                // select.value = index;

                // Fill file label:
                // var labels = document.querySelectorAll('[for=optionId]');
                // for (var i = 0; i < labels.length; i++){
                //    labels[i].val(index);
                // }
                // console.log('[genRandomSelectMultiple] index = ', index);
                return;
            }
            else{
                return;
            }
        })
    }
    catch (err) {
        console.log(err);
    }
    return index;
}

$(document).ready(function(){
        $('.tnd-file-path').each(function(){
            var temp = $(this).text();
            console.log("[.tnd-file-path]...", temp);
            $(this).text(temp.substring(temp.lastIndexOf('/')+1));
        })
    }
)

function getElementsByAttribute(attr_name, attr_value){
    return document.querySelectorAll('[' + attr_name + '="' + attr_value + '"]');
}

function clearForm(formId){
    var fr = $("#" + formId);
    fr.find('input:text, input:password, select')
                    .each(function () {
                        $(this).val('');
                    });
    fr.find('textarea')
                    .each(function () {
                        // For CKEDITOR clear
                        if ($(this).hasClass('ckeditor-input')){
                            var _if = $("#cke_" + $(this).attr('id')).find('iframe');
                            _if.contents().find('body').html("");
                            console.log('Clear done...', $(this).attr('id'));
                        }
                        $(this).text('');
                    });
    fr.find('.current-file-preview')
                    .each(function () {
                        $(this).text('');
                    });
    fr.find('table').each(function () {
        var dataTable = $(this).DataTable();
        dataTable.rows().remove().draw();
    });
}
        
$(document).ready(function(){
        $('.t-tooltip').each(function(){
            $(this).tooltip(options)
        })
    }
)

function getFormDatas(tSelector){
    var formDatas = [];
    $(tSelector).each(function(){
        //var $form = $("<form></form>");
        var fData = new FormData();
        $(this).find('input').each(function(){
            console.log("[getFormDatas(tSelector)]... ", $(this).val());
            fData.append($(this).attr('name'), $(this).val())
        })
        console.log("[getFormDatas(tSelector)] fData... ", fData);
        formDatas.push(fData);
    })
    return formDatas;
}

function getFormDataFromTable(tableId){
    var tableEle = $("#" + tableId);
    var formDatas = [];
    $(tableEle).find('tbody>tr').each(function(){
        //var $form = $("<form></form>");
        var fData = new FormData();
        $(this).find('input, select').each(function(){
            console.log("[getFormDatas(tSelector)]... ", $(this).val());
            fData.append($(this).attr('name'), $(this).val())
        })
        $(this).find('textarea').each(function(){
            console.log("[getFormDatas(tSelector)]... ", $(this).val());
            fData.append($(this).attr('name'), $(this).val())
        })
        console.log("[getFormDatas(tSelector)] fData... ", fData);
        formDatas.push(fData);
    })
    return formDatas;
}

function postFormDataFromTableAllAdminMenuWebsite(tableId,
                                    attr_value=null){
    var tableEle = $("#" + tableId);
    var app_name = $(tableEle).attr('data-app-name');
    var model_name = $(tableEle).attr('data-model-name');
    var attr_name = $(tableEle).attr('data-attr_name');

    var targetUrl = model_name + app_name + "_URL";
    var formDatas = [];
    $(tableEle).find('tbody>tr').each(function(){
        var fData = new FormData();
        $(this).find('input, select').each(function(){
            console.log("[function postFormDataFromTable%s%s(tableId)]... ", $(this).val());
            fData.append($(this).attr('name'), $(this).val())
        })
        $(this).find('textarea').each(function(){
            console.log("[function postFormDataFromTable%s%s(tableId)]... ", $(this).val());
            fData.append($(this).attr('name'), $(this).val())
        })

        //
        if (attr_value == null){
            attr_value = $(this).closest('form').attr('data-uuid');
        }
        else{
        }
        fData.append(attr_name, attr_value);

        // Fill checkbox status
        var checkbox = $(this).find("input[type=checkbox]");
        $.each(checkbox, function(key, val) {
            fData.set($(val).attr('name'), $(val).is(':checked'));
        });

        var file_eles = $(this).find("input[type=file]");
        for (var i = 0; i < file_eles.length; i++) {
            console.log('file_eles[i] = ', file_eles[i]);
            var files = file_eles[i].files;
            // Check file selected or not
            if(files.length > 0 ) {
                fData.append(file_eles[i].getAttribute('name'), files[0]);
            }
        }
        console.log("[function postFormDataFromTable%s%s(tableId)] fData... ", fData);
        formDatas.push(fData);
        try{
            var clsName = model_name + app_name;
            // var tObj = new getClass(clsName)();
            var tObj = new AllAdminMenuWebsite();

            tObj.tCreateNewPostFormData(fData);
        }
        catch(err){
            console.log('[function postFormDataFromTable%s%s(tableId)]...', err);
        }
    })
    return formDatas;
}

function getDataToInlineTableAllAdminMenuWebsite(tableId,
                                    attr_value=null){
    var tableEle = $("#" + tableId);
    var app_name = $(tableEle).attr('data-app-name');
    console.log('[function getDataToInlineTable%s%s(tableId)] app_name = ', app_name);

    var model_name = $(tableEle).attr('data-model-name');
    console.log('[function getDataToInlineTable%s%s(tableId)] model_name = ', model_name);

    var attr_name = $(tableEle).attr('data-attr_name');
    console.log('[function getDataToInlineTable%s%s(tableId)] attr_name = ', attr_name);

    var targetUrl = model_name + app_name + "_URL";
    console.log('[function getDataToInlineTable%s%s(tableId)] targetUrl = ', targetUrl);
    try{
        var clsName = model_name + app_name;
        // var tObj = new getClass(clsName)();
        var tObj = new AllAdminMenuWebsite();
        //
        if (attr_value == null){
            attr_value = $(this).closest('form').attr('data-uuid');
        }
        else{
        }
        tObj.tFilterSearchAllObjApi({attr_name: attr_value,});
    }
    catch(err){
        console.log('[function postFormDataFromTable%s%s(tableId)]...', err);
    }
    return;
}

var genAllAdminMenuWebsite_FIELDS = [
        "name",
        "uuid",
        "title",
        "icon_class",
        "url",
        "icon",
        "icon_base64",
        "desc",
        "order",
        "in_main_menu",
        "menu_group",
        "parent_menu",
        "login_redirect",
        "active",
        "staff_only",
        "superuser_only",
        "split_marked",
        "split_label",
        "updated_at",
        "created_at",
];
function genAllAdminMenuWebsite(){
    return {
    "name": makeid(),
    "uuid": uuidv4(),
    "title": makeid(),
    "icon_class": makeid(),
    "url": makeid(),
    "icon": makeid(),
    "icon_base64": makeid(128),
    "desc": makeid(128),
    "order": makeid(),
    "in_main_menu": genBoolean(),
    "menu_group": genRandomSelect('.menu_group-alladminmenu-website-option'),
    "parent_menu": genRandomSelect('.parent_menu-alladminmenu-website-option'),
    "login_redirect": genBoolean(),
    "active": genBoolean(),
    "staff_only": genBoolean(),
    "superuser_only": genBoolean(),
    "split_marked": genBoolean(),
    "split_label": makeid(),
    "updated_at": randomDate(),
    "created_at": randomDate(),
    }
}

var ALLADMINMENU_CACHE = [];
var CURRENT_AllAdminMenuWebsite = null;
var CURRENT_ALLADMINMENU_UUID = null;
var ALLADMINMENU_WEBSITE_ID_TABLE_COUNT = 1;
var ALLADMINMENU_WEBSITE_ID_INLINE_TABLE_COUNT = 1;


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

// Boolean Check in Viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    var inViewport = (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
    if (inViewport == false){;
        return true;
    }
    else{
        return false;
    }
}

var _cls_ = {}; // serves as a cache, speed up later lookups
function getClass(name){
  if (!_cls_[name]) {
    // cache is not ready, fill it up
    if (name.match(/^[a-zA-Z0-9_]+$/)) {
      // proceed only if the name is a single word string
      _cls_[name] = eval(name);
    } else {
      // arbitrary code is detected
      throw new Error("Who let the dogs out?");
    }
  }
  return _cls_[name];
}


// Get random select from option by Selector:
function genRandomSelect(tSelector){
    var index = null;
    try{
        $(tSelector).each(function(){
            var optionId = $(this).attr('id');
            console.log("[genRandomSelect] optionId = ", optionId);
            var select = document.getElementById(optionId);
            if (select != null){
                var items = select.getElementsByTagName('option');
                var vals = [];
                for (var i = 0; i < items.length; i++){
                    if (items[i].hasAttribute("value") == true && items[i].value != null){
                        vals.push(items[i].value);
                    }
                }
                console.log('[genRandomSelect] vals = ', vals);

                // var index = vals[Math.floor(Math.random() * items.length)];
                index = vals[Math.floor(Math.random() * items.length)];

                select.value = index;

                // Fill file label:
                var labels = document.querySelectorAll('[for=optionId]');
                for (var i = 0; i < labels.length; i++){
                   labels[i].val(index);
                }
                console.log('[genRandomSelect] index = ', index);
                return;
            }
            else{
                return;
            }
        })
    }
    catch (err) {
        console.log(err);
        return null;
    }
    return index;
}

// Get random select from option by Selector:
function genRandomSelectMultiple(tSelector){
    var index = [];
    try{
        $(tSelector).each(function(){
            var optionId = $(this).attr('id');
            console.log("[genRandomSelectMultiple] optionId = ", optionId);
            var select = document.getElementById(optionId);
            if (select != null){
                var items = select.getElementsByTagName('option');
                var vals = [];
                for (var i = 0; i < items.length; i++){
                    if (items[i].hasAttribute("value") == true && items[i].value != null){
                        vals.push(items[i].value);
                    }
                }
                console.log('[genRandomSelectMultiple] vals = ', vals);

                // var index = vals[Math.floor(Math.random() * items.length)];
                index.push(vals[Math.floor(Math.random() * items.length)]);

                // select.value = index;

                // Fill file label:
                // var labels = document.querySelectorAll('[for=optionId]');
                // for (var i = 0; i < labels.length; i++){
                //    labels[i].val(index);
                // }
                // console.log('[genRandomSelectMultiple] index = ', index);
                return;
            }
            else{
                return;
            }
        })
    }
    catch (err) {
        console.log(err);
    }
    return index;
}

$(document).ready(function(){
        $('.tnd-file-path').each(function(){
            var temp = $(this).text();
            console.log("[.tnd-file-path]...", temp);
            $(this).text(temp.substring(temp.lastIndexOf('/')+1));
        })
    }
)

function getElementsByAttribute(attr_name, attr_value){
    return document.querySelectorAll('[' + attr_name + '="' + attr_value + '"]');
}

function clearForm(formId){
    var fr = $("#" + formId);
    fr.find('input:text, input:password, select')
                    .each(function () {
                        $(this).val('');
                    });
    fr.find('textarea')
                    .each(function () {
                        // For CKEDITOR clear
                        if ($(this).hasClass('ckeditor-input')){
                            var _if = $("#cke_" + $(this).attr('id')).find('iframe');
                            _if.contents().find('body').html("");
                            console.log('Clear done...', $(this).attr('id'));
                        }
                        $(this).text('');
                    });
    fr.find('.current-file-preview')
                    .each(function () {
                        $(this).text('');
                    });
    fr.find('table').each(function () {
        var dataTable = $(this).DataTable();
        dataTable.rows().remove().draw();
    });
}
        
$(document).ready(function(){
        $('.t-tooltip').each(function(){
            $(this).tooltip(options)
        })
    }
)

function getFormDatas(tSelector){
    var formDatas = [];
    $(tSelector).each(function(){
        //var $form = $("<form></form>");
        var fData = new FormData();
        $(this).find('input').each(function(){
            console.log("[getFormDatas(tSelector)]... ", $(this).val());
            fData.append($(this).attr('name'), $(this).val())
        })
        console.log("[getFormDatas(tSelector)] fData... ", fData);
        formDatas.push(fData);
    })
    return formDatas;
}

function getFormDataFromTable(tableId){
    var tableEle = $("#" + tableId);
    var formDatas = [];
    $(tableEle).find('tbody>tr').each(function(){
        //var $form = $("<form></form>");
        var fData = new FormData();
        $(this).find('input, select').each(function(){
            console.log("[getFormDatas(tSelector)]... ", $(this).val());
            fData.append($(this).attr('name'), $(this).val())
        })
        $(this).find('textarea').each(function(){
            console.log("[getFormDatas(tSelector)]... ", $(this).val());
            fData.append($(this).attr('name'), $(this).val())
        })
        console.log("[getFormDatas(tSelector)] fData... ", fData);
        formDatas.push(fData);
    })
    return formDatas;
}

function postFormDataFromTableAllAdminMenuWebsite(tableId,
                                    attr_value=null){
    var tableEle = $("#" + tableId);
    var app_name = $(tableEle).attr('data-app-name');
    var model_name = $(tableEle).attr('data-model-name');
    var attr_name = $(tableEle).attr('data-attr_name');

    var targetUrl = model_name + app_name + "_URL";
    var formDatas = [];
    $(tableEle).find('tbody>tr').each(function(){
        var fData = new FormData();
        $(this).find('input, select').each(function(){
            console.log("[function postFormDataFromTable%s%s(tableId)]... ", $(this).val());
            fData.append($(this).attr('name'), $(this).val())
        })
        $(this).find('textarea').each(function(){
            console.log("[function postFormDataFromTable%s%s(tableId)]... ", $(this).val());
            fData.append($(this).attr('name'), $(this).val())
        })

        //
        if (attr_value == null){
            attr_value = $(this).closest('form').attr('data-uuid');
        }
        else{
        }
        fData.append(attr_name, attr_value);

        // Fill checkbox status
        var checkbox = $(this).find("input[type=checkbox]");
        $.each(checkbox, function(key, val) {
            fData.set($(val).attr('name'), $(val).is(':checked'));
        });

        var file_eles = $(this).find("input[type=file]");
        for (var i = 0; i < file_eles.length; i++) {
            console.log('file_eles[i] = ', file_eles[i]);
            var files = file_eles[i].files;
            // Check file selected or not
            if(files.length > 0 ) {
                fData.append(file_eles[i].getAttribute('name'), files[0]);
            }
        }
        console.log("[function postFormDataFromTable%s%s(tableId)] fData... ", fData);
        formDatas.push(fData);
        try{
            var clsName = model_name + app_name;
            // var tObj = new getClass(clsName)();
            var tObj = new AllAdminMenuWebsite();

            tObj.tCreateNewPostFormData(fData);
        }
        catch(err){
            console.log('[function postFormDataFromTable%s%s(tableId)]...', err);
        }
    })
    return formDatas;
}

function getDataToInlineTableAllAdminMenuWebsite(tableId,
                                    attr_value=null){
    var tableEle = $("#" + tableId);
    var app_name = $(tableEle).attr('data-app-name');
    console.log('[function getDataToInlineTable%s%s(tableId)] app_name = ', app_name);

    var model_name = $(tableEle).attr('data-model-name');
    console.log('[function getDataToInlineTable%s%s(tableId)] model_name = ', model_name);

    var attr_name = $(tableEle).attr('data-attr_name');
    console.log('[function getDataToInlineTable%s%s(tableId)] attr_name = ', attr_name);

    var targetUrl = model_name + app_name + "_URL";
    console.log('[function getDataToInlineTable%s%s(tableId)] targetUrl = ', targetUrl);
    try{
        var clsName = model_name + app_name;
        // var tObj = new getClass(clsName)();
        var tObj = new AllAdminMenuWebsite();
        //
        if (attr_value == null){
            attr_value = $(this).closest('form').attr('data-uuid');
        }
        else{
        }
        tObj.tFilterSearchAllObjApi({attr_name: attr_value,});
    }
    catch(err){
        console.log('[function postFormDataFromTable%s%s(tableId)]...', err);
    }
    return;
}

var genAllAdminMenuWebsite_FIELDS = [
        "name",
        "uuid",
        "title",
        "icon_class",
        "url",
        "icon",
        "icon_base64",
        "desc",
        "order",
        "in_main_menu",
        "menu_group",
        "parent_menu",
        "login_redirect",
        "active",
        "staff_only",
        "superuser_only",
        "split_marked",
        "split_label",
        "updated_at",
        "created_at",
];
function genAllAdminMenuWebsite(){
    return {
    "name": makeid(),
    "uuid": uuidv4(),
    "title": makeid(),
    "icon_class": makeid(),
    "url": makeid(),
    "icon": makeid(),
    "icon_base64": makeid(128),
    "desc": makeid(128),
    "order": makeid(),
    "in_main_menu": genBoolean(),
    "menu_group": genRandomSelect('.menu_group-alladminmenu-website-option'),
    "parent_menu": genRandomSelect('.parent_menu-alladminmenu-website-option'),
    "login_redirect": genBoolean(),
    "active": genBoolean(),
    "staff_only": genBoolean(),
    "superuser_only": genBoolean(),
    "split_marked": genBoolean(),
    "split_label": makeid(),
    "updated_at": randomDate(),
    "created_at": randomDate(),
    }
}

var ALLADMINMENU_CACHE = [];
var CURRENT_AllAdminMenuWebsite = null;
var CURRENT_ALLADMINMENU_UUID = null;
var ALLADMINMENU_WEBSITE_ID_TABLE_COUNT = 1;
var ALLADMINMENU_WEBSITE_ID_INLINE_TABLE_COUNT = 1;


class AllAdminMenuWebsite{
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

        this.__model_name__ = "AllAdminMenu";

                if (data.hasOwnProperty('name')){
                    this.name = data.name;
                }
                else{
                    // this.name = null;
                }
            if (data.hasOwnProperty('uuid')){
                this.uuid = data.uuid;
                this.editUrl = '/Workspace/AllAdminMenu/edit/' + this.uuid + '/';
                this.detailUrl = '/Workspace/AllAdminMenu/detail/' + this.uuid + '/';
            }
            else{
                // this.uuid = null;
            }
                if (data.hasOwnProperty('title')){
                    this.title = data.title;
                }
                else{
                    // this.title = null;
                }
                if (data.hasOwnProperty('icon_class')){
                    this.icon_class = data.icon_class;
                }
                else{
                    // this.icon_class = null;
                }
                if (data.hasOwnProperty('url')){
                    this.url = data.url;
                }
                else{
                    // this.url = null;
                }
                if (data.hasOwnProperty('icon')){
                    this.icon = data.icon;
                }
                else{
                    // this.icon = null;
                }
                if (data.hasOwnProperty('icon_base64')){
                    this.icon_base64 = data.icon_base64;
                }
                else{
                    // this.icon_base64 = null;
                }
                if (data.hasOwnProperty('desc')){
                    this.desc = data.desc;
                }
                else{
                    // this.desc = null;
                }
                if (data.hasOwnProperty('order')){
                    this.order = data.order;
                }
                else{
                    // this.order = null;
                }
                if (data.hasOwnProperty('in_main_menu')){
                    this.in_main_menu = data.in_main_menu;
                }
                else{
                    // this.in_main_menu = null;
                }
                if (data.hasOwnProperty('menu_group')){
                    this.menu_group = data.menu_group;
                }
                else{
                    // this.menu_group = null;
                }
                if (data.hasOwnProperty('parent_menu')){
                    this.parent_menu = data.parent_menu;
                }
                else{
                    // this.parent_menu = null;
                }
                if (data.hasOwnProperty('login_redirect')){
                    this.login_redirect = data.login_redirect;
                }
                else{
                    // this.login_redirect = null;
                }
                if (data.hasOwnProperty('active')){
                    this.active = data.active;
                }
                else{
                    // this.active = null;
                }
                if (data.hasOwnProperty('staff_only')){
                    this.staff_only = data.staff_only;
                }
                else{
                    // this.staff_only = null;
                }
                if (data.hasOwnProperty('superuser_only')){
                    this.superuser_only = data.superuser_only;
                }
                else{
                    // this.superuser_only = null;
                }
                if (data.hasOwnProperty('split_marked')){
                    this.split_marked = data.split_marked;
                }
                else{
                    // this.split_marked = null;
                }
                if (data.hasOwnProperty('split_label')){
                    this.split_label = data.split_label;
                }
                else{
                    // this.split_label = null;
                }
                if (data.hasOwnProperty('updated_at')){
                    this.updated_at = data.updated_at;
                }
                else{
                    // this.updated_at = null;
                }
                if (data.hasOwnProperty('created_at')){
                    this.created_at = data.created_at;
                }
                else{
                    // this.created_at = null;
                }
            }
    }
    tGetFormData(formId=null){
        var formEle = $("#" + formId);
        if (formEle.length > 0){
            var chEle = formEle.find("#nameAllAdminMenuWebsiteInputId");
            if (chEle.length > 0){
                this.name = chEle.val();
            }
            else{
                // this.name = null;
            }
            var chEle = formEle.find("#uuidAllAdminMenuWebsiteInputId");
            if (chEle.length > 0){
                this.uuid = chEle.val();
            }
            else{
                // this.uuid = null;
            }
            var chEle = formEle.find("#titleAllAdminMenuWebsiteInputId");
            if (chEle.length > 0){
                this.title = chEle.val();
            }
            else{
                // this.title = null;
            }
            var chEle = formEle.find("#icon_classAllAdminMenuWebsiteInputId");
            if (chEle.length > 0){
                this.icon_class = chEle.val();
            }
            else{
                // this.icon_class = null;
            }
            var chEle = formEle.find("#urlAllAdminMenuWebsiteInputId");
            if (chEle.length > 0){
                this.url = chEle.val();
            }
            else{
                // this.url = null;
            }
            var chEle = formEle.find("#iconAllAdminMenuWebsiteInputId");
            if (chEle.length > 0){
                this.icon = chEle.val();
            }
            else{
                // this.icon = null;
            }
            var chEle = formEle.find("#icon_base64AllAdminMenuWebsiteInputId");
            if (chEle.length > 0){
                this.icon_base64 = chEle.val();
            }
            else{
                // this.icon_base64 = null;
            }
            var chEle = formEle.find("#descAllAdminMenuWebsiteInputId");
            if (chEle.length > 0){
                this.desc = chEle.val();
            }
            else{
                // this.desc = null;
            }
            var chEle = formEle.find("#orderAllAdminMenuWebsiteInputId");
            if (chEle.length > 0){
                this.order = chEle.val();
            }
            else{
                // this.order = null;
            }
            var chEle = formEle.find("#in_main_menuAllAdminMenuWebsiteInputId");
            if (chEle.length > 0){
                this.in_main_menu = chEle.val();
            }
            else{
                // this.in_main_menu = null;
            }
            var chEle = formEle.find("#menu_groupAllAdminMenuWebsiteInputId");
            if (chEle.length > 0){
                this.menu_group = chEle.val();
            }
            else{
                // this.menu_group = null;
            }
            var chEle = formEle.find("#parent_menuAllAdminMenuWebsiteInputId");
            if (chEle.length > 0){
                this.parent_menu = chEle.val();
            }
            else{
                // this.parent_menu = null;
            }
            var chEle = formEle.find("#login_redirectAllAdminMenuWebsiteInputId");
            if (chEle.length > 0){
                this.login_redirect = chEle.val();
            }
            else{
                // this.login_redirect = null;
            }
            var chEle = formEle.find("#activeAllAdminMenuWebsiteInputId");
            if (chEle.length > 0){
                this.active = chEle.val();
            }
            else{
                // this.active = null;
            }
            var chEle = formEle.find("#staff_onlyAllAdminMenuWebsiteInputId");
            if (chEle.length > 0){
                this.staff_only = chEle.val();
            }
            else{
                // this.staff_only = null;
            }
            var chEle = formEle.find("#superuser_onlyAllAdminMenuWebsiteInputId");
            if (chEle.length > 0){
                this.superuser_only = chEle.val();
            }
            else{
                // this.superuser_only = null;
            }
            var chEle = formEle.find("#split_markedAllAdminMenuWebsiteInputId");
            if (chEle.length > 0){
                this.split_marked = chEle.val();
            }
            else{
                // this.split_marked = null;
            }
            var chEle = formEle.find("#split_labelAllAdminMenuWebsiteInputId");
            if (chEle.length > 0){
                this.split_label = chEle.val();
            }
            else{
                // this.split_label = null;
            }
            var chEle = formEle.find("#updated_atAllAdminMenuWebsiteInputId");
            if (chEle.length > 0){
                this.updated_at = chEle.val();
            }
            else{
                // this.updated_at = null;
            }
            var chEle = formEle.find("#created_atAllAdminMenuWebsiteInputId");
            if (chEle.length > 0){
                this.created_at = chEle.val();
            }
            else{
                // this.created_at = null;
            }
        }
        else{
            var chEle = $("#idAllAdminMenuWebsiteInputId");
            if (chEle.length > 0){
                this.id = chEle.val();
            }
            else{
                // this.id = null;
            }
            var chEle = $("#nameAllAdminMenuWebsiteInputId");
            if (chEle.length > 0){
                this.name = chEle.val();
            }
            else{
                // this.name = null;
            }
            var chEle = $("#uuidAllAdminMenuWebsiteInputId");
            if (chEle.length > 0){
                this.uuid = chEle.val();
            }
            else{
                // this.uuid = null;
            }
            var chEle = $("#titleAllAdminMenuWebsiteInputId");
            if (chEle.length > 0){
                this.title = chEle.val();
            }
            else{
                // this.title = null;
            }
            var chEle = $("#icon_classAllAdminMenuWebsiteInputId");
            if (chEle.length > 0){
                this.icon_class = chEle.val();
            }
            else{
                // this.icon_class = null;
            }
            var chEle = $("#urlAllAdminMenuWebsiteInputId");
            if (chEle.length > 0){
                this.url = chEle.val();
            }
            else{
                // this.url = null;
            }
            var chEle = $("#iconAllAdminMenuWebsiteInputId");
            if (chEle.length > 0){
                this.icon = chEle.val();
            }
            else{
                // this.icon = null;
            }
            var chEle = $("#icon_base64AllAdminMenuWebsiteInputId");
            if (chEle.length > 0){
                this.icon_base64 = chEle.val();
            }
            else{
                // this.icon_base64 = null;
            }
            var chEle = $("#descAllAdminMenuWebsiteInputId");
            if (chEle.length > 0){
                this.desc = chEle.val();
            }
            else{
                // this.desc = null;
            }
            var chEle = $("#orderAllAdminMenuWebsiteInputId");
            if (chEle.length > 0){
                this.order = chEle.val();
            }
            else{
                // this.order = null;
            }
            var chEle = $("#in_main_menuAllAdminMenuWebsiteInputId");
            if (chEle.length > 0){
                this.in_main_menu = chEle.val();
            }
            else{
                // this.in_main_menu = null;
            }
            var chEle = $("#menu_groupAllAdminMenuWebsiteInputId");
            if (chEle.length > 0){
                this.menu_group = chEle.val();
            }
            else{
                // this.menu_group = null;
            }
            var chEle = $("#parent_menuAllAdminMenuWebsiteInputId");
            if (chEle.length > 0){
                this.parent_menu = chEle.val();
            }
            else{
                // this.parent_menu = null;
            }
            var chEle = $("#login_redirectAllAdminMenuWebsiteInputId");
            if (chEle.length > 0){
                this.login_redirect = chEle.val();
            }
            else{
                // this.login_redirect = null;
            }
            var chEle = $("#activeAllAdminMenuWebsiteInputId");
            if (chEle.length > 0){
                this.active = chEle.val();
            }
            else{
                // this.active = null;
            }
            var chEle = $("#staff_onlyAllAdminMenuWebsiteInputId");
            if (chEle.length > 0){
                this.staff_only = chEle.val();
            }
            else{
                // this.staff_only = null;
            }
            var chEle = $("#superuser_onlyAllAdminMenuWebsiteInputId");
            if (chEle.length > 0){
                this.superuser_only = chEle.val();
            }
            else{
                // this.superuser_only = null;
            }
            var chEle = $("#split_markedAllAdminMenuWebsiteInputId");
            if (chEle.length > 0){
                this.split_marked = chEle.val();
            }
            else{
                // this.split_marked = null;
            }
            var chEle = $("#split_labelAllAdminMenuWebsiteInputId");
            if (chEle.length > 0){
                this.split_label = chEle.val();
            }
            else{
                // this.split_label = null;
            }
            var chEle = $("#updated_atAllAdminMenuWebsiteInputId");
            if (chEle.length > 0){
                this.updated_at = chEle.val();
            }
            else{
                // this.updated_at = null;
            }
            var chEle = $("#created_atAllAdminMenuWebsiteInputId");
            if (chEle.length > 0){
                this.created_at = chEle.val();
            }
            else{
                // this.created_at = null;
            }
        }
    }

    // ########## [FILL FORM] Objects to FRONT END ##############
    tFillForm(formId=null){
        var formEle = null;
        if (formId != null){
            formEle = $("#" + formId);
            console.log('###############################################');
            console.log('[tFillForm] Filling form... ', formId);
        }
        var self = this;

        // ######################
        try{
            if (formEle != null && formEle.length > 0){
                var j_ele_name = formEle.find("[name='name']");
            }
            else{
                var j_ele_name = $("#nameAllAdminMenuWebsiteInputId");
            }
            var this_id = j_ele_name.attr('id');
            console.log('[tFillForm] this_id = ', this_id);
        // ######################
            if (j_ele_name.length > 0){
                var tagName = j_ele_name.prop("tagName");
                console.log('[tFillForm] Tag name = ', tagName);
                // if (j_ele_name.attr('name') != 'uuid'){
        // ######################
                switch(tagName) {
                  case "INPUT":
                    j_ele_name.val(self.name).change();
                    break;
        // ######################
                  case "TEXTAREA":
                    j_ele_name.text(self.name).change();

                    // For CKEDITOR update
                    if (j_ele_name.hasClass('ckeditor-input')){
                        var _if = $("#cke_" + this_id).find('iframe');
                        _if.contents().find('body').html(self.name);
                    }
                    break;
        // ######################
                  case "SELECT":
                    var tx = j_ele_name;
                    // ManyToMany Field processing
                    if (typeof tx.attr('multiple') != "undefined"){
                        console.log('[tFillForm][case "SELECT":] Select many2many...');
                        if (Array.isArray(self.name)){
                            var tmpArr = self.name.map(function(elem){
                                if (elem != null && elem.hasOwnProperty('uuid')){
                                    return elem.uuid;
                                }
                                else{
                                    return elem;
                                }
                            })
                            $(tx).val(tmpArr);
                            $(tx).trigger('change');
                        }
                    }
                    // Foreign Key process
                    else{
                        try{
                            var se = self.name;
                            if ( typeof se != 'undefined' && se != null ) {
                                if (self.name.hasOwnProperty('uuid')){
                                    $(j_ele_name).val(self.name.uuid).change();
                                }
                                else{
                                    if (self.name.hasOwnProperty('id')){
                                        $(j_ele_name).val(self.name.id).change();
                                    }
                                    else{
                                        // Not object --> set value:
                                        $(j_ele_name).val(self.name).change();
                                    }
                                }
                            }
                        }
                        catch(err){
                            console.log('[tFillForm] ', err);
                        }
                    }
                    break;
                  default:
                    // code block
                }
            }
            else{
                // j_ele_name.val(null);
                console.log('[tFillForm] Not found element...', name);
            }
        }
        catch(err) {
            console.log('err = ', err);
        }

        // ######################
        try{
            if (formEle != null && formEle.length > 0){
                var j_ele_uuid = formEle.find("[name='uuid']");
            }
            else{
                var j_ele_uuid = $("#uuidAllAdminMenuWebsiteInputId");
            }
            var this_id = j_ele_uuid.attr('id');
            console.log('[tFillForm] this_id = ', this_id);
        // ######################
            if (j_ele_uuid.length > 0){
                var tagName = j_ele_uuid.prop("tagName");
                console.log('[tFillForm] Tag name = ', tagName);
                // if (j_ele_uuid.attr('name') != 'uuid'){
        // ######################
                switch(tagName) {
                  case "INPUT":
                    j_ele_uuid.val(self.uuid).change();
                    break;
        // ######################
                  case "TEXTAREA":
                    j_ele_uuid.text(self.uuid).change();

                    // For CKEDITOR update
                    if (j_ele_uuid.hasClass('ckeditor-input')){
                        var _if = $("#cke_" + this_id).find('iframe');
                        _if.contents().find('body').html(self.uuid);
                    }
                    break;
        // ######################
                  case "SELECT":
                    var tx = j_ele_uuid;
                    // ManyToMany Field processing
                    if (typeof tx.attr('multiple') != "undefined"){
                        console.log('[tFillForm][case "SELECT":] Select many2many...');
                        if (Array.isArray(self.uuid)){
                            var tmpArr = self.uuid.map(function(elem){
                                if (elem != null && elem.hasOwnProperty('uuid')){
                                    return elem.uuid;
                                }
                                else{
                                    return elem;
                                }
                            })
                            $(tx).val(tmpArr);
                            $(tx).trigger('change');
                        }
                    }
                    // Foreign Key process
                    else{
                        try{
                            var se = self.uuid;
                            if ( typeof se != 'undefined' && se != null ) {
                                if (self.uuid.hasOwnProperty('uuid')){
                                    $(j_ele_uuid).val(self.uuid.uuid).change();
                                }
                                else{
                                    if (self.uuid.hasOwnProperty('id')){
                                        $(j_ele_uuid).val(self.uuid.id).change();
                                    }
                                    else{
                                        // Not object --> set value:
                                        $(j_ele_uuid).val(self.uuid).change();
                                    }
                                }
                            }
                        }
                        catch(err){
                            console.log('[tFillForm] ', err);
                        }
                    }
                    break;
                  default:
                    // code block
                }
            }
            else{
                // j_ele_uuid.val(null);
                console.log('[tFillForm] Not found element...', uuid);
            }
        }
        catch(err) {
            console.log('err = ', err);
        }

        // ######################
        try{
            if (formEle != null && formEle.length > 0){
                var j_ele_title = formEle.find("[name='title']");
            }
            else{
                var j_ele_title = $("#titleAllAdminMenuWebsiteInputId");
            }
            var this_id = j_ele_title.attr('id');
            console.log('[tFillForm] this_id = ', this_id);
        // ######################
            if (j_ele_title.length > 0){
                var tagName = j_ele_title.prop("tagName");
                console.log('[tFillForm] Tag name = ', tagName);
                // if (j_ele_title.attr('name') != 'uuid'){
        // ######################
                switch(tagName) {
                  case "INPUT":
                    j_ele_title.val(self.title).change();
                    break;
        // ######################
                  case "TEXTAREA":
                    j_ele_title.text(self.title).change();

                    // For CKEDITOR update
                    if (j_ele_title.hasClass('ckeditor-input')){
                        var _if = $("#cke_" + this_id).find('iframe');
                        _if.contents().find('body').html(self.title);
                    }
                    break;
        // ######################
                  case "SELECT":
                    var tx = j_ele_title;
                    // ManyToMany Field processing
                    if (typeof tx.attr('multiple') != "undefined"){
                        console.log('[tFillForm][case "SELECT":] Select many2many...');
                        if (Array.isArray(self.title)){
                            var tmpArr = self.title.map(function(elem){
                                if (elem != null && elem.hasOwnProperty('uuid')){
                                    return elem.uuid;
                                }
                                else{
                                    return elem;
                                }
                            })
                            $(tx).val(tmpArr);
                            $(tx).trigger('change');
                        }
                    }
                    // Foreign Key process
                    else{
                        try{
                            var se = self.title;
                            if ( typeof se != 'undefined' && se != null ) {
                                if (self.title.hasOwnProperty('uuid')){
                                    $(j_ele_title).val(self.title.uuid).change();
                                }
                                else{
                                    if (self.title.hasOwnProperty('id')){
                                        $(j_ele_title).val(self.title.id).change();
                                    }
                                    else{
                                        // Not object --> set value:
                                        $(j_ele_title).val(self.title).change();
                                    }
                                }
                            }
                        }
                        catch(err){
                            console.log('[tFillForm] ', err);
                        }
                    }
                    break;
                  default:
                    // code block
                }
            }
            else{
                // j_ele_title.val(null);
                console.log('[tFillForm] Not found element...', title);
            }
        }
        catch(err) {
            console.log('err = ', err);
        }

        // ######################
        try{
            if (formEle != null && formEle.length > 0){
                var j_ele_icon_class = formEle.find("[name='icon_class']");
            }
            else{
                var j_ele_icon_class = $("#icon_classAllAdminMenuWebsiteInputId");
            }
            var this_id = j_ele_icon_class.attr('id');
            console.log('[tFillForm] this_id = ', this_id);
        // ######################
            if (j_ele_icon_class.length > 0){
                var tagName = j_ele_icon_class.prop("tagName");
                console.log('[tFillForm] Tag name = ', tagName);
                // if (j_ele_icon_class.attr('name') != 'uuid'){
        // ######################
                switch(tagName) {
                  case "INPUT":
                    j_ele_icon_class.val(self.icon_class).change();
                    break;
        // ######################
                  case "TEXTAREA":
                    j_ele_icon_class.text(self.icon_class).change();

                    // For CKEDITOR update
                    if (j_ele_icon_class.hasClass('ckeditor-input')){
                        var _if = $("#cke_" + this_id).find('iframe');
                        _if.contents().find('body').html(self.icon_class);
                    }
                    break;
        // ######################
                  case "SELECT":
                    var tx = j_ele_icon_class;
                    // ManyToMany Field processing
                    if (typeof tx.attr('multiple') != "undefined"){
                        console.log('[tFillForm][case "SELECT":] Select many2many...');
                        if (Array.isArray(self.icon_class)){
                            var tmpArr = self.icon_class.map(function(elem){
                                if (elem != null && elem.hasOwnProperty('uuid')){
                                    return elem.uuid;
                                }
                                else{
                                    return elem;
                                }
                            })
                            $(tx).val(tmpArr);
                            $(tx).trigger('change');
                        }
                    }
                    // Foreign Key process
                    else{
                        try{
                            var se = self.icon_class;
                            if ( typeof se != 'undefined' && se != null ) {
                                if (self.icon_class.hasOwnProperty('uuid')){
                                    $(j_ele_icon_class).val(self.icon_class.uuid).change();
                                }
                                else{
                                    if (self.icon_class.hasOwnProperty('id')){
                                        $(j_ele_icon_class).val(self.icon_class.id).change();
                                    }
                                    else{
                                        // Not object --> set value:
                                        $(j_ele_icon_class).val(self.icon_class).change();
                                    }
                                }
                            }
                        }
                        catch(err){
                            console.log('[tFillForm] ', err);
                        }
                    }
                    break;
                  default:
                    // code block
                }
            }
            else{
                // j_ele_icon_class.val(null);
                console.log('[tFillForm] Not found element...', icon_class);
            }
        }
        catch(err) {
            console.log('err = ', err);
        }

        // ######################
        try{
            if (formEle != null && formEle.length > 0){
                var j_ele_url = formEle.find("[name='url']");
            }
            else{
                var j_ele_url = $("#urlAllAdminMenuWebsiteInputId");
            }
            var this_id = j_ele_url.attr('id');
            console.log('[tFillForm] this_id = ', this_id);
        // ######################
            if (j_ele_url.length > 0){
                var tagName = j_ele_url.prop("tagName");
                console.log('[tFillForm] Tag name = ', tagName);
                // if (j_ele_url.attr('name') != 'uuid'){
        // ######################
                switch(tagName) {
                  case "INPUT":
                    j_ele_url.val(self.url).change();
                    break;
        // ######################
                  case "TEXTAREA":
                    j_ele_url.text(self.url).change();

                    // For CKEDITOR update
                    if (j_ele_url.hasClass('ckeditor-input')){
                        var _if = $("#cke_" + this_id).find('iframe');
                        _if.contents().find('body').html(self.url);
                    }
                    break;
        // ######################
                  case "SELECT":
                    var tx = j_ele_url;
                    // ManyToMany Field processing
                    if (typeof tx.attr('multiple') != "undefined"){
                        console.log('[tFillForm][case "SELECT":] Select many2many...');
                        if (Array.isArray(self.url)){
                            var tmpArr = self.url.map(function(elem){
                                if (elem != null && elem.hasOwnProperty('uuid')){
                                    return elem.uuid;
                                }
                                else{
                                    return elem;
                                }
                            })
                            $(tx).val(tmpArr);
                            $(tx).trigger('change');
                        }
                    }
                    // Foreign Key process
                    else{
                        try{
                            var se = self.url;
                            if ( typeof se != 'undefined' && se != null ) {
                                if (self.url.hasOwnProperty('uuid')){
                                    $(j_ele_url).val(self.url.uuid).change();
                                }
                                else{
                                    if (self.url.hasOwnProperty('id')){
                                        $(j_ele_url).val(self.url.id).change();
                                    }
                                    else{
                                        // Not object --> set value:
                                        $(j_ele_url).val(self.url).change();
                                    }
                                }
                            }
                        }
                        catch(err){
                            console.log('[tFillForm] ', err);
                        }
                    }
                    break;
                  default:
                    // code block
                }
            }
            else{
                // j_ele_url.val(null);
                console.log('[tFillForm] Not found element...', url);
            }
        }
        catch(err) {
            console.log('err = ', err);
        }

        try{
            if (formEle != null && formEle.length > 0){
                var j_ele_icon = formEle.find("[name='icon']");
            }
            else{
                var j_ele_icon = $("#iconAllAdminMenuWebsiteInputIdCurrentFileId");
            }
            if (j_ele_icon.length > 0){
                if (typeof self.icon != "undefined"){
                    j_ele_icon.text(" " + self.icon.substring(self.icon.lastIndexOf('/')+1));
                    j_ele_icon.attr("href", self.icon);
                    j_ele_icon.attr("url", self.icon);
                    j_ele_icon.attr("data-toggle", "modal");
                    j_ele_icon.addClass("current-file-preview");
                }
            }
            else{
                // j_ele_icon.val(null);
                console.log('[tFillForm] Not found element...', icon);
            }
        }
        catch(err) {
            console.log('err = ', err);
        }

        // ######################
        try{
            if (formEle != null && formEle.length > 0){
                var j_ele_icon_base64 = formEle.find("[name='icon_base64']");
            }
            else{
                var j_ele_icon_base64 = $("#icon_base64AllAdminMenuWebsiteInputId");
            }
            var this_id = j_ele_icon_base64.attr('id');
            console.log('[tFillForm] this_id = ', this_id);
        // ######################
            if (j_ele_icon_base64.length > 0){
                var tagName = j_ele_icon_base64.prop("tagName");
                console.log('[tFillForm] Tag name = ', tagName);
                // if (j_ele_icon_base64.attr('name') != 'uuid'){
        // ######################
                switch(tagName) {
                  case "INPUT":
                    j_ele_icon_base64.val(self.icon_base64).change();
                    break;
        // ######################
                  case "TEXTAREA":
                    j_ele_icon_base64.text(self.icon_base64).change();

                    // For CKEDITOR update
                    if (j_ele_icon_base64.hasClass('ckeditor-input')){
                        var _if = $("#cke_" + this_id).find('iframe');
                        _if.contents().find('body').html(self.icon_base64);
                    }
                    break;
        // ######################
                  case "SELECT":
                    var tx = j_ele_icon_base64;
                    // ManyToMany Field processing
                    if (typeof tx.attr('multiple') != "undefined"){
                        console.log('[tFillForm][case "SELECT":] Select many2many...');
                        if (Array.isArray(self.icon_base64)){
                            var tmpArr = self.icon_base64.map(function(elem){
                                if (elem != null && elem.hasOwnProperty('uuid')){
                                    return elem.uuid;
                                }
                                else{
                                    return elem;
                                }
                            })
                            $(tx).val(tmpArr);
                            $(tx).trigger('change');
                        }
                    }
                    // Foreign Key process
                    else{
                        try{
                            var se = self.icon_base64;
                            if ( typeof se != 'undefined' && se != null ) {
                                if (self.icon_base64.hasOwnProperty('uuid')){
                                    $(j_ele_icon_base64).val(self.icon_base64.uuid).change();
                                }
                                else{
                                    if (self.icon_base64.hasOwnProperty('id')){
                                        $(j_ele_icon_base64).val(self.icon_base64.id).change();
                                    }
                                    else{
                                        // Not object --> set value:
                                        $(j_ele_icon_base64).val(self.icon_base64).change();
                                    }
                                }
                            }
                        }
                        catch(err){
                            console.log('[tFillForm] ', err);
                        }
                    }
                    break;
                  default:
                    // code block
                }
            }
            else{
                // j_ele_icon_base64.val(null);
                console.log('[tFillForm] Not found element...', icon_base64);
            }
        }
        catch(err) {
            console.log('err = ', err);
        }

        // ######################
        try{
            if (formEle != null && formEle.length > 0){
                var j_ele_desc = formEle.find("[name='desc']");
            }
            else{
                var j_ele_desc = $("#descAllAdminMenuWebsiteInputId");
            }
            var this_id = j_ele_desc.attr('id');
            console.log('[tFillForm] this_id = ', this_id);
        // ######################
            if (j_ele_desc.length > 0){
                var tagName = j_ele_desc.prop("tagName");
                console.log('[tFillForm] Tag name = ', tagName);
                // if (j_ele_desc.attr('name') != 'uuid'){
        // ######################
                switch(tagName) {
                  case "INPUT":
                    j_ele_desc.val(self.desc).change();
                    break;
        // ######################
                  case "TEXTAREA":
                    j_ele_desc.text(self.desc).change();

                    // For CKEDITOR update
                    if (j_ele_desc.hasClass('ckeditor-input')){
                        var _if = $("#cke_" + this_id).find('iframe');
                        _if.contents().find('body').html(self.desc);
                    }
                    break;
        // ######################
                  case "SELECT":
                    var tx = j_ele_desc;
                    // ManyToMany Field processing
                    if (typeof tx.attr('multiple') != "undefined"){
                        console.log('[tFillForm][case "SELECT":] Select many2many...');
                        if (Array.isArray(self.desc)){
                            var tmpArr = self.desc.map(function(elem){
                                if (elem != null && elem.hasOwnProperty('uuid')){
                                    return elem.uuid;
                                }
                                else{
                                    return elem;
                                }
                            })
                            $(tx).val(tmpArr);
                            $(tx).trigger('change');
                        }
                    }
                    // Foreign Key process
                    else{
                        try{
                            var se = self.desc;
                            if ( typeof se != 'undefined' && se != null ) {
                                if (self.desc.hasOwnProperty('uuid')){
                                    $(j_ele_desc).val(self.desc.uuid).change();
                                }
                                else{
                                    if (self.desc.hasOwnProperty('id')){
                                        $(j_ele_desc).val(self.desc.id).change();
                                    }
                                    else{
                                        // Not object --> set value:
                                        $(j_ele_desc).val(self.desc).change();
                                    }
                                }
                            }
                        }
                        catch(err){
                            console.log('[tFillForm] ', err);
                        }
                    }
                    break;
                  default:
                    // code block
                }
            }
            else{
                // j_ele_desc.val(null);
                console.log('[tFillForm] Not found element...', desc);
            }
        }
        catch(err) {
            console.log('err = ', err);
        }

        // ######################
        try{
            if (formEle != null && formEle.length > 0){
                var j_ele_order = formEle.find("[name='order']");
            }
            else{
                var j_ele_order = $("#orderAllAdminMenuWebsiteInputId");
            }
            var this_id = j_ele_order.attr('id');
            console.log('[tFillForm] this_id = ', this_id);
        // ######################
            if (j_ele_order.length > 0){
                var tagName = j_ele_order.prop("tagName");
                console.log('[tFillForm] Tag name = ', tagName);
                // if (j_ele_order.attr('name') != 'uuid'){
        // ######################
                switch(tagName) {
                  case "INPUT":
                    j_ele_order.val(self.order).change();
                    break;
        // ######################
                  case "TEXTAREA":
                    j_ele_order.text(self.order).change();

                    // For CKEDITOR update
                    if (j_ele_order.hasClass('ckeditor-input')){
                        var _if = $("#cke_" + this_id).find('iframe');
                        _if.contents().find('body').html(self.order);
                    }
                    break;
        // ######################
                  case "SELECT":
                    var tx = j_ele_order;
                    // ManyToMany Field processing
                    if (typeof tx.attr('multiple') != "undefined"){
                        console.log('[tFillForm][case "SELECT":] Select many2many...');
                        if (Array.isArray(self.order)){
                            var tmpArr = self.order.map(function(elem){
                                if (elem != null && elem.hasOwnProperty('uuid')){
                                    return elem.uuid;
                                }
                                else{
                                    return elem;
                                }
                            })
                            $(tx).val(tmpArr);
                            $(tx).trigger('change');
                        }
                    }
                    // Foreign Key process
                    else{
                        try{
                            var se = self.order;
                            if ( typeof se != 'undefined' && se != null ) {
                                if (self.order.hasOwnProperty('uuid')){
                                    $(j_ele_order).val(self.order.uuid).change();
                                }
                                else{
                                    if (self.order.hasOwnProperty('id')){
                                        $(j_ele_order).val(self.order.id).change();
                                    }
                                    else{
                                        // Not object --> set value:
                                        $(j_ele_order).val(self.order).change();
                                    }
                                }
                            }
                        }
                        catch(err){
                            console.log('[tFillForm] ', err);
                        }
                    }
                    break;
                  default:
                    // code block
                }
            }
            else{
                // j_ele_order.val(null);
                console.log('[tFillForm] Not found element...', order);
            }
        }
        catch(err) {
            console.log('err = ', err);
        }

        try{
            if (formEle != null && formEle.length > 0){
                var j_ele_in_main_menu = formEle.find("[name='in_main_menu']");
            }
            else{
                var j_ele_in_main_menu = $("#in_main_menuAllAdminMenuWebsiteInputId");
            }
            if (j_ele_in_main_menu.length > 0){
                var input_type = j_ele_in_main_menu.attr('type');
                console.log("[tFillForm] ", input_type);
                if (input_type == 'checkbox'){
                    if (self.in_main_menu == true){
                        j_ele_in_main_menu.prop('checked', true);
                    }
                    else {
                        j_ele_in_main_menu.prop('checked', false);
                    }
                }
            }
            else{
                // j_ele_in_main_menu.val(null);
            }
        }
        catch(err) {
            console.log('[tFillForm] err = ', err);
        }

        // ######################
        try{
            if (formEle != null && formEle.length > 0){
                var j_ele_menu_group = formEle.find("[name='menu_group']");
            }
            else{
                var j_ele_menu_group = $("#menu_groupAdminMenuGroupAllAdminMenuWebsiteInputId");
            }
            var this_id = j_ele_menu_group.attr('id');
            console.log('[tFillForm] this_id = ', this_id);
        // ######################
            if (j_ele_menu_group.length > 0){
                var tagName = j_ele_menu_group.prop("tagName");
                console.log('[tFillForm] Tag name = ', tagName);
                // if (j_ele_menu_group.attr('name') != 'uuid'){
        // ######################
                switch(tagName) {
                  case "INPUT":
                    j_ele_menu_group.val(self.menu_group).change();
                    break;
        // ######################
                  case "TEXTAREA":
                    j_ele_menu_group.text(self.menu_group).change();

                    // For CKEDITOR update
                    if (j_ele_menu_group.hasClass('ckeditor-input')){
                        var _if = $("#cke_" + this_id).find('iframe');
                        _if.contents().find('body').html(self.menu_group);
                    }
                    break;
        // ######################
                  case "SELECT":
                    var tx = j_ele_menu_group;
                    // ManyToMany Field processing
                    if (typeof tx.attr('multiple') != "undefined"){
                        console.log('[tFillForm][case "SELECT":] Select many2many...');
                        if (Array.isArray(self.menu_group)){
                            var tmpArr = self.menu_group.map(function(elem){
                                if (elem != null && elem.hasOwnProperty('uuid')){
                                    return elem.uuid;
                                }
                                else{
                                    return elem;
                                }
                            })
                            $(tx).val(tmpArr);
                            $(tx).trigger('change');
                        }
                    }
                    // Foreign Key process
                    else{
                        try{
                            var se = self.menu_group;
                            if ( typeof se != 'undefined' && se != null ) {
                                if (self.menu_group.hasOwnProperty('uuid')){
                                    $(j_ele_menu_group).val(self.menu_group.uuid).change();
                                }
                                else{
                                    if (self.menu_group.hasOwnProperty('id')){
                                        $(j_ele_menu_group).val(self.menu_group.id).change();
                                    }
                                    else{
                                        // Not object --> set value:
                                        $(j_ele_menu_group).val(self.menu_group).change();
                                    }
                                }
                            }
                        }
                        catch(err){
                            console.log('[tFillForm] ', err);
                        }
                    }
                    break;
                  default:
                    // code block
                }
            }
            else{
                // j_ele_menu_group.val(null);
                console.log('[tFillForm] Not found element...', menu_group);
            }
        }
        catch(err) {
            console.log('err = ', err);
        }

        // ######################
        try{
            if (formEle != null && formEle.length > 0){
                var j_ele_parent_menu = formEle.find("[name='parent_menu']");
            }
            else{
                var j_ele_parent_menu = $("#parent_menuAllAdminMenuAllAdminMenuWebsiteInputId");
            }
            var this_id = j_ele_parent_menu.attr('id');
            console.log('[tFillForm] this_id = ', this_id);
        // ######################
            if (j_ele_parent_menu.length > 0){
                var tagName = j_ele_parent_menu.prop("tagName");
                console.log('[tFillForm] Tag name = ', tagName);
                // if (j_ele_parent_menu.attr('name') != 'uuid'){
        // ######################
                switch(tagName) {
                  case "INPUT":
                    j_ele_parent_menu.val(self.parent_menu).change();
                    break;
        // ######################
                  case "TEXTAREA":
                    j_ele_parent_menu.text(self.parent_menu).change();

                    // For CKEDITOR update
                    if (j_ele_parent_menu.hasClass('ckeditor-input')){
                        var _if = $("#cke_" + this_id).find('iframe');
                        _if.contents().find('body').html(self.parent_menu);
                    }
                    break;
        // ######################
                  case "SELECT":
                    var tx = j_ele_parent_menu;
                    // ManyToMany Field processing
                    if (typeof tx.attr('multiple') != "undefined"){
                        console.log('[tFillForm][case "SELECT":] Select many2many...');
                        if (Array.isArray(self.parent_menu)){
                            var tmpArr = self.parent_menu.map(function(elem){
                                if (elem != null && elem.hasOwnProperty('uuid')){
                                    return elem.uuid;
                                }
                                else{
                                    return elem;
                                }
                            })
                            $(tx).val(tmpArr);
                            $(tx).trigger('change');
                        }
                    }
                    // Foreign Key process
                    else{
                        try{
                            var se = self.parent_menu;
                            if ( typeof se != 'undefined' && se != null ) {
                                if (self.parent_menu.hasOwnProperty('uuid')){
                                    $(j_ele_parent_menu).val(self.parent_menu.uuid).change();
                                }
                                else{
                                    if (self.parent_menu.hasOwnProperty('id')){
                                        $(j_ele_parent_menu).val(self.parent_menu.id).change();
                                    }
                                    else{
                                        // Not object --> set value:
                                        $(j_ele_parent_menu).val(self.parent_menu).change();
                                    }
                                }
                            }
                        }
                        catch(err){
                            console.log('[tFillForm] ', err);
                        }
                    }
                    break;
                  default:
                    // code block
                }
            }
            else{
                // j_ele_parent_menu.val(null);
                console.log('[tFillForm] Not found element...', parent_menu);
            }
        }
        catch(err) {
            console.log('err = ', err);
        }

        try{
            if (formEle != null && formEle.length > 0){
                var j_ele_login_redirect = formEle.find("[name='login_redirect']");
            }
            else{
                var j_ele_login_redirect = $("#login_redirectAllAdminMenuWebsiteInputId");
            }
            if (j_ele_login_redirect.length > 0){
                var input_type = j_ele_login_redirect.attr('type');
                console.log("[tFillForm] ", input_type);
                if (input_type == 'checkbox'){
                    if (self.login_redirect == true){
                        j_ele_login_redirect.prop('checked', true);
                    }
                    else {
                        j_ele_login_redirect.prop('checked', false);
                    }
                }
            }
            else{
                // j_ele_login_redirect.val(null);
            }
        }
        catch(err) {
            console.log('[tFillForm] err = ', err);
        }

        try{
            if (formEle != null && formEle.length > 0){
                var j_ele_active = formEle.find("[name='active']");
            }
            else{
                var j_ele_active = $("#activeAllAdminMenuWebsiteInputId");
            }
            if (j_ele_active.length > 0){
                var input_type = j_ele_active.attr('type');
                console.log("[tFillForm] ", input_type);
                if (input_type == 'checkbox'){
                    if (self.active == true){
                        j_ele_active.prop('checked', true);
                    }
                    else {
                        j_ele_active.prop('checked', false);
                    }
                }
            }
            else{
                // j_ele_active.val(null);
            }
        }
        catch(err) {
            console.log('[tFillForm] err = ', err);
        }

        try{
            if (formEle != null && formEle.length > 0){
                var j_ele_staff_only = formEle.find("[name='staff_only']");
            }
            else{
                var j_ele_staff_only = $("#staff_onlyAllAdminMenuWebsiteInputId");
            }
            if (j_ele_staff_only.length > 0){
                var input_type = j_ele_staff_only.attr('type');
                console.log("[tFillForm] ", input_type);
                if (input_type == 'checkbox'){
                    if (self.staff_only == true){
                        j_ele_staff_only.prop('checked', true);
                    }
                    else {
                        j_ele_staff_only.prop('checked', false);
                    }
                }
            }
            else{
                // j_ele_staff_only.val(null);
            }
        }
        catch(err) {
            console.log('[tFillForm] err = ', err);
        }

        try{
            if (formEle != null && formEle.length > 0){
                var j_ele_superuser_only = formEle.find("[name='superuser_only']");
            }
            else{
                var j_ele_superuser_only = $("#superuser_onlyAllAdminMenuWebsiteInputId");
            }
            if (j_ele_superuser_only.length > 0){
                var input_type = j_ele_superuser_only.attr('type');
                console.log("[tFillForm] ", input_type);
                if (input_type == 'checkbox'){
                    if (self.superuser_only == true){
                        j_ele_superuser_only.prop('checked', true);
                    }
                    else {
                        j_ele_superuser_only.prop('checked', false);
                    }
                }
            }
            else{
                // j_ele_superuser_only.val(null);
            }
        }
        catch(err) {
            console.log('[tFillForm] err = ', err);
        }

        try{
            if (formEle != null && formEle.length > 0){
                var j_ele_split_marked = formEle.find("[name='split_marked']");
            }
            else{
                var j_ele_split_marked = $("#split_markedAllAdminMenuWebsiteInputId");
            }
            if (j_ele_split_marked.length > 0){
                var input_type = j_ele_split_marked.attr('type');
                console.log("[tFillForm] ", input_type);
                if (input_type == 'checkbox'){
                    if (self.split_marked == true){
                        j_ele_split_marked.prop('checked', true);
                    }
                    else {
                        j_ele_split_marked.prop('checked', false);
                    }
                }
            }
            else{
                // j_ele_split_marked.val(null);
            }
        }
        catch(err) {
            console.log('[tFillForm] err = ', err);
        }

        // ######################
        try{
            if (formEle != null && formEle.length > 0){
                var j_ele_split_label = formEle.find("[name='split_label']");
            }
            else{
                var j_ele_split_label = $("#split_labelAllAdminMenuWebsiteInputId");
            }
            var this_id = j_ele_split_label.attr('id');
            console.log('[tFillForm] this_id = ', this_id);
        // ######################
            if (j_ele_split_label.length > 0){
                var tagName = j_ele_split_label.prop("tagName");
                console.log('[tFillForm] Tag name = ', tagName);
                // if (j_ele_split_label.attr('name') != 'uuid'){
        // ######################
                switch(tagName) {
                  case "INPUT":
                    j_ele_split_label.val(self.split_label).change();
                    break;
        // ######################
                  case "TEXTAREA":
                    j_ele_split_label.text(self.split_label).change();

                    // For CKEDITOR update
                    if (j_ele_split_label.hasClass('ckeditor-input')){
                        var _if = $("#cke_" + this_id).find('iframe');
                        _if.contents().find('body').html(self.split_label);
                    }
                    break;
        // ######################
                  case "SELECT":
                    var tx = j_ele_split_label;
                    // ManyToMany Field processing
                    if (typeof tx.attr('multiple') != "undefined"){
                        console.log('[tFillForm][case "SELECT":] Select many2many...');
                        if (Array.isArray(self.split_label)){
                            var tmpArr = self.split_label.map(function(elem){
                                if (elem != null && elem.hasOwnProperty('uuid')){
                                    return elem.uuid;
                                }
                                else{
                                    return elem;
                                }
                            })
                            $(tx).val(tmpArr);
                            $(tx).trigger('change');
                        }
                    }
                    // Foreign Key process
                    else{
                        try{
                            var se = self.split_label;
                            if ( typeof se != 'undefined' && se != null ) {
                                if (self.split_label.hasOwnProperty('uuid')){
                                    $(j_ele_split_label).val(self.split_label.uuid).change();
                                }
                                else{
                                    if (self.split_label.hasOwnProperty('id')){
                                        $(j_ele_split_label).val(self.split_label.id).change();
                                    }
                                    else{
                                        // Not object --> set value:
                                        $(j_ele_split_label).val(self.split_label).change();
                                    }
                                }
                            }
                        }
                        catch(err){
                            console.log('[tFillForm] ', err);
                        }
                    }
                    break;
                  default:
                    // code block
                }
            }
            else{
                // j_ele_split_label.val(null);
                console.log('[tFillForm] Not found element...', split_label);
            }
        }
        catch(err) {
            console.log('err = ', err);
        }

            try{
                if (formEle != null && formEle.length > 0){
                    var j_ele_updated_at = formEle.find("[name='updated_at']");
                }
                else{
                    var j_ele_updated_at = $("#updated_atAllAdminMenuWebsiteInputId");
                }
                if (j_ele_updated_at.length > 0){
                    var a = new Date(Date.parse(self.updated_at))
                    var newdate = moment(a).format('YYYY-MM-DDThh:mm:ss');
                    console.log('newdate = ', newdate);
                    j_ele_updated_at.val(newdate).change();
                }
                else{
                    // j_ele_updated_at.val(null);
                }
            }
            catch(err) {
                console.log('err = ', err);
            }
    
            try{
                if (formEle != null && formEle.length > 0){
                    var j_ele_created_at = formEle.find("[name='created_at']");
                }
                else{
                    var j_ele_created_at = $("#created_atAllAdminMenuWebsiteInputId");
                }
                if (j_ele_created_at.length > 0){
                    var a = new Date(Date.parse(self.created_at))
                    var newdate = moment(a).format('YYYY-MM-DDThh:mm:ss');
                    console.log('newdate = ', newdate);
                    j_ele_created_at.val(newdate).change();
                }
                else{
                    // j_ele_created_at.val(null);
                }
            }
            catch(err) {
                console.log('err = ', err);
            }
    
        return self;
    }
    // ########## [CREATE] post Objects to REST API --> return object if success ##############
    tCreatePostApi(targetUrl=null, async_flag=false){
        $.ajaxSetup({
            headers : {
                'CSRFToken' : getCSRFTokenValue(),
                'X-CSRFToken' : getCSRFTokenValue(), // for --> SessionAuthentication
            },
            tryCount : 0,
            retryLimit : 3,
        });
        var self = this;
        if (targetUrl==null){
            targetUrl = AllAdminMenuWebsite_URL;
        }
        $.ajax({
            url: targetUrl,
            type: "POST",
            async: async_flag,
            cache: false,
            timeout: 30000,
            //data: JSON.stringify({data:"test"}),
            //data: JSON.stringify(self),
            data: JSON.stringify(self),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                    self = new AllAdminMenuWebsite(data);
                    $.confirm({
                        title: 'Info!',
                        content: 'Save Success, Continue!',
                        buttons: {
                            "Add New": function () {
                                // : Clear form to create new
                                $.alert('Continue!');
                            },
                            Show: function () {
                                // $.alert('Canceled!');
                                $(location).prop('href', "/Workspace/AllAdminMenu/detail/" + self.uuid + "/" + '?n=' + new Date().getTime());
                            },
                            // somethingElse: {
                            //     text: 'Something else',
                            //     btnClass: 'btn-blue',
                            //     keys: ['enter', 'shift'],
                            //     action: function(){
                            //         $.alert('Something else?');
                            //     }
                            // }
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
                try{
                    $.alert({
                        title: 'Error [' + xhr.status + '] ' + thrownError ,
                        content: xhr.responseText,
                        columnClass: 'xlarge',
                    });
                }
                catch(err){
                    console.log(err);
                    alert('Error [' + xhr.status + '] ' + thrownError + ' [' + xhr.responseText + '] ');
                }
            },
        });
        return self;
    }
    // ########## [UPDATE] post Objects to REST API --> return object if success ##############
    tUpdatePostApi(targetUrl=null, async_flag=false){
        $.ajaxSetup({
            headers : {
                'CSRFToken' : getCSRFTokenValue(),
                'X-CSRFToken' : getCSRFTokenValue(), // for --> SessionAuthentication
            },
            tryCount : 0,
            retryLimit : 3,

        });
        var tempForm = $('#alladminmenuWebsiteEditFormId');
        var formData = new FormData(tempForm[0]);
        // Fill checkbox status
        var checkbox = tempForm.find("input[type=checkbox]");
        $.each(checkbox, function(key, val) {
            formData.append($(val).attr('name'), this.is(':checked'))
        });

        if (this.hasOwnProperty('uuid') == false){
            this.uuid = tempForm.attr('data-uuid');
        }
        var self = this;

        var file_eles = $(".alladminmenu-website");
        for (var i = 0; i < file_eles.length; i++) {
            console.log('file_eles[i] = ', file_eles[i]);
            var files = file_eles[i].files;
            // Check file selected or not
            if(files.length > 0 ) {
                formData.append(file_eles[i].getAttribute('name'), files[0]);
            }
        }
        if (targetUrl==null){
            targetUrl = AllAdminMenuWebsite_URL + self.uuid + "/";
        }
        $.ajax({
            url: targetUrl,
            // type: "PUT",
            type: "PATCH",
            async: async_flag,
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
                    self = new AllAdminMenuWebsite(data);
                    alert('Update succeed...');
                    $(location).prop('href', "/Workspace/AllAdminMenu/detail/" + self.uuid + "/" + '?n=' + new Date().getTime());
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
                try{
                    $.alert({
                        title: 'Error [' + xhr.status + '] ' + thrownError ,
                        content: xhr.responseText,
                        columnClass: 'xlarge',
                    });
                }
                catch(err){
                    console.log(err);
                    alert('Error [' + xhr.status + '] ' + thrownError + ' [' + xhr.responseText + '] ');
                }
            },
        });
        return self;
    }
    // ########## [FORMDATA] [CREATE] post FORM DATA to REST API --> return object if success ##############
    tCreateNewPostFormData(formData=null, targetUrl=null, async_flag=false){
        $.ajaxSetup({
            headers : {
                'CSRFToken' : getCSRFTokenValue(),
                'X-CSRFToken' : getCSRFTokenValue(), // for --> SessionAuthentication
            },
            tryCount : 0,
            retryLimit : 3,
        });
        var self = this;
        if (formData == null){
            return;
        }

        if (targetUrl==null){
            targetUrl = AllAdminMenuWebsite_URL;
        }
        $.ajax({
            url: targetUrl,
            type: "POST",
            async: async_flag,
            cache: false,
            timeout: 30000,
            data: formData,
            //contentType: "multipart/form-data",
            contentType: false,
            // dataType : false,
            processData: false,
            success: function (data) {
                    self = new AllAdminMenuWebsite(data);
                    try {
                        $.confirm({
                            title: 'Information!',
                            content: 'Save Success, Continue!',
                            buttons: {
                                "Add More": function () {
                                    // : Clear form to create new
                                    // $.alert('Continue!');
                                    $(location).prop('href', "/Workspace/AllAdminMenu/create/");
                                },
                                "View Detail": function () {
                                    // $.alert('Canceled!');
                                    $(location).prop('href', "/Workspace/AllAdminMenu/detail/" + self.uuid + "/" + '?n=' + new Date().getTime());
                                },
                                "Cancel": function(){
                                    return;
                                },
                                // somethingElse: {
                                //     text: 'Something else',
                                //     btnClass: 'btn-blue',
                                //     keys: ['enter', 'shift'],
                                //     action: function(){
                                //         $.alert('Something else?');
                                //     }
                                // }
                            }
                        });
                    }
                    catch (err){
                        console.log(err);
                        $(location).prop('href', "/Workspace/AllAdminMenu/detail/" + self.uuid + "/" + '?n=' + new Date().getTime());
                    }
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
                try{
                    $.alert({
                        title: 'Error [' + xhr.status + '] ' + thrownError ,
                        content: xhr.responseText,
                        columnClass: 'xlarge',
                    });
                }
                catch(err){
                    console.log(err);
                    alert('Error [' + xhr.status + '] ' + thrownError + ' [' + xhr.responseText + '] ');
                }
            },
        });
        return self;
    }
    // ########## [FORM] [CREATE] post Objects to REST API --> return object if success ##############
    tCreateNewPostFormApi(formId=null, targetUrl=null, async_flag=false){
        $.ajaxSetup({
            headers : {
                'CSRFToken' : getCSRFTokenValue(),
                'X-CSRFToken' : getCSRFTokenValue(), // for --> SessionAuthentication
            },
            tryCount : 0,
            retryLimit : 3,
        });
        $('#idAllAdminMenuWebsiteInputId').val(null);
        $('#uuidAllAdminMenuWebsiteInputId').val(uuidv4());
        var self = this;
        if (formId == null){
            var tempForm = $('#alladminmenuWebsiteCreateFormId')
        }
        else{
            var tempForm = $('#' + formId);
        }
        var formData = new FormData(tempForm[0]);

        // Fill checkbox status
        var checkbox = tempForm.find("input[type=checkbox]");
        $.each(checkbox, function(key, val) {
            // formData.append($(val).attr('name'), $(val).is(':checked'));
            formData.set($(val).attr('name'), $(val).is(':checked'));
        });

        var file_eles = $(".alladminmenu-website");
        for (var i = 0; i < file_eles.length; i++) {
            console.log('file_eles[i] = ', file_eles[i]);
            var files = file_eles[i].files;
            // Check file selected or not
            if(files.length > 0 ) {
                formData.append(file_eles[i].getAttribute('name'), files[0]);
            }
        }
        if (targetUrl==null){
            targetUrl = AllAdminMenuWebsite_URL;
        }
        $.ajax({
            url: targetUrl,
            type: "POST",
            async: async_flag,
            cache: false,
            timeout: 30000,
            data: formData,
            //contentType: "multipart/form-data",
            contentType: false,
            // dataType : false,
            processData: false,
            success: function (data) {
                    self = new AllAdminMenuWebsite(data);
                    try {
                        $.confirm({
                            title: 'Information!',
                            content: 'Save Success, Continue!',
                            buttons: {
                                "Add More": function () {
                                    // : Clear form to create new
                                    // $.alert('Continue!');
                                    $(location).prop('href', "/Workspace/AllAdminMenu/create/");
                                },
                                "View Detail": function () {
                                    // $.alert('Canceled!');
                                    $(location).prop('href', "/Workspace/AllAdminMenu/detail/" + self.uuid + "/" + '?n=' + new Date().getTime());
                                },
                                "Cancel": function(){
                                    return;
                                },
                                // somethingElse: {
                                //     text: 'Something else',
                                //     btnClass: 'btn-blue',
                                //     keys: ['enter', 'shift'],
                                //     action: function(){
                                //         $.alert('Something else?');
                                //     }
                                // }
                            }
                        });
                    }
                    catch (err){
                        console.log(err);
                        $(location).prop('href', "/Workspace/AllAdminMenu/detail/" + self.uuid + "/" + '?n=' + new Date().getTime());
                    }
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
                try{
                    $.alert({
                        title: 'Error [' + xhr.status + '] ' + thrownError ,
                        content: xhr.responseText,
                        columnClass: 'xlarge',
                    });
                }
                catch(err){
                    console.log(err);
                    alert('Error [' + xhr.status + '] ' + thrownError + ' [' + xhr.responseText + '] ');
                }
            },
        });
        return self;
    }
    // ########## [FORM] [UPDATE] post Objects to REST API --> return object if success ##############
    tUpdatePostFormApi(formId=null, targetUrl=null, async_flag=false){
        $.ajaxSetup({
            headers : {
                'CSRFToken' : getCSRFTokenValue(),
                'X-CSRFToken' : getCSRFTokenValue(), // for --> SessionAuthentication
            },
            tryCount : 0,
            retryLimit : 3,
        });
        // $('#idAllAdminMenuWebsiteInputId').val(null);
        // $('#uuidAllAdminMenuWebsiteInputId').val(uuidv4());
        if (formId == null){
            var tempForm = $('#alladminmenuWebsiteEditFormId');
        }
        else{
            var tempForm = $('#' + formId);
        }
        if (this.uuid == null){
            this.uuid = tempForm.attr('data-uuid');
        }
        var formData = new FormData(tempForm[0]);

        // Fill checkbox status
        var checkbox = tempForm.find("input[type=checkbox]");
        $.each(checkbox, function(key, val) {
            // formData.append($(val).attr('name'), $(val).is(':checked'));
            formData.set($(val).attr('name'), $(val).is(':checked'));
        });

        var file_eles = $(".alladminmenu-website");
        for (var i = 0; i < file_eles.length; i++) {
            console.log('file_eles[i] = ', file_eles[i]);
            var files = file_eles[i].files;
            // Check file selected or not
            if(files.length > 0 ) {
                formData.append(file_eles[i].getAttribute('name'), files[0]);
            }
        }
        var self = this;

        if (targetUrl==null){
            targetUrl = AllAdminMenuWebsite_URL + self.uuid + "/";
        }
        $.ajax({
            url: targetUrl,
            type: "PATCH",
            //type: "PUT",
            async: async_flag,
            cache: false,
            timeout: 30000,
            data: formData,
            //contentType: "multipart/form-data",
            contentType: false,
            // dataType : false,
            processData: false,
            success: function (data) {
                    self = new AllAdminMenuWebsite(data);
                    $.confirm({
                        title: 'Information!',
                        content: 'Save Success, Continue!',
                        buttons: {
                            "View Detail": function () {
                                $(location).prop('href', "/Workspace/AllAdminMenu/detail/" + self.uuid + "/" + '?n=' + new Date().getTime());
                            },
                            "Cancel": function(){
                                return;
                            },
                        }
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
                try{
                    $.alert({
                        title: 'Error [' + xhr.status + '] ' + thrownError ,
                        content: xhr.responseText,
                        columnClass: 'xlarge',
                    });
                }
                catch(err){
                    console.log(err);
                    alert('Error [' + xhr.status + '] ' + thrownError + ' [' + xhr.responseText + '] ');
                }
            },
        });
        return self;
    }
    tDeleteApi(targetUrl=null, async_flag=false){
        $.ajaxSetup({
            headers : {
                'CSRFToken' : getCSRFTokenValue(),
                'X-CSRFToken' : getCSRFTokenValue(), // for --> SessionAuthentication
            },
            tryCount : 0,
            retryLimit : 3,
        });


        var self = this;
        console.log('self.uuid = ', self.uuid);
        if (targetUrl==null){
            targetUrl = AllAdminMenuWebsite_URL + self.uuid + "/";
        }
        $.ajax({
            url: targetUrl,
            type: "DELETE",
            async: async_flag,
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
                // $.alert({
                //     title: 'Alert!',
                //     content: 'Delete succeed...',
                // });
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
                try{
                    $.alert({
                        title: 'Error [' + xhr.status + '] ' + thrownError ,
                        content: xhr.responseText,
                        columnClass: 'xlarge',
                    });
                }
                catch(err){
                    console.log(err);
                    alert('Error [' + xhr.status + '] ' + thrownError + ' [' + xhr.responseText + '] ');
                }
            },
        });
    }
    // ########## get Objects from REST API --> return array of objects ##############
    tGetAllObjApi(targetUrl=null,
                    async_flag=false,
                    fill_table=true,
                    tableId=null,
                    page=1){
        var results = [];
        $.ajaxSetup({
            headers : {
                'CSRFToken' : getCSRFTokenValue(),
                'X-CSRFToken' : getCSRFTokenValue(), // for --> SessionAuthentication
            },
            tryCount : 0,
            retryLimit : 3,
        });
        if (targetUrl==null){
            if ($.isNumeric(page)){
                targetUrl = AllAdminMenuWebsite_URL + "?page=" + page;
            }
            else{
                targetUrl = AllAdminMenuWebsite_URL;
            }
        }
        $.ajax({
            url: targetUrl,
            type: "GET",
            async: async_flag,
            cache: false,
            timeout: 30000,

            success: function (data) {
                console.log('[tGetAllObjApi] data = ', data);
                // return new AllAdminMenuWebsite(data);
                if (data.hasOwnProperty('results')){
                    for (var j=0; j < data.results.length; j++){
                        var tmp = new AllAdminMenuWebsite(data.results[j]);
                        results.push(tmp);
                        if (fill_table == true){
                            if (tableId == null){
                                tmp.tFillTable2();
                                ALLADMINMENU_WEBSITE_ID_TABLE_COUNT++;
                            }
                            else{
                                tmp.tFillTable2(tableId);
                            }
                        }
                    }
                    if (data.hasOwnProperty('next') && data.next !== null && $.isNumeric(page) == false){
                        // Maximum result should only lower than 1.000
                        if ( ALLADMINMENU_WEBSITE_ID_TABLE_COUNT < 1000){
                            this.url = data.next;
                            $.ajax(this);
                        }
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
                try{
                    $.alert({
                        title: 'Error [' + xhr.status + '] ' + thrownError ,
                        content: xhr.responseText,
                        columnClass: 'xlarge',
                    });
                }
                catch(err){
                    console.log(err);
                    alert('Error [' + xhr.status + '] ' + thrownError + ' [' + xhr.responseText + '] ');
                }
            },
        });
        return results;
    }
    // ########## get Inline Objects from REST API --> return array of objects ##############
    tGetInlineObjApi(targetUrl=null,
                    async_flag=false,
                    fill_table=true,
                    page=1){
        var results = [];
        $.ajaxSetup({
            headers : {
                'CSRFToken' : getCSRFTokenValue(),
                'X-CSRFToken' : getCSRFTokenValue(), // for --> SessionAuthentication
            },
            tryCount : 0,
            retryLimit : 3,
        });
        if (targetUrl==null){
            targetUrl = AllAdminMenuWebsite_INLINE_URL + "?page=" + page;
        }
        $.ajax({
            url: targetUrl,
            type: "GET",
            async: async_flag,
            cache: false,
            timeout: 30000,

            success: function (data) {
                console.log('[tGetAllObjApi] data = ', data);
                // return new AllAdminMenuWebsite(data);
                if (data.hasOwnProperty('results')){
                    for (var j=0; j < data.results.length; j++){
                        var tmp = new AllAdminMenuWebsite(data.results[j]);
                        results.push(tmp);
                        if (fill_table == true){
                            if (tableId == null){
                                tmp.tFillTable2();
                                ALLADMINMENU_WEBSITE_ID_TABLE_COUNT++;
                            }
                            else{
                                tmp.tFillTable2(tableId);
                            }
                        }
                    }
                    if (data.hasOwnProperty('next') && data.next !== null){
                        this.url = data.next;
                        $.ajax(this);
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
                try{
                    $.alert({
                        title: 'Error [' + xhr.status + '] ' + thrownError ,
                        content: xhr.responseText,
                        columnClass: 'xlarge',
                    });
                }
                catch(err){
                    console.log(err);
                    alert('Error [' + xhr.status + '] ' + thrownError + ' [' + xhr.responseText + '] ');
                }
            },
        });
        return results;
    }
    // ########## get Objects from REST API --> return array of objects ##############
    tSearchAllObjApi(keyword,
                        targetUrl=null,
                        async_flag=true,
                        fill_table=true,
                        page=1){
        var results = [];
        $.ajaxSetup({
            headers : {
                'CSRFToken' : getCSRFTokenValue(),
                'X-CSRFToken' : getCSRFTokenValue(), // for --> SessionAuthentication
            },
            tryCount : 0,
            retryLimit : 3,
        });
        if (targetUrl==null){
            targetUrl = AllAdminMenuWebsite_SEARCH_URL + "?search=" + keyword + "?page=" + page;
        }
        $.ajax({
            url: targetUrl,
            type: "GET",
            async: async_flag,
            cache: false,
            timeout: 30000,

            success: function (data) {
                console.log('[tSearchAllObjApi] data = ', data);
                // return new AllAdminMenuWebsite(data);
                if (data.hasOwnProperty('results')){
                    for (var j=0; j < data.results.length; j++){
                        var tmp = new AllAdminMenuWebsite(data.results[j]);
                        results.push(tmp);
                        if (fill_table == true){
                            tmp.tFillTable2();
                            ALLADMINMENU_WEBSITE_ID_TABLE_COUNT++;
                        }
                    }
                    if (data.hasOwnProperty('next') && data.next !== null){
                        this.url = data.next;
                        $.ajax(this);
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
                try{
                    $.alert({
                        title: 'Error [' + xhr.status + '] ' + thrownError ,
                        content: xhr.responseText,
                        columnClass: 'xlarge',
                    });
                }
                catch(err){
                    console.log(err);
                    alert('Error [' + xhr.status + '] ' + thrownError + ' [' + xhr.responseText + '] ');
                }
            },
        });
        return results;
    }
    // ########## get Objects from REST API --> return array of objects ##############
    tFilterSearchAllObjApi(search_data=null,
                            targetUrl=null,
                            async_flag=true,
                            fill_table=true,
                            tableId=null,
                            inlineMode=false,
                            page=1){
        if (search_data == null){
            // @tnd: get search data from current form:
        }
        var results = [];
        $.ajaxSetup({
            headers : {
                'CSRFToken' : getCSRFTokenValue(),
                'X-CSRFToken' : getCSRFTokenValue(), // for --> SessionAuthentication
            },
            tryCount : 0,
            retryLimit : 3,
        });
        if (targetUrl==null){
            targetUrl = AllAdminMenuWebsite_FILTER_SEARCH_URL + "?page=" + page;
        }
        $.ajax({
            url: targetUrl,
            type: "GET",
            data: search_data,
            async: async_flag,
            cache: false,
            timeout: 30000,

            success: function (data) {
                console.log('[tFilterSearchAllObjApi] data = ', data);
                // return new AllAdminMenuWebsite(data);
                if (data.hasOwnProperty('results')){
                    for (var j=0; j < data.results.length; j++){
                        var tmp = new AllAdminMenuWebsite(data.results[j]);
                        results.push(tmp);
                        if (fill_table == true){
                            if (tableId == null){
                                tmp.tFillTable2();
                                ALLADMINMENU_WEBSITE_ID_TABLE_COUNT++;
                            }
                            else{
                                if (inlineMode==true){
                                    tmp.tFillTable2(tableId=tableId,
                                                    inlineMode=true);
                                }
                                else{
                                    tmp.tFillTable2(tableId=tableId,
                                                    inlineMode=false);
                                }
                                ALLADMINMENU_WEBSITE_ID_INLINE_TABLE_COUNT++;
                            }
                        }
                    }
                    if (data.hasOwnProperty('next') && data.next !== null){
                        this.url = data.next;
                        $.ajax(this);
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
                try{
                    $.alert({
                        title: 'Error [' + xhr.status + '] ' + thrownError ,
                        content: xhr.responseText,
                        columnClass: 'col-md-8',
                    });
                }
                catch(err){
                    console.log(err);
                    console.log('Error [' + xhr.status + '] ' + thrownError + ' [' + xhr.responseText + '] ');
                }
            },
        });
        return results;
    }
    // ########## GET ONLY ONE OBJ FROM REST API (RETURN 01 OBJECTS) ##############
    tGetObjApi(uuid, targetUrl=null, async_flag=false){
        if (uuid == null || uuid == ""){
            return null;
        }
        $.ajaxSetup({
            headers : {
                'CSRFToken' : getCSRFTokenValue(),
                'X-CSRFToken' : getCSRFTokenValue(), // for --> SessionAuthentication
            },
            tryCount : 0,
            retryLimit : 3,
        });
        if (targetUrl == null){
            if (uuid != null){
                targetUrl = AllAdminMenuWebsite_URL + uuid + "/";
            }
            else{
                if(this.uuid != null){
                    targetUrl = AllAdminMenuWebsite_URL + this.uuid + "/";
                }
                else{
                    console.log('Not found uuid...');
                    return null;
                }
            }
        }
        var crr_obj = null;
        $.ajax({
            url: targetUrl,
            type: "GET",
            async: async_flag,
            cache: false,
            timeout: 30000,

            success: function (data) {
                console.log('[tGetObjApi] data = ', data);
                var n_obj = new AllAdminMenuWebsite(data);
                try{
                    console.log('[tGetObjApi] n_obj = ', n_obj);
                    // n_obj.tFillForm();
                }
                catch (err){
                    console.log(err);
                }
                crr_obj = n_obj;
                // if (data.hasOwnProperty('results')){
                //    if (data.results.length > 0){
                //        var tmp = new AllAdminMenuWebsite(data.results[i]);
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
                try{
                    $.alert({
                        title: 'Error [' + xhr.status + '] ' + thrownError ,
                        content: xhr.responseText,
                        columnClass: 'xlarge',
                    });
                }
                catch(err){
                    console.log(err);
                    alert('Error [' + xhr.status + '] ' + thrownError + ' [' + xhr.responseText + '] ');
                }
            },
        });
        return crr_obj;
    }

    // Fill Table type 1: General Table
    // @tnd: Not yet fix the "fit for any table" issue
    tFillTable1(tableId=null){
        if (tableId==null){
            var tbId = "AllAdminMenuWebsiteDataTableId";
            var table = $("#" + tbId);
        }
        else{
            var table = $("#" + tableId);
        }

        if (table.length > 0){
            var tableBody = table.find("tbody");

            var html_text = (`
                <tr>
                    <td><a href="` + this.detailUrl + `">` + this.name + `</a></td>
                    <td><a href="` + this.detailUrl + `">` + this.uuid + `</a></td>
                    <td><a href="` + this.detailUrl + `">` + this.code + `</a></td>
                    <td><a href="` + this.detailUrl + `">` + this.desc + `</a></td>
                    <td><a href="` + this.detailUrl + `">` + this.image + `</a></td>
                    <td><a href="` + this.detailUrl + `">` + this.name + `</a></td>
                    <td><a href="` + this.detailUrl + `">` + this.name + `</a></td>
                    <td><a href="` + this.detailUrl + `">` + this.name + `</a></td>
                    <td><a href="` + this.detailUrl + `">` + this.updated_at + `</a></td>
                    <td><a href="` + this.detailUrl + `">` + this.created_at + `</a></td>
                <tr>
            `);
            // tableBody.empty();
            tableBody.prepend(html_text).change();
            // tableBody.append(html_text).change();
            return true;
        }
        else{
            console.log('Not found dataTable Id: ,', tbId);
            return false;
        }
    }

    // Fill Table type 2: DatatableJS --> Add row
    tFillTable2(tableId=null,
                inlineMode=false){
        if (tableId==null){
            var tbId = "alladminmenuWebsiteDataTableId";
            var table = $("#" + tbId);
        }
        else{
            var table = $("#" + tableId);
        }
        if (table.length > 0){
            // $.noConflict();
            // var tableData = $(table[0]).DataTable();
            var tableData = $(table).DataTable();
            if (inlineMode == false){
                var rowData = [
                    `<a href="` + this.detailUrl + `">` + ALLADMINMENU_WEBSITE_ID_TABLE_COUNT + `</a>`,
                ];
            }
            else{
                var rowData = [
                    `<a href="` + this.detailUrl + `">` + ALLADMINMENU_WEBSITE_ID_INLINE_TABLE_COUNT + `</a>`,
                ];
            }
            // Get All Attribute of thead
            var tableHeaders = table.find('thead th');
            for (var thId = 1; thId < tableHeaders.length - 1; thId++){
                var hEle = tableHeaders[thId];
                var attr = hEle.getAttribute('attr-name');
                if (this.hasOwnProperty(attr)){
                    if (Array.isArray(this[attr])){
                        console.log(Array.isArray(this[attr]));
                        rowData.push(`<a href="` + this.detailUrl + `">` + this[attr].map(function(elem){
                            return elem.name;
                        }).join(", ") + `</a>`);
                    }
                    else{
                        if (this[attr].hasOwnProperty('name')){
                            console.log('Has name...');
                            rowData.push(`<a href="` + this.detailUrl + `">` + this[attr].name + `</a>`);
                        }
                        else{
                            // rowData.push(`<a href=""></a>`);
                            rowData.push(`<a href="` + this.detailUrl + `">` + this[attr] + `</a>`);
                        }
                    }
                    // rowData.push(`<a href="` + this.detailUrl + `">` + this[attr] + `</a>`);
                }
                else{
                    rowData.push(`<a href=""></a>`);
                }
            }
            if (inlineMode == false){
                var action_string = (`<a class="btn btn-primary alladminmenu-website-uuid-detail-button" title="" data-uuid="` + this.uuid + `" data-toggle="tooltip" data-original-title="View"><i class="far fa-eye"></i></a>
                <a class="btn btn-warning alladminmenu-website-uuid-edit-button" title="" data-uuid="` + this.uuid + `" data-toggle="tooltip" data-original-title="Edit"><i class="far fa-edit"></i></a>
                <a class="btn btn-danger alladminmenu-website-uuid-delete-button" title="" data-uuid="` + this.uuid + `" data-toggle="tooltip" data-original-title="Delete"><i class="far fa-trash-alt"></i></a>`);
            }
            else{
                var action_string = (`
                    <a class="alladminmenu-website-remove-inline-row">
                        <i class="fas fa-trash d-flex justify-content-center align-items-center"></i>
                    </a>
                `)
            }
            rowData.push(action_string);
            // Fix :text-center
            var row = tableData.row.add(rowData).draw().node();
            $(row).find('td:eq(0)').addClass('text-center');
            // $(row).addClass("text-center");
            return true;
        }
        else{
            console.log('Not found dataTable Id: ,', tbId);
            return false;
        }
    }
    // Fill List type 1:
    tFillList1(listId=null){
        if (listId==null){
            var lsId = "AllAdminMenuWebsiteListId";
            var lst = $("#" + lsId);
        }
        else{
            var lst = $("#" + listId);
        }
    }
    // Fill List type 2:
    tFillList2(listId=null){
        if (listId==null){
            var lsId = "AllAdminMenuWebsiteListId";
            var lst = $("#" + lsId);
        }
        else{
            var lst = $("#" + listId);
        }
    }
}
class AllAdminMenuWebsite_ListItem {
    constructor(data){
        if (data != null){
            this.id = data.id;
            this.uuid = data.uuid;
            this.name = data.name;
        }
        else{
            this.id = null;
            this.uuid = null;
            this.name = null;
        }
    }
}
            

var AllAdminMenuWebsiteList_CACHE = [];
// ########## Get List Class ##############
class AllAdminMenuWebsiteList {
    // ########## Init Objects ##############
    getListApi(async_flag=false){
        $.ajaxSetup({
            headers : {
                'CSRFToken' : getCSRFTokenValue(),
                'X-CSRFToken' : getCSRFTokenValue(), // for --> SessionAuthentication
            },
            tryCount : 0,
            retryLimit : 3,
        });
        $.ajax({
            url: AllAdminMenuWebsite_LIST_URL,
            type: "GET",
            async: async_flag,
            cache: false,
            timeout: 30000,

            success: function (data) {
                AllAdminMenuWebsiteList_CACHE = []
                console.log(data);
                if (data.hasOwnProperty('results')){
                    for (var i = 0; i < data.results.length; i++){
                        var x = new AllAdminMenuWebsite_ListItem(data.results[i]);
                        AllAdminMenuWebsiteList_CACHE.push(x);
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
                try{
                    $.alert({
                        title: 'Error [' + xhr.status + '] ' + thrownError ,
                        content: xhr.responseText,
                        columnClass: 'xlarge',
                    });
                }
                catch(err){
                    console.log(err);
                    alert('Error [' + xhr.status + '] ' + thrownError + ' [' + xhr.responseText + '] ');
                }
                return null;
            },
        });
        return AllAdminMenuWebsiteList_CACHE;
    }

}
$(document).ready( function () {
    // $.noConflict();
    var dt = $('#alladminmenuWebsiteDataTableId');
    if (dt.length > 0){
        var alladminmenuWebsiteDataTable = $(dt[0]).DataTable({
            dom: '<"btn-tools"B><"top"lf>rt<"bottom"ip><"clear">',
            buttons: [
                'copyHtml5',
                'print',
                'excelHtml5',
                'csvHtml5',
                'pdfHtml5',
                {
                    text: 'Reload',
                    attr: {
                        id: 'reloadEnvParametersTableId',
                        class: 'btn btn-success',
                    },
                    action: function ( e, dt, node, config ) {
                        var r = confirm("Reload data again...!");
                        if (r == true) {
                          configParaTable.ajax.reload( null, false );
                        } else {
                          console.log('Canceled...');
                        };
                    }
                },
            ]
        } );
    }
});

$(document).ready(function(){
    $(".dt-button").addClass('btn btn-success');
});

// ########## [CKEDITOR ENABLE] function ##############
$(document).ready(function(){
    $(".ckeditor-input").each(function(){
        var eleId = $(this).attr('id');
        $(this).ckeditor({extraPlugins: 'exportpdf',});
        try{
            // var inst = CKEDITOR.replace( eleId , {extraPlugins: 'exportpdf'});
        }
        catch(err){
            console.log(err);
        }
    })
});

$(document).ready(function(){
    //var all_textareas = $(".ckeditor-input");
    //for (var i = 0; i < all_textareas.length; i++){
    //    var ele = all_textareas[i];
    //    var eleId = ele.getAttribute('id');
    //    var inst = CKEDITOR.replace( eleId , {});
    //    if (inst != null){
    //        console.log('inst = ', inst);
    //        CKEDITOR.instances[eleId].on('change', function() {
    //            // console.log(this.getData());
    //            $("#" + eleId).val(this.getData());
    //        });
    //    }
    //}
});

            

// ########## [Save Button] Clicked Handle function ##############
$(document).ready(function(){
    $("#alladminmenuWebsiteCreateBtnId").click(function(){
        obj = new AllAdminMenuWebsite();
        console.log('Save obj = ', obj);
        var formEle = $(this).closest('form');
        if (formEle != null){
            var formId = formEle.attr('id');
            console.log('formId = ', formId);
            obj.tCreateNewPostFormApi(formId=formId);
        }
    })
});
$(document).ready( function () {
    $(".alladminmenu-website-modal-create-button").click(function(){
        console.log('Class clicked...');
        // var crr_obj = new AllAdminMenuWebsite();
        // crr_obj = crr_obj.tGetObjApi($(this).attr('data-uuid'));
        // crr_obj.tFillForm("alladminmenuWebsiteModalDetailFormId");
        console.log('[$(".%s-modal-create-button").click] Get done...');
    })

    $("#alladminmenuWebsiteCreateModalId").on('show.bs.modal', function (event) {
        console.log("CreateModalId...shown....");
    })
});
$(document).ready( function () {
    $("#alladminmenuWebsiteCreateModalId").on('hidden.bs.modal', function (event) {
        console.log("CreateModalId...hidden....");
        CURRENT_ALLADMINMENU_UUID = null;
        clearForm("alladminmenuWebsiteModalCreateFormId");
    })
});
$(document).ready( function () {
    $(".alladminmenu-website-modal-detail-button").click(function(){
        console.log('[$(".%s-modal-detail-button").click] Class clicked...');
        var crr_obj = new AllAdminMenuWebsite();
        var crr_uuid = $(this).attr('data-uuid');
        console.log('[$(".%s-modal-detail-button").click] crr_uuid = ' + crr_uuid);
        crr_obj = crr_obj.tGetObjApi(crr_uuid);
        crr_obj.tFillForm("alladminmenuWebsiteModalDetailFormId");
        $("#" + "alladminmenuWebsiteModalDetailFormId").attr('data-uuid', crr_uuid);
        console.log('[$(".%s-modal-detail-button").click] Get done...');

        // Load datatables
        $("#" + "alladminmenuWebsiteModalDetailFormId").find('table').each(function () {
            var tableId = $(this).attr('id');
            tLoadDetailInlineTable(tableId);
        });
    })
    $("#alladminmenuWebsiteModalDetailFormId").on('show.bs.modal', function (event) {
        console.log('[$(".%s-modal-detail-button").click] DetailModalFormId...shown....');
    })
});
$(document).ready( function () {
    $("#alladminmenuWebsiteModalDetailId").on('hidden.bs.modal', function (event) {
        console.log("ModalDetailId...hidden....");
        CURRENT_ALLADMINMENU_UUID = null;
        clearForm("alladminmenuWebsiteModalDetailFormId");
    })
});
$(document).ready( function () {
    $(".alladminmenu-website-modal-edit-button").click(function(){
        console.log('[modal-edit-button] Class clicked...');
        var crr_obj = new AllAdminMenuWebsite();
        var crr_uuid = $(this).attr('data-uuid');
        console.log('[$(".%s-modal-edit-button").click] crr_uuid = ' + crr_uuid);

        crr_obj = crr_obj.tGetObjApi(crr_uuid);
        crr_obj.tFillForm("alladminmenuWebsiteModalEditFormId");
        $("#" + "alladminmenuWebsiteModalEditFormId").attr('data-uuid', crr_uuid);
        console.log('[$(".%s-modal-edit-button").click] Get done...');

        // Load datatables
        $("#" + "alladminmenuWebsiteModalEditFormId").find('table').each(function () {
            var tableId = $(this).attr('id');
            tLoadDetailInlineTable(tableId);
        });
    })

    $("#alladminmenuWebsiteEditModalFormId").on('show.bs.modal', function (event) {
        console.log("EditModalFormId...shown....");
    })
});
$(document).ready( function () {
    $("#alladminmenuWebsiteEditModalFormId").on('hidden.bs.modal', function (event) {
        console.log("EditModalFormId...hidden....");
        CURRENT_ALLADMINMENU_UUID = null;
        clearForm("alladminmenuWebsiteEditModalFormId");
    })
});
// ########## [Edit Button] Clicked Handle function ##############
$(document).ready(function(){
    $("#alladminmenuWebsiteEditBtnId").click(function(){

    })
});
// ########## [Edit Button] Clicked Handle function ##############
$(document).ready(function(){
    $("#alladminmenuWebsiteEditBtnId").click(function(){

    })
});

// ########## [Save Button] Clicked Handle function ##############

$(document).ready(function(){
    $("#alladminmenuWebsiteUpdateBtnId").click(function(){
        obj = new AllAdminMenuWebsite();
        console.log('Update obj = ', obj);
        var fr = $(this).closest("form");
        obj.uuid = $(fr).attr('data-uuid');
        obj.tUpdatePostFormApi($(fr).attr("id"));
    })
});

// ########## [Create New Button] Clicked Handle function ##############

$(document).ready(function(){
    $("#alladminmenuWebsiteSaveAndNewBtnId").click(function(){
        obj = new AllAdminMenuWebsite();
        console.log('Save obj and create new, obj = ', obj);
        obj.tCreateNewPostFormApi();
    })
});

    

// ########## [Delete Button] Clicked Handle function ##############

$(document).ready(function(){
    $("#alladminmenuWebsiteDeleteBtnId").click(function(){
        obj = new AllAdminMenuWebsite();
        console.log('Delete obj = ', obj);
        obj.tDeleteApi();
    })
});

    
// ########## [Save Inline Button] Clicked Handle function ##############
$(document).ready(function(){
    $("#alladminmenuWebsiteInlineSaveBtnId").click(function(){
        var targetId = $(this).attr('data-target');
        postFormDataFromTableAllAdminMenuWebsite(targetId);
    })
});
// ########## [Delete Inline Button] Clicked Handle function ##############
$(document).ready(function(){
    $(".alladminmenu-website-inline-delete-button").click(function(){
        var obj = new AllAdminMenuWebsite();
        obj.uuid = $(this).attr('data-uuid');
        console.log('Delete object.uuid = ', obj.uuid);
        console.log('Delete obj = ', obj);
        obj.tDeleteApi();
    })
});

// ########## [Get List, push options to Select] Handle Event function ##############

$(document).ready(function(){
    if ($(".alladminmenu-website-select.autoload").length > 0){
        var obj = new AllAdminMenuWebsiteList();
        AllAdminMenuWebsiteList_CACHE = obj.getListApi(async_flag=false);
        var crr = null;
        for (l = 0; l < AllAdminMenuWebsiteList_CACHE.length; l++){
            crr = AllAdminMenuWebsiteList_CACHE[l]
            // $(this).append(new Option(crr.name, crr.uuid));
            if ($(".alladminmenu-website-select option[value=" + crr.uuid + "]").length > 0){
            // if ($(".alladminmenu-website-select option[value=" + crr.id + "]").length > 0){
                console.log('[.%s-%s-select.autoload] Existed... ignore option...', crr);
            }
            else{
                 $(".alladminmenu-website-select").each(function(event){
                     $(this).append(new Option(crr.name, crr.uuid));
                 })
                // $(".alladminmenu-website-select").each(function(event){
                //     $(this).append(new Option(crr.name, crr.id));
                // })
            }
        }
    }
})

    

// ########## [Delete By UUID Button] Clicked Handle function ##############

$(document).ready(function(){
    $(".alladminmenu-website-uuid-delete-button").click(function(){
        var cr_uuid = $(this).attr('data-uuid');
        if (typeof cr_uuid !== 'undefined' && cr_uuid !== false){
            if (confirm('Delete?')) {
                var obj = new AllAdminMenuWebsite();
                obj.uuid = cr_uuid;
                console.log('Delete obj = ', obj);
                obj.tDeleteApi();
                // alert('Thanks for confirming');
                $(this).closest("tr").remove();
            } else {
                // alert('Why did you press cancel? You should have confirmed');
            }
        }
    })
});

    
// ########## [Detail By UUID Button] Clicked Handle function ##############
$(document).ready(function(){
    $(".alladminmenu-website-uuid-modal-detail-button").click(function(){
        var cr_uuid = $(this).attr('data-uuid');
        console.log('[.%s-%s-uuid-modal-detail-button] cr_uuid = ', cr_uuid);
        if (typeof cr_uuid !== 'undefined' && cr_uuid !== false){
            // Show modal detail form with data uuid
        }
    })
});

// ########## [Delete By UUID Button] Clicked Handle function ##############

$(document).ready(function(){
    $(".alladminmenu-website-uuid-modal-edit-button").click(function(){
        var cr_uuid = $(this).attr('data-uuid');
        if (typeof cr_uuid !== 'undefined' && cr_uuid !== false){
            // Show modal edit form with data uuid
        }
    })
});

    
// ########## [Edit By UUID Button] Clicked Handle function ##############
$(document).ready(function(){
    //$("#alladminmenuWebsiteEditModalFormId").click(function(){
    //    var cr_uuid = $(this).attr('data-uuid');
    //    console.log('cr_uuid = ', cr_uuid);
    //    if (typeof cr_uuid !== 'undefined' && cr_uuid !== false){
    //        // Show modal detail form with data uuid
    //    }
    //})
});
// ########## tTest function ##############
function tTestAllAdminMenuWebsite(formId){
    var b_json = genAllAdminMenuWebsite();
    console.log("b_json = ", b_json);
    // var d_obj = new AllAdminMenuWebsite(b_json);
    var d_obj = new AllAdminMenuWebsite(b_json);
    // console.log('d_obj.tCreatePostApi()...', d_obj.tCreatePostApi());
    // console.log('d_obj.tCreateNewPostFormApi()...', d_obj.tCreateNewPostFormApi());
    // console.log('d_obj.tUpdatePostApi()...', d_obj.tUpdatePostApi());
    // var d_obj = new AllAdminMenuWebsiteList();
    // console.log('d_obj.getListApi()...', d_obj.getListApi());
    console.log("d_obj = ", d_obj);
    d_obj.tFillForm(formId);
    console.log("Fill form done...");
}
$(document).ready(function(){
});

// ########## [Test Button] Clicked Handle function ##############

$(document).ready(function(){
    $("#alladminmenuWebsiteTestBtnId").click(function(){
        var targetFormId = $(this).attr('target-formid');
        console.log('[$("#%s%sTestBtnId").click] targetFormId = ', targetFormId);
        tTestAllAdminMenuWebsite(targetFormId);
    })
});

    

// ########## [Fill Table] Handle Event function ##############
$(document).ready(function(){
    $("#alladminmenuWebsiteReloadBtnId").click(function(){
        var checker = $("#" + "alladminmenuWebsiteTableBodyId");
        if (checker.length > 0){
            var obj = new AllAdminMenuWebsite();
            $("#alladminmenuWebsiteTableBodyId").empty();
            var body = $("#alladminmenuWebsiteDataTableId");
            if (body.length > 0){
                // $.noConflict();
                var bodyTable = body.DataTable();
                bodyTable.clear();
            }
            ALLADMINMENU_WEBSITE_ID_TABLE_COUNT = 1;

            obj.tGetAllObjApi(null, async_flag=true, fill_table=true, null);

            // for (var i = 0; i < results.length; i++){
            //     try{
            //        console.log('results[i] = ', results[i]);
    //
      //              results[i].tFillTable2();
        //            ALLADMINMENU_WEBSITE_ID_TABLE_COUNT++;
          //          // results[i].tFillTable1();
            //    }
              //  catch(err){
              //      console.log(err);
              //  }
            //}
        }
    })
})

    
// ########## [Search Button] Handle Event function ##############
$(document).ready(function(){
    $("#alladminmenuWebsiteSearchBtnId").click(function(){
        ALLADMINMENU_WEBSITE_ID_TABLE_COUNT = 1;
        var table = $("#alladminmenuWebsiteDataTableId");
        // var body = table.find('tbody').empty();
        try {
            var dt = table.DataTable();
            dt.clear().draw();
        }
        catch (err){
            console.log('Can not clear datatable... Error: ', err);
        }
        var keyword = $("#alladminmenuWebsiteSearchInputId").val();
        var obj = new AllAdminMenuWebsite
        obj.tSearchAllObjApi(keyword, null, async_flag=true, fill_table=true);
    })
})

    
// ########## [Search Button] Handle Event function ##############
$(document).ready(function(){
    $("#alladminmenuWebsiteFilterSearchBtnId").click(function(){
        ALLADMINMENU_WEBSITE_ID_TABLE_COUNT = 1;
        var tableId = "alladminmenuWebsiteDataTableId";
        var table = $("#" + tableId);
        // var body = table.find('tbody').empty();
        try {
            var dt = table.DataTable();
            dt.clear().draw();
        }
        catch (err){
            console.log('Can not clear datatable... Error: ', err);
        }
        var search_data = $("#alladminmenuWebsiteSearchFilterFormId").serializeArray();
        var obj = new AllAdminMenuWebsite();
        obj.tFilterSearchAllObjApi(search_data=search_data,
                                    null,
                                    async_flag=true,
                                    fill_table=true,
                                    inlineMode=false);
    })
})

    

// ########## [Fill Form] Handle Event function ##############

$(document).ready(function(){
    var checker = $("#alladminmenuWebsiteFormId");
    if (checker.length > 0){
        var cr_uuid = checker.attr('data-uuid');
        if (typeof cr_uuid !== 'undefined' && cr_uuid !== false && cr_uuid !== ""){
            console.log('[checker = $("#%s%sFormId")]cr_uuid = ', cr_uuid);
            var obj = new AllAdminMenuWebsite();
            obj.tGetObjApi(cr_uuid);
        }
    }
    checker = $("#alladminmenuWebsiteDetailFormId");
    if (checker.length > 0){
        var cr_uuid = checker.attr('data-uuid');
        if (typeof cr_uuid !== 'undefined' && cr_uuid !== false && cr_uuid !== ""){
            console.log('[checker = $("#%s%sDetailFormId")] cr_uuid = ', cr_uuid);
            var obj = new AllAdminMenuWebsite();
            obj.tGetObjApi(cr_uuid);
        }
    }
    checker = $("#alladminmenuWebsiteEditFormId");
    if (checker.length > 0){
        var cr_uuid = checker.attr('data-uuid');
        if (typeof cr_uuid !== 'undefined' && cr_uuid !== false && cr_uuid !== ""){
            console.log('[checker = $("#%s%sEditFormId")] cr_uuid = ', cr_uuid);
            var obj = new AllAdminMenuWebsite();
            obj.tGetObjApi(cr_uuid);
        }
    }
})

    

// ########## [Inline Add Row] Clicked Handle function ##############
$(document).ready(function(){
    $("#alladminmenuWebsiteInlineCreateAddRowBtnId").click(function(){
        var htmls = $("#alladminmenuWebsiteInlineCreateTableId").find('.alladminmenu-website-inline-row');
        if (htmls.length > 0){
            var html = htmls[1].outerHTML;
            // console.log(html);
            $('#alladminmenuWebsiteInlineCreateTableId tbody').append(html);
            var row_ids = $('#alladminmenuWebsiteInlineCreateTableId .inline-row-id');
            console.log('row_ids = ', row_ids);
            for (var x = 0; x <row_ids.length; x++){
                row_ids[x].text = x+1;
            }
        }
    })
});

    

// ########## [Inline Add Row] Clicked Handle function ##############
$(document).ready(function(){
    $("#alladminmenuWebsiteInlineDetailAddRowBtnId").click(function(){
        var htmls = $("#alladminmenuWebsiteInlineDetailTableId").find('.alladminmenu-website-inline-row');
        if (htmls.length > 0){
            var html = htmls[1].outerHTML;
            // console.log(html);
            $('#alladminmenuWebsiteInlineDetailTableId tbody').append(html);
            var row_ids = $('#alladminmenuWebsiteInlineDetailTableId .inline-row-id');
            console.log('row_ids = ', row_ids);
            for (var x = 0; x <row_ids.length; x++){
                row_ids[x].text = x+1;
            }
        }
    })
});

    

// ########## [Inline Add Row] Clicked Handle function ##############
$(document).ready(function(){
    $("#alladminmenuWebsiteInlineEditAddRowBtnId").click(function(){
        var htmls = $("#alladminmenuWebsiteInlineEditTableId").find('.alladminmenu-website-inline-row');
        if (htmls.length > 0){
            var html = htmls[1].outerHTML;
            // console.log(html);
            $('#alladminmenuWebsiteInlineEditTableId tbody').append(html);
            var row_ids = $('#alladminmenuWebsiteInlineEditTableId .inline-row-id');
            console.log('row_ids = ', row_ids);
            for (var x = 0; x <row_ids.length; x++){
                row_ids[x].text = x+1;
            }
        }
    })
});

    

// ########## [Remove Inline Table Row] Clicked Handle function ##############

$(document).ready(function(){
    $(document).on('click', ".alladminmenu-website-remove-inline-row", function(){
        var inlineTableId = $(this).closest('table').attr('id');
        console.log(`[$(document).on('click', ".%s-remove-inline-row"] inlineTableId = ` + inlineTableId);

        var crr_body = $(this).closest("tbody");
        var row_count = crr_body.find('tr').length;
        console.log(`[$(document).on('click', ".%s-remove-inline-row"] row_count = ` + row_count);
        if (row_count > 1){
            $(this).closest("tr").remove();
        }

        var row_ids = $('#' + inlineTableId + ' .inline-row-id');
        console.log(`[$(document).on('click', ".%s-remove-inline-row"] row_ids = ` + row_ids);
        for (var x = 0; x <row_ids.length; x++){
            row_ids[x].text = x+1;
        }
    })
});

    
function tLoadDetailInlineTable(inlineTableId){
    var inlineTable = $("#" + inlineTableId);

    var inlineAppName = $(inlineTable).attr('data-app-name');
    console.log(`[tLoadDetailInlineTable] inlineAppName = ` + inlineAppName);

    var inlineModelName = $(inlineTable).attr('data-model-name');
    console.log(`[tLoadDetailInlineTable] inlineModelName = ` + inlineModelName);

    var inlineAttrName = $(inlineTable).attr('data-attr-name');
    console.log(`[tLoadDetailInlineTable] inlineAttrName = ` + inlineAttrName);

    var inlineAttrValue = $(inlineTable).closest('form').attr('data-uuid');
    console.log(`[tLoadDetailInlineTable] inlineAttrValue = ` + inlineAttrValue);
    var obj = new AllAdminMenuWebsite();
    var searchData = {}
    searchData[inlineAttrName] = inlineAttrValue;
    // Clear table lines:
    // $(inlineTable).each(function(){ $(this).find('tbody>tr').each(function(){$(this).remove();})})
    // $(dataTable).find('tbody>tr').empty();

    var dataTable = $(inlineTable).DataTable();
    dataTable.rows().remove().draw();
    ALLADMINMENU_WEBSITE_ID_INLINE_TABLE_COUNT = 1;

    // Search and fill table:
    obj.tFilterSearchAllObjApi(searchData=searchData,
                                null,
                                async_flag=true,
                                fill_table=true,
                                tableId=inlineTableId,
                                inlineMode=true);
}

// ########## [InlineDetailDownloadBtnId] Handle function ##############
$(document).ready(function(){
    $(document).on('click', "#alladminmenuWebsiteInlineDetailDownloadBtnId", function(){
        var inlineTableId = $(this).attr('data-target');
        console.log(`[$(document).on('click', "#%sInlineDetailDownloadBtnId", function()] inlineTableId = ` + inlineTableId);

        tLoadDetailInlineTable(inlineTableId);
    })
});

    
// ########## [Inline Add Object] Clicked Handle function ##############
$(document).ready(function(){
    $('tr.alladminmenu-website-inline-row').focusout( 'click', function () {
        var tb = $(this).closest('table');
        if (tb != null){
            // Validate data inline:

            // If validated succeed --> add object
            // $.noConflict();
            // var tbTable = tb.DataTable();
            // tbTable.row.add([
            //    '<input type="text" id="R_' + counter + '_1" />',
            // ]).draw( false );
            /// counter++;
        }
    });
});

    
// ########## [AUTO Fill Inline Table] Handle Event function ##############
$(document).ready(function(){
    $("#alladminmenuWebsiteInlineDetailTableId").ready(function(){
        var ele = document.getElementById("alladminmenuWebsiteInlineDetailTableId");
        if (ele != null && isInViewport(ele) == true){
            tLoadDetailInlineTable("alladminmenuWebsiteInlineDetailTableId");
        }
    })
})
// ########## [Fill Inline Table] Handle Event function ##############
var ALLADMINMENU_ID_INLINE_TABLE_COUNT = 1;
$(document).ready(function(){
    $("#alladminmenuWebsiteReloadInlineBtnId").click(function(){
        var checker = $("#" + "alladminmenuWebsiteInlineTableBodyId");
        if (checker.length > 0){
            var obj = new AllAdminMenuWebsite();
            $("#alladminmenuWebsiteInlineTableBodyId").empty();
            var body = $("#alladminmenuWebsiteInlineDataTableId");
            if (body.length > 0){
                // $.noConflict();
                var bodyTable = body.DataTable();
                bodyTable.clear();
            }
            ALLADMINMENU_ID_INLINE_TABLE_COUNT = 1;

            obj.tGetAllObjApi(null, async_flag=true, fill_table=true, null);

            // for (var i = 0; i < results.length; i++){
            //     try{
            //        console.log('results[i] = ', results[i]);
    //
      //              results[i].tFillTable2();
        //            ALLADMINMENU_ID_INLINE_TABLE_COUNT++;
          //          // results[i].tFillTable1();
            //    }
              //  catch(err){
              //      console.log(err);
              //  }
            //}
        }
    })
})
// ########## [Test Button] Clicked Handle function ##############
$(document).ready(function(){
    // $("#alladminmenuWebsiteTestBtnId").click(function(){
    //     tTestAllAdminMenuWebsite();
    // })
});
/**
 * Created by Tamnd on 9/14/21.
 * Copyright: ©2020 Tamnd <ductambka@gmail.com>
 * App: Website
 */
$(document).ready(function() {
    $('.tnd-select2').each(function(){
        try{
            $(this).select2({ width: '100%' });
            // $("#" + $(this).attr('id')).select2({ width: '100%' });
            console.log("[$('.tnd-select2').each(function()] select2... done");
        }
        catch(err){
            console.log("[$('.tnd-select2').each(function()] err = ", err);
            var crr_id = $(this).attr('id');
            console.log("[$('.tnd-select2')] crr_id = ", crr_id);
            if (typeof crr_id != "undefined" && crr_id != ""){
                $("#" + crr_id).select2({ width: '100%' });
            }
        }
    })
});

