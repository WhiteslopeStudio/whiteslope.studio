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

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', 
    '11:00', '11:30', '12:00', '12:30', 
    '13:00', '13:30', '14:00', '14:30', 
    '15:00', '15:30', '16:00', '16:30', 
    '17:00'
  ];

  if (expertId === 'patryk') {
    switch (dayOfWeek) {
      case 1: case 2: case 3: case 4: case 5: 
        return timeSlots; // Poniedziałek - Piątek
      default: 
        return [];
    }
  } else if (expertId === 'bartek') {
    switch (dayOfWeek) {
      case 1: case 2: case 3: case 4: case 5: 
        return timeSlots; // Poniedziałek - Piątek
      default: 
        return [];
    }
  } else { 
    // To jesteś Ty (Mateusz)
    switch (dayOfWeek) {
      case 1: case 2: case 3: case 4: case 5: 
        return timeSlots; // Poniedziałek - Piątek
      default: 
        return [];
    }
  }
}