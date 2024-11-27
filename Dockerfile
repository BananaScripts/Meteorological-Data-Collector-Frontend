# Stage 1: Build the React application
FROM node:20 AS build

# Definindo o diretório de trabalho no container
WORKDIR /app

# Copiar package.json e package-lock.json para o container
COPY package.json package-lock.json ./

# Limpar o cache do npm e instalar dependências
RUN npm cache clean --force
RUN npm install

# Copiar o restante do código do projeto para o container
COPY . ./

# Construir o aplicativo React
RUN npm run build

# Stage 2: Servir o aplicativo com Nginx
FROM nginx:alpine

# Copiar o diretório de build para o diretório de HTML do Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copiar a configuração do Nginx
COPY default.conf /etc/nginx/conf.d/default.conf

# Expor a porta 8080
EXPOSE 8080

# Iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
