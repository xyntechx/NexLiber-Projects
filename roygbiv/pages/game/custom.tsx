import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import ButtonLink from "../../components/ButtonLink";
import Buttons from "../../components/Buttons";
import COLORS from "../../utils/colors";

const Custom: NextPage = () => {
    const [answer, setAnswer] = useState("");
    const [display, setDisplay] = useState(
        COLORS.fixed[Math.floor(Math.random() * 7)]
    );
    const [displayColor, setDisplayColor] = useState(
        COLORS.fixed[Math.floor(Math.random() * 7)]
    );
    const [toggle, setToggle] = useState(true); // to detect whether answer has changed
    const [timer, setTimer] = useState<number>();
    const [score, setScore] = useState(0);
    const [start, setStart] = useState(false);

    const timerValue = useRef(30);
    const [scramble, setScramble] = useState(false);
    const [mismatch, setMismatch] = useState(false);

    const [correctAudio, setCorrectAudio] = useState<HTMLAudioElement>();
    const [wrongAudio, setWrongAudio] = useState<HTMLAudioElement>();

    useEffect(() => {
        setCorrectAudio(new Audio("/audio/correct-audio.wav"));
        setWrongAudio(new Audio("/audio/wrong-audio.wav"));
    }, []);

    useEffect(() => {
        setDisplay(() => COLORS.fixed[Math.floor(Math.random() * 7)]);
        setDisplayColor(() => COLORS.fixed[Math.floor(Math.random() * 7)]);
        checkAnswer();
    }, [toggle]);

    useEffect(() => {
        localStorage.setItem("ROYGBIV Score", JSON.stringify(score));
        if (timer! <= 0) window.location.href = "/summary";
        const intervalID = setTimeout(() => {
            setTimer((timer) => (timer! -= 1));
        }, 1000);
        return () => clearInterval(intervalID);
    }, [timer]);

    const checkAnswer = () => {
        if (answer.length > 0) {
            if (answer === display) {
                setScore((score) => (score += 1));
                correctAudio!.play();
            } else {
                wrongAudio!.play();
            }
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center py-2">
            <Head>
                <title>roygbiv</title>
                <link rel="icon" href="/favicon/custom.ico" />
            </Head>

            {start ? (
                <>
                    <h1 className="font-bold text-5xl fixed top-10">{timer}</h1>
                    <p className="text-2xl mb-5 font-bold">{score}</p>

                    {mismatch ? (
                        <h1
                            className={`font-bold text-3xl md:text-5xl mb-10 md:mb-20 ${(() => {
                                switch (displayColor) {
                                    case "red":
                                        return "text-red-500";
                                    case "orange":
                                        return "text-orange-500";
                                    case "yellow":
                                        return "text-yellow-500";
                                    case "green":
                                        return "text-green-500";
                                    case "blue":
                                        return "text-blue-500";
                                    case "indigo":
                                        return "text-indigo-500";
                                    case "violet":
                                        return "text-violet-500";
                                    default:
                                        return "text-black";
                                }
                            })()}`}
                        >
                            {display.toUpperCase()}
                        </h1>
                    ) : (
                        <h1
                            className={`font-bold text-5xl mb-20 ${(() => {
                                switch (display) {
                                    case "red":
                                        return "text-red-500";
                                    case "orange":
                                        return "text-orange-500";
                                    case "yellow":
                                        return "text-yellow-500";
                                    case "green":
                                        return "text-green-500";
                                    case "blue":
                                        return "text-blue-500";
                                    case "indigo":
                                        return "text-indigo-500";
                                    case "violet":
                                        return "text-violet-500";
                                    default:
                                        return "text-black";
                                }
                            })()}`}
                        >
                            {display.toUpperCase()}
                        </h1>
                    )}

                    {scramble ? (
                        <Buttons
                            setAnswer={setAnswer}
                            toggle={toggle}
                            setToggle={setToggle}
                            scramble={true}
                        />
                    ) : (
                        <Buttons
                            setAnswer={setAnswer}
                            toggle={toggle}
                            setToggle={setToggle}
                            scramble={false}
                        />
                    )}
                </>
            ) : (
                <>
                    <h1 className="font-bold text-5xl mb-5">Custom</h1>

                    <div className="flex flex-row w-1/5 items-center justify-between gap-x-5">
                        <label htmlFor="Timer duration">Timer duration</label>
                        <input
                            type="number"
                            className="border border-black focus:border-emerald-600 rounded-lg outline-none focus:outline-none text-center w-[80px]"
                            defaultValue={30}
                            onChange={(e) =>
                                (timerValue.current = Number(e.target.value))
                            }
                        />
                    </div>

                    <div className="flex flex-row w-1/5 items-center justify-between gap-x-5">
                        <label htmlFor="Scramble buttons">
                            Scramble buttons
                        </label>
                        <input
                            name="Scramble buttons"
                            type="checkbox"
                            className="accent-emerald-600"
                            onChange={() =>
                                setScramble((scramble) => !scramble)
                            }
                        />
                    </div>

                    <div className="flex flex-row w-1/5 items-center justify-between gap-x-5">
                        <label htmlFor="Mismatch">
                            Mismatch display and display color
                        </label>
                        <input
                            name="Mismatch"
                            type="checkbox"
                            className="accent-emerald-600"
                            onChange={() =>
                                setMismatch((mismatch) => !mismatch)
                            }
                        />
                    </div>

                    <button
                        onClick={() => {
                            setStart(true);
                            setTimer(timerValue.current);
                        }}
                        className="border border-blue-400 rounded-lg py-2 px-5 w-3/5 md:w-1/5 text-center text-blue-600 text-lg hover:bg-blue-400 hover:text-black transition-colors mt-10 mb-3"
                    >
                        Start
                    </button>
                    <ButtonLink url="/" text="Back" color="red" />
                </>
            )}
        </main>
    );
};

export default Custom;
