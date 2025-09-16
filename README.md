# Application - Bulletins ECTS & Rapport d'anomalies

## Présentation

Cette application web permet de générer et consulter des bulletins de notes ECTS pour les étudiants, ainsi que de visualiser un rapport d’anomalies pour le contrôle qualité. 

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

- **Next.js 15 (App Router)** 
- **React 18** 
- **TypeScript**
- **Prisma** 
- **React-Bootstrap & Bootstrap 5**
- **Axios**

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

## Détail du service `lib/bulletinService.ts`

Le fichier `lib/bulletinService.ts` centralise toute la logique métier de génération des bulletins ECTS et de détection des anomalies. Cette organisation en "service" s'inspire de mon expérience avec Angular, où la séparation de la logique métier dans des services dédiés favorise la maintenabilité et la réutilisabilité du code. Il expose notamment la fonction asynchrone `generateReports` utilisée par les routes API et les pages React.

### Interfaces principales

- **Course** : Représente un cours (mnemonique, intitulé, crédit, titulaire).
- **Bulletin** : Structure d’un bulletin ECTS pour un étudiant (identité, crédits, moyenne, réussite, détails des cours).
- **Anomaly** : Structure d’une anomalie détectée (type, matricule, année, détail).

### Fonctionnement de `generateReports`

1. **Récupération des données** :
	- Appelle les fonctions `fetchInscriptions`, `fetchCourses` et `fetchAllNotes` pour obtenir les données brutes (étudiants, cours, notes).
2. **Mapping et préparation** :
	- Crée des maps pour un accès rapide aux cours et notes.
3. **Détection d’anomalies** :
	- Ajoute des anomalies pour : notes dupliquées, erreurs de parsing, inscriptions sans cours, cours inconnus, notes sans inscription, notes sans crédit, etc.
4. **Calcul des bulletins** :
	- Pour chaque étudiant, calcule :
	  - Total ECTS inscrits et obtenus
	  - Moyenne pondérée (pondération par crédits)
	  - Statut de réussite (60 ECTS ou moyenne ≥ 10)
	  - Détail de chaque cours (note, crédit, intitulé)
5. **Retour** :
	- Retourne un objet `{ bulletins, anomalies }` utilisé par les API et les pages.

---

## Rôle de l’IA dans le développement

L’IA (GitHub Copilot) a joué un rôle clé dans :
- La correction des erreurs de compatibilité (React 18, Bootstrap, etc.).
- La correction de la logique de `/lib/bulletinService`
- La documentation additionnelle de ce README.



