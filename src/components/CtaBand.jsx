import { Link } from 'react-router-dom';
import { site } from '../content/site.js';
import { ArrowRight, Mail, WhatsApp } from './Icons.jsx';

// Green "Hayallerinizi konuşalım" block at the bottom of most pages
export default function CtaBand() {
  return (
    <section className="cta-band" aria-labelledby="cta-title">
      <div className="wrap cta-band-grid">
        <div className="reveal">
          <div className="kicker">İletişim</div>
          <h2 className="h2" id="cta-title">Hayallerinizi <em>konuşalım.</em></h2>
          <p>Avrupa'daki eğitim yolculuğunuza ilk adımı atmak için benimle iletişime geçin. Size en uygun yolu birlikte belirleyelim.</p>
          <Link className="btn btn--light" to="/iletisim">İletişim formu <ArrowRight /></Link>
        </div>
        <div className="cta-links reveal">
          <a className="cta-link" href={site.whatsappUrl} target="_blank" rel="noopener"><WhatsApp /> {site.phone} </a>
          <a className="cta-link" href={`mailto:${site.email}`}><Mail /> {site.email} </a>
        </div>
      </div>
    </section>
  );
}
