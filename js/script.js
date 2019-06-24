/******************************************
Juan Nunez
Treehouse Techdegree:
FSJS Project 3 - Interactive Form
******************************************/

$('#name').focus();                                                                    // Puts focus on 'Name' field when page loads

// Created a text input element in HTML with id of "other-title" 
// Only show it when "Other" option is selected from the "Job Role" menu
$('#other-title').hide();                                                          // Hides the 'Your Job Role' input text field                   
 $('#title').on('change', function () {                                           // Event listener for when Job Role option changes
        if ($(this).val() === 'other') {                                         // If 'Other' is selected...
            $('#other-title').show();                                           // Show the 'Your Job Role' input text field
         } else {
             $('#other-title').hide();                                        // Keep input text field hidden if anything else selected
         }                          
  });


  /*** T-SHIRT INFO SECTION
       Initially hides the color options until a certain design theme is selected
  ***/

  $('#colors-js-puns').hide();                                                     // Hides all color options 
  $('#design').on('change', function () {                                         // Event listener for when Design option changes
    $('#color').html('');                                                        // Removes all color options from HTML
    if ($(this).val() === "js puns") {                                          // If 'js puns' theme is selected...
        // Show all colors associated with 'js puns' only
        $('#color').append('<option value="cornflowerblue">Cornflower Blue (JS Puns shirt only)</option>');        
        $('#color').append('<option value="darkslategrey">Dark Slate Grey (JS Puns shirt only)</option>');        
        $('#color').append('<option value="gold">Gold (JS Puns shirt only)</option>');
        $('#colors-js-puns').show();
        $('#color').val('cornflowerblue');                                 // Show cornflowerblue first
    } else if ($(this).val() === "heart js") {                            // If 'I <3 js' theme is selected...
            // Show all colors associated with 'I <3 js' only
            $('#color').append('<option value="tomato">Tomato (I &#9829; JS shirt only)</option>');
            $('#color').append('<option value="steelblue">Steel Blue (I &#9829; JS shirt only)</option>');
            $('#color').append('<option value="dimgrey">Dim Grey (I &#9829; JS shirt only)</option>');
            $('#colors-js-puns').show();
            $('#color').val('tomato');                                // Show tomato first
      } else {                                                       // If nothing is selected....
            $('#colors-js-puns').hide();                            // Keep all color options hidden
        }
});


/***
 ACTIVITY REGISTRATION SECTION
  Adds up total cost of activities and prevents user from choosing same time frames
 ***/

let totalCost = 0;                                                                               // Setting initial total cost
$('.activities').append('<label>Total Cost: $0</label>');                                       // Adding label for total cost

// Comparing each activity and preventing user from choosing conflicting times
$('[type="checkbox"]').change((e) => {                                                        // Listening for checkbox change
  if (e.target.name === "js-libs" && e.target.checked) {
    $(`input[name="node"]`).attr("disabled", true);                                         // Disabling 'node' if 'js-libs' checked
  } else if (e.target.name === "js-libs" && !e.target.checked) {
    $(`input[name="node"]`).removeAttr("disabled");
  }

  if (e.target.name === "node" && e.target.checked) {
    $(`input[name="js-libs"]`).attr("disabled", true);                                  // Disabling 'js-libs' if 'node' checked
  } else if (e.target.name === "node" && !e.target.checked) {
    $(`input[name="js-libs"]`).removeAttr("disabled");
  }

  if (e.target.name === "js-frameworks" && e.target.checked) {
    $(`input[name="express"]`).attr("disabled", true);                              // Disabling 'express' if 'js-frameworks' checked
  } else if (e.target.name === "js-frameworks" && !e.target.checked) {
    $(`input[name="express"]`).removeAttr("disabled");
  }

  if (e.target.name === "express" && e.target.checked) {
    $(`input[name="js-frameworks"]`).attr("disabled", true);                   // Disabling 'js-frameworks' if 'express' is checked
  } else if (e.target.name === "express" && !e.target.checked) {
    $(`input[name="js-frameworks"]`).removeAttr("disabled");
  }

  // Total cost calculation
  let activity = e.target;                                                              // Targets which activity checked
  let activityText = activity.parentNode.textContent;                                  // Gets all text content     
  let priceIndex = activityText.indexOf('$');                                         // Gets $ index value
  let price = activityText.slice(priceIndex + 1);                                    // Extracts string and just returns the number value

  if (activity.checked) {                                                          // If activity checked
    totalCost += parseInt(price);                                                 // Add the price to the total cost
  } else {
    totalCost -= parseInt(price);                                               // If unchecked subtract the cost
  }
  $('.activities label').last().text('Total Cost: $' + totalCost);            // Displays the total cost in the created label
});

/***
 PAYMENT INFO SECTION
 Only displays chosen payment option details, hides others
***/

//Creating all variables for Payment Info Section
const $payOptions = $('#payment');
const $creditPayment = $payOptions.next();                                                        // Selecting siblings 
const $paypalPayment = $payOptions.next().next();
const $bitcoinPayment = $payOptions.next().next().next();
const $creditCard = $('#credit-card');
const $ccNum = $('#cc-num');
const $zipcode = $('#zip');
const $cvv = $('#cvv');

//Hiding paypal and bitcoin details initially
$('#payment option:eq(0)').attr('hidden', true);
$paypalPayment.hide();
$bitcoinPayment.hide();

$payOptions.change(function() {                                                           // Listening for payment options change

  if ( $(this).val() === "credit card" ) {                                              // If credit card option selected...
    $creditPayment.prop('selected', true);                                             // Keep credit card details available
    $creditCard.attr('hidden', false);
    $paypalPayment.hide();                                                           // Keep paypal details hidden
    $bitcoinPayment.hide();                                                         // Keep bitcoin details hidden

  }  else if ( $(this).val() === "paypal" ) {                                     // If paypal option selected...
      $paypalPayment.prop('selected', true);                                              
      $creditCard.attr('hidden', true);                                         // Hide credit card details
      $paypalPayment.show();                                                   // Show paypal details
      $bitcoinPayment.hide();                                                 // Hide bitcoin details
    }
    else if ( $(this).val() === "bitcoin" ) {                               // If bitcoin option selected...
      $bitcoinPayment.prop('selected', true);
      $creditCard.attr('hidden', true);                                   // Hide credit card details
      $paypalPayment.hide();                                             // Hide paypal details
      $bitcoinPayment.show();                                           // Show bitcoin details
    }
});

// Creating and appending all error messages, hiding them all by default
$('label[for="name"]').before('<label class="error" id="name-error"><font color="red">Name field must not be empty</font></label>');
$('label[for="mail"]').before('<label class="error" id="email-error"><font color="red">Email field must contain a valid email address</font></label>');
$('.activities legend').before('<label class="error" id="activity-error"><font color="red">Please select at least one activity</font></label>');
$('#credit-card').before('<label class="error" id="cc-number-error"><font color="red">Please enter a valid credit card number that is 13-16 digits long</font></label>');
$('#credit-card').before('<label class="error" id="cc-empty-error"><font color="red">Credit Card Number must not be empty</font></label>');
$('#credit-card').before('<label class="error" id="cc-zip-error"><font color="red">Please enter a valid 5 digit ZIP code</font></label>');
$('#credit-card').before('<label class="error" id="cc-cvv-error"><font color="red">Please enter a valid 3 digit CVV number</font></label>');
$('.error').hide();

// Name validation function
const validName = (name) => {
  let valid = /^\S/.test(name);                                       // Testing for valid name, disregarding whitespace
  if (valid) {
    $('#name-error').hide();                                        // Hide error message if a valid name exists
    return true;
  } else {
      $('#name-error').show();                                   // Show error message if no valid name is entered
      return false;
    }
}

// 'Real-time' name validation
$('#name').on('input', (e) => {                                         // Listening for current input in Name field
  if ($('#name').val() == '') {                                        // If Name field is empty...
    validName($('#name').val());                                      // Call validation function
  } else {
      $('#name-error').hide();                                      // Otherwise hide error message
    }
});

// Email validation function
const validEmail = (email) => {
  let valid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);  // Testing for valid email, with all characters such as '@' and '.' in the right order
  if (valid) {
    $('#email-error').hide();                        // If email is valid, hide error message
    return true;
  } else {
      $('#email-error').show();                    // If email is not valid, show error message
      return false;
    }
}

// 'Real-time' validation of email
$('#mail').on('input', () => {                              // Listening for current input of email field
  if ($('#mail').val() !== '') {                           // If email field is empty
    validEmail($('#mail').val());                         // Call validation function
  } else {
      $('#email-error').hide();                         // Otherwise hide error message
    }
});

// Activities validation function
const validActivities = () => {

  if ($('.activities input:checked').length > 0) {              // If there are any activties checked...
    $('#activity-error').hide();                               // Hide error message
    return true;
  } else {
     $('#activity-error').show();                            // Otherwise show error message
     return false;
    }
}

// 'Real-time' validation of activities
$('.activities').on('input', () => {                     // Listening for current input of activities
  validActivities();                                    // Calling validActivities function
})

// Credit Card validation function
const validCcNumber = (cc) => {
  if ($('#payment').val() === 'credit card') {
    let valid = /^\d{13,16}$/.test(cc);

    if (valid) {
      $('#cc-number-error').hide();
      $('#cc-empty-error').hide();
      return true;
    } else if (cc !== '') {  //Checks if the CC number is empty first
        $('#cc-empty-error').hide(); //then checks if the CC number is between 13 and 16 digits
        $('#cc-number-error').show();
      } else {
        $('#cc-number-error').hide();
        $('#cc-empty-error').show();
        return false;
        }
  }
}

// Real time validation of CC number
$('#cc-num').on('input', () => {
  if ($('#cc-num').val() !== '') {
    validCcNumber($('#cc-num').val())
  } else if ($('#cc-num').val() == '') {
    $('#cc-empty-error').show();
  } else {
    $('#cc-number-error').show();

  }
});

// ZIP code validation
const validZip = (zip) => {
  if ($('#payment').val() === 'credit card') {
    let valid = /^\d{5}$/.test(zip);

    if (valid) {
      $('#cc-zip-error').hide();
      return true;
    } else {
      $('#cc-zip-error').show();
      return false;
    }
  }
}

// Real time validation of the zip code
$('#zip').on('input', () => {
  if ($('#zip').val() !== '') {
    validZip($('#zip').val());
  } else {
    $('#cc-zip-error').hide();
  }
});


// CC CVV validation
const validCVV = (cvv) => {
  if ($('#payment').val() === 'credit card') {
    let valid = /^\d{3}$/.test(cvv);

    if (valid) {
      $('#cc-cvv-error').hide();
      return true;
    } else {
      $('#cc-cvv-error').show();
      return false;
    }
  }
}

// Real time validation of CVV
$('#cvv').on('input', () => {
  if ($('#cvv').val() !== '') {
    validCVV($('#cvv').val());
  } else {
    $('#cc-cvv-error').hide();
  }
});


// Checks the form to make sure there are no errors
const isValid = () => {
  if (validName($('#name').val()) && validEmail($('#mail').val()) && validActivities() && validCcNumber($('#cc-num').val()) &&
    validZip($('#zip').val()) && validCVV($('#cvv').val())) {
    return true;
  } else {
    validName($('#name').val());
    validEmail($('#mail').val());
    validActivities();
    validCcNumber($('#cc-num').val());
    validZip($('#zip').val());
    validCVV($('#cvv').val());
    return false;
  }
}


// Prevents the form from submitting if any errors have occurred
$('form').on('submit', (e) => {
  if (isValid() === false) {
    e.preventDefault();
  }
});


// Hides the credit card erorrs if you select a different payment method after the errors are displayed
$('#payment').change(() => {
  if ($('#payment').val() === 'paypal' || $('#payment').val() === 'bitcoin') {
    $('#cc-cvv-error').hide();
    $('#cc-zip-error').hide();
    $('#cc-number-error').hide();
  }
});