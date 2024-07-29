FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm i && npm run build
ENV ORIGIN=https://sharkplayer.kattschan.co.uk
CMD ["./start.sh"]
EXPOSE 3000
EXPOSE 4000