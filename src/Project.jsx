import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import shelfImg from './pictures/shelf_background.png';
import './style2.css';

const EXHIBITS = [
  { id: 1, year: '1826', title: 'Народження світла', subtitle: 'Перший крок до вічності', info: 'Жозеф Нісефор Ньєпс зафіксував «Вид з вікна в Ле Гра», експонуючи платівку 8 годин. Це була зухвала спроба людини змусити сонце малювати.', pos: { top: '20%', left: '30%' } },
  { id: 2, year: '1839', title: 'Дзеркало пам’яті', subtitle: 'Срібна магія Дагера', info: 'Дагеротипія стала першим успіхом. Кожен знімок був унікальним — це було справжнє дзеркало минулого на срібній поверхні.', pos: { top: '39%', left: '30%' } },
  { id: 3, year: '1888', title: 'Демократизація', subtitle: 'Натисніть кнопку', info: 'Джордж Істмен і Kodak вивели фотографію з лабораторій. Світ стал альбомом сімейних спогадів для кожного.', pos: { top: '59%', left: '30%' } },
  { id: 4, year: '1930-ті', title: 'Вирішальна мить', subtitle: 'Філософія Leica', info: 'Поява компактної Leica дозволила ловити невловиме. Фотографія стала полюванням на ту саму мілісекунду.', pos: { top: '20%', left: '56%' } },
  { id: 5, year: '1948', title: 'Магія «тут і зараз»', subtitle: 'Епоха Polaroid', info: 'Едвін Ленд втілив мрію про миттєве проявлення. Очікування зображення прямо в руках перетворило фото на перформанс.', pos: { top: '39%', left: '56%' } },
  { id: 6, year: 'Сьогодення', title: 'Миттєва вічність', subtitle: 'Від пікселя до метавсесвіту', info: 'Сьогодні зупинена мить стала мовою спілкування. Ми конструюємо власну реальність у цифровому потоці.', pos: { top: '59%', left: '56%' } },
];

function Project() {
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      document.documentElement.style.setProperty('--x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--y', `${e.clientY}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="project-screen" style={{ backgroundImage: `url(${shelfImg})` }}>
      <div className="custom-cursor" />
      <div className="grain-overlay" />
      <div className="flashlight-overlay" />
      
      <a href="#home" className="back-btn-minimal">← ПОВЕРНУТИСЯ</a>

      <AnimatePresence>
        {selectedId && (
          <motion.div 
            className="overlay-dark"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedId(null)}
          />
        )}
      </AnimatePresence>

      <div className="shelf-area">
        {EXHIBITS.map((item, index) => {
          const isSelected = selectedId === item.id;
          
          return (
            <motion.div
              key={item.id}
              onClick={() => setSelectedId(isSelected ? null : item.id)}
              className={`exhibit-block ${isSelected ? 'active' : ''}`}
              style={{ 
                position: 'absolute',
                zIndex: isSelected ? 2100 : 500, 
                top: isSelected ? '50%' : item.pos.top, 
                left: isSelected ? '50%' : item.pos.left,
                cursor: isSelected ? 'default' : 'none',
                pointerEvents: 'auto'
              }}
              initial={{ y: -1000, opacity: 0 }}
              animate={{ 
                y: isSelected ? '-50%' : 0, 
                x: isSelected ? '-50%' : 0, 
                opacity: 1,
                scale: isSelected ? 1.6 : 1,
                width: isSelected ? 320 : 180,
              }}
              transition={{ 
                type: 'spring', 
                stiffness: 100, 
                damping: 20, 
                delay: selectedId ? 0 : index * 0.05,
                width: { duration: isSelected ? 0.3 : 0 } 
              }}
            >
              <div className="block-inner" style={{ pointerEvents: 'none' }}>
                <span className="block-year">{item.year}</span>
                <h3 className="block-title">{item.title}</h3>
                
                <AnimatePresence>
                  {isSelected && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, transition: { delay: 0.2 } }}
                      exit={{ opacity: 0, transition: { duration: 0 } }}
                      className="full-info"
                      style={{ pointerEvents: 'auto' }}
                    >
                      <p className="subtitle-top">{item.subtitle}</p>
                      <div className="divider-line"></div>
                      <p className="description-bottom">{item.info}</p>
                      <span className="close-hint">Клікніть, щоб згорнути</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default Project;