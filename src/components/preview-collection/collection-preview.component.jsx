import React from 'react';
import './collection-preview.styles.scss';

import CollectionItem from "../collection-item/collection-item.component";

const CollectionPreview = ({ title, items }) => (
    <div className='collection-preview'>
        <h1 className='title'>{title.toUpperCase()}</h1>
        <div className='preview'>
            {
                items
                .filter((item, index) => index < 4) // To exactly show 4 elemnt only
                .map(item => (
                    <CollectionItem key={item.id} item={item} />
                ))
            }
        </div>
    </div>
);

export default CollectionPreview;