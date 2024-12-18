
function Suggest({id,defaultvalue='',options=[]}){
    const random=Math.random().toString(36).substring(2,7);
    return (
        <div className="suggest">
            <input list={random} id={id} defaultValue={defaultvalue} />
            <datalist id={random}>
                {options.map((option, idx)=>{
                    return <option key={idx} value={option} />
                })}
            </datalist>
        </div>
    )
}
export default Suggest;