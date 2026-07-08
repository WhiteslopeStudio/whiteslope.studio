export type ExpertId = 'patryk' | 'mateusz' | 'bartek';

export interface ExpertProfile {
  id: ExpertId;
  name: string;
  title: string;
  avatar: string;
}

export const EXPERTS: Record<ExpertId, ExpertProfile> = {
  patryk: {
    id: 'patryk',
    name: 'Patryk Kulesza',
    title: 'Bezpłatna konsultacja',
    avatar: '/_resources/team/patryk.webp'
  },
  mateusz: {
    id: 'mateusz',
    name: 'Mateusz Malewski',
    title: 'Bezpłatna konsultacja',
    avatar: '/_resources/team/mateusz.webp'
  },
  bartek: {
    id: 'bartek',
    name: 'Bartek Koźluk',
    title: 'Bezpłatna konsultacja',
    avatar: '/_resources/team/bartek.webp'
  }
};

export function getAvailableHours(expertId: ExpertId, date: Date): string[] {
  const dayOfWeek = date.getDay(); // 0 = Niedziela, 1 = Poniedziałek, ..., 6 = Sobota
  
  // 0 to Niedziela, 6 to Sobota - od razu blokujemy i zwracamy pustą tablicę
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    return [];
  }

  if (expertId === 'patryk') {
    switch (dayOfWeek) {
      case 1: return ['15:00', '16:00', '17:00']; // Poniedziałek
      case 2: return ['15:00', '16:00', '17:00']; // Wtorek
      case 3: return ['15:00', '16:00', '17:00']; // Środa
      case 4: return ['15:00', '16:00', '17:00']; // Czwartek
      case 5: return ['15:00', '16:00', '17:00']; // Piątek
      default: return [];
    }
  } else if (expertId === 'bartek') {
    switch (dayOfWeek) {
      case 1: return ['15:00', '16:00', '17:00']; // Poniedziałek
      case 2: return ['15:00', '16:00', '17:00']; // Wtorek
      case 3: return ['15:00', '16:00', '17:00']; // Środa
      case 4: return ['15:00', '16:00', '17:00']; // Czwartek
      case 5: return ['15:00', '16:00', '17:00']; // Piątek
      default: return [];
    }
  } else { 
    // To jesteś Ty (Mateusz)
    switch (dayOfWeek) {
      case 1: return ['10:00', '11:00', '15:00', '16:00', '17:00']; // Poniedziałek
      case 2: return ['10:00', '11:00', '15:00', '16:00', '17:00']; // Wtorek
      case 3: return ['10:00', '11:00', '15:00', '16:00', '17:00']; // Środa
      case 4: return ['10:00', '11:00', '15:00', '16:00', '17:00']; // Czwartek
      case 5: return ['10:00', '11:00', '15:00', '16:00', '17:00']; // Piątek
      default: return [];
    }
  }
}