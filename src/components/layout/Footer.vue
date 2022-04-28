<template>
  <v-footer dark padles style="position: relative; z-index: 999">
    <div
      class="footer-top pt-150 background-img-2"
      style="
        background: url('https://appco.themetags.com/rtl/img/footer-bg.png')
          no-repeat center top / cover;
      "
    >
      <div class="container">
        <div class="row justify-content-between">
          <div class="col-md-12 col-lg-4 mb-4 mb-md-4 mb-sm-4 mb-lg-0">
            <div class="footer-nav-wrap text-white">
              <img
                src="img/logo-white-1x.png"
                alt="footer logo"
                width="120"
                class="img-fluid mb-3"
              />
              <p>
                Holisticly empower premium architectures without value-added
                ideas. Seamlessly evolve cross-platform experiences.
              </p>

              <div class="social-list-wrap">
                <ul class="social-list list-inline list-unstyled">
                  <li class="list-inline-item">
                    <a href="#" target="_blank" title="Facebook"
                      ><span class="ti-facebook"></span
                    ></a>
                  </li>
                  <li class="list-inline-item">
                    <a href="#" target="_blank" title="Twitter"
                      ><span class="ti-twitter"></span
                    ></a>
                  </li>
                  <li class="list-inline-item">
                    <a href="#" target="_blank" title="Instagram"
                      ><span class="ti-instagram"></span
                    ></a>
                  </li>
                  <li class="list-inline-item">
                    <a href="#" target="_blank" title="printerst"
                      ><span class="ti-pinterest"></span
                    ></a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-md-12 col-lg-8">
            <div class="row">
              <div
                class="col-sm-6 col-md-4 col-lg-4 mb-4 mb-sm-4 mb-md-0 mb-lg-0"
              >
                <div class="footer-nav-wrap text-white">
                  <h5 class="mb-3 text-white">Resources</h5>
                  <ul class="list-unstyled">
                    <li class="mb-2"><a href="#">Help</a></li>
                    <li class="mb-2"><a href="#">Events</a></li>
                    <li class="mb-2"><a href="#">Live Support</a></li>
                    <li class="mb-2"><a href="#">Open Sources</a></li>
                    <li class="mb-2"><a href="#">Documentation</a></li>
                  </ul>
                </div>
              </div>
              <div
                class="col-sm-6 col-md-4 col-lg-4 mb-4 mb-sm-4 mb-md-0 mb-lg-0"
              >
                <div class="footer-nav-wrap text-white">
                  <h5 class="mb-3 text-white">Company</h5>
                  <ul class="list-unstyled support-list">
                    <li class="mb-2">
                      <a href="#">About Us</a>
                    </li>
                    <li class="mb-2">
                      <a href="#">Careers</a>
                    </li>
                    <li class="mb-2">
                      <a href="#">Customers</a>
                    </li>
                    <li class="mb-2">
                      <a href="#">Community</a>
                    </li>
                    <li class="mb-2">
                      <a href="#">Our Team</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-sm-6 col-md-4 col-lg-4">
                <div class="footer-nav-wrap text-white">
                  <h5 class="mb-3 text-white">Location</h5>
                  <ul class="list-unstyled support-list">
                    <li class="mb-2 d-flex align-items-center">
                      <span class="ti-location-pin mr-2"></span>
                      121 King Melbourne
                      <br />Australia 3000
                    </li>
                    <li class="mb-2 d-flex align-items-center">
                      <span class="ti-mobile mr-2"></span>
                      <a href="tel:+61283766284"> +61 2 8376 6284</a>
                    </li>
                    <li class="mb-2 d-flex align-items-center">
                      <span class="ti-email mr-2"></span
                      ><a href="mailto:mail@example.com"> mail@example.com</a>
                    </li>
                    <li class="mb-2 d-flex align-items-center">
                      <span class="ti-world mr-2"></span
                      ><a href="#"> www.yourdomain.com</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--footer bottom copyright start-->
      <div class="footer-bottom border-gray-light mt-5 py-3">
        <div class="container">
          <div class="row">
            <div class="col-md-6 col-lg-7">
              <div class="copyright-wrap small-text">
                <p class="mb-0 text-white">
                  © ThemeTags Design Agency, All rights reserved
                </p>
              </div>
            </div>
            <div class="col-md-6 col-lg-5">
              <div
                class="terms-policy-wrap text-lg-right text-md-right text-left"
              >
                <ul class="list-inline">
                  <li class="list-inline-item">
                    <a class="small-text" href="#">Terms</a>
                  </li>
                  <li class="list-inline-item">
                    <a class="small-text" href="#">Security</a>
                  </li>
                  <li class="list-inline-item">
                    <a class="small-text" href="#">Privacy Policy</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--footer bottom copyright end-->
    </div>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
  data: () => ({
    icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
  }),
};
</script>

<style scoped></style>
