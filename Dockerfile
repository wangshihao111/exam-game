FROM node:lts-slim

COPY . /var/exam-game
RUN cd /var/exam-game && yarn --production

WORKDIR /var/exam-game

ENTRYPOINT ["sh","-c","node ./lib/index.js"]

EXPOSE 3030