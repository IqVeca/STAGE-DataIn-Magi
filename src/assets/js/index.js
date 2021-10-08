
$(function() {
    $(".scheduler").dxScheduler({
        timeZone: "America/Los_Angeles",
        dataSource: data,
        views: ["week", "month"],       //vettore con le possibili scelte di visualizzazione
        currentView: "month",           //modo attuale di come vedere il calendario
        currentDate: new Date(),         //new Date(2021, 5, 2),        //indica il giorno da cui si mostra il calendario (lasciandolo così mostra il giorno attuale)
        height: 600,
        AdaptivityEnabled: true,
        startDayHour: 8,                //orario di inizio        
        endDayHour: 18,                 //orario di fine
    }).dxScheduler("instance");
    // $(".scheduler").dxScheduler({
    //     //timeZone: "America/Los_Angeles",
    //     dataSource: data,
    //     views: ["month"],
    //     currentView: "month",
    //     currentDate: new Date(),
    //     firstDayOfWeek: 1,         
    //     showAllDayPanel: false,
    //     height: 600,
    //     groups: ["employeeID"],         
    //     resources: [
    //         {
    //             fieldExpr: "employeeID",
    //             allowMultiple: false,
    //             dataSource: employees,
    //             label: "Employee"
    //         }
    //     ],
    //     dataCellTemplate: function (cellData, index, container) {
    //         var employeeID = cellData.groups.employeeID,
    //             currentTraining = getCurrentTraining(cellData.startDate.getDate(), employeeID);

    //         var wrapper = $("<div>")
    //             .toggleClass("employee-weekend-" + employeeID, isWeekEnd(cellData.startDate)).appendTo(container)
    //             .addClass("employee-" + employeeID)
    //             .addClass("dx-template-wrapper");

    //         wrapper.append($("<div>")
    //             .text(cellData.text)
    //             .addClass(currentTraining)
    //             .addClass("day-cell")
    //         );

           

    //     },
    //     resourceCellTemplate: function (cellData) {
    //         /*var name = $("<div>")
    //             .addClass("name")
    //             .css({ backgroundColor: cellData.color })
    //             .append($("<h2>")
    //                 .text(cellData.text));*/

    //         var avatar = $("<div>")
    //             .addClass("avatar")
    //            /* .html("<img src=" + cellData.data.avatar + ">")
    //             .attr("title", cellData.text);*/

    //         var info = $("<div>")
    //             .addClass("info")
    //             .css({ color: cellData.color })
    //             //.html("Age: " + cellData.data.age + "<br/><b>" + cellData.data.discipline + "</b>");

    //         return $("<div>").append([name, avatar, info]);
    //     }
    // });

    function isWeekEnd(date) {
        var day = date.getDay();
        return day === 0 || day === 6;
    }

    function getCurrentTraining(date, employeeID) {
        var result = (date + employeeID) % 3,
        currentTraining = "training-background-" + result;
        return currentTraining;
    }
    SearchAbsenceFromDB();
}) ;

function SearchAbsenceFromDB()
 {  
    var dataCalendar = new Array();     /* array di oggetti del DB */
    var resourcesData = new Array();     /* array di oggetti del DB */

    $.ajax({
        url: 'assets/php/req-event.php',
        dataType: 'json',
        type: 'post',
        success: function (dataMySQL) {
            for(var i = 0; i < dataMySQL.length; i++) {
                dataCalendar.push({
                    text: dataMySQL[i].motivation,
                    startDate: dataMySQL[i].start_data,
                    endDate: dataMySQL[i].end_data,
                    })

            }
            $(".scheduler").dxScheduler({
                dataSource: dataCalendar
            })
        }
    });
 }