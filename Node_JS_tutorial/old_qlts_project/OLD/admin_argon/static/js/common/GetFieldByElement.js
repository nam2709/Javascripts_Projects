function download(data, filename, type) {
    var file = new Blob([data], { type: type });
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
            url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}





function GetFieldById(Id) {
    var contentFile = "";
    var contentFile_list = "";

    var typeField = ""
    var field_style = "";
    var field_style_list = "";
    $(Id).find(':input').each(function() {
        var attr = $(this).attr('name');
        var type = $(this).attr('type');
        var date = $(this).attr('data-datepicker');
        typeField = ""
        field_style = "";
        field_style_list = "";

        if ($(this).is("select")) {

            typeField = "ForeignKey"
            if ($(this).prop('multiple')) {
                typeField = "ManyToManyField"
            }
        } else
        if ($(this).is("textarea")) {
            typeField = "TextField"
        } else
        if ($(this).is("input")) {

            if (typeof date !== 'undefined' && date !== false) {
                typeField = "DateTimeField"
            } else {

                if (type == 'file') {
                    typeField = "FileField"
                        // var files = $(this)[0].files;
                        // // Check file selected or not
                        // if (files.length > 0) {
                        //     formData.append($(this).attr('name'), files[0]);
                        // }
                } else if (type == 'checkbox') {
                    typeField = "CharField"
                } else if (type == 'radio') {
                    typeField = "BooleanField"
                        // if ($(this).is(":checked")) {
                        //     formData.set($(this).attr('name'), $(this).val());
                        // }
                } else {
                    typeField = "CharField"
                }
            }


        }
        field_style = `
        {
            name:"${attr}",
            type:"${typeField}",
            dome_type:"${type}",
        },
        `;
        field_style_list = `
            "${attr}",
        `;
        contentFile += field_style;
        contentFile_list += field_style_list;

        // if (typeof attr !== 'undefined' && attr !== false) {
        //     if (typeof date !== 'undefined' && date !== false) {
        //         formData.append($(this).attr('name'), toDatePythonByStringTime($(this).val(), 'DD/MM/YYYY'));
        //     } else {
        //         if (type == 'file') {
        //             var files = $(this)[0].files;
        //             // Check file selected or not
        //             if (files.length > 0) {
        //                 formData.append($(this).attr('name'), files[0]);
        //             }
        //         } else if (type == 'checkbox') {
        //             formData.append($(this).attr('name'), $(this).is(":checked"));
        //         } else if (type == 'radio') {

        //             if ($(this).is(":checked")) {
        //                 formData.set($(this).attr('name'), $(this).val());
        //             }
        //         } else {
        //             formData.append($(this).attr('name'), $(this).val());
        //         }
        //     }
        // }
    });
    download(contentFile, Id + "_field", "txt");
    download(contentFile_list, Id, "txt");
}