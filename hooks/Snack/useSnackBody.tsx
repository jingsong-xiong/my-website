import { useState } from "react"

type BodyItem = {
    x: number;
    y: number;
}

interface Props {
    initBody: BodyItem[]
}

const useSnackBody = (props: Props) => {
    const { initBody } = props
    const [snackBody, setsNackBody] = useState<BodyItem[]>(initBody)

    const changeSnackBody = (lastHead: BodyItem, type?: 'add') => {
        if (type === 'add') {
            setsNackBody(state => ([lastHead, ...state]))
        } else {
            setsNackBody(state => ([lastHead, ...state.slice(0, state.length - 1)]))
        }
    }

    const snackBodyView = (
        <>
            {
                snackBody.map((item, index) => {
                    return <div className="body-item" key={index} style={{ left: item.x, top: item.y }}></div>
                })
            }
        </>
    )

    return { snackBodyView, changeSnackBody, snackBody, setsNackBody }


}


export default useSnackBody