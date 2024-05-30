FROM node:17

# Bundle APP files
WORKDIR /faster-ui-nextjs
COPY apps apps/
COPY components components/
COPY helper helper/
COPY pages pages/
COPY public public/
COPY styles styles/
COPY utility utility/
COPY package.json .
COPY next.config.js . 

ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install 
RUN npx next build
# Expose the listening port of your app
EXPOSE 2022

CMD [ "npm","start"]
