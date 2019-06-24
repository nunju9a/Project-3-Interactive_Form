/******************************************
Juan Nunez
Treehouse Techdegree:
FSJS Project 3 - Interactive Form
******************************************/

$('#name').focus();                                                                           // Puts focus on 'Name' field when page loads

// Created a text input element in HTML with id of "other-title" 
// Only show it when "Other" option is selected from the "Job Role" menu
$('#other-title').hide();                                                                 // Hides the 'Your Job Role' input text field                   
 $('#title').on('change', function () {                                                  // Event listener for when Job Role option changes
        if ($(this).val() === 'other') {                                                // If 'Other' is selected...
            $('#other-title').show();                                                  // Show the 'Your Job Role' input text field
         } else {
             $('#other-title').hide();                                               // Keep input text field hidden if anything else selected
         }                          
  });


  /*** T-SHIRT INFO SECTION
       Initially hides the color options until a certain design theme is selected
  ***/

  $('#colors-js-puns').hide();                                                        // Hides all color options 
  $('#design').on('change', function () {                                            // Event listener for when Design option changes
    $('#color').html('');                                                           // Removes all color options from HTML
    if ($(this).val() === "js puns") {                                             // If 'js puns' theme is selected...
        // Show all colors associated with 'js puns' only
        $('#color').append('<option value="cornflowerblue">Cornflower Blue (JS Puns shirt only)</option>');        
        $('#color').append('<option value="darkslategrey">Dark Slate Grey (JS Puns shirt only)</option>');        
        $('#color').append('<option value="gold">Gold (JS Puns shirt only)</option>');
        $('#colors-js-puns').show();
        $('#color').val('cornflowerblue');                                   // Show cornflowerblue first
    } else if ($(this).val() === "heart js") {                              // If 'I <3 js' theme is selected...
            // Show all colors associated with 'I <3 js' only
            $('#color').append('<option value="tomato">Tomato (I &#9829; JS shirt only)</option>');
            $('#color').append('<option value="steelblue">Steel Blue (I &#9829; JS shirt only)</option>');
            $('#color').append('<option value="dimgrey">Dim Grey (I &#9829; JS shirt only)</option>');
            $('#colors-js-puns').show();
            $('#color').val('tomato');                                  // Show tomato first
      } else {                                                         // If nothing is selected....
            $('#colors-js-puns').hide();                              // Keep all color options hidden
        }
});



/***
 ACTIVITY REGISTRATION SECTION
  Adds up total cost of activities and prevents user from choosing same time frames
 ***/

let totalCost = 0;                                                                                  // Setting initial total cost
$('.activities').append('<label>Total Cost: $0</label>');                                          // Adding label for total cost

// Comparing each activity and preventing user from choosing conflicting times
$('[type="checkbox"]').change((e) => {                                                           // Listening for checkbox change
  if (e.target.name === "js-libs" && e.target.checked) {
    $(`input[name="node"]`).attr("disabled", true);                                            // Disabling 'node' if 'js-libs' checked
  } else if (e.target.name === "js-libs" && !e.target.checked) {
    $(`input[name="node"]`).removeAttr("disabled");
  }

  if (e.target.name === "node" && e.target.checked) {
    $(`input[name="js-libs"]`).attr("disabled", true);                                     // Disabling 'js-libs' if 'node' checked
  } else if (e.target.name === "node" && !e.target.checked) {
    $(`input[name="js-libs"]`).removeAttr("disabled");
  }

  if (e.target.name === "js-frameworks" && e.target.checked) {
    $(`input[name="express"]`).attr("disabled", true);                                 // Disabling 'express' if 'js-frameworks' checked
  } else if (e.target.name === "js-frameworks" && !e.target.checked) {
    $(`input[name="express"]`).removeAttr("disabled");
  }

  if (e.target.name === "express" && e.target.checked) {
    $(`input[name="js-frameworks"]`).attr("disabled", true);                       // Disabling 'js-frameworks' if 'express' is checked
  } else if (e.target.name === "express" && !e.target.checked) {
    $(`input[name="js-frameworks"]`).removeAttr("disabled");
  }

  // Total cost calculation
  let activity = e.target;                                                                     //Targets which activity checked
  let activityText = activity.parentNode.textContent;                                         // Gets all text content     
  let priceIndex = activityText.indexOf('$');                                                // Gets $ index value
  let price = activityText.slice(priceIndex + 1);                                           // Extracts string and just returns the number value

  if (activity.checked) {                                                                 // If activity checked
    totalCost += parseInt(price);                                                        // Add the price to the total cost
  } else {
    totalCost -= parseInt(price);                                                      // If unchecked subtract the cost
  }
  $('.activities label').last().text('Total Cost: $' + totalCost);                   // Displays the total cost in the created label
});

/***
 PAYMENT INFO SECTION
 Only displays chosen payment option details, hides others
***/