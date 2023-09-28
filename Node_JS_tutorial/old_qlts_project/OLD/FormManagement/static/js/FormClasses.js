
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

function generateCode() {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    let code = '';
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * letters.length);
      const randomLetter = letters[randomIndex];
      code += randomLetter;
    }
  
    const numbers = '0123456789';
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * numbers.length);
      const randomNumber = numbers[randomIndex];
      code += randomNumber;
    }
  
    const formattedCode = code.substring(0, 6) + '-' + code.substring(6);
  
    return formattedCode;
  }



function is_statusFormEventChangeSwitcher($this) {
    var status = "";
    var name = "Xác Nhận";
    if ($($this).is(":checked")) {
        status = name;
        console.log($($this).attr("data-uuid") + ": Check box in Checked");

        // $("#payDebtManagementCreatemodalsId").modal('toggle');
        // $("#payDebtManagementCreateModalsFormId").find("[name=debt]").val($($this).attr("data-uuid")).change().prop("disabled", true);

    } else {
        status = "Không " + name;
        console.log($($this).attr("data-uuid") + ": Check box is Unchecked");
    }
    var obj = new FormFormManagement();
    obj.GetObjSimpleApiForm($($this).attr("data-uuid"));
    obj.callAjax.then(function(data) {
        new FormFormManagement(data).getFormData(null, "formFormEditSimpleModalsFormId");
    })
    $.confirm({
        icon: 'fa fa-bell',
        title: 'Trạng thái',
        content: 'Bạn có muốn thay đổi trạng thái phiếu sang <b><br>' + status + '</b> ?',
        theme: 'modern',
        closeIcon: 'cancel',
        animation: 'scale',
        type: 'blue',
        buttons: {
            cancel: {
                text: 'Hủy',
                action: function() {
                    $($this).prop('checked', !$($this).is(":checked"));
                }
            },
            confirm: {
                text: 'Đồng ý',
                btnClass: 'btn-blue',
                action: function() {
                    var obj1 = new FormFormManagement();
                    obj1.tUpdateOnlyFieldApi($($this).attr("data-uuid"), $($this).attr("name"), $($this).is(":checked"));
                }
            },

        }
    })
}
  
var FormFormManagement_arr_action = [
    // default action
    
                {
                "title": "Xem chi tiết",
                "func": "ViewFormByType",
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
                    "func": "GetFormEditByType",
                    "icon": "far fa-edit",
                    "href": "#",
                    "isCheck": false,
                    "allowSelfChecking": false,
                    "field_checking": "is_sent",
                    "value_is_true": "#",
                    "views_name": "",
                    "independent_views": true
                },
                // {
                //     "title": "Thêm tài sản",
                //     "func": "AddAssetInUpdateForm",
                //     "icon": "fa fa-plus",
                //     "href": "#",
                //     "isCheck": false,
                //     "allowSelfChecking": false,
                //     "field_checking": "is_sent",
                //     "value_is_true": "#",
                //     "views_name": "",
                //     "independent_views": true
                // },
                {
                    "title": "Xóa",
                    "func": "DeleteForm",
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

function displayNoneEle(idEle, idDiv) {
    if ($("#" + idEle).val() == "") {
        var myDiv = document.getElementById(idDiv);
        myDiv.classList.add("d-none");
    }
}

function reload() {
    $('.modal').modal('hide');
}


class FormFormManagement{

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
            if (data.hasOwnProperty('type_form')) {
                this.type_form = data.type_form
            } 
            else {
                this.type_form = null
            }
            if (data.hasOwnProperty('execution_date')) {
                this.execution_date = data.execution_date
            } 
            else {
                this.execution_date = null
            }
            if (data.hasOwnProperty('get_name_staff_receive_property')) {
                this.get_name_staff_receive_property = data.get_name_staff_receive_property
            } 
            else {
                this.get_name_staff_receive_property = null
            }

            if (data.hasOwnProperty('get_name_staff_confiscated_asset')) {
                this.get_name_staff_confiscated_asset = data.get_name_staff_confiscated_asset
            } 
            else {
                this.get_name_staff_confiscated_asset = null
            }

            if (data.hasOwnProperty('reason_asset_recovery')) {
                this.reason_asset_recovery = data.reason_asset_recovery
            } 
            else {
                this.reason_asset_recovery = null
            }

            if (data.hasOwnProperty('content')) {
                this.content = data.content
            } 
            else {
                this.content = null
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

            if (data.hasOwnProperty('attached_document')) {
                this.attached_document = data.attached_document
            } 
            else {
                this.attached_document = null
            }
            if (data.hasOwnProperty('get_attached_document')) {
                this.get_attached_document = data.get_attached_document
            } 
            else {
                this.get_attached_document = null
            }
            if (data.hasOwnProperty('get_name_type_form')) {
                this.get_name_type_form = data.get_name_type_form
            } 
            else {
                this.get_name_type_form = null
            }
            if (data.hasOwnProperty('staff_receive_property')) {
                this.staff_receive_property = data.staff_receive_property
            } 
            else {
                this.staff_receive_property = null
            }
            if (data.hasOwnProperty('staff_confiscated_asset')) {
                this.staff_confiscated_asset = data.staff_confiscated_asset
            } 
            else {
                this.staff_confiscated_asset = null
            }
            if (data.hasOwnProperty('delivered')) {
                this.delivered = data.delivered
            } 
            else {
                this.delivered = null
            }
            if (data.hasOwnProperty('received')) {
                this.received = data.received
            } 
            else {
                this.received = null
            }
            if (data.hasOwnProperty('unit_currently_borrowing')) {
                this.unit_currently_borrowing = data.unit_currently_borrowing
            } 
            else {
                this.unit_currently_borrowing = null
            }
            if (data.hasOwnProperty('lending_unit')) {
                this.lending_unit = data.lending_unit
            } 
            else {
                this.lending_unit = null
            }
            if (data.hasOwnProperty('get_company_lending_unit')) {
                this.get_company_lending_unit = data.get_company_lending_unit
            } 
            else {
                this.get_company_lending_unit = null
            }
            if (data.hasOwnProperty('get_company_unit_currently_borrowing')) {
                this.get_company_unit_currently_borrowing = data.get_company_unit_currently_borrowing
            } 
            else {
                this.get_company_unit_currently_borrowing = null
            }
            if (data.hasOwnProperty('get_unit_currently_borrowing')) {
                this.get_unit_currently_borrowing = data.get_unit_currently_borrowing
            } 
            else {
                this.get_unit_currently_borrowing = null
            }
            if (data.hasOwnProperty('get_lending_unit')) {
                this.get_lending_unit = data.get_lending_unit
            } 
            else {
                this.get_lending_unit = null
            }
            if (data.hasOwnProperty('get_name_delivered')) {
                this.get_name_delivered = data.get_name_delivered
            } 
            else {
                this.get_name_delivered = null
            }
            if (data.hasOwnProperty('get_name_received')) {
                this.get_name_received = data.get_name_received
            } 
            else {
                this.get_name_received = null
            }

            if (data.hasOwnProperty('is_confirm')) {
                this.is_confirm = data.is_confirm
            } 
            else {
                this.is_confirm = null
            }

            if (data.hasOwnProperty('buyer')) {
                this.buyer = data.buyer
            } 
            else {
                this.buyer = null
            }

            if (data.hasOwnProperty('price')) {
                this.price = data.price
            } 
            else {
                this.price = null
            }
            if (data.hasOwnProperty('liquidation_reason')) {
                this.liquidation_reason = data.liquidation_reason
            } 
            else {
                this.liquidation_reason = null
            }

            if (data.hasOwnProperty('supplier')) {
                this.supplier = data.supplier
            } 
            else {
                this.supplier = null
            }
            if (data.hasOwnProperty('warehouse')) {
                this.warehouse = data.warehouse
            } 
            else {
                this.warehouse = null
            }

            if (data.hasOwnProperty('get_supplier')) {
                this.get_supplier = data.get_supplier
            } 
            else {
                this.get_supplier = null
            }
            if (data.hasOwnProperty('get_warehouse')) {
                this.get_warehouse = data.get_warehouse
            } 
            else {
                this.get_warehouse = null
            }
        }
    }

    GetObjApiForm(uuid){
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
            url: FormList_URL + uuid + "/",
            type: 'GET',
            async: false,
            cache: false,
            timeout: 3000,

            success: function(data) {
                var obj = new FormFormManagement(data);
                console.log('[getObjApiForm] data = ', data);
                return obj;
            }
        })

    }

    GetObjSimpleApiForm(uuid){
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
            url: FormListTemp_URL + uuid + "/",
            type: 'GET',
            async: false,
            cache: false,
            timeout: 3000,

            success: function(data) {
                var obj = new FormFormManagement(data);
                console.log('[getObjSimpleApiForm] data = ', data);
                return obj;
            }
        })

    }

    getListFormApi(page=null, search_data=null) {

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
        
        var has_go_page="";
        if(page!=null){
            has_go_page="?page="+page;
        }
        this.callAjax = $.ajax({
                // url: FormList_URL + has_go_page,
                url: FormListTemp_URL + has_go_page,
                type: 'GET',
                async: false,
                cache: false,
                // contentType: "application/json; charset=utf-8",
                // dataType: "json",
                timeout: 30000,
                success: function(data){

                    console.log('[getListFormApi] data = ', data);
                    if (data.hasOwnProperty('count')){
                        FormFormManagementpagination["total"]=data.count;
                    }
                    // if (data.hasOwnProperty('count')){
                    //     FormFormManagementpagination["total"]=data.count;
                    // }
                    if (data.hasOwnProperty('next')){
                        if(data.next != null){
                        FormFormManagementpagination["has_next"]=true;
                        }else{
                        FormFormManagementpagination["has_next"]=false;
    
                        }
                    }
                    FormFormManagementpagination["current_page"]=page;
                    if (data.hasOwnProperty('previous')){
                        if(data.previous != null){
                        FormFormManagementpagination["has_prev"]=true;
                        }else{
                        FormFormManagementpagination["has_prev"]=false;
                        }
                    }
                    if (data.hasOwnProperty('results')){
                        for (var j=0; j < data.results.length; j++){
                            var tmp = new FormFormManagement(data.results[j]);
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

    GetValueOfAttribute(Eleid=null, attr=null, Divid=null) {
        try {
            var formEle = $("#" + Eleid);
            if (formEle.length > 0){
                if (formEle.attr('name') != 'uuid'){
                    // if (attr == 'name') {
                    //     formEle.val(this.name);
                    // }
                    switch(attr) {
                        case 'uuid_':
                            formEle.val(this.uuid);
                            break;
                        case 'name':
                            formEle.val(this.name);
                            break;
                        case 'code':
                            formEle.val(this.code);
                            break;
                        case 'type':
                            formEle.val(this.get_name_type_form);
                            break;
                        case 'type_form':
                            formEle.val(this.type_form);
                            break;
                        case 'staff_receive_property':
                            formEle.val(this.get_name_staff_receive_property);
                            break;
                        case 'staff_confiscated_asset':
                            formEle.val(this.get_name_staff_confiscated_asset);
                            break;
                        case 'reason_asset_recovery':
                            formEle.val(this.reason_asset_recovery);
                            break;
                        case 'execution_date':
                            formEle.val(this.execution_date);
                            break;
                        case 'execution_date_detail':
                            formEle.val(GetDateOnly_V01(this.execution_date));
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
                        case 'content':
                            formEle.val(this.content);
                            break;
                        case 'loan_period':
                            formEle.val(this.loan_period);
                            break;
                        case 'buyer':
                            formEle.val(this.buyer);
                            break;
                        case 'price':
                            formEle.val(this.price);
                            break;
                        case 'lending_unit':
                            formEle.val(this.lending_unit);
                            break;
                        case 'unit_currently_borrowing':
                            formEle.val(this.unit_currently_borrowing);
                            break;
                        case 'liquidation_reason':
                            formEle.val(this.liquidation_reason);
                            break;
                        case 'attached_document':
                            formEle.val(this.attached_document);
                            break;
                        case 'get_attached_document':
                            formEle.val(this.get_attached_document);
                            break;
                        case 'staff_receive_property_uuid':
                            formEle.val(this.staff_receive_property);
                            break;
                        case 'staff_confiscated_asset_uuid':
                            formEle.val(this.staff_confiscated_asset);
                            break;
                        case 'delivered':
                            formEle.val(this.delivered);
                            break;
                        case 'received':
                            formEle.val(this.received);
                            break;
                        case 'get_name_received':
                            formEle.val(this.get_name_received);
                            break;
                        case 'delivered':
                            formEle.val(this.delivered);
                            break;
                        case 'get_name_delivered':
                            formEle.val(this.get_name_delivered);
                            break;
                        case 'get_unit_currently_borrowing':
                            formEle.val(this.get_unit_currently_borrowing + `/` + this.get_company_unit_currently_borrowing);
                            break;
                        case 'get_lending_unit':
                            formEle.val(this.get_lending_unit + `/` + this.get_company_lending_unit);
                            break;
                        case 'is_confirm':
                            formEle.val(this.is_confirm);
                            break;
                        case 'warehouse':
                            formEle.val(this.warehouse);
                            break;
                        case 'supplier':
                            formEle.val(this.supplier);
                            break;

                        case 'get_supplier':
                            formEle.val(this.get_supplier);
                            break;
                        case 'get_warehouse':
                            formEle.val(this.get_warehouse);
                            break;
                        default:
                            formEle.val(this.uuid);
                    }
                }
                // if ($("#" + Eleid).val() == "") {
                //     var myDiv = document.getElementById(Divid);
                //     myDiv.classList.add("d-none");
                // }
            } 
            else {
                formEle.val(null);
            }
        }
        catch(err) {    
            console.log("err: ", err);
        }
        
    }
    

    getFormData(modals_type=null, formId=null) {
        if (formId == "formFormManagementDetailModalsFormId") {
            var fields = [];
            this.GetValueOfAttribute("nameFormFormManagementDetailId", 'name', );
            this.GetValueOfAttribute("codeFormFormManagementDetailId", 'code');
            this.GetValueOfAttribute("typeFormFormManagementDetailId", 'type');
            this.GetValueOfAttribute("is_confirmFormDetailsModalInputId", 'is_confirm');
            const checkbox = document.getElementById('is_confirmFormDetailsModalInputId');
            if (checkbox.value === 'true') {
                checkbox.checked = true; 
            } else {
                checkbox.checked = false;
            }
            this.GetValueOfAttribute("staffReceiveFormFormManagementDetailId", 'staff_receive_property');
            this.GetValueOfAttribute("updateByFormFormManagementDetailId", 'updated_by');
            this.GetValueOfAttribute("updateAtFormFormManagementDetailId", 'updated_at_detail');
            this.GetValueOfAttribute("createdByFormFormManagementDetailId", 'created_by');
            this.GetValueOfAttribute("createdAtFormFormManagementDetailId", 'created_at_detail');
            this.GetValueOfAttribute("contentFormFormManagementDetailId", 'content');
            this.GetValueOfAttribute("staffRecoveryFormFormManagementDetailRecoveryId", 'staff_confiscated_asset', 'staffRecoveryAssetDivEle');
            this.GetValueOfAttribute("reasonRecoFormFormManagementDetailId", 'reason_asset_recovery', 'reasonAssetRecoveryDivEle');
            this.GetValueOfAttribute("exeDateFormFormManagementDetailId", 'execution_date_detail');
            this.GetValueOfAttribute("loanPeriodFormFormManagementDetailId", 'loan_period', 'loanPeriodDivEle');
            this.GetValueOfAttribute("buyerFormFormManagementDetailId", 'buyer', 'buyerDivEle');
            this.GetValueOfAttribute("priceFormFormManagementDetailId", 'price', 'priceDivEle');
            this.GetValueOfAttribute("liqReasonFormFormManagementDetailId", 'liquidation_reason', 'liquidationReasonDivEle');
            this.GetValueOfAttribute("xxlendingUnitFormFormManagementDetailId", 'get_lending_unit', 'lendingUnitDivEle');
            this.GetValueOfAttribute("brrowingUnitFormFormManagementDetailId", 'get_unit_currently_borrowing', 'borowingUnitDivEle');
            this.GetValueOfAttribute("attachedDocumentFormFormManagementDetailId", 'get_attached_document', 'attachedDocumentDivEle');
            this.GetValueOfAttribute("deliveredFormFormManagementDetailId", 'get_name_delivered');
            this.GetValueOfAttribute("receivedFormFormManagementDetailId", 'get_name_received');

            this.GetValueOfAttribute("warehouseFormFormManagementDetailId", 'get_warehouse');
            this.GetValueOfAttribute("supplierFormFormManagementDetailId", 'get_supplier');

            this.GetValueOfAttribute("uuidtypeFormFormManagementDetailId", 'type_form');
            fields = getgetget($("#uuidtypeFormFormManagementDetailId").val());

            $('#formFormManagementDetailmodalsId div').each(function() {
                var id = $(this).attr('id');
                var name = $(this).attr('name');
                if (name != undefined) {
                    // console.log(name, id);
                    for (var i = 0; i < fields.length; i++){
                        var myDiv = document.getElementById(id);
                        myDiv.classList.add("d-none");
                        if (name == fields[i]) {
                            // var Fid = "#" + id;
                            var myDiv = document.getElementById(id);
                            myDiv.classList.remove("d-none");
                            break;
                        } 
                    }
                }
                // console.log("hiah", name, id);
              });

        }   
        else if (formId == "formFormEditModalsFormId") {
            this.GetValueOfAttribute("uuidFormFormManagementEditModal", 'uuid_');
            this.GetValueOfAttribute("nameFormFormManagementEditModal", 'name');
            this.GetValueOfAttribute("is_confirmFormModalInputId", 'is_confirm');
            const checkbox = document.getElementById('is_confirmFormModalInputId');
            if (checkbox.value === 'true') {
                checkbox.checked = true; 
            } else {
                checkbox.checked = false;
            }
            this.GetValueOfAttribute("codeFormFormManagementEditModal", 'code');
            this.GetValueOfAttribute("typeFormFormManagementEditModal", 'type');
            this.GetValueOfAttribute("staffRevFormFormManagementEditModal", 'staff_receive_property_uuid');
            this.GetValueOfAttribute("exeDateFormFormManagementEditModal", 'execution_date');
            this.GetValueOfAttribute("updateByFormFormManagementEditModal", 'updated_by');
            this.GetValueOfAttribute("updateAtFormFormManagementEditModal", 'updated_at');
            this.GetValueOfAttribute("createdByFormFormManagementEditModal", 'created_by');
            this.GetValueOfAttribute("createAtFormFormManagementEditModal", 'created_at');
            this.GetValueOfAttribute("contentFormFormManagementEditModal", 'content');
            this.GetValueOfAttribute("staffRecoveryFormFormManagementEditModal", 'staff_confiscated_asset_uuid');
            this.GetValueOfAttribute("reasonRecoFormFormManagementEditModal", 'reason_asset_recovery');
            this.GetValueOfAttribute("xxlendingUnitFormFormManagementEditModal", 'lending_unit');
            this.GetValueOfAttribute("brrowingUnitFormFormManagementEditModal", 'unit_currently_borrowing');
            this.GetValueOfAttribute("loanPeriodFormFormManagementEditModal", 'loan_period');
            this.GetValueOfAttribute("buyerFormFormManagementEditModal", 'buyer');
            this.GetValueOfAttribute("priceFormFormManagementEditModal", 'price');
            this.GetValueOfAttribute("liqReasonFormFormManagementEditModal", 'liquidation_reason');
            this.GetValueOfAttribute("attachedDocumentFormFormManagementEditModal", 'attached_document');
            this.GetValueOfAttribute("uuidtypeFormFormManagementEditModal", 'type_form');
            this.GetValueOfAttribute("deliveredFormFormManagementEditModal", 'delivered');
            this.GetValueOfAttribute("receivedFormFormManagementEditModal", 'received');

            this.GetValueOfAttribute("warehouseFormFormManagementEditModal", 'warehouse');
            this.GetValueOfAttribute("supplierFormFormManagementEditModal", 'supplier');


            fields = getgetget($("#uuidtypeFormFormManagementEditModal").val());

            $('#fromFormEditmodalsId div').each(function() {
                var id = $(this).attr('id');
                var name = $(this).attr('name');
                if (name != undefined) {
                    // console.log(name, id);
                    for (var i = 0; i < fields.length; i++){
                        var myDiv = document.getElementById(id);
                        myDiv.classList.add("d-none");  
                        if (name == fields[i]) {
                            // var Fid = "#" + id;
                            var myDiv = document.getElementById(id);
                            myDiv.classList.remove("d-none");
                            break;
                        } 
                    }
                }
                // console.log("hiah", name, id);
              });


        }
        else if (formId == "formFormEditSimpleModalsFormId") {
            this.GetValueOfAttribute("uuidFormFormManagementSimpleEditModal", 'uuid_');
            this.GetValueOfAttribute("nameFormFormManagementSimpleEditModal", 'name');
            this.GetValueOfAttribute("is_confirmFormFormManagementSimpleEditModal", 'is_confirm');
            this.GetValueOfAttribute("codeFormFormManagementSimpleEditModal", 'code');
            this.GetValueOfAttribute("typeFormFormManagementSimpleEditModal", 'type_form');
            this.GetValueOfAttribute("createdByFormFormManagementSimpleEditModal", 'created_by');
            this.GetValueOfAttribute("createAtFormFormManagementSimpleEditModal", 'created_at');
        }
    }

    tUpdateOnlyFieldApi(uuid = null, attr_name, attr_value) {
        $.ajaxSetup({
            headers: {
                'CSRFToken': getCSRFTokenValue(),
                'X-CSRFToken': getCSRFTokenValue(),
            },
            tryCount: 0,
            retryLimit: 3,
        });
        var self = this;
        var form;
        var arr_table = [];
        var formData;
        form = $('#formFormEditSimpleModalsFormId');
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
        var idForm = formData.get('uuid_');
        formData.set(attr_name, attr_value);
        for (const [key, value] of formData.entries()) {
            console.log(key, value);
        }

        $.ajax({
            // url: "http://127.0.0.1:1500/Form/form/list_form_temp/" + uuid + "/",
            url: FormListTemp_URL + uuid + "/",
            type: "PATCH",
            timeout: 30000,
            data: formData,
            contentType: false,
            processData: false,
            success: function(data) {
                toastr.success('Thay đổi trạng thái phiếu thành công!!');
            },
            error: function(xhr, ajaxOptions, thrownError) {
                toastr.alert('Thay đổi trạng thái phiếu thất bại!!');
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

    GetDataForField(tableId=null, order=null, action=null){
        var tbId = "formFormDataTableId";
        if (tableId != null) {
            tbId = tableId;
        }

        if(order==null){
            order=FORM_ID_TABLE_COUNT;
            }
        var seTbId = $("#" + tbId);

        if(seTbId.length > 0) {
            
            var html = "<tr>";
            // html += `
            //         <td class="text-wrap" style="min-width:100px">
            //         <div class="form-check">
            //         <label class="form-check-label">
            //             <input type="checkbox" name="confirmed[]" width="30%" id="action-toggle" style=" height: 1.2rem; width: 1.2rem;">
            //         </label>
            //     </div>
            //         </td>
            //         `;
            html += `<td style="text-align: center; vertical-align: middle;"><a>` + order + `</a></td>`;
            var tableHeaders = seTbId.find('thead th');
            var tableBody = seTbId.find('tbody');

            for (var thId = 1; thId < tableHeaders.length; thId++) {
                var hEle = tableHeaders[thId];
                var attr = hEle.getAttribute('attr-name');
                if (this.hasOwnProperty(attr)) {
                    if(attr=="name"){   
                        var uuid = this["uuid"];
                        var type_form = this["type_form"];
                        console.log(type_form)
                        html +=`<style>
                            a {
                                color: #000000;
                            } 
                            </style>
                        <td class="text-wrap" style="min-width:300px; text-align: left;" onclick="ViewFormByType('` + uuid + `', '` + type_form + `')"><a href="#" style="text-decoration: none; font-weight: 500;">` + (this[attr]) + `</a></td>`;
                            continue;
                    }

                    if(attr=="code"){
                        html +=`<td class="text-wrap"><a>` + (this[attr]) + `</a></td>`;
                            continue;
                        }
                    
                    if(attr=="type_form"){
                        html +=`<td class="text-wrap" style="text-align: left;"><a>` + (this['get_name_type_form']) + `</a></td>`;
                            continue;
                        }

                    if(attr=="is_confirm"){
                        // html +=`<td class="text-center">
                        //         <div class="form-check form-switch">
                        //             <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
                        //         </div>                                                
                        //     </td>`;
                        var value = "";
                        if (this[attr] || this[attr] == "true") {
                            value = "checked";
                        }
                        html += `
                            <td class="" >
                            <div class="switch-container" style="text-align: center; vertical-align: middle;">
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" name="is_confirm" data-uuid="` + this["uuid"] + `" ` + value +` id="rememberMe" style="width: 40.22222px; height: 20.22222px;" onclick="is_statusFormEventChangeSwitcher(this)">
                                </div>
                                </div>  
                            </td>`
                            
                            continue;
                        }

                    if(attr=="created_at"){
                        html +=`<td class="text-wrap" style="text-align: center;" ><a>` + GetDateOnly_V01(this[attr]) + `</a></td>`;
                            continue;
                        }

                    if(attr=="created_by"){
                        html +=`<td class="text-wrap" style="text-align: center;"><a>` + (this[attr]) + `</a></td>`;
                            continue;
                        }

                    
                    html +=`<td class="text-wrap"><a>` + (this[attr]) + `</a></td>`;
                
                }

                else{
                    if(attr=="account-admin-action")
                    {
                        html += BindActionButtonVer4(
                            FormFormManagement_arr_action,
                            this['uuid'],
                            this['name'],
                            null,
                            this['created_by'],
                        );
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
            SEARCH_URL=FormList_URL;
        
            slugSearch="&";
        
            if($("#nameformFormManagementFilterSearchInputId").length>0 
                || $("#codeformFormManagementFilterSearchInputId").length>0
                ||  $("#typeformFormManagementFilterSearchInputId").length>0
                )
            {
                var value_name=$("#nameformFormManagementFilterSearchInputId").val();
                var value_code=$("#codeformFormManagementFilterSearchInputId").val();
                var value_type=$("#typeformFormManagementFilterSearchInputId").val();
                if((value_name !="" && value_name != null)
                    || (value_code !="" && value_code != null)
                    || (value_type !="" && value_type != null)
                    )
                    {
                        slugSearch+="name__icontains="+value_name+"&code__icontains="+value_code+"&type_form="+value_type;
                    }

            }
            slugSearch=slugSearch.slice(0 );

        }else{
            SEARCH_URL=FormList_URL;
            
                slugSearch="&";
                slugSearch+="search="+$("#formFormManagementQuickSearchInputId").val();
            
        }
        if(search_data!=null){
            SEARCH_URL=FormList_URL;
            slugSearch="&";
            slugSearch+=search_data;
        }
        // search_log["search_data"] = slugSearch;
        this.callAjax = $.ajax({
            url: FormList_URL + has_go_page + slugSearch,
            type: "GET",
            //async: false,
            cache: false,
            timeout: 30000,
    
            success: function (data) {
                console.log('[GetAllObjApi] data = ', data);
                // return new AccountAccount(data);
                if (data.hasOwnProperty('count')){
                    FormFormManagementpagination["total"]=data.count;
                }

                if (data.hasOwnProperty('next')){
                    if(data.next != null){
                        FormFormManagementpagination["has_next"]=true;
                    }
                    else {
                        FormFormManagementpagination["has_next"]=false;
                    }
                }
                FormFormManagementpagination["current_page"]=page;

                if (data.hasOwnProperty('previous')){
                    if(data.previous != null) {
                        FormFormManagementpagination["has_prev"]=true;
                    }
                    else {
                        FormFormManagementpagination["has_prev"]=false;
                    }
                }
                if (data.hasOwnProperty('results')){
                    for (var j=0; j < data.results.length; j++){
                        var tmp = new FormFormManagement(data.results[j]);
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
    

    // FilterApi(page=null,search_data=null,typeSearch)

    UpdateFormApi(formId=null){
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
            $.ajax({
                // url: FormList_URL + idForm + "/",
                url: FormList_URL + idForm + "/",
                // type: "PUT",
                type: "PATCH",
                // async: false,
                // cache: false,
                timeout: 30000,
                data: formData,
                contentType: false,
                processData: false,
                success: function (data) {
                    toastr.success("Lưu xong rồi nha !!!!");
                    self = new FormFormManagement(data);
                    FormFormManagementGetListFormApi(FormFormManagementpagination["current_page"]);
                        // $('.modal').modal('hide');
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    toastr.error("Lưu không thành công !!!!");
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

    CreateNewPostFormApi(uuid_type_form=null, formId=null){
        $.ajaxSetup({
            headers : {
                'CSRFToken' : getCSRFTokenValue(),
                'X-CSRFToken' : getCSRFTokenValue(), // for --> SessionAuthentication
            },
            tryCount : 0,
            retryLimit : 3,
        });
        $('#uuidFormFormManagementCreateModalInputId').val(uuidv4());
        $("#typeFormFormManagementCreateModalInput").val(uuid_type_form);
        var self = this;
        var formData;
        var form ;
        var arr_table = [];
        if(formId==null){
            formData = new FormData($('#formFormManagementCreateModalsFormId')[0]);
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

        // var file_eles = $(".account-account");
        // for (var i = 0; i < file_eles.length; i++) {
        //     console.log('file_eles[i] = ', file_eles[i]);
        //     var files = file_eles[i].files;
        //     // Check file selected or not
        //     if(files.length > 0 ) {
        //         formData.append(file_eles[i].getAttribute('name'), files[0]);
        //     }
        // }
        // var is_done=false;
        // var is_has_children=false;
        // var is_save_self_table=false;
        // var is_notification=false;
        // if (arr_table.length > 0) {
        //     arr_table.forEach(element => {
        //         var model_name=element.attr("model_name");
        //             var depend=element.attr("depend");
        //             var tr_length=element.find("tbody").find("tr").length ;
        //             if(tr_length >1){
        //                 if(depend==='self-depend'){
        //                     is_save_self_table=true;
        //                     window[model_name + "SaveInlineTable"](element.attr("id"),null,null,formData);
        //                     arr_table.pop(element);
        //                 }else{
        //                     element.attr("parent-attr-uuid",formData.get("uuid"));
        //                     is_has_children=true;
        //                 }
        //             }
        //     });
        // }
        // if(is_save_self_table){
        //     LoadAccountAccountList();
        // }
        // if(!is_save_self_table){
            $.ajax({
                url: FormList_URL,
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
                    toastr.success("Thêm Phiếu mới thành công!!");
                    self = new FormFormManagement(data);
                    // LoadAccountAccountList();
                    FormFormManagementGetListFormApi(FormFormManagementpagination["current_page"]);
                    // if(is_continue_form){
                    //     is_continue_form=false;
                    //     if(!is_notification){
                    //         is_notification = true;
                    //         alert('Thêm mới thành công');
                    //     }
                    //     $(location).prop('href', "/Account/Account/create/");
                    // }else if(is_continue_modal){
                    //     is_continue_modal=false;
                    //     FormRefreshCreateModal();
                    //     if(!is_notification){
                    //         is_notification = true;
                    //         alert('Thêm mới thành công is_continue_modal');
                    //     }
                    // }else{
                    //     if(!is_notification){
                    //         is_notification = true;
                    //         alert('Thêm mới thành công is_notification');
                    //     }
                    //     // form.closest('.modal').modal('hide');
                    //     FormRefreshCreateModal();
                    //     $('.modal').modal('hide');
                    // }

                    FormRefreshCreateModal();
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
        // }
        // if(is_has_children){
        //     arr_table.forEach(element => {
        //         var model_name=element.attr("model_name");
        //         var depend=element.attr("depend");
        //         if(depend!='self-depend'){
        //             window[model_name + "SaveInlineTable"](element.attr("id"),null,self.uuid);
        //         }
        //     });
        //     is_done=true;
        // }
        // if(is_done || !is_has_children){
        //     if(is_continue_form){
        //         is_continue_form=false;
        //         if(!is_notification){
        //             is_notification = true;
        //             alert('Thêm mới thành công');
        //         }
        //         $(location).prop('href', "/Account/Account/create/");
        //     }else if(is_continue_modal){
        //         is_continue_modal=false;
        //         FormRefreshCreateModal();
        //         if(!is_notification){
        //             is_notification = true;
        //             alert('Thêm mới thành công');
        //         }
        //     }else{
        //         if(!is_notification){
        //             is_notification = true;
        //             alert('Thêm mới thành công hihihi');
        //         }
        //         // form.closest('.modal').modal('hide');
        //         $('.modal').modal('hide');
        //     }
        // }
    return self;
    }

}   


var FormFormManagementpagination={
    current_page:1,
    total:2,
    has_next:true,
    has_prev:true
}

// stt cộng thêm bao nhiêu
var FormFormManagementrecord_in_page = PAGE_SIZE;

// = setting = bên trên
var Formrecord_in_page = PAGE_SIZE;


var search_log = {
    search_func:"",
    search_data:"",
    search_type:"",
}
function FormFormManagementGetListFormApi(page=null, search_data=null, numDataInTable=null) {
    search_log["search_func"] = "FormFormManagementGetListFormApi";
    search_log["search_data"] = search_data;
    search_log["search_type"] = "";
    var object = new FormFormManagement()

    var results = object.getListFormApi(page, search_data);

    object.callAjax.then(function(data) {

        $("#formFormDataTableBodyId").empty();
        FORM_ID_TABLE_COUNT = 1;
        var crr_record_in_page = FormFormManagementrecord_in_page;

        if(page>1){
            FORM_ID_TABLE_COUNT =1+crr_record_in_page*page-crr_record_in_page
        }
        if (numDataInTable == null) {
            numDataInTable = results.length;
        }
        for (var i = 0; i < results.length; i++){
        // for (var i = 0; i < numDataInTable; i++){
            try{
                // console.log('results[i] = ', results[i]);
                results[i].GetDataForField();
                FORM_ID_TABLE_COUNT++;
            }
            catch(err){
                console.log(err);
            }
        }

        var pagenation_ele=$(".pagination-FormFormManagement");
        var pagination=FormFormManagementpagination;
        pagenation_ele.html('');
        var page_total_ele = $(".page-total-FormFormManagement");
        page_total_ele.html(`<footer class="blockquote-footer">Tổng số: ${pagination["total"]} bản ghi </footer>`);
        if (results.length > 0) {
            // if (results.length == pagination["total"]) {
            //     var myDiv = document.getElementById("page");
            //     myDiv.classList.add("d-none");
            // }
            pagenation_ele.append(`<li class="page-item" id="page"><a class="page-link" onclick="FormFormManagementGetListFormApi(1, `+ search_data +`)"><i class="fa fa-angle-double-left"></a></li>`);
            if (pagination["has_prev"] == true) {
                pagenation_ele.append('<li class="page-item" id="page"><a class="page-link" onclick="FormFormManagementGetListFormApi(' + (parseInt(pagination["current_page"]) - 1) + ')">' + (parseInt(pagination["current_page"]) - 1) + '</a></li>');
            }
            pagenation_ele.append('<li class="page-item active" id="page"><a class="page-link" >' + (parseInt(pagination["current_page"])) + '</a></li>');
            if (pagination["has_next"] == true) {
                pagenation_ele.append('<li class="page-item" id="page"><a class="page-link" onclick="FormFormManagementGetListFormApi(' + (parseInt(pagination["current_page"]) + 1) + ')">' + (parseInt(pagination["current_page"]) + 1) + '</a></li>');
            }
            if(pagination["total"]>0){
                var last_page_order = 1
                if((pagination["total"] % Formrecord_in_page) != 0)
                {
                    last_page_order = Math.floor(pagination["total"]/Formrecord_in_page) + 1;
                }
                else {
                    last_page_order = (pagination["total"]/Formrecord_in_page) + 1;
                }
                pagenation_ele.append(`<li class="page-item" id="page"><a class="page-link" onclick="FormFormManagementGetListFormApi(`+last_page_order+`)"><i class="fa fa-angle-double-right"></a></li>`);
            }
        }   
    })
}

function DeleteForm(uuid){
    $.confirm({
        icon: 'fa fa-warning',
        title: 'Xóa Phiếu',
        content: 'Bạn có chắc muốn xóa phiếu này không ?',
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
                            url: FormList_URL + uuid_go + "/",
                            type: "DELETE",
                            async: false,
                            cache: false,
                            timeout: 30000,
                
                            success: function (data) {
                                FormFormManagementGetListFormApi(FormFormManagementpagination["current_page"]);
                                if(confirm)
                                toastr.success('Xóa thành công');

                                
                            },
                            error: function (xhr, ajaxOptions, thrownError) {
                                console.log(xhr.status);
                                console.log(thrownError);
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



function createFormFormManagement(uuid_type_form, name_type_form){
    // this.GetValueOfAttribute("uuidtypeFormFormManagementDetailId", 'type_form');
    var fields = [];
    fields = getgetget(uuid_type_form);
    console.log("fjfnl xvlk " + fields)
    $('#formFormManagementCreatemodalsId div').each(function() {
        var id = $(this).attr('id');
        var name = $(this).attr('name');
        if (name != undefined) {
            console.log(name, id);
            for (var i = 0; i < fields.length; i++){
                var myDiv = document.getElementById(id);
                myDiv.classList.add("d-none");
                if (name == fields[i]) {
                    // var Fid = "#" + id;
                    var myDiv2 = document.getElementById(id);
                    myDiv2.classList.remove("d-none");
                    break;
                } 
            }
        }
        // console.log("hiah", name, id);
    });

    $('#formFormManagementCreatemodalsId').modal('toggle');
    $("#typeFormFormManagementCreateModalInput").val(name_type_form);
    $("#formFormManagementCreateModalBtnId").click(function(){
        var validate_obj = new InputValidation('formFormManagementCreateModalsFormId');
        if(validate_obj.validateRequired()){
            toastr.warning('Vui lòng điền đầy đủ thông tin');
            return;
        }
        obj = new FormFormManagement();
        console.log('Save obj = ', obj);
        obj.CreateNewPostFormApi(uuid_type_form,'formFormManagementCreateModalsFormId');
    })
}

var is_continue_modal=false;
var is_continue_form=false;
// function createFormFormManagement(uuid_type_form=null){
// $(document).ready(function(){
//     // $('#formFormManagementCreatemodalsId').modal('toggle');
//     // $('#createAssetListByFormFormManagementModals').modal('toggle');
//     $("#formFormManagementCreateModalBtnId").click(function(){
//         var validate_obj = new InputValidation('formFormManagementCreateModalsFormId');
//         if(validate_obj.validateRequired()){
//             toastr.warning('Vui lòng điền đầy đủ thông tin');
//             return;
//         }
//         obj = new FormFormManagement();
//         console.log('Save obj = ', obj);
//         obj.CreateNewPostFormApi('formFormManagementCreateModalsFormId');
//     })
// });

// $(document).ready(function(){
//     $("#formFormManagementSaveAndNewModalBtnId").click(function(){
//         var validate_obj = new InputValidation('formFormManagementCreateModalsFormId');
//         if(validate_obj.validateRequired()){
//             toastr.warning('Vui lòng điền đầy đủ thông tin');
//             return;
//         }
//         obj = new FormFormManagement();
//         console.log('Save and create new obj = ', obj);
//         obj.CreateNewPostFormApi('formFormManagementCreateModalsFormId');  
//         // is_continue_modal=true;
//         alert('Save and create new obj');
//     })
// });
// }

function FormFormManagementDetails(uuid, formId, modalId, modals_type=null) {
    $('#' + modalId).modal('toggle');
    var obj = new FormFormManagement();
    obj.GetObjApiForm(uuid);
    obj.callAjax.then(function(data) {
        new FormFormManagement(data).getFormData(modals_type, formId);

    })
}


function ViewFormByType(uuid, type_form=null) {
    // if (type_form == ASSET_ISSUANCE_FORM) {
        var formId = "formFormManagementDetailModalsFormId";
        var modalId = 'formFormManagementDetailmodalsId';
        FormFormManagementDetails(uuid, formId, modalId);
        GetAssetListByFormFromForm(uuid);
}


function FormFormManagementSearchData(page=null, search_type, search_data=null) {
    search_log["search_func"] = "FormFormManagementSearchData";
    search_log["search_type"] = search_type;
    search_log["search_data"] = search_data;
    var object = new FormFormManagement()

    var results = object.SearchAllObjApi(page, search_data, search_type);

    object.callAjax.then(function(data) {

        $("#formFormDataTableBodyId").empty();
        FORM_ID_TABLE_COUNT = 1;
        var crr_record_in_page = FormFormManagementrecord_in_page;

        if(page>1){
            FORM_ID_TABLE_COUNT =1+crr_record_in_page*page-crr_record_in_page
        }
        for (var i = 0; i < results.length; i++){

            try{
                console.log('results[i] = ', results[i]);
                results[i].GetDataForField();
                FORM_ID_TABLE_COUNT++;
            }
            catch(err){
                console.log(err);
            }
        }
        search_type = search_type.trim()
        var pagenation_ele=$(".pagination-FormFormManagement");
        var pagination=FormFormManagementpagination;
        pagenation_ele.html('');
        var page_total_ele = $(".page-total-FormFormManagement");
        page_total_ele.html(`<footer class="blockquote-footer">Tổng số: ${pagination["total"]} bản ghi </footer>`);
        
        if (results.length > 0) {
            // if (results.length == pagination["total"]) {
            //     var myDiv = document.getElementById("page");
            //     myDiv.classList.add("d-none");
            // }
            pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="FormFormManagementSearchData(1, '`+ search_type +`', `+ search_data +`)"><i class="fa fa-angle-double-left"></a></li>`);
            if (pagination["has_prev"] == true) {
                pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="FormFormManagementSearchData(` + (parseInt(pagination["current_page"]) - 1) + `, '`+ search_type +`', `+ search_data +`)">` + (parseInt(pagination["current_page"]) - 1) + `</a></li>`);
            }

            pagenation_ele.append(`<li class="page-item active"><a class="page-link" >` + (parseInt(pagination["current_page"])) + `</a></li>`);
            if (pagination["has_next"] == true) {
                pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="FormFormManagementSearchData(` + (parseInt(pagination["current_page"]) + 1) + `, '`+ search_type +`', `+ search_data +`)">` + (parseInt(pagination["current_page"]) + 1) + `</a></li>`);
            }

            if(pagination["total"]>0) {
                var last_page_order = 0 
                if((pagination["total"] % Formrecord_in_page) != 0) {
                    last_page_order = Math.floor(pagination["total"]/Formrecord_in_page) + 1;
                }
                else {
                    last_page_order = (pagination["total"]/Formrecord_in_page);
                }
                pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="FormFormManagementSearchData(`+last_page_order+`, '`+ search_type +`', `+ search_data +`)"><i class="fa fa-angle-double-right"></a></li>`);
            }
        }  

        if (search_type == "quick") {
            var crr_txt = $("#formFormManagementQuickSearchInputId").val();
            highlight(crr_txt,"#formFormDataTableBodyId");
        }
    })
}

// function AccountAccountEdit(uuid){
//     $('#fromFormEditmodalsId').modal('toggle');
//     var obj=new AccountAccount();
//     obj.tGetObjApi(uuid);
//     obj.callAjax.then(function(data) {
//         new AccountAccount(data).tFillFormModal('Edit','formFormEditModalsFormId');
//     })
// }

function AddAssetInUpdateForm() {
    var uuid = $("#uuidFormFormManagementEditModal").val();
    obj1 = new AssetListByFormFormManagement();
    obj1.AddAssetToFormApi(uuid, 'assetToFormFormManagementCreateModalsFormId');
    const form = document.getElementById('assetToFormFormManagementCreateModalsFormId');
    form.reset();
}

function GetFormEditByType(uuid, type_form=null) {
    var formId = "formFormEditModalsFormId";
    var modalId = 'fromFormEditmodalsId';
    FormFormManagementDetails(uuid, formId, modalId);
    GetAssetListByFormInUpdateForm(uuid);
}

function UpdateFormFormManagement() {
    obj = new FormFormManagement();
    console.log('Update obj = ', obj);
    obj.UpdateFormApi('formFormEditModalsFormId');
}

function FormFormManagementGetDataTable(page=1,search_data=null,is_export,ExportFunc){
    var obj = new FormFormManagement();
    var tbId = "formFormDataExportTableId"
    var results = obj.getListFormApi(page,search_data);
    obj.callAjax.then(function(data) {

        $("#"+tbId).find("table").empty();
        FORM_ID_TABLE_COUNT = 1;
        for (var i = 0; i < results.length; i++){
            try{
                console.log('Do results[i] = ', results[i]);
                results[i].GetDataForField(tbId);
                // results[i].tFillCard();
                FORM_ID_TABLE_COUNT++;
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

function FormFormManagementExcelSearchData(page=1,search_type,search_data=null,is_export,ExportFunc){
    var obj = new FormFormManagement();
    var tbId = "formFormDataExportTableId"
    var results = obj.SearchAllObjApi(page,search_data,search_type);
    obj.callAjax.then(function(data) {
    $("#"+tbId).find("table").empty();
    FORM_ID_TABLE_COUNT = 1;
    for (var i = 0; i < results.length; i++){
        try{
            console.log('results[i] = ', results[i]);
            results[i].GetDataForField(tbId);
            FORM_ID_TABLE_COUNT++;
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

function ExportDataTableExcel() {
    $('#formFormDataExportTableBodyId').empty();
    var is_export = true;
    if(search_log["search_func"] == "FormFormManagementGetListFormApi"){
        FormFormManagementGetDataTable(1,search_log["search_data"],is_export,FormFormManagementExportExcel);
    }
    else if(search_log["search_func"] == "FormFormManagementSearchData"){
        FormFormManagementExcelSearchData(1,search_log["search_type"],search_log["search_data"],is_export,FormFormManagementExportExcel);
    }
}

function FormFormManagementExportExcel(){

    var table=$('#formFormDataExportTableId');
    var count_cols = table.find("th").length;
    if(table.find("td").length>0){
        table.tableExport({
                filename: 'thông_tin_phiếu_%DD%-%MM%-%YY%',
                format: 'xls',
                //excludeCols: count_cols.toString(),
                onbefore: function() {
                    toastr.success('Bắt đầu xuất Excel!');
                },
                onafter: function() {
                    toastr.success('Xuất Excel thành công');
                },
        });
    }
    else{
        toastr.warning('Không có dữ liệu!');
    }
    
}

$(document).ready(function(){
    $("#formFormManagementQuickSearchInputId").on('keyup', function(e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            FormFormManagementpagination={
                current_page:1,
                total:0,
                has_next:false,
                has_prev:false
            }
            FormFormManagementSearchData(FormFormManagementpagination["current_page"],"quick");
        }
    })
    $("#formFormManagementQuickSearchBtnId").click(function(){
        FormFormManagementpagination={
            current_page:1,
            total:0,
            has_next:false,
            has_prev:false
        }
        FormFormManagementSearchData(FormFormManagementpagination["current_page"],"quick");
    })
    $("#formFormManagementFilterSearchBtnId").click(function(){
        FormFormManagementpagination={
            current_page:1,
            total:0,
            has_next:false,
            has_prev:false
    }
        FormFormManagementSearchData(FormFormManagementpagination["current_page"],"filter");
    })
});

$(document).ready(function(){
// window.onload = function(){
    var IdTable ="formFormDataTableBodyId";
    var checker = $("#" +IdTable );
    if (checker.length > 0){
        if($('#'+IdTable).is(":visible")){
            FormFormManagementGetListFormApi(FormFormManagementpagination["current_page"]);
        }
    }
});
// }
// document.getElementById("assetToFormFormManagementCreateModalsFormId").onload = function() {getListFormStart()};

$(document).ready(function(){
// function getListFormStart(){
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
                        $("#addAssetByFormFormManagementCreateModalInput").append(event_data);
                    }
                },
                error:function (xhr, ajaxOptions, thrownError) {
                    console.log(xhr.status);
                    console.log(thrownError);
                }
        });
    });
// }

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
                            event_data += `<li><a class="dropdown-item" onclick="createFormFormManagement('` + uuid_type_form + `', '` + name_type_form + `')" value='` + uuid_type_form + `'>` + name_type_form + `</a></li>`;
                          
                        }
                        $("#createFormdropdownMenuButton").append(event_data);
                        $("#typeFormFormManagementCreateModalInput").append(event_data);
                        $("#typeformFormManagementFilterSearchInputId").append(typeForm);


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
                url: Staff_Temp_URL,
                type: 'GET',
                async: false,
                cache: false,
                timeout: 30000,
                success: function(data){
                    if (data.hasOwnProperty('results')){
                        for (var j=0; j < data.results.length; j++){
                            var uuid_staff = data.results[j].uuid;
                            var name_staff = data.results[j].name;
                            event_data += '<option value="' + uuid_staff + '">' + name_staff + '</option>'
                          
                        }
                        $("#staffRevFormFormManagementCreateModalInput").append(event_data);
                        $("#staffRecFormFormManagementCreateModalInput").append(event_data);
                        $("#staffRecoveryFormFormManagementEditModal").append(event_data);
                        $("#staffRevFormFormManagementEditModal").append(event_data);
                        $("#deliveredFormFormManagementCreateModalInput").append(event_data);
                        $("#receivedFormFormManagementCreateModalInput").append(event_data);
                        $("#deliveredFormFormManagementEditModal").append(event_data);
                        $("#receivedFormFormManagementEditModal").append(event_data);
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
                url: SupplierCategory_API_Short_URL_Form,
                type: 'GET',
                async: false,
                cache: false,
                timeout: 30000,
                success: function(data){
                    if (data.hasOwnProperty('results')){
                        for (var j=0; j < data.results.length; j++){
                            var uuid_staff = data.results[j].uuid;
                            var name_staff = data.results[j].name;
                            event_data += '<option value="' + uuid_staff + '">' + name_staff + '</option>'
                          
                        }
                        $("#supplierFormFormManagementCreateModalInput").append(event_data);
                        $("#supplierFormFormManagementEditModal").append(event_data);

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
                url: WareHouseCategory_API_Short_URL_Form,
                type: 'GET',
                async: false,
                cache: false,
                timeout: 30000,
                success: function(data){
                    if (data.hasOwnProperty('results')){
                        for (var j=0; j < data.results.length; j++){
                            var uuid_staff = data.results[j].uuid;
                            var name_staff = data.results[j].name;
                            event_data += '<option value="' + uuid_staff + '">' + name_staff + '</option>'
                          
                        }
                        $("#warehouseFormFormManagementCreateModalInput").append(event_data);
                        $("#warehouseFormFormManagementEditModal").append(event_data);

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
                url: Unit_URL,
                type: 'GET',
                async: false,
                cache: false,
                timeout: 30000,
                success: function(data){
                    if (data.hasOwnProperty('results')){
                        for (var j=0; j < data.results.length; j++){
                            var uuid_unit = data.results[j].uuid;
                            var name_unit = data.results[j].name;
                            var company_unit = data.results[j].get_name_company;
                            event_data += `<option value="` + uuid_unit + `">` + name_unit + `/` + company_unit + `</option>`;
                          
                        }
                        $("#xxlendingUnitFormFormManagementEditModal").append(event_data);
                        $("#brrowingUnitFormFormManagementEditModal").append(event_data);
                        $("#lendingUnitFormFormManagementCreateModalInput").append(event_data);
                        $("#brrowingUnitFormFormManagementCreateModalInput").append(event_data);

                    }
                },
                error:function (xhr, ajaxOptions, thrownError) {
                    console.log(xhr.status);
                    console.log(thrownError);
                }
        });
});

function FormRefreshCreateModal() {
    $('#formFormManagementCreatemodalsId')
        .find("input[type=text],input[type=number],textarea,select")
        .val('').removeClass("is-invalid").removeClass("is-valid")
        .end()
        .find("input[data-datepicker]").val('').removeClass("is-invalid").removeClass("is-valid")
        .end()
        .find("input[type=checkbox], input[type=radio]").removeClass("is-invalid").removeClass("is-valid")
        .prop("checked", false)
        .end();
};

function AddAssetRefreshCreateModal() {
    $('#addAssetToFormmodalsId')
        .find("input[type=text],input[type=number],textarea,select")
        .val('').removeClass("is-invalid").removeClass("is-valid")
        .end()
        .find("input[data-datepicker]").val('').removeClass("is-invalid").removeClass("is-valid")
        .end()
        .find("input[type=checkbox], input[type=radio]").removeClass("is-invalid").removeClass("is-valid")
        .prop("checked", false)
        .end();
};

function AddAssetRefreshTableExcel() {
    $('#formFormDataExportTableId')
        .find("input[type=text],input[type=number],textarea,select")
        .val('').removeClass("is-invalid").removeClass("is-valid")
        .end()
        .find("input[data-datepicker]").val('').removeClass("is-invalid").removeClass("is-valid")
        .end()
        .find("input[type=checkbox], input[type=radio]").removeClass("is-invalid").removeClass("is-valid")
        .prop("checked", false)
        .end();
};

// =============VIEW ASSET LIST BY FORM =====================//

class AssetListByFormFormManagement{
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
            if (data.hasOwnProperty('get_code_asset_warehouse')) {
                this.get_code_asset_warehouse = data.get_code_asset_warehouse
            } 
            else {
                this.get_code_asset_warehouse = null
            }
            

        }
    }

    getAssetListByFormFormApi(uuid=null, page=null, search_data=null) {

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
        
        var has_go_page="";

        if(page!=null){
            has_go_page="&page="+page;
        }
        this.callAjax = $.ajax({
            // url: AssetListByForm_URL + has_go_page,
                url: AssetByFormGetFILTER_URL + uuid + has_go_page,
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
                            var tmp = new AssetListByFormFormManagement(data.results[j]);
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

    GetAssetListForFieldByFormForm(uuid=null, tableId=null, order=null, action=null){
        var tbId = "assetListFormByFormDataTableId";
        var numTypeModal = ""; 
        if (tableId != null) {
            tbId = tableId;
            if (tbId == "assetListByFormTableIdInUpdate") {
                numTypeModal = "AddAsset";
            } else if (tbId == "assetListByFormTableIdInUpdate") {
                numTypeModal = "Update";
            }
        }

        if(order==null){
            order= ASSET_FORM_ID_TABLE_COUNT;
            }
        var seTbId = $("#" + tbId);

        if(seTbId.length > 0 && this.code_form==uuid) {
            var html = "<tr>";
            html += `<td style="width: 50px;">
                        <div class="text-center align-items-center stt">
                            <h6 class="text-sm mb-0">`+ order +`</h6>
                        </div>
                    </td>`;
            var tableHeaders = seTbId.find('thead th');
            var tableBody = seTbId.find('tbody');
            for (var thId = 1; thId < tableHeaders.length; thId++) {
                var hEle = tableHeaders[thId];
                var attr = hEle.getAttribute('attr-name');
                if (this.hasOwnProperty(attr)) {
                    if(attr=="asset"){   
                        html += `
                            <td class="w-30">
                                <div class="d-flex px-2 py-1 align-items-center">
                                    <div class="ms-4">
                                        <h6 class="text-sm mb-0">` + this['get_name_asset'] + `</h6>
                                    </div>
                                </div>
                            </td>`;
                        continue;
                    }

                    if(attr=="get_code_asset_warehouse"){
                        html +=`<td>
                                    <div class="text-center align-items-center">
                                        <h6 class="text-sm mb-0">`+ (this['get_code_asset_warehouse']) +`</h6>
                                    </div>
                                </td>`;
                        continue;
                    }
                    
                    if(attr=="current_status_asset"){
                        html +=`<td>
                                    <div class="text-center align-items-center">
                                        <h6 class="text-sm mb-0"><span class="badge badge-sm bg-gradient-success">`+ (this['current_status_asset']) +`</span></h6>
                                    </div>
                                </td>`;
                        continue;
                    }
                    
                    html +=`<td class="text-wrap"><a>` + (this[attr]) + `</a></td>`;
                
                }
                else {
                    if(attr=="del_asset") {
                        var uuid_ = this["uuid"];
                        html += 
                            `<td>
                                <div class="text-center align-items-center">
                                    <a class="btn btn-link text-danger text-gradient px-3 mb-0"  onclick="DeleteAssetByForm('` + uuid_ + `', '` + uuid + `', '` + numTypeModal + `')">
                                        <i class="far fa-trash-alt me-2" aria-hidden="true"></i>
                                    Delete
                                    </a>
                                </div>
                            </td>`;
                        
                        continue;
                    }
                }
            }
            html+='</tr>';
            // STT += 1;
            tableBody.append(html);
            return true;
        }
        else{
            console.log('Not found dataTable Id: ,', tbId);
            return false;
        }
        
    }

    CheckAssetInListByForm(uuid_form=null, uuid_asset=null){
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
        
        // var has_go_page="";

        // if(page!=null){
        //     has_go_page="&page="+page;
        // }

        var slugSearch = "?code_form=" + uuid_form + "&asset=" + uuid_asset;
        // slugSearch += 
        this.callAjax = $.ajax({
            // url: AssetListByForm_URL + has_go_page,
                url: AssetListSimpleByForm_URL + slugSearch,
                type: 'GET',
                async: false,
                cache: false,
                timeout: 30000,
                success: function(data){
                    if (data.hasOwnProperty('results')){
                        for (var j=0; j < data.results.length; j++){
                            var tmp = new AssetListByFormFormManagement(data.results[j]);
                            results.push(tmp);
                        }
                    }
                },
                error:function (xhr, ajaxOptions, thrownError) {
                    console.log(xhr.status);
                    console.log(thrownError);
                }
        });
        return results;
        
    }

    AddAssetToFormApi(uuid_form=null, formId=null){
        $.ajaxSetup({
            headers : {
                'CSRFToken' : getCSRFTokenValue(),
                'X-CSRFToken' : getCSRFTokenValue(), // for --> SessionAuthentication
            },
            tryCount : 0,
            retryLimit : 3,
        });
        $('#formAssetListToFormCreateModalInput').val(uuid_form);

        $('#uuidAssetToFormFormManagementCreateModalInputId').val(uuidv4());

        $('#nameAsFormFormManagementCreateModalInput').val(generateCode());

        var self = this;
        var formData;
        var form ;
        var arr_table = [];
        if(formId==null){
            formData = new FormData($('#assetToFormFormManagementCreateModalsFormId')[0]);
        }
        else{
            form = $('#' + formId);
            if (form.length > 0) {
                form.find("table").each(function() {
                    console.log("table in form" + $(this));
                    obj1 = $(this);
                    arr_table.push(obj1);
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
        var uuid_asset_in_form = $("#addAssetByFormFormManagementCreateModalInput").val();
        var obj1 = new AssetListByFormFormManagement();
        var a = obj1.CheckAssetInListByForm(uuid_form, uuid_asset_in_form);
        // console.log("jdhvs :" + a);
        // alert(a.length);
        if (a.length != 0) {
            toastr.warning("Tài sản đã tồn tại trong phiếu!!!")
            // alert("agvnbla;kbm f");
            return 0;
        }  else {
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
                    // self = new AssetListByFormFormManagement(data);
                    // LoadAccountAccountList();
                    // AssetListByFormFormManagementApi(uuid_form, AssetListFormManagementpagination["current_page"]);
                    // AddAssetRefreshCreateModal();
                    toastr.success("Đã thêm tài sản vào phiếu! Bạn có thể tiếp tục thêm tài sản");
                    GetAssetListByFormInAddAssetForm(uuid_form);
                    // $('.modal').modal('hide');
    
    
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
    // return self;
    }
}

function DeleteAssetByForm(uuid, get_uuid_form=null, numTypeModal=null){
    if (confirm("Bạn có muốn xóa tài sản này không?") == true){
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
            $.ajax({
                url: AssetListByForm_URL + uuid_go + "/",
                // url: AssetListSimpleByForm_URL + uuid_go + "/",
                type: "DELETE",
                async: false,
                cache: false,
                timeout: 30000,
    
                success: function (data) {
                    // GetAssetListByFormInUpdateForm($("#uuidFormFormManagementEditModal").val());
                    if (numTypeModal == "AddAsset") {
                        GetAssetListByFormInAddAssetForm(get_uuid_form);
                    }else if (numTypeModal == "Update"){
                        GetAssetListByFormInUpdateForm(get_uuid_form);
                    }
                    // AssetListByFormFormManagementApi(uuid, AssetListFormManagementpagination["current_page"], null,"assetListByFormTableIdInUpdate");
                    if(confirm)
                    toastr.success('Xóa thành công');

                    
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    console.log(xhr.status);
                    console.log(thrownError);
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
    
}

var AssetListFormManagementpagination={
    current_page:1,
    total:2,
    has_next:true,
    has_prev:true
}

// stt cộng thêm bao nhiêu
var AssetListFormManagementrecord_in_page = PAGE_SIZE_ASSET;

// = setting = bên trên
var AssetByFormrecord_in_page = PAGE_SIZE_ASSET;


function GetAssetListByFormFromForm(uuid=null){
    var IdTable ="assetListByFormTableBodyId";
    var checker = $("#" +IdTable );
    if (checker.length > 0 ){
        AssetListByFormFormManagementApi(uuid, AssetListFormManagementpagination["current_page"]);
    }
}

function GetAssetListByFormInUpdateForm(uuid=null){
    var IdTable ="assetListByFormTableBodyIdInUpdate";
    var checker = $("#" +IdTable );
    if (checker.length > 0 ){
        AssetListByFormFormManagementApi(uuid, AssetListFormManagementpagination["current_page"], null,"assetListByFormTableIdInUpdate");
    }
}

function GetAssetListByFormInAddAssetForm(uuid=null){
    var IdTable ="assetListByFormTableBodyIdInUpdate";
    var checker = $("#" +IdTable );
    if (checker.length > 0 ){
        // alert(uuid);
        AssetListByFormFormManagementApi(uuid, AssetListFormManagementpagination["current_page"], null,"assetListByFormTableIdInUpdate");
    }
}

function AssetListByFormFormManagementApi(uuid=null, page=null, search_data=null, tableID=null) {

    var object = new AssetListByFormFormManagement()
    var resultsA = object.getAssetListByFormFormApi(uuid, page, search_data);


    object.callAjax.then(function(data) {
        $("#assetListByFormTableBodyId").empty();
        $("#assetListByFormTableBodyIdInUpdate").empty();
        $("#assetListByFormTableBodyIdInUpdate").empty();
        ASSET_FORM_ID_TABLE_COUNT = 1;
        var crr_record_in_page = AssetListFormManagementrecord_in_page;
        // STT = 0;
        if(page>1){
            ASSET_FORM_ID_TABLE_COUNT =1+crr_record_in_page*page-crr_record_in_page
        }
        for (var i = 0; i < resultsA.length; i++){

            try{
                console.log('resultsA[i] = ', resultsA[i]);
                resultsA[i].GetAssetListForFieldByFormForm(uuid, tableID);
                ASSET_FORM_ID_TABLE_COUNT++;
            }
            catch(err){
                console.log(err);
            }
        }
        var pagenation_ele=$(".pagination-AssetListByFormManagement");
        var pagination=AssetListFormManagementpagination;
        pagenation_ele.html('');
        var page_total_ele = $(".page-total-AssetListByFormManagement");
        page_total_ele.html(`<footer class="blockquote-footer">Tổng số: ${pagination["total"]} bản ghi </footer>`);
        if (resultsA.length > 0) {

            // if (resultsA.length <= pagination["total"]) {
            //     var myDiv = document.getElementById("pageA");
            //     myDiv.classList.add("d-none");
            // }
            pagenation_ele.append(`<li class="page-item" id="pageA"><a class="page-link" onclick="AssetListByFormFormManagementApi('`+ uuid +`', 1, null , '`+ tableID +`')"><i class="fa fa-angle-double-left"></a></li>`);
            if (pagination["has_prev"] == true) {
                pagenation_ele.append(`<li class="page-item" id="pageA"><a class="page-link" onclick="AssetListByFormFormManagementApi('`+ uuid +`', ` + (parseInt(pagination["current_page"]) - 1) + `,null , '`+ tableID +`')">` + (parseInt(pagination["current_page"]) - 1) + `</a></li>`);
            }

            pagenation_ele.append('<li class="page-item active" id="pageA"><a class="page-link" >' + (parseInt(pagination["current_page"])) + '</a></li>');
            if (pagination["has_next"] == true) {
                pagenation_ele.append(`<li class="page-item" id="pageA"><a class="page-link" onclick="AssetListByFormFormManagementApi('`+ uuid +`', ` + (parseInt(pagination["current_page"]) + 1) + `,null , '`+ tableID +`')">` + (parseInt(pagination["current_page"]) + 1) + `</a></li>`);
            }

            if(pagination["total"]>0) {
                var last_page_order = 0 
                if((pagination["total"] % AssetByFormrecord_in_page) != 0) {
                    last_page_order = Math.floor(pagination["total"]/AssetByFormrecord_in_page) + 1;
                }
                else {
                    last_page_order = (pagination["total"]/AssetByFormrecord_in_page);
                }
                pagenation_ele.append(`<li class="page-item"  id="pageA"><a class="page-link" onclick="AssetListByFormFormManagementApi('`+ uuid +`', `+last_page_order+`,null , '`+ tableID +`')"><i class="fa fa-angle-double-right"></a></li>`);
            }
        }
    })
}




class TypeFormClassesFormManagement{
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

    GetObjApiTypeFormClasses(uuid) {
        this.callAjax = null;
        var fields = [];

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

                if (data.hasOwnProperty('fields')){
                    for (var j=0; j < data.fields.length; j++){
                        var tmp = new TypeFormClassesFormManagement(data.fields[j]);
                        // console.log(data.fields[j])
                        fields.push(data.fields[j]);
                    }
                }
            }
        });
        return fields;

    }

    getTypeFormApi(page=null, search_data=null) {
        alert(uuid);

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
                            var tmp = new TypeFormClassesFormManagement(data.results[j]);
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

}

function GetDataTypeFormEdit(uuid=null) {
    var formId = "typeFormtEditModalsFormId";
    var modalId = 'typeFormEditmodalsId';
    $('#' + modalId).modal('toggle');
    var obj = new TypeFormClassesFormManagement();
    obj.GetObjApiTypeForm(uuid);
    obj.callAjax.then(function(data) {
        new TypeFormFormManagement(data).getTypeFormData(formId);
    })
}

function getgetget(uuid=null) {
    var object = new TypeFormClassesFormManagement()
    var fields = object.GetObjApiTypeFormClasses(uuid);
    return fields;
    // object.callAjax.then(function(data) {
    //     for (var i = 0; i < fields.length; i++){
    //         try{
    //             console.log('resultsssssss[i] = ', fields[i]);
    //         }
    //         catch(err){
    //             console.log(err);
    //         }
    //     }

        
    // })
}