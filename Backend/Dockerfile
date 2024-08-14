FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:18-alpine 

WORKDIR /app

COPY package*.json ./

ENV NODE_ENV=production 

RUN npm ci 
# --omit=dev this can also be used to skip dev dependencies 
# below comand is imp it will basically copy the dist folder from the builder image that we make up into the current image 
COPY --from=builder /app/dist ./dist 

# this below comand is used to change the ownership of the /app directory to the node user and also give the node user the permission to read, write and execute the /app directory bcz running the app as root user is not a good practice causee sec problems
RUN chown -R node:node /app && chmod -R 755 /app 

# this package is very imp for running the app in production mode bcz it will keep the app running in the background and also restart the app if it crashes
RUN npm install pm2 -g 

# this below comand is used to copy the ecosystem.config.js file from the local machine to the container
COPY ecosystem.config.js .

# this below comand is used to change the user to node user so that the app will run as node user and not as root user
USER node

# this below comand is used to expose the port 8080 of the container
EXPOSE 8080

# below comand is used to build proj in it we will run the app using pm2-runtime by which start comand will be used to start the app and ecosystem.config.js file will be used to run the app in this configuration file we will define the app name and the file that we want to run
CMD ["pm2-runtime", "start", "ecosystem.config.js"]

# docker build -t muzzammil759/elib-backend:v1 --platform linux/amd64 . ==> this command of cmd will build image of docker for us 
# and in it -t for giving tag muzzammil759 is usernam eof hub and /elib is where this is stored --platform on which platform it is builded and '.' it means dockerfile is in this folder  and after this docker push muzzammil759/elib-backend:v3 this command is used to push on docker hub so that we will just pull our image for later use  
# After this as we know one container is also for out database so for that when we have to use multiple containers we will use some third party tool like docker-compose so that we can run multiple containers at the same time and also we can define the network between them so that they can communicate with each other very imp for this make docker-compose.yaml file same name as docker-compose.yml and in it we will define the services that we want to run and also the network that we want to use and also the volumes that we want to use and also the ports that we want to expose and also the env variables that we want to use and also the image that we want to use and also the build that we want to use and also the container name that we want to use and also the restart policy that we want to use and also the depends on that we want to use and also the links that we want to use and also the networks that we want to use and also the volumes that we want to use and also the ports
