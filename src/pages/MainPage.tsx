import {FC, PropsWithChildren} from "react";
import {Outlet} from "react-router-dom";


interface IProps extends PropsWithChildren {

}

const MainPage: FC<IProps> = () => {
    return (
        <div>

            <Outlet/>


        </div>
    );
};

export {MainPage};