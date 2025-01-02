import React from "react";
import logo2 from "../../assets/logo/logo.jpeg"
const Footer = () => {
  return (
    <footer className="footer p-10 bg-gray-800 text-gray-200">
      <div>
        <img
          src={logo2}
          alt=""
          className="w-20 h-20 rounded-full"
        />
        <p className="font-bold text-lg">
          Rent A Car
          <br />
          Reliable & Affordable Vehicle Rentals
        </p>
      </div>
      <div>
        <span className="footer-title">Services</span>
        <a className="link link-hover">Car Rentals</a>
        <a className="link link-hover">Chauffeur Service</a>
        <a className="link link-hover">Airport Pickup</a>
        <a className="link link-hover">Luxury Cars</a>
      </div>
      <div>
        <span className="footer-title">Company</span>
        <a className="link link-hover">About Us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Careers</a>
        <a className="link link-hover">Privacy Policy</a>
      </div>
      <div>
        <span className="footer-title">Follow Us</span>
        <a className="link link-hover">Facebook</a>
        <a className="link link-hover">Twitter</a>
        <a className="link link-hover">Instagram</a>
        <a className="link link-hover">LinkedIn</a>
      </div>
    </footer>
  );
};

export default Footer;
