import Tooltip from '@mui/material/Tooltip';
import { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

const StyledTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        color: 'white',
        width: '100%',
        maxWidth: 500
    },
}));

export function CardTooltip({ children, showInfo, ...rest }) {
    return (
        showInfo ? 
            <StyledTooltip {...rest}>
                {children}
            </StyledTooltip> :
            children
    );
}