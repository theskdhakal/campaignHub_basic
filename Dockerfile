# Use Node.js 16 as the base image
FROM node:16

# Set the working directory for the server
WORKDIR /app

# Copy the server-side package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the server-side files
COPY . .

# Move into the client directory
WORKDIR /app/client

# Copy the client-side package.json and install dependencies
COPY client/package*.json ./
RUN npm install

# Copy the client-side source code
COPY client/src ./src

# Move back to the root directory
WORKDIR /app

# Expose the port for the server
EXPOSE 3000

# Run the server
CMD ["npm", "start"]

