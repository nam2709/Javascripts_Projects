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
            if (items[i].hasAttribute("value") && items[i].value != null){
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
            
var genUserGroup_FIELDS = [
    'name',
        'uuid',
        'account',
        'permissions',
        'account_text',
        'permissions_text',
        'desc',
        'created_at',
        'updated_at',
    ];
function genUserGroup(){
    return {
        "uuid": uuidv4(),
        "account_text": makeid(),
        "permissions_text": makeid(),
        
        "name": makeid(),
        "desc": makeid(128),
        
        "get_permissions": makeid(),
        "get_account": makeid(),
        "created_by": genRandomSelect('created_byAUTH_USER_MODELUserGroupInputId'),
        "updated_by": genRandomSelect('updated_byAUTH_USER_MODELUserGroupInputId'),
        "updated_at": randomDate(),
        "created_at": randomDate(),
    }
}

var UserGroup_CACHE = [];

           var UserGroup_arr_action = [
        // default action
        
                    {
                    "title": "Xem chi tiết",
                    "func": "UserGroupDetails",
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
                        "func": "UserGroupEdit",
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
                        "func": "UserGroupOnDeleteEvent",
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
    
                    function UserGroupDetails(uuid){
                        $('#UserGroupDetailmodalsId').modal('toggle');
                        var obj=new UserGroup();
                        obj.tGetObjApi(uuid);
                        obj.callAjax.then(function(data) {
                            new UserGroup(data).tFillFormModal('Detail','UserGroupDetailModalsFormId');

                        })
                        //obj.tFillFormModal('Detail');

                    }
                    
                    function UserGroupEdit(uuid){
                        $('#UserGroupEditmodalsId').modal('toggle');
                        var obj=new UserGroup();
                        obj.tGetObjApi(uuid);
                        obj.callAjax.then(function(data) {
                            new UserGroup(data).tFillFormModal('Edit','UserGroupEditModalsFormId');

                        })
                        //obj.tFillFormModal('Edit');
                    }
                    
                    function UserGroupOnDeleteEvent(uuid){
                        var search_data = null;
                        try {
                            search_data = UserGroupActionsSearchData;
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
                                            confirm: {
                                                text: 'Đồng ý',
                                                btnClass: 'btn-blue',
                                                action: function() {
                                                    //noi dung xoa
                                                    var obj=new UserGroup();
                                                    obj.tDeleteApi(uuid);
                                                }
                                            },
                                            cancel: {
                                                text: 'Hủy',
                                            }
                                        }
                                });
                            
                        }
                        else { 
                            UserGroupOnDeleteWithDataSearchEvent(uuid);
                        }

                    }
                    function UserGroupOnDeleteWithDataSearchEvent(uuid){
                        $.confirm({
                        icon: 'fa fa-smile-o',
                        title: 'XÓA!',
                        content: 'Bạn có chắc muốn xóa ?!',
                        theme: 'modern',
                        closeIcon: 'cancel',
                        animation: 'scale',
                        type: 'orange',
                        buttons: {
                            confirm: {
                                text: 'Đồng ý',
                                btnClass: 'btn-blue',
                                action: function() {
                                    //noi dung xoa
                                    var obj=new UserGroup();
                                    
                                    obj.tDeleteApiWithDataSearch(uuid,UserGroupActionsSearchData);
                                }
                            },
                            cancel: {
                                text: 'Hủy',
                            }
                        }
                    });
                        
                    }
                    
    // custom func actions
            
            

                    //########## [Event] ChangeSwitcher ##############
                    
                    function is_deletedUserGroupEventChangeSwitcher($this){
                            var status="";
                            if ($($this).is(":checked")) {
                                status="hiển thị";
                                console.log($($this).attr("data-uuid")+": Check box in Checked");
                            } else {
                                status="ẩn";
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
                                confirm: {
                                    text: 'Đồng ý',
                                    btnClass: 'btn-green',
                                    action: function() {
                                        //noi dung xoa
                                        obj = new UserGroup();
                                        console.log('Update obj = ', obj);
                                        obj.tUpdateOnlyFieldApi($($this).attr("data-uuid"),$($this).attr("name"),$($this).is(":checked"))  ;
                                    }
                                },
                                cancel: {
                                    text: 'Hủy',
                                    action:function(){
                                        //tra lai trang thai ban dau

                                    $($this).prop('checked', !$($this).is(":checked"));
                            
                                    }
                                }
                            }
                        })

                    }
                    

class UserGroup{
    // ########## Init Objects ##############
    constructor(data=null){
        if (data != null){
            if (data.hasOwnProperty('uuid')){
                this.uuid = data.uuid;
            }
            else{
                this.uuid = null;
            }
    
            this.__app_name__ = "Perm";
    
            this.__model_name__ = "UserGroup";
    
            // if (data.hasOwnProperty('uuid')){
            //     this.uuid = data.uuid;
            //     this.editUrl = '/main/UserGroup/edit/' + this.uuid + '/';
            //     this.detailUrl = '/main/UserGroup/detail/' + this.uuid + '/';
            // }
            // else{
            //     // this.uuid = null;
            // }

            if (data.hasOwnProperty('name')){
                this.name = data.name;
            }
            else{
                // this.code = null;
            }


            if (data.hasOwnProperty('permissions_group_text')){
                this.permissions_group_text = data.permissions_group_text;
                this.permissions_group = this.permissions_group
            }
            else{
                // this.code = null;
            }

            // if (data.hasOwnProperty('permissions_group_text')){
            //     this.permissions_group_text = data.permissions_group_text;
            //     this.permissions_group = this.permissions_group
            // }
            // else{
            //     // this.code = null;
            // }


            if (data.hasOwnProperty('account_text')){
                this.account_text = data.account_text;
                this.account = this.account
            }
            else{
                // this.code = null;
            }
            



            // if (data.hasOwnProperty('account_text')){
            //     // this.get_account = data.get_account;
            //     this.account_text =  this.account_text
            // }
            // else{
            //     // this.title = null;
            // }

            // if (data.hasOwnProperty('permissions_text')){
            //     // this.get_permissions = data.get_permissions;
            //     this.permissions_text = this.permissions_text
            // }
            // else{
            //     // this.name = null;
            // }

            if (data.hasOwnProperty('desc')){
                this.desc = data.desc;
            }
            else{
                // this.desc = null;
            }

            if (data.hasOwnProperty('created_by')){
                this.created_by = data.created_by;
            }
            else{
                // this.created_by = null;
            }

            if (data.hasOwnProperty('updated_by')){
                this.updated_by = data.updated_by;
            }
            else{
                // this.updated_by = null;
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
            var chEle = formEle.find("#uuidUserGroupInputId");
            if (chEle.length > 0){
                this.uuid = chEle.val();
            }
            else{
                // this.uuid = null;
            }
            var chEle = formEle.find("#codeUserGroupInputId");
            if (chEle.length > 0){
                this.code = chEle.val();
            }
            else{
                // this.code = null;
            }
            var chEle = formEle.find("#titleUserGroupInputId");
            if (chEle.length > 0){
                this.title = chEle.val();
            }
            else{
                // this.title = null;
            }
            var chEle = formEle.find("#nameUserGroupInputId");
            if (chEle.length > 0){
                this.name = chEle.val();
            }
            else{
                // this.name = null;
            }
            var chEle = formEle.find("#descUserGroupInputId");
            if (chEle.length > 0){
                this.desc = chEle.val();
            }
            else{
                // this.desc = null;
            }
            var chEle = formEle.find("#is_deletedUserGroupInputId");
            if (chEle.length > 0){
                this.is_deleted = chEle.val();
            }
            else{
                // this.is_deleted = null;
            }
            var chEle = formEle.find("#permissionsUserGroupInputId");
            if (chEle.length > 0){
                this.permissions = chEle.val();
            }
            else{
                // this.permissions = null;
            }
            var chEle = formEle.find("#app_nameUserGroupInputId");
            if (chEle.length > 0){
                this.app_name = chEle.val();
            }
            else{
                // this.app_name = null;
            }
            var chEle = formEle.find("#view_nameUserGroupInputId");
            if (chEle.length > 0){
                this.view_name = chEle.val();
            }
            else{
                // this.view_name = null;
            }
            var chEle = formEle.find("#model_nameUserGroupInputId");
            if (chEle.length > 0){
                this.model_name = chEle.val();
            }
            else{
                // this.model_name = null;
            }
            var chEle = formEle.find("#menu_nameUserGroupInputId");
            if (chEle.length > 0){
                this.menu_name = chEle.val();
            }
            else{
                // this.menu_name = null;
            }
            var chEle = formEle.find("#perm_nameUserGroupInputId");
            if (chEle.length > 0){
                this.perm_name = chEle.val();
            }
            else{
                // this.perm_name = null;
            }
            var chEle = formEle.find("#unit_nameUserGroupInputId");
            if (chEle.length > 0){
                this.unit_name = chEle.val();
            }
            else{
                // this.unit_name = null;
            }
            var chEle = formEle.find("#area_nameUserGroupInputId");
            if (chEle.length > 0){
                this.area_name = chEle.val();
            }
            else{
                // this.area_name = null;
            }
            var chEle = formEle.find("#unit_codeUserGroupInputId");
            if (chEle.length > 0){
                this.unit_code = chEle.val();
            }
            else{
                // this.unit_code = null;
            }
            var chEle = formEle.find("#area_codeUserGroupInputId");
            if (chEle.length > 0){
                this.area_code = chEle.val();
            }
            else{
                // this.area_code = null;
            }
            var chEle = formEle.find("#created_byUserGroupInputId");
            if (chEle.length > 0){
                this.created_by = chEle.val();
            }
            else{
                // this.created_by = null;
            }
            var chEle = formEle.find("#updated_byUserGroupInputId");
            if (chEle.length > 0){
                this.updated_by = chEle.val();
            }
            else{
                // this.updated_by = null;
            }
            var chEle = formEle.find("#updated_atUserGroupInputId");
            if (chEle.length > 0){
                this.updated_at = chEle.val();
            }
            else{
                // this.updated_at = null;
            }
            var chEle = formEle.find("#created_atUserGroupInputId");
            if (chEle.length > 0){
                this.created_at = chEle.val();
            }
            else{
                // this.created_at = null;
            }
        }
        else{
            var chEle = $("#idUserGroupInputId");
            if (chEle.length > 0){
                this.id = chEle.val();
            }
            else{
                // this.id = null;
            }
                                var chEle = $("#uuidUserGroupInputId");
                                if (chEle.length > 0){
                                    this.uuid = chEle.val();
                                }
                                else{
                                    // this.uuid = null;
                                }
                    
                                var chEle = $("#codeUserGroupInputId");
                                if (chEle.length > 0){
                                    this.code = chEle.val();
                                }
                                else{
                                    // this.code = null;
                                }
                    
                                var chEle = $("#titleUserGroupInputId");
                                if (chEle.length > 0){
                                    this.title = chEle.val();
                                }
                                else{
                                    // this.title = null;
                                }
                    
                                var chEle = $("#nameUserGroupInputId");
                                if (chEle.length > 0){
                                    this.name = chEle.val();
                                }
                                else{
                                    // this.name = null;
                                }
                    
                                var chEle = $("#descUserGroupInputId");
                                if (chEle.length > 0){
                                    this.desc = chEle.val();
                                }
                                else{
                                    // this.desc = null;
                                }
                    
                                var chEle = $("#is_deletedUserGroupInputId");
                                if (chEle.length > 0){
                                    this.is_deleted = chEle.val();
                                }
                                else{
                                    // this.is_deleted = null;
                                }
                    
                                var chEle = $("#permissionsUserGroupInputId");
                                if (chEle.length > 0){
                                    this.permissions = chEle.val();
                                }
                                else{
                                    // this.permissions = null;
                                }
                    
                                var chEle = $("#app_nameUserGroupInputId");
                                if (chEle.length > 0){
                                    this.app_name = chEle.val();
                                }
                                else{
                                    // this.app_name = null;
                                }
                    
                                var chEle = $("#view_nameUserGroupInputId");
                                if (chEle.length > 0){
                                    this.view_name = chEle.val();
                                }
                                else{
                                    // this.view_name = null;
                                }
                    
                                var chEle = $("#model_nameUserGroupInputId");
                                if (chEle.length > 0){
                                    this.model_name = chEle.val();
                                }
                                else{
                                    // this.model_name = null;
                                }
                    
                                var chEle = $("#menu_nameUserGroupInputId");
                                if (chEle.length > 0){
                                    this.menu_name = chEle.val();
                                }
                                else{
                                    // this.menu_name = null;
                                }
                    
                                var chEle = $("#perm_nameUserGroupInputId");
                                if (chEle.length > 0){
                                    this.perm_name = chEle.val();
                                }
                                else{
                                    // this.perm_name = null;
                                }
                    
                                var chEle = $("#unit_nameUserGroupInputId");
                                if (chEle.length > 0){
                                    this.unit_name = chEle.val();
                                }
                                else{
                                    // this.unit_name = null;
                                }
                    
                                var chEle = $("#area_nameUserGroupInputId");
                                if (chEle.length > 0){
                                    this.area_name = chEle.val();
                                }
                                else{
                                    // this.area_name = null;
                                }
                    
                                var chEle = $("#unit_codeUserGroupInputId");
                                if (chEle.length > 0){
                                    this.unit_code = chEle.val();
                                }
                                else{
                                    // this.unit_code = null;
                                }
                    
                                var chEle = $("#area_codeUserGroupInputId");
                                if (chEle.length > 0){
                                    this.area_code = chEle.val();
                                }
                                else{
                                    // this.area_code = null;
                                }
                    
                                var chEle = $("#created_byUserGroupInputId");
                                if (chEle.length > 0){
                                    this.created_by = chEle.val();
                                }
                                else{
                                    // this.created_by = null;
                                }
                    
                                var chEle = $("#updated_byUserGroupInputId");
                                if (chEle.length > 0){
                                    this.updated_by = chEle.val();
                                }
                                else{
                                    // this.updated_by = null;
                                }
                    
                                var chEle = $("#updated_atUserGroupInputId");
                                if (chEle.length > 0){
                                    var date = moment(chEle.val(), 'DD/MM/YYYY');
                                    this.updated_at=toDatePython(new Date(date))
                                }
                                else{
                                    // this.updated_at = null;
                                }
                    
                                var chEle = $("#created_atUserGroupInputId");
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
                var j_ele_uuid = $("#uuidUserGroupInputId");
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
                var j_ele_code = $("#codeUserGroupInputId");
                if (j_ele_code.length > 0){
                    if (j_ele_code.attr('name') != 'uuid'){
                        j_ele_code.val(self.code).change();
                    }
                }
                else{
                    // j_ele_code.val(null);
                }
            }
            catch(err) {
                console.log('err = ', err);
            }

            try{
                var j_ele_title = $("#titleUserGroupInputId");
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
                var j_ele_name = $("#nameUserGroupInputId");
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
                var j_ele_desc = $("#descUserGroupInputId");
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
                var j_ele_is_deleted = $("#is_deletedUserGroupInputId");
                if (j_ele_is_deleted.length > 0){
                    if (j_ele_is_deleted.attr('name') != 'uuid'){
                        j_ele_is_deleted.val(self.is_deleted).change();
                    }
                }
                else{
                    // j_ele_is_deleted.val(null);
                }
            }
            catch(err) {
                console.log('err = ', err);
            }

            try{
                var j_ele_permissions = $("#permissionsPermissionNamePermUserGroupInputId");
                if (j_ele_permissions.length > 0){
                    if (j_ele_permissions.attr('name') != 'uuid'){
                        j_ele_permissions.val(self.permissions).change();
                    }
                }
                else{
                    // j_ele_permissions.val(null);
                }
            }
            catch(err) {
                console.log('err = ', err);
            }

            try{
                var j_ele_app_name = $("#app_nameUserGroupInputId");
                if (j_ele_app_name.length > 0){
                    if (j_ele_app_name.attr('name') != 'uuid'){
                        j_ele_app_name.val(self.app_name).change();
                    }
                }
                else{
                    // j_ele_app_name.val(null);
                }
            }
            catch(err) {
                console.log('err = ', err);
            }

            try{
                var j_ele_view_name = $("#view_nameUserGroupInputId");
                if (j_ele_view_name.length > 0){
                    if (j_ele_view_name.attr('name') != 'uuid'){
                        j_ele_view_name.val(self.view_name).change();
                    }
                }
                else{
                    // j_ele_view_name.val(null);
                }
            }
            catch(err) {
                console.log('err = ', err);
            }

            try{
                var j_ele_model_name = $("#model_nameUserGroupInputId");
                if (j_ele_model_name.length > 0){
                    if (j_ele_model_name.attr('name') != 'uuid'){
                        j_ele_model_name.val(self.model_name).change();
                    }
                }
                else{
                    // j_ele_model_name.val(null);
                }
            }
            catch(err) {
                console.log('err = ', err);
            }

            try{
                var j_ele_menu_name = $("#menu_nameUserGroupInputId");
                if (j_ele_menu_name.length > 0){
                    if (j_ele_menu_name.attr('name') != 'uuid'){
                        j_ele_menu_name.val(self.menu_name).change();
                    }
                }
                else{
                    // j_ele_menu_name.val(null);
                }
            }
            catch(err) {
                console.log('err = ', err);
            }

            try{
                var j_ele_perm_name = $("#perm_nameUserGroupInputId");
                if (j_ele_perm_name.length > 0){
                    if (j_ele_perm_name.attr('name') != 'uuid'){
                        j_ele_perm_name.val(self.perm_name).change();
                    }
                }
                else{
                    // j_ele_perm_name.val(null);
                }
            }
            catch(err) {
                console.log('err = ', err);
            }

            try{
                var j_ele_unit_name = $("#unit_nameUserGroupInputId");
                if (j_ele_unit_name.length > 0){
                    if (j_ele_unit_name.attr('name') != 'uuid'){
                        j_ele_unit_name.val(self.unit_name).change();
                    }
                }
                else{
                    // j_ele_unit_name.val(null);
                }
            }
            catch(err) {
                console.log('err = ', err);
            }

            try{
                var j_ele_area_name = $("#area_nameUserGroupInputId");
                if (j_ele_area_name.length > 0){
                    if (j_ele_area_name.attr('name') != 'uuid'){
                        j_ele_area_name.val(self.area_name).change();
                    }
                }
                else{
                    // j_ele_area_name.val(null);
                }
            }
            catch(err) {
                console.log('err = ', err);
            }

            try{
                var j_ele_unit_code = $("#unit_codeUserGroupInputId");
                if (j_ele_unit_code.length > 0){
                    if (j_ele_unit_code.attr('name') != 'uuid'){
                        j_ele_unit_code.val(self.unit_code).change();
                    }
                }
                else{
                    // j_ele_unit_code.val(null);
                }
            }
            catch(err) {
                console.log('err = ', err);
            }

            try{
                var j_ele_area_code = $("#area_codeUserGroupInputId");
                if (j_ele_area_code.length > 0){
                    if (j_ele_area_code.attr('name') != 'uuid'){
                        j_ele_area_code.val(self.area_code).change();
                    }
                }
                else{
                    // j_ele_area_code.val(null);
                }
            }
            catch(err) {
                console.log('err = ', err);
            }

            try{
                var j_ele_created_by = $("#created_byAUTH_USER_MODELUserGroupInputId");
                if (j_ele_created_by.length > 0){
                    if (j_ele_created_by.attr('name') != 'uuid'){
                        j_ele_created_by.val(self.created_by).change();
                    }
                }
                else{
                    // j_ele_created_by.val(null);
                }
            }
            catch(err) {
                console.log('err = ', err);
            }

            try{
                var j_ele_updated_by = $("#updated_byAUTH_USER_MODELUserGroupInputId");
                if (j_ele_updated_by.length > 0){
                    if (j_ele_updated_by.attr('name') != 'uuid'){
                        j_ele_updated_by.val(self.updated_by).change();
                    }
                }
                else{
                    // j_ele_updated_by.val(null);
                }
            }
            catch(err) {
                console.log('err = ', err);
            }

            try{
                var j_ele_updated_at = $("#updated_atUserGroupInputId");
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
                var j_ele_created_at = $("#created_atUserGroupInputId");
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
                var j_ele_uuid = $("#uuidUserGroup"+apart+"InputId");
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
                var j_ele_name = $("#nameUserGroup"+apart+"InputId");
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
                var j_ele_desc = $("#descUserGroup"+apart+"InputId");
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
                var j_ele_permissions_group_text = $("#permissionUserGroup"+apart+"InputId");
                if (j_ele_permissions_group_text.length > 0){
                    if (j_ele_permissions_group_text.attr('name') != 'uuid'){
                        j_ele_permissions_group_text.val(self.permissions_group_text).change();
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
                var j_ele_account_text = $("#accountUserGroup"+apart+"InputId");
                if (j_ele_account_text.length > 0){
                    if (j_ele_account_text.attr('name') != 'uuid'){
                        j_ele_account_text.val(self.account_text).change();
                    }
                }
                else{
                    // j_ele_desc.val(null);
                }
            }
            catch(err) {
                console.log('err = ', err);
            } 
            // try{
            //     var j_ele_permissions_text = $("#permissionUserGroup"+apart+"InputId");
            //     if (j_ele_permissions_text.length > 0){
            //         var arr_value=[];
            //         for(var i in self["permissions_text"]){
            //             arr_value.push(self["permissions_text"]);
            //         }
            //         j_ele_permissions_text.val(arr_value).change();
            //     }
            //     else{
            //         // j_ele_permissions.val(null);
            //     }
            // }
            // catch(err) {
            //     console.log('err = ', err);
            // }
            // try{
            //     var j_ele_permissions = $("#accountUserGroup"+apart+"InputId");
            //     if (j_ele_permissions.length > 0){
            //         var arr_value=[];
            //         for(var i in self["account_text"]){
            //             arr_value.push(self["account_text"][i]["id"]);
            //         }
            //         j_ele_permissions.val(arr_value).change();
            //     }
            //     else{
            //         // j_ele_permissions.val(null);
            //     }
            // }
            // catch(err) {
            //     console.log('err = ', err);
            // }



                try{
                    var j_ele_created_by = $("#created_byAUTH_USER_MODELUserGroup"+apart+"InputId");
                    if (j_ele_created_by.length > 0){
                        var value=self["created_by"]["username"];
                        j_ele_created_by.val(value).change();
                    }
                    else{
                        // j_ele_created_by.val(null);
                    }
                }
                catch(err) {
                    console.log('err = ', err);
                }

                try{
                    var j_ele_updated_by = $("#updated_byAUTH_USER_MODELUserGroup"+apart+"InputId");
                    if (j_ele_updated_by.length > 0){
                        var value=self["updated_by"]["username"];
                        j_ele_updated_by.val(value).change();
                    }
                    else{
                        // j_ele_updated_by.val(null);
                    }
                }
                catch(err) {
                    console.log('err = ', err);
                }

            try{
                var j_ele_updated_at = $("#updated_atUserGroup"+apart+"InputId");
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
                var j_ele_created_at = $("#created_atUserGroup"+apart+"InputId");
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
            url: UserGroup_URL,
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
                    self = new UserGroup(data);
                    UserGroupGetDataTable(UserGrouppagination["current_page"]);
                    if(is_continue_form){
                        is_continue_form=false;
                        notyf.success('Thêm mới thành công');
                        $(location).prop('href', "/main/UserGroup/create/");
                        

                    }else if(is_continue_modal){
                        is_continue_modal=false;
                        UserGroupRefreshCreateModal();
                        notyf.success('Thêm mới thành công');
                    }else{
                        $('.modal').modal('hide');
                    //    $.confirm({
                    //    title: 'THÀNH CÔNG',
                    //    content: 'Thêm mới thành công!',
                    //    buttons: {
                    //        NewOther:{
                     //           text: 'Thêm mới',
                    //            btnClass: 'btn-blue',
                    //            keys: ['enter', 'shift'],
                    //            action: function(){
                    //                $(location).prop('href', "/main/UserGroup/create/");
                    //            }
                    //        },
                    //        Show:{
                    //            text: 'Chi tiết',
                    //            action: function(){
                    //                $(location).prop('href', "/main/UserGroup/detail/" + self.uuid + "/");
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
         formData = new FormData($('#UserGroupCreateFormId')[0]);

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
                                    currency_value = currency_value.replaceAll(".", "");
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
        
        var file_eles = $(".UserGroup-mainmanagement");
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
                url: UserGroup_URL + self.uuid + "/",
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
                        self = new UserGroup(data);
                        
                        UserGroupGetDataTable(UserGrouppagination["current_page"])
                        //$(location).prop('href', "/main/UserGroup/detail/" + self.uuid + "/");
                        if(is_continue_form){
                            is_continue_form=false;
                            if(!is_notification && (is_done||!is_has_children)){
                                is_notification = true;
                                notyf.success('Cập nhật thành công');
                            }
                            $(location).prop('href', "/main/UserGroup/create/");
                        }else if(is_continue_modal){
                            is_continue_modal=false;
                            UserGroupRefreshCreateModal();
                            if(!is_notification && (is_done||!is_has_children)){
                                is_notification = true;
                                notyf.success('Cập nhật thành công');
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
                    notyf.success('Cập nhật thành công');
                }
                    $(location).prop('href', "/main/UserGroup/create/");
            }else if(is_continue_modal){
                is_continue_modal=false;
                UserGroupRefreshCreateModal();
                if(!is_notification && (is_done||!is_has_children)){
                    is_notification = true;
                    notyf.success('Cập nhật thành công');
                }
            }else{
                $('.modal').modal('hide');
                if(!is_notification && (is_done||!is_has_children)){
                    is_notification = true;
                    notyf.success('Cập nhật thành công');
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
        $('#idUserGroupInputId').val(null);
        $('#uuidUserGroupInputId').val(uuidv4());
        var self = this;
        var formData;
        var arr_table = [];
        if(formId==null){
         formData = new FormData($('#UserGroupCreateFormId')[0]);

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
                                    currency_value = currency_value.replaceAll(".", "");
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
        
        var file_eles = $(".UserGroup-mainmanagement");
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
        if(!is_save_self_table){
                $.ajax({
                url: UserGroup_URL,
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
                        self = new UserGroup(data);
                        UserGroupGetDataTable(UserGrouppagination["current_page"]);
                        if(is_continue_form){
                            is_continue_form=false;
                            if(!is_notification){
                                is_notification = true;
                                notyf.success('Thêm mới thành công');
                            }
                            

                            $(location).prop('href', "/main/UserGroup/create/");
                        }else if(is_continue_modal){
                            is_continue_modal=false;
                            UserGroupRefreshCreateModal();
                            if(!is_notification){
                                is_notification = true;
                                notyf.success('Thêm mới thành công');
                            }
                        }else{
                            if(!is_notification){
                                is_notification = true;
                                notyf.success('Thêm mới thành công');
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
                    notyf.success('Thêm mới thành công');
                }
                // $(location).prop('href', "/main/UserGroup/create/");
            }else if(is_continue_modal){
                is_continue_modal=false;
                UserGroupRefreshCreateModal();
                if(!is_notification){
                    is_notification = true;
                    notyf.success('Thêm mới thành công');
                }
            }else{
                if(!is_notification){
                    is_notification = true;
                    notyf.success('Thêm mới thành công');
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
                                currency_value = currency_value.replaceAll(".", "");
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
            url: UserGroup_URL,
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
                    notyf.success('Thêm mới thành công');
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
                
                // ########## [ROW] [UPDATE] POST OBJ TO REST API --> return object if success ##############
                tUpdateNewPostRowApi($this,form_data_parent=null,is_notice=false){
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
                                    currency_value = currency_value.replaceAll(".", "");
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
                        url: UserGroup_URL + uuid + "/",
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
                            notyf.success('Cập nhật thành công');
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
            url: UserGroup_URL + uuid_go + "/",
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
                notyf.success('Xóa thành công');
                UserGroupGetDataTable(UserGrouppagination["current_page"]);
                if(cr_uuid!=""){
                    $(location).prop('href', "/main/UserGroup/create/");
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
            url: UserGroup_URL + uuid_go + "/",
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
                notyf.success('Xóa thành công');
                UserGroupSearchData(UserGrouppagination["current_page"],"filter",data_search);
                if(cr_uuid!=""){
                    $(location).prop('href', "/main/UserGroup/create/");
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
            url: UserGroup_REMOVEFILE_URL+uuid+"/",
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
                notyf.success('Đã xóa tập đính kèm!');
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
                
    tUpdateOnlyFieldApi(uuid = null,attr_name,attr_value) {
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
            url: UserGroup_URL+uuid+"/",
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
                notyf.success('Cập nhật thành công!');
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
            url: UserGroup_URL+has_go_page,
            type: "GET",
            //async: false,
            cache: false,
            timeout: 30000,

            success: function (data) {
                console.log('[tGetAllObjApi] data = ', data);
                // return new UserGroup(data);
                if (data.hasOwnProperty('count')){
                    UserGrouppagination["total"]=data.count;
                }
                if (data.hasOwnProperty('count')){
                    UserGrouppagination["total"]=data.count;
                }
                if (data.hasOwnProperty('next')){
                    if(data.next != null){
                    UserGrouppagination["has_next"]=true;
                    }else{
                    UserGrouppagination["has_next"]=false;

                    }
                }
                UserGrouppagination["current_page"]=page;
                if (data.hasOwnProperty('previous')){
                    if(data.previous != null){
                    UserGrouppagination["has_prev"]=true;
                    }else{
                    UserGrouppagination["has_prev"]=false;
                    }
                }
                if (data.hasOwnProperty('results')){
                    for (var j=0; j < data.results.length; j++){
                        var tmp = new UserGroup(data.results[j]);
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
            SEARCH_URL=UserGroup_FILTER_URL;
            
                slugSearch="&";
            
                                
                                
                                if($("#nameUserGroupFilterSearchInputId").length>0
                                    ||$("#accountUserGroupFilterSearchInputId").length>0){
                                      var value_name=$("#nameUserGroupFilterSearchInputId").val();
                                      var value_account=$("#accountUserGroupFilterSearchInputId").val();
                                      if((value_name!="" ) ||(value_account!="" )  ){
                                           slugSearch+="name__contains="+value_name+"&account="+value_account;
                                      }
                                  }
                            
                            
                                
                            slugSearch=slugSearch.slice(0, -1);
        }else{
            SEARCH_URL=UserGroup_SEARCH_URL;
            
                slugSearch="&";
                slugSearch+="search="+$("#UserGroupQuickSearchInputId").val();
            
        }
        if(search_data!=null){
            SEARCH_URL=UserGroup_FILTER_URL;
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
                // return new UserGroup(data);
                if (data.hasOwnProperty('count')){
                    UserGrouppagination["total"]=data.count;
                }
                if (data.hasOwnProperty('count')){
                    UserGrouppagination["total"]=data.count;
                }
                if (data.hasOwnProperty('next')){
                    if(data.next != null){
                    UserGrouppagination["has_next"]=true;
                    }else{
                    UserGrouppagination["has_next"]=false;

                    }
                }
                UserGrouppagination["current_page"]=page;
                if (data.hasOwnProperty('previous')){
                    if(data.previous != null){
                    UserGrouppagination["has_prev"]=true;
                    }else{
                    UserGrouppagination["has_prev"]=false;
                    }
                }
                if (data.hasOwnProperty('results')){
                    for (var j=0; j < data.results.length; j++){
                        var tmp = new UserGroup(data.results[j]);
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
            SEARCH_URL=UserGroup_LARGE_FILTER_URL;
            
                slugSearch="&";
            
                                if($("#titleUserGroupFilterSearchInputId").length>0){
                                    var value=$("#titleUserGroupFilterSearchInputId").val();
                                    if(value!="" && value!=null){
                                        slugSearch+="title__contains="+value+"&";
                                    }
                                }
                                
                            
                                if($("#nameUserGroupFilterSearchInputId").length>0){
                                    var value=$("#nameUserGroupFilterSearchInputId").val();
                                    if(value!="" && value!=null){
                                        slugSearch+="name__contains="+value+"&";
                                    }
                                }
                                
                            
                                if($("#is_deletedUserGroupFilterSearchInputId").length>0){
                                    var value=$("#is_deletedUserGroupFilterSearchInputId").val();
                                    if(value!="" && value!=null){
                                        slugSearch+="is_deleted__contains="+value+"&";
                                    }
                                }
                                
                            slugSearch=slugSearch.slice(0, -1);
        }else{
            SEARCH_URL=UserGroup_SEARCH_URL;
            
                slugSearch="&";
                slugSearch+="search="+$("#UserGroupQuickSearchInputId").val();
            
        }
        if(search_data!=null){
            SEARCH_URL=UserGroup_LARGE_FILTER_URL;
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
                // return new UserGroup(data);
                if (data.hasOwnProperty('count')){
                    UserGrouppagination["total"]=data.count;
                }
                if (data.hasOwnProperty('count')){
                    UserGrouppagination["total"]=data.count;
                }
                if (data.hasOwnProperty('next')){
                    if(data.next != null){
                    UserGrouppagination["has_next"]=true;
                    }else{
                    UserGrouppagination["has_next"]=false;

                    }
                }
                UserGrouppagination["current_page"]=page;
                if (data.hasOwnProperty('previous')){
                    if(data.previous != null){
                    UserGrouppagination["has_prev"]=true;
                    }else{
                    UserGrouppagination["has_prev"]=false;
                    }
                }
                if (data.hasOwnProperty('results')){
                    for (var j=0; j < data.results.length; j++){
                        var tmp = new UserGroup(data.results[j]);
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
            url: UserGroup_URL + uuid + "/",
            type: "GET",
            async: false,
            cache: false,
            timeout: 30000,

            success: function (data) {
                console.log('[tGetObjApi] data = ', data);
                var n_obj = new UserGroup(data);
                console.log('n_obj = ', n_obj);
                n_obj.tFillForm();
                return n_obj;
                // if (data.hasOwnProperty('results')){
                //    if (data.results.length > 0){
                //        var tmp = new UserGroup(data[i]);
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
        var tbId = "UserGroupDataTableId";
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
        var tbId = "UserGroupDataTableId";
        var table = $("#" + tbId);
        if (table.length > 0){
            var tableData = table.DataTable();
            var rowData = [
                `<a href="` + this.detailUrl + `">` + UserGroup_ID_TABLE_COUNT + `</a>`,
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
        var tbId = "UserGroupDataTableId";
        if(tableId!=null){
            tbId = tableId;
        }

        if(order==null){
        order=UserGroup_ID_TABLE_COUNT;
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
                    
                        if(attr=="is_deleted"){
                            var value="";
                            if(this[attr] || this[attr]=="true"){
                                value="checked";
                            }
                            html +=`<td class="text-center">
                                    <div class="form-check form-switch">
                                        <input class="form-check-input" name="`+ attr +`" data-uuid="` + this["uuid"] + `" type="checkbox"  `+value+` onclick="is_deletedUserGroupEventChangeSwitcher(this)">
                                    </div></td>`;
                                continue;
                            }
                        
                        if(attr=="permissions"){
                            var all_name="";
                            for(var i in this[attr]){
                                var name = this[attr][i]["name"];
                                if (name == undefined){
                                    name = ""
                                }
                                all_name+= name+",";
                            }
                            html +=`<td class="text-wrap"><a>` + all_name + `</a></td>`;
                                continue;
                            }
                        
                        if(attr=="created_by"){
                            
                            var name=this[attr]["username"];
                            if (name == undefined){
                                name = "-"
                            }

                            html +=`<td class="text-wrap"><a>` + name + `</a></td>`;
                            
                            continue;
                        }
                        
                        if(attr=="updated_by"){
                            
                            var name=this[attr]["username"];
                            if (name == undefined){
                                name = "-"
                            }

                            html +=`<td class="text-wrap"><a>` + name + `</a></td>`;
                            
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
                        html +=`<td class="text-wrap" style="min-width:300px" onclick="UserGroupDetails('`+this["uuid"]+`')"><a>` + (this[attr]) + `</a></td>`;
                            continue;
                    }
                    //html +=`<td class="text-wrap"><a>` + (this[attr]) + `</a></td>`;
                    html +=`<td class="text-wrap"><a>` + (this[attr]) + `</a></td>`;
                }
                
                else{
                    if(attr=="UserGroup-admin-action")
                    {
                        html +=BindActionButtonVer4(
                            UserGroup_arr_action,
                            this['uuid'],
                            this,
                            null,
                            this['created_by'],
                        );
                    }else
                    {
                        
                        if(attr=="is_deleted"){
                            var value="";
                            if(this[attr] || this[attr]=="true"){
                                value="checked";
                            }
                            html +=`<td class="text-center">
                                    <div class="form-check form-switch">
                                        <input class="form-check-input" name="`+ attr +`" data-uuid="` + this["uuid"] + `" type="checkbox"  `+value+` onclick="is_deletedUserGroupEventChangeSwitcher(this)">
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
        var tbId = "UserGroupDataTableId";
        if(tableId!=null){
            tbId = tableId;
        }

        if(order==null){
        order=UserGroup_ID_TABLE_COUNT;
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
                    
                        if(attr=="is_deleted"){
                            var value="";
                            if(this[attr] || this[attr]=="true"){
                                value="checked";
                            }
                            html +=`<td>
                                    <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox"  `+value+` disabled>
                                    </div></td>`;
                                continue;
                            }
                        
                        if(attr=="permissions"){
                            var all_name="";
                            for(var i in this[attr]){
                                var name = this[attr][i]["name"];
                                if (name == undefined){
                                    name = ""
                                }
                                all_name+= name+",";
                            }
                            
                            html +=`<td class="text-wrap"><a>` + all_name + `</a></td>`;
                                continue;
                            }
                        
                        if(attr=="created_by"){
                            
                            var name=this[attr]["username"];
                            if (name == undefined){
                                    name = "-"
                                }
                            html +=`<td class="text-wrap"><a>` + name + `</a></td>`;
                            
                            continue;
                        }
                        
                        if(attr=="updated_by"){
                            
                            var name=this[attr]["username"];
                            if (name == undefined){
                                    name = "-"
                                }
                            html +=`<td class="text-wrap"><a>` + name + `</a></td>`;
                            
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
                    if(attr=="UserGroup-admin-action")
                    {
                        html +=`<td class="text-center d-none">
                        <a  onclick="UserGroup`+action+`DeteleRowAddingTable(this)"> &nbsp;
                            <i title="Xóa" class="fas fa-trash" onclick="UserGroup`+action+`DeteleRowAddingTable(this)"></i>&nbsp;
                                            Xóa 
                        </a></td>
                        `;
                        
                    }else
                    {
                    
                        if(attr=="is_deleted"){
                            var value="";
                            if(this[attr] || this[attr]=="true"){
                                value="checked";
                            }
                            html +=`<td>
                                    <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox"  `+value+` disabled>
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
            
}
                
class UserGroup_ListItem {
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
            

var UserGroupList_CACHE = [];
// ########## Get List Class ##############
class UserGroupList {
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
            url: UserGroup_LIST_URL,
            type: "GET",
            async: false,
            cache: false,
            timeout: 30000,

            success: function (data) {
                UserGroupList_CACHE = []
                console.log(data);
                if (data.hasOwnProperty('results')){
                    for (var i = 0; i < data.results.length; i++){
                        var x = new UserGroup_ListItem(data.results[i]);
                        UserGroupList_CACHE.push(x);
                    }
                }else{
                    for (var i = 0; i < data.length; i++){
                        var x = new UserGroup_ListItem(data[i]);
                        UserGroupList_CACHE.push(x);
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
        return UserGroupList_CACHE;
    }

}

    
$(document).ready( function () {
   // var UserGroupDataTable = $('#UserGroupDataTableId').DataTable({
   //     dom: '<"btn-tools"B><"top"lf>rt<"bottom"ip><"clear">',
   //     buttons: [
   //         'copyHtml5',
   //         'print',
   //         'excelHtml5',
   //         'csvHtml5',
   //         'pdfHtml5',
   //         {
   //             text: 'Reload',
   //             attr: {
   //                 id: 'reloadEnvParametersTableId',
   //                 class: 'btn btn-success',
   //             },
   //             action: function ( e, dt, node, config ) {
   //                 var r = confirm("Reload data again...!");
   //                 if (r == true) {
   //                   configParaTable.ajax.reload( null, false );
   //                 } else {
   //                   console.log('Canceled...');
   //                 };
   //             }
   //         },
   //     ]
   // } );

});

$(document).ready(function(){
    $(".dt-button").addClass('btn btn-success');
});


// ########## tTest function ##############
function tTestUserGroup(type_action=null){
    var b_json = genUserGroup();
    console.log("b_json = ", b_json);
    // var d_obj = new UserGroup(b_json);
    var d_obj = new UserGroup(b_json);
    // console.log('d_obj.tCreatePostApi()...', d_obj.tCreatePostApi());
    // console.log('d_obj.tCreateNewPostFormApi()...', d_obj.tCreateNewPostFormApi());
    // console.log('d_obj.tUpdatePostApi()...', d_obj.tUpdatePostApi());
    // var d_obj = new UserGroupList();
    // console.log('d_obj.getListApi()...', d_obj.getListApi());
    console.log("d_obj = ", d_obj);
    if(type_action=='Edit'){

        d_obj.uuid=cr_uuid;
    }
    d_obj.tFillForm();
    console.log("Fill form done...");
}

// ########## tTest function ##############
function tTestInModalUserGroup(type_action){
    var b_json = genUserGroup();
    console.log("b_json = ", b_json);
    // var d_obj = new UserGroup(b_json);
    var d_obj = new UserGroup(b_json);
    // console.log('d_obj.tCreatePostApi()...', d_obj.tCreatePostApi());
    // console.log('d_obj.tCreateNewPostFormApi()...', d_obj.tCreateNewPostFormApi());
    // console.log('d_obj.tUpdatePostApi()...', d_obj.tUpdatePostApi());
    // var d_obj = new UserGroupList();
    // console.log('d_obj.getListApi()...', d_obj.getListApi());
    console.log("d_obj = ", d_obj);
    if(type_action=='Edit'){

        d_obj.uuid=null;
    }
    d_obj.tFillFormModal(type_action);
    console.log("Fill form done...");
}
$(document).ready(function(){

});

    

// ########## [Edit Button] Clicked Handle function ##############

$(document).ready(function(){
    $("#UserGroupEditBtnId").click(function(){

    })
});

    

// ########## [Search Button] Clicked Handle function ##############

$(document).ready(function(){
    $("#UserGroupQuickSearchBtnId").click(function(){
        UserGrouppagination={
            current_page:1,
            total:0,
            has_next:false,
            has_prev:false
        }
        UserGroupSearchData(UserGrouppagination["current_page"],"quick");
    })
    $("#UserGroupSearchBtnId").click(function(){
        UserGrouppagination={
            current_page:1,
            total:0,
            has_next:false,
            has_prev:false
    }
        UserGroupSearchData(UserGrouppagination["current_page"],"filter");
    })
});

    

// ########## [Search Button] Clicked Handle function ##############
$(document).ready(function(){

    $("#UserGroupExportExcelBtnId").click(function(){
        var table=$('#UserGroupDataTableId');
        var count_cols = table.find("th").length;
        if(table.find("td").length>0){
            table.tableExport({
                    filename: 'UserGroup_%DD%-%MM%-%YY%',
                    format: 'xls',
                    excludeCols: count_cols.toString(),
                    onbefore: function() {
                        notyf.success('Bắt đầu xuất Excel!');
                    },
                    onafter: function() {
                        notyf.success('Xuất Excel thành công!');
                    },
            });
        }
        else{
            notyf.error('Không có dữ liệu!');
        }
    })
});     




            

// ########## [Save Button] Clicked Handle function ##############

$(document).ready(function(){
    $("#UserGroupCreateBtnId").click(function(){
        obj = new UserGroup();
        console.log('Save obj = ', obj);
        obj.tCreateNewPostFormApi();
    })
});

    

// ########## [Save Button] Clicked Handle function ##############

$(document).ready(function(){
    $("#UserGroupUpdateBtnId").click(function(){
        obj = new UserGroup();
        console.log('Update obj = ', obj);
        obj.tUpdatePostApi('UserGroupEditFormId');
    })
});

    

// ########## [Create New Button] Clicked Handle function ##############
var is_continue_modal=false;
var is_continue_form=false;
$(document).ready(function(){
    $("#UserGroupSaveAndNewBtnId").click(function(){
        is_continue_form=true;
        obj = new UserGroup();
        console.log('Save obj and create new, obj = ', obj);
        obj.tCreateNewPostFormApi();
    })
});

    

// ########## [Delete Button] Clicked Handle function ##############

$(document).ready(function(){
    $("#UserGroupDeleteBtnId").click(function(){
        $.confirm({
        icon: 'fa fa-smile-o',
        title: 'XÓA!',
        content: 'Bạn có chắc muốn xóa ?!',
        theme: 'modern',
        closeIcon: 'cancel',
        animation: 'scale',
        type: 'orange',
        buttons: {
            confirm: {
                text: 'Đồng ý',
                btnClass: 'btn-blue',
                action: function() {
                    //noi dung xoa
                    obj = new UserGroup();
                    console.log('Delete obj = ', obj);
                    obj.tDeleteApi();
                }
            },
            cancel: {
                text: 'Hủy',
            }
        }
    })
});
})

    

// ########## [Cancel Button] Clicked Handle function ##############

$(document).ready(function(){
    $("#UserGroupCancelCreateModalBtnId").click(function(){
        $(':input','#UserGroupCreatemodalsId')
  .not(':button, :submit, :reset, :hidden')
  .val('')
  .removeAttr('checked')
  .removeAttr('selected');
    })
    $("#UserGroupCancelEditModalBtnId").click(function(){
        $(':input','#UserGroupEditmodalsId')
  .not(':button, :submit, :reset, :hidden')
  .val('')
  .removeAttr('checked')
  .removeAttr('selected');
    })
    $("#UserGroupCancelDetailModalBtnId").click(function(){
        $(':input','#UserGroupDetailmodalsId')
  .not(':button, :submit, :reset, :hidden')
  .val('')
  .removeAttr('checked')
  .removeAttr('selected');
    })
});

    

// ########## [Cancel Button] Clicked Handle function ##############

function UserGroupRefreshCreateModal() {
    $('#UserGroupCreatemodalsId')
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

$('#UserGroupCreatemodalsId').on('hidden.bs.modal', function (e) {
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
          var table = new UserGroupcreateTnvTable($(this));
          table.refresh(); 
    })
       
})
$('#UserGroupEditmodalsId').on('hidden.bs.modal', function (e) {
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
          var table = new UserGroupeditTnvTable($(this));
          table.refresh(); 
    })
})
$('#UserGroupDetailmodalsId').on('hidden.bs.modal', function (e) {
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
          var table = new UserGroupdetailTnvTable($(this));
          table.refresh(); 
        })
})
});

    

// ########## [Save Button] Clicked Handle function ##############

$(document).ready(function(){
    $("#UserGroupCreateModalBtnId").click(function(){
        var validate_obj = new InputValidation('UserGroupCreateModalsFormId');
        if(validate_obj.validateRequired()){
            notyf.error('Vui lòng điền đầy đủ thông tin');
            return;
        }
        obj = new UserGroup();
        console.log('Save obj = ', obj);
        obj.tCreateNewPostFormApi('UserGroupCreateModalsFormId');
    })
});

    

// ########## [Save Button] Clicked Handle function ##############

$(document).ready(function(){
    $("#UserGroupUpdateModalBtnId").click(function(){
        var validate_obj = new InputValidation('UserGroupEditModalsFormId');
        if(validate_obj.validateRequired()){
            notyf.error('Vui lòng điền đầy đủ thông tin');
            return;

        }
        obj = new UserGroup();
        console.log('Update obj = ', obj);
        obj.tUpdatePostApi('UserGroupEditModalsFormId');
    })
});

    

// ########## [Create New Button] Clicked Handle function ##############

$(document).ready(function(){
    $("#UserGroupSaveAndNewModalBtnId").click(function(){
        obj = new UserGroup();
        console.log('Save obj and create new, obj = ', obj);
        is_continue_modal=true;

        obj.tCreateNewPostFormApi('UserGroupCreateModalsFormId');
        
    })
});

    

// ########## [Get List, push options to Select] Handle Event function ##############

$(document).ready(function(){
    if ($(".UserGroup-mainmanagement-select").length > 0){
        var obj = new UserGroupList();
        UserGroupList_CACHE = obj.getListApi();
        var crr = null;
        for (l = 0; l < UserGroupList_CACHE.length; l++){
            crr = UserGroupList_CACHE[l]
            // $(this).append(new Option(crr.name, crr.id));
            $(".UserGroup-mainmanagement-select").append(new Option(crr.name, crr.uuid));
        }
    }
})

    

// ########## [Fill Table] Handle Event function ##############
var UserGrouppagination={
    current_page:1,
    total:0,
    has_next:false,
    has_prev:false
}
$(document).ready(function(){
    var IdTable ="UserGroupTableBodyId";
    var checker = $("#" +IdTable );
    if (checker.length > 0){
        if($('#'+IdTable).is(":visible")){
            UserGroupGetDataTable(UserGrouppagination["current_page"]);
        }
    }
})
function UserGroupGetDataTable(page=1,search_data=null){
var obj = new UserGroup();
        
        var results = obj.tGetAllObjApi(page,search_data);
        obj.callAjax.then(function(data) {
        $("#UserGroupTableBodyId").empty();
        var body = $("#UserGroupDataTableId");
        //if (body.length > 0){
        //    var bodyTable = body.DataTable();
        //    bodyTable.clear();
        //}
        UserGroup_ID_TABLE_COUNT = 1;
        if(page>1){
        UserGroup_ID_TABLE_COUNT =1+10*page -10;
        }
        for (var i = 0; i < results.length; i++){
            try{
                console.log('results[i] = ', results[i]);

                //results[i].tFillTable2();
                results[i].tFillTable3();

                UserGroup_ID_TABLE_COUNT++;
                // results[i].tFillTable1();
            }
            catch(err){
                console.log(err);
            }
        }
        var pagenation_ele=$(".pagination-UserGroup");
        var pagination=UserGrouppagination;
        pagenation_ele.html('');
        if (results.length > 0) {
            
                    if (pagination["has_prev"] == true) {
                        pagenation_ele.append('<li class="page-item"><a class="page-link" onclick="UserGroupGetDataTable(' + (parseInt(pagination["current_page"]) - 1) + ')">' + (parseInt(pagination["current_page"]) - 1) + '</a></li>');
                    }
                    pagenation_ele.append('<li class="page-item active"><a class="page-link" >' + (parseInt(pagination["current_page"])) + '</a></li>');
                    if (pagination["has_next"] == true) {
                        pagenation_ele.append('<li class="page-item"><a class="page-link" onclick="UserGroupGetDataTable(' + (parseInt(pagination["current_page"]) + 1) + ')">' + (parseInt(pagination["current_page"]) + 1) + '</a></li>');
                    }
                }
    })
}

    

// ########## [Fill Form] Handle Event function ##############

$(document).ready(function(){
    var checker = $("#UserGroupFormId");
    if (checker.length > 0){
         cr_uuid = checker.attr('data-uuid');
        if (typeof cr_uuid !== 'undefined' && cr_uuid !== false){
            console.log('cr_uuid = ', cr_uuid);
            var obj = new UserGroup();
            obj.tGetObjApi(cr_uuid);
        }
    }
    checker = $("#UserGroupDetailFormId");
    if (checker.length > 0){
         cr_uuid = checker.attr('data-uuid');
        if (typeof cr_uuid !== 'undefined' && cr_uuid !== false){
            console.log('cr_uuid = ', cr_uuid);
            var obj = new UserGroup();
            obj.tGetObjApi(cr_uuid);
        }
    }
    checker = $("#UserGroupEditFormId");
    if (checker.length > 0){
         cr_uuid = checker.attr('data-uuid');
        if (typeof cr_uuid !== 'undefined' && cr_uuid !== false){
            console.log('cr_uuid = ', cr_uuid);
            var obj = new UserGroup();
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
    $("#UserGroupTestBtnId").click(function(){
        tTestUserGroup();
    })
     $("#UserGroupTestEditBtnId").click(function(){
        tTestUserGroup('Edit');
    })
    $("#UserGroupTestCreateModalBtnId").click(function(){
        tTestInModalUserGroup('Create');

    })
     $("#UserGroupTestEditModalBtnId").click(function(){
        tTestInModalUserGroup('Edit');
    })
});

    
    
    // ########## [Fill Table bySearch] Handle Event function ##############
    function UserGroupSearchData(page=1,type_search,search_data=null){
    var obj = new UserGroup();
            
            var results = obj.tSearchAllObjApi(page,search_data,type_search);
            obj.callAjax.then(function(data) {
            $("#UserGroupTableBodyId").empty();
            var body = $("#UserGroupDataTableId");
            //if (body.length > 0){
            //    var bodyTable = body.DataTable();
            //    bodyTable.clear();
            //}
            UserGroup_ID_TABLE_COUNT = 1;
            if(page>1){
            UserGroup_ID_TABLE_COUNT =1+10*page -10;
            }
            for (var i = 0; i < results.length; i++){
                try{
                    console.log('results[i] = ', results[i]);
    
                    //results[i].tFillTable2();
                    results[i].tFillTable3();
    
                    UserGroup_ID_TABLE_COUNT++;
                    // results[i].tFillTable1();
                }
                catch(err){
                    console.log(err);
                }
            }
            type_search = type_search.trim()
            var pagination = UserGrouppagination;
            var pagenation_ele=$(".pagination-UserGroup");
            pagenation_ele.html('');
            if (results.length > 0) {
            
                    if (pagination["has_prev"] == true) {
                        pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="UserGroupSearchData(` + (parseInt(pagination["current_page"]) - 1) +`,'`+type_search+`'`+ `)">` + (parseInt(pagination["current_page"]) - 1) + `</a></li>`);
                    }
                    pagenation_ele.append('<li class="page-item active"><a class="page-link" >' + (parseInt(pagination["current_page"])) + '</a></li>');
                    if (pagination["has_next"] == true) {
                        pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="UserGroupSearchData(` + (parseInt(pagination["current_page"]) + 1) +`,'`+type_search+`'`+ `)">` + (parseInt(pagination["current_page"]) + 1) + `</a></li>`);
                    }
                }
        })
    
    }
    
        
    
    // ########## [Fill Table bySearch] Handle Event function ##############
    var UserGroup_ID_INLINE_TABLE_COUNT;
    function UserGroupFillTableInForm(page=1,search_data=null,tableId=null,action="detail"){
            var obj = new UserGroup();
            var results = obj.tSearchLargeObjApi(page,search_data,"filter",tableId);
            obj.callAjax.then(function(data) {
                UserGroup_ID_INLINE_TABLE_COUNT = 1;
                if(page>1){
                UserGroup_ID_INLINE_TABLE_COUNT =1+10*page -10;
                }
                if(action=="detail"){
                    $("#"+tableId).find('tbody').empty();
                    for (var i = 0; i < results.length; i++){
                    try{
                        console.log('results[i] = ', results[i]);
                        results[i].tFillTable4(tableId,UserGroup_ID_INLINE_TABLE_COUNT,action);
                        UserGroup_ID_INLINE_TABLE_COUNT++;
                    }
                    catch(err){
                        console.log(err);
                    }
                    }
                }
                else if(action=="edit"){
                    var table = new UserGroupeditTnvTable($("#"+tableId)[0]);
                    table.bindRows(results);
                }
            })
            
    
    }
    
$(document).ready(function() {
        $("#permissionUserGroupCreateModalInput").select2(
            {
                placeholder: "-----Lựa Chọn-----",
                dropdownParent: $("#UserGroupCreatemodalsId").find(".modal-content"),
                allowClear: true,
            }
        )
        });
$(document).ready(function() {  
        $("#accountUserGroupCreateModalInput").select2(
            {
                placeholder: "------Lựa Chọn-----",
                dropdownParent: $("#UserGroupCreatemodalsId").find(".modal-content"),
                allowClear: true,
            }
        )
        });


// $(document).ready(function() {
//     $("#permissionUserGroupEditModalInputId").select2(
//         {
//             placeholder: "--Lựa Chọn--",
//             dropdownParent: $("#UserGroupEditmodalsId").find(".modal-content"),
//             allowClear: true,
//         }
//     )
// });
$(document).ready(function() {
    var placeholderValue = '';
    var firstOptionValue = $("#permissionUserGroupEditModalInputId option:first").val();
    if (firstOptionValue && firstOptionValue !== '--Lựa Chọn--') {
        placeholderValue = firstOptionValue;
    } else {
        placeholderValue = '--Lựa Chọn--';
    }
    
    $("#permissionUserGroupEditModalInputId").select2({
        placeholder: placeholderValue,
        dropdownParent: $("#UserGroupEditmodalsId").find(".modal-content"),
        allowClear: true
    });

    $("#permissionUserGroupEditModalInputId").val("").trigger("change");
});








$(document).ready(function() {
    $("#accountUserGroupFilterSearchInputId").select2(
         {
            placeholder: "--Lựa Chọn--",
            dropdownParent: $("#UserGroupEditmodalsId").find(".modal-content"),
            allowClear: true,
        }
     )
});





$(document).ready(function() {
    $("#accountUserGroupEditModalInputId").select2(
         {
            placeholder: "--Lựa Chọn--",
            dropdownParent: $("#UserGroupEditmodalsId").find(".modal-content"),
            allowClear: true,
        }
     )
});



$(document).ready(function(){
        $.ajaxSetup({
                headers : {
                    'CSRFToken' : getCSRFTokenValue(),
                    'X-CSRFToken' : getCSRFTokenValue(), // for --> SessionAuthentication
                },
                tryCount : 0,
                retryLimit : 3,
            });
            
            var event_data = '';
    
            $.ajax({
                    url: PermissonGroup_LIST_URL,
                    type: 'GET',
                    async: false,
                    cache: false,
                    timeout: 30000,
                    success: function(data){
                        if (data.hasOwnProperty('results')){
                            for (var j=0; j < data.results.length; j++){
                                var uuid_tmp = data.results[j].uuid;
                                var name_tmp = data.results[j].name;
                                event_data += '<option value="' + uuid_tmp + '">' + name_tmp + '</option>'
                            }
                            $("#permissionUserGroupCreateModalInput").append(event_data);
                            $("#permissionUserGroupEditModalInputId").append(event_data);
                         
    
                        }
                    },
                    error:function (xhr, ajaxOptions, thrownError) {
                        console.log(xhr.status);
                        console.log(thrownError);
                    }
            });
    });
    $(document).ready(function(){
        $.ajaxSetup({
                headers : {
                    'CSRFToken' : getCSRFTokenValue(),
                    'X-CSRFToken' : getCSRFTokenValue(), // for --> SessionAuthentication
                },
                tryCount : 0,
                retryLimit : 3,
            });
            
            var event_data = '';
    
            $.ajax({
                    url:  Account_LIST_URL,
                    type: 'GET',
                    async: false,
                    cache: false,
                    timeout: 30000,
                    success: function(data){
                        if (data.hasOwnProperty('results')){
                            for (var j=0; j < data.results.length; j++){
                                var id = data.results[j].id;
                                var name_tmp = data.results[j].name;
                                event_data += '<option value="' + id + '">' + name_tmp + '</option>'
                            }
                            $("#accountUserGroupCreateModalInput").append(event_data);
                            $("#accountUserGroupEditModalInputId").append(event_data);
                            $("#accountUserGroupFilterSearchInputId").append(event_data);
                         
    
                        }
                    },
                    error:function (xhr, ajaxOptions, thrownError) {
                        console.log(xhr.status);
                        console.log(thrownError);
                    }
            });
    });
