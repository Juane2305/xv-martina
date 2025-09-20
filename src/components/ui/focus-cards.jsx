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
  const frameRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const panStart = useRef({ x: 0, y: 0 });
  const lastTap = useRef(0);
  const pinchDistStart = useRef(null);
  const pinchScaleStart = useRef(1);

  const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
  const getBounds = () => {
    const frame = frameRef.current;
    if (!frame) return { maxX: 0, maxY: 0 };
    const rect = frame.getBoundingClientRect();
    const maxX = ((scale - 1) * rect.width) / 2;
    const maxY = ((scale - 1) * rect.height) / 2;
    return { maxX, maxY };
  };
  const clampPan = (nx, ny) => {
    const { maxX, maxY } = getBounds();
    return { x: clamp(nx, -maxX, maxX), y: clamp(ny, -maxY, maxY) };
  };

  const openLightbox = (idx) => setLightboxIndex(idx);
  const closeLightbox = () => {
    setLightboxIndex(null);
    setTouchStartX(null);
    setTouchDeltaX(0);
    setScale(1);
    setPan({ x: 0, y: 0 });
    setIsDragging(false);
    pinchDistStart.current = null;
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

  const toggleZoom = (cx = 0, cy = 0) => {
    if (scale === 1) {
      setScale(2);
    } else {
      setScale(1);
      setPan({ x: 0, y: 0 });
    }
  };

  const onDoubleClick = (e) => {
    e.preventDefault();
    toggleZoom(e.clientX, e.clientY);
  };

  const onWheel = (e) => {
    if (lightboxIndex === null) return;
    e.preventDefault();
    const delta = e.deltaY < 0 ? 0.2 : -0.2;
    const next = clamp(scale + delta, 1, 4);
    // Mantener pan dentro de límites con el nuevo scale
    setScale(next);
    setPan((p) => clampPan(p.x, p.y));
  };

  const onMouseDown = (e) => {
    if (scale === 1) return; // sin zoom no se panea
    e.preventDefault();
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    panStart.current = { x: pan.x, y: pan.y };
  };
  const onMouseMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    const next = clampPan(panStart.current.x + dx, panStart.current.y + dy);
    setPan(next);
  };
  const onMouseUp = () => setIsDragging(false);

  const onTouchStart = (e) => {
    if (e.touches.length === 2) {
      const [t1, t2] = e.touches;
      const dist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      pinchDistStart.current = dist;
      pinchScaleStart.current = scale;
    } else if (e.touches.length === 1) {
      const now = Date.now();
      if (now - lastTap.current < 250) {
        // doble tap
        toggleZoom();
      }
      lastTap.current = now;
      if (scale > 1) {
        // iniciar paneo con un dedo
        dragStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        panStart.current = { x: pan.x, y: pan.y };
        setIsDragging(true);
      } else {
        // swipe para navegar si no hay zoom
        setTouchStartX(e.touches[0].clientX);
      }
    }
  };

  const onTouchMove = (e) => {
    if (e.touches.length === 2 && pinchDistStart.current) {
      const [t1, t2] = e.touches;
      const dist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      const ratio = dist / pinchDistStart.current;
      const next = clamp(pinchScaleStart.current * ratio, 1, 4);
      setScale(next);
      setPan((p) => clampPan(p.x, p.y));
    } else if (e.touches.length === 1) {
      if (scale > 1 && isDragging) {
        const dx = e.touches[0].clientX - dragStart.current.x;
        const dy = e.touches[0].clientY - dragStart.current.y;
        const next = clampPan(panStart.current.x + dx, panStart.current.y + dy);
        setPan(next);
      } else if (scale === 1 && touchStartX !== null) {
        const currentX = e.touches[0].clientX;
        setTouchDeltaX(currentX - touchStartX);
      }
    }
  };

  const onTouchEnd = () => {
    if (scale === 1) {
      const threshold = 60;
      if (Math.abs(touchDeltaX) > threshold) {
        if (touchDeltaX < 0) {
          goNext();
        } else {
          goPrev();
        }
      }
      setTouchStartX(null);
      setTouchDeltaX(0);
    }
    setIsDragging(false);
    pinchDistStart.current = null;
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
            ref={frameRef}
            onWheel={onWheel}
            onDoubleClick={onDoubleClick}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
          >
            {/* Imagen activa con animaciones suaves */}
            <img
              ref={imageRef}
              key={lightboxIndex}
              src={cards[lightboxIndex].img}
              alt={`Imagen ampliada ${lightboxIndex + 1}`}
              className="absolute inset-0 w-full h-full object-contain select-none transition-transform duration-300 ease-out will-change-transform"
              style={{ transform: `translateX(${touchDeltaX + pan.x}px) translateY(${pan.y}px) scale(${scale})` }}
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
            <div className="absolute bottom-3 right-3 hidden md:block text-white/80 text-xs bg-black/30 px-2 py-1 rounded">Doble click/rueda: zoom · Arrastrar: mover</div>
          </div>
        </div>
      )}
    </div>
  );
}