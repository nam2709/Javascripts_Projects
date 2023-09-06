var currentPage = 1;
var pageSize = 3;

function loadOptions(page) {
  $.ajax({
    url: "http://127.0.0.1:1500/depre/depreciation/Asset/?page=" + page,
    type: "GET",
    success: function(data) {
        var event_data = '';
        var length_data = data.results.length;
        for (var j = 0; j < length_data; j++) {
            var datare = data.results[j];
            console.log(datare.uuid);
            event_data += '<option value="' + datare.uuid + '">' + datare.name + '</option>';
        }
        $('#Testtesttest').append(event_data);
        if (data.length === pageSize) {
            currentPage++;
        }
    },
    error: function() {
      alert("Failed to load options.");
    }
  });
}

$(document).ready(function() {
    loadOptions(currentPage);
  
    // Add scroll event listener to select element
    $("#Testtesttest").on("scroll", function() {
      var element = $(this);
      var scrollPosition = element.scrollTop();
      var elementHeight = element.height();
      var totalHeight = this.scrollHeight;
  
      // Check if scroll position is near the bottom of the element
      if (scrollPosition + elementHeight >= totalHeight - 1) {
        currentPage++;
        loadOptions(currentPage);
      }
    });
  });


function ShowOption(event){
  if (event.keyCode === 13) {
    let search = $('#searchbox').val();
    var search1 = "?search=" + search
    $.ajax({
      url: "http://127.0.0.1:1500/depre/depreciation/AssetAll/" + search1,
      type: "GET",
      success: function(data) {
          var event_data = '';
          $("#Testtest1").empty();
          for (var j = 0; j < 3; j++) {
              var datare = data.results[j];
              console.log(datare.uuid);
              event_data += '<option value="' + datare.uuid + '">' + datare.name +'-'+datare.code+ '</option>';
          }
          $('#Testtest1').append(event_data);
      },
      error: function() {
        alert("Failed to load options 1.");
      }
    });
  } 
}