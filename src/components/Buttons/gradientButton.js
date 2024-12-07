import React from "react";

// Define the Button Component
const ReusableButton = ({
    onClick,       // Click handler function
    icon: Icon,    // React icon component
    text,          // Button label text
    isDisabled,    // Whether the button is disabled
}) => {
    return (
        <button
            onClick={onClick}
            disabled={isDisabled}
            className={`mt-6 px-6 py-3 rounded-lg flex items-center gap-3 transition-all transform duration-300 ease-in-out ${!isDisabled
                    ? "bg-gradient-to-r from-blue-400 to-purple-500 text-white hover:scale-110 hover:bg-gradient-to-l hover:from-purple-500 hover:to-blue-400"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
        >
            {Icon && <Icon color="white" size={32} />} {/* Render Icon if provided */}
            {text} {/* Render the button text */}
        </button>
    );
};

export default ReusableButton;
