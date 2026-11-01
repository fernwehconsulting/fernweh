import { Link } from 'react-router-dom';
import { Mail, Pin, WhatsApp } from '../components/Icons.jsx';
import { site } from '../content/site.js';
import usePageMeta from '../lib/usePageMeta.js';

export default function Iletisim() {
  usePageMeta(
    'İletişim · Fernweh Consulting',
    'Ayşe Şahin ile iletişime geçin: WhatsApp, e-posta veya iletişim formu.'
  );

  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <div className="kicker">İletişim</div>
          <h1 className="h1">Hayallerinizi <em>konuşalım.</em></h1>
          <p className="lead">Avrupa'daki eğitim yolculuğunuza ilk adımı atmak için formu doldurun ya da doğrudan yazın. Size en uygun paketi birlikte belirleyelim.</p>
        </div>
      </section>
      <div className="wrap contact-page">
        <aside className="contact-aside">
          <div className="contact-list">
            <a className="contact-item" href={site.whatsappUrl} target="_blank" rel="noopener"><span className="contact-icon"><WhatsApp /></span><span><span className="contact-label">WhatsApp / Telefon</span><br /><span className="contact-value">{site.phone}</span></span></a>
            <a className="contact-item" href={`mailto:${site.email}`}><span className="contact-icon"><Mail /></span><span><span className="contact-label">E-posta</span><br /><span className="contact-value">{site.email}</span></span></a>
            <div className="contact-item"><span className="contact-icon"><Pin /></span><span><span className="contact-label">Konum</span><br /><span className="contact-value">{site.location} · Online görüşme</span></span></div>
          </div>
          <p className="note" style={{ marginTop: '24px' }}>Bilgilendirme ön görüşmesi ücretsizdir.</p>
          <p className="note small" style={{ marginTop: '12px' }}>Formda paylaştığınız bilgiler yalnızca danışmanlık talebiniz için kullanılır. Ayrıntılar: <Link to="/gizlilik">Gizlilik politikası</Link>.</p>
        </aside>
        <div className="form-frame" id="form">
          <iframe src={site.googleFormUrl} title="İletişim formu" loading="lazy">Yükleniyor…</iframe>
        </div>
      </div>
    </>
  );
}
