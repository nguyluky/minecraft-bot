async function getImageBase64(imageUrl) {
    var response = await fetch(document.location.origin + `/imgbase64?url=${encodeURI(imageUrl)}`)
    return await response.text()
}

const Model = ({isCheck, children}) => {
    const [activa, setActiva] = React.useState(isCheck)
    const display = children[0]
    const popup = children[1]
    const handlActiva = () => {
        console.log(activa)
        setActiva(!activa)
    }
    return (
        <div>
            <div onClick={handlActiva}>
                {display}
            </div>
            {activa ? <div style={{
                position: 'absolute',
                height: '100vh',
                width: '100vw',
                top: '0',
                left: '0',
                background: '#00000044'
            }}>
                {popup}
            </div>  : ''}
        </div>
    )

}

const TabTopDisplay = ({ name, onClose, cursor, onClick, index }) => {
    return (
        <div
            className={clsx("tab", {
                sele: cursor == index,
                nosele: !(cursor == index),
            })}
            onClick={(event) => onClick(index)}
        >
            <div className="back"></div>
            <div className="overlay">
                <div className="name">
                    <span>{name}</span>
                </div>
                <div
                    className="icon"
                    onClick={(e) => {
                        onClose(name);
                        e.stopPropagation();
                    }}
                >
                    <ion-icon name="close"></ion-icon>
                </div>
            </div>
        </div>
    );
};

const BotBodyView = ({ name }) => {
    const skinRender = React.useRef();
    const ele = React.useRef()

    React.useEffect(() => {
        const {offsetWidth, offsetHeight} = ele.current
        skinRender.current = new SkinRender(
            {
                controls: {
                    enabled: true,
                    zoom: false,
                    rotate: true,
                    pan: true
                },
                canvas: {
                    width: offsetWidth,
                    height: offsetWidth * 1.65,
                },
            }, 
            ele.current
        )
    }, [])

    React.useEffect(() => {
        if (!name) return
        getImageBase64(`http://skinsystem.ely.by/skins/${name}.png`).then(
            (base64) => {
                try {
                    skinRender.current.clearScene()
                }
                catch (e) {}
                skinRender.current.render({ data: base64 }, true);
            }
        );
    }, [name]);
    return (
        <div className="bot_body_view">
            <div ref={ele} className="display"
            ></div>
        </div>
    );
};

const BorderContent = ({ children, title }) => {
    return (
        <div className="border">
            <p>{title}</p>
            <div className="content">{children}</div>
        </div>
    );
};

const ActionDiv = (props) => {
    return (
        <BorderContent title='action'>
            <div className="gird-action">
                <div className="list-action">
                    <button className="button_action">forward</button>
                    <button className="button_action">back</button>
                    <button className="button_action">jump</button>
                    <button className="button_action">left</button>
                    <button className="button_action">right</button>
                    <button className="button_action">sneak</button>
                    <button className="button_action">sprint</button>
                    <button className="button_action">use</button>
                    <button className="button_action">action</button>
                    <button className="button_action">open inventory</button>
                    <button className="button_action">chat</button>
                </div>
                <div>

                </div>
                <div className="window"></div>
            </div>
        </BorderContent>
    )
}

const GridChangeSize = ({children, minWidth = 260}) => {
    const offset = React.useRef(300);
    const tab_body = React.useRef();
    const div = React.useRef();
    const first = React.useRef();
    const isMouseDown = React.useRef(false);
    const end = React.useRef()
    const handlResize = (e) => {
        if (e.buttons > 0 && isMouseDown.current == true) {
            if (tab_body.current.offsetWidth - e.clientX < minWidth) return
            offset.current = tab_body.current.offsetWidth - e.clientX;
            tab_body.current.style.gridTemplateColumns = `1fr 4px ${offset.current}px`;
        }
        else {
            isMouseDown.current = false
        }
    };

    return (
        <div className="grid_can_change" ref={tab_body} onMouseMove={handlResize}>
            <div className="first" ref={first}>
                {children[0]}
            </div>
            <div className="hand" ref={div} onMouseDown={() => {isMouseDown.current = true}}></div>
            <div className="end" ref={end}>
                {children[1]}
            </div>
        </div>
    )


}
const Infor = ({name, json}) => {
    return (
        <div className="infor_player" style={{ gridColumn: 1 }}>
                    <div className="body_view">
                        {/* // TODO: */}
                        <BorderContent title={"model " + name}>
                            <BotBodyView name={name} />
                        </BorderContent>
                    </div>
                    <div className="infor">
                        <div className="player">
                            <BorderContent title="player infor">
                                <li>
                                    <p>PLAYER NAME: </p>
                                    <p>{name}</p>
                                </li>
                                <li>
                                    <p>UUID: </p>
                                    <p>{json.uuid}</p>
                                </li>
                                <li>
                                    <p>POS:</p>
                                    <p>{json.pos ? `${json.pos.x} - ${json.pos.y} - ${json.pos.z}` : '0 - 0 - 0'}</p>
                                </li>
                                <li>
                                    <p>HP: </p>
                                    <p>{json.hp}</p>
                                </li>
                                <li>
                                    <p>FOOD: </p>
                                    <p>{json.food}</p>
                                </li>
                                <li>
                                    <p>TIMER JOIN: </p>
                                    <p>{json.date}</p>
                                </li>
                                <li>
                                    <p>COUNT DIE: </p>
                                    <p>{json.die}</p>
                                </li>

                            </BorderContent>
                        </div>
                        <div className="ser">
                            <BorderContent title='server infor'>
                                <li>
                                    <p>SERVER IP:</p>
                                    <p>{json.ip}</p>
                                </li>
                                <li>
                                    <p>PORT:</p>
                                    <p>{json.pos}</p>
                                </li>
                                <li>
                                    <p>PING:</p>
                                    <p>{json.ping}</p>
                                </li>
                                <li>
                                    <p>ONLINE: </p>
                                    <p>1/20</p>
                                </li>
                            </BorderContent>
                        </div>
                    </div>
                    <div className="actio">
                        <ActionDiv />
                    </div>
                </div>
    )
}
const Command = () => {
    return (
        <div className="command_server_infor" style={{ gridColumn: 3 }}>
            <div className="command">
                <BorderContent title='script'>
                    <div className="list"></div>
                    <div className="button">
                        <button className="button_script">run</button>
                        <button className="button_script">add</button>
                        <button className="button_script">remove</button>
                    </div>
                </BorderContent>
            </div>
            <div className="chat">
                <BorderContent title='log'>
                    <div className="log"></div>
                </BorderContent>
            </div>
        </div>
    )
}

const TabBody = ({name}) => {
    const [json, setJson] = React.useState({})
    const event = (mess) => {
        
    }

    React.useEffect(() => {

    }, [name])
    return name ? (
        <div className="tab_body">
            <GridChangeSize>
                <Infor json={json} name={name}/>
                <Command/>
            </GridChangeSize>
        </div>
    ) : '';
};

const TabAdd = ({isCheck}) => {
    const [activa, setActiva] = React.useState(isCheck)
    const handlActiva = () => {
        console.log(activa)
        setActiva(!activa)
    }

    const close = () => {
        setActiva(false)
    }

    return (
        <div className="tabadd">
            <div className="icon" onClick={handlActiva}>
                <ion-icon name="add"></ion-icon>
            </div>
            {activa ? 
                <div className="popup">
                    <div className="fill">
                        <div className="close">
                            <div onClick={close}>
                                <ion-icon name="close"></ion-icon>
                            </div>
                        </div>
                        <div className="chill input">
                            <input type="text" id='name' placeholder="Your bot name"/>
                            <label htmlFor="name">bot name</label>
                        </div>
                        <div className="chill input">
                            <input type="text" id='ip' placeholder="Your server ip"/>
                            <label htmlFor="ip">host ip</label>
                        </div>
                        <div className="chill input">
                            <input type="text" id='port' placeholder="Your server port"/>
                            <label htmlFor="host">port</label>
                        </div>
                        <div className="button">
                            <button>OK</button>
                            <button onClick={close}>CANCEL</button>
                        </div>
                    </div> 
                </div>  
                : ""}
        </div>
    )
}

const TabMaster = ({ type }) => {
    React.useEffect(() => {
        // init(({bots}) => {
        //     bots = ['fish1', 'luky8696']
        //     setBots(bots);
        // })
        setBots(['fish1', 'luky8696'])
    }, []);
    const [tab, setTab] = React.useState(null);
    const [bots, setBots] = React.useState([]);
    const handlTabClose = (name) => {
        console.log(name);
        const index = bots.indexOf(name);
        bots.splice(index, 1);
        setBots([...bots]);
    };
    const handlTabClick = (index) => {
        setTab(index);
    };
    const handlNewBot = () => {
        
    }
    return (
        <div className="tab_master">
            <div className="top_slie">
                {bots.map((name, index) => {
                    return (
                        <TabTopDisplay
                            key={name}
                            index={name}
                            name={name}
                            onClick={handlTabClick}
                            cursor={tab}
                            onClose={handlTabClose}
                        />
                    );
                })}
                <div className="tab_add">
                    <TabAdd/>
                </div>
            </div>
            <div className="body">
                <TabBody name={tab}/>
            </div>
        </div>
    );
};

const App = (props) => {
    return (
        <div style={{ height: "100%" }}>
            <TabMaster></TabMaster>
        </div>
    );
};

const domContainer = document.querySelector("#root");
const root = ReactDOM.createRoot(domContainer);
root.render(<App></App>);
