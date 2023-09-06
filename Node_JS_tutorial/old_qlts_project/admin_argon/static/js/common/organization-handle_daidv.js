$(document).ready(function() {
    OrganizationChangeEvent()
    UnitChangeEvent()
    TitleChangeEvent()
           
 });


function OrganizationChangeEvent(){
    $("[name=organization]").change(function (){
        var organization_id = $(this).val();
        if (organization_id != ""){
        // if ($(".account360-a360systemmanagement-select").length > 0){
        //     var or_id = ''
        //     for (var a = 0; a < $("[name=organization]")['length']; a++)
        //     {if ($($("[name=organization]")[a]).val() != '')
        //     {or_id = $($("[name=organization]")[a]).val()}}
        //       var obj = new Account360A360SystemManagementList();
        //       Account360A360SystemManagementList_CACHE_daidv = obj.getListApiForOrganization(or_id);
        //     //   obj.callAjax.then(function(data){
        //     //     Account360A360SystemManagementList_CACHE_daidv = data;
        //     //   })
        //   }
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
            $("[name="+arr_remove[i]+"]").empty();
        }
        $(".a360titlelist-a360organizationalchartmanagement-select").append('<option selected="" value="">Lựa chọn</option>');
        $(".a360unitselfrelated-a360neworganizationchartmanagement-select").append('<option selected="" value="">Lựa chọn</option>');
        $(".account360-a360systemmanagement-select").append('<option selected="" value="">Lựa chọn</option>');
        // for (var i = 0; i < arr_remove.length; i++) {
        //     $("[name="+arr_remove[i]+"]").append('<option selected="" value="">Lựa chọn</option>');
        // }
        
            console.log('organization_id = '+ organization_id)
            if (organization_id !== null && organization_id !== 'null' && organization_id !== ''){
            console.log(organization_id)
                A360UnitSelfRelatedChangeEvent(or_id=organization_id, or_code=or_code, form_dom = form_dom);
            }
            if (or_code !== undefined && or_code !== 'undefined' && or_code !== null){
                    A360UnitSelfRelatedChangeTitleEvent(or_code=or_code);
                } else {
                    if($("[name=title_new]").length > 0){
                        console.log(or_code)
                        $("[name=title_new]  option[class=d-none]").removeClass('d-none');
                    }
                }
        }
    })
        
}

function A360UnitSelfRelatedChangeTitleEvent(or_code=null){
    if($("[name=title_new]").length > 0){
        console.log(or_code)
        $("[name=title_new]  option[code='" + or_code + "']").addClass('d-none');
    }
}

function UnitChangeEvent(){
    $("[name=unit]").change(function (){
        ChangeDepartmentByUnit(this);
    })
}

function A360UnitSelfRelatedChangeEvent(or_id=null, or_code=null, form_dom = form_dom){
    if($(".a360titlelist-a360organizationalchartmanagement-select").length > 0){
        console.log(or_id)
        var crr = null;
        for (l = 0; l < A360TitleListA360OrganizationalChartManagementList_CACHE_daidv.length; l++){
            crr = A360TitleListA360OrganizationalChartManagementList_CACHE_daidv[l]
            if (crr.organization != null && crr.organization.code == or_code){
                // html_text = '<option friendly_code="' + crr.friendly_code + '" value="'+ crr.uuid +'">('+ crr.friendly_code +') ' + crr.name +'</option>'
                html_text = '<option friendly_code="' + crr.friendly_code + '" value="'+ crr.uuid +'">' + crr.name + '</option>'
                $(".a360titlelist-a360organizationalchartmanagement-select").append(html_text);
            }
        }
        // console.log(or_id)
        // var crr = null;
        // converted_data = []
        // for (var i = 0; i < A360TitleListA360OrganizationalChartManagementList_CACHE_daidv.length; i++){
        //     if (A360TitleListA360OrganizationalChartManagementList_CACHE_daidv[i]['or_code'] == or_code){
        //         converted_data.push(
        //             {"id":A360TitleListA360OrganizationalChartManagementList_CACHE_daidv[i].uuid,
        //             "text":A360TitleListA360OrganizationalChartManagementList_CACHE_daidv[i].name, 
        //             "or_code":A360TitleListA360OrganizationalChartManagementList_CACHE_daidv[i].or_code,
        //             "friendly_code":A360TitleListA360OrganizationalChartManagementList_CACHE_daidv[i].friendly_code,
        //         })
        //     }
        // }
        // $(".a360titlelist-a360organizationalchartmanagement-select").select2(
        //     {
        //         data:converted_data
        //     }).on('select2:select', function (e) {
        //         var data = e.params.data;                
        //         // $(this).children('[value="'+data['id']+'"]').attr(
        //         //    {
        //         //     'friendly_code':data["friendly_code"],
        //         //    }
        //         // );
        //         console.log("Data[friendly_code]", data["friendly_code"])
        //     }).val(0).trigger('change');


        // var title_selection_ele = $(".a360titlelist-a360organizationalchartmanagement-select");
        // $(".a360titlelist-a360organizationalchartmanagement-select").select2('destroy');
        // $(".a360titlelist-a360organizationalchartmanagement-select").select2(
        //     {
        //         // placeholder: "lựa chọn",
        //         data: converted_data,
        //         dropdownParent: $(form_dom).find('.modal-content'),
        //     }
        // )

        // register event selection
        // $(".a360titlelist-a360organizationalchartmanagement-select").on('select2:select', function (e) {
        //     var data = e.params.data;                
        //     // $(this).children('[value="'+data['id']+'"]').attr(
        //     //    {
        //     //     'friendly_code':data["friendly_code"],
        //     //    }
        //     // );
        //     console.log("Data[friendly_code]", data["friendly_code"])
        // }).val(0).trigger('change');

        // for (l = 0; l < converted_data.length; l++){
        //     crr = converted_data[l]
        //     if (crr['or_code'] == or_code){
                
        //         // html_text = '<option friendly_code="' + crr.friendly_code + '" value="'+ crr.uuid +'">('+ crr.friendly_code +') ' + crr.name +'</option>'
        //         html_text = '<option friendly_code="' + crr.friendly_code + '" value="'+ crr.uuid +'">' + crr.name + '</option>'
        //         $(".a360titlelist-a360organizationalchartmanagement-select").append(html_text);
        //     }
        // }
    }
    if($(".a360unitselfrelated-a360neworganizationchartmanagement-select").length > 0){
        console.log(or_id)
        var crr = null;
        for (l = 0; l < A360UnitSelfRelatedA360NewOrganizationChartManagementList_CACHE_daidv.length; l++){
            crr = A360UnitSelfRelatedA360NewOrganizationChartManagementList_CACHE_daidv[l]
            if (crr.or_code != null && crr['or_code'] == or_code){
                $(".a360unitselfrelated-a360neworganizationchartmanagement-select").append(new Option(crr.name, crr.uuid));
                console.log(crr.name, crr.uuid)
            }
        }
    }
    if($("[name=area_new]").length > 0){
        console.log(or_id)
        var crr = null;
        for (l = 0; l < A360AreaA360SystemManagementList_CACHE_daidv.length; l++){
            crr = A360AreaA360SystemManagementList_CACHE_daidv[l]
            if (crr.or_code != null && crr['or_code'] == or_code){
                $("[name=area_new]").append(new Option(crr.name, crr.uuid));
            }
        }
    }
    if ($(".account360-a360systemmanagement-select").length > 0){
        console.log(or_id)
        var obj = new Account360A360SystemManagementList();
        
        Account360A360SystemManagementList_CACHE_daidv = obj.getListApiForOrganization(or_id);
        // var crr = null;
        // for (l = 0; l < Account360A360SystemManagementList_CACHE_daidv.length; l++){
        //     crr = Account360A360SystemManagementList_CACHE_daidv[l]
        //     if (crr['organization_code'] != undefined && crr['organization_code'] != 'undefined' && crr['organization_code'] != null){
        //         if (crr['organization_code'] == or_code){
        //             $(".account360-a360systemmanagement-select").append(new Option(crr.name, crr.uuid));
        //         }
        //     }
        // }
    }
}

function TitleChangeEvent(){
    if($(".a360titlelist-a360organizationalchartmanagement-select").length > 0){

        $(".a360titlelist-a360organizationalchartmanagement-select").change(function (){
            // toastr.info('Bạn đã thay đổi chức danh');
            var title_code = $('option:selected', this).attr('friendly_code')
            if (typeof $($(this).parent()).parent().find(".title_code-account360-a360systemmanagement-input")[0] != 'undefined'){

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
function LoadAccountForUnit(unit_uuid){
    if (unit_uuid != ""){
        if ($(".account360-a360systemmanagement-select").length > 0){
            console.log(unit_uuid)
            var crr = null;
            var obj_acc_unit = new Account360A360SystemManagementList()
            Account360A360SystemManagementList_CACHE_daidv = obj_acc_unit.getListApiForUnit(unit_uuid)
            // obj_acc_unit.callAjax.then(function(data){
            //     Account360A360SystemManagementList_CACHE_daidv = data
            //     $("[name=colleagues]").empty()
            //     for (l = 0; l < Account360A360SystemManagementList_CACHE_daidv.length; l++){
            //         crr = Account360A360SystemManagementList_CACHE_daidv[l]
            //         $("[name=colleagues]").append(new Option(crr.name, crr.uuid));
            //     }
            // })
        }
    }
}
function ChangeDepartmentByUnit($this_unit){
    var crr_selector =  $($this_unit)
    var crr_selector_value =  $($this_unit).val()
    // LoadAccountForUnit(crr_selector_value)
    // var crr_uuid_parent_parent_parent_parent = ''
    var crr_uuid_parent_parent_parent = ''
    var crr_uuid_parent_parent = ''
    var crr_uuid_parent = ''
    $("[name=block]").val(crr_selector_value).trigger("change")
    $("[name=center]").val("").trigger("change")
    $("[name=department]").val("").trigger("change")
    $("[name=part]").val("").trigger("change")
    var obj=new A360UnitSelfRelatedA360NewOrganizationChartManagement();
    obj.tGetObjApi(crr_selector_value);
    obj.callAjax.then(function(data) {
        if (data.parent_unit != undefined){
            crr_uuid_parent = data.parent_unit.uuid;
            crr_name_parent = data.parent_unit.name;
            console.log("đơn vị cấp 1: ", crr_name_parent)
            $("[name=block]").val(crr_uuid_parent).trigger("change")
            $("[name=center]").val(crr_selector_value).trigger("change")
            $("[name=department]").val("").trigger("change")
            $("[name=part]").val("").trigger("change")
            obj.tGetObjApi(crr_uuid_parent);
            obj.callAjax.then(function(data) {
                if (data.parent_unit != undefined){
                    crr_uuid_parent_parent = data.parent_unit.uuid;
                    crr_name_parent_parent = data.parent_unit.name;
                    console.log("đơn vị cấp 2: ", crr_name_parent_parent)
                    $("[name=block]").val(crr_uuid_parent_parent).trigger("change")
                    $("[name=center]").val(crr_uuid_parent).trigger("change")
                    $("[name=department]").val(crr_selector_value).trigger("change")
                    $("[name=part]").val("").trigger("change")
                    obj.tGetObjApi(crr_uuid_parent_parent);
                    obj.callAjax.then(function(data) {
                        if (data.parent_unit != undefined){
                            crr_uuid_parent_parent_parent = data.parent_unit.uuid;
                            crr_name_parent_parent_parent = data.parent_unit.name;
                            console.log("đơn vị cấp 3: ",crr_name_parent_parent_parent)
                            $("[name=block]").val(crr_uuid_parent_parent_parent).trigger("change")
                            $("[name=center]").val(crr_uuid_parent_parent).trigger("change")
                            $("[name=department]").val(crr_uuid_parent).trigger("change")
                            $("[name=part]").val(crr_selector_value).trigger("change")
                        }
                    })
                }
                if (crr_uuid_parent_parent_parent != ''){
                    
                }
                else if (crr_uuid_parent_parent != ''){

                }
                else if (crr_uuid_parent != ''){
                    
                }
                else{
                    if (crr_uuid_parent != ''){
                        
                    }
                }
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
