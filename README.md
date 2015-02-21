# DEVOIR    


##Run the server
To run the server make sure you have **node** and **npm** (node package manager) installed.

Next you will need to set up your DB    
1. install postgres    
2. create a user 'postgres'    
3. create a db named devoir   
4. create the tables with the create statements from our design doc
    
    $ createuser --interactive    
    $ createdb devoir    

    #run postgres in another tab
    $ postgres -D /usr/local/var/postgres
    
    #back in the first tab access the db you created
    $ psql -d devoir
    #print the current tables in the DB
    $ \dt
    #create the tables
    $ CREATE TABLE users(id BIGSERIAL PRIMARY KEY,email VARCHAR(128),display_name VARCHAR(32));
    $ CREATE TABLE courses(id BIGSERIAL PRIMARY KEY,name VARCHAR(64),color VARCHAR(16),visible BOOLEAN,ical_feed_url VARCHAR(128),user_id BIGINT REFERENCES users (id));
    $ CREATE TABLE tasks(id BIGSERIAL PRIMARY KEY,name VARCHAR(64),description VARCHAR(128),start_date TIMESTAMP,end_date TIMESTAMP,complete BOOLEAN,visible BOOLEAN,user_last_updated TIMESTAMP,ical_last_updated TIMESTAMP,course_id BIGINT REFERENCES courses (id));

    #this link may be helpful if hit a snag installing postgres    
    #https://www.codefellows.org/blog/three-battle-tested-ways-to-install-postgresql    
    #If you are still having problems let me know.  This is my first time setting up a server with postgres.  But it went pretty smoothly
Before you start the server set an environment variable (you only have to do this once)

    NODE_ENV=dev

Make sure your DB is running

    $ postgres -D /usr/local/var/postgres
    
Go to the directory and run     

    $ npm install     
    $ node server.js      
    
Then you can check it out in your browser at http://localhost:3000


##Front end: compile the Less and minify the JS:    

Install gulp:  http://gulpjs.com/

    $ npm install --global gulp

Then in your devoir directory run the following command whenever you are making changes

    $ gulp
    
