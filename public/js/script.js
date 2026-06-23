/* =====================================================
                    LOGIN PAGE
===================================================== */


/* ------------------------------
   Password Show / Hide
------------------------------ */

function togglePassword() {

    const password =
        document.getElementById("password");

    const eyeIcon =
        document.getElementById("eyeIcon");

    if (password.type === "password") {

        password.type = "text";

        eyeIcon.classList.remove("bi-eye-slash-fill");
        eyeIcon.classList.add("bi-eye-fill");

    } else {

        password.type = "password";

        eyeIcon.classList.remove("bi-eye-fill");
        eyeIcon.classList.add("bi-eye-slash-fill");
    }
}


/* ------------------------------
   Login Function
------------------------------ */

function handleLogin() {

    const loginForm =
        document.getElementById("loginForm");

    if (!loginForm) return;

    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value.trim();

        const users =
            JSON.parse(localStorage.getItem("users")) || [];

        const user = users.find(
            u =>
                u.email === email &&
                u.password === password
        );

        if (!user) {

            alert("Invalid Email or Password!");

            return;
        }

        localStorage.setItem(
            "loggedInUser",
            JSON.stringify(user)
        );

        alert(`Welcome ${user.name}!`);

        window.location.href = "dashboard.html";
    });
}


/* ------------------------------
   User Session Check
------------------------------ */

function checkLogin() {

    const currentUser =
        localStorage.getItem("loggedInUser");

    if (currentUser) {

        console.log("User already logged in");
    }
}


/* ------------------------------
   Logout Function
------------------------------ */

function logout() {

    localStorage.removeItem("loggedInUser");

    alert("Logged Out Successfully!");

    window.location.href = "login.html";
}




/* =====================================================
                REGISTRATION PAGE
===================================================== */


/* ------------------------------
   Register Password Toggle
------------------------------ */

function toggleRegisterPassword() {

    const password =
        document.getElementById("password");

    const eye =
        document.getElementById("registerEye");

    if(password.type === "password") {

        password.type = "text";

        eye.classList.remove("bi-eye-slash-fill");
        eye.classList.add("bi-eye-fill");

    } else {

        password.type = "password";

        eye.classList.remove("bi-eye-fill");
        eye.classList.add("bi-eye-slash-fill");
    }
}


/* ------------------------------
   Register User
------------------------------ */

function handleRegister() {

    const form =
        document.getElementById("registerForm");

    if(!form) return;

    form.addEventListener("submit", function(e){

        e.preventDefault();

        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;

        if(password !== confirmPassword){

            alert("Passwords do not match!");

            return;
        }

        const users =
            JSON.parse(localStorage.getItem("users")) || [];

        const existingUser =
            users.find(user => user.email === email);

        if(existingUser){

            alert("Email already registered!");

            return;
        }

        users.push({
            name,
            email,
            password
        });

        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );

        alert("Registration Successful!");

        window.location.href = "login.html";

    });
}




/* =====================================================
                    DASHBOARD PAGE
===================================================== */


/* ------------------------------
   Dashboard Statistics
------------------------------ */

function loadDashboard() {

    const user =
        JSON.parse(localStorage.getItem("loggedInUser"));

    if (!user) {

        window.location.href = "login.html";

        return;
    }

    document.getElementById("userName").textContent =
        user.name;

    const events =
        JSON.parse(localStorage.getItem("events")) || [];

    const users =
        JSON.parse(localStorage.getItem("users")) || [];

    document.getElementById("totalEvents").textContent =
        events.length;

    document.getElementById("totalUsers").textContent =
        users.length;

    const today =
        new Date().toISOString().split("T")[0];

    const upcoming =
        events.filter(event => event.date >= today);

    const completed =
        events.filter(event => event.date < today);

    document.getElementById("upcomingEvents").textContent =
        upcoming.length;

    document.getElementById("completedEvents").textContent =
        completed.length;

    const table =
        document.getElementById("recentEventsTable");

    if(!table) return;

    table.innerHTML = "";

    events.slice(-5).reverse().forEach(event => {

        table.innerHTML += `
            <tr>
                <td>${event.name}</td>
                <td>${event.date}</td>
                <td>${event.location}</td>
            </tr>
        `;
    });
}
/* =====================================================
                    ADD EVENT PAGE
===================================================== */
function handleAddEvent() {

    const form =
        document.getElementById("addEventForm");

    if (!form) return;

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        const event = {

            id: Date.now(),

            name:
                document.getElementById("eventName").value,

            category:
                document.getElementById("eventCategory").value,

            date:
                document.getElementById("eventDate").value,

            time:
                document.getElementById("eventTime").value,

            venue:
                document.getElementById("eventVenue").value,

            organizer:
                document.getElementById("eventOrganizer").value,

            description:
                document.getElementById("eventDescription").value,

            status:
                document.getElementById("eventStatus").value
        };

        const events =
            JSON.parse(localStorage.getItem("events")) || [];

        events.push(event);

        localStorage.setItem(
            "events",
            JSON.stringify(events)
        );

        alert("Event Added Successfully!");

        window.location.href = "list.html";

    });
}
/* =====================================================
                    PAGE LOAD
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    // Login Page
    if (document.getElementById("loginForm")) {
        handleLogin();
    }

    // Register Page
    if (document.getElementById("registerForm")) {
        handleRegister();
    }

    // Dashboard Page
    if (document.getElementById("userName")) {
        loadDashboard();
    }
    //Add Event Page
    if (document.getElementById("addEventForm")) {
    handleAddEvent();
}

});

