import {FC, useCallback, useEffect, useState} from "react";

import {useSearchParams} from "react-router-dom";
import {Event} from "../Event/Event";
// import css from './Events.module.css'
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

    const scrollHandler = useCallback((e: Event) => {
        const target = e.target as Document;
        if (target.documentElement.scrollHeight - (target.documentElement.scrollTop + window.innerHeight) < 100 && page < totalPage) {
            setFetching(true);
        }
    }, [page, totalPage]);

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

    // Обробка скролу
    useEffect(() => {
            document.addEventListener('scroll', scrollHandler);
            return () => {
                document.removeEventListener('scroll', scrollHandler);
            };
        },
        [scrollHandler]);

    // Збільшуємо сторінку, тільки коли фетч завершено
    useEffect(() => {
        if (!fetching) {
            setPage((prevPage) => prevPage + 1); // Збільшуємо сторінку після завершення фетчингу
        }
    }, [fetching]);

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="bg-gray-900  w-full flex justify-center items-center bg-gray-300 p-4 ">
                <button
                    className=" mr-6 p-2 relative inline-flex items-center justify-center rounded-md px-4 py-2 text-white bg-[#646cff] hover:text-white hover:bg-[#7a7fff] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#646cff] transition-all duration-300"
                    onClick={() => sort('id')}>Sort by id</button>
                <button className="mr-6 p-2 bg-blue-500 text-white rounded" onClick={() => sort('title')}>Sort by title</button>
                <button className="mr-6 p-2 bg-blue-500 text-white rounded" onClick={() => sort('date')}>Sort by date</button>
                <button className="mr-6 p-2 bg-blue-500 text-white rounded" onClick={() => sort('organizer')}>Sort by organizer</button>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                {Array.isArray(event) && event.length > 0 ? (
                    event.map((item, index) => (
                        <Event key={index} event={item} />
                    ))
                ) : (
                    <p>No events available</p> // Можна додати повідомлення, якщо немає подій
                )}
            </div>
        </div>
    );
};

export { Events };