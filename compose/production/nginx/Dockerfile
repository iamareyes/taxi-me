FROM node:19.0-alpine AS client-builder

# set working directory
WORKDIR /usr/src/app

# add _/usr/src/app/node_modules/.bin_ to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install app dependencies
COPY ./client/package.json .
COPY ./client/yarn.lock .
RUN yarn install --production

# copy project
COPY ./client .

#build project
CMD ["yarn", "build"]

#FROM client-builder:latest AS react-builder
FROM nginx:1.25

RUN rm /etc/nginx/conf.d/default.conf

COPY --from=client-builder /usr/src/app/build /usr/share/nginx/html

COPY ./compose/production/nginx/nginx.conf /etc/nginx/conf.d
