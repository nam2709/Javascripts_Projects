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

function AssetListFormManagementDetails(uuid=null) {
    $('#assetListFormManagementDetailmodalsId').modal('toggle');
    var obj = new AssetListFormManagement();
    obj.GetObjApiAssetList(uuid);
    obj.callAjax.then(function(data) {
        new AssetListFormManagement(data).getAssetListData("assetListFormManagementDetailModalsFormId");
    })
}

var AssetByFormFormManagement_arr_action = [
    // default action
    
                {
                "title": "Xem chi tiết",
                "func": "AssetListFormManagementDetails",
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
                    "func": "GetDataAssetByFormEdit",
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
                    "func": "DeleteAssetByForm",
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

class AssetListFormManagement{
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
            if (data.hasOwnProperty('asset')) {
                this.asset = data.asset
            } 
            else {
                this.asset = null
            }
            if (data.hasOwnProperty('code')) {
                this.code = data.code
            } 
            else {
                this.code = null
            }

            if (data.hasOwnProperty('code_form')) {
                this.code_form = data.code_form
            } 
            else {
                this.code_form = null
            }

            if (data.hasOwnProperty('current_status_asset')) {
                this.current_status_asset = data.current_status_asset
            } 
            else {
                this.current_status_asset = null
            }

            if (data.hasOwnProperty('is_exits_when_inventory')) {
                this.is_exits_when_inventory = data.is_exits_when_inventory
            } 
            else {
                this.is_exits_when_inventory = null
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

            if (data.hasOwnProperty('get_name_asset')) {
                this.get_name_asset = data.get_name_asset
            } 
            else {
                this.get_name_asset = null
            }

            if (data.hasOwnProperty('get_code_form')) {
                this.get_code_form = data.get_code_form
            } 
            else {
                this.get_code_form = null
            }

            if (data.hasOwnProperty('get_code_asset_warehouse')) {
                this.get_code_asset_warehouse = data.get_code_asset_warehouse
            } 
            else {
                this.get_code_asset_warehouse = null
            }

            if (data.hasOwnProperty('get_type')) {
                this.get_type = data.get_type
            } 
            else {
                this.get_type = null
            }
            
            // if (data.hasOwnProperty('get_status')) {
            //     this.get_status = data.get_status
            // } 
            // else {
            //     this.get_status = null
            // }

        }
    }

    GetObjApiAssetList(uuid) {
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
            url: AssetListByForm_URL + uuid + "/",
            type: 'GET',
            async: false,
            cache: false,
            timeout: 3000,

            success: function(data) {
                var obj = new AssetListFormManagement(data);
                console.log('[getObjApi] data = ', data);
                return obj;
            }
        })
    }

    getAssetListByFormApi(page=null, search_data=null) {

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
                url: AssetListByForm_URL + has_go_page,
                type: 'GET',
                async: false,
                cache: false,
                timeout: 30000,
                success: function(data){
                    console.log('[getAssetListByFormApi] data = ', data);
                    if (data.hasOwnProperty('count')){
                        AssetListFormManagementpagination["total"]=data.count;
                    }
                    if (data.hasOwnProperty('next')){
                        if(data.next != null){
                            AssetListFormManagementpagination["has_next"]=true;
                        } else {
                            AssetListFormManagementpagination["has_next"]=false;
                        }
                    }
                    AssetListFormManagementpagination["current_page"]=page;
                    if (data.hasOwnProperty('previous')){
                        if(data.previous != null){
                            AssetListFormManagementpagination["has_prev"]=true;
                        } else {
                            AssetListFormManagementpagination["has_prev"]=false;
                        }
                    }
                    if (data.hasOwnProperty('results')){
                        for (var j=0; j < data.results.length; j++){
                            var tmp = new AssetListFormManagement(data.results[j]);
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

    GetDataAssetListForField(tableId=null, order=null, action=null){
        var tbId = "assetListFormDataTableId";
        if (tableId != null) {
            tbId = tableId;
        }

        if(order==null){
            order=ASSET_BY_FORM_ID_TABLE_COUNT;
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
                    if(attr=="asset"){   
                        var uuid = this["uuid"];
                        html +=`<td class="text-wrap" style="min-width:200px;  text-align: left;"><a>` + (this['get_name_asset']) + `</a></td>`;
                            continue;
                    }

                    if(attr=="name"){
                        html +=`<style>
                        a {
                            color: #000000;
                        } 
                    </style>
                    <td class="text-wrap" style="min-width:160px; text-align: left;" onclick="AssetListFormManagementDetails('` + this["uuid"] + `')"><a href="#" style="text-decoration: none; font-weight: 500;">` + (this['name']) + `</a></td>`;
                            continue;
                        }

                    if(attr=="code"){
                        html +=`<td class="text-wrap"><a>` + (this['get_code_asset_warehouse']) + `</a></td>`;
                            continue;
                        }
                    
                    if(attr=="code_form"){
                        html +=`<td class="text-wrap" style="text-align: left;"><a>` + (this['get_type']) + `</a></td>`;
                            continue;
                        }

                    if(attr=="current_status_asset"){
                        html +=`<td class="text-wrap"><a>` + (this['current_status_asset']) + `</a></td>`;
                            continue;
                        }

                    // if(attr=="created_at"){
                    //     html +=`<td class="text-wrap"><a>` + GetDateOnly_V01(this[attr]) + `</a></td>`;
                    //         continue;
                    //     }

                    if(attr=="created_by"){
                        html +=`<td class="text-wrap"><a>` + (this[attr]) + `</a></td>`;
                            continue;
                        }

                    html +=`<td class="text-wrap"><a>` + (this[attr]) + `</a></td>`;
                
                }

                else {
                    if(attr=="account-admin-action") {
                        var uuid = this["uuid"];
                        html += BindActionButtonVer4(
                            AssetByFormFormManagement_arr_action,
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

    getAssetListData(formId=null) {
        if (formId == "assetListFormManagementDetailModalsFormId") {
            this.GetValueOfAttributeAssetList("nameDefaultAssetListFormManagementDetailId", 'name');
            this.GetValueOfAttributeAssetList("codeAssetListFormManagementDetailId", 'code');
            this.GetValueOfAttributeAssetList("nameAssetListFormManagementDetailId", 'get_name_asset');
            this.GetValueOfAttributeAssetList("codeFormAssetListFormManagementDetailId", 'get_code_form');
            this.GetValueOfAttributeAssetList("statusAssetListFormManagementDetailId", 'current_status_asset');
            this.GetValueOfAttributeAssetList("codeWareAssetListFormManagementDetailId", 'get_code_asset_warehouse');
            this.GetValueOfAttributeAssetList("nameFAssetListFormManagementDetailId", 'get_type');
            this.GetValueOfAttributeAssetList("updateByAssetListFormManagementDetailId", 'updated_by');
            this.GetValueOfAttributeAssetList("updateAtAssetListFormManagementDetailId", 'updated_at');
            this.GetValueOfAttributeAssetList("createdByAssetListFormManagementDetailId", 'created_by');
            this.GetValueOfAttributeAssetList("createdAtAssetListFormManagementDetailId", 'created_at');
        } else if (formId == "assetByFormtEditModalsFormId") {
            this.GetValueOfAttributeAssetList("uuidTypeFormFormManagementEditModal", 'uuid');
            this.GetValueOfAttributeAssetList("nameDefaultAssetByFormFormManagementEditModal", 'name');
            this.GetValueOfAttributeAssetList("codeAssetInTableFormManagementEditModal", 'code');
            this.GetValueOfAttributeAssetList("nameAssetFormManagementEditModal", 'asset');
            this.GetValueOfAttributeAssetList("formAssetListByFormEditModal", 'type');
            // this.GetValueOfAttributeAssetList("contentFormFormManagementEditModal", 'get_status');
            // this.GetValueOfAttributeAssetList("codeFormFormManagementEditModal", 'get_code_form');
            this.GetValueOfAttributeAssetList("updateByFormFormManagementEditModal", 'updated_by');
            this.GetValueOfAttributeAssetList("updateAtFormFormManagementEditModal", 'updated_at');
            this.GetValueOfAttributeAssetList("createdByFormFormManagementEditModal", 'created_by');
            this.GetValueOfAttributeAssetList("createAtFormFormManagementEditModal", 'created_at');
        } 
    }

    GetValueOfAttributeAssetList(Eleid=null, attr=null) {
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
                        case 'asset':
                            formEle.val(this.asset);
                            break;
                        case 'type':
                            formEle.val(this.code_form);
                            break;
                        case 'current_status_asset':
                            formEle.val(this.current_status_asset);
                            break;
                        case 'get_name_asset':
                            formEle.val(this.get_name_asset);
                            break;
                        case 'get_code_form':
                            formEle.val(this.get_code_form);
                            break;
                        case 'get_code_asset_warehouse':
                            formEle.val(this.get_code_asset_warehouse);
                            break;
                        case 'current_status_asset':
                            formEle.val(this.current_status_asset);
                            break;
                        case 'get_type':
                            formEle.val(this.get_type);
                            break;
                        case 'updated_by':
                            formEle.val(this.updated_by);
                            break;
                        case 'updated_at':
                            formEle.val(this.updated_at);
                            break;
                        case 'created_by':
                            formEle.val(this.created_by);
                            break;
                        case 'created_at':
                            formEle.val(this.created_at);
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

    CreateNewPostFormApi(formId=null){
        $.ajaxSetup({
            headers : {
                'CSRFToken' : getCSRFTokenValue(),
                'X-CSRFToken' : getCSRFTokenValue(), // for --> SessionAuthentication
            },
            tryCount : 0,
            retryLimit : 3,
        });
        $('#uuidAssetByFormFormManagementCreateModalInputId').val(uuidv4());
        var self = this;
        var formData;
        var form ;
        var arr_table = [];
        if(formId==null){
            formData = new FormData($('#assetByFormFormManagementCreateModalsFormId')[0]);
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
                // if (($(this).closest("table").length > 0 && $(this).closest("table").closest("form").attr("id") == formId) || ($(this).closest("form").length > 0 && $(this).closest("form").attr("id") != formId)) {
                //     return;
                // }
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
            url: AssetListByForm_URL,
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
                self = new AssetListFormManagement(data);
                // LoadAccountAccountList();
                AssetListByFormFormManagementApi(AssetListFormManagementpagination["current_page"]);
                AssetByFormRefreshCreateModal();
                $('.modal').modal('hide');
                toastr.success('Tạo mới thành công');
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status);
                console.log(thrownError);
                toastr.error('Tạo mới thất bại');

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
            SEARCH_URL=AssetListByForm_URL;
        
            slugSearch="&";
        
            if($("#nameAssetByFormFormManagementFilterSearchInputId").length>0
                || $("#codeFormAssetByFormFormManagementFilterSearchInputId").length>0
                || $("#assetAssetByFormFormManagementFilterSearchInputId").length>0
                )
            {
                var value_name=$("#nameAssetByFormFormManagementFilterSearchInputId").val();
                var value_code_form = $("#codeFormAssetByFormFormManagementFilterSearchInputId").val();
                var value_asset = $("#assetAssetByFormFormManagementFilterSearchInputId").val();
                if(value_name!="" && value_name!=null
                    || (value_code_form !="" && value_code_form != null)
                    || (value_asset !="" && value_asset != null))
                    {
                    slugSearch+="name__icontains="+value_name+"&code_form="+value_code_form+"&asset="+value_asset;
                }
            }
            
            slugSearch=slugSearch.slice(0);
        }else{
            SEARCH_URL=AssetListByForm_URL;
            
                slugSearch="&";
                slugSearch+="search="+$("#assetByFormFormManagementQuickSearchInputId").val();
            
        }
        if(search_data!=null){
            SEARCH_URL=AssetListByForm_URL;
            slugSearch="&";
            slugSearch+=search_data;
        }
        // search_log["search_data"] = slugSearch;
        this.callAjax = $.ajax({
            url: AssetListByForm_URL + has_go_page + slugSearch,
            type: "GET",
            //async: false,
            cache: false,
            timeout: 30000,
    
            success: function (data) {
                console.log('[GetAllObjApi] data = ', data);
                // return new AccountAccount(data);
                if (data.hasOwnProperty('count')){
                    AssetListFormManagementpagination["total"]=data.count;
                }

                if (data.hasOwnProperty('next')){
                    if(data.next != null){
                        AssetListFormManagementpagination["has_next"]=true;
                    }
                    else {
                        AssetListFormManagementpagination["has_next"]=false;
                    }
                }
                AssetListFormManagementpagination["current_page"]=page;

                if (data.hasOwnProperty('previous')){
                    if(data.previous != null) {
                        AssetListFormManagementpagination["has_prev"]=true;
                    }
                    else {
                        AssetListFormManagementpagination["has_prev"]=false;
                    }
                }
                if (data.hasOwnProperty('results')){
                    for (var j=0; j < data.results.length; j++){
                        var tmp = new AssetListFormManagement(data.results[j]);
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
    
    UpdateAssetByFormApi(formId=null){
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
              url: AssetListByForm_URL + idForm + "/",
              // type: "PUT",
              type: "PATCH",
              // async: false,
              // cache: false,
              timeout: 30000,
              data: formData,
              contentType: false,
              processData: false,
              success: function (data) {
                      self = new AssetListFormManagement(data);
                      AssetListByFormFormManagementApi(AssetListFormManagementpagination["current_page"]);
                      $('.modal').modal('hide');
                      toastr.success('Chỉnh sửa thành công');

              },
              error: function (xhr, ajaxOptions, thrownError) {
                  console.log(xhr.status);
                  console.log(thrownError);
                  toastr.error('Chỉnh sửa thất bại');

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

function DeleteAssetByForm(uuid){
    $.confirm({
        icon: 'fa fa-warning',
        title: 'Xóa Phiếu',
        content: 'Bạn có chắc muốn xóa tài sản này khỏi phiếu không?',
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
                            url: AssetListByForm_URL + uuid_go + "/",
                            type: "DELETE",
                            async: false,
                            cache: false,
                            timeout: 30000,
                
                            success: function (data) {
                                AssetListByFormFormManagementApi(AssetListFormManagementpagination["current_page"]);
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

function GetDataAssetByFormEdit(uuid=null) {
    var formId = "assetByFormtEditModalsFormId";
    var modalId = 'assetByFormEditmodalsId';
    $('#' + modalId).modal('toggle');
    var obj = new AssetListFormManagement();
    obj.GetObjApiAssetList(uuid);
    obj.callAjax.then(function(data) {
        new AssetListFormManagement(data).getAssetListData(formId);
    })
}

function UpdateAssetByFormFormManagement() {
    obj = new AssetListFormManagement();
    console.log('Update obj = ', obj);
    obj.UpdateAssetByFormApi('assetByFormtEditModalsFormId');
}


var AssetListFormManagementpagination={
    current_page:1,
    total:2,
    has_next:true,
    has_prev:true
}

// stt cộng thêm bao nhiêu
var AssetListFormManagementrecord_in_page = PAGE_SIZE;

// = setting = bên trên
var asset_by_form_record_in_page = PAGE_SIZE;

$(document).ready(function(){
    var IdTable ="assetListFormDataTableBodyId";
    var checker = $("#" +IdTable );
    if (checker.length > 0){
        if($('#'+IdTable).is(":visible")){
            AssetListByFormFormManagementApi(AssetListFormManagementpagination["current_page"]);
        }
    }
})


var search_log = {
    search_func:"",
    search_data:"",
    search_type:"",
}

function AssetListByFormFormManagementApi(page=null, search_data=null) {
    search_log["search_func"] = "AssetListByFormFormManagementApi";
    search_log["search_data"] = search_data;
    search_log["search_type"] = "";
    var object = new AssetListFormManagement()
    var results = object.getAssetListByFormApi(page, search_data);

    object.callAjax.then(function(data) {

        $("#assetListFormDataTableBodyId").empty();
        ASSET_BY_FORM_ID_TABLE_COUNT = 1;
        var crr_record_in_page = AssetListFormManagementrecord_in_page;

        if(page>1){
            ASSET_BY_FORM_ID_TABLE_COUNT =1+crr_record_in_page*page-crr_record_in_page
        }
        for (var i = 0; i < results.length; i++){

            try{
                console.log('results[i] = ', results[i]);
                results[i].GetDataAssetListForField();
                ASSET_BY_FORM_ID_TABLE_COUNT++;
            }
            catch(err){
                console.log(err);
            }
        }

        var pagenation_ele=$(".pagination-AssetListFormManagement");
        var pagination=AssetListFormManagementpagination;
        pagenation_ele.html('');
        var page_total_ele = $(".page-total-AssetListFormManagement");
        page_total_ele.html(`<footer class="blockquote-footer">Tổng số: ${pagination["total"]} bản ghi </footer>`);
        if (results.length > 0) {
            
            pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="AssetListByFormFormManagementApi(1)"><i class="fa fa-angle-double-left"></a></li>`);
            if (pagination["has_prev"] == true) {
                pagenation_ele.append('<li class="page-item"><a class="page-link" onclick="AssetListByFormFormManagementApi(' + (parseInt(pagination["current_page"]) - 1) + ')">' + (parseInt(pagination["current_page"]) - 1) + '</a></li>');
            }

            pagenation_ele.append('<li class="page-item active"><a class="page-link" >' + (parseInt(pagination["current_page"])) + '</a></li>');
            if (pagination["has_next"] == true) {
                pagenation_ele.append('<li class="page-item"><a class="page-link" onclick="AssetListByFormFormManagementApi(' + (parseInt(pagination["current_page"]) + 1) + ')">' + (parseInt(pagination["current_page"]) + 1) + '</a></li>');
            }

            if(pagination["total"]>0) {
                var last_page_order = 0 
                if((pagination["total"] % asset_by_form_record_in_page) != 0) {
                    last_page_order = Math.floor(pagination["total"]/asset_by_form_record_in_page) + 1;
                }
                else {
                    last_page_order = (pagination["total"]/asset_by_form_record_in_page);
                }
                pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="AssetListByFormFormManagementApi(`+last_page_order+`)"><i class="fa fa-angle-double-right"></a></li>`);
            }
        }
    })
}


function AssetByFormFormManagementSearchData(page=null, search_type, search_data=null) {
    search_log["search_func"] = "AssetByFormFormManagementSearchData";
    search_log["search_type"] = search_type;
    search_log["search_data"] = search_data;
    var object = new AssetListFormManagement()

    var results = object.SearchAllObjApi(page, search_data, search_type);

    object.callAjax.then(function(data) {

        $("#assetListFormDataTableBodyId").empty();
        ASSET_BY_FORM_ID_TABLE_COUNT = 1;
        var crr_record_in_page = AssetListFormManagementrecord_in_page;

        if(page>1){
            ASSET_BY_FORM_ID_TABLE_COUNT =1+crr_record_in_page*page-crr_record_in_page
        }
        for (var i = 0; i < results.length; i++){

            try{
                console.log('results[i] = ', results[i]);
                results[i].GetDataAssetListForField();
                ASSET_BY_FORM_ID_TABLE_COUNT++;
            }
            catch(err){
                console.log(err);
            }
        }
        search_type = search_type.trim()
        var pagenation_ele=$(".pagination-AssetListFormManagement");
        var pagination=AssetListFormManagementpagination;
        pagenation_ele.html('');
        var page_total_ele = $(".page-total-AssetListFormManagement");
        page_total_ele.html(`<footer class="blockquote-footer">Tổng số: ${pagination["total"]} bản ghi </footer>`);
        if (results.length > 0) {
            
            pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="AssetByFormFormManagementSearchData(1, '`+ search_type +`', `+ search_data +`)"><i class="fa fa-angle-double-left"></a></li>`);
            if (pagination["has_prev"] == true) {
                pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="AssetByFormFormManagementSearchData(` + (parseInt(pagination["current_page"]) - 1) + `, '`+ search_type +`', `+ search_data +`)">` + (parseInt(pagination["current_page"]) - 1) + `</a></li>`);
            }

            pagenation_ele.append(`<li class="page-item active"><a class="page-link" >` + (parseInt(pagination["current_page"])) + `</a></li>`);
            if (pagination["has_next"] == true) {
                pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="AssetByFormFormManagementSearchData(` + (parseInt(pagination["current_page"]) + 1) + `, '`+ search_type +`', `+ search_data +`)">` + (parseInt(pagination["current_page"]) + 1) + `</a></li>`);
            }

            if(pagination["total"]>0) {
                var last_page_order = 0 
                if((pagination["total"] % asset_by_form_record_in_page) != 0) {
                    last_page_order = Math.floor(pagination["total"]/asset_by_form_record_in_page) + 1;
                }
                else {
                    last_page_order = (pagination["total"]/asset_by_form_record_in_page);
                }
                pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="AssetByFormFormManagementSearchData(`+last_page_order+`, '`+ search_type +`', `+ search_data +`    )"><i class="fa fa-angle-double-right"></a></li>`);
            }
        }
        if (search_type == "quick") {
            var crr_txt = $("#assetByFormFormManagementQuickSearchInputId").val();
            highlight(crr_txt,"#assetListFormDataTableBodyId");
        }
        if (search_type == "filter") {
            var crr_txt = $("#nameAssetByFormFormManagementFilterSearchInputId").val();
            highlight(crr_txt,"#assetListFormDataTableBodyId");
        }
    })
}

$(document).ready(function(){
    $("#assetByFormFormManagementQuickSearchInputId").on('keyup', function(e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            AssetListFormManagementpagination={
                current_page:1,
                total:0,
                has_next:false,
                has_prev:false
            }
            AssetByFormFormManagementSearchData(AssetListFormManagementpagination["current_page"],"quick");
        }
    })
    $("#assetByFormFormManagementQuickSearchBtnId").click(function(){
        AssetListFormManagementpagination={
            current_page:1,
            total:0,
            has_next:false,
            has_prev:false
        }
        AssetByFormFormManagementSearchData(AssetListFormManagementpagination["current_page"],"quick");
    })
    $("#AssetByFormFormManagementFilterSearchBtnId").click(function(){
        AssetListFormManagementpagination={
            current_page:1,
            total:0,
            has_next:false,
            has_prev:false
    }
        AssetByFormFormManagementSearchData(AssetListFormManagementpagination["current_page"],"filter");
    })
});

function AssetByFormFormManagementGetDataTable(page=1,search_data=null,is_export,ExportFunc){
    var obj = new AssetListFormManagement();
    var tbId = "assetListFormDataTableExportExcelId"
    var results = obj.getAssetListByFormApi(page,search_data);
    obj.callAjax.then(function(data) {

        $("#"+tbId).find("table").empty();
        ASSET_BY_FORM_ID_TABLE_COUNT = 1;
        for (var i = 0; i < results.length; i++){
            try{
                console.log('Do results[i] = ', results[i]);
                results[i].GetDataAssetListForField(tbId);
                // results[i].tFillCard();
                ASSET_BY_FORM_ID_TABLE_COUNT++;
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

function AssetByFormFormManagementExSearchData(page=1,search_type,search_data=null,is_export,ExportFunc){
    var obj = new AssetListFormManagement();
    var tbId = "assetListFormDataTableExportExcelId"
    var results = obj.SearchAllObjApi(page,search_data,search_type);
    obj.callAjax.then(function(data) {
    $("#"+tbId).find("table").empty();
    ASSET_BY_FORM_ID_TABLE_COUNT = 1;
    for (var i = 0; i < results.length; i++){
        try{
            console.log('results[i] = ', results[i]);
            results[i].GetDataAssetListForField(tbId);
            ASSET_BY_FORM_ID_TABLE_COUNT++;
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

function AssetByFormExportDataTableExcel() {
    $('#assetListFormDataTableBodyExportExcelId').empty();
    var is_export = true;
    if(search_log["search_func"] == "AssetListByFormFormManagementApi"){
        AssetByFormFormManagementGetDataTable(1,search_log["search_data"],is_export,AssetByFormFormManagementExportExcel);
    }
    else if(search_log["search_func"] == "AssetByFormFormManagementSearchData"){
        AssetByFormFormManagementExSearchData(1,search_log["search_type"],search_log["search_data"],is_export,AssetByFormFormManagementExportExcel);
    }
}

function AssetByFormFormManagementExportExcel(){

    var table=$('#assetListFormDataTableExportExcelId');
    var count_cols = table.find("th").length;
    if(table.find("td").length>0){
        table.tableExport({
                filename: 'thông_tin_tài sản_theo_phiếu_%DD%-%MM%-%YY%',
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

function addAssetByFormFormManagement(){
    $('#assetByFormFormManagementCreatemodalsId').modal('toggle');

    $("#assetAssetByFormCreateModalBtnId").click(function(){

        obj = new AssetListFormManagement();
        console.log('Save obj = ', obj);
        obj.CreateNewPostFormApi('assetByFormFormManagementCreateModalsFormId');
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
                url: Asset_URL,
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
                        $("#assetByFormFormManagementCreateModalInput").append(event_data);
                        $("#nameAssetFormManagementEditModal").append(event_data);
                        $("#assetAssetByFormFormManagementFilterSearchInputId").append(event_data);

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
                url: FormList_URL,
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
                        $("#formAssetListByFormCreateModalInput").append(event_data);
                        $("#formAssetListByFormEditModal").append(event_data);
                        $("#codeFormAssetByFormFormManagementFilterSearchInputId").append(event_data);
                    }
                },
                error:function (xhr, ajaxOptions, thrownError) {
                    console.log(xhr.status);
                    console.log(thrownError);
                }
        });
});

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