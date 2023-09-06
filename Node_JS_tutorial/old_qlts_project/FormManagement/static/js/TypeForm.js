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

function TypeFormFormManagementDetails(uuid=null) {
    $('#typeFormFormManagementDetailmodalsId').modal('toggle');
    var obj = new TypeFormFormManagement();
    obj.GetObjApiTypeForm(uuid);
    obj.callAjax.then(function(data) {
        new TypeFormFormManagement(data).getTypeFormData("typeFormFormManagementDetailModalsFormId");
    })
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

var TypeFormFormManagement_arr_action = [
    // default action
    
                {
                "title": "Xem chi tiết",
                "func": "TypeFormFormManagementDetails",
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
                    "func": "GetDataTypeFormEdit",
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
                    "func": "DeleteTypeForm",
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

class TypeFormFormManagement{
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
            if (data.hasOwnProperty('fields')) {
                this.fields = data.fields
            } 
            else {
                this.fields = null
            }

        }
    }

    GetObjApiTypeForm(uuid) {
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
            url: TypeForm_URL + uuid + "/",
            type: 'GET',
            async: false,
            cache: false,
            timeout: 3000,

            success: function(data) {
                var obj = new TypeFormFormManagement(data);
                console.log('[GetObjApiTypeForm] data = ', data);
                return obj;
            }
        })
    }

    getTypeFormApi(page=null, search_data=null) {

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
                url: TypeForm_URL + has_go_page,
                type: 'GET',
                async: false,
                cache: false,
                timeout: 30000,
                success: function(data){
                    console.log('[getTypeFormApi] data = ', data);
                    
                    if (data.hasOwnProperty('count')){
                        TypeFormFormManagementpagination["total"]=data.count;
                    }
                    if (data.hasOwnProperty('next')){
                        if(data.next != null){
                            TypeFormFormManagementpagination["has_next"]=true;
                        } else {
                            TypeFormFormManagementpagination["has_next"]=false;
                        }
                    }
                    TypeFormFormManagementpagination["current_page"]=page;
                    if (data.hasOwnProperty('previous')){
                        if(data.previous != null){
                            TypeFormFormManagementpagination["has_prev"]=true;
                        } else {
                            TypeFormFormManagementpagination["has_prev"]=false;
                        }
                    }
                    if (data.hasOwnProperty('results')){
                        for (var j=0; j < data.results.length; j++){
                            var tmp = new TypeFormFormManagement(data.results[j]);
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

    GetDataTypeFormForField(tableId=null, order=null, action=null){
        var tbId = "typeFormDataTableId";
        if (tableId != null) {
            tbId = tableId;
        }

        if(order==null){
            order=TYPEFORM_ID_TABLE_COUNT;
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
                        <td class="text-wrap" style="min-width:300px; text-align: left;" onclick="TypeFormFormManagementDetails('` + uuid + `')"><a href="#" style="text-decoration: none; font-weight: 500;">` + (this[attr]) + `</a></td>`;
                            continue;
                    }

                    if(attr=="code"){
                        html +=`<td class="text-wrap"><a>` + (this[attr]) + `</a></td>`;
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
                            TypeFormFormManagement_arr_action,
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

    getTypeFormData(formId=null) {
        if (formId == "typeFormFormManagementDetailModalsFormId") {
            this.GetValueOfAttributeTypeForm("uuidTypeFormFormManagementDetailId", 'uuid');
            this.GetValueOfAttributeTypeForm("nameTypeFormFormManagementDetailId", 'name');
            this.GetValueOfAttributeTypeForm("codeTypeFormFormManagementDetailId", 'code');
            this.GetValueOfAttributeTypeForm("updateByTypeFormFormManagementDetailId", 'updated_by');
            this.GetValueOfAttributeTypeForm("updateAtTypeFormFormManagementDetailId", 'updated_at_detail');
            this.GetValueOfAttributeTypeForm("createdByTypeFormFormManagementDetailId", 'created_by');
            this.GetValueOfAttributeTypeForm("createdAtTypeFormFormManagementDetailId", 'created_at_detail');
            this.GetValueOfAttributeTypeForm("fieldsTypeFormFormManagementDetailId", 'fields');
        } else if(formId == "typeFormtEditModalsFormId") {
            this.GetValueOfAttributeTypeForm("uuidTypeFormFormManagementEditModal", 'uuid');
            this.GetValueOfAttributeTypeForm("nameTypeFormFormManagementEditModal", 'name');
            this.GetValueOfAttributeTypeForm("codeFormFormManagementEditModal", 'code');
            this.GetValueOfAttributeTypeForm("updateByFormFormManagementEditModal", 'updated_by');
            this.GetValueOfAttributeTypeForm("updateAtFormFormManagementEditModal", 'updated_at');
            this.GetValueOfAttributeTypeForm("createdByFormFormManagementEditModal", 'created_by');
            this.GetValueOfAttributeTypeForm("createAtFormFormManagementEditModal", 'created_at');
        }
    }

    GetValueOfAttributeTypeForm(Eleid=null, attr=null) {
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
                        case 'fields':
                            formEle.val((this.fields).join('\n'));
                            // var selectedValues = formEle.val(this.fields);
                            // console.log("JOJJO " + this.fields);
                            // $('#fieldsTypeFormFormManagementDetailId').val(this.fields.join('\n'));
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

    CreateNewTypeFormApi(uuid_type_form=null, formId=null){
        $.ajaxSetup({
            headers : {
                'CSRFToken' : getCSRFTokenValue(),
                'X-CSRFToken' : getCSRFTokenValue(), // for --> SessionAuthentication
            },
            tryCount : 0,
            retryLimit : 3,
        });
        $('#idTypeFormFormManagementCreateModalInputId').val(uuidv4());
        // $("#typeFormFormManagementCreateModalInput").val(uuid_type_form);
        var self = this;
        var formData;
        var form ;
        var arr_table = [];
        if(formId==null){
            formData = new FormData($('#typeFormFormManagementCreateModalsFormId')[0]);
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
                url: TypeForm_URL,
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
                    self = new TypeFormFormManagement(data);
                    // LoadAccountAccountList();
                    TyperFormFormManagementApi(TypeFormFormManagementpagination["current_page"]);

                    TypeFormRefreshCreateModal();
                    $('.modal').modal('hide');

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

    SearchAllObjApi(page=null,search_data=null,typeSearch){
        var results = [];
        this.callAjax = null;
        $.ajaxSetup({
            headers : {
                'CSRFToken' : getCSRFTokenValue(),
                'X-CSRFToken' : getCSRFTokenValue(), 
            },
            tryCount : 0,
            retryLimit : 3,
        });
        var has_go_page=""
        if(page!=null){
            has_go_page="?page="+page;
        }
        var slugSearch="";
        var SEARCH_URL="";
        if(typeSearch=="filter"){
            SEARCH_URL=TypeForm_URL;
        
            slugSearch="&";
        
            if($("#nameTypeformFormManagementFilterSearchInputId").length>0){
                var value_name=$("#nameTypeformFormManagementFilterSearchInputId").val();
                var value_code=$("#codeTypeformFormManagementFilterSearchInputId").val();
                if((value_name !="" && value_name != null)
                || (value_code !="" && value_code != null)){
                    slugSearch+="name__icontains="+value_name+"&code__icontains="+value_code;
                }
            }   
            
            slugSearch=slugSearch.slice(0);
        }else{
            SEARCH_URL=TypeForm_URL;
            
                slugSearch="&";
                slugSearch+="search="+$("#typeFormFormManagementQuickSearchInputId").val();
            
        }
        if(search_data!=null){
            SEARCH_URL=TypeForm_URL;
            slugSearch="&";
            slugSearch+=search_data;
        }
        // search_log["search_data"] = slugSearch;
        this.callAjax = $.ajax({
            url: TypeForm_URL + has_go_page + slugSearch,
            type: "GET",
            //async: false,
            cache: false,
            timeout: 30000,
    
            success: function (data) {
                console.log('[GetAllObjApi] data = ', data);
                // return new AccountAccount(data);
                if (data.hasOwnProperty('count')){
                    TypeFormFormManagementpagination["total"]=data.count;
                }

                if (data.hasOwnProperty('next')){
                    if(data.next != null){
                        TypeFormFormManagementpagination["has_next"]=true;
                    }
                    else {
                        TypeFormFormManagementpagination["has_next"]=false;
                    }
                }
                TypeFormFormManagementpagination["current_page"]=page;

                if (data.hasOwnProperty('previous')){
                    if(data.previous != null) {
                        TypeFormFormManagementpagination["has_prev"]=true;
                    }
                    else {
                        TypeFormFormManagementpagination["has_prev"]=false;
                    }
                }
                if (data.hasOwnProperty('results')){
                    for (var j=0; j < data.results.length; j++){
                        var tmp = new TypeFormFormManagement(data.results[j]);
                        results.push(tmp);
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
            },
        });
        return results;
    }

    UpdateTypeFormApi(formId=null){
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
              url: TypeForm_URL + idForm + "/",
              // type: "PUT",
              type: "PATCH",
              // async: false,
              // cache: false,
              timeout: 30000,
              data: formData,
              contentType: false,
              processData: false,
              success: function (data) {
                      self = new TypeFormFormManagement(data);
                      TyperFormFormManagementApi(TypeFormFormManagementpagination["current_page"]);
                      $('.modal').modal('hide');
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

}

function createTypeFormFormManagement(){
    $('#typeFormFormManagementCreatemodalsId').modal('toggle');
    // $('#createAssetListByFormFormManagementModals').modal('toggle');
    $("#typeFormCreateModalBtnId").click(function(){
        var validate_obj = new InputValidation('typeFormFormManagementCreateModalsFormId');
        if(validate_obj.validateRequired()){
            toastr.warning('Vui lòng điền đầy đủ thông tin');
            return;
        }
        obj = new TypeFormFormManagement();
        console.log('Save obj = ', obj);
        obj.CreateNewTypeFormApi('typeFormFormManagementCreateModalsFormId');
    })
}

function GetDataTypeFormEdit(uuid=null) {
    var formId = "typeFormtEditModalsFormId";
    var modalId = 'typeFormEditmodalsId';
    $('#' + modalId).modal('toggle');
    var obj = new TypeFormFormManagement();
    obj.GetObjApiTypeForm(uuid);
    obj.callAjax.then(function(data) {
        new TypeFormFormManagement(data).getTypeFormData(formId);
    })
}

function UpdateTypeFormFormManagement() {
    obj = new TypeFormFormManagement();
    console.log('Update obj = ', obj);
    obj.UpdateTypeFormApi('typeFormtEditModalsFormId');
}


function DeleteTypeForm(uuid){
    // if (confirm("Bạn có muốn xóa không?") == true){
    // }
    $.confirm({
        icon: 'fa fa-warning',
        title: 'Xóa Phiếu',
        content: 'Bạn có chắc muốn xóa loại phiếu này không ?',
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
                            url: TypeForm_URL + uuid_go + "/",
                            type: "DELETE",
                            async: false,
                            cache: false,
                            timeout: 30000,
                
                            success: function (data) {
                                TyperFormFormManagementApi(TypeFormFormManagementpagination["current_page"]);
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

function TyperFormFormManagementApi(page=null, search_data=null) {
    search_log["search_func"] = "TyperFormFormManagementApi";
    search_log["search_data"] = search_data;
    search_log["search_type"] = "";

    var object = new TypeFormFormManagement()
    var results = object.getTypeFormApi(page, search_data);

    object.callAjax.then(function(data) {

        $("#typeFormDataTableBodyId").empty();
        TYPEFORM_ID_TABLE_COUNT = 1;
        var crr_record_in_page = TypeFormFormManagementrecord_in_page;

        if(page>1){
            TYPEFORM_ID_TABLE_COUNT =1+crr_record_in_page*page-crr_record_in_page
        }
        for (var i = 0; i < results.length; i++){

            try{
                console.log('results[i] = ', results[i]);
                results[i].GetDataTypeFormForField();
                TYPEFORM_ID_TABLE_COUNT++;
            }
            catch(err){
                console.log(err);
            }
        }

        var pagenation_ele=$(".pagination-TypeFormFormManagement");
        var pagination=TypeFormFormManagementpagination;
        pagenation_ele.html('');
        var page_total_ele = $(".page-total-TypeFormFormManagement");
        page_total_ele.html(`<footer class="blockquote-footer">Tổng số: ${pagination["total"]} bản ghi </footer>`);
        if (results.length > 0) {
            
            pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="TyperFormFormManagementApi(1)"><i class="fa fa-angle-double-left"></a></li>`);
            if (pagination["has_prev"] == true) {
                pagenation_ele.append('<li class="page-item"><a class="page-link" onclick="TyperFormFormManagementApi(' + (parseInt(pagination["current_page"]) - 1) + ')">' + (parseInt(pagination["current_page"]) - 1) + '</a></li>');
            }

            pagenation_ele.append('<li class="page-item active"><a class="page-link" >' + (parseInt(pagination["current_page"])) + '</a></li>');
            if (pagination["has_next"] == true) {
                pagenation_ele.append('<li class="page-item"><a class="page-link" onclick="TyperFormFormManagementApi(' + (parseInt(pagination["current_page"]) + 1) + ')">' + (parseInt(pagination["current_page"]) + 1) + '</a></li>');
            }

            if(pagination["total"]>0) {
                var last_page_order = 0 
                if((pagination["total"] % type_form_record_in_page) != 0) {
                    last_page_order = Math.floor(pagination["total"]/type_form_record_in_page) + 1;
                }
                else {
                    last_page_order = (pagination["total"]/type_form_record_in_page);
                }
                pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="TyperFormFormManagementApi(`+last_page_order+`)"><i class="fa fa-angle-double-right"></a></li>`);
            }
        }
    })
}


function TypeFormFormManagementSearchData(page=null, search_type, search_data=null) {
    search_log["search_func"] = "TypeFormFormManagementSearchData";
    search_log["search_type"] = search_type;
    search_log["search_data"] = search_data;
    var object = new TypeFormFormManagement()

    var results = object.SearchAllObjApi(page, search_data, search_type);

    object.callAjax.then(function(data) {

        $("#typeFormDataTableBodyId").empty();
        TYPEFORM_ID_TABLE_COUNT = 1;
        var crr_record_in_page = TypeFormFormManagementrecord_in_page;

        if(page>1){
            TYPEFORM_ID_TABLE_COUNT =1+crr_record_in_page*page-crr_record_in_page
        }
        for (var i = 0; i < results.length; i++){

            try{
                console.log('results[i] = ', results[i]);
                results[i].GetDataTypeFormForField();
                TYPEFORM_ID_TABLE_COUNT++;
            }
            catch(err){
                console.log(err);
            }
        }
        search_type = search_type.trim()
        var pagenation_ele=$(".pagination-TypeFormFormManagement");
        var pagination=TypeFormFormManagementpagination;
        pagenation_ele.html('');
        var page_total_ele = $(".page-total-TypeFormFormManagement");
        page_total_ele.html(`<footer class="blockquote-footer">Tổng số: ${pagination["total"]} bản ghi </footer>`);


        if (results.length > 0) {
            
            pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="TyperFormFormManagementApi(1, '`+ search_type +`', `+ search_data +`)"><i class="fa fa-angle-double-left"></a></li>`);
            if (pagination["has_prev"] == true) {
                pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="TyperFormFormManagementApi(` + (parseInt(pagination["current_page"]) - 1) + `, '`+ search_type +`', `+ search_data +`)">` + (parseInt(pagination["current_page"]) - 1) + `</a></li>`);
            }

            pagenation_ele.append(`<li class="page-item active"><a class="page-link" >` + (parseInt(pagination["current_page"])) + `</a></li>`);
            if (pagination["has_next"] == true) {
                pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="TyperFormFormManagementApi(` + (parseInt(pagination["current_page"]) + 1) + `, '`+ search_type +`', `+ search_data +`)">` + (parseInt(pagination["current_page"]) + 1) + `</a></li>`);
            }

            if(pagination["total"]>0) {
                var last_page_order = 0 
                if((pagination["total"] % type_form_record_in_page) != 0) {
                    last_page_order = Math.floor(pagination["total"]/type_form_record_in_page) + 1;
                }
                else {
                    last_page_order = (pagination["total"]/type_form_record_in_page);
                }
                pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="TyperFormFormManagementApi(`+last_page_order+`, '`+ search_type +`', `+ search_data +`    )"><i class="fa fa-angle-double-right"></a></li>`);
            }
        }
        if (search_type == "quick") {
            var crr_txt = $("#typeFormFormManagementQuickSearchInputId").val();
            highlight(crr_txt,"#typeFormDataTableBodyId");
        }
    })
}

function TypeFormFormManagementGetDataTable(page=1,search_data=null,is_export,ExportFunc){
    var obj = new TypeFormFormManagement();
    var tbId = "typeFormDataTableExportExcelId"
    var results = obj.getTypeFormApi(page,search_data);
    obj.callAjax.then(function(data) {

        $("#"+tbId).find("table").empty();
        TYPEFORM_ID_TABLE_COUNT = 1;
        for (var i = 0; i < results.length; i++){
            try{
                console.log('Do results[i] = ', results[i]);
                results[i].GetDataTypeFormForField(tbId);
                // results[i].tFillCard();
                TYPEFORM_ID_TABLE_COUNT++;
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

function TypeFormFormManagementExcelSearchData(page=1,search_type,search_data=null,is_export,ExportFunc){
    var obj = new TypeFormFormManagement();
    var tbId = "typeFormDataTableExportExcelId"
    var results = obj.SearchAllObjApi(page,search_data,search_type);
    obj.callAjax.then(function(data) {
    $("#"+tbId).find("table").empty();
    TYPEFORM_ID_TABLE_COUNT = 1;
    for (var i = 0; i < results.length; i++){
        try{
            console.log('results[i] = ', results[i]);
            results[i].GetDataTypeFormForField(tbId);
            TYPEFORM_ID_TABLE_COUNT++;
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

function TypeFormExportDataTableExcel() {
    $('#typeFormDataTableBodyExportExcelId').empty();
    var is_export = true;
    if(search_log["search_func"] == "TyperFormFormManagementApi"){
        TypeFormFormManagementGetDataTable(1,search_log["search_data"],is_export,TypeFormFormManagementExportExcel);
    }
    else if(search_log["search_func"] == "TypeFormFormManagementSearchData"){
        TypeFormFormManagementExcelSearchData(1,search_log["search_type"],search_log["search_data"],is_export,TypeFormFormManagementExportExcel);
    }
}

function TypeFormFormManagementExportExcel(){

    var table=$('#typeFormDataTableExportExcelId');
    var count_cols = table.find("th").length;
    if(table.find("td").length>0){
        table.tableExport({
                filename: 'thông_tin_loại_phiếu_%DD%-%MM%-%YY%',
                format: 'xls',
                //excludeCols: count_cols.toString(),
                onbefore: function() {
                    alert('Bắt đầu xuất Excel!');
                },
                onafter: function() {
                    alert('Xuất Excel thành công');
                },
        });
    }
    else{
        toastr.warning('Không có dữ liệu!');
    }
    
}


var TypeFormFormManagementpagination={
    current_page:1,
    total:2,
    has_next:true,
    has_prev:true
}

// stt cộng thêm bao nhiêu
var TypeFormFormManagementrecord_in_page = PAGE_SIZE;

// = setting = bên trên
var type_form_record_in_page = PAGE_SIZE;

$(document).ready(function(){
    var IdTable ="typeFormDataTableBodyId";
    var checker = $("#" +IdTable );
    if (checker.length > 0){
        if($('#'+IdTable).is(":visible")){
            TyperFormFormManagementApi(TypeFormFormManagementpagination["current_page"]);
        }
    }
})



$(document).ready(function(){
    $("#typeFormFormManagementQuickSearchInputId").on('keyup', function(e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            TypeFormFormManagementpagination={
                current_page:1,
                total:0,
                has_next:false,
                has_prev:false
            }
            TypeFormFormManagementSearchData(TypeFormFormManagementpagination["current_page"],"quick");
        }
    })
    $("#typeFormFormManagementQuickSearchBtnId").click(function(){
        TypeFormFormManagementpagination={
            current_page:1,
            total:0,
            has_next:false,
            has_prev:false
        }
        TypeFormFormManagementSearchData(TypeFormFormManagementpagination["current_page"],"quick");
    })
    $("#typeformFormManagementFilterSearchBtnId").click(function(){
        TypeFormFormManagementpagination={
            current_page:1,
            total:0,
            has_next:false,
            has_prev:false
    }
        TypeFormFormManagementSearchData(TypeFormFormManagementpagination["current_page"],"filter");
    })
});

function TypeFormRefreshCreateModal() {
    $('#typeFormFormManagementCreatemodalsId')
        .find("input[type=text],input[type=number],textarea,select")
        .val('').removeClass("is-invalid").removeClass("is-valid")
        .end()
        .find("input[data-datepicker]").val('').removeClass("is-invalid").removeClass("is-valid")
        .end()
        .find("input[type=checkbox], input[type=radio]").removeClass("is-invalid").removeClass("is-valid")
        .prop("checked", false)
        .end();
};

function AssetByFormRefreshCreateModal() {
    $('#assetByFormFormManagementCreatemodalsId')
        .find("input[type=text],input[type=number],textarea,select")
        .val('').removeClass("is-invalid").removeClass("is-valid")
        .end()
        .find("input[data-datepicker]").val('').removeClass("is-invalid").removeClass("is-valid")
        .end()
        .find("input[type=checkbox], input[type=radio]").removeClass("is-invalid").removeClass("is-valid")
        .prop("checked", false)
        .end();
};

// $(document).this(function(){
//     $.ajaxSetup({
//         headers : {
//             'CSRFToken' : getCSRFTokenValue(),
//             'X-CSRFToken' : getCSRFTokenValue(), // for --> SessionAuthentication
//         },
//         tryCount : 0,
//         retryLimit : 3,
//     });
    
//     var event_data = '';

//     $.ajax({
//             url: AssetListByForm_URL,
//             type: 'GET',
//             async: false,
//             cache: false,
//             timeout: 30000,
//             success: function(data){
//                 if (data.hasOwnProperty('results')){
//                     for (var j=0; j < data.results.length; j++){
//                         var uuid_tmp = data.results[j].uuid;
//                         var name_tmp = data.results[j].name;
//                         event_data += '<option value="' + uuid_tmp + '">' + name_tmp + '</option>'
//                     }
//                     $("#addAssetByFormFormManagementCreateModalInput").append(event_data);
//                 }
//             },
//             error:function (xhr, ajaxOptions, thrownError) {
//                 console.log(xhr.status);
//                 console.log(thrownError);
//             }
//     });

// });
