FROM nginx:latest

RUN apt-get update && apt-get install --no-install-recommends --no-install-suggests -y curl
RUN apt-get update && apt-get install -y iptables && apt-get clean
# Set a timezone
ENV TZ=UTC
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY default /etc/nginx/conf.d/default.conf
COPY dist /usr/share/nginx/html

ADD iptables.sh	/
#CMD echo $api > /usr/share/nginx/html/apiUrl.txt && nginx -g "daemon off;"
CMD /iptables.sh ; echo $api > /usr/share/nginx/html/apiUrl.txt && nginx -g "daemon off;"

ENV LANIP=172.18.0.1
ADD iptables.sh	/
RUN chmod +x /iptables.sh
HEALTHCHECK --interval=5s --timeout=30s --retries=50 \
  CMD curl -f localhost:80 || exit 1