import { Component, computed, signal } from '@angular/core';

type EventFilter = 'upcoming' | 'past';
type Language = 'es' | 'en';

interface MusicEvent {
  title: string;
  location: string;
  locationEn: string;
  day: string;
  month: string;
  year: string;
  image: string;
}

interface SiteCopy {
  navEvents: string;
  navExperiences: string;
  navArchive: string;
  navContact: string;
  follow: string;
  heroEyebrow: string;
  heroTitle: string;
  heroAccent: string;
  heroDescription: string;
  heroEvents: string;
  heroAbout: string;
  heroScroll: string;
  introKicker: string;
  introTitle: string;
  introAccent: string;
  introDescription: string;
  introLink: string;
  stats: string[];
  agendaKicker: string;
  agendaTitle: string;
  agendaAccent: string;
  upcomingFilter: string;
  pastFilter: string;
  upcomingTag: string;
  pastTag: string;
  infoAria: string;
  archiveKicker: string;
  archiveTitle: string;
  archiveAccent: string;
  archiveDescription: string;
  gallery: string;
  contactKicker: string;
  contactTitle: string;
  contactAccent: string;
  contactDescription: string;
  comingSoon: string;
  footerLine: string;
}

const SITE_COPY: Record<Language, SiteCopy> = {
  es: {
    navEvents: 'Eventos', navExperiences: 'Experiencias', navArchive: 'Archivo', navContact: 'Contacto', follow: 'Síguenos',
    heroEyebrow: 'Música que se vive', heroTitle: 'Momentos que', heroAccent: 'se quedan', heroDescription: 'Creamos experiencias musicales que conectan personas, energía y escenarios. Descubre lo que viene con GM Music.', heroEvents: 'Ver próximos eventos', heroAbout: 'Conoce GM Music', heroScroll: 'Desliza para explorar',
    introKicker: '01 / Nuestra esencia', introTitle: 'Donde la música encuentra', introAccent: 'su momento.', introDescription: 'GM Music nace para llevar la energía de la música a espacios memorables. Diseñamos encuentros con una curaduría cuidada, producción impecable y una vibra que se siente desde el primer beat.', introLink: 'Hablemos de tu próximo evento', stats: ['Una comunidad|en movimiento', 'Posibilidades|para celebrar', 'Pasión por crear|momentos únicos'],
    agendaKicker: '02 / La agenda', agendaTitle: 'Próximos', agendaAccent: 'eventos', upcomingFilter: 'Próximos', pastFilter: 'Pasados', upcomingTag: 'Próximamente', pastTag: 'Archivo GM', infoAria: 'Solicitar información sobre',
    archiveKicker: '03 / Lo que hemos vivido', archiveTitle: 'La noche termina.', archiveAccent: 'La historia no.', archiveDescription: 'Un vistazo a la energía que compartimos en cada encuentro. Muy pronto podrás explorar el archivo completo de eventos GM Music.', gallery: 'Ver galería',
    contactKicker: '04 / Mantente cerca', contactTitle: 'La próxima experiencia empieza', contactAccent: 'aquí.', contactDescription: 'Conecta con GM Music para conocer fechas, colaboraciones y todo lo que estamos preparando.', comingSoon: 'Próximamente', footerLine: 'Hecho para vivir la música.',
  },
  en: {
    navEvents: 'Events', navExperiences: 'Experiences', navArchive: 'Archive', navContact: 'Contact', follow: 'Follow us',
    heroEyebrow: 'Music you can feel', heroTitle: 'Moments that', heroAccent: 'stay', heroDescription: 'We create musical experiences that connect people, energy and spaces. Discover what is next with GM Music.', heroEvents: 'See upcoming events', heroAbout: 'Meet GM Music', heroScroll: 'Scroll to explore',
    introKicker: '01 / Our essence', introTitle: 'Where music finds', introAccent: 'its moment.', introDescription: 'GM Music was born to bring the energy of music into memorable spaces. We design gatherings with thoughtful curation, flawless production and a vibe you can feel from the first beat.', introLink: 'Let’s talk about your next event', stats: ['A community|in motion', 'Endless ways|to celebrate', 'A passion for creating|unique moments'],
    agendaKicker: '02 / The agenda', agendaTitle: 'Upcoming', agendaAccent: 'events', upcomingFilter: 'Upcoming', pastFilter: 'Past events', upcomingTag: 'Coming soon', pastTag: 'GM Archive', infoAria: 'Request information about',
    archiveKicker: '03 / What we have lived', archiveTitle: 'The night ends.', archiveAccent: 'The story does not.', archiveDescription: 'A glimpse into the energy we share at every gathering. Soon you will be able to explore the complete GM Music event archive.', gallery: 'View gallery',
    contactKicker: '04 / Stay close', contactTitle: 'Your next experience starts', contactAccent: 'here.', contactDescription: 'Connect with GM Music for dates, collaborations and everything we are preparing.', comingSoon: 'Coming soon', footerLine: 'Made to live the music.',
  },
};

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly menuOpen = signal(false);
  protected readonly eventFilter = signal<EventFilter>('upcoming');
  protected readonly language = signal<Language>('es');
  protected readonly languagePromptOpen = signal(true);
  protected readonly copy = computed(() => SITE_COPY[this.language()]);
  protected readonly currentYear = new Date().getFullYear();

  constructor() {
    try {
      const storedLanguage = window.localStorage.getItem('gm-music-language');
      if (storedLanguage === 'es' || storedLanguage === 'en') {
        this.language.set(storedLanguage);
        this.languagePromptOpen.set(false);
      }
    } catch {
      // The default Spanish experience remains available if storage is blocked.
    }
  }

  protected readonly upcomingEvents: MusicEvent[] = [
    {
      title: 'Golden Hour Sessions',
      location: 'Ciudad de México · Por anunciar',
      locationEn: 'Mexico City · To be announced',
      day: '18',
      month: 'MAY',
      year: '2026',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=85',
    },
    {
      title: 'GM After Dark',
      location: 'Próxima sede · Mantente atento',
      locationEn: 'Next venue · Stay tuned',
      day: '07',
      month: 'JUN',
      year: '2026',
      image: 'https://images.unsplash.com/photo-1571266028243-d220c9c3b2f2?auto=format&fit=crop&w=1200&q=85',
    },
    {
      title: 'Summer Frequency',
      location: 'Experiencia GM Music · 2026',
      locationEn: 'GM Music experience · 2026',
      day: '12',
      month: 'JUL',
      year: '2026',
      image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd?auto=format&fit=crop&w=1200&q=85',
    },
  ];

  protected readonly pastEvents: MusicEvent[] = [
    {
      title: 'First Beat',
      location: 'Ciudad de México · Archivo 2024',
      locationEn: 'Mexico City · 2024 archive',
      day: '21',
      month: 'SEP',
      year: '2024',
      image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=85',
    },
    {
      title: 'Noche de Oro',
      location: 'CDMX · Archivo 2024',
      locationEn: 'Mexico City · 2024 archive',
      day: '09',
      month: 'NOV',
      year: '2024',
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=85',
    },
    {
      title: 'The Opening',
      location: 'Ciudad de México · Archivo 2024',
      locationEn: 'Mexico City · 2024 archive',
      day: '14',
      month: 'DIC',
      year: '2024',
      image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&w=1200&q=85',
    },
  ];

  protected setFilter(filter: EventFilter): void {
    this.eventFilter.set(filter);
  }

  protected chooseLanguage(language: Language): void {
    this.language.set(language);
    this.languagePromptOpen.set(false);
    try {
      window.localStorage.setItem('gm-music-language', language);
    } catch {
      // Language still changes for the current visit when storage is blocked.
    }
  }

  protected toggleLanguage(): void {
    this.chooseLanguage(this.language() === 'es' ? 'en' : 'es');
  }

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }
}
