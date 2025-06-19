
import React from 'react';
import s from './drawСard.module.css';

const DrawСard = ({ bg, price = 0 }) => {
   //lottery_frame_bg-light
   return (
      <div className={`flex flex-col gap-[30px] rounded-[12px] ${bg} h-[240px]`}>
         <div className={'flex flex-col justify-between items-center h-full w-full'}>
            <div
               className={'backdrop-blur w-full px-[16px] rounded-t-[12px] h-[58px] bg-[#e9dada1f] items-center justify-center'}>
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
                     {price.toLocaleString()}
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default DrawСard;
