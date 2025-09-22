import AOS from 'aos';
import 'aos/dist/aos.css';

import dress from '../assets/XV.svg'
import CountdownCircles from "./CountdownCircles";
import song from '../assets/song.mp3'
import MusicScreen from "./MusicScreen";
import GoogleCalendarButton from "./GoogleCalendarButton";
import DatosBancarios from "./DatosBancarios";
import Asistencia from "./Asistencia";
import Footer from "./Footer";
import TextoFinal from "./TextoFinal";
import LugaresXV from "./LugaresXV";
import { FocusCardsDemo } from "./FocusCardsDemo";
import starsDecoration from '../assets/starsDecoration.svg';
import DressCodeEsmeralda from "./DressCodeEsmeralda";

const Invitacion = () => {


  const targetDate = new Date("2025-10-18T21:00:00-03:00");

  const colorPrincipal = "#69795d";
  const colorSecundario = "#69795d";



  return (
    <div className="w-full font-eleganteText relative overflow-hidden bg-[#f8f5f0]">

        <div className="absolute z-40">
          <MusicScreen cancion={song} />
        </div>

      <div
        className="relative flex flex-col justify-center items-center min-h-screen w-full text-center bg-center bg-cover font-eleganteText space-y-5 overflow-hidden"
        style={{ backgroundImage: "url('https://res.cloudinary.com/dfschbyq2/image/upload/v1758549316/Disen%CC%83o_sin_ti%CC%81tulo_63_xldst5.png')" }}
      >
        <div data-aos="fade-in">
            <p className="text-2xl mb-8 tracking-widest">Te invito a mis 15</p>
            <h1 className="text-8xl md:text-[10rem] font-brushNames text-golden z-10 italic">
            Martina
            </h1>

            <div className="flex items-center justify-center py-2 px-4 mt-5">
            <p className="font-bold text-[#4b5147] text-2xl tracking-widest">
                1 8 . 1 0 . 2 0 2 5
            </p>
            </div>
        </div>
      </div>

      <div>
          <section
            id="contador"
            className="bg-white py-10 border-y-4 border-golden"
          >
            <CountdownCircles
              targetDate={targetDate}
              containerClasses="my-8"
              backgroundColor="#e5e7eb"
              progressColor="#cab135"
              textColor="black"
              valueClassName="text-3xl font-light"
              labelClassName="text-base font-thin"
            />
          </section>

        <section id="lugares" className="relative text-center bg-white">
          <div className="pointer-events-none relative">
            <img src={starsDecoration} alt="deco" className="hidden md:block absolute -top-4 left-6 w-6 opacity-70" />
            <img src={starsDecoration} alt="deco" className="hidden md:block absolute -top-4 right-6 w-6 opacity-70 rotate-6" />
          </div>
          <LugaresXV
            iglesia="[Nombre iglesia]"
            hora_iglesia="10:00hs"
            salon="Mozart Eventos"
            hora_civil="21:00hs"
          />
          <a href="https://maps.app.goo.gl/Y6HxxWJLekYqM2DK7" target="_blank" rel="noopener noreferrer">
            <button className="border-2 border-gray-700 py-3 px-8 rounded-full text-gray-800 font-semibold hover:text-gray-600 transition">
              CÓMO LLEGAR
            </button>
          </a>
        </section>

          <div className="relative bg-white">
            <img
              src={starsDecoration}
              alt="Decoración lateral"
              className="hidden md:block absolute -left-20 top-1/2 transform -translate-y-1/2 pointer-events-none w-[20rem] opacity-70"
            />
            <img
              src={starsDecoration}
              alt="Decoración lateral invertida"
              className="hidden md:block absolute -right-20 top-1/2 transform -translate-y-1/2 pointer-events-none w-[20rem] opacity-70"
            />
            <section className="pb-16">
                <FocusCardsDemo
                    texto=""
                  images={[
                    {
                      index: 1,
                      img: "https://res.cloudinary.com/dfschbyq2/image/upload/v1758373416/7d1d196d-88c5-4856-8906-c82795aa80e4_xjkndj.jpg",
                    },
                    {
                      index: 2,
                      img: "https://res.cloudinary.com/dfschbyq2/image/upload/v1758373416/2d699c23-4d34-45f1-971f-153951e52145_evt4pj.jpg",
                    },
                    {
                      index: 3,
                      img: "https://res.cloudinary.com/dfschbyq2/image/upload/v1758373416/61abf33b-5972-43ec-b4b5-c11292d1066d_u0e8cp.jpg",
                    },
                    {
                      index: 4,
                      img: "https://res.cloudinary.com/dfschbyq2/image/upload/v1758373416/83e32c88-4e65-4ffd-9b9f-315fccf24a1b_ciljbg.jpg",
                    },
                    {
                      index: 5,
                      img: "https://res.cloudinary.com/dfschbyq2/image/upload/v1758373416/37cc4807-691f-4461-b268-8af686461fdc_vluwkw.jpg",
                    },
                    {
                      index: 6,
                      img: "https://res.cloudinary.com/dfschbyq2/image/upload/v1758373416/44f4526e-d219-4263-94cc-abea5c6b9eb4_exynbx.jpg",
                    },
                  ]}
                />
            </section>
          </div>

          <div className="bg-golden text-center relative text-white">
            {/* Deco: Agendar evento */}
            <img src={starsDecoration} alt="deco" className="absolute left-4 top-3 w-5 opacity-70" />
            <img src={starsDecoration} alt="deco" className="absolute right-4 bottom-3 w-6 opacity-70 rotate-3" />
            <GoogleCalendarButton
              imgClass="text-[#4b5147]"
              buttonClass="border-white bg-white text-gray-800 rounded-full"
              titleCalendar="XV de Martina"
              salon="Mozart Eventos, La Plata"
              fechaComienzo="20251018T210000"
              fechaFin="20251019T040000"
            />
          </div>

          <div className="relative bg-white py-10">
            {/* Deco: Dress Code */}
            <img src={starsDecoration} alt="deco" className="absolute left-6 top-4 w-10 opacity-60" />
            <img src={starsDecoration} alt="deco" className="absolute right-6 bottom-5 w-10 opacity-60 -rotate-6" />
            <DressCodeEsmeralda dressCode="Elegante Sport" icon={dress}/>
          </div>

          <div className="relative bg-white">
            <DatosBancarios
              claseIcon="text-white"
              texto="Si deseas hacerme un regalo, te dejo los datos"
              claseContenedor=" text-white"
              claseBoton="rounded-full hover:shadow-lg border-white bg-gray-100 text-gray-900"
              textSize="text-lg"
              background={{ backgroundColor: 'white' }}
              styleBotonModal={{
                backgroundColor: "white",
                borderColor: "#9eba8a",
              }}
              claseBotonModal={{
                backgroundColor: "#4b5147",
                borderColor: "#4b5147",
              }}
              styleModal={{ backgroundColor: colorSecundario }}
              styleBorderModal={{ borderColor: colorPrincipal }}
              styleTextColor={{ color: colorPrincipal }}
              cbu="0000003100025490737274"
              alias="martinaagostini2010"
              banco="Nombre Banco"
              nombre="MARTINA AGOSTINI"
              claseModal="bg-[#4b5147]"
              borderModal="border-[#4b5147]"
              textColor="text-[#4b5147]"
            />
          </div>

          <div className="relative">
            <img src={starsDecoration} alt="deco" className="absolute right-6 top-1 w-10 opacity-70 rotate-3" />
            <Asistencia
              clase="py-10 bg-white bg-fixed border-b-4 border-[#cab135]"
              claseTitle="text-[#4b5147]"
              claseButton="border-2 border-[#cab135] font-semibold hover:bg-[#cab135]  text-gray-700 hover:text-white rounded-full"
              linkAsistencia="https://docs.google.com/forms/d/e/1FAIpQLScbLvFSZl7l8ls-IBKZvbAgdHKDCk3Jb08I-BKk69amR5ruVA/viewform?usp=header"
            />
          </div>

          {/* Deco: Texto final */}
          <div className="relative bg-white">
            <img src={starsDecoration} alt="deco" className="absolute left-6 -top-14 w-10 opacity-70" />
          </div>

        <div className="font-eleganteText text-xl bg-white font-semibold py-10">
          <TextoFinal textoFinal="Este día para mí va a ser un momento inolvidable, lo voy a atesorar para siempre en mi corazón y quiero que seas parte" textClass="text-2xl"/>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Invitacion;
