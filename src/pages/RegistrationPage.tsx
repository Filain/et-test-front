import {FC} from "react";
import {RegisterForm} from "../components/RegisterForm/RegisterForm";

interface IProps {

}

const RegistrationPage: FC<IProps> = () => {
    return (
        <div>
            <RegisterForm/>
        </div>
    );
};

export {RegistrationPage};