import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";


function Image(){
    const [data,setData] = useState([]);
    const [img,setImg]  = useState(null);
    const [isopennew , setIsopennew] = useState(false);
    const openNew = (index)=>{
        console.log(data[index])
        setImg(data[index]);
        setIsopennew(true);
    };

    const closeModal = () => {
        setImg(null);
        setIsopennew(false);
    };
    useEffect(()=>{
        fetch('https://jsonplaceholder.typicode.com/photos')
        .then(response => response.json())
        .then(json => setData(json))
        .catch(error=>console.error(error));
    },[]);

    
    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
      }
    const onClickUrl = (url) => {
        return () => openInNewTab(url)
      }
    return(
        <div>
            {
                data.map((item,index)=>(
                    <div key = {index}>
                        <p>{item.albumId}</p>
                        <p>{item.title}</p>
                        {/* <img src={item.url} ></img> */}
                        {/* <img src={item.thumbnailUrl} onClick={()=>openNew(index)}></img> */}
                        
                        <div key={index} >
                            <img src={item.thumbnailUrl} />
                            <button type="submit" onClick={() => openNew(index)}>open</button>
                        </div>

                        

                    </div>
                ))
            }
            <div>
            {isopennew && img && (
                <div>
                    {console.log("in html code")}
                    {console.log(img.url)}
                    <p>{img.title}</p>
                    <img src={img.url} />
                    {/* <Link to={img.url}>open</Link> */}
                </div>
            )}
            </div>
            
        </div>
    )
}

export default Image;