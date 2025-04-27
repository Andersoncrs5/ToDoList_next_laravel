import { faCopyright } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Footer() {
    return (
        <footer className="p-3 text-center">
            <FontAwesomeIcon icon={faCopyright} />
        </footer>
    );
}
