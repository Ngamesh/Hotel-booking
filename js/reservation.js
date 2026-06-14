document.addEventListener('DOMContentLoaded', function () {
    const stayRadio = document.getElementById('booking_type_stay');
    const tourRadio = document.getElementById('booking_type_tour');
    const eventsRadio = document.getElementById('booking_type_events');

    const stayOptions = document.getElementById('stay_options');
    const tourOptions = document.getElementById('tour_options');
    const eventsOptions = document.getElementById('events_options');

    function updateFormFields() {
        if (stayOptions) stayOptions.style.display = 'none';
        if (tourOptions) tourOptions.style.display = 'none';
        if (eventsOptions) eventsOptions.style.display = 'none';

        if (stayRadio && stayRadio.checked) {
            if (stayOptions) stayOptions.style.display = 'block';
        } else if (tourRadio && tourRadio.checked) {
            if (tourOptions) tourOptions.style.display = 'block';
        } else if (eventsRadio && eventsRadio.checked) {
            if (eventsOptions) eventsOptions.style.display = 'block';
        }
    }

    if (stayRadio && tourRadio && eventsRadio) {
        stayRadio.addEventListener('change', updateFormFields);
        tourRadio.addEventListener('change', updateFormFields);
        eventsRadio.addEventListener('change', updateFormFields);

        // Initial call to set correct state
        updateFormFields();
    }

    // Modal pre-selection logic
    $('#reservationModal').on('show.bs.modal', function (event) {
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
});
