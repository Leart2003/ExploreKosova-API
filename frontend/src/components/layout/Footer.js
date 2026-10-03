function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-light text-center py-3 mt-auto">
      <p className="mb-1">ExploreKosova &copy; {currentYear}</p>
      <p className="mb-0 small">
  
      </p>
    </footer>
  );
}

export default Footer;