$(document).ready(function () {
    date = new Date(decodeURI(getFromUrl("date")));
    let str = "" + date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2) + " " + date.toLocaleTimeString('it-IT');
    var id = {
        value: str,
    };
    $.ajax({
        url: 'assets/php/find-event.php',
        dataType: 'json',
        type: 'post',
        data: id,
        success: function (data) {
            info = Object.values(data);
            document.getElementById("event-info-details").innerHTML = info[3];
            document.getElementById("event-info-datetime").innerHTML = info[1];

            let statusArray = new Array("bg-danger", "bg-warning", "bg-success", "bg-danger");
            var detailsArray = { "bg-danger": "Not completed yet", "bg-warning": "Suspended", "bg-success": "Completed" };

            let status = info[4];
            document.getElementById("eventStatus").classList.replace(statusArray[0], statusArray[status]);
            document.getElementById("statusDetails").innerHTML = detailsArray[statusArray[status]];
            document.getElementById("suspensionMotivation").innerHTML = "";
            let value = "";
            if (info[5] != "") value = info[5];
            if (status == 1) {
                document.getElementById("suspensionMotivation").innerHTML = `<div class="form-group basic">
            <label class="label" for="userid1">Motivation</label>
            <input type="text" class="form-control" placeholder="Enter Motivation" value="` + value + `"
                id="motivation" name="motivation" maxlength="40">      
                <button onclick="updateStatusMotiv()"type="button" class="btn btn-primary btn-block btn-lg"
                                            data-bs-dismiss="modal">Update</button>
            </div>`;
            }
        }
    });
    return false;
});
