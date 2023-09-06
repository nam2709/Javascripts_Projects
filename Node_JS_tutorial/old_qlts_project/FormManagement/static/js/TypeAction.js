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

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

var TypeActionFormManagement_arr_action = [
    // default action
    
                {
                "title": "Xem chi tiết",
                "func": "TypeActionFormManagementDetails",
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
                    "func": "GetDataTypeActionEdit",
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
                    "func": "DeleteTypeAction",
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

class TypeActionFormManagement{
    constructor(data=null){
        if (data != null) {
            if (data.hasOwnProperty('uuid')) {
                this.uuid = data.uuid
            } 
            else {
                this.uuid = null
            }

            if (data.hasOwnProperty('name')) {
                this.name = data.name
            } 
            else {
                this.name = null
            }
            if (data.hasOwnProperty('code')) {
                this.code = data.code
            } 
            else {
                this.code = null
            }

            if (data.hasOwnProperty('updated_by')) {
                this.updated_by = data.updated_by
            } 
            else {
                this.updated_by = null
            }

            if (data.hasOwnProperty('updated_at')) {
                this.updated_at = data.updated_at
            } 
            else {
                this.updated_at = null
            }

            if (data.hasOwnProperty('created_at')) {
                this.created_at = data.created_at
            } 
            else {
                this.created_at = null
            }

            if (data.hasOwnProperty('created_by')) {
                this.created_by = data.created_by
            } 
            else {
                this.created_by = null
            }
            if (data.hasOwnProperty('color_code')) {
                this.color_code = data.color_code
            } 
            else {
                this.color_code = null
            }
            if (data.hasOwnProperty('icon')) {
                this.icon = data.icon
            } 
            else {
                this.icon = null
            }
            if (data.hasOwnProperty('type_form')) {
                this.type_form = data.type_form
            } 
            else {
                this.type_form = null
            }
            if (data.hasOwnProperty('get_type_form')) {
                this.get_type_form = data.get_type_form
            } 
            else {
                this.get_type_form = null
            }
        }
    }

    GetObjApiTypeAction(uuid) {
        this.callAjax = null;

        $.ajaxSetup({
            headers : {
                'CSRFToken' : getCSRFTokenValue(),
                'X-CSRFToken' : getCSRFTokenValue(),
            },
            tryCount : 0,
            retryLimit : 3,
        });

        this.callAjax = $.ajax({
            url: TypeAction_URL + uuid + "/",
            type: 'GET',
            async: false,
            cache: false,
            timeout: 3000,

            success: function(data) {
                var obj = new TypeActionFormManagement(data);
                console.log('[GetObjApiTypeAction] data = ', data);
                return obj;
            }
        })
    }

    getTypeActionApi(page=null, search_data=null) {

        this.callAjax = null
        var results = []
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

        this.callAjax = $.ajax({
                url: TypeAction_URL + has_go_page,
                type: 'GET',
                async: false,
                cache: false,
                timeout: 30000,
                success: function(data){
                    console.log('[getTypeActionApi] data = ', data);
                    
                    if (data.hasOwnProperty('count')){
                        TypeActionFormManagementpagination["total"]=data.count;
                    }
                    if (data.hasOwnProperty('next')){
                        if(data.next != null){
                            TypeActionFormManagementpagination["has_next"]=true;
                        } else {
                            TypeActionFormManagementpagination["has_next"]=false;
                        }
                    }
                    TypeActionFormManagementpagination["current_page"]=page;
                    if (data.hasOwnProperty('previous')){
                        if(data.previous != null){
                            TypeActionFormManagementpagination["has_prev"]=true;
                        } else {
                            TypeActionFormManagementpagination["has_prev"]=false;
                        }
                    }
                    if (data.hasOwnProperty('results')){
                        for (var j=0; j < data.results.length; j++){
                            var tmp = new TypeActionFormManagement(data.results[j]);
                            results.push(tmp);
                        }
                    }
                },
                error:function (xhr, ajaxOptions, thrownError) {
                    console.log(xhr.status);
                    console.log(thrownError);
                }
        });
        console.log(results[0]);

        return results;
    }

    GetDataTypeActionForField(tableId=null, order=null, action=null){
        var tbId = "typeActionFormDataTableId";
        if (tableId != null) {
            tbId = tableId;
        }

        if(order==null){
            order=TYPEACTION_ID_TABLE_COUNT;
            }
        var seTbId = $("#" + tbId);

        if(seTbId.length > 0) {
            var html = "<tr>";
            html += `<td><a>` + order + `</a></td>`;
            var tableHeaders = seTbId.find('thead th');
            var tableBody = seTbId.find('tbody');

            for (var thId = 1; thId < tableHeaders.length; thId++) {
                var hEle = tableHeaders[thId];
                var attr = hEle.getAttribute('attr-name');
                if (this.hasOwnProperty(attr)) {
                    if(attr=="name"){   
                        var uuid = this["uuid"];
                        html +=`
                            <style>
                                a {
                                    color: #000000;
                                } 
                            </style>
                        <td class="text-wrap" style="min-width:300px; text-align: left;" onclick="TypeActionFormManagementDetails('` + uuid + `')"><a href="#" style="text-decoration: none; font-weight: 500;">` + (this[attr]) + `</a></td>`;
                            continue;
                    }

                    if(attr=="code"){
                        html +=`<td class="text-wrap"><a>` + (this[attr]) + `</a></td>`;
                            continue;
                        }
                    
                    if(attr=="type_form"){
                        html +=`<td class="text-wrap"  style="text-align: left;"><a>` + (this['get_type_form']) + `</a></td>`;
                            continue;
                        }

                    if(attr=="icon"){
                        html +=`<td class="text-wrap" style="min-width:70px; vertical-align: middle;">
                                    <span class="timeline-step " style="background-color: ` + (this['color_code']) + `; left: auto; bottom: auto;">
                                        <i class="` + (this[attr]) + `"></i>
                                    </span>&nbsp;
                                </td>`;
                            continue;
                        }

                    if(attr=="created_at"){
                        html +=`<td class="text-wrap"><a>` + GetDateOnly_V01(this[attr]) + `</a></td>`;
                            continue;
                        }

                    if(attr=="created_by"){
                        html +=`<td class="text-wrap"><a>` + (this[attr]) + `</a></td>`;
                            continue;
                        }

                    html +=`<td class="text-wrap"><a>` + (this[attr]) + `</a></td>`;
                
                }

                else {
                    if(attr=="account-admin-action") {
                        html += BindActionButtonVer4(
                            TypeActionFormManagement_arr_action,
                            this['uuid'],
                            this['name'],
                            null,
                            this['created_by'],
                        );
                            continue;
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

    getTypeActionData(formId=null) {
        if (formId == "typeActionFormManagementDetailModalsFormId") {
            this.GetValueOfAttributeTypeAction("uuidTypeActionFormManagementDetailId", 'uuid');
            this.GetValueOfAttributeTypeAction("nameTypeActionFormManagementDetailId", 'name');
            this.GetValueOfAttributeTypeAction("codeTypeActionFormManagementDetailId", 'code');
            this.GetValueOfAttributeTypeAction("typeFormTypeActionFormManagementDetailId", 'get_type_form');
            this.GetValueOfAttributeTypeAction("colorCodeTypeActionFormManagementDetailId", 'color_code');
            this.GetValueOfAttributeTypeAction("iconTypeActionFormManagementDetailId", 'icon');
            this.GetValueOfAttributeTypeAction("updateByTypeActionFormManagementDetailId", 'updated_by');
            this.GetValueOfAttributeTypeAction("updateAtTypeActionFormManagementDetailId", 'updated_at_detail');
            this.GetValueOfAttributeTypeAction("createdByTypeActionFormManagementDetailId", 'created_by');
            this.GetValueOfAttributeTypeAction("createdAtTypeActionFormManagementDetailId", 'created_at_detail');

        } else if(formId == "typeActiontEditModalsFormId") {
            this.GetValueOfAttributeTypeAction("uuidTypeActionFormManagementEditModal", 'uuid');
            this.GetValueOfAttributeTypeAction("nameTypeActionFormManagementEditModal", 'name');
            this.GetValueOfAttributeTypeAction("codeFormFormManagementEditModal", 'code');
            this.GetValueOfAttributeTypeAction("typeFormTypeActionFormManagementEditModal", 'type_form');
            this.GetValueOfAttributeTypeAction("colorCodeTypeActionFormManagementEditModal", 'color_code');
            this.GetValueOfAttributeTypeAction("iconTypeActionFormManagementEditModal", 'icon');
            this.GetValueOfAttributeTypeAction("updateByTypeActionFormManagementEditModal", 'updated_by');
            this.GetValueOfAttributeTypeAction("updateAtTypeActionFormManagementEditModal", 'updated_at');
            this.GetValueOfAttributeTypeAction("createdByTypeActionFormManagementEditModal", 'created_by');
            this.GetValueOfAttributeTypeAction("createAtTypeActionFormManagementEditModal", 'created_at');
        }
    }

    GetValueOfAttributeTypeAction(Eleid=null, attr=null) {
        try {
            var formEle = $("#" + Eleid);
            if (formEle.length > 0){
                if (formEle.attr('name') != 'uuid'){
                    if (attr == 'name') {
                        formEle.val(this.name);
                    }
                    switch(attr) {
                        case 'uuid':
                            formEle.val(this.uuid);
                            break;
                        case 'name':
                            formEle.val(this.name);
                            break;
                        case 'code':
                            formEle.val(this.code);
                            break;
                        case 'updated_by':
                            formEle.val(this.updated_by);
                            break;
                        case 'updated_at':
                            formEle.val(this.updated_at);
                            break;
                        case 'updated_at_detail':
                            formEle.val(GetDateOnly_V01(this.updated_at));
                            break;
                        case 'created_by':
                            formEle.val(this.created_by);
                            break;
                        case 'created_at':
                            formEle.val(this.created_at);
                            break;
                        case 'created_at_detail':
                            formEle.val(GetDateOnly_V01(this.created_at));
                            break;
                        case 'type_form':
                            formEle.val((this.type_form));
                            break;
                        case 'color_code':
                            formEle.val((this.color_code));
                            break;
                        case 'icon':
                            formEle.val((this.icon));
                            break;
                        case 'get_type_form':
                            formEle.val((this.get_type_form));
                            break;
                        case 'supplier':
                            formEle.val((this.supplier));
                            break;
                        case 'warehouse':
                            formEle.val((this.warehouse));
                            break;
                        default:
                            formEle.val(this.uuid); 
                    }
                }
            } 
            else {
                formEle.val(null);
            }
        }
        catch(err) {    
            console.log("err: ", err);
        }
    }

    UpdateTypeActionApi(formId=null){
        $.ajaxSetup({
            headers : {
                'CSRFToken' : getCSRFTokenValue(),
                'X-CSRFToken' : getCSRFTokenValue(), 
            },
            tryCount : 0,
            retryLimit : 3,
  
        });
        var self = this;
        var formData;
        var form;
        var arr_table = [];
        if(formId==null){
          formData = new FormData($('#')[0]);
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
              //   if (($(this).closest("table").length > 0 && $(this).closest("table").closest("form").attr("id") == formId) || ($(this).closest("form").length > 0 && $(this).closest("form").attr("id") != formId)) {
              //       return;
              //   }
                if (typeof attr !== 'undefined' && attr !== false) {
                  for (const [key, value] of formData.entries()) {
                      console.log(key, value);
                  }
                    if (typeof date !== 'undefined' && date !== false) {
                        formData.append($(this).attr('name'), toDatePythonByStringTime($(this).val(), 'DD/MM/YYYY'));
                    } else {
                        if (type == 'file') {
                            var files = $(this)[0].files;
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
        }  
           
       var idForm = formData.get('uuid_');
       for (const [key, value] of formData.entries()) {
          console.log(key, value);
      }
      // alert(idForm);
          $.ajax({
              url: TypeAction_URL + idForm + "/",
              // type: "PUT",
              type: "PATCH",
              // async: false,
              // cache: false,
              timeout: 30000,
              data: formData,
              contentType: false,
              processData: false,
              success: function (data) {
                      self = new TypeActionFormManagement(data);
                      TypeActionFormManagementApi(TypeActionFormManagementpagination["current_page"]);
                      toastr.success("Chỉnh sửa thông tin thành công!!!")
                      $('.modal').modal('hide');
              },
              error: function (xhr, ajaxOptions, thrownError) {
                  console.log(xhr.status);
                  console.log(thrownError);
                  toastr.error("Chỉnh sửa thất bại!")
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

    CreateNewTypeActionApi(uuid_type_form=null, formId=null){
        $.ajaxSetup({
            headers : {
                'CSRFToken' : getCSRFTokenValue(),
                'X-CSRFToken' : getCSRFTokenValue(), // for --> SessionAuthentication
            },
            tryCount : 0,
            retryLimit : 3,
        });
        $('#uuidTypeActionFormManagementCreateModalInputId').val(uuidv4());
        // $("#typeFormFormManagementCreateModalInput").val(uuid_type_form);
        var self = this;
        var formData;
        var form ;
        var arr_table = [];
        if(formId==null){
            formData = new FormData($('#typeActionFormManagementCreateModalsFormId')[0]);
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
        for (const [key, value] of formData.entries()) {
            console.log(key, value);
        }

            $.ajax({
                url: TypeAction_URL,
                type: "POST",
                // async: false,
                // cache: false,
                timeout: 30000,
                data: formData,
                contentType: "multipart/form-data",
                contentType: false,
                // dataType : false,
                processData: false,
                success: function (data) {
                    self = new TypeActionFormManagement(data);
                    // LoadAccountAccountList();
                    TypeActionFormManagementApi(TypeActionFormManagementpagination["current_page"]);

                    TypeActionRefreshCreateModal();
                    toastr.success("Tạo mới thành công!!!");
                    $('.modal').modal('hide');

                },
                error: function (xhr, ajaxOptions, thrownError) {
                    console.log(xhr.status);
                    console.log(thrownError);
                    toastr.alert("Tạo mới thất bại!!")
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

}

function createTypeAcionFormManagement(){
    $('#typeActionFormManagementCreatemodalsId').modal('toggle');
    $("#typeActionCreateModalBtnId").click(function(){
        var validate_obj = new InputValidation('typeActionFormManagementCreateModalsFormId');
        if(validate_obj.validateRequired()){
            toastr.warning('Vui lòng điền đầy đủ thông tin');
            return;
        }
        obj = new TypeActionFormManagement();
        console.log('Save obj = ', obj);
        obj.CreateNewTypeActionApi('typeActionFormManagementCreateModalsFormId');
    })
}

function TypeActionFormManagementDetails(uuid=null) {
    $('#typeActionFormManagementDetailmodalsId').modal('toggle');
    var obj = new TypeActionFormManagement();
    obj.GetObjApiTypeAction(uuid);
    obj.callAjax.then(function(data) {
        new TypeActionFormManagement(data).getTypeActionData("typeActionFormManagementDetailModalsFormId");
    })
}

function GetDataTypeActionEdit(uuid=null) {
    var formId = "typeActiontEditModalsFormId";
    var modalId = 'typeActionEditmodalsId';
    $('#' + modalId).modal('toggle');
    var obj = new TypeActionFormManagement();
    obj.GetObjApiTypeAction(uuid);
    obj.callAjax.then(function(data) {
        new TypeActionFormManagement(data).getTypeActionData(formId);
    })
}

function UpdateTypeActionFormManagement() {
    obj = new TypeActionFormManagement();
    console.log('Update obj = ', obj);
    obj.UpdateTypeActionApi('typeActiontEditModalsFormId');
}

function DeleteTypeAction(uuid){
    // if (confirm("Bạn có muốn xóa không?") == true){
    // }
    $.confirm({
        icon: 'fa fa-warning',
        title: 'Xóa Phiếu',
        content: 'Bạn có chắc muốn xóa hoạt động này không ?',
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
                        var uuid_go=uuid
                        if(uuid==null) {
                            uuid_go=cr_uuid;
                        } else {
                            uuid_go=uuid;
                        }
                        console.log('self.uuid = ', uuid);
                        $.ajax({
                            url: TypeAction_URL + uuid_go + "/",
                            type: "DELETE",
                            async: false,
                            cache: false,
                            timeout: 30000,
                
                            success: function (data) {
                                TypeActionFormManagementApi(TypeActionFormManagementpagination["current_page"]);
                                if(confirm)
                                toastr.success('Xóa thành công');
            
                            },
                            error: function (xhr, ajaxOptions, thrownError) {
                                console.log(xhr.status);
                                console.log(thrownError);
                                toastr.error('Xóa thất bại');

                                if (xhr.textStatus == 'timeout') {
                                    this.tryCount++;
                                    if (this.tryCount <= this.retryLimit) {
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

var search_log = {
    search_func:"",
    search_data:"",
    search_type:"",
}

function TypeActionFormManagementApi(page=null, search_data=null) {
    search_log["search_func"] = "TypeActionFormManagementApi";
    search_log["search_data"] = search_data;
    search_log["search_type"] = "";

    var object = new TypeActionFormManagement()
    var results = object.getTypeActionApi(page, search_data);

    object.callAjax.then(function(data) {

        $("#typeActionFormDataTableBodyId").empty();
        TYPEACTION_ID_TABLE_COUNT = 1;
        var crr_record_in_page = TypeActionFormManagementrecord_in_page;

        if(page>1){
            TYPEACTION_ID_TABLE_COUNT =1+crr_record_in_page*page-crr_record_in_page
        }
        for (var i = 0; i < results.length; i++){

            try{
                console.log('results[i] = ', results[i]);
                results[i].GetDataTypeActionForField();
                TYPEACTION_ID_TABLE_COUNT++;
            }
            catch(err){
                console.log(err);
            }
        }

        var pagenation_ele=$(".pagination-TypeFormFormManagement");
        var pagination=TypeActionFormManagementpagination;
        pagenation_ele.html('');
        var page_total_ele = $(".page-total-TypeFormFormManagement");
        page_total_ele.html(`<footer class="blockquote-footer">Tổng số: ${pagination["total"]} bản ghi </footer>`);
        if (results.length > 0) {
            
            pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="TypeActionFormManagementApi(1)"><i class="fa fa-angle-double-left"></a></li>`);
            if (pagination["has_prev"] == true) {
                pagenation_ele.append('<li class="page-item"><a class="page-link" onclick="TypeActionFormManagementApi(' + (parseInt(pagination["current_page"]) - 1) + ')">' + (parseInt(pagination["current_page"]) - 1) + '</a></li>');
            }

            pagenation_ele.append('<li class="page-item active"><a class="page-link" >' + (parseInt(pagination["current_page"])) + '</a></li>');
            if (pagination["has_next"] == true) {
                pagenation_ele.append('<li class="page-item"><a class="page-link" onclick="TypeActionFormManagementApi(' + (parseInt(pagination["current_page"]) + 1) + ')">' + (parseInt(pagination["current_page"]) + 1) + '</a></li>');
            }

            if(pagination["total"]>0) {
                var last_page_order = 0 
                if((pagination["total"] % type_action_record_in_page) != 0) {
                    last_page_order = Math.floor(pagination["total"]/type_action_record_in_page) + 1;
                }
                else {
                    last_page_order = (pagination["total"]/type_action_record_in_page);
                }
                pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="TypeActionFormManagementApi(`+last_page_order+`)"><i class="fa fa-angle-double-right"></a></li>`);
            }
        }
    })
}


var TypeActionFormManagementpagination={
    current_page:1,
    total:2,
    has_next:true,
    has_prev:true
}

// stt cộng thêm bao nhiêu
var TypeActionFormManagementrecord_in_page = PAGE_SIZE;

// = setting = bên trên
var type_action_record_in_page = PAGE_SIZE;

$(document).ready(function(){
    var IdTable ="typeActionFormDataTableBodyId";
    var checker = $("#" +IdTable );
    if (checker.length > 0){
        if($('#'+IdTable).is(":visible")){
            TypeActionFormManagementApi(TypeActionFormManagementpagination["current_page"]);
        }
    }
})

function TypeActionRefreshCreateModal() {
    $('#typeActionFormManagementCreatemodalsId')
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
    $.ajaxSetup({
            headers : {
                'CSRFToken' : getCSRFTokenValue(),
                'X-CSRFToken' : getCSRFTokenValue(), // for --> SessionAuthentication
            },
            tryCount : 0,
            retryLimit : 3,
        });
        
        var event_data = '';
        var typeForm = '';

        $.ajax({
                url: TypeForm_URL,
                type: 'GET',
                async: false,
                cache: false,
                timeout: 30000,
                success: function(data){
                    if (data.hasOwnProperty('results')){
                        for (var j=0; j < data.results.length; j++){4
                            var uuid_type_form = data.results[j].uuid;
                            var name_type_form = data.results[j].name;
                            typeForm += '<option value="' + uuid_type_form + '">' + name_type_form + '</option>'
                          
                        }
                        $("#typeFormTypeActionFormManagementCreateModalInput").append(typeForm);


                    }
                },
                error:function (xhr, ajaxOptions, thrownError) {
                    console.log(xhr.status);
                    console.log(thrownError);
                }
        });
});
