const random_fname = new Array("Yoda", "Luke", "Rey", "Kanan", "Cere", "Anakin");
const random_lname = new Array("Skywalker", "Tano", "Junda", "Solo", "Windu");
const random_email = new Array("@mailg.com", "@jedi.com", "@coldmail.com", "@inlook.com");

function randomize() {
    var f_index = parseInt(Math.random() * random_fname.length);
    var l_index = parseInt(Math.random() * random_lname.length);
    var email_index = parseInt(Math.random() * random_email.length);
    document.getElementById("create-name").value = random_fname[f_index] + " " + random_lname[l_index];
    document.getElementById("create-email").value = random_fname[f_index] + "_" + random_lname[l_index] + random_email[email_index];
    document.getElementById("create-age").value = parseInt(Math.random() * 110);
    document.getElementById("create-gpa").value = parseFloat((Math.random() * 433) / 100).toFixed(2);
}

function list_users() {
    var result;
    $.ajax({
        type: 'POST',
        url: '/list',
        success: function (resultData) {
            result = resultData
        }
    }).done(() => {
        // console.log(result);
        return result;
    });
}

function refresh_users() {
    var table = document.getElementById("user_table");
    while (table.firstChild) {  // clear the table
        table.firstChild.remove();
    }
    var result;
    $.ajax({
        type: 'POST',
        url: '/list',
        success: function (resultData) {
            result = resultData;
        }
    }).done(() => {
        console.log(result);
        result.forEach((element) => {
            var new_row = table.insertRow(-1);
            var uid_cell = new_row.insertCell(-1);
            var name_cell = new_row.insertCell(-1);
            var email_cell = new_row.insertCell(-1);
            var age_cell = new_row.insertCell(-1);
            var gpa_cell = new_row.insertCell(-1);
            uid_cell.innerHTML = element.uid;
            name_cell.innerHTML = element.name;
            email_cell.innerHTML = element.email;
            age_cell.innerHTML = element.age;
            gpa_cell.innerHTML = element.gpa;
        });
    });
}

function create_user() {
    var name = document.getElementById("create-name").value;
    var email = document.getElementById("create-email").value;
    var age = document.getElementById("create-age").value;
    var gpa = document.getElementById("create-gpa").value;
    if (name != "" && email != "" && age != "" && gpa != "") {
        var req_body = { "name": name, "email": email, "age": age, "gpa": gpa };
        console.log(req_body);
        $.ajax({
            type: "POST",
            url: "/create",
            data: req_body,
            success: function (data, textStatus, jQxhr) {
                console.log(data[0]);
                refresh_users();
            },
        });
    } else {
        alert("Please fill in all fields before creating");
    }
}

function update_user() {
    var uid = document.getElementById("update-uid").value;
    var name = document.getElementById("update-name").value;
    var email = document.getElementById("update-email").value;
    var age = document.getElementById("update-age").value;
    var gpa = document.getElementById("update-gpa").value;
    if (uid != "" && name != "" && email != "" && age != "" && gpa != "") {
        var req_body = { "uid": uid, "name": name, "email": email, "age": age, "gpa": gpa };
        console.log(req_body);
        $.ajax({
            type: "POST",
            url: "/update",
            data: req_body,
            success: function (data, status, xhr) {
                console.log(data[0]);
                refresh_users();
            },
        });
    } else {
        alert("Please fill in all fields before updating");
    }
}

function load_user() {
    var uid = document.getElementById("update-uid").value.trim();

    if (uid != "") {
        var req_body = { "uid": uid };
        $.ajax({
            type: "POST",
            url: "/search",
            data: req_body,
            success: function (data, status, xhr) {
                console.log(data[0]);
                document.getElementById("update-name").value = data[0].name;
                document.getElementById("update-email").value = data[0].email;
                document.getElementById("update-age").value = data[0].age;
                document.getElementById("update-gpa").value = data[0].gpa;
            },
        });
    } else {
        alert("Please enter User ID before searching");
    }
}

function delete_user() {
    var uid = document.getElementById("delete-uid").value.trim();
    if (uid != "") {
        var req_body = { "uid": uid };
        $.ajax({
            type: "POST",
            url: "/delete",
            data: req_body,
            success: function (data, status, xhr) {
                console.log(`User ${uid} deleted`);
                refresh_users();
            },
        });
    } else {
        alert("Please enter User ID before deleting");
    }
}

function show() {
    var result;
    $.ajax({
        type: 'POST',
        url: '/list',
        success: function (resultData) {
            result = resultData;
        }
    }).done(() => {
        show_stat(result);
        draw_age(result);
        draw_gpa(result);
    });
}

function draw_age(result) {
    var age_visualization = document.getElementById("age_visualization");
    while (age_visualization.firstChild) {  // clear the box
        age_visualization.firstChild.remove();
    }
    var max_age = -1;
    result.forEach((element) => {
        max_age = Math.max(max_age, element.age);
    });
    result.forEach((element) => {
        var br = document.createElement("br");
        var progress = document.createElement("div");
        progress.setAttribute("class", "progress")
        var progress_bar = document.createElement("div");
        progress_bar.setAttribute("class", "progress-bar");
        progress_bar.setAttribute("role", "progressbar");
        var age_percentage = (element.age / max_age) * 100;
        progress_bar.setAttribute("style", `width:${age_percentage}%`);
        progress_bar.innerHTML = element.name + ": " + element.age;
        progress.appendChild(progress_bar);
        age_visualization.appendChild(progress);
        age_visualization.appendChild(br);
    });
}

function draw_gpa(result) {
    var gpa_visualization = document.getElementById("gpa_visualization");
    while (gpa_visualization.firstChild) {  // clear the box
        gpa_visualization.firstChild.remove();
    }
    var max_gpa = -1;
    result.forEach((element) => {
        max_gpa = Math.max(max_gpa, element.gpa);
    });
    result.forEach((element) => {
        var br = document.createElement("br");
        var progress = document.createElement("div");
        progress.setAttribute("class", "progress")
        var progress_bar = document.createElement("div");
        progress_bar.setAttribute("class", "progress-bar");
        progress_bar.setAttribute("role", "progressbar");
        var gpa_percentage = (element.gpa / max_gpa) * 100;
        progress_bar.setAttribute("style", `width:${gpa_percentage}%`);
        progress_bar.innerHTML = element.name + ": " + element.gpa;
        progress.appendChild(progress_bar);
        gpa_visualization.appendChild(progress);
        gpa_visualization.appendChild(br);
    });
}
function show_stat(result) {
    var total_users = result.length;
    document.getElementById("stat-total").innerHTML = total_users;
    var total_gpa = 0;
    var total_age = 0;
    result.forEach((elem) => {
        total_age += elem.age;
        total_gpa += elem.gpa;
    });
    console.log(total_age + "|" + total_gpa);
    var avg_gpa = parseFloat(total_gpa / total_users).toFixed(1);
    var avg_age = parseFloat(total_age / total_users).toFixed(1);
    document.getElementById("stat-gpa").innerHTML = avg_gpa;
    document.getElementById("stat-age").innerHTML = avg_age;
}