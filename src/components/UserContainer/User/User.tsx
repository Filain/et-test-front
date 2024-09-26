import {FC} from "react";
import {IUser} from "../../../../../et-test-front/src/interfases/user";
import css from './User.module.css'

interface IProps {
    user: IUser
}

const User: FC<IProps> = ({user}) => {
    const{name,email, date_birth,where_hear,event_id}=user
    return (
        <div className={css.user_wrap}>

            <p>name: {name}</p>
            <p>email: {email}</p>
            <p>where_hear: {where_hear}</p>
            <p>event_id: {event_id}</p>
            <p>date_birth: {date_birth.toString()}</p>
        </div>
    );
};

export {User};