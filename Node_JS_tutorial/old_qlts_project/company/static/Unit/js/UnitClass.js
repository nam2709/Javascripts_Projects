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
//   function UnitUnitgenRandomSelect(optionId){
//       try{
//           var select = document.getElementById(optionId);
//           if(select == null){
//               return null;
//           }
//           var items = select.getElementsByTagName('option');
//           var vals = [];
//           for (var i = 0; i < items.length; i++){
//               if (items[i].hasAttribute("value") && items[i].value != null){
//                   vals.push(items[i].value);
//               }
//           }
//           console.log('vals = ', vals);
  
//           var index = vals[Math.floor(Math.random() * items.length)];
//           //select.value = index;
  
//           // Fill file label:
//           //var labels = document.querySelectorAll('[for=optionId]');
//           //for (var i = 0; i < labels.length; i++){
//           //   labels[i].val(index);
//           //}
//           //$("#"+optionId).val(index).change()
//           var obj = new Object();
//           obj.uuid = index;
//           return obj;
//       }
//       catch (err) {
//           console.log(err);
//           return null;
//       }
//   }
              
  var genUnitUnit_FIELDS = [
    "name",
    "uuid",
    "Unitstatus",
    "code",
    "company",
    "unit",
    "position",
    "get_name_Unitstatus",
    "get_name_company",
    "get_name_position",
    "updated_at",
    "created_at",
];
function genUnitUnit(form_type){
return {
"name": makeid(),
"uuid": uuidv4(),
"Unitstatus": makeid(),
"get_name_Unitstatus": makeid(),
"get_name_company": makeid(),
"position": makeid(),
"get_name_position": makeid(),

"updated_at": randomDate(),
"created_at": randomDate(),
}
}
  
  var UnitUnit_CACHE = [];
  
             var UnitUnit_arr_action = [
          // default action
          
                      {
                      "title": "Xem chi tiết",
                      "func": "UnitUnitDetails",
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
                          "func": "UnitUnitEdit",
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
                          "func": "UnitUnitOnDeleteEvent",
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
      function UnitUnitCreate(){
        $('#UnitUnitCreatemodalsId').modal('toggle');
        // var obj=new AccountAccount();
        // obj.tGetObjApi(uuid);
        // obj.callAjax.then(function(data) {
        //     new AccountAccount(data).tFillFormModal('Detail','accountAccountDetailModalsFormId');
        // })
        //obj.tFillFormModal('Detail');
    }
      
      
                      function UnitUnitDetails(uuid){
                          $('#UnitUnitDetailmodalsId').modal('toggle');
                          var obj=new UnitUnit();
                          obj.tGetObjApi(uuid);
                          obj.callAjax.then(function(data) {
                              new UnitUnit(data).tFillFormModal('Detail','UnitUnitDetailModalsFormId');
  
                          })
                          //obj.tFillFormModal('Detail');
  
                      }
                      
                      function UnitUnitEdit(uuid){
                          $('#UnitUnitEditmodalsId').modal('toggle');
                          var obj=new UnitUnit();
                          obj.tGetObjApi(uuid);
                          obj.callAjax.then(function(data) {
                              new UnitUnit(data).tFillFormModal('Edit','UnitUnitEditModalsFormId');
  
                          })
                          //obj.tFillFormModal('Edit');
                      }
                      
                      function UnitUnitOnDeleteEvent(uuid){
                          var search_data = null;
                          try {
                              search_data = UnitActionsSearchData;
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
                                                      var obj=new UnitUnit();
                                                      obj.tDeleteApi(uuid);
                                                  }
                                              },
                                              
                                          }
                                  });
                              
                          }
                          else { 
                              UnitUnitOnDeleteWithDataSearchEvent(uuid);
                          }
  
                      }
                      function UnitUnitOnDeleteWithDataSearchEvent(uuid){
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
                                      var obj=new UnitUnit();
                                      
                                      obj.tDeleteApiWithDataSearch(uuid,UnitActionsSearchData);
                                  }
                              },
                              
                          }
                      });
                          
                      }
                      
                      function UnitUnitViewDetail(selectionId){
                        //   var select = $("#"+selectionId);
                          var select = "#UnitUnitDetailmodalsId";
                          if(select.length>0){
                          
                            
                              var value =  select.val()
                              if(value == "" || value == null || value == undefined){
                                  toastr.warning('Vui lòng chọn giá trị');
                                  return;
                              }
                              else {
                                  $('#UnitUnitDetailmodalsId').modal('toggle');
                                  var obj=new UnitUnit();
                                  obj.tGetObjApi(value);
                                  obj.callAjax.then(function(data) {
                                      new UnitUnit(data).tFillFormModal('Detail','UnitUnitDetailModalsFormId');
                                  })
                              }
                          }
                          
  
                      }
                      
      // custom func actions
              
              
  
                      //########## [Event] ChangeSwitcher ##############
                      

                      
  class UnitUnit{
      // ########## Init Objects ##############
      constructor(data=null){
          if (data != null){
            
            
           
              if (data.hasOwnProperty('uuid')){
                  this.uuid = data.uuid;
              }
              else{
                  this.id = null;
              }
      
              this.__app_name__ = "company";
      
              this.__model_name__ = "Unit";

            
         
            if (data.hasOwnProperty('name')){
                this.name = data.name;
              //   this.editUrl = '/Unit/Unit/edit/' + this.uuid + '/';
              //   this.detailUrl = '/Unit/Unit/detail/' + this.uuid + '/';
            }
            else{
                // this.uuid = null;
            }
  
              if (data.hasOwnProperty('code')){
                  this.code = data.code;
               
              }
              else{
                  // this.uuid = null;
              }

              if (data.hasOwnProperty('Unitstatus')){
                this.Unitstatus = data.Unitstatus;
            }
               else{
                // this.salt = null;
            }
            if (data.hasOwnProperty('get_name_Unitstatus')){
                this.get_name_Unitstatus = data.get_name_Unitstatus;
            }
               else{
                // this.salt = null;
            }
  
              if (data.hasOwnProperty('uuid')){
                  this.uuid = data.uuid;
                //   this.editUrl = '/Unit/Unit/edit/' + this.uuid + '/';
                //   this.detailUrl = '/Unit/Unit/detail/' + this.uuid + '/';
              }
              else{
                  // this.uuid = null;
              }
  

  
              if (data.hasOwnProperty('company')){
                  this.company = data.company;
                 
              }
              else{
                  // this.age = null;
              }
              if (data.hasOwnProperty('get_name_company')){
            
                this.get_name_company = data.get_name_company;
            }
            else{
                // this.age = null;
            }
  
          
             
  
  
          }
      }
      tGetFormData(formId=null){
          var formEle = $("#" + formId);
          if (formEle.length > 0){
              var chEle = formEle.find("#nameUnitUnitUnitInputId");
              if (chEle.length > 0){
                  this.name = chEle.val();
              }
              else{
                  // this.name = null;
              }
              var chEle = formEle.find("#uuidUnitUnitInputId");
              if (chEle.length > 0){
                  this.uuid = chEle.val();
              }
              else{
                  // this.uuid = null;
              }
              
              var chEle = formEle.find("#codeUnitUnitInputId");
              if (chEle.length > 0){
                  this.code = chEle.val();
              }
              else{
                  // this.nick_name = null;
              }
              var chEle = formEle.find("#UnitstatusUnitUnitInputId");
              if (chEle.length > 0){
                  this.Unitstatus = chEle.val();
              }
              else{
                  // this.username = null;
              }
              var chEle = formEle.find("#companyUnitUnitInputId");
              if (chEle.length > 0){
                  this.company = chEle.val();
              }
              else{
                  // this.full_name = null;
              }
              var chEle = formEle.find("#unitUnitUnitInputId");
              if (chEle.length > 0){
                  this.unit = chEle.val();
              }
              else{
                  // this.email = null;
              }
              var chEle = formEle.find("#positionUnitUnitInputId");
              if (chEle.length > 0){
                  this.position = chEle.val();
              }
              else{
                  // this.groups = null;
              }
           
          }
          else{
              var chEle = $("#idUnitUnitInputId");
              if (chEle.length > 0){
                  this.id = chEle.val();
              }
              else{
                  // this.id = null;
              }
              var chEle = formEle.find("#nameUnitUnitUnitInputId");
              if (chEle.length > 0){
                  this.name = chEle.val();
              }
              else{
                  // this.name = null;
              }
              var chEle = formEle.find("#uuidUnitUnitInputId");
              if (chEle.length > 0){
                  this.uuid = chEle.val();
              }
              else{
                  // this.uuid = null;
              }
              
              var chEle = formEle.find("#codeUnitUnitInputId");
              if (chEle.length > 0){
                  this.code = chEle.val();
              }
              else{
                  // this.nick_name = null;
              }
              var chEle = formEle.find("#UnitstatusUnitUnitInputId");
              if (chEle.length > 0){
                  this.Unitstatus = chEle.val();
              }
              else{
                  // this.username = null;
              }
              var chEle = formEle.find("#companyUnitUnitInputId");
              if (chEle.length > 0){
                  this.company = chEle.val();
              }
              else{
                  // this.full_name = null;
              }
              var chEle = formEle.find("#unitUnitUnitInputId");
              if (chEle.length > 0){
                  this.unit = chEle.val();
              }
              else{
                  // this.email = null;
              }
              var chEle = formEle.find("#positionUnitUnitInputId");
              if (chEle.length > 0){
                  this.postion = chEle.val();
              }
              else{
                  // this.groups = null;
              }
                      
          }
      }
  
      // ########## [FILL FORM] Objects to FRONT END ##############
      tFillForm(){
          var self = this;
  
            
  
              try{
                  var j_ele_uuid = $("#uuidUnitUnitInputId");
                  if (j_ele_uuid.length > 0){
                      if (j_ele_uuid.attr('name') != 'uuid'){
                        j_ele_uuid.val(self.tndid).change();
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
                  var j_ele_name = $("#nameUnitUnitInputId");
                  if (j_ele_name.length > 0){
                      if (j_ele_name.attr('name') != 'uuid'){
                          j_ele_name.val(self.name).change();
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
                  var j_ele_Unitstatus = $("#UnitstatusUnitUnitInputId");
                  if (j_ele_Unitstatus.length > 0){
                      if (j_ele_Unitstatus.attr('name') != 'uuid'){
                          j_ele_Unitstatus.val(self.Unitstatus).change();
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
                  var j_ele_code = $("#codeUnitUnitInputId");
                  if (j_ele_code.length > 0){
                      if (j_ele_code.attr('name') != 'uuid'){
                          j_ele_code.val(self.code).change();
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
                  var j_ele_company = $("#companyUnitUnitInputId");
                  if (j_ele_company.length > 0){
                      if (j_ele_company.attr('name') != 'uuid'){
                          j_ele_company.val(self.company).change();
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
                  var j_ele_unit = $("#unitUnitUnitInputId");
                  if (j_ele_unit.length > 0){
                      if (j_ele_unit.attr('name') != 'uuid'){
                          j_ele_unit.val(self.unit).change();
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
                  var j_ele_position = $("#positionUnitUnitInputId");
                  if (j_ele_position.length > 0){
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
            var j_ele_Unitstatus = $("#getUnitstatusUnitUnit"+apart+"InputId");
            if (j_ele_Unitstatus.length > 0){
                if (j_ele_Unitstatus.attr('name') != 'uuid'){
                    j_ele_Unitstatus.val(self.get_name_Unitstatus).change();
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
            var j_ele_Unitstatus = $("#UnitstatusUnitUnit"+apart+"InputId");
            if (j_ele_Unitstatus.length > 0){
                if (j_ele_Unitstatus.attr('name') != 'uuid'){
                    j_ele_Unitstatus.val(self.Unitstatus).change();
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
            var j_ele_uuid = $("#uuidUnitUnit"+apart+"InputId");
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
            var j_ele_company = $("#kcompanyUnitUnit"+apart+"InputId");
            if (j_ele_company.length > 0){
                
                if (j_ele_company.attr('name') != 'uuid'){
                    j_ele_company.val(self.get_name_company).change();
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
            var j_ele_company = $("#companyUnitUnit"+apart+"InputId");
            if (j_ele_company.length > 0){
                
                if (j_ele_company.attr('name') != 'uuid'){
                    j_ele_company.val(self.company).change();
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
            var j_ele_uuid = $("#kpositionUnitUnit"+apart+"InputId");
            if (j_ele_uuid.length > 0 ){
                if (j_ele_uuid.attr('name') != 'uuid'){
                    j_ele_uuid.val(self.get_name_position).change();
                    
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
            var j_ele_uuid = $("#positionUnitUnit"+apart+"InputId");
            if (j_ele_uuid.length > 0 ){
                if (j_ele_uuid.attr('name') != 'uuid'){
                    j_ele_uuid.val(self.position).change();
                    
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
            var j_ele_uuid = $("#kunitUnitUnit"+apart+"InputId");
            if (j_ele_uuid.length > 0 ){
                if (j_ele_uuid.attr('name') != 'uuid'){
                    j_ele_uuid.val(self.get_name_unit).change();
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
            var j_ele_uuid = $("#unitUnitUnit"+apart+"InputId");
            if (j_ele_uuid.length > 0 ){
                if (j_ele_uuid.attr('name') != 'uuid'){
                    j_ele_uuid.val(self.unit).change();
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
            var j_ele_uuid = $("#codeUnitUnit"+apart+"InputId");
            if (j_ele_uuid.length > 0){
                if (j_ele_uuid.attr('name') != 'uuid'){
                    j_ele_uuid.val(self.code).change();
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
                  var j_ele_name = $("#nameUnitUnit"+apart+"InputId");
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
                              var j_ele_avatar = $("#avatarUnitUnit"+apart+"FileAreaId");
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
                                              <i class="fas fa-times" style="color:gray" file-uuid="` + self.uuid + `" id="` + self.uuid + `btnDeleteId" onclick="avatarUnitUnitDeletedAttacthment(this)"></i>
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
            var j_ele_uuid = $("#companyUnitUnit"+apart+"InputId");
            if (j_ele_uuid.length > 0 && self.uuid !=null){
                if (j_ele_uuid.attr('name') != 'uuid'){
                    j_ele_uuid.val(self.company.uuid).change();
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
            var j_ele_uuid = $("#positionUnitUnit"+apart+"InputId");
            if (j_ele_uuid.length > 0 && self.uuid !=null){
                if (j_ele_uuid.attr('name') != 'uuid'){
                    j_ele_uuid.val(self.position).change();
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
            var j_ele_uuid = $("#unitUnitUnit"+apart+"InputId");
            if (j_ele_uuid.length > 0 && self.uuid !=null){
                if (j_ele_uuid.attr('name') != 'uuid'){
                    j_ele_uuid.val(self.unit).change();
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
            var j_ele_uuid = $("#codeUnitUnit"+apart+"InputId");
            if (j_ele_uuid.length > 0 && self.uuid !=null){
                if (j_ele_uuid.attr('name') != 'uuid'){
                    j_ele_uuid.val(self.code).change();
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
                  var j_ele_name = $("#nameUnitUnit"+apart+"InputId");
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
                var j_ele_Unitstatus = $("#UnitstatusUnitUnit"+apart+"InputId");
                if (j_ele_Unitstatus.length > 0){
                    if (j_ele_Unitstatus.attr('name') != 'uuid'){
                        j_ele_Unitstatus.val(self.Unitstatus).change();
                    }
                }
                else{
                    // j_ele_companystatus.val(null);
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
              url: UnitList_URL,
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
                      self = new UnitUnit(data);
                      UnitUnitGetDataTable(UnitUnitpagination["current_page"]);
                      if(is_continue_form){
                          is_continue_form=false;
                          toastr.success('Thêm mới thành công');
                        //   $(location).prop('href', "/Unit/Unit/create/");
                          
  
                      }else if(is_continue_modal){
                          is_continue_modal=false;
                          UnitRefreshCreateModal();
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
                      //                $(location).prop('href', "/Unit/Unit/create/");
                      //            }
                      //        },
                      //        Show:{
                      //            text: 'Chi tiết',
                      //            action: function(){
                      //                $(location).prop('href', "/Unit/Unit/detail/" + self.uuid + "/");
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
         formData = new FormData($('#UnitUnitCreateFormId')[0]);

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
        
        // var file_eles = $(".Unit-Unit");
        // for (var i = 0; i < file_eles.length; i++) {
            
        //     console.log('file_eles[i] = ', file_eles[i]);
        //     var files = file_eles[i].files;
        //     // Check file selected or not
        //     if(files.length > 0 ) {
        //         formData.append(file_eles[i].getAttribute('name'), files[0]);
        //     }
        // }
        
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
        //     var code = formData.get('code')
        // // alert(dcode)
        //     CheckUnique(code)

            $.ajax({
                url: UnitList_URL + self.id + "/",
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
                      self = new UnitUnit(data);
                      UnitUnitGetDataTable(UnitUnitpagination["current_page"]);
                        // self = new UnitUnit(data);
                        
                        // UnitUnitGetDataTable(UnitUnittpagination["current_page"])
                        //$(location).prop('href', "/Account/Account/detail/" + self.uuid + "/");
                        if(is_continue_form){
                            is_continue_form=false;
                            if(!is_notification && (is_done||!is_has_children)){
                                is_notification = true;
                                toastr.success('Cập nhật thành công');
                            }
                            $(location).prop('href', "/Unit/Unit/create/");
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
                    $(location).prop('href', "/Unit/Unit/create/");
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
          $('#idUnitUnitInputId').val(null);
          $('#uuidUnitUnitInputId').val(uuidv4());
          var self = this;
          var formData;
          var form ;
          var arr_table = [];
          if(formId==null){
           formData = new FormData($('#UnitUnitCreateFormId')[0]);
  
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
          
          var file_eles = $(".Unit-Unit");
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
              LoadUnitUnitList();
          }
          if(!is_save_self_table){
            var code = formData.get('code')
            CheckUnique(code)
                  $.ajax({
                  url: UnitList_URL,
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
                          self = new UnitUnit(data);
                          LoadUnitUnitList();
                          UnitUnitGetDataTable(UnitUnitpagination["current_page"]);
                          if(is_continue_form){
                              is_continue_form=false;
                              if(!is_notification){
                                  is_notification = true;
                                  toastr.success('Thêm mới thành công');
                              }
                              
  
                              $(location).prop('href', "/Unit/Unit/create/");
                          }else if(is_continue_modal){
                              is_continue_modal=false;
                              UnitRefreshCreateModal();
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
                            $("UnitUnitCancelCreateModalBtnId").click();

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
                  $(location).prop('href', "/Unit/Unit/create/");
              }else if(is_continue_modal){
                  is_continue_modal=false;
                  UnitRefreshCreateModal();
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
    //           url: UnitList_URL,
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
              url: UnitList_URL,
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
                          url: UnitList_URL + uuid + "/",
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
              url: UnitList_URL + uuid_go + "/",
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
                  UnitUnitGetDataTable(UnitUnitpagination["current_page"]);
                  if(cr_uuid!=""){
                      $(location).prop('href', "/Unit/Unit/create/");
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
                  UnitUnitSearchData(UnitUnitpagination["current_page"],"filter",data_search);
                  if(cr_uuid!=""){
                      $(location).prop('href', "/Unit/Unit/create/");
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
              url: UnitUnit_REMOVEFILE_URL+uuid+"/",
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
              url: UnitList_URL+uuid+"/",
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
              url: UnitList_URL+has_go_page,
              type: "GET",
              //async: false,
              cache: false,
              timeout: 30000,
  
              success: function (data) {
                  console.log('[tGetAllObjApi] data = ', data);
                  // return new UnitUnit(data);
                  if (data.hasOwnProperty('count')){
                      UnitUnitpagination["total"]=data.count;
                  }
                  if (data.hasOwnProperty('count')){
                      UnitUnitpagination["total"]=data.count;
                  }
                  if (data.hasOwnProperty('next')){
                      if(data.next != null){
                      UnitUnitpagination["has_next"]=true;
                      }else{
                      UnitUnitpagination["has_next"]=false;
  
                      }
                  }
                  UnitUnitpagination["current_page"]=page;
                  if (data.hasOwnProperty('previous')){
                      if(data.previous != null){
                      UnitUnitpagination["has_prev"]=true;
                      }else{
                      UnitUnitpagination["has_prev"]=false;
                      }
                  }
                  if (data.hasOwnProperty('results')){
                      for (var j=0; j < data.results.length; j++){
                          var tmp = new UnitUnit(data.results[j]);
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
              url: UnitList_URL+has_go_page,
              type: "GET",
              //async: false,
              cache: false,
              timeout: 30000,
  
              success: function (data) {
                  console.log('[tGetAllObjLargeApi] data = ', data);
                  // return new UnitUnit(data);
                  if (data.hasOwnProperty('count')){
                      UnitUnitpagination["total"]=data.count;
                  }
                  if (data.hasOwnProperty('count')){
                      UnitUnitpagination["total"]=data.count;
                  }
                  if (data.hasOwnProperty('next')){
                      if(data.next != null){
                      UnitUnitpagination["has_next"]=true;
                      }else{
                      UnitUnitpagination["has_next"]=false;
  
                      }
                  }
                  UnitUnitpagination["current_page"]=page;
                  if (data.hasOwnProperty('previous')){
                      if(data.previous != null){
                      UnitUnitpagination["has_prev"]=true;
                      }else{
                      UnitUnitpagination["has_prev"]=false;
                      }
                  }
                  if (data.hasOwnProperty('results')){
                      for (var j=0; j < data.results.length; j++){
                          var tmp = new UnitUnit(data.results[j]);
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
              SEARCH_URL=UnitUnit_FILTER_URL;
              
                  slugSearch="&";
              
                                  if($("#nameUnitUnitFilterSearchInputId").length>0
                                    ||$("#companyUnitUnitFilterSearchInputId").length>0){
                                      var value_name=$("#nameUnitUnitFilterSearchInputId").val();
                                      var value_company=$("#companyUnitUnitFilterSearchInputId").val();
                                      if((value_name!="" && value_name!= null ) 
                                      ||(value_company!=""&& value_company!= null)){
                                           slugSearch+="name__contains="+value_name+"&company="+value_company;
                                      }
                                  }
                                  
                              slugSearch=slugSearch.slice(0,-1);
          }else{
              SEARCH_URL=UnitUnit_SEARCH_URL;
              
                  slugSearch="&";
                  slugSearch+="search="+$("#UnitUnitQuickSearchInputId").val();
              
          }
          if(search_data!=null){
              SEARCH_URL=UnitUnit_FILTER_URL;
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
                  // return new UnitUnit(data);
                  if (data.hasOwnProperty('count')){
                      UnitUnitpagination["total"]=data.count;
                  }
                  if (data.hasOwnProperty('count')){
                      UnitUnitpagination["total"]=data.count;
                  }
                  if (data.hasOwnProperty('next')){
                      if(data.next != null){
                      UnitUnitpagination["has_next"]=true;
                      }else{
                      UnitUnitpagination["has_next"]=false;
  
                      }
                  }
                  UnitUnitpagination["current_page"]=page;
                  if (data.hasOwnProperty('previous')){
                      if(data.previous != null){
                      UnitUnitpagination["has_prev"]=true;
                      }else{
                      UnitUnitpagination["has_prev"]=false;
                      }
                  }
                  if (data.hasOwnProperty('results')){
                      for (var j=0; j < data.results.length; j++){
                          var tmp = new UnitUnit(data.results[j]);
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
              SEARCH_URL= UnitUnit_SEARCH_URL;
              
                  slugSearch="&";
              
                                  if($("#nameUnitUnitFilterSearchInputId").length>0){
                                      var value=$("#nameUnitUnitFilterSearchInputId").val();
                                      if(value!="" && value!=null){
                                          slugSearch+="name__contains="+value+"&";
                                      }
                                  }
                                  
                              slugSearch=slugSearch.slice(0, -1);
          }else{
              SEARCH_URL= UnitUnit_SEARCH_URL;
              
                  slugSearch="&";
                  slugSearch+="search="+$("#UnitUnitQuickSearchInputId").val();
              
          }
          if(search_data!=null){
              SEARCH_URL=UnitUnit_SEARCH_URL;
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
                  // return new UnitUnit(data);
                  if (data.hasOwnProperty('count')){
                      UnitUnitpagination["total"]=data.count;
                  }
                  if (data.hasOwnProperty('count')){
                      UnitUnitpagination["total"]=data.count;
                  }
                  if (data.hasOwnProperty('next')){
                      if(data.next != null){
                      UnitUnitpagination["has_next"]=true;
                      }else{
                      UnitUnitpagination["has_next"]=false;
  
                      }
                  }
                  UnitUnitpagination["current_page"]=page;
                  if (data.hasOwnProperty('previous')){
                      if(data.previous != null){
                      UnitUnitpagination["has_prev"]=true;
                      }else{
                      UnitUnitpagination["has_prev"]=false;
                      }
                  }
                  if (data.hasOwnProperty('results')){
                      for (var j=0; j < data.results.length; j++){
                          var tmp = new UnitUnit(data.results[j]);
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
              url: UnitList_URL+uuid+"/",
              type: "GET",
              async: false,
              cache: false,
              timeout: 30000,
  
              success: function (data) {
                  console.log('[tGetObjApi] data = ', data);
                  var n_obj = new UnitUnit(data);
                  console.log('n_obj = ', n_obj);
                  n_obj.tFillForm();
                  return n_obj;
                  // if (data.hasOwnProperty('results')){
                  //    if (data.results.length > 0){
                  //        var tmp = new UnitUnit(data[i]);
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
          var tbId = "UnitUnitDataTableId";
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
          var tbId = "UnitUnitDataTableId";
          var table = $("#" + tbId);
          if (table.length > 0){
              var tableData = table.DataTable();
              var rowData = [
                  `<a href="` + this.detailUrl + `">` + Unit_ID_TABLE_COUNT + `</a>`,
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
       
          var tbId = "UnitUnitDataTableId";
          if(tableId!=null){
              tbId = tableId;
          }
  
          if(order==null){
          order=Unit_ID_TABLE_COUNT;
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
                                              <i class="fas fa-times" style="color:gray" file-uuid="` + this["uuid"] + `" id="` + this["uuid"] + `btnDeleteId" onclick="avatarUnitUnitDeletedAttacthment(this)"></i>
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
                                          <input class="custom-control-input" id="${this["uuid"]}is_callbotUnitUnitSwitchListTablebtnId" name="`+ attr +`" data-uuid="` + this["uuid"] + `" type="checkbox"  `+value+` onclick="is_callbotUnitUnitEventChangeSwitcher(this)">
                                      <label class="custom-control-label" for="${this["uuid"]}is_callbotUnitUnitSwitchListTablebtnId"></label>
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
                                          <input class="custom-control-input" id="${this["uuid"]}is_chatbotUnitUnitSwitchListTablebtnId" name="`+ attr +`" data-uuid="` + this["uuid"] + `" type="checkbox"  `+value+` onclick="is_chatbotUnitUnitEventChangeSwitcher(this)">
                                      <label class="custom-control-label" for="${this["uuid"]}is_chatbotUnitUnitSwitchListTablebtnId"></label>
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
                                          <input class="custom-control-input" id="${this["uuid"]}log_confirm_by_emailUnitUnitSwitchListTablebtnId" name="`+ attr +`" data-uuid="` + this["uuid"] + `" type="checkbox"  `+value+` onclick="log_confirm_by_emailUnitUnitEventChangeSwitcher(this)">
                                      <label class="custom-control-label" for="${this["uuid"]}log_confirm_by_emailUnitUnitSwitchListTablebtnId"></label>
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
                                          <input class="custom-control-input" id="${this["uuid"]}logged_with_passwordUnitUnitSwitchListTablebtnId" name="`+ attr +`" data-uuid="` + this["uuid"] + `" type="checkbox"  `+value+` onclick="logged_with_passwordUnitUnitEventChangeSwitcher(this)">
                                      <label class="custom-control-label" for="${this["uuid"]}logged_with_passwordUnitUnitSwitchListTablebtnId"></label>
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
                                          <input class="custom-control-input" id="${this["uuid"]}created_free_licenseUnitUnitSwitchListTablebtnId" name="`+ attr +`" data-uuid="` + this["uuid"] + `" type="checkbox"  `+value+` onclick="created_free_licenseUnitUnitEventChangeSwitcher(this)">
                                      <label class="custom-control-label" for="${this["uuid"]}created_free_licenseUnitUnitSwitchListTablebtnId"></label>
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
                                          <input class="custom-control-input" id="${this["uuid"]}email_activatedUnitUnitSwitchListTablebtnId" name="`+ attr +`" data-uuid="` + this["uuid"] + `" type="checkbox"  `+value+` onclick="email_activatedUnitUnitEventChangeSwitcher(this)">
                                      <label class="custom-control-label" for="${this["uuid"]}email_activatedUnitUnitSwitchListTablebtnId"></label>
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
                          html +=`<td class="text-wrap" style="min-width:300px" onclick="UnitUnitDetails('`+this["uuid"]+`')"><a>` + (this[attr]) + `</a></td>`;
                              continue;
                      }
                      
                      //html +=`<td class="text-wrap"><a>` + (this[attr]) + `</a></td>`;
                      html +=`<td class="text-wrap"><a>` + (this[attr]) + `</a></td>`;
                  }
                  
                  else{
                      if(attr=="Unit-admin-action")
                      {
                          html +=BindActionButtonVer4(
                              UnitUnit_arr_action,
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
                                          <input class="custom-control-input" id="${this["uuid"]}is_callbotUnitUnitSwitchListTablebtnId" name="`+ attr +`" data-uuid="` + this["uuid"] + `" type="checkbox"  `+value+` onclick="is_callbotUnitUnitEventChangeSwitcher(this)">
                                      <label class="custom-control-label" for="${this["uuid"]}is_callbotUnitUnitSwitchListTablebtnId"></label>
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
                                          <input class="custom-control-input" id="${this["uuid"]}is_chatbotUnitUnitSwitchListTablebtnId" name="`+ attr +`" data-uuid="` + this["uuid"] + `" type="checkbox"  `+value+` onclick="is_chatbotUnitUnitEventChangeSwitcher(this)">
                                      <label class="custom-control-label" for="${this["uuid"]}is_chatbotUnitUnitSwitchListTablebtnId"></label>
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
                                          <input class="custom-control-input" id="${this["uuid"]}log_confirm_by_emailUnitUnitSwitchListTablebtnId" name="`+ attr +`" data-uuid="` + this["uuid"] + `" type="checkbox"  `+value+` onclick="log_confirm_by_emailUnitUnitEventChangeSwitcher(this)">
                                      <label class="custom-control-label" for="${this["uuid"]}log_confirm_by_emailUnitUnitSwitchListTablebtnId"></label>
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
                                          <input class="custom-control-input" id="${this["uuid"]}logged_with_passwordUnitUnitSwitchListTablebtnId" name="`+ attr +`" data-uuid="` + this["uuid"] + `" type="checkbox"  `+value+` onclick="logged_with_passwordUnitUnitEventChangeSwitcher(this)">
                                      <label class="custom-control-label" for="${this["uuid"]}logged_with_passwordUnitUnitSwitchListTablebtnId"></label>
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
                                          <input class="custom-control-input" id="${this["uuid"]}created_free_licenseUnitUnitSwitchListTablebtnId" name="`+ attr +`" data-uuid="` + this["uuid"] + `" type="checkbox"  `+value+` onclick="created_free_licenseUnitUnitEventChangeSwitcher(this)">
                                      <label class="custom-control-label" for="${this["uuid"]}created_free_licenseUnitUnitSwitchListTablebtnId"></label>
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
                                          <input class="custom-control-input" id="${this["uuid"]}email_activatedUnitUnitSwitchListTablebtnId" name="`+ attr +`" data-uuid="` + this["uuid"] + `" type="checkbox"  `+value+` onclick="email_activatedUnitUnitEventChangeSwitcher(this)">
                                      <label class="custom-control-label" for="${this["uuid"]}email_activatedUnitUnitSwitchListTablebtnId"></label>
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
          var tbId = "UnitUnitDataTableId";
          if(tableId!=null){
              tbId = tableId;
          }
  
          if(order==null){
          order=Unit_ID_TABLE_COUNT;
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
                      if(attr=="Unit-admin-action")
                      {
                          html +=`<td class="text-center d-none">
                          <a  onclick="Unit`+action+`DeteleRowAddingTable(this)"> &nbsp;
                              <i title="Xóa" class="fas fa-trash" onclick="Unit`+action+`DeteleRowAddingTable(this)"></i>&nbsp;
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
          var card_Id = "UnitUnitCardAreaId";
          if(cardId!=null){
              card_Id = cardId;
          }
  
          if(order==null){
          order=Unit_ID_TABLE_COUNT;
          }
          var card_area = $("#" + card_Id);
          if (card_area.length > 0){
              var card_template = card_area.find(".UnitUnitTemplateCardClass");
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
                                              <i class="fas fa-times" style="color:gray" file-uuid="` + this["uuid"] + `" id="` + this["uuid"] + `btnDeleteId" onclick="avatarUnitUnitDeletedAttacthment(this)"></i>
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
                              $(hEle).html(`<a onclick="UnitUnitDetails('`+this["uuid"]+`')">` + (this[attr]) + `</a>`);
                              continue;
                          }
                          $(hEle).html(`<a>` + (this[attr]) + `</a>`);
  
                      }
                  }
                  var action_button = BindActionButtonVer5(
                                  UnitUnit_arr_action,
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
              
              
  class UnitUnit_ListItem {
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
              
  
  var UnitUnitList_CACHE = [];
  // ########## Get List Class ##############
  class UnitUnitList {
      // ########## Init Objects ##############
      getListApi(){
          this.callAjax = null
          $.ajaxSetup({
              headers : {
                  'CSRFToken' : getCSRFTokenValue(),
                  'X-CSRFToken' : getCSRFTokenValue(), // for --> SessionAuthentication
              },
              tryCount : 0,
              retryLimit : 3,
          });
          this.callAjax = $.ajax({
              url: UnitList_URL,
              type: "GET",
              async: false,
              cache: false,
              timeout: 30000,
  
              success: function (data) {
                  UnitUnitList_CACHE = []
                  console.log(data);
                  if (data.hasOwnProperty('results')){
                      for (var i = 0; i < data.results.length; i++){
                          var x = new UnitUnit_ListItem(data.results[i]);
                          UnitUnitList_CACHE.push(x);
                      }
                  }else{
                      for (var i = 0; i < data.length; i++){
                          var x = new UnitUnit_ListItem(data[i]);
                          UnitUnitList_CACHE.push(x);
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
          return UnitUnitList_CACHE;
      }
  
  }
  
      
  $(document).ready( function () {
     const UnitUnitdatatablesSimple = document.getElementById('UnitUnitDataTableId');
      if (UnitUnitdatatablesSimple) {
          new simpleDatatables.DataTable(UnitUnitdatatablesSimple,{
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
  function tTestUnitUnit(type_action=null){
      var b_json = genUnitUnit();
      console.log("b_json = ", b_json);
      // var d_obj = new UnitUnit(b_json);
      var d_obj = new UnitUnit(b_json);
      // console.log('d_obj.tCreatePostApi()...', d_obj.tCreatePostApi());
      // console.log('d_obj.tCreateNewPostFormApi()...', d_obj.tCreateNewPostFormApi());
      // console.log('d_obj.tUpdatePostApi()...', d_obj.tUpdatePostApi());
      // var d_obj = new UnitUnitList();
      // console.log('d_obj.getListApi()...', d_obj.getListApi());
      console.log("d_obj = ", d_obj);
      if(type_action=='Edit'){
  
          d_obj.uuid=cr_uuid;
      }
      d_obj.tFillForm();
      console.log("Fill form done...");
  }
  
  // ########## tTest function ##############
  function tTestInModalUnitUnit(type_action){
      var form_type = type_action+"Modal";
      var b_json = genUnitUnit(form_type);
      console.log("b_json = ", b_json);
      // var d_obj = new UnitUnit(b_json);
      var d_obj = new UnitUnit(b_json);
      // console.log('d_obj.tCreatePostApi()...', d_obj.tCreatePostApi());
      // console.log('d_obj.tCreateNewPostFormApi()...', d_obj.tCreateNewPostFormApi());
      // console.log('d_obj.tUpdatePostApi()...', d_obj.tUpdatePostApi());
      // var d_obj = new UnitUnitList();
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
      $("#UnitUnitQuickSearchInputId").on('keyup', function(e) {
          if (e.key === 'Enter' || e.keyCode === 13) {
              UnitUnitpagination={
                  current_page:1,
                  total:0,
                  has_next:false,
                  has_prev:false
              }
              UnitUnitSearchData(UnitUnitpagination["current_page"],"quick");
          }
      })
      $("#UnitUnitQuickSearchBtnId").click(function(){
          UnitUnitpagination={
              current_page:1,
              total:0,
              has_next:false,
              has_prev:false
          }
          UnitUnitSearchData(UnitUnitpagination["current_page"],"quick");
      })
      $("#UnitUnitSearchBtnId").click(function(){
          UnitUnitpagination={
              current_page:1,
              total:0,
              has_next:false,
              has_prev:false
      }
          UnitUnitSearchData(UnitUnitpagination["current_page"],"filter");
      })
  });
  
      
  
  // ########## [Search Button] Clicked Handle function ##############
//   $(document).ready(function(){
  
//       $("#UnitUnitExportExcelBtnId").click(function(){
//           var is_export = true;
//           if(search_log["search_func"] == "UnitUnitGetDataTable"){
//                   UnitUnitGetLargeDataTable(1,search_log["search_data"],is_export,UnitUnitExportExcel);
//           }
//           else if(search_log["search_func"] == "UnitUnitSearchData"){
//                   UnitUnitSearchLargeData(1,search_log["search_type"],search_log["search_data"],is_export,UnitUnitExportExcel);
//           } 
          
//       })
//   }); 
  
//   function UnitUnitExportExcel(){
  
//       var table=$('#UnitUnitExportTableId');
//       var count_cols = table.find("th").length;
//       if(table.find("td").length>0){
//           table.tableExport({
//                   filename: 'thông_tin_nhân_viên_%DD%-%MM%-%YY%',
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
    $('#UnitUnitExportExcelBtnId').click(function () {
        // Define the columns to export
        var columnsToExport = [0, 1, 2, 3, 4, 5, 6]; // columns 1, 2, and 4 (zero-indexed)
        var theadToExport = '';
        $('#UnitUnitDataTableId thead').each(function () {
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
        $('#UnitUnitDataTableId tbody tr').each(function () {
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
            filename: 'thông_tin_nhân_viên_%DD%-%MM%-%YY%',
            format: 'xls',
            escape: 'false',

        });
    });
});
  
  // ########## [Save Button] Clicked Handle function ##############
  
  $(document).ready(function(){
      $("#UnitUnitCreateBtnId").click(function(){
          obj = new UnitUnit();
          console.log('Save obj = ', obj);
          obj.tCreateNewPostFormApi();
      })
  });

// function UnitUnitSave(){
    $("#UnitUnitCreateBtnId").click(function(){
        obj = new UnitUnit();
        console.log('Save obj = ', obj);
        obj.tCreateNewPostFormApi();
    })


  
  // ########## [Save Button] Clicked Handle function ##############
  
  $(document).ready(function(){
      $("#UnitUnitUpdateModalBtnId").click(function(){
          obj = new UnitUnit();
          console.log('Update obj = ', obj);
          obj.tUpdatePostApi('UnitUnitEditmodalsId');
      })
  });
  
      
  
  // ########## [Create New Button] Clicked Handle function ##############
  var is_continue_modal=false;
  var is_continue_form=false;
  $(document).ready(function(){
      $("#UnitUnitSaveAndNewBtnId").click(function(){
          is_continue_form=true;
          obj = new UnitUnit();
          console.log('Save obj and create new, obj = ', obj);
          obj.tCreateNewPostFormApi();
      })
  });
  
      
  
  // ########## [Delete Button] Clicked Handle function ##############
  
  $(document).ready(function(){
      $("#UnitUnitDeleteBtnId").click(function(){
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
                      obj = new UnitUnit();
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
      $("#UnitUnitCancelCreateModalBtnId").click(function(){
          $(':input','#UnitUnitCreatemodalsId')
    .not(':button, :submit, :reset, :hidden')
    .val('').trigger('change')
    .removeAttr('checked')
    .removeAttr('selected');
      })
      $("#UnitUnitCancelEditModalBtnId").click(function(){
          $(':input','#UnitUnitEditmodalsId')
    .not(':button, :submit, :reset, :hidden')
    .val('').trigger('change')
    .removeAttr('checked')
    .removeAttr('selected');
      })
      $("#UnitUnitCancelDetailModalBtnId").click(function(){
          $(':input','#UnitUnitDetailmodalsId')
    .not(':button, :submit, :reset, :hidden')
    .val('').trigger('change')
    .removeAttr('checked')
    .removeAttr('selected');
      })
  });
  
      
  
  // ########## [Cancel Button] Clicked Handle function ##############
  
  function UnitRefreshCreateModal() {
      $('#UnitUnitCreatemodalsId')
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
  
  $('#UnitUnitCreatemodalsId').on('hidden.bs.modal', function (e) {
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
            var table = new UnitUnitcreateTnvTable($(this));
            table.refresh(); 
      })
         
  })
  $('#UnitUnitEditmodalsId').on('hidden.bs.modal', function (e) {
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
            var table = new UnitUniteditTnvTable($(this));
            table.refresh(); 
      })
  })
  $('#UnitUnitDetailmodalsId').on('hidden.bs.modal', function (e) {
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
            var table = new UnitUnitdetailTnvTable($(this));
            table.refresh(); 
          })
  })
  });
  
      
  


    // $(document).ready(function(){
    //     $("#UnitUnitCreateModalBtnId").click(function(){
    //         var validate_obj = new InputValidation('UnitUnitCreateModalsFormId');
    //         if(validate_obj.validateRequired()){
    //             toastr.warning('Vui lòng điền đầy đủ thông tin');
    //             return;
    //         }
    //         var obj_check = new Object();
    //         obj_check.code = $("#codeUnitUnitCreateModalInputId").val();
    //         $.ajax({
    //             url: UnitList_URL,
    //             data: JSON.stringify(obj_check),
    //             type: 'POST',
    //             dataType: 'json',
    //             contentType: "application/json; charset=utf-8",
    //             complete: function (res, status, result) {
    //                 console.log(res.responseJSON)
    //                 if (res.responseJSON.result == "Not-Duplicate") {
    //                     console.log('Not_Duplicate');
    //                     tCreateNewPostFormApi();
    //                 } else if(res.responseJSON.result == "Duplicate") {
    //                     toastr.error('Đã có');
    //                     console.log('Duplicate');
    //                 }
    //             }
    //         });
    //         // obj = new UnitUnit();
    //         //         console.log('Save obj = ', obj);
    //         //         obj.tCreateNewPostFormApi('UnitUnitCreateModalsFormId');
    //     })
    // });


  // ########## [Save Button] Clicked Handle function ##############
  
    $(document).ready(function(){
    $("#UnitUnitCreateModalBtnId").click(function(){
        var validate_obj = new InputValidation('UnitUnitCreateModalsFormId');
        if(validate_obj.validateRequired()){
            toastr.warning('Vui lòng điền đầy đủ thông tin');
            return;
        }
        obj = new UnitUnit();
        console.log('Save obj = ', obj);
        obj.tCreateNewPostFormApi('UnitUnitCreateModalsFormId');
    })
});
      
  

  // ########## [Save Button] Clicked Handle function ##############
  
  $(document).ready(function(){
      $("#UnitUnitUpdateModalBtnId").click(function(){
          var validate_obj = new InputValidation('UnitUnitEditModalsFormId');
          if(validate_obj.validateRequired()){
              toastr.warning('Vui lòng điền đầy đủ thông tin');
              return;
  
          }
          obj = new UnitUnit();
          console.log('Update obj = ', obj);
          obj.tUpdatePostApi('UnitUnitEditModalsFormId');
      })
  });
  

 
      
  
  // ########## [Create New Button] Clicked Handle function ##############
  
  $(document).ready(function(){
      $("#UnitUnitSaveAndNewModalBtnId").click(function(){
          obj = new UnitUnit();
          console.log('Save obj and create new, obj = ', obj);
          is_continue_modal=true;
  
          obj.tCreateNewPostFormApi('UnitUnitCreateModalsFormId');
          
      })
  });
  
      
  
  // ########## [Get List, push options to Select] Handle Event function ##############
  function LoadUnitUnitList(){
  
  if ($("Unit-Unit-select").length > 0){
          var obj = new UnitUnitList();
          UnitUnitList_CACHE = obj.getListApi();
          var crr = null;
          for (l = 0; l < UnitUnitList_CACHE.length; l++){
              crr = UnitUnitList_CACHE[l]
              // $(this).append(new Option(crr.name, crr.id));
              $(".Unit-Unit-select").append(new Option(crr.name, crr.uuid));
          }
      }
  }
  $(document).ready(function(){
       LoadUnitUnitList();
  })

  List_Unit = []
  $(document).ready(function(){
    var obj = new UnitUnitList();
    List_Unit = obj.getListApi();
    obj.callAjax.then(function(data){
        List_Unit = data.results;
    });
    
})
  
  
  // ########## [Fill Table] Handle Event function ##############
  var UnitUnitpagination={
      current_page:1,
      total:0,
      has_next:false,
      has_prev:false
  }
  var UnitUnitrecord_in_page = 5;
  
  $(document).ready(function(){
    
      var IdTable ="UnitUnitTableBodyId";
      var checker = $("#" +IdTable );
      if (checker.length > 0){
    
          if($('#'+IdTable).is(":visible")){
              UnitUnitGetDataTable(UnitUnitpagination["current_page"]);
          }
      }
  })
  var record_in_page = 5;
  var search_log = {
      search_func:"",
      search_data:"",
      search_type:"",
  }
  function UnitUnitGetDataTable(page=1,search_data=null){
          search_log["search_func"] = "UnitUnitGetDataTable";
          search_log["search_data"] = search_data;
          search_log["search_type"] = "";
  
          var obj = new UnitUnit();
          var results = obj.tGetAllObjApi(page,search_data);
          obj.callAjax.then(function(data) {
          $("#UnitUnitTableBodyId").empty();
          var body = $("#UnitUnitDataTableId");
          //if (body.length > 0){
          //    var bodyTable = body.DataTable();
          //    bodyTable.clear();
          //}
          Unit_ID_TABLE_COUNT = 1;
          var crr_record_in_page = UnitUnitrecord_in_page;
  
          if(page>1){
          Unit_ID_TABLE_COUNT =1+crr_record_in_page*page-crr_record_in_page
          }
          for (var i = 0; i < results.length; i++){
              try{
                  console.log('results[i] = ', results[i]);
              
                  //results[i].tFillTable2();
                  results[i].tFillTable3();
                //   results[i].tFillCard();
  
                  Unit_ID_TABLE_COUNT++;
                  // results[i].tFillTable1();
              }
              catch(err){
                  console.log(err);
              }
          }
          var pagenation_ele=$(".pagination-UnitUnit");
          var pagination=UnitUnitpagination;
          pagenation_ele.html('');
          var page_total_ele = $(".page-total-UnitUnit");
          page_total_ele.html(`<footer class="mt-3 blockquote-footer">Tổng số: ${pagination["total"]} bản ghi </footer>`);
          if (results.length > 0) {
              
                      pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="UnitUnitGetDataTable(1)"><<</a></li>`);
                      if (pagination["has_prev"] == true) {
                          pagenation_ele.append('<li class="page-item"><a class="page-link" onclick="UnitUnitGetDataTable(' + (parseInt(pagination["current_page"]) - 1) + ')">' + (parseInt(pagination["current_page"]) - 1) + '</a></li>');
                      }
                      pagenation_ele.append('<li class="page-item "><a class="page-link" >' + (parseInt(pagination["current_page"])) + '</a></li>');
                      if (pagination["has_next"] == true) {
                          pagenation_ele.append('<li class="page-item"><a class="page-link" onclick="UnitUnitGetDataTable(' + (parseInt(pagination["current_page"]) + 1) + ')">' + (parseInt(pagination["current_page"]) + 1) + '</a></li>');
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
                      pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="UnitUnitGetDataTable(`+last_page_order+`)">>></a></li>`);
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
      var checker = $("#UnitUnitFormId");
      if (checker.length > 0){
           cr_uuid = checker.attr('data-uuid');
          if (typeof cr_uuid !== 'undefined' && cr_uuid !== false){
              console.log('cr_uuid = ', cr_uuid);
              var obj = new UnitUnit();
              obj.tGetObjApi(cr_uuid);
          }
      }
      checker = $("#UnitUnitDetailFormId");
      if (checker.length > 0){
           cr_uuid = checker.attr('data-uuid');
          if (typeof cr_uuid !== 'undefined' && cr_uuid !== false){
              console.log('cr_uuid = ', cr_uuid);
              var obj = new UnitUnit();
              obj.tGetObjApi(cr_uuid);
          }
      }
      checker = $("#UnitUnitEditFormId");
      if (checker.length > 0){
           cr_uuid = checker.attr('data-uuid');
          if (typeof cr_uuid !== 'undefined' && cr_uuid !== false){
              console.log('cr_uuid = ', cr_uuid);
              var obj = new UnitUnit();
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
      $("#UnitUnitTestBtnId").click(function(){
          tTestUnitUnit();
      })
       $("#UnitUnitTestEditBtnId").click(function(){
          tTestUnitUnit('Edit');
      })
      $("#UnitUnitTestCreateModalBtnId").click(function(){
          tTestInModalUnitUnit('Create');
  
      })
       $("#UnitUnitTestEditModalBtnId").click(function(){
          tTestInModalUnitUnit('Edit');
      })
  });
  
      
      
      // ########## [Fill Table bySearch] Handle Event function ##############
      function UnitUnitSearchData(page=1,search_type,search_data=null){
          search_log["search_func"] = "UnitUnitSearchData";
          search_log["search_type"] = search_type;
          search_log["search_data"] = search_data;
              var obj = new UnitUnit();
              var results = obj.tSearchAllObjApi(page,search_data,search_type);
              obj.callAjax.then(function(data) {
              $("#UnitUnitTableBodyId").empty();
              var body = $("#UnitUnitDataTableId");
              //if (body.length > 0){
              //    var bodyTable = body.DataTable();
              //    bodyTable.clear();
              //}
              Unit_ID_TABLE_COUNT = 1;
              crr_record_in_page = UnitUnitrecord_in_page;
              if(page>1){
              Unit_ID_TABLE_COUNT =1+crr_record_in_page*page-crr_record_in_page;
              }
              for (var i = 0; i < results.length; i++){
                  try{
                      console.log('results[i] = ', results[i]);
      
                      //results[i].tFillTable2();
                      results[i].tFillTable3();
      
                      Unit_ID_TABLE_COUNT++;
                      // results[i].tFillTable1();
                  }
                  catch(err){
                      console.log(err);
                  }
              }
              search_type = search_type.trim()
              var pagination = UnitUnitpagination;
              var pagenation_ele=$(".pagination-UnitUnit");
              pagenation_ele.html('');
              var page_total_ele = $(".page-total-UnitUnit");
              page_total_ele.html(`<footer class="blockquote-footer">Tổng số: ${pagination["total"]} bản ghi </footer>`);
              
              if (results.length > 0) {
                      pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="UnitUnitSearchData(1,'`+search_type+`'`+ `,'`+search_data+`'`+ `)"><<</a></li>`);
  
                      if (pagination["has_prev"] == true) {
                          pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="UnitUnitSearchData(` + (parseInt(pagination["current_page"]) - 1) +`,'`+search_type+`'`+ `,'`+search_data+`'`+ `)">` + (parseInt(pagination["current_page"]) - 1) + `</a></li>`);
                      }
                      pagenation_ele.append('<li class="page-item active"><a class="page-link" >' + (parseInt(pagination["current_page"])) + '</a></li>');
                      if (pagination["has_next"] == true) {
                          pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="UnitUnitSearchData(` + (parseInt(pagination["current_page"]) + 1) +`,'`+search_type+`'`+ `,'`+search_data+`'`+ `)">` + (parseInt(pagination["current_page"]) + 1) + `</a></li>`);
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
                      pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="UnitUnitSearchData(`+last_page_order+`,'`+search_type+`'`+ `,'`+search_data+`'`+ `)">>></a></li>`);
                      }
                  }
                  if (search_type == "quick") {
                      var crr_txt = $("#UnitUnitQuickSearchInputId").val();
                      highlight(crr_txt,"#UnitUnitTableBodyId");
                  }
          })
      
      }
      
          
      
      // ########## [Fill Table bySearch] Handle Event function ##############
      function UnitUnitSearchLargeData(page=1,search_type,search_data=null,is_export,ExportFunc){
              var obj = new UnitUnit();
              var tbId = "UnitUnitExportTableId"
              var results = obj.tSearchLargeObjApi(page,search_data,search_type);
              obj.callAjax.then(function(data) {
              $("#"+tbId).find("table").empty();
              UnitUnit_ID_TABLE_COUNT = 1;
              for (var i = 0; i < results.length; i++){
                  try{
                      console.log('results[i] = ', results[i]);
                      results[i].tFillTable3(tbId);
                      results[i].tFillCard();
  
                      UnitUnit_ID_TABLE_COUNT++;
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
      function UnitUnitGetLargeDataTable(page=1,search_data=null,is_export,ExportFunc){
              var obj = new UnitUnit();
              var tbId = "UnitUnitExportTableId"
              var results = obj.tGetAllObjLargeApi(page,search_data);
              obj.callAjax.then(function(data) {
              $("#"+tbId).find("table").empty();
              UnitUnit_ID_TABLE_COUNT = 1;
              for (var i = 0; i < results.length; i++){
                  try{
                      console.log('results[i] = ', results[i]);
                      results[i].tFillTable3(tbId);
                      results[i].tFillCard();
                      UnitUnit_ID_TABLE_COUNT++;
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
      var Unit_ID_INLINE_TABLE_COUNT;
      function UnitUnitFillTableInForm(page=1,search_data=null,tableId=null,action="detail"){
              var obj = new UnitUnit();
              var results = obj.tSearchLargeObjApi(page,search_data,"filter",tableId);
              obj.callAjax.then(function(data) {
                  Unit_ID_INLINE_TABLE_COUNT = 1;
                  if(page>1){
                  Unit_ID_INLINE_TABLE_COUNT =1+10*page -10;
                  }
                  if(action=="detail"){
                      $("#"+tableId).find('tbody').empty();
                      for (var i = 0; i < results.length; i++){
                      try{
                          console.log('results[i] = ', results[i]);
                          results[i].tFillTable4(tableId,Unit_ID_INLINE_TABLE_COUNT,action);
                          Unit_ID_INLINE_TABLE_COUNT++;
                      }
                      catch(err){
                          console.log(err);
                      }
                      }
                  }
                  else if(action=="edit"){
                      var table = new UnitUniteditTnvTable($("#"+tableId)[0]);
                      table.bindRows(results);
                  }
              })
              
      
      }
      
    
      

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
                    url: CompanyList_URL,
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
                            $("#companyUnitUnitCreateModalInputId").append(event_data);
                            $("#companyUnitUnitEditModalInputId").append(event_data);
                            $("#companyUnitUnitFilterSearchInputId").append(event_data);
                           
    
                        }
                    },
                    error:function (xhr, ajaxOptions, thrownError) {
                        console.log(xhr.status);
                        console.log(thrownError);
                    }
            });
    });



    



function CheckUnique(code) {
        var slugSearch = "?search=" + code
        $.ajax({
            url: UnitUnit_SEARCH_URL + slugSearch,
            dataType: 'JSON',
            type: 'GET',
            success: function (data) {
                if (data.results.length > 0) {
                    toastr.warning('Mã Phòng đã có');
                }
            }
        });
    }