$(document).ready(function() {



    // GetZIndex();
    DatePicker();
    $('.modal').on('click', '[data-dismiss="modal"]', function(e) { e.stopPropagation(); });
    // $('.modal').modal({ backdrop: 'static', keyboard: true })
    
    $.toastDefaults = {

        // top-left, top-right, bottom-left, bottom-right, top-center, and bottom-center
        position: 'bottom-center',

        // is dismissable?
        dismissible: true,

        // is stackable?
        stackable: true,

        // pause delay on hover
        pauseDelayOnHover: true,

        // additional CSS Classes
        style: {
            toast: '',
            info: '',
            success: '',
            warning: '',
            error: '',
        }

    };
    $(document).on('hidden.bs.toast', '.toast', function(e) {
        $(this).remove();
    });
    // jQuery.expr[':'].icontains = function(a, i, m) {
    //     return jQuery(a).text().toUpperCase()
    //         .indexOf(m[3].toUpperCase()) >= 0;
    // };
    $.expr[':'].icontains = $.expr.createPseudo(function(text) {
        // alert("zo day " + text)
        return function(e) {
            var text_search = $(e).text().toUpperCase().indexOf(text.toUpperCase()) >= 0;
            // alert("zo text_search " + text_search)

            return text_search;
        };
    });
    if ($("#cardAddCompany").length > 0) {
        localStorage.setItem('is_create_company_page', true);
    } else {
        localStorage.setItem('is_create_company_page', false);
    }
    // $("select").data("select2").on("results:message", function () {
    //     this.results.clear();
    //     this.dropdown._positionDropdown();
    // });
});


function CreateLoader(appendAreaId,length){
    const container =  $(`#${appendAreaId}`);
    const cardTemplate = $("#CardloaderTemplate");
    for (let i = 0; i < length; i++) {
    container.append(cardTemplate.clone(true).removeClass("d-none"));
    }
}
var crr_zIndex = 1072;

function GetZIndex() {
    $('.modal').on('shown.bs.modal', function() {
        crr_zIndex = crr_zIndex + 1;
        $(this).css('z-index', crr_zIndex + 1);
        toastr.success('Bạn đã mở form với ' + $(this).css('z-index'));
    });
    $('.modal').on('hidden.bs.modal', function() {
        crr_zIndex = 1072;
        // toastr.success('Bạn đã mở form với ' + $(this).css('z-index'));
    });

}

var notyf;


var csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return /^(GET|HEAD|OPTIONS|TRACE)$/.test(method);
}
$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        // toastr.info('Hệ thống bắt đầu xử lý thông tin. Vui lòng đợi trong giây lát!');
        $(".loader-desk").removeClass("d-none");
        // if not safe, set csrftoken
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
        // if (settings.type == "POST" || settings.type == "PATCH") {
        //     toastr.info('Hệ thống bắt đầu xử lý thông tin. Vui lòng đợi trong giây lát!');
        // }
        // toast.info("Hệ thống bắt đầu xử lý thông tin");
        // alert("bạn có chắc muốn gửi thông tin");
    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
        //        if (jqXHR.status === 404) {
        //            alert("Element not found.");
        //        } else if (jqXHR.status === 401) {
        //            localStorage.removeItem(tokenKey);
        //            if (!itemConfirmExit) itemConfirmExit = $.confirm({
        //                type: 'red',
        //                title: '<i class="fa fa-warning fa-lg text-red"> Thông báo',
        //                content: 'Phiên đăng nhập kết thúc!',
        //                buttons: {
        //                    somethingElse: {
        //                        text: 'Đăng nhập lại',
        //                        btnClass: 'btn-blue',
        //                        keys: ['enter', 'shift'],
        //                        action: function () {
        //                            location.href = '/?ReturnUrl=' + window.location.pathname;
        //                        }
        //                    }
        //                }
        //            });
        //        } else
        if (jqXHR.status === 403) {
            toastr.warning('Bạn không có quyền thực hiện thao tác này!');
            $(".modal").modal("hide");
        }


        //         else if (jqXHR.status === 409) {
        //            RemoveNotice();
        //            localStorage.removeItem(tokenKey);
        //            location.href = '/err/SignInOtherPlace/?ReturnUrl=' + window.location.pathname;
        //        } else if (jqXHR.status === 400) {
        //            console.log(jqXHR);
        //            var mess = jqXHR.responseJSON;
        //            toastr.warning(mess, "Thông báo");
        //        }
    },
    complete: function(jqXHR, textStatus, errorThrown) {

        if (jqXHR.status === 201) {
            if (this.url.includes("/api/v1/mainmanagement/company/all/") && this.type == "POST") {
                // toastr.warning(this.url);
                var is_create_company_page = localStorage.getItem('is_create_company_page');
                if (is_create_company_page == "true" || is_create_company_page == true) {
                    localStorage.setItem('is_create_company_page', false);
                    location.reload();
                } else if (is_create_company_page == undefined) {
                    localStorage.setItem('is_create_company_page', true);
                }
            }

        }

        console.log(jqXHR);
        var mess = "";
        $(".loader-desk").addClass("d-none");
        // toastr.info('Hệ thống đã xử lý xong!');
        if (jqXHR.status === 403) {
            toastr.warning('Bạn không có quyền thực hiện thao tác này!');
            $(".modal").modal("hide");
        }

    },


});

function cleanObject(obj) {
    for (var propName in obj) {
        if (
            obj[propName] === null ||
            obj[propName] === undefined ||
            obj[propName] === "null"
        ) {
            obj[propName] = "";
        }
    }
    return obj;
}

// Jquery Dependency
$(document).ready(function() {

        $("input[data-type='currency']").on({
            keyup: function() {
                // formatCurrency($(this));
                var recommened_currency = [];
                $(this).autocomplete({
                    source: [],
                });
                var current_num = formatNumber($(this).val()).replaceAll(',', '');
                var current_currency = formatNumber($(this).val());
                $(this).val(current_currency);
                recommened_currency.push(formatCurrencyWithString(current_num + "0"))
                recommened_currency.push(formatCurrencyWithString(current_num + "00"))
                recommened_currency.push(formatCurrencyWithString(current_num + "000"))
                recommened_currency.push(formatCurrencyWithString(current_num + "0000"))
                recommened_currency.push(formatCurrencyWithString(current_num + "00000"))
                recommened_currency.push(formatCurrencyWithString(current_num + "000000"))
                    // autocomplete(document.getElementById(this.id), recommened_currency)
                    // $("#costSpendingSpendingManagementCreateModalInputId").autocomplete({
                    //     source: recommened_currency
                    // });
                $(this).autocomplete({
                    source: recommened_currency
                });
            },
            blur: function() {
                formatCurrency($(this), "blur");
            }
        });

    })
    // income_money_tien_mat_crr_month

function formatNumber(n) {
    // format number 1000000 to 1,234,567
    // if (n.indexOf(".") >= 0) {

    //     // get position of first decimal
    //     // this prevents multiple decimals from
    //     // being entered
    //     var decimal_pos = n.indexOf(".");

    //     // split number by decimal point
    //     var left_side = n.substring(0, decimal_pos);
    //     var right_side = n.substring(decimal_pos);

    //     // add commas to left side of number
    //     left_side = formatNumber(left_side);

    //     // validate right side
    //     right_side = formatNumber(right_side);

    //     // On blur make sure 2 numbers after decimal
    //     if (blur === "blur") {
    //         right_side += "00";
    //     }

    //     // Limit decimal to only 2 digits
    //     right_side = right_side.substring(0, 2);

    //     // join number by .
    //     // n = "$" + left_side + "." + right_side  ;
    //     // n = left_side + "." + right_side + donvi;

    // }
    if (n[0] == "-") {

        return "-" + n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    } else {
        return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")

    }
}

function formatCurrency(input, blur) {
    // appends $ to value, validates decimal side
    // and puts cursor back in right position.
    var donvi = " VNĐ"
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
            // right_side += "00";
        }

        // Limit decimal to only 2 digits
        right_side = right_side.substring(0, 2);

        // join number by .
        // input_val = "$" + left_side + "." + right_side  ;
        // input_val = left_side + "." + right_side + donvi;
        input_val = left_side + donvi;

    } else {
        // no decimal entered
        // add commas to number
        // remove all non-digits
        input_val = formatNumber(input_val);
        input_val_number = formatNumber(input_val);
        // input_val = "$"+input_val;
        input_val = input_val_number + donvi;

        // final formatting
        if (blur === "blur") {
            // input_val_number += ".00";
            input_val = input_val_number + donvi;

        }
    }

    // send updated string to input
    input.val(input_val);

    // put caret back in the right position
    var updated_len = input_val.length;
    caret_pos = updated_len - original_len + caret_pos;
    input[0].setSelectionRange(caret_pos, caret_pos);
}

function ShowAlert(status, mess) {
    //$('.alert').alert("close");
    $(".alertTemplate")
        .clone()
        .addClass("show currentAlert  alert-" + status)
        .removeClass("alertTemplate")
        .removeClass("d-none")
        .append(" <strong>Thông báo!</strong> " + mess)
        .appendTo("#alertplace");
    setTimeout(function() {
        $(".currentAlert").alert("close");
    }, 3000);
}

function formatCurrencyWithString(currency_str) {
    // appends $ to value, validates decimal side
    // and puts cursor back in right position.
    var donvi = " VNĐ"
        // get input value
    var input_val = currency_str;

    // don't validate empty input
    if (input_val === "") { return; }

    // original length
    var original_len = input_val.length;

    input_val = formatNumber(input_val);
    input_val_number = formatNumber(input_val);
    // input_val = "$"+input_val;
    input_val = input_val_number + donvi;

    return input_val;
    // send updated string to input
}

function ShowAlert(status, mess) {
    //$('.alert').alert("close");
    $(".alertTemplate")
        .clone()
        .addClass("show currentAlert  alert-" + status)
        .removeClass("alertTemplate")
        .removeClass("d-none")
        .append(" <strong>Thông báo!</strong> " + mess)
        .appendTo("#alertplace");
    setTimeout(function() {
        $(".currentAlert").alert("close");
    }, 3000);
}

function GetFormattedDate(time) {
    if (time == "") return "";
    var todayTime = new Date(time);
    var month = todayTime.getMonth() + 1;
    var day = todayTime.getDate();
    var year = todayTime.getFullYear();
    var sec = todayTime.getSeconds();
    var min = todayTime.getMinutes();
    var hour = todayTime.getHours();
    return (
        addZero(hour) +
        ":" +
        addZero(min) +
        ":" +
        addZero(sec) +
        " " +
        addZero(day) +
        "/" +
        addZero(month) +
        "/" +
        addZero(year)
    );
}
/**
 * YYYY-MM-DDThh:mm
 * @param {Date()} time 
 * @returns 
 */
function toDatePython(time) {
    if (time == "") return "";
    try {
        var month = time.getMonth() + 1;
        var day = time.getDate();
        var year = time.getFullYear();
        var sec = time.getSeconds();
        var min = time.getMinutes();
        var hour = time.getHours();
        return (

            addZero(year) +
            "-" +
            addZero(month) +
            "-" +
            addZero(day) +
            "T" +
            addZero(hour) +
            ":" +
            addZero(min)

        );
    } catch (error) {
        console.log(error);
        return time;
        // expected output: ReferenceError: nonExistentFunction is not defined
        // Note - error messages will vary depending on browser
    }
}

/**
 * YYYY-MM-DDThh:mm
 * @param {Date()} time 
 * @returns 
 */
function toDatePythonByStringTime(timeStr, format) {
    if (timeStr == "") return "";
    try {
        var time = new Date(moment(timeStr, format));
        var month = time.getMonth() + 1;
        var day = time.getDate();
        var year = time.getFullYear();
        var sec = time.getSeconds();
        var min = time.getMinutes();
        var hour = time.getHours();
        return (

            addZero(year) +
            "-" +
            addZero(month) +
            "-" +
            addZero(day) +
            "T" +
            addZero(hour) +
            ":" +
            addZero(min)

        );
    } catch (error) {
        console.log(error);
        return time;
        // expected output: ReferenceError: nonExistentFunction is not defined
        // Note - error messages will vary depending on browser
    }
}
function toOnlyDatePythonByStringTime(timeStr, format) {
    if (timeStr == "") return "";
    try {
        var time = new Date(moment(timeStr, format));
        var month = time.getMonth() + 1;
        var day = time.getDate();
        var year = time.getFullYear();
        var sec = time.getSeconds();
        var min = time.getMinutes();
        var hour = time.getHours();
        return (

            addZero(year) +
            "-" +
            addZero(month) +
            "-" +
            addZero(day)

        );
    } catch (error) {
        console.log(error);
        return time;
        // expected output: ReferenceError: nonExistentFunction is not defined
        // Note - error messages will vary depending on browser
    }
}

function GetDateOnly(time) {
    if (time == "") return "";
    var todayTime = new Date(time);
    var month = todayTime.getMonth() + 1;
    var day = todayTime.getDate();
    var year = todayTime.getFullYear();
    return addZero(day) + "/" + addZero(month) + "/" + addZero(year);
}

function GetDateOnly_V01(time) {
    if (time == "") return "";
    if (time.length < 8) {
        return time;
    }
    var todayTime = new Date(time);
    console.log(todayTime instanceof Date && !isNaN(todayTime))
    if (todayTime instanceof Date && !isNaN(todayTime)) {
        var month = todayTime.getMonth() + 1;
        var day = todayTime.getDate();
        var year = todayTime.getFullYear();
        return addZero(day) + "/" + addZero(month) + "/" + addZero(year);
    } else {
        return time;
    }
}

function GetDayMonthOnly(time) {
    if (time == "") return "";
    var todayTime = new Date(time);
    var month = todayTime.getMonth() + 1;
    var day = todayTime.getDate();
    var year = todayTime.getFullYear();
    return [addZero(day), addZero(month)];
}

function GetDateMMdd(time) {
    if (time == "") return "";
    var todayTime = new Date(time);
    var month = todayTime.getMonth() + 1;
    var day = todayTime.getDate();
    var year = todayTime.getFullYear();
    return addZero(month) + "/" + addZero(day) + "/" + addZero(year);
}

function addZero(num) {
    if (num < 10) {
        return "0" + num;
    } else {
        return num;
    }
}

function ValidatePassword(pass) {
    var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(pass);
}


function BindDataTable(arr_data, arr_title, action, tbodyId) {
    var table = "";
    arr_data.forEach((e) => {
        table = "<tr>";
        arr_title.forEach((title) => {
            table += '<td class="text-wrap">' + e[title] + "</td>";
        });
        table += action + "</tr>";
        $("#" + tbodyId).append(table);
    });
}

function BindDataTableVer2(arr_data, arr_title, arr_action, tbodyId) {
    var table = "";
    arr_data.forEach((e) => {
        table = "<tr>";
        arr_title.forEach((title) => {
            table += '<td class="text-wrap">' + e[title] + "</td>";
        });
        table += BindActionButtonVer2(arr_action, e["stt"]) + "</tr>";
        $("#" + tbodyId).append(table);
    });
}
/*
ver3 cập nhật auto sinh stt
*/
function BindDataTableVer3(arr_data, arr_title, arr_action, tbodyId) {
    var table = "";
    var i = 1;
    $("#" + tbodyId).html("");
    arr_data.forEach((e) => {
        table = "<tr>";
        table += '<td class="text-wrap">' + i + "</td>";
        arr_title.forEach((title) => {
            table += '<td class="text-wrap">' + e[title] + "</td>";
        });
        table += BindActionButtonVer2(arr_action, e["uuid"]) + "</tr>";
        $("#" + tbodyId).append(table);
        i++;
    });
}
/*
ver4 kết hợp với BindActionButtonVer3 để sinh ra tổ hợp button hành động theo user
- bổ sung arr_views, ẩn hiển button theo quyền truy cập đến views
*/
function BindDataTableVer4(
    arr_data,
    arr_title,
    arr_action,
    tbodyId,
    arr_views,
    request_user,
) {
    var table = "";
    var i = 1;
    $("#" + tbodyId).html("");
    // if (arr_title.includes("__tb_choose__"))
    // var td_choose = arr_title.filter(title => {
    //     if (title == "__tb_choose__") {

    //         return '<td class="text-wrap"> chọn đi </td>';
    //     }
    // });
    arr_data.forEach((e) => {
        table = "<tr>";
        table += '<td class="text-center">' + i + "</td>";
        arr_title.forEach((title) => {
            if (title == "__tb_choose__") {
                table += '<td class="text-center"><input type="checkbox" uuid="' + e["uuid"] + '" class="form-check-input for-choose-multiple " id="txtChoose' + e["uuid"] + '"></td>';

            } else {

                table += '<td class="text-wrap">' + e[title] + "</td>";
            }

        });
        table +=
            BindActionButtonVer3(arr_action, e["uuid"], e, arr_views, request_user) +
            "</tr>";
        $("#" + tbodyId).append(table);
        i++;
    });
}

function BindActionButton(arr_action) {
    action_html =
        '<td><div class="dropdown">' +
        '        <button class="btn d-inline-flex align-items-center me-2 dropdown-toggle show"' +
        '                data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="true">' +
        '           <svg class="icon icon-xs" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">' +
        '               <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path></svg>' +
        "        </button>" +
        '        <div class="dropdown-menu dashboard-dropdown dropdown-menu-start mt-2 py-1 "' +
        '             data-popper-placement="bottom-start"' +
        '             style="position: absolute; left: 0px; top: 0px; margin: 0px; right: auto; bottom: auto; transform: translate(0px, 41px);z-index:99999">';
    arr_action.forEach((ac) => {
        action_html +=
            '            <a class="dropdown-item d-flex align-items-center" onclick="' +
            ac["func"] +
            '">' +
            '               &nbsp;<i title="' +
            ac["title"] +
            '" class="' +
            ac["icon"] +
            '" onclick="' +
            ac["func"] +
            '"></i>&nbsp;' +
            "                " +
            ac["title"] +
            " </a>";
    });
    action_html += "    </div>" + "    </div></td>";
    return action_html;
}

function BindActionButtonVer2(arr_action, Id) {
    action_html =
        '<td><div class="dropdown">' +
        '        <button class="btn d-inline-flex align-items-center me-2 dropdown-toggle show"' +
        '                data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="true">' +
        '           <svg class="icon icon-xs" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">' +
        '               <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path></svg>' +
        "        </button>" +
        '        <div class="dropdown-menu dashboard-dropdown dropdown-menu-start mt-2 py-1 "' +
        '             data-popper-placement="bottom-start"' +
        '             style="position: absolute; left: 0px; top: 0px; margin: 0px; right: auto; bottom: auto; transform: translate(0px, 41px);z-index:99999">';
    arr_action.forEach((ac) => {
        action_html +=
            '            <a class="dropdown-item d-flex align-items-center" uuid="' +
            Id +
            '" onclick="' +
            ac["func"] +
            "('" +
            Id +
            "')" +
            '">' +
            '               &nbsp;<i title="' +
            ac["title"] +
            '" class="' +
            ac["icon"] +
            '" onclick="' +
            ac["func"] +
            '"></i>&nbsp;' +
            "                " +
            ac["title"] +
            " </a>";
    });
    action_html += "    </div>" + "    </div></td>";
    return action_html;
}

function BindActionButtonVer3(
    arr_action,
    Id,
    currentRow,
    arr_views,
    request_user,
) {
    action_html =
        '<td><div class="dropdown">' +
        '        <button class="btn d-inline-flex align-items-center me-2 dropdown-toggle show"' +
        '                data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="true">' +
        '           <svg class="icon icon-xs" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">' +
        '               <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path></svg>' +
        "        </button>" +
        '        <div class="dropdown-menu dashboard-dropdown dropdown-menu-start mt-2 py-1 "' +
        '             data-popper-placement="bottom-start"' +
        '             style="position: absolute; left: 0px; top: 0px; margin: 0px; right: auto; bottom: auto; transform: translate(0px, 41px);z-index:99999">';
    arr_action.forEach((ac) => {
        console.log("field_checking", ac["field_checking"]);
        console.log("currentRow", currentRow);
        console.log(
            'currentRow[ac["field_checking"]]',
            currentRow[ac["field_checking"]],
        );
        console.log(
            "ket qua",
            currentRow[ac["field_checking"]] == ac["value_is_true"],
        );
        if (
            ((
                    ac["isCheck"] == true &&
                    currentRow[ac["field_checking"]] == ac["value_is_true"]) ||
                ac["isCheck"] == false) &&
            (arr_views.includes(ac["views_name"]) ||
                (currentRow["created_by__username"] == request_user &&
                    ac["allowSelfChecking"]) || ac['independent_views'] == true
            )
        ) {
            action_html +=
                '            <a class="dropdown-item d-flex align-items-center" uuid="' +
                Id +
                '" onclick="' +
                ac["func"] +
                "('" +
                Id +
                "')" +
                '">' +
                '               &nbsp;<i title="' +
                ac["title"] +
                '" class="' +
                ac["icon"] +
                '" onclick="' +
                ac["func"] +
                '"></i>&nbsp;' +
                "                " +
                ac["title"] +
                " </a>";
        }
    });
    action_html += "    </div>" + "    </div></td>";
    return action_html;
}

function BindActionButtonVer4(
    arr_action,
    Id,
    currentRow,
    arr_views = null,
    request_user,
) {
    if (arr_action.length == 0) {
        return "";
    }
    action_html = `
    <td>
        <div class="btn-group mb-2 mr-2">
            <button type="button" class="btn  btn-outline-dark dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="sr-only"></span></button>
            <div class="dropdown-menu">
    `;
//     action_html =  `      
    
//     <td><div class="btn-group mb-2 mr-2">
//                  <button class="btn btn-datatable btn-icon btn-transparent-dark me-2"><i data-feather="more-vertical"  data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i></button>
//                  <div class="dropdown-menu">
//     `
//     action_html =  `      
//     <td>
//     <button class="btn btn-datatable btn-icon btn-transparent-dark me-2"><i data-feather="more-vertical"></i></button>
//     <button class="btn btn-datatable btn-icon btn-transparent-dark"><i data-feather="trash-2"></i></button>
// </td>
//     `
//     return action_html;
    arr_action.forEach((ac) => {
        console.log("field_checking", ac["field_checking"]);
        console.log("currentRow", currentRow);
        console.log(
            'currentRow[ac["field_checking"]]',
            currentRow[ac["field_checking"]],
        );
        console.log(
            "ket qua",
            currentRow[ac["field_checking"]] == ac["value_is_true"],
        );
        if ((!ac["value_is_true"] || ac["value_is_true"] == "false") && !currentRow.hasOwnProperty(ac["field_checking"])) {
            currentRow[ac["field_checking"]] = false;
        }
        if (arr_views != null && arr_views.length > 0) {
            if (
                ((
                    ac["isCheck"] == true && // neu check
                    currentRow[ac["field_checking"]] == ac["value_is_true"]) || // thi phai co gia tri tren ban ghi thoa man thi tra ve true
                    ac["isCheck"] == false
                ) 
                // &&
                //  // neu khong check
                // (
                //     arr_views.includes(ac["views_name"]) 
                //     || // co quyen su dung action
                //     (
                //         currentRow["created_by__username"] == request_user && //hoac la nguoi tao ban ghi va allowSelfChecking =true
                //         ac["allowSelfChecking"]
                //     ) 
                //     ||
                //     ac['independent_views'] == true // hoac action nay khong phu thuoc vao views
                // )
            ) {
                action_html +=
                    '            <a class="dropdown-item d-flex align-items-center" uuid="' +
                    Id +
                    '" onclick="' +
                    ac["func"] +
                    "('" +
                    Id +
                    "')" +
                    '">' +
                    '               &nbsp;<i title="' +
                    ac["title"] +
                    '" class="' +
                    ac["icon"] +
                    '" onclick="' +
                    ac["func"] +
                    '"></i>&nbsp;' +
                    "                " +
                    ac["title"] +
                    " </a>";
            }
        }
        // neu list view = null 
        else {
            if (
                ((
                        ac["isCheck"] == true &&
                        currentRow[ac["field_checking"]] == ac["value_is_true"]) ||
                    ac["isCheck"] == false
                ) 
                // &&
                // (
                //     (currentRow["created_by__username"] == request_user &&
                //         ac["allowSelfChecking"]) || ac['independent_views'] == true
                // )
            ) {
                action_html +=
                    '            <a class="dropdown-item d-flex align-items-center" uuid="' +
                    Id +
                    '" onclick="' +
                    ac["func"] +
                    "('" +
                    Id +
                    "')" +
                    '">' +
                    '               &nbsp;<i title="' +
                    ac["title"] +
                    '" class="' +
                    ac["icon"] +
                    '" onclick="' +
                    ac["func"] +
                    '"></i>&nbsp;' +
                    "                " +
                    ac["title"] +
                    " </a>";
            }

        }
    });
    action_html += ` </div>
    </div></td>`;
    return action_html;
}

function BindActionButtonVer5(
    arr_action,
    Id,
    currentRow,
    arr_views = null,
    request_user,
) {
    if (arr_action.length == 0) {
        return "";
    }
    action_html = `
    <td>
        <div class="btn-group mb-2 mr-2">
            <button type="button" class="btn  btn-outline-dark dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="sr-only"><i class="fas fa-ellipsis-h"></i></span></button>
            <div class="dropdown-menu">
    `;
    arr_action.forEach((ac) => {
        console.log("field_checking", ac["field_checking"]);
        console.log("currentRow", currentRow);
        console.log(
            'currentRow[ac["field_checking"]]',
            currentRow[ac["field_checking"]],
        );
        console.log(
            "ket qua",
            currentRow[ac["field_checking"]] == ac["value_is_true"],
        );
        if ((!ac["value_is_true"] || ac["value_is_true"] == "false") && !currentRow.hasOwnProperty(ac["field_checking"])) {
            currentRow[ac["field_checking"]] = false;
        }
        if (arr_views != null && arr_views.length > 0) {
            if (
                ((
                        ac["isCheck"] == true && // neu check
                        currentRow[ac["field_checking"]] == ac["value_is_true"]) || // thi phai co gia tri tren ban ghi thoa man thi tra ve true
                    ac["isCheck"] == false) && // neu khong check
                (arr_views.includes(ac["views_name"]) || // co quyen su dung action
                    (currentRow["created_by__username"] == request_user && //hoac la nguoi tao ban ghi va allowSelfChecking =true
                        ac["allowSelfChecking"]) ||
                    ac['independent_views'] == true // hoac action nay khong phu thuoc vao views
                )
            ) {
                action_html +=
                    '            <a class="dropdown-item d-flex align-items-center" uuid="' +
                    Id +
                    '" onclick="' +
                    ac["func"] +
                    "('" +
                    Id +
                    "')" +
                    '">' +
                    '               &nbsp;<i title="' +
                    ac["title"] +
                    '" class="' +
                    ac["icon"] +
                    '" onclick="' +
                    ac["func"] +
                    '"></i>&nbsp;' +
                    "                " +
                    ac["title"] +
                    " </a>";
            }
        }
        // neu list view = null 
        else {
            if (
                ((
                        ac["isCheck"] == true &&
                        currentRow[ac["field_checking"]] == ac["value_is_true"]) ||
                    ac["isCheck"] == false) &&
                (
                    (currentRow["created_by__username"] == request_user &&
                        ac["allowSelfChecking"]) || ac['independent_views'] == true
                )
            ) {
                action_html +=
                    '            <a class="dropdown-item d-flex align-items-center" uuid="' +
                    Id +
                    '" onclick="' +
                    ac["func"] +
                    "('" +
                    Id +
                    "')" +
                    '">' +
                    '               &nbsp;<i title="' +
                    ac["title"] +
                    '" class="' +
                    ac["icon"] +
                    '" onclick="' +
                    ac["func"] +
                    '"></i>&nbsp;' +
                    "                " +
                    ac["title"] +
                    " </a>";
            }

        }
    });
    action_html += ` </div>
    </div></td>`;
    return action_html;
}

function BindActionButtonVer6(
    arr_action,
    Id,
    currentRow,
    arr_views = null,
    request_user,
) {
    if (arr_action.length == 0) {
        return "";
    }
    var IdButton = `#${Id}ActionButton`
    arr_action.forEach((ac) => {
        action_html = ""
        console.log("field_checking", ac["field_checking"]);
        console.log("currentRow", currentRow);
        console.log(
            'currentRow[ac["field_checking"]]',
            currentRow[ac["field_checking"]],
        );
        console.log(
            "ket qua",
            currentRow[ac["field_checking"]] == ac["value_is_true"],
        );
        if ((!ac["value_is_true"] || ac["value_is_true"] == "false") && !currentRow.hasOwnProperty(ac["field_checking"])) {
            currentRow[ac["field_checking"]] = false;
        }
        if (arr_views != null && arr_views.length > 0) {
            if (
                ((
                        ac["isCheck"] == true && // neu check
                        currentRow[ac["field_checking"]] == ac["value_is_true"]) || // thi phai co gia tri tren ban ghi thoa man thi tra ve true
                    ac["isCheck"] == false) && // neu khong check
                (arr_views.includes(ac["views_name"]) || // co quyen su dung action
                    (currentRow["created_by__username"] == request_user && //hoac la nguoi tao ban ghi va allowSelfChecking =true
                        ac["allowSelfChecking"]) ||
                    ac['independent_views'] == true // hoac action nay khong phu thuoc vao views
                )
            ) {
                action_html +=
                    '            <a class="dropdown-item d-flex align-items-center" uuid="' +
                    Id +
                    '" onclick="' +
                    ac["func"] +
                    "('" +
                    Id +
                    "')" +
                    '">' +
                    '               &nbsp;<i title="' +
                    ac["title"] +
                    '" class="' +
                    ac["icon"] +
                    '" onclick="' +
                    ac["func"] +
                    '"></i>&nbsp;' +
                    "                " +
                    ac["title"] +
                    " </a>";
            }
        }
        // neu list view = null 
        else {
            if (
                ((
                        ac["isCheck"] == true &&
                        currentRow[ac["field_checking"]] == ac["value_is_true"]) ||
                    ac["isCheck"] == false) &&
                (
                    (currentRow["created_by__username"] == request_user &&
                        ac["allowSelfChecking"]) || ac['independent_views'] == true
                )
            ) {
                action_html +=
                    '            <a class="dropdown-item d-flex align-items-center" uuid="' +
                    Id +
                    '" onclick="' +
                    ac["func"] +
                    "('" +
                    Id +
                    "')" +
                    '">' +
                    '               &nbsp;<i title="' +
                    ac["title"] +
                    '" class="' +
                    ac["icon"] +
                    '" onclick="' +
                    ac["func"] +
                    '"></i>&nbsp;' +
                    "                " +
                    ac["title"] +
                    " </a>";
            }

        }
        console.log(IdButton)
        $(IdButton).append(action_html)

    });

}

function copyToClipboard(elementId, $this) {

    // Create a "hidden" input
    var aux = document.createElement("input");

    // Assign it the value of the specified element
    aux.setAttribute("value", document.getElementById(elementId).getAttribute('value'));

    // Append it to the body
    document.body.appendChild(aux);

    // Highlight its content
    aux.select();

    // Copy the highlighted text
    document.execCommand("copy");

    // Remove it from the body
    document.body.removeChild(aux);
    $this.title = "Đã sao chép";
    $this.setAttribute("style", "color:green;");
    toastr.info("Đã sao chép")

}

function copyToClipboardByThis($this) {

    // Create a "hidden" input
    var aux = document.createElement("input");

    // Assign it the value of the specified element
    aux.setAttribute("value", $this.getAttribute('value'));

    // Append it to the body
    document.body.appendChild(aux);

    // Highlight its content
    aux.select();

    // Copy the highlighted text
    document.execCommand("copy");

    // Remove it from the body
    document.body.removeChild(aux);
    $this.title = "Đã sao chép";
    $this.setAttribute("style", "color:green;");
    toastr.info("Đã sao chép")

}

function OnDelete(uuid) {
    $.confirm({
        icon: "fa fa-smile-o",
        title: "XÓA!",
        content: "Bạn có chắc muốn xóa ?!",
        theme: "modern",
        closeIcon: true,
        animation: "scale",
        type: "blue",
        buttons: {
            confirm: {
                text: "Đồng ý",
                btnClass: "btn-blue",
                action: function() {
                    toastr.success("Xóa thành công!");
                },
            },
            cancel: {
                text: "Hủy",
            },
        },
    });
}

function ShowFile(source, id) {
    $(id).attr("src", source);
}


function GenField(arrId, parentCode, childCode) {
    var outPut = [];
    arrId.forEach(dom => {
        var obj = new Object();
        obj.Id = dom;
        obj.DOMId = dom + "_" + parentCode + "_" + childCode + "Id";
        obj.type = "text";
        obj.require = false;
        outPut.push(obj)
    });
    console.log(outPut);
}
// import Datepicker from 'vanillajs-datepicker/Datepicker';

function DatePicker() {
    const d = document;

    // Datepicker
    var datepickers = [].slice.call(d.querySelectorAll('[data-datepicker]'))
    var datepickersList = datepickers.map(function(el) {
        return new Datepicker(el, {
            buttonClass: 'btn',
            format: 'dd/mm/yyyy'
        });
    });
    var datepickersYear = [].slice.call(d.querySelectorAll('[data-datepicker-year]'))
    var datepickersListYear = datepickersYear.map(function(el) {
        return new Datepicker(el, {
            buttonClass: 'btn',
            //            clearBtn:true,
            maxView: 2,
            pickLevel: 2,
            startView: 2,
            language: "vi",
            format: "yyyy"

        });
    })
    var datepickersMonth = [].slice.call(d.querySelectorAll('[data-datepicker-month]'))
    var datepickersListMonth = datepickersMonth.map(function(el) {
        return new Datepicker(el, {
            buttonClass: 'btn',
            //            clearBtn:true,
            maxView: 1,
            pickLevel: 1,
            startView: 1,
            language: "vi",
            format: "mm/yyyy"

        });
    })
}

/***
 * Xuất excel nhanh ở front-end,trang hiện tại
 */
function fnExcelExport(tableId, lengthRemove) {
    var table_temp = $(id).clone();
    table_temp.find("thead").find("tr").attr("bgcolor", "#87AFC6");

    // xóa cột cuối trên header theo {lengthRemove}
    for (var i = 0; i < lengthRemove; i++) {
        table_temp.find("th").last().remove()
    }
    // xóa cột cuối từng dòng theo {lengthRemove}
    table_temp.find("tr").each(function() {
        for (var i = 0; i < lengthRemove; i++) {
            $(this).find("td").last().remove()
        }

    })
    var tab_text = table_temp.prop('outerHTML');
    var textRange;
    var j = 0;

    //    tab_text=tab_text+"</table>";
    tab_text = tab_text.replace(/<A[^>]*>|<\/A>/g, ""); //remove if u want links in your table
    tab_text = tab_text.replace(/<img[^>]*>/gi, ""); // remove if u want images in your table
    tab_text = tab_text.replace(/<input[^>]*>|<\/input>/gi, ""); // reomves input params

    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) // If Internet Explorer
    {
        txtArea1.document.open("txt/html", "replace");
        txtArea1.document.write(tab_text);
        txtArea1.document.close();
        txtArea1.focus();
        sa = txtArea1.document.execCommand("SaveAs", true, "Say Thanks to Sumit.xls");
    } else //other browser not tested on IE 11
        sa = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(tab_text));

    return (sa);
}

// check viewport
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



function highlight(text, BodyId) {

    // var index = innerHTML.indexOf(text);
    // if (index >= 0) {
    //     innerHTML = innerHTML.substring(0, index) + "<span style='background-color: yellow;'>" + innerHTML.substring(index, index + text.length) + "</span>" + innerHTML.substring(index + text.length);
    //     inputText.innerHTML = innerHTML;
    // }
    // var a1 = jQuery.expr[':'].contains = function(a, i, m) {
    //     return jQuery(a).text().toUpperCase()
    //         .indexOf(m[3].toUpperCase()) >= 0;
    // };
    // console.log(a1)
    // var a2 = jQuery.expr[':'].contains = function(a, i, m) {
    //     return jQuery(a).text().toUpperCase()
    //         .indexOf(m[3].toUpperCase()) >= 0;
    // };
    // console.log(a2)
    // $.expr[":"].xcontains = $.expr.createPseudo(function(arg) {
    //     arg = arg.replace(/([\.\+\?\^\$\\])/g, '\$1').replace(/[*%]/g, '.*');
    //     var prex = new RegExp(arg, 'i');
    //     return function(elem) {
    //         return jQuery(elem).text().search(prex) >= 0;
    //     };
    // });
    ClearHighlight();
    $(BodyId).find('*:icontains("' + text + '")').each(function() {
        // $('*:icontains("' + text + '")').each(function() {
        if ($(this).children().length < 1) {
            // alert(text);
            // var searchMask = "is";
            var regEx = new RegExp(text, "ig");
            // alert("regEx: " + regEx);
            var match_text = regEx.exec($(this).text());
            var replaceMask = '<span containsStringTNVLookingFor="true">' + match_text + '</span>';
            // alert("match_text: " + match_text);
            // var result = 'This iS IIS'.replace(regEx, replaceMask);
            $(this).html(
                $(this).text().replace(
                    regEx, replaceMask
                )
            )
        }
    });
    $('*[containsStringTNVLookingFor]').css("background-color", "yellow");

}

function ClearHighlight() {
    $('[containsStringTNVLookingFor]').each(function() {
        console.log($(this).text());
        var original_text = $(this).text();
        var parent_ele = $(this).parent();
        if (parent_ele.length > 0) {
            // alert(text);
            // var searchMask = "is";
            var regEx = new RegExp(/<span containsStringTNVLookingFor="true">(.*?)<\/span>/, "ig");
            // alert("regEx: " + regEx);
            // var match_text = regEx.exec(parent_ele.text());
            // alert(match_text);
            // var replaceMask = '<span containsStringTNVLookingFor="true">' + match_text + '</span>';
            // alert("match_text: " + match_text);
            // var result = 'This iS IIS'.replace(regEx, replaceMask);
            $(parent_ele).html(
                $(parent_ele).text().replace(
                    regEx, original_text
                )
            )
        }
    });
}

// function connect() {
//     // var user_name = 'tnv';
//     var user_name = $("#dropdown-user-details-user-uuid-d-none").html();
//     // var roomName = 'phongit';
//     // noticeSocket = new WebSocket("ws://" + window.location.host + "/ws/notice-signal/" + roomName + "/");
//     var loc = window.location, new_uri;
    
//     if (loc.protocol === "https:") {
//         new_uri = "wss:";
//     } else {
//         new_uri = "ws:";
//     }
//     //    new_uri += "//" + loc.host;
//     //    new_uri += loc.pathname + "/to/ws";
//     if (noticeSocket == undefined || noticeSocket == null) {
//         noticeSocket = new WebSocket(new_uri += "//" + window.location.host + "/wss/user/" + user_name + "/notice/");

//         noticeSocket.onopen = function (e) {
//             console.log("Successfully connected to the WebSocket.");
//         }

//         noticeSocket.onclose = function (e) {
//             console.log("WebSocket connection closed unexpectedly. Trying to reconnect in 2s...");
//             setTimeout(function () {
//                 console.log("Reconnecting...");
//                 connect();
//             }, 2000);
//         };

//         noticeSocket.onmessage = function (e) {
//             const data = JSON.parse(e.data);
//             console.log(data);

//             switch (data.type) {
//                 // case "chat_message":
//                 //     chatLog.value += data.message + "\n";
//                 //     break;
//                 case "user_notice":
//                     toastr.info(data.content, data.title);
//                     var notice = `<a class="dropdown-item dropdown-notifications-item" href="` + data.link_connect + `" id="` + data.uuid_noti + `" title="` + data.title + `">
//                                     <div class="dropdown-notifications-item-icon bg-warning"><i data-feather="activity"></i></div>
//                                     <div class="dropdown-notifications-item-content">
//                                         <div class="dropdown-notifications-item-content-text text-wrap">` + data.content + `</div>
//                                         <div class="dropdown-notifications-item-content-details text-wrap">` + data.created_at + `</div>
//                                     </div>
//                                 </a>`;
//                     $('#drop-down-list-notifications').prepend(notice);

//                     var total_crr_noti = $('#navbarNotificationBadge').text();
//                     total_crr_noti = parseInt(total_crr_noti) + 1;
//                     $('#navbarNotificationBadge').text(total_crr_noti);

//                     if ($('#navbarNotificationBadge').hasClass('d-none') == true) {
//                         $("#navbarNotificationBadge").removeClass('d-none');
//                     }
//                     break;
//                 case "admin_notice":
//                     toastr.info(data.content, data.title);
//                     var notice = `<a class="dropdown-item dropdown-notifications-item" id="` + data.uuid_noti + `" title="` + data.title + `">
//                                     <div class="dropdown-notifications-item-icon bg-warning"><i data-feather="activity"></i></div>
//                                     <div class="dropdown-notifications-item-content">
//                                         <div class="dropdown-notifications-item-content-text text-wrap">` + data.content + `</div>
//                                         <div class="dropdown-notifications-item-content-details text-wrap">` + data.created_at + `</div>
//                                     </div>
//                                 </a>`;
//                     $('#drop-down-list-notifications').prepend(notice);

//                     var total_crr_noti = $('#navbarNotificationBadge').text();
//                     total_crr_noti = parseInt(total_crr_noti) + 1;
//                     $('#navbarNotificationBadge').text(total_crr_noti);

//                     if ($('#navbarNotificationBadge').hasClass('d-none') == true) {
//                         $("#navbarNotificationBadge").removeClass('d-none');
//                     }
//                     break;
//                 default:
//                     console.error("Unknown message type!");
//                     break;
//             }

//             // scroll 'chatLog' to the bottom
//             // chatLog.scrollTop = chatLog.scrollHeight;
//         };

//         noticeSocket.onerror = function (err) {
//             console.log("WebSocket encountered an error: " + err.message);
//             console.log("Closing the socket.");
//             noticeSocket.close();
//         }
//     }
// }

// let noticeSocket = null;

// $(document).ready(function() {
//     connect();
// })
