import React, {useEffect, useState} from "react";

function ImageList ({ images }) {
    const [list, setList] = useState();

    useEffect(() => {
        setList(images);
    }, [images]);

    return (
        <>
            {list != null ?
                <ul className=" row list-inline  mb-0 iq-rtl-direction ">
                    {list?.map((image, index) => (
                        <li className="slide-item col-lg-3 mb-4" key={index}>
                            <div className="block-images position-relative">
                                <div className="img-box">
                                    <img
                                        src={image.image}
                                        className="img-fluid"
                                        alt=""
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                : <p>No more picture.</p>}
        </>
    )
}

export default ImageList;