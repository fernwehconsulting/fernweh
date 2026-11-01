// The three main packages. Order here = order on the site.
// price: a plain number (1450 is shown as "1.450 €").
// homeTag / homeText: the short version shown on the home page.
// Use either `sessions` (numbered Seans 1, 2, 3…) or `includes` (check list).
export const packages = [
  {
    id: 'avrupa-danismanlik',
    name: 'Avrupa Danışmanlık Paketi',
    subtitle: "Lisans & Yüksek Lisans · Avrupa'daki tüm ülkeler",
    price: 850,
    facts: ['4 seans', '~4 ay', 'Başvuruları siz yaparsınız'],
    button: 'Bilgi al',
    homeTag: 'Lisans & Yüksek Lisans',
    homeText:
      "Avrupa'da lisans veya yüksek lisans isteyenler için. Bölüm seçiminden CV ve motivasyon mektubuna kadar stratejiyi birlikte kuruyoruz; başvurularınızı güvenle yapmanız için destek oluyorum.",
    description:
      "Avrupa'daki her ülke için üniversite başvuru sürecinizde stratejik danışmanlık sağlar; başvurular sizin tarafınızdan yapılır. Seanslar arasında geri bildirim ve destek devam eder.",
    sessions: [
      'Hedeflerinize ve profilinize uygun üniversite ve bölüm arayışı birlikte planlanır; sonrasında size özel 3 program önerisi yazılı olarak sunulur.',
      'Seçtiğiniz okullar için başvuru sistemleri, gereklilikler ve zaman planlaması ele alınır.',
      'CV ve motivasyon mektubu hazırlığı üzerine çalışılır; sonrasında yazılı geri bildirim ve revizyon desteği sağlanır.',
      'Tüm başvuru belgeleriniz kontrol edilir, CV ve motivasyon mektubunuz son halini alır; gerekirse mülakat provası yapılır.',
    ],
    noteBox: {
      title: "Almanya'ya mı gidiyorsunuz?",
      text: "Başvuru ve vizenin baştan sona sizin adınıza yürütülmesini istiyorsanız Almanya Her Şey Dahil Paket'i tercih edebilirsiniz.",
    },
  },
  {
    id: 'almanya-her-sey-dahil',
    featured: true, // highlighted card
    name: 'Almanya Her Şey Dahil Paket',
    subtitle: 'Almanya · Lisans & Yüksek Lisans',
    price: 1450,
    facts: ['~6 ay', 'Süreç sizin adınıza yürütülür'],
    button: 'Hemen başla',
    homeTag: 'En çok tercih edilen',
    homeText:
      "Almanya'da lisans veya yüksek lisans başvurularını stressiz halletmek isteyenler için. Okul ve dil kursu seçiminden başvurulara, bloke hesaptan vizeye kadar tüm süreci sizin adınıza yürütüyorum.",
    description:
      'Sürecin tamamı benim tarafımdan yürütülür; siz yalnızca istenen belgeleri paylaşarak baştan sona stressiz bir deneyim yaşarsınız.',
    includes: [
      'Profilinize uygun üniversite ve bölüm seçimi',
      'Gerekli hallerde dil okulu seçimi ve kayıt desteği',
      'CV ve motivasyon mektubu hazırlığı',
      'Başvuru belgelerinin hazırlanması ve tercüme danışmanlığı*',
      'Üniversite ve dil okulu başvurularının yapılması ve takibi*',
      'Bloke hesap ve garantörlük süreçlerinde danışmanlık',
      'Sağlık sigortası danışmanlığı',
      'Vize belgelerinin hazırlanması, başvurunun yapılması ve takibi',
    ],
    footnote: '*Tercüme ile okul ve vize başvuru ücretleri paket fiyatına dahil değildir.',
  },
  {
    id: 'avrupa-staj',
    name: 'Avrupa Staj Danışmanlığı',
    subtitle: "Avrupa'da staj & ERASMUS+",
    price: 250,
    facts: ['3 seans', '15 pozisyonluk liste'],
    button: 'Bilgi al',
    homeTag: 'Staj & ERASMUS+',
    homeText:
      "Avrupa'da staj yapmak ya da ERASMUS+ Staj programına başvurmak isteyenler için. Profilinize uygun pozisyonları buluyor, başvuru stratejinizi ve CV'nizi birlikte hazırlıyoruz.",
    description:
      "Avrupa'da staj yapmak isteyen ya da ERASMUS+ staj düşünen danışanlar için idealdir. İstek ve niteliklerinize uygun staj yerlerinin nasıl bulunacağı anlatılır, size özel 15 pozisyonluk bir liste hazırlanır; başvurular için püf noktalar konuşulur, CV ve cover letter düzenlemeleri yapılır.",
    sessions: [
      'Profilinize ve hedeflerinize uygun staj alanlarının belirlenmesi.',
      'Size özel hazırlanan 15 pozisyonluk staj listesinin değerlendirilmesi, gerekli belgeler ve başvuru adımlarının planlanması.',
      "CV ve cover letter'ınızın düzenlenmesi ve geri bildirim.",
    ],
  },
];

// Single sessions ("Tek seanslık danışmanlık paketleri")
export const singleSessions = [
  {
    title: 'CV Hazırlama ve Geri Bildirim',
    price: 110,
    text: "Mevcut CV'niz varsa içerik, format ve Avrupa standartlarına uygunluk açısından değerlendirilip yazılı bir rapor iletilir. Yoksa bilgi formuyla sıfırdan, programınıza özel bir CV hazırlanır. 1 revizyon dahildir.",
  },
  {
    title: 'Motivasyon Mektubu',
    price: 110,
    text: 'Formunuz üzerinden sıfırdan mektup yazılır (1 hafta, 1 revizyon dahil). Mevcut mektubunuz varsa asenkron incelenip 3 iş günü içinde yazılı geri bildirim ve 1 revizyon hakkı sunulur.',
  },
];

export const formatPrice = (n) => Number(n).toLocaleString('tr-TR');
