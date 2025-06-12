
# Projeto Mobile + API - Imepac Hugo Martins

[![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)]()
[![License](https://img.shields.io/badge/licença-Privado-red)]()
[![Java](https://img.shields.io/badge/Java-21-blue?logo=java)]()
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.0-brightgreen?logo=springboot)]()
[![React Native](https://img.shields.io/badge/React%20Native-Mobile-blue?logo=react)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-frontend-3178c6?logo=typescript)]()
[![MySQL](https://img.shields.io/badge/MySQL-suportado-blue?logo=mysql)]()
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-suportado-316192?logo=postgresql)]()
[![MongoDB](https://img.shields.io/badge/MongoDB-suportado-4DB33D?logo=mongodb)]()

---

## 📱 Aplicativo Mobile (React Native + TypeScript)

Frontend moderno construído com React Native, usando navegação, temas globais e integração com a API via Axios.

### Principais Diretórios:
- `App.tsx` — entrada principal do app.
- `src/components/` — inputs, menus e outros componentes reutilizáveis.
- `src/config/api.ts` — integração com a API Java.
- `src/pages/AppNavigation.tsx` — gerenciamento de rotas.

### Recursos:
- Login com JWT.
- Tela inicial com menu e ícones.
- Estilização com temas.
- Tipagem forte com TypeScript.

---

## ☕ API Backend (Spring Boot)

A API foi construída com Java 21 e Spring Boot, contendo autenticação JWT, controle de usuários, e CRUD de produtos.

### Principais Módulos:
- **Autenticação:** `AuthenticationController`, `JwtService`, `LoginRequest`, etc.
- **Segurança:** `SecurityConfig`, `JwtAuthenticationFilter`.
- **Usuários:** CRUD com roles e autenticação integrada.
- **Produtos:** cadastro e gerenciamento.

### Suporte a Bancos de Dados:
- MySQL ✅
- PostgreSQL ✅
- MongoDB ✅
- H2 (memória) ✅

> O banco pode ser configurado em `application.properties`.

---

## 🚀 Como executar

### Backend (API)
```bash
cd Projeto-Android-main/API/myapp
./mvnw spring-boot:run
```

### Frontend (App)
```bash
cd Projeto-Android-main/projet/imepac-hugomartins
yarn install
npx expo start
```

---

## 📦 Dependências principais

### Backend
- Spring Boot
- Spring Security
- JPA + Hibernate
- JWT (io.jsonwebtoken)
- Lombok

### Frontend
- React Native
- React Navigation
- Axios
- TypeScript

---

## 🔒 Autenticação

- O sistema utiliza autenticação via **JWT**.
- O token é armazenado no frontend e enviado no header `Authorization`.

---

## 📄 Licença

Este projeto é acadêmico e de licença **privada** e não está autorizado para distribuição sem permissão.

---

## 👤 Autor

Desenvolvido por **Hugo Martins** no contexto do Imepac.
