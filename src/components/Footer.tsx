import Image from "next/image";
import { studio } from "@/lib/studio";

const explore = [
  ["Services", "#services"],
  ["Home Service", "#home-service"],
  ["Lookbook", "#gallery"],
  ["Academy", "#academy"],
  ["FAQs", "#faq"],
  ["Contact", "#contact"],
];
export default function Footer() {
  return (
    <footer className="site-footer compact-footer">
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
            <p className="footer-location">
              Grooming, elevated. · Gwarinpa, Abuja
            </p>
          </div>
          <nav aria-labelledby="footer-explore-heading">
            <h3 id="footer-explore-heading">Explore</h3>
            {explore.map(([label, href]) => (
              <a key={href} href={href}>
                {label}
              </a>
            ))}
          </nav>
          <nav className="footer-socials" aria-label="Contact and social links">
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
            <a href={studio.tiktok} target="_blank" rel="noopener noreferrer">
              TikTok
            </a>
            <a href={`mailto:${studio.email}`}>Email Us</a>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {studio.legalName}. All rights
            reserved.
          </span>
          <a href="#home">
            Back to Top <span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
