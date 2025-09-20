import React, { useEffect, useRef, useState } from "react";
import { cn } from "../../utils/cn";


export const Card = React.memo(({ card, index, hovered, setHovered, onOpen }) => (
  <div
    onMouseEnter={() => setHovered(index)}
    onMouseLeave={() => setHovered(null)}
    onClick={() => onOpen(index)}
    className={cn(
      "md:rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden",
      "h-80 md:h-96 w-full transition-transform duration-300 ease-out cursor-pointer",
      hovered === index && "scale-105"
    )}
  >
    <img
      src={card.img}  
      alt={`Imagen ${card.index}`}
      className="object-cover absolute inset-0 w-full h-full"
    />
  </div>
));

Card.displayName = "Card";


export function FocusCards({ cards, texto }) {
  const [hovered, setHovered] = useState(null);

  const [lightboxIndex, setLightboxIndex] = useState(null); // número o null
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchDeltaX, setTouchDeltaX] = useState(0);
  const imageRef = useRef(null);

  const openLightbox = (idx) => setLightboxIndex(idx);
  const closeLightbox = () => {
    setLightboxIndex(null);
    setTouchStartX(null);
    setTouchDeltaX(0);
  };

  const goNext = () => {
    if (cards.length === 0) return;
    setLightboxIndex((prev) => (prev === null ? 0 : (prev + 1) % cards.length));
  };

  const goPrev = () => {
    if (cards.length === 0) return;
    setLightboxIndex((prev) => (prev === null ? 0 : (prev - 1 + cards.length) % cards.length));
  };

  // Navegación por teclado (Esc, flechas)
  useEffect(() => {
    const onKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxIndex, cards.length]);

  // Bloquear scroll body cuando lightbox está abierto
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);

  // Gestos táctiles (swipe)
  const onTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const onTouchMove = (e) => {
    if (touchStartX === null) return;
    const currentX = e.touches[0].clientX;
    setTouchDeltaX(currentX - touchStartX);
  };

  const onTouchEnd = () => {
    const threshold = 60; // px para considerar swipe
    if (Math.abs(touchDeltaX) > threshold) {
      if (touchDeltaX < 0) {
        goNext();
      } else {
        goPrev();
      }
    }
    setTouchStartX(null);
    setTouchDeltaX(0);
  };

  return (
    <div>
      <h2 className="text-center text-4xl pt-32 font-thin tracking-widest">
        {texto}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-2 max-w-5xl mx-auto md:px-8 w-full mt-10">
        {cards.map((card, index) => (
          <Card
            key={card.index}
            card={card} 
            index={index}
            hovered={hovered}
            setHovered={setHovered}
            onOpen={openLightbox}
          />
        ))}
      </div>

      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={closeLightbox} // clic fuera para cerrar
        >
          {/* Contenedor para manejar swipe sin cerrar si se hace clic sobre la imagen */}
          <div
            className="relative w-[92vw] md:w-[80vw] h-[70vh] md:h-[80vh] max-w-6xl"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {/* Imagen activa con animaciones suaves */}
            <img
              ref={imageRef}
              key={lightboxIndex}
              src={cards[lightboxIndex].img}
              alt={`Imagen ampliada ${lightboxIndex + 1}`}
              className="absolute inset-0 w-full h-full object-contain select-none transition-transform duration-300 ease-out will-change-transform"
              style={{ transform: `translateX(${touchDeltaX}px)` }}
              draggable={false}
            />

            {/* Botón cerrar */}
            <button
              type="button"
              aria-label="Cerrar"
              onClick={closeLightbox}
              className="absolute -top-12 right-0 md:top-4 md:right-4 rounded-full bg-white/90 text-black px-3 py-2 shadow hover:bg-white transition md:static"
            >
              ✕
            </button>

            {/* Flechas de navegación en desktop */}
            <button
              type="button"
              aria-label="Anterior"
              onClick={goPrev}
              className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 items-center justify-center w-10 h-10 rounded-full bg-white/90 text-black shadow hover:bg-white transition"
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Siguiente"
              onClick={goNext}
              className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 items-center justify-center w-10 h-10 rounded-full bg-white/90 text-black shadow hover:bg-white transition"
            >
              ›
            </button>

            {/* Indicadores / contador */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-white text-sm bg-black/40 px-3 py-1 rounded-full">
              {lightboxIndex + 1} / {cards.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}