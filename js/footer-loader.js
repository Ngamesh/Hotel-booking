
(function () {
    var footerHTML = `<!-- Start Footer -->
  <footer id="footer" class="footer-area bg-f">
    <div class="container">
      <div class="row">
        <div class="col-lg-5 col-md-6">
          <h3>review our hotel</h3>
          <div class="review_form">
            <form id="footer-review-form" class="review_form">
              <input name="name" id="footer-review-name" class="form_input" placeholder="Enter Name" type="text">
              <textarea name="review" id="footer-review-text" rows="2" class="form_input" placeholder="Give Review"
                type="text"></textarea>
              <button type="submit" class="submit">SUBMIT</button>
              <div class="clearfix"></div>
            </form>
          </div>
        </div>
        <div class="col-lg-3 col-md-6">
          <h3>Contact information</h3>
          <p class="lead">Lakside, Pokhara <br> Street-19</p>
          <p class="lead"><a href="#">+977 9876543210</a> <br> <a href="#"> +977 9811111111</a></p>
          <p><a href="#"> lakeside@hotel.book.com</a> <br>
            <a href="#"> lakeside@hotel.inquiry.com</a>
          </p>
        </div>
        <div class="col-lg-4 col-md-6">
          <h3>Subscribe</h3>
          <div class="subscribe_form">
            <form id="footer-subscribe-form" class="subscribe_form">
              <input name="email" id="subs-email" class="form_input" placeholder="Enter Email" type="email">
              <button type="submit" class="submit">SUBSCRIBE</button>
              <div class="clearfix"></div>
            </form>
          </div>
          <ul class="list-inline f-social">
            <li class="list-inline-item"><a href="#"><i class="fa fa-facebook" aria-hidden="true"></i></a></li>
            <li class="list-inline-item"><a href="#"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>
            <li class="list-inline-item"><a href="#"><i class="fa fa-linkedin" aria-hidden="true"></i></a></li>
            <li class="list-inline-item"><a href="#"><i class="fa fa-google-plus" aria-hidden="true"></i></a></li>
            <li class="list-inline-item"><a href="#"><i class="fa fa-instagram" aria-hidden="true"></i></a></li>
          </ul>
        </div>
      </div>
    </div>

    <div class="copyright">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <p class="company-name">All Rights Reserved.<br> <a href="#">The Hotel</a> &copy; 2026 design by
              <a href="https://ngamesh.com.np" target="_blank">Ngamesh</a>
            </p>
          </div>
        </div>
      </div>
    </div>

  </footer>
  <!-- End Footer -->`;
    document.write(footerHTML);
})();
