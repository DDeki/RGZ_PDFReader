# Build stage
FROM node:16 as build
WORKDIR /frontend



COPY package*.json ./
RUN npm install
COPY . .


# Build arguments for environment variables
ARG VUE_APP_BACKEND_PATH
ARG VUE_APP_LOGIN_PATH
ARG VUE_APP_KEYCLOAK_REALM
ARG VUE_APP_KEYCLOAK_CLIENTID

# Set environment variables
ENV VUE_APP_BACKEND_PATH=${VUE_APP_BACKEND_PATH}
ENV VUE_APP_LOGIN_PATH=${VUE_APP_LOGIN_PATH}
ENV VUE_APP_KEYCLOAK_REALM=${VUE_APP_KEYCLOAK_REALM}
ENV VUE_APP_KEYCLOAK_CLIENTID=${VUE_APP_KEYCLOAK_CLIENTID}


RUN npm run build


# Stage 2: Set up the Express server
FROM node:16-alpine

# Set the working directory
WORKDIR /frontend

# Copy package.json and package-lock.json files
COPY package.json package-lock.json ./

# Install server dependencies
RUN npm install

# Copy the built files from the previous stage
COPY --from=build /frontend/dist /frontend/dist

# Copy server.js
COPY server.js ./

# Expose the port that will be used by the Express server
EXPOSE 8080

# Start the Express server
CMD ["node", "server.js"]
