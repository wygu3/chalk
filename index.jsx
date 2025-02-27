import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center bg-black">
      <video
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 w-full h-full object-cover opacity-50"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>
      <motion.div 
        className="relative z-10 text-white text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold">Investing in Tomorrow</h1>
        <p className="mt-4 text-lg md:text-xl">Backing visionary entrepreneurs</p>
        <a href="/portfolio" className="mt-6 inline-block px-6 py-3 bg-blue-500 rounded-full text-white font-semibold hover:bg-blue-700 transition">Explore Portfolio</a>
      </motion.div>
    </section>
  );
}
