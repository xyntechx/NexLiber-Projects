import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import ButtonLink from "../components/ButtonLink";

const Home: NextPage = () => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center py-2">
            <Head>
                <title>roygbiv</title>
                <link rel="icon" href="/favicon/favicon.ico" />
            </Head>

            <h1 className="text-5xl mb-5 font-bold">ROYGBIV</h1>

            <ButtonLink url="/game/easy" text="Easy" color="green" />
            <ButtonLink url="/game/medium" text="Medium" color="yellow" />
            <ButtonLink url="/game/hard" text="Hard" color="red" />
            <ButtonLink url="/game/custom" text="Custom" color="blue" />

            <Link href="/help">
                <a className="border-4 border-blue-600 rounded-full py-1 px-3 text-center text-blue-600 text-lg hover:bg-blue-600 hover:text-white transition-colors fixed bottom-10 right-10 font-bold animate-bounce">
                    ?
                </a>
            </Link>
        </main>
    );
};

export default Home;
