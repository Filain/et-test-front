import {FC} from "react";
import {NavLink} from "react-router-dom";
import {IEvent} from "../../../interfases/event.ts";

interface IProps {
    event: IEvent
}

const Event: FC<IProps> = ({event}) => {
    const {date, title, description, organizer, id, url, image} = event
    return (
        <div className="bg-gray-900 border flex flex-col p-5 rounded-2xl hover:transform hover:scale-105 transition duration-300">

            <NavLink  to={url} className="font-bold text-xl uppercase text-center h-12">{title}</NavLink>

            <div className="display flex flex-row mt-5 h-[176px] ">
                <div className="flex justify-center items-center"><img className="object-cover object-center border-8 rounded-3xl" width={200} src={image}
                          alt={title}/></div>
                <div className="p-4">
                <p>Event category: <span className="font-bold"> {description} </span></p>
                <p>Organizer:<span className="font-bold"> {organizer} </span></p>
                <p>Date:<span className="font-bold"> {date?.split('T')[0]}</span></p>
                    <p>Event Id:<span className="font-bold">  {id}</span></p>
                </div>
            </div>


            <div className=" flex justify-center">
                <NavLink to={`/registration/${id}`}
                         className=" mr-6 p-2 relative inline-flex items-center justify-center rounded-md px-4 py-2 text-white bg-[#646cff] hover:text-white hover:bg-[#7a7fff] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#646cff] transition-all duration-300"
                >Register</NavLink>
                <NavLink to={`/users/${id}`}
                         className=" mr-6 p-2relative inline-flex items-center justify-center rounded-md px-4 py-2 text-white bg-[#646cff] hover:text-white hover:bg-[#7a7fff] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#646cff] transition-all duration-300"
                >View</NavLink>
            </div>
        </div>
    );
};

export {Event};