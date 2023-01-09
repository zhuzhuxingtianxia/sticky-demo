/**
 * 抽奖
*/

import React, { useEffect, useState, useRef } from 'react';
import { Header,ModalAlert } from "@com";
import './index.less';

import iconIntegral10 from './img/Integral_draw-icon-10integral.png';
import iconIntegral20 from './img/Integral_draw-icon-20integral.png';
import iconIntegral48 from './img/Integral_draw-icon-48integral.png';
import iconIntegral88 from './img/Integral_draw-icon-88integral.png';
import iconIntegral888 from './img/Integral_draw-icon-888integral.png';
// import iconPhone from './img/Integral_draw-icon-10phone.png';
// import iconIqiY from './img/Integral_draw-icon-iqiy.png';
import iconPhone from './img/HUAWEI_Mate_40@2x.png';
import iconInspire from './img/Integral_draw-icon-dajiang@2x.png';
import iconWinning from './img/Integral_draw-icon-winning@2x.png';

const stars = Array(34).fill(1);

const buttons = [
    {
        type: 'gift', img: iconInspire, name: '大疆无人机', value: '1', step: 0, click: () => {
            console.log('御 Mavic Air 2 畅飞套装')
        }
    },
    { type: 'integral', img: iconIntegral88, name: '35积分', value: '35', step: 1 },
    { type: 'integral', img: iconIntegral10, name: '10积分', value: '10', step: 2 },
    { type: 'integral', img: iconIntegral48, name: '48积分', value: '48', step: 7 },
    { type: 'start' },
    { type: 'none', img: iconWinning, name: '谢谢参与', step: 3 },
    { type: 'integral', img: iconIntegral20, name: '18积分', value: '18', step: 6 },
    { type: 'integral', img: iconIntegral888, name: '888积分', value: '888', step: 5 },
    {
        type: 'gift', img: iconPhone, name: 'Mate 40 RS', value: '2', step: 4, click: () => {
            console.log('HUAWEI Mate 40 RS保时捷设计 5G 全网通 12GB+512GB（陶瓷黑）')
        }
    },
];

let runner;

const Lottery = ()=> {

    const [status, setStatus] = useState({
        isRuning: false,
        thisStep: 0,
        endSteps: 0,
        interval: 200,
      });
    const [pointInfo, setPointInfo] = useState({})

    const endStepsRef = useRef(0)
    const savedCallback = React.useRef();
    useEffect(() => {
      savedCallback.current = startAnimation;
    });
    useEffect(() => {
        if (status.isRuning) {
          runner = setTimeout(savedCallback.current, status.interval);
        }
      }, [status])

    useEffect(()=>{
        setTimeout(()=> {
            const result = {
                point: 80,
                playTimes: 0,
                allTimes: 3,
                costPoint: 30
            };
            setPointInfo(result)
        },500)
        return ()=> {
            clearTimeout(runner);
        }
    },[])

    const startLottery = () => {
        if(!pointInfo.point) return;

        const point = pointInfo.point - pointInfo.costPoint
        if(point <= 0) {
            ModalAlert.show({
                title: '积分不足',
                content: '您可以签到做任务获取积分哦！',
                onAction: (item, index) => {
                    ModalAlert.hide()
                    console.log(item)
                },
                actions: [
                    {
                        key: 'cancel',
                        text: '取消'
                    },
                    {
                        key: 'confirm',
                        text: '赚取积分',
                    }
                ]
            })
            return;
        }

        if(pointInfo.playTimes >= pointInfo.allTimes) {
            ModalAlert.show({
                title: '游戏次数不足',
                content: '今日抽奖次数已用完，请明天再来哦！',
                onAction: (item, index) => {
                    ModalAlert.hide()
                    console.log(item)
                },
                actions: [
                    {
                        key: 'confirm',
                        text: '确定',
                    }
                ]
            })

            return;
        }

        setTimeout(()=>{
            const _pointInfo = pointInfo
            _pointInfo.playTimes += 1;
            _pointInfo.point = point;
    
            const index = [1,2,3,4,5,6,7,8][Math.ceil(Math.random() * 8)%8]
            const diff = Math.abs(8 - status.thisStep % 8 + index);
    
            endStepsRef.current = 24 + diff;
            
            _pointInfo.index = index;
            setPointInfo(_pointInfo)
            
            setStatus({...status, isRuning: true})

        },500)

    }

    const startAnimation = () => {
        let { thisStep, interval } = status;
        if(endStepsRef.current <= 0) {
            clearTimeout(runner);
            lotteryResult()
            return
        }else {
            endStepsRef.current = endStepsRef.current - 1;
            thisStep = thisStep + 1
        }

        if(endStepsRef.current < 5) {
            interval = Math.min(1000,interval + 200)
        }else {
            interval = Math.max(50,interval - 200)
        }
        setStatus({...status, thisStep, interval})
    }

    const lotteryResult = ()=> {
        const thisItem = buttons.find((item) => {  
            return parseInt(pointInfo.index) % 8 === item.step 
        });
        console.log(thisItem);
        if (thisItem.type === 'none') {
            ModalAlert.show({
                title: '',
                content: <div style={{paddingTop: 10}}>{'很遗憾，这次没有中奖，请再试试吧！'}</div>,
                onAction: (item, index) => {
                    ModalAlert.hide()
                    console.log(item)
                },
                actions: [
                    {
                        key: 'confirm',
                        text: '确定',
                    }
                ]
            })
            
            return;
        }else {
            ModalAlert.show({
                content: (
                    <div style={{display: 'flex', flexDirection: 'column',alignItems: 'center'}}>
                        <img src={thisItem.img} alt="" style={{width: 88, marginBottom: 20}}/>
                        <span style={{whiteSpace: 'pre-wrap', textAlign: 'center'}}>
                            {`恭喜您中得${thisItem.name}\r\n ${thisItem.type === 'integral' ? '可以在积分明细中查看': ''}`}
                        </span>
                    </div>
                ),
                onAction: (item, index) => {
                    ModalAlert.hide()
                    console.log(item)
                },
                actions: [
                    {
                        key: 'confirm',
                        text: '查看详情',
                        style: { color: '#999' }
                    },
                    {
                        text: '继续抽奖'
                    }
                ]
            })
        }
        
        if (thisItem.type === 'integral') {
            pointInfo.point = pointInfo.point + parseInt(thisItem.value, 10);
            setPointInfo(pointInfo)
        }
        setStatus({ ...status, isRuning: false, interval: 200 });
    }

    return (
        <div className='lottery_page'>
            <Header>{'抽奖界面'}</Header>
            <div className='lottery_page--content'>
                <div className='top-img'>
                    <img src={require('@config/source/draw-text.png')} alt="" />
                </div>
                <div className='wrap-box'>
                    <img src={require('@config/source/draw-box.png')} alt="" />
                    <div className='wrap-box-ccontent'>
                        <span className='draw-title'>
                            {`共${pointInfo.point}积分可抽奖, 已抽${pointInfo.playTimes}/${pointInfo.allTimes}`}
                        </span>
                        <div className='draw-border'>
                            {stars.map((item, key) => {
                                return <i key={key} className='star'></i>;
                            })}
                            {status.isRuning && <div className='draw-mask'></div> }
                            {
                                buttons.map((button, key) => {
                                    if (button.type === 'start') {
                                        return (
                                            <div className='draw-start' key={key} onClick={startLottery}>
                                                <div>开始抽奖</div>
                                                <span>{pointInfo.costPoint > 0 ? '-' + pointInfo.costPoint : pointInfo.costPoint}积分</span>
                                            </div>
                                        ) 
                                    }
                                    return (
                                        <div onClick={() => {
                                                if (button.click && typeof (button.click === 'function')) {
                                                    button.click();
                                                }
                                            }} 
                                            className={status.thisStep % 8 === button.step ? 'draw-button active' : 'draw-button'}
                                            key={key}>
                                                <img src={button.img} />
                                                <span>{button.name}</span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Lottery;