$(document).ready(function() {
    CapacityQuestionListChangeEvent();
});
    
function CapacityQuestionListChangeEvent() {
    $("[name=template]").change(function (){
        console.log($(this).find('option:selected').val())
        var or_code = $(this).find('option:selected').val()

        $(".groupcapacityquestionlist-a360capacitytestdesignemanagement-select").empty();

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
                    'area_new',
                    'self_manager',
        //            'industry_colleagues',
        //            'colleagues',
                    'user_evaluate_obj',
                    'assessor_obj',
        ]
            
        for (var i = 0; i < arr_remove.length; i++) {
            $("[name="+arr_remove[i]+"]").empty();
        }

        $(".groupcapacityquestionlist-a360capacitytestdesignemanagement-select").append('<option selected="" value="">Lựa chọn</option>');

        for (var i = 0; i < arr_remove.length; i++) {
            $("[name="+arr_remove[i]+"]").append('<option selected="" value="">Lựa chọn</option>');
        }

        var capacitytemplate_id = $(this).val();
        console.log('capacitytemplate_id = '+ capacitytemplate_id)
        if (capacitytemplate_id !== null && capacitytemplate_id !== 'null' && capacitytemplate_id !== ''){
           console.log(capacitytemplate_id)
           GroupCapacityQuestionList(template_id=capacitytemplate_id);
//             A360UnitSelfRelatedChangeTitleEvent(or_code=capacitytemplate_id);
        }

    })
}

function GroupCapacityQuestionList(template_id=null){
    if($(".groupcapacityquestionlist-a360capacitytestdesignemanagement-select").length > 0){
        console.log(template_id)
        var crr = null;
        for (l = 0; l < GroupCapacityQuestionListA360CapacityTestDesigneManagementList_CACHE_hand.length; l++){
            crr = GroupCapacityQuestionListA360CapacityTestDesigneManagementList_CACHE_hand[l]
            if (crr['template'] == template_id){
                // html_text = '<option friendly_code="' + crr.friendly_code + '" value="'+ crr.uuid +'">('+ crr.friendly_code +') ' + crr.name +'</option>'
                html_text = '<option template="'+ crr.template +'" value="'+ crr.uuid +'">' + crr.name + '</option>'
                $(".groupcapacityquestionlist-a360capacitytestdesignemanagement-select").append(html_text);
            }
        }
    }
}


// function TitleChangeEvent(){
//     if($(".groupcapacityquestionlist-a360capacitytestdesignemanagement-select").length > 0){

//         $(".a360titlelist-a360organizationalchartmanagement-select").change(function (){

//             var title_code = $('option:selected', this).attr('friendly_code')
//             if (typeof $($(this).parent()).parent().find(".title_code-account360-a360systemmanagement-input")[0] != 'undefined'){

//                 $($(this).parent()).parent().find(".title_code-account360-a360systemmanagement-input")[0].value = title_code
//             }
//         })
//     }
// }
