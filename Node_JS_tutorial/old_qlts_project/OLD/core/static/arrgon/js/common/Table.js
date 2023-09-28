class TnvRow {

    constructor($this) {
        this.row = $($this);
        this.order = parseInt($($this).find(".stt-prize").html());
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
            notyf.error('Bạn không thể xóa dòng này, đây là dòng mẫu!');
        } else {
            this.order -= 1;
            is_delete = true;
            this.row.attr("status", "deleted");
            this.row.hide();
        }
        new TnvTable(table.$this).reOrder();

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
                        if (files.length > 0) {
                            formData.append(attr, files[0]);
                        }

                    } else {
                        formData.append(attr, $(this).val());
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
                    var dateVal = toDatePythonByStringTime($(this).val(), 'DD/MM/YYYY');
                    formData.append(attr, dateVal);
                    // obj[attr] = dateVal;
                } else {
                    if (type == 'file') {
                        var files = $(this)[0].files;
                        // Check file selected or not
                        if (files.length > 0) {
                            formData.append(attr, files[0]);
                        }

                    } else {
                        formData.append(attr, $(this).val());
                        // obj[attr] = $(this).val();
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
            console.log(`pro= ` + property + ": " + data[property]);
            if ($this.row.find("[name=" + property + "]").length > 0) {
                console.log("founded " + property);
                var ele = $this.row.find("[name=" + property + "]");
                if (ele.attr("data-datepicker") != null) {
                    ele.val(toDatePythonByStringTime(data[property], "DD/MM/YYYY"));
                } else {
                    ele.val(data[property]);
                }
                console.log("set value for name: " + property + " value: " + data[property]);
            }
        }
    }
    add() {

    }
    setOrder(number) {
        this.row.find('.stt-prize').html(number);
    }
}

class TnvColumn {

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
class TnvTable {
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
                var column = new TnvColumn(this);
                console.log(column);
                columns.push(column);
            })
            this.columns = columns;
            var template;
            this.tbody.find("tr").each(function() {
                if ($(this).attr("is-new") == "template") {
                    template = new TnvRow(this);
                } else {
                    var row = new TnvRow(this);
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
        }
        // thêm dòng trắng
    addRow() {
            var new_row = this.template.row.clone();
            new_row = new_row.removeClass("d-none").attr("is-new", "true").attr("status", "new");
            new_row.appendTo(this.tbody);
            // Đăng ký sự kiện cho
            this.current_num += 1;
            // var datepickers = [].slice.call(d.querySelectorAll('[status=new]'))
            // var datepickersList = datepickers.map(function(el) {
            //     return new Datepicker(el, {
            //         buttonClass: 'btn',
            //         format: 'dd/mm/yyyy'
            //     });
            // })
            new_row.find(".stt-prize").html(this.current_num);
            var this_table = this;
            new_row.delegate('.prize-PrizeManagement-create-DeleteRowBtnId', 'click', function() {
                var delete_row = new TnvRow(new_row);
                var table = new TnvTable(this_table.$this);
                table.deleteRow(delete_row);
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
            closeIcon: true,
            animation: 'scale',
            type: 'red',
            buttons: {
                confirm: {
                    text: 'Đồng ý',
                    btnClass: 'btn-blue',
                    action: function() {
                        row.delete(table)


                    }
                },
                cancel: {
                    text: 'Hủy',
                }
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
        var table = this;
        if (lstData != null) {
            lstData.forEach(data => {
                var empty_row = new TnvRow(table.addRow());
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