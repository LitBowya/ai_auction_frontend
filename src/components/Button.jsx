export const Button = ({
                         as = "button",
                         href = "#",
                         children,
                         iconLeft = null,
                         iconRight = null,
                         className = "",
                         onClick,
                         ...props
                       }) => {
  const baseClass =
      "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 font-semibold transition-all duration-300 ease-in-out hover:space-x-1";

  const content = (
      <>
        {iconLeft && <span className="icon-left">{iconLeft}</span>}
        <span>{children}</span>
        {iconRight && <span className="icon-right">{iconRight}</span>}
      </>
  );

  if (as === "a") {
    return (
        <a
            href={href}
            onClick={onClick}
            className={`${baseClass} ${className}`}
            {...props}
        >
          {content}
        </a>
    );
  }

  return (
      <button
          type="button"
          onClick={onClick}
          className={`${baseClass} ${className}`}
          {...props}
      >
        {content}
      </button>
  );
};
