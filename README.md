# Teste Teddy Open Finance

O sistema terá uma tela inicial onde o usuário pode inserir o nome e, em seguida, será
redirecionado para uma tela com a lista de todos os clientes cadastrados, onde poderá
cadastrar, selecionar, atualizar e excluir clientes, além de uma tela para visualização dos
clientes selecionados.

## **Tópicos**
1. Tecnologias e Libs.
2. Instalação
3. Instalação
4. Estrutura do Projeto.
---

## Links:
 - RabbitMQ: [http://localhost:15672](http://localhost:15672)
 - Kibana: [http://localhost:5601](http://localhost:5601)
 - Desenvolvimento: [http://localhost:5173](http://localhost:5601)
 - Produção: [http://localhost:4173](http://localhost:5601)

## **1. Tecnologias Utilizadas**
- **Node.js**
- **NestJS**
- **React.js**
- **Docker e Docker Compose**
---

## **2. Instalação**

### **Pré-requisitos**
- Node.js versão 24+.
- npm (gerenciador de pacotes).

### **Modo Produção**

1. **Clone o repositório:**
   ```bash
   git clone <repo-url>
   cd ./brain-culture
   ```
2. Instale as dependencias (Execute na raiz do projeto)
   ```bash
   docker-compose up -d
   ```

3. Instale as dependencias (Execute na raiz do projeto)
   ```bash
   npm install
   ```

4. Instale as dependencias do Frontend (Execute na raiz do projeto)
   ```bash
   cd ./client && npm install
    ```

5. Instale as dependencias do Backend (Execute na raiz do projeto)
    ```bash
    cd ./bff && npm install
    ```

6. Inicie a aplicação em modo de Produção (Execute na raiz do projeto)
    ```bash
      npm run prod
    ```

7. A aplicação estará disponível em:
  - http://localhost:4173

---

### **Modo Desenvolvimento**

1. **Clone o repositório:**
   ```bash
   git clone <repo-url>
   cd ./repo-url
   ```

2. Instale as dependencias (Execute na raiz do projeto)
   ```bash
    docker-compose -f ./docker-compose-dev.yml up -d
   ```

3. Instale as dependencias (Execute na raiz do projeto)
   ```bash
   npm install
   ```

4. Instale as dependencias do Frontend (Execute na raiz do projeto)
   ```bash
   cd ./client && npm install
    ```

5. Instale as dependencias do Backend (Execute na raiz do projeto)
    ```bash
    cd ./bff && npm install
    ```

6. Start do Projeto
  - Frontend - Inicie a aplicação em modo de Desenvol (Execute na client projeto)
    ```bash
      npm run dev
    ```
  - Backend - Inicie a aplicação em modo de Desenvol (Execute na bff projeto)
    ```bash
      npm run start:dev
    ```


7. A aplicação estará disponível em:
  - http://localhost:5173

## **3. Testes**

- Backend (Teste Unitario) - (Execute na bff projeto)
  ```bash
    npm run test
  ```

- Backend (Teste E2E) - (Execute na bff projeto)
  ```bash
    npm run test:e2e
  ```
- Frontend - (Execute no client projeto)
  ```bash
    npm run test
  ```

---

## **4. Estrutura do Projeto**
```ruby
repo-url/
├── bff/                     # Backend (NestJS)
│   ├── src/
│   │   ├── application/     # Camada de aplicação (casos de uso, DTOs, contratos, etc.)
│   │   │   ├── contracts/
│   │   │   ├── decorators/
│   │   │   ├── dto/
│   │   │   ├── exceptions/
│   │   │   └── usecases/
│   │   ├── domain/          # Entidades e serviços de domínio
│   │   │   ├── entities/
│   │   │   └── services/
│   │   ├── infrastructure/  # Infraestrutura (banco, http, etc.)
│   │   │   ├── config/
│   │   │   ├── database/
│   │   │   └── http/
│   │   │       ├── controllers/
│   │   │       └── swagger/
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── tests/               # Testes do backend
│   ├── .env                 # Variáveis de ambiente
│   ├── .eslintrc.js
│   ├── .prettierrc
│   ├── jest.config.ts
│   ├── nest-cli.json
│   ├── package.json
│   ├── tsconfig.build.json
│   └── tsconfig.json
├── client/                  # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/      # Componentes reutilizáveis
│   │   ├── config/          # Configurações globais
│   │   ├── interfaces/      # Tipagens e interfaces TypeScript
│   │   ├── pages/           # Páginas da aplicação
│   │   ├── store/           # Gerenciamento de estado
│   │   │   ├── states/
│   │   │   └── index.ts
│   │   ├── templates/       # Layouts e templates
│   │   ├── App.tsx
│   │   ├── index.css
│   │   ├── main.tsx
│   │   └── vite-env.d.ts
│   ├── dist/                # Build final (gerado pelo Vite)
│   ├── node_modules/
│   └── tests/               # Testes do frontend
```
