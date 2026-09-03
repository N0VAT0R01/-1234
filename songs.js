/*
  ╔══════════════════════════════════════════════════════════════════════╗
  ║                 СПЕТО В КНАГУ — СПИСОК ПЕСЕН                       ║
  ╚══════════════════════════════════════════════════════════════════════╝

  ВАЖНО:
  • Здесь редактируются ТОЛЬКО название и исполнитель.
  • Текст каждой песни находится в отдельном обычном TXT-файле в папке lyrics/.
  • В TXT-файле можно спокойно делать обычные переносы строк, кавычки,
    тире и любые другие символы — это НЕ ломает JavaScript.

  Чтобы изменить песню:
  1. Измени title и/или artist ниже.
  2. Открой соответствующий файл lyrics/NN.txt и измени текст.
  3. Сохрани оба файла и загрузи их на GitHub.
*/

const songs = [
   { title: 'Хоп Хей Лала-Лей', artist: 'Леонид Агутин', lyricsFile: '01.txt' },
  { title: 'Катюша', artist: 'Валентина Батищева', lyricsFile: '02.txt' },
  { title: 'Седая ночь', artist: 'Юрий Шатунов', lyricsFile: '03.txt' },
  { title: 'Знаешь ли ты', artist: 'МакSим', lyricsFile: '04.txt' },
  { title: 'Трава у дома', artist: 'Земляне', lyricsFile: '05.txt' },
  { title: 'Комсомольск-на-Амуре', artist: 'Наталья Штурм', lyricsFile: '06.txt' },
  { title: 'Что такое осень', artist: 'ДДТ', lyricsFile: '07.txt' },
  { title: 'Зеленоглазое такси', artist: 'Михаил Боярский', lyricsFile: '08.txt' },
  { title: 'Твори добро', artist: 'Шура', lyricsFile: '09.txt' },
  { title: 'Районы-кварталы', artist: 'Звери', lyricsFile: '10.txt' },
  { title: 'А на море белый песок', artist: 'Жанна Фриске', lyricsFile: '11.txt' },
  { title: 'О, Боже, какой мужчина!', artist: 'Натали', lyricsFile: '12.txt' },
  { title: 'Течёт ручей', artist: 'Надежда Кадышева', lyricsFile: '13.txt' },
  { title: 'Кукла колдуна', artist: 'Король и Шут', lyricsFile: '14.txt' },
  { title: 'Владивосток 2000', artist: 'Мумий Тролль', lyricsFile: '15.txt' },
  { title: 'Сансара', artist: 'Баста', lyricsFile: '16.txt' },
  { title: 'В роще пел соловушка', artist: 'Марина Девятова', lyricsFile: '17.txt' },
  { title: 'Огонёк', artist: 'Песня военных лет', lyricsFile: '18.txt' },
  { title: 'Крошка моя', artist: 'Руки Вверх!', lyricsFile: '19.txt' },
  { title: 'Солнышко в руках', artist: 'Демо', lyricsFile: '20.txt' },
  { title: 'А не спеть ли нам песню о любви', artist: 'Чиж & Co', lyricsFile: '21.txt' },
  { title: 'Конь', artist: 'Любэ', lyricsFile: '22.txt' }
];
