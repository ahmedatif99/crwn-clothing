import React from 'react';

import CollectionItem from "../collection-item/collection-item.component";

import {
    CollectionPreviewContainer,
    TitleContainer,
    PreviewContainer
  } from './collection-preview.styles';

const CollectionPreview = ({ title, items }) => (
    <CollectionPreviewContainer>
        <TitleContainer>{title.toUpperCase()}</TitleContainer>
        <PreviewContainer>
            {
                items
                .filter((item, index) => index < 4) // To exactly show 4 elemnt only
                .map(item => (
                    <CollectionItem key={item.id} item={item} />
                ))
            }
        </PreviewContainer>
    </CollectionPreviewContainer>
);

export default CollectionPreview;