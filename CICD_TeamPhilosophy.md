**Process/changes we did through the sprints**:
As of now our process for updating any of the sites is to do our own testing on our local repos. Then decide on one we
want to use and upload our code to our test branch. From there we then hand it over to a dev that has access to a repo
with the Azure website linked to it. Than upload the code into the dev repo to have it be visable on the site. We than
test out the features we implement and make sure that they match up with our testing data from our local repo. If
everything works than that is our process. As for how we upload to production, it uses the same steps as test. 
Just the starting point is from the testing branch, instead of our local repos.

This is the current process but this can change. The reason we are doing this weird workaround with an additional repo.
is because we are not the owners of the repo and given how we were taught in making the Azure website. We need to be 
the owners in order for it to operate as intended. If we find a more efficent way to do it, than we will implement it.

We have implemented a password system from the initial homepage to our seat selector. If the students do not present the correct password it will leave them on that page. 

We are planning on making JS function calls from our HTML to javascript files to allow for events to occur on our site. Currently we have the ability to choose a seat,
attend virtually, and enter user information.

Added CSS to make a more elegant looking page that shows seat icons and the layout of the room. 

Utilize the database to remember the users input information and allow for students to see input information from other students on different sessions. Allow for 
information to remain after we refresh the page.

**New Team Members**:
Access to the newest source code is available here in this repository. The branches are for test and production. 
Those branches corespond to the test and production sites. To access your test and production site your team will need to decide what webhosting application works 
best. For this project our team utilized Azure to host our sites and then shared out the links for testing it and having users experience the test site.
Each member will need to have Node.js setup to allow for communtication between your client and server to send the information around. Members will benefit from
understanding JavaScript, HTML, CSS, and MERN stack knowledge as that is what a lot of this project is being built on. You will want to configure your local machine 
to support testing on whatever IDE you would like to use. Our team utilized Visual Studio Code to write the code and then used Powershell to tell the console when to
start running. Here is where you can test it from a local host website prior to pushing to your GitHub. Once testing is done on the local side we can push it to the
repos where the Azure sites kick in and host. New members should also look to implement a password system in the event that you have "Students" or "Teachers" that 
should not be able to reach the site. 

**New Customers**:
To experience the application users will have to reach the website and have access to the password to enter the seating chart. Our active website links are 
available in our readme file. Production is meant for client use. While Test is meant for devlopers and client admins to test out the site. Users will not have to 
download any sort of software or application and rather just reach a website to experience it. The user will need a predetermined password to enter into the site
and then be able to choose seats that they can then pick from. Here it will allow for the other students and teachers to understand who is going to be in the class
and in what capacity, such as in person or virtually. The information will need to be stored so this way other students can acknowledge that the seat is taken and
choose around it.
For inquiries and comments, testers and users should reach out to the product team whose contact information should be found in the readme file. 

This site was built based on the contents of our [README.md](https://github.com/EricJPogue/UltimateSeatSelector/blob/main/README.md)
