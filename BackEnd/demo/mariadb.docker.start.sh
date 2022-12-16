#!/bin/sh

docker run \
   -it \
   --restart=always \
   -v maria:/var/lib/mysql:rw \
   -p 127.0.0.1:3306:3306 \
   -e MYSQL_ROOT_PASSWORD=charmacist \
   -t cytopia/mariadb-10.1 \
   --name=mariadb \
   -d &