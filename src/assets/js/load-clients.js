
//*************** ADD CLIENT FORM  *****************/
$(document).ready(function () {
    $.ajax({
        url: 'assets/php/show-clients.php',
        dataType: 'json',
        type: 'post',
        data: "",
        success: function (data) {
            let colors = new Array("success", "primary", "danger");
            for (let i = 0; i < data.length; i++) {
                let row = Object.values(data[i]);
                document.getElementById("newClients").innerHTML += `
                <div class="clients-block bg-` + colors[i % 3] + ` mb-2">
                        <div class="clients-main">
                            <div class="clients-button dropdown">
                                <button type="button" class="btn btn-link btn-icon" data-bs-toggle="dropdown">
                                    <ion-icon name="ellipsis-horizontal"></ion-icon>
                                </button>
                                <div class="dropdown-menu dropdown-menu-end">
                                    <a class="dropdown-item" id="edit`+ i + `" onclick="editClient('clientName` + i + `', 'age` + i + `', 'healthIssues` + i + `', 'phoneNumber` + i + `', 'address` + i + `', 'edit` + i + `')">
                                        <ion-icon name="pencil-outline"></ion-icon>Edit
                                    </a>
                                    <a class="dropdown-item" href="app-map-destination.html" onclick="takeMyElement('address`+ i + `')">
                                        <ion-icon name="pin-outline"></ion-icon>Map
                                    </a>
                                    <a class="dropdown-item" href="app-client-profile.html?patient=` + row[0] + `">
                                        <ion-icon name="medical-outline"></ion-icon>Clinical Reports
                                    </a>
                                    <a class="dropdown-item delete-user" data-value="` + i + `">
                                        <ion-icon name="close-outline"></ion-icon>Remove
                                    </a>
                                </div>
                            </div>
                            <div class="user-data">
                                <span class="client-data-label">Client Name</span>
                                <h1 class="title">
                                    <div class="client-data" contentEditable = "false" id="clientName`+ i + `" onkeypress="return (this.innerText.length <= 20)">
                                        ` + row[0] + `
                                    </div>
                                </h1>
                            </div>
                            <div class="in">
                                <div class="appointment-info">
                                    <span class="client-data-label">Age</span>
                                    <div class="client-data" contentEditable = "false" id="age`+ i + `" onkeypress="return (this.innerText.length <= 3)">
                                    ` + row[1] + `
                                    </div>
                                </div>
                                <div class="appointment-info">
                                    <span class="client-data-label">Health issues</span>
                                    <div class="client-data" contentEditable = "false" id="healthIssues`+ i + `" onkeypress="return (this.innerText.length <= 30)">
                                    ` + row[2] + `
                                    </div>
                                </div>
                                <div class="appointment-info">
                                    <span class="client-data-label">Phone number</span>
                                    <div class="client-data" contentEditable = "false" id="phoneNumber`+ i + `" onkeypress="return (this.innerText.length <= 11)">
                                    ` + row[3] + `
                                    </div>
                                </div>
                                <div class="appointment-info">
                                    <span class="client-data-label">Address</span>
                                    <div class="client-data" contentEditable = "false" id="address`+ i + `" onkeypress="return (this.innerText.length <= 30)">
                                    ` + row[4] + `
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            `;
            }
        }
    });


});