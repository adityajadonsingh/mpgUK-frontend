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
          <div className="flex gap-x-6 items-center">
            <div className="images relative w-1/2">
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
            <div className="content w-1/2">
              <h3 className="heading text-3xl font-semibold mb-3">{heading}</h3>
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
