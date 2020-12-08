FROM node:15 AS builder

WORKDIR /opt/ng
COPY package.json ./
RUN npm install

ENV PATH="./node_modules/.bin:$PATH"

COPY . ./
RUN ng build

FROM nginx:1 AS deployment

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /opt/ng/dist/manager /usr/share/nginx/html
