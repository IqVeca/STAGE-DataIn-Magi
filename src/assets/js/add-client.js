//*************** ADD CLIENT FORM  *****************/
$('#add-client-form').on('submit', function () {
    var that = $(this),
        contents = that.serialize();
    $.ajax({
        url: 'assets/php/add-client.php',
        dataType: 'json',
        type: 'post',
        data: contents,
        success: function (data) {
        }
    });

});