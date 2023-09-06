$(document).ready(function() {
    if (localStorage.getItem("IsMenuLoaded") == "true") GenMenuArea();
    else GetAreaMenu();
});

function GenMenuArea() {
    var menuObjs = JSON.parse(localStorage.getItem("menuObjs"));
    var submenuObjs = JSON.parse(localStorage.getItem("submenuObjs"));
    var areaObjs = JSON.parse(localStorage.getItem("areaObjs"));
    areaObjs.sort((firstItem, secondItem) => firstItem.order - secondItem.order);
    menuObjs.sort((firstItem, secondItem) => firstItem.order - secondItem.order);
    var content = "";
    var DivAppend = $("#MenuAreaId");
    for (var i = 0; i < areaObjs.length; i++) {
        var thisArea = areaObjs[i];
        var menuContent = ""

        content = `
        <li class="nav-item pcoded-menu-caption">
                    <label>${thisArea.name}</label>
        </li>
        `;
        // content = `
        // <li class="nav-item pcoded-menu-caption">
        //             <label></label>
        // </li>
        // `;
        DivAppend.append(content);
        var thisMenu = []
        if (menuObjs != undefined && menuObjs.length > 0) {
            thisMenu = menuObjs.filter(menu => menu.menu_area.uuid == areaObjs[i]["uuid"]);
        }
        for (var j = 0; j < thisMenu.length; j++) {
            child_menu = "";
            has_menu = "";
            parent_url = thisMenu[j]["url"];
            thisSubMenu = []
            if (menuObjs != undefined && menuObjs.length > 0) {
                thisSubMenu = submenuObjs.filter(submenu => submenu.parent_menu.uuid == thisMenu[j]["uuid"]);
            }
            if (thisSubMenu.length > 0) {
                has_menu = "pcoded-hasmenu";
                parent_url = "#!"
                child_menu = `<ul class="pcoded-submenu">`;
                thisSubMenu.sort((firstItem, secondItem) => firstItem.order - secondItem.order);
                thisSubMenu.forEach(c_menu => {
                    child_menu += `
                            <li><a href="${c_menu["url"]}">${c_menu["name"]}</a></li>
                    `;
                });
                child_menu += `</ul>`;
                var this_menu = $("#templateMenuHasChild").clone(true).removeClass("d-none").removeAttr("id");
                var menu_icon = this_menu.find("#IconId").addClass(thisMenu[j]["fa_icon"]).removeAttr("id");
                var menu_name = this_menu.find("#MenuNameId").html(thisMenu[j]["name"]).removeAttr("id");
                this_menu.append(child_menu);
                this_menu.appendTo(DivAppend);
            } else {
                if (thisMenu[j]["is_single"]) {
                    var this_menu = $("#templateMenu").clone(true).removeClass("d-none").removeAttr("id");
                    var aHef = this_menu.find("#aHerfId").removeClass("d-none").removeAttr("id").attr("href", thisMenu[j]["url"]);
                    var menu_icon = this_menu.find("#IconId").addClass(thisMenu[j]["fa_icon"]).removeAttr("id");
                    var menu_name = this_menu.find("#MenuNameId").html(thisMenu[j]["name"]).removeAttr("id")
                    this_menu.appendTo(DivAppend);
                } else {
                    var this_menu = $("#templateMenuHasChild").clone(true).removeClass("d-none").removeAttr("id");
                    var menu_icon = this_menu.find("#IconId").addClass(thisMenu[j]["fa_icon"]).removeAttr("id");
                    var menu_name = this_menu.find("#MenuNameId").html(thisMenu[j]["name"]).removeAttr("id");
                    this_menu.appendTo(DivAppend);
                }

            }

            //     menuContent += `
            //     <li class="nav-item ${has_menu}" id="menulv1_${thisMenu[j]["uuid"]}">
            //         <a href="${parent_url}" class="nav-link "><span class="pcoded-micon"><i class="${thisMenu[j]["fa_icon"]}"></i></span><span class="pcoded-mtext">${thisMenu[j]["name"]}</span></a>
            //         ${child_menu}
            //     </li>
            // `;
        }

    }
}

function GetAreaMenu() {
    var areaObj = new MenuAreaMenuManagement();
    areaObj.tGetAllObjLargeApi(1, null);
    areaObj.callAjax.then(function(areaData) {
        localStorage.setItem("areaObjs", JSON.stringify(areaData.results));
        var menuObj = new ParentMenuMenuManagement();
        menuObj.tGetAllObjLargeApi(1, null);
        menuObj.callAjax.then(function(menuData) {
            localStorage.setItem("menuObjs", JSON.stringify(menuData.results));
            var submenuObj = new ChildMenuMenuManagement();
            submenuObj.tGetAllObjLargeApi(1, null);
            submenuObj.callAjax.then(function(submenuData) {
                localStorage.setItem("submenuObjs", JSON.stringify(submenuData.results));
                localStorage.setItem("IsMenuLoaded", "true");
                GenMenuArea();
            })
        })
    })


}