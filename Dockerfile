# Use uma imagem Node.js
FROM node:16

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie os arquivos de configuração
COPY package.json .
COPY package-lock.json .

# Instale as dependências
RUN npm install

# Copie o restante do código
COPY . .

# Compile o TypeScript
RUN npm run build

# Exponha a porta que a API usará
EXPOSE 5000

# Comando para iniciar a API
CMD ["node", "dist/main/server.js"]
