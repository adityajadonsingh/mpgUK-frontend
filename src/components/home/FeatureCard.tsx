import Image from "next/image";

export default function FeatureCard() {
  return (
    <>
      <section className="features my-6">
        <div className="container">
          <div className="grid md:grid-cols-4 grid-cols-2 gap-6">
            <div className="card py-2 px-3 rounded shadow-sm flex flex-col justify-center items-center">
              <div className="icn">
                <Image
                  width={30}
                  height={30}
                  className="w-[30px] h-[30px] object-contain"
                  src="/media/icons/quality.png"
                  alt="quality"
                />
              </div>
              <div className="text mt-2">
                <span className="inline-block lg:text-lg text-base font-medium text-center">
                  Best Quality Assured
                </span>
              </div>
            </div>
            <div className="card py-2 px-3 rounded shadow-sm flex flex-col justify-center items-center">
              <div className="icn">
                <Image
                  width={30}
                  height={30}
                  className="w-[30px] h-[30px] object-contain"
                  src="/media/icons/delivery-van.png"
                  alt="quality"
                />
              </div>
              <div className="text mt-2">
                <span className="inline-block lg:text-lg text-base font-medium text-center">
                  Timely Delivery
                </span>
              </div>
            </div>
            <div className="card py-2 px-3 rounded shadow-sm flex flex-col justify-center items-center">
              <div className="icn">
                <Image
                  width={30}
                  height={30}
                  className="w-[30px] h-[30px] object-contain"
                  src="/media/icons/customer-satisfaction.png"
                  alt="quality"
                />
              </div>
              <div className="text mt-2">
                <span className="inline-block lg:text-lg text-base font-medium text-center">
                  Customer Satisfaction
                </span>
              </div>
            </div>
            <div className="card py-2 px-3 rounded shadow-sm flex flex-col justify-center items-center">
              <div className="icn">
                <Image
                  width={30}
                  height={30}
                  className="w-[30px] h-[30px] object-contain"
                  src="/media/icons/euro-price.png"
                  alt="quality"
                />
              </div>
              <div className="text mt-2">
                <span className="inline-block lg:text-lg text-base font-medium text-center">
                  Reasonable Price
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
