Your Touch Typing

Description
A touch typing programme that allows you to put your own sample text in and get a speed and accuracy rating as well as a difficulty rating for the text.

The programme can be best understood by first describing the events:

- Confirm (on click)

Type or copy and paste text into the top text box, then press confirm - this freezes this text box and uses the difficulty algorithm to assess how difficult the text is and displays it on the screen. It also records the sample text into a variable and counts the words in the sample text. 

If you make a mistake with confirm text, you can click the button again to edit it, this reverses the read only status and allows you to edit before confirming again

- Start (on click)

This checks that the text is confirmed, enables editing of the input box, changes the cursor position to here and starts the timer

- Stop Typing (on keyup)

The exercise comes to a halt when the length of the input box is the same as the length of the sample box. This then stops the timer, counts the words typed, breaks the sample text and the input text into arrays and compares each element in each to see how many times they don't match. This total creates the errors, which allows us to compare with the length and do a sum to work out the accuracy. 

The total words typed is also computed to and the accuracy and the words per minute are displayed. 

- Reset (on click)

This can be pressed at any time and resets the every field and variable back to their default state and stops the timer if it is in progress. 
