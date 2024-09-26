import {FC} from "react";
import css from './Event.module.css'
import {NavLink} from "react-router-dom";
import {IEvent} from "../../../interfases/event.ts";

interface IProps  {
    event: IEvent
}

const Event: FC<IProps> = ({event}) => {
    const {date, title, description,organizer,id}=event
    return (
        <div className={css.event_wrap}>
            <p>id: {id}</p>
            <p>date: {date}</p>
            <p>title: {title}</p>
            <p>description: {description}</p>
            <p>organizer: {organizer}</p>
            <div className={css.buttonWrap}>
            <NavLink to={`/registration/${id}`} className={css.linkbutton}>Register</NavLink>
            <NavLink to={`/users/${id}`} className={css.linkbutton}>View</NavLink>
            </div>
            </div>
    );
};

export {Event};