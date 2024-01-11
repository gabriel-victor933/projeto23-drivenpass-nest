FROM node:18-alpine
WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN npm i --omi=dev
RUN npm run build
EXPOSE 3000
CMD ["npm","run", "start:prod"] 