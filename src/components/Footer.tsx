import Image from "next/image";
import { studio } from "@/lib/studio";

const explore = [
  ["Our Services", "#services"],
  ["Our Products", "#products"],
  ["The Lookbook", "#gallery"],
  ["UrbanCut Academy", "#academy"],
  ["Client Reviews", "#reviews"],
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-invitation">
          <h2>
            Make time for your <span>next look</span>.
          </h2>
          <a className="footer-booking" href="#services">
            BOOK AN APPOINTMENT
          </a>
        </div>
        <div className="footer-groups">
          <div className="footer-brand">
            <a
              className="footer-logo"
              href="#home"
              aria-label="UrbanCut Grooming Studio — Back to top"
            >
              <Image
                src="/media/urbancut-logo-header.svg"
                width={1368}
                height={692}
                alt="UrbanCut Grooming Studio"
              />
            </a>
            <p className="footer-tagline">Grooming, elevated.</p>
            <p className="footer-location">Gwarinpa, Abuja</p>
          </div>
          <nav aria-labelledby="footer-explore-heading">
            <h3 id="footer-explore-heading">Explore</h3>
            {explore.map(([label, href]) => (
              <a key={href} href={href}>
                {label}
              </a>
            ))}
          </nav>
          <nav aria-labelledby="footer-connect-heading">
            <h3 id="footer-connect-heading">Visit &amp; Connect</h3>
            <a href="#studio">Find Our Studio</a>
            <a href="#faq">Frequently Asked Questions</a>
            <a href={studio.whatsapp} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
            <a
              href={studio.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            <a href={`mailto:${studio.email}`}>Email Us</a>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} UrbanCut Grooming Studio</span>
          <a href="#home">
            Back to Top <span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
