# Build stage
FROM node:20-alpine AS build-stage

# Set working directory
WORKDIR /app

# Copy project files first (needed for quasar prepare in postinstall)
COPY . .

# Configure npm to handle SSL certificate issues in build environments
# Note: In production environments with proper certificates, you can remove this line
RUN npm config set strict-ssl false

# Install all dependencies including devDependencies
RUN npm install

# Build the application using npm script
RUN npm run build

# Production stage
FROM nginx:stable-alpine AS production-stage

# Copy built files from build stage
COPY --from=build-stage /app/dist/spa /usr/share/nginx/html

# Copy nginx configuration if needed (optional)
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
