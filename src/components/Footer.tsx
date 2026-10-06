import emblem from '../assets/emblem.png';
import { PHOTOS } from '../config/menu';
import { store } from '../config/store';
import { creditUrl } from '../lib/images';
import { Icon } from './Icon';

export function Footer() {
  const credits = [...new Map(Object.values(PHOTOS).flatMap((p) => (p.credit ? [[p.credit.username, p.credit]] : []))).values()];
  const chat = `https://wa.me/${store.whatsappNumber}?text=${encodeURIComponent(`السلام عليكم، عندي استفسار عن ${store.nameAr}`)}`;
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="sign-off" data-reveal>
          <p className="display-2">
            الحلو أحلى
            <br />
            <em>لما نتقاسموه.</em>
          </p>
          <a href="#menu" className="btn btn-light btn-lg">
            ابدأ طلبك <Icon name="arrow" size={18} />
          </a>
        </div>

        <div className="footer-grid">
          <div className="footer-brand">
            <span className="footer-emblem">
              <img src={emblem} alt="" width={64} height={65} loading="lazy" />
            </span>
            <div>
              <p className="footer-name">{store.nameAr}</p>
              <p className="footer-tag">طواجين وصواني حلا كاملة — من {store.established}</p>
            </div>
          </div>
          <div className="footer-col">
            <p className="footer-title">تواصل</p>
            <a href={`tel:+${store.whatsappNumber}`} className="footer-link">
              <Icon name="phone" size={17} /> <span dir="ltr">{store.phoneDisplay}</span>
            </a>
            <a href={chat} className="footer-link" target="_blank" rel="noopener noreferrer">
              <Icon name="whatsapp" size={17} /> راسلنا على واتساب
            </a>
          </div>
          <div className="footer-col">
            <p className="footer-title">نخدموا</p>
            <p className="footer-link">
              <Icon name="clock" size={17} /> {store.hours}
            </p>
            <p className="footer-link">
              <Icon name="pin" size={17} /> {store.city}
            </p>
          </div>
        </div>

        <div className="footer-fine">
          <p>
            © {new Date().getFullYear()} {store.nameAr}
            {store.demoMode && ' · نسخة تجريبية: الأسعار والصور للعرض'}
          </p>
          {credits.length > 0 && (
            <details className="credits">
              <summary>صور العرض من Unsplash</summary>
              <p>
                {credits.map((c, i) => (
                  <span key={c.username}>
                    {i > 0 && '، '}
                    <a href={creditUrl(c.username)} target="_blank" rel="noopener noreferrer" dir="ltr">
                      {c.name}
                    </a>
                  </span>
                ))}
              </p>
            </details>
          )}
        </div>
      </div>
    </footer>
  );
}
