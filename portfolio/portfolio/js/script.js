(function () {
  "use strict";

  /* ------------------------------------------------------------------
     Mobile navigation toggle
     ------------------------------------------------------------------ */
  var navToggle = document.getElementById("navToggle");
  var navMenu = document.getElementById("navMenu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      var isOpen = navMenu.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navMenu.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ------------------------------------------------------------------
     Footer year
     ------------------------------------------------------------------ */
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  /* ------------------------------------------------------------------
     Contact form validation
     Client-side validation only improves UX. It is never a substitute
     for server-side validation and sanitization, which must happen
     wherever this form is actually submitted.
     ------------------------------------------------------------------ */
  var form = document.getElementById("contactForm");
  var formNote = document.getElementById("formNote");

  var LIMITS = {
    name: 100,
    subject: 150,
    message: 2000
  };

  var EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setFieldError(fieldId, message) {
    var input = document.getElementById(fieldId);
    var errorEl = document.getElementById(fieldId + "Error");
    if (!input || !errorEl) return;

    if (message) {
      input.setAttribute("aria-invalid", "true");
      errorEl.textContent = message;
    } else {
      input.removeAttribute("aria-invalid");
      errorEl.textContent = "";
    }
  }

  function validateField(id, value, maxLength, label) {
    var trimmed = value.trim();
    if (trimmed.length === 0) {
      setFieldError(id, label + " is required.");
      return false;
    }
    if (trimmed.length > maxLength) {
      setFieldError(id, label + " must be " + maxLength + " characters or fewer.");
      return false;
    }
    setFieldError(id, "");
    return true;
  }

  function validateEmail(value) {
    var trimmed = value.trim();
    if (trimmed.length === 0) {
      setFieldError("email", "Email is required.");
      return false;
    }
    if (trimmed.length > 254 || !EMAIL_PATTERN.test(trimmed)) {
      setFieldError("email", "Enter a valid email address.");
      return false;
    }
    setFieldError("email", "");
    return true;
  }

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var nameInput = document.getElementById("name");
      var emailInput = document.getElementById("email");
      var subjectInput = document.getElementById("subject");
      var messageInput = document.getElementById("message");

      var isNameValid = validateField("name", nameInput.value, LIMITS.name, "Name");
      var isEmailValid = validateEmail(emailInput.value);
      var isSubjectValid = validateField("subject", subjectInput.value, LIMITS.subject, "Subject");
      var isMessageValid = validateField("message", messageInput.value, LIMITS.message, "Message");

      var allValid = isNameValid && isEmailValid && isSubjectValid && isMessageValid;

      if (!allValid) {
        if (formNote) {
          formNote.textContent = "Please fix the highlighted fields before sending.";
        }
        return;
      }

      // No backend is connected in this template. Replace this block with
      // a secure request to your own server-side endpoint, which must
      // re-validate and sanitize all fields before processing them.
      if (formNote) {
        formNote.textContent = "This form isn't connected to a server yet — add your own backend endpoint to receive messages.";
      }
      form.reset();
    });

    // Clear a field's error as soon as the user starts correcting it.
    ["name", "email", "subject", "message"].forEach(function (id) {
      var input = document.getElementById(id);
      if (input) {
        input.addEventListener("input", function () {
          if (input.getAttribute("aria-invalid") === "true") {
            setFieldError(id, "");
          }
        });
      }
    });
  }
})();
