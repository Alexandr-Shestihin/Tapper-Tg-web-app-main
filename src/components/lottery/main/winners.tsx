/* import SearchDropdown from "../../../../../../Downloads/tapper-default/src/components/misc/searchDropdown"; */
import SearchDropdown from "../../misc/searchDropdown";

export default function Winners(){
    return (
        <div className={"lottery_block"}>
            <div className="fag_title">
                Победители
            </div>
            <div className="search-block_form-group">
                <SearchDropdown info={'Категория'}/>
            </div>

            <div className={"sections_taper"}>
                <div className={"lottery_winner-optimal"}>
                    <div className={"lottery_winner_elements"}>
                        <img className={"w-[32px] h-[32px] rounded-[100px]"} src={'/media/icons/man.png'}/>
                    </div>
                    <div className={"lottery_winner_elements"}>
                        <img className={"w-[20px] h-[20px]"} src={'/media/icons/dollar.png'}/>
                        <div className={"deselect-style"}>
                            20000
                        </div>
                    </div>
                    <div className={"lottery_winner_elements"}>
                        <img className={"w-[20px] h-[20px]"} src={'/media/icons/percentage.png'}/>
                        <div className={"deselect-style"}>
                            20
                        </div>
                    </div>
                    <div className={"lottery_winner_elements"}>
                        <img className={"w-[20px] h-[20px]"} src={'/media/icons/ticket-two.png'}/>
                        <div className={"deselect-style"}>
                            120
                        </div>
                    </div>
                </div>

                <div className={"lottery_winner-elite"}>
                    <div className={"lottery_winner_elements"}>
                        <img className={"w-[32px] h-[32px] rounded-[100px]"} src={'/media/icons/man.png'}/>
                    </div>
                    <div className={"lottery_winner_elements"}>
                        <img className={"w-[20px] h-[20px]"} src={'/media/icons/dollar.png'}/>
                        <div className={"deselect-style"}>
                            20000
                        </div>
                    </div>
                    <div className={"lottery_winner_elements"}>
                        <img className={"w-[20px] h-[20px]"} src={'/media/icons/percentage.png'}/>
                        <div className={"deselect-style"}>
                            20
                        </div>
                    </div>
                    <div className={"lottery_winner_elements"}>
                        <img className={"w-[20px] h-[20px]"} src={'/media/icons/ticket-two.png'}/>
                        <div className={"deselect-style"}>
                            120
                        </div>
                    </div>
                </div>

                <div className={"lottery_winner-light"}>
                    <div className={"lottery_winner_elements"}>
                        <img className={"w-[32px] h-[32px] rounded-[100px]"} src={'/media/icons/man.png'}/>
                    </div>
                    <div className={"lottery_winner_elements"}>
                        <img className={"w-[20px] h-[20px]"} src={'/media/icons/dollar.png'}/>
                        <div className={"deselect-style"}>
                            20000
                        </div>
                    </div>
                    <div className={"lottery_winner_elements"}>
                        <img className={"w-[20px] h-[20px]"} src={'/media/icons/percentage.png'}/>
                        <div className={"deselect-style"}>
                            20
                        </div>
                    </div>
                    <div className={"lottery_winner_elements"}>
                        <img className={"w-[20px] h-[20px]"} src={'/media/icons/ticket-two.png'}/>
                        <div className={"deselect-style"}>
                            120
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}