import './dialog.css';
import logo from '../logo.svg';

function Dialog({ isvisible, onClose, postdetails }) {

    if (!isvisible) return null;
    return (
        <>
            <div className="overlay" onClick={onClose}></div>
            <div className="dialog">
                <button className="exit" onClick={onClose}>X</button>

                <h2>{postdetails.title}</h2>
                <h3>description</h3>
                <hr></hr>
                <div className='userinfo'>
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>author name</p>
                    <p>publish date</p>
                    <p>update date</p>
                </div>
                <hr className='divide'></hr>
                <p>{postdetails.body}</p>
                <hr className='divide'></hr>
                <div className="replies">
                    <p>replies and subreplies</p>
                </div>
            </div>
        </>
    )
}
export default Dialog;