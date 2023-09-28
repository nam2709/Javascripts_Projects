window.addEventListener('DOMContentLoaded', event => {
    // Simple-DataTables
    // https://github.com/fiduswriter/Simple-DataTables/wiki

    const datatablesSimple = document.getElementById('datatablesSimple');
    if (datatablesSimple) {
        new simpleDatatables.DataTable(datatablesSimple,{
            perPage:100,
            language: {
                url: '/datatables/vi.json'
            }
            
        });
    }
    const datatablesSimple2 = document.getElementById('datatablesSimple2');
    if (datatablesSimple2) {
        new simpleDatatables.DataTable(datatablesSimple2,{
            perPage:100,
            language: {
                url: '/datatables/vi.json'
            }
        });
    }
    const detailDataTableAddingId = $("table[id$='detailDataTableAddingId']");
    if (detailDataTableAddingId.length > 0) {
        for (var i = 0; i < detailDataTableAddingId.length; i++) {
            new simpleDatatables.DataTable(detailDataTableAddingId[i],{
                perPageSelect:false,
                sortable:false,
                searchable: false,
                info: false,
                paging: false,
            });
        } 
    }
});
