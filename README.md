# TP9 - Intégration et Manipulation de Données avec Kafka

## 🎯 Objectif
Ce projet a pour objectif de comprendre et utiliser **Apache Kafka 4.2 (mode KRaft)** avec Node.js pour la production et la consommation de messages, ainsi que leur stockage et exposition via une API REST.

---

## 🛠️ Technologies utilisées
- Node.js
- Kafka 4.2 (KRaft mode)
- KafkaJS
- Express.js
- PostgreSQL (optionnel)
- dotenv

---

## 📁 Structure du projet
- producer.js → envoie des messages vers Kafka
- consumer.js → consomme les messages Kafka
- server.js → API REST pour récupérer les messages
- db.js → connexion base de données
- init.sql → création des tables PostgreSQL
- .env → configuration des variables d’environnement

---

## ⚙️ Installation

```bash
npm install
