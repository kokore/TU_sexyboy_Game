function changePage(nextPage1, method1, dataType1) {
    jQuery('#main').fadeOut('slow', function() {
        $.ajax({
            url: nextPage1,
            method: method1,
            dataType: dataType1,
            async: false,
            success: function(data) {
                $('#main').html(data);
            }
        });
    });
    jQuery('#main').fadeIn('slow');
}
