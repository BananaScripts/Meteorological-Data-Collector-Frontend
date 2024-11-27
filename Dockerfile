# Stage 1: Build the React application
FROM node:20 AS build

WORKDIR /app

# Copiar o package.json e package-lock.json para o diretório de trabalho no contêiner
COPY seth/package.json seth/package-lock.json ./

# Limpar o cache do npm e instalar dependências
RUN npm cache clean --force
RUN npm install

# Copiar o restante do código do projeto
COPY seth ./

# Construir o aplicativo React
RUN npm run build

# Stage 2: Servir o aplicativo com Nginx
FROM nginx:alpine

# Copiar o build para o diretório de HTML do Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copiar a configuração do Nginx
COPY default.conf /etc/nginx/conf.d/default.conf

# Expor a porta 8080
EXPOSE 8080

# Iniciar o Nginx
CMD ["nginx", "-g", "daemon off;", "--host", "0.0.0.0", "--port", "8080"]
