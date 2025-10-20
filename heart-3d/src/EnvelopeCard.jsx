import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EnvelopeCard = () => {
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = useState(false);

  const handleOpen = () => {
    navigate('/heart');
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-pink-50 via-rose-100 to-pink-200">
      {/* Hiệu ứng hoa rơi */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${15 + Math.random() * 20}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              opacity: 0.3 + Math.random() * 0.4,
            }}
          >
            {['🌸', '🌺', '🌷', '🌹', '💐'][Math.floor(Math.random() * 5)]}
          </div>
        ))}
      </div>

      {/* Tiêu đề - Responsive */}
      <div className="absolute top-8 md:top-16 text-center z-50 px-4 w-full">
        <h1 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-2 md:mb-3 animate-bounce"
          style={{
            background: 'linear-gradient(45deg, #ec4899, #f43f5e, #fb923c)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 4px 20px rgba(236, 72, 153, 0.3)',
          }}
        >
          🌷 Chúc mừng 20/10 🌷
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-pink-700 font-semibold italic animate-pulse">
          ✨ Ngày Phụ nữ Việt Nam ✨
        </p>
      </div>

      {/* Phong bì 3D - Responsive */}
      <div
        className="relative cursor-pointer transition-all duration-700 ease-out transform hover:scale-105 md:hover:scale-110 hover:rotate-2 active:scale-95"
        style={{
          width: 'min(90vw, 380px)',
          height: 'min(60vw, 280px)',
          perspective: '1000px',
        }}
        onClick={handleOpen}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onTouchStart={() => setIsHovering(true)}
        onTouchEnd={() => setIsHovering(false)}
      >
        {/* Nền phong bì */}
        <div 
          className="absolute inset-0 rounded-xl md:rounded-2xl shadow-2xl transition-all duration-500"
          style={{
            background: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 50%, #fb923c 100%)',
            boxShadow: isHovering 
              ? '0 20px 50px rgba(236, 72, 153, 0.6), 0 0 30px rgba(244, 63, 94, 0.4)'
              : '0 15px 35px rgba(236, 72, 153, 0.4)',
            transform: isHovering ? 'translateY(-5px)' : 'translateY(0)',
          }}
        />

        {/* Nắp phong bì */}
        <div 
          className="absolute top-0 left-0 right-0 rounded-t-xl md:rounded-t-2xl transition-all duration-700 origin-top z-20"
          style={{
            height: 'min(25vw, 128px)',
            background: 'linear-gradient(135deg, #f43f5e 0%, #fb923c 100%)',
            transform: isHovering ? 'rotateX(-10deg)' : 'rotateX(0deg)',
            boxShadow: '0 8px 25px rgba(244, 63, 94, 0.5)',
          }}
        />

        {/* Viền trang trí */}
        <div className="absolute inset-2 md:inset-3 border-2 md:border-4 border-white border-dashed rounded-lg md:rounded-xl z-15 opacity-30 animate-pulse" />

        {/* Nội dung */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-30 gap-2 md:gap-4 p-4 md:p-6">
          <div 
            className="text-5xl md:text-7xl animate-bounce transition-all duration-300"
            style={{
              filter: 'drop-shadow(0 0 15px rgba(255, 255, 255, 0.8))',
              transform: isHovering ? 'scale(1.15)' : 'scale(1)',
            }}
          >
            💌
          </div>
          <div 
            className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-white transition-all duration-300 px-2"
            style={{
              textShadow: '0 4px 10px rgba(0,0,0,0.3)',
              transform: isHovering ? 'scale(1.03)' : 'scale(1)',
            }}
          >
            Nhấn để mở thiệp 20/10
          </div>
          <div className="text-xs sm:text-sm md:text-base text-pink-50 italic text-center leading-relaxed px-2">
            Dành tặng những người phụ nữ tuyệt vời ✨
          </div>
        </div>

        {/* Hiệu ứng lấp lánh */}
        <div className="absolute inset-0 rounded-xl md:rounded-2xl overflow-hidden z-5 pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full animate-ping"
              style={{
                width: `${3 + Math.random() * 5}px`,
                height: `${3 + Math.random() * 5}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1.5 + Math.random() * 2}s`,
                opacity: 0.6,
              }}
            />
          ))}
        </div>
      </div>

      {/* Text hướng dẫn - Responsive */}
      <div className="absolute bottom-8 md:bottom-12 text-center text-pink-600 font-semibold text-sm sm:text-base md:text-lg animate-bounce px-4">
        👆 Click vào phong bì để xem lời chúc 👆
      </div>
    </div>
  );
};

export default EnvelopeCard;