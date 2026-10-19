import type { PronunciationItem } from '../types'
import { extra } from './edition-content.ts'

// Mots souvent mal prononcés par les francophones (en plus de ceux vus en cours).
const jojoExtraPronunciation: PronunciationItem[] = [
  { id: 'px-determine', word: 'determine', guide: 'di-TUR-min', tip: 'La fin se prononce « min », pas « maïne ».', example: 'We need to determine the root cause.' },
  { id: 'px-analysis', word: 'analysis', guide: 'uh-NAL-uh-sis', tip: 'Accent sur la 2e syllabe.', example: 'The analysis took three days.' },
  { id: 'px-analyse', word: 'analyse / analyze', guide: 'AN-uh-lize', tip: 'Le verbe met l\'accent sur la 1re syllabe (≠ analysis).', example: 'We analyse the samples every morning.' },
  { id: 'px-hierarchy', word: 'hierarchy', guide: 'HIGH-uh-rar-kee', tip: 'Commence par « haï », le « ch » = « k ».', example: 'The company has a flat hierarchy.' },
  { id: 'px-colleague', word: 'colleague', guide: 'KOL-eeg', tip: 'Deux syllabes seulement ; accent sur la 1re.', example: 'My colleague is on holiday.' },
  { id: 'px-focus', word: 'focus', guide: 'FOH-kuhs', tip: '« o » long comme dans « go ».', example: 'This process requires a lot of focus.' },
  { id: 'px-clothes', word: 'clothes', guide: 'klohz', tip: 'Une seule syllabe : « klooz ».', example: 'She buys clothes in thrift shops.' },
  { id: 'px-vegetable', word: 'vegetable', guide: 'VEJ-tuh-buhl', tip: 'Trois syllabes, le 2e « e » disparaît.', example: 'Add the vegetables at the end.' },
  { id: 'px-wednesday', word: 'Wednesday', guide: 'WENZ-day', tip: 'Le « d » et le 2e « e » sont muets.', example: "Let's meet on Wednesday." },
  { id: 'px-receipt', word: 'receipt', guide: 'ri-SEET', tip: 'Le « p » est muet.', example: 'Keep the receipt.' },
  { id: 'px-island', word: 'island', guide: 'EYE-luhnd', tip: 'Le « s » est muet.', example: 'We spent a week on an island.' },
  { id: 'px-debt', word: 'debt', guide: 'det', tip: 'Le « b » est muet (comme dans doubt, subtle).', example: 'The company is in debt.' },
  { id: 'px-queue', word: 'queue', guide: 'kyoo', tip: 'Se prononce comme la lettre Q.', example: 'There was a long queue.' },
  { id: 'px-chaos', word: 'chaos', guide: 'KAY-os', tip: '« ch » = « k ».', example: 'The power outage caused chaos.' },
  { id: 'px-schedule', word: 'schedule', guide: 'SHED-yool (UK) / SKED-jool (US)', tip: 'Deux prononciations acceptées selon l\'accent.', example: "What's the schedule for next week?" },
  { id: 'px-data', word: 'data', guide: 'DAY-tuh', tip: '« a » = « eï ». (US : aussi DA-tuh.)', example: 'The data was stolen.' },
  { id: 'px-laboratory', word: 'laboratory', guide: 'luh-BOR-uh-tree (UK) / LAB-ruh-tor-ee (US)', tip: 'Accent sur la 2e syllabe en anglais britannique.', example: 'I work in a laboratory.' },
  { id: 'px-process', word: 'process', guide: 'PROH-ses (UK) / PRAH-ses (US)', tip: 'Accent sur la 1re syllabe.', example: 'The process takes three days.' },
  { id: 'px-procedure', word: 'procedure', guide: 'pruh-SEE-juhr', tip: 'Accent sur « SEE ».', example: 'Follow the procedure.' },
  { id: 'px-vaccine', word: 'vaccine', guide: 'VAK-seen', tip: 'Accent sur la 1re syllabe.', example: 'The vaccine was approved.' },
  { id: 'px-pharmaceutical', word: 'pharmaceutical', guide: 'far-muh-SOO-ti-kuhl', tip: 'Accent sur « SOO ».', example: 'I work for a pharmaceutical company.' },
  { id: 'px-purchase', word: 'purchase', guide: 'PUR-chuhs', tip: 'La fin ne se prononce pas « chèïz ».', example: 'We need to purchase new equipment.' },
  { id: 'px-available', word: 'available', guide: 'uh-VAY-luh-buhl', tip: 'Accent sur « VAY ».', example: 'Are you available on Monday?' },
  { id: 'px-develop', word: 'development', guide: 'di-VEL-uhp-muhnt', tip: 'Accent sur « VEL », comme develop.', example: 'Product development takes years.' },
  { id: 'px-hotel', word: 'hotel', guide: 'hoh-TEL', tip: 'Le « h » est aspiré et l\'accent est à la fin.', example: 'We booked a hotel near the venue.' },
  { id: 'px-thorough', word: 'thorough', guide: 'THUR-uh', tip: '« th » soufflé, et le « gh » est muet.', example: 'A thorough investigation.' },
  { id: 'px-worked', word: 'worked / stopped / decided', guide: 'wurkt / stopt / di-SIGH-did', tip: 'Le -ed ne forme une syllabe qu\'après t ou d.', example: 'We worked, stopped and decided.' },
  { id: 'px-three-tree', word: 'three / tree', guide: 'three (langue entre les dents) / tree', tip: 'Le « th » n\'est ni « s » ni « t ».', example: 'Three trees.' },
  { id: 'px-hungry-angry', word: 'hungry / angry', guide: 'HUNG-gree / ANG-gree', tip: 'Attention au « h » aspiré : il change le mot !', example: "I'm hungry, not angry." },
  { id: 'px-live-leave', word: 'live / leave', guide: 'liv (court) / leev (long)', tip: 'Le « i » court et le « ee » long distinguent les mots (ship/sheep, full/fool).', example: 'I live near the office. I leave at 8.' },
]

// Accès en cours (voir src/edition.ts).
export const extraPronunciation: PronunciationItem[] = extra ? extra.pronunciation : jojoExtraPronunciation
