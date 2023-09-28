
/**
 * Created by Truongnv on 9/14/21.
 * Copyright: @2022 Truongnv <nguyenvantruong2821@gmail.com>
 * App: Account
 */
var SERVER="";
        
AccountAccountCreateArrayAction = [
    // custom action
    
]


            
// ########## [Fill Form Create] Handle function ##############

$(document).ready(function(){
    var IdForm ="accountAccountDetailFormId";
    var formJq_obj = $("#" +IdForm );
    if (formJq_obj.length > 0){
        if(formJq_obj.is(":visible")){
            cr_uuid = formJq_obj.attr('data-uuid');
            var obj=new AccountAccount();
            obj.tGetObjApi(cr_uuid);
            obj.callAjax.then(function(data) {
                var crr_obj = new AccountAccount(data)
                crr_obj.tFillFormModal('Detail',IdForm);
                var action_button = BindActionButtonVer5(
                    AccountAccountCreateArrayAction,
                    crr_obj['uuid'],
                    crr_obj,
                    null,
                    crr_obj['created_by'],
                );
                $(".tnv-card-option").append(action_button);

            })
        }
    }
})
             
// ########## [Fill Form Edit] Handle function ##############

$(document).ready(function(){
    var IdForm ="accountAccountEditFormId";
    var formJq_obj = $("#" +IdForm );
    if (formJq_obj.length > 0){
        if(formJq_obj.is(":visible")){
            cr_uuid = formJq_obj.attr('data-uuid');
            var obj=new AccountAccount();
            obj.tGetObjApi(cr_uuid);
            obj.callAjax.then(function(data) {
                var crr_obj = new AccountAccount(data)
                crr_obj.tFillFormModal('Edit',IdForm);
                var action_button = BindActionButtonVer5(
                    AccountAccountCreateArrayAction,
                    crr_obj['uuid'],
                    crr_obj,
                    null,
                    crr_obj['created_by'],
                );
                $(".tnv-card-option").append(action_button);

            })
        }
    }
})
             