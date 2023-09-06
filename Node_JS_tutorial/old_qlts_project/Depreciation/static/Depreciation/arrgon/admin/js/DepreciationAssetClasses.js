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
var IdTable ="DepreciationAssetDetailDepreciationAssetDetailTableBodyId";
var checker = $("#" +IdTable );
if (checker.length > 0){
    if($('#'+IdTable).is(":visible")){
        DepreciationAssetDetailDepreciationAssetDetailGetDataTable(DepreciationAssetDetailDepreciationAssetDetailpagination["current_page"]);
    }
}
})


var record_in_page = 5;
var search_log = {
  search_func:"",
  search_data:"",
  search_type:"",
}

function DepreciationAssetDetailDepreciationAssetDetailGetDataTable(page=1,search_data=null){
      console.log('hello')
      search_log["search_func"] = "DepreciationAssetDetailDepreciationAssetDetailGetDataTable";
      search_log["search_data"] = search_data;
      search_log["search_type"] = "";

      var obj = new DepreciationAssetDetailDepreciationAssetDetail();
      var results = obj.tGetAllObjApi(page,search_data);
      obj.callAjax.then(function(data) {
      $("#DepreciationAssetDetailDepreciationAssetDetailTableBodyId").empty();
      var body = $("#DepreciationAssetDetailDepreciationAssetDetailDataTableId");
      //if (body.length > 0){
      //    var bodyTable = body.DataTable();
      //    bodyTable.clear();
      //}
      ACCOUNT_ID_TABLE_COUNT = 1;
      var crr_record_in_page = DepreciationAssetDetailDepreciationAssetDetailrecord_in_page;

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
      var pagenation_ele=$(".pagination-DepreciationAssetDetailDepreciationAssetDetail");
      var pagination=DepreciationAssetDetailDepreciationAssetDetailpagination;
      pagenation_ele.html('');
      var page_total_ele = $(".page-total-DepreciationAssetDetailDepreciationAssetDetail");
      page_total_ele.html(`<footer class="mt-3 blockquote-footer">Tổng số: ${pagination["total"]} bản ghi </footer>`);
      if (results.length > 0) {
          
                  pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="DepreciationAssetDetailDepreciationAssetDetailGetDataTable(1)">Đầu</a></li>`);
                  if (pagination["has_prev"] == true) {
                      pagenation_ele.append('<li class="page-item"><a class="page-link" onclick="DepreciationAssetDetailDepreciationAssetDetailGetDataTable(' + (parseInt(pagination["current_page"]) - 1) + ')">' + (parseInt(pagination["current_page"]) - 1) + '</a></li>');
                  }
                  pagenation_ele.append('<li class="page-item active"><a class="page-link" >' + (parseInt(pagination["current_page"])) + '</a></li>');
                  if (pagination["has_next"] == true) {
                      pagenation_ele.append('<li class="page-item"><a class="page-link" onclick="DepreciationAssetDetailDepreciationAssetDetailGetDataTable(' + (parseInt(pagination["current_page"]) + 1) + ')">' + (parseInt(pagination["current_page"]) + 1) + '</a></li>');
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
                  pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="DepreciationAssetDetailDepreciationAssetDetailGetDataTable(`+last_page_order+`)">Cuối</a></li>`);
                  }
              }
  })
}


var DepreciationAssetDetailDepreciationAssetDetail_CACHE = [];

var DepreciationAssetDetailDepreciationAssetDetail_arr_action = [
// default action

      {
      "title": "Xem chi tiết",
      "func": "DepreciationAssetDetailDepreciationAssetDetailDetails",
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
      //     "func": "DepreciationAssetDetailDepreciationAssetDetailEdit",
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
      //     "func": "DepreciationAssetDetailDepreciationAssetDetailOnDeleteEvent",
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

      if (data.hasOwnProperty('aet_depreciation')){
          this.aet_depreciation= data.asset_depreciation;
      }
      else{
          this.asset_depreciations = null;
      }

      if (data.hasOwnProperty('name_aet_depreciation')){
        this.name_aet_depreciation= data.name_aet_depreciation;
        }
      else{
        this.name_aet_depreciation = null;
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
      var chEle = formEle.find("#nameDepreciationAssetDetailDepreciationAssetDetailInputId");
      if (chEle.length > 0){
          this.name = chEle.val();
      }
      else{
          // this.name = null;
      }
      var chEle = formEle.find("#uuidDepreciationAssetDetailDepreciationAssetDetailInputId");
      if (chEle.length > 0){
          this.uuid = chEle.val();
      }
      else{
          // this.uuid = null;
      }
      var chEle = formEle.find("#tndidDepreciationAssetDetailDepreciationAssetDetailInputId");
      if (chEle.length > 0){
          this.tndid = chEle.val();
      }
      else{
          // this.tndid = null;
      }
      var chEle = formEle.find("#nick_nameDepreciationAssetDetailDepreciationAssetDetailInputId");
      if (chEle.length > 0){
          this.nick_name = chEle.val();
      }
      else{
          // this.nick_name = null;
      }
      var chEle = formEle.find("#usernameDepreciationAssetDetailDepreciationAssetDetailInputId");
      if (chEle.length > 0){
          this.username = chEle.val();
      }
      else{
          // this.username = null;
      }
      var chEle = formEle.find("#full_nameDepreciationAssetDetailDepreciationAssetDetailInputId");
      if (chEle.length > 0){
          this.full_name = chEle.val();
      }
      else{
          // this.full_name = null;
      }
      var chEle = formEle.find("#emailDepreciationAssetDetailDepreciationAssetDetailInputId");
      if (chEle.length > 0){
          this.email = chEle.val();
      }
      else{
          // this.email = null;
      }
      var chEle = formEle.find("#groupsDepreciationAssetDetailDepreciationAssetDetailInputId");
      if (chEle.length > 0){
          this.groups = chEle.val();
      }
      else{
          // this.groups = null;
      }
      var chEle = formEle.find("#user_permissionsDepreciationAssetDetailDepreciationAssetDetailInputId");
      if (chEle.length > 0){
          this.user_permissions = chEle.val();
      }
      else{
          // this.user_permissions = null;
      }
      var chEle = formEle.find("#date_of_birthDepreciationAssetDetailDepreciationAssetDetailInputId");
      if (chEle.length > 0){
          this.date_of_birth = chEle.val();
      }
      else{
          // this.date_of_birth = null;
      }
      var chEle = formEle.find("#ageDepreciationAssetDetailDepreciationAssetDetailInputId");
      if (chEle.length > 0){
          this.age = chEle.val();
      }
      else{
          // this.age = null;
      }
      var chEle = formEle.find("#telephoneDepreciationAssetDetailDepreciationAssetDetailInputId");
      if (chEle.length > 0){
          this.telephone = chEle.val();
      }
      else{
          // this.telephone = null;
      }
      var chEle = formEle.find("#saltDepreciationAssetDetailDepreciationAssetDetailInputId");
      if (chEle.length > 0){
          this.salt = chEle.val();
      }
      else{
          // this.salt = null;
      }
      var chEle = formEle.find("#onetime_passwdDepreciationAssetDetailDepreciationAssetDetailInputId");
      if (chEle.length > 0){
          this.onetime_passwd = chEle.val();
      }
      else{
          // this.onetime_passwd = null;
      }
      var chEle = formEle.find("#avatarDepreciationAssetDetailDepreciationAssetDetailInputId");
      if (chEle.length > 0){
          this.avatar = chEle.val();
      }
      else{
          // this.avatar = null;
      }
      var chEle = formEle.find("#is_callbotDepreciationAssetDetailDepreciationAssetDetailInputId");
      if (chEle.length > 0){
          this.is_callbot = chEle.val();
      }
      else{
          // this.is_callbot = null;
      }
      var chEle = formEle.find("#callbot_endpointDepreciationAssetDetailDepreciationAssetDetailInputId");
      if (chEle.length > 0){
          this.callbot_endpoint = chEle.val();
      }
      else{
          // this.callbot_endpoint = null;
      }
      var chEle = formEle.find("#is_chatbotDepreciationAssetDetailDepreciationAssetDetailInputId");
      if (chEle.length > 0){
          this.is_chatbot = chEle.val();
      }
      else{
          // this.is_chatbot = null;
      }
      var chEle = formEle.find("#chatbot_endpointDepreciationAssetDetailDepreciationAssetDetailInputId");
      if (chEle.length > 0){
          this.chatbot_endpoint = chEle.val();
      }
      else{
          // this.chatbot_endpoint = null;
      }
      var chEle = formEle.find("#managerDepreciationAssetDetailDepreciationAssetDetailInputId");
      if (chEle.length > 0){
          this.manager = chEle.val();
      }
      else{
          // this.manager = null;
      }
      var chEle = formEle.find("#log_confirm_by_emailDepreciationAssetDetailDepreciationAssetDetailInputId");
      if (chEle.length > 0){
          this.log_confirm_by_email = chEle.val();
      }
      else{
          // this.log_confirm_by_email = null;
      }
      var chEle = formEle.find("#logged_with_passwordDepreciationAssetDetailDepreciationAssetDetailInputId");
      if (chEle.length > 0){
          this.logged_with_password = chEle.val();
      }
      else{
          // this.logged_with_password = null;
      }
      var chEle = formEle.find("#created_free_licenseDepreciationAssetDetailDepreciationAssetDetailInputId");
      if (chEle.length > 0){
          this.created_free_license = chEle.val();
      }
      else{
          // this.created_free_license = null;
      }
      var chEle = formEle.find("#email_activatedDepreciationAssetDetailDepreciationAssetDetailInputId");
      if (chEle.length > 0){
          this.email_activated = chEle.val();
      }
      else{
          // this.email_activated = null;
      }
      var chEle = formEle.find("#website_templateDepreciationAssetDetailDepreciationAssetDetailInputId");
      if (chEle.length > 0){
          this.website_template = chEle.val();
      }
      else{
          // this.website_template = null;
      }
      var chEle = formEle.find("#languageDepreciationAssetDetailDepreciationAssetDetailInputId");
      if (chEle.length > 0){
          this.language = chEle.val();
      }
      else{
          // this.language = null;
      }
      var chEle = formEle.find("#timezoneDepreciationAssetDetailDepreciationAssetDetailInputId");
      if (chEle.length > 0){
          this.timezone = chEle.val();
      }
      else{
          // this.timezone = null;
      }
      var chEle = formEle.find("#app_permissionsDepreciationAssetDetailDepreciationAssetDetailInputId");
      if (chEle.length > 0){
          this.app_permissions = chEle.val();
      }
      else{
          // this.app_permissions = null;
      }
      var chEle = formEle.find("#signup_atDepreciationAssetDetailDepreciationAssetDetailInputId");
      if (chEle.length > 0){
          this.signup_at = chEle.val();
      }
      else{
          // this.signup_at = null;
      }
      var chEle = formEle.find("#last_login_atDepreciationAssetDetailDepreciationAssetDetailInputId");
      if (chEle.length > 0){
          this.last_login_at = chEle.val();
      }
      else{
          // this.last_login_at = null;
      }
      var chEle = formEle.find("#extend_fieldDepreciationAssetDetailDepreciationAssetDetailInputId");
      if (chEle.length > 0){
          this.extend_field = chEle.val();
      }
      else{
          // this.extend_field = null;
      }
      var chEle = formEle.find("#passwordDepreciationAssetDetailDepreciationAssetDetailInputId");
      if (chEle.length > 0){
          this.password = chEle.val();
      }
      else{
          // this.password = null;
      }
      var chEle = formEle.find("#updated_atDepreciationAssetDetailDepreciationAssetDetailInputId");
      if (chEle.length > 0){
          this.updated_at = chEle.val();
      }
      else{
          // this.updated_at = null;
      }
      var chEle = formEle.find("#created_atDepreciationAssetDetailDepreciationAssetDetailInputId");
      if (chEle.length > 0){
          this.created_at = chEle.val();
      }
      else{
          // this.created_at = null;
      }
  }
  else{
      var chEle = $("#idDepreciationAssetDetailDepreciationAssetDetailInputId");
      if (chEle.length > 0){
          this.id = chEle.val();
      }
      else{
          // this.id = null;
      }
                          var chEle = $("#nameDepreciationAssetDetailDepreciationAssetDetailInputId");
                          if (chEle.length > 0){
                              this.name = chEle.val();
                          }
                          else{
                              // this.name = null;
                          }
              
                          var chEle = $("#uuidDepreciationAssetDetailDepreciationAssetDetailInputId");
                          if (chEle.length > 0){
                              this.uuid = chEle.val();
                          }
                          else{
                              // this.uuid = null;
                          }
              
                          var chEle = $("#tndidDepreciationAssetDetailDepreciationAssetDetailInputId");
                          if (chEle.length > 0){
                              this.tndid = chEle.val();
                          }
                          else{
                              // this.tndid = null;
                          }
              
                          var chEle = $("#nick_nameDepreciationAssetDetailDepreciationAssetDetailInputId");
                          if (chEle.length > 0){
                              this.nick_name = chEle.val();
                          }
                          else{
                              // this.nick_name = null;
                          }
              
                          var chEle = $("#usernameDepreciationAssetDetailDepreciationAssetDetailInputId");
                          if (chEle.length > 0){
                              this.username = chEle.val();
                          }
                          else{
                              // this.username = null;
                          }
              
                          var chEle = $("#full_nameDepreciationAssetDetailDepreciationAssetDetailInputId");
                          if (chEle.length > 0){
                              this.full_name = chEle.val();
                          }
                          else{
                              // this.full_name = null;
                          }
              
                          var chEle = $("#emailDepreciationAssetDetailDepreciationAssetDetailInputId");
                          if (chEle.length > 0){
                              this.email = chEle.val();
                          }
                          else{
                              // this.email = null;
                          }
              
                          var chEle = $("#groupsDepreciationAssetDetailDepreciationAssetDetailInputId");
                          if (chEle.length > 0){
                              this.groups = chEle.val();
                          }
                          else{
                              // this.groups = null;
                          }
              
                          var chEle = $("#user_permissionsDepreciationAssetDetailDepreciationAssetDetailInputId");
                          if (chEle.length > 0){
                              this.user_permissions = chEle.val();
                          }
                          else{
                              // this.user_permissions = null;
                          }
              
                          var chEle = $("#date_of_birthDepreciationAssetDetailDepreciationAssetDetailInputId");
                          if (chEle.length > 0){
                              var date = moment(chEle.val(), 'DD/MM/YYYY');
                              this.date_of_birth=toDatePython(new Date(date))
                          }
                          else{
                              // this.date_of_birth = null;
                          }
              
                          var chEle = $("#ageDepreciationAssetDetailDepreciationAssetDetailInputId");
                          if (chEle.length > 0){
                              this.age = chEle.val();
                          }
                          else{
                              // this.age = null;
                          }
              
                          var chEle = $("#telephoneDepreciationAssetDetailDepreciationAssetDetailInputId");
                          if (chEle.length > 0){
                              this.telephone = chEle.val();
                          }
                          else{
                              // this.telephone = null;
                          }
              
                          var chEle = $("#saltDepreciationAssetDetailDepreciationAssetDetailInputId");
                          if (chEle.length > 0){
                              this.salt = chEle.val();
                          }
                          else{
                              // this.salt = null;
                          }
              
                          var chEle = $("#onetime_passwdDepreciationAssetDetailDepreciationAssetDetailInputId");
                          if (chEle.length > 0){
                              this.onetime_passwd = chEle.val();
                          }
                          else{
                              // this.onetime_passwd = null;
                          }
              
                          var chEle = $("#avatarDepreciationAssetDetailDepreciationAssetDetailInputId");
                          if (chEle.length > 0){
                              this.avatar = chEle.val();
                          }
                          else{
                              // this.avatar = null;
                          }
              
                          var chEle = $("#is_callbotDepreciationAssetDetailDepreciationAssetDetailInputId");
                          if (chEle.length > 0){
                              this.is_callbot = chEle.val();
                          }
                          else{
                              // this.is_callbot = null;
                          }
              
                          var chEle = $("#callbot_endpointDepreciationAssetDetailDepreciationAssetDetailInputId");
                          if (chEle.length > 0){
                              this.callbot_endpoint = chEle.val();
                          }
                          else{
                              // this.callbot_endpoint = null;
                          }
              
                          var chEle = $("#is_chatbotDepreciationAssetDetailDepreciationAssetDetailInputId");
                          if (chEle.length > 0){
                              this.is_chatbot = chEle.val();
                          }
                          else{
                              // this.is_chatbot = null;
                          }
              
                          var chEle = $("#chatbot_endpointDepreciationAssetDetailDepreciationAssetDetailInputId");
                          if (chEle.length > 0){
                              this.chatbot_endpoint = chEle.val();
                          }
                          else{
                              // this.chatbot_endpoint = null;
                          }
              
                          var chEle = $("#managerDepreciationAssetDetailDepreciationAssetDetailInputId");
                          if (chEle.length > 0){
                              this.manager = chEle.val();
                          }
                          else{
                              // this.manager = null;
                          }
              
                          var chEle = $("#log_confirm_by_emailDepreciationAssetDetailDepreciationAssetDetailInputId");
                          if (chEle.length > 0){
                              this.log_confirm_by_email = chEle.val();
                          }
                          else{
                              // this.log_confirm_by_email = null;
                          }
              
                          var chEle = $("#logged_with_passwordDepreciationAssetDetailDepreciationAssetDetailInputId");
                          if (chEle.length > 0){
                              this.logged_with_password = chEle.val();
                          }
                          else{
                              // this.logged_with_password = null;
                          }
              
                          var chEle = $("#created_free_licenseDepreciationAssetDetailDepreciationAssetDetailInputId");
                          if (chEle.length > 0){
                              this.created_free_license = chEle.val();
                          }
                          else{
                              // this.created_free_license = null;
                          }
              
                          var chEle = $("#email_activatedDepreciationAssetDetailDepreciationAssetDetailInputId");
                          if (chEle.length > 0){
                              this.email_activated = chEle.val();
                          }
                          else{
                              // this.email_activated = null;
                          }
              
                          var chEle = $("#website_templateDepreciationAssetDetailDepreciationAssetDetailInputId");
                          if (chEle.length > 0){
                              this.website_template = chEle.val();
                          }
                          else{
                              // this.website_template = null;
                          }
              
                          var chEle = $("#languageDepreciationAssetDetailDepreciationAssetDetailInputId");
                          if (chEle.length > 0){
                              this.language = chEle.val();
                          }
                          else{
                              // this.language = null;
                          }
              
                          var chEle = $("#timezoneDepreciationAssetDetailDepreciationAssetDetailInputId");
                          if (chEle.length > 0){
                              this.timezone = chEle.val();
                          }
                          else{
                              // this.timezone = null;
                          }
              
                          var chEle = $("#app_permissionsDepreciationAssetDetailDepreciationAssetDetailInputId");
                          if (chEle.length > 0){
                              this.app_permissions = chEle.val();
                          }
                          else{
                              // this.app_permissions = null;
                          }
              
                          var chEle = $("#signup_atDepreciationAssetDetailDepreciationAssetDetailInputId");
                          if (chEle.length > 0){
                              var date = moment(chEle.val(), 'DD/MM/YYYY');
                              this.signup_at=toDatePython(new Date(date))
                          }
                          else{
                              // this.signup_at = null;
                          }
              
                          var chEle = $("#last_login_atDepreciationAssetDetailDepreciationAssetDetailInputId");
                          if (chEle.length > 0){
                              var date = moment(chEle.val(), 'DD/MM/YYYY');
                              this.last_login_at=toDatePython(new Date(date))
                          }
                          else{
                              // this.last_login_at = null;
                          }
              
                          var chEle = $("#extend_fieldDepreciationAssetDetailDepreciationAssetDetailInputId");
                          if (chEle.length > 0){
                              this.extend_field = chEle.val();
                          }
                          else{
                              // this.extend_field = null;
                          }
              
                          var chEle = $("#passwordDepreciationAssetDetailDepreciationAssetDetailInputId");
                          if (chEle.length > 0){
                              this.password = chEle.val();
                          }
                          else{
                              // this.password = null;
                          }
              
                          var chEle = $("#updated_atDepreciationAssetDetailDepreciationAssetDetailInputId");
                          if (chEle.length > 0){
                              var date = moment(chEle.val(), 'DD/MM/YYYY');
                              this.updated_at=toDatePython(new Date(date))
                          }
                          else{
                              // this.updated_at = null;
                          }
              
                          var chEle = $("#created_atDepreciationAssetDetailDepreciationAssetDetailInputId");
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
            var j_ele_name = $("#nameDepreciationAssetDetailDepreciationAssetDetailInputId");
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
            var j_ele_uuid = $("#uuidDepreciationAssetDetailDepreciationAssetDetailInputId");
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
            var j_ele_tndid = $("#tndidDepreciationAssetDetailDepreciationAssetDetailInputId");
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
            var j_ele_nick_name = $("#nick_nameDepreciationAssetDetailDepreciationAssetDetailInputId");
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
            var j_ele_username = $("#usernameDepreciationAssetDetailDepreciationAssetDetailInputId");
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
            var j_ele_full_name = $("#full_nameDepreciationAssetDetailDepreciationAssetDetailInputId");
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
            var j_ele_email = $("#emailDepreciationAssetDetailDepreciationAssetDetailInputId");
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
            var j_ele_groups = $("#groupsGroupDepreciationAssetDetailDepreciationAssetDetailInputId");
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
            var j_ele_user_permissions = $("#user_permissionsPermissionDepreciationAssetDetailDepreciationAssetDetailInputId");
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
            var j_ele_date_of_birth = $("#date_of_birthDepreciationAssetDetailDepreciationAssetDetailInputId");
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
            var j_ele_age = $("#ageDepreciationAssetDetailDepreciationAssetDetailInputId");
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
            var j_ele_telephone = $("#telephoneDepreciationAssetDetailDepreciationAssetDetailInputId");
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
            var j_ele_salt = $("#saltDepreciationAssetDetailDepreciationAssetDetailInputId");
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
            var j_ele_onetime_passwd = $("#onetime_passwdDepreciationAssetDetailDepreciationAssetDetailInputId");
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
            var j_ele_avatar = $("#avatarDepreciationAssetDetailDepreciationAssetDetailInputId");
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
            var j_ele_is_callbot = $("#is_callbotDepreciationAssetDetailDepreciationAssetDetailInputId");
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
            var j_ele_callbot_endpoint = $("#callbot_endpointDepreciationAssetDetailDepreciationAssetDetailInputId");
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
            var j_ele_is_chatbot = $("#is_chatbotDepreciationAssetDetailDepreciationAssetDetailInputId");
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
            var j_ele_chatbot_endpoint = $("#chatbot_endpointDepreciationAssetDetailDepreciationAssetDetailInputId");
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
            var j_ele_manager = $("#managerDepreciationAssetDetailDepreciationAssetDetailAccountInputId");
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
            var j_ele_log_confirm_by_email = $("#log_confirm_by_emailDepreciationAssetDetailDepreciationAssetDetailInputId");
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
            var j_ele_logged_with_password = $("#logged_with_passwordDepreciationAssetDetailDepreciationAssetDetailInputId");
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
            var j_ele_created_free_license = $("#created_free_licenseDepreciationAssetDetailDepreciationAssetDetailInputId");
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
            var j_ele_email_activated = $("#email_activatedDepreciationAssetDetailDepreciationAssetDetailInputId");
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
            var j_ele_website_template = $("#website_templateWebsiteTemplateDepreciationAssetDetailDepreciationAssetDetailInputId");
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
            var j_ele_language = $("#languageDepreciationAssetDetailDepreciationAssetDetailInputId");
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
            var j_ele_timezone = $("#timezoneDepreciationAssetDetailDepreciationAssetDetailInputId");
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
            var j_ele_app_permissions = $("#app_permissionsAppPermissionDepreciationAssetDetailDepreciationAssetDetailInputId");
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
            var j_ele_signup_at = $("#signup_atDepreciationAssetDetailDepreciationAssetDetailInputId");
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
            var j_ele_last_login_at = $("#last_login_atDepreciationAssetDetailDepreciationAssetDetailInputId");
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
            var j_ele_extend_field = $("#extend_fieldExtendInfoDepreciationAssetDetailDepreciationAssetDetailInputId");
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
            var j_ele_password = $("#passwordDepreciationAssetDetailDepreciationAssetDetailInputId");
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
            var j_ele_updated_at = $("#updated_atDepreciationAssetDetailDepreciationAssetDetailInputId");
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
            var j_ele_created_at = $("#created_atDepreciationAssetDetailDepreciationAssetDetailInputId");
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
          var j_ele_name = $("#nameDepreciationAssetDetailDepreciationAssetDetail"+apart+"InputId");
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
          var j_ele_id = $("#idDepreciationAssetDetailDepreciationAssetDetail"+apart+"InputId");
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
          var j_ele_uuid = $("#uuidDepreciationAssetDetailDepreciationAssetDetail"+apart+"InputId");
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
          var j_ele_tndid = $("#tndidDepreciationAssetDetailDepreciationAssetDetail"+apart+"InputId");
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
          var j_ele_nick_name = $("#nick_nameDepreciationAssetDetailDepreciationAssetDetail"+apart+"InputId");
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
          var j_ele_username = $("#usernameDepreciationAssetDetailDepreciationAssetDetail"+apart+"InputId");
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
          var j_ele_full_name = $("#nameDepreciationAssetDetailDepreciationAssetDetail"+apart+"InputId");
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
          var j_ele_email = $("#timerevaluationDepreciationAssetDetailDepreciationAssetDetail"+apart+"InputId");
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
          var j_ele_email = $("#addupvalueDepreciationAssetDetailDepreciationAssetDetail"+apart+"InputId");
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
          var j_ele_email = $("#adduptimeDepreciationAssetDetailDepreciationAssetDetail"+apart+"InputId");
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
            var j_ele_name = $("#nameDepreciationAssetDetailDepreciationAssetDetail"+apart+"InputId");
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
            var j_ele_uuid = $("#uuidDepreciationAssetDetailDepreciationAssetDetail"+apart+"InputId");
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
            var j_ele_tndid = $("#tndidDepreciationAssetDetailDepreciationAssetDetail"+apart+"InputId");
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
            var j_ele_nick_name = $("#nick_nameDepreciationAssetDetailDepreciationAssetDetail"+apart+"InputId");
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
            var j_ele_username = $("#usernameDepreciationAssetDetailDepreciationAssetDetail"+apart+"InputId");
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
            var j_ele_full_name = $("#full_nameDepreciationAssetDetailDepreciationAssetDetail"+apart+"InputId");
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
            var j_ele_email = $("#emailDepreciationAssetDetailDepreciationAssetDetail"+apart+"InputId");
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
            var j_ele_groups = $("#groupsGroupDepreciationAssetDetailDepreciationAssetDetail"+apart+"InputId");
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
            var j_ele_user_permissions = $("#user_permissionsPermissionDepreciationAssetDetailDepreciationAssetDetail"+apart+"InputId");
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
            var j_ele_date_of_birth = $("#date_of_birthDepreciationAssetDetailDepreciationAssetDetail"+apart+"InputId");
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
            var j_ele_age = $("#ageDepreciationAssetDetailDepreciationAssetDetail"+apart+"InputId");
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
            var j_ele_telephone = $("#telephoneDepreciationAssetDetailDepreciationAssetDetail"+apart+"InputId");
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
            var j_ele_salt = $("#saltDepreciationAssetDetailDepreciationAssetDetail"+apart+"InputId");
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
            var j_ele_onetime_passwd = $("#onetime_passwdDepreciationAssetDetailDepreciationAssetDetail"+apart+"InputId");
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
                        var j_ele_avatar = $("#avatarDepreciationAssetDetailDepreciationAssetDetail"+apart+"FileAreaId");
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
                                        <i class="fas fa-times" style="color:gray" file-uuid="` + self.uuid + `" id="` + self.uuid + `btnDeleteId" onclick="avatarDepreciationAssetDetailDepreciationAssetDetailDeletedAttacthment(this)"></i>
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
                        var j_ele_is_callbot = $("#is_callbotDepreciationAssetDetailDepreciationAssetDetail"+apart+"InputId");
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
            var j_ele_callbot_endpoint = $("#callbot_endpointDepreciationAssetDetailDepreciationAssetDetail"+apart+"InputId");
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
                        var j_ele_is_chatbot = $("#is_chatbotDepreciationAssetDetailDepreciationAssetDetail"+apart+"InputId");
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
            var j_ele_chatbot_endpoint = $("#chatbot_endpointDepreciationAssetDetailDepreciationAssetDetail"+apart+"InputId");
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
                var j_ele_manager = $("#managerDepreciationAssetDetailDepreciationAssetDetailAccount"+apart+"InputId");
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
                        var j_ele_log_confirm_by_email = $("#log_confirm_by_emailDepreciationAssetDetailDepreciationAssetDetail"+apart+"InputId");
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
                        var j_ele_logged_with_password = $("#logged_with_passwordDepreciationAssetDetailDepreciationAssetDetail"+apart+"InputId");
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
                        var j_ele_created_free_license = $("#created_free_licenseDepreciationAssetDetailDepreciationAssetDetail"+apart+"InputId");
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
                        var j_ele_email_activated = $("#email_activatedDepreciationAssetDetailDepreciationAssetDetail"+apart+"InputId");
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
                var j_ele_website_template = $("#website_templateWebsiteTemplateDepreciationAssetDetailDepreciationAssetDetail"+apart+"InputId");
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
            var j_ele_language = $("#languageDepreciationAssetDetailDepreciationAssetDetail"+apart+"InputId");
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
            var j_ele_timezone = $("#timezoneDepreciationAssetDetailDepreciationAssetDetail"+apart+"InputId");
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
            var j_ele_app_permissions = $("#app_permissionsAppPermissionDepreciationAssetDetailDepreciationAssetDetail"+apart+"InputId");
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
            var j_ele_signup_at = $("#signup_atDepreciationAssetDetailDepreciationAssetDetail"+apart+"InputId");
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
            var j_ele_last_login_at = $("#last_login_atDepreciationAssetDetailDepreciationAssetDetail"+apart+"InputId");
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
            var j_ele_extend_field = $("#extend_fieldExtendInfoDepreciationAssetDetailDepreciationAssetDetail"+apart+"InputId");
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
            var j_ele_password = $("#passwordDepreciationAssetDetailDepreciationAssetDetail"+apart+"InputId");
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
            var j_ele_updated_at = $("#updated_atDepreciationAssetDetailDepreciationAssetDetail"+apart+"InputId");
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
            var j_ele_created_at = $("#created_atDepreciationAssetDetailDepreciationAssetDetail"+apart+"InputId");
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
        url: DepreciationAssetDetailDepreciationAssetDetail_URL,
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
                self = new DepreciationAssetDetailDepreciationAssetDetail(data);
                DepreciationAssetDetailDepreciationAssetDetailGetDataTable(DepreciationAssetDetailDepreciationAssetDetailpagination["current_page"]);
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
    formData = new FormData($('#DepreciationAssetDetailDepreciationAssetDetailCreateFormId')[0]);

    }
    else{
        form = $('#' + formId);
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
    if(formData.get('id')==null || formData.get('id')=='' || formData.get('id')==null){
        return;
    }else{
        this.id=formData.get('id');
    }
    
    var file_eles = $(".account-account");
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
            url: DepreciationAssetDetailDepreciationAssetDetail_URL + self.id + "/",
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
                    self = new DepreciationAssetDetailDepreciationAssetDetail(data);
                    
                    DepreciationAssetDetailDepreciationAssetDetailGetDataTable(DepreciationAssetDetailDepreciationAssetDetailpagination["current_page"])
                    //$(location).prop('href', "/Account/Account/detail/" + self.uuid + "/");
                    if(is_continue_form){
                        is_continue_form=false;
                        if(!is_notification && (is_done||!is_has_children)){
                            is_notification = true;
                            toastr.success('Cập nhật thành công');
                        }
                        $(location).prop('href', "/Account/Account/create/");
                    }else if(is_continue_modal){
                        is_continue_modal=false;
                        AccountRefreshCreateModal();
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
                $(location).prop('href', "/Account/Account/create/");
        }else if(is_continue_modal){
            is_continue_modal=false;
            AccountRefreshCreateModal();
            if(!is_notification && (is_done||!is_has_children)){
                is_notification = true;
                toastr.success('Cập nhật thành công');
            }
        }else{
            form.closest('.modal').modal('hide');
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
    $('#idDepreciationAssetDetailDepreciationAssetDetailInputId').val(null);
    $('#uuidDepreciationAssetDetailDepreciationAssetDetailInputId').val(uuidv4());
    var self = this;
    var formData;
    var form ;
    var arr_table = [];
    if(formId==null){
    formData = new FormData($('#DepreciationAssetDetailDepreciationAssetDetailCreateFormId')[0]);

    }
    else{
        form = $('#' + formId);
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
    
    var file_eles = $(".account-account");
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
        LoadDepreciationAssetDetailDepreciationAssetDetailList();
    }
    if(!is_save_self_table){
            $.ajax({
            url: DepreciationAssetDetailDepreciationAssetDetail_URL,
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
                    self = new DepreciationAssetDetailDepreciationAssetDetail(data);
                    LoadDepreciationAssetDetailDepreciationAssetDetailList();
                    DepreciationAssetDetailDepreciationAssetDetailGetDataTable(DepreciationAssetDetailDepreciationAssetDetailpagination["current_page"]);
                    if(is_continue_form){
                        is_continue_form=false;
                        if(!is_notification){
                            is_notification = true;
                            toastr.success('Thêm mới thành công');
                        }
                        

                        $(location).prop('href', "/Account/Account/create/");
                    }else if(is_continue_modal){
                        is_continue_modal=false;
                        AccountRefreshCreateModal();
                        if(!is_notification){
                            is_notification = true;
                            toastr.success('Thêm mới thành công');
                        }
                    }else{
                        if(!is_notification){
                            is_notification = true;
                            toastr.success('Thêm mới thành công');
                        }
                        form.closest('.modal').modal('hide');
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
            $(location).prop('href', "/Account/Account/create/");
        }else if(is_continue_modal){
            is_continue_modal=false;
            AccountRefreshCreateModal();
            if(!is_notification){
                is_notification = true;
                toastr.success('Thêm mới thành công');
            }
        }else{
            if(!is_notification){
                is_notification = true;
                toastr.success('Thêm mới thành công');
            }
            form.closest('.modal').modal('hide');
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
        url: DepreciationAssetDetailDepreciationAssetDetail_URL,
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
        url: DepreciationAssetDetailDepreciationAssetDetail_URL,
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
        url: DepreciationAssetDetailDepreciationAssetDetail_URL + uuid + "/",
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
            DepreciationAssetDetailDepreciationAssetDetailGetDataTable(DepreciationAssetDetailDepreciationAssetDetailpagination["current_page"]);
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
        url: DepreciationAssetDetailDepreciationAssetDetail_URL + uuid_go + "/",
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
            DepreciationAssetDetailDepreciationAssetDetailSearchData(DepreciationAssetDetailDepreciationAssetDetailpagination["current_page"],"filter",data_search);
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
        url: DepreciationAssetDetailDepreciationAssetDetail_REMOVEFILE_URL+uuid+"/",
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
        url: DepreciationAssetDetailDepreciationAssetDetail_URL+uuid+"/",
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
        url: DepreciationAssetDetail_URL+has_go_page,
        type: "GET",
        //async: false,
        cache: false,
        timeout: 30000,

        success: function (data) {
            console.log('[tGetAllObjApi] data = ', data);
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
        url: DepreciationAssetDetailDepreciationAssetDetail_LARGE_URL+has_go_page,
        type: "GET",
        //async: false,
        cache: false,
        timeout: 30000,

        success: function (data) {
            console.log('[tGetAllObjLargeApi] data = ', data);
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
        
                            if($("#full_nameDepreciationAssetDetailDepreciationAssetDetailFilterSearchInputId").length>0){
                                var value=$("#full_nameDepreciationAssetDetailDepreciationAssetDetailFilterSearchInputId").val();
                                if(value!="" && value!=null){
                                    slugSearch+="full_name__contains="+value+"&";
                                }
                            }
                            
                        slugSearch=slugSearch.slice(0, -1);
    }else{
        SEARCH_URL=AssetRevaluationAssetRevaluation_URL;
        
          slugSearch="&";
          slugSearch+="search="+$("#DepreciationAssetDetailDepreciationAssetDetailQuickSearchInputId").val();
        
    }
    if(search_data!=null){
        SEARCH_URL=AssetRevaluationAssetRevaluation_URL;
        slugSearch="&";
        slugSearch+=search_data;
    }
    search_log["search_data"] = slugSearch;
    this.callAjax =
    $.ajax({
        url: DepreciationAssetDetail_URL+has_go_page+slugSearch,
        type: "GET",
        //async: false,
        cache: false,
        timeout: 30000,

        success: function (data) {
            console.log('[tGetAllObjApi] data = ', data);
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
        SEARCH_URL=DepreciationAssetDetailDepreciationAssetDetail_LARGE_FILTER_URL;
        
            slugSearch="&";
        
                            if($("#full_nameDepreciationAssetDetailDepreciationAssetDetailFilterSearchInputId").length>0){
                                var value=$("#full_nameDepreciationAssetDetailDepreciationAssetDetailFilterSearchInputId").val();
                                if(value!="" && value!=null){
                                    slugSearch+="full_name__contains="+value+"&";
                                }
                            }
                            
                        slugSearch=slugSearch.slice(0, -1);
    }else{
        SEARCH_URL=DepreciationAssetDetailDepreciationAssetDetail_SEARCH_URL;
        
            slugSearch="&";
            slugSearch+="search="+$("#DepreciationAssetDetailDepreciationAssetDetailQuickSearchInputId").val();
        
    }
    if(search_data!=null){
        SEARCH_URL=DepreciationAssetDetailDepreciationAssetDetail_LARGE_FILTER_URL;
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
            var n_obj = new DepreciationAssetDetailDepreciationAssetDetail(data);
            console.log('n_obj = ', n_obj);
            n_obj.tFillForm();
            return n_obj;
            // if (data.hasOwnProperty('results')){
            //    if (data.results.length > 0){
            //        var tmp = new DepreciationAssetDetailDepreciationAssetDetail(data[i]);
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
    var tbId = "DepreciationAssetDetailDepreciationAssetDetailDataTableId";
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
    var tbId = "DepreciationAssetDetailDepreciationAssetDetailDataTableId";
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
  var tbId = "DepreciationAssetDetailDepreciationAssetDetailDataTableId";
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
                                      Xem Chi Tiết              
                              </a>            
                              <a class="dropdown-item d-flex align-items-center L-Affiliate-Tagged" onclick="DepreciationAssetDetailDepreciationAssetDetailEdit('`+this.uuid+`')">               
                                  <i title="Chỉnh sửa" class="far fa-edit" onclick="DepreciationAssetDetailDepreciationAssetDetailEdit" aria-hidden="true"></i>
                                      <span class="sr-only">Chỉnh sửa</span>   &nbsp;                
                                      Chỉnh Sửa                        
                              </a>            
                              <a class="dropdown-item d-flex align-items-center L-Affiliate-Tagged" onclick="DepreciationAssetDetailDepreciationAssetDetailOnDeleteEvent('`+this.uuid+`')">               
                                  <i title="Xóa" class="far fa-trash-alt" onclick="DepreciationAssetDetailDepreciationAssetDetailOnDeleteEvent" aria-hidden="true"></i><span class="sr-only">Xóa</span>&nbsp;                
                                  Xóa Dữ Liệu          
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

// Fill List type 1:
tFillList1(){
}

// Fill List type 2:
tFillList2(){
}

        //fill table for inline table
tFillTable4(tableId=null,order=null,action=null){
    console.log("hihow")
    var tbId = "DepreciationAssetDetailDepreciationAssetDetailDataTableId";
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
  var card_Id = "DepreciationAssetDetailDepreciationAssetDetailCardAreaId";
  if(cardId!=null){
      card_Id = cardId;
  }

  if(order==null){
  order=ACCOUNT_ID_TABLE_COUNT;
  }
  var card_area = $("#" + card_Id);
  if (card_area.length > 0){
      var card_template = card_area.find(".DepreciationAssetDetailDepreciationAssetDetailTemplateCardClass");
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
                                      <i class="fas fa-times" style="color:gray" file-uuid="` + this["uuid"] + `" id="` + this["uuid"] + `btnDeleteId" onclick="avatarDepreciationAssetDetailDepreciationAssetDetailDeletedAttacthment(this)"></i>
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
                      $(hEle).html(`<a onclick="DepreciationAssetDetailDepreciationAssetDetailDetails('`+this["uuid"]+`')">` + (this[attr]) + `</a>`);
                      continue;
                  }
                  $(hEle).html(`<a>` + (this[attr]) + `</a>`);

              }
          }
          var action_button = BindActionButtonVer5(
                          DepreciationAssetDetailDepreciationAssetDetail_arr_action,
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

 
function DepreciationAssetDetailDepreciationAssetDetailDetails(uuid){
  console.log(uuid);
  $('#DepreciationAssetDetailDepreciationAssetDetailDetailmodalsId').modal('toggle');
  var obj=new DepreciationAssetDetailDepreciationAssetDetail();
  obj.tGetObjApi(uuid);
  obj.callAjax.then(function(data) {
      new  DepreciationAssetDetailDepreciationAssetDetail(data).tFillFormModal('Detail','DepreciationAssetDetailDepreciationAssetDetailDetailModalsFormId');

  })
  //obj.tFillFormModal('Detail');

}

function DepreciationAssetDetailDepreciationAssetDetailEdit(uuid){
  console.log('vao 1')
  $('#DepreciationAssetDetailDepreciationAssetDetailEditmodalsId').modal('toggle');
  var obj=new DepreciationAssetDetailDepreciationAssetDetail();
  obj.tGetObjApi(uuid);
  obj.callAjax.then(function(data) {
      new  DepreciationAssetDetailDepreciationAssetDetail(data).tFillFormModal('Edit','DepreciationAssetDetailDepreciationAssetDetailEditModalsFormId');

  })
  //obj.tFillFormModal('Edit');
}


function DepreciationAssetDetailDepreciationAssetDetailOnDeleteEvent(uuid){
  if (confirm(' CHẮC MUỐN XÓA? CHƯA CHẮC ĐÃ MUỐN XÓA ĐÂU -- Nhạc lên : Tèn  ten tén ten  ten ten ten tèn  Tèn ') == true) {
          var obj=new DepreciationAssetDetailDepreciationAssetDetail();
          obj.tDeleteApi(uuid);
  } else {
      alert('Đã Hủy')
  }
}

var DepreciationAssetDetailDepreciationAssetDetailpagination={
current_page:1,
total:0,
has_next:false,
has_prev:false
}

var DepreciationAssetDetailDepreciationAssetDetailrecord_in_page = 5;


$(document).ready(function(){
  $("#DepreciationAssetDetailDepreciationAssetDetailQuickSearchInputId").on('keyup', function(e) {
      if (e.key === 'Enter' || e.keyCode === 13) {
          DepreciationAssetDetailDepreciationAssetDetailpagination={
              current_page:1,
              total:0,
              has_next:false,
              has_prev:false
          }
          DepreciationAssetDetailDepreciationAssetDetailSearchData(DepreciationAssetDetailDepreciationAssetDetailpagination["current_page"],"quick");
      }
  })
  $("#DepreciationAssetDetailDepreciationAssetDetailQuickSearchBtnId").click(function(){
      DepreciationAssetDetailDepreciationAssetDetailpagination={
          current_page:1,
          total:0,
          has_next:false,
          has_prev:falseGDepreciationAssetDetailDepreciationAssetDetailSearchData(DepreciationAssetDetailDepreciationAssetDetailpagination["current_page"],"quick")
  }});
  $("#DepreciationAssetDetailDepreciationAssetDetailSearchBtnId").click(function(){
      DepreciationAssetDetailDepreciationAssetDetailpagination={
          current_page:1,
          total:0,
          has_next:false,
          has_prev:false
  }
      DepreciationAssetDetailDepreciationAssetDetailSearchData(DepreciationAssetDetailDepreciationAssetDetailpagination["current_page"],"filter");
  })
});

function DepreciationAssetDetailDepreciationAssetDetailSearchData(page=1,search_type,search_data=null){
  search_log["search_func"] = "DepreciationAssetDetailDepreciationAssetDetailSearchData";
  search_log["search_type"] = search_type;
  search_log["search_data"] = search_data;
      var obj = new DepreciationAssetDetailDepreciationAssetDetail();
      var results = obj.tSearchAllObjApi(page,search_data,search_type);
      obj.callAjax.then(function(data) {
      $("#DepreciationAssetDetailDepreciationAssetDetailTableBodyId").empty();
      var body = $("#DepreciationAssetDetailDepreciationAssetDetailDataTableId");
      //if (body.length > 0){
      //    var bodyTable = body.DataTable();
      //    bodyTable.clear();
      //}
      ACCOUNT_ID_TABLE_COUNT = 1;
      crr_record_in_page = DepreciationAssetDetailDepreciationAssetDetailrecord_in_page;
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
      var pagination = DepreciationAssetDetailDepreciationAssetDetailpagination;
      var pagenation_ele=$(".pagination-DepreciationAssetDetailDepreciationAssetDetail");
      pagenation_ele.html('');
      var page_total_ele = $(".page-total-DepreciationAssetDetailDepreciationAssetDetail");
      page_total_ele.html(`<footer class="blockquote-footer">Tổng số: ${pagination["total"]} bản ghi </footer>`);
      
      if (results.length > 0) {
              pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="DepreciationAssetDetailDepreciationAssetDetailSearchData(1,'`+search_type+`'`+ `,'`+search_data+`'`+ `)">Đầu</a></li>`);

              if (pagination["has_prev"] == true) {
                  pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="DepreciationAssetDetailDepreciationAssetDetailSearchData(` + (parseInt(pagination["current_page"]) - 1) +`,'`+search_type+`'`+ `,'`+search_data+`'`+ `)">` + (parseInt(pagination["current_page"]) - 1) + `</a></li>`);
              }
              pagenation_ele.append('<li class="page-item active"><a class="page-link" >' + (parseInt(pagination["current_page"])) + '</a></li>');
              if (pagination["has_next"] == true) {
                  pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="DepreciationAssetDetailDepreciationAssetDetailSearchData(` + (parseInt(pagination["current_page"]) + 1) +`,'`+search_type+`'`+ `,'`+search_data+`'`+ `)">` + (parseInt(pagination["current_page"]) + 1) + `</a></li>`);
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
              pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="DepreciationAssetDetailDepreciationAssetDetailSearchData(`+last_page_order+`,'`+search_type+`'`+ `,'`+search_data+`'`+ `)">Cuối</a></li>`);
              }
          }
          if (search_type == "quick") {
              var crr_txt = $("#DepreciationAssetDetailDepreciationAssetDetailQuickSearchInputId").val();
              highlight(crr_txt,"#DepreciationAssetDetailDepreciationAssetDetailTableBodyId");
          }
  })

}

function openbutton(){
  $('#openbestinworld').modal('toggle');
}