/** Dữ liệu mẫu */
arrField = [{
        DOMId: "ckCSTypeProduct",
        Id: "type",
        type: "checkbox",
    },
    {
        DOMId: "txtCSName",
        Id: "name",
        type: "text",
    }

]
objData = {
        type: "01,02,03",
        name: "Chào mừng đến với quê hương chung tôi"

    }
    /** lấy giá trị của tất cả input, trả về object */
function AutoGetValue(formId) {
    var obj = new Object();
    $("td#" + formId + " :input").each(function() {
        var input = $(this); // This is the jquery object of the input, do what you will
        obj[this.id] = $(this).val();
        console.log(this.type);
        if (this.type === "checkbox") {

        }
    });
    console.log(obj);
    return obj;
}
/** lấy giá trị và trả về theo input */
function AutoGetValueV1(arrField) {
    var obj = new Object();
    arrField.forEach(element => {
        console.log(element);
        switch (element.type) {
            case "checkbox":
                obj[element.Id] = ""
                $('input[name="' + element.DOMId + '"]:checked').each(function() {
                    obj[element.Id] += this.value + ",";
                });
                break;
            case "radio":
                obj[element.Id] = $("input[name=" + element.DOMId + "]:checked").val()
                break;
            case "file":
                obj[element.Id] = ""
                var formData = new FormData();
                formData.append('file', $('#' + element.DOMId)[0].files[0]);
                var file = $('#' + element.DOMId)[0].files[0];
                if (file == undefined) {
                    obj[element.Id] = null;
                } else {
                    obj[element.Id] = formData;
                }
                break;
            case "datetime":
                if ($("#" + element.DOMId).val() == "") {
                    obj[element.Id] = ""
                } else {
                    var date = moment($("#" + element.DOMId).val(), 'DD/MM/YYYY');
                    obj[element.Id] = toDatePython(new Date(date));
                }

                break;
            default:
                obj[element.Id] = $("#" + element.DOMId).val();
                break;
        }
        validation(element, obj[element.Id]);
    });
    return obj;
}
/*** tự động gán giá trị cho các trường thông tin trên form */

function validation(obj, value) {
    var is_valid = true;
    if (obj.require && (value == "" || value == null || value == undefined)) {
        $("#" + obj.DOMId).addClass("is-invalid").removeClass("is-valid");
    } else {
        $("#" + obj.DOMId).removeClass("is-invalid").addClass("is-valid");
    }
    return is_valid;
}
/**
 * kiểm tra cho tất cả element thuộc arrField, giá trị lấy ở obj
 * @param {*} arrField 
 * @returns 
 */
function ValidationForAll(arrField) {
    var is_valid = true;
    arrField.forEach(element => {
        console.log(element);
        var value = "";
        switch (element.type) {
            case "checkbox":
                $('input[name="' + element.DOMId + '"]:checked').each(function() {
                    value += this.value + ",";
                });
                break;
            case "file":
                value = ""
                var formData = new FormData();
                formData.append('file', $('#' + element.DOMId)[0].files[0]);
                var file = $('#' + element.DOMId)[0].files[0];
                if (file == undefined) {
                    value = null;
                } else {
                    value = formData;
                }
                break;
            default:
                value = $("#" + element.DOMId).val();
                break;
        }
        if (is_valid) {
            is_valid = validation(element, value);
        }
    });
    return is_valid;
}


function AutoSetValue(arrField, objData) {

    arrField.forEach(element => {
        if (objData[element.Id] != "" && objData[element.Id] != " " && objData[element.Id] != null) {
            switch (element.type) {
                case "checkbox":
                    var arrChoose = objData[element.Id].replaceAll("[", "").replaceAll("]", "").replaceAll("'", "").replaceAll(" ", "").split(",")
                    $('input[name="' + element.DOMId + '"]').prop('checked', false)
                    $('input[name="' + element.DOMId + '"]').each(function() {
                        console.log("check values exist:" + this.value);
                        console.log(arrChoose.includes(this.value));
                        if (arrChoose.includes(this.value)) {
                            $(this).prop('checked', true)
                        }
                    });
                    break;
                case "multi-select":
                    $("#" + element.DOMId).val(objData[element.Id]).trigger('change');
                    break;
                case "datetime":
                    $("#" + element.DOMId).val(GetDateOnly(objData[element.Id]));
                    break;
                case "radio":
                     $("input[name=" + element.DOMId + "][value=" + objData[element.Id] + "]").prop('checked', true);
                    break;
                default:
                    $("#" + element.DOMId).val(objData[element.Id]);
                    break;
            }
        }

    });

}
/** chuyển từ list object,chọn 1 trường thông tin chuyển thành arr string đơn giản */
function ListToStringArr(selectField, listData) {
    var arr = [];
    listData.forEach(element => {
        arr.push(element[selectField]);
    });
    return arr;
}





htmlHeader = `
{% extends "layouts/base.html" %}

<!--{% block title %} Dashboard {% endblock %}-->
{% load static %} {% load i18n %} {% load humanize %} {% load tz %}

<!-- Specific Page CSS goes HERE  -->
{% block stylesheets %}{% endblock stylesheets %} {% block content %}
<script src="/static/assets/js/jquery/dist/jquery.min.js"></script>
{{jScript_depens}}
{{css_depens}}
<div id="{{form_Id}}">
{{form_body}}
</div>
{% endblock content %}
<!-- Specific JS goes HERE -->
{% block javascripts %}{% endblock javascripts %}

`

modalsHeader = `
<div class="modal fade" id="{{modal_Id}}" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-xl modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            {% csrf_token %}
            <div class="modal-body px-md-5" id="{{form_Id}}">
                <h2 class="h4 text-center" id="titleSuggestion">Đề xuất mới</h2>
                <p class="text-center mb-4" id="titleWelcomeSuggestion">Tạo mới một đề xuất của bạn.</p>
                <form action="#">
                   {{form_body}}
                </form>
                <div class="modal-footer">
                    {{button_footer}}
                </div>
            </div>
        </div>
    </div>
</div>
`
divElement = `
<div class=" mb-4 {{div_size}} ">
{{elem_content}}
</div>`
rowDiv = `
<div class="form-group row">
{{row_content}}
</div>
`
jsContent = `
$(document).ready(function() {
})

const path_{{class_name}}={{url_api_v1_app_class}}";
const path_{{class_name}}_all={{url_api_v1_app_class}}+"all/";
const path_{{class_name}}_list={{url_api_v1_app_class}}+"list/";
const path_{{class_name}}_delete={{url_api_v1_app_class}}+"delete/";
const path_{{class_name}}_update={{url_api_v1_app_class}}+"update/";
/**
 * {{class_name}}
 */
class {{class_name}} {
    static url = "";
    static formId = "{{formId}}";
    static tableId = "{{tableId}}";
    constructor(
        data
    ) {
        this.data = data
    }
    getDetailsApi(uuid) {
        this.callAjax = null;
        this.callAjax = $.ajax({
            url: path_{{class_name}} + uuid,
            // data: JSON.stringify(this),
            type: 'GET',
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            complete: function(res, status, data) {
                switch (res.status) {
                    case 200:
                        this.data = res.responseJSON;
                        break;
                    default:
                        this.data = null

                }
            }
        });
    }
    postCreateApi() {
        this.callAjax = null;
        this.callAjax = $.ajax({
            url: path_{{class_name}},
            data: JSON.stringify(this.data),
            type: 'POST',
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            complete: function(res, status, data) {

                if (res.responseJSON.status == "ok") {
                    // toastr.success("Lưu thành công!");
                    // $('#modalCreateSuggestion').modal('hide');

                } else {
                    // toastr.error("Không thành công!");
                    // console.log(res.responseJSON);
                }
            }
        });
    }
    putUpdateApi() {
        this.callAjax = null;
        this.callAjax = $.ajax({
            url: path_{{class_name}}_update + this.data.uuid + '/',
            data: JSON.stringify(this.data),
            type: 'PUT',
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            complete: function(res, status, data) {

                if (res.responseJSON.status == "ok") {
                    // toastr.success("Cập nhật thành công!");
                    // $('#modalCreateSuggestion').modal('hide');

                } else {
                    // toastr.error("Không thành công!");
                    // console.log(res.responseJSON);
                }
            }
        });
    }
    delete() {
        this.callAjax = null;
        this.callAjax = $.ajax({
            url: path_{{class_name}}_delete + this.data.uuid + '/',
            // data: JSON.stringify(this),
            type: 'DELETE',
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            complete: function(res, status, data) {
                console.log(res.responseJSON);
            }
        });
    }
    getfromForm(formId=null){
        var {{class_name}}_obj =new Object();
        {{content_getdata}}
        return {{class_name}}_obj;
    }
    getfromTable(tableId=null){
        var {{class_name}}_obj =new Object();
        {{content_getdata}}
        return {{class_name}}_obj;
    }
    getfromRow(rowData=null){
        var {{class_name}}_obj =new Object();
        {{content_getdata}}
        return {{class_name}}_obj;
    }
    fillForm(formId=null){
        
    }
    fillTable(tableId=null){
        {{content_filldata}}
    }

}
`

function GenFrontEnd(app_name, class_name, arrField, type, tofile) {
    //gen_getdata
    var content_getdata = "";
    arrField.forEach(field => {
        content_getdata += class_name + "obj." + field.Id + "=$('#" + arrField.DOMId + "').val()";
    });
    jsContent.replaceAll("{{content_getdata}}", content_getdata);
}

function GenArrFieldBeta(arrId, app_name, class_name, parentCode = "", childCode = "") {
    var outPut = [];
    arrId.forEach(dom => {
        var obj = new Object();
        obj.Id = dom;
        domId = dom + "_" + class_name + "_" + app_name;
        if (parentCode != "") {
            domId += "_" + parentCode;
        }
        if (childCode != "") {
            domId += "_" + childCode;
        }
        obj.DOMId = domId + "InputId";
        obj.type = "text";
        obj.require = false;
        outPut.push(obj)
    });
    console.log(outPut);
    return outPut;
}
/**
 * gen html cac field kem domid
 * @param {danh sach cac field truyen vao} arrField 
 * @returns 
 */
function GenHtmlField(arrField) {
    var obj = new Object();
    arrField.forEach(element => {
        console.log(element);
        switch (element.type) {
            case "checkbox":
                break;
            case "radio":
                break;
            case "file":
                break;
            case "datetime":
                break;
            default:
                break;
        }
    });
    return obj;
}

// Jquery Dependency
$(document).ready(function() {

    $("input[data-type='currency']").on({
        keyup: function() {
            formatCurrency($(this));
        },
        blur: function() {
            formatCurrency($(this), "blur");
        }
    });

})


function formatNumber(n) {
    // format number 1000000 to 1,234,567
    return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}


function formatCurrency(input, blur) {
    // appends $ to value, validates decimal side
    // and puts cursor back in right position.

    // get input value
    var input_val = input.val();

    // don't validate empty input
    if (input_val === "") { return; }

    // original length
    var original_len = input_val.length;

    // initial caret position 
    var caret_pos = input.prop("selectionStart");

    // check for decimal
    if (input_val.indexOf(".") >= 0) {

        // get position of first decimal
        // this prevents multiple decimals from
        // being entered
        var decimal_pos = input_val.indexOf(".");

        // split number by decimal point
        var left_side = input_val.substring(0, decimal_pos);
        var right_side = input_val.substring(decimal_pos);

        // add commas to left side of number
        left_side = formatNumber(left_side);

        // validate right side
        right_side = formatNumber(right_side);

        // On blur make sure 2 numbers after decimal
        if (blur === "blur") {
            right_side += "00";
        }

        // Limit decimal to only 2 digits
        right_side = right_side.substring(0, 2);

        // join number by .
        // input_val = "$" + left_side + "." + right_side  ;
        input_val = left_side + "." + right_side + "VNĐ";

    } else {
        // no decimal entered
        // add commas to number
        // remove all non-digits
        input_val = formatNumber(input_val);
        // input_val = "$"+input_val;
        input_val = input_val + "VNĐ";

        // final formatting
        if (blur === "blur") {
            input_val += ".00";
        }
    }

    // send updated string to input
    input.val(input_val);

    // put caret back in the right position
    var updated_len = input_val.length;
    caret_pos = updated_len - original_len + caret_pos;
    input[0].setSelectionRange(caret_pos, caret_pos);
}


// Boolean Check in Viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    var inViewport = (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
    if (inViewport == false) {;
        return true;
    } else {
        return false;
    }
}