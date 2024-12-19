import { useEffect, useState } from "react";
import { clone } from "../utils/helpers";
import './table.css';
import PropTypes from "prop-types";
import { useAuth } from "../contexts/AuthContext";
import { useLocation } from "react-router-dom";
import Dialog from "./Dialog";

function Table({ headers, initdata }) {
    const { authstate } = useAuth();
    // for conditional rendering of detail page
    const location = useLocation();

    const [data, setdata] = useState([]);
    // for sorting, editing data
    const [sort, setsort] = useState({ col: null, desc: false });
    const [edit, setedit] = useState(null);
    // for filtering data
    const [search, setsearch] = useState(false);
    const [presearchdata, setpresearchdata] = useState(null);
    // for post detail dialog box
    const [dialog,setdialog]=useState(false);
    const [post,setpost]=useState([]);


    useEffect(() => {
        // concat a record id for keyword searching in absense of a pk
        setdata(clone(initdata).map((row, idx) => row.concat(idx)));
    }, [initdata]);
    // sort table by click
    const onSort = (e) => {
        const col = e.target.cellIndex + 1;
        const desc = sort.col === col && !sort.desc;
        const dataclone = clone(data);
        dataclone.sort((a, b) => {
            if (a[col] === b[col]) return 0;
            return desc ? (
                a[col] < b[col] ? 1 : -1
            ) : (
                a[col] > b[col] ? 1 : -1
            )
        });
        setdata(dataclone);
        setsort({ col, desc });
    }
    // edit table
    const onEdit = (e) => {
        setedit({
            row: parseInt(e.target.parentNode.dataset.row, 10),
            col: e.target.cellIndex+1,
        });
    }
    const onSaveEdit = (e) => {
        e.preventDefault();
        const input = e.target.firstChild;
        const dataclone = clone(data).map((row) => {
            if (row[row.length - 1] === edit.row) {
                row[edit.col] = input.value;
            }
            return row;
        });
        if (!search) {
            dataclone[edit.row][edit.col] = input.value;
        } else {
            const presearch = clone(presearchdata);
            presearch[edit.row][edit.col] = input.value;
            setpresearchdata(presearch);
        }
        setdata(dataclone);
        setedit(null);
    }

    // search table
    const toggleSearch = () => {
        console.log(initdata);
        if (search) {
            setdata(presearchdata);
            setsearch(false);
            setpresearchdata(null);
        } else {
            setpresearchdata(data);
            setsearch(true);
        }
    }
    const onSearch = (e) => {
        const keyword = e.target.value.toLowerCase();
        if (!keyword) {
            setdata(presearchdata);
            return;
        }
        const idx = e.target.dataset.idx;
        const searchdata = presearchdata.filter((row) => {
            return row.some((cell, colindex) => {
                if (colindex === parseInt(idx, 10) ) {
                    return cell.toString().toLowerCase().includes(keyword);
                }
                return false;
            });
            // return row[idx].toString().toLowerCase().indexOf(keyword)>-1;
        });
        setdata(searchdata);
    }
    const searchboxes = !search ? null : (
        <tr onChange={onSearch}>
            {headers.map((_, idx) => {
                if(idx===0)return;
                return <td key={idx}>
                    <input type="text" data-idx={idx} placeholder={`Search ${headers.length > 4 ? '' : headers[idx]}`} className={headers.length > 4 ? 'searchbox' : ''} />
                </td>
            })}
        </tr>
    );
    // toggle status not registering on dom
    // const onToggle = (e) => {
    //     if (e.target.tagname==='TD'&&e.target.cellIndex === headers.length) {
    //         console.log('toggle');
    //         const rowidx = parseInt(e.target.parentNode.dataset.row, 10);
    //         const dataclone = clone(data);
    //         dataclone[rowidx][headers.length - 1] = dataclone[rowidx][headers.length - 1] === 'Active' ? 'Inactive' : 'Active';
    //         setdata(dataclone);
    //     }
    // }

    // display post details with dialog box
    const onPost=(id)=>{
        // api call
        post={
            title:id,
            body:'to be determined',
        };
        console.log(post);
        setpost(post);
        setdialog(true);
    };

    return (
        <div className="tile">
            <div className="buttons">
                <p className="button" onClick={toggleSearch}>
                    {search ? 'Hide Search' : 'Show Search'}
                </p>
                {!authstate.user.isadmin&&location.pathname==='/home'&&<p id="addpost">+</p>}

            </div>

            <table>
                <thead onClick={onSort}>
                    <tr>
                        {headers.map((header, idx) => {
                            if (idx === 0) return;
                            if (sort.col === idx) {
                                header += sort.desc ? '\u2191' : '\u2193';
                            }
                            return <th key={idx} className={sort.col === idx ? 'accent' : null}>{header}</th>
                        })
                        }
                    </tr>
                </thead>
                <tbody onDoubleClick={authstate.user.isadmin ? onEdit : null} >
                    {searchboxes}

                    {data.map((row) => {
                        // record index, not really row index
                        const rowidx = row[row.length - 1];
                        return (
                            <tr key={rowidx} data-row={rowidx}>
                                {row.map((cell, colidx) => {
                                    if (colidx === 0 || colidx === headers.length) return;

                                    if (edit && edit.row === rowidx && edit.col === colidx) {
                                        // const statusoptions=['Active','Inactive'];
                                        cell = (
                                            <form onSubmit={onSaveEdit}>
                                                <input type="text" defaultValue={cell} list={`${rowidx}-${colidx}`}/>
                                                {/* <Suggest id={`${rowidx}-${colidx}`} defaultvalue={cell} options={statusoptions}/> */}
                                                
                                            </form>
                                        );
                                    }
                                    if (colidx === 1 && location.pathname === '/home') {
                                        console.log(cell);
                                        return <td key={colidx} className="postdetails" onClick={()=>onPost(row[0])}>{cell}</td>
                                    }
                                    return <td key={colidx} className={cell === 'Active' ? 'green' : cell === 'Inactive' ? 'red' : ''}>{cell}</td>
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <Dialog isvisible={dialog} onClose={()=>setdialog(false)} postdetails={post}/>
        </div>
    );
}

Table.propTypes = {
    headers: PropTypes.arrayOf(PropTypes.string),
    initdata: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
}
export default Table;