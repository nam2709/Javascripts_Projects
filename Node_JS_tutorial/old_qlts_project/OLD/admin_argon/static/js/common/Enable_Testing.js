$(document).ready(function() {

    EnanbleTesting();
})
var test_flag = true;
var is_debug = false;

function EnanbleTesting() {
    if (!test_flag) {
        $(".fa-vial").closest("button").each(function() {
            if (this.id.includes("Test")) {
                $(this).hide();
            }

        })
    }
}