import Image from "next/image";
import Link from "next/link";
import React from "react";
interface bread {
  slug_name: string;
  slug_url: string;
}

export default function PageBanner({
  bgImg,
  pageName,
  breadcrum,
}: {
  bgImg: string;
  pageName: string;
  breadcrum: bread[];
}) {
  return (
    <>
      <section className="page-banner flex justify-center items-center relative">
        <Image
          src={bgImg}
          alt={"banner image"}
          fill
          className="object-cover z-0"
        />
        <div className="text-center relative z-10">
          <h1 className="text-4xl capitalize text-white font-bold ">
            {pageName}
          </h1>
          <ul className="flex justify-center gap-x-2 text-white font-medium text-lg mt-4">
            <li>
              <Link className="" href={"/"}>
                <div className="flex gap-x-1 hover:text-[#f37a38]">
                  <i className="bi bi-house-door-fill"></i>
                  <span>Home</span>
                </div>
              </Link>
            </li>
            <li>
              <i className="bi bi-chevron-right"></i>
            </li>
            {breadcrum.map((bread, idx) => {
              if (idx + 1 == breadcrum.length) {
                return (
                  <li key={idx + "bread"}>
                    <div className="flex text-[#f37a38]">
                      <span>{bread.slug_name}</span>
                    </div>
                  </li>
                );
              } else {
                return (
                  <React.Fragment key={idx + "bread"}>
                    <li>
                      <Link className="" href={`${bread.slug_url}`}>
                        <div className="flex gap-x-1 hover:text-[#f37a38]">
                          <span>{bread.slug_name}</span>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <i className="bi bi-chevron-right"></i>
                    </li>
                  </React.Fragment>
                );
              }
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
