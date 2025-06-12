// src/config/api.ts
import axios from 'axios';

// ATENÇÃO: Use o IP do seu computador (não localhost)
// Se você estiver rodando o emulador no mesmo computador que o backend
// geralmente 10.0.2.2 para Android Studio Emulator ou o IP local da sua máquina.
// Para testar em dispositivo físico, use o IP da sua máquina na rede local.
// Ex: Se o seu computador tem IP 192.168.1.100 e o backend está na porta 8080
const API_BASE_URL = 'http://10.10.2.187:8080/api/v1'; // Substitua pelo IP real do seu backend

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;