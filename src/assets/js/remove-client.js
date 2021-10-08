//******** Remove client from the list of clients and from database ******/
$('body').on('click', 'a.delete-user', function () {
    let clientsArray = document.getElementsByClassName("clients-block");
    clientsArray[$(this).attr("data-value")].remove();

    var that = $(this).attr("data-value");
    var id = {
        value: that
    };
    $.ajax({
        url: 'assets/php/remove-client.php',
        type: 'post',
        data: id,
        success: function (data) {
        }
    });

});