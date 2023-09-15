import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";

import { api } from "~/utils/api";

export default function Home() {
  const reviewData = api.review.getAll.useQuery()

  return (
    <>
      <Head>
        <title>♥ Fanny & Troy ♥</title>
        <meta name="description" content="Fanny & Troy's Favorite Taco Locations" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mx-auto container max-w-5xl p-4">
        <h1 className="text-5xl font-bold text-center">
          <span className="text-pink-600">Fanny</span>
          {" "} & {" "}
          <span className="text-blue-600">Troy</span>
        </h1>
        <h2 className="text-3xl font-bold text-center">Favorite <span className="text-orange-400">Taco</span> Locations</h2>

        <div className="grid grid-cols-6">
          <div className="col-span-5">
            <span className="text-xl font-extrabold">LOCATION</span>
          </div>
          <div className="col-span-1">
            <span className="text-xl font-extrabold">SCORE</span>
          </div>

          {reviewData.data?.map(review => (
            <>
              <div key={review.id} className="col-span-5">
                {review.name}
              </div>
              <div className="col-span-1">
                {review.rating}
              </div>
            </>
          ))}
        </div>
      </main>
    </>
  );
}
