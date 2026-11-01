import { Link } from 'react-router-dom';
import CtaBand from '../components/CtaBand.jsx';
import Reviews from '../components/Reviews.jsx';
import { GuideRow } from '../components/GuideCards.jsx';
import { ArrowRight, Pin } from '../components/Icons.jsx';
import { packages } from '../content/packages.js';
import { reviews } from '../content/reviews.js';
import { faq } from '../content/faq.js';
import { guides } from '../lib/guides.js';
import { inline } from '../lib/markdown.js';
import usePageMeta from '../lib/usePageMeta.js';

export default function Home() {
  usePageMeta(
    'Fernweh Consulting · Yurt Dışında Eğitim Danışmanlığı',
    "Avrupa'da lisans, yüksek lisans ve staj için eğitim danışmanlığı. Ayşe Şahin, Berlin."
  );

  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <div className="kicker hero-kicker">Yurt dışı eğitim danışmanlığı</div>
            <h1 className="display">Geleceğin <em>Avrupa'da.</em></h1>
            <p className="lead">Avrupa'da lisans, yüksek lisans ve staj fırsatları için profesyonel danışmanlık. Başvurudan kabule, vizeden uyum sürecine kadar yanınızdayım.</p>
            <div className="btn-row btn-row--stack">
              <Link className="btn btn--primary" to="/iletisim">Ücretsiz ön görüşme <ArrowRight /></Link>
              <Link className="btn btn--ghost" to="/paketler">Paketleri incele</Link>
            </div>
            <p className="hero-proof"><Pin bold /><span>Danışanlarım şu an <strong>Berlin · Hamburg · Bonn · Köln</strong> ve diğer şehirlerde</span></p>
          </div>
          <figure className="hero-media">
            <img src="/images/hero.webp" alt="Avrupa'da bir şehir manzarası" width="1200" height="1600" />
            <figcaption className="hero-caption"><em>Pasaportunu kap, gidiyoruz!</em><span>Ayşe Şahin · Berlin</span></figcaption>
          </figure>
        </div>
      </section>

      <section className="section section--white">
        <div className="wrap">
          <div className="section-head reveal">
            <div>
              <div className="kicker">Paketler</div>
              <h2 className="h2">Size uygun <em>paketi seçin.</em></h2>
            </div>
            <p className="lead">Üç ana paket ve tek konuda destek almak isteyenler için tek seanslık danışmanlıklar.</p>
          </div>
          <div className="pkg-list reveal">
            {packages.map((p) => (
              <Link className="pkg-row" to={`/paketler#${p.id}`} key={p.id}>
                <span className="pkg-row-tag">{p.homeTag}</span>
                <span className="pkg-row-name">{p.name}</span>
                <span className="pkg-row-desc">{p.homeText}</span>
                <span className="pkg-row-arrow"><ArrowRight /></span>
              </Link>
            ))}
          </div>
          <div style={{ marginTop: '32px' }}><Link className="link-arrow" to="/paketler#tek-seans">Diğer danışmanlık paketleri <ArrowRight /></Link></div>
        </div>
      </section>

      <section className="section section--olive">
        <div className="wrap split">
          <img className="portrait reveal" src="/images/ayse.webp" alt="Ayşe Şahin" width="900" height="1260" loading="lazy" />
          <div className="reveal">
            <div className="kicker">Danışmanınız</div>
            <h2 className="h2">Merhaba, <em>ben Ayşe!</em></h2>
            <p className="lead">Ege Üniversitesi Psikoloji mezunuyum. Hollanda'da Erasmus öğrencisi, İspanya'da Erasmus stajyeri oldum; şimdi Almanya'da yüksek lisans yapıyor ve Berlin Teknik Üniversitesi'nde araştırmacı olarak çalışıyorum.</p>
            <p className="muted">Yurt dışında eğitimin ne kadar zorlu ve bir o kadar dönüştürücü olduğunu bizzat yaşadım. Bu deneyimi sizin için bir rehbere dönüştürüyorum.</p>
            <Link className="link-arrow" to="/hakkimda">Hikâyemin devamı <ArrowRight /></Link>
          </div>
        </div>
      </section>

      <section className="section section--white">
        <div className="wrap">
          <div className="section-head reveal">
            <div>
              <div className="kicker">Ücretsiz rehberler</div>
              <h2 className="h2">Karar vermeden <em>önce okuyun.</em></h2>
            </div>
            <p className="lead">Ülke seçimi ve yaşam masrafları üzerine, gerçek rakamlarla hazırladığım rehberler.</p>
          </div>
          <div className="guide-list reveal">
            {guides.map((g) => <GuideRow guide={g} key={g.slug} />)}
          </div>
          <div style={{ marginTop: '32px' }}><Link className="link-arrow" to="/rehberler">Tüm rehberler <ArrowRight /></Link></div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head reveal">
            <div>
              <div className="kicker">Öğrenci deneyimleri</div>
              <h2 className="h2"><em>Yorumlar</em></h2>
            </div>
            <p className="lead">Avrupa yolculuğuna destek olduğum danışanlarımın deneyimleri.</p>
          </div>
          <Reviews items={reviews} />
        </div>
      </section>

      <section className="section section--white">
        <div className="wrap">
          <div className="section-head reveal">
            <div>
              <div className="kicker">Sık sorulanlar</div>
              <h2 className="h2">Aklınızdaki <em>sorular.</em></h2>
            </div>
            <p className="lead">Başlamadan önce en çok merak edilenler. Cevabını bulamadığınız bir soru varsa ön görüşmede konuşalım.</p>
          </div>
          <div className="faq reveal">
            {faq.map((f) => (
              <details className="faq-item" key={f.q}>
                <summary>{f.q}<span className="faq-icon" aria-hidden="true"></span></summary>
                <p dangerouslySetInnerHTML={{ __html: inline(f.a) }} />
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
