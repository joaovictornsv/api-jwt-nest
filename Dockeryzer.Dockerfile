# Use the latest LTS version of Node.js for the build stage
FROM node:alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application source code
COPY . .

# Build the application
RUN npm run build

# Use a minimal Node.js image for the production stage
FROM node:alpine AS production

# Set the working directory
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Expose the application port
EXPOSE 3000

# Set the command to start the application
CMD ["node", "dist/main"]

# Example command to run the application
# docker run -p 3000:3000 <image_name>