// server.js - Serveur d'incidents et statistiques en direct pour Infotrafic Réunion
// Écoute sur le port 3000 (conformément à la configuration Caddy)
// Génère des données réalistes pour La Réunion

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000; // Port attendu par le reverse_proxy de Caddy

// Middleware CORS (peut être conservé, Caddy ajoute déjà les en-têtes)
app.use(cors());

// ============================================
// GÉNÉRATEUR DE DONNÉES ALÉATOIRES (simule le direct)
// ============================================

// Catégories et leurs couleurs (reprise du frontend)
const CATEGORIES = [
  { id: 'accident', name: 'Accidents', color: '#ED2939', icon: 'warning' },
  { id: 'traffic_jam', name: 'Bouchons', color: '#FFA500', icon: 'traffic' },
  { id: 'roadworks', name: 'Travaux', color: '#002654', icon: 'construction' },
  { id: 'trafficolor', name: 'Trafic', color: '#00CED1', icon: 'speed' },
  { id: 'serious_hazard', name: 'Dangers graves', color: '#8B0000', icon: 'dangerous' },
  { id: 'hazard', name: 'Dangers', color: '#FF4500', icon: 'warning' },
  { id: 'roadclosure', name: 'Fermetures', color: '#000000', icon: 'block' },
  { id: 'flood', name: 'Inondations', color: '#00CED1', icon: 'water' },
  { id: 'market', name: 'Marchés', color: '#FFD700', icon: 'shopping_cart' },
  { id: 'local_event', name: 'Événements', color: '#9370DB', icon: 'event' },
  { id: 'animal', name: 'Animaux', color: '#8B4513', icon: 'pets' }
];

// Liste de positions (coordonnées) autour de l'île
const LOCATIONS = [
  { name: 'Saint-Denis', lat: -20.8821, lng: 55.4503 },
  { name: 'Saint-Paul', lat: -21.0034, lng: 55.2756 },
  { name: 'Saint-Pierre', lat: -21.3345, lng: 55.4789 },
  { name: 'Le Port', lat: -20.9367, lng: 55.2961 },
  { name: 'Saint-Louis', lat: -21.2867, lng: 55.4212 },
  { name: 'Saint-Benoît', lat: -21.0333, lng: 55.7167 },
  { name: 'Saint-André', lat: -20.9667, lng: 55.65 },
  { name: 'La Possession', lat: -20.9167, lng: 55.3333 },
  { name: 'Sainte-Marie', lat: -20.8969, lng: 55.5501 },
  { name: 'Trois-Bassins', lat: -21.0812, lng: 55.2598 }
];

// Routes principales
const ROADS = ['RN1', 'RN2', 'RN3', 'RN4', 'Route du Littoral', 'Route des Tamarins'];

// Génère un nombre aléatoire entre min et max
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Génère une description réaliste selon la catégorie
function generateDescription(categoryId) {
  const desc = {
    accident: 'Collision entre deux véhicules légers',
    traffic_jam: 'Ralentissement important',
    roadworks: 'Travaux de nuit',
    trafficolor: 'Vitesse fluide',
    serious_hazard: 'Obstacle sur la chaussée',
    hazard: 'Chaussée glissante',
    roadclosure: 'Route barrée',
    flood: 'Inondation localisée',
    market: 'Marché forain en cours',
    local_event: 'Manifestation sportive',
    animal: 'Animaux errants'
  };
  return desc[categoryId] || 'Incident signalé';
}

// Génère un titre selon la catégorie
function generateTitle(categoryId) {
  const titles = {
    accident: 'Accident',
    traffic_jam: 'Bouchon',
    roadworks: 'Travaux',
    trafficolor: 'Info trafic',
    serious_hazard: 'Danger grave',
    hazard: 'Danger',
    roadclosure: 'Fermeture',
    flood: 'Inondation',
    market: 'Marché',
    local_event: 'Événement',
    animal: 'Animaux'
  };
  return titles[categoryId] || 'Incident';
}

// Génère une donnée de type "trafficolor" spécifique (avec vitesse)
function generateTrafficolor() {
  const location = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
  const speed = randomInt(20, 110); // km/h
  let color = '#77F362';
  if (speed <= 50) color = '#ED2939';
  else if (speed <= 80) color = '#EE7E33';

  return {
    unique_disruption_number: `TRAF-${Date.now()}-${randomInt(100,999)}`,
    public_description: {
      fr: `Circulation ${speed < 30 ? 'très dense' : (speed < 60 ? 'dense' : 'fluide')} - ${speed} km/h`,
      en: `${speed} km/h`
    },
    address: `${location.name}, La Réunion`,
    geolocation: [[location.lng, location.lat]],
    source: 'Labocom',
    trafficolor: color,
    speed: speed
  };
}

// Génère un incident standard (toutes catégories sauf trafficolor)
function generateIncident(categoryId) {
  const location = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
  const road = ROADS[Math.floor(Math.random() * ROADS.length)];
  const now = new Date();
  const time = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

  return {
    title: `${generateTitle(categoryId)} sur ${road}`,
    description: generateDescription(categoryId),
    location: `${location.name} (${road})`,
    road: road,
    time: time,
    coordinates: [location.lat, location.lng],
    source: 'Infotrafic Réunion'
  };
}

// Génère un jeu de données complet
function generateAllData() {
  const data = {
    trafficolor: [],
    accident: [],
    traffic_jam: [],
    roadworks: [],
    serious_hazard: [],
    hazard: [],
    roadclosure: [],
    flood: [],
    market: [],
    local_event: [],
    animal: []
  };

  const details = {};

  // Générer entre 2 et 5 trafficolor
  const trafficolorCount = randomInt(2, 5);
  for (let i = 0; i < trafficolorCount; i++) {
    data.trafficolor.push(generateTrafficolor());
  }
  details.trafficolor = trafficolorCount;

  // Pour chaque autre catégorie, générer entre 0 et 3 incidents
  CATEGORIES.forEach(cat => {
    if (cat.id === 'trafficolor') return;
    const count = randomInt(0, 3);
    details[cat.id] = count;
    for (let i = 0; i < count; i++) {
      data[cat.id].push(generateIncident(cat.id));
    }
  });

  return { data, details };
}

// ============================================
// ENDPOINTS API
// ============================================

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, status: 'OK' });
});

// Toutes les données (utilisé par le frontend)
app.get('/api/all', (req, res) => {
  const { data, details } = generateAllData();
  res.json({
    success: true,
    data: data,
    details: details
  });
});

// Statistiques uniquement
app.get('/api/stats', (req, res) => {
  const { details } = generateAllData();
  // Compter le total
  const total = Object.values(details).reduce((a, b) => a + b, 0);
  res.json({
    success: true,
    total: total,
    stats: details
  });
});

// Endpoint spécifique pour les accidents (fallback)
app.get('/api/accident', (req, res) => {
  const count = randomInt(0, 3);
  const accidents = [];
  for (let i = 0; i < count; i++) {
    accidents.push(generateIncident('accident'));
  }
  res.json(accidents);
});

// Endpoint spécifique pour les travaux (fallback)
app.get('/api/roadworks', (req, res) => {
  const count = randomInt(0, 3);
  const roadworks = [];
  for (let i = 0; i < count; i++) {
    roadworks.push(generateIncident('roadworks'));
  }
  res.json(roadworks);
});

// ============================================
// LANCEMENT DU SERVEUR (écoute sur 0.0.0.0:3000)
// ============================================
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Serveur d'infotrafic démarré sur http://0.0.0.0:${PORT}`);
  console.log(`📡 Endpoints disponibles :`);
  console.log(`   - /api/health`);
  console.log(`   - /api/all`);
  console.log(`   - /api/stats`);
  console.log(`   - /api/accident`);
  console.log(`   - /api/roadworks`);
});
