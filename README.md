# Semi-Scientific Calculator
This final project of the foundations section in the Odin Project. It was made using HTML, CSS, and Javascript. For this project, I chose a more in-depth implemenation than required. This calculator allows for inputs similar to a standard graphing calculator. The design was created by [elisgraf](https://dribbble.com/shots/9631225--Design-for-DailyUi-Day004-Calculator?utm_source=Clipboard_Shot&utm_campaign=eilsgraff&utm_content=%23Design%20for%20%23DailyUi%20%23Day004%20%23Calculator&utm_medium=Social_Share&utm_source=Clipboard_Shot&utm_campaign=eilsgraff&utm_content=%23Design%20for%20%23DailyUi%20%23Day004%20%23Calculator&utm_medium=Social_Share) on dribbble.
Light Mode | Dark Mode
:---------:|:----------:
<img width="500" alt="calc-light" src="https://user-images.githubusercontent.com/47762048/164125534-d34d97c1-6df9-40cb-9e95-08f97105f903.png">|<img width="500" alt="calc-dark" src="https://user-images.githubusercontent.com/47762048/164125532-59f5a9f2-3cd6-43f5-bdc5-5663e020734c.png">

View the [live demo](https://tmbruce.github.io/calculator/)

## Implementation
The calculator allows for input similar to a standard graphing calculator. The input is tokenized with regular expressions. The tokenized output is converted to postfix / reverse Polish notation with the Shunting-Yard algorithm. The postfix notation is converted to an abstract syntax tree and recursively solved. The calculator allows for more complex operations than a standard calculator, but not quite as complex as a modern graphing calculator, hence 'semi-scientific.' The calculator theme will change based on your system preference (it works on mac, but I don't have a windows machine to test it on). Changing the system preference will automatically updaate the UI on the page.

## Todo
[ ] - Implement scaling font / rounding to prevent screen overflows  
[ ] - Add functionality to percent button (maybe swap with square root?)  
[ ] - Add keyboard functionality    
[ ] - Fix obnoxious ios substituted icon  
[ ] - Fix plus minus button to change value for the last number input   
