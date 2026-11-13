import {
  AfterViewInit,
  Component,
  computed,
  ElementRef,
  HostListener,
  signal,
  ViewChild,
} from '@angular/core';
import {
  featuredPhotoIds,
  galleryPhotos,
  heroPhotoId,
  mediaCategories,
  mediaVideos,
  type GalleryPhoto,
  type MediaCategory,
} from './media-library';

type Language = 'es' | 'en';
type GalleryFilter = MediaCategory | 'todos';
type Film = 'recap' | 'logo';

const SITE_COPY = {
  es: {
    navEvents: 'Eventos',
    navExperiences: 'Experiencias',
    navArchive: 'Galería',
    navContact: 'Contacto',
    follow: 'Síguenos',
    heroEyebrow: 'El escenario. La gente. La música.',
    heroTitle: 'Hay noches que',
    heroAccent: 'se quedan.',
    heroDescription:
      'La energía de estar ahí. La emoción de vivirlo juntos. Así se siente una noche con GM Music.',
    heroGallery: 'Explora la galería',
    heroFilm: 'Revive la noche',
    heroScroll: 'Sigue la experiencia',
    heroLocation: 'Alliant Energy · 7 de noviembre',
    introKicker: '01 / Esto es GM Music',
    introTitle: 'La música nos reúne.',
    introAccent: 'El momento nos conecta.',
    introDescription:
      'Desde el primer acorde hasta la última canción. Artistas, luces y una comunidad que hace de cada encuentro algo especial. Este es nuestro archivo de una noche vivida al máximo.',
    introLink: 'Conoce nuestra identidad',
    photoStat: 'Fotografías de la noche',
    recapStat: 'Video del evento',
    logoStat: 'Identidad en movimiento',
    filmKicker: '02 / Dale play al recuerdo',
    filmTitle: 'Vuelve a',
    filmAccent: 'sentirlo.',
    filmDescription:
      'Un recorrido por la música, el escenario y las personas que hicieron esta noche.',
    filmPlay: 'Reproducir recap',
    eventLabel: 'En nuestro archivo',
    eventTitle: 'Alliant Energy',
    eventDate: '7 de noviembre',
    eventDescription:
      'Una noche de música en vivo, luces y encuentros. Explora las fotografías y revive el video del evento.',
    upcoming: 'Lo que viene',
    upcomingTitle: 'La próxima noche está por escribirse.',
    upcomingDescription: 'Las próximas fechas se anunciarán aquí. Sigue a GM Music para enterarte.',
    galleryKicker: '03 / Nuestro archivo visual',
    galleryTitle: 'La noche termina.',
    galleryAccent: 'La historia no.',
    galleryDescription:
      'Cada imagen, una forma de volver. Explora la colección y descubre los detalles de la noche.',
    photos: 'fotografías',
    allPhotos: 'Ver todas las fotografías',
    loadMore: 'Ver más fotografías',
    showing: 'Mostrando',
    of: 'de',
    openPhoto: 'Ampliar fotografía',
    previous: 'Fotografía anterior',
    next: 'Fotografía siguiente',
    close: 'Cerrar',
    keyboard: 'Usa las flechas para explorar · Esc para cerrar',
    identity: 'GM / En movimiento',
    identityTitle: 'Una identidad que',
    identityAccent: 'cobra vida.',
    identityDescription:
      'El sello de GM Music, con toda su energía. Descubre nuestra animación de marca.',
    identityPlay: 'Reproducir animación',
    contactKicker: '04 / Sigamos conectados',
    contactTitle: 'La próxima experiencia',
    contactAccent: 'empieza contigo.',
    contactDescription:
      'Para conocer nuevas fechas, hablar de tu evento o explorar una colaboración, encuentra a GM Music en Facebook.',
    contactAction: 'Conecta con GM Music',
    footerLine: 'Hecho para vivir la música.',
    menuOpen: 'Abrir menú',
    menuClose: 'Cerrar menú',
    navigation: 'Navegación principal',
    skip: 'Ir al contenido',
    filter: 'Filtrar fotografías',
    noPhotos: 'No hay fotografías en esta categoría.',
    sound: 'Video con sonido y controles de reproducción',
    logoTitle: 'La identidad de GM Music',
  },
  en: {
    navEvents: 'Events',
    navExperiences: 'Experiences',
    navArchive: 'Gallery',
    navContact: 'Contact',
    follow: 'Follow us',
    heroEyebrow: 'The stage. The people. The music.',
    heroTitle: 'Some nights',
    heroAccent: 'stay with you.',
    heroDescription:
      'The energy of being there. The emotion of sharing it. This is what a night with GM Music feels like.',
    heroGallery: 'Explore the gallery',
    heroFilm: 'Relive the night',
    heroScroll: 'Follow the experience',
    heroLocation: 'Alliant Energy · November 7',
    introKicker: '01 / This is GM Music',
    introTitle: 'Music brings us together.',
    introAccent: 'The moment connects us.',
    introDescription:
      'From the first chord to the very last song. Artists, lights and a community that makes every gathering special. This is our archive of a night lived to the fullest.',
    introLink: 'Discover our identity',
    photoStat: 'Photographs of the night',
    recapStat: 'Event recap',
    logoStat: 'An identity in motion',
    filmKicker: '02 / Press play on the memory',
    filmTitle: 'Feel it',
    filmAccent: 'all again.',
    filmDescription: 'A journey through the music, the stage and the people who made this night.',
    filmPlay: 'Play the recap',
    eventLabel: 'From our archive',
    eventTitle: 'Alliant Energy',
    eventDate: 'November 7',
    eventDescription:
      'A night of live music, lights and connection. Explore the photographs and relive the event recap.',
    upcoming: 'What comes next',
    upcomingTitle: 'The next night is yet to be written.',
    upcomingDescription:
      'Upcoming dates will be announced here. Follow GM Music to stay in the loop.',
    galleryKicker: '03 / Our visual archive',
    galleryTitle: 'The night ends.',
    galleryAccent: 'The story lives on.',
    galleryDescription:
      'Every image takes you back. Explore the collection and discover the details of the night.',
    photos: 'photographs',
    allPhotos: 'See all photographs',
    loadMore: 'View more photographs',
    showing: 'Showing',
    of: 'of',
    openPhoto: 'Enlarge photograph',
    previous: 'Previous photograph',
    next: 'Next photograph',
    close: 'Close',
    keyboard: 'Use arrow keys to explore · Esc to close',
    identity: 'GM / In motion',
    identityTitle: 'An identity that',
    identityAccent: 'comes alive.',
    identityDescription:
      'The GM Music signature, with all its energy. Discover our brand animation.',
    identityPlay: 'Play animation',
    contactKicker: '04 / Stay connected',
    contactTitle: 'The next experience',
    contactAccent: 'starts with you.',
    contactDescription:
      'For new dates, your next event or a collaboration, connect with GM Music on Facebook.',
    contactAction: 'Connect with GM Music',
    footerLine: 'Made to live the music.',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    navigation: 'Main navigation',
    skip: 'Skip to content',
    filter: 'Filter photographs',
    noPhotos: 'There are no photographs in this category.',
    sound: 'Video with sound and playback controls',
    logoTitle: 'The GM Music identity',
  },
};

@Component({ selector: 'app-root', templateUrl: './app.html', styleUrl: './app.css' })
export class App implements AfterViewInit {
  @ViewChild('photoDialog') private photoDialog!: ElementRef<HTMLDialogElement>;
  @ViewChild('filmDialog') private filmDialog!: ElementRef<HTMLDialogElement>;
  @ViewChild('welcomeDialog') private welcomeDialog!: ElementRef<HTMLDialogElement>;

  protected readonly menuOpen = signal(false);
  protected readonly language = signal<Language>('es');
  protected readonly languagePromptOpen = signal(true);
  protected readonly copy = computed(() => SITE_COPY[this.language()]);
  protected readonly currentYear = new Date().getFullYear();
  protected readonly categories = mediaCategories;
  protected readonly videos = mediaVideos;
  protected readonly photoCount = galleryPhotos.length;
  protected readonly heroPhoto =
    galleryPhotos.find((photo) => photo.id === heroPhotoId) ?? galleryPhotos[0];
  protected readonly galleryFilter = signal<GalleryFilter>('todos');
  protected readonly visibleCount = signal(9);
  protected readonly selectedPhoto = signal<GalleryPhoto | null>(null);
  protected readonly selectedFilm = signal<Film | null>(null);
  protected readonly activeFilm = computed(() => {
    const film = this.selectedFilm();
    return film ? mediaVideos[film] : null;
  });
  protected readonly orderedPhotos = [...galleryPhotos].sort((a, b) => {
    const rank = (id: number) => {
      const index = featuredPhotoIds.indexOf(id);
      return index < 0 ? featuredPhotoIds.length + id : index;
    };
    return rank(a.id) - rank(b.id);
  });
  protected readonly filteredPhotos = computed(() =>
    this.orderedPhotos.filter(
      (photo) => this.galleryFilter() === 'todos' || photo.category === this.galleryFilter(),
    ),
  );
  protected readonly visiblePhotos = computed(() =>
    this.filteredPhotos().slice(0, this.visibleCount()),
  );
  protected readonly photoPosition = computed(
    () => this.filteredPhotos().findIndex((photo) => photo.id === this.selectedPhoto()?.id) + 1,
  );

  constructor() {
    try {
      const storedLanguage = window.localStorage.getItem('gm-music-language');
      if (storedLanguage === 'es' || storedLanguage === 'en') {
        this.language.set(storedLanguage);
        this.languagePromptOpen.set(false);
      }
    } catch {
      /* Spanish remains available when browser storage is disabled. */
    }
    document.documentElement.lang = this.language();
  }

  ngAfterViewInit(): void {
    if (this.languagePromptOpen()) this.welcomeDialog.nativeElement.showModal();
  }

  protected chooseLanguage(language: Language): void {
    this.language.set(language);
    this.languagePromptOpen.set(false);
    document.documentElement.lang = language;
    this.welcomeDialog?.nativeElement.close();
    try {
      window.localStorage.setItem('gm-music-language', language);
    } catch {
      /* Use the current visit's preference. */
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
  protected caption(photo: GalleryPhoto): string {
    return this.language() === 'es' ? photo.alt : photo.altEn;
  }
  protected categoryName(category: string): string {
    const item = this.categories.find((item) => item.id === category);
    return item ? (this.language() === 'es' ? item.label : item.labelEn) : category;
  }
  protected categoryCount(category: string): number {
    return category === 'todos'
      ? this.photoCount
      : galleryPhotos.filter((photo) => photo.category === category).length;
  }
  protected setGalleryFilter(filter: GalleryFilter): void {
    this.galleryFilter.set(filter);
    this.visibleCount.set(9);
  }
  protected loadMore(): void {
    this.visibleCount.update((count) => count + 12);
  }
  protected openPhoto(photo: GalleryPhoto): void {
    this.selectedPhoto.set(photo);
    this.photoDialog.nativeElement.showModal();
  }
  protected closePhoto(): void {
    this.photoDialog.nativeElement.close();
  }
  protected clearPhoto(): void {
    this.selectedPhoto.set(null);
  }
  protected stepPhoto(direction: number): void {
    const photos = this.filteredPhotos();
    if (!photos.length || !this.selectedPhoto()) return;
    this.selectedPhoto.set(
      photos[(this.photoPosition() - 1 + direction + photos.length) % photos.length],
    );
  }
  protected openFilm(film: Film): void {
    this.selectedFilm.set(film);
    this.filmDialog.nativeElement.showModal();
  }
  protected closeFilm(): void {
    this.filmDialog.nativeElement.close();
  }
  protected clearFilm(): void {
    this.selectedFilm.set(null);
  }
  protected closeOnBackdrop(event: MouseEvent, kind: 'photo' | 'film'): void {
    if (event.target !== event.currentTarget) return;
    if (kind === 'photo') this.closePhoto();
    else this.closeFilm();
  }

  @HostListener('document:keydown', ['$event'])
  protected handleKeyboard(event: KeyboardEvent): void {
    if (event.key === 'Escape') this.closeMenu();
    if (!this.photoDialog?.nativeElement.open) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      this.stepPhoto(event.key === 'ArrowLeft' ? -1 : 1);
    }
  }
}
