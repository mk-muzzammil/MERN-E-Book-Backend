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