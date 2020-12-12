FROM node:15 AS NODE_BUILDER

WORKDIR /opt/ng
COPY package.json ./
RUN npm install

ENV PATH="./node_modules/.bin:$PATH"

COPY . ./
RUN ng build

FROM alexanderpaulsell/static-server

COPY --from=NODE_BUILDER opt/ng/dist/manager /files
COPY config.sh /server/config.sh

ENV INVENTORY_URL=http://localhost:8080/api/v1
ENV FILES_URL=http://localhost:8081
ENV SPRING_APPLICATION_NAME=manager
