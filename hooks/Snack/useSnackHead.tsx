import cs from 'classnames'
import { sleep } from 'lib'
import { Modal } from 'antd';
import { useState } from 'react'


interface Props {
    direction: Direction;
    isRun: boolean;
    speed: number;
    initHead: {
        x: number;
        y: number;
    };
    currentRule: {
        key: string;
        value: number;
        constraint: boolean;
    }
    confirm: (options: DialogOptions) => void
}
interface CheckStatus {
    snackBody: BodyItem[];
    width: number;
    height: number;
    setIsRun: (v: boolean) => void;
    initHeadAndBody: () => void;

}


const useSnackHead = (props: Props) => {
    const { direction, isRun, speed, currentRule, initHead, confirm } = props
    const [modal, contextHolder] = Modal.useModal();


    const [snackHead, setSnackHead] = useState(initHead)
    const [lastHead, setLastHead] = useState({ x: 0, y: 0 })


    const changeSnackHead = () => {
        if (isRun) {
            const { key, value } = currentRule
            sleep(speed).then(() => {
                setLastHead(snackHead)
                setSnackHead(state => ({ ...state, [key]: state[key as 'x' | 'y'] + value }))
            })
        }
    }
    const findCurrentEatenFood = (foodList: FoodItem[]) => {
        const eatFood = foodList.find(food => {
            const d = Math.sqrt((snackHead.x - food.x) * (snackHead.x - food.x) + (snackHead.y - food.y) * (snackHead.y - food.y));
            return d <= 16 && food
        })
        return eatFood
    }
    const alertGameOver = (callBack: () => void, text: string, width: number) => {
        if (width > 750) {
            modal.confirm({
                title: text,
                content: '再来一局？',
                onOk: callBack,
                onCancel: () => { location.href = '/' }
            })
            return
        }
        confirm({ title: text + ',再来一局？', ok: callBack, cancel: () => { location.href = '/' } })
    }


    const checkingStatusAndFeedback = (options: CheckStatus) => {
        const { snackBody, width, height, initHeadAndBody, setIsRun } = options

        const biteYourself = snackBody.find(item => item.x === snackHead.x && item.y === snackHead.y)
        const outOfRange = (snackHead.x < 0 || snackHead.x > width - 10 || snackHead.y < 0 || snackHead.y > height - 10)
        if (biteYourself) {

            alertGameOver(initHeadAndBody, '咬到自己啦', width)
        } else if (outOfRange) {

            alertGameOver(initHeadAndBody, '撞墙啦', width)
        } else {
            changeSnackHead()
        }
    }



    const headClass = cs("body-item", 'snack-head', ["ArrowDown", "ArrowUp"].includes(direction) && 'rotate')

    const snackHeadView = (
        <div className={headClass} style={{ left: snackHead.x, top: snackHead.y }}>
            <div className="eye-left"></div>
            <div className="eye-right"></div>
            {contextHolder}
        </div>
    )
    return { snackHead, setSnackHead, snackHeadView, changeSnackHead, lastHead, findCurrentEatenFood, checkingStatusAndFeedback }
}
export default useSnackHead