# # Use the official Node.js image
# FROM node:18-alpine

# # Set the working directory
# WORKDIR /usr/src/app

# # Copy package.json and package-lock.json
# COPY package.json package-lock.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of the application code
# COPY . .

# # Expose the port the Next.js server runs on
# EXPOSE 3000

# # Start the Next.js server
# CMD ["npm", "run", "start"]
# Base image for all stages
FROM node:18-alpine AS base
# Install OpenSSL and libc6-compat for Prisma and other dependencies
RUN apk add --no-cache libc6-compat openssl

# Dependencies stage - Install ALL dependencies
FROM base AS deps
WORKDIR /usr/src/app
# Copy package files
COPY package.json package-lock.json ./
# Install ALL dependencies (including devDependencies needed for build)
RUN npm ci

# Builder stage - Build the application
FROM base AS builder
WORKDIR /usr/src/app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copy dependencies and source code
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . .

# Build the Next.js application
RUN npm run build

# Production dependencies stage - Install only production dependencies
FROM base AS prod-deps
WORKDIR /usr/src/app
# Copy package files
COPY package.json package-lock.json ./
# Install only production dependencies
RUN npm ci --only=production && npm cache clean --force

# Production stage - Final runtime image
FROM base AS runner
WORKDIR /usr/src/app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy production dependencies
COPY --from=prod-deps /usr/src/app/node_modules ./node_modules

# Copy built application
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/.next/standalone ./
COPY --from=builder /usr/src/app/.next/static ./.next/static

# Set proper ownership
RUN chown -R nextjs:nodejs /usr/src/app

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Set runtime configuration
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start the production server
CMD ["node", "server.js"]