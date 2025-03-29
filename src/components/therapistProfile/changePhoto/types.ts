import { ChangeEventHandler, Dispatch, SetStateAction } from 'react';

interface Props {
    onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    isProfileOwner: boolean,
    hover: boolean,
    setHover: Dispatch<SetStateAction<boolean>>,
    imgUrl: string,

}

export default Props;
