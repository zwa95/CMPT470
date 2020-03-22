FROM node:13

# Create app directory
WORKDIR /usr/src/a34

COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD [ "npm", "start" ]