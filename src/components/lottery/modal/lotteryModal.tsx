'use client'

import {Dialog, DialogBackdrop, DialogPanel} from "@headlessui/react";
import React, {useEffect, useState} from "react";
/* import Timer from "../../../../../../Downloads/tapper-default/src/utils/timer"; */
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const info = {
    "easy": {
        "name": "Легкий",
        "tickets": 300,
        "prize": 200000,
        "time": "20:00",
        "participant": 120,
        "numbers": [
            { id: 1, value: '123456' },
            { id: 2, value: '223456' },
            { id: 3, value: '323456' },
            { id: 4, value: '423456' },
            { id: 5, value: '523456' },
            { id: 6, value: '623456' },
            { id: 7, value: '723456' },
            { id: 8, value: '823456' },
            { id: 9, value: '323456' },
            { id: 10, value: '923456' },
            { id: 11, value: '123456' },
            { id: 12, value: '423456' },
        ]
    },
    "medium": {
        "name": "Оптимальный",
        "tickets": 310,
        "prize": 500000,
        "time": "21:00",
        "participant": 111,
        "numbers": [
            { id: 1, value: '123456' },
            { id: 2, value: '223456' },
            { id: 3, value: '323456' },
            { id: 4, value: '423456' },
            { id: 5, value: '523456' },
            { id: 6, value: '623456' },
            { id: 7, value: '723456' },
            { id: 8, value: '823456' },
            { id: 9, value: '323456' },
            { id: 10, value: '923456' },
            { id: 11, value: '123456' },
            { id: 12, value: '423456' },
        ]
    },
    "hard": {
        "name": "Элитный",
        "tickets": 350,
        "prize": 700000,
        "time": "22:00",
        "participant": 135,
        "numbers": [
            { id: 1, value: '123456' },
            { id: 2, value: '223456' },
            { id: 3, value: '323456' },
            { id: 4, value: '423456' },
            { id: 5, value: '523456' },
            { id: 6, value: '623456' },
            { id: 7, value: '723456' },
            { id: 8, value: '823456' },
            { id: 9, value: '323456' },
            { id: 10, value: '923456' },
            { id: 11, value: '123456' },
            { id: 12, value: '423456' },
        ]
    }
}

function LotteryBase({onWin, mode}) {
    console.log(mode)
    const [activeType, setActiveType] = useState(info[mode])
    return(
        <>
            <div className={`lottery_frame pt-[18px] pb-[14px] relative gap-[30px] 
                    ${activeType == info.easy && 'lottery_frame_bg-light'} 
                    ${activeType == info.hard && 'lottery_frame_bg-elite'} 
                    ${activeType == info.medium && 'lottery_frame_bg-optimal'}`
            }>

                <img src={'/image.png'} className={'absolute z-1 top-0 right-0 w-full mix-blend-overlay h-full'}/>


                <div className={"ticket_frame-blur-top"}></div>

                <div className={"ticket_frame-blur-bot"}></div>

                <div className={"ticket_frame_name"}>
                    <div className={"lottery_frame_section-text"}>
                        Билет
                    </div>
                    <div className={"lottery_frame_section-text taper_booster_try_progress"}>
                        {activeType.name}
                    </div>
                </div>

                <div className={"ticket_frame_details"}>

                    <div className={'flex flex-row w-full overflow-scroll'}>
                        <div className="slider-item">
                            <div className="ticket_slider">
                                <div className="lottery_winner_elements-date">
                                    Участников
                                </div>
                                <div className="lottery_frame_section-frame-elements">
                                    <img src="/media/icons/man.png" alt="Ticket"/>
                                    <div className="lottery_winner_elements-text">
                                        100
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="slider-item">
                            <div className="ticket_slider">
                                <div className="lottery_winner_elements-date">
                                    Билетов
                                </div>
                                <div className="lottery_frame_section-frame-elements">
                                    <img src="/media/icons/ticket-one.png" alt="Ticket"/>
                                    <div className="lottery_winner_elements-text">
                                        320
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="slider-item">
                            <div className="ticket_slider">
                                <div className="lottery_winner_elements-date">
                                    Шанс
                                </div>
                                <div className="lottery_frame_section-frame-elements">
                                    <img src="/media/icons/percentage.png" alt="Ticket"/>
                                    <div className="lottery_winner_elements-text">
                                        2
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={"ticket_frame_details_gap"}>

                        <div className={"ticket_frame_details_block-blur"}>
                            <div className={"lottery_winner_elements-date"}>
                                Общий выигрыш
                            </div>
                            <div className={"lottery_frame_section-frame-elements"}>
                                <img className={"w-[24px] h-[24px]"} src={'/media/icons/dollar.png'}/>
                                <div className={"lottery_winner_elements-text"}>
                                    {activeType.prize}
                                </div>
                            </div>
                        </div>

                        <button className={"lottery_block-button lottery_frame_bg-yellow"}>
                            <img className={"w-[24px] h-[24px]"} src={'/media/icons/ticket-two.png'}/>
                            <div className={"lottery_winner_elements-text"}>
                                Купить билет
                            </div>
                        </button>

                        <button onClick={() => onWin(true)} className={"lottery_block-button lottery_frame_bg-gray"}>
                            <img className={"w-[24px] h-[24px]"} src={'/media/icons/hourglass.png'}/>
                            <div className={"lottery_winner_elements-text"}>
                                {/* <Timer targetTime={activeType.time}/> */}
                            </div>
                        </button>
                    </div>

                    <div className={"sections_taper max-h-[160px] overflow-scroll"}>
                        <div className={"lottery_winner-optimal"}>
                            <div className={"lottery_winner_elements"}>
                                <div className={"lottery_winner_elements-gap"}>
                                    <img className={"w-[20px] h-[20px]"} src={'/media/icons/ticket-two.png'}/>
                                    <div className={"lottery_winner_elements-text"}>
                                        Билет
                                    </div>
                                </div>
                                <div className={"lottery_winner_elements-text text-yellow-500"}>
                                    №112223
                                </div>
                            </div>
                            <div className={"lottery_winner_elements"}>
                                <div className={"lottery_winner_elements-gap"}>
                                    <div className={"lottery_winner_elements-text"}>
                                        +2,0
                                    </div>
                                    <img className={"w-[20px] h-[20px]"} src={'/media/icons/percentage.png'}/>
                                </div>
                            </div>
                        </div>

                        <div className={"lottery_winner-optimal"}>
                            <div className={"lottery_winner_elements"}>
                                <div className={"lottery_winner_elements-gap"}>
                                    <img className={"w-[20px] h-[20px]"} src={'/media/icons/ticket-two.png'}/>
                                    <div className={"lottery_winner_elements-text"}>
                                        Билет
                                    </div>
                                </div>
                                <div className={"lottery_winner_elements-text text-yellow-500"}>
                                    №112223
                                </div>
                            </div>
                            <div className={"lottery_winner_elements"}>
                                <div className={"lottery_winner_elements-gap"}>
                                    <div className={"lottery_winner_elements-text"}>
                                        +2,0
                                    </div>
                                    <img className={"w-[20px] h-[20px]"} src={'/media/icons/percentage.png'}/>
                                </div>
                            </div>
                        </div>

                        <div className={"lottery_winner-optimal"}>
                            <div className={"lottery_winner_elements"}>
                                <div className={"lottery_winner_elements-gap"}>
                                    <img className={"w-[20px] h-[20px]"} src={'/media/icons/ticket-two.png'}/>
                                    <div className={"lottery_winner_elements-text"}>
                                        Билет
                                    </div>
                                </div>
                                <div className={"lottery_winner_elements-text text-yellow-500"}>
                                    №112223
                                </div>
                            </div>
                            <div className={"lottery_winner_elements"}>
                                <div className={"lottery_winner_elements-gap"}>
                                    <div className={"lottery_winner_elements-text"}>
                                        +2,0
                                    </div>
                                    <img className={"w-[20px] h-[20px]"} src={'/media/icons/percentage.png'}/>
                                </div>
                            </div>
                        </div>

                        <div className={"lottery_winner-optimal"}>
                            <div className={"lottery_winner_elements"}>
                                <div className={"lottery_winner_elements-gap"}>
                                    <img className={"w-[20px] h-[20px]"} src={'/media/icons/ticket-two.png'}/>
                                    <div className={"lottery_winner_elements-text"}>
                                        Билет
                                    </div>
                                </div>
                                <div className={"lottery_winner_elements-text text-yellow-500"}>
                                    №112223
                                </div>
                            </div>
                            <div className={"lottery_winner_elements"}>
                                <div className={"lottery_winner_elements-gap"}>
                                    <div className={"lottery_winner_elements-text"}>
                                        +2,0
                                    </div>
                                    <img className={"w-[20px] h-[20px]"} src={'/media/icons/percentage.png'}/>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className={"flex flex-row items-center justify-center gap-[8px]"}>
                    <div>
                        <img src={'/media/icons/bitcoin.svg'}/>
                    </div>
                    <div className={'text-[20px] font-medium'}>
                        200 000
                    </div>
                </div>
            </div>
            <div className={"flex flex-col gap-[8px] py-[8px]"}>
            {activeType !== info.easy &&
                    <button onClick={() => setActiveType(info.easy)}
                            className={"ticket_rolled-button lottery_frame_bg-light"}>
                        <div className={"lottery_winner_elements"}>
                            <div className={"lottery_frame_section-text"}>
                                Билет
                            </div>
                            <div className={"lottery_frame_section-text taper_booster_try_progress"}>
                                Легкий
                            </div>
                        </div>
                        <div className={"circle-gray"}>
                            <img className={"w-[26px] h-[26px]"} src={'/media/icons/ticket-one.png'}/>
                        </div>
                    </button>
                }
                {activeType !== info.hard &&
                    <button onClick={() => setActiveType(info.hard)}
                            className={"ticket_rolled-button lottery_frame_bg-elite"}>
                        <div className={"lottery_winner_elements"}>
                            <div className={"lottery_frame_section-text"}>
                                Билет
                            </div>
                            <div className={"lottery_frame_section-text taper_booster_try_progress"}>
                                Элитный
                            </div>
                        </div>
                        <div className={"circle-gray"}>
                            <img className={"w-[26px] h-[26px]"} src={'/media/icons/ticket-one.png'}/>
                        </div>
                    </button>
                }
                {activeType !== info.medium &&
                    <button onClick={() => setActiveType(info.medium)}
                            className={"ticket_rolled-button lottery_frame_bg-optimal"}>
                        <div className={"lottery_winner_elements"}>
                            <div className={"lottery_frame_section-text"}>
                                Билет
                            </div>
                            <div className={"lottery_frame_section-text taper_booster_try_progress"}>
                                Оптимальный
                            </div>
                        </div>
                        <div className={"circle-gray"}>
                            <img className={"w-[26px] h-[26px]"} src={'/media/icons/ticket-one.png'}/>
                        </div>
                    </button>
                }
            </div>

        </>
    )
}


function LotteryWin() {
    const [winType, setWinType] = useState('easy');
    const [states, setStates] = useState({
        easy: {
            digits: Array(6).fill(''),
            timer: 10,
            activeNumbers: [],
            lastUpdate: Date.now()
        },
        medium: {
            digits: Array(6).fill(''),
            timer: 10,
            activeNumbers: [],
            lastUpdate: Date.now()
        },
        hard: {
            digits: Array(6).fill(''),
            timer: 10,
            activeNumbers: [],
            lastUpdate: Date.now()
        }
    });

    // Обработка общего таймера
    useEffect(() => {
        const interval = setInterval(() => {
            setStates(prev => {
                const newStates = { ...prev };
                const now = Date.now();

                Object.keys(newStates).forEach(key => {
                    const state = newStates[key];
                    const timePassed = Math.floor((now - state.lastUpdate) / 1000);

                    if (timePassed > 0) {
                        const newTimer = Math.max(state.timer - timePassed, 0);
                        let newDigits = [...state.digits];
                        let shouldUpdate = false;
                        let emptyIndex = -1; // Инициализируем переменную здесь

                        if (newTimer <= 0) {
                            emptyIndex = newDigits.findIndex(d => d === ''); // Присваиваем значение
                            if (emptyIndex !== -1) {
                                newDigits[emptyIndex] = Math.floor(Math.random() * 10).toString();
                                shouldUpdate = true;
                            }
                        }

                        newStates[key] = {
                            ...state,
                            timer: newTimer <= 0 ? 10 : newTimer,
                            digits: shouldUpdate ? newDigits : state.digits,
                            activeNumbers: shouldUpdate
                                ? info[key].numbers.filter(n =>
                                    n.value.startsWith(newDigits.slice(0, emptyIndex + 1).join(''))
                                )
                                : state.activeNumbers,
                            lastUpdate: now
                        };
                    }
                });

                return newStates;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const currentState = states[winType];
    return (
        <>
            <div className={`lottery_frame pt-[18px] pb-[14px] relative gap-[30px]                     
        ${winType == 'easy' && 'lottery_frame_bg-light'} 
                    ${winType == 'hard' && 'lottery_frame_bg-elite'} 
                    ${winType == 'medium' && 'lottery_frame_bg-optimal'}`
            }>
                <img src={'/image.png'} className={'absolute z-1 top-0 right-0 w-full mix-blend-overlay h-full'}/>
                <div className={"ticket_frame-blur-top"}></div>

                <div className={"ticket_frame-blur-bot"}></div>

                <div className={"ticket_frame_name"}>
                    <div className={"lottery_frame_section-text"}>
                        Розыгрыш
                    </div>
                    <div className={"lottery_frame_section-text taper_booster_try_progress"}>
                        {info[winType].name}
                    </div>
                </div>

                <div className={"ticket_frame_details"}>
                    <div className={"drawing_numbers"}>
                        {currentState.digits.map((digit, i) => (
                            <div className={"drawing_numbers_element"} key={i}>
                                {digit !== '' ? digit :
                                    <svg width="13" height="19" viewBox="0 0 11.7158 18.3633" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path id="?"
                                              d="M9.92 1.18Q8.37 0 5.93 0Q3.96 0 2.61 0.7Q1.57 1.25 0.94 2.11Q0.76 2.35 0.61 2.63Q0.42 2.96 0.3 3.32Q-0.04 4.25 0 5.3L4.44 5.3Q4.44 4.66 4.75 4.27Q4.77 4.26 4.79 4.24Q4.85 4.16 4.92 4.1Q5.26 3.84 5.8 3.84Q6.26 3.84 6.57 4.05Q6.67 4.12 6.75 4.21Q6.79 4.25 6.83 4.3Q7.11 4.65 7.11 5.23Q7.11 5.72 6.88 6.06Q6.66 6.38 6.24 6.56Q5.38 6.93 3.74 6.93L2.01 6.93L2.16 11.71L6.31 11.71L6.43 9.96Q8.58 9.91 9.98 8.87Q10.12 8.76 10.26 8.64Q10.73 8.23 11.04 7.72Q11.71 6.66 11.71 5.18Q11.71 3.31 10.82 2.09Q10.52 1.68 10.12 1.34Q10.02 1.26 9.92 1.18ZM2.48 17.85Q3.19 18.36 4.27 18.36Q5.27 18.36 5.95 17.9Q6.11 17.79 6.25 17.66Q6.62 17.32 6.81 16.89Q7.01 16.45 7.01 15.93Q7.01 15.36 6.79 14.9Q6.6 14.5 6.25 14.18Q6.11 14.05 5.95 13.94Q5.27 13.48 4.27 13.48Q3.22 13.48 2.51 13.98Q2.38 14.07 2.27 14.18Q1.92 14.5 1.73 14.9Q1.51 15.36 1.51 15.93Q1.51 16.51 1.74 16.98Q1.93 17.36 2.27 17.67Q2.37 17.77 2.48 17.85Z"
                                              fill="#FFFFFF" fillOpacity="1.000000" fillRule="evenodd"/>
                                    </svg>
                                }
                            </div>
                        ))}
                    </div>

                    <div className={"lottery_winner_elements-text text-center"}>
                        До следующей цифры <span className={"text-yellow-500"}>{currentState.timer} секунд
                      </span>
                    </div>

                    <div className={"drawing_numbers h-[166px] overflow-scroll"}>
                        {info[winType].numbers.map((number) => (
                            <div key={number.id}
                                 style={{
                                     opacity: currentState.activeNumbers.some(activeNumber => activeNumber.id === number.id) ? 1 : 0.3,
                                 }} className={"drawing_combinations_element lottery_frame_section-text"}>
                                {number.value}
                            </div>
                        ))}
                    </div>
                </div>

                <div className={"flex flex-row items-center justify-center gap-[8px]"}>
                    <div>
                        <img src={'/media/icons/bitcoin.svg'}/>
                    </div>
                    <div className={'text-[20px] font-medium'}>
                        200 000
                    </div>
                </div>
            </div>
            <div className={"flex flex-col gap-[8px] py-[8px]"}>
                {winType !== 'easy' &&
                    <button onClick={() => setWinType('easy')}
                            className={"ticket_rolled-button lottery_frame_bg-light"}>
                        <div className={"lottery_winner_elements"}>
                            <div className={"lottery_frame_section-text"}>
                            Розыгрыш
                    </div>
                    <div className={"lottery_frame_section-text taper_booster_try_progress"}>
                        Легкий
                    </div>
                </div>
                <div className={"circle-gray"}>
                    <img className={"w-[26px] h-[26px]"} src={'/media/icons/ticket-one.png'}/>
                </div>
            </button>
        }
        {winType !== 'hard' &&
            <button onClick={() => setWinType('hard')}
                    className={"ticket_rolled-button lottery_frame_bg-elite"}>
                <div className={"lottery_winner_elements"}>
                    <div className={"lottery_frame_section-text"}>
                        Розыгрыш
                    </div>
                    <div className={"lottery_frame_section-text taper_booster_try_progress"}>
                        Элитный
                    </div>
                </div>
                <div className={"circle-gray"}>
                    <img className={"w-[26px] h-[26px]"} src={'/media/icons/ticket-one.png'}/>
                </div>
            </button>
        }
        {winType !== 'medium' &&
            <button onClick={() => setWinType('medium')}
                    className={"ticket_rolled-button lottery_frame_bg-optimal"}>
                <div className={"lottery_winner_elements"}>
                    <div className={"lottery_frame_section-text"}>
                        Розыгрыш
                    </div>
                    <div className={"lottery_frame_section-text taper_booster_try_progress"}>
                        Оптимальный
                    </div>
                </div>
                <div className={"circle-gray"}>
                    <img className={"w-[26px] h-[26px]"} src={'/media/icons/ticket-one.png'}/>
                </div>
            </button>
        }
    </div>
    </>
)
}

export default function LotteryModal({ isOpen, setIsOpen, mode }) {
    const [onWin, setOnWin] = useState(false)

    const handleWin = (value) => {
        setOnWin(value);
    }
    return (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
            <DialogBackdrop
                onClick={() => setIsOpen(false)}
                transition
                className="fixed inset-0 bg-black/60 duration-300 ease-out data-[closed]:opacity-0"
            />
            <div className="fixed inset-0 flex w-screen overflow-y-auto items-center justify-center p-4">
                <DialogPanel transition className="w-full h-auto duration-300 ease-out data-[closed]:opacity-0">
                    {!onWin && <LotteryBase onWin={handleWin} mode={mode} />}
                    {onWin && <LotteryWin />}
                </DialogPanel>
            </div>
        </Dialog>
    )
}