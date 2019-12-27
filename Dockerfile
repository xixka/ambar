FROM land007/docker-compose:latest

MAINTAINER Jia Yiqiu <yiqiujia@hotmail.com>

ADD docker-compose.yml /app
#RUN curl -L "https://raw.githubusercontent.com/land007/ambar/master/docker-compose.yml" -o /app/docker-compose.yml

#VOLUME /root/docker/ambar/db
#VOLUME /root/docker/ambar/es
#VOLUME /root/docker/ambar/rabbit
#VOLUME /root/docker/ambar/test
#VOLUME /root/docker/node-http-proxy
VOLUME /root/docker

EXPOSE 20022/tcp
EXPOSE 20080/tcp

CMD service docker start && cd /app && docker-compose up -d

#> docker rm -f docker-compose ; docker run -it --rm --privileged --name docker-compose land007/docker-compose:latest
#> docker commit -a "Jia Yiqiu <yiqiujia@hotmail.com>" -m "ambar all in one" a404c6c174a2  land007/RD17_ambar:latest
#docker build -t "land007/RD17_ambar:latest" .
#docker rm -f RD17_ambar ; docker run -it --privileged --name RD17_ambar -v ~/docker/RD17_ambar:/root/docker -p 20080:20080 -p 20022:20022 "land007/RD17_ambar:latest"

