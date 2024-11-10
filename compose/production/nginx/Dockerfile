FROM node:19.0-alpine AS build

# set working directory
WORKDIR /usr/src/app

# add _/usr/src/app/node_modules/.bin_ to $PATH
#ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json .
COPY yarn.lock .
# copy project
COPY ./client .

RUN yarn install 

RUN yarn run build --production

FROM nginx:1.25

COPY --from=build /usr/src/app/build/ /etc/nginx/html/
COPY --from=build /usr/src/app/build/static/ home/app/staticfiles/

RUN rm /etc/nginx/conf.d/default.conf
COPY ./compose/production/nginx/nginx.conf /etc/nginx/conf.d
