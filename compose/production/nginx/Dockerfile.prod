#FROM client-builder:latest AS react-builder
FROM taxi-react-app-taxi-client AS react-builder
FROM nginx:1.25

RUN rm /etc/nginx/conf.d/default.conf

COPY --from=react-builder /usr/src/app/build /usr/share/nginx/html

COPY ./compose/production/nginx/nginx.conf /etc/nginx/conf.d
