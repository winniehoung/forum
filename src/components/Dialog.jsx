
function Dialog({isvisible,onClose,postdetails}){

    if (!isvisible) return null;
    return(
        <>
        <div className="overlay" onClick={onClose}></div>
        <div className="dialog">
            <div className="dialog-header">
                <h2>{postdetails.title}</h2>
                <button onClick={onClose}>X</button>
            </div>
            <div className="dialog-body">
                <p>{postdetails.body}</p>
            </div>
        </div>
        </>
    )
}
export default Dialog;