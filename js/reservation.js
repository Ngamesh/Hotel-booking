document.addEventListener('DOMContentLoaded', function () {
    const reservationForm = document.getElementById('reservation-form');
    const stayOptions = document.getElementById('stay_options');
    const tourOptions = document.getElementById('tour_options');
    const eventsOptions = document.getElementById('events_options');
    let reservationScrollPosition = 0;

    function lockPageScroll() {
        reservationScrollPosition = window.pageYOffset || document.documentElement.scrollTop || 0;
        document.body.classList.add('reservation-scroll-locked');
        document.body.style.top = `-${reservationScrollPosition}px`;
    }

    function unlockPageScroll() {
        document.body.classList.remove('reservation-scroll-locked');
        document.body.style.top = '';
        window.scrollTo(0, reservationScrollPosition);
    }

    function getSelectedBookingType() {
        const selectedBookingType = document.querySelector('input[name="booking_type"]:checked');
        return selectedBookingType ? selectedBookingType.value : 'stay';
    }

    function updateFormFields() {
        const selectedBookingType = getSelectedBookingType();

        if (stayOptions) stayOptions.style.display = 'none';
        if (tourOptions) tourOptions.style.display = 'none';
        if (eventsOptions) eventsOptions.style.display = 'none';

        if (selectedBookingType === 'stay') {
            if (stayOptions) stayOptions.style.display = 'block';
        } else if (selectedBookingType === 'tour') {
            if (tourOptions) tourOptions.style.display = 'block';
        } else if (selectedBookingType === 'events') {
            if (eventsOptions) eventsOptions.style.display = 'block';
        }
    }

    if (reservationForm) {
        reservationForm.addEventListener('change', function (event) {
            if (event.target && event.target.name === 'booking_type') {
                updateFormFields();
            }
        });

        reservationForm.addEventListener('click', function (event) {
            const bookingTypeControl = event.target.closest('.custom-control');

            if (!bookingTypeControl) {
                return;
            }

            const bookingTypeInput = bookingTypeControl.querySelector('input[name="booking_type"]');

            if (!bookingTypeInput || bookingTypeInput.checked) {
                return;
            }

            bookingTypeInput.checked = true;
            bookingTypeInput.dispatchEvent(new Event('change', { bubbles: true }));
        });

        // Initial call to set correct state
        updateFormFields();
    }

    // Modal pre-selection logic
    $('#reservationModal').on('show.bs.modal', function (event) {
        lockPageScroll();

        var button = $(event.relatedTarget); // Button that triggered the modal
        var bookingType = button.data('booking-type'); // Extract info from data-* attributes
        var eventSpace = button.data('event-space');
        var stayRoomType = button.data('stay-room-type');
        var tourPackage = button.data('tour-package');

        if (bookingType) {
            // Select the booking type radio
            $(`input[name="booking_type"][value="${bookingType}"]`).prop('checked', true).trigger('change');

            // Select the sub-option if provided
            if (bookingType === 'events' && eventSpace) {
                $(`input[name="event_space"][value="${eventSpace}"]`).prop('checked', true);
            } else if (bookingType === 'stay' && stayRoomType) {
                $(`input[name="stay_room_type"][value="${stayRoomType}"]`).prop('checked', true);
            } else if (bookingType === 'tour' && tourPackage) {
                $(`input[name="tour_package"][value="${tourPackage}"]`).prop('checked', true);
            }
        }
    });

    $('#reservationModal').on('hidden.bs.modal', unlockPageScroll);
});
