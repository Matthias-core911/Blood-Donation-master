import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const socialLinks = [
    {
      name: "WhatsApp",
      href: "https://wa.me/254700000111",
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.52 3.48A11.88 11.88 0 0 0 12.06 0C5.52 0 .2 5.32.2 11.86a11.8 11.8 0 0 0 1.6 5.98L0 24l6.35-1.77a11.87 11.87 0 0 0 5.71 1.46h.01c6.54 0 11.86-5.32 11.86-11.86 0-3.17-1.23-6.14-3.41-8.35Zm-8.45 18.2h-.01a9.85 9.85 0 0 1-5.03-1.38l-.36-.22-3.77 1.05 1.01-3.68-.24-.38a9.8 9.8 0 0 1-1.5-5.2c0-5.43 4.42-9.85 9.86-9.85 2.64 0 5.1 1.03 6.96 2.88a9.79 9.79 0 0 1 2.89 6.97c0 5.43-4.43 9.85-9.81 9.85Zm5.4-7.37c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.18.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47a8.95 8.95 0 0 1-1.66-2.07c-.17-.3-.02-.46.13-.6.13-.13.3-.35.44-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.48-.5-.67-.5h-.57c-.2 0-.52.08-.8.37-.27.3-1.04 1.01-1.04 2.46s1.06 2.85 1.2 3.05c.16.2 2.08 3.18 5.03 4.45.7.3 1.25.48 1.67.61.7.22 1.33.19 1.83.12.56-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.08-.12-.27-.2-.57-.35Z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/",
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5a3.95 3.95 0 0 0 3.95 3.95h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95h-8.5Zm8.95 1.35a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Z" />
        </svg>
      ),
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/",
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M13.74 22v-8.1h2.72l.41-3.16h-3.13V8.72c0-.92.26-1.54 1.57-1.54h1.68V4.35A22.5 22.5 0 0 0 14.53 4c-2.44 0-4.1 1.48-4.1 4.2v2.54H7.7v3.16h2.73V22h3.31Z" />
        </svg>
      ),
    },
    {
      name: "X",
      href: "https://x.com/",
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18.9 2H22l-6.77 7.73L23.2 22h-6.25l-4.9-6.48L6.3 22H3.2l7.24-8.27L.8 2h6.4l4.43 5.86L18.9 2Zm-1.1 18h1.73L6.25 3.9H4.4L17.8 20Z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="bdn-footer mt-4">
      <div className="container py-4">
        <div className="row g-4">
          <div className="col-md-4">
            <h5 className="fw-bold">About Blood Donation Network</h5>
            <p className="mb-0 small">
              We connect donors and patients quickly so hospitals can receive safe
              blood on time. Every donor registration helps save lives.
            </p>
          </div>
          <div className="col-md-4">
            <h5 className="fw-bold">Emergency Contact</h5>
            <p className="mb-1 small">Hotline: +254 700 000 111</p>
            <p className="mb-1 small">Email: support@blooddonationnetwork.org</p>
            <p className="mb-0 small">Available 24/7 for urgent blood requests.</p>
            <div className="d-flex gap-2 mt-3">
              <a className="btn btn-sm bdn-btn-outline-light" href="tel:+254700000111">
                Call
              </a>
              <a
                className="btn btn-sm bdn-btn-outline-light"
                href="mailto:support@blooddonationnetwork.org"
              >
                Email
              </a>
              <a
                className="btn btn-sm bdn-btn-outline-light"
                href="https://wa.me/254700000111"
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>
            </div>
          </div>
          <div className="col-md-4">
            <h5 className="fw-bold">Quick Links</h5>
            <p className="mb-1 small">
              <Link className="footer-link" to="/about">
                About Us
              </Link>
            </p>
            <p className="mb-1 small">
              <Link className="footer-link" to="/contact">
                Contact
              </Link>
            </p>
            <p className="mb-1 small">
              <Link className="footer-link" to="/faqs">
                FAQs
              </Link>
            </p>
            <p className="mb-0 small">Monday - Friday: 8:00 AM - 7:00 PM</p>
          </div>
        </div>
        <div className="d-flex justify-content-center gap-3 mt-4">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="social-icon-link"
              aria-label={link.name}
              title={link.name}
            >
              {link.icon}
            </a>
          ))}
        </div>
        <hr className="border-light my-4" />
        <p className="small mb-0 text-center">
          @2026 Blood Donation Network. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;