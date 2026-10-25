(function () {
    "use strict";

    var projectUrl = "PASTE_YOUR_SUPABASE_PROJECT_URL_HERE";
    var anonKey = "PASTE_YOUR_SUPABASE_ANON_KEY_HERE";
    var configured = /^https:\/\/.+/.test(projectUrl) &&
        projectUrl.indexOf("PASTE_") === -1 &&
        anonKey.length > 0 &&
        anonKey.indexOf("PASTE_") === -1;
    var form = document.getElementById("testimonial-form");
    var submitButton = document.getElementById("testimonial-submit");
    var formStatus = document.getElementById("testimonial-form-status");
    var listStatus = document.getElementById("testimonial-list-status");
    var testimonialList = document.getElementById("submitted-testimonials");
    var renderedTestimonials = Object.create(null);
    var apiUrl = configured
        ? projectUrl.replace(/\/+$/, "") + "/rest/v1/testimonials"
        : "";

    function setStatus(element, message) {
        element.textContent = message;
    }

    function renderTestimonials(testimonials) {
        testimonials.forEach(function (testimonial) {
            var key = String(testimonial.id);
            if (renderedTestimonials[key]) {
                return;
            }
            renderedTestimonials[key] = true;

            var column = document.createElement("div");
            column.className = "col-md-6";

            var card = document.createElement("div");
            card.className = "testimonial-card";

            var imageHolder = document.createElement("div");
            imageHolder.className = "testimonial-card-img-holder";

            var initials = document.createElement("span");
            initials.className = "testimonial-initials";
            initials.textContent = (testimonial.first_name.charAt(0) + testimonial.last_name.charAt(0)).toUpperCase();
            initials.setAttribute("aria-hidden", "true");

            var body = document.createElement("div");
            body.className = "testimonial-card-body";

            var comment = document.createElement("p");
            comment.className = "testimonial-card-text";
            comment.textContent = '"' + testimonial.testimonial + '"';

            var name = document.createElement("h6");
            name.className = "testimonial-card-title";
            name.textContent = testimonial.first_name + " " + testimonial.last_name;

            var position = document.createElement("p");
            position.className = "testimonial-card-position";
            position.textContent = testimonial.position;

            imageHolder.appendChild(initials);
            body.appendChild(comment);
            body.appendChild(name);
            body.appendChild(position);
            card.appendChild(imageHolder);
            card.appendChild(body);
            column.appendChild(card);
            testimonialList.appendChild(column);
        });
    }

    function requestHeaders() {
        return {
            "apikey": anonKey,
            "Authorization": "Bearer " + anonKey
        };
    }

    function loadTestimonials() {
        setStatus(listStatus, "Loading testimonials...");
        fetch(apiUrl + "?select=id,first_name,last_name,position,testimonial,submitted_at&order=submitted_at.desc", {
            headers: requestHeaders()
        }).then(function (response) {
            if (!response.ok) {
                throw new Error("Supabase returned HTTP " + response.status);
            }
            return response.json();
        }).then(function (testimonials) {
            if (!Array.isArray(testimonials)) {
                throw new Error("Supabase returned an invalid testimonials response.");
            }
            renderTestimonials(testimonials);
            setStatus(listStatus, "");
        }).catch(function (error) {
            console.error("Could not load testimonials:", error);
            setStatus(listStatus, "Testimonials could not be loaded. Please try again later.");
        });
    }

    if (!configured) {
        submitButton.disabled = true;
        setStatus(formStatus, "The testimonial form will be available after the portfolio owner connects Supabase.");
        setStatus(listStatus, "Automatic testimonials are not connected yet.");
        return;
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        if (!form.reportValidity()) {
            return;
        }

        var data = new FormData(form);
        var testimonial = {
            first_name: String(data.get("first_name")).trim(),
            last_name: String(data.get("last_name")).trim(),
            position: String(data.get("position")).trim(),
            testimonial: String(data.get("testimonial")).trim()
        };

        submitButton.disabled = true;
        setStatus(formStatus, "Sending your testimonial...");

        fetch(apiUrl + "?select=id,first_name,last_name,position,testimonial,submitted_at", {
            method: "POST",
            headers: Object.assign(requestHeaders(), {
                "Content-Type": "application/json",
                "Prefer": "return=representation"
            }),
            body: JSON.stringify(testimonial)
        }).then(function (response) {
            if (!response.ok) {
                return response.text().then(function (detail) {
                    throw new Error("Supabase returned HTTP " + response.status + ": " + detail);
                });
            }
            return response.json();
        }).then(function (savedTestimonials) {
            if (!Array.isArray(savedTestimonials) || savedTestimonials.length !== 1) {
                throw new Error("Supabase did not confirm the saved testimonial.");
            }
            renderTestimonials(savedTestimonials);
            form.reset();
            setStatus(formStatus, "Thank you! Your testimonial is now published.");
        }).catch(function (error) {
            console.error("Could not submit testimonial:", error);
            setStatus(formStatus, "Your testimonial could not be submitted. Please try again later.");
        }).finally(function () {
            submitButton.disabled = false;
        });
    });

    loadTestimonials();
    window.setInterval(loadTestimonials, 60000);
}());
