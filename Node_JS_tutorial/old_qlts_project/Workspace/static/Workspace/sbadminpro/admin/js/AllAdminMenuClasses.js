
/**
 * Created by TruongNV on 9/14/21.
 * Copyright: ©2022 TruongNV <truongg.nv@gmail.com>
 * App: Workspace
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
function AllAdminMenuWorkspacegenRandomSelect(optionId){
    try{
        var select = document.getElementById(optionId);
        if(select == null){
            return null;
        }
        var items = select.getElementsByTagName('option');
        var vals = [];
        for (var i = 0; i < items.length; i++){
            if (items[i].hasAttribute("value") && items[i].value != null){
                vals.push(items[i].value);
            }
        }
        console.log('vals = ', vals);

        var index = vals[Math.floor(Math.random() * items.length)];
        //select.value = index;

        // Fill file label:
        //var labels = document.querySelectorAll('[for=optionId]');
        //for (var i = 0; i < labels.length; i++){
        //   labels[i].val(index);
        //}
        //$("#"+optionId).val(index).change()
        var obj = new Object();
        obj.uuid = index;
        return obj;
    }
    catch (err) {
        console.log(err);
        return null;
    }
}
            
var genAllAdminMenuWorkspace_FIELDS = [
            "name",
            "uuid",
            "title",
            "icon_class",
            "data_feather",
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
function genAllAdminMenuWorkspace(form_type){
    return {
        "name": makeid(),
        "uuid": uuidv4(),
        "title": makeid(),
        "icon_class": makeid(),
        "data_feather": makeid(),
        "url": makeid(),
        "icon": null,
        "icon_base64": makeid(128),
        "desc": makeid(128),
        "order": makeid(),
        "in_main_menu": genBoolean(),
        "menu_group": AllAdminMenuWorkspacegenRandomSelect('menu_groupAdminMenuGroupAllAdminMenuWorkspace'+form_type+'InputId'),
        "parent_menu": AllAdminMenuWorkspacegenRandomSelect('parent_menuAllAdminMenuAllAdminMenuWorkspace'+form_type+'InputId'),
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

var AllAdminMenuWorkspace_CACHE = [];

           var AllAdminMenuWorkspace_arr_action = [
        // default action
        
                    {
                    "title": "Xem chi tiết",
                    "func": "AllAdminMenuWorkspaceDetails",
                    "icon": "far fa-eye",
                    "href": "#",
                    "isCheck": false,
                    "allowSelfChecking": true,
                    "field_checking": "#",
                    "value_is_true": "#",
                    "views_name": "",
                    "independent_views": true
                    },
                    
                    {
                        "title": "Chỉnh sửa",
                        "func": "AllAdminMenuWorkspaceEdit",
                        "icon": "far fa-edit",
                        "href": "#",
                        "isCheck": false,
                        "allowSelfChecking": false,
                        "field_checking": "is_sent",
                        "value_is_true": "#",
                        "views_name": "",
                        "independent_views": true
                    },
                    
                    {
                        "title": "Xóa",
                        "func": "AllAdminMenuWorkspaceOnDeleteEvent",
                        "icon": "far fa-trash-alt",
                        "href": "#",
                        "isCheck": false,
                        "allowSelfChecking": false,
                        "field_checking": "#",
                        "value_is_true": "#",
                        "views_name": "",
                        "independent_views": true
                    },
                    
        // custom action 
        
    ]
    // default func actions
    
                    function AllAdminMenuWorkspaceDetails(uuid){
                        $('#alladminmenuWorkspaceDetailmodalsId').modal('toggle');
                        var obj=new AllAdminMenuWorkspace();
                        obj.tGetObjApi(uuid);
                        obj.callAjax.then(function(data) {
                            new AllAdminMenuWorkspace(data).tFillFormModal('Detail','alladminmenuWorkspaceDetailModalsFormId');

                        })
                        //obj.tFillFormModal('Detail');

                    }
                    
                    function AllAdminMenuWorkspaceEdit(uuid){
                        $('#alladminmenuWorkspaceEditmodalsId').modal('toggle');
                        var obj=new AllAdminMenuWorkspace();
                        obj.tGetObjApi(uuid);
                        obj.callAjax.then(function(data) {
                            new AllAdminMenuWorkspace(data).tFillFormModal('Edit','alladminmenuWorkspaceEditModalsFormId');

                        })
                        //obj.tFillFormModal('Edit');
                    }
                    
                    function AllAdminMenuWorkspaceOnDeleteEvent(uuid){
                        var search_data = null;
                        try {
                            search_data = AllAdminMenuActionsSearchData;
                        }
                        catch(err) {
                            search_data = null;
                        }
                        if(search_data == null){
                                    
                                $.confirm({
                                icon: 'fa fa-smile-o',
                                title: 'XÓA!',
                                content: 'Bạn có chắc muốn xóa ?!',
                                theme: 'modern',
                                closeIcon: 'cancel',
                                animation: 'scale',
                                type: 'orange',
                                buttons: {
                                            cancel: {
                                                text: 'Hủy',
                                            },
                                            confirm: {
                                                text: 'Đồng ý',
                                                btnClass: 'btn-blue',
                                                action: function() {
                                                    //noi dung xoa
                                                    var obj=new AllAdminMenuWorkspace();
                                                    obj.tDeleteApi(uuid);
                                                }
                                            },
                                            
                                        }
                                });
                            
                        }
                        else { 
                            AllAdminMenuWorkspaceOnDeleteWithDataSearchEvent(uuid);
                        }

                    }
                    function AllAdminMenuWorkspaceOnDeleteWithDataSearchEvent(uuid){
                        $.confirm({
                        icon: 'fa fa-smile-o',
                        title: 'XÓA!',
                        content: 'Bạn có chắc muốn xóa ?!',
                        theme: 'modern',
                        closeIcon: 'cancel',
                        animation: 'scale',
                        type: 'orange',
                        buttons: {
                            cancel: {
                                text: 'Hủy',
                            },
                            confirm: {
                                text: 'Đồng ý',
                                btnClass: 'btn-blue',
                                action: function() {
                                    //noi dung xoa
                                    var obj=new AllAdminMenuWorkspace();
                                    
                                    obj.tDeleteApiWithDataSearch(uuid,AllAdminMenuActionsSearchData);
                                }
                            },
                            
                        }
                    });
                        
                    }
                    
                    function AllAdminMenuWorkspaceViewDetail(selectionId){
                        var select = $("#"+selectionId);
                        if(select.length>0){
                            var value =  select.val()
                            if(value == "" || value == null || value == undefined){
                                toastr.warning('Vui lòng chọn giá trị');
                                return;
                            }
                            else {
                                $('#alladminmenuWorkspaceDetailmodalsId').modal('toggle');
                                var obj=new AllAdminMenuWorkspace();
                                obj.tGetObjApi(value);
                                obj.callAjax.then(function(data) {
                                    new AllAdminMenuWorkspace(data).tFillFormModal('Detail','alladminmenuWorkspaceDetailModalsFormId');
                                })
                            }
                        }
                        

                    }
                    
    // custom func actions
            
            

                    //########## [Event] ChangeSwitcher ##############
                    
                    function in_main_menualladminmenuWorkspaceEventChangeSwitcher($this){
                            var status="";
                            var name = "in_main_menu";
                            if ($($this).is(":checked")) {
                                status = name;
                                console.log($($this).attr("data-uuid")+": Check box in Checked");
                            } else {
                                status="không " + name;
                                console.log($($this).attr("data-uuid")+": Check box is Unchecked");
                            }
                            $.confirm({
                            icon: 'fa fa-warning',
                            title: 'Trạng thái',
                            content: 'Bạn có chắc thay đổi sang <b>'+status+'</b> ?',
                            theme: 'modern',
                            closeIcon: 'cancel',
                            animation: 'scale',
                            type: 'green',
                            buttons: {
                                cancel: {
                                    text: 'Hủy',
                                    action:function(){
                                        //tra lai trang thai ban dau

                                    $($this).prop('checked', !$($this).is(":checked"));
                            
                                    }
                                },
                                confirm: {
                                    text: 'Đồng ý',
                                    btnClass: 'btn-green',
                                    action: function() {
                                        //noi dung xoa
                                        obj = new AllAdminMenuWorkspace();
                                        console.log('Update obj = ', obj);
                                        obj.tUpdateOnlyFieldApi($($this).attr("data-uuid"),$($this).attr("name"),$($this).is(":checked"))  ;
                                    }
                                },
                                
                            }
                        })

                    }
                    
                    //########## [Event] ChangeSwitcher ##############
                    
                    function login_redirectalladminmenuWorkspaceEventChangeSwitcher($this){
                            var status="";
                            var name = "Redirect to this link after login...";
                            if ($($this).is(":checked")) {
                                status = name;
                                console.log($($this).attr("data-uuid")+": Check box in Checked");
                            } else {
                                status="không " + name;
                                console.log($($this).attr("data-uuid")+": Check box is Unchecked");
                            }
                            $.confirm({
                            icon: 'fa fa-warning',
                            title: 'Trạng thái',
                            content: 'Bạn có chắc thay đổi sang <b>'+status+'</b> ?',
                            theme: 'modern',
                            closeIcon: 'cancel',
                            animation: 'scale',
                            type: 'green',
                            buttons: {
                                cancel: {
                                    text: 'Hủy',
                                    action:function(){
                                        //tra lai trang thai ban dau

                                    $($this).prop('checked', !$($this).is(":checked"));
                            
                                    }
                                },
                                confirm: {
                                    text: 'Đồng ý',
                                    btnClass: 'btn-green',
                                    action: function() {
                                        //noi dung xoa
                                        obj = new AllAdminMenuWorkspace();
                                        console.log('Update obj = ', obj);
                                        obj.tUpdateOnlyFieldApi($($this).attr("data-uuid"),$($this).attr("name"),$($this).is(":checked"))  ;
                                    }
                                },
                                
                            }
                        })

                    }
                    
                    //########## [Event] ChangeSwitcher ##############
                    
                    function activealladminmenuWorkspaceEventChangeSwitcher($this){
                            var status="";
                            var name = "active";
                            if ($($this).is(":checked")) {
                                status = name;
                                console.log($($this).attr("data-uuid")+": Check box in Checked");
                            } else {
                                status="không " + name;
                                console.log($($this).attr("data-uuid")+": Check box is Unchecked");
                            }
                            $.confirm({
                            icon: 'fa fa-warning',
                            title: 'Trạng thái',
                            content: 'Bạn có chắc thay đổi sang <b>'+status+'</b> ?',
                            theme: 'modern',
                            closeIcon: 'cancel',
                            animation: 'scale',
                            type: 'green',
                            buttons: {
                                cancel: {
                                    text: 'Hủy',
                                    action:function(){
                                        //tra lai trang thai ban dau

                                    $($this).prop('checked', !$($this).is(":checked"));
                            
                                    }
                                },
                                confirm: {
                                    text: 'Đồng ý',
                                    btnClass: 'btn-green',
                                    action: function() {
                                        //noi dung xoa
                                        obj = new AllAdminMenuWorkspace();
                                        console.log('Update obj = ', obj);
                                        obj.tUpdateOnlyFieldApi($($this).attr("data-uuid"),$($this).attr("name"),$($this).is(":checked"))  ;
                                    }
                                },
                                
                            }
                        })

                    }
                    
                    //########## [Event] ChangeSwitcher ##############
                    
                    function staff_onlyalladminmenuWorkspaceEventChangeSwitcher($this){
                            var status="";
                            var name = "staff_only";
                            if ($($this).is(":checked")) {
                                status = name;
                                console.log($($this).attr("data-uuid")+": Check box in Checked");
                            } else {
                                status="không " + name;
                                console.log($($this).attr("data-uuid")+": Check box is Unchecked");
                            }
                            $.confirm({
                            icon: 'fa fa-warning',
                            title: 'Trạng thái',
                            content: 'Bạn có chắc thay đổi sang <b>'+status+'</b> ?',
                            theme: 'modern',
                            closeIcon: 'cancel',
                            animation: 'scale',
                            type: 'green',
                            buttons: {
                                cancel: {
                                    text: 'Hủy',
                                    action:function(){
                                        //tra lai trang thai ban dau

                                    $($this).prop('checked', !$($this).is(":checked"));
                            
                                    }
                                },
                                confirm: {
                                    text: 'Đồng ý',
                                    btnClass: 'btn-green',
                                    action: function() {
                                        //noi dung xoa
                                        obj = new AllAdminMenuWorkspace();
                                        console.log('Update obj = ', obj);
                                        obj.tUpdateOnlyFieldApi($($this).attr("data-uuid"),$($this).attr("name"),$($this).is(":checked"))  ;
                                    }
                                },
                                
                            }
                        })

                    }
                    
                    //########## [Event] ChangeSwitcher ##############
                    
                    function superuser_onlyalladminmenuWorkspaceEventChangeSwitcher($this){
                            var status="";
                            var name = "superuser_only";
                            if ($($this).is(":checked")) {
                                status = name;
                                console.log($($this).attr("data-uuid")+": Check box in Checked");
                            } else {
                                status="không " + name;
                                console.log($($this).attr("data-uuid")+": Check box is Unchecked");
                            }
                            $.confirm({
                            icon: 'fa fa-warning',
                            title: 'Trạng thái',
                            content: 'Bạn có chắc thay đổi sang <b>'+status+'</b> ?',
                            theme: 'modern',
                            closeIcon: 'cancel',
                            animation: 'scale',
                            type: 'green',
                            buttons: {
                                cancel: {
                                    text: 'Hủy',
                                    action:function(){
                                        //tra lai trang thai ban dau

                                    $($this).prop('checked', !$($this).is(":checked"));
                            
                                    }
                                },
                                confirm: {
                                    text: 'Đồng ý',
                                    btnClass: 'btn-green',
                                    action: function() {
                                        //noi dung xoa
                                        obj = new AllAdminMenuWorkspace();
                                        console.log('Update obj = ', obj);
                                        obj.tUpdateOnlyFieldApi($($this).attr("data-uuid"),$($this).attr("name"),$($this).is(":checked"))  ;
                                    }
                                },
                                
                            }
                        })

                    }
                    
                    //########## [Event] ChangeSwitcher ##############
                    
                    function split_markedalladminmenuWorkspaceEventChangeSwitcher($this){
                            var status="";
                            var name = "split_marked";
                            if ($($this).is(":checked")) {
                                status = name;
                                console.log($($this).attr("data-uuid")+": Check box in Checked");
                            } else {
                                status="không " + name;
                                console.log($($this).attr("data-uuid")+": Check box is Unchecked");
                            }
                            $.confirm({
                            icon: 'fa fa-warning',
                            title: 'Trạng thái',
                            content: 'Bạn có chắc thay đổi sang <b>'+status+'</b> ?',
                            theme: 'modern',
                            closeIcon: 'cancel',
                            animation: 'scale',
                            type: 'green',
                            buttons: {
                                cancel: {
                                    text: 'Hủy',
                                    action:function(){
                                        //tra lai trang thai ban dau

                                    $($this).prop('checked', !$($this).is(":checked"));
                            
                                    }
                                },
                                confirm: {
                                    text: 'Đồng ý',
                                    btnClass: 'btn-green',
                                    action: function() {
                                        //noi dung xoa
                                        obj = new AllAdminMenuWorkspace();
                                        console.log('Update obj = ', obj);
                                        obj.tUpdateOnlyFieldApi($($this).attr("data-uuid"),$($this).attr("name"),$($this).is(":checked"))  ;
                                    }
                                },
                                
                            }
                        })

                    }
                    

                    //########## [Event] DeletedAttacthment ##############
                    
                    function iconalladminmenuWorkspaceDeletedAttacthment($this){
                        console.log($($this).attr("file-uuid")+": Attachment deleting");
                        $.confirm({
                            icon: 'fa fa-warning',
                            title: 'XÓA!',
                            content: 'Bạn có chắc muốn xóa ?!',
                            theme: 'modern',
                            closeIcon: 'cancel',
                            animation: 'scale',
                            type: 'red',
                            buttons: {
                                cancel: {
                                    text: 'Hủy',
                                },
                                confirm: {
                                    text: 'Đồng ý',
                                    btnClass: 'btn-blue',
                                    action: function() {
                                        //noi dung xoa
                                        $("#"+$($this).attr("file-uuid")+"AttachmentDivId").hide();
                                        obj = new AllAdminMenuWorkspace();
                                        console.log('Update obj = ', obj);
                                        obj.tDeleteFileApi($($this).attr("file-uuid"),"icon");
                                    }
                                },
                                
                            }
                        })
                            
                    }
                    
                    //########## [Event] InlineDeletedAttacthment ##############
                    
                    function iconalladminmenuWorkspaceInlineDeletedAttacthment($this){
                        console.log($($this).attr("file-uuid")+": Attachment deleting");
                        $.confirm({
                            icon: 'fa fa-warning',
                            title: 'XÓA!',
                            content: 'Bạn có chắc muốn xóa ?!',
                            theme: 'modern',
                            closeIcon: 'cancel',
                            animation: 'scale',
                            type: 'red',
                            buttons: {
                                cancel: {
                                    text: 'Hủy',
                                },
                                confirm: {
                                    text: 'Đồng ý',
                                    btnClass: 'btn-blue',
                                    action: function() {
                                        //noi dung xoa
                                        $("#"+$($this).attr("file-uuid")+"AttachmentDivId").hide();
                                        obj = new AllAdminMenuWorkspace();
                                        console.log('Update obj = ', obj);
                                        obj.tDeleteFileApi($($this).attr("file-uuid"),"icon");
                                        $($this).closest("td").find("[name=file]").show();
                                    }
                                },
                                
                            }
                        })
                            
                    }
                    
class AllAdminMenuWorkspace{
    // ########## Init Objects ##############
    constructor(data=null){
        if (data != null){
            if (data.hasOwnProperty('id')){
                this.id = data.id;
            }
            else{
                this.id = null;
            }
    
            this.__app_name__ = "Workspace";
    
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

            if (data.hasOwnProperty('data_feather')){
                this.data_feather = data.data_feather;
            }
            else{
                // this.data_feather = null;
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
            var chEle = formEle.find("#nameAllAdminMenuWorkspaceInputId");
            if (chEle.length > 0){
                this.name = chEle.val();
            }
            else{
                // this.name = null;
            }
            var chEle = formEle.find("#uuidAllAdminMenuWorkspaceInputId");
            if (chEle.length > 0){
                this.uuid = chEle.val();
            }
            else{
                // this.uuid = null;
            }
            var chEle = formEle.find("#titleAllAdminMenuWorkspaceInputId");
            if (chEle.length > 0){
                this.title = chEle.val();
            }
            else{
                // this.title = null;
            }
            var chEle = formEle.find("#icon_classAllAdminMenuWorkspaceInputId");
            if (chEle.length > 0){
                this.icon_class = chEle.val();
            }
            else{
                // this.icon_class = null;
            }
            var chEle = formEle.find("#data_featherAllAdminMenuWorkspaceInputId");
            if (chEle.length > 0){
                this.data_feather = chEle.val();
            }
            else{
                // this.data_feather = null;
            }
            var chEle = formEle.find("#urlAllAdminMenuWorkspaceInputId");
            if (chEle.length > 0){
                this.url = chEle.val();
            }
            else{
                // this.url = null;
            }
            var chEle = formEle.find("#iconAllAdminMenuWorkspaceInputId");
            if (chEle.length > 0){
                this.icon = chEle.val();
            }
            else{
                // this.icon = null;
            }
            var chEle = formEle.find("#icon_base64AllAdminMenuWorkspaceInputId");
            if (chEle.length > 0){
                this.icon_base64 = chEle.val();
            }
            else{
                // this.icon_base64 = null;
            }
            var chEle = formEle.find("#descAllAdminMenuWorkspaceInputId");
            if (chEle.length > 0){
                this.desc = chEle.val();
            }
            else{
                // this.desc = null;
            }
            var chEle = formEle.find("#orderAllAdminMenuWorkspaceInputId");
            if (chEle.length > 0){
                this.order = chEle.val();
            }
            else{
                // this.order = null;
            }
            var chEle = formEle.find("#in_main_menuAllAdminMenuWorkspaceInputId");
            if (chEle.length > 0){
                this.in_main_menu = chEle.val();
            }
            else{
                // this.in_main_menu = null;
            }
            var chEle = formEle.find("#menu_groupAllAdminMenuWorkspaceInputId");
            if (chEle.length > 0){
                this.menu_group = chEle.val();
            }
            else{
                // this.menu_group = null;
            }
            var chEle = formEle.find("#parent_menuAllAdminMenuWorkspaceInputId");
            if (chEle.length > 0){
                this.parent_menu = chEle.val();
            }
            else{
                // this.parent_menu = null;
            }
            var chEle = formEle.find("#login_redirectAllAdminMenuWorkspaceInputId");
            if (chEle.length > 0){
                this.login_redirect = chEle.val();
            }
            else{
                // this.login_redirect = null;
            }
            var chEle = formEle.find("#activeAllAdminMenuWorkspaceInputId");
            if (chEle.length > 0){
                this.active = chEle.val();
            }
            else{
                // this.active = null;
            }
            var chEle = formEle.find("#staff_onlyAllAdminMenuWorkspaceInputId");
            if (chEle.length > 0){
                this.staff_only = chEle.val();
            }
            else{
                // this.staff_only = null;
            }
            var chEle = formEle.find("#superuser_onlyAllAdminMenuWorkspaceInputId");
            if (chEle.length > 0){
                this.superuser_only = chEle.val();
            }
            else{
                // this.superuser_only = null;
            }
            var chEle = formEle.find("#split_markedAllAdminMenuWorkspaceInputId");
            if (chEle.length > 0){
                this.split_marked = chEle.val();
            }
            else{
                // this.split_marked = null;
            }
            var chEle = formEle.find("#split_labelAllAdminMenuWorkspaceInputId");
            if (chEle.length > 0){
                this.split_label = chEle.val();
            }
            else{
                // this.split_label = null;
            }
            var chEle = formEle.find("#updated_atAllAdminMenuWorkspaceInputId");
            if (chEle.length > 0){
                this.updated_at = chEle.val();
            }
            else{
                // this.updated_at = null;
            }
            var chEle = formEle.find("#created_atAllAdminMenuWorkspaceInputId");
            if (chEle.length > 0){
                this.created_at = chEle.val();
            }
            else{
                // this.created_at = null;
            }
        }
        else{
            var chEle = $("#idAllAdminMenuWorkspaceInputId");
            if (chEle.length > 0){
                this.id = chEle.val();
            }
            else{
                // this.id = null;
            }
                                var chEle = $("#nameAllAdminMenuWorkspaceInputId");
                                if (chEle.length > 0){
                                    this.name = chEle.val();
                                }
                                else{
                                    // this.name = null;
                                }
                    
                                var chEle = $("#uuidAllAdminMenuWorkspaceInputId");
                                if (chEle.length > 0){
                                    this.uuid = chEle.val();
                                }
                                else{
                                    // this.uuid = null;
                                }
                    
                                var chEle = $("#titleAllAdminMenuWorkspaceInputId");
                                if (chEle.length > 0){
                                    this.title = chEle.val();
                                }
                                else{
                                    // this.title = null;
                                }
                    
                                var chEle = $("#icon_classAllAdminMenuWorkspaceInputId");
                                if (chEle.length > 0){
                                    this.icon_class = chEle.val();
                                }
                                else{
                                    // this.icon_class = null;
                                }
                    
                                var chEle = $("#data_featherAllAdminMenuWorkspaceInputId");
                                if (chEle.length > 0){
                                    this.data_feather = chEle.val();
                                }
                                else{
                                    // this.data_feather = null;
                                }
                    
                                var chEle = $("#urlAllAdminMenuWorkspaceInputId");
                                if (chEle.length > 0){
                                    this.url = chEle.val();
                                }
                                else{
                                    // this.url = null;
                                }
                    
                                var chEle = $("#iconAllAdminMenuWorkspaceInputId");
                                if (chEle.length > 0){
                                    this.icon = chEle.val();
                                }
                                else{
                                    // this.icon = null;
                                }
                    
                                var chEle = $("#icon_base64AllAdminMenuWorkspaceInputId");
                                if (chEle.length > 0){
                                    this.icon_base64 = chEle.val();
                                }
                                else{
                                    // this.icon_base64 = null;
                                }
                    
                                var chEle = $("#descAllAdminMenuWorkspaceInputId");
                                if (chEle.length > 0){
                                    this.desc = chEle.val();
                                }
                                else{
                                    // this.desc = null;
                                }
                    
                                var chEle = $("#orderAllAdminMenuWorkspaceInputId");
                                if (chEle.length > 0){
                                    this.order = chEle.val();
                                }
                                else{
                                    // this.order = null;
                                }
                    
                                var chEle = $("#in_main_menuAllAdminMenuWorkspaceInputId");
                                if (chEle.length > 0){
                                    this.in_main_menu = chEle.val();
                                }
                                else{
                                    // this.in_main_menu = null;
                                }
                    
                                var chEle = $("#menu_groupAllAdminMenuWorkspaceInputId");
                                if (chEle.length > 0){
                                    this.menu_group = chEle.val();
                                }
                                else{
                                    // this.menu_group = null;
                                }
                    
                                var chEle = $("#parent_menuAllAdminMenuWorkspaceInputId");
                                if (chEle.length > 0){
                                    this.parent_menu = chEle.val();
                                }
                                else{
                                    // this.parent_menu = null;
                                }
                    
                                var chEle = $("#login_redirectAllAdminMenuWorkspaceInputId");
                                if (chEle.length > 0){
                                    this.login_redirect = chEle.val();
                                }
                                else{
                                    // this.login_redirect = null;
                                }
                    
                                var chEle = $("#activeAllAdminMenuWorkspaceInputId");
                                if (chEle.length > 0){
                                    this.active = chEle.val();
                                }
                                else{
                                    // this.active = null;
                                }
                    
                                var chEle = $("#staff_onlyAllAdminMenuWorkspaceInputId");
                                if (chEle.length > 0){
                                    this.staff_only = chEle.val();
                                }
                                else{
                                    // this.staff_only = null;
                                }
                    
                                var chEle = $("#superuser_onlyAllAdminMenuWorkspaceInputId");
                                if (chEle.length > 0){
                                    this.superuser_only = chEle.val();
                                }
                                else{
                                    // this.superuser_only = null;
                                }
                    
                                var chEle = $("#split_markedAllAdminMenuWorkspaceInputId");
                                if (chEle.length > 0){
                                    this.split_marked = chEle.val();
                                }
                                else{
                                    // this.split_marked = null;
                                }
                    
                                var chEle = $("#split_labelAllAdminMenuWorkspaceInputId");
                                if (chEle.length > 0){
                                    this.split_label = chEle.val();
                                }
                                else{
                                    // this.split_label = null;
                                }
                    
                                var chEle = $("#updated_atAllAdminMenuWorkspaceInputId");
                                if (chEle.length > 0){
                                    var date = moment(chEle.val(), 'DD/MM/YYYY');
                                    this.updated_at=toDatePython(new Date(date))
                                }
                                else{
                                    // this.updated_at = null;
                                }
                    
                                var chEle = $("#created_atAllAdminMenuWorkspaceInputId");
                                if (chEle.length > 0){
                                    var date = moment(chEle.val(), 'DD/MM/YYYY');
                                    this.created_at=toDatePython(new Date(date))
                                }
                                else{
                                    // this.created_at = null;
                                }
                    
        }
    }

    // ########## [FILL FORM] Objects to FRONT END ##############
    tFillForm(){
        var self = this;

            try{
                var j_ele_name = $("#nameAllAdminMenuWorkspaceInputId");
                if (j_ele_name.length > 0){
                    if (j_ele_name.attr('name') != 'uuid'){
                        j_ele_name.val(self.name).change();
                    }
                }
                else{
                    // j_ele_name.val(null);
                }
            }
            catch(err) {
                console.log('err = ', err);
            }

            try{
                var j_ele_uuid = $("#uuidAllAdminMenuWorkspaceInputId");
                if (j_ele_uuid.length > 0){
                    if (j_ele_uuid.attr('name') == 'uuid'){
                        j_ele_uuid.val(self.uuid).change();
                    }
                }
                else{
                    // j_ele_uuid.val(null);
                }
            }
            catch(err) {
                console.log('err = ', err);
            }

            try{
                var j_ele_title = $("#titleAllAdminMenuWorkspaceInputId");
                if (j_ele_title.length > 0){
                    if (j_ele_title.attr('name') != 'uuid'){
                        j_ele_title.val(self.title).change();
                    }
                }
                else{
                    // j_ele_title.val(null);
                }
            }
            catch(err) {
                console.log('err = ', err);
            }

            try{
                var j_ele_icon_class = $("#icon_classAllAdminMenuWorkspaceInputId");
                if (j_ele_icon_class.length > 0){
                    if (j_ele_icon_class.attr('name') != 'uuid'){
                        j_ele_icon_class.val(self.icon_class).change();
                    }
                }
                else{
                    // j_ele_icon_class.val(null);
                }
            }
            catch(err) {
                console.log('err = ', err);
            }

            try{
                var j_ele_data_feather = $("#data_featherAllAdminMenuWorkspaceInputId");
                if (j_ele_data_feather.length > 0){
                    if (j_ele_data_feather.attr('name') != 'uuid'){
                        j_ele_data_feather.val(self.data_feather).change();
                    }
                }
                else{
                    // j_ele_data_feather.val(null);
                }
            }
            catch(err) {
                console.log('err = ', err);
            }

            try{
                var j_ele_url = $("#urlAllAdminMenuWorkspaceInputId");
                if (j_ele_url.length > 0){
                    if (j_ele_url.attr('name') != 'uuid'){
                        j_ele_url.val(self.url).change();
                    }
                }
                else{
                    // j_ele_url.val(null);
                }
            }
            catch(err) {
                console.log('err = ', err);
            }

            try{
                var j_ele_icon = $("#iconAllAdminMenuWorkspaceInputId");
                if (j_ele_icon.length > 0){
                    if (j_ele_icon.attr('name') != 'uuid'){
                        j_ele_icon.val(self.icon).change();
                    }
                }
                else{
                    // j_ele_icon.val(null);
                }
            }
            catch(err) {
                console.log('err = ', err);
            }

            try{
                var j_ele_icon_base64 = $("#icon_base64AllAdminMenuWorkspaceInputId");
                if (j_ele_icon_base64.length > 0){
                    if (j_ele_icon_base64.attr('name') != 'uuid'){
                        j_ele_icon_base64.val(self.icon_base64).change();
                    }
                }
                else{
                    // j_ele_icon_base64.val(null);
                }
            }
            catch(err) {
                console.log('err = ', err);
            }

            try{
                var j_ele_desc = $("#descAllAdminMenuWorkspaceInputId");
                if (j_ele_desc.length > 0){
                    if (j_ele_desc.attr('name') != 'uuid'){
                        j_ele_desc.val(self.desc).change();
                    }
                }
                else{
                    // j_ele_desc.val(null);
                }
            }
            catch(err) {
                console.log('err = ', err);
            }

            try{
                var j_ele_order = $("#orderAllAdminMenuWorkspaceInputId");
                if (j_ele_order.length > 0){
                    if (j_ele_order.attr('name') != 'uuid'){
                        j_ele_order.val(self.order).change();
                    }
                }
                else{
                    // j_ele_order.val(null);
                }
            }
            catch(err) {
                console.log('err = ', err);
            }

            try{
                var j_ele_in_main_menu = $("#in_main_menuAllAdminMenuWorkspaceInputId");
                if (j_ele_in_main_menu.length > 0){
                    if (j_ele_in_main_menu.attr('name') != 'uuid'){
                        j_ele_in_main_menu.val(self.in_main_menu).change();
                    }
                }
                else{
                    // j_ele_in_main_menu.val(null);
                }
            }
            catch(err) {
                console.log('err = ', err);
            }

            try{
                var j_ele_menu_group = $("#menu_groupAdminMenuGroupAllAdminMenuWorkspaceInputId");
                if (j_ele_menu_group.length > 0){
                    if (j_ele_menu_group.attr('name') != 'uuid'){
                        j_ele_menu_group.val(self.menu_group).change();
                    }
                }
                else{
                    // j_ele_menu_group.val(null);
                }
            }
            catch(err) {
                console.log('err = ', err);
            }

            try{
                var j_ele_parent_menu = $("#parent_menuAllAdminMenuAllAdminMenuWorkspaceInputId");
                if (j_ele_parent_menu.length > 0){
                    if (j_ele_parent_menu.attr('name') != 'uuid'){
                        j_ele_parent_menu.val(self.parent_menu).change();
                    }
                }
                else{
                    // j_ele_parent_menu.val(null);
                }
            }
            catch(err) {
                console.log('err = ', err);
            }

            try{
                var j_ele_login_redirect = $("#login_redirectAllAdminMenuWorkspaceInputId");
                if (j_ele_login_redirect.length > 0){
                    if (j_ele_login_redirect.attr('name') != 'uuid'){
                        j_ele_login_redirect.val(self.login_redirect).change();
                    }
                }
                else{
                    // j_ele_login_redirect.val(null);
                }
            }
            catch(err) {
                console.log('err = ', err);
            }

            try{
                var j_ele_active = $("#activeAllAdminMenuWorkspaceInputId");
                if (j_ele_active.length > 0){
                    if (j_ele_active.attr('name') != 'uuid'){
                        j_ele_active.val(self.active).change();
                    }
                }
                else{
                    // j_ele_active.val(null);
                }
            }
            catch(err) {
                console.log('err = ', err);
            }

            try{
                var j_ele_staff_only = $("#staff_onlyAllAdminMenuWorkspaceInputId");
                if (j_ele_staff_only.length > 0){
                    if (j_ele_staff_only.attr('name') != 'uuid'){
                        j_ele_staff_only.val(self.staff_only).change();
                    }
                }
                else{
                    // j_ele_staff_only.val(null);
                }
            }
            catch(err) {
                console.log('err = ', err);
            }

            try{
                var j_ele_superuser_only = $("#superuser_onlyAllAdminMenuWorkspaceInputId");
                if (j_ele_superuser_only.length > 0){
                    if (j_ele_superuser_only.attr('name') != 'uuid'){
                        j_ele_superuser_only.val(self.superuser_only).change();
                    }
                }
                else{
                    // j_ele_superuser_only.val(null);
                }
            }
            catch(err) {
                console.log('err = ', err);
            }

            try{
                var j_ele_split_marked = $("#split_markedAllAdminMenuWorkspaceInputId");
                if (j_ele_split_marked.length > 0){
                    if (j_ele_split_marked.attr('name') != 'uuid'){
                        j_ele_split_marked.val(self.split_marked).change();
                    }
                }
                else{
                    // j_ele_split_marked.val(null);
                }
            }
            catch(err) {
                console.log('err = ', err);
            }

            try{
                var j_ele_split_label = $("#split_labelAllAdminMenuWorkspaceInputId");
                if (j_ele_split_label.length > 0){
                    if (j_ele_split_label.attr('name') != 'uuid'){
                        j_ele_split_label.val(self.split_label).change();
                    }
                }
                else{
                    // j_ele_split_label.val(null);
                }
            }
            catch(err) {
                console.log('err = ', err);
            }

            try{
                var j_ele_updated_at = $("#updated_atAllAdminMenuWorkspaceInputId");
                if (j_ele_updated_at.length > 0){
                    var dateObj = new Date(Date.parse(self.updated_at)); 
                    if (dateObj != "Invalid Date"){
                        var newdate = moment(dateObj).format('DD/MM/YYYY');
                        console.log('newdate = ', newdate);
                        j_ele_updated_at.val(newdate).change();
                    }
                }
                else{
                    // j_ele_updated_at.val(null);
                }
            }
            catch(err) {
                console.log('err = ', err);
            }

            try{
                var j_ele_created_at = $("#created_atAllAdminMenuWorkspaceInputId");
                if (j_ele_created_at.length > 0){
                    var dateObj = new Date(Date.parse(self.created_at)); 
                    if (dateObj != "Invalid Date"){
                        var newdate = moment(dateObj).format('DD/MM/YYYY');
                        console.log('newdate = ', newdate);
                        j_ele_created_at.val(newdate).change();
                    }
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
                
    // ########## [FILL FORM] Objects to FRONT END ##############
    tFillFormModal(modals_type,formId=null){
        //modals_type
        //*Create
        //*Detail
        //*Edit
        var apart=modals_type+'Modal';

        var self = this;
        

            try{
                var j_ele_name = $("#nameAllAdminMenuWorkspace"+apart+"InputId");
                if (j_ele_name.length > 0){
                    if (j_ele_name.attr('name') != 'uuid'){
                        j_ele_name.val(self.name).change();
                    }
                }
                else{
                    // j_ele_name.val(null);
                }
            }
            catch(err) {
                console.log('err = ', err);
            }

            try{
                var j_ele_uuid = $("#uuidAllAdminMenuWorkspace"+apart+"InputId");
                if (j_ele_uuid.length > 0 && self.uuid !=null){
                    if (j_ele_uuid.attr('name') == 'uuid'){
                        j_ele_uuid.val(self.uuid).change();
                    }
                }
                else{
                    // j_ele_uuid.val(null);
                }
            }
            catch(err) {
                console.log('err = ', err);
            }

            try{
                var j_ele_title = $("#titleAllAdminMenuWorkspace"+apart+"InputId");
                if (j_ele_title.length > 0){
                    if (j_ele_title.attr('name') != 'uuid'){
                        j_ele_title.val(self.title).change();
                    }
                }
                else{
                    // j_ele_title.val(null);
                }
            }
            catch(err) {
                console.log('err = ', err);
            }

            try{
                var j_ele_icon_class = $("#icon_classAllAdminMenuWorkspace"+apart+"InputId");
                if (j_ele_icon_class.length > 0){
                    if (j_ele_icon_class.attr('name') != 'uuid'){
                        j_ele_icon_class.val(self.icon_class).change();
                    }
                }
                else{
                    // j_ele_icon_class.val(null);
                }
            }
            catch(err) {
                console.log('err = ', err);
            }

            try{
                var j_ele_data_feather = $("#data_featherAllAdminMenuWorkspace"+apart+"InputId");
                if (j_ele_data_feather.length > 0){
                    if (j_ele_data_feather.attr('name') != 'uuid'){
                        j_ele_data_feather.val(self.data_feather).change();
                    }
                }
                else{
                    // j_ele_data_feather.val(null);
                }
            }
            catch(err) {
                console.log('err = ', err);
            }

            try{
                var j_ele_url = $("#urlAllAdminMenuWorkspace"+apart+"InputId");
                if (j_ele_url.length > 0){
                    if (j_ele_url.attr('name') != 'uuid'){
                        j_ele_url.val(self.url).change();
                    }
                }
                else{
                    // j_ele_url.val(null);
                }
            }
            catch(err) {
                console.log('err = ', err);
            }

                        try{
                            var j_ele_icon = $("#iconAllAdminMenuWorkspace"+apart+"FileAreaId");
                            if (j_ele_icon.length > 0){
                                j_ele_icon.html('');
                                
                    
                            var value=self.icon;
                            if(value!= undefined && value!= ""){
                                var decode_url = decodeURIComponent(value);
                                var filename = decode_url.split('/')[decode_url.split('/').length-1]
                                var file_html="";
                                var edit_text = "d-none";
                                if (modals_type.toLowerCase() == "edit") {
                                    edit_text = "";
                                }
                                file_html +=`
                                    <div class="form-group row col-xl-8 table-hover mt-1" style="background-color:gainsboro;height: 25px;" id="` + self.uuid + `AttachmentDivId">
                                        <div class="col-xl-10 view-attachment-class" >
                                            <span><a style="color:cornflowerblue"  target="_blank" href="` + value + `"><p><b>` + filename + `</b></p></a></span>
                                        </div>
                                        <div class="col-xl-2 text-end ` + edit_text + `">
                                            <i class="fas fa-times" style="color:gray" file-uuid="` + self.uuid + `" id="` + self.uuid + `btnDeleteId" onclick="iconalladminmenuWorkspaceDeletedAttacthment(this)"></i>
                                        </div>
                                    </div>
                                `;
                            }
                    
                                    
                                j_ele_icon.html(file_html);
                            }
                            else{
                                // j_ele_icon.html('');
                            }
                        }
                        catch(err) {
                            console.log('err = ', err);
                        }
                                
            try{
                var j_ele_icon_base64 = $("#icon_base64AllAdminMenuWorkspace"+apart+"InputId");
                if (j_ele_icon_base64.length > 0){
                    if (j_ele_icon_base64.attr('name') != 'uuid'){
                        j_ele_icon_base64.val(self.icon_base64).change();
                    }
                }
                else{
                    // j_ele_icon_base64.val(null);
                }
            }
            catch(err) {
                console.log('err = ', err);
            }

            try{
                var j_ele_desc = $("#descAllAdminMenuWorkspace"+apart+"InputId");
                if (j_ele_desc.length > 0){
                    if (j_ele_desc.attr('name') != 'uuid'){
                        j_ele_desc.val(self.desc).change();
                    }
                }
                else{
                    // j_ele_desc.val(null);
                }
            }
            catch(err) {
                console.log('err = ', err);
            }

            try{
                var j_ele_order = $("#orderAllAdminMenuWorkspace"+apart+"InputId");
                if (j_ele_order.length > 0){
                    if (j_ele_order.attr('name') != 'uuid'){
                        j_ele_order.val(self.order).change();
                    }
                }
                else{
                    // j_ele_order.val(null);
                }
            }
            catch(err) {
                console.log('err = ', err);
            }

                        try{
                            var j_ele_in_main_menu = $("#in_main_menuAllAdminMenuWorkspace"+apart+"InputId");
                            if (j_ele_in_main_menu.length > 0){
                                if (j_ele_in_main_menu.attr('name') != 'uuid'){
                                    j_ele_in_main_menu.prop('checked',self.in_main_menu).change();
                                }
                            }
                            else{
                                // j_ele_in_main_menu.val(null);
                            }
                        }
                        catch(err) {
                            console.log('err = ', err);
                        }
                                
                try{
                    var j_ele_menu_group = $("#menu_groupAdminMenuGroupAllAdminMenuWorkspace"+apart+"InputId");
                    if (j_ele_menu_group.length > 0){
                        var value=self["menu_group"]["uuid"];
                        j_ele_menu_group.val(value).change();
                    }
                    else{
                        // j_ele_menu_group.val(null);
                    }
                }
                catch(err) {
                    console.log('err = ', err);
                }

                try{
                    var j_ele_parent_menu = $("#parent_menuAllAdminMenuAllAdminMenuWorkspace"+apart+"InputId");
                    if (j_ele_parent_menu.length > 0){
                        var value=self["parent_menu"]["uuid"];
                        j_ele_parent_menu.val(value).change();
                    }
                    else{
                        // j_ele_parent_menu.val(null);
                    }
                }
                catch(err) {
                    console.log('err = ', err);
                }

                        try{
                            var j_ele_login_redirect = $("#login_redirectAllAdminMenuWorkspace"+apart+"InputId");
                            if (j_ele_login_redirect.length > 0){
                                if (j_ele_login_redirect.attr('name') != 'uuid'){
                                    j_ele_login_redirect.prop('checked',self.login_redirect).change();
                                }
                            }
                            else{
                                // j_ele_login_redirect.val(null);
                            }
                        }
                        catch(err) {
                            console.log('err = ', err);
                        }
                                
                        try{
                            var j_ele_active = $("#activeAllAdminMenuWorkspace"+apart+"InputId");
                            if (j_ele_active.length > 0){
                                if (j_ele_active.attr('name') != 'uuid'){
                                    j_ele_active.prop('checked',self.active).change();
                                }
                            }
                            else{
                                // j_ele_active.val(null);
                            }
                        }
                        catch(err) {
                            console.log('err = ', err);
                        }
                                
                        try{
                            var j_ele_staff_only = $("#staff_onlyAllAdminMenuWorkspace"+apart+"InputId");
                            if (j_ele_staff_only.length > 0){
                                if (j_ele_staff_only.attr('name') != 'uuid'){
                                    j_ele_staff_only.prop('checked',self.staff_only).change();
                                }
                            }
                            else{
                                // j_ele_staff_only.val(null);
                            }
                        }
                        catch(err) {
                            console.log('err = ', err);
                        }
                                
                        try{
                            var j_ele_superuser_only = $("#superuser_onlyAllAdminMenuWorkspace"+apart+"InputId");
                            if (j_ele_superuser_only.length > 0){
                                if (j_ele_superuser_only.attr('name') != 'uuid'){
                                    j_ele_superuser_only.prop('checked',self.superuser_only).change();
                                }
                            }
                            else{
                                // j_ele_superuser_only.val(null);
                            }
                        }
                        catch(err) {
                            console.log('err = ', err);
                        }
                                
                        try{
                            var j_ele_split_marked = $("#split_markedAllAdminMenuWorkspace"+apart+"InputId");
                            if (j_ele_split_marked.length > 0){
                                if (j_ele_split_marked.attr('name') != 'uuid'){
                                    j_ele_split_marked.prop('checked',self.split_marked).change();
                                }
                            }
                            else{
                                // j_ele_split_marked.val(null);
                            }
                        }
                        catch(err) {
                            console.log('err = ', err);
                        }
                                
            try{
                var j_ele_split_label = $("#split_labelAllAdminMenuWorkspace"+apart+"InputId");
                if (j_ele_split_label.length > 0){
                    if (j_ele_split_label.attr('name') != 'uuid'){
                        j_ele_split_label.val(self.split_label).change();
                    }
                }
                else{
                    // j_ele_split_label.val(null);
                }
            }
            catch(err) {
                console.log('err = ', err);
            }

            try{
                var j_ele_updated_at = $("#updated_atAllAdminMenuWorkspace"+apart+"InputId");
                if (j_ele_updated_at.length > 0){
                    var dateObj = new Date(Date.parse(self.updated_at)); 
                      if (dateObj != "Invalid Date"){
                        var newdate = moment(dateObj).format('DD/MM/YYYY');
                        console.log('newdate = ', newdate);
                        j_ele_updated_at.val(newdate).change();
                    }
                }
                else{
                    // j_ele_updated_at.val(null);
                }
            }
            catch(err) {
                console.log('err = ', err);
            }

            try{
                var j_ele_created_at = $("#created_atAllAdminMenuWorkspace"+apart+"InputId");
                if (j_ele_created_at.length > 0){
                    var dateObj = new Date(Date.parse(self.created_at)); 
                      if (dateObj != "Invalid Date"){
                        var newdate = moment(dateObj).format('DD/MM/YYYY');
                        console.log('newdate = ', newdate);
                        j_ele_created_at.val(newdate).change();
                    }
                }
                else{
                    // j_ele_created_at.val(null);
                }
            }
            catch(err) {
                console.log('err = ', err);
            }

            if (formId!=null){

            var arr_table=[];
            var form = $('#' + formId);
            if (form.length > 0) {
                form.find("table").each(function() {
                    console.log("table in form" + $(this));
                    var obj = $(this);
                    arr_table.push(obj);
                })
            }
            if (arr_table.length > 0) {
                arr_table.forEach(element => {
                        var JS_MODEL_APPNAME=element.attr("app-model-name");
                        var search_data=element.attr("parent-attr-name") +"="+self.uuid;
                        window[JS_MODEL_APPNAME + "FillTableInForm"](1,search_data,element.attr("id"),modals_type.toLowerCase());
                    });
                }
            }
            
            
            

        return self;
    }
                
    // ########## [FILL FORM] Objects to FRONT END ##############
    tFillTestDataFormModal(modals_type,formId=null){
        //modals_type
        //*Create
        //*Detail
        //*Edit
        var apart=modals_type+'Modal';

        var self = this;

            try{
                var j_ele_name = $("#nameAllAdminMenuWorkspace"+apart+"InputId");
                if (j_ele_name.length > 0){
                    if (j_ele_name.attr('name') != 'uuid'){
                        j_ele_name.val(self.name).change();
                    }
                }
                else{
                    // j_ele_name.val(null);
                }
            }
            catch(err) {
                console.log('err = ', err);
            }

            try{
                var j_ele_uuid = $("#uuidAllAdminMenuWorkspace"+apart+"InputId");
                if (j_ele_uuid.length > 0 && self.uuid !=null){
                    if (j_ele_uuid.attr('name') == 'uuid'){
                        j_ele_uuid.val(self.uuid).change();
                    }
                }
                else{
                    // j_ele_uuid.val(null);
                }
            }
            catch(err) {
                console.log('err = ', err);
            }

            try{
                var j_ele_title = $("#titleAllAdminMenuWorkspace"+apart+"InputId");
                if (j_ele_title.length > 0){
                    if (j_ele_title.attr('name') != 'uuid'){
                        j_ele_title.val(self.title).change();
                    }
                }
                else{
                    // j_ele_title.val(null);
                }
            }
            catch(err) {
                console.log('err = ', err);
            }

            try{
                var j_ele_icon_class = $("#icon_classAllAdminMenuWorkspace"+apart+"InputId");
                if (j_ele_icon_class.length > 0){
                    if (j_ele_icon_class.attr('name') != 'uuid'){
                        j_ele_icon_class.val(self.icon_class).change();
                    }
                }
                else{
                    // j_ele_icon_class.val(null);
                }
            }
            catch(err) {
                console.log('err = ', err);
            }

            try{
                var j_ele_data_feather = $("#data_featherAllAdminMenuWorkspace"+apart+"InputId");
                if (j_ele_data_feather.length > 0){
                    if (j_ele_data_feather.attr('name') != 'uuid'){
                        j_ele_data_feather.val(self.data_feather).change();
                    }
                }
                else{
                    // j_ele_data_feather.val(null);
                }
            }
            catch(err) {
                console.log('err = ', err);
            }

            try{
                var j_ele_url = $("#urlAllAdminMenuWorkspace"+apart+"InputId");
                if (j_ele_url.length > 0){
                    if (j_ele_url.attr('name') != 'uuid'){
                        j_ele_url.val(self.url).change();
                    }
                }
                else{
                    // j_ele_url.val(null);
                }
            }
            catch(err) {
                console.log('err = ', err);
            }

                        try{
                            var j_ele_icon = $("#iconAllAdminMenuWorkspace"+apart+"FileAreaId");
                            if (j_ele_icon.length > 0){
                                j_ele_icon.html('');
                                
                    
                            var value=self.icon;
                            if(value!= undefined && value!= ""){
                                var decode_url = decodeURIComponent(value);
                                var filename = decode_url.split('/')[decode_url.split('/').length-1]
                                var file_html="";
                                var edit_text = "d-none";
                                if (modals_type.toLowerCase() == "edit") {
                                    edit_text = "";
                                }
                                file_html +=`
                                    <div class="form-group row col-xl-8 table-hover mt-1" style="background-color:gainsboro;height: 25px;" id="` + self.uuid + `AttachmentDivId">
                                        <div class="col-xl-10 view-attachment-class" >
                                            <span><a style="color:cornflowerblue"  target="_blank" href="` + value + `"><p><b>` + filename + `</b></p></a></span>
                                        </div>
                                        <div class="col-xl-2 text-end ` + edit_text + `">
                                            <i class="fas fa-times" style="color:gray" file-uuid="` + self.uuid + `" id="` + self.uuid + `btnDeleteId" onclick="iconalladminmenuWorkspaceDeletedAttacthment(this)"></i>
                                        </div>
                                    </div>
                                `;
                            }
                    
                                    
                                j_ele_icon.html(file_html);
                            }
                            else{
                                // j_ele_icon.html('');
                            }
                        }
                        catch(err) {
                            console.log('err = ', err);
                        }
                                
            try{
                var j_ele_icon_base64 = $("#icon_base64AllAdminMenuWorkspace"+apart+"InputId");
                if (j_ele_icon_base64.length > 0){
                    if (j_ele_icon_base64.attr('name') != 'uuid'){
                        j_ele_icon_base64.val(self.icon_base64).change();
                    }
                }
                else{
                    // j_ele_icon_base64.val(null);
                }
            }
            catch(err) {
                console.log('err = ', err);
            }

            try{
                var j_ele_desc = $("#descAllAdminMenuWorkspace"+apart+"InputId");
                if (j_ele_desc.length > 0){
                    if (j_ele_desc.attr('name') != 'uuid'){
                        j_ele_desc.val(self.desc).change();
                    }
                }
                else{
                    // j_ele_desc.val(null);
                }
            }
            catch(err) {
                console.log('err = ', err);
            }

            try{
                var j_ele_order = $("#orderAllAdminMenuWorkspace"+apart+"InputId");
                if (j_ele_order.length > 0){
                    if (j_ele_order.attr('name') != 'uuid'){
                        j_ele_order.val(self.order).change();
                    }
                }
                else{
                    // j_ele_order.val(null);
                }
            }
            catch(err) {
                console.log('err = ', err);
            }

                        try{
                            var j_ele_in_main_menu = $("#in_main_menuAllAdminMenuWorkspace"+apart+"InputId");
                            if (j_ele_in_main_menu.length > 0){
                                if (j_ele_in_main_menu.attr('name') != 'uuid'){
                                    j_ele_in_main_menu.prop('checked',self.in_main_menu).change();
                                }
                            }
                            else{
                                // j_ele_in_main_menu.val(null);
                            }
                        }
                        catch(err) {
                            console.log('err = ', err);
                        }
                                
                try{
                    var j_ele_menu_group = $("#menu_groupAdminMenuGroupAllAdminMenuWorkspace"+apart+"InputId");
                    if (j_ele_menu_group.length > 0){
                        var value=self["menu_group"]["uuid"];
                        j_ele_menu_group.val(value).change();
                    }
                    else{
                        // j_ele_menu_group.val(null);
                    }
                }
                catch(err) {
                    console.log('err = ', err);
                }

                try{
                    var j_ele_parent_menu = $("#parent_menuAllAdminMenuAllAdminMenuWorkspace"+apart+"InputId");
                    if (j_ele_parent_menu.length > 0){
                        var value=self["parent_menu"]["uuid"];
                        j_ele_parent_menu.val(value).change();
                    }
                    else{
                        // j_ele_parent_menu.val(null);
                    }
                }
                catch(err) {
                    console.log('err = ', err);
                }

                        try{
                            var j_ele_login_redirect = $("#login_redirectAllAdminMenuWorkspace"+apart+"InputId");
                            if (j_ele_login_redirect.length > 0){
                                if (j_ele_login_redirect.attr('name') != 'uuid'){
                                    j_ele_login_redirect.prop('checked',self.login_redirect).change();
                                }
                            }
                            else{
                                // j_ele_login_redirect.val(null);
                            }
                        }
                        catch(err) {
                            console.log('err = ', err);
                        }
                                
                        try{
                            var j_ele_active = $("#activeAllAdminMenuWorkspace"+apart+"InputId");
                            if (j_ele_active.length > 0){
                                if (j_ele_active.attr('name') != 'uuid'){
                                    j_ele_active.prop('checked',self.active).change();
                                }
                            }
                            else{
                                // j_ele_active.val(null);
                            }
                        }
                        catch(err) {
                            console.log('err = ', err);
                        }
                                
                        try{
                            var j_ele_staff_only = $("#staff_onlyAllAdminMenuWorkspace"+apart+"InputId");
                            if (j_ele_staff_only.length > 0){
                                if (j_ele_staff_only.attr('name') != 'uuid'){
                                    j_ele_staff_only.prop('checked',self.staff_only).change();
                                }
                            }
                            else{
                                // j_ele_staff_only.val(null);
                            }
                        }
                        catch(err) {
                            console.log('err = ', err);
                        }
                                
                        try{
                            var j_ele_superuser_only = $("#superuser_onlyAllAdminMenuWorkspace"+apart+"InputId");
                            if (j_ele_superuser_only.length > 0){
                                if (j_ele_superuser_only.attr('name') != 'uuid'){
                                    j_ele_superuser_only.prop('checked',self.superuser_only).change();
                                }
                            }
                            else{
                                // j_ele_superuser_only.val(null);
                            }
                        }
                        catch(err) {
                            console.log('err = ', err);
                        }
                                
                        try{
                            var j_ele_split_marked = $("#split_markedAllAdminMenuWorkspace"+apart+"InputId");
                            if (j_ele_split_marked.length > 0){
                                if (j_ele_split_marked.attr('name') != 'uuid'){
                                    j_ele_split_marked.prop('checked',self.split_marked).change();
                                }
                            }
                            else{
                                // j_ele_split_marked.val(null);
                            }
                        }
                        catch(err) {
                            console.log('err = ', err);
                        }
                                
            try{
                var j_ele_split_label = $("#split_labelAllAdminMenuWorkspace"+apart+"InputId");
                if (j_ele_split_label.length > 0){
                    if (j_ele_split_label.attr('name') != 'uuid'){
                        j_ele_split_label.val(self.split_label).change();
                    }
                }
                else{
                    // j_ele_split_label.val(null);
                }
            }
            catch(err) {
                console.log('err = ', err);
            }

            try{
                var j_ele_updated_at = $("#updated_atAllAdminMenuWorkspace"+apart+"InputId");
                if (j_ele_updated_at.length > 0){
                    var dateObj = new Date(Date.parse(self.updated_at)); 
                      if (dateObj != "Invalid Date"){
                        var newdate = moment(dateObj).format('DD/MM/YYYY');
                        console.log('newdate = ', newdate);
                        j_ele_updated_at.val(newdate).change();
                    }
                }
                else{
                    // j_ele_updated_at.val(null);
                }
            }
            catch(err) {
                console.log('err = ', err);
            }

            try{
                var j_ele_created_at = $("#created_atAllAdminMenuWorkspace"+apart+"InputId");
                if (j_ele_created_at.length > 0){
                    var dateObj = new Date(Date.parse(self.created_at)); 
                      if (dateObj != "Invalid Date"){
                        var newdate = moment(dateObj).format('DD/MM/YYYY');
                        console.log('newdate = ', newdate);
                        j_ele_created_at.val(newdate).change();
                    }
                }
                else{
                    // j_ele_created_at.val(null);
                }
            }
            catch(err) {
                console.log('err = ', err);
            }

            if (formId!=null){

            var arr_table=[];
            var form = $('#' + formId);
            if (form.length > 0) {
                form.find("table").each(function() {
                    console.log("table in form" + $(this));
                    var obj = $(this);
                    arr_table.push(obj);
                })
            }
            if (arr_table.length > 0) {
                arr_table.forEach(element => {
                        var JS_MODEL_APPNAME=element.attr("app-model-name");
                        var search_data=element.attr("parent-attr-name") +"="+self.uuid;
                        window[JS_MODEL_APPNAME + "FillTableInForm"](1,search_data,element.attr("id"),modals_type.toLowerCase());
                    });
                }
            }
            
            
            

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
            url: AllAdminMenuWorkspace_URL,
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
                    self = new AllAdminMenuWorkspace(data);
                    AllAdminMenuWorkspaceGetDataTable(AllAdminMenuWorkspacepagination["current_page"]);
                    if(is_continue_form){
                        is_continue_form=false;
                        toastr.success('Thêm mới thành công');
                        $(location).prop('href', "/Workspace/AllAdminMenu/create/");
                        

                    }else if(is_continue_modal){
                        is_continue_modal=false;
                        AllAdminMenuRefreshCreateModal();
                        toastr.success('Thêm mới thành công');
                    }else{
                        $('.modal').modal('hide');
                    //    $.confirm({
                    //    title: 'THÀNH CÔNG',
                    //    content: 'Thêm mới thành công',
                    //    buttons: {
                    //        NewOther:{
                     //           text: 'Thêm mới',
                    //            btnClass: 'btn-blue',
                    //            keys: ['enter', 'shift'],
                    //            action: function(){
                    //                $(location).prop('href', "/Workspace/AllAdminMenu/create/");
                    //            }
                    //        },
                    //        Show:{
                    //            text: 'Chi tiết',
                    //            action: function(){
                    //                $(location).prop('href', "/Workspace/AllAdminMenu/detail/" + self.uuid + "/");
                    //            }
                     //       },
                    //        close: {
                    //            text: 'Hủy',
                    //            action: function(){
                    //               $('.modal').modal('hide');
                    //            }
                    //        },
                    //    }
                    //});
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
                if(is_debug){
                    $.alert({
                        title: 'Error [' + xhr.status + '] ' + thrownError ,
                        content: xhr.responseText,
                    });
                }
                
            },
        });
        return self;
    }
                
    // ########## [UPDATE] post Objects to REST API --> return object if success ##############
    tUpdatePostApi(formId=null){
        $.ajaxSetup({
            headers : {
                'CSRFToken' : getCSRFTokenValue(),
                'X-CSRFToken' : getCSRFTokenValue(), // for --> SessionAuthentication
            },
            tryCount : 0,
            retryLimit : 3,

        });
        var self = this;
        var formData;
        var arr_table = [];
        if(formId==null){
         formData = new FormData($('#alladminmenuWorkspaceCreateFormId')[0]);

        }
        else{
            var form = $('#' + formId);
            if (form.length > 0) {
                form.find("table").each(function() {
                    console.log("table in form" + $(this));
                    obj = $(this);
                    arr_table.push(obj);
                    // $(this).remove();

                })
            }
            formData = new FormData();
            form.find(':input').each(function() {
                var attr = $(this).attr('name');
                var type = $(this).attr('type');
                var data_type = $(this).attr('data-type');
                //data-type='currency'
                var date = $(this).attr('data-datepicker');
                if (($(this).closest("table").length > 0 && $(this).closest("table").closest("form").attr("id") == formId) || ($(this).closest("form").length > 0 && $(this).closest("form").attr("id") != formId)) {
                    return;
                }
                if (typeof attr !== 'undefined' && attr !== false) {
                    if (typeof date !== 'undefined' && date !== false) {
                        formData.append($(this).attr('name'), toDatePythonByStringTime($(this).val(), 'DD/MM/YYYY'));
                    } else {
                        if (type == 'file') {
                            var files = $(this)[0].files;
                            // Check file selected or not
                            if(files.length > 0 ) {
                                formData.append($(this).attr('name'), files[0]);
                            }
                        }
                        else if(type == 'checkbox'){
                            formData.append($(this).attr('name'), $(this).is(":checked"));
                        }
                        else if(type == 'radio'){
    
                            if($(this).is(":checked")){
                                formData.set($(this).attr('name'),  $(this).val());
                            }
                        } else {

                          //  if(Array.isArray($(this).val())){
                          //      var arr=$(this).val();
                          //      for(var i in arr)
                          //          formData.append($(this).attr('name'), arr[i]);
                          //  }
                          //  else
                          //  {
                          //      formData.append($(this).attr('name'), $(this).val());
                          //  }

                            if (Array.isArray($(this).val())) {
                                var arr = $(this).val();
                                for (var i in arr)
                                    formData.append($(this).attr('name'), arr[i]);
                            } else {
                                if(data_type == "currency"){
                                    var currency_value = formatNumber($(this).val());
                                    currency_value = currency_value.replaceAll(",", "");
                                    formData.append($(this).attr('name'),currency_value );

                                }else{
                                    formData.append($(this).attr('name'), $(this).val());
                                }
                            }
                        }
                    }
                }
            });
        }
        if(formData.get('uuid')==null || formData.get('uuid')=='' || formData.get('uuid')==null){
            return;
        }else{
            this.uuid=formData.get('uuid');
        }
        
        var file_eles = $(".alladminmenu-workspace");
        for (var i = 0; i < file_eles.length; i++) {
            console.log('file_eles[i] = ', file_eles[i]);
            var files = file_eles[i].files;
            // Check file selected or not
            if(files.length > 0 ) {
                formData.append(file_eles[i].getAttribute('name'), files[0]);
            }
        }
        
        var is_has_children=false;
        var is_save_self_table=false;
        var is_notification=false;
        var is_done=false;
        if (arr_table.length > 0) {
            arr_table.forEach(element => {
                var model_name=element.attr("model_name");
                    var depend=element.attr("depend");
                    var tr_length=element.find("tbody").find("tr").length ;
                    if(tr_length >1){
                        if(depend==='self-depend'){
                            is_save_self_table=true;
                            window[model_name + "SaveInlineTable"](element.attr("id"),null,null,formData);
                            arr_table.pop(element);
                        }else{
                            element.attr("parent-attr-uuid",formData.get("uuid"));
                            is_has_children=true;
                        }
                    }
            });
        }
        if(!is_save_self_table){
            $.ajax({
                url: AllAdminMenuWorkspace_URL + self.uuid + "/",
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
                        self = new AllAdminMenuWorkspace(data);
                        
                        AllAdminMenuWorkspaceGetDataTable(AllAdminMenuWorkspacepagination["current_page"])
                        //$(location).prop('href', "/Workspace/AllAdminMenu/detail/" + self.uuid + "/");
                        if(is_continue_form){
                            is_continue_form=false;
                            if(!is_notification && (is_done||!is_has_children)){
                                is_notification = true;
                                toastr.success('Cập nhật thành công');
                            }
                            $(location).prop('href', "/Workspace/AllAdminMenu/create/");
                        }else if(is_continue_modal){
                            is_continue_modal=false;
                            AllAdminMenuRefreshCreateModal();
                            if(!is_notification && (is_done||!is_has_children)){
                                is_notification = true;
                                toastr.success('Cập nhật thành công');
                            }
                        }else{
                            $('.modal').modal('hide');
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
                    if(is_debug){
                        $.alert({
                            title: 'Error [' + xhr.status + '] ' + thrownError ,
                            content: xhr.responseText,
                        });
                    }
                },
            });
        }
        if(is_has_children){
            arr_table.forEach(element => {
                var model_name=element.attr("model_name");
                var depend=element.attr("depend");
                if(depend!='self-depend'){
                    window[model_name + "SaveInlineTable"](element.attr("id"),null,self.uuid);
                }
            });
            is_done=true;
        }
        if(is_done || !is_has_children){
            if(is_continue_form){
                is_continue_form=false;
                if(!is_notification && (is_done||!is_has_children)){
                    is_notification = true;
                    toastr.success('Cập nhật thành công');
                }
                    $(location).prop('href', "/Workspace/AllAdminMenu/create/");
            }else if(is_continue_modal){
                is_continue_modal=false;
                AllAdminMenuRefreshCreateModal();
                if(!is_notification && (is_done||!is_has_children)){
                    is_notification = true;
                    toastr.success('Cập nhật thành công');
                }
            }else{
                $('.modal').modal('hide');
                if(!is_notification && (is_done||!is_has_children)){
                    is_notification = true;
                    toastr.success('Cập nhật thành công');
                }
            }
        }
        return self;
    }
                
    // ########## [FORM] [CREATE] post Objects to REST API --> return object if success ##############
    tCreateNewPostFormApi(formId=null){
        $.ajaxSetup({
            headers : {
                'CSRFToken' : getCSRFTokenValue(),
                'X-CSRFToken' : getCSRFTokenValue(), // for --> SessionAuthentication
            },
            tryCount : 0,
            retryLimit : 3,
        });
        $('#idAllAdminMenuWorkspaceInputId').val(null);
        $('#uuidAllAdminMenuWorkspaceInputId').val(uuidv4());
        var self = this;
        var formData;
        var arr_table = [];
        if(formId==null){
         formData = new FormData($('#alladminmenuWorkspaceCreateFormId')[0]);

        }
        else{
            var form = $('#' + formId);
            if (form.length > 0) {
                form.find("table").each(function() {
                    console.log("table in form" + $(this));
                    obj = $(this);
                    arr_table.push(obj);
                    // $(this).remove();

                })
            }
            formData = new FormData();
            form.find(':input').each(function() {
                var attr = $(this).attr('name');
                var type = $(this).attr('type');
                var data_type = $(this).attr('data-type');
                //data-type='currency'
                var date = $(this).attr('data-datepicker');
                console.log('closest("table") :', $(this).closest("table").length);
                console.log('$(this).closest("table") > 0 :', $(this).closest("table").length > 0);
                console.log('$(this).closest("table").closest("form") :', $(this).closest("table").closest("form"));
                console.log('$(this).closest("table").closest("form") == formId) :', $(this).closest("table").closest("form") == formId);
                console.log('$(this).closest("form").id != formId :', $(this).closest("form").id != formId);
                console.log('$(this).closest("form").id :', $(this).closest("form").attr("id"));
                console.log(' formId :', formId);
                console.log('$(this).closest("form").length > 0 :', $(this).closest("form").length > 0);
                console.log('($(this).closest("form").length > 0 && $(this).closest("form").id != formId) :', ($(this).closest("form").length > 0 && $(this).closest("form").attr("id") != formId));
                if (($(this).closest("table").length > 0 && $(this).closest("table").closest("form").attr("id") == formId) || ($(this).closest("form").length > 0 && $(this).closest("form").attr("id") != formId)) {
                    return;
                }
                if (typeof attr !== 'undefined' && attr !== false) {
                    if (typeof date !== 'undefined' && date !== false) {
                        formData.append($(this).attr('name'), toDatePythonByStringTime($(this).val(), 'DD/MM/YYYY'));
                    } else {
                        if (type == 'file') {
                            var files = $(this)[0].files;
                            // Check file selected or not
                            if (files.length > 0) {
                                formData.append($(this).attr('name'), files[0]);
                            }
                        } else if (type == 'checkbox') {
                            formData.append($(this).attr('name'), $(this).is(":checked"));
                        } else if (type == 'radio') {

                            if ($(this).is(":checked")) {
                                formData.set($(this).attr('name'), $(this).val());
                            }
                        } else {

                            if (Array.isArray($(this).val())) {
                                var arr = $(this).val();
                                for (var i in arr)
                                    formData.append($(this).attr('name'), arr[i]);
                            } else {
                                if(data_type == "currency"){
                                    var currency_value = formatNumber($(this).val());
                                    currency_value = currency_value.replaceAll(",", "");
                                    formData.append($(this).attr('name'),currency_value );

                                }else{
                                    formData.append($(this).attr('name'), $(this).val());
                                }
                            }
                        }
                    }
                }
            });
        }
        
        // 
        
        var file_eles = $(".alladminmenu-workspace");
        for (var i = 0; i < file_eles.length; i++) {
            console.log('file_eles[i] = ', file_eles[i]);
            var files = file_eles[i].files;
            // Check file selected or not
            if(files.length > 0 ) {
                formData.append(file_eles[i].getAttribute('name'), files[0]);
            }
        }
        var is_done=false;
        var is_has_children=false;
        var is_save_self_table=false;
        var is_notification=false;
        if (arr_table.length > 0) {
            arr_table.forEach(element => {
                var model_name=element.attr("model_name");
                    var depend=element.attr("depend");
                    var tr_length=element.find("tbody").find("tr").length ;
                    if(tr_length >1){
                        if(depend==='self-depend'){
                            is_save_self_table=true;
                            window[model_name + "SaveInlineTable"](element.attr("id"),null,null,formData);
                            arr_table.pop(element);
                        }else{
                            element.attr("parent-attr-uuid",formData.get("uuid"));
                            is_has_children=true;
                        }
                    }
            });
        }
        if(is_save_self_table){
            LoadAllAdminMenuWorkspaceList();
        }
        if(!is_save_self_table){
                $.ajax({
                url: AllAdminMenuWorkspace_URL,
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
                        self = new AllAdminMenuWorkspace(data);
                        LoadAllAdminMenuWorkspaceList();
                        AllAdminMenuWorkspaceGetDataTable(AllAdminMenuWorkspacepagination["current_page"]);
                        if(is_continue_form){
                            is_continue_form=false;
                            if(!is_notification){
                                is_notification = true;
                                toastr.success('Thêm mới thành công');
                            }
                            

                            $(location).prop('href', "/Workspace/AllAdminMenu/create/");
                        }else if(is_continue_modal){
                            is_continue_modal=false;
                            AllAdminMenuRefreshCreateModal();
                            if(!is_notification){
                                is_notification = true;
                                toastr.success('Thêm mới thành công');
                            }
                        }else{
                            if(!is_notification){
                                is_notification = true;
                                toastr.success('Thêm mới thành công');
                            }
                            $('.modal').modal('hide');
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
                    if(is_debug){
                        $.alert({
                            title: 'Error [' + xhr.status + '] ' + thrownError ,
                            content: xhr.responseText,
                        });
                    }
                },
            });
        }
        if(is_has_children){
            arr_table.forEach(element => {
                var model_name=element.attr("model_name");
                var depend=element.attr("depend");
                if(depend!='self-depend'){
                    window[model_name + "SaveInlineTable"](element.attr("id"),null,self.uuid);
                }
            });
            is_done=true;
        }
        if(is_done || !is_has_children){
            if(is_continue_form){
                is_continue_form=false;
                if(!is_notification){
                    is_notification = true;
                    toastr.success('Thêm mới thành công');
                }
                $(location).prop('href', "/Workspace/AllAdminMenu/create/");
            }else if(is_continue_modal){
                is_continue_modal=false;
                AllAdminMenuRefreshCreateModal();
                if(!is_notification){
                    is_notification = true;
                    toastr.success('Thêm mới thành công');
                }
            }else{
                if(!is_notification){
                    is_notification = true;
                    toastr.success('Thêm mới thành công');
                }
                $('.modal').modal('hide');
            }
        }
        return self;
    }
                
    // ########## [ROW] [CREATE] POST OBJ TO REST API --> return object if success ##############
    tCreateNewPostRowApi($this,form_data_parent=null,is_notice=false){
        $.ajaxSetup({
            headers : {
                'CSRFToken' : getCSRFTokenValue(),
                'X-CSRFToken' : getCSRFTokenValue(), // for --> SessionAuthentication
            },
            tryCount : 0,
            retryLimit : 3,
        });
        var self = this;
        var formData = new FormData();
        formData.set('uuid',uuidv4());
        // 
        var depend=$($this).attr('depend');
        if(depend!="self-depend"){
            formData.append($($this).attr('parent-attr-name'),$($this).attr('parent-attr-uuid'))
        }
            $($this).find(':input').each(function() {
                var attr = $(this).attr('name');
                var type = $(this).attr('type');
                var data_type = $(this).attr('data-type');
                //data-type='currency'
                var date = $(this).attr('data-datepicker');
                if (typeof attr !== 'undefined' && attr !== false) {
                if (typeof date !== 'undefined' && date !== false) {
                    formData.append($(this).attr('name'), toDatePythonByStringTime($(this).val(), 'DD/MM/YYYY'));
                } else {
                    if (type == 'file') {
                        var files = $(this)[0].files;
                        // Check file selected or not
                        if(files.length > 0 ) {
                            formData.append($(this).attr('name'), files[0]);
                        }
                    }
                    else if(type == 'checkbox'){
                        formData.append($(this).attr('name'), $(this).is(":checked"));
                    }
                    else if(type == 'radio'){

                        if($(this).is(":checked")){
                            formData.set($(this).attr('name'),  $(this).val());
                        }
                    } else {
                        if (Array.isArray($(this).val())) {
                                var arr = $(this).val();
                                for (var i in arr)
                                    formData.append($(this).attr('name'), arr[i]);
                        } else {
                            if(data_type == "currency"){
                                var currency_value = formatNumber($(this).val());
                                currency_value = currency_value.replaceAll(",", "");
                                formData.append($(this).attr('name'),currency_value );

                            }else{
                                formData.append($(this).attr('name'), $(this).val());
                            }
                        }
                    }
                }
            }
            });
        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }
        if(form_data_parent!=null){
                    for (var pair of form_data_parent.entries()) {
                        console.log(pair[0] + ', ' + pair[1]);
                        if(formData.get(pair[0])=== 'undefined' || formData.get(pair[0])=== '' || formData.get(pair[0])=== null){
                                formData.set(pair[0],pair[1])
                        }
                        
                    }
                }
        $.ajax({
            url: AllAdminMenuWorkspace_URL,
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
            $($this).attr("is-new","added");
            $($this).attr("uuid",formData.get('uuid'));
            if(is_notice)
                {
                    toastr.success('Thêm mới thành công');
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
                
                    if(is_debug){
                        $.alert({
                            title: 'Error [' + xhr.status + '] ' + thrownError ,
                            content: xhr.responseText,
                        });
                    }
            },
        });
        return self;
    }
                
    
    tCreateByFormDataApi(formData,action_title) {
    // cho phép thêm mới với formdata custom riêng cho từng trường trường hợp
        $.ajaxSetup({
            headers: {
                'CSRFToken': getCSRFTokenValue(),
                'X-CSRFToken': getCSRFTokenValue(), // for --> SessionAuthentication
            },
            tryCount: 0,
            retryLimit: 3,
        });
        var self = this;
        $.ajax({
            url: AllAdminMenuWorkspace_URL,
            type: "POST",   
            async: false,
            cache: false,
            timeout: 30000,
            data: formData,
            contentType: false,
            processData: false,
            success: function(data) {
                toastr.success(action_title+' thành công');
            },
            error: function(xhr, ajaxOptions, thrownError) {
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
                
                if(is_debug){
                    $.alert({
                        title: 'Error [' + xhr.status + '] ' + thrownError ,
                        content: xhr.responseText,
                    });
                }
            },
        });
        return self;
    }
                
                // ########## [ROW] [UPDATE] POST OBJ TO REST API --> return object if success ##############
                tUpdateNewPostRowApi($this,form_data_parent=null,is_notice=false){
                    //cập nhật với từng dòng trên bảng
                    $.ajaxSetup({
                        headers : {
                            'CSRFToken' : getCSRFTokenValue(),
                            'X-CSRFToken' : getCSRFTokenValue(), // for --> SessionAuthentication
                        },
                        tryCount : 0,
                        retryLimit : 3,
                    });
                    var self = this;
                    var formData = new FormData();
                    var uuid = $($this).attr("uuid");
                    var depend=$($this).attr('depend');
                    if(depend!="self-depend"){
                    formData.append($($this).attr('parent-attr-name'),$($this).attr('parent-attr-uuid'))
                    }
                   $($this).find(':input').each(function() {
                    var attr = $(this).attr('name');
                    var type = $(this).attr('type');
                    var data_type = $(this).attr('data-type');
                    //data-type='currency'
                    var date = $(this).attr('data-datepicker');
                    if (typeof attr !== 'undefined' && attr !== false) {
                    if (typeof date !== 'undefined' && date !== false) {
                        formData.append($(this).attr('name'), toDatePythonByStringTime($(this).val(), 'DD/MM/YYYY'));
                    } else {
                        if (type == 'file') {
                            var files = $(this)[0].files;
                            // Check file selected or not
                            if(files.length > 0 ) {
                                formData.append($(this).attr('name'), files[0]);
                            }
                        }
                        else if(type == 'checkbox'){
                            formData.append($(this).attr('name'), $(this).is(":checked"));
                        }
                        else if(type == 'radio'){
    
                            if($(this).is(":checked")){
                                formData.set($(this).attr('name'),  $(this).val());
                            }
                        } else {
                            //formData.append($(this).attr('name'), $(this).val());
                            if (Array.isArray($(this).val())) {
                                var arr = $(this).val();
                                for (var i in arr)
                                    formData.append($(this).attr('name'), arr[i]);
                            } else {
                                if(data_type == "currency"){
                                    var currency_value = formatNumber($(this).val());
                                    currency_value = currency_value.replaceAll(",", "");
                                    formData.append($(this).attr('name'),currency_value );

                                }else{
                                    formData.append($(this).attr('name'), $(this).val());
                                }
                            }
                        }
                    }
                }
            });
                    for (var pair of formData.entries()) {
                        console.log(pair[0] + ', ' + pair[1]);
                    }
                    for (var pair of formData.entries()) {
                    console.log(pair[0] + ', ' + pair[1]);
                }
                if(form_data_parent!=null){
                    for (var pair of form_data_parent.entries()) {
                        console.log(pair[0] + ', ' + pair[1]);
                        if(formData.get(pair[0])=== 'undefined' && formData.get(pair[0])=== '' || formData.get(pair[0])=== null){
                                formData.set(pair[0],pair[1])
                        }
                        
                    }
                }
                    // 
                    $.ajax({
                        url: AllAdminMenuWorkspace_URL + uuid + "/",
                        type: "PATCH",
                        async: false,
                        cache: false,
                        timeout: 30000,
                        data: formData,
                        //contentType: "multipart/form-data",
                        contentType: false,
                        // dataType : false,
                        processData: false,
                        success: function (data) {
                        $($this).attr("is-new","added");
                        if(is_notice)
                        {
                            toastr.success('Cập nhật thành công');
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
                            
                            if(is_debug){
                                $.alert({
                                    title: 'Error [' + xhr.status + '] ' + thrownError ,
                                    content: xhr.responseText,
                                });
                            }
                        },
                    });
                    return self;
                }
                            
    tDeleteApi(uuid=null){
        $.ajaxSetup({
            headers : {
                'CSRFToken' : getCSRFTokenValue(),
                'X-CSRFToken' : getCSRFTokenValue(), // for --> SessionAuthentication
            },
            tryCount : 0,
            retryLimit : 3,
        });


        var self = this;
        var uuid_go=""
        if(uuid==null){
            uuid_go=cr_uuid;
        }else{
            uuid_go=uuid;
        }
        console.log('self.id = ', self.id);
        $.ajax({
            url: AllAdminMenuWorkspace_URL + uuid_go + "/",
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
                toastr.success('Xóa thành công');
                AllAdminMenuWorkspaceGetDataTable(AllAdminMenuWorkspacepagination["current_page"]);
                if(cr_uuid!=""){
                    $(location).prop('href', "/Workspace/AllAdminMenu/create/");
                }
                console.log(data);
                
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
                
                if(is_debug){
                    $.alert({
                        title: 'Error [' + xhr.status + '] ' + thrownError ,
                        content: xhr.responseText,
                    });
                }
            },
        });
    }
                
    tDeleteApiWithDataSearch(uuid=null,data_search=null){
        $.ajaxSetup({
            headers : {
                'CSRFToken' : getCSRFTokenValue(),
                'X-CSRFToken' : getCSRFTokenValue(), // for --> SessionAuthentication
            },
            tryCount : 0,
            retryLimit : 3,
        });


        var self = this;
        var uuid_go=""
        if(uuid==null){
            uuid_go=cr_uuid;
        }else{
            uuid_go=uuid;
        }
        
        console.log('self.id = ', self.id);
        $.ajax({
            url: AllAdminMenuWorkspace_URL + uuid_go + "/",
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
                toastr.success('Xóa thành công');
                AllAdminMenuWorkspaceSearchData(AllAdminMenuWorkspacepagination["current_page"],"filter",data_search);
                if(cr_uuid!=""){
                    $(location).prop('href', "/Workspace/AllAdminMenu/create/");
                }
                console.log(data);
                
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
                
                if(is_debug){
                    $.alert({
                        title: 'Error [' + xhr.status + '] ' + thrownError ,
                        content: xhr.responseText,
                    });
                }
            },
        });
    }
                
    tDeleteFileApi(uuid = null,attr_name) {
        $.ajaxSetup({
            headers: {
                'CSRFToken': getCSRFTokenValue(),
                'X-CSRFToken': getCSRFTokenValue(), // for --> SessionAuthentication
            },
            tryCount: 0,
            retryLimit: 3,
        });
        var self = this;
        var formData = new FormData();
        formData.set("attach-field",attr_name);
        formData.set("uuid",uuid);
       
        $.ajax({
            url: AllAdminMenuWorkspace_REMOVEFILE_URL+uuid+"/",
            type: "PATCH",
            async: false,
            cache: false,
            timeout: 30000,
            data: formData,
            //contentType: "multipart/form-data",
            contentType: false,
            // dataType : false,
            processData: false,
            success: function(data) {
                toastr.success('Đã xóa tập đính kèm!');
            },
            error: function(xhr, ajaxOptions, thrownError) {
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
                
                if(is_debug){
                    $.alert({
                        title: 'Error [' + xhr.status + '] ' + thrownError ,
                        content: xhr.responseText,
                    });
                }
            },
        });
        return self;
    }
                
    tUpdateOnlyFieldApi(uuid = null,attr_name,attr_value,mess="Cập nhật") {
    //Cập nhật 1 trường thông tin, nhanh gọn
        $.ajaxSetup({
            headers: {
                'CSRFToken': getCSRFTokenValue(),
                'X-CSRFToken': getCSRFTokenValue(), // for --> SessionAuthentication
            },
            tryCount: 0,
            retryLimit: 3,
        });
        var self = this;
        var formData = new FormData();
        formData.set(attr_name,attr_value);  
       
        $.ajax({
            url: AllAdminMenuWorkspace_URL+uuid+"/",
            type: "PATCH",
            async: false,
            cache: false,
            timeout: 30000,
            data: formData,
            //contentType: "multipart/form-data",
            contentType: false,
            // dataType : false,
            processData: false,
            success: function(data) {
                toastr.success(mess+' thành công');
            },
            error: function(xhr, ajaxOptions, thrownError) {
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
                
                if(is_debug){
                    $.alert({
                        title: 'Error [' + xhr.status + '] ' + thrownError ,
                        content: xhr.responseText,
                    });
                }
            },
        });
        return self;
    }
                
    // ########## get Objects from REST API --> return array of objects ##############
    tGetAllObjApi(page=null,search_data=null){
        this.callAjax = null;
        var results = [];
        $.ajaxSetup({
            headers : {
                'CSRFToken' : getCSRFTokenValue(),
                'X-CSRFToken' : getCSRFTokenValue(), // for --> SessionAuthentication
            },
            tryCount : 0,
            retryLimit : 3,
        });
        var has_go_page=""
        if(page!=null){
            has_go_page="?page="+page;
        }
        this.callAjax =
        $.ajax({
            url: AllAdminMenuWorkspace_URL+has_go_page,
            type: "GET",
            //async: false,
            cache: false,
            timeout: 30000,

            success: function (data) {
                console.log('[tGetAllObjApi] data = ', data);
                // return new AllAdminMenuWorkspace(data);
                if (data.hasOwnProperty('count')){
                    AllAdminMenuWorkspacepagination["total"]=data.count;
                }
                if (data.hasOwnProperty('count')){
                    AllAdminMenuWorkspacepagination["total"]=data.count;
                }
                if (data.hasOwnProperty('next')){
                    if(data.next != null){
                    AllAdminMenuWorkspacepagination["has_next"]=true;
                    }else{
                    AllAdminMenuWorkspacepagination["has_next"]=false;

                    }
                }
                AllAdminMenuWorkspacepagination["current_page"]=page;
                if (data.hasOwnProperty('previous')){
                    if(data.previous != null){
                    AllAdminMenuWorkspacepagination["has_prev"]=true;
                    }else{
                    AllAdminMenuWorkspacepagination["has_prev"]=false;
                    }
                }
                if (data.hasOwnProperty('results')){
                    for (var j=0; j < data.results.length; j++){
                        var tmp = new AllAdminMenuWorkspace(data.results[j]);
                        results.push(tmp);
                    }
                    //if (data.hasOwnProperty('next') && data.next !== null){
                    //    this.url = data.next;
                    //    $.ajax(this);
                    //}
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
                
                if(is_debug){
                    $.alert({
                        title: 'Error [' + xhr.status + '] ' + thrownError ,
                        content: xhr.responseText,
                    });
                }
            },
        });
        return results;
    }
                
    // ########## get Objects from REST API --> return array of objects ##############
    tGetAllObjLargeApi(page=null,search_data=null){
        this.callAjax = null;
        var results = [];
        $.ajaxSetup({
            headers : {
                'CSRFToken' : getCSRFTokenValue(),
                'X-CSRFToken' : getCSRFTokenValue(), // for --> SessionAuthentication
            },
            tryCount : 0,
            retryLimit : 3,
        });
        var has_go_page=""
        if(page!=null){
            has_go_page="?page="+page;
        }
        this.callAjax =
        $.ajax({
            url: AllAdminMenuWorkspace_LARGE_URL+has_go_page,
            type: "GET",
            //async: false,
            cache: false,
            timeout: 30000,

            success: function (data) {
                console.log('[tGetAllObjLargeApi] data = ', data);
                // return new AllAdminMenuWorkspace(data);
                if (data.hasOwnProperty('count')){
                    AllAdminMenuWorkspacepagination["total"]=data.count;
                }
                if (data.hasOwnProperty('count')){
                    AllAdminMenuWorkspacepagination["total"]=data.count;
                }
                if (data.hasOwnProperty('next')){
                    if(data.next != null){
                    AllAdminMenuWorkspacepagination["has_next"]=true;
                    }else{
                    AllAdminMenuWorkspacepagination["has_next"]=false;

                    }
                }
                AllAdminMenuWorkspacepagination["current_page"]=page;
                if (data.hasOwnProperty('previous')){
                    if(data.previous != null){
                    AllAdminMenuWorkspacepagination["has_prev"]=true;
                    }else{
                    AllAdminMenuWorkspacepagination["has_prev"]=false;
                    }
                }
                if (data.hasOwnProperty('results')){
                    for (var j=0; j < data.results.length; j++){
                        var tmp = new AllAdminMenuWorkspace(data.results[j]);
                        results.push(tmp);
                    }
                    //if (data.hasOwnProperty('next') && data.next !== null){
                    //    this.url = data.next;
                    //    $.ajax(this);
                    //}
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
                
                if(is_debug){
                    $.alert({
                        title: 'Error [' + xhr.status + '] ' + thrownError ,
                        content: xhr.responseText,
                    });
                }
            },
        });
        return results;
    }
                
    // ########## search Objects from REST API --> return array of objects ##############
    tSearchAllObjApi(page=null,search_data=null,typeSearch){
        //hàm tìm kiếm với data_search hoặc dữ liệu từ vùng tìm kiếm & loại tìm kiếm
        var results = [];
        this.callAjax = null;
        $.ajaxSetup({
            headers : {
                'CSRFToken' : getCSRFTokenValue(),
                'X-CSRFToken' : getCSRFTokenValue(), // for --> SessionAuthentication
            },
            tryCount : 0,
            retryLimit : 3,
        });
        var has_go_page=""
        if(page!=null){
            has_go_page="?page="+page;
        }
        //getValue for searching
        var slugSearch="";
        var SEARCH_URL="";
        if(typeSearch=="filter"){
            SEARCH_URL=AllAdminMenuWorkspace_FILTER_URL;
            
                slugSearch="&";
            
                                if($("#nameAllAdminMenuWorkspaceFilterSearchInputId").length>0){
                                    var value=$("#nameAllAdminMenuWorkspaceFilterSearchInputId").val();
                                    if(value!="" && value!=null){
                                        slugSearch+="name__contains="+value+"&";
                                    }
                                }
                                
                            
                                if($("#titleAllAdminMenuWorkspaceFilterSearchInputId").length>0){
                                    var value=$("#titleAllAdminMenuWorkspaceFilterSearchInputId").val();
                                    if(value!="" && value!=null){
                                        slugSearch+="title__contains="+value+"&";
                                    }
                                }
                                
                            
                                if($("#in_main_menuAllAdminMenuWorkspaceFilterSearchInputId").length>0){
                                    var value=$("#in_main_menuAllAdminMenuWorkspaceFilterSearchInputId").val();
                                    if(value!="" && value!=null){
                                        slugSearch+="in_main_menu__contains="+value+"&";
                                    }
                                }
                                
                            
                            if($("#menu_groupAllAdminMenuWorkspaceFilterSearchInputId").length>0){
                                var value=$("#menu_groupAllAdminMenuWorkspaceFilterSearchInputId").val();
                                if(value!="" && value!=null){
                                    slugSearch+="menu_group="+value+"&";
                                }
                            }
                            
                        
                            if($("#parent_menuAllAdminMenuWorkspaceFilterSearchInputId").length>0){
                                var value=$("#parent_menuAllAdminMenuWorkspaceFilterSearchInputId").val();
                                if(value!="" && value!=null){
                                    slugSearch+="parent_menu="+value+"&";
                                }
                            }
                            
                        slugSearch=slugSearch.slice(0, -1);
        }else{
            SEARCH_URL=AllAdminMenuWorkspace_SEARCH_URL;
            
                slugSearch="&";
                slugSearch+="search="+$("#alladminmenuWorkspaceQuickSearchInputId").val();
            
        }
        if(search_data!=null){
            SEARCH_URL=AllAdminMenuWorkspace_FILTER_URL;
            slugSearch="&";
            slugSearch+=search_data;
        }
        search_log["search_data"] = slugSearch;
        this.callAjax =
        $.ajax({
            url: SEARCH_URL+has_go_page+slugSearch,
            type: "GET",
            //async: false,
            cache: false,
            timeout: 30000,

            success: function (data) {
                console.log('[tGetAllObjApi] data = ', data);
                // return new AllAdminMenuWorkspace(data);
                if (data.hasOwnProperty('count')){
                    AllAdminMenuWorkspacepagination["total"]=data.count;
                }
                if (data.hasOwnProperty('count')){
                    AllAdminMenuWorkspacepagination["total"]=data.count;
                }
                if (data.hasOwnProperty('next')){
                    if(data.next != null){
                    AllAdminMenuWorkspacepagination["has_next"]=true;
                    }else{
                    AllAdminMenuWorkspacepagination["has_next"]=false;

                    }
                }
                AllAdminMenuWorkspacepagination["current_page"]=page;
                if (data.hasOwnProperty('previous')){
                    if(data.previous != null){
                    AllAdminMenuWorkspacepagination["has_prev"]=true;
                    }else{
                    AllAdminMenuWorkspacepagination["has_prev"]=false;
                    }
                }
                if (data.hasOwnProperty('results')){
                    for (var j=0; j < data.results.length; j++){
                        var tmp = new AllAdminMenuWorkspace(data.results[j]);
                        results.push(tmp);
                    }
                    //if (data.hasOwnProperty('next') && data.next !== null){
                    //    this.url = data.next;
                    //    $.ajax(this);
                    //}
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
                
                    if(is_debug){
                        $.alert({
                            title: 'Error [' + xhr.status + '] ' + thrownError ,
                            content: xhr.responseText,
                        });
                    }
            },
        });
        return results;
    }
                
    // ########## search Objects from REST API --> return array of objects ##############
    tSearchLargeObjApi(page=null,search_data=null,typeSearch){
        //[trà về max 1000 bản ghi]hàm tìm kiếm với data_search hoặc dữ liệu từ vùng tìm kiếm & loại tìm kiếm
        var results = [];
        this.callAjax = null;
        $.ajaxSetup({
            headers : {
                'CSRFToken' : getCSRFTokenValue(),
                'X-CSRFToken' : getCSRFTokenValue(), // for --> SessionAuthentication
            },
            tryCount : 0,
            retryLimit : 3,
        });
        var has_go_page=""
        if(page!=null){
            has_go_page="?page="+page;
        }
        //getValue for searching
        var slugSearch="";
        var SEARCH_URL="";
        if(typeSearch=="filter"){
            SEARCH_URL=AllAdminMenuWorkspace_LARGE_FILTER_URL;
            
                slugSearch="&";
            
                                if($("#nameAllAdminMenuWorkspaceFilterSearchInputId").length>0){
                                    var value=$("#nameAllAdminMenuWorkspaceFilterSearchInputId").val();
                                    if(value!="" && value!=null){
                                        slugSearch+="name__contains="+value+"&";
                                    }
                                }
                                
                            
                                if($("#titleAllAdminMenuWorkspaceFilterSearchInputId").length>0){
                                    var value=$("#titleAllAdminMenuWorkspaceFilterSearchInputId").val();
                                    if(value!="" && value!=null){
                                        slugSearch+="title__contains="+value+"&";
                                    }
                                }
                                
                            
                                if($("#in_main_menuAllAdminMenuWorkspaceFilterSearchInputId").length>0){
                                    var value=$("#in_main_menuAllAdminMenuWorkspaceFilterSearchInputId").val();
                                    if(value!="" && value!=null){
                                        slugSearch+="in_main_menu__contains="+value+"&";
                                    }
                                }
                                
                            
                            if($("#menu_groupAllAdminMenuWorkspaceFilterSearchInputId").length>0){
                                var value=$("#menu_groupAllAdminMenuWorkspaceFilterSearchInputId").val();
                                if(value!="" && value!=null){
                                    slugSearch+="menu_group="+value+"&";
                                }
                            }
                            
                        
                            if($("#parent_menuAllAdminMenuWorkspaceFilterSearchInputId").length>0){
                                var value=$("#parent_menuAllAdminMenuWorkspaceFilterSearchInputId").val();
                                if(value!="" && value!=null){
                                    slugSearch+="parent_menu="+value+"&";
                                }
                            }
                            
                        slugSearch=slugSearch.slice(0, -1);
        }else{
            SEARCH_URL=AllAdminMenuWorkspace_SEARCH_URL;
            
                slugSearch="&";
                slugSearch+="search="+$("#alladminmenuWorkspaceQuickSearchInputId").val();
            
        }
        if(search_data!=null){
            SEARCH_URL=AllAdminMenuWorkspace_LARGE_FILTER_URL;
            slugSearch="&";
            slugSearch+=search_data;
        }
        this.callAjax =
        $.ajax({
            url: SEARCH_URL+has_go_page+slugSearch,
            type: "GET",
            //async: false,
            cache: false,
            timeout: 30000,

            success: function (data) {
                console.log('[tGetAllObjApi] data = ', data);
                // return new AllAdminMenuWorkspace(data);
                if (data.hasOwnProperty('count')){
                    AllAdminMenuWorkspacepagination["total"]=data.count;
                }
                if (data.hasOwnProperty('count')){
                    AllAdminMenuWorkspacepagination["total"]=data.count;
                }
                if (data.hasOwnProperty('next')){
                    if(data.next != null){
                    AllAdminMenuWorkspacepagination["has_next"]=true;
                    }else{
                    AllAdminMenuWorkspacepagination["has_next"]=false;

                    }
                }
                AllAdminMenuWorkspacepagination["current_page"]=page;
                if (data.hasOwnProperty('previous')){
                    if(data.previous != null){
                    AllAdminMenuWorkspacepagination["has_prev"]=true;
                    }else{
                    AllAdminMenuWorkspacepagination["has_prev"]=false;
                    }
                }
                if (data.hasOwnProperty('results')){
                    for (var j=0; j < data.results.length; j++){
                        var tmp = new AllAdminMenuWorkspace(data.results[j]);
                        results.push(tmp);
                    }
                    //if (data.hasOwnProperty('next') && data.next !== null){
                    //    this.url = data.next;
                    //    $.ajax(this);
                    //}
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
                
                    if(is_debug){
                        $.alert({
                            title: 'Error [' + xhr.status + '] ' + thrownError ,
                            content: xhr.responseText,
                        });
                    }
            },
        });
        return results;
    }
                
    // ########## GET ONLY ONE OBJ FROM REST API (RETURN 01 OBJECTS) ##############
    tGetObjApi(uuid){
        this.callAjax = null;
        
        $.ajaxSetup({
            headers : {
                'CSRFToken' : getCSRFTokenValue(),
                'X-CSRFToken' : getCSRFTokenValue(), // for --> SessionAuthentication
            },
            tryCount : 0,
            retryLimit : 3,
        });
        this.callAjax =
        $.ajax({
            url: AllAdminMenuWorkspace_URL + uuid + "/",
            type: "GET",
            async: false,
            cache: false,
            timeout: 30000,

            success: function (data) {
                console.log('[tGetObjApi] data = ', data);
                var n_obj = new AllAdminMenuWorkspace(data);
                console.log('n_obj = ', n_obj);
                n_obj.tFillForm();
                return n_obj;
                // if (data.hasOwnProperty('results')){
                //    if (data.results.length > 0){
                //        var tmp = new AllAdminMenuWorkspace(data[i]);
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
                
                if(is_debug){
                    $.alert({
                        title: 'Error [' + xhr.status + '] ' + thrownError ,
                        content: xhr.responseText,
                    });
                }
                return null;
            },
        });
        return null;
    }

    // Fill Table type 1: General Table
    // @tnd: Not yet fix the "fit for any table" issue
    tFillTable1(){
        var tbId = "alladminmenuWorkspaceDataTableId";
        var table = $("#" + tbId);
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
    tFillTable2(){
        var tbId = "alladminmenuWorkspaceDataTableId";
        var table = $("#" + tbId);
        if (table.length > 0){
            var tableData = table.DataTable();
            var rowData = [
                `<a href="` + this.detailUrl + `">` + ALLADMINMENU_ID_TABLE_COUNT + `</a>`,
                // `<a href="` + this.detailUrl + `">` + this.name + `</a>`,
                // `<a href="` + this.detailUrl + `">` + this.uuid + `</a>`,
                // `<a href="` + this.detailUrl + `">` + this.code + `</a>`,
                // `<a href="` + this.detailUrl + `">` + this.desc + `</a>`,
                // `<a href="` + this.detailUrl + `">` + this.image + `</a>`,
                // `<a href="` + this.detailUrl + `">` + this.name + `</a>`,
                // `<a href="` + this.detailUrl + `">` + this.name + `</a>`,
                // `<a href="` + this.detailUrl + `">` + this.name + `</a>`,
                // `<a href="` + this.detailUrl + `">` + this.updated_at + `</a>`,
                // `<a href="` + this.detailUrl + `">` + this.created_at + `</a>`,
            ];
            // Get All Attribute of thead
            var tableHeaders = table.find('thead th');
            for (var thId = 1; thId < tableHeaders.length; thId++){
                var hEle = tableHeaders[thId];
                var attr = hEle.getAttribute('attr-name');
                if (this.hasOwnProperty(attr)){
                    rowData.push(`<a href="` + this.detailUrl + `">` + this[attr] + `</a>`);
                }
                else{
                    rowData.push(`<a href=""></a>`);
                }
            }
            tableData.row.add(rowData).draw();
            return true;
        }
        else{
            console.log('Not found dataTable Id: ,', tbId);
            return false;
        }
    }
    tFillTable3(tableId=null,order=null){
        var tbId = "alladminmenuWorkspaceDataTableId";
        if(tableId!=null){
            tbId = tableId;
        }

        if(order==null){
        order=ALLADMINMENU_ID_TABLE_COUNT;
        }
        var table = $("#" + tbId);
        if (table.length > 0){
            var html = "<tr>"
               html+= `<td><a>` + order + `</a></td>`;
            // Get All Attribute of thead
            var tableHeaders = table.find('thead th');
            var tableBody = table.find('tbody');
            //tableBody.html('');
            for (var thId = 1; thId < tableHeaders.length; thId++){
                var hEle = tableHeaders[thId];
                var attr = hEle.getAttribute('attr-name');
                if (this.hasOwnProperty(attr)){
                    
                            if(attr=="icon"){
                                var filename="";
                                var link="";
                                if(this[attr]==undefined||this[attr]==""||this[attr]==null)
                                {
                                    filename="Không có tệp đính kèm";
                                    link="#";
                                }
                                else{
                                    var decode_url = decodeURIComponent(this[attr]);
                                    filename = decode_url.split('/')[decode_url.split('/').length-1]
                                   // filename = this[attr].split('/')[this[attr].split('/').length - 1];
                                    link=this[attr];
                                }
                                
                                html += `
                                <td class="text-wrap">
                                    <div class="form-group row col-xl-8 table-hover mt-1" style="background-color:gainsboro;height: 25px;" id="` + this["uuid"] + `AttachmentDivId">
                                        <div class="col-xl-10 view-attachment-class text-break text-truncate" >
                                            <span><a style="color:cornflowerblue" target="_blank" title="` + filename + `" href="` + link + `"><p><b>` + filename + `</b></p></a></span>
                                        </div>
                                        <div class="col-xl-2 text-end">
                                            <i class="fas fa-times" style="color:gray" file-uuid="` + this["uuid"] + `" id="` + this["uuid"] + `btnDeleteId" onclick="iconalladminmenuWorkspaceDeletedAttacthment(this)"></i>
                                        </div>
                                    </div>
                                </td>
                                `;
                                continue;
                            }
                        
                        if(attr=="in_main_menu"){
                            var value="";
                            if(this[attr] || this[attr]=="true"){
                                value="checked";
                            }
                            html +=`<td class="text-center">
                                    <div class="custom-control custom-switch">
                                        <input class="custom-control-input" id="${this["uuid"]}in_main_menualladminmenuWorkspaceSwitchListTablebtnId" name="`+ attr +`" data-uuid="` + this["uuid"] + `" type="checkbox"  `+value+` onclick="in_main_menualladminmenuWorkspaceEventChangeSwitcher(this)">
                                    <label class="custom-control-label" for="${this["uuid"]}in_main_menualladminmenuWorkspaceSwitchListTablebtnId"></label>
                                    </div></td>`;
                                continue;
                            }
                        
                        if(attr=="menu_group"){
                            
                            var name=this[attr]["name"];
                            if (name == undefined){
                                name = "-"
                            }

                            html +=`<td class="text-wrap"><a>` + name + `</a></td>`;
                            
                            continue;
                        }
                        
                        if(attr=="parent_menu"){
                            
                            var name=this[attr]["name"];
                            if (name == undefined){
                                name = "-"
                            }

                            html +=`<td class="text-wrap"><a>` + name + `</a></td>`;
                            
                            continue;
                        }
                        
                        if(attr=="login_redirect"){
                            var value="";
                            if(this[attr] || this[attr]=="true"){
                                value="checked";
                            }
                            html +=`<td class="text-center">
                                    <div class="custom-control custom-switch">
                                        <input class="custom-control-input" id="${this["uuid"]}login_redirectalladminmenuWorkspaceSwitchListTablebtnId" name="`+ attr +`" data-uuid="` + this["uuid"] + `" type="checkbox"  `+value+` onclick="login_redirectalladminmenuWorkspaceEventChangeSwitcher(this)">
                                    <label class="custom-control-label" for="${this["uuid"]}login_redirectalladminmenuWorkspaceSwitchListTablebtnId"></label>
                                    </div></td>`;
                                continue;
                            }
                        
                        if(attr=="active"){
                            var value="";
                            if(this[attr] || this[attr]=="true"){
                                value="checked";
                            }
                            html +=`<td class="text-center">
                                    <div class="custom-control custom-switch">
                                        <input class="custom-control-input" id="${this["uuid"]}activealladminmenuWorkspaceSwitchListTablebtnId" name="`+ attr +`" data-uuid="` + this["uuid"] + `" type="checkbox"  `+value+` onclick="activealladminmenuWorkspaceEventChangeSwitcher(this)">
                                    <label class="custom-control-label" for="${this["uuid"]}activealladminmenuWorkspaceSwitchListTablebtnId"></label>
                                    </div></td>`;
                                continue;
                            }
                        
                        if(attr=="staff_only"){
                            var value="";
                            if(this[attr] || this[attr]=="true"){
                                value="checked";
                            }
                            html +=`<td class="text-center">
                                    <div class="custom-control custom-switch">
                                        <input class="custom-control-input" id="${this["uuid"]}staff_onlyalladminmenuWorkspaceSwitchListTablebtnId" name="`+ attr +`" data-uuid="` + this["uuid"] + `" type="checkbox"  `+value+` onclick="staff_onlyalladminmenuWorkspaceEventChangeSwitcher(this)">
                                    <label class="custom-control-label" for="${this["uuid"]}staff_onlyalladminmenuWorkspaceSwitchListTablebtnId"></label>
                                    </div></td>`;
                                continue;
                            }
                        
                        if(attr=="superuser_only"){
                            var value="";
                            if(this[attr] || this[attr]=="true"){
                                value="checked";
                            }
                            html +=`<td class="text-center">
                                    <div class="custom-control custom-switch">
                                        <input class="custom-control-input" id="${this["uuid"]}superuser_onlyalladminmenuWorkspaceSwitchListTablebtnId" name="`+ attr +`" data-uuid="` + this["uuid"] + `" type="checkbox"  `+value+` onclick="superuser_onlyalladminmenuWorkspaceEventChangeSwitcher(this)">
                                    <label class="custom-control-label" for="${this["uuid"]}superuser_onlyalladminmenuWorkspaceSwitchListTablebtnId"></label>
                                    </div></td>`;
                                continue;
                            }
                        
                        if(attr=="split_marked"){
                            var value="";
                            if(this[attr] || this[attr]=="true"){
                                value="checked";
                            }
                            html +=`<td class="text-center">
                                    <div class="custom-control custom-switch">
                                        <input class="custom-control-input" id="${this["uuid"]}split_markedalladminmenuWorkspaceSwitchListTablebtnId" name="`+ attr +`" data-uuid="` + this["uuid"] + `" type="checkbox"  `+value+` onclick="split_markedalladminmenuWorkspaceEventChangeSwitcher(this)">
                                    <label class="custom-control-label" for="${this["uuid"]}split_markedalladminmenuWorkspaceSwitchListTablebtnId"></label>
                                    </div></td>`;
                                continue;
                            }
                        
                        if(attr=="updated_at"){
                            html +=`<td class="text-wrap"><a>` + GetDateOnly_V01(this[attr]) + `</a></td>`;
                                continue;
                            }
                        
                        if(attr=="created_at"){
                            html +=`<td class="text-wrap"><a>` + GetDateOnly_V01(this[attr]) + `</a></td>`;
                                continue;
                            }
                        
                    if(attr=="name"){
                        html +=`<td class="text-wrap" style="min-width:300px" onclick="AllAdminMenuWorkspaceDetails('`+this["uuid"]+`')"><a>` + (this[attr]) + `</a></td>`;
                            continue;
                    }
                    //html +=`<td class="text-wrap"><a>` + (this[attr]) + `</a></td>`;
                    html +=`<td class="text-wrap"><a>` + (this[attr]) + `</a></td>`;
                }
                
                else{
                    if(attr=="alladminmenu-admin-action")
                    {
                        html +=BindActionButtonVer4(
                            AllAdminMenuWorkspace_arr_action,
                            this['uuid'],
                            this,
                            null,
                            this['created_by'],
                        );
                    }else
                    {
                        
                        if(attr=="in_main_menu"){
                            var value="";
                            if(this[attr] || this[attr]=="true"){
                                value="checked";
                            }
                            html +=`<td class="text-center">
                                    <div class="custom-control custom-switch">
                                        <input class="custom-control-input" id="${this["uuid"]}in_main_menualladminmenuWorkspaceSwitchListTablebtnId" name="`+ attr +`" data-uuid="` + this["uuid"] + `" type="checkbox"  `+value+` onclick="in_main_menualladminmenuWorkspaceEventChangeSwitcher(this)">
                                    <label class="custom-control-label" for="${this["uuid"]}in_main_menualladminmenuWorkspaceSwitchListTablebtnId"></label>
                                    </div></td>`;
                                continue;
                            }
                        
                        if(attr=="login_redirect"){
                            var value="";
                            if(this[attr] || this[attr]=="true"){
                                value="checked";
                            }
                            html +=`<td class="text-center">
                                    <div class="custom-control custom-switch">
                                        <input class="custom-control-input" id="${this["uuid"]}login_redirectalladminmenuWorkspaceSwitchListTablebtnId" name="`+ attr +`" data-uuid="` + this["uuid"] + `" type="checkbox"  `+value+` onclick="login_redirectalladminmenuWorkspaceEventChangeSwitcher(this)">
                                    <label class="custom-control-label" for="${this["uuid"]}login_redirectalladminmenuWorkspaceSwitchListTablebtnId"></label>
                                    </div></td>`;
                                continue;
                            }
                        
                        if(attr=="active"){
                            var value="";
                            if(this[attr] || this[attr]=="true"){
                                value="checked";
                            }
                            html +=`<td class="text-center">
                                    <div class="custom-control custom-switch">
                                        <input class="custom-control-input" id="${this["uuid"]}activealladminmenuWorkspaceSwitchListTablebtnId" name="`+ attr +`" data-uuid="` + this["uuid"] + `" type="checkbox"  `+value+` onclick="activealladminmenuWorkspaceEventChangeSwitcher(this)">
                                    <label class="custom-control-label" for="${this["uuid"]}activealladminmenuWorkspaceSwitchListTablebtnId"></label>
                                    </div></td>`;
                                continue;
                            }
                        
                        if(attr=="staff_only"){
                            var value="";
                            if(this[attr] || this[attr]=="true"){
                                value="checked";
                            }
                            html +=`<td class="text-center">
                                    <div class="custom-control custom-switch">
                                        <input class="custom-control-input" id="${this["uuid"]}staff_onlyalladminmenuWorkspaceSwitchListTablebtnId" name="`+ attr +`" data-uuid="` + this["uuid"] + `" type="checkbox"  `+value+` onclick="staff_onlyalladminmenuWorkspaceEventChangeSwitcher(this)">
                                    <label class="custom-control-label" for="${this["uuid"]}staff_onlyalladminmenuWorkspaceSwitchListTablebtnId"></label>
                                    </div></td>`;
                                continue;
                            }
                        
                        if(attr=="superuser_only"){
                            var value="";
                            if(this[attr] || this[attr]=="true"){
                                value="checked";
                            }
                            html +=`<td class="text-center">
                                    <div class="custom-control custom-switch">
                                        <input class="custom-control-input" id="${this["uuid"]}superuser_onlyalladminmenuWorkspaceSwitchListTablebtnId" name="`+ attr +`" data-uuid="` + this["uuid"] + `" type="checkbox"  `+value+` onclick="superuser_onlyalladminmenuWorkspaceEventChangeSwitcher(this)">
                                    <label class="custom-control-label" for="${this["uuid"]}superuser_onlyalladminmenuWorkspaceSwitchListTablebtnId"></label>
                                    </div></td>`;
                                continue;
                            }
                        
                        if(attr=="split_marked"){
                            var value="";
                            if(this[attr] || this[attr]=="true"){
                                value="checked";
                            }
                            html +=`<td class="text-center">
                                    <div class="custom-control custom-switch">
                                        <input class="custom-control-input" id="${this["uuid"]}split_markedalladminmenuWorkspaceSwitchListTablebtnId" name="`+ attr +`" data-uuid="` + this["uuid"] + `" type="checkbox"  `+value+` onclick="split_markedalladminmenuWorkspaceEventChangeSwitcher(this)">
                                    <label class="custom-control-label" for="${this["uuid"]}split_markedalladminmenuWorkspaceSwitchListTablebtnId"></label>
                                    </div></td>`;
                                continue;
                            }
                        
                    html +=`<td><a href=""></a></td>`;
                    }
                }
            }
                    
                html+='</tr>';

            tableBody.append(html);
            return true;
        }
        else{
            console.log('Not found dataTable Id: ,', tbId);
            return false;
        }
    }
    // Fill List type 1:
    tFillList1(){
    }

    // Fill List type 2:
    tFillList2(){
    }
    
            //fill table for inline table
    tFillTable4(tableId=null,order=null,action=null){
        var tbId = "alladminmenuWorkspaceDataTableId";
        if(tableId!=null){
            tbId = tableId;
        }

        if(order==null){
        order=ALLADMINMENU_ID_TABLE_COUNT;
        }
        var table = $("#" + tbId);
        if (table.length > 0){
            var html = "<tr is-new='false' status='added'>"
               html+= `<td><a href="` + this.detailUrl + `">` + order + `</a></td>`;
            // Get All Attribute of thead
            var tableHeaders = table.find('thead th');
            var tableBody = table.find('tbody');
            //tableBody.html('');
            for (var thId = 1; thId < tableHeaders.length; thId++){
                var hEle = tableHeaders[thId];
                var attr = hEle.getAttribute('attr-name');
                if (this.hasOwnProperty(attr)){
                    
                            if(attr=="icon"){
                                
                                var filename="";
                                var link="";
                                if(this[attr]==undefined||this[attr]==""||this[attr]==null)
                                {
                                    filename="Không có tệp đính kèm";
                                    link="#";
                                }
                                else{
                                    var decode_url = decodeURIComponent(this[attr]);
                                    filename = decode_url.split('/')[decode_url.split('/').length-1]
                                    link=this[attr];
                                }
                                
                                html += `
                                <td class="text-wrap">
                                    <div class="form-group row col-xl-8 table-hover mt-1" style="background-color:gainsboro;height: 25px;" id="` + this["uuid"] + `AttachmentDivId">
                                        <div class="col-xl-10 view-attachment-class text-break text-truncate" >
                                            <span><a style="color:cornflowerblue" target="_blank" title="` + filename + `" href="` + link + `"><p><b>` + filename + `</b></p></a></span>
                                        </div>
                                        <div class="col-xl-2 text-end d-none">
                                        </div>
                                    </div>
                                </td>
                                `;
                                continue;
                            }
                        
                        if(attr=="in_main_menu"){
                            var value="";
                            if(this[attr] || this[attr]=="true"){
                                value="checked";
                            }
                            html +=`<td>
                                    <div class="custom-control custom-switch">
                                        <input class="custom-control-input" type="checkbox"  `+value+` disabled>
                                    <label class="custom-control-label"></label>
                                    </div></td>`;
                                continue;
                            }
                        
                        if(attr=="menu_group"){
                            
                            var name=this[attr]["name"];
                            if (name == undefined){
                                    name = "-"
                                }
                            html +=`<td class="text-wrap"><a>` + name + `</a></td>`;
                            
                            continue;
                        }
                        
                        if(attr=="parent_menu"){
                            
                            var name=this[attr]["name"];
                            if (name == undefined){
                                    name = "-"
                                }
                            html +=`<td class="text-wrap"><a>` + name + `</a></td>`;
                            
                            continue;
                        }
                        
                        if(attr=="login_redirect"){
                            var value="";
                            if(this[attr] || this[attr]=="true"){
                                value="checked";
                            }
                            html +=`<td>
                                    <div class="custom-control custom-switch">
                                        <input class="custom-control-input" type="checkbox"  `+value+` disabled>
                                    <label class="custom-control-label"></label>
                                    </div></td>`;
                                continue;
                            }
                        
                        if(attr=="active"){
                            var value="";
                            if(this[attr] || this[attr]=="true"){
                                value="checked";
                            }
                            html +=`<td>
                                    <div class="custom-control custom-switch">
                                        <input class="custom-control-input" type="checkbox"  `+value+` disabled>
                                    <label class="custom-control-label"></label>
                                    </div></td>`;
                                continue;
                            }
                        
                        if(attr=="staff_only"){
                            var value="";
                            if(this[attr] || this[attr]=="true"){
                                value="checked";
                            }
                            html +=`<td>
                                    <div class="custom-control custom-switch">
                                        <input class="custom-control-input" type="checkbox"  `+value+` disabled>
                                    <label class="custom-control-label"></label>
                                    </div></td>`;
                                continue;
                            }
                        
                        if(attr=="superuser_only"){
                            var value="";
                            if(this[attr] || this[attr]=="true"){
                                value="checked";
                            }
                            html +=`<td>
                                    <div class="custom-control custom-switch">
                                        <input class="custom-control-input" type="checkbox"  `+value+` disabled>
                                    <label class="custom-control-label"></label>
                                    </div></td>`;
                                continue;
                            }
                        
                        if(attr=="split_marked"){
                            var value="";
                            if(this[attr] || this[attr]=="true"){
                                value="checked";
                            }
                            html +=`<td>
                                    <div class="custom-control custom-switch">
                                        <input class="custom-control-input" type="checkbox"  `+value+` disabled>
                                    <label class="custom-control-label"></label>
                                    </div></td>`;
                                continue;
                            }
                        
                        if(attr=="updated_at"){
                            html +=`<td class="text-wrap"><a>` + GetDateOnly_V01(this[attr]) + `</a></td>`;
                                continue;
                            }
                        
                        if(attr=="created_at"){
                            html +=`<td class="text-wrap"><a>` + GetDateOnly_V01(this[attr]) + `</a></td>`;
                                continue;
                            }
                        
                    html +=`<td class="text-wrap"><a>` + (this[attr]) + `</a></td>`;
                }
                else{
                    if(attr=="alladminmenu-admin-action")
                    {
                        html +=`<td class="text-center d-none">
                        <a  onclick="AllAdminMenu`+action+`DeteleRowAddingTable(this)"> &nbsp;
                            <i title="Xóa" class="fas fa-trash" onclick="AllAdminMenu`+action+`DeteleRowAddingTable(this)"></i>&nbsp;
                                            Xóa 
                        </a></td>
                        `;
                        
                    }else
                    {
                    
                        if(attr=="in_main_menu"){
                            var value="";
                            if(this[attr] || this[attr]=="true"){
                                value="checked";
                            }
                            html +=`<td>
                                    <div class="custom-control custom-switch">
                                        <input class="custom-control-input" type="checkbox"  `+value+` disabled>
                                    <label class="custom-control-label"></label>
                                    </div></td>`;
                                continue;
                            }
                        
                        if(attr=="login_redirect"){
                            var value="";
                            if(this[attr] || this[attr]=="true"){
                                value="checked";
                            }
                            html +=`<td>
                                    <div class="custom-control custom-switch">
                                        <input class="custom-control-input" type="checkbox"  `+value+` disabled>
                                    <label class="custom-control-label"></label>
                                    </div></td>`;
                                continue;
                            }
                        
                        if(attr=="active"){
                            var value="";
                            if(this[attr] || this[attr]=="true"){
                                value="checked";
                            }
                            html +=`<td>
                                    <div class="custom-control custom-switch">
                                        <input class="custom-control-input" type="checkbox"  `+value+` disabled>
                                    <label class="custom-control-label"></label>
                                    </div></td>`;
                                continue;
                            }
                        
                        if(attr=="staff_only"){
                            var value="";
                            if(this[attr] || this[attr]=="true"){
                                value="checked";
                            }
                            html +=`<td>
                                    <div class="custom-control custom-switch">
                                        <input class="custom-control-input" type="checkbox"  `+value+` disabled>
                                    <label class="custom-control-label"></label>
                                    </div></td>`;
                                continue;
                            }
                        
                        if(attr=="superuser_only"){
                            var value="";
                            if(this[attr] || this[attr]=="true"){
                                value="checked";
                            }
                            html +=`<td>
                                    <div class="custom-control custom-switch">
                                        <input class="custom-control-input" type="checkbox"  `+value+` disabled>
                                    <label class="custom-control-label"></label>
                                    </div></td>`;
                                continue;
                            }
                        
                        if(attr=="split_marked"){
                            var value="";
                            if(this[attr] || this[attr]=="true"){
                                value="checked";
                            }
                            html +=`<td>
                                    <div class="custom-control custom-switch">
                                        <input class="custom-control-input" type="checkbox"  `+value+` disabled>
                                    <label class="custom-control-label"></label>
                                    </div></td>`;
                                continue;
                            }
                        
                    html +=`<td><a href=""></a></td>`;
                    }
                }
            }
                    
                html+='</tr>';

            tableBody.append(html);
            return true;
        }
        else{
            console.log('Not found dataTable Id: ,', tbId);
            return false;
        }
    }
            
                
    
    tFillCard(cardId=null,order=null){
        var card_Id = "alladminmenuWorkspaceCardAreaId";
        if(cardId!=null){
            card_Id = cardId;
        }

        if(order==null){
        order=ALLADMINMENU_ID_TABLE_COUNT;
        }
        var card_area = $("#" + card_Id);
        if (card_area.length > 0){
            var card_template = card_area.find(".alladminmenuWorkspaceTemplateCardClass");
            if(card_template.length > 0){
                var new_card = card_template.clone(true);
                //var html = "<tr>"
                //html+= `<td><a>` + order + `</a></td>`;
                // Get All Attribute of thead
                var cardContent = new_card.find('[tnv_card_content]');
                var tableBody = new_card.find('.card-body');
                //tableBody.html('');
                for (var thId = 0; thId < cardContent.length; thId++){
                    var hEle = cardContent[thId];
                    var attr = hEle.getAttribute('attr-name');
                    if (this.hasOwnProperty(attr)){

                        
                            if(attr=="icon"){
                                var filename="";
                                var link="";
                                if(this[attr]==undefined||this[attr]==""||this[attr]==null)
                                {
                                    filename="Không có tệp đính kèm";
                                    link="#";
                                }
                                else{
                                    var decode_url = decodeURIComponent(this[attr]);
                                    filename = decode_url.split('/')[decode_url.split('/').length-1]
                                   // filename = this[attr].split('/')[this[attr].split('/').length - 1];
                                    link=this[attr];
                                }
                                
                                $(hEle).html( `
                                    <div class="form-group row col-xl-8 table-hover mt-1" style="background-color:gainsboro;height: 25px;" id="` + this["uuid"] + `AttachmentDivId">
                                        <div class="col-xl-10 view-attachment-class text-break text-truncate" >
                                            <span><a style="color:cornflowerblue" target="_blank" title="` + filename + `" href="` + link + `"><p><b>` + filename + `</b></p></a></span>
                                        </div>
                                        <div class="col-xl-2 text-end">
                                            <i class="fas fa-times" style="color:gray" file-uuid="` + this["uuid"] + `" id="` + this["uuid"] + `btnDeleteId" onclick="iconalladminmenuWorkspaceDeletedAttacthment(this)"></i>
                                        </div>
                                    </div>
                                `);
                                continue;
                            }
                        
                        if(attr=="in_main_menu"){
                            var value="";
                            if(this[attr] || this[attr]=="true"){
                                value="checked";
                            }
                            $(hEle).html(`
                                    <div class="custom-control custom-switch">
                                        <input class="custom-control-input" type="checkbox"  `+value+` disabled>
                                    <label class="custom-control-label"></label>
                                    </div>`)
                            continue;
                            }
                        
                        if(attr=="menu_group"){
                            
                            var name=this[attr]["name"];
                            if (name == undefined){
                                name = "-"
                            }
                            $(hEle).html(name);
                            continue;
                        }
                        
                        if(attr=="parent_menu"){
                            
                            var name=this[attr]["name"];
                            if (name == undefined){
                                name = "-"
                            }
                            $(hEle).html(name);
                            continue;
                        }
                        
                        if(attr=="login_redirect"){
                            var value="";
                            if(this[attr] || this[attr]=="true"){
                                value="checked";
                            }
                            $(hEle).html(`
                                    <div class="custom-control custom-switch">
                                        <input class="custom-control-input" type="checkbox"  `+value+` disabled>
                                    <label class="custom-control-label"></label>
                                    </div>`)
                            continue;
                            }
                        
                        if(attr=="active"){
                            var value="";
                            if(this[attr] || this[attr]=="true"){
                                value="checked";
                            }
                            $(hEle).html(`
                                    <div class="custom-control custom-switch">
                                        <input class="custom-control-input" type="checkbox"  `+value+` disabled>
                                    <label class="custom-control-label"></label>
                                    </div>`)
                            continue;
                            }
                        
                        if(attr=="staff_only"){
                            var value="";
                            if(this[attr] || this[attr]=="true"){
                                value="checked";
                            }
                            $(hEle).html(`
                                    <div class="custom-control custom-switch">
                                        <input class="custom-control-input" type="checkbox"  `+value+` disabled>
                                    <label class="custom-control-label"></label>
                                    </div>`)
                            continue;
                            }
                        
                        if(attr=="superuser_only"){
                            var value="";
                            if(this[attr] || this[attr]=="true"){
                                value="checked";
                            }
                            $(hEle).html(`
                                    <div class="custom-control custom-switch">
                                        <input class="custom-control-input" type="checkbox"  `+value+` disabled>
                                    <label class="custom-control-label"></label>
                                    </div>`)
                            continue;
                            }
                        
                        if(attr=="split_marked"){
                            var value="";
                            if(this[attr] || this[attr]=="true"){
                                value="checked";
                            }
                            $(hEle).html(`
                                    <div class="custom-control custom-switch">
                                        <input class="custom-control-input" type="checkbox"  `+value+` disabled>
                                    <label class="custom-control-label"></label>
                                    </div>`)
                            continue;
                            }
                        
                        if(attr=="updated_at"){
                            $(hEle).html(GetDateOnly_V01(this[attr]))
                            continue;
                            }
                        
                        if(attr=="created_at"){
                            $(hEle).html(GetDateOnly_V01(this[attr]))
                            continue;
                            }
                        
                        if(attr=="name"){
                            $(hEle).html(`<a onclick="AllAdminMenuWorkspaceDetails('`+this["uuid"]+`')">` + (this[attr]) + `</a>`);
                            continue;
                        }
                        $(hEle).html(`<a>` + (this[attr]) + `</a>`);

                    }
                }
                var action_button = BindActionButtonVer5(
                                AllAdminMenuWorkspace_arr_action,
                                this['uuid'],
                                this,
                                null,
                                this['created_by'],
                            );
                new_card.append(action_button);
                new_card.removeClass("d-none");
                return true;
            }
            else{
                console.log('Not found dataTable Id: ,', card_Id);
                return false;
            }
            }
            
    }
    }
            
            
class AllAdminMenuWorkspace_ListItem {
    constructor(data){
        if (data != null){
            this.id = data.id;
            this.uuid = data.uuid;
            this.name = data.name;
        }
        else{
            this.uuid = null;
            this.id = null;
            this.name = null;
        }
    }
}
            

var AllAdminMenuWorkspaceList_CACHE = [];
// ########## Get List Class ##############
class AllAdminMenuWorkspaceList {
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
            url: AllAdminMenuWorkspace_LIST_URL,
            type: "GET",
            async: false,
            cache: false,
            timeout: 30000,

            success: function (data) {
                AllAdminMenuWorkspaceList_CACHE = []
                console.log(data);
                if (data.hasOwnProperty('results')){
                    for (var i = 0; i < data.results.length; i++){
                        var x = new AllAdminMenuWorkspace_ListItem(data.results[i]);
                        AllAdminMenuWorkspaceList_CACHE.push(x);
                    }
                }else{
                    for (var i = 0; i < data.length; i++){
                        var x = new AllAdminMenuWorkspace_ListItem(data[i]);
                        AllAdminMenuWorkspaceList_CACHE.push(x);
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
                
                if(is_debug){
                    $.alert({
                        title: 'Error [' + xhr.status + '] ' + thrownError ,
                        content: xhr.responseText,
                    });
                }
                return null;
            },
        });
        return AllAdminMenuWorkspaceList_CACHE;
    }

}

    
$(document).ready( function () {
   const alladminmenuWorkspacedatatablesSimple = document.getElementById('alladminmenuWorkspaceDataTableId');
    if (alladminmenuWorkspacedatatablesSimple) {
        new simpleDatatables.DataTable(alladminmenuWorkspacedatatablesSimple);
    }

});

$(document).ready(function(){
    $(".dt-button").addClass('btn btn-success');
});


// ########## tTest function ##############
function tTestAllAdminMenuWorkspace(type_action=null){
    var b_json = genAllAdminMenuWorkspace();
    console.log("b_json = ", b_json);
    // var d_obj = new AllAdminMenuWorkspace(b_json);
    var d_obj = new AllAdminMenuWorkspace(b_json);
    // console.log('d_obj.tCreatePostApi()...', d_obj.tCreatePostApi());
    // console.log('d_obj.tCreateNewPostFormApi()...', d_obj.tCreateNewPostFormApi());
    // console.log('d_obj.tUpdatePostApi()...', d_obj.tUpdatePostApi());
    // var d_obj = new AllAdminMenuWorkspaceList();
    // console.log('d_obj.getListApi()...', d_obj.getListApi());
    console.log("d_obj = ", d_obj);
    if(type_action=='Edit'){

        d_obj.uuid=cr_uuid;
    }
    d_obj.tFillForm();
    console.log("Fill form done...");
}

// ########## tTest function ##############
function tTestInModalAllAdminMenuWorkspace(type_action){
    var form_type = type_action+"Modal";
    var b_json = genAllAdminMenuWorkspace(form_type);
    console.log("b_json = ", b_json);
    // var d_obj = new AllAdminMenuWorkspace(b_json);
    var d_obj = new AllAdminMenuWorkspace(b_json);
    // console.log('d_obj.tCreatePostApi()...', d_obj.tCreatePostApi());
    // console.log('d_obj.tCreateNewPostFormApi()...', d_obj.tCreateNewPostFormApi());
    // console.log('d_obj.tUpdatePostApi()...', d_obj.tUpdatePostApi());
    // var d_obj = new AllAdminMenuWorkspaceList();
    // console.log('d_obj.getListApi()...', d_obj.getListApi());
    console.log("d_obj = ", d_obj);
    if(type_action=='Edit'){

        d_obj.uuid=null;
    }
    d_obj.tFillTestDataFormModal(type_action);
    console.log("Fill form done...");
}
$(document).ready(function(){

});

    

// ########## [Edit Button] Clicked Handle function ##############

$(document).ready(function(){
    $("#alladminmenuWorkspaceEditBtnId").click(function(){

    })
});

    

// ########## [Search Button] Clicked Handle function ##############

$(document).ready(function(){
    $("#alladminmenuWorkspaceQuickSearchInputId").on('keyup', function(e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            AllAdminMenuWorkspacepagination={
                current_page:1,
                total:0,
                has_next:false,
                has_prev:false
            }
            AllAdminMenuWorkspaceSearchData(AllAdminMenuWorkspacepagination["current_page"],"quick");
        }
    })
    $("#alladminmenuWorkspaceQuickSearchBtnId").click(function(){
        AllAdminMenuWorkspacepagination={
            current_page:1,
            total:0,
            has_next:false,
            has_prev:false
        }
        AllAdminMenuWorkspaceSearchData(AllAdminMenuWorkspacepagination["current_page"],"quick");
    })
    $("#alladminmenuWorkspaceSearchBtnId").click(function(){
        AllAdminMenuWorkspacepagination={
            current_page:1,
            total:0,
            has_next:false,
            has_prev:false
    }
        AllAdminMenuWorkspaceSearchData(AllAdminMenuWorkspacepagination["current_page"],"filter");
    })
});

    

// ########## [Search Button] Clicked Handle function ##############
$(document).ready(function(){

    $("#alladminmenuWorkspaceExportExcelBtnId").click(function(){
        var is_export = true;
        if(search_log["search_func"] == "AllAdminMenuWorkspaceGetDataTable"){
                AllAdminMenuWorkspaceGetLargeDataTable(1,search_log["search_data"],is_export,AllAdminMenuWorkspaceExportExcel);
        }
        else if(search_log["search_func"] == "AllAdminMenuWorkspaceSearchData"){
                AllAdminMenuWorkspaceSearchLargeData(1,search_log["search_type"],search_log["search_data"],is_export,AllAdminMenuWorkspaceExportExcel);
        } 
        
    })
}); 

function AllAdminMenuWorkspaceExportExcel(){

    var table=$('#alladminmenuWorkspaceExportTableId');
    var count_cols = table.find("th").length;
    if(table.find("td").length>0){
        table.tableExport({
                filename: '__admin_menu__%DD%-%MM%-%YY%',
                format: 'xls',
                excludeCols: count_cols.toString(),
                onbefore: function() {
                    toastr.success('Bắt đầu xuất Excel!');
                },
                onafter: function() {
                    toastr.success('Xuất Excel thành công');
                },
        });
    }
    else{
        toastr.warning('Không có dữ liệu!');
    }
}



// ########## [Save Button] Clicked Handle function ##############

$(document).ready(function(){
    
                         //   var s2_menu_group_ele_create = $("#menu_groupAdminMenuGroupAllAdminMenuWorkspaceCreateModalInputId");
                         //   if(s2_menu_group_ele_create.length > 0 ){
                         //       s2_menu_group_ele_create.select2({
                         //           placeholder: "-Lựa chọn-",
                         //           allowClear: true,
                         //       });
                         //   }
                        
                        
                       //    var s2_menu_group_ele_detail = $("#menu_groupAdminMenuGroupAllAdminMenuWorkspaceDetailModalInputId");
                       //    if(s2_menu_group_ele_detail.length > 0 ){
                       //        s2_menu_group_ele_detail.select2({
                       //            placeholder: "-Lựa chọn-",
                       //            allowClear: true,
                       //        });
                       //    }
                        
                        
                        //    var s2_menu_group_ele_edit = $("#menu_groupAdminMenuGroupAllAdminMenuWorkspaceEditModalInputId");
                        //    if(s2_menu_group_ele_edit.length > 0 ){
                        //        s2_menu_group_ele_edit.select2({
                        //            placeholder: "-Lựa chọn-",
                        //            allowClear: true,
                        //        });
                        //    }
                        
                        
                        //    var s2_menu_group_ele = $("#menu_groupAdminMenuGroupAllAdminMenuWorkspaceInputId");
                        //    if(s2_menu_group_ele.length > 0 ){
                        //        s2_menu_group_ele.select2({
                        //            placeholder: "-Lựa chọn-",
                        //            allowClear: true,
                        //        });
                        //    }
                        
                        
                         //   var s2_parent_menu_ele_create = $("#parent_menuAllAdminMenuAllAdminMenuWorkspaceCreateModalInputId");
                         //   if(s2_parent_menu_ele_create.length > 0 ){
                         //       s2_parent_menu_ele_create.select2({
                         //           placeholder: "-Lựa chọn-",
                         //           allowClear: true,
                         //       });
                         //   }
                        
                        
                       //    var s2_parent_menu_ele_detail = $("#parent_menuAllAdminMenuAllAdminMenuWorkspaceDetailModalInputId");
                       //    if(s2_parent_menu_ele_detail.length > 0 ){
                       //        s2_parent_menu_ele_detail.select2({
                       //            placeholder: "-Lựa chọn-",
                       //            allowClear: true,
                       //        });
                       //    }
                        
                        
                        //    var s2_parent_menu_ele_edit = $("#parent_menuAllAdminMenuAllAdminMenuWorkspaceEditModalInputId");
                        //    if(s2_parent_menu_ele_edit.length > 0 ){
                        //        s2_parent_menu_ele_edit.select2({
                        //            placeholder: "-Lựa chọn-",
                        //            allowClear: true,
                        //        });
                        //    }
                        
                        
                        //    var s2_parent_menu_ele = $("#parent_menuAllAdminMenuAllAdminMenuWorkspaceInputId");
                        //    if(s2_parent_menu_ele.length > 0 ){
                        //        s2_parent_menu_ele.select2({
                        //            placeholder: "-Lựa chọn-",
                        //            allowClear: true,
                        //        });
                        //    }
                        
                        
});     

            

// ########## [Save Button] Clicked Handle function ##############

$(document).ready(function(){
    $("#alladminmenuWorkspaceCreateBtnId").click(function(){
        obj = new AllAdminMenuWorkspace();
        console.log('Save obj = ', obj);
        obj.tCreateNewPostFormApi();
    })
});

    

// ########## [Save Button] Clicked Handle function ##############

$(document).ready(function(){
    $("#alladminmenuWorkspaceUpdateBtnId").click(function(){
        obj = new AllAdminMenuWorkspace();
        console.log('Update obj = ', obj);
        obj.tUpdatePostApi('alladminmenuWorkspaceEditFormId');
    })
});

    

// ########## [Create New Button] Clicked Handle function ##############
var is_continue_modal=false;
var is_continue_form=false;
$(document).ready(function(){
    $("#alladminmenuWorkspaceSaveAndNewBtnId").click(function(){
        is_continue_form=true;
        obj = new AllAdminMenuWorkspace();
        console.log('Save obj and create new, obj = ', obj);
        obj.tCreateNewPostFormApi();
    })
});

    

// ########## [Delete Button] Clicked Handle function ##############

$(document).ready(function(){
    $("#alladminmenuWorkspaceDeleteBtnId").click(function(){
        $.confirm({
        icon: 'fa fa-smile-o',
        title: 'XÓA!',
        content: 'Bạn có chắc muốn xóa ?!',
        theme: 'modern',
        closeIcon: 'cancel',
        animation: 'scale',
        type: 'orange',
        buttons: {
            cancel: {
                text: 'Hủy',
            },
            confirm: {
                text: 'Đồng ý',
                btnClass: 'btn-blue',
                action: function() {
                    //noi dung xoa
                    obj = new AllAdminMenuWorkspace();
                    console.log('Delete obj = ', obj);
                    obj.tDeleteApi();
                }
            },
            
        }
    })
});
})

    

// ########## [Cancel Button] Clicked Handle function ##############

$(document).ready(function(){
    $("#alladminmenuWorkspaceCancelCreateModalBtnId").click(function(){
        $(':input','#alladminmenuWorkspaceCreatemodalsId')
  .not(':button, :submit, :reset, :hidden')
  .val('')
  .removeAttr('checked')
  .removeAttr('selected');
    })
    $("#alladminmenuWorkspaceCancelEditModalBtnId").click(function(){
        $(':input','#alladminmenuWorkspaceEditmodalsId')
  .not(':button, :submit, :reset, :hidden')
  .val('')
  .removeAttr('checked')
  .removeAttr('selected');
    })
    $("#alladminmenuWorkspaceCancelDetailModalBtnId").click(function(){
        $(':input','#alladminmenuWorkspaceDetailmodalsId')
  .not(':button, :submit, :reset, :hidden')
  .val('')
  .removeAttr('checked')
  .removeAttr('selected');
    })
});

    

// ########## [Cancel Button] Clicked Handle function ##############

function AllAdminMenuRefreshCreateModal() {
    $('#alladminmenuWorkspaceCreatemodalsId')
        .find("input[type=text],input[type=number],textarea,select")
        .val('').removeClass("is-invalid").removeClass("is-valid")
        .end()
        .find("input[data-datepicker]").val('').removeClass("is-invalid").removeClass("is-valid")
        .end()
        .find("input[type=checkbox], input[type=radio]").removeClass("is-invalid").removeClass("is-valid")
        .prop("checked", false)
        .end();
};

    

// ########## [Cancel Button] Clicked Handle function ##############

$(document).ready(function(){

$('#alladminmenuWorkspaceCreatemodalsId').on('hidden.bs.modal', function (e) {
  $(this).removeData('bs.modal');
    $(this)
        .find("input[type=text],input[type=number],textarea,select")
        .val('').removeClass("is-invalid").removeClass("is-valid")
        .end()
        .find("input[data-datepicker]").val('').removeClass("is-invalid").removeClass("is-valid")
        .end()
        .find("input[type=checkbox], input[type=radio]").removeClass("is-invalid").removeClass("is-valid")
        .prop("checked", false)
        .end();
    $(this).find("table").each(function() { 
          var table = new alladminmenuWorkspacecreateTnvTable($(this));
          table.refresh(); 
    })
       
})
$('#alladminmenuWorkspaceEditmodalsId').on('hidden.bs.modal', function (e) {
  $(this).removeData('bs.modal');
    $(this)
        .find("input[type=text],input[type=number],textarea,select")
        .val('').removeClass("is-invalid").removeClass("is-valid")
        .end()
        .find("input[data-datepicker]").val('').removeClass("is-invalid").removeClass("is-valid")
        .end()
        .find("input[type=checkbox], input[type=radio]").removeClass("is-invalid").removeClass("is-valid")
        .prop("checked", false)
        .end();
        $(this).find("table").each(function() { 
          var table = new alladminmenuWorkspaceeditTnvTable($(this));
          table.refresh(); 
    })
})
$('#alladminmenuWorkspaceDetailmodalsId').on('hidden.bs.modal', function (e) {
  $(this).removeData('bs.modal');
    $(this)
        .find("input[type=text],input[type=number],textarea,select")
        .val('').removeClass("is-invalid").removeClass("is-valid")
        .end()
        .find("input[data-datepicker]").val('').removeClass("is-invalid").removeClass("is-valid")
        .end()
        .find("input[type=checkbox], input[type=radio]").removeClass("is-invalid").removeClass("is-valid")
        .prop("checked", false)
        .end();
      $(this).find("table").each(function() { 
          var table = new alladminmenuWorkspacedetailTnvTable($(this));
          table.refresh(); 
        })
})
});

    

// ########## [Save Button] Clicked Handle function ##############

$(document).ready(function(){
    $("#alladminmenuWorkspaceCreateModalBtnId").click(function(){
        var validate_obj = new InputValidation('alladminmenuWorkspaceCreateModalsFormId');
        if(validate_obj.validateRequired()){
            toastr.warning('Vui lòng điền đầy đủ thông tin');
            return;
        }
        obj = new AllAdminMenuWorkspace();
        console.log('Save obj = ', obj);
        obj.tCreateNewPostFormApi('alladminmenuWorkspaceCreateModalsFormId');
    })
});

    

// ########## [Save Button] Clicked Handle function ##############

$(document).ready(function(){
    $("#alladminmenuWorkspaceUpdateModalBtnId").click(function(){
        var validate_obj = new InputValidation('alladminmenuWorkspaceEditModalsFormId');
        if(validate_obj.validateRequired()){
            toastr.warning('Vui lòng điền đầy đủ thông tin');
            return;

        }
        obj = new AllAdminMenuWorkspace();
        console.log('Update obj = ', obj);
        obj.tUpdatePostApi('alladminmenuWorkspaceEditModalsFormId');
    })
});

    

// ########## [Create New Button] Clicked Handle function ##############

$(document).ready(function(){
    $("#alladminmenuWorkspaceSaveAndNewModalBtnId").click(function(){
        obj = new AllAdminMenuWorkspace();
        console.log('Save obj and create new, obj = ', obj);
        is_continue_modal=true;

        obj.tCreateNewPostFormApi('alladminmenuWorkspaceCreateModalsFormId');
        
    })
});

    

// ########## [Get List, push options to Select] Handle Event function ##############
function LoadAllAdminMenuWorkspaceList(){

if ($(".alladminmenu-workspace-select").length > 0){
        var obj = new AllAdminMenuWorkspaceList();
        AllAdminMenuWorkspaceList_CACHE = obj.getListApi();
        var crr = null;
        for (l = 0; l < AllAdminMenuWorkspaceList_CACHE.length; l++){
            crr = AllAdminMenuWorkspaceList_CACHE[l]
            // $(this).append(new Option(crr.name, crr.id));
            $(".alladminmenu-workspace-select").append(new Option(crr.name, crr.uuid));
        }
    }
}
$(document).ready(function(){
     LoadAllAdminMenuWorkspaceList();
})

    

// ########## [Fill Table] Handle Event function ##############
var AllAdminMenuWorkspacepagination={
    current_page:1,
    total:0,
    has_next:false,
    has_prev:false
}
$(document).ready(function(){
    var IdTable ="alladminmenuWorkspaceTableBodyId";
    var checker = $("#" +IdTable );
    if (checker.length > 0){
        if($('#'+IdTable).is(":visible")){
            AllAdminMenuWorkspaceGetDataTable(AllAdminMenuWorkspacepagination["current_page"]);
        }
    }
})
var record_in_page = 10;
var search_log = {
    search_func:"",
    search_data:"",
    search_type:"",
}
function AllAdminMenuWorkspaceGetDataTable(page=1,search_data=null){
        search_log["search_func"] = "AllAdminMenuWorkspaceGetDataTable";
        search_log["search_data"] = search_data;
        search_log["search_type"] = "";

        var obj = new AllAdminMenuWorkspace();
        var results = obj.tGetAllObjApi(page,search_data);
        obj.callAjax.then(function(data) {
        $("#alladminmenuWorkspaceTableBodyId").empty();
        var body = $("#alladminmenuWorkspaceDataTableId");
        //if (body.length > 0){
        //    var bodyTable = body.DataTable();
        //    bodyTable.clear();
        //}
        ALLADMINMENU_ID_TABLE_COUNT = 1;
        if(page>1){
        ALLADMINMENU_ID_TABLE_COUNT =1+record_in_page*page-record_in_page
        }
        for (var i = 0; i < results.length; i++){
            try{
                console.log('results[i] = ', results[i]);

                //results[i].tFillTable2();
                results[i].tFillTable3();
                results[i].tFillCard();

                ALLADMINMENU_ID_TABLE_COUNT++;
                // results[i].tFillTable1();
            }
            catch(err){
                console.log(err);
            }
        }
        var pagenation_ele=$(".pagination-AllAdminMenuWorkspace");
        var pagination=AllAdminMenuWorkspacepagination;
        pagenation_ele.html('');
        var page_total_ele = $(".page-total-AllAdminMenuWorkspace");
        page_total_ele.html(`<footer class="blockquote-footer">Tổng số: ${pagination["total"]} bản ghi </footer>`);
        if (results.length > 0) {
            
                    pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="AllAdminMenuWorkspaceGetDataTable(1)">Đầu</a></li>`);
                    if (pagination["has_prev"] == true) {
                        pagenation_ele.append('<li class="page-item"><a class="page-link" onclick="AllAdminMenuWorkspaceGetDataTable(' + (parseInt(pagination["current_page"]) - 1) + ')">' + (parseInt(pagination["current_page"]) - 1) + '</a></li>');
                    }
                    pagenation_ele.append('<li class="page-item active"><a class="page-link" >' + (parseInt(pagination["current_page"])) + '</a></li>');
                    if (pagination["has_next"] == true) {
                        pagenation_ele.append('<li class="page-item"><a class="page-link" onclick="AllAdminMenuWorkspaceGetDataTable(' + (parseInt(pagination["current_page"]) + 1) + ')">' + (parseInt(pagination["current_page"]) + 1) + '</a></li>');
                    }
                    if(pagination["total"]>0){
                        var last_page_order = 0 
                        if((pagination["total"]/record_in_page)>(pagination["total"]%record_in_page))
                        {
                        last_page_order = (pagination["total"]%record_in_page) + 1;
                        }
                        else {
                        last_page_order = (pagination["total"]%record_in_page);
                        }
                    pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="AllAdminMenuWorkspaceGetDataTable(`+last_page_order+`)">Cuối</a></li>`);
                    }
                }
    })
}

    
$(document).ready(function(){
    
// bỏ ngỏ => hoàn thiện sau
// tìm kiếm lại theo nội dung đã search
console.log(search_log);

});


// ########## [Fill Form] Handle Event function ##############

$(document).ready(function(){
    var checker = $("#alladminmenuWorkspaceFormId");
    if (checker.length > 0){
         cr_uuid = checker.attr('data-uuid');
        if (typeof cr_uuid !== 'undefined' && cr_uuid !== false){
            console.log('cr_uuid = ', cr_uuid);
            var obj = new AllAdminMenuWorkspace();
            obj.tGetObjApi(cr_uuid);
        }
    }
    checker = $("#alladminmenuWorkspaceDetailFormId");
    if (checker.length > 0){
         cr_uuid = checker.attr('data-uuid');
        if (typeof cr_uuid !== 'undefined' && cr_uuid !== false){
            console.log('cr_uuid = ', cr_uuid);
            var obj = new AllAdminMenuWorkspace();
            obj.tGetObjApi(cr_uuid);
        }
    }
    checker = $("#alladminmenuWorkspaceEditFormId");
    if (checker.length > 0){
         cr_uuid = checker.attr('data-uuid');
        if (typeof cr_uuid !== 'undefined' && cr_uuid !== false){
            console.log('cr_uuid = ', cr_uuid);
            var obj = new AllAdminMenuWorkspace();
            obj.tGetObjApi(cr_uuid);
        }
    }
})
var cr_uuid="";
    

// ########## [CKEDITOR ENABLE] function ##############

$(document).ready(function(){
   // var all_textareas = $(".ckeditor-input");
   // for (var i = 0; i < all_textareas.length; i++){
   //     var ele = all_textareas[i];
   //     var eleId = ele.getAttribute('id');
   //     var inst = CKEDITOR.replace( eleId , {});
   //     console.log('inst = ', inst);
   //     CKEDITOR.instances[eleId].on('change', function() {
   //         // console.log(this.getData());
   //         $("#" + eleId).val(this.getData());
   //     });
   // }
});

    

// ########## [Test Button] Clicked Handle function ##############

$(document).ready(function(){
    $("#alladminmenuWorkspaceTestBtnId").click(function(){
        tTestAllAdminMenuWorkspace();
    })
     $("#alladminmenuWorkspaceTestEditBtnId").click(function(){
        tTestAllAdminMenuWorkspace('Edit');
    })
    $("#alladminmenuWorkspaceTestCreateModalBtnId").click(function(){
        tTestInModalAllAdminMenuWorkspace('Create');

    })
     $("#alladminmenuWorkspaceTestEditModalBtnId").click(function(){
        tTestInModalAllAdminMenuWorkspace('Edit');
    })
});

    
    
    // ########## [Fill Table bySearch] Handle Event function ##############
    function AllAdminMenuWorkspaceSearchData(page=1,search_type,search_data=null){
        search_log["search_func"] = "AllAdminMenuWorkspaceSearchData";
        search_log["search_type"] = search_type;
        search_log["search_data"] = search_data;
            var obj = new AllAdminMenuWorkspace();
            var results = obj.tSearchAllObjApi(page,search_data,search_type);
            obj.callAjax.then(function(data) {
            $("#alladminmenuWorkspaceTableBodyId").empty();
            var body = $("#alladminmenuWorkspaceDataTableId");
            //if (body.length > 0){
            //    var bodyTable = body.DataTable();
            //    bodyTable.clear();
            //}
            ALLADMINMENU_ID_TABLE_COUNT = 1;
            if(page>1){
            ALLADMINMENU_ID_TABLE_COUNT =1+record_in_page*page-record_in_page;
            }
            for (var i = 0; i < results.length; i++){
                try{
                    console.log('results[i] = ', results[i]);
    
                    //results[i].tFillTable2();
                    results[i].tFillTable3();
    
                    ALLADMINMENU_ID_TABLE_COUNT++;
                    // results[i].tFillTable1();
                }
                catch(err){
                    console.log(err);
                }
            }
            search_type = search_type.trim()
            var pagination = AllAdminMenuWorkspacepagination;
            var pagenation_ele=$(".pagination-AllAdminMenuWorkspace");
            pagenation_ele.html('');
            var page_total_ele = $(".page-total-AllAdminMenuWorkspace");
            page_total_ele.html(`<footer class="blockquote-footer">Tổng số: ${pagination["total"]} bản ghi </footer>`);
            
            if (results.length > 0) {
                    pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="AllAdminMenuWorkspaceSearchData(1,'`+search_type+`'`+ `,'`+search_data+`'`+ `)">Đầu</a></li>`);

                    if (pagination["has_prev"] == true) {
                        pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="AllAdminMenuWorkspaceSearchData(` + (parseInt(pagination["current_page"]) - 1) +`,'`+search_type+`'`+ `,'`+search_data+`'`+ `)">` + (parseInt(pagination["current_page"]) - 1) + `</a></li>`);
                    }
                    pagenation_ele.append('<li class="page-item active"><a class="page-link" >' + (parseInt(pagination["current_page"])) + '</a></li>');
                    if (pagination["has_next"] == true) {
                        pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="AllAdminMenuWorkspaceSearchData(` + (parseInt(pagination["current_page"]) + 1) +`,'`+search_type+`'`+ `,'`+search_data+`'`+ `)">` + (parseInt(pagination["current_page"]) + 1) + `</a></li>`);
                    }
                    if(pagination["total"]>0){
                        var last_page_order = 0 
                        if((pagination["total"]/record_in_page)>(pagination["total"]%record_in_page))
                        {
                        last_page_order = (pagination["total"]%record_in_page) + 1;
                        }
                        else {
                        last_page_order = (pagination["total"]%record_in_page);
                        }
                    pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="AllAdminMenuWorkspaceSearchData(`+last_page_order+`,'`+search_type+`'`+ `,'`+search_data+`'`+ `)">Cuối</a></li>`);
                    }
                }
                if (search_type == "quick") {
                    var crr_txt = $("#alladminmenuWorkspaceQuickSearchInputId").val();
                    highlight(crr_txt,"#alladminmenuWorkspaceTableBodyId");
                }
        })
    
    }
    
        
    
    // ########## [Fill Table bySearch] Handle Event function ##############
    function AllAdminMenuWorkspaceSearchLargeData(page=1,search_type,search_data=null,is_export,ExportFunc){
            var obj = new AllAdminMenuWorkspace();
            var tbId = "alladminmenuWorkspaceExportTableId"
            var results = obj.tSearchLargeObjApi(page,search_data,search_type);
            obj.callAjax.then(function(data) {
            $("#"+tbId).find("table").empty();
            alladminmenuWorkspace_ID_TABLE_COUNT = 1;
            for (var i = 0; i < results.length; i++){
                try{
                    console.log('results[i] = ', results[i]);
                    results[i].tFillTable3(tbId);
                    results[i].tFillCard();

                    alladminmenuWorkspace_ID_TABLE_COUNT++;
                }
                catch(err){
                    console.log(err);
                }
            }
            if(is_export){
                ExportFunc();
            }
            })
    
    }
    
        
    
    // ########## [Fill Table bySearch] Handle Event function ##############
    function AllAdminMenuWorkspaceGetLargeDataTable(page=1,search_data=null,is_export,ExportFunc){
            var obj = new AllAdminMenuWorkspace();
            var tbId = "alladminmenuWorkspaceExportTableId"
            var results = obj.tGetAllObjLargeApi(page,search_data);
            obj.callAjax.then(function(data) {
            $("#"+tbId).find("table").empty();
            alladminmenuWorkspace_ID_TABLE_COUNT = 1;
            for (var i = 0; i < results.length; i++){
                try{
                    console.log('results[i] = ', results[i]);
                    results[i].tFillTable3(tbId);
                    results[i].tFillCard();
                    alladminmenuWorkspace_ID_TABLE_COUNT++;
                }
                catch(err){
                    console.log(err);
                }
            }

            if(is_export){
                ExportFunc();
            }
            })
    
    }
    
        
    
    // ########## [Fill Table bySearch] Handle Event function ##############
    var ALLADMINMENU_ID_INLINE_TABLE_COUNT;
    function AllAdminMenuWorkspaceFillTableInForm(page=1,search_data=null,tableId=null,action="detail"){
            var obj = new AllAdminMenuWorkspace();
            var results = obj.tSearchLargeObjApi(page,search_data,"filter",tableId);
            obj.callAjax.then(function(data) {
                ALLADMINMENU_ID_INLINE_TABLE_COUNT = 1;
                if(page>1){
                ALLADMINMENU_ID_INLINE_TABLE_COUNT =1+10*page -10;
                }
                if(action=="detail"){
                    $("#"+tableId).find('tbody').empty();
                    for (var i = 0; i < results.length; i++){
                    try{
                        console.log('results[i] = ', results[i]);
                        results[i].tFillTable4(tableId,ALLADMINMENU_ID_INLINE_TABLE_COUNT,action);
                        ALLADMINMENU_ID_INLINE_TABLE_COUNT++;
                    }
                    catch(err){
                        console.log(err);
                    }
                    }
                }
                else if(action=="edit"){
                    var table = new alladminmenuWorkspaceeditTnvTable($("#"+tableId)[0]);
                    table.bindRows(results);
                }
            })
            
    
    }
    
        