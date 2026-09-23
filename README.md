# 🚦 Infotrafic Réunion

> Information routière en temps réel à La Réunion — Webcams DRR, incidents, carte interactive. Application web statique, sans backend, sans API Key.

[![Statut](https://img.shields.io/badge/statut-actif-brightgreen?style=flat-square)](https://github.com/gunout/infotraffic-Reunion-crgt)
[![Licence](https://img.shields.io/badge/licence-MIT-blue?style=flat-square)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/fr/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/fr/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/fr/docs/Web/JavaScript)
[![Leaflet](https://img.shields.io/badge/Leaflet-199900?style=flat-square&logo=leaflet&logoColor=white)](https://leafletjs.com/)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-déployé-222?style=flat-square&logo=github)](https://gunout.github.io/infotraffic-Reunion-crgt/)
[![Sans backend](https://img.shields.io/badge/backend-aucun-success?style=flat-square)](#architecture)
[![Sans API Key](https://img.shields.io/badge/API%20Key-aucune-success?style=flat-square)](#sources-de-données)
[![Responsive](https://img.shields.io/badge/responsive-mobile%20%7C%20tablette%20%7C%204K-3B82F6?style=flat-square)](#-responsive)

## 📋 Sommaire

- [Aperçu](#-aperçu)
- [Démo en ligne](#-démo-en-ligne)
- [Fonctionnalités](#-fonctionnalités)
- [Architecture](#-architecture)
- [Installation](#-installation)
- [Déploiement](#-déploiement)
- [Sources de données](#-sources-de-données)
- [Responsive](#-responsive)
- [Structure du projet](#-structure-du-projet)
- [Personnalisation](#-personnalisation)
- [Performances](#-performances)
- [Accessibilité](#-accessibilité)
- [FAQ](#-faq)
- [Contribuer](#-contribuer)
- [Licence](#-licence)
- [Remerciements](#-remerciements)

## 🎯 Aperçu

**Infotrafic Réunion** est une application web mono-fichier (`index.html`) qui agrège en temps réel :

- 📹 **18 webcams DRR** sur les routes principales de l'île
- ⚠️ **Incidents routiers** (accidents, bouchons, travaux, dangers…) via OpenEventDatabase
- 🗺️ **Carte interactive** Leaflet + OpenStreetMap (sans API Key)
- 📊 **Statistiques** par catégorie d'incident
- 🔍 **Recherche** et filtres par zone géographique

Aucun serveur, aucune dépendance Node, aucune clé API. Un seul fichier HTML à héberger.

## 🌐 Démo en ligne

👉 **https://gunout.github.io/infotraffic-Reunion-crgt/**

## ✨ Fonctionnalités

| Fonctionnalité | Description |
|---|---|
| 📹 Webcams live | 18 caméras DRR avec navigation précédent/suivant |
| 🖥️ Plein écran | Mode plein écran pour la webcam active |
| ⌨️ Raccourcis clavier | ← → pour naviguer, Espace pour actualiser |
| ⚠️ Incidents temps réel | Données OpenEventDatabase actualisées toutes les 60 s |
| 🗺️ Carte interactive | Leaflet + OpenStreetMap, marqueurs cliquables |
| 🔴 Marqueurs enrichis | Icônes colorées par catégorie + popups détaillées |
| 🎯 Filtres | Par catégorie (accident, travaux, bouchon…) et zone |
| 🔍 Recherche | Recherche textuelle sur les caméras |
| 📊 Statistiques | Compteurs par catégorie d'incident |
| 📱 Responsive | Mobile 320px → 4K, paysage et portrait |
| ♿ Accessible | Focus visible, contraste AA, prefers-reduced-motion |
| ⚡ Rafraîchissement intelligent | Webcam mise à jour uniquement si visible |
| 🚀 Zéro dépendance | Pas de backend, pas d'API Key, pas de build |

## 🏗️ Architecture

Le navigateur interroge directement trois services publics :

- **OpenEventDatabase** (HTTPS, JSON, sans clé) → Incidents temps réel
- **OpenStreetMap** (HTTPS, tuiles PNG, sans clé) → Fond de carte
- **infotrafic.re** (HTTPS, images JPEG) → Webcams DRR

Aucun serveur intermédiaire. Aucun proxy. Aucun `server.js`.

## 🚀 Installation

### Cloner le dépôt

    git clone https://github.com/gunout/infotraffic-Reunion-crgt.git
    cd infotraffic-Reunion-crgt

### Lancer en local

    python3 -m http.server 8000

Puis ouvrez **http://localhost:8000**

> ⚠️ Ne pas ouvrir `index.html` en double-clic (`file://`) : les navigateurs bloquent les requêtes `fetch()` vers HTTPS depuis `file://`.

## 📦 Déploiement

### GitHub Pages (recommandé)

    git add index.html favicon.ico region-reunion-logo.png
    git commit -m "Update index.html"
    git push origin main

Activez GitHub Pages dans **Settings → Pages → Deploy from a branch → main / root**.

URL finale : `https://VOTRE_USERNAME.github.io/infotraffic-Reunion-crgt/`

### Netlify / Cloudflare Pages / Vercel

Glissez le dossier sur [app.netlify.com/drop](https://app.netlify.com/drop), ou connectez le dépôt GitHub. Configuration : framework `None`, build vide, output `/`.

## 🌐 Sources de données

| Source | Type | URL | Clé requise |
|---|---|---|---|
| OpenEventDatabase | Incidents temps réel | [api.openeventdatabase.org](https://api.openeventdatabase.org/) | ❌ Non |
| OpenStreetMap | Tuiles de carte | [tile.openstreetmap.org](https://tile.openstreetmap.org/) | ❌ Non |
| InfoTrafic 974 / DRR | Webcams | [infotrafic.re](https://www.infotrafic.re/) | ❌ Non |

### OpenEventDatabase

    const OEDB_API = 'https://api.openeventdatabase.org/event';
    const REUNION_BBOX = '55.2,-21.4,55.9,-20.8';

### OpenStreetMap

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    });

## 📱 Responsive

| Breakpoint | Cible | Comportement |
|---|---|---|
| < 360px | Petits mobiles | Contrôles en grille 2×2, tab text masqué |
| 360-480px | Mobiles standards | Webcam ratio 4/3, touch targets 44px |
| 480-899px | Grands mobiles / tablettes | Sidebar sous le contenu, ratio 16/9 |
| 900-1400px | Desktop | Grille 2 colonnes, sidebar 380px |
| 1400-2000px | Grand écran | Espacements clamp(), webcam 480-720px |
| > 2000px | 4K / Ultra-wide | Container max 1800px, carte 600px |
| Paysage mobile | max-height: 500px | Webcam et carte prennent 60-70vh |

Techniques : `clamp()`, `aspect-ratio`, `dvh`, `auto-fit minmax()`, mobile-first, `prefers-reduced-motion`, `prefers-color-scheme`.

## 📁 Structure du projet

    infotraffic-Reunion-crgt/
    ├── index.html                 # Application complète (HTML + CSS + JS)
    ├── favicon.ico                # Favicon
    ├── region-reunion-logo.png    # Logo Région Réunion
    └── README.md                  # Ce fichier

Pas de `package.json`, pas de `node_modules`, pas de `server.js`.

## 🎨 Personnalisation

### Ajouter une webcam

Dans `index.html`, tableau `WEBCAMS` :

    {
      id: 'dec_XX',
      name: 'RN1 Nouvelle — Webcam',
      url: 'https://www.infotrafic.re/CAM/dec_XX.jpeg',
      coords: [-21.0000, 55.5000],
      zone: 'Sud',
      desc: 'Nouvelle webcam'
    }

### Ajouter une catégorie d'incident

Dans `CATEGORIES` :

    {
      id: 'nouvelle_categorie',
      name: 'Nouveaux',
      color: '#FF00FF',
      icon: 'star'
    }

### Changer l'intervalle de rafraîchissement

    setInterval(loadAllData, 60000);                    // Incidents : 60 s
    setInterval(() => loadWebcam(currentIndex), 15000); // Webcams : 15 s

## ⚡ Performances

- Un seul fichier — aucune requête bloquante
- Lazy loading — webcam mise à jour uniquement si visible (`IntersectionObserver`)
- Cache navigateur — images webcam horodatées (`?t=Date.now()`)
- Pas de framework — ~40 KB de JS vanilla, pas de build
- Tuiles OSM — CDN mondial, chargement parallèle

## ♿ Accessibilité

- Contraste AA respecté (WCAG 2.1)
- Focus visible sur tous les éléments interactifs
- Touch targets 44px minimum
- `prefers-reduced-motion` respecté
- Navigation clavier complète (← → Espace)
- Sémantique HTML5 (`<header>`, `<main>`, `<aside>`, `<footer>`)

## ❓ FAQ

**La carte ne s'affiche pas ?**
Vérifiez votre connexion à `tile.openstreetmap.org`. Aucune clé API n'est requise.

**Les incidents n'apparaissent pas ?**
Ouvrez la console (F12). Si vous voyez des erreurs CORS, assurez-vous d'être en `http://` (pas `file://`). L'API OEDB peut être temporairement indisponible.

**Les webcams affichent « Caméra non disponible » ?**
Les serveurs DRR peuvent être en maintenance, ou les URL `dec_XX.jpeg` protégées par Referer. Un bouton « Ouvrir InfoTrafic 974 » permet d'y accéder directement.

**Puis-je héberger ce projet commercialement ?**
Le code est sous licence MIT (usage libre). Les données (webcams DRR, OEDB) appartiennent à leurs émetteurs — vérifiez leurs conditions.

**Comment ajouter une PWA ?**
Ajoutez un `manifest.json` et un service worker. Le HTML est déjà compatible.

## 🤝 Contribuer

1. Forkez le dépôt
2. Créez une branche (`git checkout -b feature/ma-fonctionnalite`)
3. Committez (`git commit -m "Ajout de ma fonctionnalité"`)
4. Poussez (`git push origin feature/ma-fonctionnalite`)
5. Ouvrez une Pull Request

Idées d'amélioration : PWA (manifest + service worker), DATEX II / GTFS-RT, mode clair (`prefers-color-scheme: light`), filtres avancés, notifications push.

## 📄 Licence

Distribué sous licence **MIT**. Voir [LICENSE](LICENSE).

**Avertissement** : ce projet n'est pas affilié à la DRR, la Région Réunion, InfoTrafic 974, ni OpenEventDatabase. Les données proviennent de sources publiques et sont fournies à titre indicatif. Ne vous fiez pas à ces informations pour des décisions critiques.

## 🙏 Remerciements

- [D.E.E.R. / DRR La Réunion](https://www.infotrafic.re/) — webcams publiques
- [OpenEventDatabase](https://api.openeventdatabase.org/) — API incidents
- [OpenStreetMap](https://www.openstreetmap.org/) — fond de carte
- [Leaflet](https://leafletjs.com/) — bibliothèque cartographique
- [Google Fonts](https://fonts.google.com/) — Inter et JetBrains Mono

---

<div align="center">

**⭐ Si ce projet vous est utile, laissez une étoile sur GitHub !**

[🔝 Retour en haut](#-infotrafic-réunion)

</div>

---

<div align="center">

### 🇫🇷 Gunout · 2026

![Made in France](https://img.shields.io/badge/Made_in-France-002395?style=flat-square&labelColor=FFFFFF&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA5MDAgNjAwIj48cmVjdCB3aWR0aD0iOTAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iIzAwMjM5NSIvPjxyZWN0IHdpZHRoPSI5MDAiIGhlaWdodD0iNDAwIiB5PSIxMDAiIGZpbGw9IiNmZmYiLz48cmVjdCB3aWR0aD0iOTAwIiBoZWlnaHQ9IjIwMCIgeT0iNDAwIiBmaWxsPSIjZWQyOTM5Ii8+PC9zdmc+)
![GitHub](https://img.shields.io/badge/GitHub-gunout-181717?style=flat-square&logo=github&logoColor=white)
![Year](https://img.shields.io/badge/2026-ED2939?style=flat-square&labelColor=FFFFFF)

<sub>© 2026 <strong>Gunout</strong> — Tous droits réservés.</sub>

</div>
