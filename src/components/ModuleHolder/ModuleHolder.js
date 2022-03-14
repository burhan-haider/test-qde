// import { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';

const ModuleHolder = ({feature, subFeature}) => {
    // const dispatch = useDispatch();

    return(
        <div>
            <h1 className="text-red-700 pt-20 font-bold text-5xl" >{subFeature.name}</h1>
        </div>
    )
}

export default ModuleHolder;