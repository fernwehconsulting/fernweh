// Hakkımda page: intro text and the "Yolculuğum" timeline.
export const about = {
  lead: "Psikolog ve eğitim danışmanı. Berlin'de yaşıyorum ve Avrupa'da eğitim almak isteyen öğrencilere, bizzat yürüdüğüm yolda rehberlik ediyorum.",
  paragraphs: [
    "Ege Üniversitesi Psikoloji bölümünden mezun oldum. Hollanda'da Erasmus öğrenim programına katıldım ve İspanya'da Erasmus stajı yaptım. Şimdi ise Almanya'da yüksek lisans eğitimime devam ediyor ve aynı zamanda Berlin Teknik Üniversitesi'nde araştırmacı olarak çalışıyorum.",
    'Yurt dışında eğitim almanın ne kadar zorlu ve bir o kadar da dönüştürücü bir deneyim olduğunu bizzat yaşadım. Belge karmaşasından vize stresine, şehir uyumundan konaklama bulmaya kadar pek çok engeli aşmak zorunda kaldım.',
    'Tüm bu deneyimlerimi sizin için bir rehbere dönüştürüyorum. Kendi tecrübelerimden yola çıkarak Avrupa\'da eğitim almak isteyen öğrencilere yol göstermeyi ve onların sürecini kolaylaştırmayı hedefliyorum.',
  ],
  // now: true marks the current step (filled dot)
  timeline: [
    {
      year: '2023',
      kind: 'Erasmus öğrenim',
      title: 'Fontys University of Applied Sciences',
      place: 'Hollanda',
      note: 'Yurt dışındaki ilk dönemim: yeni bir eğitim sistemi, ev arayışı ve yeni bir şehre uyum. Danışanlarımın ilk aylarda yaşadıklarını buradan biliyorum.',
    },
    {
      year: '2024',
      kind: 'Lisans · Mezuniyet',
      title: 'Psikoloji',
      place: 'Ege Üniversitesi · Türkiye',
      note: 'Psikoloji eğitimim, danışanlarımı dinleme ve onlara en uygun yolu birlikte bulma şeklimin temelini oluşturuyor.',
    },
    {
      year: '2024',
      kind: 'Erasmus staj',
      title: 'Universitat Autònoma de Barcelona',
      place: 'İspanya',
      note: "Staj sürecinde Avrupa'da çalışma hayatını içeriden gördüm; staj başvurularında nelerin fark yarattığını burada öğrendim.",
    },
    {
      year: '2025 –',
      kind: 'Yüksek lisans',
      title: 'Cognitive Science',
      place: 'Potsdam Üniversitesi · Almanya',
      note: "Almanya'ya yüksek lisans başvurusu, vize ve yerleşme sürecini baştan sona kendim yürüttüm.",
    },
    {
      year: 'Bugün',
      kind: 'Araştırmacı',
      title: 'Berlin Teknik Üniversitesi',
      place: 'Berlin · Almanya',
      note: 'Akademide çalışmaya devam ederken edindiğim deneyimi yeni yola çıkanlarla paylaşıyorum.',
      now: true,
    },
  ],
};
