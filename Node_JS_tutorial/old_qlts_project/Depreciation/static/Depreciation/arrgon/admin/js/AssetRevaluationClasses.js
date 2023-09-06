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

$(document).ready(function(){
  var IdTable ="AssetRevaluationAssetRevaluationTableBodyId";
  var checker = $("#" +IdTable );
  if (checker.length > 0){
      if($('#'+IdTable).is(":visible")){
          AssetRevaluationAssetRevaluationGetDataTable(AssetRevaluationAssetRevaluationpagination["current_page"]);
      }
  }
})


var record_in_page = 5;
var search_log = {
    search_func:"",
    search_data:"",
    search_type:"",
}

function AssetRevaluationAssetRevaluationGetDataTable(page=1,search_data=null){
        console.log('hello')
        search_log["search_func"] = "AssetRevaluationAssetRevaluationGetDataTable";
        search_log["search_data"] = search_data;
        search_log["search_type"] = "";

        var obj = new AssetRevaluationAssetRevaluation();
        var results = obj.tGetAllObjApi(page,search_data);
        obj.callAjax.then(function(data) {
        $("#AssetRevaluationAssetRevaluationTableBodyId").empty();
        var body = $("#AssetRevaluationAssetRevaluationDataTableId");
        //if (body.length > 0){
        //    var bodyTable = body.DataTable();
        //    bodyTable.clear();
        //}
        ACCOUNT_ID_TABLE_COUNT = 1;
        var crr_record_in_page = AssetRevaluationAssetRevaluationrecord_in_page;

        if(page>1){
        ACCOUNT_ID_TABLE_COUNT =1+crr_record_in_page*page-crr_record_in_page
        }
        for (var i = 0; i < results.length; i++){
            try{
                console.log('results[i] = ', results[i]);

                //results[i].tFillTable2();
                results[i].tFillTable3();
                // results[i].tFillCard();

                ACCOUNT_ID_TABLE_COUNT++;
                // results[i].tFillTable1();
            }
            catch(err){
                console.log(err);
            }
        }
        var pagenation_ele=$(".pagination-AssetRevaluationAssetRevaluation");
        var pagination=AssetRevaluationAssetRevaluationpagination;
        pagenation_ele.html('');
        var page_total_ele = $(".page-total-AssetRevaluationAssetRevaluation");
        page_total_ele.html(`<footer class="mt-3 blockquote-footer">Tổng số: ${pagination["total"]} bản ghi </footer>`);
        if (results.length > 0) {
            
                    pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="AssetRevaluationAssetRevaluationGetDataTable(1)">Đầu</a></li>`);
                    if (pagination["has_prev"] == true) {
                        pagenation_ele.append('<li class="page-item"><a class="page-link" onclick="AssetRevaluationAssetRevaluationGetDataTable(' + (parseInt(pagination["current_page"]) - 1) + ')">' + (parseInt(pagination["current_page"]) - 1) + '</a></li>');
                    }
                    pagenation_ele.append('<li class="page-item active"><a class="page-link" >' + (parseInt(pagination["current_page"])) + '</a></li>');
                    if (pagination["has_next"] == true) {
                        pagenation_ele.append('<li class="page-item"><a class="page-link" onclick="AssetRevaluationAssetRevaluationGetDataTable(' + (parseInt(pagination["current_page"]) + 1) + ')">' + (parseInt(pagination["current_page"]) + 1) + '</a></li>');
                    }
                    if(pagination["total"]>0){
                        var last_page_order = 0 
                        if((pagination["total"]%record_in_page) != 0)
                        {
                            last_page_order = Math.floor(pagination["total"]/record_in_page) + 1;
                        }
                        else {
                            last_page_order = (pagination["total"]/record_in_page);
                        }
                    pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="AssetRevaluationAssetRevaluationGetDataTable(`+last_page_order+`)">Cuối</a></li>`);
                    }
                }
    })
}


var AssetRevaluationAssetRevaluation_CACHE = [];

var AssetRevaluationAssetRevaluation_arr_action = [
// default action

        {
        "title": "Xem chi tiết",
        "func": "AssetRevaluationAssetRevaluationDetails",
        "icon": "far fa-eye",
        "href": "#",
        "isCheck": false,
        "allowSelfChecking": true,
        "field_checking": "#",
        "value_is_true": "#",
        "views_name": "",
        "independent_views": true
        },
        
        // {
        //     "title": "Chỉnh sửa",
        //     "func": "AssetRevaluationAssetRevaluationEdit",
        //     "icon": "far fa-edit",
        //     "href": "#",
        //     "isCheck": false,
        //     "allowSelfChecking": false,
        //     "field_checking": "is_sent",
        //     "value_is_true": "#",
        //     "views_name": "",
        //     "independent_views": true
        // },
        
        // {
        //     "title": "Xóa",
        //     "func": "AssetRevaluationAssetRevaluationOnDeleteEvent",
        //     "icon": "far fa-trash-alt",
        //     "href": "#",
        //     "isCheck": false,
        //     "allowSelfChecking": false,
        //     "field_checking": "#",
        //     "value_is_true": "#",
        //     "views_name": "",
        //     "independent_views": true
        // },
        
// custom action 

]
    // default func actions

 

class AssetRevaluationAssetRevaluation{
  constructor(data=null){
    if (data != null){
        if (data.hasOwnProperty('id')){
            this.id = data.id;
        }
        else{
            this.id = null;
        }

        this.__app_name__ = "Depreciation";

        this.__model_name__ = "Depreciation";

        if (data.hasOwnProperty('name')){
            this.name = data.name;
        }
        else{
            this.name = null;
        }

        if (data.hasOwnProperty('uuid')){
            this.uuid = data.uuid;
            // this.editUrl = '/Account/Account/edit/' + this.uuid + '/';
            // this.detailUrl = '/Account/Account/detail/' + this.uuid + '/';
        }
        else{
            this.uuid = null;
        }

        if (data.hasOwnProperty('name')){
            this.name = data.name;
        }
        else{
            this.name = null;
        }

        if (data.hasOwnProperty('time_revaluation')){
            this.time_revaluation= data.time_revaluation;
        }
        else{
            this.time_revaluation = null;
        }

        if (data.hasOwnProperty('asset_revaluation')){
            this.asset_revaluation= data.asset_revaluation;
        }
        else{
            this.asset_revaluation = null;
        }

        if (data.hasOwnProperty('asset_revaluation_name')){
            this.asset_revaluation_name= data.asset_revaluation_name;
        }
        else{
            this.asset_revaluation_name = null;
        }

        if (data.hasOwnProperty('addup_value')){
          this.addup_value= data.addup_value;
        }
        else{
            this.addup_value = null;
        }

        if (data.hasOwnProperty('addup_time')){
          this.addup_time = data.addup_time;
        }
        else{
            this.addup_time  = null;
        }

        if (data.hasOwnProperty('created_by')){
            this.created_by = data.created_by;
        }
        else{
            this.created_by = null;
        }
        
        if (data.hasOwnProperty('updated_by')){
          this.updated_by = data.updated_by;
        }
        else{
            this.updated_by= null;
        }

        if (data.hasOwnProperty('updated_at')){
            this.updated_at = data.updated_at;
        }
        else{
            this.updated_at = null;
        }

        if (data.hasOwnProperty('created_at')){
            this.created_at = data.created_at;
        }
        else{
            this.created_at = null;
        }

    }
  }

  tGetFormData(formId=null){
    var formEle = $("#" + formId);
    if (formEle.length > 0){
        var chEle = formEle.find("#nameAssetRevaluationAssetRevaluationInputId");
        if (chEle.length > 0){
            this.name = chEle.val();
        }
        else{
            // this.name = null;
        }
        var chEle = formEle.find("#uuidAssetRevaluationAssetRevaluationInputId");
        if (chEle.length > 0){
            this.uuid = chEle.val();
        }
        else{
            // this.uuid = null;
        }
        var chEle = formEle.find("#tndidAssetRevaluationAssetRevaluationInputId");
        if (chEle.length > 0){
            this.tndid = chEle.val();
        }
        else{
            // this.tndid = null;
        }
        var chEle = formEle.find("#nick_nameAssetRevaluationAssetRevaluationInputId");
        if (chEle.length > 0){
            this.nick_name = chEle.val();
        }
        else{
            // this.nick_name = null;
        }
        var chEle = formEle.find("#usernameAssetRevaluationAssetRevaluationInputId");
        if (chEle.length > 0){
            this.username = chEle.val();
        }
        else{
            // this.username = null;
        }
        var chEle = formEle.find("#full_nameAssetRevaluationAssetRevaluationInputId");
        if (chEle.length > 0){
            this.full_name = chEle.val();
        }
        else{
            // this.full_name = null;
        }
        var chEle = formEle.find("#emailAssetRevaluationAssetRevaluationInputId");
        if (chEle.length > 0){
            this.email = chEle.val();
        }
        else{
            // this.email = null;
        }
        var chEle = formEle.find("#groupsAssetRevaluationAssetRevaluationInputId");
        if (chEle.length > 0){
            this.groups = chEle.val();
        }
        else{
            // this.groups = null;
        }
        var chEle = formEle.find("#user_permissionsAssetRevaluationAssetRevaluationInputId");
        if (chEle.length > 0){
            this.user_permissions = chEle.val();
        }
        else{
            // this.user_permissions = null;
        }
        var chEle = formEle.find("#date_of_birthAssetRevaluationAssetRevaluationInputId");
        if (chEle.length > 0){
            this.date_of_birth = chEle.val();
        }
        else{
            // this.date_of_birth = null;
        }
        var chEle = formEle.find("#ageAssetRevaluationAssetRevaluationInputId");
        if (chEle.length > 0){
            this.age = chEle.val();
        }
        else{
            // this.age = null;
        }
        var chEle = formEle.find("#telephoneAssetRevaluationAssetRevaluationInputId");
        if (chEle.length > 0){
            this.telephone = chEle.val();
        }
        else{
            // this.telephone = null;
        }
        var chEle = formEle.find("#saltAssetRevaluationAssetRevaluationInputId");
        if (chEle.length > 0){
            this.salt = chEle.val();
        }
        else{
            // this.salt = null;
        }
        var chEle = formEle.find("#onetime_passwdAssetRevaluationAssetRevaluationInputId");
        if (chEle.length > 0){
            this.onetime_passwd = chEle.val();
        }
        else{
            // this.onetime_passwd = null;
        }
        var chEle = formEle.find("#avatarAssetRevaluationAssetRevaluationInputId");
        if (chEle.length > 0){
            this.avatar = chEle.val();
        }
        else{
            // this.avatar = null;
        }
        var chEle = formEle.find("#is_callbotAssetRevaluationAssetRevaluationInputId");
        if (chEle.length > 0){
            this.is_callbot = chEle.val();
        }
        else{
            // this.is_callbot = null;
        }
        var chEle = formEle.find("#callbot_endpointAssetRevaluationAssetRevaluationInputId");
        if (chEle.length > 0){
            this.callbot_endpoint = chEle.val();
        }
        else{
            // this.callbot_endpoint = null;
        }
        var chEle = formEle.find("#is_chatbotAssetRevaluationAssetRevaluationInputId");
        if (chEle.length > 0){
            this.is_chatbot = chEle.val();
        }
        else{
            // this.is_chatbot = null;
        }
        var chEle = formEle.find("#chatbot_endpointAssetRevaluationAssetRevaluationInputId");
        if (chEle.length > 0){
            this.chatbot_endpoint = chEle.val();
        }
        else{
            // this.chatbot_endpoint = null;
        }
        var chEle = formEle.find("#managerAssetRevaluationAssetRevaluationInputId");
        if (chEle.length > 0){
            this.manager = chEle.val();
        }
        else{
            // this.manager = null;
        }
        var chEle = formEle.find("#log_confirm_by_emailAssetRevaluationAssetRevaluationInputId");
        if (chEle.length > 0){
            this.log_confirm_by_email = chEle.val();
        }
        else{
            // this.log_confirm_by_email = null;
        }
        var chEle = formEle.find("#logged_with_passwordAssetRevaluationAssetRevaluationInputId");
        if (chEle.length > 0){
            this.logged_with_password = chEle.val();
        }
        else{
            // this.logged_with_password = null;
        }
        var chEle = formEle.find("#created_free_licenseAssetRevaluationAssetRevaluationInputId");
        if (chEle.length > 0){
            this.created_free_license = chEle.val();
        }
        else{
            // this.created_free_license = null;
        }
        var chEle = formEle.find("#email_activatedAssetRevaluationAssetRevaluationInputId");
        if (chEle.length > 0){
            this.email_activated = chEle.val();
        }
        else{
            // this.email_activated = null;
        }
        var chEle = formEle.find("#website_templateAssetRevaluationAssetRevaluationInputId");
        if (chEle.length > 0){
            this.website_template = chEle.val();
        }
        else{
            // this.website_template = null;
        }
        var chEle = formEle.find("#languageAssetRevaluationAssetRevaluationInputId");
        if (chEle.length > 0){
            this.language = chEle.val();
        }
        else{
            // this.language = null;
        }
        var chEle = formEle.find("#timezoneAssetRevaluationAssetRevaluationInputId");
        if (chEle.length > 0){
            this.timezone = chEle.val();
        }
        else{
            // this.timezone = null;
        }
        var chEle = formEle.find("#app_permissionsAssetRevaluationAssetRevaluationInputId");
        if (chEle.length > 0){
            this.app_permissions = chEle.val();
        }
        else{
            // this.app_permissions = null;
        }
        var chEle = formEle.find("#signup_atAssetRevaluationAssetRevaluationInputId");
        if (chEle.length > 0){
            this.signup_at = chEle.val();
        }
        else{
            // this.signup_at = null;
        }
        var chEle = formEle.find("#last_login_atAssetRevaluationAssetRevaluationInputId");
        if (chEle.length > 0){
            this.last_login_at = chEle.val();
        }
        else{
            // this.last_login_at = null;
        }
        var chEle = formEle.find("#extend_fieldAssetRevaluationAssetRevaluationInputId");
        if (chEle.length > 0){
            this.extend_field = chEle.val();
        }
        else{
            // this.extend_field = null;
        }
        var chEle = formEle.find("#passwordAssetRevaluationAssetRevaluationInputId");
        if (chEle.length > 0){
            this.password = chEle.val();
        }
        else{
            // this.password = null;
        }
        var chEle = formEle.find("#updated_atAssetRevaluationAssetRevaluationInputId");
        if (chEle.length > 0){
            this.updated_at = chEle.val();
        }
        else{
            // this.updated_at = null;
        }
        var chEle = formEle.find("#created_atAssetRevaluationAssetRevaluationInputId");
        if (chEle.length > 0){
            this.created_at = chEle.val();
        }
        else{
            // this.created_at = null;
        }
    }
    else{
        var chEle = $("#idAssetRevaluationAssetRevaluationInputId");
        if (chEle.length > 0){
            this.id = chEle.val();
        }
        else{
            // this.id = null;
        }
                            var chEle = $("#nameAssetRevaluationAssetRevaluationInputId");
                            if (chEle.length > 0){
                                this.name = chEle.val();
                            }
                            else{
                                // this.name = null;
                            }
                
                            var chEle = $("#uuidAssetRevaluationAssetRevaluationInputId");
                            if (chEle.length > 0){
                                this.uuid = chEle.val();
                            }
                            else{
                                // this.uuid = null;
                            }
                
                            var chEle = $("#tndidAssetRevaluationAssetRevaluationInputId");
                            if (chEle.length > 0){
                                this.tndid = chEle.val();
                            }
                            else{
                                // this.tndid = null;
                            }
                
                            var chEle = $("#nick_nameAssetRevaluationAssetRevaluationInputId");
                            if (chEle.length > 0){
                                this.nick_name = chEle.val();
                            }
                            else{
                                // this.nick_name = null;
                            }
                
                            var chEle = $("#usernameAssetRevaluationAssetRevaluationInputId");
                            if (chEle.length > 0){
                                this.username = chEle.val();
                            }
                            else{
                                // this.username = null;
                            }
                
                            var chEle = $("#full_nameAssetRevaluationAssetRevaluationInputId");
                            if (chEle.length > 0){
                                this.full_name = chEle.val();
                            }
                            else{
                                // this.full_name = null;
                            }
                
                            var chEle = $("#emailAssetRevaluationAssetRevaluationInputId");
                            if (chEle.length > 0){
                                this.email = chEle.val();
                            }
                            else{
                                // this.email = null;
                            }
                
                            var chEle = $("#groupsAssetRevaluationAssetRevaluationInputId");
                            if (chEle.length > 0){
                                this.groups = chEle.val();
                            }
                            else{
                                // this.groups = null;
                            }
                
                            var chEle = $("#user_permissionsAssetRevaluationAssetRevaluationInputId");
                            if (chEle.length > 0){
                                this.user_permissions = chEle.val();
                            }
                            else{
                                // this.user_permissions = null;
                            }
                
                            var chEle = $("#date_of_birthAssetRevaluationAssetRevaluationInputId");
                            if (chEle.length > 0){
                                var date = moment(chEle.val(), 'DD/MM/YYYY');
                                this.date_of_birth=toDatePython(new Date(date))
                            }
                            else{
                                // this.date_of_birth = null;
                            }
                
                            var chEle = $("#ageAssetRevaluationAssetRevaluationInputId");
                            if (chEle.length > 0){
                                this.age = chEle.val();
                            }
                            else{
                                // this.age = null;
                            }
                
                            var chEle = $("#telephoneAssetRevaluationAssetRevaluationInputId");
                            if (chEle.length > 0){
                                this.telephone = chEle.val();
                            }
                            else{
                                // this.telephone = null;
                            }
                
                            var chEle = $("#saltAssetRevaluationAssetRevaluationInputId");
                            if (chEle.length > 0){
                                this.salt = chEle.val();
                            }
                            else{
                                // this.salt = null;
                            }
                
                            var chEle = $("#onetime_passwdAssetRevaluationAssetRevaluationInputId");
                            if (chEle.length > 0){
                                this.onetime_passwd = chEle.val();
                            }
                            else{
                                // this.onetime_passwd = null;
                            }
                
                            var chEle = $("#avatarAssetRevaluationAssetRevaluationInputId");
                            if (chEle.length > 0){
                                this.avatar = chEle.val();
                            }
                            else{
                                // this.avatar = null;
                            }
                
                            var chEle = $("#is_callbotAssetRevaluationAssetRevaluationInputId");
                            if (chEle.length > 0){
                                this.is_callbot = chEle.val();
                            }
                            else{
                                // this.is_callbot = null;
                            }
                
                            var chEle = $("#callbot_endpointAssetRevaluationAssetRevaluationInputId");
                            if (chEle.length > 0){
                                this.callbot_endpoint = chEle.val();
                            }
                            else{
                                // this.callbot_endpoint = null;
                            }
                
                            var chEle = $("#is_chatbotAssetRevaluationAssetRevaluationInputId");
                            if (chEle.length > 0){
                                this.is_chatbot = chEle.val();
                            }
                            else{
                                // this.is_chatbot = null;
                            }
                
                            var chEle = $("#chatbot_endpointAssetRevaluationAssetRevaluationInputId");
                            if (chEle.length > 0){
                                this.chatbot_endpoint = chEle.val();
                            }
                            else{
                                // this.chatbot_endpoint = null;
                            }
                
                            var chEle = $("#managerAssetRevaluationAssetRevaluationInputId");
                            if (chEle.length > 0){
                                this.manager = chEle.val();
                            }
                            else{
                                // this.manager = null;
                            }
                
                            var chEle = $("#log_confirm_by_emailAssetRevaluationAssetRevaluationInputId");
                            if (chEle.length > 0){
                                this.log_confirm_by_email = chEle.val();
                            }
                            else{
                                // this.log_confirm_by_email = null;
                            }
                
                            var chEle = $("#logged_with_passwordAssetRevaluationAssetRevaluationInputId");
                            if (chEle.length > 0){
                                this.logged_with_password = chEle.val();
                            }
                            else{
                                // this.logged_with_password = null;
                            }
                
                            var chEle = $("#created_free_licenseAssetRevaluationAssetRevaluationInputId");
                            if (chEle.length > 0){
                                this.created_free_license = chEle.val();
                            }
                            else{
                                // this.created_free_license = null;
                            }
                
                            var chEle = $("#email_activatedAssetRevaluationAssetRevaluationInputId");
                            if (chEle.length > 0){
                                this.email_activated = chEle.val();
                            }
                            else{
                                // this.email_activated = null;
                            }
                
                            var chEle = $("#website_templateAssetRevaluationAssetRevaluationInputId");
                            if (chEle.length > 0){
                                this.website_template = chEle.val();
                            }
                            else{
                                // this.website_template = null;
                            }
                
                            var chEle = $("#languageAssetRevaluationAssetRevaluationInputId");
                            if (chEle.length > 0){
                                this.language = chEle.val();
                            }
                            else{
                                // this.language = null;
                            }
                
                            var chEle = $("#timezoneAssetRevaluationAssetRevaluationInputId");
                            if (chEle.length > 0){
                                this.timezone = chEle.val();
                            }
                            else{
                                // this.timezone = null;
                            }
                
                            var chEle = $("#app_permissionsAssetRevaluationAssetRevaluationInputId");
                            if (chEle.length > 0){
                                this.app_permissions = chEle.val();
                            }
                            else{
                                // this.app_permissions = null;
                            }
                
                            var chEle = $("#signup_atAssetRevaluationAssetRevaluationInputId");
                            if (chEle.length > 0){
                                var date = moment(chEle.val(), 'DD/MM/YYYY');
                                this.signup_at=toDatePython(new Date(date))
                            }
                            else{
                                // this.signup_at = null;
                            }
                
                            var chEle = $("#last_login_atAssetRevaluationAssetRevaluationInputId");
                            if (chEle.length > 0){
                                var date = moment(chEle.val(), 'DD/MM/YYYY');
                                this.last_login_at=toDatePython(new Date(date))
                            }
                            else{
                                // this.last_login_at = null;
                            }
                
                            var chEle = $("#extend_fieldAssetRevaluationAssetRevaluationInputId");
                            if (chEle.length > 0){
                                this.extend_field = chEle.val();
                            }
                            else{
                                // this.extend_field = null;
                            }
                
                            var chEle = $("#passwordAssetRevaluationAssetRevaluationInputId");
                            if (chEle.length > 0){
                                this.password = chEle.val();
                            }
                            else{
                                // this.password = null;
                            }
                
                            var chEle = $("#updated_atAssetRevaluationAssetRevaluationInputId");
                            if (chEle.length > 0){
                                var date = moment(chEle.val(), 'DD/MM/YYYY');
                                this.updated_at=toDatePython(new Date(date))
                            }
                            else{
                                // this.updated_at = null;
                            }
                
                            var chEle = $("#created_atAssetRevaluationAssetRevaluationInputId");
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
              var j_ele_name = $("#nameAssetRevaluationAssetRevaluationInputId");
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
              var j_ele_uuid = $("#uuidAssetRevaluationAssetRevaluationInputId");
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
              var j_ele_tndid = $("#tndidAssetRevaluationAssetRevaluationInputId");
              if (j_ele_tndid.length > 0){
                  if (j_ele_tndid.attr('name') != 'uuid'){
                      j_ele_tndid.val(self.tndid).change();
                  }
              }
              else{
                  // j_ele_tndid.val(null);
              }
          }
          catch(err) {
              console.log('err = ', err);
          }

          try{
              var j_ele_nick_name = $("#nick_nameAssetRevaluationAssetRevaluationInputId");
              if (j_ele_nick_name.length > 0){
                  if (j_ele_nick_name.attr('name') != 'uuid'){
                      j_ele_nick_name.val(self.nick_name).change();
                  }
              }
              else{
                  // j_ele_nick_name.val(null);
              }
          }
          catch(err) {
              console.log('err = ', err);
          }

          try{
              var j_ele_username = $("#usernameAssetRevaluationAssetRevaluationInputId");
              if (j_ele_username.length > 0){
                  if (j_ele_username.attr('name') != 'uuid'){
                      j_ele_username.val(self.username).change();
                  }
              }
              else{
                  // j_ele_username.val(null);
              }
          }
          catch(err) {
              console.log('err = ', err);
          }

          try{
              var j_ele_full_name = $("#full_nameAssetRevaluationAssetRevaluationInputId");
              if (j_ele_full_name.length > 0){
                  if (j_ele_full_name.attr('name') != 'uuid'){
                      j_ele_full_name.val(self.full_name).change();
                  }
              }
              else{
                  // j_ele_full_name.val(null);
              }
          }
          catch(err) {
              console.log('err = ', err);
          }

          try{
              var j_ele_email = $("#emailAssetRevaluationAssetRevaluationInputId");
              if (j_ele_email.length > 0){
                  if (j_ele_email.attr('name') != 'uuid'){
                      j_ele_email.val(self.email).change();
                  }
              }
              else{
                  // j_ele_email.val(null);
              }
          }
          catch(err) {
              console.log('err = ', err);
          }

          try{
              var j_ele_groups = $("#groupsGroupAssetRevaluationAssetRevaluationInputId");
              if (j_ele_groups.length > 0){
                  if (j_ele_groups.attr('name') != 'uuid'){
                      j_ele_groups.val(self.groups).change();
                  }
              }
              else{
                  // j_ele_groups.val(null);
              }
          }
          catch(err) {
              console.log('err = ', err);
          }

          try{
              var j_ele_user_permissions = $("#user_permissionsPermissionAssetRevaluationAssetRevaluationInputId");
              if (j_ele_user_permissions.length > 0){
                  if (j_ele_user_permissions.attr('name') != 'uuid'){
                      j_ele_user_permissions.val(self.user_permissions).change();
                  }
              }
              else{
                  // j_ele_user_permissions.val(null);
              }
          }
          catch(err) {
              console.log('err = ', err);
          }

          try{
              var j_ele_date_of_birth = $("#date_of_birthAssetRevaluationAssetRevaluationInputId");
              if (j_ele_date_of_birth.length > 0){
                  var dateObj = new Date(Date.parse(self.date_of_birth)); 
                  if (dateObj != "Invalid Date"){
                      var newdate = moment(dateObj).format('DD/MM/YYYY');
                      console.log('newdate = ', newdate);
                      j_ele_date_of_birth.val(newdate).change();
                  }
              }
              else{
                  // j_ele_date_of_birth.val(null);
              }
          }
          catch(err) {
              console.log('err = ', err);
          }

          try{
              var j_ele_age = $("#ageAssetRevaluationAssetRevaluationInputId");
              if (j_ele_age.length > 0){
                  if (j_ele_age.attr('name') != 'uuid'){
                      j_ele_age.val(self.age).change();
                  }
              }
              else{
                  // j_ele_age.val(null);
              }
          }
          catch(err) {
              console.log('err = ', err);
          }

          try{
              var j_ele_telephone = $("#telephoneAssetRevaluationAssetRevaluationInputId");
              if (j_ele_telephone.length > 0){
                  if (j_ele_telephone.attr('name') != 'uuid'){
                      j_ele_telephone.val(self.telephone).change();
                  }
              }
              else{
                  // j_ele_telephone.val(null);
              }
          }
          catch(err) {
              console.log('err = ', err);
          }

          try{
              var j_ele_salt = $("#saltAssetRevaluationAssetRevaluationInputId");
              if (j_ele_salt.length > 0){
                  if (j_ele_salt.attr('name') != 'uuid'){
                      j_ele_salt.val(self.salt).change();
                  }
              }
              else{
                  // j_ele_salt.val(null);
              }
          }
          catch(err) {
              console.log('err = ', err);
          }

          try{
              var j_ele_onetime_passwd = $("#onetime_passwdAssetRevaluationAssetRevaluationInputId");
              if (j_ele_onetime_passwd.length > 0){
                  if (j_ele_onetime_passwd.attr('name') != 'uuid'){
                      j_ele_onetime_passwd.val(self.onetime_passwd).change();
                  }
              }
              else{
                  // j_ele_onetime_passwd.val(null);
              }
          }
          catch(err) {
              console.log('err = ', err);
          }

          try{
              var j_ele_avatar = $("#avatarAssetRevaluationAssetRevaluationInputId");
              if (j_ele_avatar.length > 0){
                  if (j_ele_avatar.attr('name') != 'uuid'){
                      j_ele_avatar.val(self.avatar).change();
                  }
              }
              else{
                  // j_ele_avatar.val(null);
              }
          }
          catch(err) {
              console.log('err = ', err);
          }

          try{
              var j_ele_is_callbot = $("#is_callbotAssetRevaluationAssetRevaluationInputId");
              if (j_ele_is_callbot.length > 0){
                  if (j_ele_is_callbot.attr('name') != 'uuid'){
                      j_ele_is_callbot.val(self.is_callbot).change();
                  }
              }
              else{
                  // j_ele_is_callbot.val(null);
              }
          }
          catch(err) {
              console.log('err = ', err);
          }

          try{
              var j_ele_callbot_endpoint = $("#callbot_endpointAssetRevaluationAssetRevaluationInputId");
              if (j_ele_callbot_endpoint.length > 0){
                  if (j_ele_callbot_endpoint.attr('name') != 'uuid'){
                      j_ele_callbot_endpoint.val(self.callbot_endpoint).change();
                  }
              }
              else{
                  // j_ele_callbot_endpoint.val(null);
              }
          }
          catch(err) {
              console.log('err = ', err);
          }

          try{
              var j_ele_is_chatbot = $("#is_chatbotAssetRevaluationAssetRevaluationInputId");
              if (j_ele_is_chatbot.length > 0){
                  if (j_ele_is_chatbot.attr('name') != 'uuid'){
                      j_ele_is_chatbot.val(self.is_chatbot).change();
                  }
              }
              else{
                  // j_ele_is_chatbot.val(null);
              }
          }
          catch(err) {
              console.log('err = ', err);
          }

          try{
              var j_ele_chatbot_endpoint = $("#chatbot_endpointAssetRevaluationAssetRevaluationInputId");
              if (j_ele_chatbot_endpoint.length > 0){
                  if (j_ele_chatbot_endpoint.attr('name') != 'uuid'){
                      j_ele_chatbot_endpoint.val(self.chatbot_endpoint).change();
                  }
              }
              else{
                  // j_ele_chatbot_endpoint.val(null);
              }
          }
          catch(err) {
              console.log('err = ', err);
          }

          try{
              var j_ele_manager = $("#managerAssetRevaluationAssetRevaluationAccountInputId");
              if (j_ele_manager.length > 0){
                  if (j_ele_manager.attr('name') != 'uuid'){
                      j_ele_manager.val(self.manager).change();
                  }
              }
              else{
                  // j_ele_manager.val(null);
              }
          }
          catch(err) {
              console.log('err = ', err);
          }

          try{
              var j_ele_log_confirm_by_email = $("#log_confirm_by_emailAssetRevaluationAssetRevaluationInputId");
              if (j_ele_log_confirm_by_email.length > 0){
                  if (j_ele_log_confirm_by_email.attr('name') != 'uuid'){
                      j_ele_log_confirm_by_email.val(self.log_confirm_by_email).change();
                  }
              }
              else{
                  // j_ele_log_confirm_by_email.val(null);
              }
          }
          catch(err) {
              console.log('err = ', err);
          }

          try{
              var j_ele_logged_with_password = $("#logged_with_passwordAssetRevaluationAssetRevaluationInputId");
              if (j_ele_logged_with_password.length > 0){
                  if (j_ele_logged_with_password.attr('name') != 'uuid'){
                      j_ele_logged_with_password.val(self.logged_with_password).change();
                  }
              }
              else{
                  // j_ele_logged_with_password.val(null);
              }
          }
          catch(err) {
              console.log('err = ', err);
          }

          try{
              var j_ele_created_free_license = $("#created_free_licenseAssetRevaluationAssetRevaluationInputId");
              if (j_ele_created_free_license.length > 0){
                  if (j_ele_created_free_license.attr('name') != 'uuid'){
                      j_ele_created_free_license.val(self.created_free_license).change();
                  }
              }
              else{
                  // j_ele_created_free_license.val(null);
              }
          }
          catch(err) {
              console.log('err = ', err);
          }

          try{
              var j_ele_email_activated = $("#email_activatedAssetRevaluationAssetRevaluationInputId");
              if (j_ele_email_activated.length > 0){
                  if (j_ele_email_activated.attr('name') != 'uuid'){
                      j_ele_email_activated.val(self.email_activated).change();
                  }
              }
              else{
                  // j_ele_email_activated.val(null);
              }
          }
          catch(err) {
              console.log('err = ', err);
          }

          try{
              var j_ele_website_template = $("#website_templateWebsiteTemplateAssetRevaluationAssetRevaluationInputId");
              if (j_ele_website_template.length > 0){
                  if (j_ele_website_template.attr('name') != 'uuid'){
                      j_ele_website_template.val(self.website_template).change();
                  }
              }
              else{
                  // j_ele_website_template.val(null);
              }
          }
          catch(err) {
              console.log('err = ', err);
          }

          try{
              var j_ele_language = $("#languageAssetRevaluationAssetRevaluationInputId");
              if (j_ele_language.length > 0){
                  if (j_ele_language.attr('name') != 'uuid'){
                      j_ele_language.val(self.language).change();
                  }
              }
              else{
                  // j_ele_language.val(null);
              }
          }
          catch(err) {
              console.log('err = ', err);
          }

          try{
              var j_ele_timezone = $("#timezoneAssetRevaluationAssetRevaluationInputId");
              if (j_ele_timezone.length > 0){
                  if (j_ele_timezone.attr('name') != 'uuid'){
                      j_ele_timezone.val(self.timezone).change();
                  }
              }
              else{
                  // j_ele_timezone.val(null);
              }
          }
          catch(err) {
              console.log('err = ', err);
          }

          try{
              var j_ele_app_permissions = $("#app_permissionsAppPermissionAssetRevaluationAssetRevaluationInputId");
              if (j_ele_app_permissions.length > 0){
                  if (j_ele_app_permissions.attr('name') != 'uuid'){
                      j_ele_app_permissions.val(self.app_permissions).change();
                  }
              }
              else{
                  // j_ele_app_permissions.val(null);
              }
          }
          catch(err) {
              console.log('err = ', err);
          }

          try{
              var j_ele_signup_at = $("#signup_atAssetRevaluationAssetRevaluationInputId");
              if (j_ele_signup_at.length > 0){
                  var dateObj = new Date(Date.parse(self.signup_at)); 
                  if (dateObj != "Invalid Date"){
                      var newdate = moment(dateObj).format('DD/MM/YYYY');
                      console.log('newdate = ', newdate);
                      j_ele_signup_at.val(newdate).change();
                  }
              }
              else{
                  // j_ele_signup_at.val(null);
              }
          }
          catch(err) {
              console.log('err = ', err);
          }

          try{
              var j_ele_last_login_at = $("#last_login_atAssetRevaluationAssetRevaluationInputId");
              if (j_ele_last_login_at.length > 0){
                  var dateObj = new Date(Date.parse(self.last_login_at)); 
                  if (dateObj != "Invalid Date"){
                      var newdate = moment(dateObj).format('DD/MM/YYYY');
                      console.log('newdate = ', newdate);
                      j_ele_last_login_at.val(newdate).change();
                  }
              }
              else{
                  // j_ele_last_login_at.val(null);
              }
          }
          catch(err) {
              console.log('err = ', err);
          }

          try{
              var j_ele_extend_field = $("#extend_fieldExtendInfoAssetRevaluationAssetRevaluationInputId");
              if (j_ele_extend_field.length > 0){
                  if (j_ele_extend_field.attr('name') != 'uuid'){
                      j_ele_extend_field.val(self.extend_field).change();
                  }
              }
              else{
                  // j_ele_extend_field.val(null);
              }
          }
          catch(err) {
              console.log('err = ', err);
          }

          try{
              var j_ele_password = $("#passwordAssetRevaluationAssetRevaluationInputId");
              if (j_ele_password.length > 0){
                  if (j_ele_password.attr('name') != 'uuid'){
                      j_ele_password.val(self.password).change();
                  }
              }
              else{
                  // j_ele_password.val(null);
              }
          }
          catch(err) {
              console.log('err = ', err);
          }

          try{
              var j_ele_updated_at = $("#updated_atAssetRevaluationAssetRevaluationInputId");
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
              var j_ele_created_at = $("#created_atAssetRevaluationAssetRevaluationInputId");
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
   // ########## [FILL FORM] Objects to FRONT END ##############
   tFillFormModal(modals_type,formId=null){
    console.log('vaooooooooooo 3')
    //modals_type
    //*Create
    //*Detail
    //*Edit
    var apart=modals_type+'Modal';

    var self = this;
        try{
            var j_ele_name = $("#nameAssetRevaluationAssetRevaluation"+apart+"InputId");
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
            var j_ele_name = $("#assetrevaluationnameAssetRevaluationAssetRevaluation"+apart+"InputId");
            if (j_ele_name.length > 0){
                if (j_ele_name.attr('name') != 'uuid'){
                    j_ele_name.val(self.asset_revaluation_name).change();
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
            var j_ele_id = $("#idAssetRevaluationAssetRevaluation"+apart+"InputId");
            if (j_ele_id.length > 0 && self.id !=null){
                if (j_ele_id.attr('name') == 'name'){
                    j_ele_id.val(self.id).change();
                }
            }
            else{
                // j_ele_id.val(null);
            }
        }
        catch(err) {
            console.log('err = ', err);
        }

        try{
            var j_ele_uuid = $("#uuidAssetRevaluationAssetRevaluation"+apart+"InputId");
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
            var j_ele_tndid = $("#tndidAssetRevaluationAssetRevaluation"+apart+"InputId");
            if (j_ele_tndid.length > 0){
                if (j_ele_tndid.attr('name') != 'uuid'){
                    j_ele_tndid.val(self.tndid).change();
                }
            }
            else{
                // j_ele_tndid.val(null);
            }
        }
        catch(err) {
            console.log('err = ', err);
        }

        try{
            var j_ele_nick_name = $("#nick_nameAssetRevaluationAssetRevaluation"+apart+"InputId");
            if (j_ele_nick_name.length > 0){
                if (j_ele_nick_name.attr('name') != 'uuid'){
                    j_ele_nick_name.val(self.nick_name).change();
                }
            }
            else{
                // j_ele_nick_name.val(null);
            }
        }
        catch(err) {
            console.log('err = ', err);
        }

        try{
            var j_ele_username = $("#usernameAssetRevaluationAssetRevaluation"+apart+"InputId");
            if (j_ele_username.length > 0){
                if (j_ele_username.attr('name') != 'uuid'){
                    j_ele_username.val(self.name).change();
                }
            }
            else{
                // j_ele_username.val(null);
            }
        }
        catch(err) {
            console.log('err = ', err);
        }

        try{
            var j_ele_full_name = $("#nameAssetRevaluationAssetRevaluation"+apart+"InputId");
            if (j_ele_full_name.length > 0){
                if (j_ele_full_name.attr('name') != 'uuid'){
                    j_ele_full_name.val(self.name).change();
                }
            }
            else{
                // j_ele_full_name.val(null);
            }
        }
        catch(err) {
            console.log('err = ', err);
        }

        try{
            var j_ele_email = $("#timerevaluationAssetRevaluationAssetRevaluation"+apart+"InputId");
            if (j_ele_email.length > 0){
                if (j_ele_email.attr('name') != 'uuid'){
                    j_ele_email.val(self.time_revaluation).change();
                }
            }
            else{
                // j_ele_email.val(null);
            }
        }
        catch(err) {
            console.log('err = ', err);
        }

        try{
            var j_ele_email = $("#addupvalueAssetRevaluationAssetRevaluation"+apart+"InputId");
            if (j_ele_email.length > 0){
                if (j_ele_email.attr('name') != 'uuid'){
                    j_ele_email.val(self.addup_value).change();
                }
            }
            else{
                // j_ele_email.val(null);
            }
        }
        catch(err) {
            console.log('err = ', err);
        }

        try{
            var j_ele_email = $("#adduptimeAssetRevaluationAssetRevaluation"+apart+"InputId");
            if (j_ele_email.length > 0){
                if (j_ele_email.attr('name') != 'uuid'){
                    j_ele_email.val(self.addup_time).change();
                }
            }
            else{
                // j_ele_email.val(null);
            }
        }
        catch(err) {
            console.log('err = ', err);
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
              var j_ele_name = $("#nameAssetRevaluationAssetRevaluation"+apart+"InputId");
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
              var j_ele_uuid = $("#uuidAssetRevaluationAssetRevaluation"+apart+"InputId");
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
              var j_ele_tndid = $("#tndidAssetRevaluationAssetRevaluation"+apart+"InputId");
              if (j_ele_tndid.length > 0){
                  if (j_ele_tndid.attr('name') != 'uuid'){
                      j_ele_tndid.val(self.tndid).change();
                  }
              }
              else{
                  // j_ele_tndid.val(null);
              }
          }
          catch(err) {
              console.log('err = ', err);
          }

          try{
              var j_ele_nick_name = $("#nick_nameAssetRevaluationAssetRevaluation"+apart+"InputId");
              if (j_ele_nick_name.length > 0){
                  if (j_ele_nick_name.attr('name') != 'uuid'){
                      j_ele_nick_name.val(self.nick_name).change();
                  }
              }
              else{
                  // j_ele_nick_name.val(null);
              }
          }
          catch(err) {
              console.log('err = ', err);
          }

          try{
              var j_ele_username = $("#usernameAssetRevaluationAssetRevaluation"+apart+"InputId");
              if (j_ele_username.length > 0){
                  if (j_ele_username.attr('name') != 'uuid'){
                      j_ele_username.val(self.username).change();
                  }
              }
              else{
                  // j_ele_username.val(null);
              }
          }
          catch(err) {
              console.log('err = ', err);
          }

          try{
              var j_ele_full_name = $("#full_nameAssetRevaluationAssetRevaluation"+apart+"InputId");
              if (j_ele_full_name.length > 0){
                  if (j_ele_full_name.attr('name') != 'uuid'){
                      j_ele_full_name.val(self.full_name).change();
                  }
              }
              else{
                  // j_ele_full_name.val(null);
              }
          }
          catch(err) {
              console.log('err = ', err);
          }

          try{
              var j_ele_email = $("#emailAssetRevaluationAssetRevaluation"+apart+"InputId");
              if (j_ele_email.length > 0){
                  if (j_ele_email.attr('name') != 'uuid'){
                      j_ele_email.val(self.email).change();
                  }
              }
              else{
                  // j_ele_email.val(null);
              }
          }
          catch(err) {
              console.log('err = ', err);
          }

          try{
              var j_ele_groups = $("#groupsGroupAssetRevaluationAssetRevaluation"+apart+"InputId");
              if (j_ele_groups.length > 0){
                  var arr_value=[];
                  for(var i in self["groups"]){
                      arr_value.push(self["groups"][i]["uuid"]);
                  }
                  j_ele_groups.val(arr_value).change();
              }
              else{
                  // j_ele_groups.val(null);
              }
          }
          catch(err) {
              console.log('err = ', err);
          }

          try{
              var j_ele_user_permissions = $("#user_permissionsPermissionAssetRevaluationAssetRevaluation"+apart+"InputId");
              if (j_ele_user_permissions.length > 0){
                  var arr_value=[];
                  for(var i in self["user_permissions"]){
                      arr_value.push(self["user_permissions"][i]["uuid"]);
                  }
                  j_ele_user_permissions.val(arr_value).change();
              }
              else{
                  // j_ele_user_permissions.val(null);
              }
          }
          catch(err) {
              console.log('err = ', err);
          }

          try{
              var j_ele_date_of_birth = $("#date_of_birthAssetRevaluationAssetRevaluation"+apart+"InputId");
              if (j_ele_date_of_birth.length > 0){
                  var dateObj = new Date(Date.parse(self.date_of_birth)); 
                    if (dateObj != "Invalid Date"){
                      var newdate = moment(dateObj).format('DD/MM/YYYY');
                      console.log('newdate = ', newdate);
                      j_ele_date_of_birth.val(newdate).change();
                  }
              }
              else{
                  // j_ele_date_of_birth.val(null);
              }
          }
          catch(err) {
              console.log('err = ', err);
          }

          try{
              var j_ele_age = $("#ageAssetRevaluationAssetRevaluation"+apart+"InputId");
              if (j_ele_age.length > 0){
                  if (j_ele_age.attr('name') != 'uuid'){
                      j_ele_age.val(self.age).change();
                  }
              }
              else{
                  // j_ele_age.val(null);
              }
          }
          catch(err) {
              console.log('err = ', err);
          }

          try{
              var j_ele_telephone = $("#telephoneAssetRevaluationAssetRevaluation"+apart+"InputId");
              if (j_ele_telephone.length > 0){
                  if (j_ele_telephone.attr('name') != 'uuid'){
                      j_ele_telephone.val(self.telephone).change();
                  }
              }
              else{
                  // j_ele_telephone.val(null);
              }
          }
          catch(err) {
              console.log('err = ', err);
          }

          try{
              var j_ele_salt = $("#saltAssetRevaluationAssetRevaluation"+apart+"InputId");
              if (j_ele_salt.length > 0){
                  if (j_ele_salt.attr('name') != 'uuid'){
                      j_ele_salt.val(self.salt).change();
                  }
              }
              else{
                  // j_ele_salt.val(null);
              }
          }
          catch(err) {
              console.log('err = ', err);
          }

          try{
              var j_ele_onetime_passwd = $("#onetime_passwdAssetRevaluationAssetRevaluation"+apart+"InputId");
              if (j_ele_onetime_passwd.length > 0){
                  if (j_ele_onetime_passwd.attr('name') != 'uuid'){
                      j_ele_onetime_passwd.val(self.onetime_passwd).change();
                  }
              }
              else{
                  // j_ele_onetime_passwd.val(null);
              }
          }
          catch(err) {
              console.log('err = ', err);
          }

                      try{
                          var j_ele_avatar = $("#avatarAssetRevaluationAssetRevaluation"+apart+"FileAreaId");
                          if (j_ele_avatar.length > 0){
                              j_ele_avatar.html('');
                              
                  
                          var value=self.avatar;
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
                                          <i class="fas fa-times" style="color:gray" file-uuid="` + self.uuid + `" id="` + self.uuid + `btnDeleteId" onclick="avatarAssetRevaluationAssetRevaluationDeletedAttacthment(this)"></i>
                                      </div>
                                  </div>
                              `;
                          }
                  
                                  
                              j_ele_avatar.html(file_html);
                          }
                          else{
                              // j_ele_avatar.html('');
                          }
                      }
                      catch(err) {
                          console.log('err = ', err);
                      }
                              
                      try{
                          var j_ele_is_callbot = $("#is_callbotAssetRevaluationAssetRevaluation"+apart+"InputId");
                          if (j_ele_is_callbot.length > 0){
                              if (j_ele_is_callbot.attr('name') != 'uuid'){
                                  j_ele_is_callbot.prop('checked',self.is_callbot).change();
                              }
                          }
                          else{
                              // j_ele_is_callbot.val(null);
                          }
                      }
                      catch(err) {
                          console.log('err = ', err);
                      }
                              
          try{
              var j_ele_callbot_endpoint = $("#callbot_endpointAssetRevaluationAssetRevaluation"+apart+"InputId");
              if (j_ele_callbot_endpoint.length > 0){
                  if (j_ele_callbot_endpoint.attr('name') != 'uuid'){
                      j_ele_callbot_endpoint.val(self.callbot_endpoint).change();
                  }
              }
              else{
                  // j_ele_callbot_endpoint.val(null);
              }
          }
          catch(err) {
              console.log('err = ', err);
          }

                      try{
                          var j_ele_is_chatbot = $("#is_chatbotAssetRevaluationAssetRevaluation"+apart+"InputId");
                          if (j_ele_is_chatbot.length > 0){
                              if (j_ele_is_chatbot.attr('name') != 'uuid'){
                                  j_ele_is_chatbot.prop('checked',self.is_chatbot).change();
                              }
                          }
                          else{
                              // j_ele_is_chatbot.val(null);
                          }
                      }
                      catch(err) {
                          console.log('err = ', err);
                      }
                              
          try{
              var j_ele_chatbot_endpoint = $("#chatbot_endpointAssetRevaluationAssetRevaluation"+apart+"InputId");
              if (j_ele_chatbot_endpoint.length > 0){
                  if (j_ele_chatbot_endpoint.attr('name') != 'uuid'){
                      j_ele_chatbot_endpoint.val(self.chatbot_endpoint).change();
                  }
              }
              else{
                  // j_ele_chatbot_endpoint.val(null);
              }
          }
          catch(err) {
              console.log('err = ', err);
          }

              try{
                  var j_ele_manager = $("#managerAssetRevaluationAssetRevaluationAccount"+apart+"InputId");
                  if (j_ele_manager.length > 0){
                      var value=self["manager"]["uuid"];
                      j_ele_manager.val(value).change();
                  }
                  else{
                      // j_ele_manager.val(null);
                  }
              }
              catch(err) {
                  console.log('err = ', err);
              }

                      try{
                          var j_ele_log_confirm_by_email = $("#log_confirm_by_emailAssetRevaluationAssetRevaluation"+apart+"InputId");
                          if (j_ele_log_confirm_by_email.length > 0){
                              if (j_ele_log_confirm_by_email.attr('name') != 'uuid'){
                                  j_ele_log_confirm_by_email.prop('checked',self.log_confirm_by_email).change();
                              }
                          }
                          else{
                              // j_ele_log_confirm_by_email.val(null);
                          }
                      }
                      catch(err) {
                          console.log('err = ', err);
                      }
                              
                      try{
                          var j_ele_logged_with_password = $("#logged_with_passwordAssetRevaluationAssetRevaluation"+apart+"InputId");
                          if (j_ele_logged_with_password.length > 0){
                              if (j_ele_logged_with_password.attr('name') != 'uuid'){
                                  j_ele_logged_with_password.prop('checked',self.logged_with_password).change();
                              }
                          }
                          else{
                              // j_ele_logged_with_password.val(null);
                          }
                      }
                      catch(err) {
                          console.log('err = ', err);
                      }
                              
                      try{
                          var j_ele_created_free_license = $("#created_free_licenseAssetRevaluationAssetRevaluation"+apart+"InputId");
                          if (j_ele_created_free_license.length > 0){
                              if (j_ele_created_free_license.attr('name') != 'uuid'){
                                  j_ele_created_free_license.prop('checked',self.created_free_license).change();
                              }
                          }
                          else{
                              // j_ele_created_free_license.val(null);
                          }
                      }
                      catch(err) {
                          console.log('err = ', err);
                      }
                              
                      try{
                          var j_ele_email_activated = $("#email_activatedAssetRevaluationAssetRevaluation"+apart+"InputId");
                          if (j_ele_email_activated.length > 0){
                              if (j_ele_email_activated.attr('name') != 'uuid'){
                                  j_ele_email_activated.prop('checked',self.email_activated).change();
                              }
                          }
                          else{
                              // j_ele_email_activated.val(null);
                          }
                      }
                      catch(err) {
                          console.log('err = ', err);
                      }
                              
              try{
                  var j_ele_website_template = $("#website_templateWebsiteTemplateAssetRevaluationAssetRevaluation"+apart+"InputId");
                  if (j_ele_website_template.length > 0){
                      var value=self["website_template"]["uuid"];
                      j_ele_website_template.val(value).change();
                  }
                  else{
                      // j_ele_website_template.val(null);
                  }
              }
              catch(err) {
                  console.log('err = ', err);
              }

          try{
              var j_ele_language = $("#languageAssetRevaluationAssetRevaluation"+apart+"InputId");
              if (j_ele_language.length > 0){
                  if (j_ele_language.attr('name') != 'uuid'){
                      j_ele_language.val(self.language).change();
                  }
              }
              else{
                  // j_ele_language.val(null);
              }
          }
          catch(err) {
              console.log('err = ', err);
          }

          try{
              var j_ele_timezone = $("#timezoneAssetRevaluationAssetRevaluation"+apart+"InputId");
              if (j_ele_timezone.length > 0){
                  if (j_ele_timezone.attr('name') != 'uuid'){
                      j_ele_timezone.val(self.timezone).change();
                  }
              }
              else{
                  // j_ele_timezone.val(null);
              }
          }
          catch(err) {
              console.log('err = ', err);
          }

          try{
              var j_ele_app_permissions = $("#app_permissionsAppPermissionAssetRevaluationAssetRevaluation"+apart+"InputId");
              if (j_ele_app_permissions.length > 0){
                  var arr_value=[];
                  for(var i in self["app_permissions"]){
                      arr_value.push(self["app_permissions"][i]["uuid"]);
                  }
                  j_ele_app_permissions.val(arr_value).change();
              }
              else{
                  // j_ele_app_permissions.val(null);
              }
          }
          catch(err) {
              console.log('err = ', err);
          }

          try{
              var j_ele_signup_at = $("#signup_atAssetRevaluationAssetRevaluation"+apart+"InputId");
              if (j_ele_signup_at.length > 0){
                  var dateObj = new Date(Date.parse(self.signup_at)); 
                    if (dateObj != "Invalid Date"){
                      var newdate = moment(dateObj).format('DD/MM/YYYY');
                      console.log('newdate = ', newdate);
                      j_ele_signup_at.val(newdate).change();
                  }
              }
              else{
                  // j_ele_signup_at.val(null);
              }
          }
          catch(err) {
              console.log('err = ', err);
          }

          try{
              var j_ele_last_login_at = $("#last_login_atAssetRevaluationAssetRevaluation"+apart+"InputId");
              if (j_ele_last_login_at.length > 0){
                  var dateObj = new Date(Date.parse(self.last_login_at)); 
                    if (dateObj != "Invalid Date"){
                      var newdate = moment(dateObj).format('DD/MM/YYYY');
                      console.log('newdate = ', newdate);
                      j_ele_last_login_at.val(newdate).change();
                  }
              }
              else{
                  // j_ele_last_login_at.val(null);
              }
          }
          catch(err) {
              console.log('err = ', err);
          }

          try{
              var j_ele_extend_field = $("#extend_fieldExtendInfoAssetRevaluationAssetRevaluation"+apart+"InputId");
              if (j_ele_extend_field.length > 0){
                  var arr_value=[];
                  for(var i in self["extend_field"]){
                      arr_value.push(self["extend_field"][i]["uuid"]);
                  }
                  j_ele_extend_field.val(arr_value).change();
              }
              else{
                  // j_ele_extend_field.val(null);
              }
          }
          catch(err) {
              console.log('err = ', err);
          }

          try{
              var j_ele_password = $("#passwordAssetRevaluationAssetRevaluation"+apart+"InputId");
              if (j_ele_password.length > 0){
                  if (j_ele_password.attr('name') != 'uuid'){
                      j_ele_password.val(self.password).change();
                  }
              }
              else{
                  // j_ele_password.val(null);
              }
          }
          catch(err) {
              console.log('err = ', err);
          }

          try{
              var j_ele_updated_at = $("#updated_atAssetRevaluationAssetRevaluation"+apart+"InputId");
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
              var j_ele_created_at = $("#created_atAssetRevaluationAssetRevaluation"+apart+"InputId");
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
          url: AssetRevaluationAssetRevaluation_URL,
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
                  self = new AssetRevaluationAssetRevaluation(data);
                  AssetRevaluationAssetRevaluationGetDataTable(AssetRevaluationAssetRevaluationpagination["current_page"]);
                  if(is_continue_form){
                      is_continue_form=false;
                      toastr.success('Thêm mới thành công');
                      $(location).prop('href', "/Account/Account/create/");
                      

                  }else if(is_continue_modal){
                      is_continue_modal=false;
                      AccountRefreshCreateModal();
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
                  //                $(location).prop('href', "/Account/Account/create/");
                  //            }
                  //        },
                  //        Show:{
                  //            text: 'Chi tiết',
                  //            action: function(){
                  //                $(location).prop('href', "/Account/Account/detail/" + self.uuid + "/");
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
              
  // ########## [CREATE] post Objects to REST API --> return object if success ##############
//   tCreatePostApi(){
//       $.ajaxSetup({
//           headers : {
//               'CSRFToken' : getCSRFTokenValue(),
//               'X-CSRFToken' : getCSRFTokenValue(), // for --> SessionAuthentication
//           },
//           tryCount : 0,
//           retryLimit : 3,
//       });

//       var self = this;

//       $.ajax({
//           url: AssetRevaluationAssetRevaluation_URL,
//           type: "POST",
//           async: false,
//           cache: false,
//           timeout: 30000,

//           //data: JSON.stringify({data:"test"}),
//           //data: JSON.stringify(self),
//           data: JSON.stringify(self),
//           contentType: "application/json; charset=utf-8",
//           dataType: "json",
//           success: function (data) {
//                   self = new AssetRevaluationAssetRevaluation(data);
//                   AssetRevaluationAssetRevaluationGetDataTable(AssetRevaluationAssetRevaluationpagination["current_page"]);
//                   if(is_continue_form){
//                       is_continue_form=false;
//                       toastr.success('Thêm mới thành công');
//                       $(location).prop('href', "/Account/Account/create/");
                      

//                   }else if(is_continue_modal){
//                       is_continue_modal=false;
//                       AccountRefreshCreateModal();
//                       toastr.success('Thêm mới thành công');
//                   }else{
//                       $('.modal').modal('hide');
//                   //    $.confirm({
//                   //    title: 'THÀNH CÔNG',
//                   //    content: 'Thêm mới thành công',
//                   //    buttons: {
//                   //        NewOther:{
//                   //           text: 'Thêm mới',
//                   //            btnClass: 'btn-blue',
//                   //            keys: ['enter', 'shift'],
//                   //            action: function(){
//                   //                $(location).prop('href', "/Account/Account/create/");
//                   //            }
//                   //        },
//                   //        Show:{
//                   //            text: 'Chi tiết',
//                   //            action: function(){
//                   //                $(location).prop('href', "/Account/Account/detail/" + self.uuid + "/");
//                   //            }
//                   //       },
//                   //        close: {
//                   //            text: 'Hủy',
//                   //            action: function(){
//                   //               $('.modal').modal('hide');
//                   //            }
//                   //        },
//                   //    }
//                   //});
//                   }
//                   // self.tFillForm();
//           },
//           error: function (xhr, ajaxOptions, thrownError) {
//               console.log(xhr.status);
//               console.log(thrownError);
//               if (xhr.textStatus == 'timeout') {
//                   this.tryCount++;
//                   if (this.tryCount <= this.retryLimit) {
//                       //try again
//                       $.ajax(this);
//                       return;
//                   }
//                   return;
//               }
//               if(is_debug){
//                   $.alert({
//                       title: 'Error [' + xhr.status + '] ' + thrownError ,
//                       content: xhr.responseText,
//                   });
//               }
              
//           },
//       });
//       return self;
//   }
              
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
      var form;
      var arr_table = [];
      if(formId==null){
      formData = new FormData($('#AssetRevaluationAssetRevaluationCreateFormId')[0]);

      }
      else{
        // alert('POST này')
          form = $('#' + formId);
          if (form.length > 0) {
              form.find("table").each(function() {
                  console.log("table in form" + $(this));
                  obj = $(this);
                  arr_table.push(obj);
                  // $(this).remove();

              })
          }
        //   alert('day co consolelog');
          console.log(form)
          formData = new FormData();
          form.find(':input').each(function() {
              var attr = $(this).attr('name');
              var type = $(this).attr('type');
              var data_type = $(this).attr('data-type');
              //data-type='currency'
              var date = $(this).attr('data-datepicker');
            //   alert('xem hien bao lan')
              if (($(this).closest("table").length > 0 && $(this).closest("table").closest("form").attr("id") == formId) || ($(this).closest("form").length > 0 && $(this).closest("form").attr("id") != formId)) {
                  return;
              }
              if (typeof attr !== 'undefined' && attr !== false) {
                
                // alert('hello1')
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
                      else if(attr == 'revaluation'){
                        var selectedOptions = $('select[name="revaluation"]').val();
                        console.log(selectedOptions);

                        for (var i = 0; i < selectedOptions.length; i++) {
                            formData.append('revaluation', selectedOptions[i]);
                            }
                    
                        for (const [key, value] of formData.entries()) {
                            console.log(key, value);
                        }
                      }
                      else if(type == 'radio'){

                          if($(this).is(":checked")){
                              formData.set($(this).attr('name'),  $(this).val());
                          }
                      } else {
                        // alert('hello34')
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
                                if(attr != "revaluation"){
                                    formData.append($(this).attr('name'), $(this).val());
                              }
                          }
                      }
                  }
              }
          }});
      }
      
      var idForm = formData.get('uuid')
        console.log(idForm)
        $.ajax({
            url: AssetRevaluationAssetRevaluation_URL + idForm + "/",
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
                    self = new AssetRevaluationAssetRevaluation(data);
                    
                    AssetRevaluationAssetRevaluationGetDataTable(AssetRevaluationAssetRevaluationpagination["current_page"])
                    //$(location).prop('href', "/Account/Account/detail/" + self.uuid + "/");
                    $('.modal').modal('hide');
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
    var self = this;
    var formData;
    var form;
    var arr_table = [];
    if(formId==null){
    formData = new FormData($('#AssetRevaluationAssetRevaluationCreateFormId')[0]);

    }
    else{
      // alert('POST này')
        form = $('#' + formId);
        if (form.length > 0) {
            form.find("table").each(function() {
                console.log("table in form" + $(this));
                obj = $(this);
                arr_table.push(obj);
                // $(this).remove();

            })
        }
      //   alert('day co consolelog');
        console.log(form)
        formData = new FormData();
        form.find(':input').each(function() {
            var attr = $(this).attr('name');
            var type = $(this).attr('type');
            var data_type = $(this).attr('data-type');
            //data-type='currency'
            var date = $(this).attr('data-datepicker');
          //   alert('xem hien bao lan')
            if (($(this).closest("table").length > 0 && $(this).closest("table").closest("form").attr("id") == formId) || ($(this).closest("form").length > 0 && $(this).closest("form").attr("id") != formId)) {
                return;
            }
            if (typeof attr !== 'undefined' && attr !== false) {
              
              // alert('hello1')
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
                    else if(attr == 'revaluation'){
                      var selectedOptions = $('select[name="revaluation"]').val();
                      console.log(selectedOptions);

                      for (var i = 0; i < selectedOptions.length; i++) {
                          formData.append('revaluation', selectedOptions[i]);
                          }
                  
                      for (const [key, value] of formData.entries()) {
                          console.log(key, value);
                      }
                    }
                    else if(type == 'radio'){

                        if($(this).is(":checked")){
                            formData.set($(this).attr('name'),  $(this).val());
                        }
                    } else {
                      // alert('hello34')
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
                              if(attr != "revaluation"){
                                  formData.append($(this).attr('name'), $(this).val());
                            }
                        }
                    }
                }
            }
        }});
    }
    
    var idForm = formData.get('uuid')
      console.log(idForm)
      $.ajax({
          url: AssetRevaluationAssetRevaluation_URL,
          // type: "PUT",
          type: "POST",
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
                  self = new AssetRevaluationAssetRevaluation(data);
                  
                  AssetRevaluationAssetRevaluationGetDataTable(AssetRevaluationAssetRevaluationpagination["current_page"])
                  //$(location).prop('href', "/Account/Account/detail/" + self.uuid + "/");
                //   $('.modal').modal('hide');
                  $('#AssetRevaluationAssetRevaluationCancelCreateModalBtnId').click();
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
          url: AssetRevaluationAssetRevaluation_URL,
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
          url: AssetRevaluationAssetRevaluation_URL,
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
          url: AssetRevaluationAssetRevaluation_URL + uuid + "/",
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
    $.confirm({
        icon: 'fa fa-warning',
        title: 'Xóa Danh Gia Lai Tai San',
        content: 'Bạn có chắc muốn xóa danh gia lai tai san này không ?',
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
                btnClass: 'btn-red',
                action: function() {
                    $(this).ready(function(){
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
                            url: AssetRevaluationAssetRevaluation_URL + uuid_go + "/",
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
                                AssetRevaluationAssetRevaluationGetDataTable(AssetRevaluationAssetRevaluationpagination["current_page"]);
                                if(cr_uuid!=""){
                                    $(location).prop('href', "/Account/Account/create/");
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
                    });
                }
            },

        }
    })
     
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
          url: AssetRevaluationAssetRevaluation_URL + uuid_go + "/",
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
              AssetRevaluationAssetRevaluationSearchData(AssetRevaluationAssetRevaluationpagination["current_page"],"filter",data_search);
              if(cr_uuid!=""){
                  $(location).prop('href', "/Account/Account/create/");
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
          url: AssetRevaluationAssetRevaluation_REMOVEFILE_URL+uuid+"/",
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
          url: AssetRevaluationAssetRevaluation_URL+uuid+"/",
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
      console.log('cool')
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
          url: AssetRevaluationAssetRevaluation_URL+has_go_page,
          type: "GET",
          //async: false,
          cache: false,
          timeout: 30000,

          success: function (data) {
              console.log('[tGetAllObjApi] data = ', data);
              // return new AssetRevaluationAssetRevaluation(data);
              if (data.hasOwnProperty('count')){
                  AssetRevaluationAssetRevaluationpagination["total"]=data.count;
              }
              if (data.hasOwnProperty('count')){
                  AssetRevaluationAssetRevaluationpagination["total"]=data.count;
              }
              if (data.hasOwnProperty('next')){
                  if(data.next != null){
                  AssetRevaluationAssetRevaluationpagination["has_next"]=true;
                  }else{
                  AssetRevaluationAssetRevaluationpagination["has_next"]=false;

                  }
              }
              AssetRevaluationAssetRevaluationpagination["current_page"]=page;
              if (data.hasOwnProperty('previous')){
                  if(data.previous != null){
                  AssetRevaluationAssetRevaluationpagination["has_prev"]=true;
                  }else{
                  AssetRevaluationAssetRevaluationpagination["has_prev"]=false;
                  }
              }
              if (data.hasOwnProperty('results')){
                  for (var j=0; j < data.results.length; j++){
                      var tmp = new AssetRevaluationAssetRevaluation(data.results[j]);
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
          url: AssetRevaluationAssetRevaluation_LARGE_URL+has_go_page,
          type: "GET",
          //async: false,
          cache: false,
          timeout: 30000,

          success: function (data) {
              console.log('[tGetAllObjLargeApi] data = ', data);
              // return new AssetRevaluationAssetRevaluation(data);
              if (data.hasOwnProperty('count')){
                  AssetRevaluationAssetRevaluationpagination["total"]=data.count;
              }
              if (data.hasOwnProperty('count')){
                  AssetRevaluationAssetRevaluationpagination["total"]=data.count;
              }
              if (data.hasOwnProperty('next')){
                  if(data.next != null){
                  AssetRevaluationAssetRevaluationpagination["has_next"]=true;
                  }else{
                  AssetRevaluationAssetRevaluationpagination["has_next"]=false;

                  }
              }
              AssetRevaluationAssetRevaluationpagination["current_page"]=page;
              if (data.hasOwnProperty('previous')){
                  if(data.previous != null){
                  AssetRevaluationAssetRevaluationpagination["has_prev"]=true;
                  }else{
                  AssetRevaluationAssetRevaluationpagination["has_prev"]=false;
                  }
              }
              if (data.hasOwnProperty('results')){
                  for (var j=0; j < data.results.length; j++){
                      var tmp = new AssetRevaluationAssetRevaluation(data.results[j]);
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
        // alert('1111111')
          SEARCH_URL=AssetRevaluationAssetRevaluation_URL;
          
              slugSearch="&";
          
                              if($("#full_nameAssetRevaluationAssetRevaluationFilterSearchInputId").length>0){
                                  var value=$("#full_nameAssetRevaluationAssetRevaluationFilterSearchInputId").val();
                                  if(value!="" && value!=null){
                                      slugSearch+="full_name__contains="+value+"&";
                                  }
                              }
                              
                          slugSearch=slugSearch.slice(0, -1);
      }else{
          SEARCH_URL=AssetRevaluationAssetRevaluation_URL;
          
            slugSearch="&";
            slugSearch+="search="+$("#AssetRevaluationAssetRevaluationQuickSearchInputId").val();
          
      }
      if(search_data!=null){
          SEARCH_URL=AssetRevaluationAssetRevaluation_URL;
          slugSearch="&";
          slugSearch+=search_data;
      }
      search_log["search_data"] = slugSearch;
      this.callAjax =
      $.ajax({
          url: AssetRevaluationAssetRevaluation_URL+has_go_page+slugSearch,
          type: "GET",
          //async: false,
          cache: false,
          timeout: 30000,

          success: function (data) {
              console.log('[tGetAllObjApi] data = ', data);
              // return new AssetRevaluationAssetRevaluation(data);
              if (data.hasOwnProperty('count')){
                  AssetRevaluationAssetRevaluationpagination["total"]=data.count;
              }
              if (data.hasOwnProperty('count')){
                  AssetRevaluationAssetRevaluationpagination["total"]=data.count;
              }
              if (data.hasOwnProperty('next')){
                  if(data.next != null){
                  AssetRevaluationAssetRevaluationpagination["has_next"]=true;
                  }else{
                  AssetRevaluationAssetRevaluationpagination["has_next"]=false;

                  }
              }
              AssetRevaluationAssetRevaluationpagination["current_page"]=page;
              if (data.hasOwnProperty('previous')){
                  if(data.previous != null){
                  AssetRevaluationAssetRevaluationpagination["has_prev"]=true;
                  }else{
                  AssetRevaluationAssetRevaluationpagination["has_prev"]=false;
                  }
              }
              if (data.hasOwnProperty('results')){
                  for (var j=0; j < data.results.length; j++){
                      var tmp = new AssetRevaluationAssetRevaluation(data.results[j]);
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
          SEARCH_URL=AssetRevaluationAssetRevaluation_LARGE_FILTER_URL;
          
              slugSearch="&";
          
                              if($("#full_nameAssetRevaluationAssetRevaluationFilterSearchInputId").length>0){
                                  var value=$("#full_nameAssetRevaluationAssetRevaluationFilterSearchInputId").val();
                                  if(value!="" && value!=null){
                                      slugSearch+="full_name__contains="+value+"&";
                                  }
                              }
                              
                          slugSearch=slugSearch.slice(0, -1);
      }else{
          SEARCH_URL=AssetRevaluationAssetRevaluation_SEARCH_URL;
          
              slugSearch="&";
              slugSearch+="search="+$("#AssetRevaluationAssetRevaluationQuickSearchInputId").val();
          
      }
      if(search_data!=null){
          SEARCH_URL=AssetRevaluationAssetRevaluation_LARGE_FILTER_URL;
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
              // return new AssetRevaluationAssetRevaluation(data);
              if (data.hasOwnProperty('count')){
                  AssetRevaluationAssetRevaluationpagination["total"]=data.count;
              }
              if (data.hasOwnProperty('count')){
                  AssetRevaluationAssetRevaluationpagination["total"]=data.count;
              }
              if (data.hasOwnProperty('next')){
                  if(data.next != null){
                  AssetRevaluationAssetRevaluationpagination["has_next"]=true;
                  }else{
                  AssetRevaluationAssetRevaluationpagination["has_next"]=false;

                  }
              }
              AssetRevaluationAssetRevaluationpagination["current_page"]=page;
              if (data.hasOwnProperty('previous')){
                  if(data.previous != null){
                  AssetRevaluationAssetRevaluationpagination["has_prev"]=true;
                  }else{
                  AssetRevaluationAssetRevaluationpagination["has_prev"]=false;
                  }
              }
              if (data.hasOwnProperty('results')){
                  for (var j=0; j < data.results.length; j++){
                      var tmp = new AssetRevaluationAssetRevaluation(data.results[j]);
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
      console.log('Vao roi')
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
          url:  AssetRevaluationAssetRevaluation_URL+ uuid + "/",
          type: "GET",
          async: false,
          cache: false,
          timeout: 30000,

          success: function (data) {
              console.log('[tGetObjApi] data = ', data);
              var n_obj = new AssetRevaluationAssetRevaluation(data);
              console.log('n_obj = ', n_obj);
              n_obj.tFillForm();
              return n_obj;
              // if (data.hasOwnProperty('results')){
              //    if (data.results.length > 0){
              //        var tmp = new AssetRevaluationAssetRevaluation(data[i]);
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
      var tbId = "AssetRevaluationAssetRevaluationDataTableId";
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
      var tbId = "AssetRevaluationAssetRevaluationDataTableId";
      var table = $("#" + tbId);
      if (table.length > 0){
          var tableData = table.DataTable();
          var rowData = [
              `<a href="` + this.detailUrl + `">` + ACCOUNT_ID_TABLE_COUNT + `</a>`,
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
    console.log('great')
    var tbId = "AssetRevaluationAssetRevaluationDataTableId";
    if(tableId!=null){
        tbId = tableId;
    }

    if(order==null){
    order=ACCOUNT_ID_TABLE_COUNT;
    }
    var table = $("#" + tbId);
    if (table.length > 0){
        var html = "<tr>"
        html+= `<td><p>` + order + `</p></td>`;
        // Get All Attribute of thead
        var tableHeaders = table.find('thead th');
        var tableBody = table.find('tbody');
        //tableBody.html('');
        for (var thId = 1; thId < tableHeaders.length; thId++){
            var hEle = tableHeaders[thId];
            var attr = hEle.getAttribute('attr-name');
            if (this.hasOwnProperty(attr)){
                  
                      if(attr=="groups"){
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
                      
                      if(attr=="user_permissions"){
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
                      
                      if(attr=="date_of_birth"){
                          html +=`<td class="text-wrap"><a>` + GetDateOnly_V01(this[attr]) + `</a></td>`;
                              continue;
                          }
                      
                      if(attr=="avatar"){
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
                                      <i class="fas fa-times" style="color:gray" file-uuid="` + this["uuid"] + `" id="` + this["uuid"] + `btnDeleteId" onclick="avatarAssetRevaluationAssetRevaluationDeletedAttacthment(this)"></i>
                                  </div>
                              </div>
                          </td>
                          `;
                          continue;
                      }
                      
                      if(attr=="is_callbot"){
                          var value="";
                          if(this[attr] || this[attr]=="true"){
                              value="checked";
                          }
                          html +=`<td class="text-center">
                                  <div class="custom-control custom-switch">
                                      <input class="custom-control-input" id="${this["uuid"]}is_callbotAssetRevaluationAssetRevaluationSwitchListTablebtnId" name="`+ attr +`" data-uuid="` + this["uuid"] + `" type="checkbox"  `+value+` onclick="is_callbotAssetRevaluationAssetRevaluationEventChangeSwitcher(this)">
                                  <label class="custom-control-label" for="${this["uuid"]}is_callbotAssetRevaluationAssetRevaluationSwitchListTablebtnId"></label>
                                  </div></td>`;
                              continue;
                          }
                      
                      if(attr=="is_chatbot"){
                          var value="";
                          if(this[attr] || this[attr]=="true"){
                              value="checked";
                          }
                          html +=`<td class="text-center">
                                  <div class="custom-control custom-switch">
                                      <input class="custom-control-input" id="${this["uuid"]}is_chatbotAssetRevaluationAssetRevaluationSwitchListTablebtnId" name="`+ attr +`" data-uuid="` + this["uuid"] + `" type="checkbox"  `+value+` onclick="is_chatbotAssetRevaluationAssetRevaluationEventChangeSwitcher(this)">
                                  <label class="custom-control-label" for="${this["uuid"]}is_chatbotAssetRevaluationAssetRevaluationSwitchListTablebtnId"></label>
                                  </div></td>`;
                              continue;
                          }
                      
                      if(attr=="manager"){
                          
                          var name=this[attr]["name"];
                          if (name == undefined){
                              name = "-"
                          }

                          html +=`<td class="text-wrap"><a>` + name + `</a></td>`;
                          
                          continue;
                      }
                      
                      if(attr=="log_confirm_by_email"){
                          var value="";
                          if(this[attr] || this[attr]=="true"){
                              value="checked";
                          }
                          html +=`<td class="text-center">
                                  <div class="custom-control custom-switch">
                                      <input class="custom-control-input" id="${this["uuid"]}log_confirm_by_emailAssetRevaluationAssetRevaluationSwitchListTablebtnId" name="`+ attr +`" data-uuid="` + this["uuid"] + `" type="checkbox"  `+value+` onclick="log_confirm_by_emailAssetRevaluationAssetRevaluationEventChangeSwitcher(this)">
                                  <label class="custom-control-label" for="${this["uuid"]}log_confirm_by_emailAssetRevaluationAssetRevaluationSwitchListTablebtnId"></label>
                                  </div></td>`;
                              continue;
                          }
                      
                      if(attr=="logged_with_password"){
                          var value="";
                          if(this[attr] || this[attr]=="true"){
                              value="checked";
                          }
                          html +=`<td class="text-center">
                                  <div class="custom-control custom-switch">
                                      <input class="custom-control-input" id="${this["uuid"]}logged_with_passwordAssetRevaluationAssetRevaluationSwitchListTablebtnId" name="`+ attr +`" data-uuid="` + this["uuid"] + `" type="checkbox"  `+value+` onclick="logged_with_passwordAssetRevaluationAssetRevaluationEventChangeSwitcher(this)">
                                  <label class="custom-control-label" for="${this["uuid"]}logged_with_passwordAssetRevaluationAssetRevaluationSwitchListTablebtnId"></label>
                                  </div></td>`;
                              continue;
                          }
                      
                      if(attr=="created_free_license"){
                          var value="";
                          if(this[attr] || this[attr]=="true"){
                              value="checked";
                          }
                          html +=`<td class="text-center">
                                  <div class="custom-control custom-switch">
                                      <input class="custom-control-input" id="${this["uuid"]}created_free_licenseAssetRevaluationAssetRevaluationSwitchListTablebtnId" name="`+ attr +`" data-uuid="` + this["uuid"] + `" type="checkbox"  `+value+` onclick="created_free_licenseAssetRevaluationAssetRevaluationEventChangeSwitcher(this)">
                                  <label class="custom-control-label" for="${this["uuid"]}created_free_licenseAssetRevaluationAssetRevaluationSwitchListTablebtnId"></label>
                                  </div></td>`;
                              continue;
                          }
                      
                      if(attr=="email_activated"){
                          var value="";
                          if(this[attr] || this[attr]=="true"){
                              value="checked";
                          }
                          html +=`<td class="text-center">
                                  <div class="custom-control custom-switch">
                                      <input class="custom-control-input" id="${this["uuid"]}email_activatedAssetRevaluationAssetRevaluationSwitchListTablebtnId" name="`+ attr +`" data-uuid="` + this["uuid"] + `" type="checkbox"  `+value+` onclick="email_activatedAssetRevaluationAssetRevaluationEventChangeSwitcher(this)">
                                  <label class="custom-control-label" for="${this["uuid"]}email_activatedAssetRevaluationAssetRevaluationSwitchListTablebtnId"></label>
                                  </div></td>`;
                              continue;
                          }
                      
                      if(attr=="website_template"){
                          
                          var name=this[attr]["name"];
                          if (name == undefined){
                              name = "-"
                          }

                          html +=`<td class="text-wrap"><a>` + name + `</a></td>`;
                          
                          continue;
                      }
                      
                      if(attr=="app_permissions"){
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
                      
                      if(attr=="signup_at"){
                          html +=`<td class="text-wrap"><a>` + GetDateOnly_V01(this[attr]) + `</a></td>`;
                              continue;
                          }
                      
                      if(attr=="last_login_at"){
                          html +=`<td class="text-wrap"><a>` + GetDateOnly_V01(this[attr]) + `</a></td>`;
                              continue;
                          }
                      
                      if(attr=="extend_field"){
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
                      
                      if(attr=="updated_at"){
                          html +=`<td class="text-wrap"><a>` + GetDateOnly_V01(this[attr]) + `</a></td>`;
                              continue;
                          }
                      
                      if(attr=="created_at"){
                          html +=`<td class="text-wrap"><a>` + GetDateOnly_V01(this[attr]) + `</a></td>`;
                              continue;
                          }
                      
                        if(attr=="name"){
                            html +=`<td class="text-wrap" style="min-width:300px;font-weight:680" onclick="AssetRevaluationAssetRevaluationDetails('`+this["uuid"]+`')"><a>` + (this[attr]) + `</a></td>`;
                                continue;
                        }
                  //html +=`<td class="text-wrap"><a>` + (this[attr]) + `</a></td>`;
                  html +=`<td class="text-wrap">` + (this[attr]) + `</td>`;
              }
              
              else{
                  if(attr=="account-admin-action")
                  {
                      html += 
                      `<td>
                        <div class="btn-group mb-2 mr-2">
                            <button type="button" class="btn  btn-outline-dark dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="sr-only"></span></button>
                            <div class="dropdown-menu">
                                <a class="dropdown-item d-flex align-items-center L-Affiliate-Tagged" onclick="AssetRevaluationAssetRevaluationDetails('`+this.uuid+`')">             
                                    <i title="Xem chi tiết" class="far fa-eye" onclick="AssetRevaluationAssetRevaluationDetails" aria-hidden="true"></i>
                                        <span class="sr-only">Xem chi tiết</span> &nbsp;                
                                        Xem Chi Tiết              
                                </a>            
                                <a class="dropdown-item d-flex align-items-center L-Affiliate-Tagged" onclick="AssetRevaluationAssetRevaluationEdit('`+this.uuid+`')">               
                                    <i title="Chỉnh sửa" class="far fa-edit" onclick="AssetRevaluationAssetRevaluationEdit" aria-hidden="true"></i>
                                        <span class="sr-only">Chỉnh sửa</span>   &nbsp;                
                                        Chỉnh Sửa                        
                                </a>            
                                <a class="dropdown-item d-flex align-items-center L-Affiliate-Tagged" onclick="AssetRevaluationAssetRevaluationOnDeleteEvent('`+this.uuid+`')">               
                                    <i title="Xóa" class="far fa-trash-alt" onclick="AssetRevaluationAssetRevaluationOnDeleteEvent" aria-hidden="true"></i><span class="sr-only">Xóa</span>&nbsp;                
                                    Xóa Dữ Liệu          
                                </a> 
                            </div>
                        </div>
                        </td>`

                    //   BindActionButtonVer4(
                    //       AssetRevaluationAssetRevaluation_arr_action,
                    //       this['id'],
                    //       this,
                    //       null,
                    //       this['created_by'],
                    //   );
                  }else
                  {
                      
                      if(attr=="is_callbot"){
                          var value="";
                          if(this[attr] || this[attr]=="true"){
                              value="checked";
                          }
                          html +=`<td class="text-center">
                                  <div class="custom-control custom-switch">
                                      <input class="custom-control-input" id="${this["uuid"]}is_callbotAssetRevaluationAssetRevaluationSwitchListTablebtnId" name="`+ attr +`" data-uuid="` + this["uuid"] + `" type="checkbox"  `+value+` onclick="is_callbotAssetRevaluationAssetRevaluationEventChangeSwitcher(this)">
                                  <label class="custom-control-label" for="${this["uuid"]}is_callbotAssetRevaluationAssetRevaluationSwitchListTablebtnId"></label>
                                  </div></td>`;
                              continue;
                          }
                      
                      if(attr=="is_chatbot"){
                          var value="";
                          if(this[attr] || this[attr]=="true"){
                              value="checked";
                          }
                          html +=`<td class="text-center">
                                  <div class="custom-control custom-switch">
                                      <input class="custom-control-input" id="${this["uuid"]}is_chatbotAssetRevaluationAssetRevaluationSwitchListTablebtnId" name="`+ attr +`" data-uuid="` + this["uuid"] + `" type="checkbox"  `+value+` onclick="is_chatbotAssetRevaluationAssetRevaluationEventChangeSwitcher(this)">
                                  <label class="custom-control-label" for="${this["uuid"]}is_chatbotAssetRevaluationAssetRevaluationSwitchListTablebtnId"></label>
                                  </div></td>`;
                              continue;
                          }
                      
                      if(attr=="log_confirm_by_email"){
                          var value="";
                          if(this[attr] || this[attr]=="true"){
                              value="checked";
                          }
                          html +=`<td class="text-center">
                                  <div class="custom-control custom-switch">
                                      <input class="custom-control-input" id="${this["uuid"]}log_confirm_by_emailAssetRevaluationAssetRevaluationSwitchListTablebtnId" name="`+ attr +`" data-uuid="` + this["uuid"] + `" type="checkbox"  `+value+` onclick="log_confirm_by_emailAssetRevaluationAssetRevaluationEventChangeSwitcher(this)">
                                  <label class="custom-control-label" for="${this["uuid"]}log_confirm_by_emailAssetRevaluationAssetRevaluationSwitchListTablebtnId"></label>
                                  </div></td>`;
                              continue;
                          }
                      
                      if(attr=="logged_with_password"){
                          var value="";
                          if(this[attr] || this[attr]=="true"){
                              value="checked";
                          }
                          html +=`<td class="text-center">
                                  <div class="custom-control custom-switch">
                                      <input class="custom-control-input" id="${this["uuid"]}logged_with_passwordAssetRevaluationAssetRevaluationSwitchListTablebtnId" name="`+ attr +`" data-uuid="` + this["uuid"] + `" type="checkbox"  `+value+` onclick="logged_with_passwordAssetRevaluationAssetRevaluationEventChangeSwitcher(this)">
                                  <label class="custom-control-label" for="${this["uuid"]}logged_with_passwordAssetRevaluationAssetRevaluationSwitchListTablebtnId"></label>
                                  </div></td>`;
                              continue;
                          }
                      
                      if(attr=="created_free_license"){
                          var value="";
                          if(this[attr] || this[attr]=="true"){
                              value="checked";
                          }
                          html +=`<td class="text-center">
                                  <div class="custom-control custom-switch">
                                      <input class="custom-control-input" id="${this["uuid"]}created_free_licenseAssetRevaluationAssetRevaluationSwitchListTablebtnId" name="`+ attr +`" data-uuid="` + this["uuid"] + `" type="checkbox"  `+value+` onclick="created_free_licenseAssetRevaluationAssetRevaluationEventChangeSwitcher(this)">
                                  <label class="custom-control-label" for="${this["uuid"]}created_free_licenseAssetRevaluationAssetRevaluationSwitchListTablebtnId"></label>
                                  </div></td>`;
                              continue;
                          }
                      
                      if(attr=="email_activated"){
                          var value="";
                          if(this[attr] || this[attr]=="true"){
                              value="checked";
                          }
                          html +=`<td class="text-center">
                                  <div class="custom-control custom-switch">
                                      <input class="custom-control-input" id="${this["uuid"]}email_activatedAssetRevaluationAssetRevaluationSwitchListTablebtnId" name="`+ attr +`" data-uuid="` + this["uuid"] + `" type="checkbox"  `+value+` onclick="email_activatedAssetRevaluationAssetRevaluationEventChangeSwitcher(this)">
                                  <label class="custom-control-label" for="${this["uuid"]}email_activatedAssetRevaluationAssetRevaluationSwitchListTablebtnId"></label>
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
      console.log("hihow")
      var tbId = "AssetRevaluationAssetRevaluationDataTableId";
      if(tableId!=null){
          tbId = tableId;
      }

      if(order==null){
      order=ACCOUNT_ID_TABLE_COUNT;
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
                  
                      if(attr=="groups"){
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
                      
                      if(attr=="user_permissions"){
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
                      
                      if(attr=="date_of_birth"){
                          html +=`<td class="text-wrap"><a>` + GetDateOnly_V01(this[attr]) + `</a></td>`;
                              continue;
                          }
                      
                          if(attr=="avatar"){
                              
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
                      
                      if(attr=="is_callbot"){
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
                      
                      if(attr=="is_chatbot"){
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
                      
                      if(attr=="manager"){
                          
                          var name=this[attr]["name"];
                          if (name == undefined){
                                  name = "-"
                              }
                          html +=`<td class="text-wrap"><a>` + name + `</a></td>`;
                          
                          continue;
                      }
                      
                      if(attr=="log_confirm_by_email"){
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
                      
                      if(attr=="logged_with_password"){
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
                      
                      if(attr=="created_free_license"){
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
                      
                      if(attr=="email_activated"){
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
                      
                      if(attr=="website_template"){
                          
                          var name=this[attr]["name"];
                          if (name == undefined){
                                  name = "-"
                              }
                          html +=`<td class="text-wrap"><a>` + name + `</a></td>`;
                          
                          continue;
                      }
                      
                      if(attr=="app_permissions"){
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
                      
                      if(attr=="signup_at"){
                          html +=`<td class="text-wrap"><a>` + GetDateOnly_V01(this[attr]) + `</a></td>`;
                              continue;
                          }
                      
                      if(attr=="last_login_at"){
                          html +=`<td class="text-wrap"><a>` + GetDateOnly_V01(this[attr]) + `</a></td>`;
                              continue;
                          }
                      
                      if(attr=="extend_field"){
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
                  if(attr=="account-admin-action")
                  {
                      html +=`<td class="text-center d-none">
                      <a  onclick="Account`+action+`DeteleRowAddingTable(this)"> &nbsp;
                          <i title="Xóa" class="fas fa-trash" onclick="Account`+action+`DeteleRowAddingTable(this)"></i>&nbsp;
                                          Xóa 
                      </a></td>
                      `;
                      
                  }else
                  {
                  
                      if(attr=="is_callbot"){
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
                      
                      if(attr=="is_chatbot"){
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
                      
                      if(attr=="log_confirm_by_email"){
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
                      
                      if(attr=="logged_with_password"){
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
                      
                      if(attr=="created_free_license"){
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
                      
                      if(attr=="email_activated"){
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
    var card_Id = "AssetRevaluationAssetRevaluationCardAreaId";
    if(cardId!=null){
        card_Id = cardId;
    }

    if(order==null){
    order=ACCOUNT_ID_TABLE_COUNT;
    }
    var card_area = $("#" + card_Id);
    if (card_area.length > 0){
        var card_template = card_area.find(".AssetRevaluationAssetRevaluationTemplateCardClass");
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

                    
                    if(attr=="groups"){
                        var all_name="";
                        for(var i in this[attr]){
                            var name = this[attr][i]["name"];
                            if (name == undefined){
                                name = ""
                            }
                            all_name+= name+",";
                        }
                        $(hEle).html(all_name);
                            continue;
                        }
                    
                    if(attr=="user_permissions"){
                        var all_name="";
                        for(var i in this[attr]){
                            var name = this[attr][i]["name"];
                            if (name == undefined){
                                name = ""
                            }
                            all_name+= name+",";
                        }
                        $(hEle).html(all_name);
                            continue;
                        }
                    
                    if(attr=="date_of_birth"){
                        $(hEle).html(GetDateOnly_V01(this[attr]))
                        continue;
                        }
                    
                        if(attr=="avatar"){
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
                                        <i class="fas fa-times" style="color:gray" file-uuid="` + this["uuid"] + `" id="` + this["uuid"] + `btnDeleteId" onclick="avatarAssetRevaluationAssetRevaluationDeletedAttacthment(this)"></i>
                                    </div>
                                </div>
                            `);
                            continue;
                        }
                    
                    if(attr=="is_callbot"){
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
                    
                    if(attr=="is_chatbot"){
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
                    
                    if(attr=="manager"){
                        
                        var name=this[attr]["name"];
                        if (name == undefined){
                            name = "-"
                        }
                        $(hEle).html(name);
                        continue;
                    }
                    
                    if(attr=="log_confirm_by_email"){
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
                    
                    if(attr=="logged_with_password"){
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
                    
                    if(attr=="created_free_license"){
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
                    
                    if(attr=="email_activated"){
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
                    
                    if(attr=="website_template"){
                        
                        var name=this[attr]["name"];
                        if (name == undefined){
                            name = "-"
                        }
                        $(hEle).html(name);
                        continue;
                    }
                    
                    if(attr=="app_permissions"){
                        var all_name="";
                        for(var i in this[attr]){
                            var name = this[attr][i]["name"];
                            if (name == undefined){
                                name = ""
                            }
                            all_name+= name+",";
                        }
                        $(hEle).html(all_name);
                            continue;
                        }
                    
                    if(attr=="signup_at"){
                        $(hEle).html(GetDateOnly_V01(this[attr]))
                        continue;
                        }
                    
                    if(attr=="last_login_at"){
                        $(hEle).html(GetDateOnly_V01(this[attr]))
                        continue;
                        }
                    
                    if(attr=="extend_field"){
                        var all_name="";
                        for(var i in this[attr]){
                            var name = this[attr][i]["name"];
                            if (name == undefined){
                                name = ""
                            }
                            all_name+= name+",";
                        }
                        $(hEle).html(all_name);
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
                        $(hEle).html(`<a onclick="AssetRevaluationAssetRevaluationDetails('`+this["uuid"]+`')">` + (this[attr]) + `</a>`);
                        continue;
                    }
                    $(hEle).html(`<a>` + (this[attr]) + `</a>`);

                }
            }
            var action_button = BindActionButtonVer5(
                            AssetRevaluationAssetRevaluation_arr_action,
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

   
function AssetRevaluationAssetRevaluationDetails(uuid){
    console.log(uuid);
    $('#AssetRevaluationAssetRevaluationDetailmodalsId').modal('toggle');
    var obj=new AssetRevaluationAssetRevaluation();
    obj.tGetObjApi(uuid);
    obj.callAjax.then(function(data) {
        new  AssetRevaluationAssetRevaluation(data).tFillFormModal('Detail','AssetRevaluationAssetRevaluationDetailModalsFormId');

    })
    //obj.tFillFormModal('Detail');

}

function AssetRevaluationAssetRevaluationEdit(uuid){
    console.log('vao 1')
    $('#AssetRevaluationAssetRevaluationEditmodalsId').modal('toggle');
    var obj=new AssetRevaluationAssetRevaluation();
    obj.tGetObjApi(uuid);
    obj.callAjax.then(function(data) {
        new  AssetRevaluationAssetRevaluation(data).tFillFormModal('Edit','AssetRevaluationAssetRevaluationEditModalsFormId');

    })
    //obj.tFillFormModal('Edit');
}


function AssetRevaluationAssetRevaluationOnDeleteEvent(uuid){
    var obj=new AssetRevaluationAssetRevaluation();
    obj.tDeleteApi(uuid);
}

$(document).ready(function(){
    $("#AssetRevaluationAssetRevaluationUpdateModalBtnId").click(function(){
        // var validate_obj = new InputValidation('AssetRevaluationAssetRevaluationEditModalsFormId');
        // if(validate_obj.validateRequired()){
        //     toastr.warning('Vui lòng điền đầy đủ thông tin');
        //     return;

        // }
        obj = new AssetRevaluationAssetRevaluation();
        console.log('Update obj = ', obj);
        obj.tUpdatePostApi('AssetRevaluationAssetRevaluationEditModalsFormId');
    })
});

$(document).ready(function(){
    $("#AssetRevaluationAssetRevaluationCreateModalBtnId").click(function(){
        var validate_obj = new InputValidation('AssetRevaluationAssetRevaluationCreateModalsFormId');
        if(validate_obj.validateRequired()){
            toastr.warning('Vui lòng điền đầy đủ thông tin');
            return;
        }
        obj = new AssetRevaluationAssetRevaluation();
        console.log('Save obj = ', obj);
        obj.tCreateNewPostFormApi('AssetRevaluationAssetRevaluationCreateModalsFormId');
    })
});

var AssetRevaluationAssetRevaluationpagination={
  current_page:1,
  total:0,
  has_next:false,
  has_prev:false
}

var AssetRevaluationAssetRevaluationrecord_in_page = 5;

function ShowOption1(event,formid,searchid){
    if (event.keyCode === 13) {
      let search = $(searchid).val();
      $(formid).empty();
      var first_option = '<option value="" selected disabled>Select an option contains: '+search+'</option>'
      $(formid).append(first_option); 
      var search1 = "?search=" + search
      $.ajax({
        url: DepreciationAssetAll_URL + search1,
        type: "GET",
        success: function(data) {
            var event_data = '';
            var length_data = data.results.length;
            for (var j = 0; j < length_data; j++) {
                var datare = data.results[j];
                console.log(datare.uuid);
                event_data += '<option value="' + datare.uuid + '">' + datare.name +'-'+datare.code+ '</option>';
            }
            $(formid).append(event_data);
        },
        error: function() {
          alert("Failed to load options 1.");
        }
      });
    } 
}


$(document).ready(function(){
    $("#AssetRevaluationAssetRevaluationQuickSearchInputId").on('keyup', function(e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            AssetRevaluationAssetRevaluationpagination={
                current_page:1,
                total:0,
                has_next:false,
                has_prev:false
            }
            AssetRevaluationAssetRevaluationSearchData(AssetRevaluationAssetRevaluationpagination["current_page"],"quick");
        }
    })
    $("#AssetRevaluationAssetRevaluationQuickSearchBtnId").click(function(){
        AssetRevaluationAssetRevaluationpagination={
            current_page:1,
            total:0,
            has_next:false,
            has_prev:falseGAssetRevaluationAssetRevaluationSearchData(AssetRevaluationAssetRevaluationpagination["current_page"],"quick")
    }});
    $("#AssetRevaluationAssetRevaluationSearchBtnId").click(function(){
        AssetRevaluationAssetRevaluationpagination={
            current_page:1,
            total:0,
            has_next:false,
            has_prev:false
    }
        AssetRevaluationAssetRevaluationSearchData(AssetRevaluationAssetRevaluationpagination["current_page"],"filter");
    })
});

function AssetRevaluationAssetRevaluationSearchData(page=1,search_type,search_data=null){
    search_log["search_func"] = "AssetRevaluationAssetRevaluationSearchData";
    search_log["search_type"] = search_type;
    search_log["search_data"] = search_data;
        var obj = new AssetRevaluationAssetRevaluation();
        var results = obj.tSearchAllObjApi(page,search_data,search_type);
        obj.callAjax.then(function(data) {
        $("#AssetRevaluationAssetRevaluationTableBodyId").empty();
        var body = $("#AssetRevaluationAssetRevaluationDataTableId");
        //if (body.length > 0){
        //    var bodyTable = body.DataTable();
        //    bodyTable.clear();
        //}
        ACCOUNT_ID_TABLE_COUNT = 1;
        crr_record_in_page = AssetRevaluationAssetRevaluationrecord_in_page;
        if(page>1){
        ACCOUNT_ID_TABLE_COUNT =1+crr_record_in_page*page-crr_record_in_page;
        }
        for (var i = 0; i < results.length; i++){
            try{
                console.log('results[i]12312312413431 = ', results[i]);

                //results[i].tFillTable2();
                results[i].tFillTable3();

                ACCOUNT_ID_TABLE_COUNT++;
                // results[i].tFillTable1();
            }
            catch(err){
                console.log(err);
            }
        }
        search_type = search_type.trim()
        var pagination = AssetRevaluationAssetRevaluationpagination;
        var pagenation_ele=$(".pagination-AssetRevaluationAssetRevaluation");
        pagenation_ele.html('');
        var page_total_ele = $(".page-total-AssetRevaluationAssetRevaluation");
        page_total_ele.html(`<footer class="blockquote-footer">Tổng số: ${pagination["total"]} bản ghi </footer>`);
        
        if (results.length > 0) {
                pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="AssetRevaluationAssetRevaluationSearchData(1,'`+search_type+`'`+ `,'`+search_data+`'`+ `)">Đầu</a></li>`);

                if (pagination["has_prev"] == true) {
                    pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="AssetRevaluationAssetRevaluationSearchData(` + (parseInt(pagination["current_page"]) - 1) +`,'`+search_type+`'`+ `,'`+search_data+`'`+ `)">` + (parseInt(pagination["current_page"]) - 1) + `</a></li>`);
                }
                pagenation_ele.append('<li class="page-item active"><a class="page-link" >' + (parseInt(pagination["current_page"])) + '</a></li>');
                if (pagination["has_next"] == true) {
                    pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="AssetRevaluationAssetRevaluationSearchData(` + (parseInt(pagination["current_page"]) + 1) +`,'`+search_type+`'`+ `,'`+search_data+`'`+ `)">` + (parseInt(pagination["current_page"]) + 1) + `</a></li>`);
                }
                if(pagination["total"]>0){
                    var last_page_order = 0 
                    if((pagination["total"]%record_in_page) != 0)
                    {
                        last_page_order = Math.floor(pagination["total"]/record_in_page) + 1;
                    }
                    else {
                        last_page_order = (pagination["total"]/record_in_page);
                    }
                pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="AssetRevaluationAssetRevaluationSearchData(`+last_page_order+`,'`+search_type+`'`+ `,'`+search_data+`'`+ `)">Cuối</a></li>`);
                }
            }
            if (search_type == "quick") {
                var crr_txt = $("#AssetRevaluationAssetRevaluationQuickSearchInputId").val();
                highlight(crr_txt,"#AssetRevaluationAssetRevaluationTableBodyId");
            }
    })

}

function openbutton(){
    $('#openbestinworld').modal('toggle');
}

$(document).ready(function() {
    $('#AssetRevaluationAssetRevaluationExportExcelBtnId').click(function() {
        // Define the columns to export
        var columnsToExport = [1, 2, 3, 4, 5, 6]; // columns 1, 2, and 4 (zero-indexed)
        var theadToExport = '';
        $('#AssetRevaluationAssetRevaluationDataTableId thead').each(function() {
        var row = '';
        $(this).find('th').each(function(index) {
            if (columnsToExport.includes(index)) {
            row += '<th>' + $(this).html() + '</th>';
            }
        });
        if (row) {
            theadToExport += '<tr>' + row + '</tr>';
        }
        });

        // Generate the tbodyToExport variable
        var tbodyToExport = '';
        $('#AssetRevaluationAssetRevaluationDataTableId tbody tr').each(function() {
        var row = '';
        $(this).find('td').each(function(index) {
            if (columnsToExport.includes(index)) {
            row += '<td>' + $(this).html() + '</td>';
            }
        });
        if (row) {
            tbodyToExport += '<tr>' + row + '</tr>';
        }
        });
    
        // Create a temporary table with only the selected columns
        var tempTable = $('<table>').append('<thead>' + theadToExport + '</thead>').append('<tbody>' + tbodyToExport + '</tbody>');
    
        // Export the temporary table
        $(tempTable).tableExport({
        filename: 'thông_tin_khau_hao_%DD%-%MM%-%YY%',
        format: 'xls',
        escape: 'false',
        });
    });
});