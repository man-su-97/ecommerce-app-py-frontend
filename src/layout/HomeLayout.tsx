import bedroom_accessories from "../assets/new_banner.jpeg";
import sex_toys_for_women from "../assets/sex toys for women.jpg";
import adult_toys from "../assets/adult toys.png";
import sex_toys_for_lgbtq from "../assets/sex toys for lgbtq.png";
import ProductSlider from "../pages/Slider";
import { Link } from "react-router-dom";
import Footer from "../pages/footer-section";

function HomeLayout() {
  return (
    <div className="w-full h-full overflow-x-hidden font-avenirCF ">
      <section className="w-full md:h-[736px]  relative overflow-hidden">
        <div className="h-72 md:h-full w-full">
          <img
            src={bedroom_accessories}
            alt="banner"
            className="object-fill w-full h-full"
          />
        </div>

        <div className="absolute top-24 left-4 md:top-40 md:left-14 flex items-center md:top-1/6 ">
          <h1 className="text-white  md:text-6xl font-[600] md:text-start">
            <div className="hidden md:block font-libreBaskervilleCF">
              Your Pleasure, Perfectly
              <br /> Priced.
            </div>
            <div className="md:hidden text-start font-libreBaskervilleCF text-4xl">
              Your Pleasure,
              <br />
              Perfectly Priced.
            </div>
          </h1>
        </div>
      </section>

      <div className="flex justify-center max-w-full">
        <h1 className="text-2xl py-10 md:text-4xl md:my-20 font-avenirCF tracking-wide font-light ">
          WHY US ?
        </h1>
      </div>

      <div className="flex flex-col-reverse lg:flex-row w-full md:pl-52 md:pr-28 lg:mb-60">
        <div className="w-full md:w-1/2 p-5 md:pl-20 flex flex-col items-center md:items-start">
          <p className="text-center md:text-left overflow-hidden leading-loose text-[22px] font-thin tracking-wide font-avenirCF">
            Your source of enjoyment is readily available through our premium
            quality and affordable adult toys. From cute looking vibrators to
            realistic dildos, to fancy BDSM toys and more. Each toy ensures
            maximum comfort andenjoyment you never felt .Gain the privacy you
            deserve and seek this type of happiness here today!
          </p>
          <button className="group bg-[#5E5E4A] px-9 text-xs py-3 mt-5 hover:bg-gray-200 hover:border border-black group-hover:text-black">
            <Link to={"/product-listing"}>
              <p className="text-white font-thin font-avenirCF text-sm group-hover:text-black">
                Shop Now
              </p>
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
      <div className="bg-[#DCB4BC] pb-16  pt-20 md:pt-40 mb-28 w-screen h-auto">
        <div className="mb-10 md:mb-20">
          <h1 className="mx-auto font-thin text-4xl md:text-5xl tracking-widest">
            MOST POPULAR
          </h1>
        </div>
        <ProductSlider text={"All Products"} />
      </div>
      <div className="px-10 xl:ml-32 lg:px-32 flex flex-col lg:flex-row w-full h-full items-center md:space-x-10">
        <div className="w-full lg:w-2/5 h-full  lg:mt-[-80px] ">
          <img
            src={adult_toys}
            alt="story-img-2"
            className="md:min-h-[576px] md:min-w-[455px]"
          />
        </div>

        <div className="w-full lg:w-3/5 h-full font-avenirCF">
          <div className="flex flex-col items-center w-full lg:w-96  md:space-y-10  lg:ml-10 mt-6 lg:mt-0 ">
            <div>
              <h2 className="text-2xl  md:px-0 md:pb-1 md:text-[39px] font-thin">
                BEYOND PERFECT
              </h2>
            </div>

            <p className="text-center overflow-hidden max-w-full lg:max-w-[40rem] py-6 px-4 font-avenirCF font-thin text-[17px] leading-loose tracking-wide">
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
        <h2 className="text-2xl md:text-3xl mt-10 md:mt-32 font-thin font-avenirCF text-nowrap">
          PLEASURE FOR EVERYONE
        </h2>
        <p className="text-center overflow-hidden max-w-full lg:max-w-[40rem] py-10 px-4 font-avenirCF font-thin text-[17px] leading-loose tracking-wide">
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
