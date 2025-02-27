# Stage 1: Build stage
FROM node:18 AS builder

# Set the working directory
WORKDIR /app

# Set build arguments
ARG NEXT_PUBLIC_FIREBASE_API_KEY
ARG NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
ARG NEXT_PUBLIC_FIREBASE_PROJECT_ID
ARG NEXT_PUBLIC_FIREBASE_APP_ID

# Create .env.local file
RUN echo "NEXT_PUBLIC_FIREBASE_API_KEY=${NEXT_PUBLIC_FIREBASE_API_KEY}" > .env.local && \
    echo "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=${NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN}" >> .env.local && \
    echo "NEXT_PUBLIC_FIREBASE_PROJECT_ID=${NEXT_PUBLIC_FIREBASE_PROJECT_ID}" >> .env.local && \
    echo "NEXT_PUBLIC_FIREBASE_APP_ID=${NEXT_PUBLIC_FIREBASE_APP_ID}" >> .env.local

# Copy package*.json files
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy other source code files
COPY . .

# Build the app
RUN npm run build

# Stage 2: Production stage
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package*.json files
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy built app from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules

# Expose the listening port
EXPOSE 3000

# Run the app
CMD ["npm", "start"]
