# Mars-Dashboard
This is a web app the uses the NASA API to showcase a gallery of recent Rover Photos.
The goal of this project was to use JavaScript with Immutable JS in a functional style of programming.

## UDACITY REVIEW
Meets Specifications
Hello,

Great work !! Your hard and exceptional efforts was clearly evident!! You have met all the requirements for this project, all the rovers and the details are visible. The project started without any errors and the whole work was great to see :clap: clap:

For this project, you have done well enough to meet all the specifications :clap:Congratulations!! :star2:

See you in your next lesson. :smile:
:udacious:

### Environment Setup
App must use a Node/Express backend. Install the following npm packages in order to work with the API and build the rest of the app:

- Express
- Body parser
- Dotenv
- ImmutableJS
Bolded files/folders are part of the Backend File structure.

Setup the basic frontend dependencies and file structure for a single page application. Some starter code will be provided.

Bolded files/folders are part of the Frontend File structure.

Set up Immutable js for this project. For this project we are using a script for the CDN version. You should see the script referenced in index.html.

### API and Routes
Set up credentials to connect to the NASA API.

- Create an API key through NASA’s API.
- Add API key to the provided .env-example file.
- Rename the .env-example file to .env.
Note: The .env-example file is publicly visible and should not contain any personal information.

Create a dashboard showing photos and information about the Mars rovers using the NASA API

Needs to display a minimum of this information for each rover (there are 3):

Launch Date
Landing Date
Status
Most recently available photos
Date the most recent photos were taken
Set up the Node/Express app as a middleman to take requests from the frontend, make requests to the API, and pass that information back to the frontend using functional methods.

### Functional JS Logic
Build custom pure functions to do logic. No logic should happen outside of these functions.

Use the variable types in the appropriate instance:

- const for all values that will not change
-- let for those that will need to change
-- var only if an instance comes up where a globally editable value is necessary
Code follows good coding practices, No var is being used for declaration,let and const are used properly. It is always recommended to use const ahead of let if variables with let do not need modification in that scope.

Check this Link on ES6 JavaScript: Understanding Let & Const

Use the correct method to fit the information they are working with from the API.

In the logic you should be able to see:

At least one custom pure function using map, just about every API call will require this at some point.
At least one dynamic component on their page (for instance, one that uses an if statement to behave differently based on the presence or absence of a value).
map used :white_check_mark:

if statement dynamic component on their page based on the presence or absence of a value.:white_check_mark:

Use at least 2 higher-order functions that are reusable UI elements (i.e. an unordered list function that is returned by the other dashboard section functions).

### Dynamic UI
The UI should have a dynamic aspect that allows a user to choose which rover’s information they want to see. This will most likely be a set of tabs that can be clicked to see the information.

Build upon the given mobile first styling for mobile or desktop. Must be a breakpoint for mobile that comes first in the stylesheet.
