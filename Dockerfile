FROM node:15 AS NODE_BUILDER

WORKDIR /opt/ng
COPY package.json ./
RUN npm install

ENV PATH="./node_modules/.bin:$PATH"

COPY . ./
RUN ng build

FROM alexanderpaulsell/static-server

COPY --from=NODE_BUILDER opt/ng/dist/manager /files

ENV SPRING_APPLICATION_NAME=manager
