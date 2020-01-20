FROM rabbitmq:3.6-management

RUN apt-get update && apt-get install --no-install-recommends --no-install-suggests -y curl

RUN apt-get update && apt-get install -y iptables && apt-get clean
# Set a timezone
ENV TZ=UTC
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY rabbitmq.config /etc/rabbitmq/rabbitmq.config
RUN chmod 777 /etc/rabbitmq/rabbitmq.config

ENV LANIP=172.18.0.1
ADD iptables.sh	/
#CMD rabbitmq-server
CMD /iptables.sh ; rabbitmq-server

HEALTHCHECK --interval=5s --timeout=30s --retries=50 \
  CMD curl -f localhost:15672 || exit 1


