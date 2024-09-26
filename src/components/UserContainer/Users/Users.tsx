import {FC, useEffect, useState} from "react";
import {User} from "../User/User";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {IFormValues, IUser} from "../../../../../et-test-front/src/interfases/user";
import {userService} from "../../../servises/userService";
import css from "./Users.module.css"
import {SubmitHandler, useForm} from "react-hook-form";

interface IProps {

}

const Users: FC<IProps> = () => {
    const {id} = useParams<{ id: string }>()
    const [user, setUser] = useState<IUser[]>([])
    const [totalPage, setTotalPage] = useState<number>()
    const [query, setQuery] = useSearchParams({page: '1'});
    const [prevNext, setPrevNext] = useState({prev: null, next: null});
    const page = query.get('page');
    const name = query.get('name');
    const email = query.get('email');
    const navigate = useNavigate()
    const {register, handleSubmit} = useForm<IFormValues>()

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
        userService.byDay(id).then(({   data }) => {
            setByDay(data)
        });
    }, [id]);

    useEffect(() => {
        userService.getAll(page, id, name, email).then(({ data }) => {
            setUser(data.data);
            setTotalPage(data.meta.total);
            setPrevNext({ prev: data.meta.page - 1, next: data.meta.page + 1 });
        });
    }, [page, id, name, email]);

    return (
        <>

            <div></div>
            <div className={css.progresscontainer}>
                <div className={css.progressbar} style={{ width: (byDay * 5) + '%' }}></div>
            </div>

            <p id="visitor-count">Users registred by day {byDay}</p>



            <div>
                <button onClick={() => navigate('/events')}>To Events</button>

                <form onSubmit={handleSubmit(find)} className={css.form}>

                    <div>
                        <label> Search by Name: </label>
                        <input {...register('name')} />

                        <label> Search by Email: </label>
                        <input  {...register('email')} />
                        <button type="submit">Submit</button>
                    </div>
                </form>


            </div>
            {user.length === 0 ? (
                <div>
                    Nobody wants to visit this event
                </div>
            ) : (
                <>
                    <div className={css.users_wrap}>
                        {user.map((item, index) => <User key={index} user={item}/>)}
                    </div>

                        <div className={css.form}>
                            <button disabled={!prevNext.prev} onClick={prev}>prev</button>
                            <button disabled={prevNext.next > totalPage} onClick={next}>next</button>
                        </div>

                </>
            )}
        </>
    );
};

export {Users};