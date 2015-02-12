# devoir

To run the server make sure you have **node** and **npm** (node package manager) installed.

Before you start set an environment variable (you only have to do this once)

    NODE_ENV=dev

Go to the directory and run     

    $ npm install     
    $ node server.js      
    
Then you can go to it in your browser at http://localhost:3000


To compile the Less on the front end and minify the JS:    

Install gulp:  http://gulpjs.com/

    $ npm install --global gulp

Then in your devoir directory run the following command whenever you are making changes

    $ gulp
    
