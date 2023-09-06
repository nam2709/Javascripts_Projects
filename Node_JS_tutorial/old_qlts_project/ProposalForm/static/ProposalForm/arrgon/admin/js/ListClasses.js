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
  // function idv4() {
  //   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
  //       var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
  //       return v.toString(16);
  //   });
  // }
  
  // Function actuion CRUD
  var List_arr_action = [
                  // default action
                  {
                      "title": "Xem chi tiết",
                      "func": "ListDetails",
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
                      "func": "ListEdit",
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
                      "func": "ListOnDeleteEvent",
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
  function ListDetails(uuid){
      $('#listDetailmodalsId').modal('toggle');
      var obj=new List();
      obj.tGetObjApi(uuid);
      obj.callAjax.then(function(data) {
          new List(data).tFillFormModal('Detail','listDetailModalsFormId');

      })
      // obj.tFillFormModal('Detail');
  }
  
  function ListEdit(uuid){
      $('#listEditmodalsId').modal('toggle');
      var obj=new List();
      obj.tGetObjApi(uuid);
      obj.callAjax.then(function(data) {
          new List(data).tFillFormModal('Edit','listEditModalsFormId');
  
      })
      // obj.tFillFormModal('Edit');
  }
  
  function ListOnDeleteEvent(uuid){
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
                                  var obj=new List();
                                  obj.tDeleteApi(uuid);
                              }
                          },
                          
                      }
              });
          
      }
      else { 
          ListOnDeleteWithDataSearchEvent(uuid);
      }
  
  }
  function ListOnDeleteWithDataSearchEvent(uuid){
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
                  var obj=new List();
                  
                  obj.tDeleteApiWithDataSearch(uuid,AccountActionsSearchData);
              }
          },
          
      }
  });
      
  }
  
  function ListViewDetail(selectionId){
      var select = $("#"+selectionId);
      if(select.length>0){
          var value =  select.val()
          if(value == "" || value == null || value == undefined){
              return;
          }
          else {
              $('#listDetailmodalsId').modal('toggle');
              var obj=new List();
              obj.tGetObjApi(value);
              obj.callAjax.then(function(data) {
                  new List(data).tFillFormModal('Detail','listDetailModalsFormId');
              })
          }
      }
  }
  
  var record_in_page = 10;
  
  class List {
    // ########## Init Objects ##############
    constructor(data = null) {
      if (data != null) {
        if (data.hasOwnProperty('uuid')) {
          this.uuid = data.uuid;
        }
        else {
          // this.uuid = null;
        }

        if (data.hasOwnProperty('name')) {
          this.name = data.name;
        }
        else {
          // this.name = null;
        }

        if (data.hasOwnProperty('list')) {
          this.list = data.list;
          this.name_list = data.name_list;
          this.code_list = data.code_list;
        }
        else {
          // this.list = null;
        }

        if (data.hasOwnProperty('asset')) {
          this.asset = data.asset;
          this.name_asset = data.name_asset;
          this.code_asset = data.code_asset;
          this.name_asset_type = data.name_asset_type;
          this.name_asset_status = data.name_asset_status;
          this.name_asset_price = data.name_asset_price;
        }
        else {
          // this.asset = null;
        }
        
        if (data.hasOwnProperty('uuid')) {
          this.uuid = data.uuid;
          this.editUrl = '/ProposalForm/List/edit/' + this.uuid + '/';
          this.detailUrl = '/ProposalForm/List/detail/' + this.uuid + '/';
        }
        else {
          // this.uuid = null;
        }
        
      }
    }
    tGetFormData(formId = null) {
      var formEle = $("#" + formId);
      if (formEle.length > 0) {
        var chEle = formEle.find("#uuidListInputId"); //Kiêrm tra giá trị của form uuid name_asset
        if (chEle.length > 0) {
          this.uuid = chEle.val();
        }
        else {
          // this.name = null;
        }
        var chEle = formEle.find("#listListInputId");
        if (chEle.length > 0) {
          this.list = chEle.val();
        }
        else {
          // this.code_asset = null;
        }
        var chEle = formEle.find("#nameListInputId");
        if (chEle.length > 0) {
          this.name = chEle.val();
        }
        else {
          // this.name = null;
        }
        var chEle = formEle.find("#assetListInputId");
        if (chEle.length > 0) {
          this.asset = chEle.val();
        }
        else {
          // this.asset = null;
        }
      }
      else {
        var chEle = $("#uuidListInputId");
        if (chEle.length > 0) {
          this.uuid = chEle.val();
        }
        else {
          // this.uuid = null;
        }
        var chEle = $("#listListInputId");
        if (chEle.length > 0) {
          this.list = chEle.val();
        }
        else {
          // this.list = null;
        }
        var chEle = $("#nameListInputId");
        if (chEle.length > 0) {
          this.name = chEle.val();
        }
        else {
          // this.name = null;
        }
        var chEle = $("#assetListInputId");
        if (chEle.length > 0) {
          this.asset = chEle.val();
        }
        else {
          // this.asset = null;
        }
      }
    }
  
    // ########## [FILL FORM] Objects to FRONT END ##############
    tFillForm() {
      var self = this;
      try {
        var j_ele_uuid = $("#uuidListInputId");
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
        var j_ele_name = $("#nameListInputId");
        if (j_ele_name.length > 0) {
          if (j_ele_name.attr('name') == 'uuid') {
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
        var j_ele_list = $("#listListInputId");
        if (j_ele_list.length > 0) {
          if (j_ele_list.attr('name') == 'uuid') {
            j_ele_list.val(self.list).change();
          }
        }
        else {
          // j_ele_list.val(null);
        }
      }
      catch (err) {
        console.log('err = ', err);
      }

      try {
        var j_ele_asset = $("#assetListInputId");
        if (j_ele_asset.length > 0) {
          if (j_ele_asset.attr('name') != 'uuid') {
            j_ele_asset.val(self.asset).change(); //change() = lấy giá trị hiện lên
          }
        }
        else {
          // j_ele_asset.val(null);
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
        var j_ele_uuid = $("#uuidList"+apart+"InputId");
        if (j_ele_uuid.length > 0 && self.uuid != null) {
          if (j_ele_uuid.attr('name') != 'uuid') {
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
        var j_ele_name = $("#nameList"+apart+"InputId");
        if (j_ele_name.length > 0 && self.name != null) {
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
        var j_ele_list = $("#listList"+apart+"InputId");
        if (j_ele_list.length > 0 && self.list != null) {
          if (j_ele_list.attr('name') != 'uuid') {
            j_ele_list.val(self.list).change();
          }
        }
        else {
          // j_ele_list.val(null);
        }
      }
      catch (err) {
        console.log('err = ', err);
      }

      try {
        var j_ele_code_list = $("#code_listList"+apart+"InputId");
        if (j_ele_code_list.length > 0 && self.code_list != null) {
          if (j_ele_code_list.attr('name') != 'uuid') {
            j_ele_code_list.val(self.code_list).change();
          }
        }
        else {
          // j_ele_code_list.val(null);
        }
      }
      catch (err) {
        console.log('err = ', err);
      }

      try {
        var j_ele_name_list = $("#name_listList"+apart+"InputId");
        if (j_ele_name_list.length > 0 && self.name_list != null) {
          if (j_ele_name_list.attr('name') != 'uuid') {
            j_ele_name_list.val(self.name_list).change();
          }
        }
        else {
          // j_ele_name_list.val(null);
        }
      }
      catch (err) {
        console.log('err = ', err);
      }

      try {
        var j_ele_asset = $("#assetList"+apart+"InputId");
        if (j_ele_asset.length > 0) {
          if (j_ele_asset.attr('name') != 'uuid') {
            j_ele_asset.val(self.asset).change();
          }
        }
        else {
          // j_ele_asset.val(null);
        }
      }
      catch (err) {
        console.log('err = ', err);
      }

      try {
        var j_ele_name_asset = $("#name_assetList"+apart+"InputId");
        if (j_ele_name_asset.length > 0) {
          if (j_ele_name_asset.attr('name') != 'uuid') {
            j_ele_name_asset.val(self.name_asset).change();
          }
        }
        else {
          // j_ele_name_asset.val(null);
        }
      }
      catch (err) {
        console.log('err = ', err);
      }
  
      try {
        var j_ele_code_asset = $("#code_assetList"+apart+"InputId");
        if (j_ele_code_asset.length > 0 && self.code_asset != null) {
          if (j_ele_code_asset.attr('name') != 'uuid') {
            j_ele_code_asset.val(self.code_asset).change();
          }
        }
        else {
          // j_ele_code_asset.val(null);
        }
      }
      catch (err) {
        console.log('err = ', err);
      }

      try {
        var j_ele_name_asset_type = $("#name_asset_typeList"+apart+"InputId");
        if (j_ele_name_asset_type.length > 0 && self.name_asset_type != null) {
          if (j_ele_name_asset_type.attr('name') != 'uuid') {
            j_ele_name_asset_type.val(self.name_asset_type).change();
          }
        }
        else {
          // j_ele_name_asset_type.val(null);
        }
      }
      catch (err) {
        console.log('err = ', err);
      }

      try {
        var j_ele_name_asset_status = $("#name_asset_statusList"+apart+"InputId");
        if (j_ele_name_asset_status.length > 0 && self.name_asset_status != null) {
          if (j_ele_name_asset_status.attr('name') != 'uuid') {
            j_ele_name_asset_status.val(self.name_asset_status).change();
          }
        }
        else {
          // j_ele_name_asset_status.val(null);
        }
      }
      catch (err) {
        console.log('err = ', err);
      }

      try {
        var j_ele_name_asset_price = $("#name_asset_priceList"+apart+"InputId");
        if (j_ele_name_asset_price.length > 0 && self.name_asset_price != null) {
          if (j_ele_name_asset_price.attr('name') != 'uuid') {
            j_ele_name_asset_price.val(self.name_asset_price).change();
          }
        }
        else {
          // j_ele_name_asset_price.val(null);
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
        url: "/ProposalForm/api/List/",
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
          self = new List(data);
          AccountAccountGetDataTable(AccountAccountpagination["current_page"]);
          if (is_continue_form) {
            is_continue_form = false;
            toastr.success('Thêm mới thành công');
            $(location).prop('href', "/ProposalForm/List/create/");
  
  
          } else if (is_continue_modal) {
            is_continue_modal = false;
            AccountRefreshCreateModal();
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
        formData = new FormData($('#listCreateFormId')[0]);
  
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
          if (($(this).closest("table").length > 0 && $(this).closest("table").closest("form").attr("uuid") == formId) || ($(this).closest("form").length > 0 && $(this).closest("form").attr("uuid") != formId)) {
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
  
      // var idForm = formData.get('uuid')
      // // check unique
      // var code = formData.get('code')
      //     CheckUnique(code)
      //     $.ajax({
      //         url: List_API_URL + idForm + "/",
      //         // type: "PUT",
      //         type: "PATCH",
      //         async: false,
      //         cache: false,
      //         timeout: 30000,
  
      //         //data: JSON.stringify({data:"test"}),
      //         //data: JSON.stringify(self),
      //         data: formData,
      //         //contentType: "multipart/form-data",
      //         contentType: false,
      //         // dataType : false,
      //         processData: false,
      //         success: function (data) {
      //               self = new List(data);
                    
      //               ListGetDataTable(AccountAccountpagination["current_page"]);
      //               //$(location).prop('href', "/Account/Account/detail/" + self.uuid + "/");
      //               $('.modal').modal('hide');
      //               // self.tFillForm();
      //         },
      //         error: function (xhr, ajaxOptions, thrownError) {
      //           toastr.warning('Mã đơn đã tồn tại');
      //           console.log(xhr.status);
      //           console.log(thrownError);
      //           if (xhr.textStatus == 'timeout') {
      //               this.tryCount++;
      //               if (this.tryCount <= this.retryLimit) {
      //                   //try again
      //                   $.ajax(this);
      //                   return;
      //               }
      //               return;
      //           }
      //           if(is_debug){
      //               $.alert({
      //                   title: 'Error [' + xhr.status + '] ' + thrownError ,
      //                   content: xhr.responseText,
      //               });
      //           }
      //       },
      //   });
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
      formData = new FormData($('#listCreateFormId')[0]);
  
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
        if (($(this).closest("table").length > 0 && $(this).closest("table").closest("form").attr("uuid") == formId) || ($(this).closest("form").length > 0 && $(this).closest("form").attr("uuid") != formId)) {
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
    // CheckUnique(code)
    $.ajax({
        url: List_API_URL,
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
                self = new List(data);
                ListGetDataTable(AccountAccountpagination["current_page"]);
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
        url: "/ProposalForm/api/List/" + uuid + "/",
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
      var id_go = ""
      if (uuid == null) {
        alert(uuid)
        id_go = cr_id;
      } else {
        id_go = uuid;
      }
      console.log('self.uuid = ', self.uuid);
      $.ajax({
        url: "/ProposalForm/api/List/" + id_go + "/",
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
          ListGetDataTable(AccountAccountpagination["current_page"]);
          if (cr_id != "") {
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
        url: "/ProposalForm/api/List/" + uuid + "/",
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
              url: "/ProposalForm/api/List/" + has_go_page,
          type: "GET",
          //async: false,
          cache: false,
          timeout: 30000,
  
          success: function (data) {
            console.log('[tGetAllObjApi] data = ', data);
            if (data.hasOwnProperty('count')) {
              AccountAccountpagination["total"] = data.count;
            }
            if (data.hasOwnProperty('count')) {
              AccountAccountpagination["total"] = data.count;
            }
            if (data.hasOwnProperty('next')) {
              if (data.next != null) {
                AccountAccountpagination["has_next"] = true;
              } else {
                AccountAccountpagination["has_next"] = false;
  
              }
            }
            AccountAccountpagination["current_page"] = page;
            if (data.hasOwnProperty('previous')) {
              if (data.previous != null) {
                AccountAccountpagination["has_prev"] = true;
              } else {
                AccountAccountpagination["has_prev"] = false;
              }
            }
            if (data.hasOwnProperty('results')) {
              for (var j = 0; j < data.results.length; j++) {
                var tmp = new List(data.results[j]);
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
        SEARCH_URL = List_FILTER_URL;
  
        slugSearch = "&";
  
        if ($("#nameListFilterSearchInputId").length > 0) {
          var value = $("#nameListFilterSearchInputId").val();
          if (value != "" && value != null) {
            slugSearch += "name__contains=" + value + "&";
          }
        }
  
        slugSearch = slugSearch.slice(0, -1);
      } else {
        SEARCH_URL = List_SEARCH_URL;
  
        slugSearch = "&";
        slugSearch += "search=" + $("#listQuickSearchInputId").val();
  
      }
      if (search_data != null) {
        SEARCH_URL = List_FILTER_URL;
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
            // return new AccountAccount(data);
            if (data.hasOwnProperty('count')) {
              AccountAccountpagination["total"] = data.count;
            }
            if (data.hasOwnProperty('count')) {
              AccountAccountpagination["total"] = data.count;
            }
            if (data.hasOwnProperty('next')) {
              if (data.next != null) {
                AccountAccountpagination["has_next"] = true;
              } else {
                AccountAccountpagination["has_next"] = false;
  
              }
            }
            AccountAccountpagination["current_page"] = page;
            if (data.hasOwnProperty('previous')) {
              if (data.previous != null) {
                AccountAccountpagination["has_prev"] = true;
              } else {
                AccountAccountpagination["has_prev"] = false;
              }
            }
            if (data.hasOwnProperty('results')) {
              for (var j = 0; j < data.results.length; j++) {
                var tmp = new List(data.results[j]);
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
          url: "/ProposalForm/api/List/" + uuid+ "/",
          type: "GET",
          async: false,
          cache: false,
          timeout: 30000,
  
          success: function (data) {
            console.log('[tGetObjApi] data = ', data);
            var n_obj = new List(data);
            console.log('n_obj = ', n_obj);
            // n_obj.tFillForm();
            return n_obj;
            // if (data.hasOwnProperty('results')){
            //    if (data.results.length > 0){
            //        var tmp = new AccountAccount(data[i]);
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
      var tbId = "listDataTableId";        //dùng id chung để lấy code so sánh vơi code của danh sách
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
              html += `<td class="text-wrap" style="min-width:300px" onclick="ListDetails('` + this["uuid"] + `')"><a>` + (this[attr]) + `</a></td>`;
              continue;
            }
            //html +=`<td class="text-wrap"><a>` + (this[attr]) + `</a></td>`;
            html += `<td class="text-wrap"><a>` + (this[attr]) + `</a></td>`;
          }
  
          else {
            if (attr == "asset-admin-action") {
              html += BindActionButtonVer4(
                List_arr_action,
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
  function ListGetDataTable(page=1,search_data=null){
      search_log["search_func"] = "ListGetDataTable";
      search_log["search_data"] = search_data;
      search_log["search_type"] = "";
  
      var obj = new List();
      var results = obj.tGetAllObjApi(page,search_data);
      obj.callAjax.then(function(data) {
      $("#listTableBodyId").empty();
      var body = $("#listDataTableId");
      //if (body.length > 0){
      //    var bodyTable = body.DataTable();
      //    bodyTable.clear();
      //}
      ASSET_ID_TABLE_COUNT = 1;
      var crr_record_in_page = AccountAccountrecord_in_page;
  
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
      var pagenation_ele=$(".pagination-AccountAccount");
      var pagination=AccountAccountpagination;
      pagenation_ele.html('');
      var page_total_ele = $(".page-total-AccountAccount");
      page_total_ele.html(`<footer class="mt-3 blockquote-footer">Tổng số: ${pagination["total"]} bản ghi </footer>`);
      if (results.length > 0) {
          
          pagenation_ele.append(`<li class="page-item"><a class=  "page-link" onclick="ListGetDataTable(1)">Đầu</a></li>`);
          if (pagination["has_prev"] == true) {
              pagenation_ele.append('<li class="page-item"><a class="page-link" onclick="ListGetDataTable(' + (parseInt(pagination["current_page"]) - 1) + ')">' + (parseInt(pagination["current_page"]) - 1) + '</a></li>');
          }
          pagenation_ele.append('<li class="page-item active"><a class="page-link" >' + (parseInt(pagination["current_page"])) + '</a></li>');
          if (pagination["has_next"] == true) {
              pagenation_ele.append('<li class="page-item"><a class="page-link" onclick="ListGetDataTable(' + (parseInt(pagination["current_page"]) + 1) + ')">' + (parseInt(pagination["current_page"]) + 1) + '</a></li>');
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
          pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="ListGetDataTable(`+last_page_order+`)">Cuối</a></li>`);
          }
      }
  })
}
  
  var AccountAccountpagination={
      current_page:1,
      total:0,
      has_next:false,
      has_prev:false
  }
    
  var AccountAccountrecord_in_page = 5;
  
  // Run function fill data table
  $(document).ready(function(){
      var IdTable ="listDataTableId";
      var checker = $("#" +IdTable );
      if (checker.length > 0){
          if($('#'+IdTable).is(":visible")){
              ListGetDataTable(AccountAccountpagination["current_page"]);
          }
      }
  })
  
  $(document).ready(function(){
      var selectionId ="listDetailModalsFormId";
      ListViewDetail(selectionId)
  })
  
  // [Save Create] Clicked Handle function
  $(document).ready(function(){
    $("#listCreateModalBtnId").click(function(){
        var validate_obj = new InputValidation('listCreateModalsFormId');
        if(validate_obj.validateRequired()){
            toastr.warning('Vui lòng điền đầy đủ thông tin');
            return;
        }
        obj = new List();
        console.log('Save obj = ', obj);
        obj.tCreateNewPostFormApi('listCreateModalsFormId');
    })
  });
  
  // [SAVE UPDATE]
  $(document).ready(function(){
    $("#listUpdateModalBtnId").click(function(){
        obj = new List();
        obj.tUpdatePostApi('listEditModalsFormId');
    })
  });

    // add selected
    $(document).ready(function(){
      SelectedFieldModal(AssetList_API_URL, "Edit", "list")
      SelectedFieldModal(Asset_API_URL, "Edit", "asset")
    
      //Add
      SelectedFieldModal(AssetList_API_URL, "Create", "list")
      SelectedFieldModal(Asset_API_URL, "Create", "asset")
  
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
            $("#"+InputId+"List"+apart+"ModalInputId").append(html);
            }
        });
    }
    }
  

  
  // Export excel
  $(document).ready(function() {
    $('#listExportExcelBtnId').click(function() {
        // Define the columns to export
        var columnsToExport = [0, 1, 2, 3, 4, 5, 6]; // columns 1, 2, and 4 (zero-indexed)
        var theadToExport = '';
        $('#listDataTableId thead').each(function() {
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
        $('#listDataTableId tbody tr').each(function() {
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
          filename: 'thông_tin_danh_sách-tài_sản_%DD%-%MM%-%YY%',
          format: 'xls',
          escape: 'false',
  
        });
    });
  });
  
  // Search Start - khoi tao doi tuong function
  function ListSearchData(page=1,search_type,search_data=null){
    search_log["search_func"] = "ListSearchData";
    search_log["search_type"] = search_type;
    search_log["search_data"] = search_data;
        var obj = new List();
        var results = obj.tSearchAllObjApi(page,search_data,search_type);
        obj.callAjax.then(function(data) {
        $("#listTableBodyId").empty();
        var body = $("#listDataTableId");
        //if (body.length > 0){
        //    var bodyTable = body.DataTable();
        //    bodyTable.clear();
        //}
        ASSET_ID_TABLE_COUNT = 1;
        crr_record_in_page = AccountAccountrecord_in_page;
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
        var pagination = AccountAccountpagination;
        var pagenation_ele=$(".pagination-AccountAccount");
        pagenation_ele.html('');
        var page_total_ele = $(".page-total-AccountAccount");
        page_total_ele.html(`<footer class="blockquote-footer mt-3">Tổng số: ${pagination["total"]} bản ghi </footer>`);
        
        if (results.length > 0) {
                pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="ListSearchData(1,'`+search_type+`'`+ `,'`+search_data+`'`+ `)">Đầu</a></li>`);
  
                if (pagination["has_prev"] == true) {
                    pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="ListSearchData(` + (parseInt(pagination["current_page"]) - 1) +`,'`+search_type+`'`+ `,'`+search_data+`'`+ `)">` + (parseInt(pagination["current_page"]) - 1) + `</a></li>`);
                }
                pagenation_ele.append('<li class="page-item active"><a class="page-link" >' + (parseInt(pagination["current_page"])) + '</a></li>');
                if (pagination["has_next"] == true) {
                    pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="ListSearchData(` + (parseInt(pagination["current_page"]) + 1) +`,'`+search_type+`'`+ `,'`+search_data+`'`+ `)">` + (parseInt(pagination["current_page"]) + 1) + `</a></li>`);
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
                pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="ListSearchData(`+last_page_order+`,'`+search_type+`'`+ `,'`+search_data+`'`+ `)">Cuối</a></li>`);
                }
            }
            if (search_type == "quick") {
                var crr_txt = $("#listQuickSearchInputId").val();
                highlight(crr_txt,"#listTableBodyId");
            }
    })
  
  }
  
  // Function Enter Search
  $(document).ready(function(){
    $("#listQuickSearchInputId").on('keyup', function(e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            AccountAccountpagination={
                current_page:1,
                total:0,
                has_next:false,
                has_prev:false
            }
            ListSearchData(AccountAccountpagination["current_page"],"quick");
        }
    })
    $("#listQuickSearchBtnId").click(function(){
        AccountAccountpagination={
            current_page:1,
            total:0,
            has_next:false,
            has_prev:falseGAccountAccountSearchData(AccountAccountpagination["current_page"],"quick")
    }});
    $("#listSearchBtnId").click(function(){
        AccountAccountpagination={
            current_page:1,
            total:0,
            has_next:false,
            has_prev:false
    }
        ListSearchData(AccountAccountpagination["current_page"],"filter");
    })
  });

  // function CheckUnique(code){
  //   var slugSearch = "?search=" + code
  //   $.ajax({
  //     url: List_SEARCH_URL + slugSearch,
  //     dataType: 'JSON',
  //     type: 'GET',
  //     success: function(data){
  //       if (data.results.length > 0){
  //         toastr.warning('Mã tài sản đã tồn tại');
  //       }
  //         }
  //     });
  // }
