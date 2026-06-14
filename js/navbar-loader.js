/**
 * Shared Navbar Loader
 * Injects the common navbar into every page.
 * On index.html, patches cross-page links to in-page anchor links
 * so that the smooth scroll still works.
 */
(function () {
    // Detect if we are on the home page
    var path = window.location.pathname;
    var isHome = path === '/' ||
        path.endsWith('/index.html') ||
        path.endsWith('\\index.html') ||
        // Handles opening index.html directly as a file
        path.split('/').pop() === 'index.html' ||
        path.split('/').pop() === '';

    // Build nav links — use anchor hrefs on home, page hrefs elsewhere
    var links = isHome
        ? {
            services: '#services',
            rooms: '#rooms',
            restaurant: '#food',
            blog: '#blog-overview',
            contact: '#footer'
        }
        : {
            services: 'services.html',
            rooms: 'room.html',
            restaurant: 'restaurant.html',
            blog: 'blog.html',
            contact: 'contact.html'
        };

    var brandHref = isHome ? '#page-top' : 'index.html';



    var bookingModalTarget = '#reservationModal';

    // Get the current file name (e.g. "services.html")
    var currentFile = path.split('/').pop().split('?')[0].split('#')[0];

    // Helper function to figure out if this link should be active on independent pages
    function getActiveClass(pageName, alternatePage) {
        if (!isHome && (currentFile === pageName || currentFile === alternatePage)) {
            return ' active';
        }
        return '';
    }

    var navHTML = [
        '<nav class="navbar navbar-expand-lg navbar-dark fixed-top justify-content-end" id="mainNav" style="opacity:95%;">',
        '  <div class="container">',
        '    <a class="navbar-brand js-scroll-trigger" href="' + brandHref + '"><img src="images/image.png" alt="Logo"></a>',
        '    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive"',
        '      aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">',
        '      <span class="navbar-toggler-icon"></span>',
        '    </button>',
        '    <button class="btn btn-primary py-1 px-5" data-toggle="modal" data-target="' + bookingModalTarget + '">Book Now</button>',
        '    <div class="collapse navbar-collapse flex-grow-0" id="navbarResponsive">',
        '      <ul class="navbar-nav text-left">',
        '        <li class="nav-item' + getActiveClass('services.html') + '"><a class="nav-link js-scroll-trigger" href="' + links.services + '">Services</a></li>',
        '        <li class="nav-item' + getActiveClass('room.html') + '"><a class="nav-link js-scroll-trigger" href="' + links.rooms + '">Rooms</a></li>',
        '        <li class="nav-item' + getActiveClass('restaurant.html') + '"><a class="nav-link js-scroll-trigger" href="' + links.restaurant + '">Restaurant</a></li>',
        '        <li class="nav-item' + getActiveClass('blog.html', 'blog-single.html') + '"><a class="nav-link js-scroll-trigger" href="' + links.blog + '">Blog</a></li>',
        '        <li class="nav-item' + getActiveClass('contact.html') + '"><a class="nav-link js-scroll-trigger" href="' + links.contact + '">Contact</a></li>',
        '        <li class="nav-item' + getActiveClass('about.html') + '"><a class="nav-link js-scroll-trigger" href="about.html">About</a></li>',

        '      </ul>',
        '    </div>',
        '  </div>',
        '</nav>'
    ].join('\n');

    // Inject the navbar — replace the placeholder div if it exists,
    // otherwise prepend to body.
    var placeholder = document.getElementById('navbar-placeholder');
    if (placeholder) {
        placeholder.outerHTML = navHTML;
    } else {
        document.write(navHTML);
    }


    // Inject the global reservation modal
    var modalHTML = `<div class="modal fade" id="reservationModal" tabindex="-1" role="dialog" aria-labelledby="reservationModalLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header border-0 reservation-modal-header">
          <span class="reservation-modal-header-spacer" aria-hidden="true"></span>
          <h2 class="modal-title text-uppercase" id="reservationModalLabel" style="color: #fc3c3c; font-weight: 300;">
            Reservation Form</h2>
          <button type="button" class="close reservation-modal-close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="container col-lg-6 ">
            <form id="reservation-form" action="#">
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group" style="border-bottom: 2px solid #eaeaea; margin-bottom: 20px;">
                    <label for="name">Name<span class="required">*</span></label>
                    <input type="text" class="form-control mb-1" id="booking_name" placeholder="E.g. John Doe"
                      name="name" required style="font-size: 13px; color: #666; background: transparent;">
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group" style="border-bottom: 2px solid #eaeaea; margin-bottom: 20px;">
                    <label for="booking_phone">Phone<span class="required">*</span></label>
                    <input type="tel" class="form-control mb-1" id="booking_phone" placeholder="E.g. +61 412 345 678"
                      name="phone" required style="font-size: 13px; color: #666; background: transparent;">
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group" style="border-bottom: 2px solid #eaeaea; margin-bottom: 20px;">
                    <label for="booking_email">Email</label>
                    <input type="email" class="form-control mb-1" id="booking_email"
                      placeholder="E.g. johndoe@example.com" name="email"
                      style="font-size: 13px; color: #666; background: transparent;">
                  </div>
                </div>
              </div>
              <div class="row mb-2">
                <div class="col-md-12">
                  <div class="form-group"
                    style="padding: 15px; background: #fcfcfc; border: 1px solid #eaeaea; border-radius: 8px; margin-bottom: 20px;">
                    <label class="d-block mb-3" style="font-size: 14px; font-weight: 600; color: #333;">Booking
                      Type<span class="required">*</span></label>
                    <div class="d-flex flex-wrap mb-3"
                      style="gap: 15px; padding-bottom: 15px; border-bottom: 1px dashed #ddd;">
                      <div class="custom-control custom-radio">
                        <input type="radio" id="booking_type_stay" name="booking_type" class="custom-control-input"
                          value="stay" checked>
                        <label class="custom-control-label" for="booking_type_stay">Stay</label>
                      </div>
                      <div class="custom-control custom-radio">
                        <input type="radio" id="booking_type_tour" name="booking_type" class="custom-control-input"
                          value="tour">
                        <label class="custom-control-label" for="booking_type_tour">Tour</label>
                      </div>
                      <div class="custom-control custom-radio">
                        <input type="radio" id="booking_type_events" name="booking_type" class="custom-control-input"
                          value="events">
                        <label class="custom-control-label" for="booking_type_events">Events</label>
                      </div>
                    </div>

                    <!-- Stay Options -->
                    <div id="stay_options" class="mb-2">
                      <label style="font-size: 13px; color: #666;">Room Type<span class="required">*</span></label>
                      <div class="mt-2">
                        <div class="custom-control custom-radio custom-control-inline">
                          <input type="radio" id="room_single" name="stay_room_type" class="custom-control-input"
                            value="single" checked>
                          <label class="custom-control-label" for="room_single">Single Room</label>
                        </div>
                        <div class="custom-control custom-radio custom-control-inline">
                          <input type="radio" id="room_family" name="stay_room_type" class="custom-control-input"
                            value="family">
                          <label class="custom-control-label" for="room_family">Family Room</label>
                        </div>
                        <div class="custom-control custom-radio custom-control-inline">
                          <input type="radio" id="room_vip" name="stay_room_type" class="custom-control-input"
                            value="vip">
                          <label class="custom-control-label" for="room_vip">VIP Room</label>
                        </div>
                      </div>
                    </div>
                    <!-- Tour Options -->
                    <div id="tour_options" class="mb-2" style="display: none;">
                      <label style="font-size: 13px; color: #666;">Tour Package<span class="required">*</span></label>
                      <div class="mt-2 d-flex flex-row flex-nowrap align-items-center"
                        style="gap: 10px; overflow-x: auto; padding-bottom: 5px;">
                        <div class="custom-control custom-radio">
                          <input type="radio" id="tour_manang" name="tour_package" class="custom-control-input"
                            value="manang" checked>
                          <label class="custom-control-label" for="tour_manang">Manang Package Tour</label>
                        </div>
                        <div class="custom-control custom-radio">
                          <input type="radio" id="tour_mustang" name="tour_package" class="custom-control-input"
                            value="mustang">
                          <label class="custom-control-label" for="tour_mustang">Mustang Adventure</label>
                        </div>
                        <div class="custom-control custom-radio">
                          <input type="radio" id="tour_pokhara" name="tour_package" class="custom-control-input"
                            value="pokhara">
                          <label class="custom-control-label" for="tour_pokhara">Pokhara Sightseeing</label>
                        </div>
                      </div>
                    </div>
                    <!-- Event Options -->
                    <div id="events_options" class="mb-2" style="display: none;">
                      <label style="font-size: 13px; color: #666;">Event Space<span class="required">*</span></label>
                      <div class="mt-2 d-flex flex-row flex-nowrap align-items-center"
                        style="gap: 10px; overflow-x: auto; padding-bottom: 5px;">
                        <div class="custom-control custom-radio">
                          <input type="radio" id="event_hall" name="event_space" class="custom-control-input"
                            value="event" checked>
                          <label class="custom-control-label" for="event_hall">Event Hall</label>
                        </div>
                        <div class="custom-control custom-radio">
                          <input type="radio" id="event_banquet" name="event_space" class="custom-control-input"
                            value="banquet">
                          <label class="custom-control-label" for="event_banquet">Banquet Hall</label>
                        </div>
                        <div class="custom-control custom-radio">
                          <input type="radio" id="event_meeting" name="event_space" class="custom-control-input"
                            value="meeting">
                          <label class="custom-control-label" for="event_meeting">Meeting Hall</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row mb-2">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="email">Check In<span class="required">*</span></label>
                    <input type="date" class="form-control" id="booking_checkin" placeholder="Enter Check In Date"
                      name="checkin" required>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="email">Check Out</label>
                    <input type="date" class="form-control" id="booking_checkout" placeholder="Enter Check Out Date"
                      name="checkout">
                  </div>
                </div>
              </div>
              <div class="form-group time-chips-group">
                <label>Time</label>
                <div class="time-chips-hour d-flex flex-wrap" style="gap: 5px; margin-top: 5px;">
                  <div class="tc-btn hour-chip rounded-pill" data-hour="01:00">1</div>
                  <div class="tc-btn hour-chip rounded-pill" data-hour="02:00">2</div>
                  <div class="tc-btn hour-chip rounded-pill" data-hour="03:00">3</div>
                  <div class="tc-btn hour-chip rounded-pill" data-hour="04:00">4</div>
                  <div class="tc-btn hour-chip rounded-pill" data-hour="05:00">5</div>
                  <div class="tc-btn hour-chip rounded-pill" data-hour="06:00">6</div>
                  <div class="tc-btn hour-chip rounded-pill" data-hour="07:00">7</div>
                  <div class="tc-btn hour-chip rounded-pill" data-hour="08:00">8</div>
                  <div class="tc-btn hour-chip rounded-pill" data-hour="09:00">9</div>
                  <div class="tc-btn hour-chip rounded-pill" data-hour="10:00">10</div>
                  <div class="tc-btn hour-chip rounded-pill" data-hour="11:00">11</div>
                  <div class="tc-btn hour-chip active rounded-pill" data-hour="12:00">12</div>
                </div>
                <div class="time-chips-period d-flex flex-wrap" style="gap: 5px; margin-top: 10px;">
                  <div class="tc-btn period-chip rounded-pill" data-period="AM">AM</div>
                  <div class="tc-btn period-chip active rounded-pill" data-period="PM">PM</div>
                </div>
                <input type="hidden" id="time" name="time" value="12:00 PM">
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="adultcount">Adult</label>
                    <div class="field-icon-wrap">
                      <div class="icon"><span class="ion-ios-arrow-down"></span></div>
                      <input type="number" id="adult" class="form-control" name="adultcount" min="1" max="50" value="1">
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="childrencount">Children</label>
                    <div class="field-icon-wrap">
                      <div class="icon"><span class="ion-ios-arrow-down"></span></div>
                      <input type="number" id="childern" class="form-control" name="childrencount" min="0" max="50" value="0">
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="modal-footer border-0 justify-content-center">
          <button type="button" class="btn btn-secondary mr-2" data-dismiss="modal">Cancel</button>
          <button type="button" id="booking-form-submit" class="btn btn-primary">Book</button>
        </div>
      </div>
    </div>
  </div>`;
    document.write(modalHTML);

})();
