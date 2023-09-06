
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
function PageInfoWorkspacegenRandomSelect(optionId){
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
            
var genPageInfoWorkspace_FIELDS = [
            "name",
            "uuid",
            "title",
            "charset",
            "header",
            "desc",
            "meta_description",
            "meta_keywords",
            "active",
            "updated_at",
            "created_at",
    ];
function genPageInfoWorkspace(form_type){
    return {
        "name": makeid(),
        "uuid": uuidv4(),
        "title": makeid(128),
        "charset": makeid(),
        "header": makeid(128),
        "desc": makeid(128),
        "meta_description": makeid(128),
        "meta_keywords": makeid(128),
        "active": genBoolean(),
        "updated_at": randomDate(),
        "created_at": randomDate(),
    }
}

var PageInfoWorkspace_CACHE = [];

           var PageInfoWorkspace_arr_action = [
        // default action
        
                    {
                    "title": "Xem chi tiết",
                    "func": "PageInfoWorkspaceDetails",
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
                        "func": "PageInfoWorkspaceEdit",
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
                        "func": "PageInfoWorkspaceOnDeleteEvent",
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
    
                    function PageInfoWorkspaceDetails(uuid){
                        $('#pageinfoWorkspaceDetailmodalsId').modal('toggle');
                        var obj=new PageInfoWorkspace();
                        obj.tGetObjApi(uuid);
                        obj.callAjax.then(function(data) {
                            new PageInfoWorkspace(data).tFillFormModal('Detail','pageinfoWorkspaceDetailModalsFormId');

                        })
                        //obj.tFillFormModal('Detail');

                    }
                    
                    function PageInfoWorkspaceEdit(uuid){
                        $('#pageinfoWorkspaceEditmodalsId').modal('toggle');
                        var obj=new PageInfoWorkspace();
                        obj.tGetObjApi(uuid);
                        obj.callAjax.then(function(data) {
                            new PageInfoWorkspace(data).tFillFormModal('Edit','pageinfoWorkspaceEditModalsFormId');

                        })
                        //obj.tFillFormModal('Edit');
                    }
                    
                    function PageInfoWorkspaceOnDeleteEvent(uuid){
                        var search_data = null;
                        try {
                            search_data = PageInfoActionsSearchData;
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
                                                    var obj=new PageInfoWorkspace();
                                                    obj.tDeleteApi(uuid);
                                                }
                                            },
                                            
                                        }
                                });
                            
                        }
                        else { 
                            PageInfoWorkspaceOnDeleteWithDataSearchEvent(uuid);
                        }

                    }
                    function PageInfoWorkspaceOnDeleteWithDataSearchEvent(uuid){
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
                                    var obj=new PageInfoWorkspace();
                                    
                                    obj.tDeleteApiWithDataSearch(uuid,PageInfoActionsSearchData);
                                }
                            },
                            
                        }
                    });
                        
                    }
                    
                    function PageInfoWorkspaceViewDetail(selectionId){
                        var select = $("#"+selectionId);
                        if(select.length>0){
                            var value =  select.val()
                            if(value == "" || value == null || value == undefined){
                                toastr.warning('Vui lòng chọn giá trị');
                                return;
                            }
                            else {
                                $('#pageinfoWorkspaceDetailmodalsId').modal('toggle');
                                var obj=new PageInfoWorkspace();
                                obj.tGetObjApi(value);
                                obj.callAjax.then(function(data) {
                                    new PageInfoWorkspace(data).tFillFormModal('Detail','pageinfoWorkspaceDetailModalsFormId');
                                })
                            }
                        }
                        

                    }
                    
    // custom func actions
            
            

                    //########## [Event] ChangeSwitcher ##############
                    
                    function activepageinfoWorkspaceEventChangeSwitcher($this){
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
                                        obj = new PageInfoWorkspace();
                                        console.log('Update obj = ', obj);
                                        obj.tUpdateOnlyFieldApi($($this).attr("data-uuid"),$($this).attr("name"),$($this).is(":checked"))  ;
                                    }
                                },
                                
                            }
                        })

                    }
                    

class PageInfoWorkspace{
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
    
            this.__model_name__ = "PageInfo";
    
            if (data.hasOwnProperty('name')){
                this.name = data.name;
            }
            else{
                // this.name = null;
            }

            if (data.hasOwnProperty('uuid')){
                this.uuid = data.uuid;
                this.editUrl = '/Workspace/PageInfo/edit/' + this.uuid + '/';
                this.detailUrl = '/Workspace/PageInfo/detail/' + this.uuid + '/';
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

            if (data.hasOwnProperty('charset')){
                this.charset = data.charset;
            }
            else{
                // this.charset = null;
            }

            if (data.hasOwnProperty('header')){
                this.header = data.header;
            }
            else{
                // this.header = null;
            }

            if (data.hasOwnProperty('desc')){
                this.desc = data.desc;
            }
            else{
                // this.desc = null;
            }

            if (data.hasOwnProperty('meta_description')){
                this.meta_description = data.meta_description;
            }
            else{
                // this.meta_description = null;
            }

            if (data.hasOwnProperty('meta_keywords')){
                this.meta_keywords = data.meta_keywords;
            }
            else{
                // this.meta_keywords = null;
            }

            if (data.hasOwnProperty('active')){
                this.active = data.active;
            }
            else{
                // this.active = null;
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
            var chEle = formEle.find("#namePageInfoWorkspaceInputId");
            if (chEle.length > 0){
                this.name = chEle.val();
            }
            else{
                // this.name = null;
            }
            var chEle = formEle.find("#uuidPageInfoWorkspaceInputId");
            if (chEle.length > 0){
                this.uuid = chEle.val();
            }
            else{
                // this.uuid = null;
            }
            var chEle = formEle.find("#titlePageInfoWorkspaceInputId");
            if (chEle.length > 0){
                this.title = chEle.val();
            }
            else{
                // this.title = null;
            }
            var chEle = formEle.find("#charsetPageInfoWorkspaceInputId");
            if (chEle.length > 0){
                this.charset = chEle.val();
            }
            else{
                // this.charset = null;
            }
            var chEle = formEle.find("#headerPageInfoWorkspaceInputId");
            if (chEle.length > 0){
                this.header = chEle.val();
            }
            else{
                // this.header = null;
            }
            var chEle = formEle.find("#descPageInfoWorkspaceInputId");
            if (chEle.length > 0){
                this.desc = chEle.val();
            }
            else{
                // this.desc = null;
            }
            var chEle = formEle.find("#meta_descriptionPageInfoWorkspaceInputId");
            if (chEle.length > 0){
                this.meta_description = chEle.val();
            }
            else{
                // this.meta_description = null;
            }
            var chEle = formEle.find("#meta_keywordsPageInfoWorkspaceInputId");
            if (chEle.length > 0){
                this.meta_keywords = chEle.val();
            }
            else{
                // this.meta_keywords = null;
            }
            var chEle = formEle.find("#activePageInfoWorkspaceInputId");
            if (chEle.length > 0){
                this.active = chEle.val();
            }
            else{
                // this.active = null;
            }
            var chEle = formEle.find("#updated_atPageInfoWorkspaceInputId");
            if (chEle.length > 0){
                this.updated_at = chEle.val();
            }
            else{
                // this.updated_at = null;
            }
            var chEle = formEle.find("#created_atPageInfoWorkspaceInputId");
            if (chEle.length > 0){
                this.created_at = chEle.val();
            }
            else{
                // this.created_at = null;
            }
        }
        else{
            var chEle = $("#idPageInfoWorkspaceInputId");
            if (chEle.length > 0){
                this.id = chEle.val();
            }
            else{
                // this.id = null;
            }
                                var chEle = $("#namePageInfoWorkspaceInputId");
                                if (chEle.length > 0){
                                    this.name = chEle.val();
                                }
                                else{
                                    // this.name = null;
                                }
                    
                                var chEle = $("#uuidPageInfoWorkspaceInputId");
                                if (chEle.length > 0){
                                    this.uuid = chEle.val();
                                }
                                else{
                                    // this.uuid = null;
                                }
                    
                                var chEle = $("#titlePageInfoWorkspaceInputId");
                                if (chEle.length > 0){
                                    this.title = chEle.val();
                                }
                                else{
                                    // this.title = null;
                                }
                    
                                var chEle = $("#charsetPageInfoWorkspaceInputId");
                                if (chEle.length > 0){
                                    this.charset = chEle.val();
                                }
                                else{
                                    // this.charset = null;
                                }
                    
                                var chEle = $("#headerPageInfoWorkspaceInputId");
                                if (chEle.length > 0){
                                    this.header = chEle.val();
                                }
                                else{
                                    // this.header = null;
                                }
                    
                                var chEle = $("#descPageInfoWorkspaceInputId");
                                if (chEle.length > 0){
                                    this.desc = chEle.val();
                                }
                                else{
                                    // this.desc = null;
                                }
                    
                                var chEle = $("#meta_descriptionPageInfoWorkspaceInputId");
                                if (chEle.length > 0){
                                    this.meta_description = chEle.val();
                                }
                                else{
                                    // this.meta_description = null;
                                }
                    
                                var chEle = $("#meta_keywordsPageInfoWorkspaceInputId");
                                if (chEle.length > 0){
                                    this.meta_keywords = chEle.val();
                                }
                                else{
                                    // this.meta_keywords = null;
                                }
                    
                                var chEle = $("#activePageInfoWorkspaceInputId");
                                if (chEle.length > 0){
                                    this.active = chEle.val();
                                }
                                else{
                                    // this.active = null;
                                }
                    
                                var chEle = $("#updated_atPageInfoWorkspaceInputId");
                                if (chEle.length > 0){
                                    var date = moment(chEle.val(), 'DD/MM/YYYY');
                                    this.updated_at=toDatePython(new Date(date))
                                }
                                else{
                                    // this.updated_at = null;
                                }
                    
                                var chEle = $("#created_atPageInfoWorkspaceInputId");
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
                var j_ele_name = $("#namePageInfoWorkspaceInputId");
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
                var j_ele_uuid = $("#uuidPageInfoWorkspaceInputId");
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
                var j_ele_title = $("#titlePageInfoWorkspaceInputId");
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
                var j_ele_charset = $("#charsetPageInfoWorkspaceInputId");
                if (j_ele_charset.length > 0){
                    if (j_ele_charset.attr('name') != 'uuid'){
                        j_ele_charset.val(self.charset).change();
                    }
                }
                else{
                    // j_ele_charset.val(null);
                }
            }
            catch(err) {
                console.log('err = ', err);
            }

            try{
                var j_ele_header = $("#headerPageInfoWorkspaceInputId");
                if (j_ele_header.length > 0){
                    if (j_ele_header.attr('name') != 'uuid'){
                        j_ele_header.val(self.header).change();
                    }
                }
                else{
                    // j_ele_header.val(null);
                }
            }
            catch(err) {
                console.log('err = ', err);
            }

            try{
                var j_ele_desc = $("#descPageInfoWorkspaceInputId");
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
                var j_ele_meta_description = $("#meta_descriptionPageInfoWorkspaceInputId");
                if (j_ele_meta_description.length > 0){
                    if (j_ele_meta_description.attr('name') != 'uuid'){
                        j_ele_meta_description.val(self.meta_description).change();
                    }
                }
                else{
                    // j_ele_meta_description.val(null);
                }
            }
            catch(err) {
                console.log('err = ', err);
            }

            try{
                var j_ele_meta_keywords = $("#meta_keywordsPageInfoWorkspaceInputId");
                if (j_ele_meta_keywords.length > 0){
                    if (j_ele_meta_keywords.attr('name') != 'uuid'){
                        j_ele_meta_keywords.val(self.meta_keywords).change();
                    }
                }
                else{
                    // j_ele_meta_keywords.val(null);
                }
            }
            catch(err) {
                console.log('err = ', err);
            }

            try{
                var j_ele_active = $("#activePageInfoWorkspaceInputId");
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
                var j_ele_updated_at = $("#updated_atPageInfoWorkspaceInputId");
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
                var j_ele_created_at = $("#created_atPageInfoWorkspaceInputId");
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
                var j_ele_name = $("#namePageInfoWorkspace"+apart+"InputId");
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
                var j_ele_uuid = $("#uuidPageInfoWorkspace"+apart+"InputId");
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
                var j_ele_title = $("#titlePageInfoWorkspace"+apart+"InputId");
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
                var j_ele_charset = $("#charsetPageInfoWorkspace"+apart+"InputId");
                if (j_ele_charset.length > 0){
                    if (j_ele_charset.attr('name') != 'uuid'){
                        j_ele_charset.val(self.charset).change();
                    }
                }
                else{
                    // j_ele_charset.val(null);
                }
            }
            catch(err) {
                console.log('err = ', err);
            }

            try{
                var j_ele_header = $("#headerPageInfoWorkspace"+apart+"InputId");
                if (j_ele_header.length > 0){
                    if (j_ele_header.attr('name') != 'uuid'){
                        j_ele_header.val(self.header).change();
                    }
                }
                else{
                    // j_ele_header.val(null);
                }
            }
            catch(err) {
                console.log('err = ', err);
            }

            try{
                var j_ele_desc = $("#descPageInfoWorkspace"+apart+"InputId");
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
                var j_ele_meta_description = $("#meta_descriptionPageInfoWorkspace"+apart+"InputId");
                if (j_ele_meta_description.length > 0){
                    if (j_ele_meta_description.attr('name') != 'uuid'){
                        j_ele_meta_description.val(self.meta_description).change();
                    }
                }
                else{
                    // j_ele_meta_description.val(null);
                }
            }
            catch(err) {
                console.log('err = ', err);
            }

            try{
                var j_ele_meta_keywords = $("#meta_keywordsPageInfoWorkspace"+apart+"InputId");
                if (j_ele_meta_keywords.length > 0){
                    if (j_ele_meta_keywords.attr('name') != 'uuid'){
                        j_ele_meta_keywords.val(self.meta_keywords).change();
                    }
                }
                else{
                    // j_ele_meta_keywords.val(null);
                }
            }
            catch(err) {
                console.log('err = ', err);
            }

                        try{
                            var j_ele_active = $("#activePageInfoWorkspace"+apart+"InputId");
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
                var j_ele_updated_at = $("#updated_atPageInfoWorkspace"+apart+"InputId");
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
                var j_ele_created_at = $("#created_atPageInfoWorkspace"+apart+"InputId");
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
                var j_ele_name = $("#namePageInfoWorkspace"+apart+"InputId");
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
                var j_ele_uuid = $("#uuidPageInfoWorkspace"+apart+"InputId");
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
                var j_ele_title = $("#titlePageInfoWorkspace"+apart+"InputId");
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
                var j_ele_charset = $("#charsetPageInfoWorkspace"+apart+"InputId");
                if (j_ele_charset.length > 0){
                    if (j_ele_charset.attr('name') != 'uuid'){
                        j_ele_charset.val(self.charset).change();
                    }
                }
                else{
                    // j_ele_charset.val(null);
                }
            }
            catch(err) {
                console.log('err = ', err);
            }

            try{
                var j_ele_header = $("#headerPageInfoWorkspace"+apart+"InputId");
                if (j_ele_header.length > 0){
                    if (j_ele_header.attr('name') != 'uuid'){
                        j_ele_header.val(self.header).change();
                    }
                }
                else{
                    // j_ele_header.val(null);
                }
            }
            catch(err) {
                console.log('err = ', err);
            }

            try{
                var j_ele_desc = $("#descPageInfoWorkspace"+apart+"InputId");
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
                var j_ele_meta_description = $("#meta_descriptionPageInfoWorkspace"+apart+"InputId");
                if (j_ele_meta_description.length > 0){
                    if (j_ele_meta_description.attr('name') != 'uuid'){
                        j_ele_meta_description.val(self.meta_description).change();
                    }
                }
                else{
                    // j_ele_meta_description.val(null);
                }
            }
            catch(err) {
                console.log('err = ', err);
            }

            try{
                var j_ele_meta_keywords = $("#meta_keywordsPageInfoWorkspace"+apart+"InputId");
                if (j_ele_meta_keywords.length > 0){
                    if (j_ele_meta_keywords.attr('name') != 'uuid'){
                        j_ele_meta_keywords.val(self.meta_keywords).change();
                    }
                }
                else{
                    // j_ele_meta_keywords.val(null);
                }
            }
            catch(err) {
                console.log('err = ', err);
            }

                        try{
                            var j_ele_active = $("#activePageInfoWorkspace"+apart+"InputId");
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
                var j_ele_updated_at = $("#updated_atPageInfoWorkspace"+apart+"InputId");
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
                var j_ele_created_at = $("#created_atPageInfoWorkspace"+apart+"InputId");
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
            url: PageInfoWorkspace_URL,
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
                    self = new PageInfoWorkspace(data);
                    PageInfoWorkspaceGetDataTable(PageInfoWorkspacepagination["current_page"]);
                    if(is_continue_form){
                        is_continue_form=false;
                        toastr.success('Thêm mới thành công');
                        $(location).prop('href', "/Workspace/PageInfo/create/");
                        

                    }else if(is_continue_modal){
                        is_continue_modal=false;
                        PageInfoRefreshCreateModal();
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
                    //                $(location).prop('href', "/Workspace/PageInfo/create/");
                    //            }
                    //        },
                    //        Show:{
                    //            text: 'Chi tiết',
                    //            action: function(){
                    //                $(location).prop('href', "/Workspace/PageInfo/detail/" + self.uuid + "/");
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
         formData = new FormData($('#pageinfoWorkspaceCreateFormId')[0]);

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
        
        var file_eles = $(".pageinfo-workspace");
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
                url: PageInfoWorkspace_URL + self.uuid + "/",
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
                        self = new PageInfoWorkspace(data);
                        
                        PageInfoWorkspaceGetDataTable(PageInfoWorkspacepagination["current_page"])
                        //$(location).prop('href', "/Workspace/PageInfo/detail/" + self.uuid + "/");
                        if(is_continue_form){
                            is_continue_form=false;
                            if(!is_notification && (is_done||!is_has_children)){
                                is_notification = true;
                                toastr.success('Cập nhật thành công');
                            }
                            $(location).prop('href', "/Workspace/PageInfo/create/");
                        }else if(is_continue_modal){
                            is_continue_modal=false;
                            PageInfoRefreshCreateModal();
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
                    $(location).prop('href', "/Workspace/PageInfo/create/");
            }else if(is_continue_modal){
                is_continue_modal=false;
                PageInfoRefreshCreateModal();
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
        $('#idPageInfoWorkspaceInputId').val(null);
        $('#uuidPageInfoWorkspaceInputId').val(uuidv4());
        var self = this;
        var formData;
        var arr_table = [];
        if(formId==null){
         formData = new FormData($('#pageinfoWorkspaceCreateFormId')[0]);

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
        
        var file_eles = $(".pageinfo-workspace");
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
            LoadPageInfoWorkspaceList();
        }
        if(!is_save_self_table){
                $.ajax({
                url: PageInfoWorkspace_URL,
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
                        self = new PageInfoWorkspace(data);
                        LoadPageInfoWorkspaceList();
                        PageInfoWorkspaceGetDataTable(PageInfoWorkspacepagination["current_page"]);
                        if(is_continue_form){
                            is_continue_form=false;
                            if(!is_notification){
                                is_notification = true;
                                toastr.success('Thêm mới thành công');
                            }
                            

                            $(location).prop('href', "/Workspace/PageInfo/create/");
                        }else if(is_continue_modal){
                            is_continue_modal=false;
                            PageInfoRefreshCreateModal();
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
                $(location).prop('href', "/Workspace/PageInfo/create/");
            }else if(is_continue_modal){
                is_continue_modal=false;
                PageInfoRefreshCreateModal();
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
            url: PageInfoWorkspace_URL,
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
            url: PageInfoWorkspace_URL,
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
                        url: PageInfoWorkspace_URL + uuid + "/",
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
            url: PageInfoWorkspace_URL + uuid_go + "/",
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
                PageInfoWorkspaceGetDataTable(PageInfoWorkspacepagination["current_page"]);
                if(cr_uuid!=""){
                    $(location).prop('href', "/Workspace/PageInfo/create/");
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
            url: PageInfoWorkspace_URL + uuid_go + "/",
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
                PageInfoWorkspaceSearchData(PageInfoWorkspacepagination["current_page"],"filter",data_search);
                if(cr_uuid!=""){
                    $(location).prop('href', "/Workspace/PageInfo/create/");
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
            url: PageInfoWorkspace_REMOVEFILE_URL+uuid+"/",
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
            url: PageInfoWorkspace_URL+uuid+"/",
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
            url: PageInfoWorkspace_URL+has_go_page,
            type: "GET",
            //async: false,
            cache: false,
            timeout: 30000,

            success: function (data) {
                console.log('[tGetAllObjApi] data = ', data);
                // return new PageInfoWorkspace(data);
                if (data.hasOwnProperty('count')){
                    PageInfoWorkspacepagination["total"]=data.count;
                }
                if (data.hasOwnProperty('count')){
                    PageInfoWorkspacepagination["total"]=data.count;
                }
                if (data.hasOwnProperty('next')){
                    if(data.next != null){
                    PageInfoWorkspacepagination["has_next"]=true;
                    }else{
                    PageInfoWorkspacepagination["has_next"]=false;

                    }
                }
                PageInfoWorkspacepagination["current_page"]=page;
                if (data.hasOwnProperty('previous')){
                    if(data.previous != null){
                    PageInfoWorkspacepagination["has_prev"]=true;
                    }else{
                    PageInfoWorkspacepagination["has_prev"]=false;
                    }
                }
                if (data.hasOwnProperty('results')){
                    for (var j=0; j < data.results.length; j++){
                        var tmp = new PageInfoWorkspace(data.results[j]);
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
            url: PageInfoWorkspace_LARGE_URL+has_go_page,
            type: "GET",
            //async: false,
            cache: false,
            timeout: 30000,

            success: function (data) {
                console.log('[tGetAllObjLargeApi] data = ', data);
                // return new PageInfoWorkspace(data);
                if (data.hasOwnProperty('count')){
                    PageInfoWorkspacepagination["total"]=data.count;
                }
                if (data.hasOwnProperty('count')){
                    PageInfoWorkspacepagination["total"]=data.count;
                }
                if (data.hasOwnProperty('next')){
                    if(data.next != null){
                    PageInfoWorkspacepagination["has_next"]=true;
                    }else{
                    PageInfoWorkspacepagination["has_next"]=false;

                    }
                }
                PageInfoWorkspacepagination["current_page"]=page;
                if (data.hasOwnProperty('previous')){
                    if(data.previous != null){
                    PageInfoWorkspacepagination["has_prev"]=true;
                    }else{
                    PageInfoWorkspacepagination["has_prev"]=false;
                    }
                }
                if (data.hasOwnProperty('results')){
                    for (var j=0; j < data.results.length; j++){
                        var tmp = new PageInfoWorkspace(data.results[j]);
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
            SEARCH_URL=PageInfoWorkspace_FILTER_URL;
            
                slugSearch="&";
            
                                if($("#namePageInfoWorkspaceFilterSearchInputId").length>0){
                                    var value=$("#namePageInfoWorkspaceFilterSearchInputId").val();
                                    if(value!="" && value!=null){
                                        slugSearch+="name__contains="+value+"&";
                                    }
                                }
                                
                            slugSearch=slugSearch.slice(0, -1);
        }else{
            SEARCH_URL=PageInfoWorkspace_SEARCH_URL;
            
                slugSearch="&";
                slugSearch+="search="+$("#pageinfoWorkspaceQuickSearchInputId").val();
            
        }
        if(search_data!=null){
            SEARCH_URL=PageInfoWorkspace_FILTER_URL;
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
                // return new PageInfoWorkspace(data);
                if (data.hasOwnProperty('count')){
                    PageInfoWorkspacepagination["total"]=data.count;
                }
                if (data.hasOwnProperty('count')){
                    PageInfoWorkspacepagination["total"]=data.count;
                }
                if (data.hasOwnProperty('next')){
                    if(data.next != null){
                    PageInfoWorkspacepagination["has_next"]=true;
                    }else{
                    PageInfoWorkspacepagination["has_next"]=false;

                    }
                }
                PageInfoWorkspacepagination["current_page"]=page;
                if (data.hasOwnProperty('previous')){
                    if(data.previous != null){
                    PageInfoWorkspacepagination["has_prev"]=true;
                    }else{
                    PageInfoWorkspacepagination["has_prev"]=false;
                    }
                }
                if (data.hasOwnProperty('results')){
                    for (var j=0; j < data.results.length; j++){
                        var tmp = new PageInfoWorkspace(data.results[j]);
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
            SEARCH_URL=PageInfoWorkspace_LARGE_FILTER_URL;
            
                slugSearch="&";
            
                                if($("#namePageInfoWorkspaceFilterSearchInputId").length>0){
                                    var value=$("#namePageInfoWorkspaceFilterSearchInputId").val();
                                    if(value!="" && value!=null){
                                        slugSearch+="name__contains="+value+"&";
                                    }
                                }
                                
                            slugSearch=slugSearch.slice(0, -1);
        }else{
            SEARCH_URL=PageInfoWorkspace_SEARCH_URL;
            
                slugSearch="&";
                slugSearch+="search="+$("#pageinfoWorkspaceQuickSearchInputId").val();
            
        }
        if(search_data!=null){
            SEARCH_URL=PageInfoWorkspace_LARGE_FILTER_URL;
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
                // return new PageInfoWorkspace(data);
                if (data.hasOwnProperty('count')){
                    PageInfoWorkspacepagination["total"]=data.count;
                }
                if (data.hasOwnProperty('count')){
                    PageInfoWorkspacepagination["total"]=data.count;
                }
                if (data.hasOwnProperty('next')){
                    if(data.next != null){
                    PageInfoWorkspacepagination["has_next"]=true;
                    }else{
                    PageInfoWorkspacepagination["has_next"]=false;

                    }
                }
                PageInfoWorkspacepagination["current_page"]=page;
                if (data.hasOwnProperty('previous')){
                    if(data.previous != null){
                    PageInfoWorkspacepagination["has_prev"]=true;
                    }else{
                    PageInfoWorkspacepagination["has_prev"]=false;
                    }
                }
                if (data.hasOwnProperty('results')){
                    for (var j=0; j < data.results.length; j++){
                        var tmp = new PageInfoWorkspace(data.results[j]);
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
            url: PageInfoWorkspace_URL + uuid + "/",
            type: "GET",
            async: false,
            cache: false,
            timeout: 30000,

            success: function (data) {
                console.log('[tGetObjApi] data = ', data);
                var n_obj = new PageInfoWorkspace(data);
                console.log('n_obj = ', n_obj);
                n_obj.tFillForm();
                return n_obj;
                // if (data.hasOwnProperty('results')){
                //    if (data.results.length > 0){
                //        var tmp = new PageInfoWorkspace(data[i]);
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
        var tbId = "pageinfoWorkspaceDataTableId";
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
        var tbId = "pageinfoWorkspaceDataTableId";
        var table = $("#" + tbId);
        if (table.length > 0){
            var tableData = table.DataTable();
            var rowData = [
                `<a href="` + this.detailUrl + `">` + PAGEINFO_ID_TABLE_COUNT + `</a>`,
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
        var tbId = "pageinfoWorkspaceDataTableId";
        if(tableId!=null){
            tbId = tableId;
        }

        if(order==null){
        order=PAGEINFO_ID_TABLE_COUNT;
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
                    
                        if(attr=="active"){
                            var value="";
                            if(this[attr] || this[attr]=="true"){
                                value="checked";
                            }
                            html +=`<td class="text-center">
                                    <div class="custom-control custom-switch">
                                        <input class="custom-control-input" id="${this["uuid"]}activepageinfoWorkspaceSwitchListTablebtnId" name="`+ attr +`" data-uuid="` + this["uuid"] + `" type="checkbox"  `+value+` onclick="activepageinfoWorkspaceEventChangeSwitcher(this)">
                                    <label class="custom-control-label" for="${this["uuid"]}activepageinfoWorkspaceSwitchListTablebtnId"></label>
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
                        html +=`<td class="text-wrap" style="min-width:300px" onclick="PageInfoWorkspaceDetails('`+this["uuid"]+`')"><a>` + (this[attr]) + `</a></td>`;
                            continue;
                    }
                    //html +=`<td class="text-wrap"><a>` + (this[attr]) + `</a></td>`;
                    html +=`<td class="text-wrap"><a>` + (this[attr]) + `</a></td>`;
                }
                
                else{
                    if(attr=="pageinfo-admin-action")
                    {
                        html +=BindActionButtonVer4(
                            PageInfoWorkspace_arr_action,
                            this['uuid'],
                            this,
                            null,
                            this['created_by'],
                        );
                    }else
                    {
                        
                        if(attr=="active"){
                            var value="";
                            if(this[attr] || this[attr]=="true"){
                                value="checked";
                            }
                            html +=`<td class="text-center">
                                    <div class="custom-control custom-switch">
                                        <input class="custom-control-input" id="${this["uuid"]}activepageinfoWorkspaceSwitchListTablebtnId" name="`+ attr +`" data-uuid="` + this["uuid"] + `" type="checkbox"  `+value+` onclick="activepageinfoWorkspaceEventChangeSwitcher(this)">
                                    <label class="custom-control-label" for="${this["uuid"]}activepageinfoWorkspaceSwitchListTablebtnId"></label>
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
        var tbId = "pageinfoWorkspaceDataTableId";
        if(tableId!=null){
            tbId = tableId;
        }

        if(order==null){
        order=PAGEINFO_ID_TABLE_COUNT;
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
                    if(attr=="pageinfo-admin-action")
                    {
                        html +=`<td class="text-center d-none">
                        <a  onclick="PageInfo`+action+`DeteleRowAddingTable(this)"> &nbsp;
                            <i title="Xóa" class="fas fa-trash" onclick="PageInfo`+action+`DeteleRowAddingTable(this)"></i>&nbsp;
                                            Xóa 
                        </a></td>
                        `;
                        
                    }else
                    {
                    
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
        var card_Id = "pageinfoWorkspaceCardAreaId";
        if(cardId!=null){
            card_Id = cardId;
        }

        if(order==null){
        order=PAGEINFO_ID_TABLE_COUNT;
        }
        var card_area = $("#" + card_Id);
        if (card_area.length > 0){
            var card_template = card_area.find(".pageinfoWorkspaceTemplateCardClass");
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
                        
                        if(attr=="updated_at"){
                            $(hEle).html(GetDateOnly_V01(this[attr]))
                            continue;
                            }
                        
                        if(attr=="created_at"){
                            $(hEle).html(GetDateOnly_V01(this[attr]))
                            continue;
                            }
                        
                        if(attr=="name"){
                            $(hEle).html(`<a onclick="PageInfoWorkspaceDetails('`+this["uuid"]+`')">` + (this[attr]) + `</a>`);
                            continue;
                        }
                        $(hEle).html(`<a>` + (this[attr]) + `</a>`);

                    }
                }
                var action_button = BindActionButtonVer5(
                                PageInfoWorkspace_arr_action,
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
            
            
class PageInfoWorkspace_ListItem {
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
            

var PageInfoWorkspaceList_CACHE = [];
// ########## Get List Class ##############
class PageInfoWorkspaceList {
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
            url: PageInfoWorkspace_LIST_URL,
            type: "GET",
            async: false,
            cache: false,
            timeout: 30000,

            success: function (data) {
                PageInfoWorkspaceList_CACHE = []
                console.log(data);
                if (data.hasOwnProperty('results')){
                    for (var i = 0; i < data.results.length; i++){
                        var x = new PageInfoWorkspace_ListItem(data.results[i]);
                        PageInfoWorkspaceList_CACHE.push(x);
                    }
                }else{
                    for (var i = 0; i < data.length; i++){
                        var x = new PageInfoWorkspace_ListItem(data[i]);
                        PageInfoWorkspaceList_CACHE.push(x);
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
        return PageInfoWorkspaceList_CACHE;
    }

}

    
$(document).ready( function () {
   const pageinfoWorkspacedatatablesSimple = document.getElementById('pageinfoWorkspaceDataTableId');
    if (pageinfoWorkspacedatatablesSimple) {
        new simpleDatatables.DataTable(pageinfoWorkspacedatatablesSimple);
    }

});

$(document).ready(function(){
    $(".dt-button").addClass('btn btn-success');
});


// ########## tTest function ##############
function tTestPageInfoWorkspace(type_action=null){
    var b_json = genPageInfoWorkspace();
    console.log("b_json = ", b_json);
    // var d_obj = new PageInfoWorkspace(b_json);
    var d_obj = new PageInfoWorkspace(b_json);
    // console.log('d_obj.tCreatePostApi()...', d_obj.tCreatePostApi());
    // console.log('d_obj.tCreateNewPostFormApi()...', d_obj.tCreateNewPostFormApi());
    // console.log('d_obj.tUpdatePostApi()...', d_obj.tUpdatePostApi());
    // var d_obj = new PageInfoWorkspaceList();
    // console.log('d_obj.getListApi()...', d_obj.getListApi());
    console.log("d_obj = ", d_obj);
    if(type_action=='Edit'){

        d_obj.uuid=cr_uuid;
    }
    d_obj.tFillForm();
    console.log("Fill form done...");
}

// ########## tTest function ##############
function tTestInModalPageInfoWorkspace(type_action){
    var form_type = type_action+"Modal";
    var b_json = genPageInfoWorkspace(form_type);
    console.log("b_json = ", b_json);
    // var d_obj = new PageInfoWorkspace(b_json);
    var d_obj = new PageInfoWorkspace(b_json);
    // console.log('d_obj.tCreatePostApi()...', d_obj.tCreatePostApi());
    // console.log('d_obj.tCreateNewPostFormApi()...', d_obj.tCreateNewPostFormApi());
    // console.log('d_obj.tUpdatePostApi()...', d_obj.tUpdatePostApi());
    // var d_obj = new PageInfoWorkspaceList();
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
    $("#pageinfoWorkspaceEditBtnId").click(function(){

    })
});

    

// ########## [Search Button] Clicked Handle function ##############

$(document).ready(function(){
    $("#pageinfoWorkspaceQuickSearchInputId").on('keyup', function(e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            PageInfoWorkspacepagination={
                current_page:1,
                total:0,
                has_next:false,
                has_prev:false
            }
            PageInfoWorkspaceSearchData(PageInfoWorkspacepagination["current_page"],"quick");
        }
    })
    $("#pageinfoWorkspaceQuickSearchBtnId").click(function(){
        PageInfoWorkspacepagination={
            current_page:1,
            total:0,
            has_next:false,
            has_prev:false
        }
        PageInfoWorkspaceSearchData(PageInfoWorkspacepagination["current_page"],"quick");
    })
    $("#pageinfoWorkspaceSearchBtnId").click(function(){
        PageInfoWorkspacepagination={
            current_page:1,
            total:0,
            has_next:false,
            has_prev:false
    }
        PageInfoWorkspaceSearchData(PageInfoWorkspacepagination["current_page"],"filter");
    })
});

    

// ########## [Search Button] Clicked Handle function ##############
$(document).ready(function(){

    $("#pageinfoWorkspaceExportExcelBtnId").click(function(){
        var is_export = true;
        if(search_log["search_func"] == "PageInfoWorkspaceGetDataTable"){
                PageInfoWorkspaceGetLargeDataTable(1,search_log["search_data"],is_export,PageInfoWorkspaceExportExcel);
        }
        else if(search_log["search_func"] == "PageInfoWorkspaceSearchData"){
                PageInfoWorkspaceSearchLargeData(1,search_log["search_type"],search_log["search_data"],is_export,PageInfoWorkspaceExportExcel);
        } 
        
    })
}); 

function PageInfoWorkspaceExportExcel(){

    var table=$('#pageinfoWorkspaceExportTableId');
    var count_cols = table.find("th").length;
    if(table.find("td").length>0){
        table.tableExport({
                filename: '__pageinfo__%DD%-%MM%-%YY%',
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
    
});     

            

// ########## [Save Button] Clicked Handle function ##############

$(document).ready(function(){
    $("#pageinfoWorkspaceCreateBtnId").click(function(){
        obj = new PageInfoWorkspace();
        console.log('Save obj = ', obj);
        obj.tCreateNewPostFormApi();
    })
});

    

// ########## [Save Button] Clicked Handle function ##############

$(document).ready(function(){
    $("#pageinfoWorkspaceUpdateBtnId").click(function(){
        obj = new PageInfoWorkspace();
        console.log('Update obj = ', obj);
        obj.tUpdatePostApi('pageinfoWorkspaceEditFormId');
    })
});

    

// ########## [Create New Button] Clicked Handle function ##############
var is_continue_modal=false;
var is_continue_form=false;
$(document).ready(function(){
    $("#pageinfoWorkspaceSaveAndNewBtnId").click(function(){
        is_continue_form=true;
        obj = new PageInfoWorkspace();
        console.log('Save obj and create new, obj = ', obj);
        obj.tCreateNewPostFormApi();
    })
});

    

// ########## [Delete Button] Clicked Handle function ##############

$(document).ready(function(){
    $("#pageinfoWorkspaceDeleteBtnId").click(function(){
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
                    obj = new PageInfoWorkspace();
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
    $("#pageinfoWorkspaceCancelCreateModalBtnId").click(function(){
        $(':input','#pageinfoWorkspaceCreatemodalsId')
  .not(':button, :submit, :reset, :hidden')
  .val('')
  .removeAttr('checked')
  .removeAttr('selected');
    })
    $("#pageinfoWorkspaceCancelEditModalBtnId").click(function(){
        $(':input','#pageinfoWorkspaceEditmodalsId')
  .not(':button, :submit, :reset, :hidden')
  .val('')
  .removeAttr('checked')
  .removeAttr('selected');
    })
    $("#pageinfoWorkspaceCancelDetailModalBtnId").click(function(){
        $(':input','#pageinfoWorkspaceDetailmodalsId')
  .not(':button, :submit, :reset, :hidden')
  .val('')
  .removeAttr('checked')
  .removeAttr('selected');
    })
});

    

// ########## [Cancel Button] Clicked Handle function ##############

function PageInfoRefreshCreateModal() {
    $('#pageinfoWorkspaceCreatemodalsId')
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

$('#pageinfoWorkspaceCreatemodalsId').on('hidden.bs.modal', function (e) {
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
          var table = new pageinfoWorkspacecreateTnvTable($(this));
          table.refresh(); 
    })
       
})
$('#pageinfoWorkspaceEditmodalsId').on('hidden.bs.modal', function (e) {
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
          var table = new pageinfoWorkspaceeditTnvTable($(this));
          table.refresh(); 
    })
})
$('#pageinfoWorkspaceDetailmodalsId').on('hidden.bs.modal', function (e) {
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
          var table = new pageinfoWorkspacedetailTnvTable($(this));
          table.refresh(); 
        })
})
});

    

// ########## [Save Button] Clicked Handle function ##############

$(document).ready(function(){
    $("#pageinfoWorkspaceCreateModalBtnId").click(function(){
        var validate_obj = new InputValidation('pageinfoWorkspaceCreateModalsFormId');
        if(validate_obj.validateRequired()){
            toastr.warning('Vui lòng điền đầy đủ thông tin');
            return;
        }
        obj = new PageInfoWorkspace();
        console.log('Save obj = ', obj);
        obj.tCreateNewPostFormApi('pageinfoWorkspaceCreateModalsFormId');
    })
});

    

// ########## [Save Button] Clicked Handle function ##############

$(document).ready(function(){
    $("#pageinfoWorkspaceUpdateModalBtnId").click(function(){
        var validate_obj = new InputValidation('pageinfoWorkspaceEditModalsFormId');
        if(validate_obj.validateRequired()){
            toastr.warning('Vui lòng điền đầy đủ thông tin');
            return;

        }
        obj = new PageInfoWorkspace();
        console.log('Update obj = ', obj);
        obj.tUpdatePostApi('pageinfoWorkspaceEditModalsFormId');
    })
});

    

// ########## [Create New Button] Clicked Handle function ##############

$(document).ready(function(){
    $("#pageinfoWorkspaceSaveAndNewModalBtnId").click(function(){
        obj = new PageInfoWorkspace();
        console.log('Save obj and create new, obj = ', obj);
        is_continue_modal=true;

        obj.tCreateNewPostFormApi('pageinfoWorkspaceCreateModalsFormId');
        
    })
});

    

// ########## [Get List, push options to Select] Handle Event function ##############
function LoadPageInfoWorkspaceList(){

if ($(".pageinfo-workspace-select").length > 0){
        var obj = new PageInfoWorkspaceList();
        PageInfoWorkspaceList_CACHE = obj.getListApi();
        var crr = null;
        for (l = 0; l < PageInfoWorkspaceList_CACHE.length; l++){
            crr = PageInfoWorkspaceList_CACHE[l]
            // $(this).append(new Option(crr.name, crr.id));
            $(".pageinfo-workspace-select").append(new Option(crr.name, crr.uuid));
        }
    }
}
$(document).ready(function(){
     LoadPageInfoWorkspaceList();
})

    

// ########## [Fill Table] Handle Event function ##############
var PageInfoWorkspacepagination={
    current_page:1,
    total:0,
    has_next:false,
    has_prev:false
}
$(document).ready(function(){
    var IdTable ="pageinfoWorkspaceTableBodyId";
    var checker = $("#" +IdTable );
    if (checker.length > 0){
        if($('#'+IdTable).is(":visible")){
            PageInfoWorkspaceGetDataTable(PageInfoWorkspacepagination["current_page"]);
        }
    }
})
var record_in_page = 10;
var search_log = {
    search_func:"",
    search_data:"",
    search_type:"",
}
function PageInfoWorkspaceGetDataTable(page=1,search_data=null){
        search_log["search_func"] = "PageInfoWorkspaceGetDataTable";
        search_log["search_data"] = search_data;
        search_log["search_type"] = "";

        var obj = new PageInfoWorkspace();
        var results = obj.tGetAllObjApi(page,search_data);
        obj.callAjax.then(function(data) {
        $("#pageinfoWorkspaceTableBodyId").empty();
        var body = $("#pageinfoWorkspaceDataTableId");
        //if (body.length > 0){
        //    var bodyTable = body.DataTable();
        //    bodyTable.clear();
        //}
        PAGEINFO_ID_TABLE_COUNT = 1;
        if(page>1){
        PAGEINFO_ID_TABLE_COUNT =1+record_in_page*page-record_in_page
        }
        for (var i = 0; i < results.length; i++){
            try{
                console.log('results[i] = ', results[i]);

                //results[i].tFillTable2();
                results[i].tFillTable3();
                results[i].tFillCard();

                PAGEINFO_ID_TABLE_COUNT++;
                // results[i].tFillTable1();
            }
            catch(err){
                console.log(err);
            }
        }
        var pagenation_ele=$(".pagination-PageInfoWorkspace");
        var pagination=PageInfoWorkspacepagination;
        pagenation_ele.html('');
        var page_total_ele = $(".page-total-PageInfoWorkspace");
        page_total_ele.html(`<footer class="blockquote-footer">Tổng số: ${pagination["total"]} bản ghi </footer>`);
        if (results.length > 0) {
            
                    pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="PageInfoWorkspaceGetDataTable(1)">Đầu</a></li>`);
                    if (pagination["has_prev"] == true) {
                        pagenation_ele.append('<li class="page-item"><a class="page-link" onclick="PageInfoWorkspaceGetDataTable(' + (parseInt(pagination["current_page"]) - 1) + ')">' + (parseInt(pagination["current_page"]) - 1) + '</a></li>');
                    }
                    pagenation_ele.append('<li class="page-item active"><a class="page-link" >' + (parseInt(pagination["current_page"])) + '</a></li>');
                    if (pagination["has_next"] == true) {
                        pagenation_ele.append('<li class="page-item"><a class="page-link" onclick="PageInfoWorkspaceGetDataTable(' + (parseInt(pagination["current_page"]) + 1) + ')">' + (parseInt(pagination["current_page"]) + 1) + '</a></li>');
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
                    pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="PageInfoWorkspaceGetDataTable(`+last_page_order+`)">Cuối</a></li>`);
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
    var checker = $("#pageinfoWorkspaceFormId");
    if (checker.length > 0){
         cr_uuid = checker.attr('data-uuid');
        if (typeof cr_uuid !== 'undefined' && cr_uuid !== false){
            console.log('cr_uuid = ', cr_uuid);
            var obj = new PageInfoWorkspace();
            obj.tGetObjApi(cr_uuid);
        }
    }
    checker = $("#pageinfoWorkspaceDetailFormId");
    if (checker.length > 0){
         cr_uuid = checker.attr('data-uuid');
        if (typeof cr_uuid !== 'undefined' && cr_uuid !== false){
            console.log('cr_uuid = ', cr_uuid);
            var obj = new PageInfoWorkspace();
            obj.tGetObjApi(cr_uuid);
        }
    }
    checker = $("#pageinfoWorkspaceEditFormId");
    if (checker.length > 0){
         cr_uuid = checker.attr('data-uuid');
        if (typeof cr_uuid !== 'undefined' && cr_uuid !== false){
            console.log('cr_uuid = ', cr_uuid);
            var obj = new PageInfoWorkspace();
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
    $("#pageinfoWorkspaceTestBtnId").click(function(){
        tTestPageInfoWorkspace();
    })
     $("#pageinfoWorkspaceTestEditBtnId").click(function(){
        tTestPageInfoWorkspace('Edit');
    })
    $("#pageinfoWorkspaceTestCreateModalBtnId").click(function(){
        tTestInModalPageInfoWorkspace('Create');

    })
     $("#pageinfoWorkspaceTestEditModalBtnId").click(function(){
        tTestInModalPageInfoWorkspace('Edit');
    })
});

    
    
    // ########## [Fill Table bySearch] Handle Event function ##############
    function PageInfoWorkspaceSearchData(page=1,search_type,search_data=null){
        search_log["search_func"] = "PageInfoWorkspaceSearchData";
        search_log["search_type"] = search_type;
        search_log["search_data"] = search_data;
            var obj = new PageInfoWorkspace();
            var results = obj.tSearchAllObjApi(page,search_data,search_type);
            obj.callAjax.then(function(data) {
            $("#pageinfoWorkspaceTableBodyId").empty();
            var body = $("#pageinfoWorkspaceDataTableId");
            //if (body.length > 0){
            //    var bodyTable = body.DataTable();
            //    bodyTable.clear();
            //}
            PAGEINFO_ID_TABLE_COUNT = 1;
            if(page>1){
            PAGEINFO_ID_TABLE_COUNT =1+record_in_page*page-record_in_page;
            }
            for (var i = 0; i < results.length; i++){
                try{
                    console.log('results[i] = ', results[i]);
    
                    //results[i].tFillTable2();
                    results[i].tFillTable3();
    
                    PAGEINFO_ID_TABLE_COUNT++;
                    // results[i].tFillTable1();
                }
                catch(err){
                    console.log(err);
                }
            }
            search_type = search_type.trim()
            var pagination = PageInfoWorkspacepagination;
            var pagenation_ele=$(".pagination-PageInfoWorkspace");
            pagenation_ele.html('');
            var page_total_ele = $(".page-total-PageInfoWorkspace");
            page_total_ele.html(`<footer class="blockquote-footer">Tổng số: ${pagination["total"]} bản ghi </footer>`);
            
            if (results.length > 0) {
                    pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="PageInfoWorkspaceSearchData(1,'`+search_type+`'`+ `,'`+search_data+`'`+ `)">Đầu</a></li>`);

                    if (pagination["has_prev"] == true) {
                        pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="PageInfoWorkspaceSearchData(` + (parseInt(pagination["current_page"]) - 1) +`,'`+search_type+`'`+ `,'`+search_data+`'`+ `)">` + (parseInt(pagination["current_page"]) - 1) + `</a></li>`);
                    }
                    pagenation_ele.append('<li class="page-item active"><a class="page-link" >' + (parseInt(pagination["current_page"])) + '</a></li>');
                    if (pagination["has_next"] == true) {
                        pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="PageInfoWorkspaceSearchData(` + (parseInt(pagination["current_page"]) + 1) +`,'`+search_type+`'`+ `,'`+search_data+`'`+ `)">` + (parseInt(pagination["current_page"]) + 1) + `</a></li>`);
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
                    pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="PageInfoWorkspaceSearchData(`+last_page_order+`,'`+search_type+`'`+ `,'`+search_data+`'`+ `)">Cuối</a></li>`);
                    }
                }
                if (search_type == "quick") {
                    var crr_txt = $("#pageinfoWorkspaceQuickSearchInputId").val();
                    highlight(crr_txt,"#pageinfoWorkspaceTableBodyId");
                }
        })
    
    }
    
        
    
    // ########## [Fill Table bySearch] Handle Event function ##############
    function PageInfoWorkspaceSearchLargeData(page=1,search_type,search_data=null,is_export,ExportFunc){
            var obj = new PageInfoWorkspace();
            var tbId = "pageinfoWorkspaceExportTableId"
            var results = obj.tSearchLargeObjApi(page,search_data,search_type);
            obj.callAjax.then(function(data) {
            $("#"+tbId).find("table").empty();
            pageinfoWorkspace_ID_TABLE_COUNT = 1;
            for (var i = 0; i < results.length; i++){
                try{
                    console.log('results[i] = ', results[i]);
                    results[i].tFillTable3(tbId);
                    results[i].tFillCard();

                    pageinfoWorkspace_ID_TABLE_COUNT++;
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
    function PageInfoWorkspaceGetLargeDataTable(page=1,search_data=null,is_export,ExportFunc){
            var obj = new PageInfoWorkspace();
            var tbId = "pageinfoWorkspaceExportTableId"
            var results = obj.tGetAllObjLargeApi(page,search_data);
            obj.callAjax.then(function(data) {
            $("#"+tbId).find("table").empty();
            pageinfoWorkspace_ID_TABLE_COUNT = 1;
            for (var i = 0; i < results.length; i++){
                try{
                    console.log('results[i] = ', results[i]);
                    results[i].tFillTable3(tbId);
                    results[i].tFillCard();
                    pageinfoWorkspace_ID_TABLE_COUNT++;
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
    var PAGEINFO_ID_INLINE_TABLE_COUNT;
    function PageInfoWorkspaceFillTableInForm(page=1,search_data=null,tableId=null,action="detail"){
            var obj = new PageInfoWorkspace();
            var results = obj.tSearchLargeObjApi(page,search_data,"filter",tableId);
            obj.callAjax.then(function(data) {
                PAGEINFO_ID_INLINE_TABLE_COUNT = 1;
                if(page>1){
                PAGEINFO_ID_INLINE_TABLE_COUNT =1+10*page -10;
                }
                if(action=="detail"){
                    $("#"+tableId).find('tbody').empty();
                    for (var i = 0; i < results.length; i++){
                    try{
                        console.log('results[i] = ', results[i]);
                        results[i].tFillTable4(tableId,PAGEINFO_ID_INLINE_TABLE_COUNT,action);
                        PAGEINFO_ID_INLINE_TABLE_COUNT++;
                    }
                    catch(err){
                        console.log(err);
                    }
                    }
                }
                else if(action=="edit"){
                    var table = new pageinfoWorkspaceeditTnvTable($("#"+tableId)[0]);
                    table.bindRows(results);
                }
            })
            
    
    }
    
        