import './die.css'

export default function Die(props) {
        
    return(
        <div onClick={() => props.handleToggle(props.id)} className={props.clicked ? "die-face die-clicked" : "die-face"}>
            <div className='die-num'>{props.value}</div>
        </div>  
    )
}