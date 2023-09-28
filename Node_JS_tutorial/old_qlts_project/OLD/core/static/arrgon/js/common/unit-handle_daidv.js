$(document).ready(function() {
//     GetOrganization();
//    OrganizationChangeEvent()
//    UnitChangeEvent()
//    DepartmentChangeEvent()
//    TitleChangeEvent()

});
clear_selection = [
'unit-select',
'title-select',
'user-select',
//'unit-select',
]
function GetOrganization(){
    organization = localStorage.getItem("organization_id");
    if(organization=="" || organization == undefined || organization == null){
        organization = $("#crr_organization").val();
    }
    if(organization !="" || organization != undefined || organization != null){
        $("[name=organization]").val(organization).trigger("change").prop("disabled",true).closest("div").addClass("d-none");
    }
}

function OrganizationChangeEvent(){
    $("[name=organization]").change(function (){
        // toastr.info('Bạn đã thay đổi tổ chức');
        // var organization_id = $(this).val();
        // DepartmentChangeEvent(organization_id);
//        ChangeUnitByOrganization(this);
// xóa các dữ liệu các thẻ phụ thuộc vào tổ chức
    })

}

function UnitChangeEvent(){
    $("[name=unit]").change(function (){
        // toastr.info('Bạn đã thay đổi tổ chức');
        // var Unit_id = $(this).val();
        // DepartmentChangeEvent(Unit_id);
        ChangeDepartmentByUnit(this);
    })
}

function DepartmentChangeEvent(){
    if($(".a360department-a360organizationalchartmanagement-select").length > 0){
        $(".a360department-a360organizationalchartmanagement-select").change(function (){
            // toastr.info('Bạn đã thay đổi phòng ban');
            // var department_value = $(this).val();
            // ChangeTitleByDepartment(department_id);

            var crr_selector =  $(this)
            var crr_department_selector =  $(this)
            var crr_selector_value =  $(this).val()
            var crr_selector_tagname =  $(this).get(0).tagName

            // $(this).find(':selected').attr('data-id')
            while(crr_selector.parent().find(".organization-systemmanagement-select").length == 0 && crr_selector_tagname != 'FORM'){
                // toastr.info('tìm thấy một element');
                crr_selector = crr_selector.parent();
                crr_selector_tagname =  crr_selector.get(0).tagName
            }
            if(crr_selector.parent().find(".organization-systemmanagement-select").length > 0) {
                my_select = crr_selector.parent().find(".organization-systemmanagement-select");
                if(my_select.val() == ''){
                    crr_department_selector.val('');
                    toastr.info('Vui lòng chọn tổ chức trước!');
                    my_select.focus();
                    crr_department_selector.find("option").each(function(){
                            
                        if($(this).attr('value')!= '' ){
                            $(this).addClass('d-none');
                        }
                
                    });

                    
                }
                
            }
            ChangeTitleByDepartment(this);


            
        })
    }
    
}
function TitleChangeEvent(){
    if($(".a360titlelist-a360organizationalchartmanagement-select").length > 0){

        $(".a360titlelist-a360organizationalchartmanagement-select").change(function (){
            // toastr.info('Bạn đã thay đổi chức danh');
    
            var crr_selector =  $(this)
            var crr_title_selector =  $(this)
            var crr_selector_value =  $(this).val()
            var crr_selector_tagname =  $(this).get(0).tagName

            // $(this).find(':selected').attr('data-id')
            while(crr_selector.parent().find(".a360department-a360organizationalchartmanagement-select").length == 0 && crr_selector_tagname != 'FORM'){
                // toastr.info('tìm thấy một element');
                crr_selector = crr_selector.parent();
                crr_selector_tagname =  crr_selector.get(0).tagName
            }
            if(crr_selector.parent().find(".a360department-a360organizationalchartmanagement-select").length > 0) {
                my_select = crr_selector.parent().find(".a360department-a360organizationalchartmanagement-select");
                if(my_select.val() == ''){
                    toastr.info('Vui lòng chọn phòng ban trước!');
                    my_select.focus();
                    crr_title_selector.val('');
                    crr_title_selector.find("option").each(function(){
                            
                        if($(this).attr('value')!= '' ){
                            $(this).addClass('d-none');
                        }
                
                    })
                    
                }
                
            }
        })
    }

}
function ChangeTitleByDepartment($this_department){
// check in currnet form 
var crr_selector =  $($this_department)
var crr_selector_tagname =  $($this_department).get(0).tagName

var crr_selector_value =  $($this_department).val()
var crr_selector_text =  $($this_department).find('option:selected').text()
// $(this).find(':selected').attr('data-id')
while(crr_selector.parent().find(".a360titlelist-a360organizationalchartmanagement-select").length == 0 && crr_selector_tagname!= 'FORM'){

    // toastr.info('tìm thấy một element');
    crr_selector = crr_selector.parent();
    crr_selector_tagname =  crr_selector.get(0).tagName
}
if(crr_selector.parent().find(".a360titlelist-a360organizationalchartmanagement-select").length > 0 ) {
    // toastr.info('tìm thấy một element');
    my_select = crr_selector.parent().find(".a360titlelist-a360organizationalchartmanagement-select");
    my_select.val('').focus();
    var count_option_by_department = 0
    my_select.find("option").each(function(){
        if($(this).attr('department') == crr_selector_value){
            $(this).removeClass('d-none');
            count_option_by_department += 1;
        }else{
            $(this).addClass('d-none');

        }
        if(crr_selector_value==""){
            if($(this).attr('value')!= '' ){
                $(this).addClass('d-none');
            }

        }

    })
    if(count_option_by_department > 0){
        toastr.info(`Tìm thấy ${count_option_by_department} lựa chọn <b>chức danh</b> cho <b>${crr_selector_text}</b>.`);

    }
    else{
        toastr.info(`Không tìm thấy lựa chọn <b>chức danh</b> nào cho <b>${crr_selector_text}</b>.`);
        
    }
}
// check in current tr
}
function ChangeDepartmentByUnit($this_unit){


    var crr_selector =  $($this_unit)
    var crr_selector_tagname =  $($this_unit).get(0).tagName
    
    var crr_selector_value =  $($this_unit).val()
    var crr_selector_text =  $($this_unit).find('option:selected').text()
    // $(this).find(':selected').attr('data-id')
    while(crr_selector.parent().find(".a360department-a360organizationalchartmanagement-select").length == 0 && crr_selector_tagname!= 'FORM'){
    
        // toastr.info('tìm thấy một element');
        crr_selector = crr_selector.parent();
        crr_selector_tagname =  crr_selector.get(0).tagName
    }
    if(crr_selector.parent().find(".a360department-a360organizationalchartmanagement-select").length > 0 ) {
        // toastr.info('tìm thấy một element');
        my_select = crr_selector.parent().find(".a360department-a360organizationalchartmanagement-select");
        my_select.val('').focus();
        var count_option_by_org = 0
        my_select.find("option").each(function(){
            if($(this).attr('unit') == crr_selector_value){
                $(this).removeClass('d-none');
                count_option_by_org += 1;
            }else{
                $(this).addClass('d-none');
    
            }
            if(crr_selector_value == ""){
                if($(this).attr('value')!= '' ){
                    $(this).addClass('d-none');
                }
    
            }
    
        })
        if(count_option_by_org > 0){
            toastr.info(`Tìm thấy ${count_option_by_org} lựa chọn <b>phòng ban</b> cho <b>${crr_selector_text}</b>.`);
    
        }
        else{
            toastr.info(`Không tìm thấy lựa chọn <b>phòng ban</b> nào cho <b>${crr_selector_text}</b>.`);
            ChangeTitleByDepartment(my_select);
        }
    }

    
// check in currnet form 
// check in current tr
}

function ChangeUnitByOrganization($this_org){


    var crr_selector =  $($this_org)
    var crr_selector_tagname =  $($this_org).get(0).tagName
    
    var crr_selector_value =  $($this_org).val()
    var crr_selector_text =  $($this_org).find('option:selected').text()
    // $(this).find(':selected').attr('data-id')
    while(crr_selector.parent().find(".a360unit-a360organizationalchartmanagement-select").length == 0 && crr_selector_tagname!= 'FORM'){
    
        // toastr.info('tìm thấy một element');
        crr_selector = crr_selector.parent();
        crr_selector_tagname =  crr_selector.get(0).tagName
    }
    unit_selector_len = crr_selector.parent().find(".a360unit-a360organizationalchartmanagement-select").length;
    console.log(unit_selector_len);
    if(crr_selector.parent().find(".a360unit-a360organizationalchartmanagement-select").length > 0 ) {
        // toastr.info('tìm thấy một element');
        my_select = crr_selector.parent().find(".a360unit-a360organizationalchartmanagement-select");
        my_select.val('').focus();
        var count_option_by_org = 0
        my_select.find("option").each(function(){
            if($(this).attr('organization') == crr_selector_value){
                $(this).removeClass('d-none');
                count_option_by_org += 1;
            }else{
                $(this).addClass('d-none');
    
            }
            if(crr_selector_value == ""){
                if($(this).attr('value')!= '' ){
                    $(this).addClass('d-none');
                }
    
            }
    
        })
        if(count_option_by_org > 0){
            toastr.info(`Tìm thấy ${count_option_by_org} lựa chọn <b>Khối</b> cho <b>${crr_selector_text}</b>.`);
    
        }
        else{
            toastr.info(`Không tìm thấy lựa chọn <b>Khối</b> nào cho <b>${crr_selector_text}</b>.`);
            ChangeDepartmentByUnit(my_select);
        }
    }

    
// check in currnet form 
// check in current tr
}