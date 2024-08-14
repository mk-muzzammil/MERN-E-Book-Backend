// Here we will talk about some docker imp points to make our website ready for deployment on docker .we will make a Docerfile and name must be same and after it we will write some commands in it .i will talk about some basic commands that is imp to make an image which includes the configuration and dependencies of our website which is imp for deployment of website and after it this docker image will be used to create a container and then we will run our website on that container.
//Here are the some commands that we will write in our Dockerfile

// FROM node:18-alpine ==> this command is used to pull the image of node from docker hub and we will use the alpine version of node image because it is lightweight and it is best for the deployment of website.Its like we are using the node image as a base image to create our own image. like inheritance

// WORKDIR /app ==> this command is used to create a directory in the image and we will use this directory to copy all the files of our website in this directory and then we will run our website from this directory.

// COPY package*.json ./ ==> this command is used to copy the package.json file of our website in the image and we will use this package.json file to install all the dependencies of our website in the image.

// RUN npm ci ==> this command is used to install all the dependencies of our website in the image and we will use npm ci command(very imp it will save the versions of depencies and install that saves us from so many prob) to install all the dependencies of our website because it is faster than npm install command.

// COPY . . ==> this command is used to copy all the files of our website in the image and we will use these files to run our website in the image.

// RUN npm run build ==> this command is used to build our website in the image and we will use this command to build our website in the image because we will run our website from the build folder of our website.
// ================================> But if we make img like this img size is too large so we will use multi stage build to reduce the size of our image

//=================After this points written inside docker file ==============
//=================Here we will discuss the usage of docker-compose.yaml file  this is very imp when we want more than 1 container to run our web let say one container is our backend and one contaier is our database so we will use docker-compose.yaml file to run both the container at the same time and also connect both containers with each other with the help of netowrk and also we can use the volume to store the data of our database in the host machine so that we can use the data of our database even if the container is deleted.====================services:
//   mongoDbServer:
//   image: mongo //this is the image of mongo that we will use to create the container of mongoDbServer repo that will be pulled here from docker hub
//   container_name: mongodb-server //this is the name of the container that we will use to run the container of mongoDbServer
//   environment:
//     - MONGO_INITDB_ROOT_USERNAME: muzzammil759
//     - MONGO_INITDB_ROOT_PASSWORD: Muzz@66039870 //these are the environment variables that we will use to set the username and password of the database by this we will have acess to mongodb instance
//   volumes:
//     - ~/mongo/data:/data/db  very very imp for data persistance if we dont use this we will lose our data when container is deleted so it will sync the docker container data with the host machine data and store the data of the database in the host machine
//   networks:
//     - elib-network //this is the network that we will use to connect the container of mongoDbServer with the container of backendapi

// backendapi:
//   image: muzzammil759/elib-backend:v2 //this is the image of our backendapi that we will use to create the container of backendapi repo that will be pulled here from docker hub that we created basically
//   container_name: elib-backend-server
//   ports:
//     - "8080:8080" //this is the port that we will use to run our backendapi in the container of backendapi
//   networks:
//     - elib-network
//   depends_on:
//     - mongoDbServer // this is also very imp it shows the dependency of the backendapi container on the mongoDbServer container so that the backendapi container will run only if the mongoDbServer container is running
//   env_file: .env //this is the file that we will use to set the environment variables of the backendapi container

// networks:
// elib-network:
//   driver: bridge the driver:bridge is used to create the network of the containers that we will use to connect the containers with each other

//=====================After this now to run these container we will need a server so for this i am using Akmai server to run these containers and also we will use the docker-compose.yaml file to run these containers on the server and also we will use the docker-compose up command to run these containers on the server and also we will use the docker-compose down command to stop these containers on the server.=====================
