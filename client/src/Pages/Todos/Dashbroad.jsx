import { useEffect, useContext } from "react";
import { TodosContext } from "../../Context/TodosContext";

const Dashbroad = ()=> {
    const { getAll } = useContext(TodosContext);
    useEffect(()=>{
        getAll();
    }, []);

    return(
        <>Dashbroad</>
    );
}

export default Dashbroad;