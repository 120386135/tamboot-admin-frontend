FROM alpine:latest
RUN mkdir -p /usr/local/app/tamboot-admin
RUN mkdir -p /usr/share/nginx/html/
WORKDIR /usr/local/app/tamboot-admin
COPY dist/* ./
VOLUME /usr/share/nginx/html/
RUN echo "https://mirror.tuna.tsinghua.edu.cn/alpine/v3.4/main/" > /etc/apk/repositories
RUN apk update && apk upgrade && apk add --no-cache bash bash-doc bash-completion && rm -rf /var/cache/apk/*
CMD ["/bin/bash", "-c", "rm -rf /usr/share/nginx/html/tamboot-admin;cp -R /usr/local/app/* /usr/share/nginx/html/;while true;do echo tamboot;sleep 1;done"]
