import { Icon } from './Icon';

const WORDS = ['بسبوسة', 'كنافة', 'بقلاوة', 'تشيز كيك', 'كيكة شوكولاتة', 'صواني المناسبات'];

/** A slow band of names that drifts sideways as you scroll — purely decorative. */
export function Ribbon() {
  const run = (key: string) =>
    WORDS.map((w, i) => (
      <span key={`${key}-${w}`} className={i % 2 ? 'alt' : undefined}>
        {w}
        <Icon name="sparkle" size={18} />
      </span>
    ));
  return (
    <div className="ribbon" aria-hidden="true">
      <div className="ribbon-track">
        {run('a')}
        {run('b')}
      </div>
    </div>
  );
}
