import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import ButtonLink from "../components/ButtonLink";

const Home: NextPage = () => {
    const [score, setScore] = useState(0);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("ROYGBIV Score")!);
        setScore(stored);
    });

    return (
        <main className="flex min-h-screen flex-col items-center justify-center py-2">
            <Head>
                <title>roygbiv</title>
                <link rel="icon" href="/favicon/favicon.ico" />
            </Head>

            <p className="text-xl mb-1">You scored</p>
            <h1 className="text-5xl mb-1 font-bold">{score}</h1>
            <p className="text-xl mb-10">points</p>
            <ButtonLink url="/" text="Home" color="blue" />
        </main>
    );
};

export default Home;
