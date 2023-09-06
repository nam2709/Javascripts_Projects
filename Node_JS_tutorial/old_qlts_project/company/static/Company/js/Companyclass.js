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
  function CompanyCompanygenRandomSelect(optionId){
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
              
  var genCompanyCompany_FIELDS = [
    "name",
    "uuid",
    "tndid",
    "nick_name",
    "username",
    "full_name",
    "email",
    "groups",
    "user_permissions",
    "date_of_birth",
    "age",
    "telephone",
    "salt",
    "onetime_passwd",
    "avatar",
    "is_callbot",
    "callbot_endpoint",
    "is_chatbot",
    "chatbot_endpoint",
    "manager",
    "log_confirm_by_email",
    "logged_with_password",
    "created_free_license",
    "email_activated",
    "website_template",
    "language",
    "timezone",
    "app_permissions",
    "signup_at",
    "last_login_at",
    "extend_field",
    "password",
    "updated_at",
    "created_at",
];
function genCompanyCompany(form_type){
return {
"name": makeid(),
"uuid": uuidv4(),
"tndid": makeid(),
"nick_name": makeid(),
"username": makeid(),
"full_name": makeid(),
"email": makeid(),
"groups": makeid(),
"user_permissions": makeid(),
"date_of_birth": makeid(),
"age": genInteger(),
"telephone": makeid(),
"salt": makeid(),
"onetime_passwd": makeid(),
"avatar": null,
"is_callbot": genBoolean(),
"callbot_endpoint": makeid(),
"is_chatbot": genBoolean(),
"chatbot_endpoint": makeid(),
"manager": CompanyCompanygenRandomSelect('managerCompanyCompanyCompany'+form_type+'InputId'),
"log_confirm_by_email": genBoolean(),
"logged_with_password": genBoolean(),
"created_free_license": genBoolean(),
"email_activated": genBoolean(),
"website_template": CompanyCompanygenRandomSelect('website_templateWebsiteTemplateCompanyCompany'+form_type+'InputId'),
"language": makeid(),
"timezone": makeid(),
"app_permissions": makeid(),
"signup_at": randomDate(),
"last_login_at": randomDate(),
"extend_field": makeid(),
"password": makeid(),
"updated_at": randomDate(),
"created_at": randomDate(),
}
}
  
  var CompanyCompany_CACHE = [];
  
             var CompanyCompany_arr_action = [
          // default action
          
                      {
                      "title": "Xem chi tiết",
                      "func": "CompanyCompanyDetails",
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
                          "func": "CompanyCompanyEdit",
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
                          "func": "CompanyCompanyOnDeleteEvent",
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
      function CompanyCompanyCreate(){
        $('#CompanyCompanyCreatemodalsId').modal('toggle');
        // var obj=new AccountAccount();
        // obj.tGetObjApi(uuid);
        // obj.callAjax.then(function(data) {
        //     new AccountAccount(data).tFillFormModal('Detail','accountAccountDetailModalsFormId');
        // })
        //obj.tFillFormModal('Detail');
    }
                      function CompanyCompanyDetails(uuid){
                          $('#CompanyCompanyDetailmodalsId').modal('toggle');
                          var obj=new CompanyCompany();
                          obj.tGetObjApi(uuid);
                          obj.callAjax.then(function(data) {
                              new CompanyCompany(data).tFillFormModal('Detail','CompanyCompanyDetailModalsFormId');
  
                          })
                          //obj.tFillFormModal('Detail');
  
                      }
                      
                      function CompanyCompanyEdit(uuid){
                          $('#CompanyCompanyEditmodalsId').modal('toggle');
                          var obj=new CompanyCompany();
                          obj.tGetObjApi(uuid);
                          obj.callAjax.then(function(data) {
                              new CompanyCompany(data).tFillFormModal('Edit','CompanyCompanyEditModalsFormId');
  
                          })
                          //obj.tFillFormModal('Edit');
                      }
                      
                      function CompanyCompanyOnDeleteEvent(uuid){
                          var search_data = null;
                          try {
                              search_data = CompanyActionsSearchData;
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
                                                      var obj=new CompanyCompany();
                                                      obj.tDeleteApi(uuid);
                                                  }
                                              },
                                              
                                          }
                                  });
                              
                          }
                          else { 
                              CompanyCompanyOnDeleteWithDataSearchEvent(uuid);
                          }
  
                      }
                      function CompanyCompanyOnDeleteWithDataSearchEvent(uuid){
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
                                      var obj=new CompanyCompany();
                                      
                                      obj.tDeleteApiWithDataSearch(uuid,CompanyActionsSearchData);
                                  }
                              },
                              
                          }
                      });
                          
                      }
                      
                      function CompanyCompanyViewDetail(selectionId){
                        //   var select = $("#"+selectionId);
                          var select = "#CompanyCompanyDetailmodalsId";
                          if(select.length>0){
                          
                            
                              var value =  select.val()
                              if(value == "" || value == null || value == undefined){
                                  toastr.warning('Vui lòng chọn giá trị');
                                  return;
                              }
                              else {
                                  $('#CompanyCompanyDetailmodalsId').modal('toggle');
                                  var obj=new CompanyCompany();
                                  obj.tGetObjApi(value);
                                  obj.callAjax.then(function(data) {
                                      new CompanyCompany(data).tFillFormModal('Detail','CompanyCompanyDetailModalsFormId');
                                  })
                              }
                          }
                          
  
                      }
                      
      // custom func actions
              
              
  
                      //########## [Event] ChangeSwitcher ##############
                      
                      function is_callbotCompanyCompanyEventChangeSwitcher($this){
                              var status="";
                              var name = "is_callbot";
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
                                          obj = new CompanyCompany();
                                          console.log('Update obj = ', obj);
                                          obj.tUpdateOnlyFieldApi($($this).attr("data-uuid"),$($this).attr("name"),$($this).is(":checked"))  ;
                                      }
                                  },
                                  
                              }
                          })
  
                      }
                      
                      //########## [Event] ChangeSwitcher ##############
                      
                      function is_chatbotCompanyCompanyEventChangeSwitcher($this){
                              var status="";
                              var name = "is_chatbot";
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
                                          obj = new CompanyCompany();
                                          console.log('Update obj = ', obj);
                                          obj.tUpdateOnlyFieldApi($($this).attr("data-uuid"),$($this).attr("name"),$($this).is(":checked"))  ;
                                      }
                                  },
                                  
                              }
                          })
  
                      }
                      
                      //########## [Event] ChangeSwitcher ##############
                      
                      function log_confirm_by_emailCompanyCompanyEventChangeSwitcher($this){
                              var status="";
                              var name = "log_confirm_by_email";
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
                                          obj = new CompanyCompany();
                                          console.log('Update obj = ', obj);
                                          obj.tUpdateOnlyFieldApi($($this).attr("data-uuid"),$($this).attr("name"),$($this).is(":checked"))  ;
                                      }
                                  },
                                  
                              }
                          })
  
                      }
                      
                      //########## [Event] ChangeSwitcher ##############
                      
                      function logged_with_passwordCompanyCompanyEventChangeSwitcher($this){
                              var status="";
                              var name = "logged_with_password";
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
                                          obj = new CompanyCompany();
                                          console.log('Update obj = ', obj);
                                          obj.tUpdateOnlyFieldApi($($this).attr("data-uuid"),$($this).attr("name"),$($this).is(":checked"))  ;
                                      }
                                  },
                                  
                              }
                          })
  
                      }
                      
                      //########## [Event] ChangeSwitcher ##############
                      
                      function created_free_licenseCompanyCompanyEventChangeSwitcher($this){
                              var status="";
                              var name = "created_free_license";
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
                                          obj = new CompanyCompany();
                                          console.log('Update obj = ', obj);
                                          obj.tUpdateOnlyFieldApi($($this).attr("data-uuid"),$($this).attr("name"),$($this).is(":checked"))  ;
                                      }
                                  },
                                  
                              }
                          })
  
                      }
                      
                      //########## [Event] ChangeSwitcher ##############
                      
                      function email_activatedCompanyCompanyEventChangeSwitcher($this){
                              var status="";
                              var name = "email_activated";
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
                                          obj = new CompanyCompany();
                                          console.log('Update obj = ', obj);
                                          obj.tUpdateOnlyFieldApi($($this).attr("data-uuid"),$($this).attr("name"),$($this).is(":checked"))  ;
                                      }
                                  },
                                  
                              }
                          })
  
                      }
                      
  
                      //########## [Event] DeletedAttacthment ##############
                      
                      function avatarCompanyCompanyDeletedAttacthment($this){
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
                                          obj = new CompanyCompany();
                                          console.log('Update obj = ', obj);
                                          obj.tDeleteFileApi($($this).attr("file-uuid"),"avatar");
                                      }
                                  },
                                  
                              }
                          })
                              
                      }
                      
                      //########## [Event] InlineDeletedAttacthment ##############
                      
                      function avatarCompanyCompanyInlineDeletedAttacthment($this){
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
                                          obj = new CompanyCompany();
                                          console.log('Update obj = ', obj);
                                          obj.tDeleteFileApi($($this).attr("file-uuid"),"avatar");
                                          $($this).closest("td").find("[name=file]").show();
                                      }
                                  },
                                  
                              }
                          })
                              
                      }
                      
  class CompanyCompany{
      // ########## Init Objects ##############
      constructor(data=null){
          if (data != null){
            if (data.hasOwnProperty('uuid')){
                this.uuid = data.uuid;
              //   this.editUrl = '/Company/Company/edit/' + this.uuid + '/';
              //   this.detailUrl = '/Company/Company/detail/' + this.uuid + '/';
            }
            else{
                // this.uuid = null;
            }
            if (data.hasOwnProperty('companystatus')){
                this.companystatus = data.companystatus;
                this.get_name_companystatus = data.get_name_companystatus;
            }
               else{
                // this.salt = null;
            }
            //   if (data.hasOwnProperty('get_name_companystatus')){
            //     this.get_name_companystatus = data.get_name_companystatus;
            // }
            //    else{
            //     // this.salt = null;
            // }
            //   if (data.hasOwnProperty('id')){
            //       this.id = data.id;
            //   }
            //   else{
            //       this.id = null;
            //   }
      
              this.__app_name__ = "company";
      
              this.__model_name__ = "Company";
      
              if (data.hasOwnProperty('name')){
                  this.name = data.name;
              }
              else{
                  // this.name = null;
              }
             
  
             
  
            //   if (data.hasOwnProperty('tndid')){
            //       this.tndid = data.tndid;
            //   }
            //   else{
            //       // this.tndid = null;
            //   }
  
              if (data.hasOwnProperty('code_company')){
                  this.code_company = data.code_company;
              }
              else{
                  // this.nick_name = null;
              }
  
              if (data.hasOwnProperty('province')){
                  this.province= data.province;
                  this.get_name_city = data.get_name_city;
              }
              else{
                  // this.username = null;
              }
  
              if (data.hasOwnProperty('districts')){
                  this.districts = data.districts;
                  this.get_name_district = data.get_name_district;
              }
              else{
                  // this.full_name = null;
              }
           
  
              if (data.hasOwnProperty('ward')){
                  this.ward = data.ward;
                  this.get_name_commune = data.get_name_commune;
              }
              else{
                  // this.email = null;
              }
  
              if (data.hasOwnProperty('address')){
                  this.address = data.address;
              }
              else{
                  // this.groups = null;
              }
              
  
              if (data.hasOwnProperty('tax_code')){
                  this.tax_code = data.tax_code;
              }
              else{
                  // this.user_permissions = null;
              }
  
              if (data.hasOwnProperty('phone_number')){
                  this.phone_number = data.phone_number;
              }
              else{
                  // this.date_of_birth = null;
              }
  
    
             
  
  
          }
      }
      tGetFormData(formId=null){
          var formEle = $("#" + formId);
          if (formEle.length > 0){
              var chEle = formEle.find("#nameCompanyCompanyInputId");
              if (chEle.length > 0){
                  this.name = chEle.val();
              }
              else{
                  // this.name = null;
              }
              var chEle = formEle.find("#uuidCompanyCompanyInputId");
              if (chEle.length > 0){
                  this.uuid = chEle.val();
              }
              else{
                  // this.uuid = null;
              }
              var chEle = formEle.find("#tndidCompanyCompanyInputId");
              if (chEle.length > 0){
                  this.tndid = chEle.val();
              }
              else{
                  // this.tndid = null;
              }
              var chEle = formEle.find("#nick_nameCompanyCompanyInputId");
              if (chEle.length > 0){
                  this.nick_name = chEle.val();
              }
              else{
                  // this.nick_name = null;
              }
              var chEle = formEle.find("#usernameCompanyCompanyInputId");
              if (chEle.length > 0){
                  this.username = chEle.val();
              }
              else{
                  // this.username = null;
              }
              var chEle = formEle.find("#full_nameCompanyCompanyInputId");
              if (chEle.length > 0){
                  this.full_name = chEle.val();
              }
              else{
                  // this.full_name = null;
              }
              var chEle = formEle.find("#emailCompanyCompanyInputId");
              if (chEle.length > 0){
                  this.email = chEle.val();
              }
              else{
                  // this.email = null;
              }
              var chEle = formEle.find("#groupsCompanyCompanyInputId");
              if (chEle.length > 0){
                  this.groups = chEle.val();
              }
              else{
                  // this.groups = null;
              }
              var chEle = formEle.find("#user_permissionsCompanyCompanyInputId");
              if (chEle.length > 0){
                  this.user_permissions = chEle.val();
              }
              else{
                  // this.user_permissions = null;
              }
              var chEle = formEle.find("#date_of_birthCompanyCompanyInputId");
              if (chEle.length > 0){
                  this.date_of_birth = chEle.val();
              }
              else{
                  // this.date_of_birth = null;
              }
              var chEle = formEle.find("#ageCompanyCompanyInputId");
              if (chEle.length > 0){
                  this.age = chEle.val();
              }
              else{
                  // this.age = null;
              }
              var chEle = formEle.find("#telephoneCompanyCompanyInputId");
              if (chEle.length > 0){
                  this.telephone = chEle.val();
              }
              else{
                  // this.telephone = null;
              }
              var chEle = formEle.find("#saltCompanyCompanyInputId");
              if (chEle.length > 0){
                  this.salt = chEle.val();
              }
              else{
                  // this.salt = null;
              }
              var chEle = formEle.find("#onetime_passwdCompanyCompanyInputId");
              if (chEle.length > 0){
                  this.onetime_passwd = chEle.val();
              }
              else{
                  // this.onetime_passwd = null;
              }
              var chEle = formEle.find("#avatarCompanyCompanyInputId");
              if (chEle.length > 0){
                  this.avatar = chEle.val();
              }
              else{
                  // this.avatar = null;
              }
              var chEle = formEle.find("#is_callbotCompanyCompanyInputId");
              if (chEle.length > 0){
                  this.is_callbot = chEle.val();
              }
              else{
                  // this.is_callbot = null;
              }
              var chEle = formEle.find("#callbot_endpointCompanyCompanyInputId");
              if (chEle.length > 0){
                  this.callbot_endpoint = chEle.val();
              }
              else{
                  // this.callbot_endpoint = null;
              }
              var chEle = formEle.find("#is_chatbotCompanyCompanyInputId");
              if (chEle.length > 0){
                  this.is_chatbot = chEle.val();
              }
              else{
                  // this.is_chatbot = null;
              }
              var chEle = formEle.find("#chatbot_endpointCompanyCompanyInputId");
              if (chEle.length > 0){
                  this.chatbot_endpoint = chEle.val();
              }
              else{
                  // this.chatbot_endpoint = null;
              }
              var chEle = formEle.find("#managerCompanyCompanyInputId");
              if (chEle.length > 0){
                  this.manager = chEle.val();
              }
              else{
                  // this.manager = null;
              }
              var chEle = formEle.find("#log_confirm_by_emailCompanyCompanyInputId");
              if (chEle.length > 0){
                  this.log_confirm_by_email = chEle.val();
              }
              else{
                  // this.log_confirm_by_email = null;
              }
              var chEle = formEle.find("#logged_with_passwordCompanyCompanyInputId");
              if (chEle.length > 0){
                  this.logged_with_password = chEle.val();
              }
              else{
                  // this.logged_with_password = null;
              }
              var chEle = formEle.find("#created_free_licenseCompanyCompanyInputId");
              if (chEle.length > 0){
                  this.created_free_license = chEle.val();
              }
              else{
                  // this.created_free_license = null;
              }
              var chEle = formEle.find("#email_activatedCompanyCompanyInputId");
              if (chEle.length > 0){
                  this.email_activated = chEle.val();
              }
              else{
                  // this.email_activated = null;
              }
              var chEle = formEle.find("#website_templateCompanyCompanyInputId");
              if (chEle.length > 0){
                  this.website_template = chEle.val();
              }
              else{
                  // this.website_template = null;
              }
              var chEle = formEle.find("#languageCompanyCompanyInputId");
              if (chEle.length > 0){
                  this.language = chEle.val();
              }
              else{
                  // this.language = null;
              }
              var chEle = formEle.find("#timezoneCompanyCompanyInputId");
              if (chEle.length > 0){
                  this.timezone = chEle.val();
              }
              else{
                  // this.timezone = null;
              }
              var chEle = formEle.find("#app_permissionsCompanyCompanyInputId");
              if (chEle.length > 0){
                  this.app_permissions = chEle.val();
              }
              else{
                  // this.app_permissions = null;
              }
              var chEle = formEle.find("#signup_atCompanyCompanyInputId");
              if (chEle.length > 0){
                  this.signup_at = chEle.val();
              }
              else{
                  // this.signup_at = null;
              }
              var chEle = formEle.find("#last_login_atCompanyCompanyInputId");
              if (chEle.length > 0){
                  this.last_login_at = chEle.val();
              }
              else{
                  // this.last_login_at = null;
              }
              var chEle = formEle.find("#extend_fieldCompanyCompanyInputId");
              if (chEle.length > 0){
                  this.extend_field = chEle.val();
              }
              else{
                  // this.extend_field = null;
              }
              var chEle = formEle.find("#passwordCompanyCompanyInputId");
              if (chEle.length > 0){
                  this.password = chEle.val();
              }
              else{
                  // this.password = null;
              }
              var chEle = formEle.find("#updated_atCompanyCompanyInputId");
              if (chEle.length > 0){
                  this.updated_at = chEle.val();
              }
              else{
                  // this.updated_at = null;
              }
              var chEle = formEle.find("#created_atCompanyCompanyInputId");
              if (chEle.length > 0){
                  this.created_at = chEle.val();
              }
              else{
                  // this.created_at = null;
              }
          }
          else{
              var chEle = $("#idCompanyCompanyInputId");
              if (chEle.length > 0){
                  this.id = chEle.val();
              }
              else{
                  // this.id = null;
              }
                                  var chEle = $("#nameCompanyCompanyInputId");
                                  if (chEle.length > 0){
                                      this.name = chEle.val();
                                  }
                                  else{
                                      // this.name = null;
                                  }
                      
                                  var chEle = $("#uuidCompanyCompanyInputId");
                                  if (chEle.length > 0){
                                      this.uuid = chEle.val();
                                  }
                                  else{
                                      // this.uuid = null;
                                  }
                      
                                 
                      
                                  var chEle = $("#companystatusCompanyCompanyInputId");
                                  if (chEle.length > 0){
                                      this.companystatus = chEle.val();
                                  }
                                  else{
                                      // this.username = null;
                                  }
                      
                                  var chEle = $("#code_companyCompanyCompanyInputId");
                                  if (chEle.length > 0){
                                      this.code_company = chEle.val();
                                  }
                                  else{
                                      // this.full_name = null;
                                  }
                      
                                  var chEle = $("#cityCompanyCompanyInputId");
                                  if (chEle.length > 0){
                                      this.city = chEle.val();
                                  }
                                  else{
                                      // this.email = null;
                                  }
                      
                                  var chEle = $("#districtCompanyCompanyInputId");
                                  if (chEle.length > 0){
                                      this.groups = chEle.val();
                                  }
                                  else{
                                      // this.groups = null;
                                  }
                      
                                  var chEle = $("#communeCompanyCompanyInputId");
                                  if (chEle.length > 0){
                                      this.commune = chEle.val();
                                  }
                                  else{
                                      // this.user_permissions = null;
                                  }
                      
                      
                                  var chEle = $("#addressCompanyCompanyInputId");
                                  if (chEle.length > 0){
                                      this.address = chEle.val();
                                  }
                                  else{
                                      // this.age = null;
                                  }
                      
                                  var chEle = $("#phone_numberCompanyCompanyInputId");
                                  if (chEle.length > 0){
                                      this.phone_number = chEle.val();
                                  }
                                  else{
                                      // this.telephone = null;
                                  }
                      
                      
          }
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
            var j_ele_uuid = $("#uuidCompanyCompany"+apart+"InputId");
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
                  var j_ele_name = $("#nameCompanyCompany"+apart+"InputId");
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
                var j_ele_companystatus = $("#companystatusCompanyCompany"+apart+"InputId");
                if (j_ele_companystatus.length > 0){
                    if (j_ele_companystatus.attr('name') != 'uuid'){
                        j_ele_companystatus.val(self.companystatus).change();
                    }
                }
                else{
                    // j_ele_companystatus.val(null);
                }
            }
            catch(err) {
                console.log('err = ', err);
            }
            try{
                var j_ele_companystatus = $("#get_name_companystatusCompanyCompany"+apart+"InputId");
                if (j_ele_companystatus.length > 0){
                    if (j_ele_companystatus.attr('name') != 'uuid'){
                        j_ele_companystatus.val(self.get_name_companystatus).change();
                    }
                }
                else{
                    // j_ele_companystatus.val(null);
                }
            }
            catch(err) {
                console.log('err = ', err);
            }



              try{
                var j_ele_name = $("#code_companyCompanyCompany"+apart+"InputId");
                if (j_ele_name.length > 0){
                    if (j_ele_name.attr('name') != 'uuid'){
                        j_ele_name.val(self.code_company).change();
                    }
                }
                else{
                    // j_ele_name.val(null);
                }
            }
            catch(err) {
                console.log('err = ', err);
            }
            
  
            //   try{
            //       var j_ele_id = $("#code_companyCompanyCompany"+apart+"InputId");
            //       if (j_ele_id.length > 0 && self.id !=null){
            //           if (j_ele_id.attr('name') != 'uuid'){
            //               j_ele_id.val(self.code_company).change();
            //           }
            //       }
            //       else{
            //           // j_ele_id.val(null);
            //       }
            //   }
            //   catch(err) {
            //       console.log('err = ', err);
            //   }
           
          
  
              try{
                  var j_ele_uuid = $("#get_name_cityCompanyCompany"+apart+"InputId");
                  if (j_ele_uuid.length > 0 && self.uuid !=null){
                      if (j_ele_uuid.attr('name') != 'uuid'){
                          j_ele_uuid.val(self.get_name_city).change();
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
                  var j_ele_tndid = $("#get_name_districtCompanyCompany"+apart+"InputId");
                  if (j_ele_tndid.length > 0){
                      if (j_ele_tndid.attr('name') != 'uuid'){
                          j_ele_tndid.val(self.get_name_district).change();
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
                  var j_ele_nick_name = $("#get_name_communeCompanyCompany"+apart+"InputId");
                  if (j_ele_nick_name.length > 0){
                      if (j_ele_nick_name.attr('name') != 'uuid'){
                          j_ele_nick_name.val(self.get_name_commune).change();
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
                  var j_ele_username = $("#addressCompanyCompany"+apart+"InputId");
                  if (j_ele_username.length > 0){
                      if (j_ele_username.attr('name') != 'uuid'){
                          j_ele_username.val(self.address).change();
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
                  var j_ele_full_name = $("#tax_codeCompanyCompany"+apart+"InputId");
                  if (j_ele_full_name.length > 0){
                      if (j_ele_full_name.attr('name') != 'uuid'){
                          j_ele_full_name.val(self.tax_code).change();
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
                  var j_ele_email = $("#phone_numberCompanyCompany"+apart+"InputId");
                  if (j_ele_email.length > 0){
                      if (j_ele_email.attr('name') != 'uuid'){
                          j_ele_email.val(self.phone_number).change();
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
                var j_ele_uuid = $("#cityCompanyCompany"+apart+"InputId");
                if (j_ele_uuid.length > 0 && self.uuid !=null){
                    if (j_ele_uuid.attr('name') != 'uuid'){
                        j_ele_uuid.val(self.province).change();
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
                var j_ele_tndid = $("#districtCompanyCompany"+apart+"InputId");
                if (j_ele_tndid.length > 0){
                    if (j_ele_tndid.attr('name') != 'uuid'){
                        j_ele_tndid.val(self.districts).change();
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
                var j_ele_nick_name = $("#communeCompanyCompany"+apart+"InputId");
                if (j_ele_nick_name.length > 0){
                    if (j_ele_nick_name.attr('name') != 'uuid'){
                        j_ele_nick_name.val(self.ward).change();
                    }
                }
                else{
                    // j_ele_nick_name.val(null);
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
                  var j_ele_name = $("#nameCompanyCompany"+apart+"InputId");
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
                  var j_ele_uuid = $("#uuidCompanyCompany"+apart+"InputId");
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
                  var j_ele_tndid = $("#tndidCompanyCompany"+apart+"InputId");
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
                  var j_ele_nick_name = $("#nick_nameCompanyCompany"+apart+"InputId");
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
                  var j_ele_username = $("#usernameCompanyCompany"+apart+"InputId");
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
                  var j_ele_full_name = $("#full_nameCompanyCompany"+apart+"InputId");
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
                  var j_ele_email = $("#emailCompanyCompany"+apart+"InputId");
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
                  var j_ele_groups = $("#groupsGroupCompanyCompany"+apart+"InputId");
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
                  var j_ele_user_permissions = $("#user_permissionsPermissionCompanyCompany"+apart+"InputId");
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
                  var j_ele_date_of_birth = $("#date_of_birthCompanyCompany"+apart+"InputId");
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
                  var j_ele_age = $("#ageCompanyCompany"+apart+"InputId");
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
                  var j_ele_telephone = $("#telephoneCompanyCompany"+apart+"InputId");
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
                  var j_ele_salt = $("#saltCompanyCompany"+apart+"InputId");
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
                  var j_ele_onetime_passwd = $("#onetime_passwdCompanyCompany"+apart+"InputId");
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
                              var j_ele_avatar = $("#avatarCompanyCompany"+apart+"FileAreaId");
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
                                              <i class="fas fa-times" style="color:gray" file-uuid="` + self.uuid + `" id="` + self.uuid + `btnDeleteId" onclick="avatarCompanyCompanyDeletedAttacthment(this)"></i>
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
                              var j_ele_is_callbot = $("#is_callbotCompanyCompany"+apart+"InputId");
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
                  var j_ele_callbot_endpoint = $("#callbot_endpointCompanyCompany"+apart+"InputId");
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
                              var j_ele_is_chatbot = $("#is_chatbotCompanyCompany"+apart+"InputId");
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
                  var j_ele_chatbot_endpoint = $("#chatbot_endpointCompanyCompany"+apart+"InputId");
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
                      var j_ele_manager = $("#managerCompanyCompanyCompany"+apart+"InputId");
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
                              var j_ele_log_confirm_by_email = $("#log_confirm_by_emailCompanyCompany"+apart+"InputId");
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
                              var j_ele_logged_with_password = $("#logged_with_passwordCompanyCompany"+apart+"InputId");
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
                              var j_ele_created_free_license = $("#created_free_licenseCompanyCompany"+apart+"InputId");
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
                              var j_ele_email_activated = $("#email_activatedCompanyCompany"+apart+"InputId");
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
                      var j_ele_website_template = $("#website_templateWebsiteTemplateCompanyCompany"+apart+"InputId");
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
                  var j_ele_language = $("#languageCompanyCompany"+apart+"InputId");
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
                  var j_ele_timezone = $("#timezoneCompanyCompany"+apart+"InputId");
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
                  var j_ele_app_permissions = $("#app_permissionsAppPermissionCompanyCompany"+apart+"InputId");
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
                  var j_ele_signup_at = $("#signup_atCompanyCompany"+apart+"InputId");
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
                  var j_ele_last_login_at = $("#last_login_atCompanyCompany"+apart+"InputId");
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
                  var j_ele_extend_field = $("#extend_fieldExtendInfoCompanyCompany"+apart+"InputId");
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
                  var j_ele_password = $("#passwordCompanyCompany"+apart+"InputId");
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
                  var j_ele_updated_at = $("#updated_atCompanyCompany"+apart+"InputId");
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
                  var j_ele_created_at = $("#created_atCompanyCompany"+apart+"InputId");
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
              url: CompanyList_URL,
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
                      self = new CompanyCompany(data);
                      CompanyCompanyGetDataTable(CompanyCompanypagination["current_page"]);
                      if(is_continue_form){
                          is_continue_form=false;
                          toastr.success('Thêm mới thành công');
                        //   $(location).prop('href', "/Company/Company/create/");
                          
  
                      }else if(is_continue_modal){
                          is_continue_modal=false;
                          CompanyRefreshCreateModal();
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
                      //                $(location).prop('href', "/Company/Company/create/");
                      //            }
                      //        },
                      //        Show:{
                      //            text: 'Chi tiết',
                      //            action: function(){
                      //                $(location).prop('href', "/Company/Company/detail/" + self.uuid + "/");
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
         formData = new FormData($('#CompanyCompanyCreateFormId')[0]);

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
                        console.log(formData)
                       
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
           
            this.id=formData.get('uuid');
        }
        
        var file_eles = $(".Company-Company");
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
                url: CompanyList_URL + self.id + "/",
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
                    self = new CompanyCompany(data);
                        
                        CompanyCompanyGetDataTable(CompanyCompanypagination["current_page"]);
                        // self = new CompanyCompany(data);
                        
                        // CompanyCompanyGetDataTable(CompanyCompanytpagination["current_page"])
                        //$(location).prop('href', "/Account/Account/detail/" + self.uuid + "/");
                        if(is_continue_form){
                            is_continue_form=false;
                            if(!is_notification && (is_done||!is_has_children)){
                                is_notification = true;
                                toastr.success('Cập nhật thành công');
                            }
                            $(location).prop('href', "/company/company/create/");
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
                    $(location).prop('href', "/company/company/create/");
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
    tCreateNewPostFormApi(formId=null){
        $.ajaxSetup({
            headers : {
                'CSRFToken' : getCSRFTokenValue(),
                'X-CSRFToken' : getCSRFTokenValue(), // for --> SessionAuthentication
            },
            tryCount : 0,
            retryLimit : 3,
        });
        $('#idCompanyCompanyInputId').val(null);
        $('#uuidCompanyCompanyInputId').val(uuidv4());
        var self = this;
        var formData;
        var form ;
        var arr_table = [];
        if(formId==null){
         formData = new FormData($('#CompanyCompanyCreateFormId')[0]);

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
        
        var file_eles = $(".Company-Company");
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
            LoadCompanyCompanyList();
        }
        if(!is_save_self_table){
                $.ajax({
                url: CompanyList_URL,
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
                        self = new CompanyCompany(data);
                        LoadCompanyCompanyList();
                        CompanyCompanyGetDataTable(CompanyCompanypagination["current_page"]);
                        if(is_continue_form){
                            is_continue_form=false;
                            if(!is_notification){
                                is_notification = true;
                                toastr.success('Thêm mới thành công');
                            }
                            

                            $(location).prop('href', "/company/company/create/");
                        }else if(is_continue_modal){
                            is_continue_modal=false;
                            CompanyRefreshCreateModal();
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

                        self.tFillForm();
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
                $(location).prop('href', "/company/company/create/");
            }else if(is_continue_modal){
                is_continue_modal=false;
                CompanyRefreshCreateModal();
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
              url: CompanyList_URL,
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
              url:CompanyList_URL,
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
                          url: CompanyList_URL + uuid + "/",
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
              url: CompanyList_URL + uuid_go + "/",
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
                  CompanyCompanyGetDataTable(CompanyCompanypagination["current_page"]);
                  if(cr_uuid!=""){
                      $(location).prop('href', "/company/company/create/");
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
              url: CompanyList_URL + uuid_go + "/",
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
                  CompanyCompanySearchData(CompanyCompanypagination["current_page"],"filter",data_search);
                  if(cr_uuid!=""){
                      $(location).prop('href', "/company/company/create/");
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
              url: CompanyList_URL+uuid+"/",
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
              url: CompanyList_URL+uuid+"/",
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
              url:CompanyList_URL+has_go_page,
              type: "GET",
              //async: false,
              cache: false,
              timeout: 30000,
  
              success: function (data) {
                  console.log('[tGetAllObjApi] data = ', data);
                  
                  // return new CompanyCompany(data);
                  if (data.hasOwnProperty('count')){
                      CompanyCompanypagination["total"]=data.count;
                  }
                  if (data.hasOwnProperty('count')){
                      CompanyCompanypagination["total"]=data.count;
                  }
                  if (data.hasOwnProperty('next')){
                      if(data.next != null){
                      CompanyCompanypagination["has_next"]=true;
                      }else{
                      CompanyCompanypagination["has_next"]=false;
  
                      }
                  }
                  CompanyCompanypagination["current_page"]=page;
                  if (data.hasOwnProperty('previous')){
                      if(data.previous != null){
                      CompanyCompanypagination["has_prev"]=true;
                      }else{
                      CompanyCompanypagination["has_prev"]=false;
                      }
                  }
                  if (data.hasOwnProperty('results')){
                      for (var j=0; j < data.results.length; j++){
                          var tmp = new CompanyCompany(data.results[j]);
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
              url: CompanyList_URL+has_go_page,
              type: "GET",
              //async: false,
              cache: false,
              timeout: 30000,
  
              success: function (data) {
                  console.log('[tGetAllObjLargeApi] data = ', data);
                  // return new CompanyCompany(data);
                  if (data.hasOwnProperty('count')){
                      CompanyCompanypagination["total"]=data.count;
                  }
                  if (data.hasOwnProperty('count')){
                      CompanyCompanypagination["total"]=data.count;
                  }
                  if (data.hasOwnProperty('next')){
                      if(data.next != null){
                      CompanyCompanypagination["has_next"]=true;
                      }else{
                      CompanyCompanypagination["has_next"]=false;
  
                      }
                  }
                  CompanyCompanypagination["current_page"]=page;
                  if (data.hasOwnProperty('previous')){
                      if(data.previous != null){
                      CompanyCompanypagination["has_prev"]=true;
                      }else{
                      CompanyCompanypagination["has_prev"]=false;
                      }
                  }
                  if (data.hasOwnProperty('results')){
                      for (var j=0; j < data.results.length; j++){
                          var tmp = new CompanyCompany(data.results[j]);
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
              SEARCH_URL=CompanyCompany_FILTER_URL ;
              
                  slugSearch="&";
              
                                  if($("#nameCompanyCompanyFilterSearchInputId").length>0
                                      ||$("#companystatusCompanyCompanyFilterSearchInputId").length>0)
                       
                                    {
                                      var value_name=$("#nameCompanyCompanyFilterSearchInputId").val();
                                      var value_companystatus=$("#companystatusCompanyCompanyFilterSearchInputId").val();
                                      if((value_name!="")
                                        ||(value_companystatus!="")
                                      )
                                        {
                                          slugSearch+="name__contains="+value_name+"&companystatus="+value_companystatus;
                                      }
                                  }
                                  
                              slugSearch=slugSearch.slice(0);
          }else{
              SEARCH_URL=CompanyCompany_SEARCH_URL;
              
                  slugSearch="&";
                  slugSearch+="search="+$("#CompanyCompanyQuickSearchInputId").val();
              
          }
          if(search_data!=null){
              SEARCH_URL=CompanyList_URL;
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
                  // return new CompanyCompany(data);
                  if (data.hasOwnProperty('count')){
                      CompanyCompanypagination["total"]=data.count;
                  }
                  if (data.hasOwnProperty('count')){
                      CompanyCompanypagination["total"]=data.count;
                  }
                  if (data.hasOwnProperty('next')){
                      if(data.next != null){
                      CompanyCompanypagination["has_next"]=true;
                      }else{
                      CompanyCompanypagination["has_next"]=false;
  
                      }
                  }
                  CompanyCompanypagination["current_page"]=page;
                  if (data.hasOwnProperty('previous')){
                      if(data.previous != null){
                      CompanyCompanypagination["has_prev"]=true;
                      }else{
                      CompanyCompanypagination["has_prev"]=false;
                      }
                  }
                  if (data.hasOwnProperty('results')){
                      for (var j=0; j < data.results.length; j++){
                          var tmp = new CompanyCompany(data.results[j]);
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
              SEARCH_URL=CompanyList_URL;
              
                  slugSearch="&";
              
                                  if($("#nameCompanyCompanyFilterSearchInputId").length>0
                                    ||$("#companystatusCompanyCompanyFilterSearchInputId").length>0){
                                      var value=$("#nameCompanyCompanyFilterSearchInputId").val();
                                      var value=$("#companystatusCompanyCompanyFilterSearchInputId").val();
                                      if(value!=""){
                                          slugSearch+="name__icontains="+value_name+"&companystatus__icontains"+value_companystatus;
                                      }
                                  }
                                  
                              slugSearch=slugSearch.slice(0);
          }else{
              SEARCH_URL= CompanyCompany_SEARCH_URL;
              
                  slugSearch="&";
                  slugSearch+="search="+$("#CompanyCompanyQuickSearchInputId").val();
              
          }
          if(search_data!=null){
              SEARCH_URL=CompanyCompany_LARGE_FILTER_URL;
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
                  // return new CompanyCompany(data);
                  if (data.hasOwnProperty('count')){
                      CompanyCompanypagination["total"]=data.count;
                  }
                  if (data.hasOwnProperty('count')){
                      CompanyCompanypagination["total"]=data.count;
                  }
                  if (data.hasOwnProperty('next')){
                      if(data.next != null){
                      CompanyCompanypagination["has_next"]=true;
                      }else{
                      CompanyCompanypagination["has_next"]=false;
  
                      }
                  }
                  CompanyCompanypagination["current_page"]=page;
                  if (data.hasOwnProperty('previous')){
                      if(data.previous != null){
                      CompanyCompanypagination["has_prev"]=true;
                      }else{
                      CompanyCompanypagination["has_prev"]=false;
                      }
                  }
                  if (data.hasOwnProperty('results')){
                      for (var j=0; j < data.results.length; j++){
                          var tmp = new CompanyCompany(data.results[j]);
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
              url: CompanyList_URL+uuid+"/",
              type: "GET",
              async: false,
              cache: false,
              timeout: 30000,
  
              success: function (data) {
                  console.log('[tGetObjApi] data = ', data);
                  var n_obj = new CompanyCompany(data);
                  console.log('n_obj = ', n_obj);
                  n_obj.tFillForm();
                  return n_obj;
                  // if (data.hasOwnProperty('results')){
                  //    if (data.results.length > 0){
                  //        var tmp = new CompanyCompany(data[i]);
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
          var tbId = "CompanyCompanyDataTableId";
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
          var tbId = "CompanyCompanyDataTableId";
          var table = $("#" + tbId);
          if (table.length > 0){
              var tableData = table.DataTable();
              var rowData = [
                  `<a href="` + this.detailUrl + `">` + Company_ID_TABLE_COUNT + `</a>`,
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
       
          var tbId = "CompanyCompanyDataTableId";
          if(tableId!=null){
              tbId = tableId;
          }
  
          if(order==null){
          order=Company_ID_TABLE_COUNT;
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
                                              <i class="fas fa-times" style="color:gray" file-uuid="` + this["uuid"] + `" id="` + this["uuid"] + `btnDeleteId" onclick="avatarCompanyCompanyDeletedAttacthment(this)"></i>
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
                                          <input class="custom-control-input" id="${this["uuid"]}is_callbotCompanyCompanySwitchListTablebtnId" name="`+ attr +`" data-uuid="` + this["uuid"] + `" type="checkbox"  `+value+` onclick="is_callbotCompanyCompanyEventChangeSwitcher(this)">
                                      <label class="custom-control-label" for="${this["uuid"]}is_callbotCompanyCompanySwitchListTablebtnId"></label>
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
                                          <input class="custom-control-input" id="${this["uuid"]}is_chatbotCompanyCompanySwitchListTablebtnId" name="`+ attr +`" data-uuid="` + this["uuid"] + `" type="checkbox"  `+value+` onclick="is_chatbotCompanyCompanyEventChangeSwitcher(this)">
                                      <label class="custom-control-label" for="${this["uuid"]}is_chatbotCompanyCompanySwitchListTablebtnId"></label>
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
                                          <input class="custom-control-input" id="${this["uuid"]}log_confirm_by_emailCompanyCompanySwitchListTablebtnId" name="`+ attr +`" data-uuid="` + this["uuid"] + `" type="checkbox"  `+value+` onclick="log_confirm_by_emailCompanyCompanyEventChangeSwitcher(this)">
                                      <label class="custom-control-label" for="${this["uuid"]}log_confirm_by_emailCompanyCompanySwitchListTablebtnId"></label>
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
                                          <input class="custom-control-input" id="${this["uuid"]}logged_with_passwordCompanyCompanySwitchListTablebtnId" name="`+ attr +`" data-uuid="` + this["uuid"] + `" type="checkbox"  `+value+` onclick="logged_with_passwordCompanyCompanyEventChangeSwitcher(this)">
                                      <label class="custom-control-label" for="${this["uuid"]}logged_with_passwordCompanyCompanySwitchListTablebtnId"></label>
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
                                          <input class="custom-control-input" id="${this["uuid"]}created_free_licenseCompanyCompanySwitchListTablebtnId" name="`+ attr +`" data-uuid="` + this["uuid"] + `" type="checkbox"  `+value+` onclick="created_free_licenseCompanyCompanyEventChangeSwitcher(this)">
                                      <label class="custom-control-label" for="${this["uuid"]}created_free_licenseCompanyCompanySwitchListTablebtnId"></label>
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
                                          <input class="custom-control-input" id="${this["uuid"]}email_activatedCompanyCompanySwitchListTablebtnId" name="`+ attr +`" data-uuid="` + this["uuid"] + `" type="checkbox"  `+value+` onclick="email_activatedCompanyCompanyEventChangeSwitcher(this)">
                                      <label class="custom-control-label" for="${this["uuid"]}email_activatedCompanyCompanySwitchListTablebtnId"></label>
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
                          html +=`<td class="text-wrap" style="min-width:300px" onclick="CompanyCompanyDetails('`+this["uuid"]+`')"><a>` + (this[attr]) + `</a></td>`;
                              continue;
                      }
                      
                      //html +=`<td class="text-wrap"><a>` + (this[attr]) + `</a></td>`;
                      html +=`<td class="text-wrap"><a>` + (this[attr]) + `</a></td>`;
                  }
                  
                  else{
                      if(attr=="Company-admin-action")
                      {
                          html +=BindActionButtonVer4(
                              CompanyCompany_arr_action,
                              this['uuid'],
                              this,
                              null,
                              this['created_by'],
                          );
                      }else
                      {
                          
                          if(attr=="is_callbot"){
                              var value="";
                              if(this[attr] || this[attr]=="true"){
                                  value="checked";
                              }
                              html +=`<td class="text-center">
                                      <div class="custom-control custom-switch">
                                          <input class="custom-control-input" id="${this["uuid"]}is_callbotCompanyCompanySwitchListTablebtnId" name="`+ attr +`" data-uuid="` + this["uuid"] + `" type="checkbox"  `+value+` onclick="is_callbotCompanyCompanyEventChangeSwitcher(this)">
                                      <label class="custom-control-label" for="${this["uuid"]}is_callbotCompanyCompanySwitchListTablebtnId"></label>
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
                                          <input class="custom-control-input" id="${this["uuid"]}is_chatbotCompanyCompanySwitchListTablebtnId" name="`+ attr +`" data-uuid="` + this["uuid"] + `" type="checkbox"  `+value+` onclick="is_chatbotCompanyCompanyEventChangeSwitcher(this)">
                                      <label class="custom-control-label" for="${this["uuid"]}is_chatbotCompanyCompanySwitchListTablebtnId"></label>
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
                                          <input class="custom-control-input" id="${this["uuid"]}log_confirm_by_emailCompanyCompanySwitchListTablebtnId" name="`+ attr +`" data-uuid="` + this["uuid"] + `" type="checkbox"  `+value+` onclick="log_confirm_by_emailCompanyCompanyEventChangeSwitcher(this)">
                                      <label class="custom-control-label" for="${this["uuid"]}log_confirm_by_emailCompanyCompanySwitchListTablebtnId"></label>
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
                                          <input class="custom-control-input" id="${this["uuid"]}logged_with_passwordCompanyCompanySwitchListTablebtnId" name="`+ attr +`" data-uuid="` + this["uuid"] + `" type="checkbox"  `+value+` onclick="logged_with_passwordCompanyCompanyEventChangeSwitcher(this)">
                                      <label class="custom-control-label" for="${this["uuid"]}logged_with_passwordCompanyCompanySwitchListTablebtnId"></label>
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
                                          <input class="custom-control-input" id="${this["uuid"]}created_free_licenseCompanyCompanySwitchListTablebtnId" name="`+ attr +`" data-uuid="` + this["uuid"] + `" type="checkbox"  `+value+` onclick="created_free_licenseCompanyCompanyEventChangeSwitcher(this)">
                                      <label class="custom-control-label" for="${this["uuid"]}created_free_licenseCompanyCompanySwitchListTablebtnId"></label>
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
                                          <input class="custom-control-input" id="${this["uuid"]}email_activatedCompanyCompanySwitchListTablebtnId" name="`+ attr +`" data-uuid="` + this["uuid"] + `" type="checkbox"  `+value+` onclick="email_activatedCompanyCompanyEventChangeSwitcher(this)">
                                      <label class="custom-control-label" for="${this["uuid"]}email_activatedCompanyCompanySwitchListTablebtnId"></label>
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
          var tbId = "CompanyCompanyDataTableId";
          if(tableId!=null){
              tbId = tableId;
          }
  
          if(order==null){
          order=Company_ID_TABLE_COUNT;
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
                      if(attr=="Company-admin-action")
                      {
                          html +=`<td class="text-center d-none">
                          <a  onclick="Company`+action+`DeteleRowAddingTable(this)"> &nbsp;
                              <i title="Xóa" class="fas fa-trash" onclick="Company`+action+`DeteleRowAddingTable(this)"></i>&nbsp;
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
          var card_Id = "CompanyCompanyCardAreaId";
          if(cardId!=null){
              card_Id = cardId;
          }
  
          if(order==null){
          order=Company_ID_TABLE_COUNT;
          }
          var card_area = $("#" + card_Id);
          if (card_area.length > 0){
              var card_template = card_area.find(".CompanyCompanyTemplateCardClass");
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
                                              <i class="fas fa-times" style="color:gray" file-uuid="` + this["uuid"] + `" id="` + this["uuid"] + `btnDeleteId" onclick="avatarCompanyCompanyDeletedAttacthment(this)"></i>
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
                              $(hEle).html(`<a onclick="CompanyCompanyDetails('`+this["uuid"]+`')">` + (this[attr]) + `</a>`);
                              continue;
                          }
                          $(hEle).html(`<a>` + (this[attr]) + `</a>`);
  
                      }
                  }
                  var action_button = BindActionButtonVer5(
                                  CompanyCompany_arr_action,
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
              
              
  class CompanyCompany_ListItem {
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
              
  
  var CompanyCompanyList_CACHE = [];
  // ########## Get List Class ##############
  class CompanyCompanyList {
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
              url: CompanyCompany_LIST_URL,
              type: "GET",
              async: false,
              cache: false,
              timeout: 30000,
  
              success: function (data) {
                  CompanyCompanyList_CACHE = []
                  console.log(data);
                  if (data.hasOwnProperty('results')){
                      for (var i = 0; i < data.results.length; i++){
                          var x = new CompanyCompany_ListItem(data.results[i]);
                          CompanyCompanyList_CACHE.push(x);
                      }
                  }else{
                      for (var i = 0; i < data.length; i++){
                          var x = new CompanyCompany_ListItem(data[i]);
                          CompanyCompanyList_CACHE.push(x);
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
          return CompanyCompanyList_CACHE;
      }
  
  }
  
      
  $(document).ready( function () {
     const CompanyCompanydatatablesSimple = document.getElementById('CompanyCompanyDataTableId');
      if (CompanyCompanydatatablesSimple) {
          new simpleDatatables.DataTable(CompanyCompanydatatablesSimple,{
              perPageSelect:false,
              sortable:false,
              searchable: false,
          });
      }
  
  });
  
  $(document).ready(function(){
      $(".dt-button").addClass('btn btn-success');
  });
  
  
  // ########## tTest function ##############
  function tTestCompanyCompany(type_action=null){
      var b_json = genCompanyCompany();
      console.log("b_json = ", b_json);
      // var d_obj = new CompanyCompany(b_json);
      var d_obj = new CompanyCompany(b_json);
      // console.log('d_obj.tCreatePostApi()...', d_obj.tCreatePostApi());
      // console.log('d_obj.tCreateNewPostFormApi()...', d_obj.tCreateNewPostFormApi());
      // console.log('d_obj.tUpdatePostApi()...', d_obj.tUpdatePostApi());
      // var d_obj = new CompanyCompanyList();
      // console.log('d_obj.getListApi()...', d_obj.getListApi());
      console.log("d_obj = ", d_obj);
      if(type_action=='Edit'){
  
          d_obj.uuid=cr_uuid;
      }
      d_obj.tFillForm();
      console.log("Fill form done...");
  }
  
  // ########## tTest function ##############
  function tTestInModalCompanyCompany(type_action){
      var form_type = type_action+"Modal";
      var b_json = genCompanyCompany(form_type);
      console.log("b_json = ", b_json);
      // var d_obj = new CompanyCompany(b_json);
      var d_obj = new CompanyCompany(b_json);
      // console.log('d_obj.tCreatePostApi()...', d_obj.tCreatePostApi());
      // console.log('d_obj.tCreateNewPostFormApi()...', d_obj.tCreateNewPostFormApi());
      // console.log('d_obj.tUpdatePostApi()...', d_obj.tUpdatePostApi());
      // var d_obj = new CompanyCompanyList();
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
      $('.modal').on('shown.bs.modal', function() {
          $(this).css("z-index", parseInt($('.modal-backdrop').css('z-index')) + 1);
      });
  });
  
      
  
  // ########## [Search Button] Clicked Handle function ##############
  
  $(document).ready(function(){
      $("#CompanyCompanyQuickSearchInputId").on('keyup', function(e) {
          if (e.key === 'Enter' || e.keyCode === 13) {
              CompanyCompanypagination={
                  current_page:1,
                  total:0,
                  has_next:false,
                  has_prev:false
              }
              CompanyCompanySearchData(CompanyCompanypagination["current_page"],"quick");
          }
      })
      $("#CompanyCompanyQuickSearchBtnId").click(function(){
          CompanyCompanypagination={
              current_page:1,
              total:0,
              has_next:false,
              has_prev:false
          }
          CompanyCompanySearchData(CompanyCompanypagination["current_page"],"quick");
      })
      $("#CompanyCompanySearchBtnId").click(function(){
          CompanyCompanypagination={
              current_page:1,
              total:0,
              has_next:false,
              has_prev:false
      }
          CompanyCompanySearchData(CompanyCompanypagination["current_page"],"filter");
      })
  });
  
      
  
  // ########## [Search Button] Clicked Handle function ##############
//   $(document).ready(function(){
  
//       $("#CompanyCompanyExportExcelBtnId").click(function(){
//           var is_export = true;
//           if(search_log["search_func"] == "CompanyCompanyGetDataTable"){
//                   CompanyCompanyGetLargeDataTable(1,search_log["search_data"],is_export,CompanyCompanyExportExcel);
//           }
//           else if(search_log["search_func"] == "CompanyCompanySearchData"){
//                   CompanyCompanySearchLargeData(1,search_log["search_type"],search_log["search_data"],is_export,CompanyCompanyExportExcel);
//           } 
          
//       })
//   }); 
  
//   function CompanyCompanyExportExcel(){
  
//       var table=$('#CompanyCompanyExportTableId');
//       var count_cols = table.find("th").length;
//       if(table.find("td").length>0){
//           table.tableExport({
//                   filename: 'thông_tin_công_ty_%DD%-%MM%-%YY%',
//                   format: 'xls',
//                   //excludeCols: count_cols.toString(),
//                   onbefore: function() {
//                       toastr.success('Bắt đầu xuất Excel!');
//                   },
//                   onafter: function() {
//                       toastr.success('Xuất Excel thành công');
//                   },
//           });
//       }
//       else{
//           toastr.warning('Không có dữ liệu!');
//       }
//   }
  

$(document).ready(function () {
    $('#CompanyCompanyExportExcelBtnId').click(function () {
        // Define the columns to export
        var columnsToExport = [0, 1, 2, 3, 4, 5, 6]; // columns 1, 2, and 4 (zero-indexed)
        var theadToExport = '';
        $('#CompanyCompanyDataTableId thead').each(function () {
            var row = '';
            $(this).find('th').each(function (index) {
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
        $('#CompanyCompanyDataTableId tbody tr').each(function () {
            var row = '';
            $(this).find('td').each(function (index) {
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
            filename: 'thông_tin_công_ty_%DD%-%MM%-%YY%',
            format: 'xls',
            escape: 'false',

        });
    });
});
  
  


  
  // ########## [Save Button] Clicked Handle function ##############
  
  $(document).ready(function(){
      $("#CompanyCompanyCreateBtnId").click(function(){
          obj = new CompanyCompany();
          console.log('Save obj = ', obj);
          obj.tCreateNewPostFormApi();
      })
  });
  
      
  
  // ########## [Save Button] Clicked Handle function ##############
  
  $(document).ready(function(){
      $("#CompanyCompanyUpdateBtnId").click(function(){
          obj = new CompanyCompany();
          console.log('Update obj = ', obj);
          obj.tUpdatePostApi('CompanyCompanyEditmodalsId');
      })
  });
  
      
  
  // ########## [Create New Button] Clicked Handle function ##############
  var is_continue_modal=false;
  var is_continue_form=false;
  $(document).ready(function(){
      $("#CompanyCompanySaveAndNewBtnId").click(function(){
          is_continue_form=true;
          obj = new CompanyCompany();
          console.log('Save obj and create new, obj = ', obj);
          obj.tCreateNewPostFormApi();
      })
  });
  
      
  
  // ########## [Delete Button] Clicked Handle function ##############
  
  $(document).ready(function(){
      $("#CompanyCompanyDeleteBtnId").click(function(){
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
                      obj = new CompanyCompany();
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
      $("#CompanyCompanyCancelCreateModalBtnId").click(function(){
          $(':input','#CompanyCompanyCreatemodalsId')
    .not(':button, :submit, :reset, :hidden')
    .val('').trigger('change')
    .removeAttr('checked')
    .removeAttr('selected');
      })
      $("#CompanyCompanyCancelEditModalBtnId").click(function(){
          $(':input','#CompanyCompanyEditmodalsId')
    .not(':button, :submit, :reset, :hidden')
    .val('').trigger('change')
    .removeAttr('checked')
    .removeAttr('selected');
      })
      $("#CompanyCompanyCancelDetailModalBtnId").click(function(){
          $(':input','#CompanyCompanyDetailmodalsId')
    .not(':button, :submit, :reset, :hidden')
    .val('').trigger('change')
    .removeAttr('checked')
    .removeAttr('selected');
      })
  });
  
      
  
  // ########## [Cancel Button] Clicked Handle function ##############
  
  function CompanyRefreshCreateModal() {
      $('#CompanyCompanyCreatemodalsId')
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
  
  $('#CompanyCompanyCreatemodalsId').on('hidden.bs.modal', function (e) {
    $(this).removeData('bs.modal');
      $(this)
          .find("input[type=text],input[type=number],textarea,select")
          .val('').trigger('change').removeClass("is-invalid").removeClass("is-valid")
          .end()
          .find("input[data-datepicker]").val('').removeClass("is-invalid").removeClass("is-valid")
          .end()
          .find("input[type=checkbox], input[type=radio]").removeClass("is-invalid").removeClass("is-valid")
          .prop("checked", false)
          .end();
      $(this).find("table").each(function() { 
            var table = new CompanyCompanycreateTnvTable($(this));
            table.refresh(); 
      })
         
  })
  $('#CompanyCompanyEditmodalsId').on('hidden.bs.modal', function (e) {
    $(this).removeData('bs.modal');
      $(this)
          .find("input[type=text],input[type=number],textarea,select")
          .val('').trigger('change').removeClass("is-invalid").removeClass("is-valid")
          .end()
          .find("input[data-datepicker]").val('').removeClass("is-invalid").removeClass("is-valid")
          .end()
          .find("input[type=checkbox], input[type=radio]").removeClass("is-invalid").removeClass("is-valid")
          .prop("checked", false)
          .end();
          $(this).find("table").each(function() { 
            var table = new CompanyCompanyeditTnvTable($(this));
            table.refresh(); 
      })
  })
  $('#CompanyCompanyDetailmodalsId').on('hidden.bs.modal', function (e) {
    $(this).removeData('bs.modal');
      $(this)
          .find("input[type=text],input[type=number],textarea,select")
          .val('').trigger('change').removeClass("is-invalid").removeClass("is-valid")
          .end()
          .find("input[data-datepicker]").val('').removeClass("is-invalid").removeClass("is-valid")
          .end()
          .find("input[type=checkbox], input[type=radio]").removeClass("is-invalid").removeClass("is-valid")
          .prop("checked", false)
          .end();
        $(this).find("table").each(function() { 
            var table = new CompanyCompanydetailTnvTable($(this));
            table.refresh(); 
          })
  })
  });
  
      
  
  // ########## [Save Button] Clicked Handle function ##############
  
  $(document).ready(function(){
      $("#CompanyCompanyCreateModalBtnId").click(function(){
          var validate_obj = new InputValidation('CompanyCompanyCreateModalsFormId');
          if(validate_obj.validateRequired()){
              toastr.warning('Vui lòng điền đầy đủ thông tin');
              return;
          }
          obj = new CompanyCompany();
          console.log('Save obj = ', obj);
          obj.tCreateNewPostFormApi('CompanyCompanyCreateModalsFormId');
      })
  });
  
      
  
  // ########## [Save Button] Clicked Handle function ##############
  
  $(document).ready(function(){
      $("#CompanyCompanyUpdateModalBtnId").click(function(){
          var validate_obj = new InputValidation('CompanyCompanyEditModalsFormId');
          if(validate_obj.validateRequired()){
              toastr.warning('Vui lòng điền đầy đủ thông tin');
              return;
  
          }
          obj = new CompanyCompany();
          console.log('Update obj = ', obj);
          obj.tUpdatePostApi('CompanyCompanyEditModalsFormId');
      })
  });
  
      
  
  // ########## [Create New Button] Clicked Handle function ##############
  
  $(document).ready(function(){
      $("#CompanyCompanySaveAndNewModalBtnId").click(function(){
          obj = new CompanyCompany();
          console.log('Save obj and create new, obj = ', obj);
          is_continue_modal=true;
  
          obj.tCreateNewPostFormApi('CompanyCompanyCreateModalsFormId');
          
      })
  });
  
      
  
  // ########## [Get List, push options to Select] Handle Event function ##############
  function LoadCompanyCompanyList(){
  
  if ($(".Company-Company-select").length > 0){
          var obj = new CompanyCompanyList();
          CompanyCompanyList_CACHE = obj.getListApi();
          var crr = null;
          for (l = 0; l < CompanyCompanyList_CACHE.length; l++){
              crr = CompanyCompanyList_CACHE[l]
              // $(this).append(new Option(crr.name, crr.id));
              $(".Company-Company-select").append(new Option(crr.name, crr.uuid));
          }
      }
  }
  $(document).ready(function(){
       LoadCompanyCompanyList();
  })
  
      
  
  // ########## [Fill Table] Handle Event function ##############
  var CompanyCompanypagination={
      current_page:1,
      total:0,
      has_next:false,
      has_prev:false
  }
  var CompanyCompanyrecord_in_page = 10;
  
  $(document).ready(function(){
    
      var IdTable ="CompanyCompanyTableBodyId";
      var checker = $("#" +IdTable );
      if (checker.length > 0){
    
          if($('#'+IdTable).is(":visible")){
              CompanyCompanyGetDataTable(CompanyCompanypagination["current_page"]);
          }
      }
  })
  var record_in_page = 5;
  var search_log = {
      search_func:"",
      search_data:"",
      search_type:"",
  }
  function CompanyCompanyGetDataTable(page=1,search_data=null){
       
          search_log["search_func"] = "CompanyCompanyGetDataTable";
          search_log["search_data"] = search_data;
          search_log["search_type"] = "";
  
          var obj = new CompanyCompany();
          var results = obj.tGetAllObjApi(page,search_data);
          obj.callAjax.then(function(data) {
          $("#CompanyCompanyTableBodyId").empty();
          var body = $("#CompanyCompanyDataTableId");
          //if (body.length > 0){
          //    var bodyTable = body.DataTable();
          //    bodyTable.clear();
          //}
          Company_ID_TABLE_COUNT = 1;
          var crr_record_in_page = CompanyCompanyrecord_in_page;
  
          if(page>1){
          Company_ID_TABLE_COUNT =1+crr_record_in_page*page-crr_record_in_page
          }
          for (var i = 0; i < results.length; i++){
              try{
                  console.log('results[i] = ', results[i]);
              
                  //results[i].tFillTable2();
                  results[i].tFillTable3();
                //   results[i].tFillCard();
  
                  Company_ID_TABLE_COUNT++;
                  // results[i].tFillTable1();
              }
              catch(err){
                  console.log(err);
              }
          }
          var pagenation_ele=$(".pagination-CompanyCompany");
          var pagination=CompanyCompanypagination;
          pagenation_ele.html('');
          var page_total_ele = $(".page-total-CompanyCompany");
          page_total_ele.html(`<footer class="mt-3 blockquote-footer m-3">Tổng số: ${pagination["total"]} bản ghi </footer>`);
          if (results.length > 0) {
              
                      pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="CompanyCompanyGetDataTable(1)"><<</a></li>`);
                      if (pagination["has_prev"] == true) {
                          pagenation_ele.append('<li class="page-item"><a class="page-link" onclick="CompanyCompanyGetDataTable(' + (parseInt(pagination["current_page"]) - 1) + ')">' + (parseInt(pagination["current_page"]) - 1) + '</a></li>');
                      }
                      pagenation_ele.append('<li class="page-item "><a class="page-link" >' + (parseInt(pagination["current_page"])) + '</a></li>');
                      if (pagination["has_next"] == true) {
                          pagenation_ele.append('<li class="page-item"><a class="page-link" onclick="CompanyCompanyGetDataTable(' + (parseInt(pagination["current_page"]) + 1) + ')">' + (parseInt(pagination["current_page"]) + 1) + '</a></li>');
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
                      pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="CompanyCompanyGetDataTable(`+last_page_order+`)">>></a></li>`);
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
      var checker = $("#CompanyCompanyFormId");
      if (checker.length > 0){
           cr_uuid = checker.attr('data-uuid');
          if (typeof cr_uuid !== 'undefined' && cr_uuid !== false){
              console.log('cr_uuid = ', cr_uuid);
              var obj = new CompanyCompany();
              obj.tGetObjApi(cr_uuid);
          }
      }
      checker = $("#CompanyCompanyDetailFormId");
      if (checker.length > 0){
           cr_uuid = checker.attr('data-uuid');
          if (typeof cr_uuid !== 'undefined' && cr_uuid !== false){
              console.log('cr_uuid = ', cr_uuid);
              var obj = new CompanyCompany();
              obj.tGetObjApi(cr_uuid);
          }
      }
      checker = $("#CompanyCompanyEditFormId");
      if (checker.length > 0){
           cr_uuid = checker.attr('data-uuid');
          if (typeof cr_uuid !== 'undefined' && cr_uuid !== false){
              console.log('cr_uuid = ', cr_uuid);
              var obj = new CompanyCompany();
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
      $("#CompanyCompanyTestBtnId").click(function(){
          tTestCompanyCompany();
      })
       $("#CompanyCompanyTestEditBtnId").click(function(){
          tTestCompanyCompany('Edit');
      })
      $("#CompanyCompanyTestCreateModalBtnId").click(function(){
          tTestInModalCompanyCompany('Create');
  
      })
       $("#CompanyCompanyTestEditModalBtnId").click(function(){
          tTestInModalCompanyCompany('Edit');
      })
  });
  
      
      
      // ########## [Fill Table bySearch] Handle Event function ##############
      function CompanyCompanySearchData(page=1,search_type,search_data=null){
        $("#CompanyCompanyTableBodyId").empty();
          search_log["search_func"] = "CompanyCompanySearchData";
          search_log["search_type"] = search_type;
          search_log["search_data"] = search_data;
              var obj = new CompanyCompany();
              var results = obj.tSearchAllObjApi(page,search_data,search_type);
              obj.callAjax.then(function(data) {
              
              var body = $("#CompanyCompanyDataTableId");
              //if (body.length > 0){
              //    var bodyTable = body.DataTable();
              //    bodyTable.clear();
              //}
              Company_ID_TABLE_COUNT = 1;
              crr_record_in_page = CompanyCompanyrecord_in_page;
              if(page>1){
              Company_ID_TABLE_COUNT =1+crr_record_in_page*page-crr_record_in_page;
              }
              for (var i = 0; i < results.length; i++){
                  try{
                      console.log('results[i] = ', results[i]);
      
                      //results[i].tFillTable2();
                      results[i].tFillTable3();
      
                      Company_ID_TABLE_COUNT++;
                      // results[i].tFillTable1();
                  }
                  catch(err){
                      console.log(err);
                  }
              }
              search_type = search_type.trim()
              var pagination = CompanyCompanypagination;
              var pagenation_ele=$(".pagination-CompanyCompany");
              pagenation_ele.html('');
              var page_total_ele = $(".page-total-CompanyCompany");
              page_total_ele.html(`<footer class="blockquote-footer mt-3">Tổng số: ${pagination["total"]} bản ghi </footer>`);
              
              if (results.length > 0) {
                      pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="CompanyCompanySearchData(1,'`+search_type+`'`+ `,'`+search_data+`'`+ `)">Đầu</a></li>`);
  
                      if (pagination["has_prev"] == true) {
                          pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="CompanyCompanySearchData(` + (parseInt(pagination["current_page"]) - 1) +`,'`+search_type+`'`+ `,'`+search_data+`'`+ `)">` + (parseInt(pagination["current_page"]) - 1) + `</a></li>`);
                      }
                      pagenation_ele.append('<li class="page-item active"><a class="page-link" >' + (parseInt(pagination["current_page"])) + '</a></li>');
                      if (pagination["has_next"] == true) {
                          pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="CompanyCompanySearchData(` + (parseInt(pagination["current_page"]) + 1) +`,'`+search_type+`'`+ `,'`+search_data+`'`+ `)">` + (parseInt(pagination["current_page"]) + 1) + `</a></li>`);
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
                      pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="CompanyCompanySearchData(`+last_page_order+`,'`+search_type+`'`+ `,'`+search_data+`'`+ `)">Cuối</a></li>`);
                      }
                  }
                  if (search_type == "quick") {
                      var crr_txt = $("#CompanyCompanyQuickSearchInputId").val();
                      highlight(crr_txt,"#CompanyCompanyTableBodyId");
                  }
          })
      
      }
      
          
      
      // ########## [Fill Table bySearch] Handle Event function ##############
      function CompanyCompanySearchLargeData(page=1,search_type,search_data=null,is_export,ExportFunc){
              var obj = new CompanyCompany();
              var tbId = "CompanyCompanyExportTableId"
              var results = obj.tSearchLargeObjApi(page,search_data,search_type);
              obj.callAjax.then(function(data) {
              $("#"+tbId).find("table").empty();
              CompanyCompany_ID_TABLE_COUNT = 1;
              for (var i = 0; i < results.length; i++){
                  try{
                      console.log('results[i] = ', results[i]);
                      results[i].tFillTable3(tbId);
                      results[i].tFillCard();
  
                      CompanyCompany_ID_TABLE_COUNT++;
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
      function CompanyCompanyGetLargeDataTable(page=1,search_data=null,is_export,ExportFunc){
              var obj = new CompanyCompany();
              var tbId = "CompanyCompanyExportTableId"
              var results = obj.tGetAllObjLargeApi(page,search_data);
              obj.callAjax.then(function(data) {
              $("#"+tbId).find("table").empty();
              CompanyCompany_ID_TABLE_COUNT = 1;
              for (var i = 0; i < results.length; i++){
                  try{
                      console.log('results[i] = ', results[i]);
                      results[i].tFillTable3(tbId);
                      results[i].tFillCard();
                      CompanyCompany_ID_TABLE_COUNT++;
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
      var Company_ID_INLINE_TABLE_COUNT;
      function CompanyCompanyFillTableInForm(page=1,search_data=null,tableId=null,action="detail"){
              var obj = new CompanyCompany();
              var results = obj.tSearchLargeObjApi(page,search_data,"filter",tableId);
              obj.callAjax.then(function(data) {
                  Company_ID_INLINE_TABLE_COUNT = 1;
                  if(page>1){
                  Company_ID_INLINE_TABLE_COUNT =1+10*page -10;
                  }
                  if(action=="detail"){
                    $("#"+tableId).find('tbody').empty();
                    for (var i = 0; i < results.length; i++){
                    try{
                        console.log('results[i] = ', results[i]);
                        results[i].tFillTable4(tableId,Company_ID_INLINE_TABLE_COUNT,action);
                        Company_ID_INLINE_TABLE_COUNT++;
                    }
                    catch(err){
                        console.log(err);
                    }
                    }
                }
                else if(action=="edit"){
                    var table = new CompanyCompanyeditTnvTable($("#"+tableId)[0]);
                    table.bindRows(results);
                }
            })
            
    
    }

                  
    $(document).ready(function(){
        $.ajaxSetup({
                headers : {
                    'CSRFToken' : getCSRFTokenValue(),
                    'X-CSRFToken' : getCSRFTokenValue(), 
                },
                tryCount : 0,
                retryLimit : 3,
            });
            
            var event_data = '';
    
            $.ajax({
                    url:  CompanyStatusList_URL,
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
                            $("#companystatusCompanyCompanyCreateModalInput").append(event_data);
                            $("#companystatusCompanyCompanyEditModalInputId").append(event_data);
                            $("#companystatusCompanyCompanyFilterSearchInputId").append(event_data);
    
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
                    url: CityList_URL ,
                    type: 'GET',
                    async: false,
                    cache: false,
                    timeout: 30000,
                    success: function(data){
                        if (data.hasOwnProperty('results')){
                            for (var j=0; j < data.results.length; j++){
                                var uuid_tmp = data.results[j].code;
                                var name_tmp = data.results[j].name;
                                event_data += '<option value="' + uuid_tmp + '">' + name_tmp + '</option>'
                            }
                            $("#cityCompanyCompanyCreateModalInput").append(event_data);
                            $("#cityCompanyCompanyEditModalInputId").append(event_data);
                           
    
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
                    url: Districtlist_URL,
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
                            $("#districtCompanyCompanyCreateModalInput").append(event_data);
                            $("#districtCompanyCompanyEditModalInputId").append(event_data);
                           
    
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
                    url: CommuneList_URL,
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
                            $("#communeCompanyCompanyCreateModalInput").append(event_data);
                            $("#communeCompanyCompanyEditModalInputId").append(event_data);
                           
    
                        }
                    },
                    error:function (xhr, ajaxOptions, thrownError) {
                        console.log(xhr.status);
                        console.log(thrownError);
                    }
            });
    });
    // $(document).ready(function(){
    //     $.ajaxSetup({
    //             headers : {
    //                 'CSRFToken' : getCSRFTokenValue(),
    //                 'X-CSRFToken' : getCSRFTokenValue(), // for --> SessionAuthentication
    //             },
    //             tryCount : 0,
    //             retryLimit : 3,
    //         });
            
    //         var event_data = '';
    
    //         $.ajax({
    //                 url: CompnayList_URL,
    //                 type: 'GET',
    //                 async: false,
    //                 cache: false,
    //                 timeout: 30000,
    //                 success: function(data){
    //                     if (data.hasOwnProperty('results')){
    //                         for (var j=0; j < data.results.length; j++){
    //                             var uuid_tmp = data.results[j].uuid;
    //                             var name_tmp = data.results[j].name;
    //                             event_data += '<option value="' + uuid_tmp + '">' + name_tmp + '</option>'
    //                         }
    //                         $("#communeCompanyCompanyCreateModalInput").append(event_data);
                            
                           
    
    //                     }
    //                 },
    //                 error:function (xhr, ajaxOptions, thrownError) {
    //                     console.log(xhr.status);
    //                     console.log(thrownError);
    //                 }
    //         });
    // });



   