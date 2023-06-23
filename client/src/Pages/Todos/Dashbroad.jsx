import Sidebar from "../../Components/layoutContent/Sidebar";
import Content from "../../Components/layoutContent/Content";

const Dashbroad = ()=> {

    return(
        <div className="flex">
            <div>
                <Sidebar />
            </div>
            <div className="w-full">
                <Content />
            </div>
        </div>
    );
}

export default Dashbroad;