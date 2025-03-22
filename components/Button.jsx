'use client'

const Button = ({
    text = "",
    className = "",
    icon,
    onClick,
    as = "button",
    disabled = false,
    variant = "primary",
    size = "md",
    ...props
  }) => {
    // Base styles
    const baseStyles = "cursor-pointer px-4 py-2 rounded transition-all duration-300 my-2";
    
    // Variants
    const variants = {
      primary: "bg-blue-500 text-white hover:bg-blue-600",
      secondary: "bg-gray-500 text-white hover:bg-gray-600",
      danger: "bg-red-500 text-white hover:bg-red-600",
      success: "bg-green-500 text-white hover:bg-green-600",
      outline: "border border-gray-500 text-gray-500 hover:bg-gray-100",
        outline_white: "border border-white text-white hover:bg-gray-100 hover:text-blue-500",
      ghost: "text-gray-700 hover:bg-gray-200",
    };
    
    // Sizes
    const sizes = {
      sm: "px-2 py-1 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    };
    
    const combinedClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;
  
    return (
      <button
        className={combinedClasses}
        onClick={onClick}
        disabled={disabled}
        {...props}
      >
        <span className="flex items-center justify-center gap-2 transition-all duration-300 hover:gap-4">
        <span>{text}</span> {icon && <span className="">{icon}</span>}
        </span>
      </button>
    );
  };
  
  export default Button;
