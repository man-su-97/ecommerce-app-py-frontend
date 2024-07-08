import banner from "../assets/new_banner.jpeg";
import sex_toys_for_women from "../assets/sex toys for women.jpg";
import adult_toys from "../assets/adult toys.png";
import sex_toys_for_lgbtq from "../assets/sex toys for lgbtq.png";
import ProductSlider from "../pages/Slider";
import { Link } from "react-router-dom";

function HomeLayout() {
  return (
    <div className="max-w-full overflow-x-hidden">
      <section className="w-screen h-[719px] relative overflow-hidden">
        <img
          src={banner}
          alt="banner"
          className="w-full object-cover object-center"
        />
        <div className="absolute inset-24 flex items-center  top-1/6 ">
          <h1 className="text-white text-5xl md:text-7xl font-bold">
            Your Pleasure, Perfectly
            <br /> Priced.
          </h1>
        </div>
      </section>

      <div className="flex justify-center max-w-full">
        <h1 className="text-5xl my-20">WHY US ?</h1>
      </div>

      <div className="px-10 lg:px-40 flex flex-col lg:flex-row max-w-full">
        <div className="px-0 lg:px-40 py-14 flex-1">
          <p className="text-justify overflow-hidden">
            We are the first Indian brand specializing in personalized women and
            LGBTQI+ intimate products, dedicated to revolutionizing your
            intimate experience. Our large variety of products including
            vibrators, dildos to BDSM equipment, beautifully crafted high
            quality options all at very accessible price points. As pioneers, we
            prioritize skin-friendly materials and discreet packaging and
            payments ensuring your comfort and privacy. Trust us to guide you on
            your sexual journey like no other. Because everyone deserves a
            little luxury without the luxury price tag – smart, savvy, and
            oh-so-satisfying!.
          </p>
          <button className="bg-[#DCB4BC] text-white text-xs rounded-lg px-4 py-2 mt-10">
            <Link to={"/product-listing"}>SHOP NOW</Link>
          </button>
        </div>

        <img
          src={sex_toys_for_women}
          alt="story-img-1"
          className="h-auto w-full lg:w-1/2 lg:h-2/3"
        />
      </div>
      <div className="bg-[#DCB4BC] pt-48 my-40 pb-20 w-screen">
        <ProductSlider />
      </div>
      <div className="px-10 lg:px-40 flex flex-col lg:flex-row w-full h-full">
        <div className="w-full lg:w-2/5 h-full pl-0 lg:pl-20 pt-10">
          <img
            src={adult_toys}
            alt="story-img-2"
            className="h-auto w-full lg:w-auto"
          />
        </div>

        <div className="w-full lg:w-3/5 h-full">
          <div className="flex flex-col items-start w-full lg:w-96 space-y-10 lg:ml-60 mt-20 lg:mt-80">
            <div>
              <h2 className="text-4xl">BEYOND PERFECT</h2>
            </div>

            <p className="text-justify">
              Why should one go for the ordinary when there is extraordinary?
              Being one of the largest and fastest-growing providers of luxury
              women and LGBTQ+ products in India, Pleasure Yourself is more than
              lifestyle products. Our products are so smooth, like silk for
              customers to touch and explore; ranging from intimate
              massagers,dildos,BDSM toys and more accessories and virtually
              everything in between. Choose us for a journey beyond perfection
              in the world of sex toys and adult pleasures.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between">
        <h2 className="text-3xl mt-48">PLEASURE FOR EVERYONE</h2>
        <p className="text-center overflow-hidden max-w-full lg:max-w-[40rem] py-10 px-4">
          At Pleasure Yourself, we celebrate your journey to self-discovery. As
          pioneers in personalized adult products for the LGBTQ+ community,
          we're proud to support your unique identity and desires. With our
          curated selection of sex toys and adult pleasures, find a safe space
          to explore and indulge in being yourself. Join us on this empowering
          journey, because your pleasure is our priority.
        </p>
        <img
          src={sex_toys_for_lgbtq}
          className="w-full lg:w-[55rem] h-auto object-cover object-center"
          alt="footerImage"
        />
      </div>
      <div className="flex bg-[#DCB4BC] justify-evenly items-center mt-20 px-4 lg:px-0">
        <div className="flex flex-col py-16">
          <div className="py-10 flex flex-col gap-3">
            <h1 className="text-3xl">SHOP</h1>
            <ul>
              <li>WOMEN</li>
              <li>LGBTQ+</li>
            </ul>
          </div>
          <div className="py-10 flex flex-col gap-3">
            <h1 className="text-3xl">HELP</h1>
            <ul>
              <li>TERMS & CONDITIONS</li>
              <li>PRIVACY POLICY</li>
              <li>SHIPPING & RETURNS</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col py-10">
          <div className="py-10 flex flex-col gap-3">
            <h1 className="text-3xl">PLEASUREYOURSELF</h1>
            <ul>
              <li>BLOG</li>
              <li>CONTACT US</li>
              <Link to={"/faq-section"}>
                <button>FAQ</button>
              </Link>
            </ul>
          </div>
          <div className="py-10">
            <div className="py-10 flex flex-col gap-3">
              <h1 className="text-3xl">NEWSLETTER SIGN UP</h1>
              <p>Recieve our latest updates</p>
              <input placeholder="enter your email" />
              <button className="bg-black text-white py-2">SUBMIT</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeLayout;
