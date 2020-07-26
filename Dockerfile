FROM node:lts-slim

COPY ./dist /var/exam-game/dist
COPY ./lib /var/exam-game/lib
COPY ./package.json /var/exam-game/package.json
COPY ./yarn.lock /var/exam-game/yarn.lock

RUN cd /var/exam-game && yarn --production

WORKDIR /var/exam-game

ENTRYPOINT ["sh", "-c", "node ./lib/index.js"]

EXPOSE 3030