import React, { memo } from 'react';
import { petApiList } from '../slices/PetApiSlice';
import {useSelector, useDispatch} from 'react-redux';

const PetApi = memo(() => {
    const dispatch = useDispatch();
    const {resultList, loading, error} = useSelector((state) => state.pet);

    React.useEffect(() => {
        dispatch(petApiList());
    }, [dispatch])

    return (
        <div>
            
        </div>
    );
});

export default PetApi;