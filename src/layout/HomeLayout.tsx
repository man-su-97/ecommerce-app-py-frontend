import bedroom_accessories from "../assets/bedroom accessories_1.jpg";
import sex_toys_for_women from "../assets/sex toys for women.jpg";
import adult_toys from "../assets/adult toys.png";
import sex_toys_for_lgbtq from "../assets/sex toys for lgbtq.png";
import ProductSlider from "../pages/Slider";
import { Link } from "react-router-dom";
import Footer from "../pages/footer-section";

function HomeLayout() {
  return (
    <div className="w-full h-full overflow-x-hidden">
      <section className="w-full md:max-h-[736px]  relative overflow-hidden">
        <img
          src={bedroom_accessories}
          alt="banner"
          className="w-full object-cover object-bottom"
        />
      </section>

      <div className="flex justify-center max-w-full">
        <h1 className="text-xl py-10 md:text-5xl md:my-20">WHY US ?</h1>
      </div>

      <div className="flex flex-col-reverse lg:flex-row w-full md:pl-52 md:pr-28 lg:mb-60 ">
        <div className="w-full md:w-1/2 p-5 md:pl-20 ">
          <p className=" text-center md:text-left overflow-hidden leading-loose text-[17px]">
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
          <button className="bg-[#5E5E4A] px-9 ml-32 md:ml-0 text-xs md:px-9 py-3 md:py-3 mt-5">
            <Link to={"/product-listing"}>
              <p className="text-white">SHOP NOW</p>
            </Link>
          </button>
        </div>
        <div className="w-full md:w-1/2 h-80 ">
          <img
            src={sex_toys_for_women}
            alt="story-img-1"
            className="md:min-h-[590px] lg:min-h-auto md:min-w-[490px] lg:min-w-auto"
          />
        </div>
      </div>
      <div className="bg-[#DCB4BC] py-40 lg:py-52 lg:mt-20 my-40 w-screen h-auto">
        <ProductSlider />
      </div>
      <div className="px-10   xl:ml-32 lg:px-32 flex flex-col lg:flex-row w-full h-full items-center md:space-x-10">
        <div className="w-full lg:w-2/5 h-full  lg:mt-[-80px] ">
          <img
            src={adult_toys}
            alt="story-img-2"
            className="md:min-h-[576px] md:min-w-[455px]"
          />
        </div>

        <div className="w-full lg:w-3/5 h-full">
          <div className="flex flex-col items-start w-full lg:w-96  md:space-y-10  lg:ml-10 mt-6 lg:mt-0">
            <div>
              <h2 className="text-xl px-20 md:px-0 pb-4 md:text-[39px]">
                BEYOND PERFECT
              </h2>
            </div>

            <p className="text-[14px] md:text-[17px] text-center md:text-justify xl:leading-loose">
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
        <h2 className="text-3xl mt-10 md:mt-48">PLEASURE FOR EVERYONE</h2>
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
          className="w-full lg:w-[55rem] h-auto object-cover object-center px-5"
          alt="footerImage"
        />
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}

export default HomeLayout;
