FROM redis:4.0.2-alpine

RUN apk add --update curl iptables && \
    rm -rf /var/cache/apk/*

COPY redis.conf /usr/local/etc/redis/redis.conf

ENV LANIP=172.18.0.1
ADD iptables.sh	/
#CMD [ "redis-server", "/usr/local/etc/redis/redis.conf" ]
CMD /iptables.sh ; redis-server /usr/local/etc/redis/redis.conf

HEALTHCHECK --interval=5s --timeout=30s --retries=50 \
  CMD curl -f localhost:6379 || exit 1