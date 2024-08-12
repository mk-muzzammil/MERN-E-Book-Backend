// Here we will talk about some docker imp points to make our website ready for deployment on docker .we will make a Docerfile and name must be same and after it we will write some commands in it .i will talk about some basic commands that is imp to make an image which includes the configuration and dependencies of our website which is imp for deployment of website and after it this docker image will be used to create a container and then we will run our website on that container.
//Here are the some commands that we will write in our Dockerfile

// FROM node:18-alpine ==> this command is used to pull the image of node from docker hub and we will use the alpine version of node image because it is lightweight and it is best for the deployment of website.Its like we are using the node image as a base image to create our own image. like inheritance

// WORKDIR /app ==> this command is used to create a directory in the image and we will use this directory to copy all the files of our website in this directory and then we will run our website from this directory.

// COPY package*.json ./ ==> this command is used to copy the package.json file of our website in the image and we will use this package.json file to install all the dependencies of our website in the image.

// RUN npm ci ==> this command is used to install all the dependencies of our website in the image and we will use npm ci command(very imp it will save the versions of depencies and install that saves us from so many prob) to install all the dependencies of our website because it is faster than npm install command.

// COPY . . ==> this command is used to copy all the files of our website in the image and we will use these files to run our website in the image.

// RUN npm run build ==> this command is used to build our website in the image and we will use this command to build our website in the image because we will run our website from the build folder of our website.
// ================================> But if we make img like this img size is too large so we will use multi stage build to reduce the size of our image
