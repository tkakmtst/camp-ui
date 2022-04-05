FROM node:17-alpine

WORKDIR /opt/app

ENTRYPOINT ["sh", "./setup.sh"]
