'use client';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Slider from "react-slick";

export default function LotteryDrawing() {
    const settings = {
        slidesToShow: 2,
        slidesToScroll: 1,
        centerMode: true,
        infinite: true,
        variableWidth: true,
        arrows: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    centerMode: false,
                },
            },
        ],
        // Добавьте эти параметры для управления отступами
        appendDots: dots => (
            <div
                style={{
                    backgroundColor: '#ddd',
                    borderRadius: '10px',
                    padding: '10px'
                }}
            >
                <ul style={{ margin: '0px' }}> {dots} </ul>
            </div>
        ),
        customPaging: i => (
            <div
                style={{
                    width: '30px',
                    color: 'blue',
                    border: '1px blue solid'
                }}
            >
                {i + 1}
            </div>
        ),
        beforeChange: (current, next) => console.log({ current, next }),
    };

  return (
      <div className={"p-[20px] flex flex-col justify-between gap-[20px]"}>
          <div className={"lottery_block relative"}>
              <img className={'absolute z-10 opacity-50 h-full w-full'} src={'/confetti.png'} alt=""/>

              <div className={"lottery_frame pt-[18px] pb-[14px] gap-[30px] lottery_frame_bg-optimal"}>

                  <div className={"ticket_frame-blur-top"}></div>

                  <div className={"ticket_frame_name"}>
                      <div className={"lottery_frame_section-text"}>
                          Розыгрыш
                      </div>
                      <div className={"lottery_frame_section-text taper_booster_try_progress"}>
                          Оптимальный
                      </div>
                  </div>

                  <div className={"ticket_frame_details"}>
                      <div className={"ticket_frame_details_block-blur"}>
                          <div className={"lottery_winner_elements-text"}>
                              Сумма розыгрыша
                          </div>
                          <div className={"lottery_frame_section-frame-elements"}>
                              <img className={"w-[24px] h-[24px]"} src={'/media/icons/dollar.png'}/>
                              <div className={"lottery_winner_elements-text"}>
                                  2 000 000
                              </div>
                          </div>
                      </div>

                      <div className={"ticket_frame_details_block-blur"}>
                          <div className={"lottery_winner_elements-text"}>
                              Всего билетов
                          </div>
                          <div className={"lottery_frame_section-frame-elements"}>
                              <img className={"w-[24px] h-[24px]"} src={'/media/icons/ticket-one.png'}/>
                              <div className={"lottery_winner_elements-text"}>
                                  40
                              </div>
                          </div>
                      </div>

                      <div className={"ticket_frame_details_block-blur"}>
                          <div className={"lottery_winner_elements-text"}>
                              Всего участников
                          </div>
                          <div className={"lottery_frame_section-frame-elements"}>
                              <img className={"w-[24px] h-[24px]"} src={'/media/icons/man.png'}/>
                              <div className={"lottery_winner_elements-text"}>
                                  20
                              </div>
                          </div>
                      </div>
                  </div>

                  <div className={"lottery_winner_elements z-30"}>
                      <button className={"lottery_block-button lottery_frame_bg-yellow flex-1 z-30"}>
                          <div className={"lottery_winner_elements-text z-30"}>
                              История
                          </div>
                      </button>

                      <button className={"lottery_block-button lottery_frame_bg-gray flex-1 z-30"}>
                          <div className={"lottery_winner_elements-text z-30"}>
                              Поделиться
                          </div>
                      </button>
                  </div>
              </div>

              {/*<div className={"lottery_frame pt-[18px] pb-[14px] gap-[30px] lottery_frame_bg-elite"}>*/}

              {/*    <div className={"ticket_frame-blur-top"}></div>*/}

              {/*    <div className={"ticket_frame_name"}>*/}
              {/*        <div className={"lottery_frame_section-text"}>*/}
              {/*            Розыгрыш*/}
              {/*        </div>*/}
              {/*        <div className={"lottery_frame_section-text taper_booster_try_progress"}>*/}
              {/*            Элитный*/}
              {/*        </div>*/}
              {/*    </div>*/}

              {/*    <div className={"ticket_frame_details"}>*/}
              {/*        <div className={"lottery_winner-elite"}>*/}
              {/*            <div className={"lottery_winner_elements"}>*/}
              {/*                <div className={"lottery_winner_elements-gap"}>*/}
              {/*                    <img className={"w-[20px] h-[20px]"} src={'/media/icons/medal.png'}/>*/}
              {/*                    <div className={"lottery_winner_elements-text"}>*/}
              {/*                        Розыгрыш*/}
              {/*                    </div>*/}
              {/*                </div>*/}
              {/*                <div className={"lottery_winner_elements-text text-yellow-500"}>*/}
              {/*                    112223*/}
              {/*                </div>*/}
              {/*            </div>*/}
              {/*            <div className={"lottery_winner_elements"}>*/}
              {/*                <div className={"lottery_winner_elements-date"}>*/}
              {/*                    12/12*/}
              {/*                </div>*/}
              {/*            </div>*/}
              {/*        </div>*/}

              {/*        <div className={"lottery_winner-elite flex flex-col gap-[10px]"}>*/}
              {/*            <div className={"details_info_card_amount-multiplier"}>*/}
              {/*                <div className={"lottery_winner_elements"}>*/}
              {/*                    <div className={"lottery_winner_elements-gap"}>*/}
              {/*                        <img className={"w-[20px] h-[20px]"} src={'/media/icons/medal.png'}/>*/}
              {/*                        <div className={"lottery_winner_elements-text"}>*/}
              {/*                            Розыгрыш*/}
              {/*                        </div>*/}
              {/*                    </div>*/}
              {/*                    <div className={"lottery_winner_elements-text text-yellow-500"}>*/}
              {/*                        11222312*/}
              {/*                    </div>*/}
              {/*                </div>*/}
              {/*                <div className={"lottery_winner_elements"}>*/}
              {/*                    <div className={"lottery_winner_elements-date"}>*/}
              {/*                        12/12*/}
              {/*                    </div>*/}
              {/*                </div>*/}
              {/*            </div>*/}

              {/*            <div className={"details_info_cards w-[100%]"}>*/}
              {/*                <div className={"lottery_winner-elite"}>*/}
              {/*                    <div className={"lottery_winner_elements"}>*/}
              {/*                        <img className={"w-[20px] h-[20px]"} src={'/media/icons/man.png'}/>*/}
              {/*                        <div className={"lottery_winner_elements-text"}>*/}
              {/*                            anatoshkin007*/}
              {/*                        </div>*/}
              {/*                    </div>*/}
              {/*                </div>*/}

              {/*                <div className={"lottery_winner-elite"}>*/}
              {/*                    <div className={"lottery_winner_elements"}>*/}
              {/*                        <img className={"w-[20px] h-[20px]"} src={'/media/icons/dollar.png'}/>*/}
              {/*                        <div className={"lottery_winner_elements-text"}>*/}
              {/*                            20 000*/}
              {/*                        </div>*/}
              {/*                    </div>*/}
              {/*                </div>*/}

              {/*                <div className={"header_wallet"}>*/}
              {/*                    <div className={"lottery_winner-elite flex-1"}>*/}
              {/*                        <div className={"lottery_winner_elements"}>*/}
              {/*                            <img className={"w-[20px] h-[20px]"} src={'/media/icons/ticket-two.png'}/>*/}
              {/*                            <div className={"lottery_winner_elements-text"}>*/}
              {/*                                120*/}
              {/*                            </div>*/}
              {/*                        </div>*/}
              {/*                    </div>*/}

              {/*                    <div className={"lottery_winner-elite flex-1"}>*/}
              {/*                        <div className={"lottery_winner_elements"}>*/}
              {/*                            <img className={"w-[20px] h-[20px]"} src={'/media/icons/percentage.png'}/>*/}
              {/*                            <div className={"lottery_winner_elements-text"}>*/}
              {/*                                20*/}
              {/*                            </div>*/}
              {/*                        </div>*/}
              {/*                    </div>*/}
              {/*                </div>*/}

              {/*            </div>*/}
              {/*        </div>*/}

              {/*        <div className={"lottery_winner-elite"}>*/}
              {/*            <div className={"lottery_winner_elements"}>*/}
              {/*                <div className={"lottery_winner_elements-gap"}>*/}
              {/*                    <img className={"w-[20px] h-[20px]"} src={'/media/icons/medal.png'}/>*/}
              {/*                    <div className={"lottery_winner_elements-text"}>*/}
              {/*                    Розыгрыш*/}
              {/*                    </div>*/}
              {/*                </div>*/}
              {/*                <div className={"lottery_winner_elements-text text-yellow-500"}>*/}
              {/*                    11222312*/}
              {/*                </div>*/}
              {/*            </div>*/}
              {/*            <div className={"lottery_winner_elements"}>*/}
              {/*                <div className={"lottery_winner_elements-date"}>*/}
              {/*                    12/12*/}
              {/*                </div>*/}
              {/*            </div>*/}
              {/*        </div>*/}
              {/*    </div>*/}
              {/*</div>*/}
          </div>
      </div>
  );
}