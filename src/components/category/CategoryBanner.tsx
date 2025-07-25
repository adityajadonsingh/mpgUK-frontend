import Image from "next/image";
import Link from "next/link";
import React from "react";
interface bread {
  slug_name: string;
  slug_url: string;
}

export default function CategoryBanner({
  bgImg,
  pageName,
  breadcrum,
  short_description
}: {
  bgImg: string;
  pageName: string;
  breadcrum: bread[];
  short_description: string;
}) {
  return (
    <>
      <section className="page-banner category-banner flex justify-start items-center relative">
        <Image
          src={bgImg}
          alt={"banner image"}
          fill
          className="object-cover z-0"
        />
        <div className="text-start px-10 relative z-10 w-3/5">
          <h1 className="text-4xl capitalize text-white font-bold ">
            {pageName}
          </h1>
          <ul className="flex justify-start capitalize my-4 items-center gap-x-2 text-white font-medium text-lg">
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
          <p className="text-white">{short_description}</p>
        </div>
      </section>
    </>
  );
}
