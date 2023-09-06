$(document).ready(function() {


})


class TaskHandlerEvent {


    constructor() {



    }



}

class InputValidation {
    Elements = []
    Elements_number = []
    Elements_mail = []
    constructor(FormId) {
        this.formId = FormId;
        var required_len = $(".mps_required").length;
        var elements = []
        if (required_len > 0) {
            $("#" + FormId).find(".mps_required").each(function() {

                elements.push($(this));

            })
            this.Elements = elements;
        }
        var number_len = $("[type=number]").length;
        var elements = []
        if (number_len > 0) {
            $("#" + FormId).find("[type=number]").each(function() {

                elements.push($(this));

            })
            this.Elements_number = elements;
        }
        var mail_len = $("[mpstype= mail]").length;
        var elements = []
        if (mail_len > 0) {
            $("#" + FormId).find("[mpstype= mail]").each(function() {

                elements.push($(this));

            })
            this.Elements_mail = elements;
        }
    }
    removeAllWhiteSpace(){
        var is_success = true;
        try{
            $("#" + this.formId).find("input").each(function() {
                if ($(this).val() != undefined || $(this).val() != 'undefined'){
                    $(this).val($(this).val().trim())
                }
            })

        }
        catch(err){
            is_success = false
        }
        return is_success
    }
    validateRequired() {
        if (!this.removeAllWhiteSpace())
        {
            // toastr.warning("Xóa khoảng trắng lỗi!");
            // return false;
        }
        var is_has_invalid = false;
        is_has_invalid = this.validateRangeDate();
        if (this.Elements.length > 0) {
            this.Elements.forEach(element => {
                var title = element.parent("div").find("label").html();
                var div_parent = element.parent("div");
                div_parent.find(".invalid-feedback").remove();
                div_parent.find(".valid-feedback").remove();
                if (element.val() == "" || element.val() == null || element.val() == undefined) {
                    if (element.is(":visible")) {
                        element.addClass("is-invalid").removeClass("is-valid");
                        // var invalid_txt = `
                        // <div class="invalid-feedback">
                        // <b>${title}</b> yêu cầu điền đầy đủ
                        // </div>`;

                        // div_parent.append(invalid_txt);
                        is_has_invalid = true;
                    }


                } else {
                    element.removeClass("is-invalid").addClass("is-valid");
                    // var valid_txt = `
                    // <div class="valid-feedback">
                    // <b>${title}</b> ok!
                    // </div>`;

                    // div_parent.append(valid_txt);
                }
            });
        }

        return is_has_invalid;
    }
    validateNumber() {
        var is_has_invalid = false;
        if (this.Elements_number.length > 0) {
            this.Elements_number.forEach(element => {
                if ($(element).val() != ""
                && ($(element).val().includes("-")
                || $(element).val().includes(".")
                || $(element).val().includes(",")
                || parseInt($(element).val()) != $(element).val())){
                    element.addClass("is-invalid").removeClass("is-valid");
                    is_has_invalid = true;
                }
            })
        }

        return is_has_invalid;
    }
    validateMail() {
        var is_has_invalid = false;
        var regExp = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (this.Elements_mail.length > 0) {
            this.Elements_mail.forEach(element => {
                if (!$(element).val().match(regExp)){
                    element.addClass("is-invalid").removeClass("is-valid");
                    is_has_invalid = true;
                }
            })
        }

        return is_has_invalid;
    }
    validateRangeDate() {
        var is_has_date_invalid = false;
        var start_date = $("#" + this.formId).find("[name=start_date]");
        var end_date = $("#" + this.formId).find("[name=end_date]");
        var expriry_date = $("#" + this.formId).find("[name=expriry_date]");
        if (start_date.length > 0) {
            var momentA = moment(start_date.val(), "DD/MM/YYYY");

            if (end_date.length > 0) {

                var momentB = moment(end_date.val(), "DD/MM/YYYY");
                if (momentA > momentB) {
                    toastr.error('Thời gian bắt đầu lớn hơn thời gian kết thúc');
                    is_has_date_invalid = true;
                }
            }
            if (expriry_date.length > 0) {

                var momentB = moment(expriry_date.val(), "DD/MM/YYYY");
                if (momentA > momentB) {
                    toastr.error('Thời gian bắt đầu lớn hơn thời gian kết thúc');
                    is_has_date_invalid = true;
                }
            }
        }
        return is_has_date_invalid;

    }
    validateRequiredNotice() {
        var is_has_invalid = false;
        if (this.Elements.length > 0) {

            this.Elements.forEach(element => {
                var title = element.parent("div").find("label").html();
                var div_parent = element.parent("div");
                div_parent.find(".invalid-feedback").remove();
                div_parent.find(".valid-feedback").remove();
                element.addClass("is-invalid").removeClass("is-valid");
                var invalid_txt = `
                    <div class="invalid-feedback">
                    Vui lòng điền <b>${title}</b>
                    </div>`;
                div_parent.append(invalid_txt);
            });
        }
        return is_has_invalid;
    }


}