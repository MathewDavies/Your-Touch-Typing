Ideal flow of the application:

Defaults set initially
User adds text to test his typing on (or selects a preset if we built that functionality)
confirmation changes the application to 'ready to start' where:
- text is loaded into a variable/array
- number of words in the text is calculated
-length of text recorded
- difficulty of the is assessed
-start button enabled

User can edit text and go back or he can start

On start:
Timer starts
- On key up, the computer compares the text entered to the text recorded
- For efficiency, we could put the sample text into an array and as the user typed, it would iterate through the array
- We would need to control for backspace or back arrows which would change the position of the cursor - or possibly the mouse
- Is there a cursor position property for the text box?

The timer would end when the cursor position reaches the end of the text 
i.e. if the sample text is 202 characters long, then once it reaches 202 words, the timer stops and the results are recorded

Results: 
Words per minute = words he typed / time in minutes
Accuracy = how many words match - this might be contentious as an extra letter or double space could ruin the whole thing
This could be solved by providing visual feedback in the text box, moving a highlighted area along with the completion if possible

Ideas:
Could record high scores for each tier of difficulty in local storage and have as a display
Could have preset tests for each difficulty
Could have a keyboard on screen?? Difficult?
Sound effects? Could probably find a source











I thought about this is terms of state


Difficulty algorithm??
 calculate the number of Capital, numbers and special characters as a percentage of total characters and allocate weightings to these to give an overall difficulty score. 

 Could work like this:
 normal character is 1 point.
 number or caps is 2 points.
 Standard punctuation is 2 points.
 special character is 4 points.

 Add all these up and the higher the score, the more difficult it is.

 The quote of the day is "hello world"
1 cap
1 punctuation
2 special characters
29 normal characters

Total 29 + 4 + 2 + 2 = 37
total characters 32
characters/ score = 1.156

if it missed out the quotes, the score would be

33/30 = 1.1

With an exclamation would be 
41/33 = 1.24

We could run this algorithm and rank various texts to see what to classify as easy and hard.
No special characters and no numbers would average 2 extra points per sentence - a full stop and a caps

Problem/solution - we want to highlight the confirmed text if the person makes a mistake by turning the background color yellow or red
When we confirm the text, we can turn this into spans so if I typed 'the' then the inner html of the text box would become
<span>t</span><span>h</span><span>e</span> - this would allow me to set the background style of each word

Levenshtein distance thought

To get the number of errors we have a problem, which roughly equates to Levenshteins distance - the minimum number of moves it 
would take to get from one string to another. The problem is, this is quite tricky to work out

For example, by comparing the strings character for character, we might get this:

hello there
ello there
This would show up as (almost) every single character being wrong, (one L would register as correct) despite it being just one mistake

The problem is remarkably easy for a human to solve, but very tricky to put into a computer. 

The answer might be to cycle through a few scenarios and see which produces the least errors

For example, you could try:

hello there
ello there - 10 errors
 ello there - 1 error
  ello there - 10 errors

What if the error was in the middle of the passage though?

hello there
hello  there

Again this is just one error but it looks like 5
As double spaces should be anomalous, we could create a rule that we see how many errors we have if we delete one of the spaces
if this is lower than without, we proceed with that score

Now though, we come to the problem of extra letters

hello there
helllo there

this produces 7 errors when only one is really made
In this case we could run an algorithm comparing words first, then when hello was seen to be wrong, we could start matching it
from either direction - i.e. do 4 letters match (hell, ollo) then three, etc. This wouldn't be a great idea.
We could also see that the word length was longer so we could try deleting letters to see if we could get it to match.

The problem with all of this is that it takes a lot of time and computational power. 

Maybe one way to do a rough version is:

- check word for word, this checks for just the wrong letters being typed
- when we come across an error, check to see if next input letter is the correct one - in which case its an insertion error - delete the letter and redo the comparison with an error
-also check if the current letter matches the next expected letter, in which case, it might be an omission error. Add in the correct letter and continue

The problem is how to iterate through all the possible combinations of this if we are on a long piece of text. We could see if the next 2 or 3 letters match, in which case, the probability is high that we have it right. If they don't, then we might want to skip the deletion/insertion and carry on. 

This isn't a perfect algorithm but it might be somewhat effective.