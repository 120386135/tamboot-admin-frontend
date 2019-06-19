FROM alpine:latest
RUN mkdir -p /usr/local/html/tamboot-admin
WORKDIR /usr/local/html/tamboot-admin
COPY dist/* ./

RUN echo "https://mirror.tuna.tsinghua.edu.cn/alpine/v3.4/main/" > /etc/apk/repositories
RUN apk update && apk upgrade && apk add --no-cache bash bash-doc bash-completion && rm -rf /var/cache/apk/*
CMD ["/bin/bash", "-c"]
