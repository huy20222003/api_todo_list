import Content from "../../Components/layoutContent/Content";
import ToastMessage from "../../Components/ToastMessage";

const Dashbroad = ()=> {

    return(
        <div className="">
            <div className="w-full h-screen relative">
                <Content />
            </div>
            <ToastMessage></ToastMessage>
        </div>
    );
}

export default Dashbroad;