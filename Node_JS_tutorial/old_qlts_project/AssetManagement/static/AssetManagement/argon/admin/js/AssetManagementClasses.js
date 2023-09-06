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

// Funtions convert money
function formatPrice(price) {
    let formatter = new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2 });
    let formattedNumber = formatter.format(price)
    return formattedNumber
}

// Function actuion CRUD
var AssetAsset_arr_action = [
    // default action
    {
        "title": "Xem chi tiết",
        "func": "AssetAssetDetails",
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
        "func": "AssetAssetEdit",
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
        "title": "Xem cấu hình",
        "func": "AssetAssetDetailsTemplate",
        "icon": "fas fa-search",
        "href": "#",
        "isCheck": false,
        "allowSelfChecking": true,
        "field_checking": "#",
        "value_is_true": "#",
        "views_name": "",
        "independent_views": true
    },

    {
        "title": "Thêm cấu hình",
        "func": "AssetAssetCreateTemplate",
        "icon": "far fa-plus-square",
        "href": "#",
        "isCheck": false,
        "allowSelfChecking": false,
        "field_checking": "is_sent",
        "value_is_true": "#",
        "views_name": "",
        "independent_views": true
    },

    {
        "title": "Khấu Hao",
        "func": "AssetDepreciationGetData",
        "icon": "fas fa-sliders-h",
        "href": "#",
        "isCheck": false,
        "allowSelfChecking": true,
        "field_checking": "#",
        "value_is_true": "#",
        "views_name": "",
        "independent_views": true
    },

    {
        "title": "Xóa",
        "func": "AssetAssetOnDeleteEvent",
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
function AssetAssetDetails(uuid) {
    $('#assetAssetDetailmodalsId').modal('toggle');
    var obj = new AssetAsset();
    obj.tGetObjApi(uuid);
    obj.callAjax.then(function (data) {
        new AssetAsset(data).tFillFormModal('Detail', 'assetAssetDetailModalsFormId');

    })
    //obj.tFillFormModal('Detail');
}

// Xem cấu hình chi tiết
function AssetAssetDetailsTemplate(uuid) {
    $('#AssetDetail1modalsId').modal('toggle');
    var obj = new AssetAsset();
    obj.tGetObjApi(uuid);
    obj.callAjax.then(function (data) {
        new AssetAsset(data).tFillFormModal('DetailDetail', 'AssetDetail1ModalsFormId');
    })
    obj.tFilterAllObjApi(uuid, AssetDetail_FILTER_URL)
    //obj.tFillFormModal('Detail');
}

// Config Create
// function AssetAssetCreateTemplate(uuid) {
//     $('#AssetDetailCreatemodalsId').modal('toggle');
//     var obj = new AssetAsset();
//     obj.tGetObjApi(uuid);
//     obj.callAjax.then(function (data) {
//         new AssetAsset(data).tFillFormModal('CreateDetail', 'AssetDetailCreateModalsFormId');
//         // obj.FilterCreateAllObjApi(data.results.asset_type, AssetDetailTemplate_API_URL, "?name__icontains=&asset_type=")
//     })

//     // obj.tFilterAllObjApi(uuid, AssetDetail_FILTER_URL)
//     //obj.tFillFormModal('Detail');
// }

function AssetAssetEdit(uuid) {
    $('#assetAssetEditmodalsId').modal('toggle');
    var obj = new AssetAsset();
    obj.tGetObjApi(uuid);
    obj.callAjax.then(function (data) {
        new AssetAsset(data).tFillFormModal('Edit', 'assetAssetEditModalsFormId');

    })
    //obj.tFillFormModal('Edit');
}

function AssetAssetOnDeleteEvent(uuid) {
    var search_data = null;
    try {
        search_data = AccountActionsSearchData;
    }
    catch (err) {
        search_data = null;
    }
    if (search_data == null) {

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
                    action: function () {
                        //noi dung xoa
                        var obj = new AssetAsset();
                        obj.tDeleteApi(uuid);
                    }
                },

            }
        });

    }
    else {
        AssetAssetOnDeleteWithDataSearchEvent(uuid);
    }

}

function AssetAssetOnDeleteWithDataSearchEvent(uuid) {
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
                action: function () {
                    //noi dung xoa
                    var obj = new AssetAsset();

                    obj.tDeleteApiWithDataSearch(uuid, AccountActionsSearchData);
                }
            },

        }
    });

}

function AssetAssetViewDetail(selectionId) {
    var select = $("#" + selectionId);
    if (select.length > 0) {
        var value = select.val()
        if (value == "" || value == null || value == undefined) {
            // toastr.warning('Vui lòng chọn giá trị');
            return;
        }
        else {
            $('#assetAssetDetailmodalsId').modal('toggle');
            var obj = new AssetAsset();
            obj.tGetObjApi(value);
            obj.callAjax.then(function (data) {
                new AssetAsset(data).tFillFormModal('Detail', 'assetAssetDetailModalsFormId');
            })
        }
    }
}

class AssetAsset {
    // ########## Init Objects ##############
    constructor(data = null) {
        if (data != null) {
            if (data.hasOwnProperty('uuid')) {
                this.uuid = data.uuid;
            }
            else {
                // this.code = null;
            }

            this.__app_name__ = "AssetManagement";

            this.__model_name__ = "Asset";

            // hasOwnProperty để check xem có đối tượng đó không
            if (data.hasOwnProperty('name')) {
                this.name = data.name;
            }
            else {
                this.name = null;
            }
            if (data.hasOwnProperty('code')) {
                this.code = data.code;
            }
            else {
                // this.code = null;
            }

            if (data.hasOwnProperty('uuid')) {
                this.uuid = data.uuid;
                this.editUrl = '/AssetManagement/Asset/edit/' + this.uuid + '/';
                this.detailUrl = '/AssetManagement/Asset/detail/' + this.uuid + '/';
            }
            else {
                // this.uuid = null;
            }

            if (data.hasOwnProperty('price_buy')) {
                this.price_buy = data.price_buy;
            }
            else {
                // this.price_buy = null;
            }

            if (data.hasOwnProperty('date_added')) {
                this.date_added = data.date_added;
            }
            else {
                // this.date_added = null;
            }

            if (data.hasOwnProperty('asset_type')) {
                this.asset_type = data.asset_type;
                this.name_asset_type = data.name_asset_type;
            }
            else {
                // this.asset_type = null;
            }

            if (data.hasOwnProperty('warehouse')) {
                this.warehouse = data.warehouse;
                this.name_warehouse = data.name_warehouse;
            }
            else {
                // this.warehouse = null;
            }

            if (data.hasOwnProperty('supplier')) {
                this.supplier = data.supplier;
                this.name_supplier = data.name_supplier;
            }
            else {
                // this.supplier = null;
            }

            if (data.hasOwnProperty('own_status')) {
                this.own_status = data.own_status;
                this.name_own_status = data.name_own_status;
            }
            else {
                // this.own_status = null;
            }

            if (data.hasOwnProperty('current_asset_user')) {
                this.current_asset_user = data.current_asset_user;
                this.name_current_asset_user = data.name_current_asset_user;
            }
            else {
                // this.own_status = null;
            }

            if (data.hasOwnProperty('asset_status')) {
                this.asset_status = data.asset_status;
                this.name_asset_status = data.name_asset_status;
            }
            else {
                // this.asset_status = null;
            }

            if (data.hasOwnProperty('unit')) {
                this.unit = data.unit;
                this.name_unit = data.name_unit;
            }
            else {
                // this.unit = null;
            }

            if (data.hasOwnProperty('currency_unit')) {
                this.currency_unit = data.currency_unit;
                this.name_currency_unit = data.name_currency_unit;
            }
            else {
                // this.unit = null;
            }

            if (data.hasOwnProperty('owned_company')) {
                this.owned_company = data.owned_company;
                this.name_owned_company = data.name_owned_company;
            }
            else {
                // this.owned_company = null;
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
            var chEle = formEle.find("#nameAssetAssetInputId"); //Kiêrm tra giá trị của form id name
            if (chEle.length > 0) {
                this.name = chEle.val();
            }
            else {
                // this.name = null;
            }
            var chEle = formEle.find("#uuidAssetAssetInputId");
            if (chEle.length > 0) {
                this.uuid = chEle.val();
            }
            else {
                // this.uuid = null;
            }
            var chEle = formEle.find("#codeAssetAssetInputId");
            if (chEle.length > 0) {
                this.code = chEle.val();
            }
            else {
                // this.code = null;
            }
            var chEle = formEle.find("#price_buyAssetAssetInputId");
            if (chEle.length > 0) {
                this.price_buy = chEle.val();
            }
            else {
                // this.price_buy = null;
            }
            var chEle = formEle.find("#date_addedAssetAssetInputId");
            if (chEle.length > 0) {
                this.date_added = chEle.val();
            }
            else {
                // this.date_added = null;
            }
            var chEle = formEle.find("#asset_typeAssetAssetInputId");
            if (chEle.length > 0) {
                this.asset_type = chEle.val();
            }
            else {
                // this.asset_type = null;
            }
            var chEle = formEle.find("#warehouseAssetAssetInputId");
            if (chEle.length > 0) {
                this.warehouse = chEle.val();
            }
            else {
                // this.warehouse = null;
            }
            var chEle = formEle.find("#supplierAssetAssetInputId");
            if (chEle.length > 0) {
                this.supplier = chEle.val();
            }
            else {
                // this.supplier = null;
            }
            var chEle = formEle.find("#own_statusAssetAssetInputId");
            if (chEle.length > 0) {
                this.own_status = chEle.val();
            }
            else {
                // this.own_status = null;
            }
            var chEle = formEle.find("#asset_statusAssetAssetInputId");
            if (chEle.length > 0) {
                this.asset_status = chEle.val();
            }
            else {
                // this.date_of_birth = null;
            }
            var chEle = formEle.find("#unitAssetAssetInputId");
            if (chEle.length > 0) {
                this.unit = chEle.val();
            }
            else {
                // this.unit = null;
            }
            var chEle = formEle.find("#owned_companyAssetAssetInputId");
            if (chEle.length > 0) {
                this.owned_company = chEle.val();
            }
            else {
                // this.owned_company = null;
            }
            var chEle = formEle.find("#created_atAssetAssetInputId");
            if (chEle.length > 0) {
                this.created_at = chEle.val();
            }
            else {
                // this.created_at = null;
            }
            var chEle = formEle.find("#updated_atAssetAssetInputId");
            if (chEle.length > 0) {
                this.updated_at = chEle.val();
            }
            else {
                // this.updated_at = null;
            }
            var chEle = formEle.find("#created_byAssetAssetInputId");
            if (chEle.length > 0) {
                this.created_by = chEle.val();
            }
            else {
                // this.created_by = null;
            }
            var chEle = formEle.find("#updated_byAssetAssetInputId");
            if (chEle.length > 0) {
                this.updated_by = chEle.val();
            }
            else {
                // this.updated_by = null;
            }
        }
        else {
            var chEle = $("#codeAssetAssetInputId");
            if (chEle.length > 0) {
                this.code = chEle.val();
            }
            else {
                // this.code = null;
            }
            var chEle = $("#nameAssetAssetInputId");
            if (chEle.length > 0) {
                this.name = chEle.val();
            }
            else {
                // this.name = null;
            }

            var chEle = $("#uuidAssetAssetInputId");
            if (chEle.length > 0) {
                this.uuid = chEle.val();
            }
            else {
                // this.uuid = null;
            }

            var chEle = $("#price_buyAssetAssetInputId");
            if (chEle.length > 0) {
                this.price_buy = chEle.val();
            }
            else {
                // this.price_buy = null;
            }

            var chEle = $("#date_addedAssetAssetInputId");
            if (chEle.length > 0) {
                this.date_added = chEle.val();
            }
            else {
                // this.date_added = null;
            }

            var chEle = $("#asset_typeAssetAssetInputId");
            if (chEle.length > 0) {
                this.asset_type = chEle.val();
            }
            else {
                // this.asset_type = null;
            }

            var chEle = $("#warehouseAssetAssetInputId");
            if (chEle.length > 0) {
                this.warehouse = chEle.val();
            }
            else {
                // this.warehouse = null;
            }

            var chEle = $("#supplierAssetAssetInputId");
            if (chEle.length > 0) {
                this.supplier = chEle.val();
            }
            else {
                // this.supplier = null;
            }

            var chEle = $("#own_statusAssetAssetInputId");
            if (chEle.length > 0) {
                this.own_status = chEle.val();
            }
            else {
                // this.own_status = null;
            }

            var chEle = $("#asset_statusAssetAssetInputId");
            if (chEle.length > 0) {
                this.asset_status = chEle.val();
            }
            else {
                // this.asset_status = null;
            }

            var chEle = $("#unitAssetAssetInputId");
            if (chEle.length > 0) {
                var date = moment(chEle.val(), 'DD/MM/YYYY');
                this.unit = toDatePython(new Date(date))
            }
            else {
                // this.unit = null;
            }

            var chEle = $("#owned_companyAssetAssetInputId");
            if (chEle.length > 0) {
                this.owned_company = chEle.val();
            }
            else {
                // this.owned_company = null;
            }

            var chEle = $("#created_atAssetAssetInputId");
            if (chEle.length > 0) {
                this.created_at = chEle.val();
            }
            else {
                // this.created_at = null;
            }

            var chEle = $("#updated_atAssetAssetInputId");
            if (chEle.length > 0) {
                this.updated_at = chEle.val();
            }
            else {
                // this.updated_at = null;
            }

            var chEle = $("#created_byAssetAssetInputId");
            if (chEle.length > 0) {
                this.created_by = chEle.val();
            }
            else {
                // this.created_by = null;
            }

            var chEle = $("#updated_byAssetAssetInputId");
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
            var j_ele_name = $("#nameAssetAssetInputId");
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
            var j_ele_uuid = $("#uuidAssetassetInputId");
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
            var j_ele_tndid = $("#codeAssetAssetInputId");
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
            var j_ele_asset_type = $("#asset_typeAssetAssetInputId");
            if (j_ele_asset_type.length > 0) {
                if (j_ele_asset_type.attr('name') != 'uuid') {
                    j_ele_asset_type.val(self.asset_type).change();
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
            var j_ele_price_buy = $("#price_buyInputId");
            if (j_ele_price_buy.length > 0) {
                if (j_ele_price_buy.attr('name') != 'uuid') {
                    j_ele_price_buy.val(self.price_buy).change();
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
            var j_ele_updated_at = $("#updated_atAssetAssetInputId");
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
            var j_ele_created_at = $("#created_atAssetAssetInputId");
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
    tFillFormModal(modals_type, formId = null) {
        var apart = modals_type + "Modal";
        var self = this;
        try {
            var j_ele_name = $("#nameAssetAsset" + apart + "InputId");
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
            var j_ele_code = $("#dcodeAssetAsset" + apart + "InputId");
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
            var j_ele_uuid = $("#uuidAssetAsset" + apart + "InputId");
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

        //fill modal edit
        try {
            var j_ele_asset_type = $("#asset_typeAssetAsset" + apart + "InputId");
            if (j_ele_asset_type.length > 0) {
                if (j_ele_asset_type.attr('name') != 'uuid') {
                    j_ele_asset_type.val(self.asset_type).change();
                }
            }
            else {
                // j_ele_nick_name.val(null);
            }
        }
        catch (err) {
            console.log('err = ', err);
        }

        // fill modal detail`
        try {
            var j_ele_asset_type = $("#name_asset_typeAssetAsset" + apart + "InputId");
            if (j_ele_asset_type.length > 0) {
                if (j_ele_asset_type.attr('name') != 'uuid') {
                    j_ele_asset_type.val(self.name_asset_type).change();
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
            var j_ele_current_asset_user = $("#current_asset_userAssetAsset" + apart + "InputId");
            if (j_ele_current_asset_user.length > 0) {
                if (j_ele_current_asset_user.attr('name') != 'uuid') {
                    j_ele_current_asset_user.val(self.current_asset_user).change();
                }
            }
            else {
                // j_ele_nick_name.val(null);
            }
        }
        catch (err) {
            console.log('err = ', err);
        }

        // fill modal detail`
        try {
            var j_ele_current_asset_user = $("#name_current_asset_userAssetAsset" + apart + "InputId");
            if (j_ele_current_asset_user.length > 0) {
                if (j_ele_current_asset_user.attr('name') != 'uuid') {
                    j_ele_current_asset_user.val(self.name_current_asset_user).change();
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
            var j_ele_asset_type = $("#asset_typeAssetAsset" + apart + "InputId");
            if (j_ele_asset_type.length > 0) {
                if (j_ele_asset_type.attr('name') != 'uuid') {
                    j_ele_asset_type.val(self.asset_type).change();
                }
            }
            else {
                // j_ele_nick_name.val(null);
            }
        }
        catch (err) {
            console.log('err = ', err);
        }

        // fill modal detail`
        try {
            var j_ele_asset_type = $("#name_asset_typeAssetAsset" + apart + "InputId");
            if (j_ele_asset_type.length > 0) {
                if (j_ele_asset_type.attr('name') != 'uuid') {
                    j_ele_asset_type.val(self.name_asset_type).change();
                }
            }
            else {
                // j_ele_nick_name.val(null);
            }
        }
        catch (err) {
            console.log('err = ', err);
        }

        // fill modal edit
        try {
            var j_ele_own_status = $("#own_statusAssetAsset" + apart + "InputId");
            if (j_ele_own_status.length > 0) {
                if (j_ele_own_status.attr('name') != 'uuid') {
                    j_ele_own_status.val(self.own_status).change();
                }
            }
            else {
                // j_ele_username.val(null);
            }
        }
        catch (err) {
            console.log('err = ', err);
        }
        // fill modal detail
        try {
            var j_ele_own_status = $("#name_own_statusAssetAsset" + apart + "InputId");
            if (j_ele_own_status.length > 0) {
                if (j_ele_own_status.attr('name') != 'uuid') {
                    j_ele_own_status.val(self.name_own_status).change();
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
            var j_ele_price_buy = $("#price_buyAssetAsset" + apart + "InputId");
            if (j_ele_price_buy.length > 0) {
                if (j_ele_price_buy.attr('name') != 'uuid') {
                    if (apart == "DetailModal") {
                        var price = formatPrice(self.price_buy) + " " + self.name_currency_unit;
                        j_ele_price_buy.val(price).change();
                    }
                    else {
                        j_ele_price_buy.val(self.price_buy).change();
                    };

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
            var j_ele_date_added = $("#date_addedAssetAsset" + apart + "InputId");
            if (j_ele_date_added.length > 0) {
                var dateObj = new Date(Date.parse(self.date_added));
                if (dateObj != "Invalid Date") {
                    var newdate = moment(dateObj).format('DD/MM/YYYY');
                    j_ele_date_added.val(newdate).change();
                }
            }
            else {
                // j_ele_date_added.val(null);
            }
        }
        catch (err) {
            console.log('err = ', err);
        }

        //fill modail edit
        try {
            var j_ele_warehouse = $("#warehouseAssetAsset" + apart + "InputId");
            if (j_ele_warehouse.length > 0) {
                if (j_ele_warehouse.attr('name') != 'uuid') {
                    j_ele_warehouse.val(self.warehouse).change();
                }
            }
            else {
                // j_ele_groups.val(null);
            }
        }
        catch (err) {
            console.log('err = ', err);
        }
        // fill modal detail
        try {
            var j_ele_warehouse = $("#name_warehouseAssetAsset" + apart + "InputId");
            if (j_ele_warehouse.length > 0) {
                if (j_ele_warehouse.attr('name') != 'uuid') {
                    j_ele_warehouse.val(self.name_warehouse).change();
                }
            }
            else {
                // j_ele_groups.val(null);
            }
        }
        catch (err) {
            console.log('err = ', err);
        }

        // fill modal edit
        try {
            var j_ele_supplier = $("#supplierAssetAsset" + apart + "InputId");
            if (j_ele_supplier.length > 0) {
                if (j_ele_supplier.attr('name') != 'uuid') {
                    j_ele_supplier.val(self.supplier).change();
                }
            }
            else {
                // j_ele_user_permissions.val(null);
            }
        }
        catch (err) {
            console.log('err = ', err);
        }
        // fill modal detail
        try {
            var j_ele_supplier = $("#name_supplierAssetAsset" + apart + "InputId");
            if (j_ele_supplier.length > 0) {
                if (j_ele_supplier.attr('name') != 'uuid') {
                    j_ele_supplier.val(self.name_supplier).change();
                }
            }
            else {
                // j_ele_user_permissions.val(null);
            }
        }
        catch (err) {
            console.log('err = ', err);
        }

        //fill modal edit
        try {
            var j_ele_asset_status = $("#asset_statusAssetAsset" + apart + "InputId");
            if (j_ele_asset_status.length > 0) {
                if (j_ele_asset_status.attr('name') != 'uuid') {
                    j_ele_asset_status.val(self.asset_status).change();
                }
            }
            else {
                // j_ele_age.val(null);
            }
        }
        catch (err) {
            console.log('err = ', err);
        }
        //fill modal detail
        try {
            var j_ele_asset_status = $("#name_asset_statusAssetAsset" + apart + "InputId");
            if (j_ele_asset_status.length > 0) {
                if (j_ele_asset_status.attr('name') != 'uuid') {
                    j_ele_asset_status.val(self.name_asset_status).change();
                }
            }
            else {
                // j_ele_age.val(null);
            }
        }
        catch (err) {
            console.log('err = ', err);
        }

        // fill modal edit
        try {
            var j_ele_unit = $("#unitAssetAsset" + apart + "InputId");
            if (j_ele_unit.length > 0) {
                if (j_ele_unit.attr('name') != 'uuid') {
                    j_ele_unit.val(self.unit).change();
                }
            }
            else {
                // j_ele_telephone.val(null);
            }
        }
        catch (err) {
            console.log('err = ', err);
        }
        //fill modal detail
        try {
            var j_ele_unit = $("#name_unitAssetAsset" + apart + "InputId");
            if (j_ele_unit.length > 0) {
                if (j_ele_unit.attr('name') != 'uuid') {
                    j_ele_unit.val(self.name_unit).change();
                }
            }
            else {
                // j_ele_telephone.val(null);
            }
        }
        catch (err) {
            console.log('err = ', err);
        }

        // fill modal edit
        try {
            var j_ele_currency_unit = $("#currency_unitAssetAsset" + apart + "InputId");
            if (j_ele_currency_unit.length > 0) {
                if (j_ele_currency_unit.attr('name') != 'uuid') {
                    j_ele_currency_unit.val(self.currency_unit).change();
                }
            }
            else {
                // j_ele_telephone.val(null);
            }
        }
        catch (err) {
            console.log('err = ', err);
        }

        // fill modal edit
        try {
            var j_ele_owned_company = $("#owned_companyAssetAsset" + apart + "InputId");
            if (j_ele_owned_company.length > 0) {
                if (j_ele_owned_company.attr('name') != 'uuid') {
                    j_ele_owned_company.val(self.owned_company).change();
                }
            }
            else {
                // j_ele_onetime_passwd.val(null);
            }
        }
        catch (err) {
            console.log('err = ', err);
        }
        // fill modal detail
        try {
            var j_ele_owned_company = $("#name_owned_companyAssetAsset" + apart + "InputId");
            if (j_ele_owned_company.length > 0) {
                if (j_ele_owned_company.attr('name') != 'uuid') {
                    j_ele_owned_company.val(self.name_owned_company).change();
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
            var j_ele_updated_at = $("#updated_atAssetAsset" + apart + "InputId");
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
            var j_ele_created_at = $("#created_atAssetAsset" + apart + "InputId");
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
            var j_ele_name = $("#nameAssetAsset" + apart + "InputId");
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
            var j_ele_uuid = $("#uuidAssetAsset" + apart + "InputId");
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
            var j_ele_tndid = $("#tndidAssetAsset" + apart + "InputId");
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
            var j_ele_nick_name = $("#nick_nameAssetAsset" + apart + "InputId");
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
            var j_ele_username = $("#usernameAssetAsset" + apart + "InputId");
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
            var j_ele_full_name = $("#full_nameAssetAsset" + apart + "InputId");
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
            var j_ele_email = $("#emailAssetAsset" + apart + "InputId");
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
            var j_ele_groups = $("#groupsGroupAssetAsset" + apart + "InputId");
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
            var j_ele_user_permissions = $("#user_permissionsPermissionAssetAsset" + apart + "InputId");
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
            var j_ele_date_of_birth = $("#date_of_birthAssetAsset" + apart + "InputId");
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
            var j_ele_age = $("#ageAssetAsset" + apart + "InputId");
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
            var j_ele_telephone = $("#telephoneAssetAsset" + apart + "InputId");
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
            var j_ele_salt = $("#saltAssetAsset" + apart + "InputId");
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
            var j_ele_onetime_passwd = $("#onetime_passwdAssetAsset" + apart + "InputId");
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
            var j_ele_avatar = $("#avatarAssetAsset" + apart + "FileAreaId");
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
                                          <i class="fas fa-times" style="color:gray" file-uuid="` + self.uuid + `" id="` + self.uuid + `btnDeleteId" onclick="avatarAssetAssetDeletedAttacthment(this)"></i>
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
            var j_ele_is_callbot = $("#is_callbotAssetAsset" + apart + "InputId");
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
            var j_ele_callbot_endpoint = $("#callbot_endpointAssetAsset" + apart + "InputId");
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
            var j_ele_is_chatbot = $("#is_chatbotAssetAsset" + apart + "InputId");
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
            var j_ele_chatbot_endpoint = $("#chatbot_endpointAssetAsset" + apart + "InputId");
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
            var j_ele_manager = $("#managerAssetAssetAccount" + apart + "InputId");
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
            var j_ele_log_confirm_by_email = $("#log_confirm_by_emailAssetAsset" + apart + "InputId");
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
            var j_ele_logged_with_password = $("#logged_with_passwordAssetAsset" + apart + "InputId");
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
            var j_ele_created_free_license = $("#created_free_licenseAssetAsset" + apart + "InputId");
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
            var j_ele_email_activated = $("#email_activatedAssetAsset" + apart + "InputId");
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
            var j_ele_website_template = $("#website_templateWebsiteTemplateAssetAsset" + apart + "InputId");
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
            var j_ele_language = $("#languageAssetAsset" + apart + "InputId");
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
            var j_ele_timezone = $("#timezoneAssetAsset" + apart + "InputId");
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
            var j_ele_app_permissions = $("#app_permissionsAppPermissionAssetAsset" + apart + "InputId");
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
            var j_ele_signup_at = $("#signup_atAssetAsset" + apart + "InputId");
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
            var j_ele_last_login_at = $("#last_login_atAssetAsset" + apart + "InputId");
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
            var j_ele_extend_field = $("#extend_fieldExtendInfoAssetAsset" + apart + "InputId");
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
            var j_ele_password = $("#passwordAssetAsset" + apart + "InputId");
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
            var j_ele_updated_at = $("#updated_atAssetAsset" + apart + "InputId");
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
            var j_ele_created_at = $("#created_atAssetAsset" + apart + "InputId");
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
            url: Asset_API_URL,
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
                self = new AssetAsset(data);
                AssetAssetGetDataTable(AssetAssetpagination["current_page"]);
                if (is_continue_form) {
                    is_continue_form = false;
                    toastr.success('Thêm mới thành công');
                    $(location).prop('href', "/AssetManagement/Asset/create/");


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
            formData = new FormData($('#assetAssetCreateFormId')[0]);

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
                //     console.log(key, value);
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
        if (formData.get('uuid') == null || formData.get('uuid') == '' || formData.get('uuid') == null) {
            return;
        } else {
            this.uuid = formData.get('uuid');
        }

        var idForm = formData.get('uuid')
        // check unique
        var dcode = formData.get('dcode')
        // alert(dcode)
        CheckUnique(dcode)
        $.ajax({
            url: Asset_API_URL + idForm + "/",
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
                self = new AssetAsset(data);
                toastr.success('Cập nhật tài sản thành công');
                AssetAssetGetDataTable(AssetAssetpagination["current_page"]);
                //$(location).prop('href', "/Account/Account/detail/" + self.uuid + "/");
                $('.modal').modal('hide');
                // self.tFillForm();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                toastr.warning('Mã tài sản đã tồn tại');
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
            formData = new FormData($('#assetAssetCreateFormId')[0]);

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
        // if (formData.get('uuid') == null || formData.get('uuid') == '' || formData.get('uuid') == null) {
        //   return;
        // } else {
        //   this.uuid = formData.get('uuid');
        // }


        // var idForm = formData.get('uuid')
        // alert('hello')
        // console.log(idForm)
        var dcode = formData.get('code')
        CheckUnique(dcode)
        $.ajax({
            url: Asset_API_URL,
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
                postAssetDetail(data.uuid, "AssetTemplateConfigTbbody")
                PostDepreciation(data.uuid)
                self = new AssetAsset(data);
                AssetAssetGetDataTable(AssetAssetpagination["current_page"]);
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
            url: AssetAsset_URL + uuid + "/",
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
            url: Asset_API_URL + uuid_go + "/",
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
                AssetAssetGetDataTable(AssetAssetpagination["current_page"]);
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
            url: AssetAsset_URL + uuid + "/",
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
                // url: Asset_API_URL + has_go_page,
                url: Asset_API_URL + has_go_page,
                type: "GET",
                //async: false,
                cache: false,
                timeout: 30000,

                success: function (data) {
                    console.log('[tGetAllObjApi] data = ', data);
                    // return new AssetAsset(data);
                    if (data.hasOwnProperty('count')) {
                        AssetAssetpagination["total"] = data.count;
                    }
                    if (data.hasOwnProperty('count')) {
                        AssetAssetpagination["total"] = data.count;
                    }
                    if (data.hasOwnProperty('next')) {
                        if (data.next != null) {
                            AssetAssetpagination["has_next"] = true;
                        } else {
                            AssetAssetpagination["has_next"] = false;

                        }
                    }
                    AssetAssetpagination["current_page"] = page;
                    if (data.hasOwnProperty('previous')) {
                        if (data.previous != null) {
                            AssetAssetpagination["has_prev"] = true;
                        } else {
                            AssetAssetpagination["has_prev"] = false;
                        }
                    }
                    if (data.hasOwnProperty('results')) {
                        for (var j = 0; j < data.results.length; j++) {
                            var tmp = new AssetAsset(data.results[j]);
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
            SEARCH_URL = Asset_API_URL;

            slugSearch = "&";
            if ($("#nameAssetFilterSearchInputId").length > 0
                || $("#AssetTypeFilterSearchInputId").length > 0
                || $("#CompanyFilterSearchInputId").length > 0
                || $("WareHouseFilterSearchInputId").length > 0
                || $("Owned_StatusFilterSearchInputId").length > 0
            ) {
                var value_name = $("#nameAssetFilterSearchInputId").val();
                var value_asset_type = $("#AssetTypeFilterSearchInputId").val();
                var value_company = $("#CompanyFilterSearchInputId").val();
                var value_warehouse = $("#WareHouseFilterSearchInputId").val();
                var value_owned_status = $("#Owned_StatusFilterSearchInputId").val();
                if ((value_name != "" && value_name != null)
                    || (value_asset_type != "" && value_asset_type != null)
                    || (value_company != "" && value_company != null)
                    || (value_warehouse != "" && value_warehouse != null)
                    || (value_owned_status != "" && value_warehouse != null)) {
                        slugSearch += "name__icontains=" + value_name 
                                        + "&asset_type=" + value_asset_type
                                        + "&owned_company=" + value_company
                                        + "&warehouse=" + value_warehouse
                                        + "&own_status=" + value_owned_status;
                    }
            }

            // slugSearch = slugSearch.slice(0);
        } else {
            SEARCH_URL = AssetAsset_Search_URL;

            slugSearch = "&";
            slugSearch += "search=" + $("#assetAssetQuickSearchInputId").val();

        }
        if (search_data != null) {
            SEARCH_URL = AssetAsset_Search_URL;
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
                    // return new AssetAsset(data);
                    if (data.hasOwnProperty('count')) {
                        AssetAssetpagination["total"] = data.count;
                    }
                    if (data.hasOwnProperty('count')) {
                        AssetAssetpagination["total"] = data.count;
                    }
                    if (data.hasOwnProperty('next')) {
                        if (data.next != null) {
                            AssetAssetpagination["has_next"] = true;
                        } else {
                            AssetAssetpagination["has_next"] = false;

                        }
                    }
                    AssetAssetpagination["current_page"] = page;
                    if (data.hasOwnProperty('previous')) {
                        if (data.previous != null) {
                            AssetAssetpagination["has_prev"] = true;
                        } else {
                            AssetAssetpagination["has_prev"] = false;
                        }
                    }
                    if (data.hasOwnProperty('results')) {
                        for (var j = 0; j < data.results.length; j++) {
                            var tmp = new AssetAsset(data.results[j]);
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

    tFilterAllObjApi(uuid = null, slugFilter_URL = null) {
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
        //getValue for searching
        var slugFilter = "?name__icontains=&asset=";
        if (slugFilter_URL != "" || slugFilter_URL != null) {
            var Filter_URL = slugFilter_URL;
        }
        // search_log["search_data"] = slugSearch;
        this.callAjax =
            $.ajax({
                url: Filter_URL + slugFilter + uuid,
                type: "GET",
                //async: false,
                cache: false,
                timeout: 30000,

                success: function (data) {
                    console.log('[filter] data = ', data);
                    $("#AssetDetailTemplateTableBodyId").empty();
                    if (data.hasOwnProperty('results')) {
                        for (var j = 0; j < data.results.length; j++) {
                            var index = j + 1
                            appendToTable(data.results[j], index)
                        };
                    };
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

    // FilterCreateAllObjApi(uuid = null, slugFilter_URL = null, slug = null) {
    //     //hàm tìm kiếm với data_search hoặc dữ liệu từ vùng tìm kiếm & loại tìm kiếm
    //     var results = [];
    //     this.callAjax = null;
    //     $.ajaxSetup({
    //         headers: {
    //             'CSRFToken': getCSRFTokenValue(),
    //             'X-CSRFToken': getCSRFTokenValue(), // for --> SessionAuthentication
    //         },
    //         tryCount: 0,
    //         retryLimit: 3,
    //     });
    //     //getValue for searching
    //     var slugFilter = slug;
    //     if (slugFilter_URL != "" || slugFilter_URL != null) {
    //         var Filter_URL = slugFilter_URL;
    //     }
    //     // search_log["search_data"] = slugSearch;
    //     this.callAjax =
    //         $.ajax({
    //             url: Filter_URL + slugFilter + uuid,
    //             type: "GET",
    //             //async: false,
    //             cache: false,
    //             timeout: 30000,

    //             success: function (data) {
    //                 console.log('[filter] data = ', data);
    //                 $("#AssetAssetcreateDataTableConfigBodyId").empty();
    //                 if (data.hasOwnProperty('results')) {
    //                     // console.log('Chua lam gif')
    //                 };
    //             },
    //             error: function (xhr, ajaxOptions, thrownError) {
    //                 console.log(xhr.status);
    //                 console.log(thrownError);
    //                 if (xhr.textStatus == 'timeout') {
    //                     this.tryCount++;
    //                     if (this.tryCount <= this.retryLimit) {
    //                         //try again
    //                         $.ajax(this);
    //                         return;
    //                     }
    //                     return;
    //                 }

    //                 if (is_debug) {
    //                     $.alert({
    //                         title: 'Error [' + xhr.status + '] ' + thrownError,
    //                         content: xhr.responseText,
    //                     });
    //                 }
    //             },
    //         });
    //     return results;
    // }


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
                url: Asset_API_URL + uuid + "/",
                type: "GET",
                async: false,
                cache: false,
                timeout: 30000,

                success: function (data) {
                    console.log('[tGetObjApi] data = ', data);
                    var n_obj = new AssetAsset(data);
                    // console.log('n_obj = ', n_obj);
                    // n_obj.tFillForm();
                    return n_obj;
                    // if (data.hasOwnProperty('results')){
                    //    if (data.results.length > 0){
                    //        var tmp = new AssetAsset(data[i]);
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
        var tbId = "assetAssetDataTableId";
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

                    if (attr == "date_added") {
                        html += `<td class="text-wrap"><a>` + GetDateOnly_V01(this[attr]) + `</a></td>`;
                        continue;
                    }

                    if (attr == "price_buy") {
                        if (this.name_currency_unit != "undefined" && this.name_currency_unit != null) {
                            html += `<td class="text-wrap"><a>` + formatPrice(this[attr]) + " " + this.name_currency_unit + `</a></td>`;
                            continue;
                        }
                        else {
                            html += `<td class="text-wrap"><a>` + formatPrice(this[attr]) + `</a></td>`;
                            continue;
                        };
                    }

                    if (attr == "name") {
                        html += `<td class="text-wrap" style="min-width:300px" onclick="AssetAssetDetails('` + this["uuid"] + `')"><a>` + (this[attr]) + `</a></td>`;
                        continue;
                    }
                    //html +=`<td class="text-wrap"><a>` + (this[attr]) + `</a></td>`;
                    html += `<td class="text-wrap"><a>` + (this[attr]) + `</a></td>`;
                }

                else {
                    if (attr == "asset-admin-action") {
                        html += BindActionButtonVer4(
                            AssetAsset_arr_action,
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
    search_func: "",
    search_data: "",
    search_type: "",
}

// fill table function
function AssetAssetGetDataTable(page = 1, search_data = null) {
    search_log["search_func"] = "AssetAssetGetDataTable";
    search_log["search_data"] = search_data;
    search_log["search_type"] = "";

    var obj = new AssetAsset();
    var results = obj.tGetAllObjApi(page, search_data);
    obj.callAjax.then(function (data) {
        $("#assetAssetTableBodyId").empty();
        var body = $("#assetAssetDataTableId");
        //if (body.length > 0){
        //    var bodyTable = body.DataTable();
        //    bodyTable.clear();
        //}
        ASSET_ID_TABLE_COUNT = 1;
        var crr_record_in_page = AssetAssetrecord_in_page;

        if (page > 1) {
            ASSET_ID_TABLE_COUNT = 1 + crr_record_in_page * page - crr_record_in_page
        }
        for (var i = 0; i < results.length; i++) {
            try {
                console.log('results[i] = ', results[i]);

                //results[i].tFillTable2();
                results[i].tFillTable3();
                //results[i].tFillCard();

                ASSET_ID_TABLE_COUNT++;

                // results[i].tFillTable1();
            }
            catch (err) {
                console.log(err);
            }
        }
        var pagenation_ele = $(".pagination-AssetAsset");
        var pagination = AssetAssetpagination;
        pagenation_ele.html('');
        var page_total_ele = $(".page-total-AssetAsset");
        page_total_ele.html(`<footer class="mt-3 blockquote-footer">Tổng số: ${pagination["total"]} bản ghi </footer>`);
        if (results.length > 0) {

            pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="AssetAssetGetDataTable(1)">Đầu</a></li>`);
            if (pagination["has_prev"] == true) {
                pagenation_ele.append('<li class="page-item"><a class="page-link" onclick="AssetAssetGetDataTable(' + (parseInt(pagination["current_page"]) - 1) + ')">' + (parseInt(pagination["current_page"]) - 1) + '</a></li>');
            }
            pagenation_ele.append('<li class="page-item active"><a class="page-link" >' + (parseInt(pagination["current_page"])) + '</a></li>');
            if (pagination["has_next"] == true) {
                pagenation_ele.append('<li class="page-item"><a class="page-link" onclick="AssetAssetGetDataTable(' + (parseInt(pagination["current_page"]) + 1) + ')">' + (parseInt(pagination["current_page"]) + 1) + '</a></li>');
            }
            if (pagination["total"] > 0) {
                var last_page_order = 0
                if ((pagination["total"] % record_in_page) != 0) {
                    last_page_order = Math.floor(pagination["total"] / record_in_page) + 1;
                }
                else {
                    last_page_order = (pagination["total"] / record_in_page);
                }
                pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="AssetAssetGetDataTable(` + last_page_order + `)">Cuối</a></li>`);
            }
        }
    })
}

var AssetAssetpagination = {
    current_page: 1,
    total: 0,
    has_next: false,
    has_prev: false
}

var AssetAssetrecord_in_page = 100;
var record_in_page = 100;


// Run function fill data table
$(document).ready(function () {
    var IdTable = "assetAssetDataTableId";
    var checker = $("#" + IdTable);
    if (checker.length > 0) {
        if ($('#' + IdTable).is(":visible")) {
            AssetAssetGetDataTable(AssetAssetpagination["current_page"]);
        }
    }
})

$(document).ready(function () {
    var selectionId = "assetAssetDetailModalsFormId";
    AssetAssetViewDetail(selectionId)
})

// [Save Create] Clicked Handle function
$(document).ready(function () {
    $("#assetAssetCreateModalBtnId").click(function () {
        var validate_obj = new InputValidation('assetAssetCreateModalsFormId');
        if (validate_obj.validateRequired()) {
            toastr.warning('Vui lòng điền đầy đủ thông tin');
            return;
        }
        obj = new AssetAsset();
        console.log('Save obj = ', obj);
        obj.tCreateNewPostFormApi('assetAssetCreateModalsFormId');
    })
});

// [SAVE UPDATE]
$(document).ready(function () {
    $("#assetAssetUpdateModalBtnId").click(function () {
        obj = new AssetAsset();
        obj.tUpdatePostApi('assetAssetEditModalsFormId');
    })
});

// add selected
window.addEventListener("load", function () {
    SelectedFieldModal(AssetType_API_URL, "Edit", "asset_type")
    SelectedFieldModal(OwnStatus_API_URL, "Edit", "own_status")
    SelectedFieldModal(WareHouseCategory_API_Short_URL, "Edit", "warehouse")
    SelectedFieldModal(SupplierCategory_API_Short_URL, "Edit", "supplier")
    SelectedFieldModal(AssetStatus_API_URL, "Edit", "asset_status")
    SelectedFieldModal(UnitCategory_API_URL, "Edit", "unit")
    SelectedFieldModal(CompanyList_URL, "Edit", "owned_company")
    SelectedFieldModal(StaffList_URL, "Edit", "current_asset_user")
    SelectedFieldModal(CurrencyUnit_API_URL, "Edit", "currency_unit")

    //Add
    SelectedFieldModal(AssetType_API_URL, "Create", "asset_type")
    SelectedFieldModal(OwnStatus_API_URL, "Create", "own_status")
    SelectedFieldModal(WareHouseCategory_API_Short_URL, "Create", "warehouse")
    SelectedFieldModal(SupplierCategory_API_Short_URL, "Create", "supplier")
    SelectedFieldModal(AssetStatus_API_URL, "Create", "asset_status")
    SelectedFieldModal(UnitCategory_API_URL, "Create", "unit")
    SelectedFieldModal(CompanyList_URL, "Create", "owned_company")
    SelectedFieldModal(StaffList_URL, "Create", "current_asset_user")
    SelectedFieldModal(CurrencyUnit_API_URL, "Create", "currency_unit")
});

// Funtion hiện thị select lên form modal
function SelectedFieldModal(URL, apart, InputId) {
    for (var i = 1; i < 2; i++) {
        var pagess = "?page=" + i;
        $.ajax({
            url: URL + pagess,
            dataType: 'JSON',
            type: 'GET',
            success: function (data) {
                var html = '<option value="">---</option>'
                var dlen = data.results.length
                for (var i = 0; i < dlen; i++) {
                    var val = data.results[i]
                    html += '<option value="' + val.uuid + '">' + val.name + '</option>'
                }
                $("#" + InputId + "AssetAsset" + apart + "ModalInputId").append(html);
            }
        });
    }
}

// Append Field Select Filter
function AppendSelectFilter(URL, Filter_Id) {
    var html = "";
    $.ajax({
        url: URL,
        dataType: 'JSON',
        type: 'GET',
        success: function (data) {
            var dlen = data.results.length
            for (var i = 0; i < dlen; i++) {
                var val = data.results[i]
                html += '<option value="' + val.uuid + '">' + val.name + '</option>'
            }
            $("#"+Filter_Id).append(html);
        }
    });
}

// Run Select Filter
$(document).ready(function () {
    AppendSelectFilter(AssetType_API_URL, "AssetTypeFilterSearchInputId")
    AppendSelectFilter(CompanyList_URL, "CompanyFilterSearchInputId")
    AppendSelectFilter(WareHouseCategory_API_Short_URL, "WareHouseFilterSearchInputId")
    AppendSelectFilter(OwnStatus_API_Short_URL, "Owned_StatusFilterSearchInputId")
});

// Export excel
$(document).ready(function () {
    $('#assetAssetExportExcelBtnId').click(function () {
        // Define the columns to export
        var columnsToExport = [0, 1, 2, 3, 4, 5, 6]; // columns 1, 2, and 4 (zero-indexed)
        var theadToExport = '';
        $('#assetAssetDataTableId thead').each(function () {
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
        $('#assetAssetDataTableId tbody tr').each(function () {
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
            filename: 'thông_tin_tài_sản_%DD%-%MM%-%YY%',
            format: 'xls',
            escape: 'false',

        });
    });
});

// Search Start - khoi tao doi tuong function
function AssetAssetSearchData(page = 1, search_type, search_data = null) {
    search_log["search_func"] = "AssetAssetSearchData";
    search_log["search_type"] = search_type;
    search_log["search_data"] = search_data;
    var obj = new AssetAsset();
    var results = obj.tSearchAllObjApi(page, search_data, search_type);
    obj.callAjax.then(function (data) {
        $("#assetAssetTableBodyId").empty();
        var body = $("#assetAssetDataTableId");
        ASSET_ID_TABLE_COUNT = 1;
        crr_record_in_page = AssetAssetrecord_in_page;
        if (page > 1) {
            ASSET_ID_TABLE_COUNT = 1 + crr_record_in_page * page - crr_record_in_page;
        }
        for (var i = 0; i < results.length; i++) {
            try {
                console.log('results[i] = ', results[i]);

                //results[i].tFillTable2();
                results[i].tFillTable3();

                ASSET_ID_TABLE_COUNT++;
                // results[i].tFillTable1();
            }
            catch (err) {
                console.log(err);
            }
        }
        search_type = search_type.trim()
        var pagination = AssetAssetpagination;
        var pagenation_ele = $(".pagination-AssetAsset");
        pagenation_ele.html('');
        var page_total_ele = $(".page-total-AssetAsset");
        page_total_ele.html(`<footer class="blockquote-footer mt-3">Tổng số: ${pagination["total"]} bản ghi </footer>`);

        if (results.length > 0) {
            pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="AssetAssetSearchData(1,'` + search_type + `'` + `,'` + search_data + `'` + `)">Đầu</a></li>`);

            if (pagination["has_prev"] == true) {
                pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="AssetAssetSearchData(` + (parseInt(pagination["current_page"]) - 1) + `,'` + search_type + `'` + `,'` + search_data + `'` + `)">` + (parseInt(pagination["current_page"]) - 1) + `</a></li>`);
            }
            pagenation_ele.append('<li class="page-item active"><a class="page-link" >' + (parseInt(pagination["current_page"])) + '</a></li>');
            if (pagination["has_next"] == true) {
                pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="AssetAssetSearchData(` + (parseInt(pagination["current_page"]) + 1) + `,'` + search_type + `'` + `,'` + search_data + `'` + `)">` + (parseInt(pagination["current_page"]) + 1) + `</a></li>`);
            }
            if (pagination["total"] > 0) {
                var last_page_order = 0
                if ((pagination["total"] % record_in_page) != 0) {
                    last_page_order = Math.floor(pagination["total"] / record_in_page) + 1;
                }
                else {
                    last_page_order = (pagination["total"] / record_in_page);
                }
                pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="AssetAssetSearchData(` + last_page_order + `,'` + search_type + `'` + `,'` + search_data + `'` + `)">Cuối</a></li>`);
            }
        }
        if (search_type == "quick") {
            var crr_txt = $("#assetAssetQuickSearchInputId").val();
            highlight(crr_txt, "#assetAssetTableBodyId");
        }
        if (search_type == "filter") {
            var crr_txt = $("#nameAssetFilterSearchInputId").val();
            highlight(crr_txt, "#assetAssetTableBodyId");
        }
    })

}

// Function Enter Search
$(document).ready(function () {
    $("#assetAssetQuickSearchInputId").on('keyup', function (e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            AssetAssetpagination = {
                current_page: 1,
                total: 0,
                has_next: false,
                has_prev: false
            }
            AssetAssetSearchData(AssetAssetpagination["current_page"], "quick");
        }
    })
    $("#assetAssetQuickSearchBtnId").click(function () {
        AssetAssetpagination = {
            current_page: 1,
            total: 0,
            has_next: false,
            has_prev: falseGAssetAssetSearchData(AssetAssetpagination["current_page"], "quick")
        }
    });
    $("#assetAssetSearchBtnId").click(function () {
        AssetAssetpagination = {
            current_page: 1,
            total: 0,
            has_next: false,
            has_prev: false
        }
        AssetAssetSearchData(AssetAssetpagination["current_page"], "filter");
    })
    $("#AssetTypeInAssetFilterSearchBtnId").click(function () {
        AssetAssetpagination = {
            current_page: 1,
            total: 0,
            has_next: false,
            has_prev: false
        }
        AssetAssetSearchData(AssetAssetpagination["current_page"], "filter");
    })
});

// END Search

// Check unique 
function CheckUnique(dcode) {
    var slugSearch = "?search=" + dcode
    $.ajax({
        url: AssetAsset_Search_URL + slugSearch,
        dataType: 'JSON',
        type: 'GET',
        success: function (data) {
            if (data.results.length > 0) {
                toastr.warning('Mã tài sản đã tồn tại');
            }
        }
    });
}

// append Thông số chi tiết của tài sản
function appendToTable(val, index) {
    $("#AssetDetailTemplateTableBodyId").append(`
        <tr>
            <td class="h-25" name="name">${index}</td>
            <td class="h-25" name="name">${val.name}</td>
            <td class="h-25" name="value">${val.value}</td>
        </tr>
    `);
}

// Show Options Config Asset
function showOptionsConfig(URL, form_id, filter_id) {
    $(form_id).empty();
    // var slugFilter = "?asset_type=" + filter_id;
    if (filter_id == "" || filter_id == null || filter_id == undefined){
        var slugFilter = "?asset_type=null";
    }
    else {
        var slugFilter = "?asset_type=" + filter_id;
    }
    console.log(slugFilter)
    $.ajax({
        url: URL + slugFilter,
        dataType: "JSON",
        type: "GET",
        success: function (data){
            var dlen = data.results.length;
            var html = "";
            for (let index = 0; index < dlen; index++) {
                var i = index + 1;
                var id_code = "AD" + index;
                html += '<tr>'
                html += '<td><label class="small mb-1">'+ i +'</label></td'
                html += '<td><label id="'+id_code+'" class="mb-1 col-xl-3 d-none">'+ getCode(id_code, "MPS", "ASD", "text") +'</label></td>'
                html += '<td><label class="small mb-1">'+ data.results[index].code +'</label></td>'
                html += '<td><label class="small mb-1">'+ data.results[index].name +'</label></td>'
                html += '<td><input name="value" class="mt-3 form-control required" placeholder="Nhập giá trị" type="text"></td>'
                html += '</tr>'
            }
            $(form_id).append(html);
        }
    })
}

// SAVE THONG SO CAU HINH
function postAssetDetail(asset, table) {
    $.ajaxSetup({
        headers: {
            'CSRFToken': getCSRFTokenValue(),
            'X-CSRFToken': getCSRFTokenValue(), // for --> SessionAuthentication
        },
        tryCount: 0,
        retryLimit: 3,

    });

    var table_id = "#" + table
    var data = [];
    var index = 0;
    // var company = $("#owned_companyAssetAssetCreateModalInputId").find(":selected").text();
    $(table_id + " tr").each(function() {
        // var code = getCode("", company, "ASD", "")
        var id_code = "#AD" + index;
        var code = $(id_code).text();
        // var code_fake = $(this).find('td:nth-child(3) label').text();
        var name = $(this).find('td:nth-child(3) label').text();
        var value = $(this).find('td:nth-child(4) input').val();
        data.push({asset:asset, 
                    code: code, 
                    name: name, 
                    value: value
                });
        index ++
        console.log("data = ", data)
    });
    for (let i = 0; i < data.length; i++) {
        $.ajax({
            url: AssetDetail_API_URL,
            // type: "PUT",
            type: "POST",
            async: false,
            cache: false,
            timeout: 30000,
            data: JSON.stringify(data[i]),
            contentType: 'application/json',
            success: function (data) {
                console.log('POST AssetDetail')
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
}

// Check thay đổi on change
$(document).ready(function () {
    var dropdown = $('#owned_companyAssetAssetCreateModalInputId');
    dropdown.on('change', function () { 
        var company = $(this).find(":selected").text();
        getCode("codeAssetAssetCreateModalInputId", company, "AS", "input")
    });
});


// Nam Coding Start ----------------------------------
function ShowOption(URL, formid, first_row) {
    $(formid).empty();
    if (first_row == "yes") {
        var first_option = '<option value="">---</option>'
        $(formid).append(first_option);
    }
    // empty the options
    //   var pagess = "?page=" + i;
    $.ajax({
        url: URL,
        dataType: 'JSON',
        type: 'GET',
        success: function (data) {
            var event_data = '';
            var length_data = data.results.length;
            for (var j = 0; j < length_data; j++) {
                var datare = data.results[j];
                console.log(datare.uuid);
                event_data += '<option value="' + datare.uuid + '">' + datare.name + '</option>';
            }
            $(formid).append(event_data);
        }
    })
}

$(document).ready(function () {
    ShowOption(DepreciationPeriod_URL, "#preioddetailDepreciationDepreciationCreateModalInputId", "no")
    ShowOption(Adjustment_URL, "#adjustmentasetDepreciationDepreciationCreateModalInputId", "yes")
    ShowOption(AssetRevaluation_URL, "#assetrevaluationDepreciationDepreciationCreateModalInputId", "no")
})


function ShowOption2(URL, formid, search_id) {
    $(formid).empty();
    var search = "?search=" + search_id;
    console.log(search)
    $.ajax({
        url: URL + search,
        dataType: 'JSON',
        type: 'GET',
        success: function (data) {
            var event_data = '';
            var length_data = data.results.length;
            for (var j = 0; j < length_data; j++) {
                var datare = data.results[j];
                console.log(datare.uuid);
                event_data += '<option value="' + datare.uuid + '">' + datare.name + '</option>';
            }
            $(formid).append(event_data);
        }
    })
}

function CallShowOption2(type_string) {
    ShowOption2(DepreciationType_URL, "#typedepreciationDepreciationDepreciationCreateModalInputId", type_string)
    showOptionsConfig(AssetDetailTemplate_API_URL, "#AssetTemplateConfigTbbody", type_string)
}

$(document).ready(function () {
    var dropdown = $('#asset_typeAssetAssetCreateModalInputId');
    dropdown.on('change', function () {
        var asset_types = $(this).val();
        CallShowOption2(asset_types)
    });
});

function PostDepreciation(asett) {
    $.ajaxSetup({
        headers: {
            'CSRFToken': getCSRFTokenValue(),
            'X-CSRFToken': getCSRFTokenValue(), // for --> SessionAuthentication
        },
        tryCount: 0,
        retryLimit: 3,

    });

    var aset = asett;
    var type_depreciation = $('#typedepreciationDepreciationDepreciationCreateModalInputId').val();
    var preiod_detail = $('#preioddetailDepreciationDepreciationCreateModalInputId').val();
    var revaluation = $('#assetrevaluationDepreciationDepreciationCreateModalInputId').val();
    var adjustment_aset = $('#adjustmentasetDepreciationDepreciationCreateModalInputId').val();

    $.ajax({
        url: DepreciationDetailSmall_URL,
        // type: "PUT",
        type: "POST",
        async: false,
        cache: false,
        timeout: 30000,
        data: {
            aset: aset,
            type_depreciation: type_depreciation,
            preiod_detail: preiod_detail,
            revaluation: revaluation,
            adjustment_aset: adjustment_aset,
        },

        success: function (data) {
            console.log('POST Depreciation')
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

// NAMNH  DETAILDETAILDETAILDETAILDETAILDETAIL //

var DepreciationDepreciationrecord_in_page1 = 5;

var DepreciationAssetDetailDepreciationAssetDetailpagination={
    current_page:1,
    total:0,
    has_next:false,
    has_prev:false
}

class DepreciationDepreciation1{
    constructor(data=null){
      if (data != null){
          if (data.hasOwnProperty('id')){
              this.id = data.id;
          }
          else{
              this.id = null;
          }
  
          this.__app_name__ = "Depreciation";
  
          this.__model_name__ = "Depreciation";
  
          if (data.hasOwnProperty('aset_type')){
              this.aset_type = data.aset_type;
          }
          else{
              this.aset_type = null;
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
  
          if (data.hasOwnProperty('aset')){
              this.aset= data.aset;
          }
          else{
              this.aset = null;
          }
  
          if (data.hasOwnProperty('preiod_detail_name')){
            this.preiod_detail_name = data.preiod_detail_name;
          }
          else{
              this.preiod_detail_name  = null;
          }
  
          if (data.hasOwnProperty('aset_name')){
            this.aset_name= data.aset_name;
          }
          else{
              this.aset_name = null;
          }
  
          if (data.hasOwnProperty('aset_date_added')){
            this.aset_date_added= data.aset_date_added;
          }
          else{
              this.aset_date_added = null;
          }
  
          if (data.hasOwnProperty('aset_price_buy')){
              this.aset_price_buy = data.aset_price_buy;
              
          }
          else{
              this.aset_price_buy = null;
          }
  
          if (data.hasOwnProperty('preiod_detail')){
              this.preiod_detail = data.preiod_detail;
          }
          else{
              this.preiod_detail = null;
          }
  
          if (data.hasOwnProperty('namesasetstype')){
              this.namesasetstype = data.namesasetstype;
          }
          else{
              this.namesasetstype = null;
          }
          
          if (data.hasOwnProperty('revaluation')){
              this.revaluation = data.revaluation
          }
          else{
              this.revaluation = null;
          }
  
          if (data.hasOwnProperty('adjustment_aset')){
              this.adjustment_aset = data.adjustment_aset
          }
          else{
              this.adjustment_aset = null;
          }
          
          if (data.hasOwnProperty('adjustment_number')){
              this.adjustment_number = data.adjustment_number
          }
          else{
              this.adjustment_number = null;
          }
          
          if (data.hasOwnProperty('adjustment_aset_name')){
              this.adjustment_aset_name = data.adjustment_aset_name
          }
          else{
              this.adjustment_aset_name = null;
          }
  
          if (data.hasOwnProperty('revaluation_name')){
              this.revaluation_name = data.revaluation_name
          }
          else{
              this.revaluation_name = null;
          }
          
          if (data.hasOwnProperty('time_depreciation')){
              this.time_depreciation = data.time_depreciation;
          }
          else{
              this.time_depreciation = null;
          }
  
          if (data.hasOwnProperty('add_value')){
              this.add_value = data.add_value;
          }
          else{
              this.add_value = null;
          }
  
          if (data.hasOwnProperty('type_depreciation_name')){
              this.type_depreciation_name = data.type_depreciation_name;
          }
          else{
              this.type_depreciation_name = null;
          }
  
          if (data.hasOwnProperty('type_depreciation')){
              this.type_depreciation = data.type_depreciation;
          }
          else{
              this.type_depreciation = null;
          }
          
          
          if (data.hasOwnProperty('depreciation_value')){
              this.depreciation_value = data.depreciation_value;
          }
          else{
              this.depreciation_value = null;
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

    tGetObjApi1(uuid){
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
            url: DepreciationDetailSmall_URL + uuid + "/",
            type: "GET",
            async: false,
            cache: false,
            timeout: 30000,
  
            success: function (data) {
                console.log('[tGetObjApi] data = ', data);
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

    tFillFormModal1(modals_type,formId=null){
        //modals_type
        //*Create
        //*Detail
        //*Edit
        var apart=modals_type+'Modal';
    
        var self = this;
            try{
                var j_ele_name = $("#nameDepreciationDepreciation"+apart+"InputId");
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
                var j_ele_id = $("#idDepreciationDepreciation"+apart+"InputId");
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
                var j_ele_uuid = $("#uuidDepreciationDepreciation"+apart+"InputId");
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
                var j_ele_tndid = $("#tndidDepreciationDepreciation"+apart+"InputId");
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
                var j_ele_nick_name = $("#nick_nameDepreciationDepreciation"+apart+"InputId");
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
                var j_ele_username = $("#usernameDepreciationDepreciation"+apart+"InputId");
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
                var j_ele_full_name = $("#asetnameDepreciationDepreciation"+apart+"InputId");
                if (j_ele_full_name.length > 0){
                    if (j_ele_full_name.attr('name') != 'uuid'){
                        j_ele_full_name.val(self.aset).change();
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
                var j_ele_full_name = $("#asetDepreciationDepreciation"+apart+"InputId");
                if (j_ele_full_name.length > 0){
                    if (j_ele_full_name.attr('name') != 'uuid'){
                        j_ele_full_name.val(self.aset_name).change();
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
                var j_ele_email = $("#asetdateaddedDepreciationDepreciation"+apart+"InputId");
                if (j_ele_email.length > 0){
                    if (j_ele_email.attr('name') != 'uuid'){
                        j_ele_email.val(self.aset_date_added).change();
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
                var j_ele_email = $("#asetpricebuyDepreciationDepreciation"+apart+"InputId");
                if (j_ele_email.length > 0){
                    if (j_ele_email.attr('name') != 'uuid'){
                        j_ele_email.val(self.aset_price_buy).change();
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
                var j_ele_email = $("#remainingvalueDepreciationDepreciation"+apart+"InputId");
                if (j_ele_email.length > 0){
                    if (j_ele_email.attr('name') != 'uuid'){
                        j_ele_email.val(self.remaining_value).change();
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
                var j_ele_email = $("#watchyearnameDepreciationDepreciation"+apart+"InputId");
                if (j_ele_email.length > 0){
                    if (j_ele_email.attr('name') != 'uuid'){
                        j_ele_email.val(self.watch_year_name).change();
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
                var j_ele_email = $("#timedepreciationDepreciationDepreciation"+apart+"InputId");
                if (j_ele_email.length > 0){
                    if (j_ele_email.attr('name') != 'uuid'){
                        j_ele_email.val(self.time_depreciation).change();
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
                var j_ele_email = $("#depreciationperdaysDepreciationDepreciation"+apart+"InputId");
                if (j_ele_email.length > 0){
                    if (j_ele_email.attr('name') != 'uuid'){
                        j_ele_email.val(self.depreciation_per_days).change();
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
                var j_ele_email = $("#depreciationpermonthsDepreciationDepreciation"+apart+"InputId");
                if (j_ele_email.length > 0){
                    if (j_ele_email.attr('name') != 'uuid'){
                        j_ele_email.val(self.depreciation_per_months).change();
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
                var j_ele_email = $("#depreciationperyearsDepreciationDepreciation"+apart+"InputId");
                if (j_ele_email.length > 0){
                    if (j_ele_email.attr('name') != 'uuid'){
                        j_ele_email.val(self.depreciation_per_years).change();
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
                var j_ele_email = $("#timeusedaysDepreciationDepreciation"+apart+"InputId");
                if (j_ele_email.length > 0){
                    if (j_ele_email.attr('name') != 'uuid'){
                        j_ele_email.val(self.time_use_days).change();
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
                var j_ele_email = $("#timeuseweeksDepreciationDepreciation"+apart+"InputId");
                if (j_ele_email.length > 0){
                    if (j_ele_email.attr('name') != 'uuid'){
                        j_ele_email.val(self.time_use_weeks).change();
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
                var j_ele_email = $("#timeusemonthsDepreciationDepreciation"+apart+"InputId");
                if (j_ele_email.length > 0){
                    if (j_ele_email.attr('name') != 'uuid'){
                        j_ele_email.val(self.time_use_months).change();
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
                var j_ele_email = $("#timeuseyearsDepreciationDepreciation"+apart+"InputId");
                if (j_ele_email.length > 0){
                    if (j_ele_email.attr('name') != 'uuid'){
                        j_ele_email.val(self.time_use_years).change();
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
                var j_ele_email = $("#revaluation1DepreciationDepreciation"+apart+"InputId");
                if (j_ele_email.length > 0){
                    if (j_ele_email.attr('name') != 'uuid'){
                        j_ele_email.val(self.revaluation[0].name + ', ' + self.revaluation[0].time_revaluation + ', ' + self.revaluation[0].addup_value + ', ' + self.revaluation[0].addup_time + ', ' + self.revaluation[0].uuid).change();
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
                var j_ele_email = $("#revaluation2DepreciationDepreciation"+apart+"InputId");
                if (j_ele_email.length > 0){
                    if (j_ele_email.attr('name') != 'uuid'){
                        j_ele_email.val(self.time_depreciation).change();
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
                var j_ele_email = $("#revaluation3DepreciationDepreciation"+apart+"InputId");
                if (j_ele_email.length > 0){
                    if (j_ele_email.attr('name') != 'uuid'){
                        j_ele_email.val(self.time_depreciation).change();
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
                var j_ele_email = $("#preioddetailDepreciationDepreciation"+apart+"InputId");
                if (j_ele_email.length > 0){
                    if (j_ele_email.attr('name') != 'uuid'){
                        j_ele_email.val(self.preiod_detail).change();
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
                var j_ele_email = $("#adjustmentasetDepreciationDepreciation"+apart+"InputId");
                if (j_ele_email.length > 0){
                    if (j_ele_email.attr('name') != 'uuid'){
                        j_ele_email.val(self.adjustment_aset).change();
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
                var j_ele_email = $("#addvalueDepreciationDepreciation"+apart+"InputId");
                if (j_ele_email.length > 0){
                    if (j_ele_email.attr('name') != 'uuid'){
                        j_ele_email.val(self.add_value).change();
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
                var j_ele_email = $("#typedepreciationDepreciationDepreciation"+apart+"InputId");
                if (j_ele_email.length > 0){
                    if (j_ele_email.attr('name') != 'uuid'){
                        j_ele_email.val(self.type_depreciation).change();
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
                var j_ele_email = $("#preioddetailnameDepreciationDepreciation"+apart+"InputId");
                if (j_ele_email.length > 0){
                    if (j_ele_email.attr('name') != 'uuid'){
                        j_ele_email.val(self.preiod_detail_name).change();
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
                var j_ele_email = $("#adjustmentnumberDepreciationDepreciation"+apart+"InputId");
                if (j_ele_email.length > 0){
                    if (j_ele_email.attr('name') != 'uuid'){
                        j_ele_email.val(self.adjustment_number).change();
                    }
                }
                else{
                    // j_ele_email.val(null);
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
}

class DepreciationAssetDetailDepreciationAssetDetail1{
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
    
          if (data.hasOwnProperty('asset_depreciations')){
              this.aet_depreciation= data.aet_depreciation;
          }
          else{
              this.aet_depreciation = null;
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

          if (data.hasOwnProperty('month_1')){
            this.month_1 = data.month_1;
            if(this.month_1==0){
                this.month_1 = ""
            }
        }
        else{
            this.month_1 = null;
        }

        if (data.hasOwnProperty('month_2')){
            this.month_2 = data.month_2;
            if(this.month_2==0){
                this.month_2 = ""
            }
        }
        else{
            this.month_2 = null;
        }

        if (data.hasOwnProperty('month_3')){
            this.month_3 = data.month_3;
            if(this.month_3==0){
                this.month_3 = ""
            }
        }
        else{
            this.month_3 = null;
        }

        if (data.hasOwnProperty('month_4')){
            this.month_4 = data.month_4;
            if(this.month_4==0){
                this.month_4 = ""
            }
        }
        else{
            this.month_4 = null;
        }

        if (data.hasOwnProperty('month_5')){
            this.month_5 = data.month_5;
            if(this.month_5==0){
                this.month_5 = ""
            }
        }
        else{
            this.month_5 = null;
        }

        if (data.hasOwnProperty('month_6')){
            this.month_6 = data.month_6;
            if(this.month_6==0){
                this.month_6 = ""
            }
        }
        else{
            this.month_6 = null;
        }

        if (data.hasOwnProperty('month_7')){
            this.month_7 = data.month_7;
            if(this.month_7==0){
                this.month_7 = ""
            }
        }
        else{
            this.month_7 = null;
        }

        if (data.hasOwnProperty('month_8')){
            this.month_8 = data.month_8;
            if(this.month_8==0){
                this.month_8 = ""
            }
        }
        else{
            this.month_8 = null;
        }

        if (data.hasOwnProperty('month_9')){
            this.month_9 = data.month_9;
            if(this.month_9==0){
                this.month_9 = ""
            }
        }
        else{
            this.month_9 = null;
        }

        if (data.hasOwnProperty('month_10')){
            this.month_10 = data.month_10;
            if(this.month_10==0){
                this.month_10 = ""
            }
        }
        else{
            this.month_10 = null;
            
        }

        if (data.hasOwnProperty('month_11')){
            this.month_11 = data.month_11;
            if(this.month_11==0){
                this.month_11 = ""
            }
        }
        else{
            this.month_11 = null;
        }

        if (data.hasOwnProperty('month_12')){
            this.month_12 = data.month_12;
            if(this.month_12==0){
                this.month_12 = ""
            }
        }
        else{
            this.month_12 = null;
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
       
    // ########## get Objects from REST API --> return array of objects ##############
    tGetAllObjApiDetail1(page=null,search_data=null,uuid=null){
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
        // var has_go_page=""
        // if(page!=null){
        //     has_go_page="?page="+page;
        // }
        var has_go_filter=""
        if(uuid!=null){
            has_go_filter="?aet_depreciation="+uuid;
        }
        console.log('has_go_filter',has_go_filter)
        this.callAjax =
        $.ajax({
            url: DepreciationAssetDetail_URL+has_go_filter,
            type: "GET",
            //async: false,
            cache: false,
            timeout: 30000,
    
            success: function (data) {
                console.log('[tGetAllObjApiDetailData11111] data = ', data);
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
                        var tmp = new DepreciationAssetDetailDepreciationAssetDetail1(data.results[j]);
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
 
    tFillTable3Detail1(tableId=null,order=null){
      var tbId = "DepreciationAssetDetailDepreciationAssetDetailDataTableId111";
      if(tableId!=null){
          tbId = tableId;
      }
    
      if(order==null){
      order=ACCOUNT_ID_TABLE_COUNT;
      }
      var table = $("#" + tbId) ;
      if (table.length > 0){
          var html = "<tr>"
          html+= `<td class="text-wrap">` + order + `</td>`;
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
    
}

function AssetDepreciationGetData(uuid){
    $('#DepreciationDepreciationDetailmodalsId').modal('toggle');
    var slugSearch = "?type_depreciation=&preiod_detail=&aset=" + uuid
    $.ajax({
        url: DepreciationDetailSmall_URL + slugSearch,
        dataType: 'JSON',
        type: 'GET',
        success: function (data) {
            if (data.results.length > 0) {
                var uuid = data.results[0].uuid
                var asset = data.results[0].aset
                DepreciationDepreciationDetails1(uuid,asset)
            } else {
                $("#DepreciationAssetDetailDepreciationAssetDetailTableBodyId").empty();
                $("#asetDepreciationDepreciationDetailModalInputId").val('');
                $("#asetdateaddedDepreciationDepreciationDetailModalInputId").val('');
                $("#asetpricebuyDepreciationDepreciationDetailModalInputId").val('');
                $("#preioddetailnameDepreciationDepreciationDetailModalInputId").val('');
                $("#timedepreciationDepreciationDepreciationDetailModalInputId").val('');
                $("#revaluation1DepreciationDepreciationDetailModalInputId").val('');
        }}
    });
}

function DepreciationDepreciationDetails1(uuid,asset){
    var obj=new DepreciationDepreciation1();
    obj.tGetObjApi1(uuid);
    obj.callAjax.then(function(data) {
        new  DepreciationDepreciation1(data).tFillFormModal1('Detail','DepreciationDepreciationDetailModalsFormId');
    })

    DepreciationDepreciationGetDetailDataTable1(page=1, search_data=null,asset_uuid=asset)
    GetAssetRevaluationTable1(uuid)

}
 
function DepreciationDepreciationGetDetailDataTable1(page=1,search_data=null,asset_uuid){
    $("#DepreciationAssetDetailDepreciationAssetDetailTableBodyId").empty();
    search_log["search_func"] = "DepreciationDepreciationGetDetailDataTable";
    search_log["search_data"] = search_data;
    search_log["search_type"] = "";

    var obj = new DepreciationAssetDetailDepreciationAssetDetail1();
    var results = obj.tGetAllObjApiDetail1(page,search_data,asset_uuid);
    obj.callAjax.then(function(data) {
        ACCOUNT_ID_TABLE_COUNT = 1;
        crr_record_in_page = DepreciationDepreciationrecord_in_page1;
        if(page>1){
        ACCOUNT_ID_TABLE_COUNT =1+crr_record_in_page*page-crr_record_in_page;
        }
        for (var i = 0; i < results.length; i++){
            try{
                console.log('resultsdetail[i] = ', results[i]);

                //results[i].tFillTable2();
                results[i].tFillTable3Detail1();
                // results[i].tFillCard();

                ACCOUNT_ID_TABLE_COUNT++;
                // results[i].tFillTable1();
            }
            catch(err){
                console.log(err);
            }
        }
    });
}

function GetAssetRevaluationTable1(uuid){
    alert(uuid)
    $('#AssetRevaluationAssetRevaluationFormID').empty();
    $.ajax({
        url: DepreciationDetailSmall_URL + uuid +'/',
        type: "GET",
        success: function(data) {
            var length_data = data.revaluation.length;
            for (var j = 0; j < length_data; j++) {
                var html = ""
                html +=
                `
                <tr>
                    <td attr-name="" class="border-gray-200">` + data.revaluation[j].name + `</th>
                
                    <td attr-name="" class="border-gray-200">`  + data.revaluation[j].time_revaluation + `</th>
                
                    <td attr-name="" class="border-gray-200">`  + data.revaluation[j].addup_value +  `</th>

                    <td attr-name="" class="border-gray-200">` + data.revaluation[j].addup_time +   `</th>
                </tr>
                `;
                $('#AssetRevaluationAssetRevaluationFormID').append(html);
            }
        },
    });
}

// Auto Code
function getCode(InputId, companyId, modelId, type){
    var company_code = companyId+"/";
    var app_name = "AM/";
    var mode_name = modelId + "/";
    // return new Promise(function(resolve, reject){
    $.ajax({
        url: Get_Code_URL + company_code + app_name + mode_name,
        type: "GET",
        success: function(data) {
            var generatedCode = data.code;
            if (type == "text"){
                $("#"+InputId).text(generatedCode);
            }
            else{
                $("#"+InputId).val(generatedCode);
            };
            // resolve(generatedCode)
        },
    });
    // });
}

// function handleResult(result){
//     // Do something with result
//     return result
//   };
 // NAMNH  DETAILDETAILDETAILDETAILDETAILDETAIL STOP //