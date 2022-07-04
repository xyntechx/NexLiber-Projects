import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState } from "react";

export default function Home() {
    const [tab, setTab] = useState("about");

    return (
        <div className={styles.container}>
            <Head>
                <title>My Website</title>
                <meta
                    name="description"
                    content="My website created with Nexliber"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <Image
                    src="/profile.png"
                    width={200}
                    height={200}
                    alt="My Profile Picture"
                />
                <div className={styles.content}>
                    <h1 className={styles.name}>Nyx Iskandar</h1>
                    {tab === "about" && (
                        <p className={styles.text}>
                            A teen passionate about computer science, research,
                            entrepreneurship, and service-learning.
                        </p>
                    )}

                    {tab === "skills" && (
                        <p className={styles.text}>
                            Next.js | Angular | Nuxt 3 | Svelte
                        </p>
                    )}

                    {tab === "projects" && (
                        <p className={styles.text}>
                            Nexliber | NXpyre | Code for Hope
                        </p>
                    )}

                    <div className={styles.buttonContainer}>
                        <button
                            className={styles.button}
                            onClick={() => setTab("about")}
                        >
                            About
                        </button>
                        <button
                            className={styles.button}
                            onClick={() => setTab("skills")}
                        >
                            Skills
                        </button>
                        <button
                            className={styles.button}
                            onClick={() => setTab("projects")}
                        >
                            Projects
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
