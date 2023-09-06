$(document).ready(function() {



})



class TnvAttachment {
    templateTogether = `<div class="form-group row">
    <h6 class="heading-small text-muted mb-4">{{$attr-name}}&nbsp;<i class="fas fa-paperclip"></i></h6>
    {{$attachment-alone}}
    </div>`;
    templateAlone = `
    <div class="form-group row col-xl-8 table-hover mt-1" style="background-color:gainsboro;height: 25px;" id="{{$file-div-id}}">
    <div class="col-xl-10 {{$class-to-view}}" >
        <span><a style="color:cornflowerblue" href="{{$attachment-link}}"><p><b>{{$attach-name}}</b></p></a></span>
    </div>
    <div class="col-xl-2 text-end">
        <i class="fas fa-times" style="color:gray" file-uuid="{{$attachment-id}}" id="{{$btnDeleteId}}"></i>
    </div>
    </div>`;
    constructor(parent_div_id, data) {
        $("#" + parent_div_id).html("");
        var attach = "";
        if (Array.isArray(data)) {
            var attach_temp = this.templateAlone;
            data.forEach(file => {
                attach_temp = attach_temp
                    .replaceAll("{{$class-to-view}}", "")
                    .replaceAll("{{$attachment-link}}", "")
                    .replaceAll("{{$attach-name}}", "")
                    .replaceAll("{{$attachment-id}}", "")
                    .replaceAll("{{$file-div-id}}", "")
                    .replaceAll("{{$btnDeleteId}}", "");
            });
        } else {

        }

        $("#" + parent_div_id).append(attach);

    }
    bindInForm() {

    }
    delete() {

    }

}