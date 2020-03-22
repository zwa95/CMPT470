FROM node:13

# Create app directory
WORKDIR /usr/src/a34

COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]