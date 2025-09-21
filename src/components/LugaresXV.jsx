import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Lottie from "react-lottie-player";
import stars from '../assets/stars.json'

const Places = ({ salon }) => {
  useEffect(() => {
    AOS.init({
      duration: 1000, 
      easing: "ease-in-out",
      once: true,    
    });
  }, []);

  return (
    <section className={`relative w-full py-12 flex flex-col items-center`}>
      <div style={{ width: 190, height: 190 }}>
        <Lottie
          loop
          play
          animationData={stars}
          style={{ width: "100%", height: "100%"}}
        />
      </div>{" "}

      <div
        className="max-w-xl mx-auto p-8 flex flex-col items-center"
        data-aos="fade-left"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 uppercase tracking-wider mb-4">
          Fiesta
        </h2>
        <p className="text-xl text-gray-800 leading-relaxed text-center">
          ¡Te esperamos en <span className="font-bold text-2xl text-golden">{salon}</span>!<br />
          Daremos inicio a la fiesta desde las{" "}
          <span className="font-bold text-bold text-2xl">21:00 hs</span> hasta las <span className="font-semibold">04:00 hs</span>.
        </p>
      </div>
    </section>
  );
};

export default Places;