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
  var IdTable ="DepreciationDepreciationTableBodyId";
  var checker = $("#" +IdTable );
  if (checker.length > 0){
      if($('#'+IdTable).is(":visible")){
          DepreciationDepreciationGetDataTable(DepreciationDepreciationpagination["current_page"]);
      }
  }
})

function formatPrice(price) {
    let formatter = new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2 });
    let formattedNumber = formatter.format(price)
    return formattedNumber
}


var record_in_page = 5;
var search_log = {
    search_func:"",
    search_data:"",
    search_type:"",
}

function DepreciationDepreciationGetForeignkeyDataTable(page=1,search_data=null){
        search_log["search_func"] = "DepreciationDepreciationGetForeignkeyDataTable";
        search_log["search_data"] = search_data;
        search_log["search_type"] = "";

        var obj = new DepreciationDepreciation();
        var results = obj.tGetForeignkeyObjApi(page,search_data);
        obj.callAjax.then(function(data) {
            for (var i = 0; i < results.length; i++){
                try{
                    // console.log('results[i] = ', results[i]);
    
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
        });
}

function DepreciationDepreciationGetDataTable(page=1,search_data=null){
        search_log["search_func"] = "DepreciationDepreciationGetDataTable";
        search_log["search_data"] = search_data;
        search_log["search_type"] = "";

        var obj = new DepreciationDepreciation();
        var results = obj.tGetAllObjApi(page,search_data);
        obj.callAjax.then(function(data) {
        $("#DepreciationDepreciationTableBodyId").empty();
        var body = $("#DepreciationDepreciationDataTableId");

        ACCOUNT_ID_TABLE_COUNT = 1;
        var crr_record_in_page = DepreciationDepreciationrecord_in_page;

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
                $('#loading-indicator').hide();
            }
            catch(err){
                console.log(err);
            }
        }
        var pagenation_ele=$(".pagination-DepreciationDepreciation");
        var pagination=DepreciationDepreciationpagination;
        pagenation_ele.html('');
        var page_total_ele = $(".page-total-DepreciationDepreciation");
        page_total_ele.html(`<footer class="mt-3 blockquote-footer">Tổng số: ${pagination["total"]} bản ghi </footer>`);
        if (results.length > 0) {
            
                    pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="DepreciationDepreciationGetDataTable(1)">Đầu</a></li>`);
                    if (pagination["has_prev"] == true) {
                        pagenation_ele.append('<li class="page-item"><a class="page-link" onclick="DepreciationDepreciationGetDataTable(' + (parseInt(pagination["current_page"]) - 1) + ')">' + (parseInt(pagination["current_page"]) - 1) + '</a></li>');
                    }
                    pagenation_ele.append('<li class="page-item active"><a class="page-link" >' + (parseInt(pagination["current_page"])) + '</a></li>');
                    if (pagination["has_next"] == true) {
                        pagenation_ele.append('<li class="page-item"><a class="page-link" onclick="DepreciationDepreciationGetDataTable(' + (parseInt(pagination["current_page"]) + 1) + ')">' + (parseInt(pagination["current_page"]) + 1) + '</a></li>');
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
                    pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="DepreciationDepreciationGetDataTable(`+last_page_order+`)">Cuối</a></li>`);
                    }
                }
    })
}


var DepreciationDepreciation_CACHE = [];

var DepreciationDepreciation_arr_action = [
// default action

        {
        "title": "Xem chi tiết",
        "func": "DepreciationDepreciationDetails",
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
        //     "func": "DepreciationDepreciationEdit",
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
        //     "func": "DepreciationDepreciationOnDeleteEvent",
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

class DepreciationDepreciation{
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

        if (data.hasOwnProperty('aset_type')){
            this.aset_type = data.aset_type;
        }
        else{
            this.aset_type = null;
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

        if (data.hasOwnProperty('aset')){
            this.aset= data.aset;
        }
        else{
            this.aset = null;
        }

        if (data.hasOwnProperty('preiod_detail_name')){
          this.preiod_detail_name = data.preiod_detail_name;
        }
        else{
            this.preiod_detail_name  = null;
        }

        if (data.hasOwnProperty('aset_name')){
          this.aset_name= data.aset_name;
        }
        else{
            this.aset_name = null;
        }

        if (data.hasOwnProperty('aset_date_added')){
          this.aset_date_added= data.aset_date_added;
        }
        else{
            this.aset_date_added = null;
        }

        if (data.hasOwnProperty('aset_price_buy')){
            this.aset_price_buy = data.aset_price_buy;
            
        }
        else{
            this.aset_price_buy = null;
        }

        if (data.hasOwnProperty('preiod_detail')){
            this.preiod_detail = data.preiod_detail;
        }
        else{
            this.preiod_detail = null;
        }

        if (data.hasOwnProperty('namesasetstype')){
            this.namesasetstype = data.namesasetstype;
        }
        else{
            this.namesasetstype = null;
        }
        
        if (data.hasOwnProperty('revaluation')){
            this.revaluation = data.revaluation
        }
        else{
            this.revaluation = null;
        }

        if (data.hasOwnProperty('adjustment_aset')){
            this.adjustment_aset = data.adjustment_aset
        }
        else{
            this.adjustment_aset = null;
        }
        
        if (data.hasOwnProperty('adjustment_number')){
            this.adjustment_number = data.adjustment_number
        }
        else{
            this.adjustment_number = null;
        }
        
        if (data.hasOwnProperty('adjustment_aset_name')){
            this.adjustment_aset_name = data.adjustment_aset_name
        }
        else{
            this.adjustment_aset_name = null;
        }

        if (data.hasOwnProperty('revaluation_name')){
            this.revaluation_name = data.revaluation_name
        }
        else{
            this.revaluation_name = null;
        }
        
        if (data.hasOwnProperty('time_depreciation')){
            this.time_depreciation = data.time_depreciation;
        }
        else{
            this.time_depreciation = null;
        }

        if (data.hasOwnProperty('add_value')){
            this.add_value = data.add_value;
        }
        else{
            this.add_value = null;
        }

        if (data.hasOwnProperty('currency_unit')){
            this.currency_unit = data.currency_unit;
        }
        else{
            this.currency_unit = null;
        }

        if (data.hasOwnProperty('type_depreciation_name')){
            this.type_depreciation_name = data.type_depreciation_name;
        }
        else{
            this.type_depreciation_name = null;
        }

        if (data.hasOwnProperty('type_depreciation')){
            this.type_depreciation = data.type_depreciation;
        }
        else{
            this.type_depreciation = null;
        }
        
        
        if (data.hasOwnProperty('depreciation_value')){
            this.depreciation_value = data.depreciation_value;
        }
        else{
            this.depreciation_value = null;
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
        var chEle = formEle.find("#nameDepreciationDepreciationInputId");
        if (chEle.length > 0){
            this.name = chEle.val();
        }
        else{
            // this.name = null;
        }
        var chEle = formEle.find("#uuidDepreciationDepreciationInputId");
        if (chEle.length > 0){
            this.uuid = chEle.val();
        }
        else{
            // this.uuid = null;
        }
        var chEle = formEle.find("#tndidDepreciationDepreciationInputId");
        if (chEle.length > 0){
            this.tndid = chEle.val();
        }
        else{
            // this.tndid = null;
        }
        var chEle = formEle.find("#nick_nameDepreciationDepreciationInputId");
        if (chEle.length > 0){
            this.nick_name = chEle.val();
        }
        else{
            // this.nick_name = null;
        }
        var chEle = formEle.find("#usernameDepreciationDepreciationInputId");
        if (chEle.length > 0){
            this.username = chEle.val();
        }
        else{
            // this.username = null;
        }
        var chEle = formEle.find("#full_nameDepreciationDepreciationInputId");
        if (chEle.length > 0){
            this.full_name = chEle.val();
        }
        else{
            // this.full_name = null;
        }
        var chEle = formEle.find("#emailDepreciationDepreciationInputId");
        if (chEle.length > 0){
            this.email = chEle.val();
        }
        else{
            // this.email = null;
        }
        var chEle = formEle.find("#groupsDepreciationDepreciationInputId");
        if (chEle.length > 0){
            this.groups = chEle.val();
        }
        else{
            // this.groups = null;
        }
        var chEle = formEle.find("#user_permissionsDepreciationDepreciationInputId");
        if (chEle.length > 0){
            this.user_permissions = chEle.val();
        }
        else{
            // this.user_permissions = null;
        }
        var chEle = formEle.find("#date_of_birthDepreciationDepreciationInputId");
        if (chEle.length > 0){
            this.date_of_birth = chEle.val();
        }
        else{
            // this.date_of_birth = null;
        }
        var chEle = formEle.find("#ageDepreciationDepreciationInputId");
        if (chEle.length > 0){
            this.age = chEle.val();
        }
        else{
            // this.age = null;
        }
        var chEle = formEle.find("#telephoneDepreciationDepreciationInputId");
        if (chEle.length > 0){
            this.telephone = chEle.val();
        }
        else{
            // this.telephone = null;
        }
        var chEle = formEle.find("#saltDepreciationDepreciationInputId");
        if (chEle.length > 0){
            this.salt = chEle.val();
        }
        else{
            // this.salt = null;
        }
        var chEle = formEle.find("#onetime_passwdDepreciationDepreciationInputId");
        if (chEle.length > 0){
            this.onetime_passwd = chEle.val();
        }
        else{
            // this.onetime_passwd = null;
        }
        var chEle = formEle.find("#avatarDepreciationDepreciationInputId");
        if (chEle.length > 0){
            this.avatar = chEle.val();
        }
        else{
            // this.avatar = null;
        }
        var chEle = formEle.find("#is_callbotDepreciationDepreciationInputId");
        if (chEle.length > 0){
            this.is_callbot = chEle.val();
        }
        else{
            // this.is_callbot = null;
        }
        var chEle = formEle.find("#callbot_endpointDepreciationDepreciationInputId");
        if (chEle.length > 0){
            this.callbot_endpoint = chEle.val();
        }
        else{
            // this.callbot_endpoint = null;
        }
        var chEle = formEle.find("#is_chatbotDepreciationDepreciationInputId");
        if (chEle.length > 0){
            this.is_chatbot = chEle.val();
        }
        else{
            // this.is_chatbot = null;
        }
        var chEle = formEle.find("#chatbot_endpointDepreciationDepreciationInputId");
        if (chEle.length > 0){
            this.chatbot_endpoint = chEle.val();
        }
        else{
            // this.chatbot_endpoint = null;
        }
        var chEle = formEle.find("#managerDepreciationDepreciationInputId");
        if (chEle.length > 0){
            this.manager = chEle.val();
        }
        else{
            // this.manager = null;
        }
        var chEle = formEle.find("#log_confirm_by_emailDepreciationDepreciationInputId");
        if (chEle.length > 0){
            this.log_confirm_by_email = chEle.val();
        }
        else{
            // this.log_confirm_by_email = null;
        }
        var chEle = formEle.find("#logged_with_passwordDepreciationDepreciationInputId");
        if (chEle.length > 0){
            this.logged_with_password = chEle.val();
        }
        else{
            // this.logged_with_password = null;
        }
        var chEle = formEle.find("#created_free_licenseDepreciationDepreciationInputId");
        if (chEle.length > 0){
            this.created_free_license = chEle.val();
        }
        else{
            // this.created_free_license = null;
        }
        var chEle = formEle.find("#email_activatedDepreciationDepreciationInputId");
        if (chEle.length > 0){
            this.email_activated = chEle.val();
        }
        else{
            // this.email_activated = null;
        }
        var chEle = formEle.find("#website_templateDepreciationDepreciationInputId");
        if (chEle.length > 0){
            this.website_template = chEle.val();
        }
        else{
            // this.website_template = null;
        }
        var chEle = formEle.find("#languageDepreciationDepreciationInputId");
        if (chEle.length > 0){
            this.language = chEle.val();
        }
        else{
            // this.language = null;
        }
        var chEle = formEle.find("#timezoneDepreciationDepreciationInputId");
        if (chEle.length > 0){
            this.timezone = chEle.val();
        }
        else{
            // this.timezone = null;
        }
        var chEle = formEle.find("#app_permissionsDepreciationDepreciationInputId");
        if (chEle.length > 0){
            this.app_permissions = chEle.val();
        }
        else{
            // this.app_permissions = null;
        }
        var chEle = formEle.find("#signup_atDepreciationDepreciationInputId");
        if (chEle.length > 0){
            this.signup_at = chEle.val();
        }
        else{
            // this.signup_at = null;
        }
        var chEle = formEle.find("#last_login_atDepreciationDepreciationInputId");
        if (chEle.length > 0){
            this.last_login_at = chEle.val();
        }
        else{
            // this.last_login_at = null;
        }
        var chEle = formEle.find("#extend_fieldDepreciationDepreciationInputId");
        if (chEle.length > 0){
            this.extend_field = chEle.val();
        }
        else{
            // this.extend_field = null;
        }
        var chEle = formEle.find("#passwordDepreciationDepreciationInputId");
        if (chEle.length > 0){
            this.password = chEle.val();
        }
        else{
            // this.password = null;
        }
        var chEle = formEle.find("#updated_atDepreciationDepreciationInputId");
        if (chEle.length > 0){
            this.updated_at = chEle.val();
        }
        else{
            // this.updated_at = null;
        }
        var chEle = formEle.find("#created_atDepreciationDepreciationInputId");
        if (chEle.length > 0){
            this.created_at = chEle.val();
        }
        else{
            // this.created_at = null;
        }
    }
    else{
        var chEle = $("#idDepreciationDepreciationInputId");
        if (chEle.length > 0){
            this.id = chEle.val();
        }
        else{
            // this.id = null;
        }
                            var chEle = $("#nameDepreciationDepreciationInputId");
                            if (chEle.length > 0){
                                this.name = chEle.val();
                            }
                            else{
                                // this.name = null;
                            }
                
                            var chEle = $("#uuidDepreciationDepreciationInputId");
                            if (chEle.length > 0){
                                this.uuid = chEle.val();
                            }
                            else{
                                // this.uuid = null;
                            }
                
                            var chEle = $("#tndidDepreciationDepreciationInputId");
                            if (chEle.length > 0){
                                this.tndid = chEle.val();
                            }
                            else{
                                // this.tndid = null;
                            }
                
                            var chEle = $("#nick_nameDepreciationDepreciationInputId");
                            if (chEle.length > 0){
                                this.nick_name = chEle.val();
                            }
                            else{
                                // this.nick_name = null;
                            }
                
                            var chEle = $("#usernameDepreciationDepreciationInputId");
                            if (chEle.length > 0){
                                this.username = chEle.val();
                            }
                            else{
                                // this.username = null;
                            }
                
                            var chEle = $("#full_nameDepreciationDepreciationInputId");
                            if (chEle.length > 0){
                                this.full_name = chEle.val();
                            }
                            else{
                                // this.full_name = null;
                            }
                
                            var chEle = $("#emailDepreciationDepreciationInputId");
                            if (chEle.length > 0){
                                this.email = chEle.val();
                            }
                            else{
                                // this.email = null;
                            }
                
                            var chEle = $("#groupsDepreciationDepreciationInputId");
                            if (chEle.length > 0){
                                this.groups = chEle.val();
                            }
                            else{
                                // this.groups = null;
                            }
                
                            var chEle = $("#user_permissionsDepreciationDepreciationInputId");
                            if (chEle.length > 0){
                                this.user_permissions = chEle.val();
                            }
                            else{
                                // this.user_permissions = null;
                            }
                
                            var chEle = $("#date_of_birthDepreciationDepreciationInputId");
                            if (chEle.length > 0){
                                var date = moment(chEle.val(), 'DD/MM/YYYY');
                                this.date_of_birth=toDatePython(new Date(date))
                            }
                            else{
                                // this.date_of_birth = null;
                            }
                
                            var chEle = $("#ageDepreciationDepreciationInputId");
                            if (chEle.length > 0){
                                this.age = chEle.val();
                            }
                            else{
                                // this.age = null;
                            }
                
                            var chEle = $("#telephoneDepreciationDepreciationInputId");
                            if (chEle.length > 0){
                                this.telephone = chEle.val();
                            }
                            else{
                                // this.telephone = null;
                            }
                
                            var chEle = $("#saltDepreciationDepreciationInputId");
                            if (chEle.length > 0){
                                this.salt = chEle.val();
                            }
                            else{
                                // this.salt = null;
                            }
                
                            var chEle = $("#onetime_passwdDepreciationDepreciationInputId");
                            if (chEle.length > 0){
                                this.onetime_passwd = chEle.val();
                            }
                            else{
                                // this.onetime_passwd = null;
                            }
                
                            var chEle = $("#avatarDepreciationDepreciationInputId");
                            if (chEle.length > 0){
                                this.avatar = chEle.val();
                            }
                            else{
                                // this.avatar = null;
                            }
                
                            var chEle = $("#is_callbotDepreciationDepreciationInputId");
                            if (chEle.length > 0){
                                this.is_callbot = chEle.val();
                            }
                            else{
                                // this.is_callbot = null;
                            }
                
                            var chEle = $("#callbot_endpointDepreciationDepreciationInputId");
                            if (chEle.length > 0){
                                this.callbot_endpoint = chEle.val();
                            }
                            else{
                                // this.callbot_endpoint = null;
                            }
                
                            var chEle = $("#is_chatbotDepreciationDepreciationInputId");
                            if (chEle.length > 0){
                                this.is_chatbot = chEle.val();
                            }
                            else{
                                // this.is_chatbot = null;
                            }
                
                            var chEle = $("#chatbot_endpointDepreciationDepreciationInputId");
                            if (chEle.length > 0){
                                this.chatbot_endpoint = chEle.val();
                            }
                            else{
                                // this.chatbot_endpoint = null;
                            }
                
                            var chEle = $("#managerDepreciationDepreciationInputId");
                            if (chEle.length > 0){
                                this.manager = chEle.val();
                            }
                            else{
                                // this.manager = null;
                            }
                
                            var chEle = $("#log_confirm_by_emailDepreciationDepreciationInputId");
                            if (chEle.length > 0){
                                this.log_confirm_by_email = chEle.val();
                            }
                            else{
                                // this.log_confirm_by_email = null;
                            }
                
                            var chEle = $("#logged_with_passwordDepreciationDepreciationInputId");
                            if (chEle.length > 0){
                                this.logged_with_password = chEle.val();
                            }
                            else{
                                // this.logged_with_password = null;
                            }
                
                            var chEle = $("#created_free_licenseDepreciationDepreciationInputId");
                            if (chEle.length > 0){
                                this.created_free_license = chEle.val();
                            }
                            else{
                                // this.created_free_license = null;
                            }
                
                            var chEle = $("#email_activatedDepreciationDepreciationInputId");
                            if (chEle.length > 0){
                                this.email_activated = chEle.val();
                            }
                            else{
                                // this.email_activated = null;
                            }
                
                            var chEle = $("#website_templateDepreciationDepreciationInputId");
                            if (chEle.length > 0){
                                this.website_template = chEle.val();
                            }
                            else{
                                // this.website_template = null;
                            }
                
                            var chEle = $("#languageDepreciationDepreciationInputId");
                            if (chEle.length > 0){
                                this.language = chEle.val();
                            }
                            else{
                                // this.language = null;
                            }
                
                            var chEle = $("#timezoneDepreciationDepreciationInputId");
                            if (chEle.length > 0){
                                this.timezone = chEle.val();
                            }
                            else{
                                // this.timezone = null;
                            }
                
                            var chEle = $("#app_permissionsDepreciationDepreciationInputId");
                            if (chEle.length > 0){
                                this.app_permissions = chEle.val();
                            }
                            else{
                                // this.app_permissions = null;
                            }
                
                            var chEle = $("#signup_atDepreciationDepreciationInputId");
                            if (chEle.length > 0){
                                var date = moment(chEle.val(), 'DD/MM/YYYY');
                                this.signup_at=toDatePython(new Date(date))
                            }
                            else{
                                // this.signup_at = null;
                            }
                
                            var chEle = $("#last_login_atDepreciationDepreciationInputId");
                            if (chEle.length > 0){
                                var date = moment(chEle.val(), 'DD/MM/YYYY');
                                this.last_login_at=toDatePython(new Date(date))
                            }
                            else{
                                // this.last_login_at = null;
                            }
                
                            var chEle = $("#extend_fieldDepreciationDepreciationInputId");
                            if (chEle.length > 0){
                                this.extend_field = chEle.val();
                            }
                            else{
                                // this.extend_field = null;
                            }
                
                            var chEle = $("#passwordDepreciationDepreciationInputId");
                            if (chEle.length > 0){
                                this.password = chEle.val();
                            }
                            else{
                                // this.password = null;
                            }
                
                            var chEle = $("#updated_atDepreciationDepreciationInputId");
                            if (chEle.length > 0){
                                var date = moment(chEle.val(), 'DD/MM/YYYY');
                                this.updated_at=toDatePython(new Date(date))
                            }
                            else{
                                // this.updated_at = null;
                            }
                
                            var chEle = $("#created_atDepreciationDepreciationInputId");
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
              var j_ele_name = $("#nameDepreciationDepreciationInputId");
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
              var j_ele_uuid = $("#uuidDepreciationDepreciationInputId");
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
              var j_ele_tndid = $("#tndidDepreciationDepreciationInputId");
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
              var j_ele_nick_name = $("#nick_nameDepreciationDepreciationInputId");
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
              var j_ele_username = $("#usernameDepreciationDepreciationInputId");
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
              var j_ele_full_name = $("#full_nameDepreciationDepreciationInputId");
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
              var j_ele_email = $("#emailDepreciationDepreciationInputId");
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
              var j_ele_groups = $("#groupsGroupDepreciationDepreciationInputId");
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
              var j_ele_user_permissions = $("#user_permissionsPermissionDepreciationDepreciationInputId");
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
              var j_ele_date_of_birth = $("#date_of_birthDepreciationDepreciationInputId");
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
              var j_ele_age = $("#ageDepreciationDepreciationInputId");
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
              var j_ele_telephone = $("#telephoneDepreciationDepreciationInputId");
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
              var j_ele_salt = $("#saltDepreciationDepreciationInputId");
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
              var j_ele_onetime_passwd = $("#onetime_passwdDepreciationDepreciationInputId");
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
              var j_ele_avatar = $("#avatarDepreciationDepreciationInputId");
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
              var j_ele_is_callbot = $("#is_callbotDepreciationDepreciationInputId");
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
              var j_ele_callbot_endpoint = $("#callbot_endpointDepreciationDepreciationInputId");
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
              var j_ele_is_chatbot = $("#is_chatbotDepreciationDepreciationInputId");
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
              var j_ele_chatbot_endpoint = $("#chatbot_endpointDepreciationDepreciationInputId");
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
              var j_ele_manager = $("#managerDepreciationDepreciationAccountInputId");
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
              var j_ele_log_confirm_by_email = $("#log_confirm_by_emailDepreciationDepreciationInputId");
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
              var j_ele_logged_with_password = $("#logged_with_passwordDepreciationDepreciationInputId");
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
              var j_ele_created_free_license = $("#created_free_licenseDepreciationDepreciationInputId");
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
              var j_ele_email_activated = $("#email_activatedDepreciationDepreciationInputId");
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
              var j_ele_website_template = $("#website_templateWebsiteTemplateDepreciationDepreciationInputId");
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
              var j_ele_language = $("#languageDepreciationDepreciationInputId");
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
              var j_ele_timezone = $("#timezoneDepreciationDepreciationInputId");
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
              var j_ele_app_permissions = $("#app_permissionsAppPermissionDepreciationDepreciationInputId");
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
              var j_ele_signup_at = $("#signup_atDepreciationDepreciationInputId");
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
              var j_ele_last_login_at = $("#last_login_atDepreciationDepreciationInputId");
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
              var j_ele_extend_field = $("#extend_fieldExtendInfoDepreciationDepreciationInputId");
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
              var j_ele_password = $("#passwordDepreciationDepreciationInputId");
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
              var j_ele_updated_at = $("#updated_atDepreciationDepreciationInputId");
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
              var j_ele_created_at = $("#created_atDepreciationDepreciationInputId");
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
    //modals_type
    //*Create
    //*Detail
    //*Edit
    var apart=modals_type+'Modal';

    var self = this;
        try{
            var j_ele_name = $("#nameDepreciationDepreciation"+apart+"InputId");
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
            var j_ele_id = $("#idDepreciationDepreciation"+apart+"InputId");
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
            var j_ele_uuid = $("#uuidDepreciationDepreciation"+apart+"InputId");
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
            var j_ele_tndid = $("#tndidDepreciationDepreciation"+apart+"InputId");
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
            var j_ele_nick_name = $("#nick_nameDepreciationDepreciation"+apart+"InputId");
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
            var j_ele_username = $("#usernameDepreciationDepreciation"+apart+"InputId");
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
            var j_ele_full_name = $("#asetnameDepreciationDepreciation"+apart+"InputId");
            if (j_ele_full_name.length > 0){
                if (j_ele_full_name.attr('name') != 'uuid'){
                    j_ele_full_name.val(self.aset).change();
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
            var j_ele_full_name = $("#asetDepreciationDepreciation"+apart+"InputId");
            if (j_ele_full_name.length > 0){
                if (j_ele_full_name.attr('name') != 'uuid'){
                    j_ele_full_name.val(self.aset_name).change();
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
            var j_ele_email = $("#asetdateaddedDepreciationDepreciation"+apart+"InputId");
            if (j_ele_email.length > 0){
                if (j_ele_email.attr('name') != 'uuid'){
                    j_ele_email.val(self.aset_date_added).change();
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
            var j_ele_email = $("#asetpricebuyDepreciationDepreciation"+apart+"InputId");
            if (j_ele_email.length > 0){
                if (j_ele_email.attr('name') != 'uuid'){
                    j_ele_email.val(self.aset_price_buy).change();
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
            var j_ele_email = $("#remainingvalueDepreciationDepreciation"+apart+"InputId");
            if (j_ele_email.length > 0){
                if (j_ele_email.attr('name') != 'uuid'){
                    j_ele_email.val(self.remaining_value).change();
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
            var j_ele_email = $("#watchyearnameDepreciationDepreciation"+apart+"InputId");
            if (j_ele_email.length > 0){
                if (j_ele_email.attr('name') != 'uuid'){
                    j_ele_email.val(self.watch_year_name).change();
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
            var j_ele_email = $("#timedepreciationDepreciationDepreciation"+apart+"InputId");
            if (j_ele_email.length > 0){
                if (j_ele_email.attr('name') != 'uuid'){
                    j_ele_email.val(self.time_depreciation).change();
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
            var j_ele_email = $("#depreciationperdaysDepreciationDepreciation"+apart+"InputId");
            if (j_ele_email.length > 0){
                if (j_ele_email.attr('name') != 'uuid'){
                    j_ele_email.val(self.depreciation_per_days).change();
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
            var j_ele_email = $("#depreciationpermonthsDepreciationDepreciation"+apart+"InputId");
            if (j_ele_email.length > 0){
                if (j_ele_email.attr('name') != 'uuid'){
                    j_ele_email.val(self.depreciation_per_months).change();
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
            var j_ele_email = $("#depreciationperyearsDepreciationDepreciation"+apart+"InputId");
            if (j_ele_email.length > 0){
                if (j_ele_email.attr('name') != 'uuid'){
                    j_ele_email.val(self.depreciation_per_years).change();
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
            var j_ele_email = $("#timeusedaysDepreciationDepreciation"+apart+"InputId");
            if (j_ele_email.length > 0){
                if (j_ele_email.attr('name') != 'uuid'){
                    j_ele_email.val(self.time_use_days).change();
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
            var j_ele_email = $("#timeuseweeksDepreciationDepreciation"+apart+"InputId");
            if (j_ele_email.length > 0){
                if (j_ele_email.attr('name') != 'uuid'){
                    j_ele_email.val(self.time_use_weeks).change();
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
            var j_ele_email = $("#timeusemonthsDepreciationDepreciation"+apart+"InputId");
            if (j_ele_email.length > 0){
                if (j_ele_email.attr('name') != 'uuid'){
                    j_ele_email.val(self.time_use_months).change();
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
            var j_ele_email = $("#timeuseyearsDepreciationDepreciation"+apart+"InputId");
            if (j_ele_email.length > 0){
                if (j_ele_email.attr('name') != 'uuid'){
                    j_ele_email.val(self.time_use_years).change();
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
            var j_ele_email = $("#revaluation1DepreciationDepreciation"+apart+"InputId");
            if (j_ele_email.length > 0){
                if (j_ele_email.attr('name') != 'uuid'){
                    j_ele_email.val(self.revaluation[0].name + ', ' + self.revaluation[0].time_revaluation + ', ' + self.revaluation[0].addup_value + ', ' + self.revaluation[0].addup_time + ', ' + self.revaluation[0].uuid).change();
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
            var j_ele_email = $("#revaluation2DepreciationDepreciation"+apart+"InputId");
            if (j_ele_email.length > 0){
                if (j_ele_email.attr('name') != 'uuid'){
                    j_ele_email.val(self.time_depreciation).change();
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
            var j_ele_email = $("#revaluation3DepreciationDepreciation"+apart+"InputId");
            if (j_ele_email.length > 0){
                if (j_ele_email.attr('name') != 'uuid'){
                    j_ele_email.val(self.time_depreciation).change();
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
            var j_ele_email = $("#preioddetailDepreciationDepreciation"+apart+"InputId");
            if (j_ele_email.length > 0){
                if (j_ele_email.attr('name') != 'uuid'){
                    j_ele_email.val(self.preiod_detail).change();
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
            var j_ele_email = $("#adjustmentasetDepreciationDepreciation"+apart+"InputId");
            if (j_ele_email.length > 0){
                if (j_ele_email.attr('name') != 'uuid'){
                    j_ele_email.val(self.adjustment_aset).change();
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
            var j_ele_email = $("#addvalueDepreciationDepreciation"+apart+"InputId");
            if (j_ele_email.length > 0){
                if (j_ele_email.attr('name') != 'uuid'){
                    j_ele_email.val(self.add_value).change();
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
            var j_ele_email = $("#typedepreciationDepreciationDepreciation"+apart+"InputId");
            if (j_ele_email.length > 0){
                if (j_ele_email.attr('name') != 'uuid'){
                    j_ele_email.val(self.type_depreciation).change();
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
            var j_ele_email = $("#preioddetailnameDepreciationDepreciation"+apart+"InputId");
            if (j_ele_email.length > 0){
                if (j_ele_email.attr('name') != 'uuid'){
                    j_ele_email.val(self.preiod_detail_name).change();
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
            var j_ele_email = $("#adjustmentnumberDepreciationDepreciation"+apart+"InputId");
            if (j_ele_email.length > 0){
                if (j_ele_email.attr('name') != 'uuid'){
                    j_ele_email.val(self.adjustment_number).change();
                }
            }
            else{
                // j_ele_email.val(null);
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
              var j_ele_name = $("#nameDepreciationDepreciation"+apart+"InputId");
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
              var j_ele_uuid = $("#uuidDepreciationDepreciation"+apart+"InputId");
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
              var j_ele_tndid = $("#tndidDepreciationDepreciation"+apart+"InputId");
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
              var j_ele_nick_name = $("#nick_nameDepreciationDepreciation"+apart+"InputId");
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
              var j_ele_username = $("#usernameDepreciationDepreciation"+apart+"InputId");
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
              var j_ele_full_name = $("#full_nameDepreciationDepreciation"+apart+"InputId");
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
              var j_ele_email = $("#emailDepreciationDepreciation"+apart+"InputId");
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
              var j_ele_groups = $("#groupsGroupDepreciationDepreciation"+apart+"InputId");
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
              var j_ele_user_permissions = $("#user_permissionsPermissionDepreciationDepreciation"+apart+"InputId");
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
              var j_ele_date_of_birth = $("#date_of_birthDepreciationDepreciation"+apart+"InputId");
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
              var j_ele_age = $("#ageDepreciationDepreciation"+apart+"InputId");
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
              var j_ele_telephone = $("#telephoneDepreciationDepreciation"+apart+"InputId");
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
              var j_ele_salt = $("#saltDepreciationDepreciation"+apart+"InputId");
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
              var j_ele_onetime_passwd = $("#onetime_passwdDepreciationDepreciation"+apart+"InputId");
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
                          var j_ele_avatar = $("#avatarDepreciationDepreciation"+apart+"FileAreaId");
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
                                          <i class="fas fa-times" style="color:gray" file-uuid="` + self.uuid + `" id="` + self.uuid + `btnDeleteId" onclick="avatarDepreciationDepreciationDeletedAttacthment(this)"></i>
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
                          var j_ele_is_callbot = $("#is_callbotDepreciationDepreciation"+apart+"InputId");
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
              var j_ele_callbot_endpoint = $("#callbot_endpointDepreciationDepreciation"+apart+"InputId");
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
                          var j_ele_is_chatbot = $("#is_chatbotDepreciationDepreciation"+apart+"InputId");
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
              var j_ele_chatbot_endpoint = $("#chatbot_endpointDepreciationDepreciation"+apart+"InputId");
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
                  var j_ele_manager = $("#managerDepreciationDepreciationAccount"+apart+"InputId");
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
                          var j_ele_log_confirm_by_email = $("#log_confirm_by_emailDepreciationDepreciation"+apart+"InputId");
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
                          var j_ele_logged_with_password = $("#logged_with_passwordDepreciationDepreciation"+apart+"InputId");
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
                          var j_ele_created_free_license = $("#created_free_licenseDepreciationDepreciation"+apart+"InputId");
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
                          var j_ele_email_activated = $("#email_activatedDepreciationDepreciation"+apart+"InputId");
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
                  var j_ele_website_template = $("#website_templateWebsiteTemplateDepreciationDepreciation"+apart+"InputId");
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
              var j_ele_language = $("#languageDepreciationDepreciation"+apart+"InputId");
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
              var j_ele_timezone = $("#timezoneDepreciationDepreciation"+apart+"InputId");
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
              var j_ele_app_permissions = $("#app_permissionsAppPermissionDepreciationDepreciation"+apart+"InputId");
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
              var j_ele_signup_at = $("#signup_atDepreciationDepreciation"+apart+"InputId");
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
              var j_ele_last_login_at = $("#last_login_atDepreciationDepreciation"+apart+"InputId");
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
              var j_ele_extend_field = $("#extend_fieldExtendInfoDepreciationDepreciation"+apart+"InputId");
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
              var j_ele_password = $("#passwordDepreciationDepreciation"+apart+"InputId");
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
              var j_ele_updated_at = $("#updated_atDepreciationDepreciation"+apart+"InputId");
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
              var j_ele_created_at = $("#created_atDepreciationDepreciation"+apart+"InputId");
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
              
  // ########## [UPDATE] post Objects to REST API --> return object if success ##############
  tUpdatePostApi(formId=null){
    // alert('POST')
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
      formData = new FormData($('#DepreciationDepreciationCreateFormId')[0]);

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
                      else if (attr == 'revaluation') {
                        var selectedOptions = $('select[name="revaluation"]').val();
                        console.log('selectedOptions',selectedOptions);
                        
                        // if (!selectedOptions.length) {
                        //     formData.append('revaluation', '');
                        // } else {
                        for (var i = 0; i < selectedOptions.length; i++) {
                            formData.append('revaluation', selectedOptions[i]);
                            }
                        // }
                        
                        for (const [key, value] of formData.entries()) {
                            console.log('update',key, value);
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
        console.log('form : ',idForm)
        $.ajax({
            url: DepreciationDepreciationSmall_URL + idForm + "/",
            // type: "PUT",
            type: "PATCH",
            async: false,
            cache: false,
            timeout: 30000,
            // contentType: 'application/json',
            //data: JSON.stringify({data:"test"}),
            //data: JSON.stringify(self),
            data: formData,
            //contentType: "multipart/form-data",
            contentType: false,
            // dataType : false,
            processData: false,
            success: function (data) {
                    self = new DepreciationDepreciation(data);
                    
                    DepreciationDepreciationGetDataTable(DepreciationDepreciationpagination["current_page"])
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

  tCreateNewPostFormApi(formId=null){
    // alert('POST')
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
      formData = new FormData($('#DepreciationDepreciationCreateFormId')[0]);

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
                        else if (attr == 'revaluation') {
                            var selectedOptions = $('#assetrevaluationDepreciationDepreciationCreateModalInputId').val();
                            console.log('selectedOptions',selectedOptions);
                            // if (!selectedOptions.length) {
                            //     formData.append('revaluation', '');
                            // } else {
                            for (var i = 0; i < selectedOptions.length; i++) {
                                formData.append('revaluation', selectedOptions[i]);
                                }
                            // }
                            
                            for (const [key, value] of formData.entries()) {
                                console.log('create',key, value);
                              }
                            }
                        // else if (attr == 'aset') {
                        //     formData.append($(this).attr('name'), $(this).val());
                        //     formData.append('time_been_depreciation', time_data);
                        //     }
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
      
        let myValue = formData.get('aset');
        console.log(myValue);
        CheckDuplicate(myValue)

        $.ajax({
            url: DepreciationDepreciationSmall_URL,
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
                    self = new DepreciationDepreciation(data);
                    
                    DepreciationDepreciationGetDataTable(DepreciationDepreciationpagination["current_page"])
                    //$(location).prop('href', "/Account/Account/detail/" + self.uuid + "/");
                    $('#DepreciationDepreciationCancelCreateModalBtnId').click();
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
      

//   tCreateNewPostFormApi(formId=null){
//       $.ajaxSetup({
//           headers : {
//               'CSRFToken' : getCSRFTokenValue(),
//               'X-CSRFToken' : getCSRFTokenValue(), // for --> SessionAuthentication
//           },
//           tryCount : 0,
//           retryLimit : 3,
//       });
//     //   $('#idDepreciationDepreciationInputId').val(null);
//     //   $('#uuidDepreciationDepreciationInputId').val(null);
//       var self = this;
//       var formData;
//       var form ;
//       var arr_table = [];
//       if(formId==null){
//       formData = new FormData($('#DepreciationDepreciationCreateFormId')[0]);

//       }
//       else{
//           form = $('#' + formId);
//           if (form.length > 0) {
//               form.find("table").each(function() {
//                   console.log("table in form" + $(this));
//                   obj = $(this);
//                   arr_table.push(obj);
//                   // $(this).remove();

//               })
//           }
//           formData = new FormData();
//           form.find(':input').each(function() {
//               var attr = $(this).attr('name');
//               var type = $(this).attr('type');
//               var data_type = $(this).attr('data-type');
//               //data-type='currency'
//               var date = $(this).attr('data-datepicker');
//               console.log('closest("table") :', $(this).closest("table").length);
//               console.log('$(this).closest("table") > 0 :', $(this).closest("table").length > 0);
//               console.log('$(this).closest("table").closest("form") :', $(this).closest("table").closest("form"));
//               console.log('$(this).closest("table").closest("form") == formId) :', $(this).closest("table").closest("form") == formId);
//               console.log('$(this).closest("form").id != formId :', $(this).closest("form").id != formId);
//               console.log('$(this).closest("form").id :', $(this).closest("form").attr("id"));
//               console.log(' formId :', formId);
//               console.log('$(this).closest("form").length > 0 :', $(this).closest("form").length > 0);
//               console.log('($(this).closest("form").length > 0 && $(this).closest("form").id != formId) :', ($(this).closest("form").length > 0 && $(this).closest("form").attr("id") != formId));
//               if (($(this).closest("table").length > 0 && $(this).closest("table").closest("form").attr("id") == formId) || ($(this).closest("form").length > 0 && $(this).closest("form").attr("id") != formId)) {
//                   return;
//               }
//               if (typeof attr !== 'undefined' && attr !== false) {
//                   if (typeof date !== 'undefined' && date !== false) {
//                       formData.append($(this).attr('name'), toDatePythonByStringTime($(this).val(), 'DD/MM/YYYY'));
//                   } else {
//                       if (type == 'file') {
//                           var files = $(this)[0].files;
//                           // Check file selected or not
//                           if (files.length > 0) {
//                               formData.append($(this).attr('name'), files[0]);
//                           }
//                       } else if (type == 'checkbox') {
//                           formData.append($(this).attr('name'), $(this).is(":checked"));
//                       } else if (type == 'radio') {

//                           if ($(this).is(":checked")) {
//                               formData.set($(this).attr('name'), $(this).val());
//                           }
//                       } else {

//                           if (Array.isArray($(this).val())) {
//                               var arr = $(this).val();
//                               for (var i in arr)
//                                   formData.append($(this).attr('name'), arr[i]);
//                           } else {
//                               if(data_type == "currency"){
//                                   var currency_value = formatNumber($(this).val());
//                                   currency_value = currency_value.replaceAll(",", "");
//                                   formData.append($(this).attr('name'),currency_value );

//                               }else{
//                                   formData.append($(this).attr('name'), $(this).val());
//                               }
//                             }
//                         }
//                     }
//                 }
//             });
//         }
      
//         $.ajax({
//         url: DepreciationDepreciationSmall_URL,
//         type: "POST",
//         async: false,
//         cache: false,
//         timeout: 30000,
//         data: formData,
//         //contentType: "multipart/form-data",
//         contentType: false,
//         // dataType : false,
//         processData: false,
//         success: function (data) {
//                 self = new DepreciationDepreciation(data);
//                 LoadDepreciationDepreciationList();
//                 DepreciationDepreciationGetDataTable(DepreciationDepreciationpagination["current_page"]);
//                 if(is_continue_form){
//                     is_continue_form=false;
//                     if(!is_notification){
//                         is_notification = true;
//                         toastr.success('Thêm mới thành công');
//                     }
                    

//                     $(location).prop('href', "/Account/Account/create/");
//                 }else if(is_continue_modal){
//                     is_continue_modal=false;
//                     AccountRefreshCreateModal();
//                     if(!is_notification){
//                         is_notification = true;
//                         toastr.success('Thêm mới thành công');
//                     }
//                 }else{
//                     if(!is_notification){
//                         is_notification = true;
//                         toastr.success('Thêm mới thành công');
//                     }
//                     form.closest('.modal').modal('hide');
//                 }

//                 // self.tFillForm();
//         },
//         error: function (xhr, ajaxOptions, thrownError) {
//             console.log(xhr.status);
//             console.log(thrownError);
//             if (xhr.textStatus == 'timeout') {
//                 this.tryCount++;
//                 if (this.tryCount <= this.retryLimit) {
//                     //try again
//                     $.ajax(this);
//                     return;
//                 }
//                 return;
//             }
//             if(is_debug){
//                 $.alert({
//                     title: 'Error [' + xhr.status + '] ' + thrownError ,
//                     content: xhr.responseText,
//                 });
//                 }
//             },
//         });
//   }
              
  // ########## [ROW] [CREATE] POST OBJ TO REST API --> return object if success ##############
//   tCreateNewPostRowApi($this,form_data_parent=null,is_notice=false){
//       $.ajaxSetup({
//           headers : {
//               'CSRFToken' : getCSRFTokenValue(),
//               'X-CSRFToken' : getCSRFTokenValue(), // for --> SessionAuthentication
//           },
//           tryCount : 0,
//           retryLimit : 3,
//       });
//       var self = this;
//       var formData = new FormData();
//       formData.set('uuid',uuidv4());
//       // 
//       var depend=$($this).attr('depend');
//       if(depend!="self-depend"){
//           formData.append($($this).attr('parent-attr-name'),$($this).attr('parent-attr-uuid'))
//       }
//           $($this).find(':input').each(function() {
//               var attr = $(this).attr('name');
//               var type = $(this).attr('type');
//               var data_type = $(this).attr('data-type');
//               //data-type='currency'
//               var date = $(this).attr('data-datepicker');
//               if (typeof attr !== 'undefined' && attr !== false) {
//               if (typeof date !== 'undefined' && date !== false) {
//                   formData.append($(this).attr('name'), toDatePythonByStringTime($(this).val(), 'DD/MM/YYYY'));
//               } else {
//                   if (type == 'file') {
//                       var files = $(this)[0].files;
//                       // Check file selected or not
//                       if(files.length > 0 ) {
//                           formData.append($(this).attr('name'), files[0]);
//                       }
//                   }
//                   else if(type == 'checkbox'){
//                       formData.append($(this).attr('name'), $(this).is(":checked"));
//                   }
//                   else if(type == 'radio'){

//                       if($(this).is(":checked")){
//                           formData.set($(this).attr('name'),  $(this).val());
//                       }
//                   } else {
//                       if (Array.isArray($(this).val())) {
//                               var arr = $(this).val();
//                               for (var i in arr)
//                                   formData.append($(this).attr('name'), arr[i]);
//                       } else {
//                           if(data_type == "currency"){
//                               var currency_value = formatNumber($(this).val());
//                               currency_value = currency_value.replaceAll(",", "");
//                               formData.append($(this).attr('name'),currency_value );

//                           }else{
//                               formData.append($(this).attr('name'), $(this).val());
//                           }
//                       }
//                   }
//               }
//           }
//           });
//       for (var pair of formData.entries()) {
//           console.log(pair[0] + ', ' + pair[1]);
//       }
//       if(form_data_parent!=null){
//                   for (var pair of form_data_parent.entries()) {
//                       console.log(pair[0] + ', ' + pair[1]);
//                       if(formData.get(pair[0])=== 'undefined' || formData.get(pair[0])=== '' || formData.get(pair[0])=== null){
//                               formData.set(pair[0],pair[1])
//                       }
                      
//                   }
//               }
//       $.ajax({
//           url: DepreciationDepreciationSmall_URL,
//           type: "POST",   
//           async: false,
//           cache: false,
//           timeout: 30000,
//           data: formData,
//           //contentType: "multipart/form-data",
//           contentType: false,
//           // dataType : false,
//           processData: false,
//           success: function (data) {
//           $($this).attr("is-new","added");
//           $($this).attr("uuid",formData.get('uuid'));
//           if(is_notice)
//               {
//                   toastr.success('Thêm mới thành công');
//               }
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
              
//                   if(is_debug){
//                       $.alert({
//                           title: 'Error [' + xhr.status + '] ' + thrownError ,
//                           content: xhr.responseText,
//                       });
//                   }
//           },
//       });
//       return self;
//   }
              

//   tCreateByFormDataApi(formData,action_title) {
//   // cho phép thêm mới với formdata custom riêng cho từng trường trường hợp
//       $.ajaxSetup({
//           headers: {
//               'CSRFToken': getCSRFTokenValue(),
//               'X-CSRFToken': getCSRFTokenValue(), // for --> SessionAuthentication
//           },
//           tryCount: 0,
//           retryLimit: 3,
//       });
//       var self = this;
//       $.ajax({
//           url: DepreciationDepreciationSmall_URL,
//           type: "POST",   
//           async: false,
//           cache: false,
//           timeout: 30000,
//           data: formData,
//           contentType: false,
//           processData: false,
//           success: function(data) {
//               toastr.success(action_title+' thành công');
//           },
//           error: function(xhr, ajaxOptions, thrownError) {
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
              
//               // ########## [ROW] [UPDATE] POST OBJ TO REST API --> return object if success ##############
//   tUpdateNewPostRowApi($this,form_data_parent=null,is_notice=false){
//       //cập nhật với từng dòng trên bảng
//       $.ajaxSetup({
//           headers : {
//               'CSRFToken' : getCSRFTokenValue(),
//               'X-CSRFToken' : getCSRFTokenValue(), // for --> SessionAuthentication
//           },
//           tryCount : 0,
//           retryLimit : 3,
//       });
//       var self = this;
//       var formData = new FormData();
//       var uuid = $($this).attr("uuid");
//       var depend=$($this).attr('depend');
//       if(depend!="self-depend"){
//       formData.append($($this).attr('parent-attr-name'),$($this).attr('parent-attr-uuid'))
//       }
//       $($this).find(':input').each(function() {
//       var attr = $(this).attr('name');
//       var type = $(this).attr('type');
//       var data_type = $(this).attr('data-type');
//       //data-type='currency'
//       var date = $(this).attr('data-datepicker');
//       if (typeof attr !== 'undefined' && attr !== false) {
//       if (typeof date !== 'undefined' && date !== false) {
//           formData.append($(this).attr('name'), toDatePythonByStringTime($(this).val(), 'DD/MM/YYYY'));
//       } else {
//           if (type == 'file') {
//               var files = $(this)[0].files;
//               // Check file selected or not
//               if(files.length > 0 ) {
//                   formData.append($(this).attr('name'), files[0]);
//               }
//           }
//           else if(type == 'checkbox'){
//               formData.append($(this).attr('name'), $(this).is(":checked"));
//           }
//           else if(type == 'radio'){

//               if($(this).is(":checked")){
//                   formData.set($(this).attr('name'),  $(this).val());
//               }
//           } else {
//               //formData.append($(this).attr('name'), $(this).val());
//               if (Array.isArray($(this).val())) {
//                   var arr = $(this).val();
//                   for (var i in arr)
//                       formData.append($(this).attr('name'), arr[i]);
//               } else {
//                   if(data_type == "currency"){
//                       var currency_value = formatNumber($(this).val());
//                       currency_value = currency_value.replaceAll(",", "");
//                       formData.append($(this).attr('name'),currency_value );

//                   }else{
//                       formData.append($(this).attr('name'), $(this).val());
//                   }
//               }
//           }
//       }
//   }
//   });
//       for (var pair of formData.entries()) {
//           console.log(pair[0] + ', ' + pair[1]);
//       }
//       for (var pair of formData.entries()) {
//       console.log(pair[0] + ', ' + pair[1]);
//   }
//   if(form_data_parent!=null){
//       for (var pair of form_data_parent.entries()) {
//           console.log(pair[0] + ', ' + pair[1]);
//           if(formData.get(pair[0])=== 'undefined' && formData.get(pair[0])=== '' || formData.get(pair[0])=== null){
//                   formData.set(pair[0],pair[1])
//           }
          
//       }
//   }
//       // 
//       $.ajax({
//           url: DepreciationDepreciationSmall_URL + uuid + "/",
//           type: "PATCH",
//           async: false,
//           cache: false,
//           timeout: 30000,
//           data: formData,
//           //contentType: "multipart/form-data",
//           contentType: false,
//           // dataType : false,
//           processData: false,
//           success: function (data) {
//           $($this).attr("is-new","added");
//           if(is_notice)
//           {
//               toastr.success('Cập nhật thành công');
//           }
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
                          
  tDeleteApi(uuid=null){
    $.confirm({
        icon: 'fa fa-warning',
        title: 'Xóa Khau Hao',
        content: 'Bạn có chắc muốn xóa khau hao này không ?',
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
                            url: DepreciationDepreciationSmall_URL + uuid_go + "/",
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
                                DepreciationDepreciationGetDataTable(DepreciationDepreciationpagination["current_page"]);
                                //   if(cr_uuid!=""){
                                //       $(location).prop('href', "/Account/Account/create/");
                                //   }
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
          url: DepreciationDepreciationSmall_URL + uuid_go + "/",
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
              DepreciationDepreciationSearchData(DepreciationDepreciationpagination["current_page"],"filter",data_search);
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
          url: DepreciationDepreciation_REMOVEFILE_URL+uuid+"/",
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
          url: DepreciationDepreciationSmall_URL+uuid+"/",
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
          url: DepreciationDepreciationSmall_URL+has_go_page,
          type: "GET",
          //async: false,
          cache: false,
          timeout: 30000,

          success: function (data) {
              console.log('[tGetAllObjApi] data = ', data);
              // return new DepreciationDepreciation(data);
              if (data.hasOwnProperty('count')){
                  DepreciationDepreciationpagination["total"]=data.count;
              }
              if (data.hasOwnProperty('count')){
                  DepreciationDepreciationpagination["total"]=data.count;
              }
              if (data.hasOwnProperty('next')){
                  if(data.next != null){
                  DepreciationDepreciationpagination["has_next"]=true;
                  }else{
                  DepreciationDepreciationpagination["has_next"]=false;

                  }
              }
              DepreciationDepreciationpagination["current_page"]=page;
              if (data.hasOwnProperty('previous')){
                  if(data.previous != null){
                  DepreciationDepreciationpagination["has_prev"]=true;
                  }else{
                  DepreciationDepreciationpagination["has_prev"]=false;
                  }
              }
              if (data.hasOwnProperty('results')){
                  for (var j=0; j < data.results.length; j++){
                      var tmp = new DepreciationDepreciation(data.results[j]);
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
          url: DepreciationDepreciation_LARGE_URL+has_go_page,
          type: "GET",
          //async: false,
          cache: false,
          timeout: 30000,

          success: function (data) {
              console.log('[tGetAllObjLargeApi] data = ', data);
              // return new DepreciationDepreciation(data);
              if (data.hasOwnProperty('count')){
                  DepreciationDepreciationpagination["total"]=data.count;
              }
              if (data.hasOwnProperty('count')){
                  DepreciationDepreciationpagination["total"]=data.count;
              }
              if (data.hasOwnProperty('next')){
                  if(data.next != null){
                  DepreciationDepreciationpagination["has_next"]=true;
                  }else{
                  DepreciationDepreciationpagination["has_next"]=false;

                  }
              }
              DepreciationDepreciationpagination["current_page"]=page;
              if (data.hasOwnProperty('previous')){
                  if(data.previous != null){
                  DepreciationDepreciationpagination["has_prev"]=true;
                  }else{
                  DepreciationDepreciationpagination["has_prev"]=false;
                  }
              }
              if (data.hasOwnProperty('results')){
                  for (var j=0; j < data.results.length; j++){
                      var tmp = new DepreciationDepreciation(data.results[j]);
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
          SEARCH_URL=DepreciationDepreciationSmall_URL;
          
                slugSearch="&";
                if ($("#Asset_Type_DepreciationFilterSearchInputId").length > 0
                    || $("#DepreciationPeriodFilterSearchInputId").length > 0
                ) {
                    var asset_name = $("#Asset_Type_DepreciationFilterSearchInputId").val();
                    var depreciation_period = $("#DepreciationPeriodFilterSearchInputId").val();
                    if ((asset_name != "" && asset_name != null)
                        || (depreciation_period != "" && depreciation_period != null))
                        {
                            slugSearch += "type_depreciation=" + asset_name 
                                            + "&preiod_detail=" + depreciation_period;         
                        }
                }
      }else{
          SEARCH_URL=DepreciationDepreciationSmall_URL;
          
            slugSearch="&";
            slugSearch+="search="+$("#DepreciationDepreciationQuickSearchInputId").val();
          
      }
      if(search_data!=null){
          SEARCH_URL=DepreciationDepreciationSmall_URL;
          slugSearch="&";
          slugSearch+=search_data;
      }
      search_log["search_data"] = slugSearch;
      this.callAjax =
      $.ajax({
          url: DepreciationDepreciationSmall_URL+has_go_page+slugSearch,
          type: "GET",
          //async: false,
          cache: false,
          timeout: 30000,

          success: function (data) {
              console.log('[tGetAllObjApi] data = ', data);
              // return new DepreciationDepreciation(data);
              if (data.hasOwnProperty('count')){
                  DepreciationDepreciationpagination["total"]=data.count;
              }
              if (data.hasOwnProperty('count')){
                  DepreciationDepreciationpagination["total"]=data.count;
              }
              if (data.hasOwnProperty('next')){
                  if(data.next != null){
                  DepreciationDepreciationpagination["has_next"]=true;
                  }else{
                  DepreciationDepreciationpagination["has_next"]=false;

                  }
              }
              DepreciationDepreciationpagination["current_page"]=page;
              if (data.hasOwnProperty('previous')){
                  if(data.previous != null){
                  DepreciationDepreciationpagination["has_prev"]=true;
                  }else{
                  DepreciationDepreciationpagination["has_prev"]=false;
                  }
              }
              if (data.hasOwnProperty('results')){
                  for (var j=0; j < data.results.length; j++){
                      var tmp = new DepreciationDepreciation(data.results[j]);
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
  
  tOrderAllObjApi(page=null,name){
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
    var has_go_order=""
    if(name!=null){
        has_go_order="?ordering="+name+"&";
    }
    this.callAjax =
    $.ajax({
        url: DepreciationDepreciationSmall_URL+has_go_order+has_go_page,
        type: "GET",
        //async: false,
        cache: false,
        timeout: 30000,

        success: function (data) {
            console.log('[tGetAllObjApi] data = ', data);
            // return new DepreciationDepreciation(data);
            if (data.hasOwnProperty('count')){
                DepreciationDepreciationpagination["total"]=data.count;
            }
            if (data.hasOwnProperty('count')){
                DepreciationDepreciationpagination["total"]=data.count;
            }
            if (data.hasOwnProperty('next')){
                if(data.next != null){
                DepreciationDepreciationpagination["has_next"]=true;
                }else{
                DepreciationDepreciationpagination["has_next"]=false;

                }
            }
            DepreciationDepreciationpagination["current_page"]=page;
            if (data.hasOwnProperty('previous')){
                if(data.previous != null){
                DepreciationDepreciationpagination["has_prev"]=true;
                }else{
                DepreciationDepreciationpagination["has_prev"]=false;
                }
            }
            if (data.hasOwnProperty('results')){
                for (var j=0; j < data.results.length; j++){
                    var tmp = new DepreciationDepreciation(data.results[j]);
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
    console.log(results);
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
          SEARCH_URL=DepreciationDepreciation_LARGE_FILTER_URL;
          
              slugSearch="&";
          
                              if($("#full_nameDepreciationDepreciationFilterSearchInputId").length>0){
                                  var value=$("#full_nameDepreciationDepreciationFilterSearchInputId").val();
                                  if(value!="" && value!=null){
                                      slugSearch+="full_name__contains="+value+"&";
                                  }
                              }
                              
                          slugSearch=slugSearch.slice(0, -1);
      }else{
          SEARCH_URL=DepreciationDepreciation_SEARCH_URL;
          
              slugSearch="&";
              slugSearch+="search="+$("#DepreciationDepreciationQuickSearchInputId").val();
          
      }
      if(search_data!=null){
          SEARCH_URL=DepreciationDepreciation_LARGE_FILTER_URL;
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
              // return new DepreciationDepreciation(data);
              if (data.hasOwnProperty('count')){
                  DepreciationDepreciationpagination["total"]=data.count;
              }
              if (data.hasOwnProperty('count')){
                  DepreciationDepreciationpagination["total"]=data.count;
              }
              if (data.hasOwnProperty('next')){
                  if(data.next != null){
                  DepreciationDepreciationpagination["has_next"]=true;
                  }else{
                  DepreciationDepreciationpagination["has_next"]=false;

                  }
              }
              DepreciationDepreciationpagination["current_page"]=page;
              if (data.hasOwnProperty('previous')){
                  if(data.previous != null){
                  DepreciationDepreciationpagination["has_prev"]=true;
                  }else{
                  DepreciationDepreciationpagination["has_prev"]=false;
                  }
              }
              if (data.hasOwnProperty('results')){
                  for (var j=0; j < data.results.length; j++){
                      var tmp = new DepreciationDepreciation(data.results[j]);
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
          url:  DepreciationDepreciationSmall_URL+ uuid + "/",
          type: "GET",
          async: false,
          cache: false,
          timeout: 30000,

          success: function (data) {
              console.log('[tGetObjApi] data = ', data);
              var n_obj = new DepreciationDepreciation(data);
              console.log('n_obj = ', n_obj);
              n_obj.tFillForm();
              return n_obj;
              // if (data.hasOwnProperty('results')){
              //    if (data.results.length > 0){
              //        var tmp = new DepreciationDepreciation(data[i]);
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
      var tbId = "DepreciationDepreciationDataTableId";
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
      var tbId = "DepreciationDepreciationDataTableId";
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
    var tbId = "DepreciationDepreciationDataTableId";
    if(tableId!=null){
        tbId = tableId;
    }

    if(order==null){
    order=ACCOUNT_ID_TABLE_COUNT;
    }
    var table = $("#" + tbId);
    if (table.length > 0){
        var html = "<tr>"
        html += `
        
                <td class="text-wrap" style="min-width:100px">
                    <div class="form-check">
                        <label class="form-check-label">
                            <input type="checkbox" name="confirmed[]" value="` + this["uuid"] + `" width="30%" id="action-toggle" style=" height: 1.2rem; width: 1.2rem;">
                        </label>
                    </div>
                </td>
                `;
        // html+= `<td><p>` + order + `</p></td>`;
        // Get All Attribute of thead
        var tableHeaders = table.find('thead th');
        var tableBody = table.find('tbody');
        //tableBody.html('');
        for (var thId = 1; thId < tableHeaders.length; thId++){
            var hEle = tableHeaders[thId];
            var attr = hEle.getAttribute('attr-name');
            if (this.hasOwnProperty(attr)){
                  
                        if(attr=="aset_name"){
                            html +=`
                            <style>
                                    a {
                                        color: #000000;
                                    }
                                    </style>
                            <td class="text-wrap" style="min-width:100px;min-width:150px;font-weight:510" onclick="DepreciationDepreciationDetails('`+this["uuid"]+`','`+ this.aset +`')"><a style="text-decoration: none;">` + (this[attr]) + `</a></td>`;
                                continue;
                        }

                        if(attr=="time_depreciation"){
                            html +=`<td class="text-wrap" style="min-width:30px;max-width:60px">` + (this[attr]) + `</td>`;
                                continue;
                        }

                        if(attr=="aset_price_buy"){
                            if (this.currency_unit != "undefined" && this.currency_unit != null) {
                                html += `<td class="text-wrap"><a>` + formatPrice(this[attr]) + " " + this.currency_unit + `</a></td>`;
                                continue;
                            }
                            else {
                                html += `<td class="text-wrap"><a>` + formatPrice(this[attr]) + `</a></td>`;
                                continue;
                            };
                        }
                        

                  //html +=`<td class="text-wrap"><a>` + (this[attr]) + `</a></td>`;
                  html +=`<td class="text-wrap">` + this[attr] + `</td>`;
              }
              
              else{
                  if(attr=="account-admin-action")
                  {
                      html += 
                      `<td>
                        <div class="btn-group mb-2 mr-2">
                            <button type="button" class="btn  btn-outline-dark dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="sr-only"></span></button>
                            <div class="dropdown-menu">
                                <a class="dropdown-item d-flex align-items-center L-Affiliate-Tagged" onclick="DepreciationDepreciationDetails('`+this.uuid+`','`+ this.aset +`')">             
                                    <i title="Xem chi tiết" class="far fa-eye" onclick="DepreciationDepreciationDetails" aria-hidden="true"></i>
                                        <span class="sr-only">Xem chi tiết</span>  
                                        &nbsp;                Xem Chi Tiết                                 
                                </a>            
                                <a class="dropdown-item d-flex align-items-center L-Affiliate-Tagged" onclick="DepreciationDepreciationEdit('`+this.uuid+`','`+ this.aset_type +`','`+ this.aset +`')">                
                                    <i title="Chỉnh sửa" class="far fa-edit" onclick="DepreciationDepreciationEdit" aria-hidden="true"></i>
                                        <span class="sr-only">Chỉnh sửa</span>  
                                        &nbsp;                Chỉnh Sửa        
                                </a>            
                                <a class="dropdown-item d-flex align-items-center L-Affiliate-Tagged" onclick="DepreciationDepreciationOnDeleteEvent('`+this.uuid+`')">               
                                    <i title="Xóa" class="far fa-trash-alt" onclick="DepreciationDepreciationOnDeleteEvent" aria-hidden="true"></i>
                                    <span class="sr-only">Xóa</span>    
                                    &nbsp;                Xóa                   
                                </a> 
                            </div>
                        </div>
                        </td>`

                    //   BindActionButtonVer4(
                    //       DepreciationDepreciation_arr_action,
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
                                      <input class="custom-control-input" id="${this["uuid"]}is_callbotDepreciationDepreciationSwitchListTablebtnId" name="`+ attr +`" data-uuid="` + this["uuid"] + `" type="checkbox"  `+value+` onclick="is_callbotDepreciationDepreciationEventChangeSwitcher(this)">
                                  <label class="custom-control-label" for="${this["uuid"]}is_callbotDepreciationDepreciationSwitchListTablebtnId"></label>
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
                                      <input class="custom-control-input" id="${this["uuid"]}is_chatbotDepreciationDepreciationSwitchListTablebtnId" name="`+ attr +`" data-uuid="` + this["uuid"] + `" type="checkbox"  `+value+` onclick="is_chatbotDepreciationDepreciationEventChangeSwitcher(this)">
                                  <label class="custom-control-label" for="${this["uuid"]}is_chatbotDepreciationDepreciationSwitchListTablebtnId"></label>
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
                                      <input class="custom-control-input" id="${this["uuid"]}log_confirm_by_emailDepreciationDepreciationSwitchListTablebtnId" name="`+ attr +`" data-uuid="` + this["uuid"] + `" type="checkbox"  `+value+` onclick="log_confirm_by_emailDepreciationDepreciationEventChangeSwitcher(this)">
                                  <label class="custom-control-label" for="${this["uuid"]}log_confirm_by_emailDepreciationDepreciationSwitchListTablebtnId"></label>
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
                                      <input class="custom-control-input" id="${this["uuid"]}logged_with_passwordDepreciationDepreciationSwitchListTablebtnId" name="`+ attr +`" data-uuid="` + this["uuid"] + `" type="checkbox"  `+value+` onclick="logged_with_passwordDepreciationDepreciationEventChangeSwitcher(this)">
                                  <label class="custom-control-label" for="${this["uuid"]}logged_with_passwordDepreciationDepreciationSwitchListTablebtnId"></label>
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
                                      <input class="custom-control-input" id="${this["uuid"]}created_free_licenseDepreciationDepreciationSwitchListTablebtnId" name="`+ attr +`" data-uuid="` + this["uuid"] + `" type="checkbox"  `+value+` onclick="created_free_licenseDepreciationDepreciationEventChangeSwitcher(this)">
                                  <label class="custom-control-label" for="${this["uuid"]}created_free_licenseDepreciationDepreciationSwitchListTablebtnId"></label>
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
                                      <input class="custom-control-input" id="${this["uuid"]}email_activatedDepreciationDepreciationSwitchListTablebtnId" name="`+ attr +`" data-uuid="` + this["uuid"] + `" type="checkbox"  `+value+` onclick="email_activatedDepreciationDepreciationEventChangeSwitcher(this)">
                                  <label class="custom-control-label" for="${this["uuid"]}email_activatedDepreciationDepreciationSwitchListTablebtnId"></label>
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
      var tbId = "DepreciationDepreciationDataTableId";
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
    var card_Id = "DepreciationDepreciationCardAreaId";
    if(cardId!=null){
        card_Id = cardId;
    }

    if(order==null){
    order=ACCOUNT_ID_TABLE_COUNT;
    }
    var card_area = $("#" + card_Id);
    if (card_area.length > 0){
        var card_template = card_area.find(".DepreciationDepreciationTemplateCardClass");
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
                                        <i class="fas fa-times" style="color:gray" file-uuid="` + this["uuid"] + `" id="` + this["uuid"] + `btnDeleteId" onclick="avatarDepreciationDepreciationDeletedAttacthment(this)"></i>
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
                        $(hEle).html(`<a onclick="DepreciationDepreciationDetails('`+this["uuid"]+`')">` + (this[attr]) + `</a>`);
                        continue;
                    }
                    $(hEle).html(`<a>` + (this[attr]) + `</a>`);

                }
            }
            var action_button = BindActionButtonVer5(
                            DepreciationDepreciation_arr_action,
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

   
function DepreciationDepreciationDetails(uuid,asset){
    console.log(uuid);
    console.log(asset);
    $('#DepreciationDepreciationDetailmodalsId').modal('toggle');
    var obj=new DepreciationDepreciation();
    obj.tGetObjApi(uuid);
    obj.callAjax.then(function(data) {
        new  DepreciationDepreciation(data).tFillFormModal('Detail','DepreciationDepreciationDetailModalsFormId');
    })

    DepreciationDepreciationGetDetailDataTable(page=1, search_data=null,asset_uuid=asset)
    GetAssetRevaluationTable(uuid)
    //obj.tFillFormModal('Detail');

}

function DepreciationDepreciationEdit(uuid,type,asset){
    console.log(uuid);
    console.log(type);
    console.log(asset);
    $('#DepreciationDepreciationEditmodalsId').modal('toggle');
    var obj=new DepreciationDepreciation();
    obj.tGetObjApi(uuid);
    obj.callAjax.then(function(data) {
        new  DepreciationDepreciation(data).tFillFormModal('Edit','DepreciationDepreciationEditModalsFormId');

    })
    obj.tFillFormModal('Edit');

    CallShowOption2(type,asset)
}


function DepreciationDepreciationOnDeleteEvent(uuid){
    var obj=new DepreciationDepreciation();
    obj.tDeleteApi(uuid);
} 

function list_checkbox(){
    var isChecked = $('input[name="confirmed[]"]');
    var list_check = [];
    for (var i = 0; i  < isChecked.length; i++) {
        if (isChecked[i].checked) {
            list_check.push(isChecked[i].value);
        }
    }
    console.log(list_check)

    if (confirm(' Ban muon xoa roi chu ') == true) {
        DepreciationAllDeleteEvent(list_check)
    } else {
        alert('Đã Hủy')
    }
};

function DepreciationAllDeleteEvent(list_uuid){
    for (var i = 0; i < list_uuid.length; i++) {
        var uuidde = list_uuid[i]
        var obj=new DepreciationDepreciation();
            obj.tDeleteApi(uuidde);
    } 
}

var DepreciationDepreciationpagination={
  current_page:1,
  total:0,
  has_next:false,
  has_prev:false
}

var DepreciationDepreciationrecord_in_page = 5;


$(document).ready(function(){
    $("#DepreciationDepreciationQuickSearchInputId").on('keyup', function(e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            DepreciationDepreciationpagination={
                current_page:1,
                total:0,
                has_next:false,
                has_prev:false
            }
            DepreciationDepreciationSearchData(DepreciationDepreciationpagination["current_page"],"quick");
        }
    })
    $("#DepreciationDepreciationQuickSearchBtnId").click(function(){
        DepreciationDepreciationpagination={
            current_page:1,
            total:0,
            has_next:false,
            has_prev:falseGDepreciationDepreciationSearchData(DepreciationDepreciationpagination["current_page"],"quick")
    }});
    $("#DepreciationDepreciationSearchBtnId").click(function(){
        DepreciationDepreciationpagination={
            current_page:1,
            total:0,
            has_next:false,
            has_prev:false
    }
        DepreciationDepreciationSearchData(DepreciationDepreciationpagination["current_page"],"filter");
    });
    $("#DepreciationFilterSearchBtnId").click(function () {
        DepreciationDepreciationpagination = {
            current_page: 1,
            total: 0,
            has_next: false,
            has_prev: false
        }
        DepreciationDepreciationSearchData(DepreciationDepreciationpagination["current_page"], "filter");
    })
});


$(document).ready(function(){
    $("#DepreciationDepreciationUpdateModalBtnId").click(function(){
        // alert('Chuẩn bị POST')
        // var validate_obj = new InputValidation('DepreciationDepreciationEditModalsFormId');
        // if(validate_obj.validateRequired()){
        //     toastr.warning('Vui lòng điền đầy đủ thông tin');
        //     return;

        // }
        obj = new DepreciationDepreciation();
        console.log('Update obj = ', obj);
        obj.tUpdatePostApi('DepreciationDepreciationEditModalsFormId');
    })
});

$(document).ready(function(){
    $("#DepreciationDepreciationCreateModalBtnId").click(function(){
        var validate_obj = new InputValidation('DepreciationDepreciationCreateModalsFormId');
        if(validate_obj.validateRequired()){
            toastr.warning('Vui lòng điền đầy đủ thông tin');
            return;
        }
        obj = new DepreciationDepreciation();
        console.log('Save obj = ', obj);
        obj.tCreateNewPostFormApi('DepreciationDepreciationCreateModalsFormId');
    })
});

function DepreciationDepreciationSearchData(page=1,search_type,search_data=null){
    search_log["search_func"] = "DepreciationDepreciationSearchData";
    search_log["search_type"] = search_type;
    search_log["search_data"] = search_data;
        var obj = new DepreciationDepreciation();
        var results = obj.tSearchAllObjApi(page,search_data,search_type);
        console.log(obj)
        obj.callAjax.then(function(data) {
        $("#DepreciationDepreciationTableBodyId").empty();
        var body = $("#DepreciationDepreciationDataTableId");
        //if (body.length > 0){
        //    var bodyTable = body.DataTable();
        //    bodyTable.clear();
        //}
        ACCOUNT_ID_TABLE_COUNT = 1;
        crr_record_in_page = DepreciationDepreciationrecord_in_page;
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
        var pagination = DepreciationDepreciationpagination;
        var pagenation_ele=$(".pagination-DepreciationDepreciation");
        pagenation_ele.html('');
        var page_total_ele = $(".page-total-DepreciationDepreciation");
        page_total_ele.html(`<footer class="blockquote-footer">Tổng số: ${pagination["total"]} bản ghi </footer>`);
        
        if (results.length > 0) {
                pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="DepreciationDepreciationSearchData(1,'`+search_type+`'`+ `,'`+search_data+`'`+ `)">Đầu</a></li>`);

                if (pagination["has_prev"] == true) {
                    pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="DepreciationDepreciationSearchData(` + (parseInt(pagination["current_page"]) - 1) +`,'`+search_type+`'`+ `,'`+search_data+`'`+ `)">` + (parseInt(pagination["current_page"]) - 1) + `</a></li>`);
                }
                pagenation_ele.append('<li class="page-item active"><a class="page-link" >' + (parseInt(pagination["current_page"])) + '</a></li>');
                if (pagination["has_next"] == true) {
                    pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="DepreciationDepreciationSearchData(` + (parseInt(pagination["current_page"]) + 1) +`,'`+search_type+`'`+ `,'`+search_data+`'`+ `)">` + (parseInt(pagination["current_page"]) + 1) + `</a></li>`);
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
                pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="DepreciationDepreciationSearchData(`+last_page_order+`,'`+search_type+`'`+ `,'`+search_data+`'`+ `)">Cuối</a></li>`);
                }
            }
            if (search_type == "quick") {
                var crr_txt = $("#DepreciationDepreciationQuickSearchInputId").val();
                highlight(crr_txt,"#DepreciationDepreciationTableBodyId");
            }
            if (search_type == "filter") {
                var crr_txt = $("#name").val();
                highlight(crr_txt, "#DepreciationDepreciationTableBodyId");
            }
    })

}

function openbutton(){
    $('#openbestinworld').modal('toggle');
}

function ShowOption(URL,formid,first_row,words){
    $(formid).empty();
    if(first_row=="yes") { 
        var first_option = '<option value="">'+words+'</option>'
        $(formid).append(first_option); 
    }
// empty the options
    //   var pagess = "?page=" + i;
    $.ajax({
        url: URL,
        dataType: 'JSON',
        type: 'GET',
        success: function(data) {
          var event_data = '';
          var length_data = data.results.length;
          for (var j = 0; j < length_data; j++) {
            var datare = data.results[j];
            console.log(datare.uuid);
            event_data += '<option value="' + datare.uuid + '">' + datare.name + '</option>';
          }
          $(formid).append(event_data);
        }
  })
}

$(document).ready(function(){ 
    ShowOption(DepreciationPeriod_URL,"#preioddetailDepreciationDepreciationEditModalInputId","no","---")
    ShowOption(DepreciationPeriod_URL,"#preioddetailDepreciationDepreciationCreateModalInputId","no","---")
    ShowOption(DepreciationPeriod_URL,"#DepreciationPeriodFilterSearchInputId","yes","Kiểu Khấu Hao...")

    ShowOption(DepreciationType_URL,"#Asset_Type_DepreciationFilterSearchInputId","yes","Loại Tài Sản...")
    ShowOption(DepreciationAdjustment_URL,"#adjustmentasetDepreciationDepreciationEditModalInputId","yes","---")
    ShowOption(DepreciationAdjustment_URL,"#adjustmentasetDepreciationDepreciationCreateModalInputId","yes","---")
})


function ShowOption2(URL,formid,search_id){
    $(formid).empty();
    var search = "?search=" + search_id;
    console.log(search)
    $.ajax({
      url: URL + search,
      dataType: 'JSON',
      type: 'GET',
      success: function(data) {
        var event_data = '';
        var length_data = data.results.length;
        for (var j = 0; j < length_data; j++) {
          var datare = data.results[j];
          console.log(datare.uuid);
          event_data += '<option value="' + datare.uuid + '">' + datare.name + '</option>';
        }
        $(formid).append(event_data);
      }
})
}

function CallShowOption2(type_string,asset_string){
  ShowOption2(DepreciationType_URL,"#typedepreciationDepreciationDepreciationEditModalInputId",type_string)
  ShowOption2(DepreciationType_URL,"#typedepreciationDepreciationDepreciationCreateModalInputId",type_string)

  ShowOption2(AssetRevaluationAssetRevaluation_URL,"#assetrevaluationDepreciationDepreciationEditModalInputId",asset_string)
  ShowOption2(AssetRevaluationAssetRevaluation_URL,"#assetrevaluationDepreciationDepreciationCreateModalInputId",asset_string)
}

$(document).ready(function() {
    // Select the dropdown element
    var dropdown = $('#asetnameDepreciationDepreciationCreateModalInputId');
  
    // When a user selects an option, perform an action
    dropdown.on('change', function() {
      // Get the UUID of the selected option
        var asset = $(this).val();
        console.log(asset)
        $.ajax({
            url: DepreciationAssetAll_URL + asset +"/",
            type: "GET",
            success: function(data) {
                var asset_types = data.asset_type;
                var asset_uuid = data.uuid;
                CallShowOption2(asset_types,asset_uuid)
                }
            }), 
        console.log('Create')
    });      
});

$(document).ready(function(){
    var IdTable ="DepreciationDepreciationTableBodyId";
    var checker = $("#" +IdTable );
    if (checker.length > 0){
        if($('#'+IdTable).is(":visible")){
            DepreciationDepreciationGetDataTable(DepreciationDepreciationpagination["current_page"]);
        }
    }
})
  
function DepreciationDepreciationGetDetailDataTable(page=1,search_data=null,asset_uuid){
        $("#DepreciationAssetDetailDepreciationAssetDetailTableBodyId").empty();
        search_log["search_func"] = "DepreciationDepreciationGetDetailDataTable";
        search_log["search_data"] = search_data;
        search_log["search_type"] = "";

        var obj = new DepreciationAssetDetailDepreciationAssetDetail();
        var results = obj.tGetAllObjApiDetail(page,search_data,asset_uuid);
        obj.callAjax.then(function(data) {
            for (var i = 0; i < results.length; i++){
                try{
                    console.log('resultsdetail[i] = ', results[i]);
    
                    //results[i].tFillTable2();
                    results[i].tFillTable3Detail();
                    // results[i].tFillCard();
    
                    ACCOUNT_ID_TABLE_COUNT++;
                    // results[i].tFillTable1();
                }
                catch(err){
                    console.log(err);
                }
            }
        });
}

var DepreciationAssetDetailDepreciationAssetDetailpagination={
    current_page:1,
    total:0,
    has_next:false,
    has_prev:false
}

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

function CheckDuplicate(uuid_string){
    var search = "?search=" + uuid_string
    $.ajax({
      url: DepreciationDepreciationSmall_URL + search,
      type: "GET",
      success: function(data) {
          var length_data = data.results.length;
          if (length_data == 1) {
            toastr.warning('TAI SAN DA TON TAI')
          }
      },
    });
}

function GetAssetRevaluationTable(uuid){
    $('#AssetRevaluationAssetRevaluationFormID').empty();
    $.ajax({
        url: DepreciationDepreciationSmall_URL + uuid +'/',
        type: "GET",
        success: function(data) {
            var length_data = data.revaluation.length;
            for (var j = 0; j < length_data; j++) {
                var html = ""
                html +=
                `
                <tr>
                    <td attr-name="" class="border-gray-200">` + data.revaluation[j].name + `</th>
                
                    <td attr-name="" class="border-gray-200"> ` + data.revaluation[j].time_revaluation + `</th>
                
                    <td attr-name="" class="border-gray-200"> ` + data.revaluation[j].addup_value + ` </th>

                    <td attr-name="" class="border-gray-200"> ` + data.revaluation[j].addup_time + `  </th>
                </tr>
                `;
                $('#AssetRevaluationAssetRevaluationFormID').append(html);
            }
        },
    });
}
class DepreciationAssetDetailDepreciationAssetDetail{
    constructor(data=null){
      if (data != null){
          if (data.hasOwnProperty('id')){
              this.id = data.id;
          }
          else{
              this.id = null;
          }
    
          this.__app_name__ = "Depreciation";
    
          this.__model_name__ = "DepreciationAssetDetail";
    
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
    
          if (data.hasOwnProperty('asset_depreciations')){
              this.aet_depreciation= data.aet_depreciation;
          }
          else{
              this.aet_depreciation = null;
          }
    
          if (data.hasOwnProperty('count_depreciation')){
            this.count_depreciation= data.count_depreciation;
          }
          else{
              this.count_depreciation = null;
          }
    
          if (data.hasOwnProperty('days_depreciation')){
            this.days_depreciation = data.days_depreciation;
          }
          else{
              this.days_depreciation  = null;
          }
    
          if (data.hasOwnProperty('value_start')){
            this.value_start = data.value_start;
          }
          else{
              this.value_start  = null;
          }
    
          if (data.hasOwnProperty('value_end')){
            this.value_end = data.value_end;
          }
          else{
              this.value_end  = null;
          }
    
          if (data.hasOwnProperty('percent_depreciation')){
            this.percent_depreciation = data.percent_depreciation;
          }
          else{
              this.percent_depreciation  = null;
          }
    
          if (data.hasOwnProperty('value_depreciaiton')){
            this.value_depreciaiton = data.value_depreciaiton;
          }
          else{
              this.value_depreciaiton  = null;
          }
    
          if (data.hasOwnProperty('remain_value')){
            this.remain_value = data.remain_value;
          }
          else{
              this.remain_value  = null;
          }

          if (data.hasOwnProperty('month_1')){
            this.month_1 = data.month_1;
            if(this.month_1==0){
                this.month_1 = ""
            }
        }
        else{
            this.month_1 = null;
        }

        if (data.hasOwnProperty('month_2')){
            this.month_2 = data.month_2;
            if(this.month_2==0){
                this.month_2 = ""
            }
        }
        else{
            this.month_2 = null;
        }

        if (data.hasOwnProperty('month_3')){
            this.month_3 = data.month_3;
            if(this.month_3==0){
                this.month_3 = ""
            }
        }
        else{
            this.month_3 = null;
        }

        if (data.hasOwnProperty('month_4')){
            this.month_4 = data.month_4;
            if(this.month_4==0){
                this.month_4 = ""
            }
        }
        else{
            this.month_4 = null;
        }

        if (data.hasOwnProperty('month_5')){
            this.month_5 = data.month_5;
            if(this.month_5==0){
                this.month_5 = ""
            }
        }
        else{
            this.month_5 = null;
        }

        if (data.hasOwnProperty('month_6')){
            this.month_6 = data.month_6;
            if(this.month_6==0){
                this.month_6 = ""
            }
        }
        else{
            this.month_6 = null;
        }

        if (data.hasOwnProperty('month_7')){
            this.month_7 = data.month_7;
            if(this.month_7==0){
                this.month_7 = ""
            }
        }
        else{
            this.month_7 = null;
        }

        if (data.hasOwnProperty('month_8')){
            this.month_8 = data.month_8;
            if(this.month_8==0){
                this.month_8 = ""
            }
        }
        else{
            this.month_8 = null;
        }

        if (data.hasOwnProperty('month_9')){
            this.month_9 = data.month_9;
            if(this.month_9==0){
                this.month_9 = ""
            }
        }
        else{
            this.month_9 = null;
        }

        if (data.hasOwnProperty('month_10')){
            this.month_10 = data.month_10;
            if(this.month_10==0){
                this.month_10 = ""
            }
        }
        else{
            this.month_10 = null;
            
        }

        if (data.hasOwnProperty('month_11')){
            this.month_11 = data.month_11;
            if(this.month_11==0){
                this.month_11 = ""
            }
        }
        else{
            this.month_11 = null;
        }

        if (data.hasOwnProperty('month_12')){
            this.month_12 = data.month_12;
            if(this.month_12==0){
                this.month_12 = ""
            }
        }
        else{
            this.month_12 = null;
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
       
    // ########## get Objects from REST API --> return array of objects ##############
    tGetAllObjApiDetail(page=null,search_data=null,uuid=null){
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
        // var has_go_page=""
        // if(page!=null){
        //     has_go_page="?page="+page;
        // }
        var has_go_filter=""
        if(uuid!=null){
            has_go_filter="?aet_depreciation="+uuid;
        }
        console.log('has_go_filter',has_go_filter)
        this.callAjax =
        $.ajax({
            url: DepreciationAssetDetail_URL + has_go_filter,
            type: "GET",
            //async: false,
            cache: false,
            timeout: 30000,
    
            success: function (data) {
                console.log('[tGetAllObjApiDetailData11111] data = ', data);
                // return new DepreciationAssetDetailDepreciationAssetDetail(data);
                if (data.hasOwnProperty('count')){
                    DepreciationAssetDetailDepreciationAssetDetailpagination["total"]=data.count;
                }
                if (data.hasOwnProperty('count')){
                    DepreciationAssetDetailDepreciationAssetDetailpagination["total"]=data.count;
                }
                if (data.hasOwnProperty('next')){
                    if(data.next != null){
                    DepreciationAssetDetailDepreciationAssetDetailpagination["has_next"]=true;
                    }else{
                    DepreciationAssetDetailDepreciationAssetDetailpagination["has_next"]=false;
    
                    }
                }
                DepreciationAssetDetailDepreciationAssetDetailpagination["current_page"]=page;
                if (data.hasOwnProperty('previous')){
                    if(data.previous != null){
                    DepreciationAssetDetailDepreciationAssetDetailpagination["has_prev"]=true;
                    }else{
                    DepreciationAssetDetailDepreciationAssetDetailpagination["has_prev"]=false;
                    }
                }
                if (data.hasOwnProperty('results')){
                    for (var j=0; j < data.results.length; j++){
                        var tmp = new DepreciationAssetDetailDepreciationAssetDetail(data.results[j]);
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
 
    tFillTable3Detail(tableId=null,order=null){
      var tbId = "DepreciationAssetDetailDepreciationAssetDetailDataTableId";
      if(tableId!=null){
          tbId = tableId;
      }
    
      if(order==null){
      order=ACCOUNT_ID_TABLE_COUNT;
      }
      var table = $("#" + tbId) ;
      if (table.length > 0){
          var html = "<tr>"
          html+= `<td class="text-wrap">` + order + `</td>`;
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
                                        <i class="fas fa-times" style="color:gray" file-uuid="` + this["uuid"] + `" id="` + this["uuid"] + `btnDeleteId" onclick="avatarDepreciationAssetDetailDepreciationAssetDetailDeletedAttacthment(this)"></i>
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
                                        <input class="custom-control-input" id="${this["uuid"]}is_callbotDepreciationAssetDetailDepreciationAssetDetailSwitchListTablebtnId" name="`+ attr +`" data-uuid="` + this["uuid"] + `" type="checkbox"  `+value+` onclick="is_callbotDepreciationAssetDetailDepreciationAssetDetailEventChangeSwitcher(this)">
                                    <label class="custom-control-label" for="${this["uuid"]}is_callbotDepreciationAssetDetailDepreciationAssetDetailSwitchListTablebtnId"></label>
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
                                        <input class="custom-control-input" id="${this["uuid"]}is_chatbotDepreciationAssetDetailDepreciationAssetDetailSwitchListTablebtnId" name="`+ attr +`" data-uuid="` + this["uuid"] + `" type="checkbox"  `+value+` onclick="is_chatbotDepreciationAssetDetailDepreciationAssetDetailEventChangeSwitcher(this)">
                                    <label class="custom-control-label" for="${this["uuid"]}is_chatbotDepreciationAssetDetailDepreciationAssetDetailSwitchListTablebtnId"></label>
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
                                        <input class="custom-control-input" id="${this["uuid"]}log_confirm_by_emailDepreciationAssetDetailDepreciationAssetDetailSwitchListTablebtnId" name="`+ attr +`" data-uuid="` + this["uuid"] + `" type="checkbox"  `+value+` onclick="log_confirm_by_emailDepreciationAssetDetailDepreciationAssetDetailEventChangeSwitcher(this)">
                                    <label class="custom-control-label" for="${this["uuid"]}log_confirm_by_emailDepreciationAssetDetailDepreciationAssetDetailSwitchListTablebtnId"></label>
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
                                        <input class="custom-control-input" id="${this["uuid"]}logged_with_passwordDepreciationAssetDetailDepreciationAssetDetailSwitchListTablebtnId" name="`+ attr +`" data-uuid="` + this["uuid"] + `" type="checkbox"  `+value+` onclick="logged_with_passwordDepreciationAssetDetailDepreciationAssetDetailEventChangeSwitcher(this)">
                                    <label class="custom-control-label" for="${this["uuid"]}logged_with_passwordDepreciationAssetDetailDepreciationAssetDetailSwitchListTablebtnId"></label>
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
                                        <input class="custom-control-input" id="${this["uuid"]}created_free_licenseDepreciationAssetDetailDepreciationAssetDetailSwitchListTablebtnId" name="`+ attr +`" data-uuid="` + this["uuid"] + `" type="checkbox"  `+value+` onclick="created_free_licenseDepreciationAssetDetailDepreciationAssetDetailEventChangeSwitcher(this)">
                                    <label class="custom-control-label" for="${this["uuid"]}created_free_licenseDepreciationAssetDetailDepreciationAssetDetailSwitchListTablebtnId"></label>
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
                                        <input class="custom-control-input" id="${this["uuid"]}email_activatedDepreciationAssetDetailDepreciationAssetDetailSwitchListTablebtnId" name="`+ attr +`" data-uuid="` + this["uuid"] + `" type="checkbox"  `+value+` onclick="email_activatedDepreciationAssetDetailDepreciationAssetDetailEventChangeSwitcher(this)">
                                    <label class="custom-control-label" for="${this["uuid"]}email_activatedDepreciationAssetDetailDepreciationAssetDetailSwitchListTablebtnId"></label>
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
                              html +=`<td class="text-wrap" style="min-width:300px;font-weight:680" onclick="DepreciationAssetDetailDepreciationAssetDetailDetails('`+this["uuid"]+`')"><a class="L-Affiliate-Tagged">` + (this[attr]) + `</a></td>`;
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
                                  <a class="dropdown-item d-flex align-items-center L-Affiliate-Tagged" onclick="DepreciationAssetDetailDepreciationAssetDetailDetails('`+this.uuid+`')">             
                                      <i title="Xem chi tiết" class="far fa-eye" onclick="DepreciationAssetDetailDepreciationAssetDetailDetails" aria-hidden="true"></i>
                                          <span class="sr-only">Xem chi tiết</span> &nbsp;                           
                                  </a>            
                                  <a class="dropdown-item d-flex align-items-center L-Affiliate-Tagged" onclick="DepreciationAssetDetailDepreciationAssetDetailEdit('`+this.uuid+`')">               
                                      <i title="Chỉnh sửa" class="far fa-edit" onclick="DepreciationAssetDetailDepreciationAssetDetailEdit" aria-hidden="true"></i>
                                          <span class="sr-only">Chỉnh sửa</span>   &nbsp;                                      
                                  </a>            
                                  <a class="dropdown-item d-flex align-items-center L-Affiliate-Tagged" onclick="DepreciationAssetDetailDepreciationAssetDetailOnDeleteEvent('`+this.uuid+`')">               
                                      <i title="Xóa" class="far fa-trash-alt" onclick="DepreciationAssetDetailDepreciationAssetDetailOnDeleteEvent" aria-hidden="true"></i><span class="sr-only">Xóa</span>&nbsp;                       
                                  </a> 
                              </div>
                          </div>
                          </td>`
    
                      //   BindActionButtonVer4(
                      //       DepreciationAssetDetailDepreciationAssetDetail_arr_action,
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
                                        <input class="custom-control-input" id="${this["uuid"]}is_callbotDepreciationAssetDetailDepreciationAssetDetailSwitchListTablebtnId" name="`+ attr +`" data-uuid="` + this["uuid"] + `" type="checkbox"  `+value+` onclick="is_callbotDepreciationAssetDetailDepreciationAssetDetailEventChangeSwitcher(this)">
                                    <label class="custom-control-label" for="${this["uuid"]}is_callbotDepreciationAssetDetailDepreciationAssetDetailSwitchListTablebtnId"></label>
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
                                        <input class="custom-control-input" id="${this["uuid"]}is_chatbotDepreciationAssetDetailDepreciationAssetDetailSwitchListTablebtnId" name="`+ attr +`" data-uuid="` + this["uuid"] + `" type="checkbox"  `+value+` onclick="is_chatbotDepreciationAssetDetailDepreciationAssetDetailEventChangeSwitcher(this)">
                                    <label class="custom-control-label" for="${this["uuid"]}is_chatbotDepreciationAssetDetailDepreciationAssetDetailSwitchListTablebtnId"></label>
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
                                        <input class="custom-control-input" id="${this["uuid"]}log_confirm_by_emailDepreciationAssetDetailDepreciationAssetDetailSwitchListTablebtnId" name="`+ attr +`" data-uuid="` + this["uuid"] + `" type="checkbox"  `+value+` onclick="log_confirm_by_emailDepreciationAssetDetailDepreciationAssetDetailEventChangeSwitcher(this)">
                                    <label class="custom-control-label" for="${this["uuid"]}log_confirm_by_emailDepreciationAssetDetailDepreciationAssetDetailSwitchListTablebtnId"></label>
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
                                        <input class="custom-control-input" id="${this["uuid"]}logged_with_passwordDepreciationAssetDetailDepreciationAssetDetailSwitchListTablebtnId" name="`+ attr +`" data-uuid="` + this["uuid"] + `" type="checkbox"  `+value+` onclick="logged_with_passwordDepreciationAssetDetailDepreciationAssetDetailEventChangeSwitcher(this)">
                                    <label class="custom-control-label" for="${this["uuid"]}logged_with_passwordDepreciationAssetDetailDepreciationAssetDetailSwitchListTablebtnId"></label>
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
                                        <input class="custom-control-input" id="${this["uuid"]}created_free_licenseDepreciationAssetDetailDepreciationAssetDetailSwitchListTablebtnId" name="`+ attr +`" data-uuid="` + this["uuid"] + `" type="checkbox"  `+value+` onclick="created_free_licenseDepreciationAssetDetailDepreciationAssetDetailEventChangeSwitcher(this)">
                                    <label class="custom-control-label" for="${this["uuid"]}created_free_licenseDepreciationAssetDetailDepreciationAssetDetailSwitchListTablebtnId"></label>
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
                                        <input class="custom-control-input" id="${this["uuid"]}email_activatedDepreciationAssetDetailDepreciationAssetDetailSwitchListTablebtnId" name="`+ attr +`" data-uuid="` + this["uuid"] + `" type="checkbox"  `+value+` onclick="email_activatedDepreciationAssetDetailDepreciationAssetDetailEventChangeSwitcher(this)">
                                    <label class="custom-control-label" for="${this["uuid"]}email_activatedDepreciationAssetDetailDepreciationAssetDetailSwitchListTablebtnId"></label>
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
 
$(document).ready(function() {
    $('#DepreciationDepreciationExportExcelBtnId').click(function() {
        // Define the columns to export
        var columnsToExport = [1, 2, 3, 4, 5, 6]; // columns 1, 2, and 4 (zero-indexed)
        var theadToExport = '';
        $('#DepreciationDepreciationDataTableId thead').each(function() {
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
        $('#DepreciationDepreciationDataTableId tbody tr').each(function() {
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

function DepreciationDepreciationOrderTable(page=1,name){
    var obj = new DepreciationDepreciation();
    var results = obj.tOrderAllObjApi(page,name);
    console.log(obj)
    obj.callAjax.then(function(data) {
        $("#DepreciationDepreciationTableBodyId").empty();
        for (var i = 0; i < results.length; i++){
            try{
                console.log('resultsdetail[i] = ', results[i]);

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
    })
}

function OrderStatus(name){
    DepreciationDepreciationOrderTable(DepreciationDepreciationpagination["current_page"],name);
}

// $(document).ready(function() {
//   $('#')
// });

// function ShorterName(){
//     var company_code = $("#preioddetailDepreciationDepreciationCreateModalInputId option:selected").text()
//     var words = company_code.split(' ');
//     var acronym = '';

//     if(words.length === 1){
//         var acronym0 = company_code.toUpperCase();
//         GetCode(acronym0)
//     } else {     
//         for (var i = 0; i < words.length; i++) {
//             var word = words[i];
//             acronym += word.charAt(0).toUpperCase();
//             GetCode(acronym)
//         }
//     }
// }

function GetCode(){
    var company_code = "MPS/";
    var app_name = "DE/";
    var mode_name = "DEE/";
    $.ajax({
      url: CodeGenerate_URL + company_code + app_name + mode_name,
      type: "GET",
      success: function(data) {
        var generatedCode = data.code;
        $('#searchbox1').val(generatedCode);
        },
    });
}