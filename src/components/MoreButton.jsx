import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const MoreButton = ({
  to,
  onClick,
  label,
  size = "md",
  align = "end",
  className = "",
  ...props
}) => {
  const sizeMap = {
    sm: { text: "text-sm", icon: "w-3 h-3" },
    md: { text: "text-base", icon: "w-3 h-3" },
    lg: { text: "text-xl", icon: "w-4 h-4" },
  };

  const commonClasses = `
    group inline-flex gap-1
    ${align === "end" ? "items-end" : "items-center"}
    font-bebas font-bold leading-none
    ${sizeMap[size].text}
    text-black dark:text-white
    border-b border-black dark:border-white
    transition-all duration-300
    hover:text-blue-700 hover:border-blue-700
    ${className}
  `;

  const content = (
    <>
      <span>{label}</span>
      <ArrowUpRight
        className={`
          ${sizeMap[size].icon}
          transition-transform duration-300
          group-hover:translate-x-1
          group-hover:-translate-y-1
        `}
      />
    </>
  );

  if (to) {
    return (
      <Link to={to} className={commonClasses} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={commonClasses}
      {...props}
    >
      {content}
    </button>
  );
};

MoreButton.propTypes = {
  to: PropTypes.string,
  onClick: PropTypes.func,
  label: PropTypes.string.isRequired,
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  align: PropTypes.oneOf(["start", "center", "end"]),
  className: PropTypes.string,
};

export default MoreButton;
