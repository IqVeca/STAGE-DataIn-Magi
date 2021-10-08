

//-----------------------------------------------------------------------
// Service Workers
//-----------------------------------------------------------------------
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('__service-worker.js')
        .then(reg => console.log('service worker registered'))
        .catch(err => console.log('service worker not registered - there is an error.', err));
}
//-----------------------------------------------------------------------

//-----------------------------------------------------------------------
// Page Loader with preload
//----------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
    var loader = document.getElementById("loader");
    setTimeout(() => {
        var loaderOpacity = 1;
        var fadeAnimation = setInterval(() => {
            if (loaderOpacity <= 0.05) {
                clearInterval(fadeAnimation);
                loader.style.opacity = "0";
                loader.style.display = "none";
            }
            loader.style.opacity = loaderOpacity;
            loader.style.filter = "alpha(opacity=" + loaderOpacity * 100 + ")";
            loaderOpacity = loaderOpacity - loaderOpacity * 0.5;
        }, 30);
    }, 400);
})
//-----------------------------------------------------------------------

//-----------------------------------------------------------------------
// Go Back Button
var goBackButton = document.querySelectorAll(".goBack");
goBackButton.forEach(function (el) {
    el.addEventListener("click", function () {
        window.history.go(-1);
    })
})
//-----------------------------------------------------------------------

//-----------------------------------------------------------------------
// Tooltip
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})
//-----------------------------------------------------------------------

//-----------------------------------------------------------------------
// Fix for # href
//-----------------------------------------------------------------------
var aWithHref = document.querySelectorAll('a[href*="#"]');
aWithHref.forEach(function (el) {
    el.addEventListener("click", function (e) {
        e.preventDefault();
    })
});
//-----------------------------------------------------------------------


//-----------------------------------------------------------------------
// Input
// Clear input
var clearInput = document.querySelectorAll(".clear-input");
clearInput.forEach(function (el) {
    el.addEventListener("click", function () {
        var parent = this.parentElement
        var input = parent.querySelector(".form-control")
        input.focus();
        input.value = "";
        parent.classList.remove("not-empty");
    })
})
// active
var formControl = document.querySelectorAll(".form-group .form-control");
formControl.forEach(function (el) {
    // active
    el.addEventListener("focus", () => {
        var parent = el.parentElement
        parent.classList.add("active")
    });
    el.addEventListener("blur", () => {
        var parent = el.parentElement
        parent.classList.remove("active")
    });
    // empty check
    el.addEventListener("keyup", log);
    function log(e) {
        var inputCheck = this.value.length;
        if (inputCheck > 0) {
            this.parentElement.classList.add("not-empty")
        }
        else {
            this.parentElement.classList.remove("not-empty")
        }
    }
})
//-----------------------------------------------------------------------

//-----------------------------------------------------------------------
// Searchbox Toggle
var searchboxToggle = document.querySelectorAll(".toggle-searchbox")
searchboxToggle.forEach(function (el) {
    el.addEventListener("click", function () {
        var search = document.getElementById("search")
        var a = search.classList.contains("show")
        if (a) {
            search.classList.remove("show")
        }
        else {
            search.classList.add("show")
            search.querySelector(".form-control").focus();
        }
    })
});
//-----------------------------------------------------------------------

//-----------------------------------------------------------------------
// Carousel
// Splide Carousel
document.addEventListener('DOMContentLoaded', function () {

    // Full Carousel
    document.querySelectorAll('.carousel-full').forEach(carousel => new Splide(carousel, {
        perPage: 1,
        rewind: true,
        type: "loop",
        gap: 0,
        arrows: false,
        pagination: false,
    }).mount());

    // Single Carousel
    document.querySelectorAll('.carousel-single').forEach(carousel => new Splide(carousel, {
        perPage: 3,
        rewind: true,
        type: "loop",
        gap: 16,
        padding: 16,
        arrows: false,
        pagination: false,
        breakpoints: {
            768: {
                perPage: 1
            },
            991: {
                perPage: 2
            }
        }
    }).mount());

    // Multiple Carousel
    document.querySelectorAll('.carousel-multiple').forEach(carousel => new Splide(carousel, {
        perPage: 4,
        rewind: true,
        type: "loop",
        gap: 16,
        padding: 16,
        arrows: false,
        pagination: false,
        breakpoints: {
            768: {
                perPage: 2
            },
            991: {
                perPage: 3
            }
        }
    }).mount());

    // Small Carousel
    document.querySelectorAll('.carousel-small').forEach(carousel => new Splide(carousel, {
        perPage: 9,
        rewind: false,
        type: "loop",
        gap: 16,
        padding: 16,
        arrows: false,
        pagination: false,
        breakpoints: {
            768: {
                perPage: 4
            },
            991: {
                perPage: 7
            }
        }
    }).mount());

    // Slider Carousel
    document.querySelectorAll('.carousel-slider').forEach(carousel => new Splide(carousel, {
        perPage: 1,
        rewind: false,
        type: "loop",
        gap: 16,
        padding: 16,
        arrows: false,
        pagination: true
    }).mount());

    // Stories Carousel
    document.querySelectorAll('.story-block').forEach(carousel => new Splide(carousel, {
        perPage: 16,
        rewind: false,
        type: "slide",
        gap: 16,
        padding: 16,
        arrows: false,
        pagination: false,
        breakpoints: {
            500: {
                perPage: 4
            },
            768: {
                perPage: 7
            },
            1200: {
                perPage: 11
            }
        }
    }).mount());
});
//-----------------------------------------------------------------------


//-----------------------------------------------------------------------
// Upload Input
var uploadComponent = document.querySelectorAll('.custom-file-upload');
uploadComponent.forEach(function (el) {
    var fileUploadParent = '#' + el.id;
    var fileInput = document.querySelector(fileUploadParent + ' input[type="file"]')
    var fileLabel = document.querySelector(fileUploadParent + ' label')
    var fileLabelText = document.querySelector(fileUploadParent + ' label span')
    var filelabelDefault = fileLabelText.innerHTML;
    fileInput.addEventListener('change', function (event) {
        var name = this.value.split('\\').pop()
        tmppath = URL.createObjectURL(event.target.files[0]);
        if (name) {
            fileLabel.classList.add('file-uploaded');
            fileLabel.style.backgroundImage = "url(" + tmppath + ")";
            fileLabelText.innerHTML = name;
        }
        else {
            fileLabel.classList.remove("file-uploaded")
            fileLabelText.innerHTML = filelabelDefault;
        }
    })
})
//-----------------------------------------------------------------------


//-----------------------------------------------------------------------
// Notification
// trigger notification
var notificationCloseButton = document.querySelectorAll(".notification-box .close-button");
var notificationTaptoClose = document.querySelectorAll(".tap-to-close .notification-dialog");
var notificationBox = document.querySelectorAll(".notification-box");

function closeNotificationBox() {
    notificationBox.forEach(function (el) {
        el.classList.remove("show")
    })
}
function notification(target, time) {
    var a = document.getElementById(target);
    closeNotificationBox()
    setTimeout(() => {
        a.classList.add("show")
    }, 250);
    if (time) {
        time = time + 250;
        setTimeout(() => {
            closeNotificationBox()
        }, time);
    }
}
// close notification
notificationCloseButton.forEach(function (el) {
    el.addEventListener("click", function (e) {
        e.preventDefault();
        closeNotificationBox();
    })
});

// tap to close notification
notificationTaptoClose.forEach(function (el) {
    el.addEventListener("click", function (e) {
        closeNotificationBox();
    })
});
//-----------------------------------------------------------------------


//-----------------------------------------------------------------------
// Toast
// trigger toast
var toastCloseButton = document.querySelectorAll(".toast-box .close-button");
var toastTaptoClose = document.querySelectorAll(".toast-box.tap-to-close");
var toastBoxes = document.querySelectorAll(".toast-box");

function closeToastBox() {
    toastBoxes.forEach(function (el) {
        el.classList.remove("show")
    })
}
function toastbox(target, time) {
    var a = document.getElementById(target);
    closeToastBox()
    setTimeout(() => {
        a.classList.add("show")
    }, 100);
    if (time) {
        time = time + 100;
        setTimeout(() => {
            closeToastBox()
        }, time);
    }
}
// close button toast
toastCloseButton.forEach(function (el) {
    el.addEventListener("click", function (e) {
        e.preventDefault();
        closeToastBox();
    })
})
// tap to close toast
toastTaptoClose.forEach(function (el) {
    el.addEventListener("click", function (e) {
        closeToastBox();
    })
})
//-----------------------------------------------------------------------

//-----------------------------------------------------------------------
// Add to Home
var osDetection = navigator.userAgent || navigator.vendor || window.opera;
var windowsPhoneDetection = /windows phone/i.test(osDetection);
var androidDetection = /android/i.test(osDetection);
var iosDetection = /iPad|iPhone|iPod/.test(osDetection) && !window.MSStream;

function iosAddtoHome() {
    var modal = new bootstrap.Modal(document.getElementById('ios-add-to-home-screen'))
    modal.toggle()
}
function androidAddtoHome() {
    var modal = new bootstrap.Modal(document.getElementById('android-add-to-home-screen'))
    modal.toggle()
}
function AddtoHome(time, once) {
    if (once) {
        var AddHomeStatus = localStorage.getItem("FinappAddtoHome");
        if (AddHomeStatus === "1" || AddHomeStatus === 1) {
            // already showed up
        }
        else {
            localStorage.setItem("FinappAddtoHome", 1)
            window.addEventListener('load', () => {
                if (navigator.standalone) {
                    // if app installed ios home screen
                }
                else if (matchMedia('(display-mode: standalone)').matches) {
                    // if app installed android home screen
                }
                else {
                    // if app is not installed
                    if (androidDetection) {
                        setTimeout(() => {
                            androidAddtoHome()
                        }, time);
                    }
                    if (iosDetection) {
                        setTimeout(() => {
                            iosAddtoHome()
                        }, time);
                    }
                }
            });
        }
    }
    else {
        window.addEventListener('load', () => {
            if (navigator.standalone) {
                // app loaded to ios
            }
            else if (matchMedia('(display-mode: standalone)').matches) {
                // app loaded to android
            }
            else {
                // app not loaded
                if (androidDetection) {
                    setTimeout(() => {
                        androidAddtoHome()
                    }, time);
                }
                if (iosDetection) {
                    setTimeout(() => {
                        iosAddtoHome()
                    }, time);
                }
            }
        });
    }

}
//-----------------------------------------------------------------------


//-----------------------------------------------------------------------
// Dark Mode
var checkDarkModeStatus = localStorage.getItem("FinappDarkmode");
var switchDarkMode = document.querySelectorAll(".dark-mode-switch");
var pageBody = document.querySelector("body");
var pageBodyActive = pageBody.classList.contains("dark-mode");

function switchDarkModeCheck(value) {
    switchDarkMode.forEach(function (el) {
        el.checked = value
    })
}
// if dark mode on
if (checkDarkModeStatus === 1 || checkDarkModeStatus === "1") {
    switchDarkModeCheck(true);
    if (pageBodyActive) {
        // dark mode already activated
    }
    else {
        pageBody.classList.add("dark-mode")
    }
}
else {
    switchDarkModeCheck(false);
}
switchDarkMode.forEach(function (el) {
    el.addEventListener("click", function () {
        var darkmodeCheck = localStorage.getItem("FinappDarkmode");
        if (darkmodeCheck === 1 || darkmodeCheck === "1") {
            pageBody.classList.remove("dark-mode");
            localStorage.setItem("FinappDarkmode", "0");
            switchDarkModeCheck(false);
        }
        else {
            pageBody.classList.add("dark-mode")
            switchDarkModeCheck(true);
            localStorage.setItem("FinappDarkmode", "1");
        }
    })
})

//********** Weekday Selection ***********/
function SelectWeekday() {
    var d = new Date();
    var n = d.getDay();
    var n = (n - 1);
    if (n < 0) n += 7;
    document.getElementsByClassName("timeline-day")[n].className = "collapse show mt-1 mb-2 timeline-day";

    for (i = 0; i < n; i++) {
        document.getElementsByClassName("weekday")[0].innerHTML = "";
        document.getElementsByClassName("weekday")[0].remove();
    }
    var curr = new Date();
    var first = curr.getDate() - curr.getDay();
    var day, date;
    for (i = 0; i < 7 - n; i++) {
        day = first + i + 1;
        date = new Date(curr.setDate(day));
        document.getElementsByClassName("weekday")[i].innerHTML += date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate() + n);
        document.getElementsByClassName("weekday")[i].id = "" + date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate() + n);
    }
}


//******** Google Maps ******/
let strProvince, strCity, strStreet, strCivicNumber, destination, check;

function goToOnMap() {
    check = localStorage.getItem("tripRoute");
    strProvince = document.getElementById("province").value;
    strCity = document.getElementById("city").value;
    strStreet = document.getElementById("street").value;
    strCivicNumber = document.getElementById("civicNumber").value;
    destination = 'https://maps.google.com/maps?q=';
    if (strProvince) {
        destination += strProvince;
    }
    if (strCity) {
        if (strProvince) {
            destination += '+';
        }
        destination += strCity;
    }
    if (strStreet) {
        if (strProvince || strCity) {
            destination += '+';
        }
        destination += strStreet;
    }
    if (strCivicNumber) {
        if (strProvince || strCity || strStreet) {
            destination += '+';
        }
        destination += strCivicNumber;
    }
    if (check) {
        destination = check;
        localStorage.removeItem("tripRoute");
    }
    destination += '&t=&z=13&ie=UTF8&iwloc=&output=embed';
    document.getElementById("mapDestination").src = destination;
    destination = 'https://maps.google.com/maps?q=';
    document.getElementById('province').value = '';
    document.getElementById('city').value = '';
    document.getElementById('street').value = '';
    document.getElementById('civicNumber').value = '';
}

//******** Collapsible button function ******/
var coll = document.getElementsByClassName("collapsible-insert");
var i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
}

//-----------------------------------------------------------------------


//******** Take your client's address to find it on map ******/
function takeMyElement(idObtained) {
    if (localStorage.destinationAddress) {
        localStorage.removeItem("destinationAddress");
    }
    strAddress = document.getElementById(idObtained).innerText;
    localStorage.setItem("destinationAddress", strAddress);
}
//******** Finds your client's address on map ******/
function findDestination() {
    strAddress = localStorage.getItem("destinationAddress");
    destination = 'https://maps.google.com/maps?q=';
    if (strAddress) {
        destination += strAddress;
        destination += '&t=&z=13&ie=UTF8&iwloc=&output=embed';
        document.getElementById("mapDestination").src = destination;
    }
}
//******** Create a trip with multiple destinations on Google Maps ******/
function addToTrip() {
    strProvince = document.getElementById("province").value;
    strCity = document.getElementById("city").value;
    strStreet = document.getElementById("street").value;
    strCivicNumber = document.getElementById("civicNumber").value;
    if (strProvince || strCity || strStreet || strCivicNumber) {
        if (strProvince) {
            destination += strProvince;
        }
        if (strCity) {
            if (strProvince) {
                destination += '+';
            }
            destination += strCity;
        }
        if (strStreet) {
            if (strProvince || strCity) {
                destination += '+';
            }
            destination += strStreet;
        }
        if (strCivicNumber) {
            if (strProvince || strCity || strStreet) {
                destination += '+';
            }
            destination += strCivicNumber;
        }
        destination += '/';
        localStorage.setItem("tripRoute", destination);
        document.getElementById('province').value = '';
        document.getElementById('city').value = '';
        document.getElementById('street').value = '';
        document.getElementById('civicNumber').value = '';
    }
}
//******** Edit client data ******/
function editClient(accessName, accessAge, accessHealthIssues, accessPhoneNumber, accessAddress, accessEdit) {
    let checkAccess = document.getElementById(accessName);
    if (checkAccess.isContentEditable) {
        document.getElementById(accessName).contentEditable = false;
        document.getElementById(accessAge).contentEditable = false;
        document.getElementById(accessHealthIssues).contentEditable = false;
        document.getElementById(accessPhoneNumber).contentEditable = false;
        document.getElementById(accessAddress).contentEditable = false;
        document.getElementById(accessEdit).innerHTML = '<ion-icon name="pencil-outline"></ion-icon>Edit';
    }
    else {
        document.getElementById(accessName).contentEditable = true;
        document.getElementById(accessAge).contentEditable = true;
        document.getElementById(accessHealthIssues).contentEditable = true;
        document.getElementById(accessPhoneNumber).contentEditable = true;
        document.getElementById(accessAddress).contentEditable = true;
        document.getElementById(accessEdit).innerHTML = '<ion-icon name="checkmark-outline"></ion-icon>Save';
    }
}

//******** Responsive Google Map ******/
function drawMap() {
    let address = document.getElementById("patient-info-address").innerHTML;
    let destination = 'https://maps.google.com/maps?q=' + address.replace(/\s/g, "+");
    document.getElementById("client-map").src = destination + "&output=embed";
}

//******** Add Event to Clinical Folder ******/
function addEventToClinicalFolder() {

    var select = document.getElementById('account1');
    var value = select.options[select.selectedIndex].value;
    let colorString = new String;
    if (value == 0) colorString = "primary";
    else if (value == 1) colorString = "warning";
    else colorString = "danger";

    document.getElementsByClassName("timed")[0].innerHTML += `
    <div class="item">
        <span class="time">` + document.getElementById("inputDate").value + `</span>
        <div class="dot bg-` + colorString + `"></div>
        <a href="app-event-detail.html" class="text-reset">
            <div class="content">
                <h4 class="title">` + document.getElementById("inputTitle").value + `</h4>
                <div class="text">` + document.getElementById("inputDetails").value + `</div>
            </div>
        </a>
    </div> `;
}


//************** Update Notification Sound  ***********/
function updateNotifSound(str) {
    document.getElementById("notif-sound").innerHTML = str;
}

function showActiveOption() {
    let options = new Array("Ding-Dong", "Idea", "Whistle", "Beep");
    let str = document.getElementById("notif-sound").innerHTML;
    let choice = options.indexOf(str);
    document.getElementById("flexRadioDefault" + choice).classList.add("btn-primary");
    document.getElementById("flexRadioDefault" + ((choice + 1) % 4)).classList.remove("btn-primary");
    document.getElementById("flexRadioDefault" + ((choice + 2) % 4)).classList.remove("btn-primary");
    document.getElementById("flexRadioDefault" + ((choice + 3) % 4)).classList.remove("btn-primary");
}

function updateEventStatus() {
    let statusArray = new Array("bg-danger", "bg-warning", "bg-success", "bg-danger");
    var detailsArray = { "bg-danger": "Not completed yet", "bg-warning": "Suspended", "bg-success": "Completed" };

    let status = statusArray.indexOf(((document.getElementById("eventStatus").className).split(" "))[1]);
    document.getElementById("eventStatus").classList.replace(statusArray[status], statusArray[status + 1]);
    document.getElementById("statusDetails").innerHTML = detailsArray[statusArray[status + 1]];
    document.getElementById("suspensionMotivation").innerHTML = "";
    if (status == 0)   //Update to success
    {
        document.getElementById("suspensionMotivation").innerHTML = `<div class="form-group basic">
            <label class="label" for="userid1">Motivation</label>
            <input type="text" class="form-control" placeholder="Enter motivation"
                id="motivation" name="motivation" maxlength="40">
                <button onclick="updateStatusMotiv()" type="button" class="btn btn-primary btn-block btn-lg"
                                            data-bs-dismiss="modal">Update</button>
            </div>`;
    }
    //********** Update Db ***/
    date = new Date(decodeURI(getFromUrl("date")));
    let str = "" + date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2) + " " + date.toLocaleTimeString('it-IT');
    let motivation = "";
    if (status + 1 == 1)
        if (document.getElementById("motivation").innerHTML != "") motivation = document.getElementById("motivation").innerHTML;
    var id = {
        value: status + 1,
        motivation: motivation,
        date: str,
    };
    $.ajax({
        url: 'edit-status.php',
        dataType: 'json',
        type: 'post',
        data: id,
        success: function (data) {
        }
    });
}

function updateStatusMotiv() {
    date = new Date(decodeURI(getFromUrl("date")));
    let str = "" + date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2) + " " + date.toLocaleTimeString('it-IT');
    motivation = document.getElementById("motivation").value;
    var id = {
        value: 1,
        motivation: motivation,
        date: str,
    };
    $.ajax({
        url: 'edit-status.php',
        dataType: 'json',
        type: 'post',
        data: id,
        success: function (data) {
        }
    });
}

//******************************** Get data from URL **********************/
function getFromUrl(nomevar) {
    var url, s0, s1, s2;
    url = document.location.href;
    s0 = url.split("?");
    s1 = s0[1].split("&");
    for (var i = 0; i < s1.length; i++) {
        s2 = s1[i].split("=");
        if (s2[0] == nomevar) {
            return s2[1];
        }
    }
    return "";
}
