import Image from "next/image";

export default function AboutSection({
  heading,
  description,
  imgBig,
  imgBig_alt,
  imgSmall,
}: {
  heading: string;
  description: string;
  imgBig: string;
  imgSmall: string;
  imgBig_alt: string;
}) {
  return (
    <>
      <section className="about-home my-10">
        <div className="container">
          <div className="flex md:flex-nowrap flex-wrap gap-x-6 items-center">
            <div className="images relative md:w-1/2 sm:w-4/5 w-full md:mx-0 mx-auto">
              <div className="img-big relative">
                <Image
                  src={imgBig}
                  alt={imgBig_alt}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <div className="img-small-wrapper">
                <div className="img-small">
                  <Image
                    src={imgSmall}
                    alt={"about us"}
                    fill
                    className="object-cover rounded-md shadow-lg"
                  />
                </div>
              </div>
            </div>
            <div className="content md:w-1/2 w-full md:mt-0 mt-10">
              <h3 className="heading lg:text-3xl text-2xl font-semibold mb-3">{heading}</h3>
              <div
                className="prose"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
