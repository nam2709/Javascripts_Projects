function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  
function getCSRFTokenValue(){
    return getCookie('csrftoken');
}

function getSessionIdValue(){
    return getCookie('sessionid');
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

var HistoryFormManagement_arr_action = [    
                {
                "title": "Xem Timeline",
                "func": "showTimelineModal",
                "icon": "far fa-eye",
                "href": "#",
                "isCheck": false,
                "allowSelfChecking": true,
                "field_checking": "#",
                "value_is_true": "#",
                "views_name": "",
                "independent_views": true
                },
                
                // {
                //     "title": "Chỉnh sửa",
                //     "func": "",
                //     "icon": "far fa-edit",
                //     "href": "#",
                //     "isCheck": false,
                //     "allowSelfChecking": false,
                //     "field_checking": "is_sent",
                //     "value_is_true": "#",
                //     "views_name": "",
                //     "independent_views": true
                // },
                // {
                //     "title": "Xóa",
                //     "func": "",
                //     "icon": "far fa-trash-alt",
                //     "href": "#",
                //     "isCheck": false,
                //     "allowSelfChecking": false,
                //     "field_checking": "#",
                //     "value_is_true": "#",
                //     "views_name": "",
                //     "independent_views": true
                // },
                    
]

function showTimelineModal(uuid=null) {
    // $('#timelineModals').data('uuid', uuid);
    // $('#timelineModals').modal('toggle');
    // toastr.success(uuid);
    $.ajaxSetup({
        headers : {
            'CSRFToken' : getCSRFTokenValue(),
            'X-CSRFToken' : getCSRFTokenValue(), // for --> SessionAuthentication
        },
        tryCount : 0,
        retryLimit : 3,
    });

    $.ajax({
        type: "GET",
        url: "/Form/history/" + uuid + "/",
        // data: {uuid_asset: uuid},
        success: function(response) {
            $('#modalContainer').html(response);
            $('#timelineModals').modal('toggle');
        },
            error: function(xhr, status, error) {
                toastr.alert("ERROR");
        }
    });
      
}

class HistoryUseAsset{
    constructor(data=null) {
        if (data != null) {
            if (data.hasOwnProperty('uuid')) {
                this.uuid = data.uuid
            } 
            else {
                this.uuid = null
            }

            if (data.hasOwnProperty('name')) {
                this.name = data.name
            } 
            else {
                this.name = null
            }
            if (data.hasOwnProperty('asset')) {
                this.asset = data.asset
            } 
            else {
                this.asset = null
            }
            if (data.hasOwnProperty('code')) {
                this.code = data.code
            } 
            else {
                this.code = null
            }

            if (data.hasOwnProperty('user')) {
                this.user = data.user
            } 
            else {
                this.user = null
            }
            if (data.hasOwnProperty('code_form')) {
                this.code_form = data.code_form
            } 
            else {
                this.code_form = null
            }
            if (data.hasOwnProperty('status_current')) {
                this.status_current = data.status_current
            } 
            else {
                this.status_current = null
            }
            if (data.hasOwnProperty('started_using')) {
                this.started_using = data.started_using
            } 
            else {
                this.started_using = null
            }
            if (data.hasOwnProperty('end_use')) {
                this.end_use = data.end_use
            } 
            else {
                this.end_use = null
            }

            if (data.hasOwnProperty('updated_by')) {
                this.updated_by = data.updated_by
            } 
            else {
                this.updated_by = null
            }

            if (data.hasOwnProperty('updated_at')) {
                this.updated_at = data.updated_at
            } 
            else {
                this.updated_at = null
            }

            if (data.hasOwnProperty('created_at')) {
                this.created_at = data.created_at
            } 
            else {
                this.created_at = null
            }

            if (data.hasOwnProperty('created_by')) {
                this.created_by = data.created_by
            } 
            else {
                this.created_by = null
            }
            if (data.hasOwnProperty('get_name_asset')) {
                this.get_name_asset = data.get_name_asset
            } 
            else {
                this.get_name_asset = null
            }
            if (data.hasOwnProperty('get_name_user')) {
                this.get_name_user = data.get_name_user
            } 
            else {
                this.get_name_user = null
            }
            if (data.hasOwnProperty('form')) {
                this.form = data.form
            } 
            else {
                this.form = null
            }
            if (data.hasOwnProperty('type_action')) {
                this.type_action = data.type_action
            } 
            else {
                this.type_action = null
            }
            if (data.hasOwnProperty('get_type_action')) {
                this.get_type_action = data.get_type_action
            } 
            else {
                this.get_type_action = null
            }
        }
    }

    getHisUseAssetByFormApi(page=null, search_data=null) {

        this.callAjax = null
        var results = []
        $.ajaxSetup({
            headers : {
                'CSRFToken' : getCSRFTokenValue(),
                'X-CSRFToken' : getCSRFTokenValue(), // for --> SessionAuthentication
            },
            tryCount : 0,
            retryLimit : 3,
        });
        
        var has_go_page=""

        if(page!=null){
            has_go_page="?page="+page;
        }

        this.callAjax = $.ajax({
                url: HistoryUseAsset_URL + has_go_page,
                type: 'GET',
                async: false,
                cache: false,
                timeout: 30000,
                success: function(data){
                    console.log('[getgetHisUseAssetByFormApiByFormApi] data = ', data);
                    if (data.hasOwnProperty('count')){
                        HisUseAssetFormManagementpagination["total"]=data.count;
                    }
                    if (data.hasOwnProperty('next')){
                        if(data.next != null){
                            HisUseAssetFormManagementpagination["has_next"]=true;
                        } else {
                            HisUseAssetFormManagementpagination["has_next"]=false;
                        }
                    }
                    HisUseAssetFormManagementpagination["current_page"]=page;
                    if (data.hasOwnProperty('previous')){
                        if(data.previous != null){
                            HisUseAssetFormManagementpagination["has_prev"]=true;
                        } else {
                            HisUseAssetFormManagementpagination["has_prev"]=false;
                        }
                    }
                    if (data.hasOwnProperty('results')){
                        for (var j=0; j < data.results.length; j++){
                            var tmp = new HistoryUseAsset(data.results[j]);
                            results.push(tmp);
                        }
                    }
                },
                error:function (xhr, ajaxOptions, thrownError) {
                    console.log(xhr.status);
                    console.log(thrownError);
                }
        });
        console.log(results[0]);

        return results;
    }

    GetDatHisUseAssetForField(tableId=null, order=null, action=null){
        var tbId = "hisUseAssetFormDataTableId";
        if (tableId != null) {
            tbId = tableId;
        }

        if(order==null){
            order=HIS_ID_TABLE_COUNT;
            }
        var seTbId = $("#" + tbId);

        if(seTbId.length > 0) {
            var html = "<tr>";
            html += `<td style="text-align: center;" ><a>` + order + `</a></td>`;
            var tableHeaders = seTbId.find('thead th');
            var tableBody = seTbId.find('tbody');

            for (var thId = 1; thId < tableHeaders.length; thId++) {
                var hEle = tableHeaders[thId];
                var attr = hEle.getAttribute('attr-name');
                if (this.hasOwnProperty(attr)) {
                
                    if(attr=="name"){
                        html +=`<td class="text-wrap"><a>` + (this[attr]) + `</a></td>`;
                            continue;
                    }
                    if(attr=="user"){
                        if (this['get_name_user'] == null) {
                            html +=`<td class="text-wrap"><a>Chưa có người dùng</a></td>`;
                            continue;
                        } else {
                            html +=`<td class="text-wrap"><a>` + (this['get_name_user']) + `</a></td>`;
                            continue;
                        }
                        
                    }

                    if(attr=="asset"){
                        // html +=`<style>
                        //     a {
                        //         color: #000000;
                        //     } 
                        //     </style>
                        // <td class="text-wrap" style="min-width:300px"><a href="http://127.0.0.1:1500/Form/history/`+ this['asset'] +`/" style="text-decoration: none; font-weight: 500;">` + (this['get_name_asset']) + `</a></td>`;
                        html +=`<style>
                                a {
                                    color: #000000;
                                } 
                            </style>
                         <td class="text-wrap" style="min-width:300px" onclick="showTimelineModal('`+ this['asset'] +`')" ><a href="#" style="text-decoration: none; font-weight: 500;">` + (this['get_name_asset']) + `</a></td>`;
                        continue;
                    }
                    
                    if(attr=="started_using"){
                        html +=`<td class="text-wrap" style="text-align: center;"><a>` + GetDateOnly_V01(this[attr]) + `</a></td>`;
                            continue;
                    }

                    // if(attr=="end_use"){
                    //     if (this[attr] != null) {
                    //         html +=`<td class="text-wrap"><a>` + GetDateOnly_V01(this[attr]) + `</a></td>`;
                    //         continue;
                    //     } else {
                    //         html +=`<td class="text-wrap"><a>` + (this[attr]) + `</a></td>`;
                    //         continue;
                    //     }
                            
                    // }

                    if(attr=="type_action"){
                        html +=`<td class="text-wrap" style="text-align: center;"><a>` + (this['get_type_action']) + `</a></td>`;
                            continue;
                        } 


                    if(attr=="form"){
                        html +=`<td class="text-wrap"  style="text-align: center;"><a>` + (this[attr]) + `</a></td>`;
                            continue;
                        } 

                    if(attr=="status_current"){
                        html +=`<td class="text-wrap" style="text-align: center;"><a>` + (this[attr]) + `</a></td>`;
                            continue;
                        }   

                    html +=`<td class="text-wrap"><a>` + (this[attr]) + `</a></td>`;
                
                }

                else {
                    if(attr=="account-admin-action") {
                        html += BindActionButtonVer4(
                            HistoryFormManagement_arr_action,
                            this['asset'],
                            this,
                            null,
                            this['created_by'],
                        );
                        // html += 
                        //     `<td>
                        //         <div class="text-center align-items-center">
                        //             <a class="btn btn-link text-info text-gradient px-3 mb-0"  onclick="showTimelineModal('`+ this['asset'] +`')">
                        //                 <i class="far fa-trash-alt me-2" aria-hidden="true"></i>
                        //             Timeline
                        //             </a>
                        //         </div>
                        //     </td>`;
                            continue;
                    }   
                }
            }

            html+='</tr>';

            tableBody.append(html);
            return true;
        }
        else{
            console.log('Not found dataTable Id: ,', tbId);
            return false;
        }
        
    }

    SearchAllObjApi(page=null,search_data=null,typeSearch){
        var results = [];
        this.callAjax = null;
        $.ajaxSetup({
            headers : {
                'CSRFToken' : getCSRFTokenValue(),
                'X-CSRFToken' : getCSRFTokenValue(), 
            },
            tryCount : 0,
            retryLimit : 3,
        });
        var has_go_page=""
        if(page!=null){
            has_go_page="?page="+page;
        }
        var slugSearch="";
        var SEARCH_URL="";
        if(typeSearch=="filter"){
            SEARCH_URL=FormList_URL;
        
            slugSearch="&";
        
            if($("#assetHisFormManagementFilterSearchInputId").length>0 
                || $("#userHisFormManagementFilterSearchInputId").length>0
                ||  $("#actionHisFormManagementFilterSearchInputId").length>0
                )
            {
                var value_asset=$("#assetHisFormManagementFilterSearchInputId").val();
                var value_user=$("#userHisFormManagementFilterSearchInputId").val();
                var value_action=$("#actionHisFormManagementFilterSearchInputId").val();
                if((value_asset !="" && value_asset != null)
                    || (value_user !="" && value_user != null)
                    || (value_action !="" && value_action != null)
                    )
                    {
                        slugSearch+="code__icontains=&asset="+value_asset+"&user="+value_user+"&type_action="+value_action;
                    }

            }
            slugSearch=slugSearch.slice(0 );

        }else{
            SEARCH_URL=FormList_URL;
            
                slugSearch="&";
                slugSearch+="search="+$("#assetHisFormManagementQuickSearchInputId").val();
            
        }
        if(search_data!=null){
            SEARCH_URL=FormList_URL;
            slugSearch="&";
            slugSearch+=search_data;
        }
        // search_log["search_data"] = slugSearch;
        this.callAjax = $.ajax({
            url: HistoryUseAsset_URL + has_go_page + slugSearch,
            type: "GET",
            //async: false,
            cache: false,
            timeout: 30000,
    
            success: function (data) {
                console.log('[GetAllObjApi] data = ', data);
                // return new AccountAccount(data);
                if (data.hasOwnProperty('count')){
                    HisUseAssetFormManagementpagination["total"]=data.count;
                }

                if (data.hasOwnProperty('next')){
                    if(data.next != null){
                        HisUseAssetFormManagementpagination["has_next"]=true;
                    }
                    else {
                        HisUseAssetFormManagementpagination["has_next"]=false;
                    }
                }
                HisUseAssetFormManagementpagination["current_page"]=page;

                if (data.hasOwnProperty('previous')){
                    if(data.previous != null) {
                        HisUseAssetFormManagementpagination["has_prev"]=true;
                    }
                    else {
                        HisUseAssetFormManagementpagination["has_prev"]=false;
                    }
                }
                if (data.hasOwnProperty('results')){
                    for (var j=0; j < data.results.length; j++){
                        var tmp = new HistoryUseAsset(data.results[j]);
                        results.push(tmp);
                    }
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                toastr.error("Tìm kiếm không thành công!!!");
                console.log(xhr.status);
                console.log(thrownError);
                if (xhr.textStatus == 'timeout') {
                    this.tryCount++;
                    if (this.tryCount <= this.retryLimit) {
                        //try again
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
        return results;
    }

}

function DeleteTypeForm(uuid){
    // if (confirm("Bạn có muốn xóa không?") == true){
    // }
    $.confirm({
        icon: 'fa fa-warning',
        title: 'Xóa Lịch Sử',
        content: 'Bạn có chắc muốn xóa lịch sử sử dụng của tài sản này không ?',
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
                btnClass: 'btn-red',
                action: function() {
                    $(this).ready(function(){
                        $.ajaxSetup({
                            headers : {
                                'CSRFToken' : getCSRFTokenValue(),
                                'X-CSRFToken' : getCSRFTokenValue(), // for --> SessionAuthentication
                            },
                            tryCount : 0,
                            retryLimit : 3,
                        });
                
                        var self = this;
                        var uuid_go=uuid
                        if(uuid==null) {
                            uuid_go=cr_uuid;
                        } else {
                            uuid_go=uuid;
                        }
                        console.log('self.uuid = ', uuid);
                        $.ajax({
                            url: HistoryUseAsset_URL + uuid_go + "/",
                            type: "DELETE",
                            async: false,
                            cache: false,
                            timeout: 30000,
                
                            success: function (data) {
                                HisUseAssetByFormFormManagementApi(HisUseAssetFormManagementpagination["current_page"]);
                                if(confirm)
                                toastr.success('Xóa thành công');
            
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
                    });
                }
            },

        }
    })
}

var HisUseAssetFormManagementpagination={
    current_page:1,
    total:2,
    has_next:true,
    has_prev:true
}

// stt cộng thêm bao nhiêu
var HisUseAssetFormManagementrecord_in_page = PAGE_SIZE;

// = setting = bên trên
var Hisrecord_in_page = PAGE_SIZE;

$(document).ready(function(){
    var IdTable ="hisUseAssetFormDataTableBodyId";
    var checker = $("#" +IdTable );
    if (checker.length > 0){
        if($('#'+IdTable).is(":visible")){
            HisUseAssetByFormFormManagementApi(HisUseAssetFormManagementpagination["current_page"]);
        }
    }
})

// = setting = bên trên

var search_log = {
    search_func:"",
    search_data:"",
    search_type:"",
}

function HisUseAssetByFormFormManagementApi(page=null, search_data=null) {
    search_log["search_func"] = "";
    search_log["search_data"] = search_data;
    search_log["search_type"] = "";
    var object = new HistoryUseAsset()
    var results = object.getHisUseAssetByFormApi(page, search_data);

    object.callAjax.then(function(data) {

        $("#hisUseAssetFormDataTableBodyId").empty();
        HIS_ID_TABLE_COUNT = 1;
        var crr_record_in_page = HisUseAssetFormManagementrecord_in_page;

        if(page>1){
            HIS_ID_TABLE_COUNT =1+crr_record_in_page*page-crr_record_in_page
        }
        for (var i = 0; i < results.length; i++){

            try{
                console.log('results[i] = ', results[i]);
                results[i].GetDatHisUseAssetForField();
                HIS_ID_TABLE_COUNT++;
            }
            catch(err){
                console.log(err);
            }
        }

        var pagenation_ele=$(".pagination-hisUseAssetFormManagement");
        var pagination=HisUseAssetFormManagementpagination;
        pagenation_ele.html('');
        var page_total_ele = $(".page-total-hisUseAssetFormManagement");
        page_total_ele.html(`<footer class="blockquote-footer">Tổng số: ${pagination["total"]} bản ghi </footer>`);
        if (results.length > 0) {
            
            pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="HisUseAssetByFormFormManagementApi(1)">First</a></li>`);
            if (pagination["has_prev"] == true) {
                pagenation_ele.append('<li class="page-item"><a class="page-link" onclick="HisUseAssetByFormFormManagementApi(' + (parseInt(pagination["current_page"]) - 1) + ')">' + (parseInt(pagination["current_page"]) - 1) + '</a></li>');
            }

            pagenation_ele.append('<li class="page-item active"><a class="page-link" >' + (parseInt(pagination["current_page"])) + '</a></li>');
            if (pagination["has_next"] == true) {
                pagenation_ele.append('<li class="page-item"><a class="page-link" onclick="HisUseAssetByFormFormManagementApi(' + (parseInt(pagination["current_page"]) + 1) + ')">' + (parseInt(pagination["current_page"]) + 1) + '</a></li>');
            }

            if(pagination["total"]>0) {
                var last_page_order = 0 
                if((pagination["total"] % Hisrecord_in_page) != 0) {
                    last_page_order = Math.floor(pagination["total"]/Hisrecord_in_page) + 1;
                }
                else {
                    last_page_order = (pagination["total"]/Hisrecord_in_page);
                }
                pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="HisUseAssetByFormFormManagementApi(`+last_page_order+`)">Last</a></li>`);
            }
        }
    })
}


function HisUseAssetByFormSearchData(page=null, search_type, search_data=null) {
    search_log["search_func"] = "HisUseAssetByFormSearchData";
    search_log["search_data"] = search_type;
    search_log["search_type"] = search_data;
    var object = new HistoryUseAsset()
    var results = object.SearchAllObjApi(page, search_data, search_type);

    object.callAjax.then(function(data) {

        $("#hisUseAssetFormDataTableBodyId").empty();
        HIS_ID_TABLE_COUNT = 1;
        var crr_record_in_page = HisUseAssetFormManagementrecord_in_page;

        if(page>1){
            HIS_ID_TABLE_COUNT =1+crr_record_in_page*page-crr_record_in_page
        }
        for (var i = 0; i < results.length; i++){

            try{
                console.log('results[i] = ', results[i]);
                results[i].GetDatHisUseAssetForField();
                HIS_ID_TABLE_COUNT++;
            }
            catch(err){
                console.log(err);
            }
        }

        var pagenation_ele=$(".pagination-hisUseAssetFormManagement");
        var pagination=HisUseAssetFormManagementpagination;
        pagenation_ele.html('');
        var page_total_ele = $(".page-total-hisUseAssetFormManagement");
        page_total_ele.html(`<footer class="blockquote-footer">Tổng số: ${pagination["total"]} bản ghi </footer>`);
        if (results.length > 0) {
            // if (results.length == pagination["total"]) {
            //     var myDiv = document.getElementById("page");
            //     myDiv.classList.add("d-none");
            // }
            pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="HisUseAssetByFormSearchData(1, '`+ search_type +`', `+ search_data +`)"><i class="fa fa-angle-double-left"></a></li>`);
            if (pagination["has_prev"] == true) {
                pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="HisUseAssetByFormSearchData(` + (parseInt(pagination["current_page"]) - 1) + `, '`+ search_type +`', `+ search_data +`)">` + (parseInt(pagination["current_page"]) - 1) + `</a></li>`);
            }

            pagenation_ele.append(`<li class="page-item active"><a class="page-link" >` + (parseInt(pagination["current_page"])) + `</a></li>`);
            if (pagination["has_next"] == true) {
                pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="HisUseAssetByFormSearchData(` + (parseInt(pagination["current_page"]) + 1) + `, '`+ search_type +`', `+ search_data +`)">` + (parseInt(pagination["current_page"]) + 1) + `</a></li>`);
            }

            if(pagination["total"]>0) {
                var last_page_order = 0 
                if((pagination["total"] % Hisrecord_in_page) != 0) {
                    last_page_order = Math.floor(pagination["total"]/Hisrecord_in_page) + 1;
                }
                else {
                    last_page_order = (pagination["total"]/Hisrecord_in_page);
                }
                pagenation_ele.append(`<li class="page-item"><a class="page-link" onclick="HisUseAssetByFormSearchData(`+last_page_order+`, '`+ search_type +`', `+ search_data +`)"><i class="fa fa-angle-double-right"></a></li>`);
            }
        }  
        if (search_type == "quick") {
            var crr_txt = $("#assetHisFormManagementQuickSearchInputId").val();
            highlight(crr_txt,"#hisUseAssetFormDataTableBodyId");
        }
    })
}

$(document).ready(function(){
    $("#assetHisFormManagementQuickSearchInputId").on('keyup', function(e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            HisUseAssetFormManagementpagination={
                current_page:1,
                total:0,
                has_next:false,
                has_prev:false
            }
            HisUseAssetByFormSearchData(HisUseAssetFormManagementpagination["current_page"],"quick");
        }
    })
    $("#assetHisFormManagementQuickSearchBtnId").click(function(){
        HisUseAssetFormManagementpagination={
            current_page:1,
            total:0,
            has_next:false,
            has_prev:false
        }
        HisUseAssetByFormSearchData(HisUseAssetFormManagementpagination["current_page"],"quick");
    })
    $("#historyFormManagementFilterSearchBtnId").click(function(){
        HisUseAssetFormManagementpagination={
            current_page:1,
            total:0,
            has_next:false,
            has_prev:false
    }
        HisUseAssetByFormSearchData(HisUseAssetFormManagementpagination["current_page"],"filter");
    })
});

$(document).ready(function(){
    // function getListFormStart(){
    $.ajaxSetup({
            headers : {
                'CSRFToken' : getCSRFTokenValue(),
                'X-CSRFToken' : getCSRFTokenValue(), // for --> SessionAuthentication
            },
            tryCount : 0,
            retryLimit : 3,
        });
        
        var event_data = '';

        $.ajax({
                url: Asset_URL,
                type: 'GET',
                async: false,
                cache: false,
                timeout: 30000,
                success: function(data){
                    if (data.hasOwnProperty('results')){
                        for (var j=0; j < data.results.length; j++){
                            var uuid_tmp = data.results[j].uuid;
                            var name_tmp = data.results[j].name;
                            event_data += '<option value="' + uuid_tmp + '">' + name_tmp + '</option>'
                        }
                        $("#assetHisFormManagementFilterSearchInputId").append(event_data);
                    }
                },
                error:function (xhr, ajaxOptions, thrownError) {
                    console.log(xhr.status);
                    console.log(thrownError);
                }
        });
});

$(document).ready(function(){
    // function getListFormStart(){
    $.ajaxSetup({
            headers : {
                'CSRFToken' : getCSRFTokenValue(),
                'X-CSRFToken' : getCSRFTokenValue(), // for --> SessionAuthentication
            },
            tryCount : 0,
            retryLimit : 3,
        });
        
        var event_data = '';

        $.ajax({
                url: Staff_URL,
                type: 'GET',
                async: false,
                cache: false,
                timeout: 30000,
                success: function(data){
                    if (data.hasOwnProperty('results')){
                        for (var j=0; j < data.results.length; j++){
                            var uuid_tmp = data.results[j].uuid;
                            var name_tmp = data.results[j].name;
                            event_data += '<option value="' + uuid_tmp + '">' + name_tmp + '</option>'
                        }
                        $("#userHisFormManagementFilterSearchInputId").append(event_data);
                    }
                },
                error:function (xhr, ajaxOptions, thrownError) {
                    console.log(xhr.status);
                    console.log(thrownError);
                }
        });
});

$(document).ready(function(){
    // function getListFormStart(){
    $.ajaxSetup({
            headers : {
                'CSRFToken' : getCSRFTokenValue(),
                'X-CSRFToken' : getCSRFTokenValue(), // for --> SessionAuthentication
            },
            tryCount : 0,
            retryLimit : 3,
        });
        
        var event_data = '';

        $.ajax({
                url: TypeAction_URL,
                type: 'GET',
                async: false,
                cache: false,
                timeout: 30000,
                success: function(data){
                    if (data.hasOwnProperty('results')){
                        for (var j=0; j < data.results.length; j++){
                            var uuid_tmp = data.results[j].uuid;
                            var name_tmp = data.results[j].name;
                            event_data += '<option value="' + uuid_tmp + '">' + name_tmp + '</option>'
                        }
                        $("#actionHisFormManagementFilterSearchInputId").append(event_data);
                    }
                },
                error:function (xhr, ajaxOptions, thrownError) {
                    console.log(xhr.status);
                    console.log(thrownError);
                }
        });
});