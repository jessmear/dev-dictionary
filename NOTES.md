Hi, I'm Jess
    degree in graphic design 
    completed a front end dev bootcamp last summer
    great meetup
    thanks Tyler for the opportunity to work on a project and present


-- Structure --
changed the directory structure to isolate the non-js files

- Components - 
index
App - routes, state for counts for logged in user passed down as props
    Layout - counts passed down as props

        Navigation - recieves props and displays counts, shows logged in user, link to login/logout, nav (on every page)

        Welcome - informational page
        Login - shows list of users, click one to login
        Dictionary - gets all the term components and displays them, functionality to add new terms
        Term Component - Displays term, author, definition components, functionality to add new definitions
        Definition Component - Displays definition, author
        Term Container - Component to display a single term, takes a parameter in the URL and gets the info from the api

-- Approach/Process --
First
    Read documentation
    Added notes at the top about how to get started quickly 
    tested the api with direct calls in the browser
    created a list of calls and put them in the ReadMe for reference

Re-usability, one of the cool things about react
    A few flexible components are used again and again

-- Problem/Solution --

Steady progress on app until I noticed the counts in the nav were not updating 
Stuck there for a long time
    tried a lot of different ways of passing the data around

wanted to avoid hitting the api too often
    can slow down the app
    ended up making a call to the API every time app mounted to keep the counts constantly updated

re-factoring counts
    get the counts on login
    update them with state
    avoid hitting the api for that purpose again until a refresh or a new login

other refactoring
    chunk of code that is repeated and very nearly the same
        make into a tidy function
        takes parameters  
    add loading animations 
    add error messages for various problems
    add field validation
    add more functionality

-- Learned -- 
have not used context or react-bootstrap before
    not sure about context - I was liking it then it wasn't behaving as gracefully as state
    really like react bootstrap
learned I could pass props down routes
    made it possible to pass the counts to the navigation bar
