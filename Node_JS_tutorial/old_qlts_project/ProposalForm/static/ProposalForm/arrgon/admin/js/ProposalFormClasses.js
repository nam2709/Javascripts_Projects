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
  var ProposalForm_arr_action = [
                  // default action
                  {
                      "title": "Xem chi tiết",
                      "func": "ProposalFormDetails",
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
                      "func": "ProposalFormEdit",
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
                      "func": "ProposalFormOnDeleteEvent",
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
  // create function from hand
function ProposalFormCreate(){
  $('proposalFormCreatemodalsId').modal('toggle');
  // var obj=new ProposalForm();
  // obj.tGetObjApi(uuid);
  // obj.callAjax.then(function(data) {
  //     new ProposalForm(data).tFillFormModal('Detail','proposalFormDetailModalsFormId');

  // })
  // // obj.tFillFormModal('Detail')'
}

  // Actions functions
  function ProposalFormDetails(uuid){
      $('#proposalFormDetailmodalsId').modal('toggle');
      var obj=new ProposalForm();
      obj.tGetObjApi(uuid);
      obj.callAjax.then(function(data) {
          new ProposalForm(data).tFillFormModal('Detail','proposalFormDetailModalsFormId');
  
      })
      // obj.tFillFormModal('Detail');
  }
  
  function ProposalFormEdit(uuid){
      $('#proposalFormEditmodalsId').modal('toggle');
      var obj=new ProposalForm();
      obj.tGetObjApi(uuid);
      obj.callAjax.then(function(data) {
          new ProposalForm(data).tFillFormModal('Edit','proposalFormEditModalsFormId');
  
      })
      // obj.tFillFormModal('Edit');
  }
  
  function ProposalFormOnDeleteEvent(uuid){
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
                                  var obj=new ProposalForm();
                                  obj.tDeleteApi(uuid);
                              }
                          },
                          
                      }
              });
          
      }
      else { 
          ProposalFormOnDeleteWithDataSearchEvent(uuid);
      }
  
  }
  function ProposalFormOnDeleteWithDataSearchEvent(uuid){
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
                  var obj=new ProposalForm();
                  
                  obj.tDeleteApiWithDataSearch(uuid,AccountActionsSearchData);
              }
          },
          
      }
  });
      
  }
  
  function ProposalFormViewDetail(selectionId){
      var select = $("#"+selectionId);
      if(select.length>0){
          var value =  select.val()
          if(value == "" || value == null || value == undefined){
              return;
          }
          else {
              $('#proposalFormDetailmodalsId').modal('toggle');
              var obj=new ProposalForm();
              obj.tGetObjApi(value);
              obj.callAjax.then(function(data) {
                  new ProposalForm(data).tFillFormModal('Detail','proposalFormDetailModalsFormId');
              })
          }
      }
  }
  
  var record_in_page = 10;
  
  class ProposalForm {
    // ########## Init Objects ##############
    constructor(data = null) {
      if (data != null) {
        if (data.hasOwnProperty('uuid')) {
          this.uuid = data.uuid;
        }
        else {
          // this.code = null;
        }
  
        // this.__app_name__ = "AssetManagement";
  
        // this.__model_name__ = "Asset";
  
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
          this.editUrl = '/ProposalForm/ProposalForm/edit/' + this.uuid + '/';
          this.detailUrl = '/ProposalForm/ProposalForm/detail/' + this.uuid + '/';
        }
        else {
          // this.uuid = null;
        }

        if (data.hasOwnProperty('reason')) {
          this.reason = data.reason;
        }
        else {
          // this.reason = null;
        }

        if (data.hasOwnProperty('company')) {
          this.company = data.company;
          this.name_company = data.name_company;
        }
        else {
          // this.company = null;
        }
  
        if (data.hasOwnProperty('proposal_type')) {
          this.proposal_type = data.proposal_type;
          this.name_proposal_type = data.name_proposal_type;
        }
        else {
          // this.proposal_type = null;
        }
  
        if (data.hasOwnProperty('proposal_status')) {
            this.proposal_status = data.proposal_status;
            this.name_proposal_status = data.name_proposal_status;
        }
        else {
            // this.proposal_status = null;
        }

        if (data.hasOwnProperty('proposer')) {
            this.proposer = data.proposer;
            this.name_proposer = data.name_proposer;
        }
        else {
            // this.proposer = null;
        }

        if (data.hasOwnProperty('asset_list')) {
            this.asset_list = data.asset_list;
            this.name_asset_list = data.name_asset_list;
            this.code_asset_list = data.code_asset_list;
        }
        else {
            // this.asset_list = null;
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
        var chEle = formEle.find("#nameProposalFormInputId"); //Kiêrm tra giá trị của form id name
        if (chEle.length > 0) {
          this.name = chEle.val();
        }
        else {
          // this.name = null;
        }
        var chEle = formEle.find("#uuidProposalFormInputId");
        if (chEle.length > 0) {
          this.uuid = chEle.val();
        }
        else {
          // this.uuid = null;
        }
        var chEle = formEle.find("#codeProposalFormInputId");
        if (chEle.length > 0) {
          this.code = chEle.val();
        }
        else {
          // this.code = null;
        }
        var chEle = formEle.find("#reasonProposalFormInputId");
        if (chEle.length > 0) {
          this.reason = chEle.val();
        }
        else {
          // this.code = null;
        }
        var chEle = formEle.find("#companyProposalFormInputId");
        if (chEle.length > 0) {
          this.company = chEle.val();
        }
        else {
          // this.code = null;
        }
        var chEle = formEle.find("#proposal_typeProposalFormInputId");
        if (chEle.length > 0) {
          this.proposal_type = chEle.val();
        }
        else {
          // this.asset_type = null;
        }
        var chEle = formEle.find("#proposal_statusProposalFormInputId");
        if (chEle.length > 0) {
          this.proposal_status = chEle.val();
        }
        else {
          // this.asset_type = null;
        }
        var chEle = formEle.find("#proposerProposalFormInputId");
        if (chEle.length > 0) {
          this.proposer = chEle.val();
        }
        else {
          // this.asset_type = null;
        }
        var chEle = formEle.find("#asset_listProposalFormInputId");
        if (chEle.length > 0) {
          this.asset_list = chEle.val();
        }
        else {
          // this.asset_type = null;
        }
        var chEle = formEle.find("#created_atProposalFormInputId");
        if (chEle.length > 0) {
          this.created_at = chEle.val();
        }
        else {
          // this.created_at = null;
        }
        var chEle = formEle.find("#updated_atProposalFormInputId");
        if (chEle.length > 0) {
          this.updated_at = chEle.val();
        }
        else {
          // this.updated_at = null;
        }
        var chEle = formEle.find("#created_byProposalFormInputId");
        if (chEle.length > 0) {
          this.created_by = chEle.val();
        }
        else {
          // this.created_by = null;
        }
        var chEle = formEle.find("#updated_byProposalFormInputId");
        if (chEle.length > 0) {
          this.updated_by = chEle.val();
        }
        else {
          // this.updated_by = null;
        }
      }
      else {
        var chEle = $("#codeProposalFormInputId");
        if (chEle.length > 0) {
          this.code = chEle.val();
        }
        else {
          // this.code = null;
        }
        var chEle = $("#nameProposalFormInputId");
        if (chEle.length > 0) {
          this.name = chEle.val();
        }
        else {
          // this.name = null;
        }
        var chEle = $("#uuidProposalFormInputId");
        if (chEle.length > 0) {
          this.uuid = chEle.val();
        }
        else {
          // this.uuid = null;
        }
        var chEle = $("#reasonProposalFormInputId");
        if (chEle.length > 0) {
          this.reason = chEle.val();
        }
        else {
          // this.reason = null;
        }
        var chEle = $("#companyProposalFormInputId");
        if (chEle.length > 0) {
          this.company = chEle.val();
        }
        else {
          // this.company = null;
        }
        var chEle = $("#proposal_typeProposalFormInputId");
        if (chEle.length > 0) {
          this.proposal_type = chEle.val();
        }
        else {
          // this.proposal_type = null;
        }
        var chEle = $("#proposal_statusProposalFormInputId");
        if (chEle.length > 0) {
          this.proposal_status = chEle.val();
        }
        else {
          // this.proposal_status = null;
        }
        var chEle = $("#proposerProposalFormInputId");
        if (chEle.length > 0) {
          this.proposer = chEle.val();
        }
        else {
          // this.proposer = null;
        }
        var chEle = $("#asset_listProposalFormInputId");
        if (chEle.length > 0) {
          this.asset_list = chEle.val();
        }
        else {
          // this.asset_list = null;
        }
        var chEle = $("#created_atProposalFormInputId");
        if (chEle.length > 0) {
          this.created_at = chEle.val();
        }
        else {
          // this.created_at = null;
        }
        var chEle = $("#updated_atProposalFormInputId");
        if (chEle.length > 0) {
          this.updated_at = chEle.val();
        }
        else {
          // this.updated_at = null;
        }
        var chEle = $("#created_byProposalFormInputId");
        if (chEle.length > 0) {
          this.created_by = chEle.val();
        }
        else {
          // this.created_by = null;
        }
        var chEle = $("#updated_byProposalFormInputId");
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
        var j_ele_name = $("#nameProposalFormInputId");
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
        var j_ele_uuid = $("#uuidProposalFormInputId");
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
        var j_ele_code = $("#codeProposalFormInputId");
        if (j_ele_code.length > 0) {
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
        var j_ele_reason = $("#reasonProposalFormInputId");
        if (j_ele_reason.length > 0) {
          if (j_ele_reason.attr('name') != 'uuid') {
            j_ele_reason.val(self.reason).change();
          }
        }
        else {
          // j_ele_reason.val(null);
        }
      }
      catch (err) {
        console.log('err = ', err);
      }  

      try {
        var j_ele_company = $("#companyProposalFormInputId");
        if (j_ele_company.length > 0) {
          if (j_ele_company.attr('name') != 'uuid') {
            j_ele_company.val(self.company).change();
          }
        }
        else {
          // j_ele_company.val(null);
        }
      }
      catch (err) {
        console.log('err = ', err);
      }  

      try {
        var j_ele_proposal_type = $("#proposal_typeProposalFormInputId");
        if (j_ele_proposal_type.length > 0) {
          if (j_ele_proposal_type.attr('name') != 'uuid') {
            j_ele_proposal_type.val(self.proposal_type).change();
          }
        }
        else {
          // j_ele_proposal_type.val(null);
        }
      }
      catch (err) {
        console.log('err = ', err);
      }
  
      try {
        var j_ele_proposal_status = $("#proposal_statusProposalFormInputId");
        if (j_ele_proposal_status.length > 0) {
          if (j_ele_proposal_status.attr('name') != 'uuid') {
            j_ele_proposal_status.val(self.proposal_status).change();
          }
        }
        else {
          // j_ele_proposal_status.val(null);
        }
      }
      catch (err) {
        console.log('err = ', err);
      }

      try {
        var j_ele_proposer = $("#proposerProposalFormInputId");
        if (j_ele_proposer.length > 0) {
          if (j_ele_proposer.attr('name') != 'uuid') {
            j_ele_proposer.val(self.proposer).change();
          }
        }
        else {
          // j_ele_proposer.val(null);
        }
      }
      catch (err) {
        console.log('err = ', err);
      }
      
      try {
        var j_ele_updated_at = $("#updated_atProposalFormInputId");
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
        var j_ele_created_at = $("#created_atProposalFormInputId");
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
        var j_ele_name = $("#nameProposalForm"+apart+"InputId");
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
        var j_ele_code = $("#codeProposalForm"+apart+"InputId");
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
        var j_ele_uuid = $("#uuidProposalForm"+apart+"InputId");
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
        var j_ele_reason = $("#reasonProposalForm"+apart+"InputId");
        if (j_ele_reason.length > 0) {
          if (j_ele_reason.attr('name') != 'uuid') {
            j_ele_reason.val(self.reason).change();
          }
        }
        else {
          // j_ele_reason.val(null);
        }
      }
      catch (err) {
        console.log('err = ', err);
      }
  
      try {
        var j_ele_company = $("#companyProposalForm"+apart+"InputId");
        if (j_ele_company.length > 0) {
          if (j_ele_company.attr('name') != 'uuid') {
            j_ele_company.val(self.company).change();
          }
        }
        else {
          // j_ele_company.val(null);
        }
      }
      catch (err) {
        console.log('err = ', err);
      }
        
      try {
        var j_ele_name_company = $("#name_companyProposalForm"+apart+"InputId");
        if (j_ele_name_company.length > 0) {
          if (j_ele_name_company.attr('name') != 'uuid') {
            j_ele_name_company.val(self.name_company).change();
          }
        }
        else {
          // j_ele_name_company.val(null);
        }
      }
      catch (err) {
        console.log('err = ', err);
      }
  
      //fill modal edit
      try {
        var j_ele_proposal_type = $("#proposal_typeProposalForm"+apart+"InputId");
        if (j_ele_proposal_type.length > 0) {
          if (j_ele_proposal_type.attr('name') != 'uuid') {
            j_ele_proposal_type.val(self.proposal_type).change();
          }
        }
        else {
          // j_ele_nick_name.val(null);
        }
      }
      catch (err) {
        console.log('err = ', err);
      }
      // fill modal detail
      try {
        var j_ele_name_proposal_type = $("#name_proposal_typeProposalForm"+apart+"InputId");
        if (j_ele_name_proposal_type.length > 0) {
          if (j_ele_name_proposal_type.attr('name') != 'uuid') {
            j_ele_name_proposal_type.val(self.name_proposal_type).change();
          }
        }
        else {
          // j_ele_nick_name.val(null);
        }
      }
      catch (err) {
        console.log('err = ', err);
      }
  
      //fill modal edit
      try {
        var j_ele_proposal_status = $("#proposal_statusProposalForm"+apart+"InputId");
        if (j_ele_proposal_status.length > 0) {
          if (j_ele_proposal_status.attr('name') != 'uuid') {
            j_ele_proposal_status.val(self.proposal_status).change();
          }
        }
        else {
          // j_ele_nick_name.val(null);
        }
      }
      catch (err) {
        console.log('err = ', err);
      }
      // fill modal detail
      try {
        var j_ele_name_proposal_status = $("#name_proposal_statusProposalForm"+apart+"InputId");
        if (j_ele_name_proposal_status.length > 0) {
          if (j_ele_name_proposal_status.attr('name') != 'uuid') {
            j_ele_name_proposal_status.val(self.name_proposal_status).change();
          }
        }
        else {
          // j_ele_nick_name.val(null);
        }
      }
      catch (err) {
        console.log('err = ', err);
      }

      //fill modal edit
      try {
        var j_ele_proposer = $("#proposerProposalForm"+apart+"InputId");
        if (j_ele_proposer.length > 0) {
          if (j_ele_proposer.attr('name') != 'uuid') {
            j_ele_proposer.val(self.proposer).change();
          }
        }
        else {
          // j_ele_nick_name.val(null);
        }
      }
      catch (err) {
        console.log('err = ', err);
      }
      // fill modal detail
      try {
        var j_ele_name_proposer = $("#name_proposerProposalForm"+apart+"InputId");
        if (j_ele_name_proposer.length > 0) {
          if (j_ele_name_proposer.attr('name') != 'uuid') {
            j_ele_name_proposer.val(self.name_proposer).change();
          }
        }
        else {
          // j_ele_nick_name.val(null);
        }
      }
      catch (err) {
        console.log('err = ', err);
      }
  
      //fill modal edit
      try {
        var j_ele_asset_list = $("#asset_listProposalForm"+apart+"InputId");
        if (j_ele_asset_list.length > 0) {
          if (j_ele_asset_list.attr('name') != 'uuid') {
            j_ele_asset_list.val(self.asset_list).change();
          }
        }
        else {
          // j_ele_nick_name.val(null);
        }
      }
      catch (err) {
        console.log('err = ', err);
      }
      // fill modal detail
      try {
        var j_ele_name_asset_list = $("#name_asset_listProposalForm"+apart+"InputId");
        if (j_ele_name_asset_list.length > 0) {
          if (j_ele_name_asset_list.attr('name') != 'uuid') {
            j_ele_name_asset_list.val(self.name_asset_list).change();
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
        var j_ele_code_asset_list = $("#code_asset_listProposalForm"+apart+"InputId");
        if (j_ele_code_asset_list.length > 0) {
          if (j_ele_code_asset_list.attr('name') != 'uuid') {
            j_ele_code_asset_list.val(self.code_asset_list).change();
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
        var j_ele_updated_at = $("#updated_atProposalForm"+apart+"InputId");
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
        var j_ele_created_at = $("#created_atProposalForm"+apart+"InputId");
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
        url: ProposalForm_API_URL,
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
          self = new ProposalForm(data);
          ProposalFormGetDataTable(ProposalFormpagination["current_page"]);
          if (is_continue_form) {
            is_continue_form = false;
            toastr.success('Thêm mới thành công');
            $(location).prop('href', "/ProposalForm/ProposalForm/create/");
  
  
          } else if (is_continue_modal) {
            is_continue_modal = false;
            ProposalFormRefreshCreateModal();
            toastr.success('Thêm mới thành công');
          } else {
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
          'X-CSRFToken': getCSRFTokenValue(), 
        },
        tryCount: 0,
        retryLimit: 3,
  
      });
      var self = this;
      var formData;
      var form;
      var arr_table = [];
      if (formId == null) {
        formData = new FormData($('#proposalFormCreateFormId')[0]);
  
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
              url: ProposalForm_API_URL + idForm + "/",
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
                    self = new ProposalForm(data);
                    
                    ProposalFormGetDataTable(ProposalFormpagination["current_page"]);
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
      formData = new FormData($('#proposalFormCreateFormId')[0]);
  
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
        url: ProposalForm_API_URL,
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
                self = new ProposalForm(data);
                ProposalFormGetDataTable(ProposalFormpagination["current_page"]);
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
        url: ProposalForm_API_URL+ uuid + "/",
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
        url: ProposalForm_API_URL+ uuid_go + "/",
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
          ProposalFormGetDataTable(ProposalFormpagination["current_page"]);
          if (cr_uuid != "") {
            $(location).prop('href', "/ProposalForm/ProposalForm/create/");
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
        url: ProposalForm_API_URL+ uuid + "/",
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
              url: ProposalForm_API_URL+ has_go_page,
          type: "GET",
          //async: false,
          cache: false,
          timeout: 30000,
  
          success: function (data) {
            console.log('[tGetAllObjApi] data = ', data);
            if (data.hasOwnProperty('count')) {
              ProposalFormpagination["total"] = data.count;
            }
            if (data.hasOwnProperty('count')) {
              ProposalFormpagination["total"] = data.count;
            }
            if (data.hasOwnProperty('next')) {
              if (data.next != null) {
                ProposalFormpagination["has_next"] = true;
              } else {
                ProposalFormpagination["has_next"] = false;
  
              }
            }
            ProposalFormpagination["current_page"] = page;
            if (data.hasOwnProperty('previous')) {
              if (data.previous != null) {
                ProposalFormpagination["has_prev"] = true;
              } else {
                ProposalFormpagination["has_prev"] = false;
              }
            }
            if (data.hasOwnProperty('results')) {
              for (var j = 0; j < data.results.length; j++) {
                var tmp = new ProposalForm(data.results[j]);
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
        SEARCH_URL = ProposalForm_FILTER_URL;
  
        slugSearch = "&";
  
        if ($("#nameProposalFormFilterSearchInputId").length > 0) {
          var value = $("#nameProposalFormFilterSearchInputId").val();
          if (value != "" && value != null) {
            slugSearch += "name__contains=" + value + "&";
          }
        }
  
        slugSearch = slugSearch.slice(0, -1);
      } else {
        SEARCH_URL = ProposalForm_SEARCH_URL;
  
        slugSearch = "&";
        slugSearch += "search=" + $("#proposalFormQuickSearchInputId").val();
  
      }
      if (search_data != null) {
        SEARCH_URL = ProposalForm_FILTER_URL;
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
            // return new ProposalForm(data);
            if (data.hasOwnProperty('count')) {
              ProposalFormpagination["total"] = data.count;
            }
            if (data.hasOwnProperty('count')) {
              ProposalFormpagination["total"] = data.count;
            }
            if (data.hasOwnProperty('next')) {
              if (data.next != null) {
                ProposalFormpagination["has_next"] = true;
              } else {
                ProposalFormpagination["has_next"] = false;
  
              }
            }
            ProposalFormpagination["current_page"] = page;
            if (data.hasOwnProperty('previous')) {
              if (data.previous != null) {
                ProposalFormpagination["has_prev"] = true;
              } else {
                ProposalFormpagination["has_prev"] = false;
              }
            }
            if (data.hasOwnProperty('results')) {
              for (var j = 0; j < data.results.length; j++) {
                var tmp = new ProposalForm(data.results[j]);
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
          url: ProposalForm_API_URL+ uuid+ "/",
          type: "GET",
          async: false,
          cache: false,
          timeout: 30000,
  
          success: function (data) {
            console.log('[tGetObjApi] data = ', data);
            var n_obj = new ProposalForm(data);
            console.log('n_obj = ', n_obj);
            // n_obj.tFillForm();
            return n_obj;
            // if (data.hasOwnProperty('results')){
            //    if (data.results.length > 0){
            //        var tmp = new ProposalForm(data[i]);
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
      var tbId = "proposalFormDataTableId";
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
              html += `<td class="text-wrap" style="min-width:300px" onclick="ProposalFormDetails('` + this["uuid"] + `')"><a>` + (this[attr]) + `</a></td>`;
              continue;

            }

  
            //html +=`<td class="text-wrap"><a>` + (this[attr]) + `</a></td>`;
            html += `<td class="text-wrap"><a>` + (this[attr]) + `</a></td>`;
          }
          else {
            if (attr == "asset-admin-action"){
                html += BindActionButtonVer4(
                  ProposalForm_arr_action,
                  this["uuid"],
                  this,
                  null,
                  this["created_by"],
                );
              }
            else {
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
  function ProposalFormGetDataTable(page=1,search_data=null){
      search_log["search_func"] = "ProposalFormGetDataTable";
      search_log["search_data"] = search_data;
      search_log["search_type"] = "";
  
      var obj = new ProposalForm();
      var results = obj.tGetAllObjApi(page,search_data);
      obj.callAjax.then(function(data) {
      $("#proposalFormTableBodyId").empty();
      var body = $("#proposalFormDataTableId");
      //if (body.length > 0){
      //    var bodyTable = body.DataTable();
      //    bodyTable.clear();
      //}
      ASSET_ID_TABLE_COUNT = 1;
      var crr_record_in_page = ProposalFormrecord_in_page;
  
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
      var pagenation_ele=$(".pagination-ProposalForm");
      var pagination=ProposalFormpagination;
      pagenation_ele.html('');
      var page_total_ele = $(".page-total-ProposalForm");
      page_total_ele.html(`<footer class="mt-3 blockquote-footer">Tổng số: ${pagination["total"]} bản ghi </footer>`);
      if (results.length > 0) {
          
                  pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="ProposalFormGetDataTable(1)">Đầu</a></li>`);
                  if (pagination["has_prev"] == true) {
                      pagenation_ele.append('<li class="page-item"><a class="page-link" onclick="ProposalFormGetDataTable(' + (parseInt(pagination["current_page"]) - 1) + ')">' + (parseInt(pagination["current_page"]) - 1) + '</a></li>');
                  }
                  pagenation_ele.append('<li class="page-item active"><a class="page-link" >' + (parseInt(pagination["current_page"])) + '</a></li>');
                  if (pagination["has_next"] == true) {
                      pagenation_ele.append('<li class="page-item"><a class="page-link" onclick="ProposalFormGetDataTable(' + (parseInt(pagination["current_page"]) + 1) + ')">' + (parseInt(pagination["current_page"]) + 1) + '</a></li>');
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
                  pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="ProposalFormGetDataTable(`+last_page_order+`)">Cuối</a></li>`);
                  }
              }
  })
  }
  
  var ProposalFormpagination={
      current_page:1,
      total:0,
      has_next:false,
      has_prev:false
  }
    
  var ProposalFormrecord_in_page = 5;
  
  // Run function fill data table
  $(document).ready(function(){
      var IdTable ="proposalFormDataTableId";
      var checker = $("#" +IdTable );
      if (checker.length > 0){
          if($('#'+IdTable).is(":visible")){
              ProposalFormGetDataTable(ProposalFormpagination["current_page"]);
          }
      }
  })
  
  $(document).ready(function(){
      var selectionId ="proposalFormDetailModalsFormId";
      ProposalFormViewDetail(selectionId)
  })
  
  // [Save Create] Clicked Handle function
  $(document).ready(function(){
    $("#proposalFormCreateModalBtnId").click(function(){
        var validate_obj = new InputValidation('proposalFormCreateModalsFormId');
        if(validate_obj.validateRequired()){
            toastr.warning('Vui lòng điền đầy đủ thông tin');
            return;
        }
        obj = new ProposalForm();
        console.log('Save obj = ', obj);
        obj.tCreateNewPostFormApi('proposalFormCreateModalsFormId');
    })
  });
  
  // [SAVE UPDATE]
  $(document).ready(function(){
    $("#proposalFormUpdateModalBtnId").click(function(){
        obj = new ProposalForm();
        obj.tUpdatePostApi('proposalFormEditModalsFormId');
    })
  });
  
  // add selected
  $(document).ready(function(){
    SelectedFieldModal(ProposalFormType_API_URL, "Edit", "proposal_type")
    SelectedFieldModal(ProposalFormStatus_API_URL, "Edit", "proposal_status")
    SelectedFieldModal(AssetList_API_URL, "Edit", "asset_list")
    SelectedFieldModal(StaffList_URL, "Edit", "proposer")
    SelectedFieldModal(CompanyList_URL, "Edit", "company")


  
    //Add
    SelectedFieldModal(ProposalFormType_API_URL, "Create", "proposal_type")
    SelectedFieldModal(ProposalFormStatus_API_URL, "Create", "proposal_status")
    SelectedFieldModal(StaffList_URL, "Create", "proposer")
    SelectedFieldModal(AssetList_API_URL, "Create", "asset_list")
    SelectedFieldModal(CompanyList_URL, "Create", "company")

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
          $("#"+InputId+"ProposalForm"+apart+"ModalInputId").append(html);
          }
      });
  }
  }
  
  // Export excel
  $(document).ready(function() {
    $('#proposalFormExportExcelBtnId').click(function() {
        // Define the columns to export
        var columnsToExport = [0, 1, 2, 3, 4, 5, 6]; // columns 1, 2, and 4 (zero-indexed)
        var theadToExport = '';
        $('#proposalFormDataTableId thead').each(function() {
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
        $('#proposalFormDataTableId tbody tr').each(function() {
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
          filename: 'thông_tin_đơn_đề_xuất_%DD%-%MM%-%YY%',
          format: 'xls',
          escape: 'false',
  
        });
    });
  });
  
  // Search Start - khoi tao doi tuong function
  function ProposalFormSearchData(page=1,search_type,search_data=null){
    search_log["search_func"] = "ProposalFormSearchData";
    search_log["search_type"] = search_type;
    search_log["search_data"] = search_data;
        var obj = new ProposalForm();
        var results = obj.tSearchAllObjApi(page,search_data,search_type);
        obj.callAjax.then(function(data) {
        $("#proposalFormTableBodyId").empty();
        var body = $("#proposalFormDataTableId");
        //if (body.length > 0){
        //    var bodyTable = body.DataTable();
        //    bodyTable.clear();
        //}
        ASSET_ID_TABLE_COUNT = 1;
        crr_record_in_page = ProposalFormrecord_in_page;
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
        var pagination = ProposalFormpagination;
        var pagenation_ele=$(".pagination-ProposalForm");
        pagenation_ele.html('');
        var page_total_ele = $(".page-total-ProposalForm");
        page_total_ele.html(`<footer class="blockquote-footer mt-3">Tổng số: ${pagination["total"]} bản ghi </footer>`);
        
        if (results.length > 0) {
                pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="ProposalFormSearchData(1,'`+search_type+`'`+ `,'`+search_data+`'`+ `)">Đầu</a></li>`);
  
                if (pagination["has_prev"] == true) {
                    pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="ProposalFormSearchData(` + (parseInt(pagination["current_page"]) - 1) +`,'`+search_type+`'`+ `,'`+search_data+`'`+ `)">` + (parseInt(pagination["current_page"]) - 1) + `</a></li>`);
                }
                pagenation_ele.append('<li class="page-item active"><a class="page-link" >' + (parseInt(pagination["current_page"])) + '</a></li>');
                if (pagination["has_next"] == true) {
                    pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="ProposalFormSearchData(` + (parseInt(pagination["current_page"]) + 1) +`,'`+search_type+`'`+ `,'`+search_data+`'`+ `)">` + (parseInt(pagination["current_page"]) + 1) + `</a></li>`);
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
                pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="ProposalFormSearchData(`+last_page_order+`,'`+search_type+`'`+ `,'`+search_data+`'`+ `)">Cuối</a></li>`);
                }
            }
            if (search_type == "quick") {
                var crr_txt = $("#proposalFormQuickSearchInputId").val();
                highlight(crr_txt,"#proposalFormTableBodyId");
            }
    })
  }
  
  // Function Enter Search
  $(document).ready(function(){
    $("#proposalFormQuickSearchInputId").on('keyup', function(e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            ProposalFormpagination={
                current_page:1,
                total:0,
                has_next:false,
                has_prev:false
            }
            ProposalFormSearchData(ProposalFormpagination["current_page"],"quick");
        }
    })
    $("#proposalFormQuickSearchBtnId").click(function(){
        ProposalFormpagination={
            current_page:1,
            total:0,
            has_next:false,
            has_prev:falseGProposalFormSearchData(ProposalFormpagination["current_page"],"quick")
    }});
    $("#proposalFormSearchBtnId").click(function(){
        ProposalFormpagination={
            current_page:1,
            total:0,
            has_next:false,
            has_prev:false
    }
        ProposalFormSearchData(ProposalFormpagination["current_page"],"filter");
    })
  });

  function CheckUnique(code){
    var slugSearch = "?search=" + code
    $.ajax({
      url: ProposalForm_SEARCH_URL + slugSearch,
      dataType: 'JSON',
      type: 'GET',
      success: function(data){
        if (data.results.length > 0){
        }
          }
      });
  }

  $(document).ready(function(){
    $("#proposalFormCancelCreateModalBtnId").click(function(){
        $(':input','#proposalFormCreatemodalsId')
  .not(':button, :submit, :reset, :hidden')
  .val('').trigger('change')
  .removeAttr('checked')
  .removeAttr('selected');
    })
  });

  function ProposalFormRefreshCreateModal() {
    $('#proposalFormCreatemodalsId')
        .find("input[type=text],input[type=number],textarea,select")
        .val('').removeClass("is-invalid").removeClass("is-valid")
        .end()
        .find("input[data-datepicker]").val('').removeClass("is-invalid").removeClass("is-valid")
        .end()
        .find("input[type=checkbox], input[type=radio]").removeClass("is-invalid").removeClass("is-valid")
        .prop("checked", false)
        .end();
};

$(document).ready(function(){

  $('#proposalFormCreatemodalsId').on('hidden.bs.modal', function (e) {
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
            var table = new proposalFormcreateTnvTable($(this));
            table.refresh(); 
      })
         
  })
});

  // -------------------------------------------------------------------------------------------------------
  