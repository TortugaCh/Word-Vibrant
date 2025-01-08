const Loader = () => {
  return (
    <div className="flex justify-center items-center h-[70vh] bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50">
      {/* Loader Container */}
      <div className="relative">
        {/* Animated Stars */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-4 h-4 bg-yellow-400 rounded-full shadow-md animate-ping`}
            style={{
              left: `${Math.random() * 80}px`,
              top: `${Math.random() * 80}px`,
              animationDelay: `${i * 0.4}s`,
            }}
          ></div>
        ))}

        {/* Main Loader: Smiley Face */}
        <div className="w-24 h-24 bg-white rounded-full shadow-lg flex justify-center items-center relative z-10">
          {/* Eyes */}
          <div className="absolute top-6 left-6 w-4 h-4 bg-purple-500 rounded-full"></div>
          <div className="absolute top-6 right-6 w-4 h-4 bg-purple-500 rounded-full"></div>
          {/* Smile */}
          <div className="absolute bottom-4 w-12 h-2 bg-red-400 rounded-full"></div>
        </div>

        {/* Text Below Loader */}
        <div className="mt-6 text-center">
          <p className="text-xl font-bold text-purple-600">Hold Tight! 🎉</p>
          <p className="text-sm text-gray-600">The magic is loading...</p>
        </div>
      </div>
    </div>
  );
};

export default Loader;
