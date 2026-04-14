const Footer = () => (
  <footer className="py-12 bg-background border-t border-border/50">
    <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="font-display text-lg font-bold text-foreground">
        DEMON<span className="text-gradient-red">SLAYER</span>
      </p>
      <p className="text-sm text-muted-foreground">
        © 2024 Fan Project. Demon Slayer is owned by Koyoharu Gotouge & ufotable.
      </p>
    </div>
  </footer>
);

export default Footer;
