FROM elasticsearch:5.6.3

RUN apt-get update && apt-get install -y iptables && apt-get clean
ENV LANIP=172.18.0.1
# Set a timezone
ENV TZ=UTC
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY elasticsearch.yml ./config/elasticsearch.yml

RUN bin/elasticsearch-plugin install http://dl.bintray.com/content/imotov/elasticsearch-plugins/org/elasticsearch/elasticsearch-analysis-morphology/5.6.3/elasticsearch-analysis-morphology-5.6.3.zip
RUN bin/elasticsearch-plugin install analysis-stempel
RUN bin/elasticsearch-plugin install analysis-smartcn

ENV LANIP=172.18.0.1
ADD iptables.sh	/
#CMD ["elasticsearch"]
CMD /iptables.sh ; elasticsearch

HEALTHCHECK --interval=5s --timeout=30s --retries=50 \
  CMD curl -f http://localhost:9200/ || exit 1
