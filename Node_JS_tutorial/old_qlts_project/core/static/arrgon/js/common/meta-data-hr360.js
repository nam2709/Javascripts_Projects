// $(document).ready(function() {
//     GetMetaData();
// });


// function setCookie(cname, cvalue, exdays) {
//     const d = new Date();
//     d.setTime(d.getTime() + (exdays * 60 * 1000));
//     let expires = "expires="+d.toUTCString();
//     document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
// }
  
// function getCookie(cname) {
//     let name = cname + "=";
//     let ca = document.cookie.split(';');
//     for(let i = 0; i < ca.length; i++) {
//       let c = ca[i];
//       while (c.charAt(0) == ' ') {
//         c = c.substring(1);
//       }
//       if (c.indexOf(name) == 0) {
//         return c.substring(name.length, c.length);
//       }
//     }
//     return "";
// }
// list_cookies_refresh = [
//   'a360_accounts',
//   'a360_units',
//   'a360_titles',
// ]
// function checkCookie() {
//     list_cookies_refresh.forEach(function(element){
//         var cur_value = getCookie(element);
//         if (cur_value != "" && cur_value != null) {
//             setCookie(element, cur_value, 0);
//         }
//     });
// }

// document.addEventListener("DOMContentLoaded", function(event) { 
//     checkCookie();
// });

// /** lấy tất cả những dữ liệu cho việc khởi động phục vụ người dùng cuối */
// function GetMetaData(){
//     // var a360_units = new Promise(function(resolve, reject){
//     //     resolve(GetUnit())
//     // });
//     // a360_units.then(function(x){setCookie("a360_units",x,10)})
//     // var a360_titles = new Promise(function(resolve, reject){
//     //     resolve(GetTitle())
//     // });
//     // a360_titles.then(function(x){setCookie("a360_titles",x,10)})
//     // var a360_accounts = new Promise(function(resolve, reject){
//     //     resolve(GetA360Account())
//     // });
//     // a360_accounts.then(function(x){setCookie("a360_accounts",x,10)})
//     GetUnit();
//     GetTitle();
//     GetA360Account();
// }

// function GetUnit(){
//     var units = []
//     var obj = new A360UnitSelfRelatedA360NewOrganizationChartManagementList();
//     units = obj.getListApi();
//     obj.callAjax.then(function(data){
//         if (data.hasOwnProperty('results')) {
//             for (var i = 0; i < data.results.length; i++) {
//                 var x = new A360UnitSelfRelatedA360NewOrganizationChartManagement_ListItem(data.results[i]);
//                 units.push(x);
//                 }
//             } else {
//                 for (var i = 0; i < data.length; i++) {
//                     var x = new A360UnitSelfRelatedA360NewOrganizationChartManagement_ListItem(data[i]);
//                     units.push(x);
//                 }
//             }
//             setCookie("a360_units",units,10)
//     })
//     return units
// }

// function GetTitle(){
//     var title = []
//     var obj = new A360TitleListA360OrganizationalChartManagementList();
//     title = obj.getListApi();
//     obj.callAjax.then(function(data){
//         if (data.hasOwnProperty('results')) {
//             for (var i = 0; i < data.results.length; i++) {
//                 var x = new A360TitleListA360OrganizationalChartManagement_ListItem(data.results[i]);
//                 title.push(x);
//                 }
//             } else {
//                 for (var i = 0; i < data.length; i++) {
//                     var x = new A360TitleListA360OrganizationalChartManagement_ListItem(data[i]);
//                     title.push(x);
//                 }
//             }
//             setCookie("a360_titles",titles,10)
//     })
//     return title
// }

// function GetA360Account(){
//     var accounts = []
//     var obj = new Account360A360SystemManagementList();
//     obj.getListApi();
//     obj.callAjax.then(function(data){
//         if (data.hasOwnProperty('results')) {
//             for (var i = 0; i < data.results.length; i++) {
//                 var x = new Account360A360SystemManagement_ListItem(data.results[i]);
//                 accounts.push(x);
//                 }
//             } else {
//                 for (var i = 0; i < data.length; i++) {
//                     var x = new Account360A360SystemManagement_ListItem(data[i]);
//                     accounts.push(x);
//                 }
//             }
//             setCookie("a360_accounts",accounts,10)
//     })
//     return accounts
// }
// /**
//  * Lấy dữ liệu đơn vị từ cookie theo tổ chức
//  * @param {uuid} org_id 
//  * @returns List đơn vị
//  */
// function LoadUnit(org_id){
//     unit_for_org = []
//     // all_unit = getCookie("a360_units")
//     all_unit = units
//     for (var i = 0; i < all_unit.length; i++) {
//         if (all_unit[i].or_uuid == org_id){
//             unit_for_org.push({"text":x.name, "id":x.uuid, "or_uuid":x.or_uuid, "or_code":x.or_code});
//         }
//     }
//     return unit_for_org
// }

// function LoadTitle(org_id){
//     title = []
//     // all_title = getCookie("a360_titles")
//     all_title = title
//     for (var i = 0; i < all_unit.length; i++) {
//         if (all_title[i].or_uuid == org_id){
//             title.push({"text":x.name, "id":x.uuid, "or_uuid":x.or_uuid, "or_code":x.or_code});
//         }
//     }
//     return title
// }

// function LoadA360Account(org_id){
//     accounts = []
//     all_account = getCookie("a360_accounts")
//     for (var i = 0; i < all_account.length; i++) {
//         if (all_unit[i].organization == org_id){
//             accounts.push({"text":x.name, "id":x.uuid, "organization":x.organization});
//         }
//     }
//     return accounts
// }
// function OrganizationChangeEvent(){
//     $(".organization-systemmanagement-select").change(function (){
//         var org_id = $(this).val();
//         var unit_for_org = LoadUnit(org_id);
//         var account_for_org = LoadA360Account(org_id);
//         var title_for_org = LoadTitle(org_id);

//     })
// }