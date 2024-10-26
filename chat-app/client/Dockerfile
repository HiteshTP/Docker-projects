FROM node:18-alpine AS installer
WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM ngnix:latest AS deployer
COPY --from=installer app/build/ user/share/ngnix/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
