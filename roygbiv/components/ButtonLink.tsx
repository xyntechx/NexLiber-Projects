import Link from "next/link";

interface ButtonLinkProps {
    url: string;
    text: string;
    color: string;
}

const ButtonLink = ({ url, text, color }: ButtonLinkProps) => {
    return (
        <Link href={url}>
            <a
                className={`border rounded-lg py-2 px-5 w-3/5 md:w-1/5 text-center text-lg hover:text-black transition-colors my-2 ${(() => {
                    switch (color) {
                        case "red":
                            return "text-red-500 border-red-400 hover:bg-red-400";
                        case "yellow":
                            return "text-yellow-500 border-yellow-400 hover:bg-yellow-400";
                        case "green":
                            return "text-green-600 border-green-400 hover:bg-green-400";
                        case "blue":
                            return "text-blue-600 border-blue-400 hover:bg-blue-400";
                        default:
                            return "text-black";
                    }
                })()}`}
            >
                {text}
            </a>
        </Link>
    );
};

export default ButtonLink;
