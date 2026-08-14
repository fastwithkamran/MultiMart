import { Link } from "react-router-dom";
import {
  footerProductLinks,
  footerSupportLinks,
  footerShopLinks,
} from "../../../static/data";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineTwitter,
} from "react-icons/ai";

function Footer() {
  return (
    <div className="bg-black text-white">
      {/* Subscribe now section */}
      <div className="md:flex md:justify-between md:items-center sm:px-12 px-4 bg-blue-800 py-7">
        <h1 className="lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold md:w-2/5">
          <span className="text-green-400">
            Subscribe
            <span className="text-white ml-2">
              us to get news, events and offers
            </span>
          </span>
        </h1>

        <div>
          <input
            type="text"
            required
            placeholder="Enter your email..."
            className="text-gray-800 bg-white sm:w-72 w-full sm:mr-5 mr-1 lg:mb-0 mb-4 py-2.5 rounded px-2 focus:outline-none"
          />
          <button className="bg-green-300 hover:bg-teal-500 duration-300 px-5 py-2.5 rounded-md text-white md:w-auto w-full">
            Submit
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 sm:px-8 px-5 pt-5 pb-16 justify-items-center">
        {/* Shop logo and description */}
        <ul className="px-5 mt-8 flex flex-col items-center text-center">
          <img
            src="/favicon.png"
            alt="Logo"
            className="invert-100 h-10 object-cover"
          />
          <p className="mt-4 text-sm">
            Embrace Your E-commerce Journey with MultiMart!
          </p>
          <div className="flex mt-3.5 gap-3">
            <a
              target="_blank"
              href="https://www.facebook.com"
              rel="noopener noreferrer"
            >
              <AiFillFacebook size={25} className="cursor-pointer" />
            </a>
            <a
              target="_blank"
              href="https://x.com"
              rel="noopener noreferrer"
            >
              <AiOutlineTwitter size={25} className="cursor-pointer" />
            </a>
            <a
              target="_blank"
              href="https://www.instagram.com"
              rel="noopener noreferrer"
            >
              <AiFillInstagram size={25} className="cursor-pointer" />
            </a>
            <a
              target="_blank"
              href="https://www.youtube.com"
              rel="noopener noreferrer"
            >
              <AiFillYoutube size={25} className="cursor-pointer" />
            </a>
          </div>
        </ul>

        {/* Company section */}
        <ul className="flex flex-col mt-6 sm:items-start items-center">
          <h1 className="mb-1 font-semibold">Company</h1>
          {footerProductLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.link}
                className="text-gray-400 hover:text-teal-400 duration-300 text-sm cursor-pointer leading-6"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="flex flex-col mt-6 sm:items-start items-center">
          <h1 className="mb-1 font-semibold">Shop</h1>
          {footerShopLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.link}
                className="text-gray-400 hover:text-teal-400 duration-300 text-sm cursor-pointer leading-6"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="flex flex-col mt-6 sm:items-start items-center">
          <h1 className="mb-1 font-semibold">Support</h1>
          {footerSupportLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.link}
                className="text-gray-400 hover:text-teal-400 duration-300 text-sm cursor-pointer leading-6"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center pt-2 text-gray-400 text-sm pb-8 justify-items-center items-center">
        <span className="flex">
          © 2026
          <a
            target="_blank"
            href="https://kamranportfolio-six.vercel.app"
            rel="noopener noreferrer"
            className="ml-1 text-blue-300 font-semibold cursor-pointer"
          >
            fastwithkamran
          </a>
        </span>
        <span className="text-blue-300 font-semibold cursor-pointer">
          Terms | Privacy Policy
        </span>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsrpBiXAJiQBMZ9PGFfqzr1tpa4ofGwR9qGWqUDOD2WA&s=10"
          alt="CardsImage"
          className="h-15"
        />
      </div>
    </div>
  );
}

export default Footer;
