import Header from "./Header";

export default function Template({ children, title, userData, onLogout }) {
  return (
    <div className="relative bg-gradient-to-b from-indigo-100 via-purple-50 to-pink-50 min-h-screen flex flex-col items-center overflow-visible">
      {/* Header */}
      <Header title={title} userData={userData} onLogout={onLogout} />

      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-visible">
        <div className="circle1 animate-bounce-slow"></div>
        <div className="circle2 animate-bounce-slow"></div>
        <div className="circle3 animate-bounce-slow"></div>
        <div className="star1 animate-spin-slow">⭐</div>
        <div className="star2 animate-spin-slow">🌟</div>
        <div className="triangle triangle1"></div>
        <div className="triangle triangle2"></div>
        <div className="chinese-word chinese-word1">汉</div>
        <div className="chinese-word chinese-word2">字</div>
      </div>

      {/* Main Content Area */}
      <main className="container mx-auto px-6 py-24 relative z-10 flex flex-col items-center">
        {children}
      </main>
    </div>
  );
}
