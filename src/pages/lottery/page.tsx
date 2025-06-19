'use client';

import Winners from "@/components/lottery/main/winners";
import LotteryHistory from "@/components/lottery/main/lotteryHistory";
import LotteryModal from "@/components/lottery/modal/lotteryModal";
import React, {
   RefObject,
   SetStateAction,
   useRef,
   useState,
   useEffect,
   useCallback,
   memo
} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";

import { useGameStore } from "@/store/gameStore";

import DrawСard from '@components/drawСard';

import { Events, LotteryState } from "@/types/gameEvents";
import shallowCompare from "@/utils/shallowCompare";
import useEventHandler from '@/utils/useEventHandler';

type LotteryStatus = Events["LotteryStatus"];
type LotteryGlobalStatus = Events["LotteryGlobalStatus"];
type LotteryHistory = Events["LotteryHistory"];
type LotteryTickets = Events["LotteryTickets"];
type LotteryPurchaseHistory = Events["LotteryPurchaseHistory"];
type buyTickets = Events["buyTickets"];
type getProvablyFair = Events["getProvablyFair"];

const content = [
   { id: 1, className: 'lottery_frame_bg-light', mode: 'easy' },
   { id: 2, className: 'lottery_frame_bg-optimal', mode: 'medium' },
   { id: 3, className: 'lottery_frame_bg-elite', mode: 'hard' }
];

interface LotteryProps {
   // Можно добавить пропсы, если они есть
}

type EventHandler<T> = (data: T) => void;

export default memo(function Lottery({ }: LotteryProps) {
   const room = useGameStore((state) => state.room);
   // Состояние для хранения статуса всех активных розыгрышей (easy, optimal, elite)
   const [lotteryState, setLotteryState] = useState<LotteryState>({
      lotteryStatus: null,
      lotteryGlobalStatus: null,
      lotteryHistory: null,
      lotteryTickets: null,
      lotteryPurchaseHistory: null,
      buyTickets: null,
      getProvablyFair: null
   });

   /* console.log("%c Rerender", "color: red"); */
   /* console.clear()
   console.log('LotteryStatus', lotteryState.lotteryStatus);
   console.log('LotteryGlobalStatus', lotteryState.lotteryGlobalStatus);
   console.log('LotteryHistory', lotteryState.lotteryHistory);
   console.log('LotteryTickets', lotteryState.lotteryTickets);
   console.log('buyTickets', lotteryState.buyTickets);
   console.log('getProvablyFair', lotteryState.getProvablyFair); */

   // Используем useEventHandler для создания обработчиков событий
   const handleLotteryStatus = useCallback(useEventHandler<LotteryStatus>(
      "LotteryStatus",
      setLotteryState,
      shallowCompare,
      "lotteryStatus"
   ), [setLotteryState]);

   const handleLotteryGlobalStatus = useCallback(useEventHandler<LotteryGlobalStatus>(
      "LotteryGlobalStatus",
      setLotteryState,
      shallowCompare,
      "lotteryGlobalStatus"
   ), [setLotteryState]);

   const handleLotteryHistory = useCallback(useEventHandler<LotteryHistory>(
      "LotteryHistory",
      setLotteryState,
      shallowCompare,
      "lotteryHistory"
   ), [setLotteryState]);

   const handleLotteryTickets = useCallback(useEventHandler<LotteryTickets>(
      "LotteryTickets",
      setLotteryState,
      shallowCompare,
      "lotteryTickets"
   ), [setLotteryState]);

   const handleLotteryPurchaseHistory = useCallback(useEventHandler<LotteryPurchaseHistory>(
      "LotteryPurchaseHistory",
      setLotteryState,
      shallowCompare,
      "lotteryPurchaseHistory"
   ), [setLotteryState]);

   const handleBuyTickets = useCallback(useEventHandler<buyTickets>(
      "buyTickets",
      setLotteryState,
      shallowCompare,
      "buyTickets"
   ), [setLotteryState]);

   const handleGetProvablyFair = useCallback(useEventHandler<getProvablyFair>(
      "getProvablyFair",
      setLotteryState,
      shallowCompare,
      "getProvablyFair"
   ), [setLotteryState]);

   // Подписываемся на события
   useEffect(() => {
      if (room) {
         // Запрос на получение статуса всех активных розыгрышей (easy, optimal, elite)
         room.send("getLotteryStatus");
         room.onMessage("LotteryStatus", handleLotteryStatus); // Используем handleLotteryStatus как функцию

         //Запрос на получение статуса розыгрыша вкл\выкл
         room.send("getLotteryGlobalStatus");
         room.onMessage("LotteryGlobalStatus", handleLotteryGlobalStatus); // Используем handleLotteryGlobalStatus как функцию

         // для отображения глобальной истории лотерей по типу билетов с пагинацией
         room.send("getLotteryHistory");
         room.onMessage("lotteryHistory", handleLotteryHistory);

         //Запрос на получение истории билетов пользователя по ID розыгрыша с пагинацией
         room.send("getLotteryTickets", { lotteryId: 496, page: 1, pageSize: 10 });
         room.onMessage("LotteryTickets", handleLotteryTickets);

         //для отображения истории всех покупок билетов пользователя
         room.send("getLotteryPurchaseHistory");
         room.onMessage("lotteryPurchaseHistory", handleLotteryPurchaseHistory);

         // Отправляем данные для покупки билетов
         /* room.send("buyTickets", { lotteryId: 484, count: 1 });
         room.onMessage("buyTickets", handleBuyTickets); */

         // Отправляем данные для проверки честности
         /* room.send("getProvablyFair", { game: 'lottery', hash: hash });
         room.onMessage("getProvablyFair", handleGetProvablyFair); */

         // Функция очистки
         return () => {
            room.removeAllListeners("LotteryStatus");
            room.removeAllListeners("LotteryGlobalStatus");
            room.removeAllListeners("LotteryHistory");
            room.removeAllListeners("LotteryTickets");
            room.removeAllListeners("LotteryPurchaseHistory");
         };
      }

      return () => { }; // Возвращаем пустую функцию, если room нет
   }, [room, handleLotteryStatus, handleLotteryGlobalStatus, handleLotteryHistory, handleLotteryTickets, handleLotteryPurchaseHistory]); // Добавляем обработчики в зависимости


   const [isOpen, setIsOpen] = useState(false)
   const [currentSlide, setCurrentSlide] = useState(0);

   const settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      className: "center",
      centerMode: true,
      gap: '8px',
      centerPadding: "13px",
      beforeChange: (current: any, next: SetStateAction<number>) => setCurrentSlide(next)
   };

   const handleOpenModal = () => {
      setIsOpen(true);
   };

   let sliderRef = useRef(null);
   let next = () => {
      // @ts-ignore
      sliderRef.slickNext();
   };
   let previous = () => {
      // @ts-ignore
      sliderRef.slickPrev();
   };

   const by = () => {
      if (room) {
         room.send("buyTickets", { lotteryId: 496, count: 1 });
         room.onMessage("buyTicketsResult", handleBuyTickets);
         console.log('Покупка билета');
         console.log('buyTickets', lotteryState.buyTickets);
      } else console.log('Что-то пошло не так')
   }

   const choiceBG = (type: number) => {
      if (type == 1) {
         return "lottery_frame_bg-light"
      } else if (type == 2) {
         return "lottery_frame_bg-optimal"
      } else if (type == 3) {
         return "lottery_frame_bg-elite"
      } else return "lottery_frame_bg-light"
   }
   
   console.log(lotteryState.lotteryStatus?.data)
 
   return (

      <>
         <div className={"lottery_block"}>

            <div className={"mx-[20px] lottery_frame py-[12px] gap-[12px] lottery_frame_bg-yellow"}>

               <div className={"lottery_frame-blur"}></div>

               <div className={"lottery_frame_section"}>

                  <div className={"flex flex-row items-center justify-center gap-[8px]"}>
                     <div>
                        <img src={'/media/icons/bitcoin.svg'} />
                     </div>
                     <div className={'text-[20px] font-medium'}>
                        200 000
                     </div>
                  </div>

                  <div className={"lottery_frame_section-update"}>
                     <svg width="16.000000" height="16.000000" viewBox="0 0 16 16" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <defs />
                        <path id="Vector"
                           d="M15.68 4.57C15.24 4.57 14.8 4.58 14.36 4.58C13.36 2.21 11.41 0.49 8.95 0.08C6.2 -0.37 3.58 0.98 2.01 3.37C1.32 4.43 2.95 5.42 3.64 4.37C5.79 1.1 10.38 1.39 12.26 4.58C11.85 4.58 11.44 4.59 11.04 4.59C10.92 4.59 10.84 4.64 10.79 4.72C10.71 4.81 10.68 4.95 10.76 5.09C11.54 6.37 12.32 7.66 13.1 8.94C13.23 9.15 13.51 9.15 13.64 8.94C14.41 7.65 15.18 6.36 15.95 5.07C16.08 4.86 15.91 4.57 15.68 4.57Z"
                           fill="#FFFFFF" fillOpacity="1.000000" fillRule="nonzero" />
                        <path id="Vector"
                           d="M12.36 11.62C10.22 14.87 5.69 14.6 3.78 11.48C4.17 11.48 4.56 11.48 4.95 11.48C5.07 11.48 5.15 11.42 5.2 11.35C5.28 11.25 5.31 11.12 5.23 10.98C4.45 9.69 3.67 8.41 2.89 7.12C2.76 6.91 2.48 6.91 2.35 7.13C1.58 8.41 0.81 9.7 0.04 10.99C-0.09 11.2 0.08 11.49 0.31 11.49C0.76 11.49 1.22 11.49 1.67 11.49C2.68 13.82 4.61 15.5 7.05 15.91C9.79 16.36 12.42 15.01 13.99 12.62C14.68 11.56 13.05 10.57 12.36 11.62Z"
                           fill="#FFFFFF" fillOpacity="1.000000" fillRule="nonzero" />
                     </svg>
                  </div>

               </div>
               <div className={"lottery_frame_section"}>

                  <div className={"lottery_frame_section-frame"}>
                     <div className={"lottery_winner_elements-text"}>
                        Мои билеты
                     </div>
                     <div className={"lottery_frame_section-frame-elements"}>
                        <img src={"/media/icons/ticket-one.png"} />
                        <div className={"lottery_winner_elements-text"}>
                           0
                        </div>
                     </div>
                  </div>

                  <div className={"lottery_frame_section-frame"}>
                     <div className={"lottery_winner_elements-text"}>
                        Мой шанс
                     </div>
                     <div className={"lottery_frame_section-frame-elements"}>
                        <img src={"/media/icons/percentage.png"} />
                        <div className={"lottery_winner_elements-text"}>
                           0
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="slider-container w-full">
               <Slider ref={(slider: RefObject<null>) => {
                  sliderRef = slider;
               }} {...settings}>
                  {lotteryState.lotteryStatus?.data?.map(el => <DrawСard
                     bg={choiceBG(el.ticketType)}
                     key={el.id}
                     id={el.id}
                     price={el.price}
                  />)}

                  {/* <div className={'flex flex-col gap-[30px] rounded-[12px] lottery_frame_bg-light h-[240px]'}>
                     <div className={'flex flex-col justify-between items-center h-full w-full'}>
                        <div
                           className={'backdrop-blur w-full px-[16px] rounded-t-[12px] h-[58px] bg-[#ffffff1f] items-center justify-center'}>
                           <div className={"lottery_frame_section justify-between items-center h-full"}>

                              <div className={"lottery_frame_section-text"}>
                                 Розыгрыш
                              </div>
                              <div className={"lottery_frame_section-text taper_booster_try_progress"}>
                                 Легкий
                              </div>
                           </div>
                        </div>

                        <div className={"lottery_frame_info px-[14px]"}>
                           <div className={"lottery_winner_elements-date"}>
                              Покупай билеты за монеты - увеличивай шанс на победу!
                           </div>

                           <div className={"lottery_frame_info-sections"}>
                              <div className={"lottery_frame_info-section"}>
                                 <div className={"lottery_winner_elements-date"}>
                                    Участники
                                 </div>
                                 <div className={"lottery_frame_section-frame-elements"}>
                                    <img src={"/media/icons/man.png"} />
                                    <div className={"lottery_winner_elements-text"}>
                                       1 001
                                    </div>
                                 </div>
                              </div>

                              <div className={"lottery_frame_info-section"}>
                                 <div className={"lottery_winner_elements-date"}>
                                    Билеты
                                 </div>
                                 <div className={"lottery_frame_section-frame-elements"}>
                                    <img src={"/media/icons/ticket-two.png"} />
                                    <div className={"lottery_winner_elements-text"}>
                                       300
                                    </div>
                                 </div>
                              </div>

                              <div className={"lottery_frame_info-section"}>
                                 <div className={"lottery_winner_elements-date"}>
                                    Осталось
                                 </div>
                                 <div className={"lottery_frame_section-frame-elements"}>
                                    <img src={"/media/icons/hourglass.png"} />
                                    <div className={"lottery_winner_elements-text"}>
                                       12 ч
                                    </div>
                                 </div>
                              </div>

                           </div>

                        </div>
                        <div
                           className={'backdrop-blur w-full px-[16px] rounded-b-[12px] h-[58px] bg-[#ffffff1f] items-center justify-center'}>
                           <div className={"flex flex-row items-center h-full justify-center gap-[8px]"}>
                              <div>
                                 <img src={'/media/icons/bitcoin.svg'} />
                              </div>
                              <div className={'text-[20px] font-medium'}>
                                 200 000
                              </div>
                           </div>
                        </div>
                     </div>
                  </div> */}
                  {/* <div className={'flex flex-col gap-[30px] rounded-[12px] lottery_frame_bg-optimal h-[240px]'}>
                     <div className={'flex flex-col justify-between items-center h-full w-full'}>
                        <div
                           className={'backdrop-blur w-full px-[16px] rounded-t-[12px] h-[58px] bg-[#ffffff1f] items-center justify-center'}>
                           <div className={"lottery_frame_section justify-between items-center h-full"}>

                              <div className={"lottery_frame_section-text"}>
                                 Розыгрыш
                              </div>
                              <div className={"lottery_frame_section-text taper_booster_try_progress"}>
                                 Оптимальный
                              </div>
                           </div>
                        </div>

                        <div className={"lottery_frame_info px-[14px]"}>
                           <div className={"lottery_winner_elements-date"}>
                              Покупай билеты за монеты - увеличивай шанс на победу!
                           </div>

                           <div className={"lottery_frame_info-sections"}>
                              <div className={"lottery_frame_info-section"}>
                                 <div className={"lottery_winner_elements-date"}>
                                    Участники
                                 </div>
                                 <div className={"lottery_frame_section-frame-elements"}>
                                    <img src={"/media/icons/man.png"} />
                                    <div className={"lottery_winner_elements-text"}>
                                       1 001
                                    </div>
                                 </div>
                              </div>

                              <div className={"lottery_frame_info-section"}>
                                 <div className={"lottery_winner_elements-date"}>
                                    Билеты
                                 </div>
                                 <div className={"lottery_frame_section-frame-elements"}>
                                    <img src={"/media/icons/ticket-two.png"} />
                                    <div className={"lottery_winner_elements-text"}>
                                       300
                                    </div>
                                 </div>
                              </div>

                              <div className={"lottery_frame_info-section"}>
                                 <div className={"lottery_winner_elements-date"}>
                                    Осталось
                                 </div>
                                 <div className={"lottery_frame_section-frame-elements"}>
                                    <img src={"/media/icons/hourglass.png"} />
                                    <div className={"lottery_winner_elements-text"}>
                                       12 ч
                                    </div>
                                 </div>
                              </div>

                           </div>

                        </div>
                        <div
                           className={'backdrop-blur w-full px-[16px] rounded-b-[12px] h-[58px] bg-[#ffffff1f] items-center justify-center'}>
                           <div className={"flex flex-row items-center h-full justify-center gap-[8px]"}>
                              <div>
                                 <img src={'/media/icons/bitcoin.svg'} />
                              </div>
                              <div className={'text-[20px] font-medium'}>
                                 200 000
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className={'flex flex-col gap-[30px] rounded-[12px] lottery_frame_bg-elite h-[240px]'}>
                     <div className={'flex flex-col justify-between items-center h-full w-full'}>
                        <div
                           className={'backdrop-blur w-full px-[16px] rounded-t-[12px] h-[58px] bg-[#ffffff1f] items-center justify-center'}>
                           <div className={"lottery_frame_section justify-between items-center h-full"}>

                              <div className={"lottery_frame_section-text"}>
                                 Розыгрыш
                              </div>
                              <div className={"lottery_frame_section-text taper_booster_try_progress"}>
                                 Элитный
                              </div>
                           </div>
                        </div>

                        <div className={"lottery_frame_info px-[14px]"}>
                           <div className={"lottery_winner_elements-date"}>
                              Покупай билеты за монеты - увеличивай шанс на победу!
                           </div>

                           <div className={"lottery_frame_info-sections"}>
                              <div className={"lottery_frame_info-section"}>
                                 <div className={"lottery_winner_elements-date"}>
                                    Участники
                                 </div>
                                 <div className={"lottery_frame_section-frame-elements"}>
                                    <img src={"/media/icons/man.png"} />
                                    <div className={"lottery_winner_elements-text"}>
                                       1 001
                                    </div>
                                 </div>
                              </div>

                              <div className={"lottery_frame_info-section"}>
                                 <div className={"lottery_winner_elements-date"}>
                                    Билеты
                                 </div>
                                 <div className={"lottery_frame_section-frame-elements"}>
                                    <img src={"/media/icons/ticket-two.png"} />
                                    <div className={"lottery_winner_elements-text"}>
                                       300
                                    </div>
                                 </div>
                              </div>

                              <div className={"lottery_frame_info-section"}>
                                 <div className={"lottery_winner_elements-date"}>
                                    Осталось
                                 </div>
                                 <div className={"lottery_frame_section-frame-elements"}>
                                    <img src={"/media/icons/hourglass.png"} />
                                    <div className={"lottery_winner_elements-text"}>
                                       12 ч
                                    </div>
                                 </div>
                              </div>

                           </div>

                        </div>
                        <div
                           className={'backdrop-blur w-full px-[16px] rounded-b-[12px] h-[58px] bg-[#ffffff1f] items-center justify-center'}>
                           <div className={"flex flex-row items-center h-full justify-center gap-[8px]"}>
                              <div>
                                 <img src={'/media/icons/bitcoin.svg'} />
                              </div>
                              <div className={'text-[20px] font-medium'}>
                                 200 000
                              </div>
                           </div>
                        </div>
                     </div>
                  </div> */}
               </Slider>
            </div>

            <button onClick={handleOpenModal} className={`mx-[20px] lottery_block-button ${content[currentSlide].className}`}>
               Купить билет
            </button>
         </div>

         <div className={"p-[20px] flex flex-col justify-between gap-[20px]"}>


            <LotteryModal
               content={lotteryState.lotteryStatus?.data}
               mode={lotteryState.lotteryStatus?.data[currentSlide].ticketType}
               isOpen={isOpen}
               setIsOpen={setIsOpen}
            />

            <LotteryHistory />

            <Winners />

            <div className={"lottery_block"}>
               <div className="fag_title">
                  Частые вопросы
               </div>
               <div className="fag_questions">
                  <Disclosure>
                     <DisclosureButton>
                        <div className="fag_question py-[20px] px-[16px]">
                           <div
                              className="fag_question_text">
                              Что такое билеты?
                           </div>
                        </div>
                     </DisclosureButton>
                     <DisclosurePanel>
                        Yes! You can purchase a license that you can share with your entire team.
                     </DisclosurePanel>
                  </Disclosure>
                  <Disclosure>
                     <DisclosureButton>
                        <div className="fag_question py-[20px] px-[16px]">
                           <div
                              className="fag_question_text">
                              Как участвовать?
                           </div>
                        </div>
                     </DisclosureButton>
                     <DisclosurePanel>
                        Yes! You can purchase a license that you can share with your entire team.
                     </DisclosurePanel>
                  </Disclosure>
                  <Disclosure>
                     <DisclosureButton>
                        <div className="fag_question py-[20px] px-[16px]">
                           <div
                              className="fag_question_text">
                              Сколько билетов можно купить?
                           </div>
                        </div>
                     </DisclosureButton>
                     <DisclosurePanel>
                        Yes! You can purchase a license that you can share with your entire team.
                     </DisclosurePanel>
                  </Disclosure>
                  <Disclosure>
                     <DisclosureButton>
                        <div className="fag_question py-[20px] px-[16px]">
                           <div
                              className="fag_question_text">
                              Когда проходит розыгрыш?
                           </div>
                        </div>
                     </DisclosureButton>
                     <DisclosurePanel>
                        Yes! You can purchase a license that you can share with your entire team.
                     </DisclosurePanel>
                  </Disclosure>
               </div>
            </div>
         </div>
      </>
   )
      ;
}
)