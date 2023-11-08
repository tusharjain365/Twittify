import { useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const Header = ({text,type}) => {

    const navigate=useNavigate();
    const handleBack = (() => navigate(-1)); // to back from where it loaded

    return (
        <section className={`flex items-center sticky top-0 z-50 bg-opacity-95`} style={{backgroundColor:`${type?"black":"white"}`}}>
            <KeyboardBackspaceIcon className='cursor-pointer' onClick={handleBack} />
            <h1 className="py-5 text-lg font-bold opacity-90 ml-5">{text}</h1>
        </section>
    )
}

export default Header;