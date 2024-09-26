import {AxiosResponse} from "axios";
import {axiosService} from "./axiosService";
import {urls} from "../constans/urls";
import {IEventList} from "../interfases/event.ts";


const eventService={
    getAll:(page:string, sortBy:string):Promise<AxiosResponse<IEventList>> => axiosService.get(urls.events.base,{params:{page,sortBy}}),
}

export {
    eventService
}