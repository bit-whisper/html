import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ArrowRight, Play, Image as ImageIcon, Sparkles, X } from 'lucide-react';

// --- MAIN APP COMPONENT ---
export default function App() {
  const [currentStep, setCurrentStep] = useState(0);

  // This handles the transition between the main "pages"
  const nextStep = () => setCurrentStep((prev) => prev + 1);

  return (
    <div className="min-h-screen bg-[#fcf5f2] relative overflow-hidden font-sans text-gray-800 select-none">
      {/* Dynamic Background Gradients to match the soft vibe */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating Hearts in Background */}
      <FloatingHearts />

      {/* Main Content Area */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <AnimatePresence mode="wait">
          {currentStep === 0 && <IntroCard key="step0" onNext={nextStep} />}
          {currentStep === 1 && <SadnessCard key="step1" onNext={nextStep} />}
          {currentStep === 2 && <InteractiveListCard key="step2" onNext={nextStep} />}
          {currentStep === 3 && <FinalProposalCard key="step3" />}
        </AnimatePresence>
      </div>
    </div>
  );
}

// --- STEP 1: INTRO CARD ---
const IntroCard = ({ onNext }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl w-full max-w-sm text-center border border-white/50"
  >
    <div className="bg-gradient-to-b from-pink-100 to-white rounded-2xl p-6 mb-6 relative overflow-hidden">
      {/* DECORATION FLOWERS */}
      <div className="absolute top-2 left-2 text-pink-400"><Sparkles size={16} /></div>
      <div className="absolute top-4 right-4 text-pink-300"><Heart size={12} fill="currentColor" /></div>
      
      {/* PLACEHOLDER FOR IMAGE 1 (Bunny) */}
      <div className="h-32 flex items-center justify-center">
         {/* REPLACE THE IMG TAG BELOW WITH YOUR UPLOADED IMAGE URL */}
         <img 
            src="https://media.tenor.com/On7msF9e1rIAAAAj/mochi-cat-mochi.gif" 
            alt="Cute Bunny" 
            className="h-full object-contain drop-shadow-md"
         />
      </div>
    </div>

    <h1 className="text-3xl font-cursive text-gray-800 mb-3" style={{ fontFamily: 'Dancing Script, cursive' }}>
      Hey Cutiepie
    </h1>
    <p className="text-gray-600 mb-8 text-sm leading-relaxed">
      Can we talk for a moment? There's something important I want to tell you.
    </p>

    <button
      onClick={onNext}
      className="bg-pink-300 hover:bg-pink-400 text-white font-medium py-3 px-8 rounded-full shadow-lg transition-transform transform active:scale-95 flex items-center justify-center gap-2 mx-auto"
    >
      Continue <Heart size={16} fill="currentColor" />
    </button>
  </motion.div>
);

// --- STEP 2: SADNESS CARD ---
const SadnessCard = ({ onNext }) => (
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -50 }}
    className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl w-full max-w-sm text-center border border-white/50"
  >
    <div className="bg-gradient-to-b from-purple-100 to-white rounded-2xl p-8 mb-6 shadow-inner">
       {/* PLACEHOLDER FOR IMAGE 2 (Sad Cat) */}
       <div className="h-32 flex items-center justify-center">
         <img 
            src="https://media.tenor.com/bX6t4H8X5GkAAAAj/sad-cat.gif" 
            alt="Sad Cat" 
            className="h-full object-contain"
         />
      </div>
    </div>

    <p className="text-gray-700 font-medium mb-8 leading-relaxed">
      I know I hurt you... and I've been feeling really bad about it.
    </p>

    <button
      onClick={onNext}
      className="bg-purple-300 hover:bg-purple-400 text-white font-medium py-3 px-8 rounded-full shadow-lg transition-transform transform active:scale-95 flex items-center justify-center gap-2 mx-auto"
    >
      Next <ArrowRight size={16} />
    </button>
  </motion.div>
);

// --- STEP 3: INTERACTIVE LIST ---
const InteractiveListCard = ({ onNext }) => {
  const [revealed, setRevealed] = useState([false, false, false]);

  const messages = [
    { color: 'bg-orange-100', text: "I messed up... and I'm really sorry for that." },
    { color: 'bg-pink-100', text: "I promise I'll be better for you." },
    { color: 'bg-purple-100', text: "Please forgive me... You mean so much to me." },
  ];

  const handleReveal = (index) => {
    const newRevealed = [...revealed];
    newRevealed[index] = true;
    setRevealed(newRevealed);
  };

  const allRevealed = revealed.every(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-xl w-full max-w-sm border border-white/50"
    >
      <h2 className="text-center text-xl font-cursive mb-1 text-gray-800" style={{ fontFamily: 'Dancing Script, cursive' }}>
        Little things I want to tell you...
      </h2>
      <p className="text-center text-xs text-gray-400 mb-6 uppercase tracking-wider">Tap each one</p>

      <div className="space-y-4 mb-8">
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            onClick={() => handleReveal(idx)}
            className={`relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 shadow-sm
              ${revealed[idx] ? 'h-24' : 'h-16 hover:scale-105'}
              ${msg.color}
            `}
            layout
          >
            {/* The Hidden Content */}
            <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${revealed[idx] ? 'opacity-0' : 'opacity-100'}`}>
              <Heart className="text-white drop-shadow-sm" fill="currentColor" size={24} />
            </div>

            {/* The Revealed Content */}
            <div className={`absolute inset-0 flex items-center justify-center p-4 text-center transition-opacity duration-500 ${revealed[idx] ? 'opacity-100 delay-100' : 'opacity-0'}`}>
              <p className="text-sm font-medium text-gray-700">{msg.text}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <button
        onClick={onNext}
        disabled={!allRevealed}
        className={`w-full py-3 rounded-full font-medium shadow-md transition-all duration-300 flex items-center justify-center gap-2
          ${allRevealed 
            ? 'bg-red-300 hover:bg-red-400 text-white transform active:scale-95 cursor-pointer' 
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
        `}
      >
        My message <ArrowRight size={16} />
      </button>
    </motion.div>
  );
};

// --- STEP 4: FINAL REVEAL & SLIDING LETTER ---
const FinalProposalCard = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl w-full max-w-sm text-center border border-white/50"
      >
        <h2 className="text-2xl font-cursive mb-6 text-gray-800" style={{ fontFamily: 'Dancing Script, cursive' }}>
          From my heart...
        </h2>

        {/* Two cute cats section */}
        <div className="flex justify-center gap-4 mb-8">
           {/* REPLACE WITH IMAGES OF TWO CATS/PEOPLE HOLDING HEARTS */}
          <div className="w-24 h-24 bg-purple-100 rounded-2xl flex items-center justify-center overflow-hidden shadow-inner">
             <img src="https://media.tenor.com/uR2c9c_BvOIAAAAj/cat-meow.gif" className="w-20" alt="Cat 1"/>
          </div>
          <div className="w-24 h-24 bg-pink-100 rounded-2xl flex items-center justify-center overflow-hidden shadow-inner">
            <img src="https://media.tenor.com/0i1r9Zc2KkMAAAAj/cat-love.gif" className="w-20" alt="Cat 2"/>
          </div>
        </div>

        <p className="text-xs text-gray-400 mb-2 uppercase tracking-wide">↓ Tap to see message ↓</p>
        
        {/* The Trigger Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="w-full bg-white border-2 border-pink-100 py-6 rounded-2xl shadow-lg group relative overflow-hidden"
        >
            <div className="absolute inset-0 bg-pink-50 opacity-0 group-hover:opacity-100 transition-opacity" />
            <h3 className="relative z-10 text-3xl font-cursive text-gray-700" style={{ fontFamily: 'Dancing Script, cursive' }}>
                I'm Sorry
            </h3>
        </motion.button>
      </motion.div>

      {/* THE SLIDING LETTER (MODAL) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center pointer-events-none"
          >
             {/* Backdrop */}
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="absolute inset-0 bg-black/20 pointer-events-auto"
               onClick={() => setIsOpen(false)}
            />

            {/* The Letter Content */}
            <div className="bg-[#fff0f3] w-full max-w-md h-[85vh] sm:h-auto sm:max-h-[90vh] rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-y-auto pointer-events-auto relative">
                
                {/* Decorative Floral Corners (CSS shapes) */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-pink-200 rounded-br-full opacity-20" />
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-200 rounded-tl-full opacity-20" />

                {/* Close Button */}
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="absolute top-4 right-4 p-2 bg-white/50 rounded-full hover:bg-white transition-colors"
                >
                  <X size={20} className="text-gray-500" />
                </button>

                <div className="p-8 sm:p-10 flex flex-col items-center">
                    <h2 className="text-4xl font-cursive text-gray-800 mb-6 drop-shadow-sm" style={{ fontFamily: 'Dancing Script, cursive' }}>
                        I'm Sorry
                    </h2>

                    {/* Main Letter Text */}
                    <div className="prose prose-pink text-gray-600 text-sm sm:text-base leading-relaxed text-justify mb-8">
                        <p className="mb-4">
                            For hurting you and making you feel upset, I'm truly sorry. I never wanted to be the reason behind your tears or your silence. 
                            You matter to me more than I always manage to show, and I hate that I let you down.
                        </p>
                        <p className="mb-4">
                            I promise to grow, to listen, and to be better for you every single day. 
                            Thank you for staying, for caring, and for being you.
                        </p>
                        <p className="font-semibold text-gray-800">
                            I'm really trying... and I hope you can forgive me.
                        </p>
                    </div>

                    {/* Image/Video Gallery Placeholder */}
                    <div className="w-full space-y-4">
                        <h3 className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Our Memories</h3>
                        
                        {/* Placeholder 1: Horizontal Image */}
                        <div className="bg-white p-2 rounded-xl shadow-sm rotate-1 hover:rotate-0 transition-transform duration-300">
                             {/* REPLACE URL HERE */}
                             <img src="https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Memory 1" className="w-full h-40 object-cover rounded-lg" />
                        </div>

                        {/* Placeholder 2: Video Placeholder */}
                        <div className="bg-white p-2 rounded-xl shadow-sm -rotate-1 hover:rotate-0 transition-transform duration-300">
                             <div className="relative w-full h-40 bg-gray-100 rounded-lg overflow-hidden group cursor-pointer flex items-center justify-center">
                                {/* REPLACE IMAGE URL WITH VIDEO THUMBNAIL */}
                                <img src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Video Thumbnail" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform" />
                                <div className="z-10 bg-white/30 backdrop-blur-md p-3 rounded-full">
                                    <Play fill="currentColor" className="text-white ml-1" />
                                </div>
                             </div>
                             <p className="text-center text-[10px] text-gray-400 mt-2">Click to play video</p>
                        </div>
                    </div>
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// --- UTILITIES ---

// Simple floating hearts background animation
const FloatingHearts = () => {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
            {[...Array(15)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ 
                        y: "110vh", 
                        x: Math.random() * 100 + "vw",
                        opacity: 0 
                    }}
                    animate={{ 
                        y: "-10vh", 
                        opacity: [0, 0.8, 0] 
                    }}
                    transition={{ 
                        duration: Math.random() * 10 + 10, 
                        repeat: Infinity, 
                        delay: Math.random() * 20,
                        ease: "linear"
                    }}
                    className="absolute text-pink-200"
                >
                    <Heart size={Math.random() * 30 + 10} fill="currentColor" />
                </motion.div>
            ))}
        </div>
    )
}