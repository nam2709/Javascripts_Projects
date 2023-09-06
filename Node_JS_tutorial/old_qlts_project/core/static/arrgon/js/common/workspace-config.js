// LẤY MÃ TỔ CHỨC
var SERVER = getOrgId();
// document.addEventListener("DOMContentLoaded", function(event) { 
// });
function getOrgId(){
    if (document.getElementById("mps_hr360_org_id") != null) {
        var org_id = document.getElementById("mps_hr360_org_id").value
        if(org_id != undefined && org_id != ""){
            return `/workspace/${org_id}/app/hr360`
        }
    }
    return "";
}
