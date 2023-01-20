import React from "react";

const Footer = () => {
  return (
    <footer className="footer footer-center bg-neutral p-10 text-neutral-content ">
      <div>
        <p className="font-bold">
          Made with ❤ by{" "}
          <a href="https://github.com/bastibuck" className="link-accent link">
            Basti Buck
          </a>
        </p>

        <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
