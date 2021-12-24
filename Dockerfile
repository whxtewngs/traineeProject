# stage 1 build
FROM node:16 as build

WORKDIR /opt/app-root/app
COPY . /opt/app-root/app
RUN npm install
RUN npm run build

# stage 2 deploy 
FROM registry.redhat.io/rhel8/nginx-116:1-95
WORKDIR  /usr/share/nginx/html/

ADD ./nginx/nginx.conf  /etc/nginx/nginx.conf
COPY --chown=default:root  --from=build /opt/app-root/app/build /opt/app-root/src


USER 0 
RUN chown -R 1001:0 /opt/app-root/src
EXPOSE 8080
CMD nginx -g "daemon off;"
