import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Information */}
        <div className=''>
          <h2 className="text-xl font-bold mb-4">Pages</h2>
          <p className="text-gray-400 hover:text-white">
            {/* Brief company description */}
            Top Manufacturers
          </p>
          <p className='text-gray-400 hover:text-white'>RFQ</p>
          <p className='text-gray-400 hover:text-white'>Quick Order</p>
          <p className='text-gray-400 hover:text-white'>Contact Us</p>
          <p className='text-gray-400 hover:text-white'>Blog</p>
          <p className='text-gray-400 hover:text-white'>Shipping & Return</p>
          <p className='text-gray-400 hover:text-white'>Track Your Order</p>
          <p className='text-gray-400 hover:text-white'>Privacy Policy</p>
          <p className='text-gray-400 hover:text-white'>Terms and Conditions</p>
          <p className='text-gray-400 hover:text-white'>Sitemap</p>
        </div>

        {/* Product Categories */}
        <div>
          <h2 className="text-xl font-bold mb-4">Categories</h2>
          <ul>
            <li>
              <div className="text-gray-400 hover:text-white">
                Integrated Circuits
              </div>
            </li>
            <li>
              <div className="text-gray-400 hover:text-white">
                Development Boards and Kits
              </div>
            </li>
            <li>
              <div className="text-gray-400 hover:text-white">
                Drone Parts
              </div>
            </li>
            <li>
              <div className="text-gray-400 hover:text-white">
                Breakout Boards
              </div>
            </li>
            <li>
              <div className="text-gray-400 hover:text-white">
                Communication
              </div>
            </li>
            <li>
              <div className="text-gray-400 hover:text-white">
                Passive Components
              </div>
            </li>
            <li>
              <div className="text-gray-400 hover:text-white">
                Sensors
              </div>
            </li>
            <li>
              <div className="text-gray-400 hover:text-white">
                Connectors
              </div>
            </li>
            <li>
              <div className="text-gray-400 hover:text-white">
                Optoelectronics
              </div>
            </li>
            <li>
              <div className="text-gray-400 hover:text-white">
                Electromechanical
              </div>
            </li>
            <li>
              <div className="text-gray-400 hover:text-white">
                Discrete Semiconductors
              </div>
            </li>
            <li>
              <div className="text-gray-400 hover:text-white">
                3D Printers and Filaments
              </div>
            </li>
            <li>
              <div className="text-gray-400 hover:text-white">
                Wire and Cable Management
              </div>
            </li>
            <li>
              <div className="text-gray-400 hover:text-white">
                Circuit Protection
              </div>
            </li>
            <li>
              <div className="text-gray-400 hover:text-white">
                Power Supplies
              </div>
            </li>
            <li>
              <div className="text-gray-400 hover:text-white">
                Test and Measurement
              </div>
            </li>
            <li>
              <div className="text-gray-400 hover:text-white">
                Tools and Supplies
              </div>
            </li>

            {/* Add more categories as needed */}
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <h2 className="text-xl font-bold mb-4">Popular Brands</h2>
          <ul>
            <li>
              <Link href="" className="text-gray-400 hover:text-white">
                Royal Ohm
              </Link>
            </li>
            <li>
              <Link href="" className="text-gray-400 hover:text-white">
                Yageo
              </Link>
            </li>
            <li>
              <Link href="" className="text-gray-400 hover:text-white">
                CNLINKO
              </Link>
            </li>
            <li>
              <Link href="" className="text-gray-400 hover:text-white">
                Waveshare
              </Link>
            </li>
            <li>
              <Link href="" className="text-gray-400 hover:text-white">
                7Semi
              </Link>
            </li>
            <li>
              <Link href="" className="text-gray-400 hover:text-white">
                JD
              </Link>
            </li>
            <li>
              <Link href="" className="text-gray-400 hover:text-white">
                DFRobot
              </Link>
            </li>
            <li>
              <Link href="" className="text-gray-400 hover:text-white">
                Generic
              </Link>
            </li>
            <li>
              <Link href="" className="text-gray-400 hover:text-white">
                Shenzhen Sunlord
              </Link>
            </li>
            <li>
              <Link href="" className="text-gray-400 hover:text-white">
                SparkFun
              </Link>
            </li>
            <li>
              <Link href="" className="text-gray-400 hover:text-white">
                View All
              </Link>
            </li>
            {/* Add more support links as needed */}
          </ul>
        </div>

        {/* Social Media Links */}
        <div>
          <h2 className="text-xl font-bold mb-4">Info</h2>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com" className="text-gray-400 hover:text-white">
              {/* <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"></svg> */}
              <Image
                src="/facebook.png"
                alt="Facebook Logo"
                width={40}
                height={40}
              />

            </a>

            <a href="https://www.twitter.com" className="text-gray-400 hover:text-white">
             

              <Image
                src="/twitter (1).png"  // Ensure this image is inside the /public folder
                alt="X (Twitter) Logo"
                width={40}
                height={40}
                className=''
              />
            </a>

            <a href="https://www.whatsapp.com" className="text-gray-400 hover:text-white">
             
              <Image
                src="/logo.png"
                alt="Whatsapp Logo"
                width={45}
                height={45}
              />

            </a>
            {/* Add more social icons as needed */}
          </div>
          <div className='mt-5'>
            <p className='text-gray-400 hover:text-white'>Office No-1003, 10th Floor,</p>
            <p className='text-gray-400 hover:text-white'>Ellora Fiesta,</p>
            <p className='text-gray-400 hover:text-white'>B.R Ambedkar Marg, Jui Nagar,</p>
            <p className='text-gray-400 hover:text-white'>Navi Mumbai, India - 400705</p>
            <p className='text-gray-400 hover:text-white'>GSTIN: 27AADCE2693R1ZX</p>
            <p className='text-gray-400 hover:text-white'>Call us: 86558 21346</p>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-gray-500">
        &copy; {new Date().getFullYear()} EmbProto.in. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
