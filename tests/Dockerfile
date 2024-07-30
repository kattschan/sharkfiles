FROM node:18-alpine
WORKDIR /build
COPY .. .
RUN npm i
RUN npm i -g pm2
RUN npm run build
RUN mkdir /app
RUN mv build express.js package*.json ecosystem.config.cjs node_modules /app
WORKDIR /app
RUN rm -rf /build
ENV ORIGIN=http://localhost:3000
CMD ["pm2-runtime", "start", "ecosystem.config.cjs"]
EXPOSE 3000
EXPOSE 4000