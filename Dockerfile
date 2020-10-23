FROM node:latest

# create folders and chown them to node user
RUN mkdir -p /home/node/app/node_modules && mkdir -p /home/node/app/build && chown -R node:node /home/node/app

WORKDIR /home/node/app

# copy all journey asset files
RUN mkdir -p assets
COPY --chown=node:node assets/*.* ./assets/

COPY --chown=node:node package*.json ./

USER node

# install dependencies
RUN npm install --silent

# copy source files
COPY --chown=node:node . .

# transpile typescript and css
RUN npm run build

EXPOSE 8080

CMD [ "node", "build/index.js"]