# Stage 1: Build the Angular app
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files first to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source
COPY . .

# Build the application (production configuration)
RUN npm run build --configuration=production

# Stage 2: Serve it with Nginx
FROM nginx:alpine

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy the build output to replace the default nginx contents.
# MEMO: Replace 'portfolio-app' with the actual name of your project folder in /dist/
COPY --from=builder /app/dist/portfolio-app/browser /usr/share/nginx/html

# Copy our custom nginx config for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]