import React from 'react'
import { CardGroup } from './CardGroup'
import Box from '@mui/material/Box';

export const CardListGroup = ({ groups, onClickGroup }) => {
    const handleOnClickGroup = (group) => {
        onClickGroup(group)
    }

    return (
        <Box className='cards-list-groups'>
            {groups.map((group) =>
                <CardGroup 
                    group={group} 
                    key={group?.['@name']} 
                    onClick={handleOnClickGroup}
                />
            )}
        </Box>
    )
}
