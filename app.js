/* eslint-disable prefer-const */
/**
 * @Flow
 * initialize the calculator
 * have a firstNumber
 * choose an operator
 * then a secondNumber
 * wait for the operation to finish
 * display results
 * clear the old results so i can do it again
 *
 * AKA intial State
 */

// I don't want to run my app, unless jquery has finished downloading
$(document).ready(function() {
  // Variables in the global runtime

  // Initial state below:
  let firstNumber = '';
  let secondNumber = '';
  let result = 0;
  let operator = '';
  let isOperatorChosen = false;
  let isCalculated = false;

  // 1.) Start my Calculator (initialization)
  // 2.) When someone hits clear, reset the calculator
  function initalizeCalculator() {
    // set up some initial state (data) --> so the user can go through our flow!!!
    firstNumber = '';
    secondNumber = '';
    result = 0;
    operator = '';
    isOperatorChosen = false;
    isCalculated = false;

    // Update the UI
    $('#first-number, #second-number, #operator, #result').empty();
  }

  // Event handler functions

  $('.number').on('click', function(evt) {
    // check if we've already ran a calculation
    if (isCalculated) {
      return false;
    }

    // check if an operation is chosen
    if (isOperatorChosen) {
      // if so, we should be rendering/showing the secondNumber
      // secondNumber

      // THIS keyword points to the element that was clicked, but it is a dom element so we
      // need to reselect it in order to use jquery methods again.
      secondNumber += $(this).val();
      $('#second-number').text(secondNumber);
    } else {
      // otherwise we render/show the first number in the Results card firstNumber
      firstNumber += $(this).val();
      $('#first-number').text(firstNumber);
    }
  });

  $('.operator').on('click', function(evt) {
    // check if we've already ran a calculation OR first number has been chosen
    // we dont want to do anything
    if (!firstNumber || isCalculated) {
      return false;
      // if we return above, anything below line 58 is unreachable code
    }

    // set isOperatorChosen to true so we start choosing the 2nd number
    isOperatorChosen = true;

    // save the value of the operator the user has clicked on
    operator = $(this).val();

    // render that to the operator result h1
    $('#operator').text($(this).text());
  });

  $('.equal').on('click', function(evt) {
    /**
     * @FLOW
     * 1 - has the calculation on the current numbers already finished?
     *   a)YES - do nothing (early return)
     *   b)NO - then im going to set isCalculated = true
     * 2 - convert the numbers from strings to numbers so we can do math
     * 3 - check what operator the user has chosen
     * 4 - perform the operation on the two numbers and save it to result variable
     * 5- render the result
     */

    //  1-a (YES)
    if (isCalculated) {
      return false;
    }

    // 1-b (NO)
    isCalculated = true;

    // step 2
    firstNumber = parseInt(firstNumber);
    secondNumber = parseInt(secondNumber);

    // step 3 & 4  -- switch is the same as if elseif elsif .... else
    switch (operator) {
      case 'plus':
        result = firstNumber + secondNumber;
        break;
      case 'minus':
        result = firstNumber - secondNumber;
        break;
      case 'times':
        result = firstNumber * secondNumber;
        break;
      case 'divide':
        result = firstNumber / secondNumber;
        break;
      case 'power':
        result = firstNumber ** secondNumber;
        break;
      default:
        operator;
    }

    // step 5 - render result
    $('#result').text(result);
  });

  $('.clear').on('click', function(evt) {
    // Callthe intializeCalculator --> the whole point of that function is to set up thje inital state (IE: RESET )
    initalizeCalculator();
  });

  // Run the app
  initalizeCalculator();
});
