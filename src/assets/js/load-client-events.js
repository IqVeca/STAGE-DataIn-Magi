$(document).ready(function () {
    var id = {
        user: decodeURI(getFromUrl("patient")),
    };
    $.ajax({
        url: 'assets/php/load-client-events.php',
        dataType: 'json',
        type: 'post',
        data: id,
        success: function (data) {
            function custom_sort(a, b) {
                return new Date(a['datetime']).getTime() - new Date(b['datetime']).getTime();
            }
            function areDatesOnSameDay(first, second) {
                return (first.getFullYear() == second.getFullYear() &&
                    first.getMonth() == second.getMonth() &&
                    first.getDate() == second.getDate());
            }
            data.sort(custom_sort);
            let row;
            let weeklyEventsCounter = 0;
            let colors = new Array("primary", "warning", "danger");
            let weekdaysArray = document.getElementsByClassName("weekday");
            for (let i = 0; i < data.length; i++) {
                row = Object.values(data[i]);
                document.getElementById("client-timeline").innerHTML += `<div class="item">
                        <span class="time">` + row[1] + `</span>
                        <div class="dot bg-` + colors[row[2]] + `"></div>  
                        <a href="app-event-detail.html?patient=` + decodeURI(getFromUrl("patient")) + `&date=` + new Date(row[1]) + `" class="text-reset">
                            <div class="content">
                                <h4 class="title">` + row[3] + `</h4>
                            </div>
                        </a>
                    </div>`;
            }
        }
    });
    return false;
});
