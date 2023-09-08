import { redirect } from "react-router-dom";

const EmptyHome = () => {
    const directToPark = () => {
    return redirect("/park/1");
    }
    return( <></>)
};

export default EmptyHome;