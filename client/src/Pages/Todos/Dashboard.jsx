import Content from "../../Components/layoutContent/Content";
import AddTodoForm from "../../Components/Form/AddTodoForm";
import EditTodoForm from "../../Components/Form/EditTodoForm";


const Dashboard = ()=> {

    return(
        <div className="">
            <div className="w-full h-screen relative">
                <Content />
            </div>
            <AddTodoForm />
            <EditTodoForm />      
        </div>
    );
}

export default Dashboard;