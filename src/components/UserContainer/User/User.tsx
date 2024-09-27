import {FC} from "react";
import {IUser} from "../../../interfases/user.ts";

interface IProps {
    user: IUser
}

const User: FC<IProps> = ({user}) => {
    const{name,email, date_birth,where_hear,event_id}=user
    return (
        <div className="bg-gray-900 border flex flex-col p-5 rounded-2xl">
            <p>Name: <span className="font-bold"> {name}</span></p>
            <p>Email: <span className="font-bold"> {email}</span></p>
            <p>Where hear: <span className="font-bold"> {where_hear}</span></p>
            <p>Event Id: <span className="font-bold"> {event_id}</span></p>
            <p>Born in: <span className="font-bold"> {date_birth.toString()}</span></p>
        </div>
);
};

export {User};