$(document).ready(function () {
    var that = $(this),
        contents = that.serialize();

    $.ajax({
        url: 'assets/php/show-events.php',
        dataType: 'json',
        type: 'post',
        data: contents,
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
                for (let j = 0; j < weekdaysArray.length; j++) {
                    date = new Date(row[1]);
                    if (areDatesOnSameDay(new Date(weekdaysArray[j].id), date)) {
                        document.getElementsByClassName("weekday-timeline")[j + new Date().getDay() - 1].innerHTML += `<div class="item">
                        <span class="time">` + date.toLocaleTimeString('it-IT') + `</span>
                        <div class="dot bg-` + colors[row[2]] + `"></div>  
                        <a href="app-event-detail.html?patient=` + row[0] + `&date=` + date + `" class="text-reset">
                            <div class="content">
                                <h4 class="title">` + row[0] + `</h4>
                                <div class="text">` + row[3] + `</div>
                            </div>
                        </a>
                    </div>`;
                        weeklyEventsCounter++;
                        j = 7;
                    }
                }
            }
            document.getElementById("weekly-events-number").innerHTML = weeklyEventsCounter;
            document.getElementById("bottom-menu-notif-number").innerHTML = weeklyEventsCounter;
            document.getElementById("menu-notif-number").innerHTML = weeklyEventsCounter;
        }
    });
    return false;

});
