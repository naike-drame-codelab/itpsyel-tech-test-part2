# Application Bulletins ECTS – ITPSYEL Tech Test

## Présentation

Cette application web permet de générer et consulter des bulletins de notes ECTS pour les étudiants, ainsi que de visualiser un rapport d’anomalies pour le contrôle qualité. Elle a été développée dans le cadre d’un test technique, en adoptant les standards modernes de Next.js (App Router) et en intégrant une logique métier avancée.

---

## Fonctionnalités principales

- **Accueil** : Page d’introduction et navigation vers les modules principaux.
- **Bulletins ECTS** :
  - Affichage des bulletins de notes pour chaque étudiant et chaque année.
  - Calcul automatique des crédits ECTS obtenus, de la moyenne pondérée, et du statut de réussite.
- **Rapport d’anomalies** :
  - Détection et affichage des incohérences ou erreurs dans les données d’inscription, de notes ou de cours.
- **API REST** :
  - Endpoints `/api/bulletins` et `/api/anomalies` pour exposer les données calculées côté serveur.

---

## Stack technique

- **Next.js 15 (App Router)** : Framework React moderne, structure `app/` pour le routage et les API.
- **React 18** : Pour la construction d’interfaces réactives et performantes.
- **TypeScript** : Typage statique pour la robustesse du code.
- **Prisma** : ORM pour la gestion de la base de données (SQLite en local, facilement adaptable).
- **React-Bootstrap & Bootstrap 5** : UI moderne et responsive.
- **Axios** : Requêtes HTTP vers des APIs distantes pour la récupération des données brutes.

---
## Lancer le projet

1. Installer les dépendances :
	```bash
	npm install
	```
2. Générer la base de données (optionnel, si usage Prisma local) :
	```bash
	npx prisma migrate dev --name init
	```
3. Démarrer le serveur :
	```bash
	npm run dev
	```
4. Accéder à l’application sur [http://localhost:3000](http://localhost:3000)

---

## Rôle de l’IA dans le développement

L’intelligence artificielle (GitHub Copilot) a joué un rôle clé dans :
- La correction des erreurs de compatibilité (React 18, Bootstrap, etc.).
- La correction de la logique de `/lib/bulletinService`
- La documentation additionnelle de ce README.

---


