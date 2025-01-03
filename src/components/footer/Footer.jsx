import React from "react";
import logo2 from "../../assets/logo/logo.jpeg";

const Footer = () => {
  return (
    <footer className="footer p-10 bg-red-600 text-white">
      <div>
        <img src={logo2} alt="" className="w-20 h-20 rounded-full" />
        <p className="font-bold text-lg">
          Rent A Car
          <br />
          Reliable & Affordable Vehicle Rentals
        </p>
      </div>
      <div>
        <span className="footer-title text-yellow-200">Services</span>
        <a className="link link-hover text-gray-100">Car Rentals</a>
        <a className="link link-hover text-gray-100">Chauffeur Service</a>
        <a className="link link-hover text-gray-100">Airport Pickup</a>
        <a className="link link-hover text-gray-100">Luxury Cars</a>
      </div>
      <div>
        <span className="footer-title text-yellow-200">Company</span>
        <a className="link link-hover text-gray-100">About Us</a>
        <a className="link link-hover text-gray-100">Contact</a>
        <a className="link link-hover text-gray-100">Careers</a>
        <a className="link link-hover text-gray-100">Privacy Policy</a>
      </div>
      <div>
        <span className="footer-title text-yellow-200">Follow Us</span>
        <a className="link link-hover text-gray-100">Facebook</a>
        <a className="link link-hover text-gray-100">Twitter</a>
        <a className="link link-hover text-gray-100">Instagram</a>
        <a className="link link-hover text-gray-100">LinkedIn</a>
      </div>
    </footer>
  );
};

export default Footer;
