FROM node:18

# Main working directory
WORKDIR /app

# Installing dependencies
COPY package*.json ./

RUN npm ci

COPY . .
# Building TypeScript files
RUN npm run build


EXPOSE 8000

# # Command to start your Node.js app
# CMD ["npm", "start"]