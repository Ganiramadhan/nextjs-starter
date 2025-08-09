# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package.json and lockfile if present
COPY package*.json pnpm-lock.yaml* ./

# Enable and prepare pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Install dependencies for building
RUN if [ -f pnpm-lock.yaml ]; then \
      pnpm install; \
    else \
      pnpm install --no-frozen-lockfile; \
    fi

# Copy the rest of the application source
COPY . .

# Build the application
RUN pnpm build

# Stage 2: Production
FROM node:18-alpine
WORKDIR /app

# Copy package.json and lockfile if present
COPY package*.json pnpm-lock.yaml* ./

# Enable and prepare pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Install production dependencies only
RUN if [ -f pnpm-lock.yaml ]; then \
      pnpm install --prod --frozen-lockfile; \
    else \
      pnpm install --prod --no-frozen-lockfile; \
    fi

# Copy build output and public assets from builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Expose port 4000
EXPOSE 4000

CMD ["pnpm", "start"]
