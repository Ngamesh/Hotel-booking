
document.addEventListener('DOMContentLoaded', function () {
  const today = new Date().toISOString().split('T')[0];

  document.querySelectorAll('.availability-checkin').forEach(function (dateField) {
    dateField.min = today;
    if (!dateField.value) {
      dateField.value = today;
    }
  });

  // Initialize Flatpickr for Modern Date/Time UI
  if (typeof flatpickr !== 'undefined') {
    // Config for Check In (Defaults to today)
    const checkinConfig = {
      minDate: "today",
      defaultDate: "today",
      dateFormat: "m/d/Y",
      disableMobile: true,
      altInput: true,
      altFormat: "F j, Y"
    };

    // Config for Check Out (Defaults to tomorrow)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const checkoutConfig = {
      minDate: "today",
      defaultDate: tomorrow,
      dateFormat: "m/d/Y",
      disableMobile: true,
      altInput: true,
      altFormat: "F j, Y"
    };

    flatpickr("#booking_checkin, #checkin_date, .availability-checkin", checkinConfig);
    flatpickr("#booking_checkout, #checkout_date", checkoutConfig);

    // Time Chips Logic
    const hourChips = document.querySelectorAll('.hour-chip');
    const periodChips = document.querySelectorAll('.period-chip');
    const timeHiddenInput = document.getElementById('time');

    if ((hourChips.length > 0 || periodChips.length > 0) && timeHiddenInput) {
      function updateHiddenTime(group) {
        const parentGroup = group.closest('.time-chips-group');
        const activeHour = parentGroup.querySelector('.hour-chip.active');
        const activePeriod = parentGroup.querySelector('.period-chip.active');

        let hour = activeHour ? activeHour.getAttribute('data-hour') : '';
        let period = activePeriod ? activePeriod.getAttribute('data-period') : '';

        // Update hidden input if both pieces of information are present, or partial
        let timeString = '';
        if (hour && period) {
          timeString = hour.split(':')[0] + ':00 ' + period;
        } else if (hour) {
          timeString = hour.split(':')[0] + ':00';
        } else if (period) {
          timeString = period;
        }

        const hiddenInput = parentGroup.querySelector('input[name="time"]');
        if (hiddenInput) {
          hiddenInput.value = timeString;
        }
      }

      // Initialize hidden input on page load with default selections
      const firstGroup = document.querySelector('.time-chips-group');
      if (firstGroup) {
        updateHiddenTime(firstGroup.querySelector('.hour-chip'));
      }

      hourChips.forEach(chip => {
        chip.addEventListener('click', function () {
          const group = this.closest('.time-chips-hour');
          group.querySelectorAll('.hour-chip').forEach(c => c.classList.remove('active'));
          this.classList.add('active');
          updateHiddenTime(group);
        });
      });

      periodChips.forEach(chip => {
        chip.addEventListener('click', function () {
          const group = this.closest('.time-chips-period');
          group.querySelectorAll('.period-chip').forEach(c => c.classList.remove('active'));
          this.classList.add('active');
          updateHiddenTime(group);
        });
      });
    }
  }

  // Check Availability Logic
  const checkBtn = document.getElementById('check-availability-btn');
  let activeAvailabilityTrigger = null;
  if (checkBtn) {
    checkBtn.addEventListener('click', function (e) {
      e.preventDefault();
      activeAvailabilityTrigger = this;
      const checkinEl = document.getElementById('checkin_date');
      const checkoutEl = document.getElementById('checkout_date');
      const checkin = checkinEl ? checkinEl.value : '';
      const checkout = checkoutEl ? checkoutEl.value : '';

      if (!checkin) {
        showCustomAlert('Please select a Check-In date.', false);
        return;
      }

      // Simple validation: Checkout should be after Checkin if checkout is provided
      if (checkin && checkout && new Date(checkout) <= new Date(checkin)) {
        showCustomAlert('Check-Out date must be after Check-In date.', false);
        return;
      }

      showAvailabilityModal();
    });
  }

  document.querySelectorAll('.check-availability-trigger').forEach(function (trigger) {
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      activeAvailabilityTrigger = this;
      const dateField = this.closest('.text, .specs, .block-34, .room-single')?.querySelector('.availability-checkin');

      if (dateField && !dateField.value) {
        showCustomAlert('Please select a Check-In date.', false);
        dateField.focus();
        return;
      }

      showAvailabilityModal();
    });
  });

  function showCustomAlert(message, isSuccess) {
    // Create Alert Modal if it doesn't exist
    let alertModal = document.getElementById('customAlertModal');
    if (!alertModal) {
      const modalHTML = `
        <div class="modal fade" id="customAlertModal" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content text-center p-4">
              <div class="modal-header border-0 justify-content-center">
                <h2 class="modal-title" style="color: #fc3c3c;">Notification</h2>
              </div>
              <div class="modal-body">
                <p class="lead" id="customAlertMessage"></p>
                <button type="button" class="btn btn-primary mt-3" data-dismiss="modal">OK</button>
              </div>
            </div>
          </div>
        </div>`;
      document.body.insertAdjacentHTML('beforeend', modalHTML);
      alertModal = document.getElementById('customAlertModal');
    }

    document.getElementById('customAlertMessage').innerText = message;
    if (window.jQuery) {
      $(alertModal).modal('show');
    }
  }

  function showSuccessModal(title, message) {
    // Create Success Modal if it doesn't exist
    let successModal = document.getElementById('customSuccessModal');
    if (!successModal) {
      const modalHTML = `
        <div class="modal fade" id="customSuccessModal" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content text-center p-4">
              <div class="modal-header border-0 justify-content-center">
                <h2 class="modal-title" style="color: #28a745;">Success!</h2>
              </div>
              <div class="modal-body">
                <h3 id="successModalTitle" style="color: #333;"></h3>
                <p class="lead" id="successModalMessage"></p>
                <button type="button" class="btn btn-primary mt-3" data-dismiss="modal">Great!</button>
              </div>
            </div>
          </div>
        </div>`;
      document.body.insertAdjacentHTML('beforeend', modalHTML);
      successModal = document.getElementById('customSuccessModal');
    }

    document.getElementById('successModalTitle').innerText = title;
    document.getElementById('successModalMessage').innerText = message;
    if (window.jQuery) {
      $(successModal).modal('show');
    }
  }

  function showAvailabilityModal() {
    // Create Availability Modal if it doesn't exist
    let availModal = document.getElementById('availabilitySuccessModal');
    if (!availModal) {
      const modalHTML = `
        <div class="modal fade" id="availabilitySuccessModal" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content text-center p-4">
              <div class="modal-header border-0 justify-content-center">
                <h2 class="modal-title" style="color: #fc3c3c;">Availability Confirmed!</h2>
              </div>
              <div class="modal-body">
                <p class="lead">Great news! This option is available for your selected date.</p>
                <p>Would you like to proceed with your booking now?</p>
              </div>
              <div class="modal-footer border-0 justify-content-center">
                <button type="button" class="btn btn-secondary mr-2" data-dismiss="modal">Maybe Later</button>
                <button type="button" id="proceed-to-booking" class="btn btn-primary">Book Now</button>
              </div>
            </div>
          </div>
        </div>`;
      document.body.insertAdjacentHTML('beforeend', modalHTML);
      availModal = document.getElementById('availabilitySuccessModal');

      // Link "Book Now" in this modal to the actual reservation modal
      document.getElementById('proceed-to-booking').addEventListener('click', function () {
        if (window.jQuery) {
          $(availModal).modal('hide');
          setTimeout(() => {
            $('#reservationModal').modal('show', activeAvailabilityTrigger);
          }, 400);
        } else {
          availModal.classList.remove('show');
          availModal.style.display = 'none';
          document.getElementById('reservationModal').classList.add('show');
          document.getElementById('reservationModal').style.display = 'block';
        }
      });
    }

    if (window.jQuery) {
      $(availModal).modal('show');
    }
  }

  // Reservation Form / Book Now Logic
  const bookingSubmitBtn = document.getElementById('booking-form-submit');
  if (bookingSubmitBtn) {
    bookingSubmitBtn.addEventListener('click', function (e) {
      e.preventDefault();

      const form = document.getElementById('reservation-form');
      if (form && !form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const nameField = document.getElementById('booking_name');
      const phoneField = document.getElementById('booking_phone');
      const checkinField = document.getElementById('booking_checkin');
      const roomsField = document.getElementById('booking_roomcount');

      const name = nameField ? nameField.value.trim() : '';
      const phone = phoneField ? phoneField.value.trim() : '';
      const checkin = checkinField ? checkinField.value : '';
      const rooms = roomsField ? roomsField.value : '1';

      // Simulate booking process
      bookingSubmitBtn.disabled = true;
      const originalText = bookingSubmitBtn.innerText;
      bookingSubmitBtn.innerText = 'Processing...';

      setTimeout(() => {
        // Clear form and close modal
        const form = document.getElementById('reservation-form');
        if (form) form.reset();

        // Close bootstrap modal if jQuery is available
        if (window.jQuery && typeof $('#reservationModal').modal === 'function') {
          $('#reservationModal').modal('hide');
        } else {
          // Fallback to manual closure if modal plugin isn't loaded correctly
          const modal = document.getElementById('reservationModal');
          if (modal) {
            modal.classList.remove('show');
            modal.style.display = 'none';
            document.body.classList.remove('modal-open');
            const backdrop = document.querySelector('.modal-backdrop');
            if (backdrop) backdrop.remove();
          }
        }

        showSuccessModal(`Thank you, ${name}!`, `Your booking for ${rooms} room(s) has been received. We will contact you at ${phone} shortly.`);

        bookingSubmitBtn.disabled = false;
        bookingSubmitBtn.innerText = originalText;
      }, 1000);
    });
  }

  // Footer Review Form Logic
  const reviewForm = document.getElementById('footer-review-form');
  if (reviewForm) {
    reviewForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('footer-review-name') ? document.getElementById('footer-review-name').value.trim() : '';
      const review = document.getElementById('footer-review-text') ? document.getElementById('footer-review-text').value.trim() : '';

      if (!name || !review) {
        showCustomAlert('Please provide both your name and a review.', false);
        return;
      }

      showSuccessModal('Review Received!', `Thank you, ${name}! Your review has been submitted successfully.`);
      reviewForm.reset();
    });
  }

  // Footer Subscribe Form Logic
  const subscribeForm = document.getElementById('footer-subscribe-form');
  if (subscribeForm) {
    subscribeForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = document.getElementById('subs-email') ? document.getElementById('subs-email').value.trim() : '';

      if (!email || !email.includes('@')) {
        showCustomAlert('Please provide a valid email address.', false);
        return;
      }

      showSuccessModal('Subscribed!', 'Thank you! You have been successfully subscribed to our newsletter.');
      subscribeForm.reset();
    });
  }

  // Contact Us Form Logic
  const contactForm = document.getElementById('contact-us-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('contact-name') ? document.getElementById('contact-name').value.trim() : '';
      const email = document.getElementById('contact-email') ? document.getElementById('contact-email').value.trim() : '';
      const message = document.getElementById('contact-message') ? document.getElementById('contact-message').value.trim() : '';

      if (!name || !email || !message) {
        showCustomAlert('Please fill in all required fields (Name, Email, and Message).', false);
        return;
      }

      showSuccessModal('Message Sent!', `Thank you, ${name}! Your message has been sent successfully. We will get back to you shortly at ${email}.`);
      contactForm.reset();
    });
  }
});

function openForm() {
  const popup = document.getElementById("popup1");
  if (popup) popup.style.display = "block";
}

function closeForm() {
  const popup = document.getElementById("popup1");
  if (popup) popup.style.display = "none";
}

// Offer Expired: intercept "View Offer" buttons in homepage slider
(function () {
  function setupOfferExpiredModal() {
    var offerBtns = document.querySelectorAll('.single-slider a[href="offer.html"]');
    offerBtns.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        if (typeof $ !== 'undefined') {
          $('#offerExpiredModal').modal('show');
        }
      });
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupOfferExpiredModal);
  } else {
    setupOfferExpiredModal();
  }
})();
