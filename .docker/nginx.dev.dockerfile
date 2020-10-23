FROM nginx:latest

COPY ./.docker/nginx.dev.conf /etc/nginx/nginx.conf

EXPOSE 80