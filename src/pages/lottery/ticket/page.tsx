'use client';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Slider from "react-slick";

export default function LotteryTicket() {
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
          <div className={"lottery_block"}>

              <div className={"lottery_frame pt-[18px] pb-[14px] gap-[30px] lottery_frame_bg-light"}>

                  <div className={"ticket_frame-blur-top"}></div>

                  <div className={"ticket_frame-blur-bot"}></div>

                  <div className={"ticket_frame_name"}>
                      <div className={"lottery_frame_section-text"}>
                          Билет
                      </div>
                      <div className={"lottery_frame_section-text taper_booster_try_progress"}>
                          Легкий
                      </div>
                  </div>

                  <div className={"ticket_frame_details"}>

                      <div className={"ticket_frame_details_gap"}>

                          <Slider {...settings}>
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
                          </Slider>

                          <div className={"ticket_frame_details_block-blur"}>
                              <div className={"lottery_winner_elements-date"}>
                                  Общий выигрыш
                              </div>
                              <div className={"lottery_frame_section-frame-elements"}>
                                  <img className={"w-[24px] h-[24px]"} src={'/media/icons/dollar.png'}/>
                                  <div className={"lottery_winner_elements-text"}>
                                      2 000 000
                                  </div>
                              </div>
                          </div>

                          <button className={"lottery_block-button lottery_frame_bg-yellow"}>
                              <img className={"w-[24px] h-[24px]"} src={'/media/icons/ticket-two.png'}/>
                              <div className={"lottery_winner_elements-text"}>
                                  Купить билет
                              </div>
                          </button>

                          <button className={"lottery_block-button lottery_frame_bg-gray"}>
                              <img className={"w-[24px] h-[24px]"} src={'/media/icons/hourglass.png'}/>
                              <div className={"lottery_winner_elements-text"}>
                                  12:12:12
                              </div>
                          </button>
                      </div>

                      <div className={"sections_taper"}>
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

                  <div className={"z-index: 1;"}>
                      на предыдущей стр
                  </div>
              </div>

              <div className={"lottery_frame pt-[18px] pb-[14px] gap-[30px] lottery_frame_bg-elite"}>

                  <div className={"ticket_frame-blur-top"}></div>

                  <div className={"ticket_frame-blur-bot"}></div>

                  <div className={"ticket_frame_name"}>
                      <div className={"lottery_frame_section-text"}>
                          Билет
                      </div>
                      <div className={"lottery_frame_section-text taper_booster_try_progress"}>
                          Элитный
                      </div>
                  </div>

                  <div className={"ticket_frame_details"}>

                      <div className={"ticket_frame_details_gap"}>

                          <Slider {...settings}>
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
                          </Slider>

                          <div className={"ticket_frame_details_block-blur"}>
                              <div className={"lottery_winner_elements-date"}>
                                  Общий выигрыш
                              </div>
                              <div className={"lottery_frame_section-frame-elements"}>
                                  <img className={"w-[24px] h-[24px]"} src={'/media/icons/dollar.png'}/>
                                  <div className={"lottery_winner_elements-text"}>
                                      2 000 000
                                  </div>
                              </div>
                          </div>

                          <button className={"lottery_block-button lottery_frame_bg-yellow"}>
                              <img className={"w-[24px] h-[24px]"} src={'/media/icons/ticket-two.png'}/>
                              <div className={"lottery_winner_elements-text"}>
                                  Купить билет
                              </div>
                          </button>

                          <button className={"lottery_block-button lottery_frame_bg-gray"}>
                              <img className={"w-[24px] h-[24px]"} src={'/media/icons/hourglass.png'}/>
                              <div className={"lottery_winner_elements-text"}>
                                  12:12:12
                              </div>
                          </button>
                      </div>

                      <div className={"sections_taper"}>
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

                  <div className={"z-index: 1;"}>
                      на предыдущей стр
                  </div>
              </div>

              <div className={"lottery_frame pt-[18px] pb-[14px] gap-[30px] lottery_frame_bg-optimal"}>

                  <div className={"ticket_frame-blur-top"}></div>

                  <div className={"ticket_frame-blur-bot"}></div>

                  <div className={"ticket_frame_name"}>
                      <div className={"lottery_frame_section-text"}>
                          Билет
                      </div>
                      <div className={"lottery_frame_section-text taper_booster_try_progress"}>
                          Оптимальный
                      </div>
                  </div>

                  <div className={"ticket_frame_details"}>

                      <div className={"ticket_frame_details_gap"}>

                          <Slider {...settings}>
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
                          </Slider>

                          <div className={"ticket_frame_details_block-blur"}>
                              <div className={"lottery_winner_elements-date"}>
                                  Общий выигрыш
                              </div>
                              <div className={"lottery_frame_section-frame-elements"}>
                                  <img className={"w-[24px] h-[24px]"} src={'/media/icons/dollar.png'}/>
                                  <div className={"lottery_winner_elements-text"}>
                                      2 000 000
                                  </div>
                              </div>
                          </div>

                          <button className={"lottery_block-button lottery_frame_bg-yellow"}>
                              <img className={"w-[24px] h-[24px]"} src={'/media/icons/ticket-two.png'}/>
                              <div className={"lottery_winner_elements-text"}>
                                  Купить билет
                              </div>
                          </button>

                          <button className={"lottery_block-button lottery_frame_bg-gray"}>
                              <img className={"w-[24px] h-[24px]"} src={'/media/icons/hourglass.png'}/>
                              <div className={"lottery_winner_elements-text"}>
                                  12:12:12
                              </div>
                          </button>
                      </div>

                      <div className={"sections_taper"}>
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

                  <div className={"z-index: 1;"}>
                      на предыдущей стр
                  </div>
              </div>

              <button className={"ticket_rolled-button lottery_frame_bg-light"}>
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

              <button className={"ticket_rolled-button lottery_frame_bg-elite"}>
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

              <button className={"ticket_rolled-button lottery_frame_bg-optimal"}>
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
          </div>
      </div>
  );
}