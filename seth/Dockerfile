# Etapa 1: Construção
FROM node:14 AS build

WORKDIR /app

# Copie o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie todo o código-fonte do projeto para o diretório de trabalho
COPY . .

# Construa o aplicativo para produção
RUN npm run build

# Etapa 2: Servir
FROM nginx:alpine

# Copie os arquivos de construção do aplicativo para o diretório de conteúdo estático do Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copie o arquivo de configuração do Nginx
COPY default.conf /etc/nginx/conf.d/default.conf

# Exponha a porta 8080 para o tráfego HTTP
EXPOSE 8080

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]