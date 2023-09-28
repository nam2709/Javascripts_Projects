function hidePopUp(){
    $('#modalUser').hide();
}
var current_page = 1

function SaveUserEvent() {
    $(".btnCreate-User").click(function() {
        SaveUser();
    })
}

function GetListRIM() {
    var listUser = [];
    var obj = new Object();
    $("tr").each(function() {
        if ($(this).attr('is_parent') == "false") {
            console.log($(this).attr('class'));
            obj = new Object();
            obj.menuId = $(this).attr('class');
            obj.is_show = $("#ckcShow" + obj.menuId).prop("checked");
            obj.is_add = $("#ckcAdd" + obj.menuId).prop("checked");
            obj.is_edit = $("#ckcEdit" + obj.menuId).prop("checked");
            obj.is_delete = $("#ckcDelete" + obj.menuId).prop("checked");
            obj.is_parent = false;
            listUser.push(obj);
        } else if ($(this).attr('is_parent') == "true") {
            console.log($(this).attr('class'));
            obj = new Object();
            obj.menuId = $(this).attr('class');
            obj.is_show = $("#ckcShowAll" + obj.menuId).prop("checked");
            obj.is_add = $("#ckcAddAll" + obj.menuId).prop("checked");
            obj.is_edit = $("#ckcEditAll" + obj.menuId).prop("checked");
            obj.is_delete = $("#ckcDeleteAll" + obj.menuId).prop("checked");
            obj.is_parent = true;
            listUser.push(obj);
        }
    });
    return listUser;
}

function validateUserObject(obj) {
    var is_valid = true;
    for (var propName in obj) {
        if (obj[propName] === null || obj[propName] === undefined || obj[propName] === "null" || obj[propName] === "") {
            is_valid = false;
            if (propName == "username") {
                $("#txtUsername").addClass("is-invalid")
            }
            if (propName == "email") {
                $("#txtEmail").addClass("is-invalid")
            }
            if (propName == "unit") {
                $("#txtUnit").addClass("is-invalid")
            }
            if (propName == "department") {
                $("#txtDepartment").addClass("is-invalid")
            }
            if (propName == "position") {
                $("#txtPosition").addClass("is-invalid")
            }
            if (propName == "academic_rank") {
                $("#txtAcademicRank").addClass("is-invalid")
            }
            if (propName == "lecturer_rank") {
                $("#txtLecturerRank").addClass("is-invalid")
            }
            if (propName == "degree") {
                $("#txtDegree").addClass("is-invalid")
            }
            if (propName == "gender") {
                if ($("#divPass").is(":visible")) {
                    $("#txtGender").addClass("is-invalid")
                } else {
                    $("#txtGender1").addClass("is-invalid")
                }

            }
            if (propName == "lecturer_rank") {
                $("#txtLecturerRank").addClass("is-invalid")
            }
        } else {
            if (propName == "username") {
                $("#txtUsername").removeClass("is-invalid").addClass("is-valid")
            }
            if (propName == "email") {
                $("#txtEmail").removeClass("is-invalid").addClass("is-valid")
            }
            if (propName == "unit") {
                $("#txtUnit").removeClass("is-invalid").addClass("is-valid")
            }
            if (propName == "department") {
                $("#txtDepartment").removeClass("is-invalid").addClass("is-valid")
            }
            if (propName == "position") {
                $("#txtPosition").removeClass("is-invalid").addClass("is-valid")
            }
            if (propName == "academic_rank") {
                $("#txtAcademicRank").removeClass("is-invalid").addClass("is-valid")
            }
            if (propName == "lecturer_rank") {
                $("#txtLecturerRank").removeClass("is-invalid").addClass("is-valid")
            }
            if (propName == "degree") {
                $("#txtDegree").removeClass("is-invalid").addClass("is-valid")
            }
            if (propName == "gender") {
                if ($("#divPass").is(":visible")) {
                    $("#txtGender").removeClass("is-invalid").addClass("is-valid")
                } else {
                    $("#txtGender1").removeClass("is-invalid").addClass("is-valid")
                }
            }
            if (propName == "lecturer_rank") {
                $("#txtLecturerRank").removeClass("is-invalid").addClass("is-valid")

            }
        }
    }
    return is_valid;
}

function SaveUser(isAddRole = false) {
    var action = ""
    if ($("#divPass").is(":visible")) {
        action = "create";
    } else {
        action = "update";
    }
    var obj = GetFormUser();
    if (!validateUserObject(obj)) {
        ShowAlert("danger", "Vui lòng điền đầy đủ thông tin");
        return;
    }
    $.ajax({
        url: '/main/user-save/' + action + "/" + obj.username,
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify({
            "user": obj
        }),
        contentType: "application/json; charset=utf-8",
        complete: function(res, status, data) {
            if (res.responseJSON.status == "ok") {
                ShowAlert("success", "Lưu thông tin thành công!");
                GetListUser(current_page);

                if (isAddRole) {
                    $('#modalUser').modal('hide');
                    $('#uuidUser').val(obj.username);
                    $('#titleUserSetRole').html(obj.username);
                    $('#modalAddRole').modal('toggle');
                } else {
                    $('#modalUser').modal('hide');
                }
            } else if (res.responseJSON.status == "username-exist") {
                ShowAlert("danger", "Tên tài khoản đã tồn tại!");
                $("#txtUsername").addClass("is-invalid");
            }
        }
    });
}
//cap nhạt quyen
function UpdateRole() {
    var user = $("#uuidUser").val();
    var role = $("#txtRole").val();
    if (user == "" || user == null) {
        ShowAlert("danger", "gặp lỗi trong việc cập nhật tài khoản của bạn!");
        return;
    }
    if (role == "" || role == null) {
        ShowAlert("danger", "Vui lòng chọn quyền cho tài khoản <b>" + user + "</b>");
        return;
    }
    $.ajax({
        url: '/main/user-update-role/' + user + "/",
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify({
            "role": role
        }),
        contentType: "application/json; charset=utf-8",
        complete: function(res, status, data) {
            if (res.responseJSON.status == "ok") {
                ShowAlert("success", "Lưu quyền thành công thành công!");
                $('#modalAddRole').modal('hide');
                //                    if(isAddRole){
                //                    $('#modalUser').modal('hide');
                //                    AddRole();
                //                    }else{
                //                    $('#modalUser').modal('hide');
                //
                //                    }
            } else if (res.responseJSON.status == "username-notfound") {
                ShowAlert("danger", "Gặp vấn đề trong quá trình phân quyền cho tài khoản!")
            } else {
                ShowAlert("danger", "Gặp lỗi trong quá trình lưu thông tin!")
            }
        }
    });
}
//Xóa User
function DeleteUser(username) {
    var isDelete = confirm("Bạn có chắc muốn xóa tài khoản " + username + "?")
    if (isDelete) {
        $.ajax({
            url: '/main/user-delete/' + username,
            type: 'GET',
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            complete: function(res, status, data) {
                if (res.responseJSON.status == "ok") {
                    ShowAlert("success", "Xóa tài khoản thành công!");
                    GetListUser(current_page);
                } else {
                    ShowAlert("danger", "Gặp lỗi trong quá trình lưu thông tin!")
                }

            }
        });
    }

}
//lấy chi tiết quyền
function getDetailUser(uuid) {
    $.ajax({
        url: '/main/user-info/' + uuid,
        type: 'GET',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        complete: function(res, status, data) {
            if (res.responseJSON.status == "ok") {
                var info = cleanObject(res.responseJSON.user);
                $('#modalUser').modal('toggle');
                SetFormUser(cleanObject(info));
            }

        }
    });
}
function getDetailScienceProfile(uuid){
    $.ajax({
        url: '/science-profile/science-profile-detail/' + uuid,
        type: 'GET',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        complete: function(res, status, data) {
            if (res.responseJSON.status == "ok") {
                var info = cleanObject(res.responseJSON);
                console.log(info)
                $('#modalUser').modal('toggle');
                SetFormScienceProfile(cleanObject(info));
            }

        }
    });}
function SetFormUser(obj) {
    $("#txtUsername").val(obj.user__username).prop("disabled", true);
    $("#txtFullName").val(obj.name);
    $("#txtEmail").val(obj.email);
    $("#divPass").hide();
    $("#divUsername").hide();
    $("#divGender1").show();
    $("#textUsername").show();
    $("#txtUnit").val(obj.unit__uuid);
    $(".txtGender").val(obj.gender);
    $("#txtDegree").val(obj.degree__uuid);
    $("#txtDepartment").val(obj.department__uuid);
    $("#txtPosition").val(obj.position__uuid);
    $("#txtAcademicRank").val(obj.academic_rank__uuid);
    $("#txtLecturerRank").val(obj.lecturer_rank__uuid);
}
function SetFormScienceProfile(obj) {
    // User Information
    $("#txtBirthDayDay").val(obj.user_profile.birthday.date)
    $("#txtBirthDayMonth").val(obj.user_profile.birthday.month)
    $("#txtBirthDayYear").val(obj.user_profile.birthday.year)
    $("#academic_rank_year").val(obj.user_profile.academic_rank_year)
    $("#degree_year").val(obj.user_profile.degree_year)
    $("#foreign_language").val(obj.user_profile.foreign_language)
    $("#txtmobile").val(obj.user_profile.mobile)
    $("#researchtitle").val(obj.user_profile.research_title);
    // Field Teaching
    $("#field_teaching").val(obj.field_teaching.field_teaching);
    $("#course_name").val(obj.field_teaching.course_name);
    $("#refresher_course").val(obj.field_teaching.refresher_course);
    // Field Research
    $("#field_research").val(obj.field_research.field_research);
    $("#directed_studies").val(obj.field_research.directed_studies);
    // Organization
    $("#name_organization").val(obj.organization.name)
    $("#phone_organization").val(obj.organization.phone_number);
    $("#fax_number").val(obj.organization.fax_number);
    $("#leader_organization").val(obj.organization.leader);
    $("#leader_phonenumber").val(obj.organization.leader_phone);
    // For Loop
    // Trainning Process
    var trainningProcess = obj.tranning_process
    for(let i = 0; i < trainningProcess.length; i++){
        var html = $('.trainning-process-row').prop('outerHTML')
        if(i !== 0){
            html = $('.trainning-process-table tbody').append(html)
        }
        $('.trainning-process-row').eq(i).data("idRow", trainningProcess[i].id)
        $("[name=education_level]").eq(i).val(trainningProcess[i].education_level)
        $("[name=education_location]").eq(i).val(trainningProcess[i].education_location)
        $("[name=education_specialization]").eq(i).val(trainningProcess[i].specialization)
        $("[name=graduated_year]").eq(i).val(trainningProcess[i].graduated_year)
    }
    var workingProcess = obj.working_process
    for(let i = 0; i < workingProcess.length; i++){
        var html = $('.working-process-row').prop('outerHTML')
        if(i !== 0){
            $('.working-process-table tbody').append(html)
        }
        $('.working-process-row').eq(i).eq(i).data("idRow", workingProcess[i].id)
        $("[name=work_organization]").eq(i).val(workingProcess[i].work_organization)
        $("[name=work_organization_location]").eq(i).val(workingProcess[i].work_organization_location)
        $("[name=work_position]").eq(i).val(workingProcess[i].work_position)
        $("[name=work_time_start]").eq(i).val(workingProcess[i].time_start)
        $("[name=work_time_end]").eq(i).val(workingProcess[i].time_end)
        $("[name=work_unit]").eq(i).val(workingProcess[i].work_unit)
        $("[name=areas_expertise]").eq(i).val(workingProcess[i].areas_expertise)
    }
    var certificateSP = obj.certificate
    for(let i = 0; i < certificateSP.length; i++){
        var html = $('.certificate-row').prop('outerHTML')
        if(i !== 0){
            html = $('.certificate-table tbody').append(html)
        }
        $('.certificate-row').eq(i).data("idRow", certificateSP[i].id)
        $("[name=certificate_name]").eq(i).val(certificateSP[i].name),
        $("[name=certificate_year]").eq(i).val(certificateSP[i].year)
    }
    var participationProject = obj.participation_project
    for(let i = 0; i < participationProject.length; i++){
        var html = $('.participation-row').prop('outerHTML')
        if(i !== 0){
            $('.participation-table tbody').append(html)
        }
        $('.participation-row').eq(i).data("idRow", participationProject[i].id)
        $("[name=status_participation_project]").eq(i).val(participationProject[i].status)
        $("[name=time_start_participation_project]").eq(i).val(participationProject[i].time_start)
        $("[name=time_end_participation_project]").eq(i).val(participationProject[i].time_end)
        $("[name=under_program_participation_project]").eq(i).val(participationProject[i].under_program)
        $("[name=name_participation_project]").eq(i).val(participationProject[i].name)
    }
    var chairmanProject = obj.chairman_project
    for(let i = 0; i < chairmanProject.length; i++){
        var html = $('.chairman-row').prop('outerHTML')
        if(i !== 0){
            html = $('.chairman-table tbody').append(html)
        }
        $('.chairman-row').eq(i).data("idRow", chairmanProject[i].id)
        $("[name=status_project_chairman]").eq(i).val(chairmanProject[i].status)
        $("[name=time_start_project_chairman]").eq(i).val(chairmanProject[i].time_start)
        $("[name=time_end_project_chairman]").eq(i).val(chairmanProject[i].time_start)
        $("[name=under_program_project_chairman]").eq(i).val(chairmanProject[i].under_program)
        $("[name=name_project_chairman]").eq(i).val(chairmanProject[i].name)
    }
    var mainPublishWorkd = obj.main_publish_work
    for(let i = 0; i < mainPublishWorkd.length; i++){
        var html = $('.publish-work-row').prop('outerHTML')
        if(i !== 0){
            html = $('.publish-work-table tbody').append(html)
        }
        $('.publish-work-row').eq(i).data("idRow", mainPublishWorkd[i].id)
        $("[name=publish_location]").eq(i).val(mainPublishWorkd[i].publish_location)
        $("[name=publish_work_author]").eq(i).val(mainPublishWorkd[i].author)
        $("[name=publish_work_name]").eq(i).val(mainPublishWorkd[i].name)
        $("[name=publish_work_year]").eq(i).val(mainPublishWorkd[i].publish_year)
    }
    var workApplied = obj.work_applied
    for(let i = 0; i < workApplied.length; i++){
        var html = $('.work-applied-row').prop('outerHTML')
        if(i !== 0){
            html = $('.work-applied-table tbody').append(html)
        }
        $('.work-applied-row').eq(i).data("idRow", workApplied[i].id)
        $("[name=name_work_applied]").eq(i).val(workApplied[i].name)
        $("[name=scale_work_applied]").eq(i).val(workApplied[i].scale)
        $("[name=time_start_work_applied]").eq(i).val(workApplied[i].time_start)
        $("[name=time_end_work_applied]").eq(i).val(workApplied[i].time_end)
    }
    var award = obj.award
    for(let i = 0; i < award.length; i++){
        var html = $('.award-row').prop('outerHTML')
        if(i !== 0){
            html = $('.award-table tbody').append(html)
        }
        $('.award-row').eq(i).data("idRow", award[i].id)
        $("[name=time_award]").eq(i).val(award[i].year_award)
        $("[name=content_award]").eq(i).val(award[i].content_award)
    }
    $("[name=post_title_domestic]").val(obj.article[0].post_title),
    $("[name=author_name_domestic]").val(obj.article[0].author_name),
    $("[name=name_magazine_domestic]").val(obj.article[0].name_magazine),
    $("[name=episode_domestic]").val(obj.article[0].episode),
    $("[name=number_domestic]").val(obj.article[0].number),
    $("[name=page_domestic]").val(obj.article[0].page),
    $("[name=publish_year_domestic]").val(obj.article[0].publish_year),
    // Kỷ yếu hội nghị
    $("[name=conference_proceeding_name]").val(obj.conference_proceed[0].name_conference),
    $("[name=conference_proceeding_author]").val(obj.conference_proceed[0].author),
    $("[name=conference_proceeding_post_title]").val(obj.conference_proceed[0].post_title),
    $("[name=conference_proceeding_year]").val(obj.conference_proceed[0].year),
    $("[name=conference_proceeding_publish_company]").val(obj.conference_proceed[0].publish_company),
    // Quốc tế
    $("[name=title_international_science]").val(obj.international_article[0].title_science),
    $("[name=author_international]").val(obj.international_article[0].author),
    $("[name=title_book_international]").val(obj.international_article[0].title_book),
    $("[name=edition_international]").val(obj.international_article[0].edition),
    $("[name=editor_international]").val(obj.international_article[0].editor),
    $("[name=publisher_international]").val(obj.international_article[0].publisher),
    $("[name=page_number_international]").val(obj.international_article[0].page_number),
    $("[name=year_international]").val(obj.international_article[0].year),
    // Book
    $("[name=name_book]").val(obj.book[0].name),
    $("[name=author_book]").val(obj.book[0].author),
    $("[name=publish_number_book]").val(obj.book[0].publish_number),
    $("[name=publisher_book]").val(obj.book[0].publisher),
    $("[name=year_book]").val(obj.book[0].year),
    // Ten Giải thưởng
    $("[name=name_award]").val(obj.intellectual_property[0].name),
    $("[name=txtnumber]").val(obj.intellectual_property[0].number),
    $("[name=txtYearLevel]").val(obj.intellectual_property[0].year),
    $("[name=countrylevel]").val(obj.intellectual_property[0].country),
    // Giải thưởng về khoa học công nghệ
    $("[name=solution_name]").val(obj.science_technology_award[0].name),
    $("[name=organization_level]").val(obj.science_technology_award[0].organization),
    $("[name=year_level]").val(obj.science_technology_award[0].year)
}
function GetFormUser() {
    var obj = new Object();
    obj.username = $("#txtUsername").val();
    obj.name = $("#txtName").val();
    obj.email = $("#txtEmail").val();
    if ($("#divPass").is(":visible")) {
        var pass1 = $("#txtPassword1").val();
        var pass2 = $("#txtPassword2").val();
        if (pass1 == pass2) {
            if (!ValidatePassword(pass1)) {
                $("#txtPassword2").addClass("is-invalid")
                $("#txtPassword1").addClass("is-invalid")
                ShowAlert("danger", "Mật Khẩu phải có ít nhất <b> 8 ký tự</b> chứa <b>chữ số</b>, <b>chữ in hoa</b> và <b>chữ thường</b>.");
            }
            $("#txtPassword2").removeClass("is-invalid")
            $("#txtPassword1").removeClass("is-invalid")
            obj.password = $("#txtPassword2").val();
        } else {
            $("#txtPassword2").addClass("is-invalid")
            $("#txtPassword1").addClass("is-invalid")
        }
        obj.gender = $("#txtGender").val();
    } else {
        obj.gender = $("#txtGender1").val();
    }

    obj.degree = $("#txtDegree").val();
    obj.unit = $("#txtUnit").val();
    obj.department = $("#txtDepartment").val();
    obj.position = $("#txtPosition").val();
    obj.academic_rank = $("#txtAcademicRank").val();
    obj.lecturer_rank = $("#txtLecturerRank").val();
    return obj;
}
// sự kiện mở modal
function openPopupScienceProfile(uuid) {
    $("#titleUser").html("Chỉnh sửa lý lịch khoa học");
    $("#modalUser :input").prop("disabled", false);
    $(".btnCreate-ScienceProfile").val("update");
    $("#modalUser").modal("toggle")
    // getDetailUser(uuid);
    // getDetailScienceProfile(uuid);
}

//click to modul tích tất cả menu
function clickToAll(uuid) {
    $("." + uuid).each(function() {
        var ischecked = $("#" + uuid).is(':checked');
        if (ischecked) {
            $(this).prop('checked', true);
        } else {
            $(this).prop('checked', false);
        }

    });
}
// làm mới modal
function resetUserModal() {
    $("#txtUsername").val("").prop("disabled", false);
    $("#txtName").val("");
    $("#titleUser").html("Thêm tài khoản mới");
    $("#txtEmail").val("");
    $("#txtEmail").val("");
    $("#divPass").show();
    $("#divUsername").show();
    $("#textUsername").hide();
    $("#divGender1").hide();
    $("input[name=genderRadio1]").prop('checked', false);
    $("input[name=genderRadio]").prop('checked', false);
    $("#txtUnit").val("");
    $("#txtDepartment").val("");
    $("#txtDegree").val("");
    $("#txtPosition").val("");
    $("#txtAcademicRank").val("");
    $("#txtLecturerRank").val("");
    $("#txtUsername").removeClass("is-invalid").removeClass("is-valid")
    $("#txtEmail").removeClass("is-invalid").removeClass("is-valid")
    $("#txtUnit").removeClass("is-invalid").removeClass("is-valid")
    $("#txtDepartment").removeClass("is-invalid").removeClass("is-valid")
    $("#txtPosition").removeClass("is-invalid").removeClass("is-valid")
    $("#txtAcademicRank").removeClass("is-invalid").removeClass("is-valid")
    $("#txtLecturerRank").removeClass("is-invalid").removeClass("is-valid")
    $("#txtDegree").removeClass("is-invalid").removeClass("is-valid")
    $("#txtGender").removeClass("is-invalid").removeClass("is-valid")
    $("#txtGender1").removeClass("is-invalid").removeClass("is-valid")
    $("#txtLecturerRank").removeClass("is-invalid").removeClass("is-valid")
}

function SaveDone() {
    resetUserModal();
    $('#modalUser').modal('hide');
    window.location.reload();
}

function AddRole(username) {
    $('#modalUser').modal('hide');
    $('#uuidUser').val(username);
    $('#titleUserSetRole').html(username);
    $('#txtRole').val('');
    $('#modalAddRole').modal('toggle');
    $.ajax({
        url: '/main/role-by-user/' + username,
        type: 'GET',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        complete: function(res, status, data) {
            if (res.responseJSON.status == "ok") {
                roles = res.responseJSON.roles;
                roleArr = []
                if (roles.length > 0) {
                    for (var i in roles) {
                        roleArr.push(roles[i]["uuid"]);
                    }
                }
                $("#txtRole").val(roleArr);
            }
        }
    });
}

function ResetRoleModal() {
    //$('#modalUser').modal('hide');
    $('#uuidUser').val('');
    $('#titleUserSetRole').html('');
    $('#txtRole').val('');
}