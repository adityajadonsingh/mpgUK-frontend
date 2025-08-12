// app/not-found.tsx
import Link from "next/link";
import Image from "next/image";
export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center bg-gray-200 py-10 text-center">
      <h1 className="text-6xl font-bold text-gray-800">Error</h1>
      <div className="img-box relative h-64 my-5 w-2/5">
        <Image
            src={"/media/error-404.png"}
            alt="error"
            fill
            className="object-contain"
      />
      </div>
      <p className="mt-4 text-lg text-gray-600">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-[#5a5c5d] px-4 py-2 !text-white hover:bg-[#f36c23]"
      >
        Go Back Home
      </Link>
    </section>
  );
}
