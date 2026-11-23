// Utilidad de horario en vivo en zona horaria de Ciudad de México (America/Mexico_City)

const WEEKDAY_TO_INDEX = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6
};

const SPANISH_WEEKDAYS = [
  'domingo',
  'lunes',
  'martes',
  'miércoles',
  'jueves',
  'viernes',
  'sábado'
];

export const DEFAULT_MARKET_SCHEDULE = {
  days: [0, 1, 2, 3, 4, 5, 6],
  open: 8,
  close: 18.5
};

export function getMexicoCityNow(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Mexico_City',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).formatToParts(date);

  const map = Object.fromEntries(parts.map(p => [p.type, p.value]));
  const rawHour = parseInt(map.hour, 10);
  const hour = rawHour === 24 ? 0 : rawHour;
  const minute = parseInt(map.minute, 10) || 0;
  const dayOfWeek = WEEKDAY_TO_INDEX[map.weekday] ?? 0;

  return {
    dayOfWeek,
    hoursFloat: hour + minute / 60
  };
}

export function formatHour(hourFloat) {
  const totalMinutes = Math.round(hourFloat * 60);
  const h24 = Math.floor(totalMinutes / 60) % 24;
  const mins = totalMinutes % 60;
  const period = h24 >= 12 ? 'PM' : 'AM';
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:${String(mins).padStart(2, '0')} ${period}`;
}

export function evaluateSchedule(schedule, nowDate = new Date()) {
  const sched = schedule && Array.isArray(schedule.days) && schedule.days.length > 0
    ? schedule
    : DEFAULT_MARKET_SCHEDULE;

  const { dayOfWeek, hoursFloat } = getMexicoCityNow(nowDate);
  const { days, open, close } = sched;
  const isOpenDay = days.includes(dayOfWeek);

  if (isOpenDay && hoursFloat >= open && hoursFloat < close) {
    if (close - hoursFloat <= 1) {
      return {
        isOpen: true,
        tone: 'closing-soon',
        statusText: 'Cierra pronto',
        detailText: `Cierra a las ${formatHour(close)}`
      };
    }
    return {
      isOpen: true,
      tone: 'open',
      statusText: 'Abierto ahora',
      detailText: `Hoy hasta ${formatHour(close)}`
    };
  }

  if (isOpenDay && hoursFloat < open) {
    return {
      isOpen: false,
      tone: 'closed',
      statusText: 'Cerrado',
      detailText: `Abre hoy a las ${formatHour(open)}`
    };
  }

  for (let offset = 1; offset <= 7; offset++) {
    const nextDay = (dayOfWeek + offset) % 7;
    if (days.includes(nextDay)) {
      const dayLabel = offset === 1 ? 'mañana' : `el ${SPANISH_WEEKDAYS[nextDay]}`;
      return {
        isOpen: false,
        tone: 'closed',
        statusText: 'Cerrado',
        detailText: `Abre ${dayLabel} a las ${formatHour(open)}`
      };
    }
  }

  return {
    isOpen: false,
    tone: 'closed',
    statusText: 'Consultar horario',
    detailText: ''
  };
}

export function getMarketStatus(nowDate = new Date()) {
  return evaluateSchedule(DEFAULT_MARKET_SCHEDULE, nowDate);
}
