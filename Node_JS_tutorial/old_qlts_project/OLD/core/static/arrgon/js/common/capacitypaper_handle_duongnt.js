$(document).ready(function() {
    tab_evaluate()
});

function SubmitEvaluate(uuid_capacitypaper){
    $.confirm({
        icon: 'fa fa-warning',
        title: 'Gửi phiếu',
        content: 'Bạn có chắc muốn gửi phiếu đánh giá ?!',
        theme: 'modern',
        closeIcon: 'cancel',
        animation: 'scale',
        type: 'red',
        buttons: {
            cancel: {
                text: 'Hủy',
            },
            confirm: {
                text: 'Đồng ý',
                btnClass: 'btn-blue',
                action: function() {
                    SubmitEvaluateStep2(uuid_capacitypaper)
                }
            },
            
        }
    });
    
}
function SubmitEvaluateStep2(uuid_capacitypaper){
    $.ajaxSetup({
        headers : {
            'Content-Encoding': 'gzip',
            'Vary': 'Accept-Encoding',
            'X-CSRFToken' : getCSRFTokenValue(), // for --> SessionAuthentication
        },
        tryCount : 0,
        retryLimit : 3,
    });
    console.log("duongnt handle evaluate")
    var self = this;
    var org_id = getCookie("org_id")
    $.ajax({
        url: `/workspace/${org_id}/app/hr360/A360EvaluateSystemManagement/do-evaluate/start/submit/`+ uuid_capacitypaper + "/",
        type: "POST",
        async: false,
        cache: false,
        timeout: 30000,
        // data: {},
        contentType: "application/json; charset=utf-8",
        // dataType: "json",
        success: function (data) {
            toastr.success('Gửi phiếu đánh giá thành công');
                // self = new A360TitleListA360OrganizationalChartManagement(data);
                // A360TitleListA360OrganizationalChartManagementGetDataTable(A360TitleListA360OrganizationalChartManagementpagination["current_page"]);
                // if(is_continue_form){
                //     is_continue_form=false;
                //     toastr.success('Thêm mới thành công');
            // $(location).prop('href', "/A360EvaluateSystemManagement/do-evaluate/list/");
                location.href =  $(".backtolist").attr("href");   

                // }else if(is_continue_modal){
                //     is_continue_modal=false;
                //     A360TitleListRefreshCreateModal();
                //     toastr.success('Thêm mới thành công');
                // }else{
                //     $('.modal').modal('hide');
                
                // }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            console.log(thrownError);
            if (xhr.textStatus == 'timeout') {
                this.tryCount++;
                if (this.tryCount <= this.retryLimit) {
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
}


function tab_evaluate(){
    $('.nav-link').click(function(){
        $('.nav-link').removeClass('active')
        $(this).addClass('active')

        let id_table = $(this).attr('href')
        if (id_table == "#PanelPaperNeedEvaluate"){
            $(id_table).fadeIn();
            $('#PanelPaperEvaluated').fadeOut();
        }
        else{
            $(id_table).fadeIn();
            $('#PanelPaperNeedEvaluate').fadeOut();
        }
        return false;
    })
}