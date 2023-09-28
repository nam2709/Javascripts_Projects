
    class accountAccountdetailTnvRow {

        constructor($this) {
            this.row = $($this);
            this.order = parseInt($($this).find(".stt-account").html());
            this.status = $($this).attr("status");
            this.is_new = $($this).attr("is-new");
            this.uuid = $($this).attr("uuid");
            // this.name = $this;
        }
        delete(table) {
            var is_delete = false;
            if (this.is_new == "true") {
                this.row.remove();
                toastr.success('Xóa thành công');
                this.order -= 1;
                is_delete = true;
            } else if (this.is_new == "template") {
                toastr.warning('Bạn không thể xóa dòng này, đây là dòng mẫu!');
            } else {
                this.order -= 1;
                is_delete = true;
                this.row.attr("status", "deleted");
                this.row.hide();
            }
            new accountAccountdetailTnvTable(table.$this).reOrder();

            return is_delete;

        }
        remove() {
            this.row.remove();
        }
        get() {
            var obj = new Object();
            var formData = new FormData();
            $(this.row).find(':input').each(function() {
                var attr = $(this).attr('name');
                var type = $(this).attr('type');
                var date = $(this).attr('data-datepicker');
                if (typeof attr !== 'undefined' && attr !== false) {
                    if (typeof date !== 'undefined' && date !== false) {
                        var dateVal = toDatePythonByStringTime($(this).val(), 'DD/MM/YYYY');
                        formData.append(attr, dateVal);
                        obj[attr] = dateVal;
                    } else {
                        
                        if (type == 'file') {
                            var files = $(this)[0].files;
                            // Check file selected or not
                            if(files.length > 0 ) {
                                formData.append($(this).attr('name'), files[0]);
                            }
                        }
                        else if(type == 'checkbox'){
                            formData.append($(this).attr('name'), $(this).is(":checked"));
                            obj[attr] = $(this).is(":checked");
                        }
                        else if(type == 'radio'){
                            if($(this).is(":checked")){
                                //# formData.set($(this).attr('name'),  $(this).val());
                                obj[attr] = $(this).val();
                            }
                        } else {
                            obj[attr] = $(this).val();
                        }
                    }
                }
            });
            return obj;
        }

        getFormData() {
            // var obj = new Object();
            var formData = new FormData();
            $(this.row).find(':input').each(function() {
                    var attr = $(this).attr('name');
                    var type = $(this).attr('type');
                    var date = $(this).attr('data-datepicker');
                    if (typeof attr !== 'undefined' && attr !== false) {
                    if (typeof date !== 'undefined' && date !== false) {
                        formData.append($(this).attr('name'), toDatePythonByStringTime($(this).val(), 'DD/MM/YYYY'));
                    } else {
                        if (type == 'file') {
                            var files = $(this)[0].files;
                            // Check file selected or not
                            if(files.length > 0 ) {
                                formData.append($(this).attr('name'), files[0]);
                            }
                        }
                        else if(type == 'checkbox'){
                            formData.append($(this).attr('name'), $(this).is(":checked"));
                        }
                        else if(type == 'radio'){
    
                            if($(this).is(":checked")){
                                formData.set($(this).attr('name'),  $(this).val());
                            }
                        } else {
                            formData.append($(this).attr('name'), $(this).val());
                        }
                    }
                }
            });
            return formData;
        }
        set(data) {
            
            var $this = this;
            $this.row.attr("status", "added");
            $this.row.attr("is-new", "false");
            $this.row.attr("uuid", data["uuid"]);
            for (const property in data) {
            console.log(`property = ` + property + ": " + data[property]);
            if ($this.row.find("[name=" + property + "]").length > 0) {
                console.log("founded " + property);
                var ele = $this.row.find("[name=" + property + "]");
                if (ele.length > 0) {
                    var type = ele.attr("type");
                    if (type == "file") {
                        ele.hide();
                        var value = data[property];
                        var decode_url = decodeURIComponent(value);
                        var filename = decode_url.split('/')[decode_url.split('/').length-1]
                        var file_html = "";
                        var nameDeleteActions=type+"accountAccountInlineDeletedAttacthment"
                        file_html += `
                                <div class="form-group row col-xl-8 table-hover mt-1" style="background-color:gainsboro;height: 25px;" id="` + data["uuid"] + `AttachmentDivId">
                                    <div class="col-xl-10 view-attachment-class text-break text-truncate" >
                                        <span><a style="color:cornflowerblue" target="_blank" href="` + value + `"><p><b>` + filename + `</b></p></a></span>
                                    </div>
                                    <div class="col-xl-2 text-end">
                                        <i class="fas fa-times" style="color:gray" file-uuid="` + data["uuid"] + `" id="` + data["uuid"] + `btnDeleteId" onclick="`+nameDeleteActions+`(this)"></i>
                                    </div>
                                </div>
                            `;
                        ele.closest("td").append(file_html);
                    } else {
                        var has_date = ele.attr("data-datepicker");
                        if (typeof has_date !== 'undefined' && has_date !== false) {
                            console.log("data[property]:",data[property]);
                            var date_value =  GetDateOnly_V01(data[property]);
                            console.log("data[property] after:",date_value);
                            if (date_value != "NaN-NaN-NaNTNaN:NaN" && !date_value.toString().includes("NaN") && date_value != null &&date_value != ""&&date_value != undefined )
                            {
                                ele.val(date_value).change();
                            }
                        } else {
                            
                try{
                    if (property == "groups"){
                        var arr_value=[];
                        for(var i in data[property]){
                            var value = data[property][i]["uuid"];
                            if (value != undefined){
                                arr_value.push(value);
                            }
                        }
                        ele.val(arr_value).change();
                        continue;
                    }
                    else{
                        // ele.val(null);
                    }
                }
                catch(err) {
                    console.log('err = ', err);
                }
    
                try{
                    if (property == "user_permissions"){
                        var arr_value=[];
                        for(var i in data[property]){
                            var value = data[property][i]["uuid"];
                            if (value != undefined){
                                arr_value.push(value);
                            }
                        }
                        ele.val(arr_value).change();
                        continue;
                    }
                    else{
                        // ele.val(null);
                    }
                }
                catch(err) {
                    console.log('err = ', err);
                }
    
                    if (type == "checkbox") {
                        try{
                            if (property == "is_callbot"){
                                var value=data[property];
                                if (value != undefined){
                                    ele.prop('checked', value);
                                }
                                continue;
                            }
                        }
                        catch(err) {
                            console.log('err = ', err);
                        }
                    }
                    
            
                    if (type == "checkbox") {
                        try{
                            if (property == "is_chatbot"){
                                var value=data[property];
                                if (value != undefined){
                                    ele.prop('checked', value);
                                }
                                continue;
                            }
                        }
                        catch(err) {
                            console.log('err = ', err);
                        }
                    }
                    
            
                    try{
                        if (property == "manager"){
                            var value=data[property]["uuid"];
                            if (value != undefined){
                                ele.val(value).change();
                            }

                            continue;
                        }
                    }
                    catch(err) {
                        console.log('err = ', err);
                    }
    
                    if (type == "checkbox") {
                        try{
                            if (property == "log_confirm_by_email"){
                                var value=data[property];
                                if (value != undefined){
                                    ele.prop('checked', value);
                                }
                                continue;
                            }
                        }
                        catch(err) {
                            console.log('err = ', err);
                        }
                    }
                    
            
                    if (type == "checkbox") {
                        try{
                            if (property == "logged_with_password"){
                                var value=data[property];
                                if (value != undefined){
                                    ele.prop('checked', value);
                                }
                                continue;
                            }
                        }
                        catch(err) {
                            console.log('err = ', err);
                        }
                    }
                    
            
                    if (type == "checkbox") {
                        try{
                            if (property == "created_free_license"){
                                var value=data[property];
                                if (value != undefined){
                                    ele.prop('checked', value);
                                }
                                continue;
                            }
                        }
                        catch(err) {
                            console.log('err = ', err);
                        }
                    }
                    
            
                    if (type == "checkbox") {
                        try{
                            if (property == "email_activated"){
                                var value=data[property];
                                if (value != undefined){
                                    ele.prop('checked', value);
                                }
                                continue;
                            }
                        }
                        catch(err) {
                            console.log('err = ', err);
                        }
                    }
                    
            
                    try{
                        if (property == "website_template"){
                            var value=data[property]["uuid"];
                            if (value != undefined){
                                ele.val(value).change();
                            }

                            continue;
                        }
                    }
                    catch(err) {
                        console.log('err = ', err);
                    }
    
                try{
                    if (property == "app_permissions"){
                        var arr_value=[];
                        for(var i in data[property]){
                            var value = data[property][i]["uuid"];
                            if (value != undefined){
                                arr_value.push(value);
                            }
                        }
                        ele.val(arr_value).change();
                        continue;
                    }
                    else{
                        // ele.val(null);
                    }
                }
                catch(err) {
                    console.log('err = ', err);
                }
    
                try{
                    if (property == "extend_field"){
                        var arr_value=[];
                        for(var i in data[property]){
                            var value = data[property][i]["uuid"];
                            if (value != undefined){
                                arr_value.push(value);
                            }
                        }
                        ele.val(arr_value).change();
                        continue;
                    }
                    else{
                        // ele.val(null);
                    }
                }
                catch(err) {
                    console.log('err = ', err);
                }
    
                            var data_value = data[property];
                            if (data_value != "NaN" && !data_value.toString().includes("NaN") && data_value != null &&data_value != ""&&data_value != undefined )
                            {
                                ele.val(data_value).change();
                            }
                        }
                        
                        console.log("set value for name: " + property + " value: " + data[property]);
                    }

                }

            }
        }
        }
        add() {

        }
        setOrder(number) {
            this.row.find('.stt-account').html(number);
        }
    }

    class accountAccountdetailTnvColumn {

        constructor($this) {
            this.name = $($this).attr("attr-name");
        }
        delete() {

        }
        get() {

        }
        set() {

        }
        add() {

        }
    }
    class accountAccountdetailTnvTable {
        totalRow;
        columns = [];
        rows = [];
        current_num = 0;
        constructor($this) {
                this.$this = $this;
                this.tableId = $this.id;
                this.table = $($this);
                var columns = new Array();
                var rows = new Array();
                this.thead = $($this).find("thead");
                this.tbody = $($this).find("tbody");
                this.thead.find("th").each(function() {
                    var column = new accountAccountdetailTnvColumn(this);
                    console.log(column);
                    columns.push(column);
                })
                this.columns = columns;
                var template;
                this.tbody.find("tr").each(function() {
                    if ($(this).attr("is-new") == "template") {
                        template = new accountAccountdetailTnvRow(this);
                    } else {
                        var row = new accountAccountdetailTnvRow(this);
                        console.log(row);
                        rows.push(row);
                    }

                })
                this.template = template;
                this.rows = rows;
                this.current_num = this.rows.length;


            }
            //làm tươi bảng
        refresh() {
                this.rows.forEach(row => {
                    console.log(row);
                    row.remove();
                })
                this.current_num = 0;
                this.table.attr("parent-attr-uuid","");
            }
            // thêm dòng trắng
        addRow() {
                var new_row = this.template.row.clone(true);
                new_row = new_row.removeClass("d-none").attr("is-new", "true").attr("status", "new");
                new_row.appendTo(this.tbody);
                // Đăng ký sự kiện cho
                this.current_num += 1;
                // var datepickers = [].slice.call(d.querySelectorAll('[data-datepicker]'))
                // var datepickersList = datepickers.map(function(el) {
                //     return new Datepicker(el, {
                //         buttonClass: 'btn',
                //         format: 'dd/mm/yyyy'
                //     });
                // })
                new_row.find(".stt-account").html(this.current_num);
                var this_table = this;
                new_row.delegate('.account-Account-detail-DeleteRowBtnId', 'click', function() {
                    var delete_row = new accountAccountdetailTnvRow(new_row);
                    var table = new accountAccountdetailTnvTable(this_table.$this);
                    table.deleteRow(delete_row);
                });
                new_row.delegate('.account-Account-detail-CloneRowBtnId', 'click', function() {
                    var crr_clone_row = $(this).closest("tr");
                    var clone_row = crr_clone_row.clone(true).attr("is-new", "true").attr("status", "new");
                    clone_row.appendTo(this_table.tbody);
                    clone_row.find("input").change();
                    var table = new accountAccountdetailTnvTable(this_table.$this);
                    table.reOrder();
                });
                
                return new_row;
            }
            // xóa dòng
        deleteRow(thisRow) {
            var row = thisRow;
            var table = this;
            $.confirm({
                icon: 'fa fa-warning',
                title: 'XÓA',
                content: 'Bạn có chắc muốn xóa ?!',
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
                            row.delete(table)
                        }
                    },
                    
                }
            });
        }
        getFormDataRows() {
            var lstFormData = [];
            this.rows.forEach(row => {
                var obj = row.getFormData();
                lstFormData.push(obj);
            })
            return lstFormData;
        }
        getObjectRows() {
                var lst = [];
                this.rows.forEach(row => {
                    var obj = row.get();
                    lst.push(obj);
                })
                return lst;
            }
            // list danh sách
        bindRows(lstData = null) {
            this.refresh();
            var table = this;
            if (lstData != null) {
                lstData.forEach(data => {
                    var empty_row = new accountAccountdetailTnvRow(table.addRow());
                    empty_row.set(data);
                });
            } else {
                console.log("list Empty");
            }

        }

        reOrder() {
            this.rows.forEach(row => {
                var order = this.rows.indexOf(row) + 1;
                console.log(row);
                row.setOrder(order);
            })
            this.current_num = this.rows.length;
        }

    }
        

        // ########## [Create New Row] Clicked Handle function ##############
        $(document).ready(function(){
            $(".accountAccount-detailAddInlineTableBtnId").click(function(){
             var table = new accountAccountdetailTnvTable($("#accountAccountdetailDataTableAddingId"));
             table.addRow();
             });
        });

            
        function accountSaveInlineTable(TableId='accountAccountdetailInlineTableTableId',parent_name=null,parent_value=null,form_data_parent=null) {
        console.log("tableBody: "+ TableId);
        
        var depend=$("#" + TableId).attr("depend");
        var parent_attr_name=$("#" + TableId).attr("parent-attr-name");
        var parent_attr_uuid=$("#" + TableId).attr("parent-attr-uuid");
        if(parent_name!=null){
        parent_attr_name=parent_name
        }
        if(parent_value!=null){
        parent_attr_uuid=parent_value
        }
        var add = $("#" + TableId).find("tr[status=new]").length;
        console.log("New TableOject: "+ add);
        if (add > 0) {
            $("#" + TableId).find("tr[status=new]").each(function() {
                $(this).attr("parent-attr-name",parent_attr_name);
                $(this).attr("parent-attr-uuid",parent_attr_uuid);
                $(this).attr("depend",depend);
                if(accountvalidate(this)){
                 var obj = new AccountAccount();
                obj.tCreateNewPostRowApi(this,form_data_parent);
                $(this).css("background-color", "green");
                }
             })
        }
        var update = $("#" + TableId).find("tr[status=added]").length;
        console.log("Update TableOject: "+ update);
        if (update > 0) {
            $("#" + TableId).find("tr[status=added]").each(function() {
                $(this).attr("parent-attr-name",parent_attr_name);
                $(this).attr("parent-attr-uuid",parent_attr_uuid);
                $(this).attr("depend",depend);
                if(accountvalidate(this)){
                var obj = new AccountAccount();
                obj.tUpdateNewPostRowApi(this,form_data_parent);
                $(this).css("background-color", "green");
                }
            })
        }
        var deleted = $("#" + TableId).find("tr[status=deleted]").length;
        console.log("Deleted TableOject: "+ deleted);
        if (deleted > 0) {
            $("#" + TableId).find("tr[status=deleted]").each(function() {
                $(this).attr("parent-attr-name",parent_attr_name);
                $(this).attr("parent-attr-uuid",parent_attr_uuid);
                $(this).attr("depend",depend);
                if(accountvalidate(this)){
                    var uuid=$(this).attr("uuid");
                    var obj = new AccountAccount();
                    obj.tDeleteApi(uuid);
                    $(this).remove();
                }
            })
        }
            // $("#"+TableId).find("tr[is-new=true]").length ;
    
    }
        
        

        // ########## [Event Validate Info] Clicked Handle function ##############

function accountvalidate($this) {
        var is_ok = true;
        
                console.log($($this).find(".username-account-account").val());
                var username = $($this).find(".username-account-account").val()
                if (!accountStringType(username) && !accountCheckNull(username)) { 
                toastr.warning('"username": Sai định dạng hoặc chưa điền đầy đủ thông tin! ');
                is_ok = false;
                 }
                
                console.log($($this).find(".full_name-account-account").val());
                var full_name = $($this).find(".full_name-account-account").val()
                if (!accountStringType(full_name) && !accountCheckNull(full_name)) { 
                toastr.warning('"full_name": Sai định dạng hoặc chưa điền đầy đủ thông tin! ');
                is_ok = false;
                 }
                
                console.log($($this).find(".email-account-account").val());
                var email = $($this).find(".email-account-account").val()
                if (!accountStringType(email) && !accountCheckNull(email)) { 
                toastr.warning('"email": Sai định dạng hoặc chưa điền đầy đủ thông tin! ');
                is_ok = false;
                 }
                
                console.log($($this).find(".date_of_birth-account-account").val());
                var date_of_birth = $($this).find(".date_of_birth-account-account").val()
                if (!accountStringType(date_of_birth) && !accountCheckNull(date_of_birth)) { 
                toastr.warning('"date_of_birth": Sai định dạng hoặc chưa điền đầy đủ thông tin! ');
                is_ok = false;
                 }
                
                console.log($($this).find(".telephone-account-account").val());
                var telephone = $($this).find(".telephone-account-account").val()
                if (!accountStringType(telephone) && !accountCheckNull(telephone)) { 
                toastr.warning('"telephone": Sai định dạng hoặc chưa điền đầy đủ thông tin! ');
                is_ok = false;
                 }
                
                console.log($($this).find(".password-account-account").val());
                var password = $($this).find(".password-account-account").val()
                if (!accountStringType(password) && !accountCheckNull(password)) { 
                toastr.warning('"password": Sai định dạng hoặc chưa điền đầy đủ thông tin! ');
                is_ok = false;
                 }
                
        return is_ok;

}

            

        // ########## [ReDraw Order] Clicked Handle function ##############
                function accountReDrawOrder(table){
                var count=0;
                $(table+' > tr').each(function() {
                $(this).find(".stt-account").html(count);
                count+=1;
                });
                //count_row_account=$(table+'> tr').length-1;
                }
                

            

        // ########## [Validate for SomeType] ##############
        function accountIsUUID ( uuid ) {
            let s = "" + uuid;
        
            s = s.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$');
            if (s === null) {
              return false;
            }
            return true;
        }               
        function accountDateType(value) {
            if (accountCheckNull(value)) {
                return false;
            }
            var value = new Date(moment(value, "DD/MM/YYYY"));
            console.log(time instanceof Date && !isNaN(time))
            if (time instanceof Date && !isNaN(time)) {
                return false;
            }
            return true;
        }
        
        function accountStringType(value) {
            if (accountCheckNull(value)) {
                return false;
            }
            return true;
        }
        
        function accountIntegerType(value) {
            return $.isNumeric(value);
        }
        
        function accountCheckNull(value) {
            is_valid = false;
            if (value == null) return true;
            value = value.trim();
            if (value === undefined || value === "" || value === " ") {
                is_valid = true;
            }
            return is_valid;
        }

            