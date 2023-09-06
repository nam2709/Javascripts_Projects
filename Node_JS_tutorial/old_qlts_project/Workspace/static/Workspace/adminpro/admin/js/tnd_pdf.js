$( document ).ready(function() {
    var pdf_objs = $(".pdf-obj");
    console.log(pdf_objs.length);
    for (i = 0; i < pdf_objs.length; i++){
        var obj_id = pdf_objs[i].dataset.id;
        console.log(obj_id);
        var obj_file_path = pdf_objs[i].dataset.filepath;
        console.log(obj_file_path);
        var $current_obj = $("#" + obj_id);
        //PDFObject.embed(obj_file_path, $current_obj, {page: "2"}, {id: "myPDF1"}, {width: "500px"}, document.body);
    }
});