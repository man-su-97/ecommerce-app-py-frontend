import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <div className="flex flex-col md:flex-row bg-[#DCB4BC] justify-evenly items-center mt-20 px-4 lg:px-0">
        <div className="flex flex-col py-16">
          <div className="py-10 flex flex-col gap-3">
            <div className="flex flex-col items-center md:items-start space-y-3 md:space-y-1">
              <h1 className="text-[17px] md:text-2xl pb-5">SHOP</h1>
              <p className="text-[14px]">WOMEN</p>
              <p className="text-[14px]">LGBTQ+</p>
            </div>
          </div>
          <div className="py-10 flex flex-col gap-3">
            <div className="flex flex-col items-center md:items-start space-y-3 md:space-y-1">
              <h1 className="text-[17px] md:text-2xl pb-5">HELP</h1>
              <p className="text-[14px]">TERMS & CONDITIONS</p>
              <p className="text-[14px]">PRIVACY POLICY</p>
              <p className="text-[14px]">SHIPPING & RETURNS</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col-reverse md:flex-col">
          <div className="py-10 flex flex-col items-center  gap-3">
            <div className="flex flex-col items-center md:items-start space-y-3 md:space-y-1">
              <h1 className="text-[17px] md:text-2xl">PLEASUREYOURSELF</h1>
              <p className="text-[14px]">BLOG</p>
              <p className="text-[14px]">CONTACT US</p>
              <Link to={"/faq-section"}>
                <button className="text-[14px]">FAQ</button>
              </Link>
            </div>
          </div>
          <div className=" hidden md:block py-10">
            <div className="py-10 flex flex-col gap-3">
              <h1 className="text-3xl">NEWSLETTER SIGN UP</h1>
              <p>Recieve our latest updates</p>
              <input placeholder="enter your email" />
              <button className="bg-black text-white py-2">SUBMIT</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
