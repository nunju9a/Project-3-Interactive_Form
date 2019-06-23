/******************************************
Juan Nunez
Treehouse Techdegree:
FSJS Project 3 - Interactive Form
******************************************/

$('#name').focus();                                                                              // Puts focus on 'Name' field when page loads

// Created a text input element in HTML with id of "other-title" 
// Only show it when "Other" option is selected from the "Job Role" menu
$('#other-title').hide();                                                                    // Hides the 'Your Job Role' input text field                   
 $('#title').on('change', function () {                                                     // Event listener for when Job Role option changes
        if ($(this).val() === 'other') {                                               // If 'Other' is selected...
            $('#other-title').show();                                                     // Show the 'Your Job Role' input text field
         } else {
             $('#other-title').hide();
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