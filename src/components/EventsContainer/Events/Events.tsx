import {FC, useEffect, useState} from "react";

import {useSearchParams} from "react-router-dom";
import {Event} from "../Event/Event";
import css from './Events.module.css'
import {IEvent} from "../../../interfases/event.ts";
import {eventService} from "../../../servises/eventService.ts";

type IProps = object

const Events: FC<IProps> = () => {
    const [sortBy, setSortBy] = useSearchParams('');
    const [reverseSort, setReverseSort] = useState(false);
    const [event, setEvent] = useState<IEvent[]>([])
    const [totalPage, setTotalPage] = useState<number>()
    const [query, setQuery] = useSearchParams({page: '1'});
    const [prevNext, setPrevNext] = useState({prev: null, next: null});
    const page = query.get('page') || null;

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

    const sort = (by: string) => {
        const newSortBy = reverseSort ? `-${by}` : by;
        sortBy.set('sortBy', newSortBy);
        setSortBy(sortBy);
    };

    const reverset = () => {
        const currentSortBy = sortBy.get('sortBy') || '';
        const newSortBy = currentSortBy.startsWith('-') ? currentSortBy.slice(1) : `-${currentSortBy}`;
        sortBy.set('sortBy', newSortBy)
        setSortBy(sortBy)
        setReverseSort(!reverseSort);
    }





    useEffect(() => {
        eventService.getAll(page, sortBy.get('sortBy')).then(({data}) => {
            setEvent(data.data)
            setTotalPage(data.meta.total)
            setPrevNext({prev: data.meta.page - 1, next: data.meta.page + 1})
        })
    }, [page, sortBy]);

    return (
        <>
            <div className={css.form}>
                <button onClick={() => sort('title')}>Sort by title 2</button>


                <button onClick={() => sort('title')}>Sort by title</button>
                <button onClick={() => sort('date')}>Sort by date</button>
                <button onClick={() => sort('organizer')}>Sort by organizer</button>
                <input
                    type="checkbox"
                    id="reverseSort"
                    checked={reverseSort}
                    onChange={() => reverset()}
                />
                <label htmlFor="reverseSort">Reverse Sort</label>
            </div>

            <div className={css.events_wrap}>
            {event.map((item, index) => <Event key={index} event={item}/>)}
            </div>
            <div className={css.form}>
                <button disabled={!prevNext.prev} onClick={prev}>prev</button>
                <button disabled={prevNext.next > totalPage} onClick={next}>next</button>
            </div>
        </>
    );
};

export {Events};