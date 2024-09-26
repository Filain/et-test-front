import {FC, useEffect, useState} from "react";

import {useSearchParams} from "react-router-dom";
import {Event} from "../Event/Event";
import css from './Events.module.css'
import {IEvent} from "../../../interfases/event.ts";
import {eventService} from "../../../servises/eventService.ts";

type IProps = object

const Events: FC<IProps> = () => {
    const [sortBy, setSortBy] = useSearchParams('');
    const [event, setEvent] = useState<IEvent[]>([]);
    const [totalPage, setTotalPage] = useState<number>();
    const [fetching, setFetching] = useState<boolean>(true);
    const [page, setPage] = useState(1);

    const sort = (by: string) => {
        const currentSortBy = sortBy.get('sortBy') || '';
        let newSortBy;
        if (currentSortBy === `-${by}`) {
            newSortBy = by;
        } else if (currentSortBy === by) {
            newSortBy = `-${by}`;
        } else {
            newSortBy = by;
        }
        sortBy.set('sortBy', newSortBy);
        setSortBy(sortBy);
        setPage(1); // Скидаємо сторінку на початкову
        setEvent([]); // Очищаємо масив подій
        setFetching(true); // Встановлюємо стан fetching, щоб оновити події
    };

    useEffect(() => {
        eventService.getAll(page.toString(), sortBy.get('sortBy')).then(({ data }) => {
            if (page === 1) {
                setEvent(data.data); // Якщо це перша сторінка, заміняємо старі події
            } else {
                setEvent((prevEvents) => [...prevEvents, ...data.data]); // Додаємо нові події до існуючих
            }
            setTotalPage(data.meta.total);
        }).finally(() => setFetching(false));
    }, [page, sortBy, fetching]);

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler);
        return () => {
            document.removeEventListener('scroll', scrollHandler);
        };
    }, [page]);

    // Збільшуємо сторінку, тільки коли фетч завершено
    useEffect(() => {
        if (!fetching) {
            setPage((prevPage) => prevPage + 1); // Збільшуємо сторінку після завершення фетчингу
        }
    }, [fetching]);

    const scrollHandler = (e: Event) => {
        const target = e.target as Document;
        if (target.documentElement.scrollHeight - (target.documentElement.scrollTop + window.innerHeight) < 100 && page < totalPage) {
            setFetching(true);
        }
        console.log('scrollHandler')
    };

    return (
        <>
            <div className={css.form}>
                <button onClick={() => sort('id')}>Sort by id</button>
                <button onClick={() => sort('title')}>Sort by title</button>
                <button onClick={() => sort('date')}>Sort by date</button>
                <button onClick={() => sort('organizer')}>Sort by organizer</button>
            </div>

            <div className={css.events_wrap}>
            {event.map((item, index) => <Event key={index} event={item} />)}
            </div>
        </>
    );
};

export { Events };