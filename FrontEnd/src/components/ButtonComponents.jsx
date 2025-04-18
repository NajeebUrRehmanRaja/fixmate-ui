const HandleButton = ({ children, color, ...props }) => {
  return (
    <button
      className={`px-4 py-2 rounded text-white cursor-pointer ${
        color === "blue" ? "bg-blue-500 hover:bg-blue-600" : ""
      } ${color === "green" ? "bg-green-500 hover:bg-green-600" : ""}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default HandleButton;
