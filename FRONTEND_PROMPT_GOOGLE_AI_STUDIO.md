# Prompt Google AI Studio - Génération du frontend Compañeros-JBK Empire

Utilise ce document comme prompt principal dans Google AI Studio pour générer le frontend du nouveau site moderne de `Compañeros-JBK Empire`.

## Contexte du projet

Je veux créer un site vitrine moderne pour `Compañeros-JBK Empire`, une structure qui présente deux entreprises complémentaires :

1. `COMPAÑEROS & SERVICES`
   - Accompagnement pour les voyages.
   - Cours de langues nationales et internationales.
   - Préparation aux concours.
   - Traduction et interprétation.
   - Cours de soutien scolaire et universitaire.
   - Activités culturelles : danse, guitare, piano.

2. `JBK & SERVICES`
   - Production audiovisuelle.
   - Maison de production JBK Films.
   - Services créatifs et graphiques.
   - Couverture d'événements.
   - Création de sites internet.
   - Doublage, sous-titrage et voix off.
   - Pilotage de drones.
   - Formation audiovisuelle.
   - Événementiel.
   - Agence d'acteurs.
   - JBK Shop.

Le site doit rendre très claire cette double identité. L'accueil doit présenter `Compañeros-JBK Empire` comme un écosystème commun, puis orienter vers les deux pôles.

## Objectif du frontend

Créer un site moderne, professionnel, responsive et visuel, prêt à être intégré dans une application web.

Le site doit :

- être élégant, clair et crédible ;
- présenter les deux entreprises sans les mélanger ;
- utiliser beaucoup d'images mais de façon maîtrisée ;
- mettre en avant les services ;
- faciliter la prise de contact par WhatsApp, téléphone, email et formulaire ;
- avoir une navigation simple ;
- être adapté mobile, tablette et desktop.

## Stack souhaitée

Génère le frontend avec :

- React
- TypeScript si possible
- Tailwind CSS
- Composants réutilisables
- Données séparées dans des tableaux/objets JS ou TS
- Design responsive mobile-first

Si tu génères une app complète, utilise une structure simple :

```text
src/
  App.tsx
  main.tsx
  data/
    siteData.ts
  components/
    Header.tsx
    Footer.tsx
    Hero.tsx
    ServiceCard.tsx
    SectionTitle.tsx
    ImageGrid.tsx
    ContactSection.tsx
    PartnerGrid.tsx
  pages/
    HomePage.tsx
    CompanerosPage.tsx
    JbkPage.tsx
    AboutPage.tsx
    ContactPage.tsx
```

Si tu ne peux générer qu'un seul fichier, crée un frontend React complet dans `App.tsx` avec des composants internes bien organisés.

## Direction artistique

Le design doit être moderne, premium et professionnel, mais pas trop luxueux.

### Ambiance globale

- Sérieux
- Humain
- Dynamique
- International
- Créatif
- Institutionnel mais accessible

### Style visuel

- Layout clair avec beaucoup d'espace.
- Navigation sticky.
- Hero visuel avec photo de fond ou grande image.
- Deux grandes entrées visuelles pour les deux entreprises.
- Sections en bandes pleine largeur.
- Cartes simples pour les services.
- Grilles d'images pour JBK.
- Accordéons ou blocs condensés pour les contenus longs.
- Footer complet avec coordonnées.

### Palette recommandée

Utiliser une palette sobre avec deux identités :

- Base commune : blanc, gris très clair, noir doux, bleu nuit.
- Compañeros : bleu, vert, cyan ou turquoise pour évoquer accompagnement, voyage et éducation.
- JBK : rouge profond, doré, noir ou violet discret pour évoquer cinéma, création et énergie.

Ne pas faire un site dominé par une seule couleur. Les deux univers doivent être distinguables.

### Typographie

- Titres forts, modernes et lisibles.
- Texte courant clair, aéré.
- Éviter les titres trop longs en très grande taille.
- Pas de textes qui débordent sur mobile.

## Assets disponibles

Les images sont organisées dans le projet local.

Images par page :

```text
organized-content/01-accueil/images/
organized-content/02-companeros-services/images/
organized-content/03-jbk-services/images/
organized-content/04-a-propos/images/
organized-content/05-temoignages/images/
organized-content/06-contact/images/
organized-content/07-partenaires-1/images/
organized-content/08-services-companeros-service-de-traduction-interpretation/images/
organized-content/09-services-companeros-preparation-concours/images/
organized-content/10-services-companeros-cours-de-langues-nationales-internationales/images/
organized-content/11-services-companeros-suivis-de-voyages/images/
organized-content/12-services-companeros-cours-de-soutien/images/
```

Utilisation recommandée :

- Accueil : utiliser les images de `01-accueil/images`.
- Compañeros : utiliser `02-companeros-services/images` et les images des sous-services.
- JBK : utiliser surtout `03-jbk-services/images`, car cette page contient beaucoup d'images adaptées à un univers visuel.
- Partenaires : utiliser `07-partenaires-1/images`.
- Témoignages : utiliser `05-temoignages/images`.

Si les chemins locaux ne peuvent pas être utilisés directement, créer des placeholders cohérents dans le code avec des noms clairs comme :

```ts
const images = {
  hero: "/images/companeros-jbk-hero.jpg",
  companeros: "/images/companeros-service.jpg",
  jbk: "/images/jbk-production.jpg",
};
```

## Pages à générer

Créer au minimum les sections/pages suivantes.

## 1. Page Accueil

### Objectif

Présenter `Compañeros-JBK Empire` comme une structure commune avec deux pôles.

### Structure

1. Header sticky
2. Hero principal
3. Deux grandes cartes d'entrée : `COMPAÑEROS & SERVICES` et `JBK & SERVICES`
4. Section `Qui sommes-nous ?`
5. Aperçu des services Compañeros
6. Aperçu des services JBK
7. Témoignages courts
8. Partenaires
9. CTA contact
10. Footer

### Texte hero

Titre :

```text
Compañeros-JBK Empire
```

Sous-titre :

```text
Deux pôles complémentaires pour accompagner vos projets : formation, voyages, langues, traduction, production audiovisuelle, événementiel et services créatifs.
```

CTA :

```text
Découvrir Compañeros
Découvrir JBK
Nous contacter
```

### Section double entrée

Carte 1 :

```text
COMPAÑEROS & SERVICES
Accompagnement voyage, langues, concours, traduction et soutien scolaire.
Bouton : Voir les services Compañeros
```

Carte 2 :

```text
JBK & SERVICES
Production audiovisuelle, événementiel, communication, formation cinéma et boutique.
Bouton : Voir les services JBK
```

## 2. Page / section Compañeros & Services

### Objectif

Présenter Compañeros comme un centre d'accompagnement, de formation et de services éducatifs.

### Texte d'introduction

```text
Compañeros est un centre créé en 2013, spécialisé dans les suivis de voyages, les cours de langues, la préparation aux concours, la traduction, les cours de soutien et les activités culturelles.
```

### Services à afficher en cartes

1. Suivis de voyages
   - Études, travail, tourisme, immigration, sport, volontariat, assistance visa et assistance bourse.
   - CTA : `Préparer mon voyage`

2. Préparation concours
   - ENS, Gendarmerie, Police, Douane, IDE et autres concours.
   - CTA : `Voir les programmes`

3. Cours de langues nationales et internationales
   - Langues nationales camerounaises, anglais, espagnol, chinois, français, russe, portugais, italien.
   - CTA : `Choisir une langue`

4. Traduction & interprétation
   - Traduction simple, traduction assermentée, interprétation et traduction express.
   - CTA : `Demander un devis`

5. Cours de soutien
   - Maths, physique-chimie, anglais, français, allemand, espagnol, SVT, soutien universitaire.
   - CTA : `Inscrire un élève`

6. Activités culturelles
   - Danse, guitare, piano, flamenco et camps de vacances.
   - CTA : `Découvrir les activités`

### Section rendez-vous

Titre :

```text
Prendre rendez-vous avec Compañeros
```

Texte :

```text
Vous pouvez prendre rendez-vous pour une consultation, le suivi d'un dossier ou une inscription aux cours. Indiquez le jour et l'heure souhaités, ou contactez directement l'équipe par téléphone.
```

CTA :

```text
Prendre rendez-vous
Écrire sur WhatsApp
```

## 3. Sous-section Suivis de voyages

Cette section peut apparaître dans la page Compañeros, ou devenir une page dédiée.

### Message principal

```text
Un voyage réussi commence par une bonne préparation. Compañeros vous accompagne dans les étapes importantes de votre dossier avant la demande de visa.
```

### Étapes à afficher

- Choix des universités ou structures adaptées.
- Informations sur les périodes d'inscription.
- Demande d'admission.
- Préinscription et inscription.
- Homologation ou équivalence.
- Légalisation des documents.
- Traduction simple ou assermentée.
- Réservation de billet et logement.
- Assurance maladie et assurance vol.
- Conseils de voyage.
- Préparation à l'entretien consulaire.

### Types de projets

- Études
- Travail
- Tourisme
- Immigration
- Sport
- Volontariat
- Assistance visa
- Assistance bourse

### Design

Utiliser une timeline ou une grille d'étapes.

## 4. Sous-section Cours de langues

### Message principal

```text
Compañeros propose des cours de langues nationales camerounaises et de langues internationales, en présentiel, à domicile ou en ligne.
```

### Langues nationales

Mettre en avant :

- transmission de l'héritage culturel ;
- cours oraux et écrits ;
- objectif de pratique courante ;
- enseignants qualifiés ;
- cours à domicile, en présentiel ou en ligne.

### Langues internationales

Afficher sous forme de badges :

- Anglais
- Espagnol
- Chinois
- Français
- Russe
- Portugais
- Italien

## 5. Sous-section Traduction & interprétation

### Contenu

```text
La traduction simple est livrée en 3 jours ouvrables pour les documents de moins de 5 pages. La traduction assermentée est livrée en 7 jours ouvrables pour les documents de moins de 5 pages. Les documents plus longs et les demandes express sont traités sur arrangement.
```

### CTA

- `Demander un devis`
- `Envoyer mon document`

## 6. Sous-section Cours de soutien

### Contenu

Compañeros propose des cours pour les classes d'examen et les étudiants.

Matières :

- Mathématiques
- Physique-chimie
- Anglais
- Français
- Allemand
- Espagnol
- SVT

Tarifs à afficher avec prudence :

- 10.000 F CFA / mois par matière.
- Forfait 3 matières : 25.000 F CFA / mois.
- Pour étudiants : 3.000 F CFA / mois par UE.
- Forfait 3 UE : 10.000 F CFA / mois.

Ajouter une mention :

```text
Les tarifs peuvent être confirmés lors de la prise de contact.
```

## 7. Page / section JBK & Services

### Objectif

Présenter JBK comme un pôle audiovisuel, créatif et événementiel.

### Texte d'introduction

```text
JBK Films est une maison de production fondée en 2011 par le réalisateur, producteur et acteur Banderas Kouam. La structure réunit une équipe de production et une agence d'acteurs pour accompagner les projets audiovisuels au Cameroun et à l'international.
```

### Sections à afficher

1. À propos de JBK
2. Direction JBK Films
3. Services JBK
4. Événementiel
5. Équipe technique & agence d'acteurs
6. Productions
7. JBK Ciné Études
8. JBK Shop
9. Demander un service

### Services JBK à afficher

- Services graphiques, impressions et agrandissements photos.
- Couverture d'événements.
- Création de sites internet.
- Doublage films et sous-titrages.
- Voix off.
- Pilotage de drones.
- Vente de matériels audio-visuels.
- Conception et réalisation de publicités.
- Communication web.
- Formation audio-visuelle.

### Événementiel

Afficher en cartes :

- Décoration
- Musique personnalisée
- Surprise events
- Make up
- Wedding planner
- Shooting photos

### Productions

Créer une galerie avec catégories :

- Courts métrages
- Longs métrages
- Séries
- Top productions

### JBK Shop

Afficher une section catalogue simple :

- Survêtements
- Maillots
- Maillots professionnels
- Polos et t-shirts imprimables
- Godasses
- Matériels de sport

CTA :

```text
Voir le catalogue
Commander sur WhatsApp
```

## 8. Section Direction / équipe

Créer une grille de profils.

Profils principaux :

- Banderas Kouam : Président Directeur Général, fondateur de JBK.
- Faddel Emvoutou : Directeur Administratif.
- Frank Verdugo : Responsable Administratif.
- N-KY : Assistant de Direction.
- M.D : Assistante de Direction.
- Gloriana Bintu : Assistante de Direction.
- Setchuis : Assistante de Direction.

Pour les autres membres, créer une section `Équipe technique & talents` avec cartes plus compactes.

## 9. Page À propos

### Objectif

Présenter l'histoire et la vision commune.

### Contenu

```text
Compañeros-JBK Empire est né de la complémentarité entre Compañeros, orienté accompagnement, formation et voyages, et JBK, orienté production audiovisuelle, services créatifs et événementiel. Ensemble, les deux pôles proposent des services utiles aux particuliers, étudiants, familles, artistes, entreprises et porteurs de projets.
```

### Sections

- Histoire du groupe
- Deux pôles complémentaires
- Vision
- Valeurs
- Contact

Valeurs :

- Accompagnement
- Créativité
- Professionnalisme
- Innovation
- Proximité

## 10. Page Partenaires

### Objectif

Afficher les partenaires et encourager les collaborations.

### Partenaires extraits

- Paduk
- EFA Flamenco
- Fundación Lengua
- Partenaires Facebook présents dans les images/liens

### Structure

- Intro courte
- Grille de logos/images
- CTA `Devenir partenaire`

## 11. Page Contact

### Coordonnées

Afficher clairement :

```text
Téléphone / WhatsApp : +237 678 032 746 / 698 058 931 / 698 329 535
Email : jbkfilms2014@gmail.com
Adresse : Carrefour Cradat - Rue pavés 3744, en face de l'auto école Kassap
Horaires : Lundi au Vendredi - de 8h00 à 19h00
```

### Formulaire

Champs :

- Nom complet
- Téléphone
- Email
- Service demandé
- Message

Options du champ `Service demandé` :

- Compañeros - Voyage
- Compañeros - Cours de langues
- Compañeros - Concours
- Compañeros - Traduction
- Compañeros - Cours de soutien
- JBK - Audiovisuel
- JBK - Événementiel
- JBK - Shop
- Partenariat
- Autre

CTA :

- `Envoyer le message`
- `Écrire sur WhatsApp`

## Header

Le header doit contenir :

- Logo texte : `Compañeros-JBK Empire`
- Navigation :
  - Accueil
  - Compañeros
  - JBK
  - À propos
  - Partenaires
  - Contact
- Bouton visible : `WhatsApp`

Sur mobile :

- menu hamburger ;
- navigation plein écran ou panneau latéral ;
- bouton WhatsApp visible.

## Footer

Le footer doit contenir :

- nom du groupe ;
- courte description ;
- liens rapides ;
- coordonnées ;
- horaires ;
- bouton WhatsApp ;
- copyright.

Texte copyright :

```text
© 2026 Compañeros-JBK Empire. Tous droits réservés.
```

## Composants attendus

Créer idéalement ces composants :

- `Header`
- `Footer`
- `Hero`
- `DualBusinessCards`
- `ServiceCard`
- `SectionTitle`
- `ImageGrid`
- `TeamGrid`
- `PartnerGrid`
- `ContactSection`
- `WhatsAppButton`
- `CTASection`
- `StatsBand`

## Interactions souhaitées

- Smooth scroll entre sections.
- Boutons WhatsApp avec lien :

```text
https://wa.me/237678032746
```

- Cartes services avec hover subtil.
- Galerie JBK responsive.
- Accordéons pour les longues listes, notamment destinations et services détaillés.
- Header sticky avec changement léger au scroll si possible.

## Données à coder

Prévoir un objet de données pour les services Compañeros :

```ts
const companerosServices = [
  {
    title: "Suivis de voyages",
    description: "Études, travail, tourisme, immigration, sport, volontariat, visa et bourse.",
    cta: "Préparer mon voyage"
  },
  {
    title: "Préparation concours",
    description: "ENS, Gendarmerie, Police, Douane, IDE et autres concours.",
    cta: "Voir les programmes"
  },
  {
    title: "Cours de langues",
    description: "Langues nationales camerounaises et langues internationales.",
    cta: "Choisir une langue"
  },
  {
    title: "Traduction & interprétation",
    description: "Traduction simple, assermentée, express et interprétation.",
    cta: "Demander un devis"
  },
  {
    title: "Cours de soutien",
    description: "Renforcement scolaire et universitaire pour élèves et étudiants.",
    cta: "Inscrire un élève"
  }
];
```

Prévoir un objet de données pour les services JBK :

```ts
const jbkServices = [
  "Services graphiques et impressions",
  "Couverture d'événements",
  "Création de sites internet",
  "Doublage et sous-titrage",
  "Voix off",
  "Pilotage de drones",
  "Vente de matériels audio-visuels",
  "Publicités",
  "Communication web",
  "Formation audio-visuelle"
];
```

## Contraintes de qualité

Le résultat doit :

- être responsive ;
- ne pas déborder sur mobile ;
- avoir une hiérarchie claire ;
- éviter les textes trop longs visibles d'un seul bloc ;
- utiliser des images avec `object-cover` et ratios stables ;
- avoir des boutons visibles ;
- avoir des contrastes lisibles ;
- éviter les effets excessifs ;
- rester professionnel.

## Ce qu'il faut éviter

- Ne pas créer une simple landing page générique.
- Ne pas mélanger Compañeros et JBK dans les mêmes cartes sans distinction.
- Ne pas faire une interface trop sombre partout.
- Ne pas afficher tous les pays de destination dans une énorme liste ouverte.
- Ne pas afficher les textes brouillons du site original comme le texte générique SITE123.
- Ne pas utiliser de faux boutons qui ne mènent nulle part.
- Ne pas surcharger la page d'accueil.

## Résultat attendu

Génère un frontend complet, moderne et professionnel pour `Compañeros-JBK Empire`, avec :

- une page d'accueil claire ;
- une section/page Compañeros structurée ;
- une section/page JBK très visuelle ;
- une section partenaires ;
- une section contact complète ;
- une navigation responsive ;
- des composants propres ;
- des données facilement modifiables ;
- un design prêt à être amélioré avec les vraies images du dossier `organized-content`.

Le rendu doit donner l'impression d'un vrai site d'entreprise moderne, pas d'une maquette vide.
