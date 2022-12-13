const Footer = () => {
  return (
    <div className="border-1 flex h-20 w-full flex-col items-center justify-center border-2 border-t-gray-500 bg-gray-300">
      <a
        href="https://github.com/hosnipogi"
        target="_blank"
        rel="noreferrer"
        className="text-sm text-gray-800"
      >
        Built with ❤️‍🔥 by{" "}
        <span className="bg-gradient-to-tr from-red-500 to-blue-400 bg-clip-text font-bold text-transparent">
          hosnibona
        </span>
      </a>
    </div>
  );
};

export default Footer;
