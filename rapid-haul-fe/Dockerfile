# rapid-haul-fe/Dockerfile
FROM node:22

WORKDIR /app

# Copy project files
COPY . .

# Install dependencies
RUN npm install

# Build the application
RUN npm run build

# Expose port
EXPOSE 3000

# Start the application in development mode
CMD ["npm", "run", "dev"]