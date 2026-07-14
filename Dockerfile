FROM node:20-alpine
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
# Vite inlines VITE_* vars at build time; Render passes service env vars to
# Docker builds only when declared as ARG (see render.yaml).
ARG VITE_GOOGLE_CLIENT_ID
ENV VITE_GOOGLE_CLIENT_ID=$VITE_GOOGLE_CLIENT_ID
RUN npm run build

ENV NODE_ENV=production
EXPOSE 8080
CMD ["npm", "start"]
