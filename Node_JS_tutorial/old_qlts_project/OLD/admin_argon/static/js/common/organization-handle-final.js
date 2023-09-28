$(document).ready(function() {
    OrganizationChangeEvent()
    UnitChangeEvent()
    TitleChangeEvent()
    //GetOrganization();
    //DepartmentChangeEvent()

});
list_select_apply = [
    'a360titlelist-a360organizationalchartmanagement-select',
    'a360unitselfrelated-a360neworganizationchartmanagement-select',
    'account360-a360systemmanagement-select',
]
function loadDataforSelect(or_id = organization_id, or_code = or_code, form_dom = form_dom){
    // for (var i = 0; i < list_select_apply.length; i++) {
    //     if ($(`.${list_select_apply[i]}`).length > 0){
    //         var obj = new Account360A360SystemManagementList();
    //     if (or_id !== undefined || or_id !== null) {
    //         Account360A360SystemManagementList_CACHE_daidv = obj.getListApiForOrganization(or_id = or_id);
    //         //            console.log(Account360A360SystemManagementList_CACHE_daidv)
    //     }
    //     }
    // }
    if ($('.a360titlelist-a360organizationalchartmanagement-select').length > 0){
        var obj=new A360TitleListA360OrganizationalChartManagementList();
        a360titlelist = obj.getListApiForOrganization(or_id);
        obj.callAjax.then(function(data) {
            converted_data = []
            for (var i = 0; i < data.length; i++){
                converted_data.push(`{"id":${data[i].uuid}, "text":${data[i].name}}`)
            }
            // html_text = '<option friendly_code="' + crr.friendly_code + '" value="' + crr.uuid + '">' + crr.name + '</option>'
            $('.a360titlelist-a360organizationalchartmanagement-select').select2({
                data: converted_data,
                dropdownParent: $(form_dom).find(".modal-content"),
            })
        })
    }
    if ($('.a360unitselfrelated-a360neworganizationchartmanagement-select').length > 0){
        var obj=new A360UnitSelfRelatedA360NewOrganizationChartManagementList();
        a360titlelist = obj.getListApiForOrganization(or_id);
        console.log('a360units: ', a360titlelist);
    }
    if ($('.account360-a360systemmanagement-select').length > 0){
        var obj=new Account360A360SystemManagementList();
        a360titlelist = obj.getListApiForOrganization(or_id);
        console.log('a360accounts: ', a360titlelist);
    }
}
function OrganizationChangeEvent() {
    $("[name=organization]").change(function() {
        console.log($(this).find('option:selected').attr('code'))
        var or_code = $(this).find('option:selected').attr('code')
        var form_dom = $(this).closest("form");
        arr_remove = [
            //            'title_new',
            //            'job_title',
            //            'title',
            //            'department',
            //            'unit',
            //            'parent_unit',
            //            'related_unit',
            //            'unit_apply',
            //            'unit_new_apply',
            //            'block',
            //            'center',
            //            'part',
            //            'industry_colleagues',
            //            'colleagues',
            'area_new',
            'self_manager',
            'user_evaluate_obj',
            'assessor_obj',
        ]
        $(".a360titlelist-a360organizationalchartmanagement-select").empty();
        $(".a360unitselfrelated-a360neworganizationchartmanagement-select").empty();
        $(".account360-a360systemmanagement-select").empty();
        for (var i = 0; i < arr_remove.length; i++) {
            $("[name=" + arr_remove[i] + "]").empty();
        }
        $(".a360titlelist-a360organizationalchartmanagement-select").append('<option selected="" value="">Lựa chọn</option>');
        $(".a360unitselfrelated-a360neworganizationchartmanagement-select").append('<option selected="" value="">Lựa chọn</option>');
        $(".account360-a360systemmanagement-select").append('<option selected="" value="">Lựa chọn</option>');
        for (var i = 0; i < arr_remove.length; i++) {
            $("[name=" + arr_remove[i] + "]").append('<option selected="" value="">Lựa chọn</option>');
        }
        var organization_id = $(this).val();
        console.log('organization_id = ' + organization_id)
        if (organization_id !== null && organization_id !== 'null' && organization_id !== '') {
            console.log(organization_id)
            loadDataforSelect(or_id = organization_id, or_code = or_code, form_dom = form_dom);
        }
        // if (or_code !== undefined && or_code !== 'undefined' && or_code !== null) {
        //     A360UnitSelfRelatedChangeTitleEvent(or_code = or_code);
        // } else {
        //     if ($("[name=title_new]").length > 0) {
        //         console.log(or_code)
        //         $("[name=title_new]  option[class=d-none]").removeClass('d-none');
        //     }
        // }
        //        ChangeUnitByOrganization(this);
        // xóa các dữ liệu các thẻ phụ thuộc vào tổ chức
    })
}

function A360UnitSelfRelatedChangeTitleEvent(or_code = null) {
    if ($("[name=title_new]").length > 0) {
        console.log(or_code)
        $("[name=title_new]  option[code='" + or_code + "']").addClass('d-none');
    }
}

function UnitChangeEvent() {
    $("[name=unit]").change(function() {
        // toastr.info('Bạn đã thay đổi tổ chức');
        // var Unit_id = $(this).val();
        // DepartmentChangeEvent(Unit_id);
        ChangeDepartmentByUnit(this);
    })
}

function ChangeDataSelect(or_id = null, or_code = null) {
    if ($(".a360titlelist-a360organizationalchartmanagement-select").length > 0) {
        console.log(or_id)
        var crr = null;
        for (l = 0; l < A360TitleListA360OrganizationalChartManagementList_CACHE_daidv.length; l++) {
            crr = A360TitleListA360OrganizationalChartManagementList_CACHE_daidv[l]
            if (crr['or_code'] == or_code) {
                // html_text = '<option friendly_code="' + crr.friendly_code + '" value="'+ crr.uuid +'">('+ crr.friendly_code +') ' + crr.name +'</option>'
                html_text = '<option friendly_code="' + crr.friendly_code + '" value="' + crr.uuid + '">' + crr.name + '</option>'
                $(".a360titlelist-a360organizationalchartmanagement-select").append(html_text);
            }
        }
    }
    if ($(".a360unitselfrelated-a360neworganizationchartmanagement-select").length > 0) {
        console.log(or_id)
        var crr = null;
        for (l = 0; l < A360UnitSelfRelatedA360NewOrganizationChartManagementList_CACHE_daidv.length; l++) {
            crr = A360UnitSelfRelatedA360NewOrganizationChartManagementList_CACHE_daidv[l]
            if (crr['or_code'] == or_code) {
                $(".a360unitselfrelated-a360neworganizationchartmanagement-select").append(new Option(crr.name, crr.uuid));
                console.log(crr.name, crr.uuid)
            }
        }
    }
    //    if($("[name=part]").length > 0){
    //        console.log(or_id)
    //        var crr = null;
    //        for (l = 0; l < A360UnitSelfRelatedA360NewOrganizationChartManagementList_CACHE_daidv.length; l++){
    //            crr = A360UnitSelfRelatedA360NewOrganizationChartManagementList_CACHE_daidv[l]
    //            if (crr['or_code'] == or_code){
    //                $("[name=part]").append(new Option(crr.name, crr.uuid));
    //            }
    //        }
    //    }
    if ($("[name=area_new]").length > 0) {
        console.log(or_id)
        var crr = null;
        for (l = 0; l < A360AreaA360SystemManagementList_CACHE_daidv.length; l++) {
            crr = A360AreaA360SystemManagementList_CACHE_daidv[l]
            if (crr['or_code'] == or_code) {
                $("[name=area_new]").append(new Option(crr.name, crr.uuid));
            }
        }
    }
    var Account360A360SystemManagementList_CACHE_daidv = [];
    if ($("[name=self_manager]").length > 0 || $("[name=industry_colleagues]").length > 0 || $("[name=colleagues]").length > 0 || $("[name=user_evaluate_obj]").length > 0) {
        console.log(or_id)
        var obj = new Account360A360SystemManagementList();
        if (or_id !== undefined || or_id !== null) {
            Account360A360SystemManagementList_CACHE_daidv = obj.getListApiForOrganization(or_id = or_id);
            //            console.log(Account360A360SystemManagementList_CACHE_daidv)
        }
    }
    if ($("[name=self_manager]").length > 0) {
        console.log(or_id)
        if (or_id !== undefined || or_id !== null) {
            var crr = null;
            for (l = 0; l < Account360A360SystemManagementList_CACHE_daidv.length; l++) {
                crr = Account360A360SystemManagementList_CACHE_daidv[l]
                html_text = '<option avatar_url="' + crr.avatar + '" value="' + crr.uuid + '">' + crr.name + '</option>'
                $("[name=self_manager]").append(html_text);
            }
        }
    }
    if ($("[name=industry_colleagues]").length > 0) {
        console.log(or_id)
        //        var obj = new Account360A360SystemManagementList();
        if (or_id !== undefined || or_id !== null) {
            //            Account360A360SystemManagementList_CACHE = obj.getListApiForOrganization(or_id=or_id);
            //            console.log(Account360A360SystemManagementList_CACHE)
            var crr = null;
            for (l = 0; l < Account360A360SystemManagementList_CACHE_daidv.length; l++) {
                crr = Account360A360SystemManagementList_CACHE_daidv[l]
                html_text = '<option avatar_url="' + crr.avatar + '" value="' + crr.uuid + '">' + crr.name + '</option>'
                $("[name=industry_colleagues]").append(html_text);
            }
        }
    }
    if ($("[name=colleagues]").length > 0) {
        console.log(or_id)
        //        var obj = new Account360A360SystemManagementList();
        if (or_id !== undefined || or_id !== null) {
            //            Account360A360SystemManagementList_CACHE = obj.getListApiForOrganization(or_id=or_id);
            //            console.log(Account360A360SystemManagementList_CACHE)
            var crr = null;
            for (l = 0; l < Account360A360SystemManagementList_CACHE_daidv.length; l++) {
                crr = Account360A360SystemManagementList_CACHE_daidv[l]
                html_text = '<option avatar_url="' + crr.avatar + '" value="' + crr.uuid + '">' + crr.name + '</option>'
                $("[name=colleagues]").append(html_text);
            }
        }
    }
    if ($("[name=user_evaluate_obj]").length > 0) {
        console.log(or_id)
        if (or_id !== undefined || or_id !== null) {
            var crr = null;
            for (l = 0; l < Account360A360SystemManagementList_CACHE_daidv.length; l++) {
                crr = Account360A360SystemManagementList_CACHE_daidv[l]
                html_text = '<option avatar_url="' + crr.avatar + '" value="' + crr.uuid + '">' + crr.name + '</option>'
                $("[name=user_evaluate_obj]").append(html_text);
            }
        }
    }
    if ($("[name=assessor_obj]").length > 0) {
        console.log(or_id)
        if (or_id !== undefined || or_id !== null) {
            var crr = null;
            for (l = 0; l < Account360A360SystemManagementList_CACHE_daidv.length; l++) {
                crr = Account360A360SystemManagementList_CACHE_daidv[l]
                html_text = '<option avatar_url="' + crr.avatar + '" value="' + crr.uuid + '">' + crr.name + '</option>'
                $("[name=assessor_obj]").append(html_text);
            }
        }
    }

}

function TitleChangeEvent() {
    if ($(".a360titlelist-a360organizationalchartmanagement-select").length > 0) {

        $(".a360titlelist-a360organizationalchartmanagement-select").change(function() {
            // toastr.info('Bạn đã thay đổi chức danh');
            var title_code = $('option:selected', this).attr('friendly_code')
            if (typeof $($(this).parent()).parent().find(".title_code-account360-a360systemmanagement-input")[0] != 'undefined') {

                $($(this).parent()).parent().find(".title_code-account360-a360systemmanagement-input")[0].value = title_code
            }


            // $(this).find(':selected').attr('data-id')
            // while(crr_selector.parent().find(".a360department-a360organizationalchartmanagement-select").length == 0 && crr_selector_tagname != 'FORM'){
            //     // toastr.info('tìm thấy một element');
            //     crr_selector = crr_selector.parent();
            //     crr_selector_tagname =  crr_selector.get(0).tagName
            // }
            // if(crr_selector.parent().find(".a360department-a360organizationalchartmanagement-select").length > 0) {
            //     my_select = crr_selector.parent().find(".a360department-a360organizationalchartmanagement-select");
            //     if(my_select.val() == ''){
            //         toastr.info('Vui lòng chọn phòng ban trước!');
            //         my_select.focus();
            //         crr_title_selector.val('');
            //         crr_title_selector.find("option").each(function(){

            //             if($(this).attr('value')!= '' ){
            //                 $(this).addClass('d-none');
            //             }

            //         })

            //     }

            // }
        })
    }
}

// function ChangeTitleByDepartment($this_department){
//     // check in currnet form
//     var crr_selector =  $($this_department)
//     var crr_selector_tagname =  $($this_department).get(0).tagName

//     var crr_selector_value =  $($this_department).val()
//     var crr_selector_text =  $($this_department).find('option:selected').text()
//     // $(this).find(':selected').attr('data-id')
//     while(crr_selector.parent().find(".a360titlelist-a360organizationalchartmanagement-select").length == 0 && crr_selector_tagname!= 'FORM'){

//         // toastr.info('tìm thấy một element');
//         crr_selector = crr_selector.parent();
//         crr_selector_tagname =  crr_selector.get(0).tagName
//     }
//     if(crr_selector.parent().find(".a360titlelist-a360organizationalchartmanagement-select").length > 0 ) {
//         // toastr.info('tìm thấy một element');
//         my_select = crr_selector.parent().find(".a360titlelist-a360organizationalchartmanagement-select");
//         my_select.val('').focus();
//         var count_option_by_department = 0
//         my_select.find("option").each(function(){
//             if($(this).attr('department') == crr_selector_value){
//                 $(this).removeClass('d-none');
//                 count_option_by_department += 1;
//             }else{
//                 $(this).addClass('d-none');

//             }
//             if(crr_selector_value==""){
//                 if($(this).attr('value')!= '' ){
//                     $(this).addClass('d-none');
//                 }

//             }

//         })
//         if(count_option_by_department > 0){
//             toastr.info(`Tìm thấy ${count_option_by_department} lựa chọn <b>chức danh</b> cho <b>${crr_selector_text}</b>.`);

//         }
//         else{
//             toastr.info(`Không tìm thấy lựa chọn <b>chức danh</b> nào cho <b>${crr_selector_text}</b>.`);

//         }
//     }
// // check in current tr
// }
function ChangeDepartmentByUnit($this_unit) {
    var crr_selector = $($this_unit)
    var crr_selector_value = $($this_unit).val()
    // var crr_uuid_parent_parent_parent_parent = ''
    var crr_uuid_parent_parent_parent = ''
    var crr_uuid_parent_parent = ''
    var crr_uuid_parent = ''
    var obj = new A360UnitSelfRelatedA360NewOrganizationChartManagement();
    obj.tGetObjApi(crr_selector_value);
    obj.callAjax.then(function(data) {
        if (data.parent_unit != undefined) {
            crr_uuid_parent = data.parent_unit.uuid;
            crr_name_parent = data.parent_unit.name;
            console.log("đơn vị cấp 1: ", crr_name_parent)
            obj.tGetObjApi(crr_uuid_parent);
            obj.callAjax.then(function(data) {
                if (data.parent_unit != undefined) {
                    crr_uuid_parent_parent = data.parent_unit.uuid;
                    crr_name_parent_parent = data.parent_unit.name;
                    console.log("đơn vị cấp 2: ", crr_name_parent_parent)
                    obj.tGetObjApi(crr_uuid_parent_parent);
                    obj.callAjax.then(function(data) {
                        if (data.parent_unit != undefined) {
                            crr_uuid_parent_parent_parent = data.parent_unit.uuid;
                            crr_name_parent_parent_parent = data.parent_unit.name;
                            console.log("đơn vị cấp 3: ", crr_name_parent_parent_parent)
                            // obj.tGetObjApi(crr_uuid_parent_parent_parent);
                            // obj.callAjax.then(function(data) {
                            //     if (data.parent_unit != undefined){
                            //         crr_uuid_parent_parent_parent_parent = data.parent_unit.uuid;
                            //         crr_name_parent_parent_parent_parent = data.parent_unit.name;
                            //         console.log("đơn vị cấp 4: ",crr_name_parent_parent_parent_parent)
                            //     }
                            // })
                        }
                    })
                }
                if (crr_uuid_parent_parent_parent != '') {
                    $("[name=block]").val(crr_uuid_parent_parent_parent).trigger("change")
                    $("[name=center]").val(crr_uuid_parent_parent).trigger("change")
                    $("[name=department]").val(crr_uuid_parent).trigger("change")
                    $("[name=part]").val(crr_selector_value).trigger("change")
                } else if (crr_uuid_parent_parent != '') {
                    $("[name=block]").val(crr_uuid_parent_parent).trigger("change")
                    $("[name=center]").val(crr_uuid_parent).trigger("change")
                    $("[name=department]").val(crr_selector_value).trigger("change")
                    $("[name=part]").val("").trigger("change")
                } else if (crr_uuid_parent != '') {
                    $("[name=block]").val(crr_uuid_parent).trigger("change")
                    $("[name=center]").val(crr_selector_value).trigger("change")
                    $("[name=department]").val("").trigger("change")
                    $("[name=part]").val("").trigger("change")
                }
                // else{
                //     if (crr_uuid_parent != ''){
                //         $("[name=block]").val(crr_uuid_parent).trigger("change")
                //         $("[name=center]").val("").trigger("change")
                //         $("[name=department]").val("").trigger("change")
                //         $("[name=part]").val("").trigger("change")
                //     }
                // }
            })
        }
    })

    // var crr_selector_tagname =  $($this_unit).get(0).tagName

    // var crr_selector_value =  $($this_unit).val()
    // var crr_selector_text =  $($this_unit).find('option:selected').text()
    // // $(this).find(':selected').attr('data-id')
    // while(crr_selector.parent().find(".a360department-a360organizationalchartmanagement-select").length == 0 && crr_selector_tagname!= 'FORM'){

    //     // toastr.info('tìm thấy một element');
    //     crr_selector = crr_selector.parent();
    //     crr_selector_tagname =  crr_selector.get(0).tagName
    // }
    // if(crr_selector.parent().find(".a360department-a360organizationalchartmanagement-select").length > 0 ) {
    //     // toastr.info('tìm thấy một element');
    //     my_select = crr_selector.parent().find(".a360department-a360organizationalchartmanagement-select");
    //     my_select.val('').focus();
    //     var count_option_by_org = 0
    //     my_select.find("option").each(function(){
    //         if($(this).attr('unit') == crr_selector_value){
    //             $(this).removeClass('d-none');
    //             count_option_by_org += 1;
    //         }else{
    //             $(this).addClass('d-none');

    //         }
    //         if(crr_selector_value == ""){
    //             if($(this).attr('value')!= '' ){
    //                 $(this).addClass('d-none');
    //             }

    //         }

    //     })
    //     if(count_option_by_org > 0){
    //         toastr.info(`Tìm thấy ${count_option_by_org} lựa chọn <b>phòng ban</b> cho <b>${crr_selector_text}</b>.`);

    //     }
    //     else{
    //         toastr.info(`Không tìm thấy lựa chọn <b>phòng ban</b> nào cho <b>${crr_selector_text}</b>.`);
    //         ChangeTitleByDepartment(my_select);
    //     }
    // }


    // check in currnet form 
    // check in current tr
}

// function ChangeUnitByOrganization($this_org){


//     var crr_selector =  $($this_org)
//     var crr_selector_tagname =  $($this_org).get(0).tagName

//     var crr_selector_value =  $($this_org).val()
//     var crr_selector_text =  $($this_org).find('option:selected').text()
//     // $(this).find(':selected').attr('data-id')
//     while(crr_selector.parent().find(".a360unit-a360organizationalchartmanagement-select").length == 0 && crr_selector_tagname!= 'FORM'){

//         // toastr.info('tìm thấy một element');
//         crr_selector = crr_selector.parent();
//         crr_selector_tagname =  crr_selector.get(0).tagName
//     }
//     unit_selector_len = crr_selector.parent().find(".a360unit-a360organizationalchartmanagement-select").length;
//     console.log(unit_selector_len);
//     if(crr_selector.parent().find(".a360unit-a360organizationalchartmanagement-select").length > 0 ) {
//         // toastr.info('tìm thấy một element');
//         my_select = crr_selector.parent().find(".a360unit-a360organizationalchartmanagement-select");
//         my_select.val('').focus();
//         var count_option_by_org = 0
//         my_select.find("option").each(function(){
//             if($(this).attr('organization') == crr_selector_value){
//                 $(this).removeClass('d-none');
//                 count_option_by_org += 1;
//             }else{
//                 $(this).addClass('d-none');

//             }
//             if(crr_selector_value == ""){
//                 if($(this).attr('value')!= '' ){
//                     $(this).addClass('d-none');
//                 }

//             }

//         })
//         if(count_option_by_org > 0){
//             toastr.info(`Tìm thấy ${count_option_by_org} lựa chọn <b>Khối</b> cho <b>${crr_selector_text}</b>.`);

//         }
//         else{
//             toastr.info(`Không tìm thấy lựa chọn <b>Khối</b> nào cho <b>${crr_selector_text}</b>.`);
//             ChangeDepartmentByUnit(my_select);
//         }
//     }


// // check in currnet form 
// // check in current tr
// }