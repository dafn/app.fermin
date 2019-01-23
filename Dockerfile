FROM node:alpine
WORKDIR /app
COPY . /app
RUN npm i yarn && yarn
EXPOSE 8002
CMD yarn build:run
