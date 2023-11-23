<template>
  <div>
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

      <link
        href="https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400;600;700&family=Poppins:wght@100;300;400;600;700&family=Work+Sans:wght@100;200;400;500;600;800&display=swap"
        rel="stylesheet"
      />

      <!-- Bootstrap CDN CSS -->

      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
        crossorigin="anonymous"
      />
    </head>

    <div class="hero-main-container">
      <select
        class="home-language-select-button"
        v-model="selectedLanguage"
        @change="changeLanguage"
        @load="initial"
      >
        <option
          v-for="(audio, language) in audios"
          :key="language"
          :value="language"
          style="background-color: #081e59"
          :selected="language === 'english'"
        >
          {{ language }}
        </option>
      </select>

      <button class="proceed-button" @click="toggleLogin">Proceed</button>
      <!-- v-on:click="proceedClicked" -->

      <!-- Sliding Container -->

      <div :class="{ 'login-container': true, 'show-login': isLoginVisible }">
        <!-- <div v-bind:class = "[proceedClicked ? 'parent-container container-fluid m-0 p-0' : 'parent-container container-fluid m-0 p-0 hide']"> -->

        <div class="row g-0 m-0 p-0">
          <div class="col-md-4 slide-column-img"></div>

          <div class="col-md-8 m-0 p-0 columns slide-column-form-container">
            <!-- Progress Bar and Heading -->

            <div class="audio-section">
              <div
                class="row w-100 h-100 d-flex justify-content-center align-items-center"
              >
                <div class="col-8 col-md-10 h-100">
                  <AudioPlayer
                    class="w-100"
                    :selectedLanguage="selectedLanguage"
                    :audios="audios"
                  />
                </div>
                <div
                  class="col-4 col-md-2 h-100 d-flex justify-content-center align-items-center"
                >
                  <select
                    class="reg-language-select-button text-start"
                    v-model="selectedLanguage"
                    @change="changeLanguage"
                    @load="initial"
                  >
                    <option
                      v-for="(audio, language) in audios"
                      :key="language"
                      :value="language"
                    >
                      {{ language }}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <div class="parent-heading">Satyam vada | Dharmam chara</div>

            <!-- Form parent container -->

            <div class="w-100 m-0 form-container-wrapper">
              <div class="row g-4 container-fluid form-parent-container mx-0">
                <div class="col-12">
                  <div class="row gx-4">
                    <div class="col-md-6 gy-4 form-input-container">
                      <input
                        type="text"
                        :class="[
                          errors.fname
                            ? 'fname form-input-field w-100 h-100 validate'
                            : 'fname form-input-field w-100 h-100',
                        ]"
                        placeholder="First name"
                        v-model="fname"
                      />
                      <span
                        :class="[errors.fname ? 'show-error' : 'hide-error']"
                        >First name is empty</span
                      >
                    </div>
                    <div class="col-md-6 gy-4 form-input-container">
                      <input
                        type="text"
                        :class="[
                          errors.lname
                            ? 'lname form-input-field w-100 h-100 validate'
                            : 'lname form-input-field w-100 h-100',
                        ]"
                        placeholder="Last name"
                        v-model="lname"
                      />
                      <span
                        :class="[errors.lname ? 'show-error' : 'hide-error']"
                        >Last name is empty</span
                      >
                    </div>
                  </div>

                  <div class="row gx-4">
                    <div class="col-md-6 gy-4 form-input-container">
                      <input
                        type="text"
                        :class="[
                          errors.email
                            ? 'form-input-field w-100 h-100 validate'
                            : 'email form-input-field w-100 h-100',
                        ]"
                        placeholder="Email"
                        v-model="email"
                      />
                      <span
                        :class="[errors.email ? 'show-error' : 'hide-error']"
                        >Email is empty</span
                      >
                    </div>
                    <div class="col-md-6 gy-4 form-input-container">
                      <div class="row h-100">
                        <div class="col-8 h-100" style="background: none">
                          <!-- <input type="text" class = "dob form-input-field w-100 h-100" placeholder = "DOB"> -->
                          <VueDatePicker
                            :class="[
                              errors.dob
                                ? 'dob form-input-field w-100 h-100 validate'
                                : 'dob form-input-field w-100 h-100',
                            ]"
                            v-model="dob"
                            v-bind:enable-time-picker="false"
                            auto-apply
                            placeholder="DOB"
                          ></VueDatePicker>
                        </div>
                        <div class="col-4 h-100 d-flex">
                          <div
                            class="h-100 d-flex justify-content-center align-items-center"
                          >
                            <div
                              class="gender-wrapper w-50 h-100 d-flex flex-column justify-content-center align-items-center"
                            >
                              <img
                                src="./images/female.png"
                                class="w-50 mb-1"
                              />
                              <input
                                class="gender-radio-button"
                                type="radio"
                                name="select"
                                id=""
                                value="female"
                                v-model="gender"
                              />
                            </div>
                            <div
                              class="gender-wrapper w-50 h-100 d-flex flex-column justify-content-center align-items-center"
                            >
                              <img src="./images/male.png" class="w-50 mb-1" />
                              <input
                                class="gender-radio-button"
                                type="radio"
                                name="select"
                                id=""
                                value="male"
                                v-model="gender"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <span :class="[errors.dob ? 'show-error ' : 'hide-error']"
                        >Select a date of birth</span
                      >
                     
                    </div>
                  </div>

                  <div class="row gx-4">
                    <div class="col-md-6 gy-4 form-input-container">
                      <select
                        :class="[
                          errors.country
                            ? 'count form-input-field w-100 h-100 validate'
                            : 'count form-input-field w-100 h-100',
                        ]"
                        v-model="country"
                      >
                        <option disabled value="">Select a country</option>
                        <!-- Placeholder option -->
                        <option
                          v-for="country in countries"
                          :key="country.id"
                          :value="country.name"
                        >
                          {{ country.name }}
                        </option>
                      </select>
                      <span
                        :class="[errors.country ? 'show-error' : 'hide-error']"
                        >Select a Country</span
                      >
                    </div>
                    <div
                      class="col-md-6 gy-4 phone-code-n-number form-input-container"
                    >
                      <div class="row h-100 g-0 d-flex justify-content-between">
                        <div class="col-3 h-100 gx-0">
                          <div class="h-100 pe-3">
                            <div
                              class="country-flag form-input-field w-100 h-100 d-flex justify-content-center align-items-center"
                            >
                              <img
                                class="country-flag-image"
                                v-bind:src="showFlag(country)"
                              />
                            </div>
                          </div>
                        </div>
                        <div class="col-2 h-100 gx-0">
                          <div
                            class="country-code form-input-field w-100 h-100 rounded-0 rounded-start d-flex justify-content-center align-items-center"
                          >
                            {{ country_code }}
                          </div>
                        </div>
                        <div class="col-7 h-100 gx-0">
                          <input
  type="number"
  @input="onInput"
  placeholder="Phone number"
  name="phone"
  :class="[
    errors.phone
      ? 'phone-number form-input-field w-100 h-100 rounded-0 rounded-end validate '
      : 'phone-number form-input-field w-100 h-100 rounded-0 rounded-end',
  ]"
  v-model="phone"
/>

                        </div>
                      </div>
                      <span
                        :class="[
                          errors.phone ? 'show-error text-end' : 'hide-error',
                        ]"
                        >Enter your Phone number</span
                      >
                    </div>
                  </div>

                  <div class="row gx-4">
                    <div class="col-md-6 gy-4 form-input-container">
                      <div
                        :class="[
                          errors.reference
                            ? 'form-input-field w-100 h-100 d-flex justify-content-around validate'
                            : 'form-input-field w-100 h-100 d-flex justify-content-around',
                        ]"
                      >
                        <div
                          class="search-icon h-100 d-flex flex-column justify-content-center align-items-center"
                        >
                          🔍
                        </div>

                        <div
                          class="reference-name d-flex flex-column justify-content-center align-items-center"
                        >
                          Social media
                          <input
                            class="reference-radio-button"
                            style="background: none"
                            type="radio"
                            v-model="reference"
                            name="source"
                            value="social_media"
                          />
                        </div>

                        <div
                          class="reference-name d-flex flex-column justify-content-center align-items-center"
                        >
                          Reference
                          <input
                            class="reference-radio-button"
                            style="background: none"
                            type="radio"
                            v-model="reference"
                            name="source"
                            value="reference"
                          />
                        </div>

                        <div
                          class="reference-name d-flex flex-column justify-content-center align-items-center"
                        >
                          News
                          <input
                            class="reference-radio-button"
                            style="background: none"
                            type="radio"
                            v-model="reference"
                            name="source"
                            value="news"
                          />
                        </div>
                        <div
                          class="reference-name d-flex flex-column justify-content-center align-items-center"
                        >
                          Others
                          <input
                            class="reference-radio-button"
                            style="background: none"
                            type="radio"
                            v-model="reference"
                            name="source"
                            value="others"
                          />
                        </div>
                      </div>
                      <span
                        :class="[
                          errors.reference ? 'show-error' : 'hide-error',
                        ]"
                        >Please select an option</span
                      >
                    </div>

                    <div class="col-md-6 gy-4 form-input-container">
                      <!-- <VueMultiselect 
                          class = "language form-input-field w-100 h-100"
                          v-model="value" 
                          tag-placeholder="Add this as new tag" 
                          placeholder="Select Languages" 
                          label="name" 
                          track-by="code" 
                          :options="options" 
                          :multiple="true" 
                          :taggable="true" 
                          @tag="addTag" 
                          v-bind:searchable = "false"
                          ></VueMultiselect> -->
                          <div
      :class="[
        errors.selectedOptions
          ? 'multiselect language form-input-field w-100 h-100 validate'
          : 'multiselect language form-input-field w-100 h-100',
      ]"
      ref="dropdown"
    >
      <div class="selectBox" @click="toggleDropdown">
        <select v-model="selectedOptions" :multiple="true">
          <option value="" disabled>
            {{
              selectedOptions.length > 0
                ? `${selectedOptions.length} languages selected`
                : "Select languages"
            }}
          </option>
        </select>
        <div class="overSelect"></div>
      </div>
      <div :class="{ show: expanded }" id="checkboxes">
        <label
          v-for="(option, index) in options"
          :key="index"
          :for="`checkbox-${index}`"
        >
          <input
            type="checkbox"
            :id="`checkbox-${index}`"
            v-model="selectedOptions"
            :value="option"
          />
          {{ option }}
        </label>
      </div>
      <span
        :class="[
          errors.selectedOptions ? 'show-error' : 'hide-error',
        ]"
      >Please select one or more languages</span>
    </div>


                      
                    </div>
                  </div>
                </div>

                <div class="col-12 form-input-container">
                  <div class="row h-100">
                    <div class="col-12">
                      <!-- <input type="text" class = "special_remarks form-input-field w-100 h-100" placeholder = "Special remarks"> -->
                      <input
                        type="text"
                        :class="[
                          errors.special_remarks
                            ? 'form-input-field w-100 h-100 validate'
                            : 'form-input-field w-100 h-100',
                        ]"
                        placeholder="Special remarks"
                        v-model="special_remarks"
                        v-on:change="specialCount"
                        maxlength="500"
                      />
                    </div>
                  </div>
                </div>

                <div
                  :class="[
                    errors.special_remarks
                      ? 'col-12 g-0 text-end px-3 d-flex justify-content-between'
                      : 'col-12 g-0 text-end px-3',
                  ]"
                >
                  <span
                    :class="[
                      errors.special_remarks ? 'show-error ' : 'hide-error',
                    ]"
                    >Please enter your remarks</span
                  >

                  <span class="remarks-count text-end"
                    >{{ 500 - special_remarks_count }}/500</span
                  >
                </div>

                <div class="col-12 form-input-container">
                  <div class="row h-100">
                    <div class="col-12">
                      <!-- <input class = "submit form-input-field w-100 h-100" type="submit" value ="Submit"> -->
                      <input
                        v-on:click="register"
                        class="submit form-input-field w-100 h-100"
                        type="submit"
                        value="Submit"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Registration sliding page Footer -->

            <div class="footer-container-wrapper w-100">
              <div class="footer row">
                <div class="footer-sub-grp col-3">
                  <span class="footer-update">0</span>
                  <span class="footer-head">Total meditators</span>
                </div>
                <div class="footer-sub-grp col-3">
                  <span class="footer-update"> {{ ribbon_count }} </span>
                  <span class="footer-head">Waiting List</span>
                </div>
                <div class="footer-sub-grp col-3">
                  <span class="footer-update">0</span>
                  <span class="footer-head">Benefactories</span>
                </div>
                <div class="footer-sub-grp col-3">
                  <span class="footer-update">0</span>
                  <span class="footer-head">Classes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- --------------------------Confirmation Popup------------------- -->

      <div
        v-bind:class="[
          toggle_submit
            ? 'popup-container-wrapper'
            : 'popup-container-wrapper hide',
        ]"
      >
        <div
          class="w-100 h-100 container-fluid d-flex justify-content-center align-items-center"
        >
          <div class="row pop-up">
            <div
              class="col-12 pop-head d-flex justify-content-center align-items-center"
            >
              Confirm your Email & Phone number?
            </div>

            <div
              class="col-12 pop-content d-flex flex-column justify-content-center align-items-center"
            >
              <p>{{ email }}</p>
              <span style="color: red; font-weight: bold"> & </span>
              <p>{{ phone }}</p>
              <span>Would you like to edit your email and phone number?</span>
            </div>

            <div
              class="col-12 pop-btn d-flex justify-content-around align-items-center"
            >
              <button class="ok" v-on:click="submitToExpress">OK</button>
              <button class="edit" v-on:click="editpress">Edit</button>
            </div>
          </div>
        </div>
      </div>

      <!-- User already exist Popup -->

      <div
        v-bind:class="[
          close_btn
            ? 'popup-container-wrapper'
            : 'popup-container-wrapper hide',
        ]"
      >
        <div
          class="w-100 h-100 container-fluid d-flex justify-content-center align-items-center"
        >
          <div class="row pop-up">
            <div
              class="col-12 pop-head d-flex justify-content-center align-items-center"
            >
              Registration Unsuccessful
            </div>

            <div
              class="col-12 pop-content d-flex flex-column justify-content-center align-items-center"
            >
              <p class="danger">User already exists!</p>
            </div>

            <div class="col-12 pop-btn d-flex justify-content-around">
              <button class="ok" v-on:click="closeExist">OK</button>
            </div>
          </div>
        </div>
      </div>

      <!-- otp popup-->

      <div
        v-bind:class="[
          show_otp_popup
            ? 'popup-container-wrapper otp'
            : 'popup-container-wrapper otp hide',
        ]"
      >
        <div
          class="w-100 h-100 container-fluid d-flex justify-content-center align-items-center"
        >
          <div class="row pop-up">
            <div
              class="col-12 pop-head otp-pop-head d-flex justify-content-center align-items-center"
            >
              Enter your OTP
            </div>

            <div
              class="col-12 mt-1 mb-2 pop-content otp-pop-content d-flex flex-column justify-content-center align-items-center"
            >
              <div class="otp-field-container d-flex align-items-center mb-2">
                <input :class="[
                          errors.otp
                            ? 'otp-input-field m-2 validate'
                            : 'otp-input-field m-2',
                        ]"
                 
                  v-model="otpInput1"
                  maxlength="1"
                  v-on:input="focusNext(1, $event)"
                  id="otp-input"
                  type="text"
                />
                <input
                  :class="[
                          errors.otp
                            ? 'otp-input-field m-2 validate'
                            : 'otp-input-field m-2',
                        ]"
                  v-model="otpInput2"
                  maxlength="1"
                  v-on:input="focusNext(2, $event)"
                  id="otp-input"
                  type="text"
                />
                <input
                  :class="[
                          errors.otp
                            ? 'otp-input-field m-2 validate'
                            : 'otp-input-field m-2',
                        ]"
                  v-model="otpInput3"
                  maxlength="1"
                  v-on:input="focusNext(3, $event)"
                  id="otp-input"
                  type="text"
                />
                <input
                  :class="[
                          errors.otp
                            ? 'otp-input-field m-2 validate'
                            : 'otp-input-field m-2',
                        ]"
                  v-model="otpInput4"
                  maxlength="1"
                  id="otp-input"
                  type="text"
                />
              </div>
              
              <div
                v-bind:class="[
                  message.startsWith('I')
                    ? 'otp-timer color-red'
                    : 'otp-timer ',
                ]"
              >
                {{ message }}
              </div>
              <span class = "color-red">{{ invalid_otp }}</span>
            </div>

            <div
              class="col-12 pop-btn otp-pop-btn d-flex justify-content-around"
            >
              <button
                disabled="{{resendEnabled === true ? true:false}}"
                :class="[resendEnabled ? 'otp-resend ok-otp' : 'otp-resend']"
                v-on:click="resendOtp"
              >
                Resend
              </button>
              <button class="otp-submit edit" v-on:click="submitOtp">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- ------------Registration Successful Card----------------- -->

      <div
        v-bind:class="[
          show_registration_success
            ? 'popup-container-wrapper'
            : 'popup-container-wrapper hide',
        ]"
      >
        <div
          class="w-100 h-100 container-fluid d-flex justify-content-center align-items-center"
        >
          <div class="row reg-success-card">
            <div
              class="col-12 reg-success-card-head d-flex justify-content-between align-items-center"
            >
              <div class="reg-card-number">
                <p>Card Number</p>
                <h1>{{success_user_id }}</h1>
              </div>

              <img
                class="reg-card-logo"
                src="./images/thasmai-card-logo.png"
                alt="Thasmai logo"
              />
            </div>

            <div
              class="col-12 reg-success-card-content d-flex flex-column justify-content-center align-items-center"
            >
              <img class="chip" src="../components/chip.png" alt="chip" />
              <div>
                <img
                  class="reg-card-star-life-logo"
                  src="./images/star-life-logo-gold.png"
                  alt="star-life-img"
                />
                <p class="reg-card-contact-number">
                  <span>Contact: 9834434322</span>
                </p>
                <h3 class="reg-card-success-message">
                  Registration Successful
                </h3>
                <a class="success-page-link" href="/registration-success">OK</a>
              </div>
            </div>

            <div
              class="col-12 reg-success-card-footer d-flex justify-content-between align-items-center"
            >
              <div class="card-holder-group">
                <div class="card-holder-name">
                  <p>Cardholder Name</p>
                  <h2>{{ this.fname }}  {{ this.lname }}</h2>
                  <!-- <h2>ALBIN ANTO DEVASIA</h2> -->
                  <p>DOJ: 23/11/2023</p>
                </div>
              </div>

              <div class="reg-card-validity">
                <p>VALID: 11/2027</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="toast align-items-center"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        style="z-index: 1000"
      >
        <div class="d-flex">
          <div class="toast-body">Hello, world! This is a toast message.</div>
          <button
            type="button"
            class="btn-close me-2 m-auto"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vClickOutside from 'v-click-outside';
import axios from "axios";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
// import VueMultiselect from 'vue-multiselect'
import "bootstrap";
import AudioPlayer from "./AudioPlayer.vue";

import io from "socket.io-client";
import { eventBus } from "@/eventBus";

// import VueLangSelect from "./LangSelect.vue";
export default {
  name: "RegUser",
  components: { VueDatePicker, AudioPlayer },
  directives: {
    ClickOutside: vClickOutside,
  },
  data() {

    return {
      success_user_id : "",
    invalid_otp : "",
      showInternetToast: false,
      resendEnabled: false,
      expanded: false,
      options: ["English", "Malayalam", "Kannada", "Tamil", "Telugu"],
      selectedOption: [],
      selectedOptions: [],
      // audiolanguage : "https://dl.sndup.net/kr6x/TSL_ENGLISH.mp4",
      value: [
        // { name: 'Javascript', code: 'js' }
      ],
      // options: [
      //   { name: 'English', code: 'English' },
      //   { name: 'Malayalam', code: 'Malayalam' },
      //   { name: 'Kannada', code: 'Kannada' },
      //   { name: 'Tamil', code: 'Tamil' },
      //   { name: 'Telugu', code: 'Telugu' }
      // ],
      special_remarks_count: 0,
      proceedclicked: false,
      selectedLanguage: "english",
      message: "",
      show_registration_success: false,
      show_otp_popup: false,
      close_btn: false,
      toggle_submit: false,
      audios: {
        english: "https://dl.sndup.net/kr6x/TSL_ENGLISH.mp4",
        malayalam: "https://dl.sndup.net/cr76/TSL_Malayalam.mp4",
        hindi: "https://dl.sndup.net/rrqr/TSL_Hindi.mp4",
        kannada: "https://dl.sndup.net/jrr7/TSL_Kannada.mp4",
        tamil: "https://dl.sndup.net/vtdn/TSL_Tamil.mp4",
        telugu: "https://dl.sndup.net/cxfj/TSL_Telugu.mp4",
      },
      otpInput1: "",
      otpInput2: "",
      otpInput3: "",
      otpInput4: "",
      otp: "",
      countries: [],
      country_code: "",
      errors: {},
      fname: "",
      lname: "",
      gender: "",
      email: "",
      dob: "",
      country: "India",
      phone: "",
      reference: "",
      languages: "",
      special_remarks: "",
      ribbon_count: 0,

      isLoginVisible: false,
      isRedBackground: false,
      popupVisible: false,
    };
  },

  watch: {
    
    country_code(newCountryCode, oldCountryCode) {
    this.phone = this.calculateMaxLength(this.phone);
  },
    // country_code(){
    //   this.calculateMaxLength()
    // },
    special_remarks(newVal) {
      // Update the character count whenever 'special_remarks' changes
      this.special_remarks_count = newVal.length;
    },
  },

  created() {
    try {
      this.connection = io("http://89.47.164.122:3000"); // Use io() to establish a Socket.io connection
      this.selectedLanguage = "english";
      this.connection.on("connect", () => {
        console.log("Connected to the Socket.io server");
        this.connection.emit("fetchusers"); // Emit the 'fetchusers' event to the server

        setInterval(() => {
          this.connection.emit("fetchusers"); // Emit the 'fetchusers' event to the server
        }, 20000);
      });

      this.connection.on("usersupdate", (data) => {
        console.log("Users update received:", data.results[0].count);

        this.ribbon_count = data.results[0].count;
        // Handle the received data here
      });

      this.connection.on("error", (errorMessage) => {
        console.error("Socket error:", errorMessage);
      });
      axios
        .get("http://89.47.164.122:3000/api/registrations/countrieslist")
        .then((res) => {
          console.log(res.data);
          this.countries = res.data;
        });
    } catch (err) {
      console.log(err);
    }
  },

  methods: {
    calculateMaxLength(value) {
    const maxLength = this.country_code === '+91' ? 10 : 16;
    return value.slice(0, maxLength);
  },
  onInput(event) {
    this.phone = this.calculateMaxLength(event.target.value);
  },
    toggleDropdown() {
      this.expanded = !this.expanded;
      if (this.expanded) {
        document.body.addEventListener('click', this.closeDropdown);
      } else {
        document.body.removeEventListener('click', this.closeDropdown);
      }
    },

    closeDropdown(event) {
      if (!this.$refs.dropdown.contains(event.target)) {
        this.expanded = false;
        document.body.removeEventListener('click', this.closeDropdown);
      }
    },
    addTag(newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000),
      };
      this.options.push(tag);
      this.value.push(tag);
    },

    toggleLogin() {
      this.isLoginVisible = !this.isLoginVisible;
      // this.isRedBackground = !this.isRedBackground;
      // Directly call the toggleAudio method in the AudioPlayer component
      // this.$refs.player.toggleAudio();
      // Emit an event when the "Proceed" button is clicked

      if (this.$eventBus) {
        // Use $emit to trigger the event
        this.$eventBus.$emit("proceedClicked");
      } else {
        console.error("$eventBus is not available in this component.");
      }
    },

    proceedClicked() {
      this.proceedclicked = true;
    },
    register() {
      // validaton goes here
      // fname: "",
      // lname: "",
      // gender: "",
      // email: "",
      // dob: "",
      // country: "India",
      // phone: "",
      // reference: "",
      // languages: "",
      // special_remarks: ""
      this.errors = {};
      if (this.fname === "") {
        this.errors.fname = "fname";
      } else {
        delete this.errors.fname;
      }
      if (this.lname === "") {
        this.errors.lname = "lname";
      } else {
        delete this.errors.lname;
      }
     
      if (this.email === "") {
        this.errors.email = "email";
      } else {
        delete this.errors.email;
      }

      if (this.dob === "") {
        this.errors.dob = "dob";
      } else {
        delete this.errors.dob;
      }

      if (this.country === "") {
        this.errors.country = "country";
      } else {
        delete this.errors.country;
      }

      if (this.phone === "") {
        this.errors.phone = "phone";
      } else {
        delete this.errors.phone;
      }

      if (this.reference === "") {
        this.errors.reference = "reference";
      } else {
        delete this.errors.reference;
      }
      if (this.selectedOptions.length === 0) {
        this.errors.selectedOptions = "selectedOptions";
      } else {
        delete this.errors.selectedOptions;
      }

      if (this.special_remarks === "") {
        this.errors.special_remarks = "special_remarks";
      } else {
        delete this.errors.special_remarks;
      }
      if (Object.keys(this.errors).length === 0) {
        console.log(this.errors, "this errors");
        this.toggle_submit = true;
      } else {
        console.log(this.errors, "else errors");

        this.toggle_submit = false;
      }

      console.log(
        this.fname,
        this.lname,
        this.reference,
        this.phone,
        this.gender,
        this.selectedOptions
      );
    },

    editpress() {
      this.toggle_submit = false;
    },
    focusNext(index, event) {
      const value = event.target.value;
      if (value.length === 1 && index < 4) {
        const nextInput = this.$refs[`otp-input-${index + 1}`];
        if (nextInput) {
          // Use $nextTick to ensure the next input is fully rendered before focusing
          this.$nextTick(() => {
            nextInput.focus();
          });
        }
      }
    },
    submitToExpress() {
      console.log("submit");
      this.toggle_submit = false;
      
      console.log(this.selectedOptions)
      axios
        .post("http://89.47.164.122:3000/api/registrations/registerUser", {
          // first_name: this.fname,
          // last_name: this.lname,
          email: this.email,
          phone: this.phone,
          // DOB: this.dob,
          // gender: this.gender,
          // country: this.country,
          // reference: this.reference,
          // languages: this.language,
          // remark: this.special_remarks,
        })
        .then((res) => {
          console.log(res.status);
          if (res.status === 200) {
            this.show_otp_popup = true;
            console.log("otp success");
            this.resendEnabled = false;

            let countDown = new Date(Date.now() + 1.03 * 60 * 1000);

            let update = setInterval(
              function () {
                // get the today's date and time
                let now = new Date().getTime();

                //find the difference b/w countDown and now
                let diff = countDown - now;

                //now we are calculating time in days, hrs, minutes, and seconds.

                let minutes = Math.floor(
                  (diff % (1000 * 60 * 60)) / (1000 * 60)
                );
                let seconds = Math.floor((diff % (1000 * 60)) / 1000);

                //now output the result in an element with id ="time"

                this.message = `0${minutes} : ${
                  String(seconds).length >= 2 ? String(seconds) : "0" + seconds
                }`;
                console.log(
                  `0 ${minutes}: ${
                    String(seconds).length >= 2
                      ? String(seconds)
                      : "0" + seconds
                  }`
                );
                if (diff < 0) {
                  this.resendEnabled = true;
                  this.message = "OTP expired! Click resend";
                  clearInterval(update);

                  

                  
                }
              }.bind(this),
              1000
            );
          }
        })
        .catch((err) => {
          console.log(err.response.status);
          if (err.response.status === 404) {
            this.close_btn = true;
          } else if (err.response.status === 400) {
            this.showInternetToast = true;
          }
        });
    },
    submitOtp() {
      this.otp =
        this.otpInput1 + this.otpInput2 + this.otpInput3 + this.otpInput4;

      const d = new Date(this.dob);
      let month = d.getUTCMonth() + 1; //months from 1-12
      let day = d.getUTCDate();
      let year = d.getUTCFullYear();

      this.dob = day + "/" + month + "/" + year;

      axios
        .post("http://89.47.164.122:3000/api/registrations/verify_otp", {
          OTP: this.otp,
          phone: this.phone,
          first_name: this.fname,
          last_name: this.lname,
          DOB: this.dob,
          gender: this.gender,
          country: this.country,
          reference: this.reference,
          languages: JSON.stringify(this.selectedOptions),
          remark: this.special_remarks,
        })
        .then((res) => {
          console.log(res);

          if (res.status === 200) {
            this.show_otp_popup = false;
            this.show_registration_success = true;
            console.log(res.data.data)
            console.log(res.data.data.userId)
            this.success_user_id = res.data.data.userId;
            localStorage.setItem("id",res.data.data.id)
                        // axios
              // .post("http://192.168.1.62:3000/api/registrations/send-sms/", {
              //   to: this.phone,
              // })
              // .then((res) => {
              //   if (res.status === 200) {
              //     console.log("registered successfully");
              //   }
              // });
          } else {
          }
        })
        .catch((err) => {
          if (err.response.status === 404) {
            this.show_otp_popup = false;
            this.otpInput1 = "";
            this.otpInput2 = "";
            this.otpInput3 = "";
            this.otpInput4 = "";
            this.errors.otp = "otp"
            this.invalid_otp = "Invalid otp"

            this.show_otp_popup = true;
          }
        });
    },
    resendOtp() {
      console.log("resend");

      this.show_otp_popup = false;
      this.otpInput1 = "";
      this.otpInput2 = "";
      this.otpInput3 = "";
      this.otpInput4 = "";
      delete this.errors.otp;
      this.show_otp_popup = true;

      this.toggle_submit = false;

      axios
        .post("http://89.47.164.122:3000/api/registrations/resendOtp", {
          // first_name: this.fname,
          // last_name: this.lname,
          // email: this.email,
          phone: this.phone,
          // DOB: this.dob,
          // gender: this.gender,
          // country: this.country,
          // reference: this.reference,
          // languages: this.language,
          // remark: this.special_remarks,
        })
        .then((res) => {
          console.log(res.status);
          if (res.status === 200) {
            this.show_otp_popup = true;
          }
        })
        .catch((err) => {
          console.log(err.response.status);
          if (err.response.status) {
            this.close_btn = true;
          }
        });
    },
    changeLanguage() {
      // Change the audio source when a different language is selected
      console.log(this.selectedLanguage); // Log the selected language (optional)
      this.audiolanguage = this.audios[this.selectedLanguage];
    },
    changeDate() {
      console.log(this.dob);
    },
    closeExist() {
      this.close_btn = false;
    },
    initial() {
      this.selectedLanguage = "English";
    },
    showFlag(country_name) {
      let country = this.countries.find((value) =>
        value.name.startsWith(country_name)
      );

      if (country && country.phonecode) {
        this.country_code = country.phonecode;
        return country.flag;
      } else {
        // Handle cases where the country or phonecode is undefined
        return ""; // Return a default value or handle the situation accordingly
      }
    },
  },
};
</script>

<!-- <style src="vue-multiselect/dist/vue-multiselect.css"></style> -->

<style scoped>
@import "./reg.css";

.multiselect {
  width: 200px;
}

.selectBox {
  position: relative;
  height: 100%;
  border: none !important;
}

.selectBox select {
  width: 100%;
  font-size: 1rem;
  border: none;
}

.overSelect {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

#checkboxes {
  display: none;
  border: 1px #dadada solid;
  background-color: white;
}

#checkboxes.show {
  display: block;
}

#checkboxes label {
  display: block;
  padding: 8px;
  cursor: pointer;
  font-size: 1rem;
}

#checkboxes label:hover {
  background-color: #c0c0c0;
}
</style>
