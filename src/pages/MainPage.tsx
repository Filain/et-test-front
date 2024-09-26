import {FC} from "react";
import {Outlet} from "react-router-dom";

const MainPage: FC = () => {
    return (
        <div className="w-[100vw] flex align-top justify-center">
            <Outlet/>
        </div>
    );
};

export {MainPage};