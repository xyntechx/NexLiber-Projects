import COLORS from "../utils/colors";

interface ButtonsProps {
    setAnswer: (color: string) => void;
    toggle: boolean;
    setToggle: (toggle: boolean) => void;
    scramble?: boolean;
}

const Buttons = ({
    setAnswer,
    toggle,
    setToggle,
    scramble = false,
}: ButtonsProps) => {
    return (
        <div className="grid-cols-7">
            {scramble ? (
                <>
                    {COLORS.scrambled.map((color) => (
                        <Button
                            key={color}
                            color={color}
                            setAnswer={setAnswer}
                            toggle={toggle}
                            setToggle={setToggle}
                        />
                    ))}
                </>
            ) : (
                <>
                    {COLORS.fixed.map((color) => (
                        <Button
                            key={color}
                            color={color}
                            setAnswer={setAnswer}
                            toggle={toggle}
                            setToggle={setToggle}
                        />
                    ))}
                </>
            )}
        </div>
    );
};

export default Buttons;

interface ButtonProps {
    color: string;
    setAnswer: (color: string) => void;
    toggle: boolean;
    setToggle: (toggle: boolean) => void;
}

const Button = ({ color, setAnswer, toggle, setToggle }: ButtonProps) => {
    return (
        <button
            onClick={() => {
                setAnswer(color);
                setToggle(!toggle);
            }}
            className={`${(() => {
                switch (color) {
                    case "red":
                        return "bg-red-500";
                    case "orange":
                        return "bg-orange-500";
                    case "yellow":
                        return "bg-yellow-500";
                    case "green":
                        return "bg-green-500";
                    case "blue":
                        return "bg-blue-500";
                    case "indigo":
                        return "bg-indigo-500";
                    case "violet":
                        return "bg-violet-500";
                    default:
                        return "bg-white";
                }
            })()} md:p-14 p-5 md:mx-5 mx-1 hover:scale-110 transition-transform`}
        />
    );
};
