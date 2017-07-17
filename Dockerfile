FROM node:6.9.1
MAINTAINER Alexander Lee

ENV NODE_ENV=production
RUN npm install webpack babel-cli node-sass postcss-cli autoprefixer cssnano imagemin-cli -g --quiet

COPY package.json /tmp/package.json
RUN cd /tmp && npm install --production --quiet

WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN cp -a /tmp/node_modules /usr/src/app/

RUN webpack
RUN babel server --out-dir dist
RUN node-sass assets/scss/style.scss public/css/style.css
RUN postcss public/css/style.css -o public/css/style.css
RUN imagemin assets/images/* --out-dir=public/images

ENV PORT=4000

EXPOSE 4000
CMD ["/usr/local/bin/node", "./bin/www"]
