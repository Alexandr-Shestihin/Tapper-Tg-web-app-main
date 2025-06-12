/* import SearchDropdown from "@/src/components/misc/searchDropdown"; */
import SearchDropdown from "../../misc/searchDropdown";

export default function LotteryHistory() {
    return (
        <div className={"lottery_block"}>
            <div className="fag_title">
                История
            </div>
            <div className="search-block_form-group">
                <SearchDropdown info={'Категория'}/>
            </div>

            <div className={"sections_taper"}>
                <div className={"lottery_winner-optimal"}>
                    <div className={"lottery_winner_elements"}>
                        <div className={"lottery_winner_elements-gap"}>
                            <img className={"w-[20px] h-[20px]"} src={'/media/icons/medal.png'}/>
                            <div className={"lottery_winner_elements-text"}>
                                Розыгрыш
                            </div>
                        </div>
                        <div className={"lottery_winner_elements-text text-yellow-500"}>
                            112223
                        </div>
                    </div>
                    <div className={"lottery_winner_elements"}>
                        <div className={"lottery_winner_elements-date"}>
                            12/12/2024
                        </div>
                    </div>
                </div>

                <div className={"lottery_winner-light"}>
                    <div className={"lottery_winner_elements"}>
                        <div className={"lottery_winner_elements-gap"}>
                            <img className={"w-[20px] h-[20px]"} src={'/media/icons/medal.png'}/>
                            <div className={"lottery_winner_elements-text"}>
                                Розыгрыш
                            </div>
                        </div>
                        <div className={"lottery_winner_elements-text text-yellow-500"}>
                            112223
                        </div>
                    </div>
                    <div className={"lottery_winner_elements"}>
                        <div className={"lottery_winner_elements-date"}>
                            12/12/2024
                        </div>
                    </div>
                </div>

                <div className={"lottery_winner-elite"}>
                    <div className={"lottery_winner_elements"}>
                        <div className={"lottery_winner_elements-gap"}>
                            <img className={"w-[20px] h-[20px]"} src={'/media/icons/medal.png'}/>
                            <div className={"lottery_winner_elements-text"}>
                                Розыгрыш
                            </div>
                        </div>
                        <div className={"lottery_winner_elements-text text-yellow-500"}>
                            112223
                        </div>
                    </div>
                    <div className={"lottery_winner_elements"}>
                        <div className={"lottery_winner_elements-date"}>
                            12/12/2024
                        </div>
                    </div>
                </div>
                <div className={"lottery_winner-deployed"}>

                    <div className={"taper_booster_try"}>
                        <div className={"lottery_winner_elements"}>
                            <div className={"lottery_winner_elements-gap"}>
                                <img className={"w-[20px] h-[20px]"} src={'/media/icons/medal.png'}/>
                                <div className={"lottery_winner_elements-text"}>
                                    Розыгрыш
                                </div>
                            </div>
                            <div className={"lottery_winner_elements-text text-yellow-500"}>
                                112223
                            </div>
                        </div>
                        <div className={"lottery_winner_elements"}>
                            <div className={"lottery_winner_elements-date"}>
                                12/12/2024
                            </div>
                        </div>
                    </div>


                    <div className={"info_taps"}>
                        <div className={"lottery_winner_elements"}>
                            <img className={"w-[20px] h-[20px]"} src={'/media/icons/dollar.png'}/>
                            <div className={"lottery_winner_elements-text"}>
                                20000
                            </div>
                        </div>
                    </div>

                    <div className={"info_taps"}>
                        <div className={"lottery_winner_elements"}>
                            <img className={"w-[20px] h-[20px]"} src={'/media/icons/ticket-two.png'}/>
                            <div className={"lottery_winner_elements-text"}>
                                120
                            </div>
                        </div>
                    </div>

                    <div className={"info_taps"}>
                        <div className={"lottery_winner_elements"}>
                            <img className={"w-[20px] h-[20px]"} src={'/media/icons/percentage.png'}/>
                            <div className={"lottery_winner_elements-text"}>
                                20
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}