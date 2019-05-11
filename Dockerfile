FROM nginx:1.13.9-alpine
RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx
COPY build /etc/nginx/html
RUN mkdir -p /entry
COPY scripts/entrypoint.sh /entry/
RUN chmod u+x /entry/entrypoint.sh
EXPOSE 80
ENTRYPOINT ["sh", "./entry/entrypoint.sh"]