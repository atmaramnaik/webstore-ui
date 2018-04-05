FROM nginx:1.13.9-alpine
RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx
COPY build /etc/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]