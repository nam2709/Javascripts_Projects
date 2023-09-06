$(document).ready(function() {

    // [màn hình đề xuất]Phiếu đánh giá tổng hợp 
    // SelectboxResultChanged("summarizingassessmentresultsSuggestionTaskS3SyntheticEditmodalsId", "average_score", "result");
    $('#spendingbygroupSpendingManagementCreatemodalsId').on('shown.bs.modal', function() {
        // RefreshField("spendingbygroupSpendingManagementCreatemodalsId", "cost", "cost");
        // DisabledColums(
        //     'spendingbygroupSpendingManagementCreateModalsFormId',
        //     'itempurchaseSpendingManagementcreateDataTableAddingId',
        //     'cost',
        //     true,
        // );
        ScoreFieldChangedEvent('spendingbygroupSpendingManagementCreatemodalsId',
            'itempurchaseSpendingManagementcreateDataTableAddingId',
            'cost',
            'amount',
            'cost-spendingbygroup-spendingmanagement-input',
            'sum'
        );

    });

    // khi xóa 1 bản ghi thì tính toán lại
    // $(".itempurchase-SpendingManagement-edit-DeleteRowBtnId").click(function() {
    //     SumScore('spendingbygroupSpendingManagementCreatemodalsId',
    //         'itempurchaseSpendingManagementcreateDataTableAddingId',
    //         'cost',
    //         'amount',
    //         'cost-spendingbygroup-spendingmanagement-input',
    //     );
    // })
    DiscountHandlerEventChanged(
        'spendingbygroupSpendingManagementCreatemodalsId',
        '.cost-spendingbygroup-spendingmanagement-input',
        '.money_to_pay-spendingbygroup-spendingmanagement-input',
        '.discount-spendingbygroup-spendingmanagement-input',
        'discount_type',
        '.ship_tax-spendingbygroup-spendingmanagement-input',
    );
    // DiscountHandler(
    //     'spendingbygroupSpendingManagementCreatemodalsId',
    //     'cost-spendingbygroup-spendingmanagement-input',
    //     'money_to_pay',
    //     'discount',
    //     'discount_type',
    //     'ship_tax',
    // );
    // [màn hình đề xuất]Phiếu đánh giá tổng hợp 

    // SelectboxResultChanged("personalsuggestionevaluatepaperSuggestionTaskS3SyntheticEditmodalsId", "total_score", "result");

    // $('#personalsuggestionevaluatepaperSuggestionTaskS3SyntheticEditmodalsId').on('shown.bs.modal', function() {
    //     DisabledColums(
    //         'personalsuggestionevaluatepaperSuggestionTaskS3SyntheticEditmodalsId',
    //         'personalsuggestioncontentresultSuggestionTaskS3SyntheticeditDataTableAddingId',
    //         'max',
    //         true,
    //     )
    //     RefreshField("personalsuggestionevaluatepaperSuggestionTaskS3SyntheticEditmodalsId", "total_score", "result");
    //     ScoreFieldChangedEvent('personalsuggestionevaluatepaperSuggestionTaskS3SyntheticEditmodalsId',
    //         'personalsuggestioncontentresultSuggestionTaskS3SyntheticeditDataTableAddingId',
    //         'score',
    //         'total_score',
    //         'sum',
    //     );

    // });
    // $('#summarizingassessmentresultsSuggestionTaskS3SyntheticEditmodalsId').on('hidden.bs.modal', function() {
    // toastr.success('Bạn đã đóng form');
    // });
    // $(".name-logpropertyeditedofsuggestiontask-suggestiontasks3synthetic-inline-input").change(function() {

    //     toastr.success('bị thay đổi');

    // })
    SelectTypeOfUsed();
});

// giá trị selectbox theo điểm 
var score = 70;
var Config_Condition = [

    {
        'name': 'ok',
        'allow_code': [
            'ok',
            'fix',

        ],
    },
    {
        'name': 'no',
        'allow_code': [
            'no',
        ],
    },
]



function RefreshField(FormId, ScoreFieldName, SelectboxTargetFieldClass) {
    var selectbox = null;
    $("#" + FormId).find("[name=" + SelectboxTargetFieldClass + "]").each(function() {

        var is_in_cell = $(this).find("table").length > 0;
        if (!is_in_cell) {
            selectbox = $(this);
        }

    });
    $("#" + FormId).find("[name=" + ScoreFieldName + "]").prop("disabled", false);
    selectbox.find('option').each(function() {
        $(this).prop('disabled', false);
    });
    $('#' + FormId).find(".modal-footer").find("[type=button]").each(function() {
        $(this).prop("disabled", false);
    });
}
// đăng ký sự kiện thay đổi khi thay đổi điểm
function ScoreFieldChangedEvent(FormId, TableId, NameOfScoreColumns, NameOfAmountColumns, TargetFieldClass, type) {
    $("#" + FormId).find("#" + TableId).find("[name=" + NameOfScoreColumns + "]").change(function() {
        if (type == "sum") {
            SumScore(FormId, TableId, NameOfScoreColumns, NameOfAmountColumns, TargetFieldClass);

        } else {
            AverageScore(FormId, TableId, NameOfScoreColumns, NameOfAmountColumns, TargetFieldClass);

        }
    })
    $("#" + FormId).find("#" + TableId).find("[name=" + NameOfAmountColumns + "]").change(function() {
        if (type == "sum") {
            SumScore(FormId, TableId, NameOfScoreColumns, NameOfAmountColumns, TargetFieldClass);

        } else {
            AverageScore(FormId, TableId, NameOfScoreColumns, NameOfAmountColumns, TargetFieldClass);

        }
    })

}

function DisabledColums(FormId, TableId, columnsName, isDisabled) {
    var table = $("#" + FormId).find("#" + TableId);
    table.find("[name=" + columnsName + "]").prop("disabled", isDisabled);
}
// xử lý sự kiện tính tổng sau khi chấm điểm

function AverageScore(FormId, TableId, NameOfScoreColumns, NameOfAmountColumns, TargetFieldClass) {
    var table = $("#" + FormId).find("#" + TableId);
    var score = 0; // điểm số
    var count = -1; // điểm số
    if (table != undefined) {
        table.find("tr").each(function() {
            var curr_tr = $(this);
            var columns_Scr = $(this).find("[name=" + NameOfScoreColumns + "]");
            try {
                var td_score_str = ($(this).find("[name=" + NameOfScoreColumns + "]").val());
                if (td_score_str != undefined) {
                    count++;
                }

                if (td_score_str != "" && td_score_str != undefined) {
                    var td_score = 0;
                    if (columns_Scr.attr("data-type") == "currency") {

                        td_score = formatNumber(td_score_str).replaceAll(",", "")
                        td_score = parseInt(td_score);
                    } else {
                        var td_score = parseInt(td_score_str);

                    }
                    if (!isNaN(td_score_str)) {

                        score += td_score;
                    }
                }


            } catch (error) {
                score += 0;
            }
            // $(this).find("tr").each(function() {

            // })
        })
    }
    var target = $("#" + FormId).find("." + TargetFieldClass);
    target.val((score / count).toFixed(2)).prop("disabled", true).change();
    if (target.attr("data-type") == "currency") {
        formatCurrency(target)
    }
}

function SumScore(FormId, TableId, NameOfScoreColumns, NameOfAmountColumns, TargetFieldClass) {
    var table = $("#" + FormId).find("#" + TableId);
    var score = 0; // điểm số
    var count = -1; // điểm số
    if (table != undefined) {

        table.find("tr").each(function() {
            var curr_tr = $(this);
            var columns_Scr = $(this).find("[name=" + NameOfScoreColumns + "]");

            try {
                var td_score_str = ($(this).find("[name=" + NameOfScoreColumns + "]").val());
                var td_amount_str = ($(this).find("[name=" + NameOfAmountColumns + "]").val());

                if (td_score_str != undefined) {
                    count++;
                }

                // if (td_score_str != "" && !isNaN(td_score_str) && td_score_str != undefined) {
                if (td_score_str != "" && td_score_str != undefined) {
                    var td_score = 0;
                    var td_amount = 0;
                    if (columns_Scr.attr("data-type") == "currency") {

                        td_score = formatNumber(td_score_str).replaceAll(",", "")
                        td_score = parseInt(td_score);
                    } else {
                        var td_score = parseInt(td_score_str);

                    }
                    try {
                        var td_amount = parseInt(td_amount_str);

                    } catch {
                        toastr.warning("Vui lòng kiểm tra lại cột số lượng của sản phẩm" + $(this).find("[name=name]").val())
                    }

                    if (!isNaN(td_score)) {

                        if (td_amount != 0 && !isNaN(td_amount)) {
                            score += (td_score * td_amount);
                        } else {
                            score += (td_score * 1);

                        }

                    }
                }


            } catch (error) {
                score += 0;

            }
            // $(this).find("tr").each(function() {

            // })
        })
    }
    var target = $("#" + FormId).find("." + TargetFieldClass);
    if (target.attr("data-type") == "currency") {
        target.val(score).prop("disabled", true).change();
        formatCurrency(target)

    } else {
        target.val(score).prop("disabled", true).change();

    }
}

/**
 * 
 * @FormId {*} FormId 
 * @param {*} ScoreFieldClass 
 * @param {*} TargetFieldClass 
 * @param {*} DisCountField 
 * @param {*} TypeOfDiscountField 
 * @param {*} ShipTaxField 
 */
function DiscountHandlerEventChanged(FormId, ScoreFieldClass, TargetFieldClass, DisCountField, TypeOfDiscountField, ShipTaxField) {

    var is_field_changed = false;
    $("#" + FormId).find(DisCountField).change(function() {
        DiscountHandler(FormId, ScoreFieldClass, TargetFieldClass, DisCountField, TypeOfDiscountField, ShipTaxField)
    })
    $("#" + FormId).find(ScoreFieldClass).change(function() {
        DiscountHandler(FormId, ScoreFieldClass, TargetFieldClass, DisCountField, TypeOfDiscountField, ShipTaxField)

    })
    $("#" + FormId).find(ShipTaxField).change(function() {
        DiscountHandler(FormId, ScoreFieldClass, TargetFieldClass, DisCountField, TypeOfDiscountField, ShipTaxField)

    })
    $("#" + FormId).find('input[name=' + TypeOfDiscountField + ']').change(function() {
        DiscountHandler(FormId, ScoreFieldClass, TargetFieldClass, DisCountField, TypeOfDiscountField, ShipTaxField)
    })
}

function DiscountHandler(FormId, ScoreFieldClass, TargetFieldClass, DisCountField, TypeOfDiscountField, ShipTaxField) {

    var is_field_changed = false;


    var curr_score = 0;
    try {
        var num_ele = $("#" + FormId).find(ScoreFieldClass);
        var num = num_ele.val();
        curr_score = 0;
        if (num_ele.attr("data-type") == "currency") {

            curr_score = formatNumber(num).replaceAll(",", "")
            curr_score = parseInt(curr_score);
        } else {
            var curr_score = parseInt(num);

        }
        if (isNaN(curr_score)) {
            curr_score = 0;
        }
    } catch (error) {
        curr_score = 0;
    }
    var number_of_discount = $("#" + FormId).find(DisCountField);
    var type_of_discount = $("#" + FormId).find('input[name=' + TypeOfDiscountField + ']:checked');
    var result_of_discount = $("#" + FormId).find(TargetFieldClass);
    var ship_tax = $("#" + FormId).find(ShipTaxField);
    var total_number = 0;
    var discount_number = 0;
    var total_number = 0;
    var ship_tax_number = 0;
    // Giảm giá
    if (number_of_discount.attr("data-type") == "currency") {
        discount_number = formatNumber(number_of_discount.val()).replaceAll(",", "")
        discount_number = parseInt(discount_number);
    } else {
        discount_number = parseInt(number_of_discount.val());
        if (isNaN(discount_number)) {
            discount_number = 0;
        }
    }
    // Phí ship
    if (ship_tax.attr("data-type") == "currency") {
        ship_tax_number = formatNumber(ship_tax.val()).replaceAll(",", "")
        ship_tax_number = parseInt(ship_tax_number);
    } else {
        ship_tax_number = parseInt(ship_tax.val());
        if (isNaN(ship_tax_number)) {
            ship_tax_number = 0;
        }
    }
    if (isNaN(ship_tax_number)) {
        ship_tax_number = 0;
    }

    if (type_of_discount.val() == "$") {
        formatCurrency(number_of_discount);
        number_of_discount.attr("data-type", "currency");
        if (discount_number > (curr_score + ship_tax_number)) {
            total_number = 0;
        } else {
            total_number = curr_score + ship_tax_number - discount_number;

        }
        if (result_of_discount.attr("data-type") == "currency") {
            result_of_discount.val(total_number).prop("disabled", true).change();
            formatCurrency(result_of_discount)

        } else {
            result_of_discount.val(total_number).prop("disabled", true).change();
        }
        // result_of_discount.val()
    } else if (type_of_discount.val() == "%") {
        number_of_discount.attr("data-type", "");
        var curr_discount_num = formatNumber(number_of_discount.val()).replaceAll(",", "");
        number_of_discount.val(curr_discount_num);
        discount_number = parseInt(curr_discount_num);
        if (isNaN(discount_number)) {
            discount_number = 0;
        }
        if (discount_number < 0 || discount_number > 100) {
            toastr.error('Vui lòng điền đúng thông tin khuyến mãi');
            return;
        }
        total_number = (curr_score * (1 - (discount_number / 100))) + ship_tax_number;
        if (result_of_discount.attr("data-type") == "currency") {
            result_of_discount.val(total_number).prop("disabled", true).change();
            formatCurrency(result_of_discount)

        } else {
            result_of_discount.val(total_number).prop("disabled", true).change();
        }
    } else {
        number_of_discount.attr("data-type", "");
        if (discount_number != 0 && isNaN(discount_number)) {
            toastr.error('Vui lòng chọn loại khuyến mãi');
        }
        total_number = curr_score + ship_tax_number;
        if (result_of_discount.attr("data-type") == "currency") {
            result_of_discount.val(total_number).prop("disabled", true).change();
            formatCurrency(result_of_discount)

        } else {
            result_of_discount.val(total_number).prop("disabled", true).change();
        }
    }
    if (curr_score == undefined) {
        toastr.error('Hệ thống không thể tìm thấy số tiền');

    }

}

function SelectboxResultChanged(FormId, ScoreFieldName, SelectboxTargetFieldClass) {
    var selectbox = null;
    if ($("#" + FormId).length == 0) {
        return;
    }
    if ($("#" + FormId).find("." + SelectboxTargetFieldClass).length == 0) {
        return;
    }
    $("#" + FormId).find("." + SelectboxTargetFieldClass).each(function() {

        var is_in_cell = $(this).find("table").length > 0;
        if (!is_in_cell) {
            selectbox = $(this);
        }

    });
    $("#" + FormId).find("." + ScoreFieldName).prop("disabled", true);



    selectbox.change(function() {
        var curr_score = 0;
        try {
            // $("#" + FormId).find("[name=" + ScoreFieldName + "]").prop("disabled", true);
            var num = $("#" + FormId).find("." + ScoreFieldName).val();
            curr_score = parseInt(num);
            if (isNaN(curr_score)) {
                curr_score = 0;
            }
        } catch (error) {
            curr_score = 0;
        }
        if (curr_score == undefined) {
            toastr.error('Hệ thống không thể tìm thấy điểm');

        }
        var condition = (curr_score >= score) ? "ok" : "no";

        var config_obj = Config_Condition.filter(config => config.name == condition)[0];
        var no_option = null;
        var list_disbled = [];

        if (config_obj != undefined) {
            arr_allow_code = config_obj.allow_code;
            selectbox.find('option').each(function() {
                if ($(this).val() == "" || $(this).val() == undefined) {} else {
                    if (arr_allow_code.includes($(this).attr('code'))) {
                        $(this).prop('disabled', false);
                        no_option = $(this).val();
                    } else {
                        $(this).prop('disabled', true);
                        list_disbled.push($(this).val());

                    }
                }
            })
        }
        var IsNotUpdate = false; // khong cho phep luu 
        // var selected_value = selectbox.attr("value");
        var selected_value = selectbox.find(":selected").attr("value");

        if (list_disbled.includes(selected_value) || selected_value === null) {
            var label_txt = selectbox.closest('div').find("label").text();
            toastr.warning(`Giá trị '${label_txt}' không phù hợp! Bạn sẽ không thể lưu đánh giá.`);
            IsNotUpdate = true;

        }

        $('#' + FormId).find(".modal-footer").find("[type=button]").each(function() {
            if (IsNotUpdate) {
                if (!this.id.includes("CancelEditModalBtnId")) {
                    $(this).prop("disabled", true);
                }
            } else {
                $(this).prop("disabled", false);
            }
        });
        if (selected_value == "") {
            if (condition == "no" && no_option != null) {
                selectbox.val(no_option);

            } else {
                selectbox.val("");
            }
        }
    })




}
// // Lấy giá trị theo



// ẩn hiện tùy thuộc vào loại hình sử Dụng



function SelectTypeOfUsed() {

    $('[name="member_used"]').closest("div").hide();
    // $('[name="member_used"]').select2();
    $('table[app-model-name="ItemPurchaseSpendingManagement"]').closest("div").show();
    $('.itempurchaseSpendingManagement-createAddInlineTableBtnId').closest("h6").show();
    $(".is_equally_divided-spendingbygroup-spendingmanagement-input").change(function() {
        if (this.checked) {

            $('[name="member_used"]').closest("div").show();
            $('table[app-model-name="ItemPurchaseSpendingManagement"]').closest("div").hide();
            $('.itempurchaseSpendingManagement-createAddInlineTableBtnId').closest("h6").hide();

        } else {
            // $('[name="member_used"]').hide();
            $('[name="member_used"]').closest("div").hide();

            $('table[app-model-name="ItemPurchaseSpendingManagement"]').closest("div").show();
            $('.itempurchaseSpendingManagement-createAddInlineTableBtnId').closest("h6").show();

        }

    })





}