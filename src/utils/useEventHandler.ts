// src/utils/useEventHandler.ts

import React,{ useCallback } from 'react';
import { LotteryState } from "@/types/gameEvents";

type EventHandler<T> = (data: T) => void;

export default function useEventHandler<T>( // Правильно!
    eventName: string,
    setState: React.Dispatch<React.SetStateAction<LotteryState>>,
    compare: (prev: T | null, next: T) => boolean,
    stateKey: string
): EventHandler<T> {
    const eventHandler = useCallback(
        (data: T) => {
            console.log(`Получена информация о лотерее (${eventName}):`, data);
            setState(prevState => {
                const prevValue = prevState[stateKey as keyof LotteryState] as T | null; // Приведение типа при чтении

                if (!data || compare(prevValue, data)) {
                    return prevState;
                }

                return { ...prevState, [stateKey]: data } as LotteryState; // Приведение типа при возврате
            });
        },
        [setState, compare, stateKey, eventName]
    );

    return eventHandler; // Возвращаем функцию обработчика, а не результат ее вызова
};