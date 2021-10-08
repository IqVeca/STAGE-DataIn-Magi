$(document).ready(function () {
    var id = {
        value: decodeURI(getFromUrl("patient")),
    };
    $.ajax({
        url: 'assets/php/find-client.php',
        dataType: 'json',
        type: 'post',
        data: id,
        success: function (data) {
            info = Object.values(data);
            if (document.getElementById("patient-info-name") != null)
                document.getElementById("patient-info-name").innerHTML = info[0];
            if (document.getElementById("patient-info-age") != null)
                document.getElementById("patient-info-age").innerHTML = info[1];
            if (document.getElementById("patient-info-issue") != null)
                document.getElementById("patient-info-issue").innerHTML = info[2];
            if (document.getElementById("patient-info-number") != null)
                document.getElementById("patient-info-number").innerHTML = info[3];
            if (document.getElementById("patient-info-address") != null)
                document.getElementById("patient-info-address").innerHTML = info[4];
            drawMap();
        }
    });
    return false;
});
