import './RococoKeyLockHero.css';

export default function RococoKeyLockHero({ small=false, label="로코코 다이어리" }) {
  return (
    <div className={`hero ${small ? 'hero--sm' : ''}`} aria-label={label}>
      <img className="hero__lock" src="/assets/rococo-lock.png" alt="" aria-hidden />
      <img className="hero__key"  src="/assets/rococo-key.png"  alt="" aria-hidden />
      <div className="hero__sparkles" aria-hidden>
        <i/><i/><i/><i/><i/>
      </div>
    </div>
  );
}
