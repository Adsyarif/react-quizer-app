const Footer = () => {
  return (
    <footer className="mt-12 py-6 text-center text-gray-500 text-sm">
      <p>&copy; 2024 Quizer App. All rights reserved.</p>
      <div className="mt-2">
        <a href="/privacy" className="hover:text-white transition-colors">
          Privacy Policy
        </a>{" "}
        &bull;{" "}
        <a href="/terms" className="hover:text-white transition-colors">
          Terms of Service
        </a>
      </div>
    </footer>
  );
};

export default Footer;
