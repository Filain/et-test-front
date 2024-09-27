import {FC, useEffect, useState} from "react";
import {User} from "../User/User";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {userService} from "../../../servises/userService";
import {SubmitHandler, useForm} from "react-hook-form";
import {IFormValues, IUser} from "../../../interfases/user.ts";

// import css from "./Users.module.css"


const Users: FC = () => {
    const {id} = useParams<{ id: string }>()
    const [user, setUser] = useState<IUser[]>([])
    const [totalPage, setTotalPage] = useState<number>()
    const [query, setQuery] = useSearchParams({page: '1'});
    const [prevNext, setPrevNext] = useState({prev: null, next: null});
    const page = query.get('page');
    const name = query.get('name');
    const email = query.get('email');
    const navigate = useNavigate()
    const {register, handleSubmit, reset} = useForm<IFormValues>()

    const [byDay, setByDay] = useState<number>(0)


    const prev = () => {
        setQuery(prev => {
            prev.set('page', `${+prev.get('page') - 1}`)
            return prev
        })
    }
    const next = () => {
        setQuery(prev => {
            prev.set('page', `${+prev.get('page') + 1}`)
            return prev
        })
    }

    const find: SubmitHandler<IFormValues> = async (data) => {
        setQuery(query => {
            query.set('name', data.name || '');
            query.set('email', data.email || '');
            query.set('page', '1');
            return query;
        });
    };
    useEffect(() => {
        userService.byDay(id).then(({data}) => {
            setByDay(data)
        });
    }, [id]);

    useEffect(() => {
        userService.getAll(page, id, name, email).then(({data}) => {
            setUser(data.data);
            setTotalPage(data.meta.total);
            setPrevNext({prev: data.meta.page - 1, next: data.meta.page + 1});
        });
    }, [page, id, name, email]);

    const resetData = () => {
        reset()
    }

    return (
        <div className="flex flex-col justify-between border w-[1440px] h-[100vh] ">
            <div className="bg-gray-900 p-4">
                <div className="flex justify-center flex-row w-full  p-5 ">
                    <button
                        className=" whitespace-nowrap mr-6 p-2 relative inline-flex items-center justify-center rounded-md px-4 py-2 text-white bg-[#646cff] hover:text-white hover:bg-[#7a7fff] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#646cff] transition-all duration-300"
                        onClick={() => navigate('/events')}>To Events
                    </button>
                    <div className="w-full">
                        <div className="w-full bg-gray-200 rounded-md">
                            <div className="h-5 bg-green-500 rounded-md" style={{width: (byDay * 5) + '%'}}></div>
                        </div>
                        <p className="text-lg font-bold text-center">Users registered by day: {byDay}</p>
                    </div>
                </div>


                <form onSubmit={handleSubmit(find)} className="flex justify-center flex-row w-full">
                    <div>
                        <label className="p-2 font-bold   "
                        > Search by Name: </label>
                        <input {...register('name')}
                               className="p-2 mr-6 rounded-md border border-gray-300"
                        />
                        <label className="p-2 font-bold   "
                        > Search by Email: </label>
                        <input  {...register('email')}
                                className="p-2 mr-6 rounded-md border border-gray-300"
                        />
                        <button type="submit"
                                className=" whitespace-nowrap mr-6 p-2 relative inline-flex items-center justify-center rounded-md px-4 py-2 text-white bg-[#646cff] hover:text-white hover:bg-[#7a7fff] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#646cff] transition-all duration-300"
                        >Find
                        </button>
                        <button onClick={resetData}
                                className=" whitespace-nowrap mr-6 p-2 relative inline-flex items-center justify-center rounded-md px-4 py-2 text-white bg-[#646cff] hover:text-white hover:bg-[#7a7fff] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#646cff] transition-all duration-300"
                        >Reset
                        </button>
                    </div>
                </form>
            </div>


            {user.length === 0 ? (
                <div className="flex justify-center items-center h-[100vh] text-3xl">
                    Nobody wants to visit this event
                </div>
            ) : (
                <>
                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                        {user.map((item, index) => <User key={index} user={item}/>)}
                    </div>

                    <div className=" flex justify-center items-center p-6">
                        <button disabled={!prevNext.prev} onClick={prev}
                                className="whitespace-nowrap mr-6 p-2 relative inline-flex items-center justify-center rounded-md px-4 py-2 text-white bg-[#646cff] hover:text-white hover:bg-[#7a7fff] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#646cff] transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400"
                        >prev
                        </button>
                        <button disabled={prevNext.next > totalPage} onClick={next}
                                className="whitespace-nowrap mr-6 p-2 relative inline-flex items-center justify-center rounded-md px-4 py-2 text-white bg-[#646cff] hover:text-white hover:bg-[#7a7fff] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#646cff] transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400"
                        >next
                        </button>
                    </div>

                </>
            )}
        </div>
    );
};

export {Users};