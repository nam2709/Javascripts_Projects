function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
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
  
  function getCSRFTokenValue() {
    return getCookie('csrftoken');
  }
  
  function getSessionIdValue() {
    return getCookie('sessionid');
  }
  
  // UUIDv4 Generator
  // function uuidv4() {
  //   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
  //       var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
  //       return v.toString(16);
  //   });
  // }
  
  // Function actuion CRUD
  var ProposalFormType_arr_action = [
                  // default action
                  {
                      "title": "Xem chi tiết",
                      "func": "ProposalFormTypeDetails",
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
                      "func": "ProposalFormTypeEdit",
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
                      "func": "ProposalFormTypeOnDeleteEvent",
                      "icon": "far fa-trash-alt",
                      "href": "#",
                      "isCheck": false,
                      "allowSelfChecking": false,
                      "field_checking": "#",
                      "value_is_true": "#",
                      "views_name": "",
                      "independent_views": true
                  },
  ]
  
  // Actions functions
  function ProposalFormTypeDetails(uuid){
      $('#proposalFormTypeDetailmodalsId').modal('toggle');
      var obj=new ProposalFormType();
      obj.tGetObjApi(uuid);
      obj.callAjax.then(function(data) {
          new ProposalFormType(data).tFillFormModal('Detail','proposalFormTypeDetailModalsFormId');
  
      })
      // obj.tFillFormModal('Detail');
  }
  
  function ProposalFormTypeEdit(uuid){
      $('#proposalFormTypeEditmodalsId').modal('toggle');
      var obj=new ProposalFormType();
      obj.tGetObjApi(uuid);
      obj.callAjax.then(function(data) {
          new ProposalFormType(data).tFillFormModal('Edit','proposalFormTypeEditModalsFormId');
  
      })
      // obj.tFillFormModal('Edit');
  }
  
  function ProposalFormTypeOnDeleteEvent(uuid){
      var search_data = null;
      try {
          search_data = AccountActionsSearchData;
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
                                  var obj=new ProposalFormType();
                                  obj.tDeleteApi(uuid);
                              }
                          },
                          
                      }
              });
          
      }
      else { 
          ProposalFormTypeOnDeleteWithDataSearchEvent(uuid);
      }
  
  }
  function ProposalFormTypeOnDeleteWithDataSearchEvent(uuid){
      $.confirm({
      icon: 'fa fa-smile-o',
      title: 'XÓA!',
      content: 'Bạn có chắc muốn xóa ?',
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
                  var obj=new ProposalFormType();
                  
                  obj.tDeleteApiWithDataSearch(uuid,AccountActionsSearchData);
              }
          },
          
      }
  });
      
  }
  
  function ProposalFormTypeViewDetail(selectionId){
      var select = $("#"+selectionId);
      if(select.length>0){
          var value =  select.val()
          if(value == "" || value == null || value == undefined){
              return;
          }
          else {
              $('#proposalFormTypeDetailmodalsId').modal('toggle');
              var obj=new ProposalFormType();
              obj.tGetObjApi(value);
              obj.callAjax.then(function(data) {
                  new ProposalFormType(data).tFillFormModal('Detail','proposalFormTypeDetailModalsFormId');
              })
          }
      }
  }
  
  var record_in_page = 10;
  
  class ProposalFormType {
    // ########## Init Objects ##############
    constructor(data = null) {
      if (data != null) {
        if (data.hasOwnProperty('uuid')) {
          this.uuid = data.uuid;
        }
        else {
          // this.code = null;
        }
  
        // hasOwnProperty để check xem có đối tượng đó không
        if (data.hasOwnProperty('name')) {
          this.name = data.name;
        }
        else {
          // this.name = null;
        }
        if (data.hasOwnProperty('code')) {
          this.code = data.code;
        }
        else {
          // this.code = null;
        }
  
        if (data.hasOwnProperty('uuid')) {
          this.uuid = data.uuid;
          this.editUrl = '/ProposalForm/ProposalFormType/edit/' + this.uuid + '/';
          this.detailUrl = '/ProposalForm/ProposalFormType/detail/' + this.uuid + '/';
        }
        else {
          // this.uuid = null;
        }

        if (data.hasOwnProperty('fields')) {
          this.fields = data.fields
        } 
        else {
            this.fields = null
        }

        if (data.hasOwnProperty('created_by')) {
          this.created_by = data.created_by;
        }
        else {
          // this.created_by = null;
        }
  
        if (data.hasOwnProperty('updated_by')) {
          this.updated_by = data.updated_by;
        }
        else {
          // this.updated_by = null;
        }
  
        if (data.hasOwnProperty('updated_at')) {
          this.updated_at = data.updated_at;
        }
        else {
          // this.updated_at = null;
        }
  
        if (data.hasOwnProperty('created_at')) {
          this.created_at = data.created_at;
        }
        else {
          // this.created_at = null;
        }
        
      }
    }
    tGetFormData(formId = null) {
      var formEle = $("#" + formId);
      if (formEle.length > 0) {
        var chEle = formEle.find("#nameProposalFormTypeInputId"); //Kiêrm tra giá trị của form id name
        if (chEle.length > 0) {
          this.name = chEle.val();
        }
        else {
          // this.name = null;
        }
        var chEle = formEle.find("#uuidProposalFormTypeInputId");
        if (chEle.length > 0) {
          this.uuid = chEle.val();
        }
        else {
          // this.uuid = null;
        }
        var chEle = formEle.find("#codeProposalFormTypeInputId");
        if (chEle.length > 0) {
          this.code = chEle.val();
        }
        else {
          // this.code = null;
        }
        var chEle = formEle.find("#fieldsProposalFormTypeInputId");
        if (chEle.length > 0) {
          this.fields = chEle.val().join('\n');
        }
        else {
          // this.fields = null;
        }
        var chEle = formEle.find("#created_atProposalFormTypeInputId");
        if (chEle.length > 0) {
          this.created_at = chEle.val();
        }
        else {
          // this.created_at = null;
        }
        var chEle = formEle.find("#updated_atProposalFormTypeInputId");
        if (chEle.length > 0) {
          this.updated_at = chEle.val();
        }
        else {
          // this.updated_at = null;
        }
        var chEle = formEle.find("#created_byProposalFormTypeInputId");
        if (chEle.length > 0) {
          this.created_by = chEle.val();
        }
        else {
          // this.created_by = null;
        }
        var chEle = formEle.find("#updated_byProposalFormTypeInputId");
        if (chEle.length > 0) {
          this.updated_by = chEle.val();
        }
        else {
          // this.updated_by = null;
        }
      }
      else {
        var chEle = $("#codeProposalFormTypeInputId");
        if (chEle.length > 0) {
          this.code = chEle.val();
        }
        else {
          // this.code = null;
        }
        var chEle = $("#nameProposalFormTypeInputId");
        if (chEle.length > 0) {
          this.name = chEle.val();
        }
        else {
          // this.name = null;
        }
        var chEle = $("#uuidProposalFormTypeInputId");
        if (chEle.length > 0) {
          this.uuid = chEle.val();
        }
        else {
          // this.uuid = null;
        }
        var chEle = formEle.find("#fieldsProposalFormTypeInputId");
        if (chEle.length > 0) {
          this.fields = chEle.val().join('\n');
        }
        else {
          // this.fields = null;
        }
        var chEle = $("#created_atProposalFormTypeInputId");
        if (chEle.length > 0) {
          this.created_at = chEle.val();
        }
        else {
          // this.created_at = null;
        }
        var chEle = $("#updated_atProposalFormTypeInputId");
        if (chEle.length > 0) {
          this.updated_at = chEle.val();
        }
        else {
          // this.updated_at = null;
        }
        var chEle = $("#created_byProposalFormTypeInputId");
        if (chEle.length > 0) {
          this.created_by = chEle.val();
        }
        else {
          // this.created_by = null;
        }
        var chEle = $("#updated_byProposalFormTypeInputId");
        if (chEle.length > 0) {
          this.updated_by = chEle.val();
        }
        else {
          // this.updated_by = null;
        }
      }
    }
  
    // ########## [FILL FORM] Objects to FRONT END ##############
    tFillForm() {
      var self = this;
      try {
        var j_ele_name = $("#nameProposalFormTypeInputId");
        if (j_ele_name.length > 0) {
          if (j_ele_name.attr('name') != 'uuid') {
            j_ele_name.val(self.name).change(); //change() = lấy giá trị hiện lên
          }
        }
        else {
          // j_ele_name.val(null);
        }
      }
      catch (err) {
        console.log('err = ', err);
      }
  
      try {
        var j_ele_uuid = $("#uuidProposalFormTypeInputId");
        if (j_ele_uuid.length > 0) {
          if (j_ele_uuid.attr('name') == 'uuid') {
            j_ele_uuid.val(self.uuid).change();
          }
        }
        else {
          // j_ele_uuid.val(null);
        }
      }
      catch (err) {
        console.log('err = ', err);
      }
  
      try {
        var j_ele_tndid = $("#codeProposalFormTypeInputId");
        if (j_ele_tndid.length > 0) {
          if (j_ele_tndid.attr('name') != 'uuid') {
            j_ele_tndid.val(self.tndid).change();
          }
        }
        else {
          // j_ele_tndid.val(null);
        }
      }
      catch (err) {
        console.log('err = ', err);
      }

      try {
        var j_ele_fields = $("#fieldsProposalFormTypeInputId");
        if (j_ele_fields.length > 0) {
          if (j_ele_fields.attr('name') != 'uuid') {
            j_ele_fields.val((this.fields).join('\n'));
          }
        }
        else {
          // j_ele_fields.val(null);
        }
      }
      catch (err) {
        console.log('err = ', err);
      }
  
      try {
        var j_ele_updated_at = $("#updated_atProposalFormTypeInputId");
        if (j_ele_updated_at.length > 0) {
          var dateObj = new Date(Date.parse(self.updated_at));
          if (dateObj != "Invalid Date") {
            var newdate = moment(dateObj).format('DD/MM/YYYY');
            console.log('newdate = ', newdate);
            j_ele_updated_at.val(newdate).change();
          }
        }
        else {
          // j_ele_updated_at.val(null);
        }
      }
      catch (err) {
        console.log('err = ', err);
      }
  
      try {
        var j_ele_created_at = $("#created_atProposalFormTypeInputId");
        if (j_ele_created_at.length > 0) {
          var dateObj = new Date(Date.parse(self.created_at));
          if (dateObj != "Invalid Date") {
            var newdate = moment(dateObj).format('DD/MM/YYYY');
            console.log('newdate = ', newdate);
            j_ele_created_at.val(newdate).change();
          }
        }
        else {
          // j_ele_created_at.val(null);
        }
      }
      catch (err) {
        console.log('err = ', err);
      }
  
  
      return self;
    }
  
    // ########## [FILL FORM] Objects to FRONT END ##############
    tFillFormModal(modals_type,formId = null) {
      var apart = modals_type+"Modal";
      var self = this;

      try {
        var j_ele_uuid = $("#uuidProposalFormType"+apart+"InputId");
        if (j_ele_uuid.length > 0 && self.uuid != null) {
          if (j_ele_uuid.attr('name') == 'uuid') {
            j_ele_uuid.val(self.uuid).change();
          }
        }
        else {
          // j_ele_uuid.val(null);
        }
      }
      catch (err) {
        console.log('err = ', err);
      }

      try {
        var j_ele_name = $("#nameProposalFormType"+apart+"InputId");
        if (j_ele_name.length > 0) {
          if (j_ele_name.attr('name') != 'uuid') {
            j_ele_name.val(self.name).change();
          }
        }
        else {
          // j_ele_name.val(null);
        }
      }
      catch (err) {
        console.log('err = ', err);
      }
  
      try {
        var j_ele_code = $("#codeProposalFormType"+apart+"InputId");
        if (j_ele_code.length > 0 && self.code != null) {
          if (j_ele_code.attr('name') != 'uuid') {
            j_ele_code.val(self.code).change();
          }
        }
        else {
          // j_ele_code.val(null);
        }
      }
      catch (err) {
        console.log('err = ', err);
      }

      try {
        var j_ele_fields = $("#fieldsProposalFormType"+apart+"InputId");
        if (j_ele_fields.length > 0 && this.fields != null) {
          if (j_ele_fields.attr('name') != 'uuid') {
            j_ele_fields.val((this.fields).join('\n'));
          }
        }
        else {
          // j_ele_fields.val(null);
        }
      }
      catch (err) {
        console.log('err = ', err);
      }

      try {
        var j_ele_updated_at = $("#updated_atProposalFormType"+apart+"InputId");
        if (j_ele_updated_at.length > 0) {
          var dateObj = new Date(Date.parse(self.updated_at));
          if (dateObj != "Invalid Date") {
            var newdate = moment(dateObj).format('DD/MM/YYYY');
            console.log('newdate = ', newdate);
            j_ele_updated_at.val(newdate).change();
          }
        }
        else {
          // j_ele_updated_at.val(null);
        }
      }
      catch (err) {
        console.log('err = ', err);
      }
  
      try {
        var j_ele_created_at = $("#created_atProposalFormType"+apart+"InputId");
        if (j_ele_created_at.length > 0) {
          var dateObj = new Date(Date.parse(self.created_at));
          if (dateObj != "Invalid Date") {
            var newdate = moment(dateObj).format('DD/MM/YYYY');
            console.log('newdate = ', newdate);
            j_ele_created_at.val(newdate).change();
          }
        }
        else {
          // j_ele_created_at.val(null);
        }
      }
      catch (err) {
        console.log('err = ', err);
      }
  
      if (formId != null) {
        var arr_table = [];
        var form = $('#' + formId);
        if (form.length > 0) {
          form.find("table").each(function () {
            console.log("table in form" + $(this));
            var obj = $(this);
            arr_table.push(obj);
          })
        }
        if (arr_table.length > 0) {
          arr_table.forEach(element => {
            var JS_MODEL_APPNAME = element.attr("app-model-name");
            var search_data = element.attr("parent-attr-name") + "=" + self.uuid;
            window[JS_MODEL_APPNAME + "FillTableInForm"](1, search_data, element.attr("code"), modals_type.toLowerCase());
          });
        }
      }
      return self;
    }
  
    // ########## [FILL FORM] Objects to FRONT END ##############
    tFillTestDataFormModal(modals_type, formId = null) {
      //modals_type
      //*Create
      //*Detail
      //*Edit
      var apart = modals_type + 'Modal';
  
      var self = this;
  
      try {
        var j_ele_name = $("#nameProposalFormType" + apart + "InputId");
        if (j_ele_name.length > 0) {
          if (j_ele_name.attr('name') != 'uuid') {
            j_ele_name.val(self.name).change();
          }
        }
        else {
          // j_ele_name.val(null);
        }
      }
      catch (err) {
        console.log('err = ', err);
      }
  
      try {
        var j_ele_uuid = $("#uuidProposalFormType" + apart + "InputId");
        if (j_ele_uuid.length > 0 && self.uuid != null) {
          if (j_ele_uuid.attr('name') == 'uuid') {
            j_ele_uuid.val(self.uuid).change();
          }
        }
        else {
          // j_ele_uuid.val(null);
        }
      }
      catch (err) {
        console.log('err = ', err);
      }
  
      try {
        var j_ele_fields = $("#fieldsProposalFormType" + apart + "InputId");
        if (j_ele_fields.length > 0) {
          if (j_ele_fields.attr('name') != 'uuid') {
            j_ele_fields.val((this.fields).join('\n'));
          }
        }
        else {
          // j_ele_fields.val(null);
        }
      }
      catch (err) {
        console.log('err = ', err);
      }
  
      try {
        var j_ele_nick_name = $("#nick_nameProposalFormType" + apart + "InputId");
        if (j_ele_nick_name.length > 0) {
          if (j_ele_nick_name.attr('name') != 'uuid') {
            j_ele_nick_name.val(self.nick_name).change();
          }
        }
        else {
          // j_ele_nick_name.val(null);
        }
      }
      catch (err) {
        console.log('err = ', err);
      }
  
      try {
        var j_ele_username = $("#usernameProposalFormType" + apart + "InputId");
        if (j_ele_username.length > 0) {
          if (j_ele_username.attr('name') != 'uuid') {
            j_ele_username.val(self.username).change();
          }
        }
        else {
          // j_ele_username.val(null);
        }
      }
      catch (err) {
        console.log('err = ', err);
      }
  
      try {
        var j_ele_full_name = $("#full_nameProposalFormType" + apart + "InputId");
        if (j_ele_full_name.length > 0) {
          if (j_ele_full_name.attr('name') != 'uuid') {
            j_ele_full_name.val(self.full_name).change();
          }
        }
        else {
          // j_ele_full_name.val(null);
        }
      }
      catch (err) {
        console.log('err = ', err);
      }
  
      try {
        var j_ele_email = $("#emailProposalFormType" + apart + "InputId");
        if (j_ele_email.length > 0) {
          if (j_ele_email.attr('name') != 'uuid') {
            j_ele_email.val(self.email).change();
          }
        }
        else {
          // j_ele_email.val(null);
        }
      }
      catch (err) {
        console.log('err = ', err);
      }
  
      try {
        var j_ele_groups = $("#groupsGroupProposalFormType" + apart + "InputId");
        if (j_ele_groups.length > 0) {
          var arr_value = [];
          for (var i in self["groups"]) {
            arr_value.push(self["groups"][i]["uuid"]);
          }
          j_ele_groups.val(arr_value).change();
        }
        else {
          // j_ele_groups.val(null);
        }
      }
      catch (err) {
        console.log('err = ', err);
      }
  
      try {
        var j_ele_user_permissions = $("#user_permissionsPermissionProposalFormType" + apart + "InputId");
        if (j_ele_user_permissions.length > 0) {
          var arr_value = [];
          for (var i in self["user_permissions"]) {
            arr_value.push(self["user_permissions"][i]["uuid"]);
          }
          j_ele_user_permissions.val(arr_value).change();
        }
        else {
          // j_ele_user_permissions.val(null);
        }
      }
      catch (err) {
        console.log('err = ', err);
      }
  
      try {
        var j_ele_date_of_birth = $("#date_of_birthProposalFormType" + apart + "InputId");
        if (j_ele_date_of_birth.length > 0) {
          var dateObj = new Date(Date.parse(self.date_of_birth));
          if (dateObj != "Invalid Date") {
            var newdate = moment(dateObj).format('DD/MM/YYYY');
            console.log('newdate = ', newdate);
            j_ele_date_of_birth.val(newdate).change();
          }
        }
        else {
          // j_ele_date_of_birth.val(null);
        }
      }
      catch (err) {
        console.log('err = ', err);
      }
  
      try {
        var j_ele_age = $("#ageProposalFormType" + apart + "InputId");
        if (j_ele_age.length > 0) {
          if (j_ele_age.attr('name') != 'uuid') {
            j_ele_age.val(self.age).change();
          }
        }
        else {
          // j_ele_age.val(null);
        }
      }
      catch (err) {
        console.log('err = ', err);
      }
  
      try {
        var j_ele_telephone = $("#telephoneProposalFormType" + apart + "InputId");
        if (j_ele_telephone.length > 0) {
          if (j_ele_telephone.attr('name') != 'uuid') {
            j_ele_telephone.val(self.telephone).change();
          }
        }
        else {
          // j_ele_telephone.val(null);
        }
      }
      catch (err) {
        console.log('err = ', err);
      }
  
      try {
        var j_ele_salt = $("#saltProposalFormType" + apart + "InputId");
        if (j_ele_salt.length > 0) {
          if (j_ele_salt.attr('name') != 'uuid') {
            j_ele_salt.val(self.salt).change();
          }
        }
        else {
          // j_ele_salt.val(null);
        }
      }
      catch (err) {
        console.log('err = ', err);
      }
  
      try {
        var j_ele_onetime_passwd = $("#onetime_passwdProposalFormType" + apart + "InputId");
        if (j_ele_onetime_passwd.length > 0) {
          if (j_ele_onetime_passwd.attr('name') != 'uuid') {
            j_ele_onetime_passwd.val(self.onetime_passwd).change();
          }
        }
        else {
          // j_ele_onetime_passwd.val(null);
        }
      }
      catch (err) {
        console.log('err = ', err);
      }
  
      try {
        var j_ele_avatar = $("#avatarProposalFormType" + apart + "FileAreaId");
        if (j_ele_avatar.length > 0) {
          j_ele_avatar.html('');
  
  
          var value = self.avatar;
          if (value != undefined && value != "") {
            var decode_url = decodeURIComponent(value);
            var filename = decode_url.split('/')[decode_url.split('/').length - 1]
            var file_html = "";
            var edit_text = "d-none";
            if (modals_type.toLowerCase() == "edit") {
              edit_text = "";
            }
            file_html += `
                                    <div class="form-group row col-xl-8 table-hover mt-1" style="background-color:gainsboro;height: 25px;" id="` + self.uuid + `AttachmentDivId">
                                        <div class="col-xl-10 view-attachment-class" >
                                            <span><a style="color:cornflowerblue"  target="_blank" href="` + value + `"><p><b>` + filename + `</b></p></a></span>
                                        </div>
                                        <div class="col-xl-2 text-end ` + edit_text + `">
                                            <i class="fas fa-times" style="color:gray" file-uuid="` + self.uuid + `" id="` + self.uuid + `btnDeleteId" onclick="avataraccountAccountDeletedAttacthment(this)"></i>
                                        </div>
                                    </div>
                                `;
          }
  
  
          j_ele_avatar.html(file_html);
        }
        else {
          // j_ele_avatar.html('');
        }
      }
      catch (err) {
        console.log('err = ', err);
      }
  
      try {
        var j_ele_is_callbot = $("#is_callbotProposalFormType" + apart + "InputId");
        if (j_ele_is_callbot.length > 0) {
          if (j_ele_is_callbot.attr('name') != 'uuid') {
            j_ele_is_callbot.prop('checked', self.is_callbot).change();
          }
        }
        else {
          // j_ele_is_callbot.val(null);
        }
      }
      catch (err) {
        console.log('err = ', err);
      }
  
      try {
        var j_ele_callbot_endpoint = $("#callbot_endpointProposalFormType" + apart + "InputId");
        if (j_ele_callbot_endpoint.length > 0) {
          if (j_ele_callbot_endpoint.attr('name') != 'uuid') {
            j_ele_callbot_endpoint.val(self.callbot_endpoint).change();
          }
        }
        else {
          // j_ele_callbot_endpoint.val(null);
        }
      }
      catch (err) {
        console.log('err = ', err);
      }
  
      try {
        var j_ele_is_chatbot = $("#is_chatbotProposalFormType" + apart + "InputId");
        if (j_ele_is_chatbot.length > 0) {
          if (j_ele_is_chatbot.attr('name') != 'uuid') {
            j_ele_is_chatbot.prop('checked', self.is_chatbot).change();
          }
        }
        else {
          // j_ele_is_chatbot.val(null);
        }
      }
      catch (err) {
        console.log('err = ', err);
      }
  
      try {
        var j_ele_chatbot_endpoint = $("#chatbot_endpointProposalFormType" + apart + "InputId");
        if (j_ele_chatbot_endpoint.length > 0) {
          if (j_ele_chatbot_endpoint.attr('name') != 'uuid') {
            j_ele_chatbot_endpoint.val(self.chatbot_endpoint).change();
          }
        }
        else {
          // j_ele_chatbot_endpoint.val(null);
        }
      }
      catch (err) {
        console.log('err = ', err);
      }
  
      try {
        var j_ele_manager = $("#managerProposalFormTypeAccount" + apart + "InputId");
        if (j_ele_manager.length > 0) {
          var value = self["manager"]["uuid"];
          j_ele_manager.val(value).change();
        }
        else {
          // j_ele_manager.val(null);
        }
      }
      catch (err) {
        console.log('err = ', err);
      }
  
      try {
        var j_ele_log_confirm_by_email = $("#log_confirm_by_emailProposalFormType" + apart + "InputId");
        if (j_ele_log_confirm_by_email.length > 0) {
          if (j_ele_log_confirm_by_email.attr('name') != 'uuid') {
            j_ele_log_confirm_by_email.prop('checked', self.log_confirm_by_email).change();
          }
        }
        else {
          // j_ele_log_confirm_by_email.val(null);
        }
      }
      catch (err) {
        console.log('err = ', err);
      }
  
      try {
        var j_ele_logged_with_password = $("#logged_with_passwordProposalFormType" + apart + "InputId");
        if (j_ele_logged_with_password.length > 0) {
          if (j_ele_logged_with_password.attr('name') != 'uuid') {
            j_ele_logged_with_password.prop('checked', self.logged_with_password).change();
          }
        }
        else {
          // j_ele_logged_with_password.val(null);
        }
      }
      catch (err) {
        console.log('err = ', err);
      }
  
      try {
        var j_ele_created_free_license = $("#created_free_licenseProposalFormType" + apart + "InputId");
        if (j_ele_created_free_license.length > 0) {
          if (j_ele_created_free_license.attr('name') != 'uuid') {
            j_ele_created_free_license.prop('checked', self.created_free_license).change();
          }
        }
        else {
          // j_ele_created_free_license.val(null);
        }
      }
      catch (err) {
        console.log('err = ', err);
      }
  
      try {
        var j_ele_email_activated = $("#email_activatedProposalFormType" + apart + "InputId");
        if (j_ele_email_activated.length > 0) {
          if (j_ele_email_activated.attr('name') != 'uuid') {
            j_ele_email_activated.prop('checked', self.email_activated).change();
          }
        }
        else {
          // j_ele_email_activated.val(null);
        }
      }
      catch (err) {
        console.log('err = ', err);
      }
  
      try {
        var j_ele_website_template = $("#website_templateWebsiteTemplateProposalFormType" + apart + "InputId");
        if (j_ele_website_template.length > 0) {
          var value = self["website_template"]["uuid"];
          j_ele_website_template.val(value).change();
        }
        else {
          // j_ele_website_template.val(null);
        }
      }
      catch (err) {
        console.log('err = ', err);
      }
  
      try {
        var j_ele_language = $("#languageProposalFormType" + apart + "InputId");
        if (j_ele_language.length > 0) {
          if (j_ele_language.attr('name') != 'uuid') {
            j_ele_language.val(self.language).change();
          }
        }
        else {
          // j_ele_language.val(null);
        }
      }
      catch (err) {
        console.log('err = ', err);
      }
  
      try {
        var j_ele_timezone = $("#timezoneProposalFormType" + apart + "InputId");
        if (j_ele_timezone.length > 0) {
          if (j_ele_timezone.attr('name') != 'uuid') {
            j_ele_timezone.val(self.timezone).change();
          }
        }
        else {
          // j_ele_timezone.val(null);
        }
      }
      catch (err) {
        console.log('err = ', err);
      }
  
      try {
        var j_ele_app_permissions = $("#app_permissionsAppPermissionProposalFormType" + apart + "InputId");
        if (j_ele_app_permissions.length > 0) {
          var arr_value = [];
          for (var i in self["app_permissions"]) {
            arr_value.push(self["app_permissions"][i]["uuid"]);
          }
          j_ele_app_permissions.val(arr_value).change();
        }
        else {
          // j_ele_app_permissions.val(null);
        }
      }
      catch (err) {
        console.log('err = ', err);
      }
  
      try {
        var j_ele_signup_at = $("#signup_atProposalFormType" + apart + "InputId");
        if (j_ele_signup_at.length > 0) {
          var dateObj = new Date(Date.parse(self.signup_at));
          if (dateObj != "Invalid Date") {
            var newdate = moment(dateObj).format('DD/MM/YYYY');
            console.log('newdate = ', newdate);
            j_ele_signup_at.val(newdate).change();
          }
        }
        else {
          // j_ele_signup_at.val(null);
        }
      }
      catch (err) {
        console.log('err = ', err);
      }
  
      try {
        var j_ele_last_login_at = $("#last_login_atProposalFormType" + apart + "InputId");
        if (j_ele_last_login_at.length > 0) {
          var dateObj = new Date(Date.parse(self.last_login_at));
          if (dateObj != "Invalid Date") {
            var newdate = moment(dateObj).format('DD/MM/YYYY');
            console.log('newdate = ', newdate);
            j_ele_last_login_at.val(newdate).change();
          }
        }
        else {
          // j_ele_last_login_at.val(null);
        }
      }
      catch (err) {
        console.log('err = ', err);
      }
  
      try {
        var j_ele_extend_field = $("#extend_fieldExtendInfoProposalFormType" + apart + "InputId");
        if (j_ele_extend_field.length > 0) {
          var arr_value = [];
          for (var i in self["extend_field"]) {
            arr_value.push(self["extend_field"][i]["uuid"]);
          }
          j_ele_extend_field.val(arr_value).change();
        }
        else {
          // j_ele_extend_field.val(null);
        }
      }
      catch (err) {
        console.log('err = ', err);
      }
  
      try {
        var j_ele_password = $("#passwordProposalFormType" + apart + "InputId");
        if (j_ele_password.length > 0) {
          if (j_ele_password.attr('name') != 'uuid') {
            j_ele_password.val(self.password).change();
          }
        }
        else {
          // j_ele_password.val(null);
        }
      }
      catch (err) {
        console.log('err = ', err);
      }
  
      try {
        var j_ele_updated_at = $("#updated_atProposalFormType" + apart + "InputId");
        if (j_ele_updated_at.length > 0) {
          var dateObj = new Date(Date.parse(self.updated_at));
          if (dateObj != "Invalid Date") {
            var newdate = moment(dateObj).format('DD/MM/YYYY');
            console.log('newdate = ', newdate);
            j_ele_updated_at.val(newdate).change();
          }
        }
        else {
          // j_ele_updated_at.val(null);
        }
      }
      catch (err) {
        console.log('err = ', err);
      }
  
      try {
        var j_ele_created_at = $("#created_atProposalFormType" + apart + "InputId");
        if (j_ele_created_at.length > 0) {
          var dateObj = new Date(Date.parse(self.created_at));
          if (dateObj != "Invalid Date") {
            var newdate = moment(dateObj).format('DD/MM/YYYY');
            console.log('newdate = ', newdate);
            j_ele_created_at.val(newdate).change();
          }
        }
        else {
          // j_ele_created_at.val(null);
        }
      }
      catch (err) {
        console.log('err = ', err);
      }
  
      if (formId != null) {
  
        var arr_table = [];
        var form = $('#' + formId);
        if (form.length > 0) {
          form.find("table").each(function () {
            console.log("table in form" + $(this));
            var obj = $(this);
            arr_table.push(obj);
          })
        }
        if (arr_table.length > 0) {
          arr_table.forEach(element => {
            var JS_MODEL_APPNAME = element.attr("app-model-name");
            var search_data = element.attr("parent-attr-name") + "=" + self.uuid;
            window[JS_MODEL_APPNAME + "FillTableInForm"](1, search_data, element.attr("id"), modals_type.toLowerCase());
          });
        }
      }
  
  
  
  
      return self;
    }
  
    // ########## [CREATE] post Objects to REST API --> return object if success ##############
    tCreatePostApi() {
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
        url: "/ProposalForm/api/ProposalFormType/",
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
          self = new ProposalFormType(data);
          ProposalFormTypeGetDataTable(ProposalFormTypepagination["current_page"]);
          if (is_continue_form) {
            is_continue_form = false;
            toastr.success('Thêm mới thành công');
            $(location).prop('href', "/ProposalForm/ProposalFormType/create/");
  
  
          } else if (is_continue_modal) {
            is_continue_modal = false;
            AccountRefreshCreateModal();
            toastr.success('Thêm mới thành công');
          } else {
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
          if (is_debug) {
            $.alert({
              title: 'Error [' + xhr.status + '] ' + thrownError,
              content: xhr.responseText,
            });
          }
  
        },
      });
      return self;
    }
  
    // ########## [UPDATE] post Objects to REST API --> return object if success ##############
    tUpdatePostApi(formId = null) {
      $.ajaxSetup({
        headers: {
          'CSRFToken': getCSRFTokenValue(),
          'X-CSRFToken': getCSRFTokenValue(), // for --> SessionAuthentication
        },
        tryCount: 0,
        retryLimit: 3,
  
      });
      var self = this;
      var formData;
      var form;
      var arr_table = [];
      if (formId == null) {
        formData = new FormData($('#proposalFormTypeCreateFormId')[0]);
  
      }
      else {
        form = $('#' + formId);
        console.log(form)
        if (form.length > 0) {
          form.find("table").each(function () {
            // console.log("table in form" + $(this));
            obj = $(this);
            arr_table.push(obj);
            // $(this).remove();
  
          })
        }
        formData = new FormData();
        // console.log(formData)
        form.find(':input').each(function () {
          for (const [key, value] of formData.entries()) {
            console.log(key, value);
        }
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
                if (files.length > 0) {
                  formData.append($(this).attr('name'), files[0]);
                }
              }
              else if (type == 'checkbox') {
                formData.append($(this).attr('name'), $(this).is(":checked"));
              }
              else if (type == 'radio') {
  
                if ($(this).is(":checked")) {
                  formData.set($(this).attr('name'), $(this).val());
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
                  if (data_type == "currency") {
                    var currency_value = formatNumber($(this).val());
                    currency_value = currency_value.replaceAll(",", "");
                    formData.append($(this).attr('name'), currency_value);
  
                  } else {
                    formData.append($(this).attr('name'), $(this).val());
                  }
                }
              }
            }
          }
        });
      }
      if (formData.get('uuid') == null || formData.get('uuid') == '' || formData.get('uuid') == null) {
        return;
      } else {
        this.uuid = formData.get('uuid');
      }
  
      var idForm = formData.get('uuid')
      // check unique
      var code = formData.get('code')
          CheckUnique(code)
          $.ajax({
              url: ProposalFormType_API_URL + idForm + "/",
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
                    self = new ProposalFormType(data);
                    
                    ProposalFormTypeGetDataTable(AccountAccountpagination["current_page"]);
                    //$(location).prop('href', "/Account/Account/detail/" + self.uuid + "/");
                    $('.modal').modal('hide');
                    // self.tFillForm();
              },
              error: function (xhr, ajaxOptions, thrownError) {
                toastr.warning('Mã đơn đã tồn tại');
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
  
    tCreateNewPostFormApi(formId = null) {
    $.ajaxSetup({
      headers: {
        'CSRFToken': getCSRFTokenValue(),
        'X-CSRFToken': getCSRFTokenValue(), // for --> SessionAuthentication
      },
      tryCount: 0,
      retryLimit: 3,
  
    });
    var self = this;
    var formData;
    var form;
    var arr_table = [];
    if (formId == null) {
      formData = new FormData($('#proposalFormTypeCreateFormId')[0]);
  
    }
    else {
      form = $('#' + formId);
      console.log(form)
      if (form.length > 0) {
        form.find("table").each(function () {
          // console.log("table in form" + $(this));
          obj = $(this);
          arr_table.push(obj);
          // $(this).remove();
  
        })
      }
      formData = new FormData();
      // console.log(formData)
      form.find(':input').each(function () {
      //   for (const [key, value] of formData.entries()) {
      //     console.log("value = ", value)
      // }
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
              if (files.length > 0) {
                formData.append($(this).attr('name'), files[0]);
              }
            }
            else if (type == 'checkbox') {
              formData.append($(this).attr('name'), $(this).is(":checked"));
            }
            else if (type == 'radio') {
  
              if ($(this).is(":checked")) {
                formData.set($(this).attr('name'), $(this).val());
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
                if (data_type == "currency") {
                  var currency_value = formatNumber($(this).val());
                  currency_value = currency_value.replaceAll(",", "");
                  formData.append($(this).attr('name'), currency_value);
  
                } else {
                  formData.append($(this).attr('name'), $(this).val());
                }
              }
            }
          }
        }
      });
    }

    var code = formData.get('code')
    CheckUnique(code)
    $.ajax({
        url: ProposalFormType_API_URL,
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
                self = new ProposalFormType(data);
                ProposalFormTypeGetDataTable(AccountAccountpagination["current_page"]);
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
  
  
    // ########## [ROW] [UPDATE] POST OBJ TO REST API --> return object if success ##############
    tUpdateNewPostRowApi($this, form_data_parent = null, is_notice = false) {
      //cập nhật với từng dòng trên bảng
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
      var uuid = $($this).attr("uuid");
      var depend = $($this).attr('depend');
      if (depend != "self-depend") {
        formData.append($($this).attr('parent-attr-name'), $($this).attr('parent-attr-uuid'))
      }
      $($this).find(':input').each(function () {
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
              if (files.length > 0) {
                formData.append($(this).attr('name'), files[0]);
              }
            }
            else if (type == 'checkbox') {
              formData.append($(this).attr('name'), $(this).is(":checked"));
            }
            else if (type == 'radio') {
  
              if ($(this).is(":checked")) {
                formData.set($(this).attr('name'), $(this).val());
              }
            } else {
              //formData.append($(this).attr('name'), $(this).val());
              if (Array.isArray($(this).val())) {
                var arr = $(this).val();
                for (var i in arr)
                  formData.append($(this).attr('name'), arr[i]);
              } else {
                if (data_type == "currency") {
                  var currency_value = formatNumber($(this).val());
                  currency_value = currency_value.replaceAll(",", "");
                  formData.append($(this).attr('name'), currency_value);
  
                } else {
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
      if (form_data_parent != null) {
        for (var pair of form_data_parent.entries()) {
          console.log(pair[0] + ', ' + pair[1]);
          if (formData.get(pair[0]) === 'undefined' && formData.get(pair[0]) === '' || formData.get(pair[0]) === null) {
            formData.set(pair[0], pair[1])
          }
  
        }
      }
      // 
      $.ajax({
        url: ProposalFormType_URL + uuid + "/",
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
          $($this).attr("is-new", "added");
          if (is_notice) {
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
  
          if (is_debug) {
            $.alert({
              title: 'Error [' + xhr.status + '] ' + thrownError,
              content: xhr.responseText,
            });
          }
        },
      });
      return self;
    }
  
    tDeleteApi(uuid = null) {
      $.ajaxSetup({
        headers: {
          'CSRFToken': getCSRFTokenValue(),
          'X-CSRFToken': getCSRFTokenValue(), // for --> SessionAuthentication
        },
        tryCount: 0,
        retryLimit: 3,
      });
  
  
      var self = this;
      var uuid_go = ""
      if (uuid == null) {
        alert(uuid)
        uuid_go = cr_uuid;
      } else {
        uuid_go = uuid;
      }
      console.log('self.uuid = ', self.uuid);
      $.ajax({
        url: "/ProposalForm/api/ProposalFormType/" + uuid_go + "/",
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
          ProposalFormTypeGetDataTable(ProposalFormTypepagination["current_page"]);
          if (cr_uuid != "") {
            $(location).prop('href', "/Asset/Asset/create/");
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
  
          if (is_debug) {
            $.alert({
              title: 'Error [' + xhr.status + '] ' + thrownError,
              content: xhr.responseText,
            });
          }
        },
      });
    }
  
    tUpdateOnlyFieldApi(uuid = null, attr_name, attr_value, mess = "Cập nhật") {
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
      formData.set(attr_name, attr_value);
  
      $.ajax({
        url: ProposalFormType_URL + uuid + "/",
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
          toastr.success(mess + ' thành công');
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
  
          if (is_debug) {
            $.alert({
              title: 'Error [' + xhr.status + '] ' + thrownError,
              content: xhr.responseText,
            });
          }
        },
      });
      return self;
    }
  
    // ########## get Objects from REST API --> return array of objects ##############
    tGetAllObjApi(page = null, search_data = null) {
      this.callAjax = null;
      var results = [];
      $.ajaxSetup({
        headers: {
          'CSRFToken': getCSRFTokenValue(),
          'X-CSRFToken': getCSRFTokenValue(), // for --> SessionAuthentication
        },
        tryCount: 0,
        retryLimit: 3,
      });
      var has_go_page = ""
      if (page != null) {
        has_go_page = "?page=" + page;
      }
      this.callAjax =
        $.ajax({
              url: "/ProposalForm/api/ProposalFormType/" + has_go_page,
          type: "GET",
          //async: false,
          cache: false,
          timeout: 30000,
  
          success: function (data) {
            console.log('[tGetAllObjApi] data = ', data);
            if (data.hasOwnProperty('count')) {
              ProposalFormTypepagination["total"] = data.count;
            }
            if (data.hasOwnProperty('count')) {
              ProposalFormTypepagination["total"] = data.count;
            }
            if (data.hasOwnProperty('next')) {
              if (data.next != null) {
                ProposalFormTypepagination["has_next"] = true;
              } else {
                ProposalFormTypepagination["has_next"] = false;
  
              }
            }
            ProposalFormTypepagination["current_page"] = page;
            if (data.hasOwnProperty('previous')) {
              if (data.previous != null) {
                ProposalFormTypepagination["has_prev"] = true;
              } else {
                ProposalFormTypepagination["has_prev"] = false;
              }
            }
            if (data.hasOwnProperty('results')) {
              for (var j = 0; j < data.results.length; j++) {
                var tmp = new ProposalFormType(data.results[j]);
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
  
            if (is_debug) {
              $.alert({
                title: 'Error [' + xhr.status + '] ' + thrownError,
                content: xhr.responseText,
              });
            }
          },
        });
      return results;
    }
  
    // ########## search Objects from REST API --> return array of objects ##############
    tSearchAllObjApi(page = null, search_data = null, typeSearch) {
      //hàm tìm kiếm với data_search hoặc dữ liệu từ vùng tìm kiếm & loại tìm kiếm
      var results = [];
      this.callAjax = null;
      $.ajaxSetup({
        headers: {
          'CSRFToken': getCSRFTokenValue(),
          'X-CSRFToken': getCSRFTokenValue(), // for --> SessionAuthentication
        },
        tryCount: 0,
        retryLimit: 3,
      });
      var has_go_page = ""
      if (page != null) {
        has_go_page = "?page=" + page;
      }
      //getValue for searching
      var slugSearch = "";
      var SEARCH_URL = "";
      if (typeSearch == "filter") {
        SEARCH_URL = ProposalFormType_FILTER_URL;
  
        slugSearch = "&";
  
        if ($("#nameProposalFormTypeFilterSearchInputId").length > 0) {
          var value = $("#nameProposalFormTypeFilterSearchInputId").val();
          if (value != "" && value != null) {
            slugSearch += "name__contains=" + value + "&";
          }
        }
  
        slugSearch = slugSearch.slice(0, -1);
      } else {
        SEARCH_URL = ProposalFormType_SEARCH_URL;
  
        slugSearch = "&";
        slugSearch += "search=" + $("#proposalFormTypeQuickSearchInputId").val();
  
      }
      if (search_data != null) {
        SEARCH_URL = ProposalFormType_FILTER_URL;
        slugSearch = "&";
        slugSearch += search_data;
      }
      search_log["search_data"] = slugSearch;
      this.callAjax =
        $.ajax({
          url: SEARCH_URL + has_go_page + slugSearch,
          type: "GET",
          //async: false,
          cache: false,
          timeout: 30000,
  
          success: function (data) {
            console.log('[tGetAllObjApi] data = ', data);
            // return new ProposalFormType(data);
            if (data.hasOwnProperty('count')) {
              ProposalFormTypepagination["total"] = data.count;
            }
            if (data.hasOwnProperty('count')) {
              ProposalFormTypepagination["total"] = data.count;
            }
            if (data.hasOwnProperty('next')) {
              if (data.next != null) {
                ProposalFormTypepagination["has_next"] = true;
              } else {
                ProposalFormTypepagination["has_next"] = false;
  
              }
            }
            ProposalFormTypepagination["current_page"] = page;
            if (data.hasOwnProperty('previous')) {
              if (data.previous != null) {
                ProposalFormTypepagination["has_prev"] = true;
              } else {
                ProposalFormTypepagination["has_prev"] = false;
              }
            }
            if (data.hasOwnProperty('results')) {
              for (var j = 0; j < data.results.length; j++) {
                var tmp = new ProposalFormType(data.results[j]);
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
  
            if (is_debug) {
              $.alert({
                title: 'Error [' + xhr.status + '] ' + thrownError,
                content: xhr.responseText,
              });
            }
          },
        });
      return results;
    }
  
    // ########## GET ONLY ONE OBJ FROM REST API (RETURN 01 OBJECTS) ##############
    tGetObjApi(uuid) {
      this.callAjax = null;
  
      $.ajaxSetup({
        headers: {
          'CSRFToken': getCSRFTokenValue(),
          'X-CSRFToken': getCSRFTokenValue(), // for --> SessionAuthentication
        },
        tryCount: 0,
        retryLimit: 3,
      });
      this.callAjax =
        $.ajax({
          url: "/ProposalForm/api/ProposalFormType/" + uuid+ "/",
          type: "GET",
          async: false,
          cache: false,
          timeout: 30000,
  
          success: function (data) {
            console.log('[tGetObjApi] data = ', data);
            var n_obj = new ProposalFormType(data);
            console.log('n_obj = ', n_obj);
            // n_obj.tFillForm();
            return n_obj;
            // if (data.hasOwnProperty('results')){
            //    if (data.results.length > 0){
            //        var tmp = new ProposalFormType(data[i]);
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
  
            if (is_debug) {
              $.alert({
                title: 'Error [' + xhr.status + '] ' + thrownError,
                content: xhr.responseText,
              });
            }
            return null;
          },
        });
      return null;
    }
  
    tFillTable3(tableId = null, order = null) {
      var tbId = "proposalFormTypeDataTableId";
      if (tableId != null) {
        tbId = tableId;
      }
  
      if (order == null) {
        order = ASSET_ID_TABLE_COUNT;
      }
      var table = $("#" + tbId);
      if (table.length > 0) {
        var html = "<tr>"
        html += `<td><a>` + order + `</a></td>`;
        // Get All Attribute of thead
        var tableHeaders = table.find('thead th');
        var tableBody = table.find('tbody');
        //tableBody.html('');
        for (var thId = 1; thId < tableHeaders.length; thId++) {
          var hEle = tableHeaders[thId];
          var attr = hEle.getAttribute('attr-name');
          if (this.hasOwnProperty(attr)) {
  
            if (attr == "updated_at") {
              html += `<td class="text-wrap"><a>` + GetDateOnly_V01(this[attr]) + `</a></td>`;
              continue;
            }
  
            if (attr == "created_at") {
              html += `<td class="text-wrap"><a>` + GetDateOnly_V01(this[attr]) + `</a></td>`;
              continue;
            }
  
            if (attr == "name") {
              html += `<td class="text-wrap" style="min-width:300px" onclick="ProposalFormTypeDetails('` + this["uuid"] + `')"><a>` + (this[attr]) + `</a></td>`;
              continue;
            }
            //html +=`<td class="text-wrap"><a>` + (this[attr]) + `</a></td>`;
            html += `<td class="text-wrap"><a>` + (this[attr]) + `</a></td>`;
          }
  
          else {
            if (attr == "asset-admin-action") {
              html += BindActionButtonVer4(
                ProposalFormType_arr_action,
                this["uuid"],
                this,
                null,
                this["created_by"],
              );
            } else {
              html += `<td><a href=""></a></td>`;
            }
          }
        }
  
        html += '</tr>';
  
        tableBody.append(html);
        return true;
      }
      else {
        console.log('Not found dataTable Id: ,', tbId);
        return false;
      }
    }
  }
  
  var search_log = {
      search_func:"",
      search_data:"",
      search_type:"",
  }
  
  // fill table function
  function ProposalFormTypeGetDataTable(page=1,search_data=null){
      search_log["search_func"] = "ProposalFormTypeGetDataTable";
      search_log["search_data"] = search_data;
      search_log["search_type"] = "";
  
      var obj = new ProposalFormType();
      var results = obj.tGetAllObjApi(page,search_data);
      obj.callAjax.then(function(data) {
      $("#proposalFormTypeTableBodyId").empty();
      var body = $("#proposalFormTypeDataTableId");
      //if (body.length > 0){
      //    var bodyTable = body.DataTable();
      //    bodyTable.clear();
      //}
      ASSET_ID_TABLE_COUNT = 1;
      var crr_record_in_page = ProposalFormTyperecord_in_page;
  
      if(page>1){
      ASSET_ID_TABLE_COUNT =1+crr_record_in_page*page-crr_record_in_page
      }
      for (var i = 0; i < results.length; i++){
          try{
              console.log('results[i] = ', results[i]);
  
              //results[i].tFillTable2();
              results[i].tFillTable3();
              //results[i].tFillCard();
  
              ASSET_ID_TABLE_COUNT++;
              
              // results[i].tFillTable1();
          }
          catch(err){
              console.log(err);
          }
      }
      var pagenation_ele=$(".pagination-ProposalFormType");
      var pagination=ProposalFormTypepagination;
      pagenation_ele.html('');
      var page_total_ele = $(".page-total-ProposalFormType");
      page_total_ele.html(`<footer class="mt-3 blockquote-footer">Tổng số: ${pagination["total"]} bản ghi </footer>`);
      if (results.length > 0) {
          
                  pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="ProposalFormTypeGetDataTable(1)">Đầu</a></li>`);
                  if (pagination["has_prev"] == true) {
                      pagenation_ele.append('<li class="page-item"><a class="page-link" onclick="ProposalFormTypeGetDataTable(' + (parseInt(pagination["current_page"]) - 1) + ')">' + (parseInt(pagination["current_page"]) - 1) + '</a></li>');
                  }
                  pagenation_ele.append('<li class="page-item active"><a class="page-link" >' + (parseInt(pagination["current_page"])) + '</a></li>');
                  if (pagination["has_next"] == true) {
                      pagenation_ele.append('<li class="page-item"><a class="page-link" onclick="ProposalFormTypeGetDataTable(' + (parseInt(pagination["current_page"]) + 1) + ')">' + (parseInt(pagination["current_page"]) + 1) + '</a></li>');
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
                  pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="ProposalFormTypeGetDataTable(`+last_page_order+`)">Cuối</a></li>`);
                  }
              }
  })
  }
  
  var ProposalFormTypepagination={
      current_page:1,
      total:0,
      has_next:false,
      has_prev:false
  }
    
  var ProposalFormTyperecord_in_page = 5;
  
  // Run function fill data table
  $(document).ready(function(){
      var IdTable ="proposalFormTypeDataTableId";
      var checker = $("#" +IdTable );
      if (checker.length > 0){
          if($('#'+IdTable).is(":visible")){
              ProposalFormTypeGetDataTable(ProposalFormTypepagination["current_page"]);
          }
      }
  })
  
  $(document).ready(function(){
      var selectionId ="proposalFormTypeDetailModalsFormId";
      ProposalFormTypeViewDetail(selectionId)
  })
  
  // [Save Create] Clicked Handle function
  $(document).ready(function(){
    $("#proposalFormTypeCreateModalBtnId").click(function(){
        var validate_obj = new InputValidation('proposalFormTypeCreateModalsFormId');
        if(validate_obj.validateRequired()){
            toastr.warning('Vui lòng điền đầy đủ thông tin');
            return;
        }
        obj = new ProposalFormType();
        console.log('Save obj = ', obj);
        obj.tCreateNewPostFormApi('proposalFormTypeCreateModalsFormId');
    })
  });
  
  // [SAVE UPDATE]
  $(document).ready(function(){
    $("#proposalFormTypeUpdateModalBtnId").click(function(){
        obj = new ProposalFormType();
        obj.tUpdatePostApi('proposalFormTypeEditModalsFormId');
    })
  });
  

  // add selected
  $(document).ready(function(){
    SelectedFieldModal(ProposalFormType_API_URL, "Edit", "proposal_type")
    SelectedFieldModal(ProposalFormStatus_API_URL, "Edit", "proposal_status")
    SelectedFieldModal(AssetList_API_URL, "Edit", "asset_list")
    SelectedFieldModal(StaffList_URL, "Edit", "proposer")

  
    //Add
    SelectedFieldModal(ProposalFormType_API_URL, "Create", "proposal_type")
    SelectedFieldModal(ProposalFormStatus_API_URL, "Create", "proposal_status")
    SelectedFieldModal(StaffList_URL, "Create", "proposer")
    SelectedFieldModal(AssetList_API_URL, "Create", "asset_list")

  });
  
  // Funtion hiện thị select lên form modal
  function SelectedFieldModal(URL, apart, InputId){
    for (var i = 1; i < 2; i++) {
      var pages = "?page="+ i;
      $.ajax({
      url: URL+pages,
      dataType: 'JSON',
      type: 'GET',
      success: function(data){
          var html = '<option value="">---</option>'
          var dlen = data.results.length
          for (var i = 0; i < dlen; i++) {
              var val = data.results[i]
              html += '<option value="'+ val.uuid +'">'+ val.name +'</option>'
              }
          $("#"+InputId+"ProposalFormType"+apart+"ModalInputId").append(html);
          }
      });
  }
  }

  
  // Export excel
  $(document).ready(function() {
    $('#proposalFormTypeExportExcelBtnId').click(function() {
        // Define the columns to export
        var columnsToExport = [0, 1, 2, 3, 4, 5, 6]; // columns 1, 2, and 4 (zero-indexed)
        var theadToExport = '';
        $('#proposalFormTypeDataTableId thead').each(function() {
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
        $('#proposalFormTypeDataTableId tbody tr').each(function() {
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
          filename: 'thông_tin_kiểu_đơn_%DD%-%MM%-%YY%',
          format: 'xls',
          escape: 'false',
  
        });
    });
  });
  
  // Search Start - khoi tao doi tuong function
  function ProposalFormTypeSearchData(page=1,search_type,search_data=null){
    search_log["search_func"] = "ProposalFormTypeSearchData";
    search_log["search_type"] = search_type;
    search_log["search_data"] = search_data;
        var obj = new ProposalFormType();
        var results = obj.tSearchAllObjApi(page,search_data,search_type);
        obj.callAjax.then(function(data) {
        $("#proposalFormTypeTableBodyId").empty();
        var body = $("#proposalFormTypeDataTableId");
        //if (body.length > 0){
        //    var bodyTable = body.DataTable();
        //    bodyTable.clear();
        //}
        ASSET_ID_TABLE_COUNT = 1;
        crr_record_in_page = ProposalFormTyperecord_in_page;
        if(page>1){
        ASSET_ID_TABLE_COUNT =1+crr_record_in_page*page-crr_record_in_page;
        }
        for (var i = 0; i < results.length; i++){
            try{
                console.log('results[i] = ', results[i]);
  
                //results[i].tFillTable2();
                results[i].tFillTable3();
  
                ASSET_ID_TABLE_COUNT++;
                // results[i].tFillTable1();
            }
            catch(err){
                console.log(err);
            }
        }
        search_type = search_type.trim()
        var pagination = ProposalFormTypepagination;
        var pagenation_ele=$(".pagination-ProposalFormType");
        pagenation_ele.html('');
        var page_total_ele = $(".page-total-ProposalFormType");
        page_total_ele.html(`<footer class="blockquote-footer mt-3">Tổng số: ${pagination["total"]} bản ghi </footer>`);
        
        if (results.length > 0) {
                pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="ProposalFormTypeSearchData(1,'`+search_type+`'`+ `,'`+search_data+`'`+ `)">Đầu</a></li>`);
  
                if (pagination["has_prev"] == true) {
                    pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="ProposalFormTypeSearchData(` + (parseInt(pagination["current_page"]) - 1) +`,'`+search_type+`'`+ `,'`+search_data+`'`+ `)">` + (parseInt(pagination["current_page"]) - 1) + `</a></li>`);
                }
                pagenation_ele.append('<li class="page-item active"><a class="page-link" >' + (parseInt(pagination["current_page"])) + '</a></li>');
                if (pagination["has_next"] == true) {
                    pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="ProposalFormTypeSearchData(` + (parseInt(pagination["current_page"]) + 1) +`,'`+search_type+`'`+ `,'`+search_data+`'`+ `)">` + (parseInt(pagination["current_page"]) + 1) + `</a></li>`);
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
                pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="ProposalFormTypeSearchData(`+last_page_order+`,'`+search_type+`'`+ `,'`+search_data+`'`+ `)">Cuối</a></li>`);
                }
            }
            if (search_type == "quick") {
                var crr_txt = $("#proposalFormTypeQuickSearchInputId").val();
                highlight(crr_txt,"#proposalFormTypeTableBodyId");
            }
    })
  
  }
  
  // Function Enter Search
  $(document).ready(function(){
    $("#proposalFormTypeQuickSearchInputId").on('keyup', function(e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            ProposalFormTypepagination={
                current_page:1,
                total:0,
                has_next:false,
                has_prev:false
            }
            ProposalFormTypeSearchData(ProposalFormTypepagination["current_page"],"quick");
        }
    })
    $("#proposalFormTypeQuickSearchBtnId").click(function(){
        ProposalFormTypepagination={
            current_page:1,
            total:0,
            has_next:false,
            has_prev:falseGProposalFormTypeSearchData(ProposalFormTypepagination["current_page"],"quick")
    }});
    $("#proposalFormTypeSearchBtnId").click(function(){
        ProposalFormTypepagination={
            current_page:1,
            total:0,
            has_next:false,
            has_prev:false
    }
        ProposalFormTypeSearchData(ProposalFormTypepagination["current_page"],"filter");
    })
  });

  function CheckUnique(code){
    var slugSearch = "?search=" + code
    $.ajax({
      url: ProposalFormType_SEARCH_URL + slugSearch,
      dataType: 'JSON',
      type: 'GET',
      success: function(data){
        if (data.results.length > 0){
          toastr.warning('Mã kiểu đã tồn tại');
        }
          }
      });
  }
