# 🖥️ Help-Desk 
### Sistema de Gerenciamento de Chamados

Aplicação Full Stack desenvolvida como desafio da formação **Full Stack** da [Rocketseat](https://www.rocketseat.com.br/).
O sistema simula um **Gerenciador de Chamados**, permitindo que **Administradores, Técnicos e Clientes** interajam em um fluxo realista de abertura, acompanhamento e encerramento de chamados.

---

## 🖼 Projeto

![Preview do Projeto](https://img.notionusercontent.com/s3/prod-files-secure%2F08f749ff-d06d-49a8-a488-9846e081b224%2Fac07ec6c-08d8-4213-98cc-68bc86d1fba4%2Fimage.png/size/w=1420?exp=1758277531\&sig=Kklm3eQT9HRe_O2z09y9VSo-bw7Mno9Unpci9e472Uk\&id=1fa395da-5770-8083-9b7d-f164ff732e80\&table=block)

🎨 **Design no Figma** → [Link do Figma](https://www.figma.com/community/file/1506654636739959765/plataforma-de-chamados)

---

## 🚀 Tecnologias

### **Front-end**

*  ⚡ Vite
* ⚛️ React
* 🎨 TailwindCSS
* 🔒 Validação com Zod
* 🌐 Deploy: Vercel

### **Back-end**

* 🟩 Node.js + Express
* 🛢 PostgreSQL
* 🔗 ORM: Prisma
* 🔒 JWT para autenticação
* 🧪 Jest para testes
* 🐳 Docker
* 🌐 Deploy: Render

---

## 🎬 Live Preview

Assista a demonstração do sistema funcionando em tempo real:

// TODO
[![Watch the video](https://img.shields.io/badge/YouTube-Live%20Preview-red?style=for-the-badge\&logo=youtube\&logoColor=white)](https://www.youtube.com/watch?v=SEU_VIDEO_AQUI)




---

## 👥 Personas do Sistema

* **Admin** 👩‍💼

  * Gerencia técnicos, clientes e serviços
  * Cria técnicos com senha provisória e disponibilidade de horário
  * Cria/edita/lista/desativa serviços
  * Lista/edita/exclui clientes
  * Pode visualizar e alterar status dos chamados

* **Técnico** 🛠

  * Edita perfil e adiciona imagem
  * Gerencia chamados atribuídos a ele
  * Altera status dos chamados (Aberto → Em atendimento → Encerrado)

* **Cliente** 🙋‍♂️

  * Edita perfil e adiciona imagem
  * Cria/edita/exclui conta
  * Abre chamados escolhendo serviço
  * Acompanha histórico de chamados

---

## 📌 Funcionalidades

✔️ Autenticação com JWT
✔️ Upload de imagem de perfil (Cliente e Técnico)
✔️ Painéis distintos para Admin, Técnico e Cliente
✔️ Criação e gestão de chamados com valores de serviços
✔️ Alteração de status do chamado (Aberto | Em atendimento | Encerrado)
✔️ Mobile First (responsivo)
✔️ Os chamados são distribuídos automaticamente para o técnico disponível com menos atendimentos em andamento.

---

## 🌍 Deploy

// TODO

* 🔗 [Frontend (Vercel)](https://seu-front.vercel.app)
* 🔗 [Backend (Render)](https://seu-back.onrender.com)

---

## 🛠 Como rodar o projeto localmente

### 1. Clone o repositório

```bash
git clone https://github.com/Dev-HideyukiTakahashi/help-desk-rocketseat.git
cd help-desk-rocketseat
```

### 2. Backend

```bash
cd api
npm install
npm run dev
```

### 3. Frontend

```bash
cd web
npm install
npm run dev
```

### 4. Acesse

👉 Frontend: [http://localhost:5173](http://localhost:5173)
👉 Backend: [http://localhost:3333](http://localhost:3333)

---

## 📚 Aprendizados

Durante o desenvolvimento deste projeto:

* Desenvolvi uma aplicação Full Stack com **React, Node.js, Express e PostgreSQL**.
* Aprimorei conhecimentos em **TailwindCSS, Docker, Jest ,Prisma, Zod**.
* Trabalhei boas práticas como **Mobile First, Soft Delete e camadas de responsabilidades**.
* Aprendi a importância de utilizar **TypeScript** e aplicar tipagem nos parâmetros para garantir maior manutenibilidade, escalabilidade e segurança do código.

---

## 📄 Licença

Este projeto foi desenvolvido como desafio educacional da **Rocketseat**.

---

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white) ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white) ![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white) ![Zod](https://img.shields.io/badge/Zod-3068B7?style=for-the-badge&logoColor=white) ![Vercel](https://img.shields.io/badge/Frontend-Vercel-black?style=for-the-badge&logo=vercel) ![Render](https://img.shields.io/badge/Backend-Render-46E3B7?style=for-the-badge&logo=render&logoColor=black)

