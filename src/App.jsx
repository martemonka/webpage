import React, { useState, useEffect } from 'react';
import bg from './pictures/divanchik/no_divan.png';
import topDivan from './pictures/divanchik/divan_top.png';
import divanBot from './pictures/divanchik/divan_bot.png';
import Project from './Project.jsx';

function Home() {
  const [zoom, setZoom] = useState(1);
  const [move, setMove] = useState(0);
  const [round, setRound] = useState(0);
  const [showZone, setShowZone] = useState(true);
  const [scrollActive, setScrollActive] = useState(0);
  const [exposure, setExposure] = useState(0);

  const [isKeyFound, setIsKeyFound] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const firstSectionHeight = window.innerHeight;
      const scrollPercent = Math.min(scrolled / firstSectionHeight, 1);
      
      setScrollActive(scrollPercent);
      setZoom(Math.min(1 + scrollPercent * 2, 3));
      setMove(scrollPercent * 900);
      setRound(scrollPercent * 80);
      setShowZone(scrolled < 100);
    };

    const handleMouseMove = (e) => {
      document.documentElement.style.setProperty('--x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--y', `${e.clientY}px`);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const sharedBackgroundStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundSize: `${100 * zoom}% ${100 * zoom}%`,
    backgroundPosition: '25% 67%',
    backgroundRepeat: 'no-repeat',
    transition: 'transform 0.1s ease-out, border-radius 0.1s ease-out',
    filter: `sepia(0.2) contrast(1.1) brightness(${1.1 - move/2000})`,
  };

  const titleOpacity = Math.max(1 - scrollActive * 3, 0); 
  const titleBlur = scrollActive * 15; 
  const titleTranslate = scrollActive * 100; 

  const handleKeyClick = () => {
    setIsKeyFound(true);
    setShowNotification(true);
  };

  return (
    <>
      <div className="custom-cursor" />
      
      <div className="grain-overlay" />
      <div className="flashlight-overlay" />

      {showNotification && (
        <div className="key-modal-overlay">
          <div className="key-modal">
            <div className="modal-icon">🗝</div>
            <h3>Таємницю розкрито</h3>
            <p>Ви знайшли старий ключ. Тепер таємна зона на початку сторінки стала активною. Поверніться вгору та клікніть на неї.</p>
            <button onClick={() => setShowNotification(false)}>Зрозуміло</button>
          </div>
        </div>
      )}

      <div className="super-wrapper" style={{ backgroundColor: '#141210', position: 'relative', zIndex: 0 }}>
        
        <div className="fullscreen-bg" style={{ ...sharedBackgroundStyle, backgroundImage: `url(${bg})`, zIndex: 50 }} />

        <div className="divan-layer" style={{
            ...sharedBackgroundStyle,
            backgroundImage: `url(${topDivan})`,
            transform: `translateY(-${move}px) scale(1.02)`,
            borderRadius: `${round}px`,
            zIndex: 60,
          }}
        />

        <div className="divan-layer" style={{
            ...sharedBackgroundStyle,
            backgroundImage: `url(${divanBot})`,
            transform: `translateY(${move}px) scale(1.02)`, 
            borderRadius: `${round}px`,
            zIndex: 100,
          }}
        />

        <div className="content" style={{ zIndex: 150, position: 'relative' }}>
          <section className="hero-text">
            <div 
              className="metal-plate"
              style={{
                opacity: titleOpacity,
                filter: `blur(${titleBlur}px)`,
                transform: `translateY(${titleTranslate}px)`,
                transition: 'none'
              }}
            >
              <h1>Мрія зупинити мить</h1>
              <p className="hero-subtitle">До 200-річчя отримання першої фотографії</p>
            </div>
            
            <p 
              className="hero-description"
              style={{
                opacity: Math.max(1 - scrollActive * 4, 0),
                transform: `translateY(${scrollActive * 50}px)`,
              }}
            >
              Відкрийте для себе історію, яка змінила світ
            </p>
          </section>
        </div>

        <div className="beige-wrapper">
          <div className="museum-line"></div>
          
          <section className="text-section row-reverse">
            <div className="section-text">
              <span className="year-label">Винахідник</span>
              <h2>Жозеф Нісефор Ньєпс</h2>
              <p>Французький винахідник, який у 1826 році зробив перший в світі стійкий фотознімок на олов'яній пластині.</p>
            </div>
            <div className="section-image">
               <div className="photo-frame">
                  <img src="src\pictures\2.jpg" alt="Niepce" />
                  <div className="caption">Батько геліографії</div>
               </div>
            </div>
          </section>

          <section className="text-section">
            <div className="section-text">
              <h2>8 годин витримки</h2>
              <p>Саме стільки знадобилося сонцю, щоб намалювати перший кадр. Спробуйте проявити знімок власноруч:</p>
              
              <div className="exposure-control">
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={exposure} 
                  onChange={(e) => setExposure(e.target.value)}
                  className="exposure-slider"
                />
                <div className="exposure-label">
                  Час витримки: <span>{Math.round(exposure * 0.08)} год.</span>
                </div>
              </div>
            </div>
            <div className="section-image">
               <div className="photo-frame alternative">
                  <img 
                    src="src\pictures\1.jpg" 
                    alt="First photo" 
                    style={{
                      filter: `brightness(${exposure / 100}) contrast(${0.5 + exposure / 200}) sepia(0.2) grayscale(0.2)`,
                      transition: 'filter 0.1s ease-out'
                    }}
                  />
                  <div className="caption">Вид з вікна в Ле Гра, 1826</div>
               </div>
            </div>
          </section>

          <section className="key-section">
            <div className="museum-line"></div>
            {!isKeyFound ? (
              <div className="key-wrapper" onClick={handleKeyClick}>
                <div className="key-icon">🗝</div>
                <p>Тут щось лежить...</p>
              </div>
            ) : (
              <div className="key-wrapper found">
                <p>Ключ у вас. Поверніться до шафи.</p>
              </div>
            )}
          </section>
        </div>

        {showZone && (
          <div
            className="clickable-zone"
            onClick={() => {
              if (isKeyFound) window.location.hash = 'project';
            }}
            style={{
              position: 'fixed',
              left: '65%',
              top: '32%',
              width: '12%',
              height: '38%',
              zIndex: 200,
              cursor: isKeyFound ? 'pointer' : 'default',
              pointerEvents: isKeyFound ? 'auto' : 'none',
              backgroundColor: 'transparent',
              border: isKeyFound ? '1px dashed rgba(212, 175, 55, 0.4)' : 'none'
            }}
          />
        )}
      </div>
    </>
  );
}

function App() {
  const [page, setPage] = useState('home');
  useEffect(() => {
    const handleNavigate = () => setPage(window.location.hash.slice(1) || 'home');
    window.addEventListener('hashchange', handleNavigate);
    handleNavigate();
    return () => window.removeEventListener('hashchange', handleNavigate);
  }, []);

  return page === 'project' ? <Project /> : <Home />;
}

export default App;